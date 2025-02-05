import { Repository } from 'typeorm';
import { Address } from '../entities/adddress.entity';

export interface AddressRepository {
  this: Repository<Address>;
  getAddresses(): Promise<Address[]>;
  getAddress(id: number): Promise<Address>;
  createAddress(address: {
    street: string;
    city: string;
    country: string;
    zip: string;
  });
  findbyZip(zip: string): Promise<Address>;
}

export const customAddressRepository: Pick<AddressRepository, any> = {
  getAddress(this: Repository<Address>, id: number) {
    return this.findOne({ where: { id } });
  },

  getAddresses(this: Repository<Address>) {
    return this.find();
  },

  createAddress(this: Repository<Address>, address: Address) {
    return this.save(address);
  },

  findbyZip(this: Repository<Address>, zip: string) {
    return this.findOne({ where: { zip } });
  },
};
