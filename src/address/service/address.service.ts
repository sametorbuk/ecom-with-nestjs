import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from '../repository/address.repository';
import { Address } from '../entities/adddress.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: AddressRepository,
  ) {}

  getAddresses() {
    return 'All addresses';
  }

  getAddress(id: number) {
    return `Address ${id}`;
  }

  createAddress(address: {
    street: string;
    city: string;
    country: string;
    zip: string;
  }) {
    return `Address created: ${address.street}, ${address.city}, ${address.country}, ${address.zip}`;
  }

  findByZip(zip: string) {
    return `Address with zip ${zip}`;
  }
}
