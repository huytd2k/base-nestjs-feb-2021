import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

export abstract class BaseDto<Q> {
  @ApiProperty({ type: String })
  createdAt: string;
  @ApiProperty({ type: String })
  updatedAt: string;
  constructor(model: BaseEntity<Q>) {
    this.createdAt = model.createdAt.toISOString();
    this.updatedAt = model.updatedAt.toISOString();
  }
}
