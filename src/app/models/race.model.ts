import { PonyModel } from './pony.model';

export class RaceModel {
    betPonyId?: number;
    name: string;
    ponies: Array<PonyModel>;
    id: number;
    startInstant: string;
}
