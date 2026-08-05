import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Beach } from './beach.entity';
export declare class BeachesSeed implements OnModuleInit {
    private beachesRepository;
    constructor(beachesRepository: Repository<Beach>);
    onModuleInit(): Promise<void>;
}
