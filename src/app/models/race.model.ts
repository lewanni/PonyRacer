import { PonyModel } from './pony.model';

export class RaceModel {
    name: string;
    ponies: Array<PonyModel>;
    id: number;
    startInstant: string;
}
