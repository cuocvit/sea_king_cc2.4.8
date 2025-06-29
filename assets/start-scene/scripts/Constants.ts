import { BuyItemData } from "../../buy/scripts/data";

// @@
export enum ModuleType {
    SCENE = 0,
    WINDOW = 1,
    VIEW = 2,
    BOTTOM = 3,
}

// @@
export enum LayerType {
    SCENE = 0,
    UI = 1,
    TOP = 2,
    DRAG = 3,
}

// @@
export enum RewardIdEnum {
    STAR = 11001,
    GOLD = 11002,
    DIAMOND = 11003,
    WOOD = 11004,
    IRON = 11005,
    BARREL = 11006,
    SILVER_BARREL = 11007,
    GOLD_BARREL = 11008,
}

// @@
export enum BundleName {
    COMMON = "common",
    LOADING = "loading",
    Login = "login",
    GUIDE = "guide",
    START = "start",
    FIGHT = "fight",
    LADDER = "ladder",
    STORE = "store",
    TASK = "task",
    SIGN = "sign",
    Buy = "buy",
    SETTINGS = "settings",
    MAIL = "mail",
    RECORD = "record",
    LUCKY_WHEEL = "lucky_wheel",
    TEST = "test",
    MAP = "map",
    BUILD_FUNCTION = "buildFunction",
    SPECIAL_BUILD = "special_build",
    BOOK = "book",
    DEBUG = "debug",
    GUIDEGIFT = "guideGift",
    ADD_DESKTOP = "add_desktop",
    SUPER_RECRUIT = "super_recruit",
}

// @@
export enum ABTest {
    A = "a_test",
    B = "b_test",
}

// @@
export enum ItemTypeEnum {
    ITEM_TYPE = 1,
    BUILD_TYPE = 2,
    HERO_TYPE = 3,
}

// @@
export enum SetItemNumEnum {
    ADD_ITEM_TYPE = 1,
    REDUCE_ITEM_TYPE = 2,
}

// @@
export enum BuildTypeEnum {
    TOWER_TYPE = 1,
    BARRACKS_TYPE = 2,
    PRIVATEHOUSING_TYPE = 3,
    LOGGINGFIELD_TYPE = 4,
    MININGWELL_TYPE = 5,
    GARRISION_TYPE = 6,
    STALL_TYPE = 7,
    WALL_TYPE = 8,
    WHARFTAX_TYPE = 9,
    SEAGOINGBOAT_TYPE = 10,
    FISHHOUSE_TYPE = 31,
    FARMHOUSE_TYPE = 32,
    WORKHOUSE_TYPE = 33,
}

// @@
export enum PropTypeEnum {
    WOOD_TYPE = 1,
    IRON_TYPE = 2,
    COIN_TYPE = 3,
    DIAMONDS_TYPE = 4,
    STAR_TYPE = 5,
    BARRIL_TYPE = 6,
    KEY_TYPE = 7,
    SHIPANCHORL_TYPE = 8,
    HORN_TYPE = 9,
    JAR_TYPE = 10,
    WEAPON_TYPE = 11,
    FLOWER_TYPE = 12,
    STATUE_TYPE = 13,
    SHELL_TYPE = 14,
    SOUL_TYPE = 15,
    SHELL_MONEY_TYPE = 17,
    STONE_HERO_TYPE = 18,
    FOUNTAIN_TYPE = 19,
    BOX = 20,
}

// @@
export enum SpecialEnum {
    SPIRIT_TYPE = 1,
    CAVES_TYPE = 2,
    ICE_TYPE = 3,
    FIRE_TYPE = 4,
    TORTOISE_TYPE = 5,
}

// @@
export enum HeroTypeEnum {
    NORMAL_TYPE = 0,
    SUPER_HERO_TYPE = 1,
    WALL_TYPE = 2,
}

/* không sử dụng
// @
export enum LoadingMode {
    NONE = 0,
    FULL_SCREEN = 1
}
// @
export enum TaskTypeEnum {
    TASK_ACHIVEMENT = 1,
    TASK_DAILY = 2
}
// @
export enum TaskStateEnum {
    ACCEPT = 0,
    FINISH = 1,
    GOT_REWARD = 2
}
// @
export enum HeroTabType {
    HERO = 0,
    UPGRADE = 1,
    UPGRADE_STAR = 2,
    SCIENCE = 3
}
*/

// @ (new)
export interface INotice {
    key: string;
    bundle_name: BundleName;
    load_url: string;
    layer_type: LayerType;
    module_type: ModuleType;
    has_open_effect?: boolean;
}

// @ (new)
interface TurtleExchangeItem {
    prop_id: RewardIdEnum;
    prop_num: number;
    exchange_prop_id: RewardIdEnum;
    exchange_prop_num: number;
}

// @ (new)
interface LocalCloudArea {
    name: string;
    diamond: number;
    lvl: number;
    index: number;
    pos: cc.Vec3;
    desc: string;
    mapIndex: number;
    reportNum: number;
}

// @ (new)
interface ILuckyWheelReward {
    type: number;
    id: number;
    num: number;
    weight: number;
}

// @ (new)
interface IMapReportPropMap {
    max_num: number;
    name: string;
}
// @ (new)
type TMapReportPropMap = Record<number, Readonly<IMapReportPropMap>>;

// @ (new)
type FunPosList = Record<number, number>;

// @ (new) giống FunPosList
type HeroRandomList = Record<number, number>;

// @ (new)
type TReportBuildingUpgrade = Record<number, ReadonlyArray<number>>;

