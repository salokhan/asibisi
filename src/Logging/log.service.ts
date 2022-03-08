import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from '../model/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(LogEntity)
        private readonly repo: Repository<LogEntity>,
    ) { }

    public async log(log: LogEntity): Promise<LogEntity> {
        return this.repo.save(log).then((e) => {
            return e;
        });
    }
}
