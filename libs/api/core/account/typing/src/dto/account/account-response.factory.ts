import { Injectable } from '@nestjs/common';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import {
  AccountFindAllResponse,
  AccountGrpc,
} from '../../grpc/account/account.mics';
import { AccountResponseDto } from './account-response.dto';
import { AccountCreateOneResponseBodyDto } from './create-one/response-body.dto';
import { AccountDeleteOneResponseBodyDto } from './delete-one/response-body.dto';
import { AccountFindAllResponseBodyDto } from './find-all/response-body.dto';
import { AccountFindOneResponseBodyDto } from './find-one/response-body.dto';
import { AccountUpdateOneResponseBodyDto } from './update-one/response-body.dto';

@Injectable()
export class AccountResponseDomainFactory {
  private createResponseFromDomain(data: AccountDomain): AccountResponseDto {
    return {
      id: data.id,
      role: data.role,
      displayName: data.displayName,
      email: data.email,
      organization: data.organization,
    };
  }

  private createDomainFromGrpc(data: AccountGrpc): AccountDomain {
    return new AccountDomain({
      id: data.id,
      role: data.role,
      displayName: data.displayName,
      email: data.email,
      organization: data.organization,
    });
  }

  createResponseForCreateOne(
    data: AccountDomain
  ): AccountCreateOneResponseBodyDto {
    return this.createResponseFromDomain(data);
  }

  createResponseForFindAll(
    data: AccountFindAllResponse
  ): AccountFindAllResponseBodyDto {
    return {
      accounts: data.accounts.map((account) =>
        this.createResponseFromDomain(this.createDomainFromGrpc(account))
      ),
      next_page_cursor: data.next_page_cursor,
    };
  }

  createResponseForFindOne(data: AccountDomain): AccountFindOneResponseBodyDto {
    return this.createResponseFromDomain(data);
  }

  createResponseForUpdateOne(
    data: AccountDomain
  ): AccountUpdateOneResponseBodyDto {
    return this.createResponseFromDomain(data);
  }

  createResponseForDeleteOne(
    data: AccountDomain
  ): AccountDeleteOneResponseBodyDto {
    return this.createResponseFromDomain(data);
  }
}
