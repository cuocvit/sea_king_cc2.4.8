// @
import { NetUtils } from './NetUtils';
import { ABTest, ItemTypeEnum } from './Constants';
import { gm } from './GameManager';
import { StorageBase } from './StorageBase';
import { ServerNoticeData } from './ServerData';

//
export class MainData extends StorageBase {
    // @
    public static EVENT_DATA_CHANGE: string = "main_data_change";
    // @ private
    private is_music_mute: boolean;
    private is_effect_mute: boolean;
    private role_map_Data: MapDataVO;
    public is_first_super_recruit: boolean;

    // @ public
    public STORAGE_KEY: string;
    public uuid: string; // (public mode not used)
    public new_store_timestamp: number; // (public mode not used)
    public store_timestamp: number = 0; // (public mode not used)
    public is_vibrate: boolean; // (public mode not used)
    public ab_test: ABTest; // (public mode not used)
    public has_watch_story: boolean; // (public mode not used)
    public story_reward: number; // (public mode not used)
    public left_share_count: number;
    public is_today_no_ad: boolean;
    public is_receive_shortcut_reward: boolean;
    public left_free_super_recruit_count: number;
    public super_recruit_count: number;
    public server_notice_data: ServerNoticeData;

    // @
    constructor() {
        super();
        this.STORAGE_KEY = "MainData", 
        this.uuid = "";
        this.new_store_timestamp = Date.now();
        this.store_timestamp = 0;
        //
        this.is_music_mute = false;
        this.is_effect_mute = false;
        this.is_vibrate = false;
        this.ab_test = ABTest.A;
        this.has_watch_story = true;
        this.story_reward = 0;
        this.left_share_count = 0;
        this.is_today_no_ad = false;
        //
        this.role_map_Data = null;
        this.is_receive_shortcut_reward = false;
        this.left_free_super_recruit_count = 0;
        this.is_first_super_recruit = true;
        this.super_recruit_count = 0;
        // this.server_notice_data = null;
    }

    // @
    public async async_read_data(callback?: (data: any) => void): Promise<void> {
        const self = this;
        super.async_read_data((data) => {
            if (self.is_init) {
                if (self.server_notice_data === null) {
                    self.server_notice_data = new ServerNoticeData();
                }
                self.left_share_count = self.left_share_count ?? gm.const.MAX_VIDEO_FAIL_SHARE_COUNT;
                self.is_today_no_ad = self.is_today_no_ad ?? false;
                self.is_receive_shortcut_reward = self.is_receive_shortcut_reward ?? false;
                self.left_free_super_recruit_count = self.left_free_super_recruit_count ?? gm.const.MAX_FREE_SUPER_RECRUIT_COUNT;
                self.super_recruit_count = self.super_recruit_count ?? 0;
                self.is_first_super_recruit = self.is_first_super_recruit ?? true;
                Object.setPrototypeOf(self.server_notice_data, ServerNoticeData.prototype);
            } else {
                self.uuid = NetUtils.generate_uuid();
                self.ab_test = Math.floor(self.new_store_timestamp / 1000) % 2 === 0 ? ABTest.A : ABTest.B;
                self.has_watch_story = false;
                self.role_map_Data = new MapDataVO();
                self.story_reward = 0;
                self.role_map_Data.col = 0;
                self.role_map_Data.row = 0;
                self.role_map_Data.mapList = [];
                self.server_notice_data = new ServerNoticeData();
                self.left_share_count = gm.const.MAX_VIDEO_FAIL_SHARE_COUNT;
                self.is_today_no_ad = false;
                self.left_free_super_recruit_count = gm.const.MAX_FREE_SUPER_RECRUIT_COUNT;
                self.super_recruit_count = 0;
                self.is_first_super_recruit = true;
                self.is_init = true;
                self.async_write_data();
            }
            gm.audio.music_mute = self.is_music_mute;
            gm.audio.music_volume = self.is_music_mute ? 0 : 1;
            gm.audio.effect_mute = self.is_effect_mute;
            gm.audio.effect_volume = self.is_effect_mute ? 0 : 1;
            if (callback) callback(data);
        });
    } // end: async_read_data

    // @
    public async async_write_data(callback?: () => void): Promise<void> {
        gm.data.event_emitter.emit(MainData.EVENT_DATA_CHANGE);
        this.store_timestamp = Date.now();
        this.is_music_mute = gm.audio.music_mute;
        this.is_effect_mute = gm.audio.effect_mute;
        super.async_write_data(callback);
    }

    // @
    public clear(): void {
        this.uuid = "";
        this.new_store_timestamp = Date.now();
        this.store_timestamp = 0;
        this.is_music_mute = false;
        this.is_effect_mute = false;
        this.is_vibrate = false;
        this.ab_test = ABTest.A;
        this.has_watch_story = true;
        this.story_reward = 0;
        this.role_map_Data = new MapDataVO();
        this.server_notice_data = new ServerNoticeData();
    }
}


// @
export class MapDataVO {
    public col: number = 0;
    public row: number = 0;
    public mapList: any[] = [];
    public itemID: number; // tvt add: sử dụng tại BuildIconItem.ts
    public itemType: ItemTypeEnum; // tvt add: sử dụng tại BuildIconItem.ts
    public cellID: number; // tvt add: sử dụng tại BuildIconItem.ts
}

// @
export class MapItemVo {}
