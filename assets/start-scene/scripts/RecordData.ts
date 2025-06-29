import { StorageBase } from './StorageBase';
import { RewardIdEnum } from './Constants';
import { gm } from './GameManager';

// @
export class WarehouseItemData {
    public id: number;
    public value: number;

    constructor() {
        this.id = 0;
        this.value = 0;
    }
}

// @
export class RecordData extends StorageBase {
    public static EVENT_DATA_CHANGE: string = "record_data_change";
    public static RECORD_STATE_CHANGE: string = "record_state_change";
    public static AUTO_END_RECORD_TIME: number = 20;
    public static MIN_RECORD_TIME: number = 5;
    //
    public STORAGE_KEY: string;
    public share_record_count: number;
    public left_push_share_count: number;
    public reward_array: WarehouseItemData[];
    public reward_data: WarehouseItemData;
    public push_share_reward_data: WarehouseItemData;
    public record_state: number;
    public record_type: number;
    public record_timestamp: number;
    public is_init: boolean;

    // @
    constructor() {
        super();
        this.STORAGE_KEY = "RecordData";
        this.share_record_count = 0;
        this.left_push_share_count = 0;
        this.reward_array = [];
        this.record_state = 0;
        this.record_type = 0;
        this.record_timestamp = 0;
        this.is_init = false;
    }

    //
    public async_read_data<T>(callback?: (data: T) => void): void {
        const self = this;
        super.async_read_data((data: T) => {
            if (self.is_init) {
                for (let i = 0; i < self.reward_array.length; i++) {
                    Object.setPrototypeOf(self.reward_array[i], WarehouseItemData.prototype);
                }
                Object.setPrototypeOf(self.reward_data, WarehouseItemData.prototype);
            } else {
                self.reward_data = new WarehouseItemData();
                self.reward_data.id = RewardIdEnum.GOLD;
                self.reward_data.value = 100;
                //
                self.push_share_reward_data = new WarehouseItemData();
                self.push_share_reward_data.id = RewardIdEnum.DIAMOND;
                self.push_share_reward_data.value = 100;
                self.share_record_count = 0;
                self.left_push_share_count = gm.const.MAX_PUSH_SHARE_COUNT;
                self.is_init = true;
                self.async_write_data();
            }
            self.record_state = 0;
            self.record_timestamp = 0;
            self.record_type = 0;
            if (callback) callback(data);
        });
    }

    // @
    public async_write_data(callback?: () => void): void {
        gm.data.event_emitter.emit(RecordData.EVENT_DATA_CHANGE);
        super.async_write_data(callback);
    }
}
