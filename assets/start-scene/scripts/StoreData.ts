import { StorageBase } from './StorageBase';
import { gm } from './GameManager';
import { BuildTypeEnum } from './Constants';
import { Config } from './ConfigManager';
import { ShopConfig } from '../../common/configs/shop';

// @
export class StoreItemData {
    id: number = 0;
    count: number = 0;
    video_count: number = 0;
    index: number = 0;
}

// @
export class StoreData extends StorageBase {
    public static EVENT_DATA_CHANGE: string = "store_data_change";
    public static STORE_STATE_CHANGE: string = "store_state_change";
    //
    public STORAGE_KEY: string = "StoreData";
    public refresh_time: number = 0;
    public store_array: StoreItemData[] = [];
    public daily_store_array: StoreItemData[] = [];
    public video_store_array: StoreItemData[] = [];
    public diamond_store_array: StoreItemData[] = [];
    public isFree: boolean = true;

    // @
    public async_read_data(callback?: (data: any) => void): void {
        super.async_read_data((data) => {
            if (this.is_init) {
                for (let i = 0; i < this.store_array.length; i++) {
                    Object.setPrototypeOf(this.store_array[i], StoreItemData.prototype);
                }
                for (let i = 0; i < this.daily_store_array.length; i++) {
                    Object.setPrototypeOf(this.daily_store_array[i], StoreItemData.prototype);
                }
                for (let i = 0; i < this.video_store_array.length; i++) {
                    Object.setPrototypeOf(this.video_store_array[i], StoreItemData.prototype);
                }
                for (let i = 0; i < this.diamond_store_array.length; i++) {
                    Object.setPrototypeOf(this.diamond_store_array[i], StoreItemData.prototype);
                }
                if (gm.data.mapCell_data.buildData[BuildTypeEnum.STALL_TYPE] &&
                    gm.data.mapCell_data.buildData[BuildTypeEnum.STALL_TYPE].buildLvl > 0 &&
                    this.refresh_time <= Math.floor(Date.now() / 1000)) {
                    this.refresh_store();
                }
            } else {
                this.is_init = true;
            }
            callback && callback(data);
        });
    }

    // @
    public updateStore(id: number, count: number): void {
        for (let i = 0; i < this.store_array.length; i++) {
            if (id === this.store_array[i].id) {
                this.store_array[i].count++;
                return;
            }
        }
        const item = new StoreItemData();
        item.id = id;
        item.count = count;
        this.store_array.push(item);
        this.async_write_data();
    }

    // @
    public updateDailyStore(id: number, count: number): void {
        for (let i = 0; i < this.daily_store_array.length; i++) {
            if (id === this.daily_store_array[i].id) {
                this.daily_store_array[i].count++;
                return;
            }
        }
        const item = new StoreItemData();
        item.id = id;
        item.count = count;
        this.daily_store_array.push(item);
        this.async_write_data();
    }

    // @
    public updateVideoStore(id: number, count: number, videoCount: number): void {
        for (let i = 0; i < this.video_store_array.length; i++) {
            if (id === this.video_store_array[i].id) {
                this.video_store_array[i].count += count;
                this.video_store_array[i].video_count = videoCount === 0 ? 0 : this.video_store_array[i].video_count + videoCount;
                return;
            }
        }
        const item = new StoreItemData();
        item.id = id;
        item.count = count;
        item.video_count = videoCount;
        this.video_store_array.push(item);
        this.async_write_data();
    }

    // @
    public updateDiamondStore(id: number, count: number): void {
        for (let i = 0; i < this.diamond_store_array.length; i++) {
            if (id === this.diamond_store_array[i].id) {
                this.diamond_store_array[i].count++;
                return;
            }
        }
        const item = new StoreItemData();
        item.id = id;
        item.count = count;
        this.diamond_store_array.push(item);
        this.async_write_data();
    }

    // @
    public getStoreCount(id: number): number {
        for (let i = 0; i < this.store_array.length; i++) {
            if (id === this.store_array[i].id) {
                return this.store_array[i].count;
            }
        }
        return 0;
    }

    // @
    public getDailyStoreCount(id: number): number {
        for (let i = 0; i < this.daily_store_array.length; i++) {
            if (id === this.daily_store_array[i].id) {
                return this.daily_store_array[i].count;
            }
        }
        return 0;
    }

    // @
    public getVideoStoreCount(id: number): number {
        for (let i = 0; i < this.video_store_array.length; i++) {
            if (id === this.video_store_array[i].id) {
                return this.video_store_array[i].count;
            }
        }
        return 0;
    }

    // @
    private getVideoCount(id: number): number {
        for (let i = 0; i < this.video_store_array.length; i++) {
            if (id === this.video_store_array[i].id) {
                return this.video_store_array[i].video_count;
            }
        }
        return 0;
    }

