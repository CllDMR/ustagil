import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { MongooseRepository } from '@ustagil/api/core/common/data-access';
import { SuperAdminEntityDomainFactory } from '../../factory/super_admin.factory';
import { SuperAdmin } from '../../schema/super_admin.schema';

@Injectable()
export class SuperAdminMongooseRepository extends MongooseRepository<
  SuperAdmin,
  SuperAdminDomain
> {
  constructor(
    @InjectModel(SuperAdmin.name) superAdminModel,
    superAdminEntityDomainFactory: SuperAdminEntityDomainFactory
  ) {
    super(superAdminModel, superAdminEntityDomainFactory);
  }
}
