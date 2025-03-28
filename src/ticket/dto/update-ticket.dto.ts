import {IsString} from "class-validator";


export class UpdateTicketDto {
  @IsString()
  status: string;

  @IsString()
  user_id: string;

  @IsString()
  travel_id: string;
}
