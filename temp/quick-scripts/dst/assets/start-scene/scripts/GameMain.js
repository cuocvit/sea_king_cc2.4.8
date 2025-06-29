
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GameMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdhbWVNYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sNkNBQW1DO0FBQ25DLDJDQUEwQztBQUMxQyx1Q0FBa0Q7QUFDbEQsK0NBQThDO0FBQzlDLGlEQUFnRDtBQUNoRCxtQ0FBZ0Q7QUFFeEMsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFHbEM7SUFBOEIsNEJBQVU7SUFBeEM7UUFBQSxxRUEySEM7UUExSFMsYUFBTyxHQUFtQixJQUFJLENBQUMsQ0FBQyxhQUFhO1FBQzdDLGlCQUFXLEdBQW1CLElBQUksQ0FBQyxDQUFDLGFBQWE7UUFDakQsZ0JBQVUsR0FBdUIsSUFBSSxDQUFDLENBQUMsYUFBYTs7SUF3SDlELENBQUM7SUF0SEMsdUJBQXVCO0lBQ2IseUJBQU0sR0FBaEI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDNUQsSUFBSTtRQUNKLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN4RTtRQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUM3QixFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsZ0JBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNWLGdCQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzFCLElBQUk7UUFDSixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUVBQXFFLENBQUMsQ0FBQztZQUNuRixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztZQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7WUFDakYsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsSUFBSSxtQkFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLE9BQU8sRUFBRTtnQkFDcEMsbUJBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7b0JBQ3BELGdCQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRjtRQUNELElBQUk7UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELGdCQUFFLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDdkQsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2dCQUNwQixnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzdFLGdCQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFDZixxQkFBVSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0MsSUFBTSxHQUFHLEdBQVcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztvQkFDNUMsSUFBTSxTQUFTLEdBQWtCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxDQUFDLFNBQVMsRUFBRTt3QkFDZCxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUM1QztvQkFDRCxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7d0JBQ3JCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDOzRCQUNoQixxQkFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDakMsbUJBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs0QkFDMUIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQzs0QkFDM0MsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUMxQixnQkFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDdkMsQ0FBQyxDQUFDLENBQUM7cUJBQ0o7b0JBQ0QsRUFBRTtvQkFDRixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0JBQ1QsZUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcscUJBQVksQ0FBQyxRQUFRLENBQUM7d0JBQzlDLGdCQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRTs0QkFDMUMsTUFBTSxFQUFFLENBQUM7NEJBQ1QsUUFBUSxFQUFFLDBCQUEwQjs0QkFDcEMsT0FBTyxFQUFFLGdCQUFFLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFOzRCQUM1QyxVQUFVLEVBQUUsQ0FBQzs0QkFDYixTQUFTLEVBQUUsMEJBQTBCLENBQUMsU0FBUzt5QkFDaEQsQ0FBQyxDQUFDO3dCQUNILEVBQUU7d0JBQ0YsZ0JBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDOzRCQUNuQixnQkFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7Z0NBQ3hCLGdCQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQ0FDWCxJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssRUFBRSxFQUFFO3dDQUNyQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsVUFBQyxJQUFZOzRDQUNqRCxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzt3Q0FDeEMsQ0FBQyxDQUFDLENBQUM7cUNBQ047b0NBQ0QsRUFBRTtvQ0FDRixnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7b0NBQ25DLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7d0NBQ3BCLGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7d0NBQ3BGLDZCQUFhLENBQUMsZUFBZSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7cUNBQ2xFO29DQUNELEVBQUU7b0NBQ0YsSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO3dDQUNwQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt3Q0FDbkMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7d0NBQ3hDLGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO3dDQUN0QyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztxQ0FDcEI7eUNBQU07d0NBQ0wsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDOzRDQUNmLGdCQUFFLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7NENBQ3hDLHFCQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDOzRDQUM3QyxnQkFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUU7Z0RBQzFDLE1BQU0sRUFBRSxDQUFDO2dEQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0RBQ3BDLE9BQU8sRUFBRSxnQkFBRSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRTtnREFDNUMsVUFBVSxFQUFFLENBQUM7Z0RBQ2IsU0FBUyxFQUFFLDBCQUEwQixDQUFDLFFBQVE7NkNBQy9DLENBQUMsQ0FBQzt3Q0FDTCxDQUFDLENBQUMsQ0FBQztxQ0FDSjtnQ0FDSCxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjs0QkFDMUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQ0FBaUM7d0JBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUMsNEJBQTRCO29CQUNsQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtnQkFDeEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7WUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyw2QkFBNkI7UUFDbkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7SUFDMUMsQ0FBQyxFQUFDLGNBQWM7SUFFaEIsSUFBSTtJQUNJLDBDQUF1QixHQUEvQjtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVc7WUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDckQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLDRDQUE0QyxDQUFDLENBQUMsYUFBYTtTQUNyRjtRQUNELHFCQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUExSFUsUUFBUTtRQURwQixPQUFPLENBQUMsVUFBVSxDQUFDO09BQ1AsUUFBUSxDQTJIcEI7SUFBRCxlQUFDO0NBM0hELEFBMkhDLENBM0g2Qix1QkFBVSxHQTJIdkM7QUEzSFksNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gJy4vR2FtZU9iamVjdCc7XHJcbmltcG9ydCB7IE5ldFV0aWxzLCBSZXBvcnREYXRhIH0gZnJvbSAnLi9OZXRVdGlscyc7XHJcbmltcG9ydCB7IEJyb3dzZXJVdGlscyB9IGZyb20gJy4vQnJvd3NlclV0aWxzJztcclxuaW1wb3J0IHsgR3JhcGhpY3NVdGlscyB9IGZyb20gJy4vR3JhcGhpY3NVdGlscyc7XHJcbmltcG9ydCB7IExhdW5jaCwgTG9hZGluZ1N0YXRlIH0gZnJvbSAnLi9MYXVuY2gnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3MoXCJHYW1lTWFpblwiKVxyXG5leHBvcnQgY2xhc3MgR2FtZU1haW4gZXh0ZW5kcyBHYW1lT2JqZWN0IHtcclxuICBwcml2YXRlIGJnX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDsgLy8gcHJpdmF0ZSA/P1xyXG4gIHByaXZhdGUgbm90aWNlX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDsgLy8gcHJpdmF0ZSA/P1xyXG4gIHByaXZhdGUgbm90aWNlX3R4dDogY2MuUmljaFRleHQgfCBudWxsID0gbnVsbDsgLy8gcHJpdmF0ZSA/P1xyXG5cclxuICAvLyBAIChsaWZlY3ljbGUgbWV0aG9kKVxyXG4gIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkdhbWVNYWluLT5vbkxvYWRcIiwgXCJ4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHhcIik7XHJcbiAgICAvLyBAXHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuYmdfbm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvYmdfbm9kZVwiKTtcclxuICAgIHRoaXMubm90aWNlX25vZGUgPSBjYy5maW5kKFwiQ2FudmFzL2JnX25vZGUvbm90aWNlX25vZGVcIik7XHJcbiAgICBpZiAodGhpcy5ub3RpY2Vfbm9kZSkge1xyXG4gICAgICB0aGlzLm5vdGljZV90eHQgPSB0aGlzLm5vdGljZV9ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuUmljaFRleHQpO1xyXG4gICAgfVxyXG4gICAgY2MubWFjcm8uRU5BQkxFX01VTFRJX1RPVUNIID0gdHJ1ZTtcclxuICAgIGNjLm1hY3JvLkNMRUFOVVBfSU1BR0VfQ0FDSEUgPSB0cnVlO1xyXG4gICAgY2MuZHluYW1pY0F0bGFzTWFuYWdlci5lbmFibGVkID0gZmFsc2U7XHJcbiAgICBjYy5hc3NldE1hbmFnZXIuZm9yY2UgPSB0cnVlO1xyXG4gICAgY2MuZ2FtZS5zZXRGcmFtZVJhdGUoMzApO1xyXG4gICAgY29uc29sZS5sb2coXCJHYW1lbWFuYWdlciAtPiBpbml0XCIpO1xyXG4gICAgZ20uaW5pdCgpO1xyXG4gICAgZ20uY2hhbm5lbC5pbml0KCk7XHJcbiAgICBnbS5kYXRhLmNhdGNoX2Vycm9yX2xvZygpO1xyXG4gICAgLy8gQFxyXG4gICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLUJyb3dzZXIgZGVidWdnaW5nIHBhcmFtZXRlcnMgc3RhcnQtLS0tLS0tLS0tLS0tLS1cXG5cXG5cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVmVyc2lvbiBOdW1iZXIgICAgICAgICB2ZXJzaW9uPTEtblwiKTtcclxuICAgICAgY29uc29sZS5sb2coXCJDbGVhciBTYXZlICAgICAgICAgICAgIGNsZWFyPXRydWV8ZmFsc2VcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQ29tYmF0IERlYnVnZ2luZyAgICAgICBkZWJ1Zz10cnVlfGZhbHNlXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlxcbi0tLS0tLS0tLS0tLS0tQnJvd3NlciBkZWJ1Z2dpbmcgcGFyYW1ldGVycyBlbmQtLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgY29uc3QgdmVyc2lvbiA9IE51bWJlcihCcm93c2VyVXRpbHMuZ2V0X3VybF9wYXJhbV92YWx1ZShcInZlcnNpb25cIiwgMCkpO1xyXG4gICAgICBpZiAoTmV0VXRpbHMuZ2V0X3ZlcnNpb24oKSA8IHZlcnNpb24pIHtcclxuICAgICAgICBOZXRVdGlscy5zZXRfdmVyc2lvbih2ZXJzaW9uLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGlmIChCcm93c2VyVXRpbHMuZ2V0X3VybF9wYXJhbV92YWx1ZShcImNsZWFyXCIsIGZhbHNlKSkge1xyXG4gICAgICAgICAgZ20uZGF0YS5jbGVhcl9zdG9yZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBAXHJcbiAgICBjb25zb2xlLmxvZyhcIkdhbWVNYWluLT5nZXRfcmVtb3RlX2NvbmZpZ1wiLCAxMTExMTExMTExKTtcclxuICAgIGdtLmNoYW5uZWwuZ2V0X3JlbW90ZV9jb25maWcoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWVNYWluLT5nZXRfcmVtb3RlX2NvbmZpZ1wiLCAyMjIyMjIyMjIyKTtcclxuICAgICAgZ20uZGF0YS5wcmlvcml0eV9pbml0KCgpID0+IHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oXCJjb25uZWN0X2ZhaWxcIiwgc2VsZi5vbl9jb25uZWN0X2ZhaWxfaGFuZGxlciwgc2VsZik7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5sb2dpbigoKSA9PiB7XHJcbiAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwMDIwKTtcclxuICAgICAgICAgIGNvbnN0IHVpZDogc3RyaW5nID0gZ20uZGF0YS5zZXJ2ZXJfZGF0YS51aWQ7XHJcbiAgICAgICAgICBjb25zdCBzdG9yZWRVaWQ6IHN0cmluZyB8IG51bGwgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJQMl9VSURcIik7XHJcbiAgICAgICAgICBpZiAoIXN0b3JlZFVpZCkge1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJQMl9VSURcIiwgdWlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh1aWQgIT09IHN0b3JlZFVpZCkge1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHNlbGYuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLndyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICBOZXRVdGlscy5zYXZlX2dhbWVfdXVpZCgpO1xyXG4gICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlAyX1VJRFwiLCB1aWQpO1xyXG4gICAgICAgICAgICAgIGdtLmRhdGEubWFpbl9kYXRhLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgZ20uZGF0YS5tYWluX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vXHJcbiAgICAgICAgICBnbS51aS5pbml0KCgpID0+IHtcclxuICAgICAgICAgICAgTGF1bmNoLmluc3RhbmNlLnN0YXRlID0gTG9hZGluZ1N0YXRlLkNPTVBMRVRFO1xyXG4gICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2luaXRcIiwge1xyXG4gICAgICAgICAgICAgIGluaXRpZDogMixcclxuICAgICAgICAgICAgICBpbml0bmFtZTogXCJSZXNvdXJjZSBsb2FkaW5nIHN0YXJ0ZWRcIiwgLy8g6LWE5rqQ5Yqg6L295byA5aeLXHJcbiAgICAgICAgICAgICAgbmV0d29yazogZ20uY2hhbm5lbC5nZXRfbmV0d29ya19zdGF0ZV9uYW1lKCksXHJcbiAgICAgICAgICAgICAgaW5pdHJlc3VsdDogMCxcclxuICAgICAgICAgICAgICBpbml0ZXJyb3I6IFwiUmVzb3VyY2UgbG9hZGluZyBzdGFydGVkXCIgLy8g6LWE5rqQ5Yqg6L295byA5aeLXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBnbS5jb25maWcuYXN5bmNfaW5pdCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgZ20uY29uZmlnLmxvYWRfYWxsX2NvbmZpZygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLmluaXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5zZXJ2ZXJfZGF0YS5uaWNrbmFtZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5zZXJ2ZXJfZGF0YS5yYW5kb21fZGVmYXVsdF9uYW1lKChuYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnNlcnZlcl9kYXRhLm5pY2tuYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgIGdtLmRhdGEuc2VydmVyX2RhdGEub3Blbl9wb2xsaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNCcm93c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaXNfZGVidWcgPSBCcm93c2VyVXRpbHMuZ2V0X3VybF9wYXJhbV92YWx1ZShcImRlYnVnXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBHcmFwaGljc1V0aWxzLnNob3dfZGVidWdfZHJhdyA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmlzX2RlYnVnO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5pc19kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLm1hcF9pZCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEubWFwX2RhdGFfaWQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLnBsYXlfdHlwZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19maWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfc3RhcnQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLmdldF9wbGF5ZXJfc2NvcmVfZGF0YV9yZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwMDMwKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfaW5pdFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpZDogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdG5hbWU6IFwiRW50ZXIgdGhlIG1haW4gaW50ZXJmYWNlXCIsIC8vIOi/m+WFpeS4u+eVjOmdolxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrOiBnbS5jaGFubmVsLmdldF9uZXR3b3JrX3N0YXRlX25hbWUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdHJlc3VsdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGVycm9yOiBcIkVudGVyIHRoZSBtYWluIGludGVyZmFjZVwiIC8vIOi/m+WFpeS4u+eVjOmdolxyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pOyAvLyBlbmQ6IGdtLmRhdGEuaW5pdFxyXG4gICAgICAgICAgICAgIH0pOyAvLyBlbmQ6IGdtLmNvbmZpZy5sb2FkX2FsbF9jb25maWdcclxuICAgICAgICAgICAgfSk7IC8vIGVuZDogZ20uY29uZmlnLmFzeW5jX2luaXRcclxuICAgICAgICAgIH0pOyAvLyBlbmQ6IGdtLnVpLmluaXRcclxuICAgICAgICB9KTsgLy8gZW5kOiBnbS5jaGFubmVsLmxvZ2luXHJcbiAgICAgIH0pOyAvLyBlbmQ6IGdtLmRhdGEucHJpb3JpdHlfaW5pdFxyXG4gICAgfSk7IC8vIGVuZDogZ20uY2hhbm5lbC5nZXRfcmVtb3RlX2NvbmZpZ1xyXG4gIH0gLy8gZW5kOiBvbkxvYWRcclxuXHJcbiAgLy8gQFxyXG4gIHByaXZhdGUgb25fY29ubmVjdF9mYWlsX2hhbmRsZXIoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5ub3RpY2Vfbm9kZSkgdGhpcy5ub3RpY2Vfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMubm90aWNlX3R4dCkge1xyXG4gICAgICB0aGlzLm5vdGljZV90eHQuc3RyaW5nID0gXCJDb25uZWN0aW9uIGVycm9yLCBwbGVhc2UgY2hlY2sgdGhlIG5ldHdvcmtcIjsgLy8g6L+e5o6l6ZSZ6K+v77yM6K+35qOA5p+l572R57ucXHJcbiAgICB9XHJcbiAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwMDQwKTtcclxuICB9XHJcbn1cclxuIl19