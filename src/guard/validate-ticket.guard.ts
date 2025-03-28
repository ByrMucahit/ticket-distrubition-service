import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TicketService } from '../ticket/ticket.service';

@Injectable()
export class ValidateTicketGuard implements CanActivate {
  constructor(private ticketService: TicketService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const ticketId = request.params.ticket_id;
      const userId = request.headers['user_id'];
      if (!userId) throw new Error('User id must be exist');

      const ticket = await this.ticketService.findTickerById(userId, ticketId);
      if (!ticket) throw new BadRequestException('Invalid ticket');
      return true;
    } catch (ex: any) {
      throw new BadRequestException(`messages: ${ex}`);
    }
  }
}
