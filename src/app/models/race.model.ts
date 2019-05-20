import { PonyModel, PonyWithPositionModel } from './pony.model';

export interface RaceModel {
    betPonyId?: number;
    name: string;
    ponies: Array<PonyModel>;
    id: number;
    startInstant: string;
}

export interface LiveRaceModel {
    betPonyId?: number;
    name: string;
    ponies: Array<PonyWithPositionModel>;
    id: number;
    startInstant: string;
}
