import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableSchema } from '../schema/identifiable.schema';

export interface EntityDomainFactory<
  TEntity extends IdentifiableSchema,
  TDomain extends AggregateRoot
> {
  createEntityFromDomain(domain: TDomain): TEntity;
  createDomainFromEntity(entity: TEntity): TDomain;
}
