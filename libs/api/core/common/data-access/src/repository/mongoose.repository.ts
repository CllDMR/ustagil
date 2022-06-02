import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { CustomRpcException } from '@ustagil/api/core/common/typing';
import { ObjectId } from 'mongodb';
import { FilterQuery, Model } from 'mongoose';
import { EntityDomainFactory } from '../factory/entity-domain.factory';
import { IdentifiableSchema } from '../schema/identifiable.schema';
import { BaseRepository } from './base.repository';

export abstract class MongooseRepository<
  TEntity extends IdentifiableSchema,
  TDomain extends AggregateRoot
> implements BaseRepository<TEntity, TDomain>
{
  constructor(
    protected readonly entityModel: Model<TEntity>,
    protected readonly entityDomainFactory: EntityDomainFactory<
      TEntity,
      TDomain
    >
  ) {}

  async create(domain: TDomain): Promise<TEntity> {
    const entity = await new this.entityModel(
      this.entityDomainFactory.createEntityFromDomain(domain)
    ).save();

    if (!entity) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Unable to create the entity.',
        description: 'Wake up developer',
      });
    }

    return entity;
  }

  async findAll(entityFilterQuery?: FilterQuery<TEntity>): Promise<TDomain[]> {
    const entities = await this.entityModel.find(
      entityFilterQuery,
      {},
      { lean: true }
    );

    return entities.map((e) =>
      this.entityDomainFactory.createDomainFromEntity(e)
    );
  }

  async findOne(entityFilterQuery?: FilterQuery<TEntity>): Promise<TDomain> {
    const entity = await this.entityModel.findOne(
      entityFilterQuery,
      {},
      { lean: true }
    );

    if (!entity) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Unable to find the entity by filter.',
        description: 'Wake up developer',
      });
    }

    return this.entityDomainFactory.createDomainFromEntity(entity);
  }

  async findOneById(id: string): Promise<TDomain> {
    const entity = await this.entityModel.findById(
      new ObjectId(id),
      {},
      { lean: true }
    );

    if (!entity) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Unable to find the entity by id.',
        description: 'Wake up developer',
      });
    }

    return this.entityDomainFactory.createDomainFromEntity(entity);
  }

  async findOneAndReplace(
    entityFilterQuery: FilterQuery<TEntity>,
    domain: TDomain
  ): Promise<TDomain> {
    const updatedEntityDocument = await this.entityModel.findOneAndReplace(
      entityFilterQuery,
      this.entityDomainFactory.createEntityFromDomain(domain),
      {
        new: true,
        useFindAndModify: false,
        lean: true,
      }
    );

    if (!updatedEntityDocument) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Unable to find the entity to replace.',
        description: 'Wake up developer',
      });
    }

    return this.entityDomainFactory.createDomainFromEntity(
      updatedEntityDocument
    );
  }
}
