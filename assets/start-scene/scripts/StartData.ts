import { gm } from "./GameManager";
import { StorageBase } from "./StorageBase";

export class StartData extends StorageBase {
    public static readonly EVENT_DATA_CHANGE: string = "start_data_change";
    public static readonly BUILDING_UPGRADE: string = "building_upgrade";

    public user_subscribe_message_stat: number;

    constructor() {
        super();
        this.STORAGE_KEY = "StartData";
        this.user_subscribe_message_stat = 0;
    } 
    public async_read_data<T>(callback?: (data: T) => void): void {
        super.async_read_data((data: T) => {
            if (!this.is_init) {
                this.is_init = true;
                this.async_write_data();
            }
            if (typeof callback === "function") callback(data);
        });
    }

    public async_write_data(callback?: () => void): void {
        gm.data.event_emitter.emit(StartData.EVENT_DATA_CHANGE);
        super.async_write_data(callback);
    }
}