    // @
    public getDimondStoreCount(id: number): number {
        for (let i = 0; i < this.diamond_store_array.length; i++) {
            if (id === this.diamond_store_array[i].id) {
                return this.diamond_store_array[i].count;
            }
        }
        return 0;
    }

    // @ !!! any
    private refreshStoreId(data: ShopConfig[], shopType: number): number[] {
        const ids: number[] = [];
        for (let i = 0; i < data.length; ++i) {
            if (data[i].shop_type === shopType) {
                if (!ids.includes(data[i].shop_id)) ids.push(data[i].shop_id);
            }
        }
        return ids;
    }

    // @
    public refresh_store(): void {
        this.isFree = true;
        gm.ui.emit("refresh_red_tips_stall");
        this.refresh_time = Math.floor(Date.now() / 1000) + gm.const.STORE_REFRESH_TIME;
        this.store_array.splice(0, this.store_array.length);
        this.daily_store_array.splice(0, this.daily_store_array.length);
        this.video_store_array.splice(0, this.video_store_array.length);
        this.diamond_store_array.splice(0, this.diamond_store_array.length);
        //
        const towerData = gm.data.mapCell_data.buildData[BuildTypeEnum.TOWER_TYPE];
        const availableItems: ShopConfig[] = [];
        const shopConfig: Config = gm.config.get_config_data("ShopConfigData");

        for (const key in shopConfig.data) {
            const item = shopConfig.data[key] as ShopConfig;
            if (item.lv === towerData.buildLvl) {
                availableItems.push(item);
            }
        }
        //
        const randHalf = Math.random() < 0.5;
        const randIdsType1 = this.refreshStoreId(availableItems, randHalf ? 1 : 2);
        const randIdsType2 = this.refreshStoreId(availableItems, randHalf ? 2 : 1);
        //
        const item01 = new StoreItemData();
        item01.id = randIdsType1[Math.floor(Math.random() * randIdsType1.length)],
            item01.count = 0;
        item01.index = 0;
        this.store_array.push(item01);
        //
        const item02 = new StoreItemData();
        item02.id = randIdsType2[Math.floor(Math.random() * randIdsType2.length)];
        item02.count = 0;
        item02.index = 1;
        this.store_array.push(item02);
        //
        for (let i = 3; i <= 6; ++i) {
            const ids = this.refreshStoreId(availableItems, i);
            if (ids.length > 0) {
                const newItem = new StoreItemData();
                newItem.id = ids[Math.floor(Math.random() * ids.length)];
                newItem.count = 0;
                newItem.index = i - 1;
                this.store_array.push(newItem);
            }
        }
        //
        const specialIds = this.refreshStoreId(availableItems, 101);
        const dailyItem = new StoreItemData();
        dailyItem.id = specialIds[Math.floor(Math.random() * specialIds.length)];
        dailyItem.count = 0;
        dailyItem.index = 0;
        this.daily_store_array.push(dailyItem);
        //
        const uniqueTypes: number[] = [];
        for (let i = 0; i < availableItems.length; ++i) {
            if (availableItems[i].shop_type > 150 && availableItems[i].shop_type < 200) {
                if (!uniqueTypes.includes(availableItems[i].shop_type)) {
                    uniqueTypes.push(availableItems[i].shop_type);
                }
            }
        }
        const selectedTypes: number[] = [];
        for (let i = 0; i < 3; ++i) {
            const randomIndex = Math.floor(Math.random() * uniqueTypes.length);
            selectedTypes.push(uniqueTypes[randomIndex]);
            uniqueTypes.splice(randomIndex, 1);
        }
        //
        for (let i = 0; i < 3; ++i) {
            const ids = this.refreshStoreId(availableItems, selectedTypes[i]);
            const newItem = new StoreItemData();
            newItem.id = ids[Math.floor(Math.random() * ids.length)];
            newItem.count = 0;
            newItem.index = i + 1;
            this.daily_store_array.push(newItem);
        }
        //
        for (let i = 200; i <= 203; ++i) {
            const ids = this.refreshStoreId(availableItems, i);
            const newItem = new StoreItemData();
            newItem.id = ids[Math.floor(Math.random() * ids.length)];
            newItem.count = 0;
            newItem.index = i - 200;
            this.video_store_array.push(newItem);
        }
        //
        for (let i = 300; i <= 303; ++i) {
            const ids = this.refreshStoreId(availableItems, i);
            const newItem = new StoreItemData();
            newItem.id = ids[Math.floor(Math.random() * ids.length)];
            newItem.count = 0;
            newItem.index = i - 300;
            this.diamond_store_array.push(newItem);
        }
        //
        this.async_write_data();
    } // end: refresh_store

    // @
    public async_write_data(callback?: () => void): void {
        gm.data.event_emitter.emit(StoreData.EVENT_DATA_CHANGE);
        super.async_write_data(callback);
    }
}
