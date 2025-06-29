"use strict";
cc._RF.push(module, 'f9ccdNqk41FqrXnrAUi78XW', 'GameMain');
// start-scene/scripts/GameMain.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMain = void 0;
// +-+
var GameManager_1 = require("./GameManager");
var GameObject_1 = require("./GameObject");
var NetUtils_1 = require("./NetUtils");
var BrowserUtils_1 = require("./BrowserUtils");
var GraphicsUtils_1 = require("./GraphicsUtils");
var Launch_1 = require("./Launch");
var ccclass = cc._decorator.ccclass;
var GameMain = /** @class */ (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg_node = null; // private ??
        _this.notice_node = null; // private ??
        _this.notice_txt = null; // private ??
        return _this;
    }
    // @ (lifecycle method)
    GameMain.prototype.onLoad = function () {
        console.log("GameMain->onLoad", "xxxxxxxxxxxxxxxxxxxxxxxx");
        // @
        var self = this;
        this.bg_node = cc.find("Canvas/bg_node");
        this.notice_node = cc.find("Canvas/bg_node/notice_node");
        if (this.notice_node) {
            this.notice_txt = this.notice_node.getComponentInChildren(cc.RichText);
        }
        cc.macro.ENABLE_MULTI_TOUCH = true;
        cc.macro.CLEANUP_IMAGE_CACHE = true;
        cc.dynamicAtlasManager.enabled = false;
        cc.assetManager.force = true;
        cc.game.setFrameRate(30);
        console.log("Gamemanager -> init");
        GameManager_1.gm.init();
        GameManager_1.gm.channel.init();
        GameManager_1.gm.data.catch_error_log();
        // @
        if (cc.sys.isBrowser) {
            console.log("--------------Browser debugging parameters start---------------\n\n");
            console.log("Version Number         version=1-n");
            console.log("Clear Save             clear=true|false");
            console.log("Combat Debugging       debug=true|false");
            console.log("\n--------------Browser debugging parameters end-----------------");
            var version = Number(BrowserUtils_1.BrowserUtils.get_url_param_value("version", 0));
            if (NetUtils_1.NetUtils.get_version() < version) {
                NetUtils_1.NetUtils.set_version(version.toString());
                if (BrowserUtils_1.BrowserUtils.get_url_param_value("clear", false)) {
                    GameManager_1.gm.data.clear_store_data();
                }
            }
        }
        // @
        console.log("GameMain->get_remote_config", 1111111111);
        GameManager_1.gm.channel.get_remote_config(function () {
            console.log("GameMain->get_remote_config", 2222222222);
            GameManager_1.gm.data.priority_init(function () {
                GameManager_1.gm.data.event_emitter.on("connect_fail", self.on_connect_fail_handler, self);
                GameManager_1.gm.channel.login(function () {
                    NetUtils_1.ReportData.instance.report_once_point(10020);
                    var uid = GameManager_1.gm.data.server_data.uid;
                    var storedUid = cc.sys.localStorage.getItem("P2_UID");
                    if (!storedUid) {
                        cc.sys.localStorage.setItem("P2_UID", uid);
                    }
                    if (uid !== storedUid) {
                        cc.sys.localStorage.clear();
                        self.scheduleOnce(function () {
                            NetUtils_1.ReportData.instance.write_data();
                            NetUtils_1.NetUtils.save_game_uuid();
                            cc.sys.localStorage.setItem("P2_UID", uid);
                            GameManager_1.gm.data.main_data.clear();
                            GameManager_1.gm.data.main_data.async_write_data();
                        });
                    }
                    //
                    GameManager_1.gm.ui.init(function () {
                        Launch_1.Launch.instance.state = Launch_1.LoadingState.COMPLETE;
                        GameManager_1.gm.channel.report_event("ohayoo_game_init", {
                            initid: 2,
                            initname: "Resource loading started",
                            network: GameManager_1.gm.channel.get_network_state_name(),
                            initresult: 0,
                            initerror: "Resource loading started" // 资源加载开始
                        });
                        //
                        GameManager_1.gm.config.async_init(function () {
                            GameManager_1.gm.config.load_all_config(function () {
                                GameManager_1.gm.data.init(function () {
                                    if (GameManager_1.gm.data.server_data.nickname === "") {
                                        GameManager_1.gm.data.server_data.random_default_name(function (name) {
                                            GameManager_1.gm.data.server_data.nickname = name;
                                        });
                                    }
                                    //
                                    GameManager_1.gm.data.server_data.open_polling();
                                    if (cc.sys.isBrowser) {
                                        GameManager_1.gm.data.fight_temp_data.is_debug = BrowserUtils_1.BrowserUtils.get_url_param_value("debug", false);
                                        GraphicsUtils_1.GraphicsUtils.show_debug_draw = GameManager_1.gm.data.fight_temp_data.is_debug;
                                    }
                                    //
                                    if (GameManager_1.gm.data.fight_temp_data.is_debug) {
                                        GameManager_1.gm.data.fight_temp_data.map_id = 2;
                                        GameManager_1.gm.data.fight_temp_data.map_data_id = 1;
                                        GameManager_1.gm.data.fight_temp_data.play_type = 0;
                                        GameManager_1.gm.ui.show_fight();
                                    }
                                    else {
                                        GameManager_1.gm.ui.show_start(function () {
                                            GameManager_1.gm.data.get_player_score_data_request();
                                            NetUtils_1.ReportData.instance.report_once_point(10030);
                                            GameManager_1.gm.channel.report_event("ohayoo_game_init", {
                                                initid: 3,
                                                initname: "Enter the main interface",
                                                network: GameManager_1.gm.channel.get_network_state_name(),
                                                initresult: 0,
                                                initerror: "Enter the main interface" // 进入主界面
                                            });
                                        });
                                    }
                                }); // end: gm.data.init
                            }); // end: gm.config.load_all_config
                        }); // end: gm.config.async_init
                    }); // end: gm.ui.init
                }); // end: gm.channel.login
            }); // end: gm.data.priority_init
        }); // end: gm.channel.get_remote_config
    }; // end: onLoad
    // @
    GameMain.prototype.on_connect_fail_handler = function () {
        if (this.notice_node)
            this.notice_node.active = true;
        if (this.notice_txt) {
            this.notice_txt.string = "Connection error, please check the network"; // 连接错误，请检查网络
        }
        NetUtils_1.ReportData.instance.report_once_point(10040);
    };
    GameMain = __decorate([
        ccclass("GameMain")
    ], GameMain);
    return GameMain;
}(GameObject_1.GameObject));
exports.GameMain = GameMain;

cc._RF.pop();