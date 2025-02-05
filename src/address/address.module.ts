import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';

import { Address } from './entities/adddress.entity';
import { UserController } from 'src/user/controllers/user.controller';
import { AddressService } from './service/address.service';
import { customAddressRepository } from './repository/address.repository';
import { DataSource } from 'typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), UserModule],
  controllers: [UserController],
  providers: [
    {
      provide: getRepositoryToken(Address),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource
          .getRepository(Address)
          .extend(customAddressRepository);
      },
    },
    AddressService,
  ],
  exports: [AddressService, getRepositoryToken(Address)],
})
export class AddressModule {}
