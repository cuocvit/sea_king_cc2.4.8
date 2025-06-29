import { ChannelManager } from "./ChannelManager";

// @
export class ReportData {
    private static _instance: ReportData | null = null;
    //
    PREFIX: string;
    STORAGE_KEY: string;
    only_once_point_map: Record<string, number>;
    total_count_point_map: Record<string, number>;

    // @
    private constructor() {
        this.PREFIX = "P2_",
            this.STORAGE_KEY = "ReportData",
            this.only_once_point_map = {};
        this.total_count_point_map = {};
        this.read_data();
        this.write_data();
    }

    // @
    public static get instance(): ReportData {
        if (this._instance === null) {
            this._instance = new ReportData();
        }
        return this._instance;
    }

    // @
    public report_once_point(point: number): void {
        if (!this.only_once_point_map[point]) {
            this.only_once_point_map[point] = 1;
            this.write_data();
            NetUtils.report_point(point);
        }
    }

    // @
    public report_point(point: number): void {
        NetUtils.report_point(point);
    }

    // @
    public write_data(replacer?: (this: any, key: string, value: any) => any): void {
        try {
            const data = JSON.stringify(this, replacer);
            cc.sys.localStorage.setItem(this.PREFIX + this.STORAGE_KEY, data);
        } catch (error) {
            cc.error("ReportData->write_data error:", error);
        }
    }

    // @
    public read_data(): void {
        try {
            const data = cc.sys.localStorage.getItem(this.PREFIX + this.STORAGE_KEY);
            if (data) {
                let parsedData = null;
                try {
                    parsedData = JSON.parse(data);
                } catch (error) {
                    // Player data deserialization failed -> 玩家数据反序列化失败
                    console.error("ReportData->read_data error: Player data deserialization failed.");
                    return;
                }
                for (const key in parsedData) {
                    if (parsedData[key] != null) { // != null <=> !== null & !== undefined
                        if (parsedData[key] instanceof Array) {
                            this[key] = [];
                            while (parsedData[key].length > 0) {
                                this[key].push(parsedData[key].shift());
                            }
                        } else {
                            this[key] = parsedData[key];
                        }
                    }
                }
            }
        } catch (error) {
            cc.error("ReportData->read_data error:", error);
        }
    } // end: read_data

    // @
    public clear_data(): void {
        cc.sys.localStorage.removeItem(this.PREFIX + this.STORAGE_KEY);
    }
} // end: ReportData class

// @
export class NetUtils {
    public static PREFIX = "P2_";
    public static STORAGE_KEY = "GameUUID";
    public static VERSION_KEY = "Version";
    public static HEAD = "HEAD";
    public static GET = "GET";
    public static POST = "POST";

    // @
    public static http_request(
        url: string,
        method: string,
        successCallback?: (response: any, xhr: XMLHttpRequest) => void,
        errorCallback?: (error: any, xhr: XMLHttpRequest) => void,
        options?: Record<string, any>
    ): void {
        console.log("NetUtils->http_request:", method, url);
        if (Date.now() > 0) return; // Placeholder condition
        //
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = null;
                    try {
                        response = JSON.parse(xhr.responseText);
                    } catch (error) {
                        response = xhr.responseText;
                    }
                    console.log("NetUtils->http_request->onreadystatechange:", response);
                    if (typeof successCallback === "function") successCallback(response, xhr);
                } else if (xhr.status < 100 || xhr.status >= 400) {
                    if (typeof errorCallback === "function") errorCallback(null, xhr);
                }
            }
        }
        //
        if (typeof options === "object") {
            for (const key in options) {
                xhr[key] = options[key];
            }
        }
        xhr.open(method, url, true);
        xhr.send();
        // if (errorCallback) errorCallback(null, {});
    } // end: http_request

    // @
    public static generate_uuid(): string {
        return Date.now().toString(36) + "_" + Math.random().toString(36).substr(2);
    }

    // @
    public static remove_uuid(): void {
        cc.sys.localStorage.removeItem(this.PREFIX + this.STORAGE_KEY);
    }

    // @
    public static get_version(): number {
        try {
            const version = cc.sys.localStorage.getItem(this.PREFIX + this.VERSION_KEY);
            return isNaN(version) ? parseInt(version) : 0;
        } catch (error) {
            return 0;
        }
    }

    // @
    public static set_version(version: string): void {
        cc.sys.localStorage.setItem(this.PREFIX + this.VERSION_KEY, version);
    }

    // @
    public static get game_uuid(): string {
        if (!window.game_uuid) {
            window.game_uuid = cc.sys.localStorage.getItem(this.PREFIX + this.STORAGE_KEY);
            if (!window.game_uuid) {
                window.game_uuid = this.generate_uuid();
                cc.sys.localStorage.setItem(this.PREFIX + this.STORAGE_KEY, window.game_uuid);
            }
        }
        return window.game_uuid;
    }

    // @
    public static save_game_uuid(): void {
        if (window.game_uuid) {
            console.log("save Game: ", window.game_uuid);
            cc.sys.localStorage.setItem(this.PREFIX + this.STORAGE_KEY, window.game_uuid);
        }
    }

    // @
    public static get channel_name(): string {
        let platformName = "unknown";
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            platformName = window.tt ? "tt-game" : window.qq ? "qq-game" : window.wx ? "wechat-game" : "unknown";
        } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            platformName = "tt-game";
        } else {
            platformName = ChannelManager.instance.get_channel_name();
        }
        return platformName;
    }

    // @
    public static get game_app_name(): string {
        const cName = this.channel_name;
        if (cName === "tt-game") {
            return window.tt && window.tt.getSystemInfoSync ? window.tt.getSystemInfoSync().appName : "unknown";
        }
        return cName === "qq-game" ? "qq" : cName === "wechat-game" ? "wechat" : ChannelManager.instance.get_app_name();
    }

    // @
    public static report_point(point: number, value: number = 1): void {
        if (this.is_cloud_test()) {
            cc.log("NetUtils->report_point: Currently in cloud testing environment, reporting point is disabled.");
        } else if (point != null && value != null) {
            // != null <=> !== null & !== undefined
            const url = cc.js.formatStr(
                "https://gameapipy.6hwan.com/log/minigame_report/?gamename=sailing_%s&uuid=%s&op_type=%s&val=%s",
                this.game_app_name,
                this.game_uuid,
                point.toString(),
                value.toString()
            );
            this.http_request(url, this.POST);
        }
    }

    // @
    public static is_cloud_test(): boolean {
        return (typeof GameGlobal === "object" && GameGlobal.isTest);
    }
} // end: NetUtils class
