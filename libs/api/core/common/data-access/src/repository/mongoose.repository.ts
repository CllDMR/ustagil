import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { CustomRpcException } from '@ustagil/api/core/common/typing';
import { MongoServerError, ObjectId } from 'mongodb';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { EntityDomainFactory } from '../factory/entity-domain.factory';
import { IdentifiableSchema } from '../schema/identifiable.schema';
import { BaseRepository } from './base.repository';

export abstract class MongooseRepository<
  TEntity extends IdentifiableSchema,
  TDomain extends AggregateRoot
> implements BaseRepository<TDomain>
{
  constructor(
    protected readonly entityModel: Model<TEntity>,
    protected readonly entityDomainFactory: EntityDomainFactory<
      TEntity,
      TDomain
    >
  ) {}

  async create(domain: TDomain): Promise<TDomain> {
    let entity: TEntity;

    try {
      entity = await new this.entityModel(
        this.entityDomainFactory.createEntityFromDomain(domain)
      ).save();
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        const duplicatedKeys = Object.keys(err.keyPattern).reduce(
          (prev, current) => prev + ', ' + current
        );

        throw new CustomRpcException({
          rpcErrorCode: Status.INTERNAL,
          statusCode: HttpStatus.BAD_REQUEST,
          errorCode: 'undefined for now',
          message: `Duplicated '${duplicatedKeys}' while creating the entity.`,
          description: 'Wake up developer',
        });
      } else {
        throw new CustomRpcException({
          rpcErrorCode: Status.INTERNAL,
          statusCode: HttpStatus.BAD_REQUEST,
          errorCode: 'undefined for now',
          message: 'Someting went wrong while creating the entity.',
          description: 'Wake up developer',
        });
      }
    }

    if (!entity) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Unable to create the entity.',
        description: 'Wake up developer',
      });
    }

    return this.entityDomainFactory.createDomainFromEntity(entity);
  }

  async findAll(
    entityFilterQuery?: FilterQuery<TEntity>,
    queryOptions?: QueryOptions<TEntity>
  ): Promise<TDomain[]> {
    let entities: TEntity[];
    try {
      entities = await this.entityModel.find(
        entityFilterQuery,
        {},
        { ...queryOptions, lean: true }
      );
    } catch (error) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Someting went wrong while finding the entities by filter.',
        description: 'Wake up developer',
      });
    }

    return entities.map((e) =>
      this.entityDomainFactory.createDomainFromEntity(e)
    );
  }

  async findOne(
    entityFilterQuery?: FilterQuery<TEntity>,
    entityProjectionType?: ProjectionType<TEntity>
  ): Promise<TDomain> {
    let entity: TEntity;

    try {
      entity = await this.entityModel.findOne(
        entityFilterQuery,
        entityProjectionType,
        { lean: true }
      );
    } catch (error) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Someting went wrong while finding the entity by filter.',
        description: 'Wake up developer',
      });
    }

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
    let entity: TEntity;

    try {
      entity = await this.entityModel.findById(
        new ObjectId(id),
        {},
        { lean: true }
      );
    } catch (error) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Someting went wrong while finding the entity by id.',
        description: 'Wake up developer',
      });
    }

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

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<TEntity>,
    domain: TDomain
  ): Promise<TDomain> {
    let entity: TEntity;

    try {
      const { _id, ...updateEntity } =
        this.entityDomainFactory.createEntityFromDomain(domain);

      entity = await this.entityModel.findOneAndUpdate(
        entityFilterQuery,
        updateEntity,
        {
          new: true,
          useFindAndModify: false,
          lean: true,
        }
      );
    } catch (error) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Someting went wrong while updating the entity.',
        description: 'Wake up developer',
      });
    }

    if (!entity) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Unable to find the entity to update.',
        description: 'Wake up developer',
      });
    }

    return this.entityDomainFactory.createDomainFromEntity(entity);
  }

  async findOneAndRemove(
    entityFilterQuery: FilterQuery<TEntity>
  ): Promise<TDomain> {
    let entity: TEntity;

    try {
      entity = await this.entityModel.findOneAndDelete(entityFilterQuery, {
        new: true,
        useFindAndModify: false,
        lean: true,
      });
    } catch (error) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Someting went wrong while deleting the entity.',
        description: 'Wake up developer',
      });
    }

    if (!entity) {
      throw new CustomRpcException({
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'undefined for now',
        message: 'Unable to find the entity to delete.',
        description: 'Wake up developer',
      });
    }

    return this.entityDomainFactory.createDomainFromEntity(entity);
  }
}
