import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../model/account.entity'; //rememeber the how to use path
import { Repository } from 'typeorm';
import { AccountDTO, createAccountDTO} from '../DTOs/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly repo: Repository<AccountEntity>,
  ) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async getOne(email: string) {
    return await this.repo.findOne({userName: email});
  }

  
  public async create(accountDto: createAccountDTO): Promise<AccountDTO> {
    accountDto['createdBy'] = 'System';
    accountDto['lastChangedBy'] = 'System';
    return this.repo.save(accountDto).then((e) => {
     return e;
    });
  }
}
