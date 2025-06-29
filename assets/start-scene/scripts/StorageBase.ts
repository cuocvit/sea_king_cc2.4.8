// @
import { StorageManager } from './StorageManager';

// @
export class StorageBase {
    private static _instance: any = null;
    // @
    public readonly PREFIX: string;
    public STORAGE_KEY: string;
    protected is_init: boolean;

    // @
    protected constructor() {
        this.PREFIX = "P2_";
        this.STORAGE_KEY = "STORAGE_KEY";
        this.is_init = false;
    }

    // @
    // _instance = new this() [không sử dụng new StorageBase()], tạo một instance của class con đang gọi hàm get_instance()
    public static get_instance<T>(): T {
        if (!this._instance) {
            this._instance = new this() as T;
        }
        return this._instance;
    }

    // @
    protected async_read_data<T>(callback?: (data: T) => void): void {
        StorageManager.instance.async_read_data<T>(this.PREFIX + this.STORAGE_KEY, (data: T) => {
            Object.assign(this, data);
            // cc.log("StorageBase->async_read_data->success:", this.STORAGE_KEY, data, this);
            if (typeof callback === "function") callback(data);
        });
    }

    // @
    protected async_write_data(callback?: () => void): void {
        // cc.log("StorageBase->async_write_data:", this.STORAGE_KEY);
        StorageManager.instance.async_write_data(this.PREFIX + this.STORAGE_KEY, this, callback);
    }

    // @
    public async_delete_data(callback?: () => void): void {
        StorageManager.instance.async_delete_data(this.PREFIX + this.STORAGE_KEY, callback);
    }
}
