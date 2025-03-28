import { Injectable } from '@nestjs/common';
import { TravelsDataAccess } from './travels.data-access';
import { TRAVEL_ENTITY_PROPERTIES } from '../constants/travel.constants';
import { TravelsEntity } from './travels.entity';
import { TicketService } from '../ticket/ticket.service';
import { TICKET_STATUSES } from '../constants/ticket.constants';

@Injectable()
export class TravelsService {
  constructor(
    private travelDataAccess: TravelsDataAccess,
    private ticketsService: TicketService,
  ) {}

  async findTravelById(id: Uuid, projection: string | { [key: string]: 1 } = {}) {
    const decoratedProjection: { [key: string]: 1 } =
      typeof projection === 'string' ? this.decorateProjectionObject(projection) : projection;
    return this.travelDataAccess.findTravelById(id, decoratedProjection);
  }

  decorateProjectionObject(projection?: string) {
    const currentProjection = {};
    if (projection) {
      const array: string[] = projection.split(' ');
      array.forEach((element) => {
        if (TRAVEL_ENTITY_PROPERTIES.has(element)) currentProjection[element] = 1;
      });
    }
    return currentProjection;
  }

  async findTravels(projection: string | { [key: string]: 1 } = {}): Promise<TravelsEntity[]> {
    const decoratedProjection: { [key: string]: 1 } =
      typeof projection === 'string' ? this.decorateProjectionObject(projection) : projection;
    return this.travelDataAccess.findTravels(decoratedProjection);
  }

  async startTravel(travelId: Uuid) {
    try {
      const tickets = await this.ticketsService.findAllTicketsByTravelId(travelId);
      for (const ticket of tickets) {
        if (ticket.status !== TICKET_STATUSES.CHECKED_IN) {
          ticket.status = TICKET_STATUSES.Expired;
        } else {
          ticket.status = TICKET_STATUSES.USED;
        }
      }
      await this.ticketsService.updateMultipleTickets(tickets);
    } catch (e: any) {
      throw new Error(`Throwing an error, during updating multiple tickets === msg: ${e}`);
    }
  }
}
