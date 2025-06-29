
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/Constants.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8cab3iruEpHkb5dM+q43+JY', 'Constants');
// start-scene/scripts/Constants.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = exports.HeroTypeEnum = exports.SpecialEnum = exports.PropTypeEnum = exports.BuildTypeEnum = exports.SetItemNumEnum = exports.ItemTypeEnum = exports.ABTest = exports.BundleName = exports.RewardIdEnum = exports.LayerType = exports.ModuleType = void 0;
// @@
var ModuleType;
(function (ModuleType) {
    ModuleType[ModuleType["SCENE"] = 0] = "SCENE";
    ModuleType[ModuleType["WINDOW"] = 1] = "WINDOW";
    ModuleType[ModuleType["VIEW"] = 2] = "VIEW";
    ModuleType[ModuleType["BOTTOM"] = 3] = "BOTTOM";
})(ModuleType = exports.ModuleType || (exports.ModuleType = {}));
// @@
var LayerType;
(function (LayerType) {
    LayerType[LayerType["SCENE"] = 0] = "SCENE";
    LayerType[LayerType["UI"] = 1] = "UI";
    LayerType[LayerType["TOP"] = 2] = "TOP";
    LayerType[LayerType["DRAG"] = 3] = "DRAG";
})(LayerType = exports.LayerType || (exports.LayerType = {}));
// @@
var RewardIdEnum;
(function (RewardIdEnum) {
    RewardIdEnum[RewardIdEnum["STAR"] = 11001] = "STAR";
    RewardIdEnum[RewardIdEnum["GOLD"] = 11002] = "GOLD";
    RewardIdEnum[RewardIdEnum["DIAMOND"] = 11003] = "DIAMOND";
    RewardIdEnum[RewardIdEnum["WOOD"] = 11004] = "WOOD";
    RewardIdEnum[RewardIdEnum["IRON"] = 11005] = "IRON";
    RewardIdEnum[RewardIdEnum["BARREL"] = 11006] = "BARREL";
    RewardIdEnum[RewardIdEnum["SILVER_BARREL"] = 11007] = "SILVER_BARREL";
    RewardIdEnum[RewardIdEnum["GOLD_BARREL"] = 11008] = "GOLD_BARREL";
})(RewardIdEnum = exports.RewardIdEnum || (exports.RewardIdEnum = {}));
// @@
var BundleName;
(function (BundleName) {
    BundleName["COMMON"] = "common";
    BundleName["LOADING"] = "loading";
    BundleName["Login"] = "login";
    BundleName["GUIDE"] = "guide";
    BundleName["START"] = "start";
    BundleName["FIGHT"] = "fight";
    BundleName["LADDER"] = "ladder";
    BundleName["STORE"] = "store";
    BundleName["TASK"] = "task";
    BundleName["SIGN"] = "sign";
    BundleName["Buy"] = "buy";
    BundleName["SETTINGS"] = "settings";
    BundleName["MAIL"] = "mail";
    BundleName["RECORD"] = "record";
    BundleName["LUCKY_WHEEL"] = "lucky_wheel";
    BundleName["TEST"] = "test";
    BundleName["MAP"] = "map";
    BundleName["BUILD_FUNCTION"] = "buildFunction";
    BundleName["SPECIAL_BUILD"] = "special_build";
    BundleName["BOOK"] = "book";
    BundleName["DEBUG"] = "debug";
    BundleName["GUIDEGIFT"] = "guideGift";
    BundleName["ADD_DESKTOP"] = "add_desktop";
    BundleName["SUPER_RECRUIT"] = "super_recruit";
})(BundleName = exports.BundleName || (exports.BundleName = {}));
// @@
var ABTest;
(function (ABTest) {
    ABTest["A"] = "a_test";
    ABTest["B"] = "b_test";
})(ABTest = exports.ABTest || (exports.ABTest = {}));
// @@
var ItemTypeEnum;
(function (ItemTypeEnum) {
    ItemTypeEnum[ItemTypeEnum["ITEM_TYPE"] = 1] = "ITEM_TYPE";
    ItemTypeEnum[ItemTypeEnum["BUILD_TYPE"] = 2] = "BUILD_TYPE";
    ItemTypeEnum[ItemTypeEnum["HERO_TYPE"] = 3] = "HERO_TYPE";
})(ItemTypeEnum = exports.ItemTypeEnum || (exports.ItemTypeEnum = {}));
// @@
var SetItemNumEnum;
(function (SetItemNumEnum) {
    SetItemNumEnum[SetItemNumEnum["ADD_ITEM_TYPE"] = 1] = "ADD_ITEM_TYPE";
    SetItemNumEnum[SetItemNumEnum["REDUCE_ITEM_TYPE"] = 2] = "REDUCE_ITEM_TYPE";
})(SetItemNumEnum = exports.SetItemNumEnum || (exports.SetItemNumEnum = {}));
// @@
var BuildTypeEnum;
(function (BuildTypeEnum) {
    BuildTypeEnum[BuildTypeEnum["TOWER_TYPE"] = 1] = "TOWER_TYPE";
    BuildTypeEnum[BuildTypeEnum["BARRACKS_TYPE"] = 2] = "BARRACKS_TYPE";
    BuildTypeEnum[BuildTypeEnum["PRIVATEHOUSING_TYPE"] = 3] = "PRIVATEHOUSING_TYPE";
    BuildTypeEnum[BuildTypeEnum["LOGGINGFIELD_TYPE"] = 4] = "LOGGINGFIELD_TYPE";
    BuildTypeEnum[BuildTypeEnum["MININGWELL_TYPE"] = 5] = "MININGWELL_TYPE";
    BuildTypeEnum[BuildTypeEnum["GARRISION_TYPE"] = 6] = "GARRISION_TYPE";
    BuildTypeEnum[BuildTypeEnum["STALL_TYPE"] = 7] = "STALL_TYPE";
    BuildTypeEnum[BuildTypeEnum["WALL_TYPE"] = 8] = "WALL_TYPE";
    BuildTypeEnum[BuildTypeEnum["WHARFTAX_TYPE"] = 9] = "WHARFTAX_TYPE";
    BuildTypeEnum[BuildTypeEnum["SEAGOINGBOAT_TYPE"] = 10] = "SEAGOINGBOAT_TYPE";
    BuildTypeEnum[BuildTypeEnum["FISHHOUSE_TYPE"] = 31] = "FISHHOUSE_TYPE";
    BuildTypeEnum[BuildTypeEnum["FARMHOUSE_TYPE"] = 32] = "FARMHOUSE_TYPE";
    BuildTypeEnum[BuildTypeEnum["WORKHOUSE_TYPE"] = 33] = "WORKHOUSE_TYPE";
})(BuildTypeEnum = exports.BuildTypeEnum || (exports.BuildTypeEnum = {}));
// @@
var PropTypeEnum;
(function (PropTypeEnum) {
    PropTypeEnum[PropTypeEnum["WOOD_TYPE"] = 1] = "WOOD_TYPE";
    PropTypeEnum[PropTypeEnum["IRON_TYPE"] = 2] = "IRON_TYPE";
    PropTypeEnum[PropTypeEnum["COIN_TYPE"] = 3] = "COIN_TYPE";
    PropTypeEnum[PropTypeEnum["DIAMONDS_TYPE"] = 4] = "DIAMONDS_TYPE";
    PropTypeEnum[PropTypeEnum["STAR_TYPE"] = 5] = "STAR_TYPE";
    PropTypeEnum[PropTypeEnum["BARRIL_TYPE"] = 6] = "BARRIL_TYPE";
    PropTypeEnum[PropTypeEnum["KEY_TYPE"] = 7] = "KEY_TYPE";
    PropTypeEnum[PropTypeEnum["SHIPANCHORL_TYPE"] = 8] = "SHIPANCHORL_TYPE";
    PropTypeEnum[PropTypeEnum["HORN_TYPE"] = 9] = "HORN_TYPE";
    PropTypeEnum[PropTypeEnum["JAR_TYPE"] = 10] = "JAR_TYPE";
    PropTypeEnum[PropTypeEnum["WEAPON_TYPE"] = 11] = "WEAPON_TYPE";
    PropTypeEnum[PropTypeEnum["FLOWER_TYPE"] = 12] = "FLOWER_TYPE";
    PropTypeEnum[PropTypeEnum["STATUE_TYPE"] = 13] = "STATUE_TYPE";
    PropTypeEnum[PropTypeEnum["SHELL_TYPE"] = 14] = "SHELL_TYPE";
    PropTypeEnum[PropTypeEnum["SOUL_TYPE"] = 15] = "SOUL_TYPE";
    PropTypeEnum[PropTypeEnum["SHELL_MONEY_TYPE"] = 17] = "SHELL_MONEY_TYPE";
    PropTypeEnum[PropTypeEnum["STONE_HERO_TYPE"] = 18] = "STONE_HERO_TYPE";
    PropTypeEnum[PropTypeEnum["FOUNTAIN_TYPE"] = 19] = "FOUNTAIN_TYPE";
    PropTypeEnum[PropTypeEnum["BOX"] = 20] = "BOX";
})(PropTypeEnum = exports.PropTypeEnum || (exports.PropTypeEnum = {}));
// @@
var SpecialEnum;
(function (SpecialEnum) {
    SpecialEnum[SpecialEnum["SPIRIT_TYPE"] = 1] = "SPIRIT_TYPE";
    SpecialEnum[SpecialEnum["CAVES_TYPE"] = 2] = "CAVES_TYPE";
    SpecialEnum[SpecialEnum["ICE_TYPE"] = 3] = "ICE_TYPE";
    SpecialEnum[SpecialEnum["FIRE_TYPE"] = 4] = "FIRE_TYPE";
    SpecialEnum[SpecialEnum["TORTOISE_TYPE"] = 5] = "TORTOISE_TYPE";
})(SpecialEnum = exports.SpecialEnum || (exports.SpecialEnum = {}));
// @@
var HeroTypeEnum;
(function (HeroTypeEnum) {
    HeroTypeEnum[HeroTypeEnum["NORMAL_TYPE"] = 0] = "NORMAL_TYPE";
    HeroTypeEnum[HeroTypeEnum["SUPER_HERO_TYPE"] = 1] = "SUPER_HERO_TYPE";
    HeroTypeEnum[HeroTypeEnum["WALL_TYPE"] = 2] = "WALL_TYPE";
})(HeroTypeEnum = exports.HeroTypeEnum || (exports.HeroTypeEnum = {}));
// @@
var Constants = /** @class */ (function () {
    //
    function Constants() {
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
    Object.defineProperty(Constants, "instance", {
        // @
        get: function () {
            /* if (!this._instance) this._instance = new Constants();
            return this._instance; */
            return this._instance || (this._instance = new Constants());
        },
        enumerable: false,
        configurable: true
    });
    Constants._instance = null;
    return Constants;
}()); // end: Constants
exports.Constants = Constants;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXENvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxLQUFLO0FBQ0wsSUFBWSxVQUtYO0FBTEQsV0FBWSxVQUFVO0lBQ2xCLDZDQUFTLENBQUE7SUFDVCwrQ0FBVSxDQUFBO0lBQ1YsMkNBQVEsQ0FBQTtJQUNSLCtDQUFVLENBQUE7QUFDZCxDQUFDLEVBTFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFLckI7QUFFRCxLQUFLO0FBQ0wsSUFBWSxTQUtYO0FBTEQsV0FBWSxTQUFTO0lBQ2pCLDJDQUFTLENBQUE7SUFDVCxxQ0FBTSxDQUFBO0lBQ04sdUNBQU8sQ0FBQTtJQUNQLHlDQUFRLENBQUE7QUFDWixDQUFDLEVBTFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFLcEI7QUFFRCxLQUFLO0FBQ0wsSUFBWSxZQVNYO0FBVEQsV0FBWSxZQUFZO0lBQ3BCLG1EQUFZLENBQUE7SUFDWixtREFBWSxDQUFBO0lBQ1oseURBQWUsQ0FBQTtJQUNmLG1EQUFZLENBQUE7SUFDWixtREFBWSxDQUFBO0lBQ1osdURBQWMsQ0FBQTtJQUNkLHFFQUFxQixDQUFBO0lBQ3JCLGlFQUFtQixDQUFBO0FBQ3ZCLENBQUMsRUFUVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQVN2QjtBQUVELEtBQUs7QUFDTCxJQUFZLFVBeUJYO0FBekJELFdBQVksVUFBVTtJQUNsQiwrQkFBaUIsQ0FBQTtJQUNqQixpQ0FBbUIsQ0FBQTtJQUNuQiw2QkFBZSxDQUFBO0lBQ2YsNkJBQWUsQ0FBQTtJQUNmLDZCQUFlLENBQUE7SUFDZiw2QkFBZSxDQUFBO0lBQ2YsK0JBQWlCLENBQUE7SUFDakIsNkJBQWUsQ0FBQTtJQUNmLDJCQUFhLENBQUE7SUFDYiwyQkFBYSxDQUFBO0lBQ2IseUJBQVcsQ0FBQTtJQUNYLG1DQUFxQixDQUFBO0lBQ3JCLDJCQUFhLENBQUE7SUFD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QUFJLENBQUMsMkJBQTJCLEdBQUc7WUFDL0IsQ0FBQyxFQUFFO2dCQUNDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztnQkFDN0QsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO2FBQzNDO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztnQkFDN0QsS0FBSzthQUNSO1lBQ0QsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQy9CLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUMvQixDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDL0IsQ0FBQyxFQUFFO2dCQUNDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztnQkFDN0QsS0FBSzthQUNSO1lBQ0QsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO2dCQUM3RCxLQUFLO2FBQ1I7WUFDRCxFQUFFLEVBQUU7Z0JBQ0EsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO2dCQUM3RCxLQUFLO2FBQ1I7WUFDRCxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDaEMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ2hDLEVBQUUsRUFBRSxFQUFFO1NBQ1QsQ0FBQyxDQUFDLG1DQUFtQztRQUN0QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQywwQkFBMEIsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLCtCQUErQixHQUFHLEtBQUssQ0FBQztRQUM3QyxJQUFJLENBQUMsZ0NBQWdDLEdBQUcsS0FBSyxDQUFDO1FBQzlDLElBQUksQ0FBQywrQkFBK0IsR0FBRyxLQUFLLENBQUM7UUFDN0MsSUFBSSxDQUFDLDRCQUE0QixHQUFHLENBQUMsQ0FBQztRQUN0QyxRQUFRO1FBQ1IsSUFBSSxDQUFDLHlCQUF5QixHQUFHLHFCQUFxQixDQUFDO1FBQ3ZELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsaUJBQWlCLENBQUM7UUFDL0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGdCQUFnQixDQUFDO1FBQzdDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUM7UUFDM0MsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDO1FBQy9DLElBQUksQ0FBQywwQkFBMEIsR0FBRyxzQkFBc0IsQ0FBQztRQUN6RCxJQUFJLENBQUMsMkJBQTJCLEdBQUcsdUJBQXVCLENBQUM7UUFDM0QsSUFBSSxDQUFDLHVCQUF1QixHQUFHLG1CQUFtQixDQUFDO1FBQ25ELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUM7UUFDM0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGdCQUFnQixDQUFDO1FBQzdDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxrQkFBa0IsQ0FBQztRQUNqRCxJQUFJLENBQUMseUJBQXlCLEdBQUcscUJBQXFCLENBQUM7UUFDdkQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDO1FBQy9DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUM7UUFDdkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztRQUN2QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsZUFBZSxDQUFDO1FBQzNDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMvQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsZUFBZSxDQUFDO1FBQzNDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxrQkFBa0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsZUFBZSxDQUFDO1FBQzNDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUM7UUFDekMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLG9CQUFvQixDQUFDO1FBQ3JELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxrQkFBa0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsNEJBQTRCLEdBQUcsd0JBQXdCLENBQUM7UUFDN0QsSUFBSSxDQUFDLDZCQUE2QixHQUFHLHlCQUF5QixDQUFDO1FBQy9ELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxrQkFBa0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsa0JBQWtCLENBQUM7UUFDakQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGtCQUFrQixDQUFDO1FBQ2pELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUM7UUFDekMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLG9CQUFvQixDQUFDO1FBQ3JELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUM7UUFDM0MsSUFBSSxDQUFDLDZCQUE2QixHQUFHLHlCQUF5QixDQUFDO1FBQy9ELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0MsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDO1FBQy9DLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMvQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsZUFBZSxDQUFDO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUM7UUFDdkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDO1FBQy9DLElBQUksQ0FBQyw4QkFBOEIsR0FBRywwQkFBMEIsQ0FBQztRQUNqRSxJQUFJLENBQUMseUJBQXlCLEdBQUcscUJBQXFCLENBQUM7UUFDdkQsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLDRCQUE0QixDQUFDO1FBQ3JFLE9BQU87UUFDUCxJQUFJLENBQUMsTUFBTSxHQUFHLHdCQUF3QixDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsb0NBQW9DLENBQUM7UUFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTTtZQUNQLDZEQUE2RCxDQUFDO1FBQ2xFLElBQUksQ0FBQyxNQUFNLEdBQUcscUNBQXFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyw4QkFBOEIsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsa0NBQWtDLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsMkNBQTJDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyw0Q0FBNEMsQ0FBQztRQUM1RCxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPO1lBQ1IseURBQXlELENBQUM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTztZQUNSLDZEQUE2RCxDQUFDO1FBQ2xFLElBQUksQ0FBQyxPQUFPLEdBQUcsdURBQXVELENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRywrQkFBK0IsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTztZQUNSLDREQUE0RCxDQUFDO1FBQ2pFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDZCxHQUFHLEVBQUUsR0FBRztZQUNSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7U0FDWCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNsQixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDUCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixHQUFHO1lBQ3RCLENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsd0JBQXdCO2dCQUM5QixPQUFPLEVBQUUsRUFBRTtnQkFDWCxHQUFHLEVBQUUsQ0FBQztnQkFDTixLQUFLLEVBQUUsQ0FBQztnQkFDUixHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksRUFBRSx1SkFBdUo7Z0JBQzdKLFFBQVEsRUFBRSxHQUFHO2dCQUNiLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSx5QkFBeUI7Z0JBQy9CLE9BQU8sRUFBRSxFQUFFO2dCQUNYLEdBQUcsRUFBRSxDQUFDO2dCQUNOLEtBQUssRUFBRSxDQUFDO2dCQUNSLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO2dCQUN0QixJQUFJLEVBQUUsdUlBQXVJO2dCQUM3SSxRQUFRLEVBQUUsR0FBRztnQkFDYixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixPQUFPLEVBQUUsRUFBRTtnQkFDWCxHQUFHLEVBQUUsQ0FBQztnQkFDTixLQUFLLEVBQUUsQ0FBQztnQkFDUixHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3JCLElBQUksRUFBRSxtSUFBbUk7Z0JBQ3pJLFFBQVEsRUFBRSxDQUFDO2dCQUNYLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxjQUFjO2dCQUNwQixPQUFPLEVBQUUsRUFBRTtnQkFDWCxHQUFHLEVBQUUsQ0FBQztnQkFDTixLQUFLLEVBQUUsQ0FBQztnQkFDUixHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3RCLElBQUksRUFBRSxxSEFBcUg7Z0JBQzNILFFBQVEsRUFBRSxDQUFDO2dCQUNYLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1NBQ0osQ0FBQyxDQUFDLDBCQUEwQjtRQUU3QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1g7Z0JBQ0ksS0FBSyxFQUFFLENBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNWLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO29CQUNwQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTtpQkFDdkM7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRSxDQUFDO2FBQ25CO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLENBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNWLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO29CQUNwQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRTtpQkFDeEM7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRSxDQUFDO2FBQ25CO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLENBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNWLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO29CQUNwQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRTtpQkFDeEM7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRSxDQUFDO2FBQ25CO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLENBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNWLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO29CQUNwQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRTtpQkFDeEM7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRSxDQUFDO2FBQ25CO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLENBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNWLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO29CQUNwQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRTtpQkFDeEM7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRSxDQUFDO2FBQ25CO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLENBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNWLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO29CQUNwQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtpQkFDekM7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRSxLQUFLO2FBQ3ZCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLENBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNWLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO29CQUNwQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTtpQkFDMUM7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRSxLQUFLO2FBQ3ZCO1NBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRCxDQUFDLENBQUMsbUJBQW1CO0lBR3JCLHNCQUFrQixxQkFBUTtRQUQxQixJQUFJO2FBQ0o7WUFDSTtxQ0FDeUI7WUFDekIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDaEUsQ0FBQzs7O09BQUE7SUF2akNhLG1CQUFTLEdBQWMsSUFBSSxDQUFDO0lBd2pDOUMsZ0JBQUM7Q0F6akNELEFBeWpDQyxJQUFBLENBQUMsaUJBQWlCO0FBempDTiw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1eUl0ZW1EYXRhIH0gZnJvbSBcIi4uLy4uL2J1eS9zY3JpcHRzL2RhdGFcIjtcclxuXHJcbi8vIEBAXHJcbmV4cG9ydCBlbnVtIE1vZHVsZVR5cGUge1xyXG4gICAgU0NFTkUgPSAwLFxyXG4gICAgV0lORE9XID0gMSxcclxuICAgIFZJRVcgPSAyLFxyXG4gICAgQk9UVE9NID0gMyxcclxufVxyXG5cclxuLy8gQEBcclxuZXhwb3J0IGVudW0gTGF5ZXJUeXBlIHtcclxuICAgIFNDRU5FID0gMCxcclxuICAgIFVJID0gMSxcclxuICAgIFRPUCA9IDIsXHJcbiAgICBEUkFHID0gMyxcclxufVxyXG5cclxuLy8gQEBcclxuZXhwb3J0IGVudW0gUmV3YXJkSWRFbnVtIHtcclxuICAgIFNUQVIgPSAxMTAwMSxcclxuICAgIEdPTEQgPSAxMTAwMixcclxuICAgIERJQU1PTkQgPSAxMTAwMyxcclxuICAgIFdPT0QgPSAxMTAwNCxcclxuICAgIElST04gPSAxMTAwNSxcclxuICAgIEJBUlJFTCA9IDExMDA2LFxyXG4gICAgU0lMVkVSX0JBUlJFTCA9IDExMDA3LFxyXG4gICAgR09MRF9CQVJSRUwgPSAxMTAwOCxcclxufVxyXG5cclxuLy8gQEBcclxuZXhwb3J0IGVudW0gQnVuZGxlTmFtZSB7XHJcbiAgICBDT01NT04gPSBcImNvbW1vblwiLFxyXG4gICAgTE9BRElORyA9IFwibG9hZGluZ1wiLFxyXG4gICAgTG9naW4gPSBcImxvZ2luXCIsXHJcbiAgICBHVUlERSA9IFwiZ3VpZGVcIixcclxuICAgIFNUQVJUID0gXCJzdGFydFwiLFxyXG4gICAgRklHSFQgPSBcImZpZ2h0XCIsXHJcbiAgICBMQURERVIgPSBcImxhZGRlclwiLFxyXG4gICAgU1RPUkUgPSBcInN0b3JlXCIsXHJcbiAgICBUQVNLID0gXCJ0YXNrXCIsXHJcbiAgICBTSUdOID0gXCJzaWduXCIsXHJcbiAgICBCdXkgPSBcImJ1eVwiLFxyXG4gICAgU0VUVElOR1MgPSBcInNldHRpbmdzXCIsXHJcbiAgICBNQUlMID0gXCJtYWlsXCIsXHJcbiAgICBSRUNPUkQgPSBcInJlY29yZFwiLFxyXG4gICAgTFVDS1lfV0hFRUwgPSBcImx1Y2t5X3doZWVsXCIsXHJcbiAgICBURVNUID0gXCJ0ZXN0XCIsXHJcbiAgICBNQVAgPSBcIm1hcFwiLFxyXG4gICAgQlVJTERfRlVOQ1RJT04gPSBcImJ1aWxkRnVuY3Rpb25cIixcclxuICAgIFNQRUNJQUxfQlVJTEQgPSBcInNwZWNpYWxfYnVpbGRcIixcclxuICAgIEJPT0sgPSBcImJvb2tcIixcclxuICAgIERFQlVHID0gXCJkZWJ1Z1wiLFxyXG4gICAgR1VJREVHSUZUID0gXCJndWlkZUdpZnRcIixcclxuICAgIEFERF9ERVNLVE9QID0gXCJhZGRfZGVza3RvcFwiLFxyXG4gICAgU1VQRVJfUkVDUlVJVCA9IFwic3VwZXJfcmVjcnVpdFwiLFxyXG59XHJcblxyXG4vLyBAQFxyXG5leHBvcnQgZW51bSBBQlRlc3Qge1xyXG4gICAgQSA9IFwiYV90ZXN0XCIsXHJcbiAgICBCID0gXCJiX3Rlc3RcIixcclxufVxyXG5cclxuLy8gQEBcclxuZXhwb3J0IGVudW0gSXRlbVR5cGVFbnVtIHtcclxuICAgIElURU1fVFlQRSA9IDEsXHJcbiAgICBCVUlMRF9UWVBFID0gMixcclxuICAgIEhFUk9fVFlQRSA9IDMsXHJcbn1cclxuXHJcbi8vIEBAXHJcbmV4cG9ydCBlbnVtIFNldEl0ZW1OdW1FbnVtIHtcclxuICAgIEFERF9JVEVNX1RZUEUgPSAxLFxyXG4gICAgUkVEVUNFX0lURU1fVFlQRSA9IDIsXHJcbn1cclxuXHJcbi8vIEBAXHJcbmV4cG9ydCBlbnVtIEJ1aWxkVHlwZUVudW0ge1xyXG4gICAgVE9XRVJfVFlQRSA9IDEsXHJcbiAgICBCQVJSQUNLU19UWVBFID0gMixcclxuICAgIFBSSVZBVEVIT1VTSU5HX1RZUEUgPSAzLFxyXG4gICAgTE9HR0lOR0ZJRUxEX1RZUEUgPSA0LFxyXG4gICAgTUlOSU5HV0VMTF9UWVBFID0gNSxcclxuICAgIEdBUlJJU0lPTl9UWVBFID0gNixcclxuICAgIFNUQUxMX1RZUEUgPSA3LFxyXG4gICAgV0FMTF9UWVBFID0gOCxcclxuICAgIFdIQVJGVEFYX1RZUEUgPSA5LFxyXG4gICAgU0VBR09JTkdCT0FUX1RZUEUgPSAxMCxcclxuICAgIEZJU0hIT1VTRV9UWVBFID0gMzEsXHJcbiAgICBGQVJNSE9VU0VfVFlQRSA9IDMyLFxyXG4gICAgV09SS0hPVVNFX1RZUEUgPSAzMyxcclxufVxyXG5cclxuLy8gQEBcclxuZXhwb3J0IGVudW0gUHJvcFR5cGVFbnVtIHtcclxuICAgIFdPT0RfVFlQRSA9IDEsXHJcbiAgICBJUk9OX1RZUEUgPSAyLFxyXG4gICAgQ09JTl9UWVBFID0gMyxcclxuICAgIERJQU1PTkRTX1RZUEUgPSA0LFxyXG4gICAgU1RBUl9UWVBFID0gNSxcclxuICAgIEJBUlJJTF9UWVBFID0gNixcclxuICAgIEtFWV9UWVBFID0gNyxcclxuICAgIFNISVBBTkNIT1JMX1RZUEUgPSA4LFxyXG4gICAgSE9STl9UWVBFID0gOSxcclxuICAgIEpBUl9UWVBFID0gMTAsXHJcbiAgICBXRUFQT05fVFlQRSA9IDExLFxyXG4gICAgRkxPV0VSX1RZUEUgPSAxMixcclxuICAgIFNUQVRVRV9UWVBFID0gMTMsXHJcbiAgICBTSEVMTF9UWVBFID0gMTQsXHJcbiAgICBTT1VMX1RZUEUgPSAxNSxcclxuICAgIFNIRUxMX01PTkVZX1RZUEUgPSAxNyxcclxuICAgIFNUT05FX0hFUk9fVFlQRSA9IDE4LFxyXG4gICAgRk9VTlRBSU5fVFlQRSA9IDE5LFxyXG4gICAgQk9YID0gMjAsXHJcbn1cclxuXHJcbi8vIEBAXHJcbmV4cG9ydCBlbnVtIFNwZWNpYWxFbnVtIHtcclxuICAgIFNQSVJJVF9UWVBFID0gMSxcclxuICAgIENBVkVTX1RZUEUgPSAyLFxyXG4gICAgSUNFX1RZUEUgPSAzLFxyXG4gICAgRklSRV9UWVBFID0gNCxcclxuICAgIFRPUlRPSVNFX1RZUEUgPSA1LFxyXG59XHJcblxyXG4vLyBAQFxyXG5leHBvcnQgZW51bSBIZXJvVHlwZUVudW0ge1xyXG4gICAgTk9STUFMX1RZUEUgPSAwLFxyXG4gICAgU1VQRVJfSEVST19UWVBFID0gMSxcclxuICAgIFdBTExfVFlQRSA9IDIsXHJcbn1cclxuXHJcbi8qIGtow7RuZyBz4butIGThu6VuZ1xyXG4vLyBAXHJcbmV4cG9ydCBlbnVtIExvYWRpbmdNb2RlIHtcclxuICAgIE5PTkUgPSAwLFxyXG4gICAgRlVMTF9TQ1JFRU4gPSAxXHJcbn1cclxuLy8gQFxyXG5leHBvcnQgZW51bSBUYXNrVHlwZUVudW0ge1xyXG4gICAgVEFTS19BQ0hJVkVNRU5UID0gMSxcclxuICAgIFRBU0tfREFJTFkgPSAyXHJcbn1cclxuLy8gQFxyXG5leHBvcnQgZW51bSBUYXNrU3RhdGVFbnVtIHtcclxuICAgIEFDQ0VQVCA9IDAsXHJcbiAgICBGSU5JU0ggPSAxLFxyXG4gICAgR09UX1JFV0FSRCA9IDJcclxufVxyXG4vLyBAXHJcbmV4cG9ydCBlbnVtIEhlcm9UYWJUeXBlIHtcclxuICAgIEhFUk8gPSAwLFxyXG4gICAgVVBHUkFERSA9IDEsXHJcbiAgICBVUEdSQURFX1NUQVIgPSAyLFxyXG4gICAgU0NJRU5DRSA9IDNcclxufVxyXG4qL1xyXG5cclxuLy8gQCAobmV3KVxyXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpY2Uge1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZTtcclxuICAgIGxvYWRfdXJsOiBzdHJpbmc7XHJcbiAgICBsYXllcl90eXBlOiBMYXllclR5cGU7XHJcbiAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZTtcclxuICAgIGhhc19vcGVuX2VmZmVjdD86IGJvb2xlYW47XHJcbn1cclxuXHJcbi8vIEAgKG5ldylcclxuaW50ZXJmYWNlIFR1cnRsZUV4Y2hhbmdlSXRlbSB7XHJcbiAgICBwcm9wX2lkOiBSZXdhcmRJZEVudW07XHJcbiAgICBwcm9wX251bTogbnVtYmVyO1xyXG4gICAgZXhjaGFuZ2VfcHJvcF9pZDogUmV3YXJkSWRFbnVtO1xyXG4gICAgZXhjaGFuZ2VfcHJvcF9udW06IG51bWJlcjtcclxufVxyXG5cclxuLy8gQCAobmV3KVxyXG5pbnRlcmZhY2UgTG9jYWxDbG91ZEFyZWEge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGlhbW9uZDogbnVtYmVyO1xyXG4gICAgbHZsOiBudW1iZXI7XHJcbiAgICBpbmRleDogbnVtYmVyO1xyXG4gICAgcG9zOiBjYy5WZWMzO1xyXG4gICAgZGVzYzogc3RyaW5nO1xyXG4gICAgbWFwSW5kZXg6IG51bWJlcjtcclxuICAgIHJlcG9ydE51bTogbnVtYmVyO1xyXG59XHJcblxyXG4vLyBAIChuZXcpXHJcbmludGVyZmFjZSBJTHVja3lXaGVlbFJld2FyZCB7XHJcbiAgICB0eXBlOiBudW1iZXI7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgbnVtOiBudW1iZXI7XHJcbiAgICB3ZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuLy8gQCAobmV3KVxyXG5pbnRlcmZhY2UgSU1hcFJlcG9ydFByb3BNYXAge1xyXG4gICAgbWF4X251bTogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG59XHJcbi8vIEAgKG5ldylcclxudHlwZSBUTWFwUmVwb3J0UHJvcE1hcCA9IFJlY29yZDxudW1iZXIsIFJlYWRvbmx5PElNYXBSZXBvcnRQcm9wTWFwPj47XHJcblxyXG4vLyBAIChuZXcpXHJcbnR5cGUgRnVuUG9zTGlzdCA9IFJlY29yZDxudW1iZXIsIG51bWJlcj47XHJcblxyXG4vLyBAIChuZXcpIGdp4buRbmcgRnVuUG9zTGlzdFxyXG50eXBlIEhlcm9SYW5kb21MaXN0ID0gUmVjb3JkPG51bWJlciwgbnVtYmVyPjtcclxuXHJcbi8vIEAgKG5ldylcclxudHlwZSBUUmVwb3J0QnVpbGRpbmdVcGdyYWRlID0gUmVjb3JkPG51bWJlciwgUmVhZG9ubHlBcnJheTxudW1iZXI+PjtcclxuXHJcbi8vIEBAXHJcbmV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG4gICAgcHVibGljIHN0YXRpYyBfaW5zdGFuY2U6IENvbnN0YW50cyA9IG51bGw7XHJcbiAgICAvL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IE5vdGljZTogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgTm90aWNlSXRlbTogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgRmx5Tm90aWNlOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBGbHlOb3RpY2VJdGVtOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBDb2luRmx5QW5pbTogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgR3VpZGU6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEl0ZW1GbHk6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEdVSURFX1NIT1dfVElQU19PUDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgTG9naW46IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IExvYWRpbmc6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFN0b3J5OiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBTdGFydDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgRmlnaHQ6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEZpZ2h0UmVzdWx0OiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBGaWdodExvc3Q6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEZpZ2h0UmV2aXZlSGVybzogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgRmlnaHRSZXR1cm46IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IExhZGRlcjogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgTEFEREVSVVBMVkxBTklNOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBMQURERVJVUExWTEFOSU1QVlA6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEdldFJlZWw6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFRhc2s6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFNpZ246IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEJ1eTogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgU2V0dGluZ3M6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFJlbmFtZTogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQW5ub3VuY2VtZW50OiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBTdXBlclJlY3J1aXQ6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEx1Y2t5V2hlZWw6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IE1haWw6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IE1haWxEZXRhaWxzOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBNYWlsTG9nTm90aWNlOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBEZWJ1ZzogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQWRkRGVza3RvcDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgU3RvcmU6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFJlY29yZDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgUmVjb3JkU2hhcmU6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IE1BUFVJOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIC8vIFBST1BVSTogUmVhZG9ubHk8SU5vdGljZT47IC8vIChub3QgdXNlZClcclxuICAgIHB1YmxpYyByZWFkb25seSBCVUlMRF9VUEdSQURFOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBHT0JBVFRMRTogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgR0VUQ09JTk9QOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBCVVlCQVJSRUxPUDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgTkVXSEVST0FOSU06IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFR1cnRsZUV4Y2hhbmdlOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBQT1NFSURPTjogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQlVJTERJTkZPOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBGSVJFV09SS1M6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEdVSURFR0lGVDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQkFSUkFDS1NfTElTVDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgR1VJREVMT1A6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEdFVERPVUJMRU9QOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBHRVRQT1NFSURPTk9QOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBPRkZMSU5FT1A6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFVOTE9DS0FSRUFDTE9VRE9QOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBHRVRSRVdBUkRPUDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgU1VQRVJIRVJPT1A6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IERFRkVOU0U6IFJlYWRvbmx5PElOb3RpY2U+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEZJR0hUT0ZGTElORU9QOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBBdXRvTWVyZ2VNZXNzYWdlOiBSZWFkb25seTxJTm90aWNlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBSTUJTVE9SRTogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVklQR0lGVDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQk9PSzogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQk9PS19IRVJPX0RFVEFJTDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQk9PS19JVEVNX0RFVEFJTDogUmVhZG9ubHk8SU5vdGljZT47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgR0VUX01FUlRSQUlMX09QOiBSZWFkb25seTxSZWFkb25seTxJTm90aWNlPj47XHJcbiAgICAvL1xyXG4gICAgLy8gcHVibGljIHJlYWRvbmx5IENMT1NFX0JUTl9ERUxBWV9USU1FOiBudW1iZXI7IC8vIChub3QgdXNlZClcclxuICAgIHB1YmxpYyByZWFkb25seSBUQVNLX05PVF9DT01QTEVURV9DT0xPUjogY2MuQ29sb3I7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEFTS19DT01QTEVURV9DT0xPUjogY2MuQ29sb3I7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVFVSVExFX0VYQ0hBTkdFX01BWF9SRUZSRVNIX0NPVU5UOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVFVSVExFX0VYQ0hBTkdFX1JFRlJFU0hfRElBTU9ORDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFRVUlRMRV9FWENIQU5HRV9JVEVNX0RBVEFfQVJSQVk6IFJlYWRvbmx5QXJyYXk8VHVydGxlRXhjaGFuZ2VJdGVtPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBUVVJUTEVfRVhDSEFOR0VfQ09MT1JfTElHSFQ6IGNjLkNvbG9yO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFRVUlRMRV9FWENIQU5HRV9DT0xPUl9EQVJUOiBjYy5Db2xvcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBGSUdIVF9TUEVFRF9YMTogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEZJR0hUX1NQRUVEX1gyOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgU1RPUkVfUkVGUkVTSF9USU1FOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQ09MT1JfUkVEOiBjYy5Db2xvcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBDT0xPUl9ZRUxMT1c6IGNjLkNvbG9yO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IE1JTl9MT0FESU5HX1RJTUU6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBXQUxMX0NBTExfUkFOR0U6IG51bWJlcjtcclxuICAgIC8vIHB1YmxpYyByZWFkb25seSBMRUFHVUVfTkFNRV9DT0xPUl9BUlJBWTogUmVhZG9ubHlBcnJheTxjYy5Db2xvcj47IC8vIChub3QgdXNlZClcclxuICAgIC8vIHB1YmxpYyByZWFkb25seSBMRUFHVUVfU1RBUl9DT0xPUl9BUlJBWTogUmVhZG9ubHlBcnJheTxjYy5Db2xvcj47IC8vIChub3QgdXNlZClcclxuICAgIHB1YmxpYyByZWFkb25seSBSRU5BTUVfRElBTU9ORF9QUklDRTogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IE1BUF9SRVBPUlRfUFJPUF9NQVA6IFJlYWRvbmx5PFRNYXBSZXBvcnRQcm9wTWFwPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBSRURfU1VQRVJfUkVDUlVJVF9ESUFNT05EOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgTUFYX1NVUEVSX1JFQ1JVSVRfVklERU9fQ09VTlQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBZRUxMT1dfU1VQRVJfUkVDUlVJVF9HT0xEOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgTUFYX0xVQ0tZX1dIRUVMX0ZSRUVfQ09VTlQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBNQVhfTFVDS1lfV0hFRUxfVklERU9fQ09VTlQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBGUkVFX0RSQVdfVElNRV9JTlRFUlZBTDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IExVQ0tZX1dIRUVMX1JFV0FSRF9BUlJBWTogUmVhZG9ubHlBcnJheTxJTHVja3lXaGVlbFJld2FyZD47XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgUkVQT1JUX0JVSUxESU5HX1VQR1JBREVfTUFQOiBSZWFkb25seTxUUmVwb3J0QnVpbGRpbmdVcGdyYWRlPjtcclxuICAgIHB1YmxpYyByZWFkb25seSBNQVhfUFVTSF9TSEFSRV9DT1VOVDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IE1BWF9WSURFT19GQUlMX1NIQVJFX0NPVU5UOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQUREX0RFU0tUT1BfUkVXQVJEX0xFRlRfSEVST19JRDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFERF9ERVNLVE9QX1JFV0FSRF9SSUdIVF9IRVJPX0lEOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgRklHSFRfUkVUVVJOX0JVVFRPTl9BUFBFQVJfVElNRTogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IE1BWF9GUkVFX1NVUEVSX1JFQ1JVSVRfQ09VTlQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18xX0JBUlJBQ0tfQ0FSRF9NT1ZFOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fMl9CQVJSQUNLX09QRU46IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18zX1VQR1JBREVfQ0xPU0U6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT180X1VQR1JBREVfT1BFTjogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzVfVEFTS19SRVdBUkQ6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT182X0pJQU5aVVNIRUdOSkk6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT183X0JVSUxESU5HX1VQR1JBRElORzogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzhfQlVJTERJTkdfT1BFTl9DTE9TRTogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzlfQ0FOQ0VMX1BSRVNFTkNFOiBzdHJpbmc7IC8vIChub3QgdXNlZClcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18xMF9KSUFOTVVUT05HOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fMTJfQlVZX1NVQ0NFU1M6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18xM19XT09EX0JVWV9JVEVNOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fMTRfRElBTU9ORF9CVVlfSVRFTTogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzE1X1VOTE9DS19TVE9SRTogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzE2X0JVWV9JVEVNOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fMTdfR09MRF9GTFk6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18xOF9GSUdIVF9USU1FOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fMTlfRklHSFRfUkVUVVJOOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fMjBfRklHSFRfRkFJTDogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzIxX0ZJR0hUX1NVQ0NFU1M6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18yM19IRVJPX0RFQVRIOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fMjRfRFJPUF9JVEVNOiBzdHJpbmc7IC8vIChub3QgdXNlZClcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18yNV9MQURERVJfU1RBUl9GTFk6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18yNl9MQURERVJfUkVXQVJEOiBzdHJpbmc7IC8vIChub3QgdXNlZClcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18yN19MQURERVJfVVBHUkFERV9PUEVOOiBzdHJpbmc7IC8vIChub3QgdXNlZClcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18yOF9MQURERVJfVVBHUkFERV9DTE9TRTogc3RyaW5nOyAvLyAobm90IHVzZWQpXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fMjlfTEFEREVSX1NUQVJfMTogc3RyaW5nOyAvLyAobm90IHVzZWQpXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fMzBfTEFEREVSX1NUQVJfMjogc3RyaW5nOyAvLyAobm90IHVzZWQpXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fMzFfTEFEREVSX1NUQVJfMzogc3RyaW5nOyAvLyAobm90IHVzZWQpXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fODhfR0VaSVNIRU5HOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fOTBfU1RBVFVFX0JSRUFLSU5HOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fOTFfTUFJTl9NVVNJQzogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzkyX0xPQURJTkdfSVNMQU5EX01VU0lDOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQVVESU9fOTNfRklHSFRfTVVTSUM6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT185NV9DQVZFU19NVVNJQzogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzk2X0lTTEFORF9NVVNJQzogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzE1OV9NVVRPTkdMVU9ESTogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzE2MF9DSEFOR0VQT1M6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBBVURJT18xNjFfQ09NUE9TRTogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzE2Ml9ESUFNT05EX0ZMWTogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzE2M19VTkxPQ0tfTkVXX0hFUk9fQU5JTTogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzE2NF9VTkxPQ0tfTkVXX0hFUk86IHN0cmluZzsgLy8gKG5vdCB1c2VkKVxyXG4gICAgcHVibGljIHJlYWRvbmx5IEFVRElPXzE2NV9QVVRfUFJPUF9JTlRPX0JVSUxESU5HOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF8xOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF8yOiBzdHJpbmc7IC8vIChub3QgdXNlZCA/Pz8pXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF8zOiBzdHJpbmc7IC8vIChub3QgdXNlZCA/Pz8pXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF80OiBzdHJpbmc7IC8vIChub3QgdXNlZCA/Pz8pXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF81OiBzdHJpbmc7IC8vIChub3QgdXNlZCA/Pz8pXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF82OiBzdHJpbmc7IC8vIChub3QgdXNlZCA/Pz8pXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF83OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF84OiBzdHJpbmc7IC8vIChub3QgdXNlZCA/Pz8pXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF85OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF8xMDogc3RyaW5nOyAvLyAobm90IHVzZWQgPz8/KVxyXG4gICAgcHVibGljIHJlYWRvbmx5IFRFWFRfMTE6IHN0cmluZzsgLy8gKG5vdCB1c2VkID8/PylcclxuICAgIHB1YmxpYyByZWFkb25seSBURVhUXzEyOiBzdHJpbmc7IC8vIChub3QgdXNlZCA/Pz8pXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF8xMzogc3RyaW5nOyAvLyAobm90IHVzZWQgPz8/KVxyXG4gICAgcHVibGljIHJlYWRvbmx5IFRFWFRfMTQ6IHN0cmluZzsgLy8gKG5vdCB1c2VkID8/PylcclxuICAgIHB1YmxpYyByZWFkb25seSBURVhUXzE1OiBzdHJpbmc7IC8vIChub3QgdXNlZCA/Pz8pXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF8xNjogc3RyaW5nOyAvLyAobm90IHVzZWQgPz8/KVxyXG4gICAgcHVibGljIHJlYWRvbmx5IFRFWFRfMTc6IHN0cmluZzsgLy8gKG5vdCB1c2VkID8/PylcclxuICAgIHB1YmxpYyByZWFkb25seSBURVhUXzE4OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF8xOTogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFRFWFRfMjA6IHN0cmluZzsgLy8gKG5vdCB1c2VkID8/PylcclxuICAgIHB1YmxpYyByZWFkb25seSBURVhUXzIxOiBzdHJpbmc7IC8vIChub3QgdXNlZCA/Pz8pXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgVEVYVF8yMjogc3RyaW5nOyAvLyAobm90IHVzZWQgPz8/KVxyXG4gICAgcHVibGljIHJlYWRvbmx5IFRFWFRfMjM6IHN0cmluZzsgLy8gKG5vdCB1c2VkID8/PylcclxuICAgIHB1YmxpYyBvcGVuQnVpbGRJRDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHNoaXBJRDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IE1BWF9DRUxMX05VTTogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGZ1blBvc0xpc3Q6IFJlYWRvbmx5PEZ1blBvc0xpc3Q+OyAvLyBSZWFkb25seTxSZWNvcmQ8bnVtYmVyLCBudW1iZXI+PlxyXG4gICAgcHVibGljIHJlYWRvbmx5IGhlcm9SYW5kb21MaXN0OiBSZWFkb25seTxIZXJvUmFuZG9tTGlzdD47IC8vIFJlYWRvbmx5PFJlY29yZDxudW1iZXIsIG51bWJlcj4+XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9jYWxDbG91ZEFyZWFMaXN0OiBSZWFkb25seTxcclxuICAgICAgICBSZWNvcmQ8bnVtYmVyLCBSZWFkb25seTxMb2NhbENsb3VkQXJlYT4+XHJcbiAgICA+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEhFUk9HSUZUSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBHSUZUSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBQQUdPREFHSUZUSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBTVVBFUkhFUk9SRUxJVkVUSU1FOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgU1VQRVJIRVJPUkVDSVZFVElNRTogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFNVUEVSSEVST1JFQ0lWRUhQOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgQ0FWRVNBUkVBSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBJQ0VBUkVBSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBGSVJFUkVBSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBNQVhfUk9XOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgTUFYX0NPTFVNTjogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFdBTExOQU1FTElTVDogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IEJ1eURhdGE6IEJ1eUl0ZW1EYXRhW107XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLk5vdGljZSA9IHtcclxuICAgICAgICAgICAga2V5OiBcIk5vdGljZVwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5DT01NT04sXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvbm90aWNlXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5UT1AsXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuTm90aWNlSXRlbSA9IHtcclxuICAgICAgICAgICAga2V5OiBcIk5vdGljZUl0ZW1cIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuQ09NTU9OLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL25vdGljZV9pdGVtXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5UT1AsXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLlZJRVcsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkZseU5vdGljZSA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkZseU5vdGljZVwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5DT01NT04sXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvZmx5X25vdGljZVwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVE9QLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkZseU5vdGljZUl0ZW0gPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJGbHlOb3RpY2VJdGVtXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLkNPTU1PTixcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9mbHlfbm90aWNlX2l0ZW1cIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlRPUCxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuVklFVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuQ29pbkZseUFuaW0gPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJDb2luRmx5QW5pbVwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5DT01NT04sXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvY29pbl9mbHlfYW5pbVwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVE9QLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5WSUVXLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5HdWlkZSA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkd1aWRlXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLkdVSURFLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL2d1aWRlXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5UT1AsXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLlZJRVcsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkl0ZW1GbHkgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJJdGVtRmx5XCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9pdGVtRmx5XCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuVklFVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuR1VJREVfU0hPV19USVBTX09QID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiR3VpZGVyU2hvd1RpcHNcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuR1VJREUsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvZ3VpZGVyU2hvd1RpcHNcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlRPUCxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuVklFVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuTG9hZGluZyA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkxvYWRpbmdcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuTE9BRElORyxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9sb2FkaW5nXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5UT1AsXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuTG9naW4gPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJMb2dpblwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5Mb2dpbixcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9sb2dpblwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVE9QLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLlN0b3J5ID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiU3RvcnlcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuTE9BRElORyxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9zdG9yeVwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVE9QLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLlN0YXJ0ID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiU3RhcnRcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuU1RBUlQsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvc3RhcnRcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5TQ0VORSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuRmlnaHQgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJGaWdodFwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5GSUdIVCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9maWdodFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuU0NFTkUsXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLlNDRU5FLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5GaWdodFJlc3VsdCA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkZpZ2h0UmVzdWx0XCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLkZJR0hULFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL2ZpZ2h0X3Jlc3VsdFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuRmlnaHRMb3N0ID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiRmlnaHRMb3N0XCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLkZJR0hULFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL2ZpZ2h0X2xvc3RcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkZpZ2h0UmV2aXZlSGVybyA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkZpZ2h0UmV2aXZlSGVyb1wiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5GSUdIVCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9maWdodF9yZXZpdmVfaGVyb1wiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuRmlnaHRSZXR1cm4gPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJGaWdodFJldHVyblwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5GSUdIVCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9maWdodF9yZXR1cm5cIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkxhZGRlciA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkxhZGRlclwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5MQURERVIsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvbGFkZGVyXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5MQURERVJVUExWTEFOSU0gPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJMYWRkZXJVcEx2bEFuaW1cIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuTEFEREVSLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL2xhZGRlclVwTHZsQW5pbVwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuTEFEREVSVVBMVkxBTklNUFZQID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiTGFkZGVyVXBMdmxBbmltUFZQXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLkxBRERFUixcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9sYWRkZXJVcEx2bEFuaW1QVlBcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkdldFJlZWwgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJHZXRSZWVsXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9nZXRfcmVlbFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuVGFzayA9IHtcclxuICAgICAgICAgICAga2V5OiBcIlRhc2tcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuVEFTSyxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy90YXNrXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5TaWduID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiU2lnblwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5TSUdOLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL3NpZ25cIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkJ1eSA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkJ1eVwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5CdXksXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvYnV5XCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5TZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAga2V5OiBcIlNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLlNFVFRJTkdTLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL3NldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5SZW5hbWUgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJSZW5hbWVcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuU0VUVElOR1MsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvcmVuYW1lXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5Bbm5vdW5jZW1lbnQgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJBbm5vdW5jZW1lbnRcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuU0VUVElOR1MsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvYW5ub3VuY2VtZW50XCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5TdXBlclJlY3J1aXQgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJTdXBlclJlY3J1aXRcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuU1VQRVJfUkVDUlVJVCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9zdXBlcl9yZWNydWl0XCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5MdWNreVdoZWVsID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiTHVja3lXaGVlbFwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5MVUNLWV9XSEVFTCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9sdWNreV93aGVlbFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuTWFpbCA9IHtcclxuICAgICAgICAgICAga2V5OiBcIk1haWxcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuTUFJTCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9tYWlsXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5NYWlsRGV0YWlscyA9IHtcclxuICAgICAgICAgICAga2V5OiBcIk1haWxEZXRhaWxzXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BSUwsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvbWFpbF9kZXRhaWxzXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5NYWlsTG9nTm90aWNlID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiTWFpbExvZ05vdGljZVwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5NQUlMLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL21haWxfbG9nX25vdGljZVwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuRGVidWcgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJEZWJ1Z1wiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5ERUJVRyxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9kZWJ1Z1wiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuQWRkRGVza3RvcCA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkFkZERlc2t0b3BcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuQUREX0RFU0tUT1AsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvYWRkX2Rlc2t0b3BcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLlN0b3JlID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiU3RvcmVMaXN0XCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLlNQRUNJQUxfQlVJTEQsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvc3RvcmVcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLlJlY29yZCA9IHtcclxuICAgICAgICAgICAga2V5OiBcIlJlY29yZFwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5SRUNPUkQsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvcmVjb3JkXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5SZWNvcmRTaGFyZSA9IHtcclxuICAgICAgICAgICAga2V5OiBcIlJlY29yZFNoYXJlXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLlJFQ09SRCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9yZWNvcmRfc2hhcmVcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLk1BUFVJID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiTWFpbk1hcFVJXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9tYWluVUlcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5TQ0VORSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qIC8vIChub3QgdXNlZClcclxuICAgICAgICB0aGlzLlBST1BVSSA9IHtcclxuICAgICAgICAgICAga2V5OiBcIlByb3BJdGVtXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9wcm9wSXRlbVwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLlZJRVdcclxuICAgICAgICB9OyAqL1xyXG4gICAgICAgIHRoaXMuQlVJTERfVVBHUkFERSA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkJ1aWxkVXBncmFkZVwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvYnVpbGRVcGdyYWRlXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuVklFVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuR09CQVRUTEUgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJHb0JhdHRsZU9wXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9nb0JhdHRsZVwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuR0VUQ09JTk9QID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiR2V0Q29pbk9wXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9nZXRDb2luT3BcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkJVWUJBUlJFTE9QID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiQnV5QmFycmVsT3BcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL2J1eUJhdHRsZU9wXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ORVdIRVJPQU5JTSA9IHtcclxuICAgICAgICAgICAga2V5OiBcIk5ld0hlcm9BbmltXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9uZXdIZXJvQW5pbVwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuVHVydGxlRXhjaGFuZ2UgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJUdXJ0bGVFeGNoYW5nZVwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvdHVydGxlX2V4Y2hhbmdlXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5QT1NFSURPTiA9IHtcclxuICAgICAgICAgICAga2V5OiBcIlBvc2VpZG9uXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9wb3NlaWRvblwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuQlVJTERJTkZPID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiQnVpbGRJbmZvXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9idWlsZEluZm9cIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkZJUkVXT1JLUyA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkZpcmV3b3Jrc1wiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvZmlyZXdvcmtzXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5HVUlERUdJRlQgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJHdWlkZUdpZnRcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuR1VJREVHSUZULFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL2d1aWRlR2lmdFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuQkFSUkFDS1NfTElTVCA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkJhcnJhY2tzTGlzdFwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5CVUlMRF9GVU5DVElPTixcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9iYXJyYWNrc0xpc3RcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkdVSURFTE9QID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiTmV3ZXJHdWlkZU9wXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLkdVSURFLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL25ld2VyR3VpZGVPcFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuR0VURE9VQkxFT1AgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJHZXREb3VibGVSZXdhcmRPcFwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvZ2V0RG91YmxlUmV3YXJkT3BcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkdFVFBPU0VJRE9OT1AgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJHZXRQb3NlaWRvbk9wXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9nZXRQb3NlaWRvbk9wXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5PRkZMSU5FT1AgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJPZmZsaW5lT3BcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL29mZmxpbmVPcFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuVU5MT0NLQVJFQUNMT1VET1AgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJVbkxvY2tBcmVhQ2xvdWRcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL3VubG9ja0FyZWFDbG91ZE9wXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5HRVRSRVdBUkRPUCA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkdldFJld2FyZE9wXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9nZXRSZXdhcmRPcFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuU1VQRVJIRVJPT1AgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJTdXBlckhlcm9cIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL3N1cGVySGVyb1wiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuREVGRU5TRSA9IHtcclxuICAgICAgICAgICAga2V5OiBcIkRlZmVuc2VPcFwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvZGVmZW5zZVwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuRklHSFRPRkZMSU5FT1AgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJGaWdodE9mZmxpbmVPcFwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvZmlnaHRPZmZsaW5lT3BcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkF1dG9NZXJnZU1lc3NhZ2UgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJBdXRvTWVyZ2VNZXNzYWdlXCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9hdXRvX21lcmdlX21lc3NhZ2VcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLlJNQlNUT1JFID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiUk1CU3RvcmVcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuU1RPUkUsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvc3RvcmVPcFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuVklQR0lGVCA9IHtcclxuICAgICAgICAgICAga2V5OiBcIlZpcEdpZnRcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuU1RPUkUsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvdmlwR2lmdFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuQk9PSyA9IHtcclxuICAgICAgICAgICAga2V5OiBcIlNjZW5lQm9va1ZpZXdcIixcclxuICAgICAgICAgICAgYnVuZGxlX25hbWU6IEJ1bmRsZU5hbWUuQk9PSyxcclxuICAgICAgICAgICAgbG9hZF91cmw6IFwicHJlZmFicy9ib29rXCIsXHJcbiAgICAgICAgICAgIGxheWVyX3R5cGU6IExheWVyVHlwZS5VSSxcclxuICAgICAgICAgICAgbW9kdWxlX3R5cGU6IE1vZHVsZVR5cGUuV0lORE9XLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5CT09LX0hFUk9fREVUQUlMID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiU2NlbmVIZXJvRGV0YWlsVmlld1wiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5CT09LLFxyXG4gICAgICAgICAgICBsb2FkX3VybDogXCJwcmVmYWJzL2Jvb2tfaGVyb19kZXRhaWxcIixcclxuICAgICAgICAgICAgbGF5ZXJfdHlwZTogTGF5ZXJUeXBlLlVJLFxyXG4gICAgICAgICAgICBtb2R1bGVfdHlwZTogTW9kdWxlVHlwZS5XSU5ET1csXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLkJPT0tfSVRFTV9ERVRBSUwgPSB7XHJcbiAgICAgICAgICAgIGtleTogXCJTY2VuZUl0ZW1EZXRhaWxWaWV3XCIsXHJcbiAgICAgICAgICAgIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lLkJPT0ssXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvYm9va19pdGVtX2RldGFpbFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuR0VUX01FUlRSQUlMX09QID0ge1xyXG4gICAgICAgICAgICBrZXk6IFwiR2V0TWVydHJhaWxPcFwiLFxyXG4gICAgICAgICAgICBidW5kbGVfbmFtZTogQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgIGxvYWRfdXJsOiBcInByZWZhYnMvZ2V0TWVydHJhaWxPcFwiLFxyXG4gICAgICAgICAgICBsYXllcl90eXBlOiBMYXllclR5cGUuVUksXHJcbiAgICAgICAgICAgIG1vZHVsZV90eXBlOiBNb2R1bGVUeXBlLldJTkRPVyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gdGhpcy5DTE9TRV9CVE5fREVMQVlfVElNRSA9IDM7IC8vIChub3QgdXNlZClcclxuICAgICAgICB0aGlzLlRBU0tfTk9UX0NPTVBMRVRFX0NPTE9SID0gY2MuY29sb3IoKS5mcm9tSEVYKFwiI0Y1RTlDRlwiKTtcclxuICAgICAgICB0aGlzLlRBU0tfQ09NUExFVEVfQ09MT1IgPSBjYy5jb2xvcigpLmZyb21IRVgoXCIjRkZENDNFXCIpO1xyXG4gICAgICAgIHRoaXMuVFVSVExFX0VYQ0hBTkdFX01BWF9SRUZSRVNIX0NPVU5UID0gNTtcclxuICAgICAgICB0aGlzLlRVUlRMRV9FWENIQU5HRV9SRUZSRVNIX0RJQU1PTkQgPSA1O1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5UVVJUTEVfRVhDSEFOR0VfSVRFTV9EQVRBX0FSUkFZID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9wX2lkOiBSZXdhcmRJZEVudW0uR09MRCxcclxuICAgICAgICAgICAgICAgIHByb3BfbnVtOiAxMDUsXHJcbiAgICAgICAgICAgICAgICBleGNoYW5nZV9wcm9wX2lkOiBSZXdhcmRJZEVudW0uU0lMVkVSX0JBUlJFTCxcclxuICAgICAgICAgICAgICAgIGV4Y2hhbmdlX3Byb3BfbnVtOiAxLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9wX2lkOiBSZXdhcmRJZEVudW0uRElBTU9ORCxcclxuICAgICAgICAgICAgICAgIHByb3BfbnVtOiAxNCxcclxuICAgICAgICAgICAgICAgIGV4Y2hhbmdlX3Byb3BfaWQ6IFJld2FyZElkRW51bS5TSUxWRVJfQkFSUkVMLFxyXG4gICAgICAgICAgICAgICAgZXhjaGFuZ2VfcHJvcF9udW06IDEsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb3BfaWQ6IFJld2FyZElkRW51bS5HT0xELFxyXG4gICAgICAgICAgICAgICAgcHJvcF9udW06IDkwLFxyXG4gICAgICAgICAgICAgICAgZXhjaGFuZ2VfcHJvcF9pZDogUmV3YXJkSWRFbnVtLkdPTERfQkFSUkVMLFxyXG4gICAgICAgICAgICAgICAgZXhjaGFuZ2VfcHJvcF9udW06IDEsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb3BfaWQ6IFJld2FyZElkRW51bS5ESUFNT05ELFxyXG4gICAgICAgICAgICAgICAgcHJvcF9udW06IDEwLFxyXG4gICAgICAgICAgICAgICAgZXhjaGFuZ2VfcHJvcF9pZDogUmV3YXJkSWRFbnVtLkdPTERfQkFSUkVMLFxyXG4gICAgICAgICAgICAgICAgZXhjaGFuZ2VfcHJvcF9udW06IDEsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLlRVUlRMRV9FWENIQU5HRV9DT0xPUl9MSUdIVCA9IGNjLmNvbG9yKCkuZnJvbUhFWChcIiM4N0MzNTdcIik7XHJcbiAgICAgICAgdGhpcy5UVVJUTEVfRVhDSEFOR0VfQ09MT1JfREFSVCA9IGNjLmNvbG9yKCkuZnJvbUhFWChcIiNERkY4RkRcIik7XHJcbiAgICAgICAgdGhpcy5GSUdIVF9TUEVFRF9YMSA9IDE7XHJcbiAgICAgICAgdGhpcy5GSUdIVF9TUEVFRF9YMiA9IDI7XHJcbiAgICAgICAgdGhpcy5TVE9SRV9SRUZSRVNIX1RJTUUgPSAxODAwO1xyXG4gICAgICAgIHRoaXMuQ09MT1JfUkVEID0gY2MuY29sb3IoKS5mcm9tSEVYKFwiI2ZmMzgzOFwiKTtcclxuICAgICAgICB0aGlzLkNPTE9SX1lFTExPVyA9IGNjLmNvbG9yKCkuZnJvbUhFWChcIiNmZmU0MzBcIik7XHJcbiAgICAgICAgdGhpcy5NSU5fTE9BRElOR19USU1FID0gMjAwMDtcclxuICAgICAgICB0aGlzLldBTExfQ0FMTF9SQU5HRSA9IDQwMDtcclxuICAgICAgICAvLyAobm90IHVzZWQpXHJcbiAgICAgICAgLyogdGhpcy5MRUFHVUVfTkFNRV9DT0xPUl9BUlJBWSA9IFtcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiI2ZlOTkzYlwiKSxcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiI2MwZGFmZlwiKSxcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiI2ZmZTQ3OVwiKSxcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiIzlkYWRmZlwiKSxcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiI2ZmNWE1ZlwiKSxcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiI2YxNmRmZlwiKVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5MRUFHVUVfU1RBUl9DT0xPUl9BUlJBWSA9IFtcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiI2NjODgzYVwiKSxcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiIzY1ODVhZVwiKSxcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiI2U3YWIyY1wiKSxcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiIzRmNTg4MVwiKSxcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiI2MxMjIyNFwiKSxcclxuICAgICAgICAgICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiIzY1MTE3ZlwiKVxyXG4gICAgICAgIF07ICovXHJcbiAgICAgICAgdGhpcy5SRU5BTUVfRElBTU9ORF9QUklDRSA9IDUwO1xyXG4gICAgICAgIHRoaXMuTUFQX1JFUE9SVF9QUk9QX01BUCA9IHtcclxuICAgICAgICAgICAgMTIwMDE6IHtcclxuICAgICAgICAgICAgICAgIG1heF9udW06IDE1LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLpkqXljJkxXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDEzMDAxOiB7XHJcbiAgICAgICAgICAgICAgICBtYXhfbnVtOiAxNSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi6Ii56ZSaMVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAxNDAwMToge1xyXG4gICAgICAgICAgICAgICAgbWF4X251bTogMTUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIuWPt+inkjFcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgMTUwMDE6IHtcclxuICAgICAgICAgICAgICAgIG1heF9udW06IDE1LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLnvZDlrZAxXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDE2MDAxOiB7XHJcbiAgICAgICAgICAgICAgICBtYXhfbnVtOiA2MyxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi5pyo5p2QMVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAxNzAwMToge1xyXG4gICAgICAgICAgICAgICAgbWF4X251bTogNTAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIumTgeefvzFcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgMTgwMDE6IHtcclxuICAgICAgICAgICAgICAgIG1heF9udW06IDQsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIumxvOWPiVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAxODAwMjoge1xyXG4gICAgICAgICAgICAgICAgbWF4X251bTogNCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi55+z6KKLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDE4MDAzOiB7XHJcbiAgICAgICAgICAgICAgICBtYXhfbnVtOiA0LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLnm77niYxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgMTgwMDQ6IHtcclxuICAgICAgICAgICAgICAgIG1heF9udW06IDQsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIuW8k+eurVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAxODAwNToge1xyXG4gICAgICAgICAgICAgICAgbWF4X251bTogNCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi5p6qXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDE4MDA2OiB7XHJcbiAgICAgICAgICAgICAgICBtYXhfbnVtOiA0LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLliZFcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgMTgwMDc6IHtcclxuICAgICAgICAgICAgICAgIG1heF9udW06IDIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIum4veWtkFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAxODAwODoge1xyXG4gICAgICAgICAgICAgICAgbWF4X251bTogMixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi6JuHXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDE4MDA5OiB7XHJcbiAgICAgICAgICAgICAgICBtYXhfbnVtOiAyLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLmnKjpqaxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgMTgwMTE6IHtcclxuICAgICAgICAgICAgICAgIG1heF9udW06IDIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIumtlOazleajklwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAyNTAwMToge1xyXG4gICAgICAgICAgICAgICAgbWF4X251bTogMyxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi6LSd5aOzMVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07IC8vIGVuZDogTUFQX1JFUE9SVF9QUk9QX01BUFxyXG4gICAgICAgIHRoaXMuUkVEX1NVUEVSX1JFQ1JVSVRfRElBTU9ORCA9IDE1MDtcclxuICAgICAgICB0aGlzLk1BWF9TVVBFUl9SRUNSVUlUX1ZJREVPX0NPVU5UID0gMjtcclxuICAgICAgICB0aGlzLllFTExPV19TVVBFUl9SRUNSVUlUX0dPTEQgPSAyMzg7XHJcbiAgICAgICAgdGhpcy5NQVhfTFVDS1lfV0hFRUxfRlJFRV9DT1VOVCA9IDA7XHJcbiAgICAgICAgdGhpcy5NQVhfTFVDS1lfV0hFRUxfVklERU9fQ09VTlQgPSAxMDtcclxuICAgICAgICB0aGlzLkZSRUVfRFJBV19USU1FX0lOVEVSVkFMID0gMzAwMDAwO1xyXG4gICAgICAgIHRoaXMuTFVDS1lfV0hFRUxfUkVXQVJEX0FSUkFZID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAwLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDExMDAyLFxyXG4gICAgICAgICAgICAgICAgbnVtOiAxNTAsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IDI1MDAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDAsXHJcbiAgICAgICAgICAgICAgICBpZDogMTEwMDIsXHJcbiAgICAgICAgICAgICAgICBudW06IDQ1MCxcclxuICAgICAgICAgICAgICAgIHdlaWdodDogMTIwMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGlkOiAxMTAwMyxcclxuICAgICAgICAgICAgICAgIG51bTogMjUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IDJlMyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGlkOiAxMTAwMyxcclxuICAgICAgICAgICAgICAgIG51bTogNjUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IDFlMyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMixcclxuICAgICAgICAgICAgICAgIGlkOiAxMTAwNixcclxuICAgICAgICAgICAgICAgIG51bTogMjUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IDJlMyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMixcclxuICAgICAgICAgICAgICAgIGlkOiAxMTAwNixcclxuICAgICAgICAgICAgICAgIG51bTogNTUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IDEzMDAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXTsgLy8gZW5kOiBMVUNLWV9XSEVFTF9SRVdBUkRfQVJSQVlcclxuICAgICAgICB0aGlzLlJFUE9SVF9CVUlMRElOR19VUEdSQURFX01BUCA9IHtcclxuICAgICAgICAgICAgMTogW1xyXG4gICAgICAgICAgICAgICAgMTAzMTEsIDEwMzE1LCAxMDMyMCwgMTAzMjUsIDEwMzMxLCAxMDMzNiwgMTAzNDEsIDEwMzQ2LCAxMDM1MixcclxuICAgICAgICAgICAgICAgIDEwMzU4LCAxMDM2NCwgMTAzNzAsIDEwMzc2LCAxMDM4MiwgMTAzODgsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIDI6IFtcclxuICAgICAgICAgICAgICAgIDEwMzE2LCAxMDMxOSwgMTAzMjEsIDEwMzI5LCAxMDMzNSwgMTAzMzgsIDEwMzQ5LCAxMDM2MCwgMTAzNzcsXHJcbiAgICAgICAgICAgICAgICAxMDM4NCxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgMzogWzEwMzEzLCAxMDMyNywgMTAzMzAsIDEwMzM0XSxcclxuICAgICAgICAgICAgNDogWzEwMzM3LCAxMDM1MSwgMTAzNjEsIDEwMzY1XSxcclxuICAgICAgICAgICAgNTogWzEwMzQ3LCAxMDM2OSwgMTAzNzMsIDEwMzgxXSxcclxuICAgICAgICAgICAgNjogW1xyXG4gICAgICAgICAgICAgICAgMTAzMjYsIDEwMzMzLCAxMDM0MCwgMTAzNDUsIDEwMzU2LCAxMDM2MiwgMTAzNjcsIDEwMzcyLCAxMDM3OSxcclxuICAgICAgICAgICAgICAgIDEwMzg1LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICA3OiBbMTAzMTddLFxyXG4gICAgICAgICAgICA4OiBbXSxcclxuICAgICAgICAgICAgOTogW1xyXG4gICAgICAgICAgICAgICAgMTAzMTIsIDEwMzIzLCAxMDMyOCwgMTAzNDMsIDEwMzUwLCAxMDM1NSwgMTAzNjgsIDEwMzc1LCAxMDM4MCxcclxuICAgICAgICAgICAgICAgIDEwMzg2LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAxMDogW1xyXG4gICAgICAgICAgICAgICAgMTAzMTQsIDEwMzE4LCAxMDMyNCwgMTAzMzIsIDEwMzQ0LCAxMDM1NCwgMTAzNjMsIDEwMzc0LCAxMDM3OCxcclxuICAgICAgICAgICAgICAgIDEwMzg3LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAzMTogWzEwMzIyLCAxMDMzOSwgMTAzNDgsIDEwMzY2XSxcclxuICAgICAgICAgICAgMzI6IFsxMDM0MiwgMTAzNTcsIDEwMzcxLCAxMDM4M10sXHJcbiAgICAgICAgICAgIDMzOiBbXSxcclxuICAgICAgICB9OyAvLyBlbmQ6IFJFUE9SVF9CVUlMRElOR19VUEdSQURFX01BUFxyXG4gICAgICAgIHRoaXMuTUFYX1BVU0hfU0hBUkVfQ09VTlQgPSAxO1xyXG4gICAgICAgIHRoaXMuTUFYX1ZJREVPX0ZBSUxfU0hBUkVfQ09VTlQgPSA1O1xyXG4gICAgICAgIHRoaXMuQUREX0RFU0tUT1BfUkVXQVJEX0xFRlRfSEVST19JRCA9IDM0MDAxO1xyXG4gICAgICAgIHRoaXMuQUREX0RFU0tUT1BfUkVXQVJEX1JJR0hUX0hFUk9fSUQgPSAzNTAwMTtcclxuICAgICAgICB0aGlzLkZJR0hUX1JFVFVSTl9CVVRUT05fQVBQRUFSX1RJTUUgPSA2MDAwMDtcclxuICAgICAgICB0aGlzLk1BWF9GUkVFX1NVUEVSX1JFQ1JVSVRfQ09VTlQgPSAxO1xyXG4gICAgICAgIC8vIGF1ZGlvXHJcbiAgICAgICAgdGhpcy5BVURJT18xX0JBUlJBQ0tfQ0FSRF9NT1ZFID0gXCIxX2JhcnJhY2tfY2FyZF9tb3ZlXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT18yX0JBUlJBQ0tfT1BFTiA9IFwiMl9iYXJyYWNrX29wZW5cIjtcclxuICAgICAgICB0aGlzLkFVRElPXzNfVVBHUkFERV9DTE9TRSA9IFwiM191cGdyYWRlX2Nsb3NlXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT180X1VQR1JBREVfT1BFTiA9IFwiNF91cGdyYWRlX29wZW5cIjtcclxuICAgICAgICB0aGlzLkFVRElPXzVfVEFTS19SRVdBUkQgPSBcIjVfdGFza19yZXdhcmRcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzZfSklBTlpVU0hFR05KSSA9IFwiNl9qaWFuenVzaGVnbmppXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT183X0JVSUxESU5HX1VQR1JBRElORyA9IFwiN19idWlsZGluZ191cGdyYWRpbmdcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzhfQlVJTERJTkdfT1BFTl9DTE9TRSA9IFwiOF9idWlsZGluZ19vcGVuX2Nsb3NlXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT185X0NBTkNFTF9QUkVTRU5DRSA9IFwiOV9jYW5jZWxfcHJlc2VuY2VcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzEwX0pJQU5NVVRPTkcgPSBcIjEwX2ppYW5tdXRvbmdcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzEyX0JVWV9TVUNDRVNTID0gXCIxMl9idXlfc3VjY2Vzc1wiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fMTNfV09PRF9CVVlfSVRFTSA9IFwiMTNfd29vZF9idXlfaXRlbVwiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fMTRfRElBTU9ORF9CVVlfSVRFTSA9IFwiMTRfZGlhbW9uZF9idXlfaXRlbVwiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fMTVfVU5MT0NLX1NUT1JFID0gXCIxNV91bmxvY2tfc3RvcmVcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzE2X0JVWV9JVEVNID0gXCIxNl9idXlfaXRlbVwiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fMTdfR09MRF9GTFkgPSBcIjE3X2dvbGRfZmx5XCI7XHJcbiAgICAgICAgdGhpcy5BVURJT18xOF9GSUdIVF9USU1FID0gXCIxOF9maWdodF90aW1lXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT18xOV9GSUdIVF9SRVRVUk4gPSBcIjE5X2ZpZ2h0X3JldHVyblwiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fMjBfRklHSFRfRkFJTCA9IFwiMjBfZmlnaHRfZmFpbFwiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fMjFfRklHSFRfU1VDQ0VTUyA9IFwiMjFfZmlnaHRfc3VjY2Vzc1wiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fMjNfSEVST19ERUFUSCA9IFwiMjNfaGVyb19kZWF0aFwiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fMjRfRFJPUF9JVEVNID0gXCIyNF9kcm9wX2l0ZW1cIjtcclxuICAgICAgICB0aGlzLkFVRElPXzI1X0xBRERFUl9TVEFSX0ZMWSA9IFwiMjVfbGFkZGVyX3N0YXJfZmx5XCI7XHJcbiAgICAgICAgdGhpcy5BVURJT18yNl9MQURERVJfUkVXQVJEID0gXCIyNl9sYWRkZXJfcmV3YXJkXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT18yN19MQURERVJfVVBHUkFERV9PUEVOID0gXCIyN19sYWRkZXJfdXBncmFkZV9vcGVuXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT18yOF9MQURERVJfVVBHUkFERV9DTE9TRSA9IFwiMjhfbGFkZGVyX3VwZ3JhZGVfY2xvc2VcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzI5X0xBRERFUl9TVEFSXzEgPSBcIjI5X2xhZGRlcl9zdGFyXzFcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzMwX0xBRERFUl9TVEFSXzIgPSBcIjMwX2xhZGRlcl9zdGFyXzJcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzMxX0xBRERFUl9TVEFSXzMgPSBcIjMxX2xhZGRlcl9zdGFyXzNcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzg4X0dFWklTSEVORyA9IFwiODhfZ2V6aXNoZW5nXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT185MF9TVEFUVUVfQlJFQUtJTkcgPSBcIjkwX3N0YXR1ZV9icmVha2luZ1wiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fOTFfTUFJTl9NVVNJQyA9IFwiOTFfbWFpbl9tdXNpY1wiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fOTJfTE9BRElOR19JU0xBTkRfTVVTSUMgPSBcIjkyX2xvYWRpbmdfaXNsYW5kX211c2ljXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT185M19GSUdIVF9NVVNJQyA9IFwiOTNfZmlnaHRfbXVzaWNcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzk1X0NBVkVTX01VU0lDID0gXCI5NV9jYXZlc19tdXNpY1wiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fOTZfSVNMQU5EX01VU0lDID0gXCI5Nl9pc2xhbmRfbXVzaWNcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzE1OV9NVVRPTkdMVU9ESSA9IFwiMTU5X211dG9uZ2x1b2RpXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT18xNjBfQ0hBTkdFUE9TID0gXCIxNjBfY2hhbmdlUG9zXCI7XHJcbiAgICAgICAgdGhpcy5BVURJT18xNjFfQ09NUE9TRSA9IFwiMTYxX2NvbXBvc2VcIjtcclxuICAgICAgICB0aGlzLkFVRElPXzE2Ml9ESUFNT05EX0ZMWSA9IFwiMTYyX2RpYW1vbmRfZmx5XCI7XHJcbiAgICAgICAgdGhpcy5BVURJT18xNjNfVU5MT0NLX05FV19IRVJPX0FOSU0gPSBcIjE2M191bmxvY2tfbmV3X2hlcm9fYW5pbVwiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fMTY0X1VOTE9DS19ORVdfSEVSTyA9IFwiMTY0X3VubG9ja19uZXdfaGVyb1wiO1xyXG4gICAgICAgIHRoaXMuQVVESU9fMTY1X1BVVF9QUk9QX0lOVE9fQlVJTERJTkcgPSBcIjE2NV9wdXRfcHJvcF9pbnRvX2J1aWxkaW5nXCI7XHJcbiAgICAgICAgLy8gdGV4dFxyXG4gICAgICAgIHRoaXMuVEVYVF8xID0gXCJYw7NhIGzGsHUgdHLhu68gdGjDoG5oIGPDtG5nXCI7XHJcbiAgICAgICAgdGhpcy5URVhUXzIgPSBcIsSQw6MgaG/DoG4gdGjDoG5oIHThuqV0IGPhuqMgY8OhYyBj4bqlcCDEkeG7mSEhIVwiO1xyXG4gICAgICAgIHRoaXMuVEVYVF8zID0gXCJUaeG7gW4geHUga2jDtG5nIMSR4bunISEhXCI7XHJcbiAgICAgICAgdGhpcy5URVhUXzQgPVxyXG4gICAgICAgICAgICBcIktow7RuZyBjw7JuIHRo4budaSBnaWFuIGPGsOG7m3AgYsOzYyBu4buvYSwgaMOjeSBxdWF5IGzhuqFpIHbDoG8gbmfDoHkgbWFpXCI7XHJcbiAgICAgICAgdGhpcy5URVhUXzUgPSBcIk3hu58ga2jDs2Egc2F1IGtoaSB2xrDhu6N0IHF1YSBj4bqlcCDEkeG7mSAyLTNcIjtcclxuICAgICAgICB0aGlzLlRFWFRfNiA9IFwiQ2jDumMgbeG7q25nIGNoaeG6v24gdGjhuq9uZyAlcyB4JWRcIjtcclxuICAgICAgICB0aGlzLlRFWFRfNyA9IFwiS+G6v3QgdGjDumMgeGVtIHZpZGVvXCI7XHJcbiAgICAgICAgdGhpcy5URVhUXzggPSBcIktow7RuZyB0w6xtIHRo4bqleSBu4buZaSBkdW5nIG5o4bqvYyBuaOG7n1wiO1xyXG4gICAgICAgIHRoaXMuVEVYVF85ID0gXCJDaGlhIHPhursgdGjDoG5oIGPDtG5nXCI7XHJcbiAgICAgICAgdGhpcy5URVhUXzEwID0gXCLEkMOjIHjDs2EgYuG7mSBuaOG7myDEkeG7h20gdGjDoG5oIGPDtG5nXCI7XHJcbiAgICAgICAgdGhpcy5URVhUXzExID0gXCJDaGlhIHPhursgYuG6o24gZ2hpIG3DoG4gaMOsbmgga2jDtG5nIHRow6BuaCBjw7RuZ1wiO1xyXG4gICAgICAgIHRoaXMuVEVYVF8xMiA9IFwiVnVpIGzDsm5nIG3hu58ga2jDs2EgY8OhYyBj4bqlcCDEkeG7mSB0csaw4bubYyDEkcOzIHRyxrDhu5tjXCI7XHJcbiAgICAgICAgdGhpcy5URVhUXzEzID0gXCJD4bqlcCDEkeG7mSAlZFwiO1xyXG4gICAgICAgIHRoaXMuVEVYVF8xNCA9IFwiJWQvJWRcIjtcclxuICAgICAgICB0aGlzLlRFWFRfMTUgPSBcIiVkIOKAlCAlZFwiO1xyXG4gICAgICAgIHRoaXMuVEVYVF8xNiA9IFwiU+G7kSBzYW8gY+G6p24gdGhp4bq/dCBjaG8gY+G6pXAgxJHhu5kgJWQtJWRcIjtcclxuICAgICAgICB0aGlzLlRFWFRfMTcgPVxyXG4gICAgICAgICAgICBcIk7hu4FuIHThuqNuZyBuw6B5IGtow7RuZyBo4buXIHRy4bujIHRow6ptIG5oaeG7gXUgdMOtbmggbsSDbmcgdHLDsiBjaMahaVwiO1xyXG4gICAgICAgIHRoaXMuVEVYVF8xOCA9IFwiQ2hpYSBz4bq7IGtow7RuZyB0aMOgbmggY8O0bmdcIjtcclxuICAgICAgICB0aGlzLlRFWFRfMTkgPVxyXG4gICAgICAgICAgICBcIkdoaSBtw6BuIGjDrG5oIGtow7RuZyB0aMOgbmggY8O0bmcsIHRo4budaSBsxrDhu6NuZyBnaGkgw610IGjGoW4gMyBnacOieVwiO1xyXG4gICAgICAgIHRoaXMuVEVYVF8yMCA9IFwiS2jDtG5nIHRo4buDIGNoaWEgc+G6uyBjw7luZyBt4buZdCBi4bqjbiBnaGkgbcOgbiBow6xuaCBuaGnhu4F1IGzhuqduXCI7XHJcbiAgICAgICAgdGhpcy5URVhUXzIxID0gXCIlZC4lc1wiO1xyXG4gICAgICAgIHRoaXMuVEVYVF8yMiA9IFwiWcOqdSBj4bqndSBt4bufIGtow7NhIHRow6BuaCBjw7RuZyEhIVwiO1xyXG4gICAgICAgIHRoaXMuVEVYVF8yMyA9XHJcbiAgICAgICAgICAgIFwixJDDoyBkw7luZyBo4bq/dCAlZCBsxrDhu6N0IGNoaWEgc+G6uyBow7RtIG5heSwgdGjhu60gbOG6oWkgdsOgbyBuZ8OgeSBtYWkhXCI7XHJcbiAgICAgICAgdGhpcy5vcGVuQnVpbGRJRCA9IDEwMDY7XHJcbiAgICAgICAgdGhpcy5zaGlwSUQgPSAzMTM7XHJcbiAgICAgICAgdGhpcy5NQVhfQ0VMTF9OVU0gPSAyNTY7XHJcbiAgICAgICAgdGhpcy5mdW5Qb3NMaXN0ID0ge1xyXG4gICAgICAgICAgICAxODc6IDIyMyxcclxuICAgICAgICAgICAgMTQ0OiAxNDMsXHJcbiAgICAgICAgICAgIDIxNjogMjM1LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5oZXJvUmFuZG9tTGlzdCA9IHtcclxuICAgICAgICAgICAgMzogMSxcclxuICAgICAgICAgICAgNDogMSxcclxuICAgICAgICAgICAgNTogMixcclxuICAgICAgICAgICAgNjogMixcclxuICAgICAgICAgICAgNzogMyxcclxuICAgICAgICAgICAgODogMyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubG9jYWxDbG91ZEFyZWFMaXN0ID0ge1xyXG4gICAgICAgICAgICA2OiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIsSQ4bqjbyBUaOG6p24gVGnDqm4gUG9zZWlkb25cIixcclxuICAgICAgICAgICAgICAgIGRpYW1vbmQ6IDY2LFxyXG4gICAgICAgICAgICAgICAgbHZsOiAzLFxyXG4gICAgICAgICAgICAgICAgaW5kZXg6IDAsXHJcbiAgICAgICAgICAgICAgICBwb3M6IGNjLnYzKDg3NCwgLTExOTgpLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCJDw7Mgbmjhu69uZyB5w6p1IHRpbmggc+G7kW5nIHRyb25nIGPDonkgUG9zZWlkb24g4bufIMSRw6J5IFRydXnhu4FuIHRodXnhur90IGvhu4MgcuG6sW5nIHZp4buHYyB0acOqbSBsaW5oIGjhu5NuIGJp4buDbiBjw7MgdGjhu4MgbWFuZyBs4bqhaSBz4bupYyBt4bqhbmggdGjhuqduIHRow6FuaCBjaG8gbmfGsOG7nWkgYW5oIGjDuW5nIVwiLFxyXG4gICAgICAgICAgICAgICAgbWFwSW5kZXg6IDIyMyxcclxuICAgICAgICAgICAgICAgIHJlcG9ydE51bTogMTA4NDEsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDU6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiVMOgbiB0w61jaCBj4bunYSBi4buZIGzhuqFjIHRo4buVXCIsXHJcbiAgICAgICAgICAgICAgICBkaWFtb25kOiA3NyxcclxuICAgICAgICAgICAgICAgIGx2bDogMixcclxuICAgICAgICAgICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgICAgICAgICAgcG9zOiBjYy52MygtMTkwLCAtNzM0KSxcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwiTmfGsOG7nWkgdGEgbsOzaSBy4bqxbmcgY8OzIG5oaeG7gXUgxJFp4buBdSBiw60g4bqpbiDhuqluIGdp4bqldSB0cm9uZyBoYW5nIMSR4buZbmcgY+G7p2EgdMOgbiB0w61jaCBi4buZIGzhuqFjIGJp4buDbiBi4bqjbiDEkeG7i2EuIEhp4buHbiB04bqhaSBjaMawYSBiaeG6v3QgY8OzIMSRw7puZyBoYXkga2jDtG5nIVwiLFxyXG4gICAgICAgICAgICAgICAgbWFwSW5kZXg6IDIxNSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydE51bTogMTA4NDMsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDk6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiU8O0bmcgQsSDbmcgVHV54bq/dFwiLFxyXG4gICAgICAgICAgICAgICAgZGlhbW9uZDogODgsXHJcbiAgICAgICAgICAgICAgICBsdmw6IDUsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogMixcclxuICAgICAgICAgICAgICAgIHBvczogY2MudjMoMjk3LCAtMjEyKSxcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwiVHJ1eeG7gW4gdGh1eeG6v3Qga+G7gyBy4bqxbmcgbmjhu69uZyBuZ8aw4budaSDEkeG6v24gxJHDonkgxJHhu4F1IMSRw6MgdHLhuqNpIHF1YSDEkeG7pyBsb+G6oWkga2jDsyBraMSDbiwgbmd1eSBoaeG7g20gdsOgIGNo4buJIG3hu5l0IHPhu5Egw610IGPDsyB0aOG7gyBsZW8gbMOqbiDEkeG7iW5oIHR1eeG6v3QuXCIsXHJcbiAgICAgICAgICAgICAgICBtYXBJbmRleDogOSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydE51bTogMTA4NDUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDExOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkjhu49hIExvbmcgU8ahblwiLFxyXG4gICAgICAgICAgICAgICAgZGlhbW9uZDogOTksXHJcbiAgICAgICAgICAgICAgICBsdmw6IDcsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogMyxcclxuICAgICAgICAgICAgICAgIHBvczogY2MudjMoMTA1NCwgLTI0NSksXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIlRydXnhu4FuIHRodXnhur90IGvhu4MgcuG6sW5nIGPDsyBt4buZdCBI4buPYSBMb25nIFbGsMahbmcgxJHDoyBuZ+G7pyBzYXkgbmhp4buBdSBuxINtLCBu4bq/dSDEkcaw4bujYyBuw7MgY2jhuqVwIHRodeG6rW4sIGLhuqFuIHPhur0gYuG6pXQga2jhuqMgY2hp4bq/biBi4bqhaSFcIixcclxuICAgICAgICAgICAgICAgIG1hcEluZGV4OiAxLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0TnVtOiAxMDg0NyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9OyAvLyBlbmQ6IGxvY2FsQ2xvdWRBcmVhTGlzdFxyXG5cclxuICAgICAgICB0aGlzLkJ1eURhdGEgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiAxLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkX2FycmF5OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyByZXdhcmRfaWQ6IDExMDA2LCByZXdhcmRfbnVtOiAxMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgcmV3YXJkX2lkOiAxMTAwMywgcmV3YXJkX251bTogOTkgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfcHJpY2U6IDEwMDAwLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkX2l0ZW1JZDogMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IDEsXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfYXJyYXk6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHJld2FyZF9pZDogMTEwMDYsIHJld2FyZF9udW06IDIwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyByZXdhcmRfaWQ6IDExMDAzLCByZXdhcmRfbnVtOiAxOTkgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfcHJpY2U6IDIwMDAwLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkX2l0ZW1JZDogMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IDEsXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfYXJyYXk6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHJld2FyZF9pZDogMTEwMDYsIHJld2FyZF9udW06IDMwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyByZXdhcmRfaWQ6IDExMDAzLCByZXdhcmRfbnVtOiAyOTkgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfcHJpY2U6IDMwMDAwLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkX2l0ZW1JZDogMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IDEsXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfYXJyYXk6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHJld2FyZF9pZDogMTEwMDYsIHJld2FyZF9udW06IDQwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyByZXdhcmRfaWQ6IDExMDAzLCByZXdhcmRfbnVtOiAyOTkgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfcHJpY2U6IDQwMDAwLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkX2l0ZW1JZDogMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IDEsXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfYXJyYXk6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHJld2FyZF9pZDogMTEwMDYsIHJld2FyZF9udW06IDUwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyByZXdhcmRfaWQ6IDExMDAzLCByZXdhcmRfbnVtOiAzOTkgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfcHJpY2U6IDUwMDAwLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkX2l0ZW1JZDogMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IDEsXHJcbiAgICAgICAgICAgICAgICByZXdhcmRfYXJyYXk6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHJld2FyZF9pZDogMTEwMDYsIHJld2FyZF9udW06IDE1IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyByZXdhcmRfaWQ6IDExMDAyLCByZXdhcmRfbnVtOiA1MDAwIH0sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkX3ByaWNlOiAxMDAwMCxcclxuICAgICAgICAgICAgICAgIHJld2FyZF9pdGVtSWQ6IDExMDAyLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogMSxcclxuICAgICAgICAgICAgICAgIHJld2FyZF9hcnJheTogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgcmV3YXJkX2lkOiAxMTAwNiwgcmV3YXJkX251bTogMzAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHJld2FyZF9pZDogMTEwMDIsIHJld2FyZF9udW06IDEwMDAwIH0sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkX3ByaWNlOiAyMDAwMCxcclxuICAgICAgICAgICAgICAgIHJld2FyZF9pdGVtSWQ6IDExMDAyLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5IRVJPR0lGVElEID0gMjAwMDg7XHJcbiAgICAgICAgdGhpcy5HSUZUSUQgPSAyMTA1NztcclxuICAgICAgICB0aGlzLlBBR09EQUdJRlRJRCA9IDIxMDA1O1xyXG4gICAgICAgIHRoaXMuU1VQRVJIRVJPUkVMSVZFVElNRSA9IDM2MDA7XHJcbiAgICAgICAgdGhpcy5TVVBFUkhFUk9SRUNJVkVUSU1FID0gNjA7XHJcbiAgICAgICAgdGhpcy5TVVBFUkhFUk9SRUNJVkVIUCA9IDIwO1xyXG4gICAgICAgIHRoaXMuQ0FWRVNBUkVBSUQgPSA4O1xyXG4gICAgICAgIHRoaXMuSUNFQVJFQUlEID0gMTA7XHJcbiAgICAgICAgdGhpcy5GSVJFUkVBSUQgPSAxMTtcclxuICAgICAgICB0aGlzLk1BWF9ST1cgPSAyMDtcclxuICAgICAgICB0aGlzLk1BWF9DT0xVTU4gPSAyMztcclxuICAgICAgICB0aGlzLldBTExOQU1FTElTVCA9IFtcInRvcFwiLCBcInJpZ2h0XCIsIFwiYm90dG9tXCIsIFwibGVmdFwiXTtcclxuICAgIH0gLy8gZW5kOiBjb25zdHJ1Y3RvclxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGluc3RhbmNlKCk6IENvbnN0YW50cyB7XHJcbiAgICAgICAgLyogaWYgKCF0aGlzLl9pbnN0YW5jZSkgdGhpcy5faW5zdGFuY2UgPSBuZXcgQ29uc3RhbnRzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlOyAqL1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgQ29uc3RhbnRzKCkpO1xyXG4gICAgfVxyXG59IC8vIGVuZDogQ29uc3RhbnRzXHJcbiJdfQ==