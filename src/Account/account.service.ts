import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../model/account.entity'; //rememeber the how to use path
import { Repository } from 'typeorm';
import { AccountDTO, createAccountDTO } from '../DTOs/account.dto';
import { AccountProfileDTO, createAccountProfileAddressDTO, createAccountProfileDTO } from '../DTOs/account.profile.dto';
import { ProfileEntity } from '../model/profile.entity';
import { AddressEntity } from '../model/address.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
     private readonly repo: Repository<AccountEntity>, 
    @InjectRepository(ProfileEntity)
     private profileRepo: Repository<ProfileEntity>,
     @InjectRepository(AddressEntity)
     private addressRepo: Repository<AddressEntity>
  ) { }

  public async getAll() {
    return await this.repo.find();
  }

  public async findAccount(email: string) {
    return await this.repo.findOne({ userName: email });
  }

  public async findAccountById(id: string) {
    return await this.repo.findOne({ id });
  }

  public async findAccountProfileById(id: string) {
    return await this.profileRepo.findOne({ id });
  }

  public async findAccountProfile(id: string) {
    return await this.repo.findOne( id, {relations: ["profile"]});
  }

  public async findAccountProfileAddress(id: string) {
    return await this.profileRepo.findOne( id, {relations: ["address"]});
  }


  public async createAccount(accountDto: createAccountDTO): Promise<AccountDTO> {
    accountDto['createdBy'] = 'System';
    accountDto['lastChangedBy'] = 'System';
    return this.repo.save(accountDto).then((e) => {
      return e;
    });
  }

  public async createAccountProfile(id: string, accountProfileDto: createAccountProfileDTO): Promise<AccountProfileDTO> {
    accountProfileDto['createdBy'] = 'System';
    accountProfileDto['lastChangedBy'] = 'System';

    const user = await this.repo.findOne( id ,{ relations: ["profile"] });
    const userProfile = new ProfileEntity();
    userProfile.firstName = accountProfileDto.firstName;
    userProfile.lastName = accountProfileDto.lastName;
    userProfile.profileName = accountProfileDto.profileName;
    userProfile.contactNumber = accountProfileDto.contactNumber;
    userProfile.createdBy = 'System';
    userProfile.lastChangedBy = 'System';

    const newProfile = await this.profileRepo.save(userProfile);
    user.profile = newProfile;
    return await (await this.repo.save(user)).profile;

   
  }

  public async createAccountProfileAddress(id: string, accountProfileAddressDto: createAccountProfileAddressDTO): Promise<createAccountProfileAddressDTO> {
    accountProfileAddressDto['createdBy'] = 'System';
    accountProfileAddressDto['lastChangedBy'] = 'System';

    const userProfile = await this.profileRepo.findOne( id ,{ relations: ["address"] });
    const userAddress = new AddressEntity();
    userAddress.countryId = accountProfileAddressDto.countryId;
    userAddress.countryName = accountProfileAddressDto.countryName;
    userAddress.stateId = accountProfileAddressDto.stateId;
    userAddress.stateName = accountProfileAddressDto.stateName;
    userAddress.cityId = accountProfileAddressDto.cityId;
    userAddress.cityName = accountProfileAddressDto.cityName;
    userAddress.addressDetails = accountProfileAddressDto.addressDetails;
    userAddress.createdBy = 'System';
    userAddress.lastChangedBy = 'System';

    const newAddress = await this.addressRepo.save(userAddress);
    userProfile.address = newAddress;
    return await (await this.profileRepo.save(userProfile)).address;

   
  }

  
}
