// @
import { rewardArr } from '../../common/configs/ladder_building';
import { OtherReward, SignConfig } from '../../common/configs/sign';
import { gm } from './GameManager';
import { StorageBase } from './StorageBase';

//
export class SignData extends StorageBase {
    // @
    public static EVENT_DATA_CHANGE: string = "sign_data_change";
    public static MAX_DAY_COUNT: number = 30;
    public static SIGN_LOOP_DAY: number = 7;
    public static MAX_BUY_COUNT: number = 3;
    // @
    public sign_day: number;
    public sign_state: number;
    private create_time: number; // (public mode not used)
    public next_day_time: number;
    public sign_data_array: SignItemData[];
    public sign_buy_data_array: SignBuyItemData[];

    // @
    constructor() {
        super();
        this.STORAGE_KEY = "SignData"; // StorageBase
        this.sign_day = 0;
        this.sign_state = 0;
        this.create_time = 0;
        this.next_day_time = 0;
        this.sign_data_array = [];
        this.sign_buy_data_array = [];
    }

    // @, !!!type
    public async_read_data(callback?: (data: any) => void): void {
        super.async_read_data((data: any) => {
            if (this.is_init) {
                for (let i = 0; i < this.sign_data_array.length; i++) {
                    Object.setPrototypeOf(this.sign_data_array[i], SignItemData.prototype);
                }
                for (let i = 0; i < this.sign_buy_data_array.length; i++) {
                    Object.setPrototypeOf(this.sign_buy_data_array[i], SignBuyItemData.prototype);
                }
            } else {
                this.sign_day = 0;
                this.sign_state = 0;
                const date = new Date();
                const timestamp = Math.floor(date.getTime() / 1000);
                this.create_time = timestamp - (timestamp - 60 * date.getTimezoneOffset()) % 86400;
                this.next_day_time = this.create_time + 86400;
                //
                for (let i = 0; i < SignData.SIGN_LOOP_DAY; i++) {
                    const signItem = new SignItemData();
                    signItem.array_index = i;
                    signItem.day = (this.sign_day + i + 1) % SignData.MAX_DAY_COUNT;
                    signItem.state = i === 0 ? 1 : 0;
                    const rowData = gm.config.get_row_data("SignConfigData", signItem.day.toString()) as SignConfig;
                    if (rowData) {
                        signItem.reward_array = rowData.reward_array;
                    }
                    this.sign_data_array.push(signItem);
                }
                //
                for (let i = 0; i < SignData.MAX_BUY_COUNT; i++) {
                    const signBuyItem = new SignBuyItemData();
                    signBuyItem.array_index = i;
                    signBuyItem.state = 1;
                    const rowData = gm.config.get_row_data("SignConfigData", (this.sign_day + 1).toString()) as SignConfig;
                    if (rowData) {
                        signBuyItem.reward_data = rowData.other_reward_array[i];
                    }
                    this.sign_buy_data_array.push(signBuyItem);
                }
                this.is_init = true;
                this.async_write_data();
            }
            if (callback) callback(data);
        });
    } // end: async_read_data

    // @
    public async_write_data(callback?: () => void): void {
        gm.data.event_emitter.emit(SignData.EVENT_DATA_CHANGE);
        super.async_write_data(callback);
    }
}

// @, !!! reward_array: any[]
export class SignItemData {
    public array_index: number;
    public day: number;
    public state: number;
    public reward_array: rewardArr[]; // ?

    constructor() {
        this.array_index = -1;
        this.day = 0;
        this.state = 0;
        this.reward_array = [];
    }
}

// @ , !! reward_data: any
export class SignBuyItemData {
    public array_index: number;
    public state: number;
    public reward_data: OtherReward;

    constructor() {
        this.array_index = -1;
        this.state = 0;
    }
}
