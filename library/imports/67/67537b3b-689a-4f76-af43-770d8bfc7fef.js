"use strict";
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