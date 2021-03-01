import { Exclude } from 'class-transformer';
import { nanoid } from 'nanoid';
import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseDto } from './base.dto';
@Exclude()
export abstract class BaseEntity<Q, DTO extends BaseDto<Q> = BaseDto<Q>> {
  dtoClass?: new (entity: BaseEntity<Q>) => DTO;
  @PrimaryColumn()
  private _id: string;

  get id(): string {
    return this._id;
  }

  constructor(partial: Partial<Q>) {
    Object.assign(this, partial);
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  private _generateId() {
    this._id = nanoid();
  }

  toDto(): DTO {
    return new this.dtoClass(this);
  }
}
