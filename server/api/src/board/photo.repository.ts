import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PhotoRepository {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) {}
  async save(photo: Photo) {
    await this.photoRepository.save(photo);
  }

  async create(photo: Photo) {
    await this.photoRepository.create(photo);
  }
}
