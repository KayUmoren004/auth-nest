import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
//prod.liveshare.vsengsaas.visualstudio.com/join?94463C711149EBA6353C4E45E5D7E9F6CC1A

https: @ApiTags('Game')
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
}
