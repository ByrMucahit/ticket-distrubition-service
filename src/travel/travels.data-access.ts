import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelsEntity } from './travels.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TravelsDataAccess {
  constructor(@InjectRepository(TravelsEntity) private travelRepository: Repository<TravelsEntity>) {}

  async findTravelById(id: Uuid, projection: { [key: string]: 1 } = {}) {
    return this.travelRepository.findOne({ select: projection, where: { id } });
  }

  async findTravels(projection: { [key: string]: 1 } = {}): Promise<TravelsEntity[]> {
    return this.travelRepository.find({ select: projection });
  }
}
