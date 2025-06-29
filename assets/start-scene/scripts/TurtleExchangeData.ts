import { StorageBase } from './StorageBase';
import { gm } from './GameManager';
import { RewardIdEnum } from './Constants';

// @
export class TurtleExchangeItemData {
    public prop_id: number = 0;
    public prop_num: number = 0;
    public exchange_prop_id: number = RewardIdEnum.GOLD_BARREL;
    public exchange_prop_num: number = 1;
    public state: number = 0;
}

// @
export class TurtleExchangeData extends StorageBase {
    public static EVENT_DATA_CHANGE: string = "turtle_exchange_data_change";
    public static turtle_exchange_data_array: TurtleExchangeItemData[] = [];
    //
    public left_refresh_count: number;

    // @
    constructor() {
        super();
        this.STORAGE_KEY = "TurtleExchangeData";
        this.left_refresh_count = 0;
    }

    // @
    public async_read_data(callback?: (data: any) => void): void {
        super.async_read_data((data) => {
            if (!this.is_init) {
                this.left_refresh_count = gm.const.TURTLE_EXCHANGE_MAX_REFRESH_COUNT;
                this.is_init = true;
                this.async_write_data();
            }
            if (callback) callback(data);
        });
    }

    // @
    public async_write_data(callback?: () => void): void {
        gm.data.event_emitter.emit(TurtleExchangeData.EVENT_DATA_CHANGE);
        super.async_write_data(callback);
    }

    // @
    public get_turtle_exchange_data_array(): TurtleExchangeItemData[] {
        const exchangeDataArray = TurtleExchangeData.turtle_exchange_data_array;
        if (exchangeDataArray.length === 0) {
            for (let i = 0; i < gm.const.TURTLE_EXCHANGE_ITEM_DATA_ARRAY.length; i++) {
                const itemData = gm.const.TURTLE_EXCHANGE_ITEM_DATA_ARRAY[i];
                const newItem = new TurtleExchangeItemData();
                newItem.prop_id = itemData.prop_id;
                newItem.prop_num = itemData.prop_num;
                newItem.exchange_prop_id = itemData.exchange_prop_id;
                newItem.exchange_prop_num = itemData.exchange_prop_num;
                exchangeDataArray.push(newItem);
            } 
        }

        for (let i = 0; i < exchangeDataArray.length; i++) {
            const item = exchangeDataArray[i];
            item.state = gm.data.mapCell_data.getMertrailIDCount(item.prop_id) >= item.prop_num ? 1 : 0;
        }

        return exchangeDataArray;
    }
}
