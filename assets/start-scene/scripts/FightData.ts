import { StorageBase } from './StorageBase';
import { gm } from './GameManager';

// @
export enum FightState {
    NONE = 0,
    RUN = 1,
    PAUSE = 2,
    SUCCESS = 3,
    FAIL = 4,
    REVIVE = 5
}

// 
export class FightData extends StorageBase {
    public static EVENT_DATA_CHANGE: string = "fight_data_change";
    //
    public STORAGE_KEY: string;
    public caves_layer: number;
    public speed_scale: number;
    public fight_count: number;

    // @
    constructor() {
        super();
        this.STORAGE_KEY = "FightData";
        this.caves_layer = 1;
        this.speed_scale = 2;
        this.fight_count = 0;
    }

    // ??
    public async_read_data(callback?: (data: any) => void): void {
        super.async_read_data((data: any) => {
            if (this.is_init) {
                if (this.fight_count == null) this.fight_count = 0;
            } else {
                this.is_init = true;
                this.async_write_data();
            }
            if (callback) callback(data);
        });
    }

    // @
    public async_write_data(callback?: () => void): void {
        gm.data.event_emitter.emit(FightData.EVENT_DATA_CHANGE);
        super.async_write_data(callback);
    }
}

///---
