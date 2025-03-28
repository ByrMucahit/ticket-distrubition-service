import { IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  user_id: string;

  @IsString()
  travel_id: string;
}
