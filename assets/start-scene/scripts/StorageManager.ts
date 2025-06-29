
// @
import * as encryptjs from "../../scripts/libs/encryptjs/js1/encryptjs";

/* 
// test encryptjs
const txt = "Hello World";
const t1 = encryptjs.base64Encode(txt);
const t2 = encryptjs.base64Decode(t1);
console.log("encryptjs-----------------------", t1, t2); */

// @
interface ISMSettings {
    total_storage_size: number;
    single_storage_size: number;
}

// @
class DebugInfo {
    cost_time_array: number[];

    constructor() {
        this.cost_time_array = [];
    }
}

// @
export class StorageManager {
    // @
    private static _instance: StorageManager = null;
    private readonly _debug: boolean;
    private readonly _debug_info_map: Record<string, DebugInfo>;
    private readonly _settings: Readonly<ISMSettings>;
    private readonly _encrypt_key: string;

    // @
    private constructor() {
        this._debug = true;
        this._debug_info_map = {};
        this._settings = { total_storage_size: 10485760, single_storage_size: 1048576 };
        this._encrypt_key = "3EyXvjUyd5eGLJHI9jcfTXQisawU48A9";
    }

    // @
    public static get instance(): StorageManager {
        return this._instance || (this._instance = new StorageManager());
    }

    // @@
    public async_read_data<T>(key: string, callback?: (data: T) => void): void {
        let data = {} as T;
        if (!key || typeof key !== "string") {
            cc.error("StorageManager->async_read_data: invalid key");
            return;
        }
        // debug1
        const debugKey: string = "async_read_data " + key;
        let startTime = 0;
        if (this._debug) {
            const debugInfo: DebugInfo = this._debug_info_map[debugKey];
            if (!debugInfo) {
                this._debug_info_map[debugKey] = new DebugInfo();
            }
            startTime = Date.now();
        }
        // base
        let dataString: string = "{}";
        try {
            const newKey: string = this._debug ? key : encryptjs.base64Encode(key);
            dataString = cc.sys.localStorage.getItem(newKey);
            // dataString = null; 
            // console.error(dataString);
            if (dataString && !this._debug) {
                dataString = encryptjs.decrypt(dataString, this._encrypt_key, 256);
                cc.log("StorageManager->async_read_data->try.decryption.dataString->success:", dataString);
            }
        } catch (error) {
            cc.error("StorageManager->async_read_data->try.decryption.dataString->error:", error);
        }
        //
        try {
            if (dataString) {
                data = JSON.parse(dataString);
            }
        } catch (error) {
            cc.error("StorageManager->async_read_data->JSON.parse->error:", error);
        }
        // debug2
        if (this._debug) {
            const debugInfo: DebugInfo = this._debug_info_map[debugKey];
            debugInfo.cost_time_array.push(Date.now() - startTime);
        }
        //
        if (typeof callback === "function") callback(data);
    } // end: async_read_data

    // @@
    public async_write_data(key: string, data: object, callback?: () => void): void {
        if (!key || typeof key !== "string") {
            cc.error("StorageManager->async_write_data: invalid key");
            return;
        }
        // debug1
        const debugKey: string = "async_write_data " + key;
        let startTime = 0;
        if (this._debug) {
            const debugInfo: DebugInfo = this._debug_info_map[debugKey];
            if (!debugInfo) {
                this._debug_info_map[debugKey] = new DebugInfo();
            }
            startTime = Date.now();
        }
        // base
        let dataString: string = "{}";
        try {
            dataString = JSON.stringify(data);
            if (dataString && !this._debug) {
                dataString = encryptjs.encrypt(dataString, this._encrypt_key, 256);
                cc.log("StorageManager->async_write_data->try.encryption.dataString->success:", dataString);
            }
        } catch (error) {
            cc.error("StorageManager->async_write_data->try.encryption.dataString->error:", error);
        }
        //
        if (dataString.length > this._settings.single_storage_size && this.string_byte_length(dataString) > this._settings.single_storage_size) {
            cc.error("StorageManager->async_write_data->The length of a single key data exceeds the maximum length allowed for storage " + this._settings.single_storage_size + " bytes");
            return;
        }
        //
        try {
            const newKey: string = this._debug ? key : encryptjs.base64Encode(key);
            // console.log("setItem: ", dataString);
            cc.sys.localStorage.setItem(newKey, dataString);
        } catch (error) {
            cc.error("StorageManager->async_write_data->try.localStorage.setItem->error:", error);
        }
        // debug2
        if (this._debug) {
            const debugInfo: DebugInfo = this._debug_info_map[debugKey];
            debugInfo.cost_time_array.push(Date.now() - startTime);
        }
        //
        if (typeof callback === "function") callback();
    } // end: async_write_data

    // @@
    public async_delete_data(key: string, callback?: () => void): void {
        if (!key || typeof key !== "string") {
            cc.error("StorageManager->async_delete_data: invalid key");
            return;
        }
        // debug1
        const debugKey: string = "async_delete_data " + key;
        let startTime = 0;
        if (this._debug) {
            const debugInfo: DebugInfo = this._debug_info_map[debugKey];
            if (!debugInfo) {
                this._debug_info_map[debugKey] = new DebugInfo();
            }
            startTime = Date.now();
        }
        // base
        try {
            cc.sys.localStorage.removeItem(key);
        } catch (error) {
            cc.error("StorageManager->async_delete_data->try.localStorage.removeItem->error:", error);
        }
        // debug2
        if (this._debug) {
            const debugInfo: DebugInfo = this._debug_info_map[debugKey];
            debugInfo.cost_time_array.push(Date.now() - startTime);
        }
        if (typeof callback === "function") callback();
    } // end: async_delete_data

    // @ (not used)
    /* public async_read_remote_data(): void {
        cc.error("StorageManager->async_read_remote_data->This method has not yet been implemented");
    } */

    // @ (not used)
    /* public async_write_remote_data(): void {
        cc.error("StorageManager->async_write_remote_data->This method has not yet been implemented");
    } */

    // @ (not used)
    /* public async_delete_remote_data(): void {
        cc.error("StorageManager->async_delete_remote_data->This method has not yet been implemented");
    } */

    // @@
    public print_debug_info(): void {
        if (!this._debug) return;
        for (const key in this._debug_info_map) {
            const debugInfo: DebugInfo = this._debug_info_map[key];
            cc.log(key + " execute times:" + debugInfo.cost_time_array.length);
            cc.log(JSON.stringify(debugInfo));
        }
    }

    // @
    private string_byte_length(str: string): number {
        const strLength: number = typeof str === "string" ? str.length : 0;
        if (!strLength) return 0;
        let length: number = 0;
        for (let i = 0; i < strLength; i++) {
            length += str.charCodeAt(i) > 255 ? 2 : 1;
        }
        return length;
    }
} // end: StorageManager

// @
const _window: Window = (typeof window !== "undefined") ? window : (typeof globalThis !== "undefined") ? globalThis as Window & typeof globalThis : (typeof self !== "undefined") ? self : undefined;
if (_window) _window.StorageManager = StorageManager;