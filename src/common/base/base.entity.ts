import { Expose } from 'class-transformer';
import { nanoid } from 'nanoid';
import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
export abstract class BaseEntity<T> {
  @PrimaryColumn()
  private _id: string;

  @Expose()
  get id(): string {
    return this._id;
  }
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateId() {
    this._id = nanoid();
  }
}
