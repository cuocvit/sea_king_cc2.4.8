
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/UIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '67537s7aJpPdq9Ddw2L/H/v', 'UIManager');
// start-scene/scripts/UIManager.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIManager = void 0;
//
var EventEmitter_1 = require("./EventEmitter");
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
var Utils_1 = require("./Utils");
var CoinFlyAnim_1 = require("./CoinFlyAnim");
var MainMapUI_1 = require("./MainMapUI");
var NewerGuideOp_1 = require("./NewerGuideOp");
var ItemFly_1 = require("./ItemFly");
var Launch_1 = require("./Launch");
var UIManager = /** @class */ (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super.call(this) || this;
        _this.MODULE_SHOW = "module-show";
        _this.MODULE_HIDE = "module-hide";
        _this._args_map = {};
        _this._map = {};
        _this._stack = [];
        _this.main_camera;
        _this.Login = false;
        return _this;
    }
    Object.defineProperty(UIManager, "instance", {
        get: function () {
            if (!UIManager._instance) {
                UIManager._instance = new UIManager();
            }
            return UIManager._instance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "current_module", {
        get: function () {
            return this._current_module;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "map_drag_node", {
        get: function () {
            return this._map_drag_node;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "mapMainUI", {
        get: function () {
            if (!GameManager_1.gm.ui._map_node) {
                GameManager_1.gm.ui._map_node = cc.find("Canvas/ui_node/mainUI");
            }
            return GameManager_1.gm.ui._map_node ? GameManager_1.gm.ui._map_node.getComponent(MainMapUI_1.default) : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "newerGuideOp", {
        get: function () {
            if (!GameManager_1.gm.ui._guide_node) {
                GameManager_1.gm.ui._guide_node = cc.find("Canvas/ui_node/newerGuideOp");
            }
            return GameManager_1.gm.ui._guide_node
                ? GameManager_1.gm.ui._guide_node.getComponent(NewerGuideOp_1.default)
                : null;
        },
        enumerable: false,
        configurable: true
    });
    UIManager.prototype.init = function (params) {
        this.main_camera = cc
            .find("Canvas/Main Camera")
            .getComponent(cc.Camera);
        var canvasNode = cc.Canvas.instance.node;
        this._scene_node =
            cc.find("Canvas/scene_node") || new cc.Node("scene_node");
        canvasNode.addChild(this._scene_node);
        Utils_1.Utils.align_with_parent(this._scene_node);
        this._ui_node = cc.find("Canvas/ui_node") || new cc.Node("ui_node");
        canvasNode.addChild(this._ui_node);
        Utils_1.Utils.align_with_parent(this._ui_node);
        this._top_node = cc.find("Canvas/top_node") || new cc.Node("top_node");
        canvasNode.addChild(this._top_node);
        Utils_1.Utils.align_with_parent(this._top_node);
        this._drag_node =
            cc.find("Canvas/drag_node") || new cc.Node("drag_node");
        canvasNode.addChild(this._drag_node);
        Utils_1.Utils.align_with_parent(this._drag_node);
        this._map_drag_node =
            cc.find("Canvas/map_drag_node") || new cc.Node("map_drag_node");
        canvasNode.addChild(this._map_drag_node);
        Utils_1.Utils.align_with_parent(this._map_drag_node);
        if (GameManager_1.gm.ui.Login) {
            this.async_show_module(GameManager_1.gm.const.Loading, params);
        }
        else {
            this.async_show_module(GameManager_1.gm.const.Login);
        }
        // this.async_show_module(gm.const.Loading, params);
    };
    Object.defineProperty(UIManager.prototype, "drag_node", {
        get: function () {
            return this._drag_node;
        },
        enumerable: false,
        configurable: true
    });
    UIManager.prototype.get_layer_node = function (type) {
        switch (type) {
            case Constants_1.LayerType.SCENE:
                return this._scene_node;
            case Constants_1.LayerType.TOP:
                return this._top_node;
            case Constants_1.LayerType.DRAG:
                return this._drag_node;
            default:
                return this._ui_node;
        }
    };
    Object.defineProperty(UIManager.prototype, "start", {
        get: function () {
            return this._map[GameManager_1.gm.const.Start.key];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "loading", {
        get: function () {
            return this._map[GameManager_1.gm.const.Loading.key];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "task", {
        get: function () {
            return this._map[GameManager_1.gm.const.Task.key];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "ladder", {
        get: function () {
            return this._map[GameManager_1.gm.const.Ladder.key];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "sign", {
        get: function () {
            return this._map[GameManager_1.gm.const.Sign.key];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "mail", {
        get: function () {
            return this._map[GameManager_1.gm.const.Mail.key];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "auto_merge_message", {
        get: function () {
            return this._map[GameManager_1.gm.const.AutoMergeMessage.key];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "offline_op", {
        get: function () {
            return this._map[GameManager_1.gm.const.OFFLINEOP.key];
        },
        enumerable: false,
        configurable: true
    });
    UIManager.prototype.get_module = function (data) {
        return this._map[data.key];
    };
    UIManager.prototype.set_module_args = function (key, data) {
        this._args_map[key] = data;
    };
    UIManager.prototype.get_module_args = function (key) {
        return this._args_map[key];
    };
    UIManager.prototype.clear_module_args = function () { };
    UIManager.prototype.async_load_module = function (moduleNotice, callback) {
        var _this = this;
        if (this._map[moduleNotice.key]) {
            callback(true);
        }
        else {
            console.log(moduleNotice.bundle_name);
            Utils_1.Utils.async_get_bundle(moduleNotice.bundle_name, function (bundle) {
                bundle.load(moduleNotice.load_url, cc.Prefab, function (error, prefab) {
                    if (error) {
                        cc.error(error);
                        _this.show_notice(cc.js.formatStr("Không tải được Module %s", moduleNotice.key));
                        if (_this.loading) {
                            _this.loading.state = Launch_1.LoadingState.COMPLETE;
                        }
                    }
                    else {
                        if (_this._map[moduleNotice.key]) {
                            callback(true);
                        }
                        else {
                            var instantiatedNode = cc.instantiate(prefab);
                            instantiatedNode.active = false;
                            instantiatedNode.parent = _this.get_layer_node(moduleNotice.layer_type);
                            var component = instantiatedNode.getComponent(moduleNotice.key);
                            if (component == null) {
                                cc.error(moduleNotice.key + " module need extend GameModule");
                            }
                            _this._map[moduleNotice.key] = component;
                            callback(false);
                        }
                    }
                });
            });
        }
    };
    UIManager.prototype.preload_module = function (event) {
        Utils_1.Utils.async_get_bundle(event.bundle_name, function (t) {
            t.preload(event.load_url, cc.Prefab);
        });
    };
    UIManager.prototype.async_show_module = function (moduleNotice, callback) {
        var _this = this;
        console.log(moduleNotice.key);
        this.async_load_module(moduleNotice, function () {
            var map = _this._map[moduleNotice.key];
            if (map) {
                _this._current_module = moduleNotice;
                if (_this._current_module.module_type == Constants_1.ModuleType.SCENE) {
                    for (var index_1 = _this._stack.length - 1; 0 <= index_1; index_1--) {
                        if (_this._stack[index_1] != GameManager_1.gm.const.Loading &&
                            _this._stack[index_1] != GameManager_1.gm.const.Story &&
                            _this._stack[index_1] != GameManager_1.gm.const.Guide &&
                            _this._stack[index_1] != GameManager_1.gm.const.Login) {
                            var stack = _this._stack.splice(index_1, 1)[0];
                            _this._map[stack.key].node.active = false;
                        }
                    }
                }
                else if (!(moduleNotice.module_type != Constants_1.ModuleType.WINDOW)) {
                    var parentNode = map.node.parent;
                    if (parentNode) {
                        map.node.removeFromParent(false);
                        parentNode.addChild(map.node);
                    }
                }
                var index = _this._stack.indexOf(moduleNotice);
                if (-1 < index) {
                    _this._stack.splice(index, 1);
                }
                if (moduleNotice != GameManager_1.gm.const.FlyNotice &&
                    moduleNotice != GameManager_1.gm.const.Notice) {
                    _this._stack.push(moduleNotice);
                }
                if (map.node.parent) {
                    Utils_1.Utils.align_with_parent(map.node);
                }
                // if (moduleNotice.key != "Ladder") {
                //     map.node.active = true;
                // }
                map.node.active = true;
                if (moduleNotice.has_open_effect) {
                    map.node.scale = 0;
                    var action = cc.sequence(cc.scaleTo(0.1, 1), cc.delayTime(0), cc.callFunc(function () {
                        _this.emit("module-show", map);
                        if (callback) {
                            callback(map);
                        }
                    }));
                    map.node.runAction(action);
                }
                else {
                    _this.emit("module-show", map);
                    if (callback) {
                        callback(map);
                    }
                }
            }
        });
    };
    UIManager.prototype.async_hide_module = function (notice) {
        var _this = this;
        var item = this._map[notice.key];
        if (item) {
            var index = this._stack.indexOf(notice);
            if (index > -1) {
                this._stack.splice(index, 1);
                if (notice.has_open_effect) {
                    var action = cc.sequence(cc.scaleTo(0.1, 0), cc.callFunc(function () {
                        item.node.active = false;
                        item.node.scale = 1;
                        _this.emit("module-hide", item);
                    }));
                    item.node.runAction(action);
                }
                else {
                    item.node.active = false;
                    this.emit("module-hide", item);
                }
            }
        }
    };
    UIManager.prototype.hide_upper_module = function (notice) {
        var index = this._stack.indexOf(notice);
        if (index > -1) {
            for (var a = this._stack.length - 1; a > index; a--) {
                this.async_hide_module(this._stack[a]);
            }
        }
    };
    UIManager.prototype.get_top_module = function () {
        for (var t = this._stack.length - 1; t >= 0; t--) {
            var event = this._stack[t];
            if (event !== GameManager_1.gm.const.Notice) {
                return this._map[event.key];
            }
        }
        return null;
    };
    Object.defineProperty(UIManager.prototype, "notice", {
        get: function () {
            return this._map[GameManager_1.gm.const.Notice.key];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "fly_notice", {
        get: function () {
            return this._map[GameManager_1.gm.const.FlyNotice.key];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIManager.prototype, "fight", {
        get: function () {
            return this._map[GameManager_1.gm.const.Fight.key];
        },
        enumerable: false,
        configurable: true
    });
    UIManager.prototype.show_notice_array = function (notices) {
        var _this = this;
        this.async_show_module(GameManager_1.gm.const.Notice, function () {
            for (var index = 0; index < notices.length; index++) {
                _this.notice.show_notice(notices[index]);
            }
        });
    };
    UIManager.prototype.show_notice = function (message, callback) {
        var _this = this;
        this.async_show_module(GameManager_1.gm.const.Notice, function () {
            _this.notice.show_notice(message);
            if (callback)
                callback();
        });
    };
    UIManager.prototype.show_fly_notice = function (message, duration, targetNode, callback) {
        var _this = this;
        this.async_show_module(GameManager_1.gm.const.FlyNotice, function () {
            var worldPosition = targetNode.convertToWorldSpaceAR(cc.v3(0, (1 - targetNode.anchorY) * targetNode.height));
            _this.fly_notice.show_fly_notice(message, duration, worldPosition);
            if (callback)
                callback();
        });
    };
    UIManager.prototype.show_item_fly = function (itemId, startPosition, endPosition) {
        var _this = this;
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, GameManager_1.gm.const.ItemFly.load_url, ItemFly_1.ItemFly, function (component) {
            var _a;
            if (!component)
                return;
            var itemFlyAnimation = component;
            itemFlyAnimation.init_fly_anim(itemId, startPosition, endPosition);
            if ((_a = _this.mapMainUI) === null || _a === void 0 ? void 0 : _a.mapContent) {
                _this.mapMainUI.mapContent.addChild(component.node);
            }
        });
    };
    UIManager.prototype.show_coin_fly = function (rewardType, startPosition, count, endPosition) {
        var _this = this;
        if (count === void 0) { count = 3; }
        if (endPosition === void 0) { endPosition = null; }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, GameManager_1.gm.const.CoinFlyAnim.load_url, CoinFlyAnim_1.CoinFlyAnim, function (CoinFly) {
            CoinFly.init_fly_anim(rewardType, startPosition, endPosition, count);
            _this.get_layer_node(Constants_1.LayerType.TOP).addChild(CoinFly.node);
        });
        if (rewardType == Constants_1.RewardIdEnum.GOLD) {
            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_17_GOLD_FLY);
        }
        else if (rewardType == Constants_1.RewardIdEnum.DIAMOND) {
            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_162_DIAMOND_FLY);
        }
        else if (rewardType == Constants_1.RewardIdEnum.STAR) {
            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_25_LADDER_STAR_FLY);
        }
    };
    UIManager.prototype.show_start = function (callback) {
        var mapUI = this._map[GameManager_1.gm.const.MAPUI.key];
        var startTime = Date.now();
        if (mapUI) {
            if (GameManager_1.gm.data.fight_temp_data.play_type === 0) {
                GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.BOAT_IN;
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.MAPUI);
                setTimeout(function () {
                    GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.COMPLETE;
                    if (callback)
                        callback();
                }, GameManager_1.gm.const.MIN_LOADING_TIME);
            }
            else {
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.MAPUI);
                if (callback)
                    callback();
            }
        }
        else {
            GameManager_1.gm.ui.loading.state =
                GameManager_1.gm.data.fight_temp_data.play_type === 0
                    ? Launch_1.LoadingState.BOAT_IN
                    : Launch_1.LoadingState.START_FULL;
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.MAPUI, function () {
                var elapsedTime = Date.now() - startTime;
                if (GameManager_1.gm.ui.loading.state !== Launch_1.LoadingState.BOAT_IN ||
                    elapsedTime > GameManager_1.gm.const.MIN_LOADING_TIME) {
                    GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.COMPLETE;
                    if (callback)
                        callback();
                }
                else {
                    setTimeout(function () {
                        GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.COMPLETE;
                        if (callback)
                            callback();
                    }, GameManager_1.gm.const.MIN_LOADING_TIME - elapsedTime);
                }
            });
        }
    };
    UIManager.prototype.show_panel = function (notice) {
        if (this._map[notice.key]) {
            console.log("Buy");
            GameManager_1.gm.ui.async_show_module(notice);
        }
        else {
            GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.START;
            GameManager_1.gm.ui.async_show_module(notice, function () {
                GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.COMPLETE;
            });
        }
    };
    UIManager.prototype.show_auto_merge_message = function () {
        if (this.mapMainUI && this.mapMainUI.autoCompose._stopTime > 0) {
            GameManager_1.gm.ui.show_notice("Không đủ dung lượng bản đồ, vui lòng thử lại");
        }
        else if (this.auto_merge_message &&
            (!this.auto_merge_message ||
                !this.auto_merge_message.node.activeInHierarchy)) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.AutoMergeMessage);
        }
    };
    UIManager.prototype.show_fight = function () {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var fightModule = GameManager_1.gm.const.Fight;
        if (fightTempData.play_type === 0) {
            GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.BOAT_OUT;
        }
        else if (fightTempData.play_type === 1) {
            GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.REWARD_FULL;
        }
        else if (fightTempData.play_type === 2) {
            GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.CAVES_FULL;
            GameManager_1.gm.audio.play_music(GameManager_1.gm.const.AUDIO_92_LOADING_ISLAND_MUSIC);
        }
        var startTime = Date.now();
        GameManager_1.gm.ui.async_show_module(fightModule, function () {
            var elapsedTime = Date.now() - startTime;
            if (elapsedTime > GameManager_1.gm.const.MIN_LOADING_TIME) {
                GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.COMPLETE;
            }
            else {
                setTimeout(function () {
                    GameManager_1.gm.ui.loading.state = Launch_1.LoadingState.COMPLETE;
                }, GameManager_1.gm.const.MIN_LOADING_TIME - elapsedTime);
            }
        });
    };
    UIManager._instance = null;
    return UIManager;
}(EventEmitter_1.EventEmitter));
exports.UIManager = UIManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFVJTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsRUFBRTtBQUNGLCtDQUE4QztBQUM5Qyw2Q0FBbUM7QUFDbkMseUNBTXFCO0FBQ3JCLGlDQUFnQztBQUNoQyw2Q0FBNEM7QUFDNUMseUNBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyxxQ0FBb0M7QUFDcEMsbUNBQXdDO0FBdUR4QztJQUErQiw2QkFBWTtJQW9CdkM7UUFBQSxZQUNJLGlCQUFPLFNBUVY7UUFQRyxLQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztRQUNqQyxLQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztRQUNqQyxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxXQUFXLENBQUM7UUFDakIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0lBQ3ZCLENBQUM7SUFFRCxzQkFBa0IscUJBQVE7YUFBMUI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtnQkFDdEIsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO2FBQ3pDO1lBQ0QsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBRUQsc0JBQVcscUNBQWM7YUFBekI7WUFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxvQ0FBYTthQUF4QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGdDQUFTO2FBQXBCO1lBQ0ksSUFBSSxDQUFDLGdCQUFFLENBQUMs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RSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsQ0FBQzthQUMvQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTFnQmMsbUJBQVMsR0FBcUIsSUFBSSxDQUFDO0lBMmdCdEQsZ0JBQUM7Q0FqaEJELEFBaWhCQyxDQWpoQjhCLDJCQUFZLEdBaWhCMUM7QUFqaEJZLDhCQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9cclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4vRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIExheWVyVHlwZSxcclxuICAgIEJ1bmRsZU5hbWUsXHJcbiAgICBSZXdhcmRJZEVudW0sXHJcbiAgICBNb2R1bGVUeXBlLFxyXG4gICAgSU5vdGljZSxcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBDb2luRmx5QW5pbSB9IGZyb20gXCIuL0NvaW5GbHlBbmltXCI7XHJcbmltcG9ydCBNYWluTWFwVUkgZnJvbSBcIi4vTWFpbk1hcFVJXCI7XHJcbmltcG9ydCBOZXdlckd1aWRlT3AgZnJvbSBcIi4vTmV3ZXJHdWlkZU9wXCI7XHJcbmltcG9ydCB7IEl0ZW1GbHkgfSBmcm9tIFwiLi9JdGVtRmx5XCI7XHJcbmltcG9ydCB7IExvYWRpbmdTdGF0ZSB9IGZyb20gXCIuL0xhdW5jaFwiO1xyXG5pbXBvcnQgeyBNYWlsRGV0YWlsc0FyZ3MgfSBmcm9tIFwiLi4vLi4vbWFpbC9zY3JpcHRzL01haWxEZXRhaWxzXCI7XHJcbmltcG9ydCB7IERvdWJsZU9wIH0gZnJvbSBcIi4vR2V0RG91YmxlUmV3YXJkT3BcIjtcclxuaW1wb3J0IHsgTG9hZGluZyB9IGZyb20gXCIuL0xvYWRpbmdcIjtcclxuaW1wb3J0IHsgTWFpbCB9IGZyb20gXCIuLi8uLi9tYWlsL3NjcmlwdHMvTWFpbFwiO1xyXG5pbXBvcnQgU2lnbiBmcm9tIFwiLi4vLi4vc2lnbi9zY3JpcHRzL1NpZ25cIjtcclxuaW1wb3J0IHsgVGFzaywgVGFza0FyZ3MgfSBmcm9tIFwiLi4vLi4vdGFzay9zY3JpcHRzL1Rhc2tcIjtcclxuaW1wb3J0IHsgTGFkZGVyIH0gZnJvbSBcIi4uLy4uL2xhZGRlci9zY3JpcHRzL0xhZGRlclwiO1xyXG5pbXBvcnQgeyBTdGFydCB9IGZyb20gXCIuLi8uLi9zdGFydC9zY3JpcHRzL1N0YXJ0XCI7XHJcbmltcG9ydCB7IEF1dG9NZXJnZU1lc3NhZ2UgfSBmcm9tIFwiLi9BdXRvTWVyZ2VNZXNzYWdlXCI7XHJcbmltcG9ydCBPZmZsaW5lT3AgZnJvbSBcIi4vT2ZmbGluZU9wXCI7XHJcbmltcG9ydCB7IEd1aWRlQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL2d1aWRlXCI7XHJcbmltcG9ydCBTY2VuZUJvb2tWaWV3IGZyb20gXCIuLi8uLi9ib29rL3NjcmlwdHMvU2NlbmVCb29rVmlld1wiO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vR2FtZU1vZHVsZVwiO1xyXG5pbXBvcnQgeyBGaWdodCB9IGZyb20gXCIuLi8uLi9maWdodC9zY3JpcHRzL0ZpZ2h0XCI7XHJcbmltcG9ydCB7IExvZ2luIH0gZnJvbSBcIi4uLy4uL2xvZ2luL3NjcmlwdHMvTG9naW5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kdWxlQWdycyB7XHJcbiAgICBpdGVtSUQ6IG51bWJlcjtcclxuICAgIGl0ZW1OdW06IG51bWJlcjtcclxuICAgIGJ1aWxkVHlwZTogbnVtYmVyO1xyXG4gICAgYnVpbGRJdGVtSUQ6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIE5vdGljZSBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgc2hvd19ub3RpY2U/OiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgc2hvd19mbHlfbm90aWNlPzogKFxyXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgICAgICBkdXJhdGlvbjogbnVtYmVyLFxyXG4gICAgICAgIHBvc2l0aW9uOiBjYy5WZWMzXHJcbiAgICApID0+IHZvaWQ7XHJcbn1cclxuXHJcbnR5cGUgTWFwID1cclxuICAgIHwgTG9hZGluZ1xyXG4gICAgfCBNYWlsXHJcbiAgICB8IE1haW5NYXBVSVxyXG4gICAgfCBTaWduXHJcbiAgICB8IFRhc2tcclxuICAgIHwgTGFkZGVyXHJcbiAgICB8IFN0YXJ0XHJcbiAgICB8IEF1dG9NZXJnZU1lc3NhZ2VcclxuICAgIHwgT2ZmbGluZU9wXHJcbiAgICB8IFNjZW5lQm9va1ZpZXdcclxuICAgIHwgTm90aWNlO1xyXG5leHBvcnQgdHlwZSBNdWR1bGUgPVxyXG4gICAgfCBNb2R1bGVBZ3JzXHJcbiAgICB8IG51bWJlcltdXHJcbiAgICB8IE1haWxEZXRhaWxzQXJnc1xyXG4gICAgfCBudW1iZXJcclxuICAgIHwgRG91YmxlT3BcclxuICAgIHwgR3VpZGVDb25maWdcclxuICAgIHwgYm9vbGVhblxyXG4gICAgfCBUYXNrQXJncztcclxuXHJcbmV4cG9ydCBjbGFzcyBVSU1hbmFnZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgcHVibGljIE1PRFVMRV9TSE9XOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgTU9EVUxFX0hJREU6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgTG9naW46IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBVSU1hbmFnZXIgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRfbW9kdWxlOiBJTm90aWNlO1xyXG4gICAgcHJpdmF0ZSBfc2NlbmVfbm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgX3VpX25vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF90b3Bfbm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgX2RyYWdfbm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgX21hcF9kcmFnX25vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF9hcmdzX21hcDogUmVjb3JkPHN0cmluZywgTW9kdWxlQWdycz47XHJcbiAgICBwcml2YXRlIF9tYXA6IFJlY29yZDxzdHJpbmcsIE1hcD47XHJcbiAgICBwcml2YXRlIF9zdGFjazogYW55W107XHJcbiAgICBwcml2YXRlIG1haW5fY2FtZXJhOiBjYy5DYW1lcmE7XHJcbiAgICBwcml2YXRlIF9tYXBfbm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgX2d1aWRlX25vZGU6IGNjLk5vZGU7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5NT0RVTEVfU0hPVyA9IFwibW9kdWxlLXNob3dcIjtcclxuICAgICAgICB0aGlzLk1PRFVMRV9ISURFID0gXCJtb2R1bGUtaGlkZVwiO1xyXG4gICAgICAgIHRoaXMuX2FyZ3NfbWFwID0ge307XHJcbiAgICAgICAgdGhpcy5fbWFwID0ge307XHJcbiAgICAgICAgdGhpcy5fc3RhY2sgPSBbXTtcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhO1xyXG4gICAgICAgIHRoaXMuTG9naW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBVSU1hbmFnZXIge1xyXG4gICAgICAgIGlmICghVUlNYW5hZ2VyLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuX2luc3RhbmNlID0gbmV3IFVJTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVUlNYW5hZ2VyLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnRfbW9kdWxlKCk6IElOb3RpY2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50X21vZHVsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG1hcF9kcmFnX25vZGUoKTogY2MuTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcF9kcmFnX25vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtYXBNYWluVUkoKTogTWFpbk1hcFVJIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKCFnbS51aS5fbWFwX25vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuX21hcF9ub2RlID0gY2MuZmluZChcIkNhbnZhcy91aV9ub2RlL21haW5VSVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdtLnVpLl9tYXBfbm9kZSA/IGdtLnVpLl9tYXBfbm9kZS5nZXRDb21wb25lbnQoTWFpbk1hcFVJKSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuZXdlckd1aWRlT3AoKTogTmV3ZXJHdWlkZU9wIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKCFnbS51aS5fZ3VpZGVfbm9kZSkge1xyXG4gICAgICAgICAgICBnbS51aS5fZ3VpZGVfbm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvdWlfbm9kZS9uZXdlckd1aWRlT3BcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnbS51aS5fZ3VpZGVfbm9kZVxyXG4gICAgICAgICAgICA/IGdtLnVpLl9ndWlkZV9ub2RlLmdldENvbXBvbmVudChOZXdlckd1aWRlT3ApXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChwYXJhbXM6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhID0gY2NcclxuICAgICAgICAgICAgLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmFcIilcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudChjYy5DYW1lcmEpO1xyXG4gICAgICAgIGNvbnN0IGNhbnZhc05vZGU6IGNjLk5vZGUgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2NlbmVfbm9kZSA9XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvc2NlbmVfbm9kZVwiKSB8fCBuZXcgY2MuTm9kZShcInNjZW5lX25vZGVcIik7XHJcbiAgICAgICAgY2FudmFzTm9kZS5hZGRDaGlsZCh0aGlzLl9zY2VuZV9ub2RlKTtcclxuICAgICAgICBVdGlscy5hbGlnbl93aXRoX3BhcmVudCh0aGlzLl9zY2VuZV9ub2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdWlfbm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvdWlfbm9kZVwiKSB8fCBuZXcgY2MuTm9kZShcInVpX25vZGVcIik7XHJcbiAgICAgICAgY2FudmFzTm9kZS5hZGRDaGlsZCh0aGlzLl91aV9ub2RlKTtcclxuICAgICAgICBVdGlscy5hbGlnbl93aXRoX3BhcmVudCh0aGlzLl91aV9ub2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdG9wX25vZGUgPSBjYy5maW5kKFwiQ2FudmFzL3RvcF9ub2RlXCIpIHx8IG5ldyBjYy5Ob2RlKFwidG9wX25vZGVcIik7XHJcbiAgICAgICAgY2FudmFzTm9kZS5hZGRDaGlsZCh0aGlzLl90b3Bfbm9kZSk7XHJcbiAgICAgICAgVXRpbHMuYWxpZ25fd2l0aF9wYXJlbnQodGhpcy5fdG9wX25vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLl9kcmFnX25vZGUgPVxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL2RyYWdfbm9kZVwiKSB8fCBuZXcgY2MuTm9kZShcImRyYWdfbm9kZVwiKTtcclxuICAgICAgICBjYW52YXNOb2RlLmFkZENoaWxkKHRoaXMuX2RyYWdfbm9kZSk7XHJcbiAgICAgICAgVXRpbHMuYWxpZ25fd2l0aF9wYXJlbnQodGhpcy5fZHJhZ19ub2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFwX2RyYWdfbm9kZSA9XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvbWFwX2RyYWdfbm9kZVwiKSB8fCBuZXcgY2MuTm9kZShcIm1hcF9kcmFnX25vZGVcIik7XHJcbiAgICAgICAgY2FudmFzTm9kZS5hZGRDaGlsZCh0aGlzLl9tYXBfZHJhZ19ub2RlKTtcclxuICAgICAgICBVdGlscy5hbGlnbl93aXRoX3BhcmVudCh0aGlzLl9tYXBfZHJhZ19ub2RlKTtcclxuICAgICAgICBpZiAoZ20udWkuTG9naW4pIHtcclxuICAgICAgICAgICAgdGhpcy5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5Mb2FkaW5nLCBwYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuTG9naW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkxvYWRpbmcsIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkcmFnX25vZGUoKTogY2MuTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RyYWdfbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X2xheWVyX25vZGUodHlwZTogTGF5ZXJUeXBlKTogY2MuTm9kZSB8IG51bGwge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIExheWVyVHlwZS5TQ0VORTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zY2VuZV9ub2RlO1xyXG4gICAgICAgICAgICBjYXNlIExheWVyVHlwZS5UT1A6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9wX25vZGU7XHJcbiAgICAgICAgICAgIGNhc2UgTGF5ZXJUeXBlLkRSQUc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZHJhZ19ub2RlO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VpX25vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RhcnQoKTogU3RhcnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBbZ20uY29uc3QuU3RhcnQua2V5XSBhcyBTdGFydDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxvYWRpbmcoKTogTG9hZGluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFtnbS5jb25zdC5Mb2FkaW5nLmtleV0gYXMgTG9hZGluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRhc2soKTogVGFzayB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFtnbS5jb25zdC5UYXNrLmtleV0gYXMgVGFzaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxhZGRlcigpOiBMYWRkZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBbZ20uY29uc3QuTGFkZGVyLmtleV0gYXMgTGFkZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2lnbigpOiBTaWduIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwW2dtLmNvbnN0LlNpZ24ua2V5XSBhcyBTaWduO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbWFpbCgpOiBNYWlsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwW2dtLmNvbnN0Lk1haWwua2V5XSBhcyBNYWlsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYXV0b19tZXJnZV9tZXNzYWdlKCk6IEF1dG9NZXJnZU1lc3NhZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBbZ20uY29uc3QuQXV0b01lcmdlTWVzc2FnZS5rZXldIGFzIEF1dG9NZXJnZU1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvZmZsaW5lX29wKCk6IE9mZmxpbmVPcCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFtnbS5jb25zdC5PRkZMSU5FT1Aua2V5XSBhcyBPZmZsaW5lT3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9tb2R1bGUoZGF0YTogSU5vdGljZSk6IFNjZW5lQm9va1ZpZXcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBbZGF0YS5rZXldIGFzIFNjZW5lQm9va1ZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldF9tb2R1bGVfYXJncyhrZXk6IHN0cmluZywgZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYXJnc19tYXBba2V5XSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9tb2R1bGVfYXJncyhrZXk6IHN0cmluZyk6IE11ZHVsZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FyZ3NfbWFwW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhcl9tb2R1bGVfYXJncygpOiB2b2lkIHt9XHJcblxyXG4gICAgcHVibGljIGFzeW5jX2xvYWRfbW9kdWxlKFxyXG4gICAgICAgIG1vZHVsZU5vdGljZTogSU5vdGljZSxcclxuICAgICAgICBjYWxsYmFjazogKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHZvaWRcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXBbbW9kdWxlTm90aWNlLmtleV0pIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobW9kdWxlTm90aWNlLmJ1bmRsZV9uYW1lKTtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfZ2V0X2J1bmRsZShtb2R1bGVOb3RpY2UuYnVuZGxlX25hbWUsIChidW5kbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGJ1bmRsZS5sb2FkKFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5vdGljZS5sb2FkX3VybCxcclxuICAgICAgICAgICAgICAgICAgICBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yLCBwcmVmYWI6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd19ub3RpY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuanMuZm9ybWF0U3RyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIktow7RuZyB04bqjaSDEkcaw4bujYyBNb2R1bGUgJXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTm90aWNlLmtleVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2FkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nLnN0YXRlID0gTG9hZGluZ1N0YXRlLkNPTVBMRVRFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hcFttb2R1bGVOb3RpY2Uua2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW50aWF0ZWROb2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZWROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlZE5vZGUucGFyZW50ID0gdGhpcy5nZXRfbGF5ZXJfbm9kZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTm90aWNlLmxheWVyX3R5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBpbnN0YW50aWF0ZWROb2RlLmdldENvbXBvbmVudChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTm90aWNlLmtleVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7bW9kdWxlTm90aWNlLmtleX0gbW9kdWxlIG5lZWQgZXh0ZW5kIEdhbWVNb2R1bGVgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcFttb2R1bGVOb3RpY2Uua2V5XSA9IGNvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVsb2FkX21vZHVsZShldmVudDogSU5vdGljZSk6IHZvaWQge1xyXG4gICAgICAgIFV0aWxzLmFzeW5jX2dldF9idW5kbGUoZXZlbnQuYnVuZGxlX25hbWUsICh0KSA9PiB7XHJcbiAgICAgICAgICAgIHQucHJlbG9hZChldmVudC5sb2FkX3VybCwgY2MuUHJlZmFiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmNfc2hvd19tb2R1bGUoXHJcbiAgICAgICAgbW9kdWxlTm90aWNlOiBJTm90aWNlLFxyXG4gICAgICAgIGNhbGxiYWNrPzogKGNvbXBvbmVudDogTWFwKSA9PiB2b2lkXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtb2R1bGVOb3RpY2Uua2V5KTtcclxuICAgICAgICB0aGlzLmFzeW5jX2xvYWRfbW9kdWxlKG1vZHVsZU5vdGljZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtYXAgPSB0aGlzLl9tYXBbbW9kdWxlTm90aWNlLmtleV07XHJcblxyXG4gICAgICAgICAgICBpZiAobWFwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50X21vZHVsZSA9IG1vZHVsZU5vdGljZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50X21vZHVsZS5tb2R1bGVfdHlwZSA9PSBNb2R1bGVUeXBlLlNDRU5FKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fc3RhY2subGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMCA8PSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgtLVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFja1tpbmRleF0gIT0gZ20uY29uc3QuTG9hZGluZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhY2tbaW5kZXhdICE9IGdtLmNvbnN0LlN0b3J5ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFja1tpbmRleF0gIT0gZ20uY29uc3QuR3VpZGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YWNrW2luZGV4XSAhPSBnbS5jb25zdC5Mb2dpblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWNrID0gdGhpcy5fc3RhY2suc3BsaWNlKGluZGV4LCAxKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcFtzdGFjay5rZXldLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCEobW9kdWxlTm90aWNlLm1vZHVsZV90eXBlICE9IE1vZHVsZVR5cGUuV0lORE9XKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSBtYXAubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLm5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuYWRkQ2hpbGQobWFwLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX3N0YWNrLmluZGV4T2YobW9kdWxlTm90aWNlKTtcclxuICAgICAgICAgICAgICAgIGlmICgtMSA8IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhY2suc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTm90aWNlICE9IGdtLmNvbnN0LkZseU5vdGljZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5vdGljZSAhPSBnbS5jb25zdC5Ob3RpY2VcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YWNrLnB1c2gobW9kdWxlTm90aWNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWFwLm5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuYWxpZ25fd2l0aF9wYXJlbnQobWFwLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIChtb2R1bGVOb3RpY2Uua2V5ICE9IFwiTGFkZGVyXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBtYXAubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgICAgIG1hcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1vZHVsZU5vdGljZS5oYXNfb3Blbl9lZmZlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXAubm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJtb2R1bGUtc2hvd1wiLCBtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobWFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJtb2R1bGUtc2hvd1wiLCBtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luY19oaWRlX21vZHVsZShub3RpY2U6IElOb3RpY2UpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5fbWFwW25vdGljZS5rZXldO1xyXG4gICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fc3RhY2suaW5kZXhPZihub3RpY2UpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhY2suc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3RpY2UuaGFzX29wZW5fZWZmZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcIm1vZHVsZS1oaWRlXCIsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwibW9kdWxlLWhpZGVcIiwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlX3VwcGVyX21vZHVsZShub3RpY2U6IElOb3RpY2UpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX3N0YWNrLmluZGV4T2Yobm90aWNlKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBhID0gdGhpcy5fc3RhY2subGVuZ3RoIC0gMTsgYSA+IGluZGV4OyBhLS0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfaGlkZV9tb2R1bGUodGhpcy5fc3RhY2tbYV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0X3RvcF9tb2R1bGUoKTogTWFwIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yIChsZXQgdCA9IHRoaXMuX3N0YWNrLmxlbmd0aCAtIDE7IHQgPj0gMDsgdC0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5fc3RhY2tbdF07XHJcbiAgICAgICAgICAgIGlmIChldmVudCAhPT0gZ20uY29uc3QuTm90aWNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwW2V2ZW50LmtleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgbm90aWNlKCk6IE5vdGljZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFtnbS5jb25zdC5Ob3RpY2Uua2V5XSBhcyBOb3RpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgZmx5X25vdGljZSgpOiBOb3RpY2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBbZ20uY29uc3QuRmx5Tm90aWNlLmtleV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBmaWdodCgpOiBGaWdodCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFtnbS5jb25zdC5GaWdodC5rZXldIGFzIEZpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X25vdGljZV9hcnJheShub3RpY2VzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuTm90aWNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBub3RpY2VzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpY2Uuc2hvd19ub3RpY2Uobm90aWNlc1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfbm90aWNlKG1lc3NhZ2U6IHN0cmluZywgY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5Ob3RpY2UsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub3RpY2Uuc2hvd19ub3RpY2UobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dfZmx5X25vdGljZShcclxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICAgICAgZHVyYXRpb246IG51bWJlcixcclxuICAgICAgICB0YXJnZXROb2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNhbGxiYWNrPzogKCkgPT4gdm9pZFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5GbHlOb3RpY2UsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgd29ybGRQb3NpdGlvbiA9IHRhcmdldE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKFxyXG4gICAgICAgICAgICAgICAgY2MudjMoMCwgKDEgLSB0YXJnZXROb2RlLmFuY2hvclkpICogdGFyZ2V0Tm9kZS5oZWlnaHQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuZmx5X25vdGljZS5zaG93X2ZseV9ub3RpY2UobWVzc2FnZSwgZHVyYXRpb24sIHdvcmxkUG9zaXRpb24pO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfaXRlbV9mbHkoXHJcbiAgICAgICAgaXRlbUlkOiBudW1iZXIsXHJcbiAgICAgICAgc3RhcnRQb3NpdGlvbjogY2MuVmVjMyxcclxuICAgICAgICBlbmRQb3NpdGlvbjogY2MuVmVjM1xyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoXHJcbiAgICAgICAgICAgIEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICBnbS5jb25zdC5JdGVtRmx5LmxvYWRfdXJsLFxyXG4gICAgICAgICAgICBJdGVtRmx5LFxyXG4gICAgICAgICAgICAoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1GbHlBbmltYXRpb24gPSBjb21wb25lbnQ7XHJcbiAgICAgICAgICAgICAgICBpdGVtRmx5QW5pbWF0aW9uLmluaXRfZmx5X2FuaW0oXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kUG9zaXRpb25cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwTWFpblVJPy5tYXBDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBNYWluVUkubWFwQ29udGVudC5hZGRDaGlsZChjb21wb25lbnQubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X2NvaW5fZmx5KFxyXG4gICAgICAgIHJld2FyZFR5cGU6IFJld2FyZElkRW51bSxcclxuICAgICAgICBzdGFydFBvc2l0aW9uOiBjYy5WZWMzLFxyXG4gICAgICAgIGNvdW50OiBudW1iZXIgPSAzLFxyXG4gICAgICAgIGVuZFBvc2l0aW9uOiBjYy5WZWMzID0gbnVsbFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoXHJcbiAgICAgICAgICAgIEJ1bmRsZU5hbWUuQ09NTU9OLFxyXG4gICAgICAgICAgICBnbS5jb25zdC5Db2luRmx5QW5pbS5sb2FkX3VybCxcclxuICAgICAgICAgICAgQ29pbkZseUFuaW0sXHJcbiAgICAgICAgICAgIChDb2luRmx5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBDb2luRmx5LmluaXRfZmx5X2FuaW0oXHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZFBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRfbGF5ZXJfbm9kZShMYXllclR5cGUuVE9QKS5hZGRDaGlsZChDb2luRmx5Lm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKHJld2FyZFR5cGUgPT0gUmV3YXJkSWRFbnVtLkdPTEQpIHtcclxuICAgICAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fMTdfR09MRF9GTFkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmV3YXJkVHlwZSA9PSBSZXdhcmRJZEVudW0uRElBTU9ORCkge1xyXG4gICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT18xNjJfRElBTU9ORF9GTFkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmV3YXJkVHlwZSA9PSBSZXdhcmRJZEVudW0uU1RBUikge1xyXG4gICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT18yNV9MQURERVJfU1RBUl9GTFkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd19zdGFydChjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtYXBVSSA9IHRoaXMuX21hcFtnbS5jb25zdC5NQVBVSS5rZXldO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcblxyXG4gICAgICAgIGlmIChtYXBVSSkge1xyXG4gICAgICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEucGxheV90eXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5sb2FkaW5nLnN0YXRlID0gTG9hZGluZ1N0YXRlLkJPQVRfSU47XHJcbiAgICAgICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5NQVBVSSk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5sb2FkaW5nLnN0YXRlID0gTG9hZGluZ1N0YXRlLkNPTVBMRVRFO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH0sIGdtLmNvbnN0Lk1JTl9MT0FESU5HX1RJTUUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuTUFQVUkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ20udWkubG9hZGluZy5zdGF0ZSA9XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5wbGF5X3R5cGUgPT09IDBcclxuICAgICAgICAgICAgICAgICAgICA/IExvYWRpbmdTdGF0ZS5CT0FUX0lOXHJcbiAgICAgICAgICAgICAgICAgICAgOiBMb2FkaW5nU3RhdGUuU1RBUlRfRlVMTDtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuTUFQVUksICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkubG9hZGluZy5zdGF0ZSAhPT0gTG9hZGluZ1N0YXRlLkJPQVRfSU4gfHxcclxuICAgICAgICAgICAgICAgICAgICBlbGFwc2VkVGltZSA+IGdtLmNvbnN0Lk1JTl9MT0FESU5HX1RJTUVcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmxvYWRpbmcuc3RhdGUgPSBMb2FkaW5nU3RhdGUuQ09NUExFVEU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubG9hZGluZy5zdGF0ZSA9IExvYWRpbmdTdGF0ZS5DT01QTEVURTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGdtLmNvbnN0Lk1JTl9MT0FESU5HX1RJTUUgLSBlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd19wYW5lbChub3RpY2U6IElOb3RpY2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFwW25vdGljZS5rZXldKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnV5XCIpO1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShub3RpY2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdtLnVpLmxvYWRpbmcuc3RhdGUgPSBMb2FkaW5nU3RhdGUuU1RBUlQ7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKG5vdGljZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ20udWkubG9hZGluZy5zdGF0ZSA9IExvYWRpbmdTdGF0ZS5DT01QTEVURTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X2F1dG9fbWVyZ2VfbWVzc2FnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tYXBNYWluVUkgJiYgdGhpcy5tYXBNYWluVUkuYXV0b0NvbXBvc2UuX3N0b3BUaW1lID4gMCkge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIktow7RuZyDEkeG7pyBkdW5nIGzGsOG7o25nIGLhuqNuIMSR4buTLCB2dWkgbMOybmcgdGjhu60gbOG6oWlcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgdGhpcy5hdXRvX21lcmdlX21lc3NhZ2UgJiZcclxuICAgICAgICAgICAgKCF0aGlzLmF1dG9fbWVyZ2VfbWVzc2FnZSB8fFxyXG4gICAgICAgICAgICAgICAgIXRoaXMuYXV0b19tZXJnZV9tZXNzYWdlLm5vZGUuYWN0aXZlSW5IaWVyYXJjaHkpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuQXV0b01lcmdlTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X2ZpZ2h0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0VGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBjb25zdCBmaWdodE1vZHVsZSA9IGdtLmNvbnN0LkZpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoZmlnaHRUZW1wRGF0YS5wbGF5X3R5cGUgPT09IDApIHtcclxuICAgICAgICAgICAgZ20udWkubG9hZGluZy5zdGF0ZSA9IExvYWRpbmdTdGF0ZS5CT0FUX09VVDtcclxuICAgICAgICB9IGVsc2UgaWYgKGZpZ2h0VGVtcERhdGEucGxheV90eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLmxvYWRpbmcuc3RhdGUgPSBMb2FkaW5nU3RhdGUuUkVXQVJEX0ZVTEw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmaWdodFRlbXBEYXRhLnBsYXlfdHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICBnbS51aS5sb2FkaW5nLnN0YXRlID0gTG9hZGluZ1N0YXRlLkNBVkVTX0ZVTEw7XHJcbiAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfbXVzaWMoZ20uY29uc3QuQVVESU9fOTJfTE9BRElOR19JU0xBTkRfTVVTSUMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShmaWdodE1vZHVsZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkVGltZSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZWxhcHNlZFRpbWUgPiBnbS5jb25zdC5NSU5fTE9BRElOR19USU1FKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5sb2FkaW5nLnN0YXRlID0gTG9hZGluZ1N0YXRlLkNPTVBMRVRFO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkubG9hZGluZy5zdGF0ZSA9IExvYWRpbmdTdGF0ZS5DT01QTEVURTtcclxuICAgICAgICAgICAgICAgIH0sIGdtLmNvbnN0Lk1JTl9MT0FESU5HX1RJTUUgLSBlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=