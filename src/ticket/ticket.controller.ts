import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ValidateTravelGuard } from '../guard/validate-travel.guard';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UUIDParam } from '../decorator/http.decorator';
import { ValidateTicketGuard } from '../guard/validate-ticket.guard';
import { TICKET_STATUSES } from '../constants/ticket.constants';
import { UserMeta } from '../decorator/user-meta.decorator';

@Controller('tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post('/buy/:travel_id')
  @UseGuards(ValidateTravelGuard)
  async createTicket(@UUIDParam('travel_id') travelId: Uuid, @UserMeta() userMeta: { user_id: Uuid }) {
    const { user_id } = userMeta;
    return this.ticketService.createTicket({ travel_id: travelId, user_id });
  }

  @Put('/:travel_id')
  @UseGuards(ValidateTravelGuard)
  async updateTicket(@Body() updateTicketDto: UpdateTicketDto, @UUIDParam('travel_id') travelId: Uuid) {
    return this.ticketService.updateTicket(updateTicketDto, travelId);
  }

  @Get('/:user_id')
  async findTicketByUserId(@UUIDParam('user_id') userId: Uuid, @Query('projection') projection: string) {
    return this.ticketService.findTicketsByUserId(userId, projection);
  }

  @Get('user/:user_id/ticket/:ticket_id')
  async findTicketById(
    @UUIDParam('user_id') userId: Uuid,
    @UUIDParam('ticket_id') ticketId: Uuid,
    @Query('projection') projection: string,
  ) {
    return this.ticketService.findTickerById(userId, ticketId, projection);
  }

  @Put('/:ticket_id/check_in')
  @UseGuards(ValidateTicketGuard)
  async checkTicketIn(@UUIDParam('ticket_id') ticketId: Uuid, @UserMeta() userMeta: { user_id: Uuid }) {
    const { user_id } = userMeta;
    return this.ticketService.checkedInTicketStatus(ticketId, user_id, TICKET_STATUSES.CHECKED_IN);
  }
}
