import { AggregateRoot } from '@nestjs/cqrs';
// import { IdentifiableSchema } from '../schema/identifiable.schema';

export interface BaseRepository<
  // TEntity extends IdentifiableSchema,
  TDomain extends AggregateRoot
> {
  create(domain: TDomain): Promise<TDomain>;

  readAll(entityFilter?: unknown): Promise<TDomain[]>;
  readOne(entityFilter?: unknown): Promise<TDomain>;
  readOneById(id: string): Promise<TDomain>;

  readOneAndUpdate(entityFilter: unknown, domain: TDomain): Promise<TDomain>;
}
