import { Repository } from 'typeorm';
import { Beach } from './beach.entity';
export declare class BeachesService {
    private beachesRepository;
    constructor(beachesRepository: Repository<Beach>);
    findAll(): Promise<Beach[]>;
    findOne(id: string): Promise<Beach>;
}
