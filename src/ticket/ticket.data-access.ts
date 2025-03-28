import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './ticket.entity';
import { Repository } from 'typeorm';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TICKET_STATUSES } from '../constants/ticket.constants';

@Injectable()
export class TicketDataAccess {
  constructor(@InjectRepository(TicketEntity) private ticketRepository: Repository<TicketEntity>) {}

  async createTicket(createTicketDto: { user_id: string; travel_id: string }) {
    const ticketEntity = this.ticketRepository.create(createTicketDto);
    ticketEntity.created_at = new Date();
    ticketEntity.updated_at = new Date();
    ticketEntity.status = TICKET_STATUSES.ACQUIRED;
    await this.ticketRepository.save(ticketEntity);
  }

  async findTicketByTravelIdAndUserId(dto: { user_id: string; travel_id: string }) {
    const { user_id, travel_id } = dto;
    return this.ticketRepository.findOne({ where: { user_id, travel_id } });
  }

  async updateTicket(ticketEntity: TicketEntity, updateTicketDto: UpdateTicketDto, id: Uuid) {
    const { status } = updateTicketDto;

    return this.ticketRepository
      .createQueryBuilder()
      .update(ticketEntity)
      .set({ status })
      .where('id = :id', { id })
      .execute();
  }

  async findTicketsByUserId(userId: Uuid, projection: { [key: string]: 1 } = {}) {
    return this.ticketRepository.find({ select: projection, where: { user_id: userId } });
  }

  async findTicketById(userId: Uuid, ticketId: Uuid, projection: { [key: string]: 1 } = {}) {
    return this.ticketRepository.findOne({ select: projection, where: { id: ticketId, user_id: userId } });
  }

  async findTicketByIdAndStatus(userId: Uuid, ticketId: Uuid, status: string, projection: { [key: string]: 1 } = {}) {
    return this.ticketRepository.findOne({ select: projection, where: { id: ticketId, user_id: userId, status } });
  }

  async findTicketsByTravelId(travelId: Uuid, projection: { [key: string]: 1 } = {}) {
    return this.ticketRepository.find({ select: projection, where: { travel_id: travelId } });
  }

  async updateMultipleTickets(ticketEntities: TicketEntity[]) {
    return this.ticketRepository.save(ticketEntities);
  }
}
