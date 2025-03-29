import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { TravelsService } from '../travel/travels.service';
import { TRAVEL_STATUSES } from '../constants/travel.constants';

@Injectable()
export class ValidateTravelGuard implements CanActivate {
  constructor(private travelService: TravelsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const travelId =
        request.params['travel_id'] || request.query || request.headers['travel_id'] || request.body.travel_id;
      const travel = await this.travelService.findTravelById(travelId, { status: 1 });
      if (travel && travel.status === TRAVEL_STATUSES.ACTIVE) return true;
      throw new BadRequestException(`Invalid Travel === Travel id: ${travelId}`);
    } catch (ex: any) {
      throw new BadRequestException(`${ex}`);
    }
  }
}
