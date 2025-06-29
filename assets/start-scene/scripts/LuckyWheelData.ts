//
import { gm } from './GameManager';
import { StorageBase } from './StorageBase';

// @
export class LuckyWheelData extends StorageBase {
    public static EVENT_DATA_CHANGE: string = "hero_data_change";
    //
    public left_lucky_wheel_free_count: number;
    public left_lucky_wheel_video_count: number;
    public free_timestamp: number;
    public last_reward_index: number;

    // @
    constructor() {
        super();
        this.STORAGE_KEY = "LuckyWheelData";
        this.left_lucky_wheel_free_count = 0;
        this.left_lucky_wheel_video_count = 0;
        this.free_timestamp = 0;
        this.last_reward_index = 0;
        this.is_init = false;
    }

    // @
    public async_read_data<T>(callback?: (data: T) => void): void {
        super.async_read_data((data: T) => {
            if (!this.is_init) {
                this.is_init = true;
                this.left_lucky_wheel_free_count = gm.const.MAX_LUCKY_WHEEL_FREE_COUNT;
                this.left_lucky_wheel_video_count = gm.const.MAX_LUCKY_WHEEL_VIDEO_COUNT;
                this.free_timestamp = Date.now();
                this.last_reward_index = 0;
                this.async_write_data();
            } else {
                if (this.free_timestamp === null || this.free_timestamp === undefined) {
                    this.free_timestamp = Date.now();
                }
            }
            if (callback) callback(data);
        });
    }

    // @
    public async_write_data(callback?: () => void): void {
        gm.data.event_emitter.emit(LuckyWheelData.EVENT_DATA_CHANGE);
        super.async_write_data(callback);
    }
}
