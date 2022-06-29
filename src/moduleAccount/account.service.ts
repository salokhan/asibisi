import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../model/account.entity'; //rememeber the how to use path
import { Repository } from 'typeorm';
import { AccountDTO, createAccountDTO } from '../dtos/account.dto';
import { AccountProfileDTO, createAccountProfileAddressDTO, createAccountProfileDTO } from '../dtos/account.profile.dto';
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

  public async getAllAccounts() {
    return await this.repo.find();
  }

  public async getAccountByCredential(userName: string, password: string) {
    let result = await this.repo.findOne({userName, password});
    if (result) {
      return result;
    } else {
      return undefined;
    }
  }
  
  public async getAccountByUserName(userName: string) {
    return await this.repo.findOne({ userName: userName });
  }

  public async findAccountById(id: string) {
    return await this.repo.findOne({ id });
  }

  public async findAccountProfileById(id: string) {
    return await this.profileRepo.find({ id });
  }

  public async getAccountProfileByAccountId(id: string): Promise<AccountProfileDTO> {
    let result = await (await this.repo.findOne(id, { relations: ["profile"] }));
    if (result) {
      return result.profile;
    } else {
      return undefined;
    }

  }

  public async getAccountProfileAddressByProfileId(id: string) {
    let result = await this.profileRepo.findOne(id, { relations: ["address"] });
    if (result) {
      return result.address;
    } else {
      return undefined;
    }
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

    const user = await this.repo.findOne(id, { relations: ["profile"] });
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

    const userProfile = await this.profileRepo.findOne(id, { relations: ["address"] });
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
