import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableSchema } from '../schema/identifiable.schema';

export interface BaseRepository<
  TEntity extends IdentifiableSchema,
  TDomain extends AggregateRoot
> {
  create(domain: TDomain): Promise<TEntity>;

  findAll(entityFilter?: unknown): Promise<TDomain[]>;
  findOne(entityFilter?: unknown): Promise<TDomain>;
  findOneById(id: string): Promise<TDomain>;

  findOneAndReplace(entityFilter: unknown, domain: TDomain): Promise<TDomain>;
}