// @@
export class Constants {
    public static _instance: Constants = null;
    //
    public readonly Notice: Readonly<INotice>;
    public readonly NoticeItem: Readonly<INotice>;
    public readonly FlyNotice: Readonly<INotice>;
    public readonly FlyNoticeItem: Readonly<INotice>;
    public readonly CoinFlyAnim: Readonly<INotice>;
    public readonly Guide: Readonly<INotice>;
    public readonly ItemFly: Readonly<INotice>;
    public readonly GUIDE_SHOW_TIPS_OP: Readonly<INotice>;
    public readonly Login: Readonly<INotice>;
    public readonly Loading: Readonly<INotice>;
    public readonly Story: Readonly<INotice>;
    public readonly Start: Readonly<INotice>;
    public readonly Fight: Readonly<INotice>;
    public readonly FightResult: Readonly<INotice>;
    public readonly FightLost: Readonly<INotice>;
    public readonly FightReviveHero: Readonly<INotice>;
    public readonly FightReturn: Readonly<INotice>;
    public readonly Ladder: Readonly<INotice>;
    public readonly LADDERUPLVLANIM: Readonly<INotice>;
    public readonly LADDERUPLVLANIMPVP: Readonly<INotice>;
    public readonly GetReel: Readonly<INotice>;
    public readonly Task: Readonly<INotice>;
    public readonly Sign: Readonly<INotice>;
    public readonly Buy: Readonly<INotice>;
    public readonly Settings: Readonly<INotice>;
    public readonly Rename: Readonly<INotice>;
    public readonly Announcement: Readonly<INotice>;
    public readonly SuperRecruit: Readonly<INotice>;
    public readonly LuckyWheel: Readonly<INotice>;
    public readonly Mail: Readonly<INotice>;
    public readonly MailDetails: Readonly<INotice>;
    public readonly MailLogNotice: Readonly<INotice>;
    public readonly Debug: Readonly<INotice>;
    public readonly AddDesktop: Readonly<INotice>;
    public readonly Store: Readonly<INotice>;
    public readonly Record: Readonly<INotice>;
    public readonly RecordShare: Readonly<INotice>;
    public readonly MAPUI: Readonly<INotice>;
    // PROPUI: Readonly<INotice>; // (not used)
    public readonly BUILD_UPGRADE: Readonly<INotice>;
    public readonly GOBATTLE: Readonly<INotice>;
    public readonly GETCOINOP: Readonly<INotice>;
    public readonly BUYBARRELOP: Readonly<INotice>;
    public readonly NEWHEROANIM: Readonly<INotice>;
    public readonly TurtleExchange: Readonly<INotice>;
    public readonly POSEIDON: Readonly<INotice>;
    public readonly BUILDINFO: Readonly<INotice>;
    public readonly FIREWORKS: Readonly<INotice>;
    public readonly GUIDEGIFT: Readonly<INotice>;
    public readonly BARRACKS_LIST: Readonly<INotice>;
    public readonly GUIDELOP: Readonly<INotice>;
    public readonly GETDOUBLEOP: Readonly<INotice>;
    public readonly GETPOSEIDONOP: Readonly<INotice>;
    public readonly OFFLINEOP: Readonly<INotice>;
    public readonly UNLOCKAREACLOUDOP: Readonly<INotice>;
    public readonly GETREWARDOP: Readonly<INotice>;
    public readonly SUPERHEROOP: Readonly<INotice>;
    public readonly DEFENSE: Readonly<INotice>;
    public readonly FIGHTOFFLINEOP: Readonly<INotice>;
    public readonly AutoMergeMessage: Readonly<INotice>;
    public readonly RMBSTORE: Readonly<INotice>;
    public readonly VIPGIFT: Readonly<INotice>;
    public readonly BOOK: Readonly<INotice>;
    public readonly BOOK_HERO_DETAIL: Readonly<INotice>;
    public readonly BOOK_ITEM_DETAIL: Readonly<INotice>;
    public readonly GET_MERTRAIL_OP: Readonly<Readonly<INotice>>;
    //
    // public readonly CLOSE_BTN_DELAY_TIME: number; // (not used)
    public readonly TASK_NOT_COMPLETE_COLOR: cc.Color;
    public readonly TASK_COMPLETE_COLOR: cc.Color;
    public readonly TURTLE_EXCHANGE_MAX_REFRESH_COUNT: number;
    public readonly TURTLE_EXCHANGE_REFRESH_DIAMOND: number;
    public readonly TURTLE_EXCHANGE_ITEM_DATA_ARRAY: ReadonlyArray<TurtleExchangeItem>;
    public readonly TURTLE_EXCHANGE_COLOR_LIGHT: cc.Color;
    public readonly TURTLE_EXCHANGE_COLOR_DART: cc.Color;
    public readonly FIGHT_SPEED_X1: number;
    public readonly FIGHT_SPEED_X2: number;
    public readonly STORE_REFRESH_TIME: number;
    public readonly COLOR_RED: cc.Color;
    public readonly COLOR_YELLOW: cc.Color;
    public readonly MIN_LOADING_TIME: number;
    public readonly WALL_CALL_RANGE: number;
    // public readonly LEAGUE_NAME_COLOR_ARRAY: ReadonlyArray<cc.Color>; // (not used)
    // public readonly LEAGUE_STAR_COLOR_ARRAY: ReadonlyArray<cc.Color>; // (not used)
    public readonly RENAME_DIAMOND_PRICE: number;
    public readonly MAP_REPORT_PROP_MAP: Readonly<TMapReportPropMap>;
    public readonly RED_SUPER_RECRUIT_DIAMOND: number;
    public readonly MAX_SUPER_RECRUIT_VIDEO_COUNT: number;
    public readonly YELLOW_SUPER_RECRUIT_GOLD: number;
    public readonly MAX_LUCKY_WHEEL_FREE_COUNT: number;
    public readonly MAX_LUCKY_WHEEL_VIDEO_COUNT: number;
    public readonly FREE_DRAW_TIME_INTERVAL: number;
    public readonly LUCKY_WHEEL_REWARD_ARRAY: ReadonlyArray<ILuckyWheelReward>;
    public readonly REPORT_BUILDING_UPGRADE_MAP: Readonly<TReportBuildingUpgrade>;
    public readonly MAX_PUSH_SHARE_COUNT: number;
    public readonly MAX_VIDEO_FAIL_SHARE_COUNT: number;
    public readonly ADD_DESKTOP_REWARD_LEFT_HERO_ID: number;
    public readonly ADD_DESKTOP_REWARD_RIGHT_HERO_ID: number;
    public readonly FIGHT_RETURN_BUTTON_APPEAR_TIME: number;
    public readonly MAX_FREE_SUPER_RECRUIT_COUNT: number;
    public readonly AUDIO_1_BARRACK_CARD_MOVE: string;
    public readonly AUDIO_2_BARRACK_OPEN: string;
    public readonly AUDIO_3_UPGRADE_CLOSE: string;
    public readonly AUDIO_4_UPGRADE_OPEN: string;
    public readonly AUDIO_5_TASK_REWARD: string;
    public readonly AUDIO_6_JIANZUSHEGNJI: string;
    public readonly AUDIO_7_BUILDING_UPGRADING: string;
    public readonly AUDIO_8_BUILDING_OPEN_CLOSE: string;
    public readonly AUDIO_9_CANCEL_PRESENCE: string; // (not used)
    public readonly AUDIO_10_JIANMUTONG: string;
    public readonly AUDIO_12_BUY_SUCCESS: string;
    public readonly AUDIO_13_WOOD_BUY_ITEM: string;
    public readonly AUDIO_14_DIAMOND_BUY_ITEM: string;
    public readonly AUDIO_15_UNLOCK_STORE: string;
    public readonly AUDIO_16_BUY_ITEM: string;
    public readonly AUDIO_17_GOLD_FLY: string;
    public readonly AUDIO_18_FIGHT_TIME: string;
    public readonly AUDIO_19_FIGHT_RETURN: string;
    public readonly AUDIO_20_FIGHT_FAIL: string;
    public readonly AUDIO_21_FIGHT_SUCCESS: string;
    public readonly AUDIO_23_HERO_DEATH: string;
    public readonly AUDIO_24_DROP_ITEM: string; // (not used)
    public readonly AUDIO_25_LADDER_STAR_FLY: string;
    public readonly AUDIO_26_LADDER_REWARD: string; // (not used)
    public readonly AUDIO_27_LADDER_UPGRADE_OPEN: string; // (not used)
    public readonly AUDIO_28_LADDER_UPGRADE_CLOSE: string; // (not used)
    public readonly AUDIO_29_LADDER_STAR_1: string; // (not used)
    public readonly AUDIO_30_LADDER_STAR_2: string; // (not used)
    public readonly AUDIO_31_LADDER_STAR_3: string; // (not used)
    public readonly AUDIO_88_GEZISHENG: string;
    public readonly AUDIO_90_STATUE_BREAKING: string;
    public readonly AUDIO_91_MAIN_MUSIC: string;
    public readonly AUDIO_92_LOADING_ISLAND_MUSIC: string;
    public readonly AUDIO_93_FIGHT_MUSIC: string;
    public readonly AUDIO_95_CAVES_MUSIC: string;
    public readonly AUDIO_96_ISLAND_MUSIC: string;
    public readonly AUDIO_159_MUTONGLUODI: string;
    public readonly AUDIO_160_CHANGEPOS: string;
    public readonly AUDIO_161_COMPOSE: string;
    public readonly AUDIO_162_DIAMOND_FLY: string;
    public readonly AUDIO_163_UNLOCK_NEW_HERO_ANIM: string;
    public readonly AUDIO_164_UNLOCK_NEW_HERO: string; // (not used)
    public readonly AUDIO_165_PUT_PROP_INTO_BUILDING: string;
    public readonly TEXT_1: string;
    public readonly TEXT_2: string; // (not used ???)
    public readonly TEXT_3: string; // (not used ???)
    public readonly TEXT_4: string; // (not used ???)
    public readonly TEXT_5: string; // (not used ???)
    public readonly TEXT_6: string; // (not used ???)
    public readonly TEXT_7: string;
    public readonly TEXT_8: string; // (not used ???)
    public readonly TEXT_9: string;
    public readonly TEXT_10: string; // (not used ???)
    public readonly TEXT_11: string; // (not used ???)
    public readonly TEXT_12: string; // (not used ???)
    public readonly TEXT_13: string; // (not used ???)
    public readonly TEXT_14: string; // (not used ???)
    public readonly TEXT_15: string; // (not used ???)
    public readonly TEXT_16: string; // (not used ???)
    public readonly TEXT_17: string; // (not used ???)
    public readonly TEXT_18: string;
    public readonly TEXT_19: string;
    public readonly TEXT_20: string; // (not used ???)
    public readonly TEXT_21: string; // (not used ???)
    public readonly TEXT_22: string; // (not used ???)
    public readonly TEXT_23: string; // (not used ???)
    public openBuildID: number;
    public readonly shipID: number;
    public readonly MAX_CELL_NUM: number;
    public readonly funPosList: Readonly<FunPosList>; // Readonly<Record<number, number>>
    public readonly heroRandomList: Readonly<HeroRandomList>; // Readonly<Record<number, number>>
    public readonly localCloudAreaList: Readonly<
        Record<number, Readonly<LocalCloudArea>>
    >;
    public readonly HEROGIFTID: number;
    public readonly GIFTID: number;
    public readonly PAGODAGIFTID: number;
    public readonly SUPERHERORELIVETIME: number;
    public readonly SUPERHERORECIVETIME: number;
    public readonly SUPERHERORECIVEHP: number;
    public readonly CAVESAREAID: number;
    public readonly ICEAREAID: number;
    public readonly FIREREAID: number;
    public readonly MAX_ROW: number;
    public readonly MAX_COLUMN: number;
    public readonly WALLNAMELIST: ReadonlyArray<string>;
    public readonly BuyData: BuyItemData[];
    //
    private constructor() {
        this.Notice = {
            key: "Notice",
            bundle_name: BundleName.COMMON,
            load_url: "prefabs/notice",
            layer_type: LayerType.TOP,
            module_type: ModuleType.WINDOW,
        };
        this.NoticeItem = {
            key: "NoticeItem",
            bundle_name: BundleName.COMMON,
            load_url: "prefabs/notice_item",
            layer_type: LayerType.TOP,
            module_type: ModuleType.VIEW,
        };
        this.FlyNotice = {
            key: "FlyNotice",
            bundle_name: BundleName.COMMON,
            load_url: "prefabs/fly_notice",
            layer_type: LayerType.TOP,
            module_type: ModuleType.WINDOW,
        };
        this.FlyNoticeItem = {
            key: "FlyNoticeItem",
            bundle_name: BundleName.COMMON,
            load_url: "prefabs/fly_notice_item",
            layer_type: LayerType.TOP,
            module_type: ModuleType.VIEW,
        };
        this.CoinFlyAnim = {
            key: "CoinFlyAnim",
            bundle_name: BundleName.COMMON,
            load_url: "prefabs/coin_fly_anim",
            layer_type: LayerType.TOP,
            module_type: ModuleType.VIEW,
        };
        this.Guide = {
            key: "Guide",
            bundle_name: BundleName.GUIDE,
            load_url: "prefabs/guide",
            layer_type: LayerType.TOP,
            module_type: ModuleType.VIEW,
        };
        this.ItemFly = {
            key: "ItemFly",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/itemFly",
            layer_type: LayerType.UI,
            module_type: ModuleType.VIEW,
        };
        this.GUIDE_SHOW_TIPS_OP = {
            key: "GuiderShowTips",
            bundle_name: BundleName.GUIDE,
            load_url: "prefabs/guiderShowTips",
            layer_type: LayerType.TOP,
            module_type: ModuleType.VIEW,
        };
        this.Loading = {
            key: "Loading",
            bundle_name: BundleName.LOADING,
            load_url: "prefabs/loading",
            layer_type: LayerType.TOP,
            module_type: ModuleType.WINDOW,
        };
        this.Login = {
            key: "Login",
            bundle_name: BundleName.Login,
            load_url: "prefabs/login",
            layer_type: LayerType.TOP,
            module_type: ModuleType.WINDOW,
        };
        this.Story = {
            key: "Story",
            bundle_name: BundleName.LOADING,
            load_url: "prefabs/story",
            layer_type: LayerType.TOP,
            module_type: ModuleType.WINDOW,
        };
        this.Start = {
            key: "Start",
            bundle_name: BundleName.START,
            load_url: "prefabs/start",
            layer_type: LayerType.UI,
            module_type: ModuleType.SCENE,
        };
        this.Fight = {
            key: "Fight",
            bundle_name: BundleName.FIGHT,
            load_url: "prefabs/fight",
            layer_type: LayerType.SCENE,
            module_type: ModuleType.SCENE,
        };
        this.FightResult = {
            key: "FightResult",
            bundle_name: BundleName.FIGHT,
            load_url: "prefabs/fight_result",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.FightLost = {
            key: "FightLost",
            bundle_name: BundleName.FIGHT,
            load_url: "prefabs/fight_lost",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.FightReviveHero = {
            key: "FightReviveHero",
            bundle_name: BundleName.FIGHT,
            load_url: "prefabs/fight_revive_hero",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.FightReturn = {
            key: "FightReturn",
            bundle_name: BundleName.FIGHT,
            load_url: "prefabs/fight_return",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Ladder = {
            key: "Ladder",
            bundle_name: BundleName.LADDER,
            load_url: "prefabs/ladder",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.LADDERUPLVLANIM = {
            key: "LadderUpLvlAnim",
            bundle_name: BundleName.LADDER,
            load_url: "prefabs/ladderUpLvlAnim",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.LADDERUPLVLANIMPVP = {
            key: "LadderUpLvlAnimPVP",
            bundle_name: BundleName.LADDER,
            load_url: "prefabs/ladderUpLvlAnimPVP",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.GetReel = {
            key: "GetReel",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/get_reel",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Task = {
            key: "Task",
            bundle_name: BundleName.TASK,
            load_url: "prefabs/task",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Sign = {
            key: "Sign",
            bundle_name: BundleName.SIGN,
            load_url: "prefabs/sign",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Buy = {
            key: "Buy",
            bundle_name: BundleName.Buy,
            load_url: "prefabs/buy",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Settings = {
            key: "Settings",
            bundle_name: BundleName.SETTINGS,
            load_url: "prefabs/settings",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Rename = {
            key: "Rename",
            bundle_name: BundleName.SETTINGS,
            load_url: "prefabs/rename",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Announcement = {
            key: "Announcement",
            bundle_name: BundleName.SETTINGS,
            load_url: "prefabs/announcement",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.SuperRecruit = {
            key: "SuperRecruit",
            bundle_name: BundleName.SUPER_RECRUIT,
            load_url: "prefabs/super_recruit",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.LuckyWheel = {
            key: "LuckyWheel",
            bundle_name: BundleName.LUCKY_WHEEL,
            load_url: "prefabs/lucky_wheel",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Mail = {
            key: "Mail",
            bundle_name: BundleName.MAIL,
            load_url: "prefabs/mail",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.MailDetails = {
            key: "MailDetails",
            bundle_name: BundleName.MAIL,
            load_url: "prefabs/mail_details",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.MailLogNotice = {
            key: "MailLogNotice",
            bundle_name: BundleName.MAIL,
            load_url: "prefabs/mail_log_notice",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Debug = {
            key: "Debug",
            bundle_name: BundleName.DEBUG,
            load_url: "prefabs/debug",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.AddDesktop = {
            key: "AddDesktop",
            bundle_name: BundleName.ADD_DESKTOP,
            load_url: "prefabs/add_desktop",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Store = {
            key: "StoreList",
            bundle_name: BundleName.SPECIAL_BUILD,
            load_url: "prefabs/store",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.Record = {
            key: "Record",
            bundle_name: BundleName.RECORD,
            load_url: "prefabs/record",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.RecordShare = {
            key: "RecordShare",
            bundle_name: BundleName.RECORD,
            load_url: "prefabs/record_share",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.MAPUI = {
            key: "MainMapUI",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/mainUI",
            layer_type: LayerType.UI,
            module_type: ModuleType.SCENE,
        };
        /* // (not used)
        this.PROPUI = {
            key: "PropItem",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/propItem",
            layer_type: LayerType.UI,
            module_type: ModuleType.VIEW
        }; */
        this.BUILD_UPGRADE = {
            key: "BuildUpgrade",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/buildUpgrade",
            layer_type: LayerType.UI,
            module_type: ModuleType.VIEW,
        };
        this.GOBATTLE = {
            key: "GoBattleOp",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/goBattle",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.GETCOINOP = {
            key: "GetCoinOp",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/getCoinOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.BUYBARRELOP = {
            key: "BuyBarrelOp",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/buyBattleOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.NEWHEROANIM = {
            key: "NewHeroAnim",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/newHeroAnim",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.TurtleExchange = {
            key: "TurtleExchange",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/turtle_exchange",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.POSEIDON = {
            key: "Poseidon",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/poseidon",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.BUILDINFO = {
            key: "BuildInfo",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/buildInfo",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.FIREWORKS = {
            key: "Fireworks",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/fireworks",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.GUIDEGIFT = {
            key: "GuideGift",
            bundle_name: BundleName.GUIDEGIFT,
            load_url: "prefabs/guideGift",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.BARRACKS_LIST = {
            key: "BarracksList",
            bundle_name: BundleName.BUILD_FUNCTION,
            load_url: "prefabs/barracksList",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.GUIDELOP = {
            key: "NewerGuideOp",
            bundle_name: BundleName.GUIDE,
            load_url: "prefabs/newerGuideOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.GETDOUBLEOP = {
            key: "GetDoubleRewardOp",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/getDoubleRewardOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.GETPOSEIDONOP = {
            key: "GetPoseidonOp",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/getPoseidonOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.OFFLINEOP = {
            key: "OfflineOp",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/offlineOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.UNLOCKAREACLOUDOP = {
            key: "UnLockAreaCloud",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/unlockAreaCloudOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.GETREWARDOP = {
            key: "GetRewardOp",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/getRewardOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.SUPERHEROOP = {
            key: "SuperHero",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/superHero",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.DEFENSE = {
            key: "DefenseOp",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/defense",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.FIGHTOFFLINEOP = {
            key: "FightOfflineOp",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/fightOfflineOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.AutoMergeMessage = {
            key: "AutoMergeMessage",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/auto_merge_message",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.RMBSTORE = {
            key: "RMBStore",
            bundle_name: BundleName.STORE,
            load_url: "prefabs/storeOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.VIPGIFT = {
            key: "VipGift",
            bundle_name: BundleName.STORE,
            load_url: "prefabs/vipGift",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.BOOK = {
            key: "SceneBookView",
            bundle_name: BundleName.BOOK,
            load_url: "prefabs/book",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.BOOK_HERO_DETAIL = {
            key: "SceneHeroDetailView",
            bundle_name: BundleName.BOOK,
            load_url: "prefabs/book_hero_detail",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.BOOK_ITEM_DETAIL = {
            key: "SceneItemDetailView",
            bundle_name: BundleName.BOOK,
            load_url: "prefabs/book_item_detail",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        this.GET_MERTRAIL_OP = {
            key: "GetMertrailOp",
            bundle_name: BundleName.MAP,
            load_url: "prefabs/getMertrailOp",
            layer_type: LayerType.UI,
            module_type: ModuleType.WINDOW,
        };
        //
        // this.CLOSE_BTN_DELAY_TIME = 3; // (not used)
        this.TASK_NOT_COMPLETE_COLOR = cc.color().fromHEX("#F5E9CF");
        this.TASK_COMPLETE_COLOR = cc.color().fromHEX("#FFD43E");
        this.TURTLE_EXCHANGE_MAX_REFRESH_COUNT = 5;
        this.TURTLE_EXCHANGE_REFRESH_DIAMOND = 5;
        //
        this.TURTLE_EXCHANGE_ITEM_DATA_ARRAY = [
            {
                prop_id: RewardIdEnum.GOLD,
                prop_num: 105,
                exchange_prop_id: RewardIdEnum.SILVER_BARREL,
                exchange_prop_num: 1,
            },
            {
                prop_id: RewardIdEnum.DIAMOND,
                prop_num: 14,
                exchange_prop_id: RewardIdEnum.SILVER_BARREL,
                exchange_prop_num: 1,
            },
            {
                prop_id: RewardIdEnum.GOLD,
                prop_num: 90,
                exchange_prop_id: RewardIdEnum.GOLD_BARREL,
                exchange_prop_num: 1,
            },
            {
                prop_id: RewardIdEnum.DIAMOND,
                prop_num: 10,
                exchange_prop_id: RewardIdEnum.GOLD_BARREL,
                exchange_prop_num: 1,
            },
        ];
        this.TURTLE_EXCHANGE_COLOR_LIGHT = cc.color().fromHEX("#87C357");
        this.TURTLE_EXCHANGE_COLOR_DART = cc.color().fromHEX("#DFF8FD");
        this.FIGHT_SPEED_X1 = 1;
        this.FIGHT_SPEED_X2 = 2;
        this.STORE_REFRESH_TIME = 1800;
        this.COLOR_RED = cc.color().fromHEX("#ff3838");
        this.COLOR_YELLOW = cc.color().fromHEX("#ffe430");
        this.MIN_LOADING_TIME = 2000;
        this.WALL_CALL_RANGE = 400;
        // (not used)
        /* this.LEAGUE_NAME_COLOR_ARRAY = [
            cc.color().fromHEX("#fe993b"),
            cc.color().fromHEX("#c0daff"),
            cc.color().fromHEX("#ffe479"),
            cc.color().fromHEX("#9dadff"),
            cc.color().fromHEX("#ff5a5f"),
            cc.color().fromHEX("#f16dff")
        ];
        this.LEAGUE_STAR_COLOR_ARRAY = [
            cc.color().fromHEX("#cc883a"),
            cc.color().fromHEX("#6585ae"),
            cc.color().fromHEX("#e7ab2c"),
            cc.color().fromHEX("#4f5881"),
            cc.color().fromHEX("#c12224"),
            cc.color().fromHEX("#65117f")
        ]; */
        this.RENAME_DIAMOND_PRICE = 50;
        this.MAP_REPORT_PROP_MAP = {
            12001: {
                max_num: 15,
                name: "钥匙1",
            },
            13001: {
                max_num: 15,
                name: "船锚1",
            },
            14001: {
                max_num: 15,
                name: "号角1",
            },
            15001: {
                max_num: 15,
                name: "罐子1",
            },
            16001: {
                max_num: 63,
                name: "木材1",
            },
            17001: {
                max_num: 50,
                name: "铁矿1",
            },
            18001: {
                max_num: 4,
                name: "鱼叉",
            },
            18002: {
                max_num: 4,
                name: "石袋",
            },
            18003: {
                max_num: 4,
                name: "盾牌",
            },
            18004: {
                max_num: 4,
                name: "弓箭",
            },
            18005: {
                max_num: 4,
                name: "枪",
            },
            18006: {
                max_num: 4,
                name: "剑",
            },
            18007: {
                max_num: 2,
                name: "鸽子",
            },
            18008: {
                max_num: 2,
                name: "蛇",
            },
            18009: {
                max_num: 2,
                name: "木马",
            },
            18011: {
                max_num: 2,
                name: "魔法棒",
            },
            25001: {
                max_num: 3,
                name: "贝壳1",
            },
        }; // end: MAP_REPORT_PROP_MAP
        this.RED_SUPER_RECRUIT_DIAMOND = 150;
        this.MAX_SUPER_RECRUIT_VIDEO_COUNT = 2;
        this.YELLOW_SUPER_RECRUIT_GOLD = 238;
        this.MAX_LUCKY_WHEEL_FREE_COUNT = 0;
        this.MAX_LUCKY_WHEEL_VIDEO_COUNT = 10;
        this.FREE_DRAW_TIME_INTERVAL = 300000;
        this.LUCKY_WHEEL_REWARD_ARRAY = [
            {
                type: 0,
                id: 11002,
                num: 150,
                weight: 2500,
            },
            {
                type: 0,
                id: 11002,
                num: 450,
                weight: 1200,
            },
            {
                type: 1,
                id: 11003,
                num: 25,
                weight: 2e3,
            },
            {
                type: 1,
                id: 11003,
                num: 65,
                weight: 1e3,
            },
            {
                type: 2,
                id: 11006,
                num: 25,
                weight: 2e3,
            },
            {
                type: 2,
                id: 11006,
                num: 55,
                weight: 1300,
            },
        ]; // end: LUCKY_WHEEL_REWARD_ARRAY
        this.REPORT_BUILDING_UPGRADE_MAP = {
            1: [
                10311, 10315, 10320, 10325, 10331, 10336, 10341, 10346, 10352,
                10358, 10364, 10370, 10376, 10382, 10388,
            ],
            2: [
                10316, 10319, 10321, 10329, 10335, 10338, 10349, 10360, 10377,
                10384,
            ],
            3: [10313, 10327, 10330, 10334],
            4: [10337, 10351, 10361, 10365],
            5: [10347, 10369, 10373, 10381],
            6: [
                10326, 10333, 10340, 10345, 10356, 10362, 10367, 10372, 10379,
                10385,
            ],
            7: [10317],
            8: [],
            9: [
                10312, 10323, 10328, 10343, 10350, 10355, 10368, 10375, 10380,
                10386,
            ],
            10: [
                10314, 10318, 10324, 10332, 10344, 10354, 10363, 10374, 10378,
                10387,
            ],
            31: [10322, 10339, 10348, 10366],
            32: [10342, 10357, 10371, 10383],
            33: [],
        }; // end: REPORT_BUILDING_UPGRADE_MAP
        this.MAX_PUSH_SHARE_COUNT = 1;
        this.MAX_VIDEO_FAIL_SHARE_COUNT = 5;
        this.ADD_DESKTOP_REWARD_LEFT_HERO_ID = 34001;
        this.ADD_DESKTOP_REWARD_RIGHT_HERO_ID = 35001;
        this.FIGHT_RETURN_BUTTON_APPEAR_TIME = 60000;
        this.MAX_FREE_SUPER_RECRUIT_COUNT = 1;
        // audio
        this.AUDIO_1_BARRACK_CARD_MOVE = "1_barrack_card_move";
        this.AUDIO_2_BARRACK_OPEN = "2_barrack_open";
        this.AUDIO_3_UPGRADE_CLOSE = "3_upgrade_close";
        this.AUDIO_4_UPGRADE_OPEN = "4_upgrade_open";
        this.AUDIO_5_TASK_REWARD = "5_task_reward";
        this.AUDIO_6_JIANZUSHEGNJI = "6_jianzushegnji";
        this.AUDIO_7_BUILDING_UPGRADING = "7_building_upgrading";
        this.AUDIO_8_BUILDING_OPEN_CLOSE = "8_building_open_close";
        this.AUDIO_9_CANCEL_PRESENCE = "9_cancel_presence";
        this.AUDIO_10_JIANMUTONG = "10_jianmutong";
        this.AUDIO_12_BUY_SUCCESS = "12_buy_success";
        this.AUDIO_13_WOOD_BUY_ITEM = "13_wood_buy_item";
        this.AUDIO_14_DIAMOND_BUY_ITEM = "14_diamond_buy_item";
        this.AUDIO_15_UNLOCK_STORE = "15_unlock_store";
        this.AUDIO_16_BUY_ITEM = "16_buy_item";
        this.AUDIO_17_GOLD_FLY = "17_gold_fly";
        this.AUDIO_18_FIGHT_TIME = "18_fight_time";
        this.AUDIO_19_FIGHT_RETURN = "19_fight_return";
        this.AUDIO_20_FIGHT_FAIL = "20_fight_fail";
        this.AUDIO_21_FIGHT_SUCCESS = "21_fight_success";
        this.AUDIO_23_HERO_DEATH = "23_hero_death";
        this.AUDIO_24_DROP_ITEM = "24_drop_item";
        this.AUDIO_25_LADDER_STAR_FLY = "25_ladder_star_fly";
        this.AUDIO_26_LADDER_REWARD = "26_ladder_reward";
        this.AUDIO_27_LADDER_UPGRADE_OPEN = "27_ladder_upgrade_open";
        this.AUDIO_28_LADDER_UPGRADE_CLOSE = "28_ladder_upgrade_close";
        this.AUDIO_29_LADDER_STAR_1 = "29_ladder_star_1";
        this.AUDIO_30_LADDER_STAR_2 = "30_ladder_star_2";
        this.AUDIO_31_LADDER_STAR_3 = "31_ladder_star_3";
        this.AUDIO_88_GEZISHENG = "88_gezisheng";
        this.AUDIO_90_STATUE_BREAKING = "90_statue_breaking";
        this.AUDIO_91_MAIN_MUSIC = "91_main_music";
        this.AUDIO_92_LOADING_ISLAND_MUSIC = "92_loading_island_music";
        this.AUDIO_93_FIGHT_MUSIC = "93_fight_music";
        this.AUDIO_95_CAVES_MUSIC = "95_caves_music";
        this.AUDIO_96_ISLAND_MUSIC = "96_island_music";
        this.AUDIO_159_MUTONGLUODI = "159_mutongluodi";
        this.AUDIO_160_CHANGEPOS = "160_changePos";
        this.AUDIO_161_COMPOSE = "161_compose";
        this.AUDIO_162_DIAMOND_FLY = "162_diamond_fly";
        this.AUDIO_163_UNLOCK_NEW_HERO_ANIM = "163_unlock_new_hero_anim";
        this.AUDIO_164_UNLOCK_NEW_HERO = "164_unlock_new_hero";
        this.AUDIO_165_PUT_PROP_INTO_BUILDING = "165_put_prop_into_building";
        // text
        this.TEXT_1 = "Xóa lưu trữ thành công";
        this.TEXT_2 = "Đã hoàn thành tất cả các cấp độ!!!";
        this.TEXT_3 = "Tiền xu không đủ!!!";
        this.TEXT_4 =
            "Không còn thời gian cướp bóc nữa, hãy quay lại vào ngày mai";
        this.TEXT_5 = "Mở khóa sau khi vượt qua cấp độ 2-3";
        this.TEXT_6 = "Chúc mừng chiến thắng %s x%d";
        this.TEXT_7 = "Kết thúc xem video";
        this.TEXT_8 = "Không tìm thấy nội dung nhắc nhở";
        this.TEXT_9 = "Chia sẻ thành công";
        this.TEXT_10 = "Đã xóa bộ nhớ đệm thành công";
        this.TEXT_11 = "Chia sẻ bản ghi màn hình không thành công";
        this.TEXT_12 = "Vui lòng mở khóa các cấp độ trước đó trước";
        this.TEXT_13 = "Cấp độ %d";
        this.TEXT_14 = "%d/%d";
        this.TEXT_15 = "%d — %d";
        this.TEXT_16 = "Số sao cần thiết cho cấp độ %d-%d";
        this.TEXT_17 =
            "Nền tảng này không hỗ trợ thêm nhiều tính năng trò chơi";
        this.TEXT_18 = "Chia sẻ không thành công";
        this.TEXT_19 =
            "Ghi màn hình không thành công, thời lượng ghi ít hơn 3 giây";
        this.TEXT_20 = "Không thể chia sẻ cùng một bản ghi màn hình nhiều lần";
        this.TEXT_21 = "%d.%s";
        this.TEXT_22 = "Yêu cầu mở khóa thành công!!!";
        this.TEXT_23 =
            "Đã dùng hết %d lượt chia sẻ hôm nay, thử lại vào ngày mai!";
        this.openBuildID = 1006;
        this.shipID = 313;
        this.MAX_CELL_NUM = 256;
        this.funPosList = {
            187: 223,
            144: 143,
            216: 235,
        };
        this.heroRandomList = {
            3: 1,
            4: 1,
            5: 2,
            6: 2,
            7: 3,
            8: 3,
        };
        this.localCloudAreaList = {
            6: {
                name: "Đảo Thần Tiên Poseidon",
                diamond: 66,
                lvl: 3,
                index: 0,
                pos: cc.v3(874, -1198),
                desc: "Có những yêu tinh sống trong cây Poseidon ở đây Truyền thuyết kể rằng việc tiêm linh hồn biển có thể mang lại sức mạnh thần thánh cho người anh hùng!",
                mapIndex: 223,
                reportNum: 10841,
            },
            5: {
                name: "Tàn tích của bộ lạc thổ",
                diamond: 77,
                lvl: 2,
                index: 1,
                pos: cc.v3(-190, -734),
                desc: "Người ta nói rằng có nhiều điều bí ẩn ẩn giấu trong hang động của tàn tích bộ lạc biển bản địa. Hiện tại chưa biết có đúng hay không!",
                mapIndex: 215,
                reportNum: 10843,
            },
            9: {
                name: "Sông Băng Tuyết",
                diamond: 88,
                lvl: 5,
                index: 2,
                pos: cc.v3(297, -212),
                desc: "Truyền thuyết kể rằng những người đến đây đều đã trải qua đủ loại khó khăn, nguy hiểm và chỉ một số ít có thể leo lên đỉnh tuyết.",
                mapIndex: 9,
                reportNum: 10845,
            },
            11: {
                name: "Hỏa Long Sơn",
                diamond: 99,
                lvl: 7,
                index: 3,
                pos: cc.v3(1054, -245),
                desc: "Truyền thuyết kể rằng có một Hỏa Long Vương đã ngủ say nhiều năm, nếu được nó chấp thuận, bạn sẽ bất khả chiến bại!",
                mapIndex: 1,
                reportNum: 10847,
            },
        }; // end: localCloudAreaList

        this.BuyData = [
            {
                state: 1,
                reward_array: [
                    { reward_id: 11006, reward_num: 10 },
                    { reward_id: 11003, reward_num: 99 },
                ],
                reward_price: 10000,
                reward_itemId: 0,
            },
            {
                state: 1,
                reward_array: [
                    { reward_id: 11006, reward_num: 20 },
                    { reward_id: 11003, reward_num: 199 },
                ],
                reward_price: 20000,
                reward_itemId: 0,
            },
            {
                state: 1,
                reward_array: [
                    { reward_id: 11006, reward_num: 30 },
                    { reward_id: 11003, reward_num: 299 },
                ],
                reward_price: 30000,
                reward_itemId: 0,
            },
            {
                state: 1,
                reward_array: [
                    { reward_id: 11006, reward_num: 40 },
                    { reward_id: 11003, reward_num: 299 },
                ],
                reward_price: 40000,
                reward_itemId: 0,
            },
            {
                state: 1,
                reward_array: [
                    { reward_id: 11006, reward_num: 50 },
                    { reward_id: 11003, reward_num: 399 },
                ],
                reward_price: 50000,
                reward_itemId: 0,
            },
            {
                state: 1,
                reward_array: [
                    { reward_id: 11006, reward_num: 15 },
                    { reward_id: 11002, reward_num: 5000 },
                ],
                reward_price: 10000,
                reward_itemId: 11002,
            },
            {
                state: 1,
                reward_array: [
                    { reward_id: 11006, reward_num: 30 },
                    { reward_id: 11002, reward_num: 10000 },
                ],
                reward_price: 20000,
                reward_itemId: 11002,
            },
        ];
        this.HEROGIFTID = 20008;
        this.GIFTID = 21057;
        this.PAGODAGIFTID = 21005;
        this.SUPERHERORELIVETIME = 3600;
        this.SUPERHERORECIVETIME = 60;
        this.SUPERHERORECIVEHP = 20;
        this.CAVESAREAID = 8;
        this.ICEAREAID = 10;
        this.FIREREAID = 11;
        this.MAX_ROW = 20;
        this.MAX_COLUMN = 23;
        this.WALLNAMELIST = ["top", "right", "bottom", "left"];
    } // end: constructor

    // @
    public static get instance(): Constants {
        /* if (!this._instance) this._instance = new Constants();
        return this._instance; */
        return this._instance || (this._instance = new Constants());
    }
} // end: Constants
