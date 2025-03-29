import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TicketDataAccess } from './ticket.data-access';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { decorateProjectionObject, PROPERTIES } from '../decorator/projection.decorator';
import { TICKET_STATUSES } from '../constants/ticket.constants';
import { TicketEntity } from './ticket.entity';
import { Gateway } from '../gateway/gateway';

@Injectable()
export class TicketService {
  constructor(
    private ticketDataAccess: TicketDataAccess,
    private gateway: Gateway,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<{ status: number; messages: string }> {
    try {
      const existingTicket = await this.ticketDataAccess.findTicketByTravelIdAndUserId(createTicketDto);
      if (existingTicket) return { status: 400, messages: 'ALREADY_EXISTING_TICKET' };
      const ticket = await this.ticketDataAccess.createTicket(createTicketDto);

      this.gateway.sendBoughtTicketEvent(ticket);
      return { status: 200, messages: 'CREATING_TICKET_SUCCESS' };
    } catch (ex: any) {
      throw new Error(`Throwing an error during creating ticket === message: ${ex.message}`);
    }
  }

  async updateTicket(updateTicketDto: UpdateTicketDto, id: Uuid) {
    try {
      const { user_id, travel_id } = updateTicketDto;
      const ticketEntity = await this.ticketDataAccess.findTicketByTravelIdAndUserId({
        user_id,
        travel_id,
      });
      if (!ticketEntity) throw new NotFoundException(`Ticket Not Found === ticket id : ${id}`);
      await this.ticketDataAccess.updateTicket(ticketEntity, updateTicketDto, id);
    } catch (ex: any) {}
  }

  async findTicketsByUserId(userId: Uuid, projection: string | { [key: string]: 1 } = {}) {
    const decoratedProjection: { [key: string]: 1 } =
      typeof projection === 'string' ? decorateProjectionObject(PROPERTIES.TICKET_ENTITY, projection) : projection;
    return this.ticketDataAccess.findTicketsByUserId(userId, decoratedProjection);
  }

  async findTickerById(userId: Uuid, ticketId: Uuid, projection: string | { [key: string]: 1 } = {}) {
    const decoratedProjection: { [key: string]: 1 } =
      typeof projection === 'string' ? decorateProjectionObject(PROPERTIES.TICKET_ENTITY, projection) : projection;
    return this.ticketDataAccess.findTicketById(userId, ticketId, decoratedProjection);
  }

  async checkedInTicketStatus(ticketId: Uuid, userId: Uuid, status: string) {
    try {
      const ticket = await this.ticketDataAccess.findTicketByIdAndStatus(userId, ticketId, TICKET_STATUSES.ACQUIRED);
      if (!ticket) {
        throw new BadRequestException('Ticket Already Checked In');
      }

      const updateTicketDto: UpdateTicketDto = {
        status: status,
        user_id: userId,
        travel_id: ticket?.travel_id,
      };
      await this.ticketDataAccess.updateTicket(ticket, updateTicketDto, ticketId);

      return { status: 200, messages: 'TICKET_UPDATED' };
    } catch (ex: any) {
      throw new BadRequestException(`${ex}`);
    }
  }

  async findAllTicketsByTravelId(travelId: Uuid, projection: string | { [key: string]: 1 } = {}) {
    const decoratedProjection: { [key: string]: 1 } =
      typeof projection === 'string' ? decorateProjectionObject(PROPERTIES.TICKET_ENTITY, projection) : projection;
    return this.ticketDataAccess.findTicketsByTravelId(travelId, decoratedProjection);
  }

  async updateMultipleTickets(tickets: TicketEntity[]) {
    try {
      await this.ticketDataAccess.updateMultipleTickets(tickets);
    } catch (ex: any) {
      throw new BadRequestException(`Throw Error During Updating Multiple Tickets === message: ${ex}`);
    }
  }
}
