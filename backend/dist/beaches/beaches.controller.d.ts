import { BeachesService } from './beaches.service';
import { Beach } from './beach.entity';
export declare class BeachesController {
    private readonly beachesService;
    constructor(beachesService: BeachesService);
    findAll(): Promise<Beach[]>;
    findOne(id: string): Promise<Beach>;
}
