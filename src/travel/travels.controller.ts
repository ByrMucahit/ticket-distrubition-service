import { Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { UUIDParam } from '../decorator/http.decorator';
import { TravelsEntity } from './travels.entity';
import { ValidateTravelGuard } from '../guard/validate-travel.guard';
import { UserMeta, UserMetaI } from '../decorator/user-meta.decorator';

@Controller('travels')
export class TravelsController {
  constructor(private travelService: TravelsService) {}

  @Get(':id')
  async findTravelById(@UUIDParam('id') id: Uuid, @Query('projection') projection: string) {
    return this.travelService.findTravelById(id, projection);
  }

  @Get()
  async findTravels(
    @Query('projection') projection: string,
    @UserMeta() userMeta: UserMetaI,
  ): Promise<TravelsEntity[]> {
    const { user_id } = userMeta;
    return await this.travelService.findTravels(user_id, projection);
  }

  @Put(':id')
  @UseGuards(ValidateTravelGuard)
  async startTravel(@UUIDParam('id') id: Uuid) {
    return await this.travelService.startTravel(id);
  }
}
