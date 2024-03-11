import { Test, TestingModule } from '@nestjs/testing';
import { StandingsService } from '../../src/standings/standings.service';

describe('StandingsService', () => {
  let service: StandingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandingsService],
    }).compile();

    service = module.get<StandingsService>(StandingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
