import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { StandingsService } from 'src/standings/standings.service';
import { PlayerService } from 'src/player/player.service';
import { CreatePlayerDto } from 'src/player/dto/player.dto';

@Injectable()
export class TeamService {
  constructor(
    private prisma: PrismaService,
    private standings: StandingsService,
    private player: PlayerService,
  ) {}

  // Exclude item from array or object
  exclude = (fieldToRemove, data, noOfElements) => {
    const removeField = (obj, field, depth) => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          removeField(obj[key], field, depth);
        }
        if (key === field && (depth === 'all' || depth-- > 0)) {
          delete obj[key];
        }
      }
    };

    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        if (noOfElements === 'all' || index < noOfElements) {
          removeField(item, fieldToRemove, noOfElements);
        }
      });
    } else if (typeof data === 'object' && data !== null) {
      removeField(data, fieldToRemove, noOfElements);
    }

    return data;
  };

  // Create a new team
  async createTeam(dto: CreateTeamDto) {
    // Check if team exists
    const team = await this.prisma.team.findUnique({
      where: { name: dto.name },
    });

    // If team exists, throw an error
    if (team) throw new ConflictException('Team already exists');

    // If league does not exist, throw an error
    const league = await this.prisma.league.findUnique({
      where: { id: dto.leagueId },
      include: {
        settings: true,
        teams: true,
      },
    });

    if (!league) throw new ConflictException('League does not exist');

    // Get league's maxLeagueTeams setting
    const maxLeagueTeams = league.settings.find(
      (setting) => setting.name === 'maxLeagueTeams',
    );

    // Get the number of teams in the league
    const numberOfTeams = league.teams.length;

    // If the number of teams in the league is greater than or equal to the maxLeagueTeams setting, throw an error
    if (maxLeagueTeams && numberOfTeams >= Number(maxLeagueTeams.value))
      throw new ConflictException('Max number of teams reached');

    // Check if captain exists
    const captain = await this.prisma.user.findUnique({
      where: { id: dto.captainId },
    });

    // If captain does not exist, throw an error
    if (!captain) throw new ConflictException('Captain does not exist');

    // If captain already has a team, throw an error
    const captainTeam = await this.prisma.team.findFirst({
      where: { captainId: dto.captainId },
    });

    if (captainTeam) throw new ConflictException('Captain already has a team');

    // Create the team
    const newTeam = await this.prisma.team.create({
      data: {
        league: { connect: { id: dto.leagueId } },
        name: dto.name,
        captain: { connect: { id: dto.captainId } },
        logoUrl: dto.logoUrl,
        shortName: dto.shortName,
      },
    });

    // Create a new player for the captain
    const captainPlayer = await this.player.createPlayer({
      userId: dto.captainId,
      teamId: newTeam.id,
      position: dto.position,
      jerseyNumber: dto.jerseyNumber,
    });

    // Update the league table
    this.standings.setupLeagueTable(dto.leagueId);

    // Return the team
    return newTeam;
  }

  // Return all teams given a league id
  async findAll(leagueId: string) {
    return await this.prisma.team.findMany({
      where: { leagueId },
      include: {
        players: true,
        games: true,
        league: {
          include: {
            sport: true,
          },
        },
        captain: true,
      },
    });
  }

  // Return all teams given a school id
  async findAllBySchool(schoolId: string) {
    const sports = await this.prisma.sport.findMany({
      where: { schoolId },
    });

    const leagues = await this.prisma.league.findMany({
      where: {
        sportId: {
          in: sports.map((sport) => sport.id),
        },
      },
    });

    const data = await this.prisma.team.findMany({
      where: {
        leagueId: {
          in: leagues.map((league) => league.id),
        },
      },
      include: {
        players: true,
        games: true,
        league: {
          include: {
            sport: true,
          },
        },
        captain: true,
      },
    });

    const team = this.exclude('password', data, 'all');

    return team;
  }

  // Delete a team given a team id and league id
  async deleteTeam(teamId: string, leagueId: string) {
    // Check if team exists
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    // If team does not exist, throw an error
    if (!team) throw new ConflictException('Team does not exist');

    // Check if team belongs to league
    if (team.leagueId !== leagueId)
      throw new ConflictException('Team does not belong to league');

    // Delete the team
    await this.prisma.team.delete({
      where: { id: teamId },
    });
  }

  // Update a team given a team id and league id
  async updateTeam(teamId: string, leagueId: string, dto: UpdateTeamDto) {
    // Check if team exists
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    // If team does not exist, throw an error
    if (!team) throw new ConflictException('Team does not exist');

    // Check if team belongs to league
    if (team.leagueId !== leagueId)
      throw new ConflictException('Team does not belong to league');

    // Update the team
    const updatedTeam = await this.prisma.team.update({
      where: { id: teamId },
      include: {
        players: true,
        games: true,
        league: true,
      },
      data: {
        name: dto.name ? dto.name : team.name,
        captainId: dto.captainId ? dto.captainId : team.captainId,
        logoUrl: dto.logoUrl ? dto.logoUrl : team.logoUrl,
        wins: {
          increment: Number(dto.wins) ? Number(dto.wins) : 0,
        },
        ties: {
          increment: Number(dto.ties) ? Number(dto.ties) : 0,
        },
        losses: {
          increment: Number(dto.losses) ? Number(dto.losses) : 0,
        },
      },
    });

    // Return the updated team
    return updatedTeam;
  }

  // Return a team given a team id
  async findOne(teamId: string) {
    return await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        players: {
          include: {
            user: true,
          },
        },
        games: {
          include: {
            fixture: true,
          },
        },
        league: true,
        captain: true,
      },
    });
  }

  // Return all players in a team given a team id
  async findPlayers(teamId: string) {
    return await this.prisma.player.findMany({
      where: { teamId },
      include: {
        user: true,
      },
    });
  }

  // Add a player to a team given a team id and user id
  async addPlayer(dto: CreatePlayerDto) {
    // Create Player dto
    const player = await this.player.createPlayer(dto);

    // Return the player
    return player;
  }

  // Join A team given a team id and user id
  async joinTeam(teamId: string, userId: string) {
    // Check if team exists
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    // If team does not exist, throw an error
    if (!team) throw new ConflictException('Team does not exist');

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // If user does not exist, throw an error
    if (!user) throw new ConflictException('User does not exist');

    // Check if user is already in team
    let player = await this.prisma.player.findFirst({
      where: { userId, teamId },
    });

    // If user is already in team, throw an error
    if (player) throw new ConflictException('User is already in team');

    // If no player exists, create a new player
    if (!player) {
      const dto = {
        userId,
        teamId,
        position: 'Forward',
        jerseyNumber: '0',
      };

      // Create a new player
      player = await this.player.createPlayer(dto);
    }

    // Return the player
    return player;
  }
}
