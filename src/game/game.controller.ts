import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GameAttendanceDto } from './dto/game.dto';

@ApiTags('Game')
@Controller('game')
@ApiBearerAuth()
export class GameController {
  // Constructor
  constructor(private gameService: GameService) {}

  // Get a game by ID Endpoint - GET /{gameId}
  @UseGuards(JwtGuard)
  @Get('/:gameId')
  async getGameById(@Param('gameId') gameId: string) {
    return await this.gameService.findGameById(gameId);
  }

  // Post a game attendance Endpoint - POST /attendance
  @UseGuards(JwtGuard)
  @Post('/attendance')
  async postGameAttendance(@Body() dto: GameAttendanceDto) {
    return await this.gameService.addAttendance(dto);
  }
}
