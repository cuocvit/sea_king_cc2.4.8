
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ChannelManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f4b51iEVWlLc7nO2D61PFhs', 'ChannelManager');
// start-scene/scripts/ChannelManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelManager = exports.REWARD_VIDEO_AD_TYPE = exports.BANNER_AD_TYPE = void 0;
var QQMiniGame_1 = require("./QQMiniGame");
var TTMiniGame_1 = require("./TTMiniGame");
var WXMiniGame_1 = require("./WXMiniGame");
var DWMiniGame_1 = require("./DWMiniGame ");
var GameManager_1 = require("./GameManager");
var NetUtils_1 = require("./NetUtils");
var VIVOMiniGame_1 = require("./VIVOMiniGame");
var OPPOMiniGame_1 = require("./OPPOMiniGame");
var SDKManager_1 = require("./SDKManager");
var BANNER_AD_TYPE;
(function (BANNER_AD_TYPE) {
    BANNER_AD_TYPE[BANNER_AD_TYPE["ALL"] = 0] = "ALL";
})(BANNER_AD_TYPE = exports.BANNER_AD_TYPE || (exports.BANNER_AD_TYPE = {}));
var REWARD_VIDEO_AD_TYPE;
(function (REWARD_VIDEO_AD_TYPE) {
    REWARD_VIDEO_AD_TYPE[REWARD_VIDEO_AD_TYPE["ALL"] = 0] = "ALL";
    REWARD_VIDEO_AD_TYPE[REWARD_VIDEO_AD_TYPE["LONG"] = 1] = "LONG";
    REWARD_VIDEO_AD_TYPE[REWARD_VIDEO_AD_TYPE["SHORT"] = 2] = "SHORT";
})(REWARD_VIDEO_AD_TYPE = exports.REWARD_VIDEO_AD_TYPE || (exports.REWARD_VIDEO_AD_TYPE = {}));
// export class ChannelManager implements Channelmanager {
var ChannelManager = /** @class */ (function () {
    function ChannelManager() {
    }
    Object.defineProperty(ChannelManager, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new ChannelManager();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    ChannelManager.prototype.init = function () {
        var channelName = this.get_channel_name();
        console.log("Channel:" + channelName);
        if (channelName == ChannelManager.TT_GAME) {
            if (TTMiniGame_1.TTMiniGame.ad_enable) {
                TTMiniGame_1.TTMiniGame.instance.load_channel_env(function () { });
                TTMiniGame_1.TTMiniGame.instance.load_sub_packages_env(function () { });
            }
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.load_channel_env(function () { });
            QQMiniGame_1.QQMiniGame.instance.load_sub_packages_env(function () { });
            if (QQMiniGame_1.QQMiniGame.ad_enable) {
                QQMiniGame_1.QQMiniGame.instance.create_video_ad();
                QQMiniGame_1.QQMiniGame.instance.create_app_box_ad();
            }
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (ChannelManager.APP_DS_MAP == 0) {
                WXMiniGame_1.WXMiniGame.instance.load_channel_env(function () { });
                WXMiniGame_1.WXMiniGame.instance.load_sub_packages_env(function () { });
                if (WXMiniGame_1.WXMiniGame.ad_enable) {
                    WXMiniGame_1.WXMiniGame.instance.create_banner_ad();
                    WXMiniGame_1.WXMiniGame.instance.create_video_ad();
                }
            }
        }
        else if (channelName == ChannelManager.DW_GAME) {
            DWMiniGame_1.DWMiniGame.instance.load_channel_env(function () { });
            DWMiniGame_1.DWMiniGame.instance.load_sub_packages_env(function () { });
            DWMiniGame_1.DWMiniGame.instance.create_banner_ad();
            DWMiniGame_1.DWMiniGame.instance.create_video_ad();
        }
        else if (channelName == ChannelManager.HW_GAME || channelName == ChannelManager.VIVO_GAME) {
            VIVOMiniGame_1.VIVOMiniGame.instance.load_channel_env(function () { });
            VIVOMiniGame_1.VIVOMiniGame.instance.load_sub_packages_env(function () { });
            VIVOMiniGame_1.VIVOMiniGame.instance.create_video_ad();
        }
        else if (channelName == ChannelManager.OPPO_GAME) {
            OPPOMiniGame_1.OPPOMiniGame.instance.load_channel_env(function () { });
            OPPOMiniGame_1.OPPOMiniGame.instance.load_sub_packages_env(function () { });
            OPPOMiniGame_1.OPPOMiniGame.instance.create_video_ad();
        }
    };
    ChannelManager.prototype.get_channel_name = function () {
        var channelName = ChannelManager.UNKNOWN;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            if (window.tt != null) {
                channelName = ChannelManager.TT_GAME;
            }
            else if (window.qq != null) {
                channelName = ChannelManager.QQ_GAME;
            }
            else if (window.wx != null) {
                channelName = ChannelManager.APP_DS_MAP == 0 ? ChannelManager.WX_GAME : ChannelManager.DW_GAME;
            }
        }
        else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
            channelName = ChannelManager.TT_GAME;
        }
        else if (cc.sys.platform == cc.sys.HUAWEI_GAME) {
            channelName = ChannelManager.HW_GAME;
        }
        else if (cc.sys.platform == cc.sys.VIVO_GAME) {
            channelName = ChannelManager.VIVO_GAME;
        }
        else if (cc.sys.platform == cc.sys.OPPO_GAME) {
            channelName = ChannelManager.OPPO_GAME;
        }
        else if (cc.sys.isBrowser) {
            channelName = typeof kkH5sdk != "undefined" ? ChannelManager.KKMH_GAME : typeof mz_jsb != "undefined" ? ChannelManager.MZ_GAME : ChannelManager.UNKNOWN;
        }
        else if (cc.sys.isNative && cc.sys.platform == cc.sys.ANDROID) {
            channelName = SDKManager_1.SDKManager.instance.getChannelName();
        }
        return channelName;
    };
    ChannelManager.prototype.get_app_name = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            return c.TTMiniGame.instance.get_app_name();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            return QQMiniGame_1.QQMiniGame.instance.get_app_name();
        }
        else if (channelName != ChannelManager.WX_GAME) {
            if (channelName == ChannelManager.DW_GAME) {
                return DWMiniGame_1.DWMiniGame.instance.get_app_name();
            }
            else if (channelName != ChannelManager.HW_GAME) {
                if (channelName == ChannelManager.VIVO_GAME) {
                    return VIVOMiniGame_1.VIVOMiniGame.instance.get_app_name();
                }
                else if (channelName == ChannelManager.OPPO_GAME) {
                    return OPPOMiniGame_1.OPPOMiniGame.instance.get_app_name();
                }
                else if (channelName != ChannelManager.KKMH_GAME && channelName != ChannelManager.MZ_GAME) {
                    if (channelName == ChannelManager.TAP_TAP_GAME || channelName == ChannelManager.KE_SHENG_GAME || channelName == ChannelManager.OHAYOO_GAME || channelName == ChannelManager.MOMOYU_GAME) {
                        return SDKManager_1.SDKManager.instance.getHostAppName();
                    }
                    else {
                        return ChannelManager.APP_UNKNOWN;
                    }
                }
                else {
                    return undefined;
                }
            }
            else {
                return undefined;
            }
        }
        else if (0 == ChannelManager.APP_DS_MAP) {
            return WXMiniGame_1.WXMiniGame.instance.get_app_name();
        }
        else {
            return undefined;
        }
    };
    ChannelManager.prototype.vibrate_short = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.vibrate_short();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.vibrate_short();
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (0 == ChannelManager.APP_DS_MAP) {
                WXMiniGame_1.WXMiniGame.instance.vibrate_short();
            }
        }
        else if (channelName == ChannelManager.DW_GAME) {
            DWMiniGame_1.DWMiniGame.instance.vibrate_short();
        }
        else if (!(channelName == ChannelManager.HW_GAME)) {
            if (channelName == ChannelManager.VIVO_GAME) {
                VIVOMiniGame_1.VIVOMiniGame.instance.vibrate_short();
            }
            else if (channelName == ChannelManager.OPPO_GAME) {
                OPPOMiniGame_1.OPPOMiniGame.instance.vibrate_short();
            }
        }
    };
    ChannelManager.prototype.vibrate_long = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.vibrate_long();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.vibrate_long();
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (ChannelManager.APP_DS_MAP == 0) {
                WXMiniGame_1.WXMiniGame.instance.vibrate_long();
            }
        }
        else if (channelName == ChannelManager.DW_GAME) {
            DWMiniGame_1.DWMiniGame.instance.vibrate_long();
        }
        else if (channelName == ChannelManager.HW_GAME || channelName == ChannelManager.VIVO_GAME) {
            VIVOMiniGame_1.VIVOMiniGame.instance.vibrate_long();
        }
        else if (channelName == ChannelManager.OPPO_GAME) {
            OPPOMiniGame_1.OPPOMiniGame.instance.vibrate_long();
        }
    };
    Object.defineProperty(ChannelManager.prototype, "is_support_more_game", {
        get: function () {
            var channelName = this.get_channel_name();
            if (channelName == ChannelManager.TT_GAME) {
                return TTMiniGame_1.TTMiniGame.instance.is_support_more_game;
            }
            else if (channelName == ChannelManager.QQ_GAME) {
                return QQMiniGame_1.QQMiniGame.instance.is_support_more_game;
            }
            else if (channelName == ChannelManager.WX_GAME) {
                return ChannelManager.APP_DS_MAP == 0 ? WXMiniGame_1.WXMiniGame.instance.is_support_more_game : false;
            }
            else if (channelName == ChannelManager.DW_GAME) {
                return DWMiniGame_1.DWMiniGame.instance.is_support_more_game;
            }
            else if (channelName == ChannelManager.HW_GAME) {
                return false;
            }
            else if (channelName == ChannelManager.VIVO_GAME) {
                return VIVOMiniGame_1.VIVOMiniGame.instance.is_support_more_game;
            }
            else if (channelName == ChannelManager.OPPO_GAME) {
                return OPPOMiniGame_1.OPPOMiniGame.instance.is_support_more_game;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    ChannelManager.prototype.show_more_game = function (callback, context) {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.show_more_game(callback, context);
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.show_more_game(callback, context);
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (ChannelManager.APP_DS_MAP == 0) {
                WXMiniGame_1.WXMiniGame.instance.show_more_game(callback, context);
            }
        }
        else if (channelName == ChannelManager.DW_GAME) {
            console.error("梦工厂不支持更多游戏，所以不作处理！");
        }
        else if ([ChannelManager.HW_GAME, ChannelManager.VIVO_GAME, ChannelManager.OPPO_GAME, ChannelManager.KKMH_GAME, ChannelManager.MZ_GAME].includes(channelName)) {
            if (callback && context) {
                callback.call(context);
            }
        }
    };
    ChannelManager.prototype.set_rank_value = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.set_rank_value();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.set_rank_value();
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (ChannelManager.APP_DS_MAP == 0) {
                WXMiniGame_1.WXMiniGame.instance.set_rank_value();
            }
        }
        else if (channelName == ChannelManager.DW_GAME) {
            console.error("梦工厂不支持排行榜！");
        }
        else if (channelName == ChannelManager.OPPO_GAME) {
            OPPOMiniGame_1.OPPOMiniGame.instance.set_rank_value();
        }
    };
    ChannelManager.prototype.DouYinFollowBS = function () {
        return this.get_channel_name() == ChannelManager.TT_GAME ? TTMiniGame_1.TTMiniGame.instance.DouYinFollowBS() : "0";
    };
    Object.defineProperty(ChannelManager.prototype, "is_support_app_box", {
        get: function () {
            return this.get_channel_name() == ChannelManager.QQ_GAME && QQMiniGame_1.QQMiniGame.instance.is_support_app_box;
        },
        enumerable: false,
        configurable: true
    });
    ChannelManager.prototype.show_app_box_ad = function () {
        if (this.get_channel_name() == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.show_app_box_ad();
        }
    };
    Object.defineProperty(ChannelManager.prototype, "is_support_interstitial_ad", {
        get: function () {
            var channelName = this.get_channel_name();
            if (channelName == ChannelManager.QQ_GAME) {
                return QQMiniGame_1.QQMiniGame.instance.is_support_interstitial_ad;
            }
            else if (channelName == ChannelManager.WX_GAME) {
                return ChannelManager.APP_DS_MAP == 0 ? WXMiniGame_1.WXMiniGame.instance.is_support_interstitial_ad : false;
            }
            else if (channelName == ChannelManager.TT_GAME) {
                return TTMiniGame_1.TTMiniGame.instance.is_support_interstitial_ad;
            }
            else if (channelName == ChannelManager.DW_GAME) {
                return DWMiniGame_1.DWMiniGame.instance.is_support_interstitial_ad;
            }
            else if (channelName == ChannelManager.HW_GAME) {
                return false;
            }
            else if (channelName == ChannelManager.VIVO_GAME) {
                return VIVOMiniGame_1.VIVOMiniGame.instance.is_support_interstitial_ad;
            }
            else if (channelName == ChannelManager.OPPO_GAME) {
                return OPPOMiniGame_1.OPPOMiniGame.instance.is_support_interstitial_ad;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChannelManager.prototype, "is_rank", {
        get: function () {
            var channelName = this.get_channel_name();
            if (channelName == ChannelManager.TT_GAME) {
                return TTMiniGame_1.TTMiniGame.instance.is_rank;
            }
            else if (channelName == ChannelManager.QQ_GAME) {
                return QQMiniGame_1.QQMiniGame.instance.is_rank;
            }
            else if (channelName == ChannelManager.WX_GAME) {
                return ChannelManager.APP_DS_MAP == 0 ? WXMiniGame_1.WXMiniGame.instance.is_rank : false;
            }
            else if (channelName == ChannelManager.DW_GAME) {
                console.error("梦工厂不支持排行榜！");
                return DWMiniGame_1.DWMiniGame.instance.is_rank;
            }
            else if (channelName == ChannelManager.HW_GAME) {
                return false;
            }
            else if (channelName == ChannelManager.VIVO_GAME) {
                return VIVOMiniGame_1.VIVOMiniGame.instance.is_rank;
            }
            else if (channelName == ChannelManager.OPPO_GAME) {
                return OPPOMiniGame_1.OPPOMiniGame.instance.is_rank;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChannelManager.prototype, "is_share", {
        get: function () {
            var channelName = this.get_channel_name();
            if (channelName == ChannelManager.QQ_GAME) {
                return QQMiniGame_1.QQMiniGame.instance.is_share;
            }
            else if (channelName == ChannelManager.WX_GAME) {
                return ChannelManager.APP_DS_MAP == 0 ? WXMiniGame_1.WXMiniGame.instance.is_share : false;
            }
            else if (channelName == ChannelManager.DW_GAME) {
                return DWMiniGame_1.DWMiniGame.instance.is_share;
            }
            else if (channelName == ChannelManager.TT_GAME) {
                return TTMiniGame_1.TTMiniGame.instance.is_share;
            }
            else if (channelName == ChannelManager.HW_GAME) {
                return false;
            }
            else if (channelName == ChannelManager.VIVO_GAME) {
                return VIVOMiniGame_1.VIVOMiniGame.instance.is_share;
            }
            else if (channelName == ChannelManager.OPPO_GAME) {
                return OPPOMiniGame_1.OPPOMiniGame.instance.is_share;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChannelManager.prototype, "is_video_share", {
        get: function () {
            var channelName = this.get_channel_name();
            if (channelName == ChannelManager.QQ_GAME) {
                return QQMiniGame_1.QQMiniGame.instance.is_video_share;
            }
            else if (channelName == ChannelManager.WX_GAME) {
                return ChannelManager.APP_DS_MAP == 0 ? WXMiniGame_1.WXMiniGame.instance.is_video_share : false;
            }
            else if (channelName == ChannelManager.DW_GAME) {
                return DWMiniGame_1.DWMiniGame.instance.is_video_share;
            }
            else if (channelName == ChannelManager.TT_GAME) {
                return TTMiniGame_1.TTMiniGame.instance.is_video_share;
            }
            else if (channelName == ChannelManager.HW_GAME) {
                return false;
            }
            else if (channelName == ChannelManager.VIVO_GAME) {
                return VIVOMiniGame_1.VIVOMiniGame.instance.is_video_share;
            }
            else if (channelName == ChannelManager.OPPO_GAME) {
                return OPPOMiniGame_1.OPPOMiniGame.instance.is_video_share;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    ChannelManager.prototype.show_interstitial_ad = function (t, e) {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.QQ_GAME) {
            if (QQMiniGame_1.QQMiniGame.ad_enable) {
                QQMiniGame_1.QQMiniGame.instance.show_interstitial_ad(t, e);
            }
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (ChannelManager.APP_DS_MAP == 0 && WXMiniGame_1.WXMiniGame.ad_enable) {
                WXMiniGame_1.WXMiniGame.instance.show_interstitial_ad(t, e);
            }
        }
        else if (channelName == ChannelManager.DW_GAME) {
            console.error("梦工厂不支持插屏广告！");
        }
        else if (channelName == ChannelManager.TT_GAME) {
            if (TTMiniGame_1.TTMiniGame.ad_enable) {
                TTMiniGame_1.TTMiniGame.instance.show_interstitial_ad(t, e);
            }
        }
        else if (channelName == ChannelManager.HW_GAME) {
            // No action for HW_GAME
        }
        else if (channelName == ChannelManager.VIVO_GAME) {
            VIVOMiniGame_1.VIVOMiniGame.instance.show_interstitial_ad(t, e);
        }
        else if (channelName == ChannelManager.OPPO_GAME) {
            OPPOMiniGame_1.OPPOMiniGame.instance.show_interstitial_ad(t, e);
        }
    };
    ChannelManager.prototype.show_video_ad = function (callback, context, options, onSuccess, onFailure) {
        NetUtils_1.ReportData.instance.report_once_point(10691);
        NetUtils_1.ReportData.instance.report_point(10693);
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            if (TTMiniGame_1.TTMiniGame.ad_enable) {
                TTMiniGame_1.TTMiniGame.instance.show_video_ad(function (result) {
                    if (result == 0) {
                        NetUtils_1.ReportData.instance.report_once_point(10692);
                        NetUtils_1.ReportData.instance.report_point(10694);
                        callback.call(context);
                    }
                }, this, REWARD_VIDEO_AD_TYPE.ALL, function () {
                    if (onSuccess && onFailure) {
                        onSuccess.call(onFailure);
                    }
                }, this);
            }
            else {
                callback.call(context);
            }
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            if (QQMiniGame_1.QQMiniGame.ad_enable) {
                QQMiniGame_1.QQMiniGame.instance.show_video_ad(function () {
                    NetUtils_1.ReportData.instance.report_once_point(10692);
                    NetUtils_1.ReportData.instance.report_point(10694);
                    callback.call(context);
                }, this);
            }
            else {
                callback.call(context);
            }
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (ChannelManager.APP_DS_MAP == 0) {
                if (WXMiniGame_1.WXMiniGame.ad_enable) {
                    WXMiniGame_1.WXMiniGame.instance.show_video_ad(function (result) {
                        NetUtils_1.ReportData.instance.report_once_point(10692);
                        NetUtils_1.ReportData.instance.report_point(10694);
                        callback.call(context);
                    }, this, REWARD_VIDEO_AD_TYPE.ALL);
                }
                else {
                    callback.call(context);
                }
            }
            else if (ChannelManager.APP_DS_MAP == 1) {
                DWMiniGame_1.DWMiniGame.instance.show_video_ad(function (result) {
                    NetUtils_1.ReportData.instance.report_once_point(10692);
                    NetUtils_1.ReportData.instance.report_point(10694);
                    callback.call(context);
                }, this);
            }
        }
        else if (channelName == ChannelManager.DW_GAME) {
            DWMiniGame_1.DWMiniGame.instance.show_video_ad(function (result) {
                NetUtils_1.ReportData.instance.report_once_point(10692);
                NetUtils_1.ReportData.instance.report_point(10694);
                callback.call(context);
            }, this);
        }
        else if (channelName == ChannelManager.VIVO_GAME) {
            VIVOMiniGame_1.VIVOMiniGame.instance.show_video_ad(function (result) {
                NetUtils_1.ReportData.instance.report_once_point(10692);
                NetUtils_1.ReportData.instance.report_point(10694);
                callback.call(context);
            }, this);
        }
        else if (channelName == ChannelManager.OPPO_GAME) {
            OPPOMiniGame_1.OPPOMiniGame.instance.show_video_ad(function (result) {
                NetUtils_1.ReportData.instance.report_once_point(10692);
                NetUtils_1.ReportData.instance.report_point(10694);
                callback.call(context);
            }, this);
        }
        else {
            if (!(channelName == ChannelManager.KKMH_GAME || channelName == ChannelManager.MZ_GAME)) {
                if (channelName == ChannelManager.TAP_TAP_GAME || channelName == ChannelManager.KE_SHENG_GAME || channelName == ChannelManager.MOMOYU_GAME || channelName == ChannelManager.OHAYOO_GAME) {
                    SDKManager_1.SDKManager.instance.showRewardVideoAd(function () {
                        NetUtils_1.ReportData.instance.report_once_point(10692);
                        NetUtils_1.ReportData.instance.report_point(10694), callback.call(context);
                    }, options);
                }
                else {
                    cc.log(GameManager_1.gm.const.TEXT_7), callback.call(context);
                }
            }
        }
    };
    ChannelManager.prototype.share_req = function (callback, context) {
        var startTime;
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.share_req(callback, context);
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            startTime = Date.now();
            cc.game.once(cc.game.EVENT_SHOW, function () {
                var elapsedTime = Date.now() - startTime;
                if (elapsedTime > 3000) {
                    GameManager_1.gm.ui.show_notice(GameManager_1.gm.const.TEXT_9);
                    console.log("share cost time:" + elapsedTime + "ms");
                    callback.call(context);
                }
                else {
                    GameManager_1.gm.ui.show_notice(GameManager_1.gm.const.TEXT_18);
                }
            });
            QQMiniGame_1.QQMiniGame.instance.share_req(function () { }, this);
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (ChannelManager.APP_DS_MAP == 0) {
                startTime = Date.now();
                cc.game.once(cc.game.EVENT_SHOW, function () {
                    var elapsedTime = Date.now() - startTime;
                    if (elapsedTime > 3000) {
                        GameManager_1.gm.ui.show_notice(GameManager_1.gm.const.TEXT_9);
                        console.log("share cost time:" + elapsedTime + "ms");
                        callback.call(context);
                    }
                    else {
                        GameManager_1.gm.ui.show_notice(GameManager_1.gm.const.TEXT_18);
                    }
                });
                WXMiniGame_1.WXMiniGame.instance.share_req(callback, context);
            }
        }
        else {
            console.log("false share success");
            callback();
        }
    };
    ChannelManager.prototype.show_banner_ad = function (param) {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            if (TTMiniGame_1.TTMiniGame.ad_enable) {
                TTMiniGame_1.TTMiniGame.instance.show_banner_ad(param);
            }
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            if (QQMiniGame_1.QQMiniGame.ad_enable) {
                QQMiniGame_1.QQMiniGame.instance.show_banner_ad();
            }
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (ChannelManager.APP_DS_MAP == 0 && WXMiniGame_1.WXMiniGame.ad_enable) {
                WXMiniGame_1.WXMiniGame.instance.show_banner_ad(param);
            }
        }
        else if (channelName == ChannelManager.DW_GAME) {
            DWMiniGame_1.DWMiniGame.instance.show_banner_ad(param);
        }
        else if (channelName == ChannelManager.VIVO_GAME) {
            VIVOMiniGame_1.VIVOMiniGame.instance.show_banner_ad(param);
        }
        else if (channelName == ChannelManager.OPPO_GAME) {
            OPPOMiniGame_1.OPPOMiniGame.instance.show_banner_ad(param);
        }
    };
    ChannelManager.prototype.hide_banner_ad = function (param) {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            if (TTMiniGame_1.TTMiniGame.ad_enable) {
                TTMiniGame_1.TTMiniGame.instance.hide_banner_ad(param);
            }
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            if (QQMiniGame_1.QQMiniGame.ad_enable) {
                QQMiniGame_1.QQMiniGame.instance.hide_banner_ad();
            }
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (ChannelManager.APP_DS_MAP == 0 && WXMiniGame_1.WXMiniGame.ad_enable) {
                WXMiniGame_1.WXMiniGame.instance.hide_banner_ad(param);
            }
        }
        else if (channelName == ChannelManager.DW_GAME) {
            DWMiniGame_1.DWMiniGame.instance.hide_banner_ad(param);
        }
        else if (channelName == ChannelManager.VIVO_GAME) {
            VIVOMiniGame_1.VIVOMiniGame.instance.hide_banner_ad(param);
        }
        else if (channelName == ChannelManager.OPPO_GAME) {
            OPPOMiniGame_1.OPPOMiniGame.instance.hide_banner_ad(param);
        }
    };
    ChannelManager.prototype.record_start = function () {
        if (this.get_channel_name() == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.record_start();
        }
    };
    ChannelManager.prototype.record_stop = function (param) {
        if (this.get_channel_name() == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.record_stop(param);
        }
    };
    ChannelManager.prototype.share_video = function (param1, param2) {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.share_video(param1, param2);
        }
        else {
            if ([ChannelManager.QQ_GAME, ChannelManager.WX_GAME, ChannelManager.DW_GAME, ChannelManager.HW_GAME, ChannelManager.VIVO_GAME, ChannelManager.OPPO_GAME, ChannelManager.KKMH_GAME, ChannelManager.MZ_GAME].includes(channelName)) {
                if (param2) {
                    param2(0);
                }
            }
        }
    };
    ChannelManager.prototype.viedo_share = function (param1, param2) {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.viedo_share(param1, param2);
        }
        else {
            if ([ChannelManager.QQ_GAME, ChannelManager.WX_GAME].includes(channelName)) {
                if (param2) {
                    param2(0);
                }
            }
        }
    };
    ChannelManager.prototype.get_rank_data = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.get_rank_data();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.get_rank_data();
        }
        else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
            WXMiniGame_1.WXMiniGame.instance.get_rank_data();
        }
    };
    ChannelManager.prototype.set_rank_close = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.set_rank_close();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.set_rank_close();
        }
        else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
            WXMiniGame_1.WXMiniGame.instance.set_rank_close();
        }
    };
    ChannelManager.prototype.on_rank_pre_page_click = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.on_rank_pre_page_click();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.on_rank_pre_page_click();
        }
        else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
            WXMiniGame_1.WXMiniGame.instance.on_rank_pre_page_click();
        }
    };
    ChannelManager.prototype.on_rank_next_page_click = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.on_rank_next_page_click();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.on_rank_next_page_click();
        }
        else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
            WXMiniGame_1.WXMiniGame.instance.on_rank_next_page_click();
        }
    };
    ChannelManager.prototype.get_self_rank_data = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.get_self_rank_data();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.get_self_rank_data();
        }
        else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
            WXMiniGame_1.WXMiniGame.instance.get_self_rank_data();
        }
    };
    ChannelManager.prototype.set_self_rank_close = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.set_self_rank_close();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.set_self_rank_close();
        }
        else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
            WXMiniGame_1.WXMiniGame.instance.set_self_rank_close();
        }
    };
    ChannelManager.prototype.clear_cache = function () {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.clear_cache();
        }
        else if (channelName == ChannelManager.QQ_GAME) {
            QQMiniGame_1.QQMiniGame.instance.clear_cache();
        }
        else if (channelName == ChannelManager.WX_GAME) {
            if (ChannelManager.APP_DS_MAP == 0) {
                WXMiniGame_1.WXMiniGame.instance.clear_cache();
            }
        }
        else if (channelName == ChannelManager.DW_GAME && ChannelManager.APP_DS_MAP == 1) {
            DWMiniGame_1.DWMiniGame.instance.clear_cache();
        }
    };
    ChannelManager.prototype.compare_version = function (version1, version2) {
        var v1 = version1.split(".");
        var v2 = version2.split(".");
        var maxLength = Math.max(v1.length, v2.length);
        while (v1.length < maxLength)
            v1.push("0");
        while (v2.length < maxLength)
            v2.push("0");
        for (var i = 0; i < maxLength; i++) {
            var num1 = parseInt(v1[i]);
            var num2 = parseInt(v2[i]);
            if (num2 < num1)
                return 1;
            if (num1 < num2)
                return -1;
        }
        return 0;
    };
    ChannelManager.prototype.markScene = function () {
        if (window.wx && window.wx.markScene) {
            window.wx.markScene({ sceneId: 0 });
        }
    };
    ChannelManager.prototype.follow = function (callback, context) {
        if (this.get_channel_name() == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.follow(callback, context);
        }
    };
    ChannelManager.prototype.hide_follow_btn = function () {
        if (this.get_channel_name() == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.hide_follow_btn();
        }
    };
    ChannelManager.prototype.show_follow_btn = function () {
        if (this.get_channel_name() == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.show_follow_btn();
        }
    };
    ChannelManager.prototype.follow_douyin = function (param1, param2) {
        if (this.get_app_name() == ChannelManager.APP_DOU_YIN) {
            TTMiniGame_1.TTMiniGame.instance.douYinFollow(param1, param2);
        }
    };
    ChannelManager.prototype.follow_btn_stat = function () {
        if (this.get_channel_name() == ChannelManager.TT_GAME) {
            return TTMiniGame_1.TTMiniGame.instance.follow_btn_stat();
        }
    };
    ChannelManager.prototype.user_subscribe_message = function () {
        if (this.get_channel_name() == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.user_subscribe_message(function () { });
        }
    };
    ChannelManager.prototype.showBannerNative = function (node) {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.OPPO_GAME) {
            OPPOMiniGame_1.OPPOMiniGame.instance.showBannerNative(node);
        }
        else if (channelName == ChannelManager.VIVO_GAME) {
            VIVOMiniGame_1.VIVOMiniGame.instance.showBannerNative(node);
        }
        else if (channelName == ChannelManager.WX_GAME) {
            this.show_Banner_Native(node);
        }
    };
    ChannelManager.prototype.showBigJpgNative = function (node) {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.OPPO_GAME) {
            OPPOMiniGame_1.OPPOMiniGame.instance.showBigJpgNative(node);
        }
        else if (channelName == ChannelManager.VIVO_GAME) {
            VIVOMiniGame_1.VIVOMiniGame.instance.showBigJpgNative(node);
        }
        else if (channelName == ChannelManager.WX_GAME) {
            this.show_BigJpg_Native(node);
        }
    };
    ChannelManager.prototype.show_ico_native = function (node) {
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.OPPO_GAME) {
            OPPOMiniGame_1.OPPOMiniGame.instance.showIcoNative(node);
        }
        else if (channelName == ChannelManager.VIVO_GAME) {
            VIVOMiniGame_1.VIVOMiniGame.instance.showIcoNative(node);
        }
        else if (channelName == ChannelManager.WX_GAME) {
            this.showIcoNative(node);
        }
    };
    ChannelManager.prototype.showIcoNative = function (node) {
        var imageUrls = ["http://imgwsdl.vivo.com.cn/appstore/ad/apk/icon/20201023/2020102323335239964.png"];
        var adImg = node.getChildByName("adImg");
        var adLogo = node.getChildByName("adLogo");
        adImg.active = false;
        if (imageUrls.length > 0) {
            cc.loader.load(imageUrls[0], function (error, texture) {
                adImg.active = true;
                adImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                console.log("adImg load >>>>>>>>");
            });
        }
        adLogo.active = false;
        if (!adImg.getComponent(cc.Button)) {
            adImg.addComponent(cc.Button);
        }
        adImg.on("click", function () {
            console.log("nativeIcoAd  Click Ico AdShow ");
        }, this);
        console.log("nativeIcoAd  reportIcoAdShow adId:, this.bannerNativeData.adId");
    };
    ChannelManager.prototype.show_BigJpg_Native = function (node) {
        var imageUrls = ["http://images.pinduoduo.com/marketing_api/2020-09-30/a064a4e2-057d-407d-b21b-7fa818bb4c06.jpeg"];
        var adImg = node.getChildByName("adImg");
        var adLogo = node.getChildByName("adLogo");
        adImg.active = false;
        if (imageUrls.length > 0) {
            cc.loader.load(imageUrls[0], function (error, texture) {
                adImg.active = true;
                adImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        adLogo.active = false;
        if (!adImg.getComponent(cc.Button)) {
            adImg.addComponent(cc.Button);
        }
        adImg.on("click", function () {
            console.log("adImg.on('click', () => {");
        }, this);
        console.log("nativeIcoAd  reportIcoAdShow adId:, this.bigJpgNativeData.adId");
    };
    ChannelManager.prototype.show_Banner_Native = function (node) {
        var imageUrls = ["http://imgwsdl.vivo.com.cn/appstore/ad/apk/icon/20201023/2020102323335239964.png"];
        var adImg = node.getChildByName("adImg");
        var adDesc = node.getChildByName("adDesc");
        var adTitle = node.getChildByName("adTitle");
        var adButton = node.getChildByName("adButton");
        var adLogo = node.getChildByName("adLogo");
        adImg.active = false;
        if (imageUrls.length > 0) {
            cc.loader.load(imageUrls[0], function (error, texture) {
                adImg.active = true;
                adImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        adTitle.active = true;
        adTitle.getComponent(cc.Label).string = "用了这个口罩，兄弟们都找我要链接！太值！";
        adDesc.active = true;
        adDesc.getComponent(cc.Label).string = "活动真实有效";
        adLogo.active = false;
        if (!adButton.getComponent(cc.Button)) {
            adButton.addComponent(cc.Button);
        }
        adButton.on("click", function () {
            console.log("nativeIcoAd  Click IcoAdShow ");
        }, this);
        console.log("nativeIcoAd  reportIcoAdShow adId:, this.bannerNativeData.adId");
    };
    ChannelManager.prototype.checkShortcut = function (callback) {
        if (this.get_channel_name() == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.checkShortcut(callback);
        }
        else {
            callback(0);
        }
    };
    ChannelManager.prototype.addShortcut = function (callback) {
        if (this.get_channel_name() == ChannelManager.TT_GAME) {
            TTMiniGame_1.TTMiniGame.instance.addShortcut(callback);
        }
    };
    ChannelManager.prototype.report_event = function (event, data) {
        if (data === void 0) { data = {}; }
        if (event == "ohayoo_game_guide") {
            NetUtils_1.ReportData.instance.report_once_point(data.guideid);
            console.log(event + JSON.stringify(data));
        }
        var channelName = this.get_channel_name();
        if (channelName == ChannelManager.OHAYOO_GAME) {
            SDKManager_1.SDKManager.instance.reportEvent(event, data);
        }
    };
    ChannelManager.prototype.copy_to_clipboard = function (text) {
        var channelName = this.get_channel_name();
        if (![ChannelManager.OHAYOO_GAME, ChannelManager.TAP_TAP_GAME, ChannelManager.KE_SHENG_GAME, ChannelManager.MOMOYU_GAME].includes(channelName)) {
            SDKManager_1.SDKManager.instance.copyToClipboard(text);
        }
    };
    ChannelManager.prototype.get_device_id = function () {
        var channelName = this.get_channel_name();
        if ([ChannelManager.OHAYOO_GAME, ChannelManager.TAP_TAP_GAME, ChannelManager.KE_SHENG_GAME, ChannelManager.MOMOYU_GAME].includes(channelName)) {
            return SDKManager_1.SDKManager.instance.getDeviceID();
        }
        else if (channelName == ChannelManager.TT_GAME) {
            return TTMiniGame_1.TTMiniGame.instance.code;
        }
        return NetUtils_1.NetUtils.game_uuid;
    };
    ChannelManager.prototype.get_version_name = function () {
        var channelName = this.get_channel_name();
        if ([ChannelManager.OHAYOO_GAME, ChannelManager.TAP_TAP_GAME, ChannelManager.KE_SHENG_GAME, ChannelManager.MOMOYU_GAME].includes(channelName)) {
            return SDKManager_1.SDKManager.instance.getVersionName();
        }
        return "1.0.0";
    };
    ChannelManager.prototype.get_version_code = function () {
        var channelName = this.get_channel_name();
        if ([ChannelManager.OHAYOO_GAME, ChannelManager.TAP_TAP_GAME, ChannelManager.KE_SHENG_GAME, ChannelManager.MOMOYU_GAME].includes(channelName)) {
            return SDKManager_1.SDKManager.instance.getVersionCode();
        }
        return 1;
    };
    ChannelManager.prototype.get_network_state_name = function () {
        var channelName = this.get_channel_name();
        if ([ChannelManager.OHAYOO_GAME, ChannelManager.TAP_TAP_GAME, ChannelManager.KE_SHENG_GAME, ChannelManager.MOMOYU_GAME].includes(channelName)) {
            return SDKManager_1.SDKManager.instance.getNetworkStateName();
        }
        return "unknown";
    };
    ChannelManager.prototype.login = function (callback) {
        var channelName = this.get_channel_name();
        var loginData;
        switch (channelName) {
            case ChannelManager.OHAYOO_GAME:
                loginData = {
                    code: GameManager_1.gm.channel.get_device_id(),
                    anonymous: 0,
                    channel_id: "1",
                };
                GameManager_1.gm.data.server_data.login_request(function (result) {
                    if (result.ResultCode == 0 && result.data) {
                        Object.assign(GameManager_1.gm.data.server_data, result.data);
                        callback();
                    }
                    else {
                        GameManager_1.gm.ui.show_notice(result.msg);
                    }
                }, loginData);
                break;
            case ChannelManager.TAP_TAP_GAME:
                loginData = {
                    code: GameManager_1.gm.channel.get_device_id(),
                    anonymous: 0,
                    channel_id: "3",
                };
                GameManager_1.gm.data.server_data.login_request(function (result) {
                    if (result.ResultCode == 0 && result.data) {
                        Object.assign(GameManager_1.gm.data.server_data, result.data);
                        callback();
                    }
                    else {
                        GameManager_1.gm.ui.show_notice(result.msg);
                    }
                }, loginData);
                break;
            case ChannelManager.MOMOYU_GAME:
                loginData = {
                    code: GameManager_1.gm.channel.get_device_id(),
                    anonymous: 0,
                    channel_id: "4",
                };
                GameManager_1.gm.data.server_data.login_request(function (result) {
                    if (result.ResultCode == 0 && result.data) {
                        Object.assign(GameManager_1.gm.data.server_data, result.data);
                        callback();
                    }
                    else {
                        GameManager_1.gm.ui.show_notice(result.msg);
                    }
                }, loginData);
                break;
            case ChannelManager.KE_SHENG_GAME:
                loginData = {
                    code: GameManager_1.gm.channel.get_device_id(),
                    anonymous: 0,
                    channel_id: "5",
                };
                GameManager_1.gm.data.server_data.login_request(function (result) {
                    if (result.ResultCode == 0 && result.data) {
                        Object.assign(GameManager_1.gm.data.server_data, result.data);
                        callback();
                    }
                    else {
                        GameManager_1.gm.ui.show_notice(result.msg);
                    }
                }, loginData);
                break;
            case ChannelManager.TT_GAME:
                TTMiniGame_1.TTMiniGame.instance.get_code(function (code, anonymous) {
                    GameManager_1.gm.data.server_data.login_request(function (result) {
                        if (result.ResultCode == 0 && result.data) {
                            Object.assign(GameManager_1.gm.data.server_data, result.data);
                            callback();
                        }
                        else {
                            GameManager_1.gm.ui.show_notice(result.msg);
                        }
                    }, {
                        code: code,
                        anonymous: anonymous,
                        channel_id: "2",
                    });
                });
                break;
            default:
                // Default case for other channels
                loginData = {
                    code: GameManager_1.gm.channel.get_device_id(),
                    anonymous: 0,
                    channel_id: "1",
                };
                GameManager_1.gm.data.server_data.login_request(function (result) {
                    if (result.ResultCode == 0 && result.data) {
                        Object.assign(GameManager_1.gm.data.server_data, result.data);
                        callback();
                    }
                    else {
                        GameManager_1.gm.ui.show_notice(result.msg);
                    }
                }, loginData);
                break;
        }
    };
    ChannelManager.prototype.get_remote_config = function (callback) {
        // Logic for getting remote config
        var config = {
            level_array: ["2-1", "2-2", "2-3", "3-1", "3-2", "3-3", "4-1"]
        };
        if (Array.isArray(config.level_array) && config.level_array.length > 0) {
            ChannelManager.LEVEL_CONFIG = config;
        }
        callback();
    };
    ChannelManager._instance = null;
    ChannelManager.WX_GAME = "wechat-game";
    ChannelManager.QQ_GAME = "qq-game";
    ChannelManager.DW_GAME = "dw-game";
    ChannelManager.HW_GAME = "hw-game";
    ChannelManager.VIVO_GAME = "vivo-game";
    ChannelManager.OPPO_GAME = "oppo-game";
    ChannelManager.KKMH_GAME = "kkmh-game";
    ChannelManager.MZ_GAME = "mz-game";
    ChannelManager.APP_TOU_TIAO = "Toutiao";
    ChannelManager.APP_NEWS_ARTICLE_LITE = "news_article_lite";
    ChannelManager.APP_DOU_YIN = "Douyin";
    ChannelManager.APP_DOU_YIN_LITE = "Douyin_lite";
    ChannelManager.APP_XI_GUA = "XiGua";
    ChannelManager.APP_TAP_TAP = "tap-tap";
    ChannelManager.APP_KE_SHENG = "ke-sheng";
    ChannelManager.APP_MOMOYU = "momoyu";
    ChannelManager.APP_OHAYOO = "ohayoo";
    ChannelManager.APP_UNKNOWN = "unknown";
    ChannelManager.APP_DS_MAP = 0;
    ChannelManager.APP_QQ = "qq";
    ChannelManager.APP_WE_CHAT = "wechat";
    ChannelManager.APP_DW = "DreamWorks";
    ChannelManager.TAP_TAP_GAME = "tap-tap-game";
    ChannelManager.KE_SHENG_GAME = "ke-sheng-game";
    ChannelManager.MOMOYU_GAME = "momoyu-game";
    ChannelManager.OHAYOO_GAME = "ohayoo-game";
    ChannelManager.UNKNOWN = "unknown";
    ChannelManager.TT_GAME = "tt-game";
    ChannelManager.SHARE_CONFIG = {
        share_id_array: ["2ip9crt1fbw93ouomc"],
        share_array: [
            { title: "亿万疆尸，全新塔防式枪战游戏", url: "https://cdnres.qszhg.6hwan.com/tower_shoot/share/1.jpg?v=1" },
            { title: "正义，永不缺席，加入正义联盟，拯救人类！", url: "https://cdnres.qszhg.6hwan.com/tower_shoot/share/2.jpg?v=1" },
            { title: "血战疆尸，劲爆塔防", url: "https://cdnres.qszhg.6hwan.com/tower_shoot/share/3.jpg?v=1" }
        ]
    };
    ChannelManager.LEVEL_CONFIG = {
        level_array: ["2-1", "2-2", "2-3", "3-1", "3-2", "3-3", "4-1"]
    };
    return ChannelManager;
}());
exports.ChannelManager = ChannelManager;
// export const ChannelManagerImpl = ChannelManagerImpl.instance;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXENoYW5uZWxNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQywyQ0FBMEM7QUFDMUMsMkNBQTBDO0FBQzFDLDRDQUEyQztBQUMzQyw2Q0FBbUM7QUFDbkMsdUNBQWtEO0FBQ2xELCtDQUE4QztBQUM5QywrQ0FBOEM7QUFDOUMsMkNBQTBDO0FBcUIxQyxJQUFZLGNBRVg7QUFGRCxXQUFZLGNBQWM7SUFDeEIsaURBQU8sQ0FBQTtBQUNULENBQUMsRUFGVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUV6QjtBQUVELElBQVksb0JBSVg7QUFKRCxXQUFZLG9CQUFvQjtJQUM5Qiw2REFBTyxDQUFBO0lBQ1AsK0RBQVEsQ0FBQTtJQUNSLGlFQUFTLENBQUE7QUFDWCxDQUFDLEVBSlcsb0JBQW9CLEdBQXBCLDRCQUFvQixLQUFwQiw0QkFBb0IsUUFJL0I7QUFFRCwwREFBMEQ7QUFDMUQ7SUE0Q0U7SUFBd0IsQ0FBQztJQUV6QixzQkFBVywwQkFBUTthQUFuQjtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7YUFDdkM7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFTSw2QkFBSSxHQUFYO1FBQ0UsSUFBTSxXQUFXLEdBQVcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUM7UUFDdEMsSUFBSSxXQUFXLElBQUksY0FBYyxDQUFDLE9BQU8sRUFBRTtZQUN6QyxJQUFJLHVCQUFVLENBQUMsU0FBUyxFQUFFO2dCQUN4Qix1QkFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFRLENBQUMsQ0FB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SSxDQUFDO0lBQ3RCLDBCQUFXLEdBQVcsUUFBUSxDQUFDO0lBQy9CLHFCQUFNLEdBQVcsWUFBWSxDQUFDO0lBQzlCLDJCQUFZLEdBQVcsY0FBYyxDQUFDO0lBQ3RDLDRCQUFhLEdBQVcsZUFBZSxDQUFDO0lBQ3hDLDBCQUFXLEdBQVcsYUFBYSxDQUFDO0lBQ3BDLDBCQUFXLEdBQVcsYUFBYSxDQUFDO0lBQ3BDLHNCQUFPLEdBQVcsU0FBUyxDQUFDO0lBQzVCLHNCQUFPLEdBQVcsU0FBUyxDQUFDO0lBQzVCLDJCQUFZLEdBQWdCO1FBQ3hDLGNBQWMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1FBQ3RDLFdBQVcsRUFBRTtZQUNYLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSw0REFBNEQsRUFBRTtZQUM5RixFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxHQUFHLEVBQUUsNERBQTRELEVBQUU7WUFDcEcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSw0REFBNEQsRUFBRTtTQUMxRjtLQUNGLENBQUM7SUFDWSwyQkFBWSxHQUFnQjtRQUN4QyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7S0FDL0QsQ0FBQztJQTY3QkoscUJBQUM7Q0F0K0JELEFBcytCQyxJQUFBO0FBdCtCWSx3Q0FBYztBQXcrQjNCLGlFQUFpRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFFRTWluaUdhbWUgfSBmcm9tICcuL1FRTWluaUdhbWUnO1xyXG5pbXBvcnQgeyBUVE1pbmlHYW1lIH0gZnJvbSAnLi9UVE1pbmlHYW1lJztcclxuaW1wb3J0IHsgV1hNaW5pR2FtZSB9IGZyb20gJy4vV1hNaW5pR2FtZSc7XHJcbmltcG9ydCB7IERXTWluaUdhbWUgfSBmcm9tICcuL0RXTWluaUdhbWUgJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTmV0VXRpbHMsIFJlcG9ydERhdGEgfSBmcm9tICcuL05ldFV0aWxzJztcclxuaW1wb3J0IHsgVklWT01pbmlHYW1lIH0gZnJvbSAnLi9WSVZPTWluaUdhbWUnO1xyXG5pbXBvcnQgeyBPUFBPTWluaUdhbWUgfSBmcm9tICcuL09QUE9NaW5pR2FtZSc7XHJcbmltcG9ydCB7IFNES01hbmFnZXIgfSBmcm9tICcuL1NES01hbmFnZXInO1xyXG5cclxuaW50ZXJmYWNlIFR5cGUge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgdXJsOiBzdHJpbmc7XHJcbn1cclxuaW50ZXJmYWNlIHNoYXJlQ29uZmlnIHtcclxuICBzaGFyZV9pZF9hcnJheTogc3RyaW5nW107XHJcbiAgc2hhcmVfYXJyYXk6IFR5cGVbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIExldmVsQ29uZmlnIHtcclxuICBsZXZlbF9hcnJheTogc3RyaW5nW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcG9zaXRpb24ge1xyXG4gIGFkX3Bvc2l0aW9uOiBzdHJpbmc7XHJcbiAgYWRfcG9zaXRpb25fdHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGVudW0gQkFOTkVSX0FEX1RZUEUge1xyXG4gIEFMTCA9IDBcclxufVxyXG5cclxuZXhwb3J0IGVudW0gUkVXQVJEX1ZJREVPX0FEX1RZUEUge1xyXG4gIEFMTCA9IDAsXHJcbiAgTE9ORyA9IDEsXHJcbiAgU0hPUlQgPSAyXHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBDaGFubmVsTWFuYWdlciBpbXBsZW1lbnRzIENoYW5uZWxtYW5hZ2VyIHtcclxuZXhwb3J0IGNsYXNzIENoYW5uZWxNYW5hZ2VyIHtcclxuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IENoYW5uZWxNYW5hZ2VyIHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgV1hfR0FNRTogc3RyaW5nID0gXCJ3ZWNoYXQtZ2FtZVwiO1xyXG4gIHByaXZhdGUgc3RhdGljIFFRX0dBTUU6IHN0cmluZyA9IFwicXEtZ2FtZVwiO1xyXG4gIHByaXZhdGUgc3RhdGljIERXX0dBTUU6IHN0cmluZyA9IFwiZHctZ2FtZVwiO1xyXG4gIHByaXZhdGUgc3RhdGljIEhXX0dBTUU6IHN0cmluZyA9IFwiaHctZ2FtZVwiO1xyXG4gIHByaXZhdGUgc3RhdGljIFZJVk9fR0FNRTogc3RyaW5nID0gXCJ2aXZvLWdhbWVcIjtcclxuICBwcml2YXRlIHN0YXRpYyBPUFBPX0dBTUU6IHN0cmluZyA9IFwib3Bwby1nYW1lXCI7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgS0tNSF9HQU1FOiBzdHJpbmcgPSBcImtrbWgtZ2FtZVwiO1xyXG4gIHByaXZhdGUgc3RhdGljIE1aX0dBTUU6IHN0cmluZyA9IFwibXotZ2FtZVwiO1xyXG4gIHByaXZhdGUgc3RhdGljIEFQUF9UT1VfVElBTzogc3RyaW5nID0gXCJUb3V0aWFvXCI7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgQVBQX05FV1NfQVJUSUNMRV9MSVRFOiBzdHJpbmcgPSBcIm5ld3NfYXJ0aWNsZV9saXRlXCI7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgQVBQX0RPVV9ZSU46IHN0cmluZyA9IFwiRG91eWluXCI7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgQVBQX0RPVV9ZSU5fTElURTogc3RyaW5nID0gXCJEb3V5aW5fbGl0ZVwiO1xyXG4gIHByaXZhdGUgc3RhdGljIEFQUF9YSV9HVUE6IHN0cmluZyA9IFwiWGlHdWFcIjtcclxuICBwcml2YXRlIHN0YXRpYyBBUFBfVEFQX1RBUDogc3RyaW5nID0gXCJ0YXAtdGFwXCI7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgQVBQX0tFX1NIRU5HOiBzdHJpbmcgPSBcImtlLXNoZW5nXCI7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgQVBQX01PTU9ZVTogc3RyaW5nID0gXCJtb21veXVcIjtcclxuICBwcml2YXRlIHN0YXRpYyBBUFBfT0hBWU9POiBzdHJpbmcgPSBcIm9oYXlvb1wiO1xyXG4gIHByaXZhdGUgc3RhdGljIEFQUF9VTktOT1dOOiBzdHJpbmcgPSBcInVua25vd25cIjtcclxuICBwcml2YXRlIHN0YXRpYyBBUFBfRFNfTUFQOiBudW1iZXIgPSAwO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIEFQUF9RUTogc3RyaW5nID0gXCJxcVwiO1xyXG4gIHB1YmxpYyBzdGF0aWMgQVBQX1dFX0NIQVQ6IHN0cmluZyA9IFwid2VjaGF0XCI7XHJcbiAgcHVibGljIHN0YXRpYyBBUFBfRFc6IHN0cmluZyA9IFwiRHJlYW1Xb3Jrc1wiO1xyXG4gIHB1YmxpYyBzdGF0aWMgVEFQX1RBUF9HQU1FOiBzdHJpbmcgPSBcInRhcC10YXAtZ2FtZVwiO1xyXG4gIHB1YmxpYyBzdGF0aWMgS0VfU0hFTkdfR0FNRTogc3RyaW5nID0gXCJrZS1zaGVuZy1nYW1lXCI7XHJcbiAgcHVibGljIHN0YXRpYyBNT01PWVVfR0FNRTogc3RyaW5nID0gXCJtb21veXUtZ2FtZVwiO1xyXG4gIHB1YmxpYyBzdGF0aWMgT0hBWU9PX0dBTUU6IHN0cmluZyA9IFwib2hheW9vLWdhbWVcIjtcclxuICBwdWJsaWMgc3RhdGljIFVOS05PV046IHN0cmluZyA9IFwidW5rbm93blwiO1xyXG4gIHB1YmxpYyBzdGF0aWMgVFRfR0FNRTogc3RyaW5nID0gXCJ0dC1nYW1lXCI7XHJcbiAgcHVibGljIHN0YXRpYyBTSEFSRV9DT05GSUc6IHNoYXJlQ29uZmlnID0ge1xyXG4gICAgc2hhcmVfaWRfYXJyYXk6IFtcIjJpcDljcnQxZmJ3OTNvdW9tY1wiXSxcclxuICAgIHNoYXJlX2FycmF5OiBbXHJcbiAgICAgIHsgdGl0bGU6IFwi5Lq/5LiH55aG5bC477yM5YWo5paw5aGU6Ziy5byP5p6q5oiY5ri45oiPXCIsIHVybDogXCJodHRwczovL2NkbnJlcy5xc3poZy42aHdhbi5jb20vdG93ZXJfc2hvb3Qvc2hhcmUvMS5qcGc/dj0xXCIgfSxcclxuICAgICAgeyB0aXRsZTogXCLmraPkuYnvvIzmsLjkuI3nvLrluK3vvIzliqDlhaXmraPkuYnogZTnm5/vvIzmi6/mlZHkurrnsbvvvIFcIiwgdXJsOiBcImh0dHBzOi8vY2RucmVzLnFzemhnLjZod2FuLmNvbS90b3dlcl9zaG9vdC9zaGFyZS8yLmpwZz92PTFcIiB9LFxyXG4gICAgICB7IHRpdGxlOiBcIuihgOaImOeWhuWwuO+8jOWKsueIhuWhlOmYslwiLCB1cmw6IFwiaHR0cHM6Ly9jZG5yZXMucXN6aGcuNmh3YW4uY29tL3Rvd2VyX3Nob290L3NoYXJlLzMuanBnP3Y9MVwiIH1cclxuICAgIF1cclxuICB9O1xyXG4gIHB1YmxpYyBzdGF0aWMgTEVWRUxfQ09ORklHOiBMZXZlbENvbmZpZyA9IHtcclxuICAgIGxldmVsX2FycmF5OiBbXCIyLTFcIiwgXCIyLTJcIiwgXCIyLTNcIiwgXCIzLTFcIiwgXCIzLTJcIiwgXCIzLTNcIiwgXCI0LTFcIl1cclxuICB9O1xyXG5cclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBzdGF0aWMgZ2V0IGluc3RhbmNlKCk6IENoYW5uZWxNYW5hZ2VyIHtcclxuICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgQ2hhbm5lbE1hbmFnZXIoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgY29uc29sZS5sb2coXCJDaGFubmVsOlwiICsgY2hhbm5lbE5hbWUpO1xyXG4gICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgaWYgKFRUTWluaUdhbWUuYWRfZW5hYmxlKSB7XHJcbiAgICAgICAgVFRNaW5pR2FtZS5pbnN0YW5jZS5sb2FkX2NoYW5uZWxfZW52KCgpID0+IHsgfSk7XHJcbiAgICAgICAgVFRNaW5pR2FtZS5pbnN0YW5jZS5sb2FkX3N1Yl9wYWNrYWdlc19lbnYoKCkgPT4geyB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5RUV9HQU1FKSB7XHJcbiAgICAgIFFRTWluaUdhbWUuaW5zdGFuY2UubG9hZF9jaGFubmVsX2VudigoKSA9PiB7IH0pO1xyXG4gICAgICBRUU1pbmlHYW1lLmluc3RhbmNlLmxvYWRfc3ViX3BhY2thZ2VzX2VudigoKSA9PiB7IH0pO1xyXG4gICAgICBpZiAoUVFNaW5pR2FtZS5hZF9lbmFibGUpIHtcclxuICAgICAgICBRUU1pbmlHYW1lLmluc3RhbmNlLmNyZWF0ZV92aWRlb19hZCgpO1xyXG4gICAgICAgIFFRTWluaUdhbWUuaW5zdGFuY2UuY3JlYXRlX2FwcF9ib3hfYWQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5XWF9HQU1FKSB7XHJcbiAgICAgIGlmIChDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDApIHtcclxuICAgICAgICBXWE1pbmlHYW1lLmluc3RhbmNlLmxvYWRfY2hhbm5lbF9lbnYoKCkgPT4geyB9KTtcclxuICAgICAgICBXWE1pbmlHYW1lLmluc3RhbmNlLmxvYWRfc3ViX3BhY2thZ2VzX2VudigoKSA9PiB7IH0pO1xyXG4gICAgICAgIGlmIChXWE1pbmlHYW1lLmFkX2VuYWJsZSkge1xyXG4gICAgICAgICAgV1hNaW5pR2FtZS5pbnN0YW5jZS5jcmVhdGVfYmFubmVyX2FkKCk7XHJcbiAgICAgICAgICBXWE1pbmlHYW1lLmluc3RhbmNlLmNyZWF0ZV92aWRlb19hZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5EV19HQU1FKSB7XHJcbiAgICAgIERXTWluaUdhbWUuaW5zdGFuY2UubG9hZF9jaGFubmVsX2VudigoKSA9PiB7IH0pO1xyXG4gICAgICBEV01pbmlHYW1lLmluc3RhbmNlLmxvYWRfc3ViX3BhY2thZ2VzX2VudigoKSA9PiB7IH0pO1xyXG4gICAgICBEV01pbmlHYW1lLmluc3RhbmNlLmNyZWF0ZV9iYW5uZXJfYWQoKTtcclxuICAgICAgRFdNaW5pR2FtZS5pbnN0YW5jZS5jcmVhdGVfdmlkZW9fYWQoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuSFdfR0FNRSB8fCBjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5WSVZPX0dBTUUpIHtcclxuICAgICAgVklWT01pbmlHYW1lLmluc3RhbmNlLmxvYWRfY2hhbm5lbF9lbnYoKCkgPT4geyB9KTtcclxuICAgICAgVklWT01pbmlHYW1lLmluc3RhbmNlLmxvYWRfc3ViX3BhY2thZ2VzX2VudigoKSA9PiB7IH0pO1xyXG4gICAgICBWSVZPTWluaUdhbWUuaW5zdGFuY2UuY3JlYXRlX3ZpZGVvX2FkKCk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLk9QUE9fR0FNRSkge1xyXG4gICAgICBPUFBPTWluaUdhbWUuaW5zdGFuY2UubG9hZF9jaGFubmVsX2VudigoKSA9PiB7IH0pO1xyXG4gICAgICBPUFBPTWluaUdhbWUuaW5zdGFuY2UubG9hZF9zdWJfcGFja2FnZXNfZW52KCgpID0+IHsgfSk7XHJcbiAgICAgIE9QUE9NaW5pR2FtZS5pbnN0YW5jZS5jcmVhdGVfdmlkZW9fYWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRfY2hhbm5lbF9uYW1lKCk6IHN0cmluZyB7XHJcbiAgICBsZXQgY2hhbm5lbE5hbWU6IHN0cmluZyA9IENoYW5uZWxNYW5hZ2VyLlVOS05PV047XHJcbiAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICBpZiAod2luZG93LnR0ICE9IG51bGwpIHtcclxuICAgICAgICBjaGFubmVsTmFtZSA9IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUU7XHJcbiAgICAgIH0gZWxzZSBpZiAod2luZG93LnFxICE9IG51bGwpIHtcclxuICAgICAgICBjaGFubmVsTmFtZSA9IENoYW5uZWxNYW5hZ2VyLlFRX0dBTUU7XHJcbiAgICAgIH0gZWxzZSBpZiAod2luZG93Lnd4ICE9IG51bGwpIHtcclxuICAgICAgICBjaGFubmVsTmFtZSA9IENoYW5uZWxNYW5hZ2VyLkFQUF9EU19NQVAgPT0gMCA/IENoYW5uZWxNYW5hZ2VyLldYX0dBTUUgOiBDaGFubmVsTWFuYWdlci5EV19HQU1FO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQllURURBTkNFX0dBTUUpIHtcclxuICAgICAgY2hhbm5lbE5hbWUgPSBDaGFubmVsTWFuYWdlci5UVF9HQU1FO1xyXG4gICAgfSBlbHNlIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkhVQVdFSV9HQU1FKSB7XHJcbiAgICAgIGNoYW5uZWxOYW1lID0gQ2hhbm5lbE1hbmFnZXIuSFdfR0FNRTtcclxuICAgIH0gZWxzZSBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5WSVZPX0dBTUUpIHtcclxuICAgICAgY2hhbm5lbE5hbWUgPSBDaGFubmVsTWFuYWdlci5WSVZPX0dBTUU7XHJcbiAgICB9IGVsc2UgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuT1BQT19HQU1FKSB7XHJcbiAgICAgIGNoYW5uZWxOYW1lID0gQ2hhbm5lbE1hbmFnZXIuT1BQT19HQU1FO1xyXG4gICAgfSBlbHNlIGlmIChjYy5zeXMuaXNCcm93c2VyKSB7XHJcbiAgICAgIGNoYW5uZWxOYW1lID0gdHlwZW9mIGtrSDVzZGsgIT0gXCJ1bmRlZmluZWRcIiA/IENoYW5uZWxNYW5hZ2VyLktLTUhfR0FNRSA6IHR5cGVvZiBtel9qc2IgIT0gXCJ1bmRlZmluZWRcIiA/IENoYW5uZWxNYW5hZ2VyLk1aX0dBTUUgOiBDaGFubmVsTWFuYWdlci5VTktOT1dOO1xyXG4gICAgfSBlbHNlIGlmIChjYy5zeXMuaXNOYXRpdmUgJiYgY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgIGNoYW5uZWxOYW1lID0gU0RLTWFuYWdlci5pbnN0YW5jZS5nZXRDaGFubmVsTmFtZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoYW5uZWxOYW1lO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRfYXBwX25hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICByZXR1cm4gYy5UVE1pbmlHYW1lLmluc3RhbmNlLmdldF9hcHBfbmFtZSgpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5RUV9HQU1FKSB7XHJcbiAgICAgIHJldHVybiBRUU1pbmlHYW1lLmluc3RhbmNlLmdldF9hcHBfbmFtZSgpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSAhPSBDaGFubmVsTWFuYWdlci5XWF9HQU1FKSB7XHJcbiAgICAgIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5EV19HQU1FKSB7XHJcbiAgICAgICAgcmV0dXJuIERXTWluaUdhbWUuaW5zdGFuY2UuZ2V0X2FwcF9uYW1lKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgIT0gQ2hhbm5lbE1hbmFnZXIuSFdfR0FNRSkge1xyXG4gICAgICAgIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5WSVZPX0dBTUUpIHtcclxuICAgICAgICAgIHJldHVybiBWSVZPTWluaUdhbWUuaW5zdGFuY2UuZ2V0X2FwcF9uYW1lKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5PUFBPX0dBTUUpIHtcclxuICAgICAgICAgIHJldHVybiBPUFBPTWluaUdhbWUuaW5zdGFuY2UuZ2V0X2FwcF9uYW1lKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSAhPSBDaGFubmVsTWFuYWdlci5LS01IX0dBTUUgJiYgY2hhbm5lbE5hbWUgIT0gQ2hhbm5lbE1hbmFnZXIuTVpfR0FNRSkge1xyXG4gICAgICAgICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlRBUF9UQVBfR0FNRSB8fCBjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5LRV9TSEVOR19HQU1FIHx8IGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLk9IQVlPT19HQU1FIHx8IGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLk1PTU9ZVV9HQU1FKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTREtNYW5hZ2VyLmluc3RhbmNlLmdldEhvc3RBcHBOYW1lKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2hhbm5lbE1hbmFnZXIuQVBQX1VOS05PV047XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoMCA9PSBDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQKSB7XHJcbiAgICAgIHJldHVybiBXWE1pbmlHYW1lLmluc3RhbmNlLmdldF9hcHBfbmFtZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlicmF0ZV9zaG9ydCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLnZpYnJhdGVfc2hvcnQoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuUVFfR0FNRSkge1xyXG4gICAgICBRUU1pbmlHYW1lLmluc3RhbmNlLnZpYnJhdGVfc2hvcnQoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuV1hfR0FNRSkge1xyXG4gICAgICBpZiAoMCA9PSBDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQKSB7XHJcbiAgICAgICAgV1hNaW5pR2FtZS5pbnN0YW5jZS52aWJyYXRlX3Nob3J0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuRFdfR0FNRSkge1xyXG4gICAgICBEV01pbmlHYW1lLmluc3RhbmNlLnZpYnJhdGVfc2hvcnQoKTtcclxuICAgIH0gZWxzZSBpZiAoIShjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5IV19HQU1FKSkge1xyXG4gICAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVklWT19HQU1FKSB7XHJcbiAgICAgICAgVklWT01pbmlHYW1lLmluc3RhbmNlLnZpYnJhdGVfc2hvcnQoKTtcclxuICAgICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5PUFBPX0dBTUUpIHtcclxuICAgICAgICBPUFBPTWluaUdhbWUuaW5zdGFuY2UudmlicmF0ZV9zaG9ydCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpYnJhdGVfbG9uZygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNoYW5uZWxOYW1lOiBzdHJpbmcgPSB0aGlzLmdldF9jaGFubmVsX25hbWUoKTtcclxuICAgIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5UVF9HQU1FKSB7XHJcbiAgICAgIFRUTWluaUdhbWUuaW5zdGFuY2UudmlicmF0ZV9sb25nKCk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlFRX0dBTUUpIHtcclxuICAgICAgUVFNaW5pR2FtZS5pbnN0YW5jZS52aWJyYXRlX2xvbmcoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuV1hfR0FNRSkge1xyXG4gICAgICBpZiAoQ2hhbm5lbE1hbmFnZXIuQVBQX0RTX01BUCA9PSAwKSB7XHJcbiAgICAgICAgV1hNaW5pR2FtZS5pbnN0YW5jZS52aWJyYXRlX2xvbmcoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5EV19HQU1FKSB7XHJcbiAgICAgIERXTWluaUdhbWUuaW5zdGFuY2UudmlicmF0ZV9sb25nKCk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLkhXX0dBTUUgfHwgY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVklWT19HQU1FKSB7XHJcbiAgICAgIFZJVk9NaW5pR2FtZS5pbnN0YW5jZS52aWJyYXRlX2xvbmcoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuT1BQT19HQU1FKSB7XHJcbiAgICAgIE9QUE9NaW5pR2FtZS5pbnN0YW5jZS52aWJyYXRlX2xvbmcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IGlzX3N1cHBvcnRfbW9yZV9nYW1lKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIFRUTWluaUdhbWUuaW5zdGFuY2UuaXNfc3VwcG9ydF9tb3JlX2dhbWU7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlFRX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIFFRTWluaUdhbWUuaW5zdGFuY2UuaXNfc3VwcG9ydF9tb3JlX2dhbWU7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLldYX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIENoYW5uZWxNYW5hZ2VyLkFQUF9EU19NQVAgPT0gMCA/IFdYTWluaUdhbWUuaW5zdGFuY2UuaXNfc3VwcG9ydF9tb3JlX2dhbWUgOiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuRFdfR0FNRSkge1xyXG4gICAgICByZXR1cm4gRFdNaW5pR2FtZS5pbnN0YW5jZS5pc19zdXBwb3J0X21vcmVfZ2FtZTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuSFdfR0FNRSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlZJVk9fR0FNRSkge1xyXG4gICAgICByZXR1cm4gVklWT01pbmlHYW1lLmluc3RhbmNlLmlzX3N1cHBvcnRfbW9yZV9nYW1lO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5PUFBPX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIE9QUE9NaW5pR2FtZS5pbnN0YW5jZS5pc19zdXBwb3J0X21vcmVfZ2FtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd19tb3JlX2dhbWUoY2FsbGJhY2s6IEZ1bmN0aW9uIHwgbnVsbCwgY29udGV4dDogYW55IHwgbnVsbCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgVFRNaW5pR2FtZS5pbnN0YW5jZS5zaG93X21vcmVfZ2FtZShjYWxsYmFjaywgY29udGV4dCk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlFRX0dBTUUpIHtcclxuICAgICAgUVFNaW5pR2FtZS5pbnN0YW5jZS5zaG93X21vcmVfZ2FtZShjYWxsYmFjaywgY29udGV4dCk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLldYX0dBTUUpIHtcclxuICAgICAgaWYgKENoYW5uZWxNYW5hZ2VyLkFQUF9EU19NQVAgPT0gMCkge1xyXG4gICAgICAgIFdYTWluaUdhbWUuaW5zdGFuY2Uuc2hvd19tb3JlX2dhbWUoY2FsbGJhY2ssIGNvbnRleHQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLkRXX0dBTUUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIuaipuW3peWOguS4jeaUr+aMgeabtOWkmua4uOaIj++8jOaJgOS7peS4jeS9nOWkhOeQhu+8gVwiKTtcclxuICAgIH0gZWxzZSBpZiAoW0NoYW5uZWxNYW5hZ2VyLkhXX0dBTUUsIENoYW5uZWxNYW5hZ2VyLlZJVk9fR0FNRSwgQ2hhbm5lbE1hbmFnZXIuT1BQT19HQU1FLCBDaGFubmVsTWFuYWdlci5LS01IX0dBTUUsIENoYW5uZWxNYW5hZ2VyLk1aX0dBTUVdLmluY2x1ZGVzKGNoYW5uZWxOYW1lKSkge1xyXG4gICAgICBpZiAoY2FsbGJhY2sgJiYgY29udGV4dCkge1xyXG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0X3JhbmtfdmFsdWUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLnNldF9yYW5rX3ZhbHVlKCk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlFRX0dBTUUpIHtcclxuICAgICAgUVFNaW5pR2FtZS5pbnN0YW5jZS5zZXRfcmFua192YWx1ZSgpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5XWF9HQU1FKSB7XHJcbiAgICAgIGlmIChDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDApIHtcclxuICAgICAgICBXWE1pbmlHYW1lLmluc3RhbmNlLnNldF9yYW5rX3ZhbHVlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuRFdfR0FNRSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwi5qKm5bel5Y6C5LiN5pSv5oyB5o6S6KGM5qac77yBXCIpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5PUFBPX0dBTUUpIHtcclxuICAgICAgT1BQT01pbmlHYW1lLmluc3RhbmNlLnNldF9yYW5rX3ZhbHVlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIERvdVlpbkZvbGxvd0JTKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCkgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSA/IFRUTWluaUdhbWUuaW5zdGFuY2UuRG91WWluRm9sbG93QlMoKSA6IFwiMFwiO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgaXNfc3VwcG9ydF9hcHBfYm94KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpID09IENoYW5uZWxNYW5hZ2VyLlFRX0dBTUUgJiYgUVFNaW5pR2FtZS5pbnN0YW5jZS5pc19zdXBwb3J0X2FwcF9ib3g7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNob3dfYXBwX2JveF9hZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmdldF9jaGFubmVsX25hbWUoKSA9PSBDaGFubmVsTWFuYWdlci5RUV9HQU1FKSB7XHJcbiAgICAgIFFRTWluaUdhbWUuaW5zdGFuY2Uuc2hvd19hcHBfYm94X2FkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBpc19zdXBwb3J0X2ludGVyc3RpdGlhbF9hZCgpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGNoYW5uZWxOYW1lOiBzdHJpbmcgPSB0aGlzLmdldF9jaGFubmVsX25hbWUoKTtcclxuICAgIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5RUV9HQU1FKSB7XHJcbiAgICAgIHJldHVybiBRUU1pbmlHYW1lLmluc3RhbmNlLmlzX3N1cHBvcnRfaW50ZXJzdGl0aWFsX2FkO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5XWF9HQU1FKSB7XHJcbiAgICAgIHJldHVybiBDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDAgPyBXWE1pbmlHYW1lLmluc3RhbmNlLmlzX3N1cHBvcnRfaW50ZXJzdGl0aWFsX2FkIDogZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIFRUTWluaUdhbWUuaW5zdGFuY2UuaXNfc3VwcG9ydF9pbnRlcnN0aXRpYWxfYWQ7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLkRXX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIERXTWluaUdhbWUuaW5zdGFuY2UuaXNfc3VwcG9ydF9pbnRlcnN0aXRpYWxfYWQ7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLkhXX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5WSVZPX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIFZJVk9NaW5pR2FtZS5pbnN0YW5jZS5pc19zdXBwb3J0X2ludGVyc3RpdGlhbF9hZDtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuT1BQT19HQU1FKSB7XHJcbiAgICAgIHJldHVybiBPUFBPTWluaUdhbWUuaW5zdGFuY2UuaXNfc3VwcG9ydF9pbnRlcnN0aXRpYWxfYWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBpc19yYW5rKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIFRUTWluaUdhbWUuaW5zdGFuY2UuaXNfcmFuaztcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuUVFfR0FNRSkge1xyXG4gICAgICByZXR1cm4gUVFNaW5pR2FtZS5pbnN0YW5jZS5pc19yYW5rO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5XWF9HQU1FKSB7XHJcbiAgICAgIHJldHVybiBDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDAgPyBXWE1pbmlHYW1lLmluc3RhbmNlLmlzX3JhbmsgOiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuRFdfR0FNRSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwi5qKm5bel5Y6C5LiN5pSv5oyB5o6S6KGM5qac77yBXCIpO1xyXG4gICAgICByZXR1cm4gRFdNaW5pR2FtZS5pbnN0YW5jZS5pc19yYW5rO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5IV19HQU1FKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVklWT19HQU1FKSB7XHJcbiAgICAgIHJldHVybiBWSVZPTWluaUdhbWUuaW5zdGFuY2UuaXNfcmFuaztcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuT1BQT19HQU1FKSB7XHJcbiAgICAgIHJldHVybiBPUFBPTWluaUdhbWUuaW5zdGFuY2UuaXNfcmFuaztcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IGlzX3NoYXJlKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlFRX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIFFRTWluaUdhbWUuaW5zdGFuY2UuaXNfc2hhcmU7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLldYX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIENoYW5uZWxNYW5hZ2VyLkFQUF9EU19NQVAgPT0gMCA/IFdYTWluaUdhbWUuaW5zdGFuY2UuaXNfc2hhcmUgOiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuRFdfR0FNRSkge1xyXG4gICAgICByZXR1cm4gRFdNaW5pR2FtZS5pbnN0YW5jZS5pc19zaGFyZTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICByZXR1cm4gVFRNaW5pR2FtZS5pbnN0YW5jZS5pc19zaGFyZTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuSFdfR0FNRSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlZJVk9fR0FNRSkge1xyXG4gICAgICByZXR1cm4gVklWT01pbmlHYW1lLmluc3RhbmNlLmlzX3NoYXJlO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5PUFBPX0dBTUUpIHtcclxuICAgICAgcmV0dXJuIE9QUE9NaW5pR2FtZS5pbnN0YW5jZS5pc19zaGFyZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNfdmlkZW9fc2hhcmUoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuUVFfR0FNRSkge1xyXG4gICAgICByZXR1cm4gUVFNaW5pR2FtZS5pbnN0YW5jZS5pc192aWRlb19zaGFyZTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuV1hfR0FNRSkge1xyXG4gICAgICByZXR1cm4gQ2hhbm5lbE1hbmFnZXIuQVBQX0RTX01BUCA9PSAwID8gV1hNaW5pR2FtZS5pbnN0YW5jZS5pc192aWRlb19zaGFyZSA6IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5EV19HQU1FKSB7XHJcbiAgICAgIHJldHVybiBEV01pbmlHYW1lLmluc3RhbmNlLmlzX3ZpZGVvX3NoYXJlO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5UVF9HQU1FKSB7XHJcbiAgICAgIHJldHVybiBUVE1pbmlHYW1lLmluc3RhbmNlLmlzX3ZpZGVvX3NoYXJlO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5IV19HQU1FKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVklWT19HQU1FKSB7XHJcbiAgICAgIHJldHVybiBWSVZPTWluaUdhbWUuaW5zdGFuY2UuaXNfdmlkZW9fc2hhcmU7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLk9QUE9fR0FNRSkge1xyXG4gICAgICByZXR1cm4gT1BQT01pbmlHYW1lLmluc3RhbmNlLmlzX3ZpZGVvX3NoYXJlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93X2ludGVyc3RpdGlhbF9hZCh0OiBhbnksIGU6IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlFRX0dBTUUpIHtcclxuICAgICAgaWYgKFFRTWluaUdhbWUuYWRfZW5hYmxlKSB7XHJcbiAgICAgICAgUVFNaW5pR2FtZS5pbnN0YW5jZS5zaG93X2ludGVyc3RpdGlhbF9hZCh0LCBlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5XWF9HQU1FKSB7XHJcbiAgICAgIGlmIChDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDAgJiYgV1hNaW5pR2FtZS5hZF9lbmFibGUpIHtcclxuICAgICAgICBXWE1pbmlHYW1lLmluc3RhbmNlLnNob3dfaW50ZXJzdGl0aWFsX2FkKHQsIGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLkRXX0dBTUUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIuaipuW3peWOguS4jeaUr+aMgeaPkuWxj+W5v+WRiu+8gVwiKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBpZiAoVFRNaW5pR2FtZS5hZF9lbmFibGUpIHtcclxuICAgICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLnNob3dfaW50ZXJzdGl0aWFsX2FkKHQsIGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLkhXX0dBTUUpIHtcclxuICAgICAgLy8gTm8gYWN0aW9uIGZvciBIV19HQU1FXHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlZJVk9fR0FNRSkge1xyXG4gICAgICBWSVZPTWluaUdhbWUuaW5zdGFuY2Uuc2hvd19pbnRlcnN0aXRpYWxfYWQodCwgZSk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLk9QUE9fR0FNRSkge1xyXG4gICAgICBPUFBPTWluaUdhbWUuaW5zdGFuY2Uuc2hvd19pbnRlcnN0aXRpYWxfYWQodCwgZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd192aWRlb19hZChjYWxsYmFjazogeyBjYWxsOiAoY29udGV4dDogY2MuQ29tcG9uZW50IHwgbnVtYmVyKSA9PiB2b2lkIH0sXHJcbiAgICBjb250ZXh0PzogY2MuQ29tcG9uZW50IHwgbnVtYmVyLFxyXG4gICAgb3B0aW9ucz86IHBvc2l0aW9uLFxyXG4gICAgb25TdWNjZXNzPzogRnVuY3Rpb24sXHJcbiAgICBvbkZhaWx1cmU/OiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDY5MSk7XHJcbiAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDY5Myk7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBpZiAoVFRNaW5pR2FtZS5hZF9lbmFibGUpIHtcclxuICAgICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLnNob3dfdmlkZW9fYWQoKHJlc3VsdDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDY5Mik7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjk0KTtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLCBSRVdBUkRfVklERU9fQURfVFlQRS5BTEwsICgpID0+IHtcclxuICAgICAgICAgIGlmIChvblN1Y2Nlc3MgJiYgb25GYWlsdXJlKSB7XHJcbiAgICAgICAgICAgIG9uU3VjY2Vzcy5jYWxsKG9uRmFpbHVyZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5RUV9HQU1FKSB7XHJcbiAgICAgIGlmIChRUU1pbmlHYW1lLmFkX2VuYWJsZSkge1xyXG4gICAgICAgIFFRTWluaUdhbWUuaW5zdGFuY2Uuc2hvd192aWRlb19hZCgoKSA9PiB7XHJcbiAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjkyKTtcclxuICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjk0KTtcclxuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5XWF9HQU1FKSB7XHJcbiAgICAgIGlmIChDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDApIHtcclxuICAgICAgICBpZiAoV1hNaW5pR2FtZS5hZF9lbmFibGUpIHtcclxuICAgICAgICAgIFdYTWluaUdhbWUuaW5zdGFuY2Uuc2hvd192aWRlb19hZCgocmVzdWx0OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDY5Mik7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjk0KTtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcclxuICAgICAgICAgIH0sIHRoaXMsIFJFV0FSRF9WSURFT19BRF9UWVBFLkFMTCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKENoYW5uZWxNYW5hZ2VyLkFQUF9EU19NQVAgPT0gMSkge1xyXG4gICAgICAgIERXTWluaUdhbWUuaW5zdGFuY2Uuc2hvd192aWRlb19hZCgocmVzdWx0OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA2OTIpO1xyXG4gICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2OTQpO1xyXG4gICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5EV19HQU1FKSB7XHJcbiAgICAgIERXTWluaUdhbWUuaW5zdGFuY2Uuc2hvd192aWRlb19hZCgocmVzdWx0OiBudW1iZXIpID0+IHtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjkyKTtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDY5NCk7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcclxuICAgICAgfSwgdGhpcyk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlZJVk9fR0FNRSkge1xyXG4gICAgICBWSVZPTWluaUdhbWUuaW5zdGFuY2Uuc2hvd192aWRlb19hZCgocmVzdWx0OiBudW1iZXIpID0+IHtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjkyKTtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDY5NCk7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcclxuICAgICAgfSwgdGhpcyk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLk9QUE9fR0FNRSkge1xyXG4gICAgICBPUFBPTWluaUdhbWUuaW5zdGFuY2Uuc2hvd192aWRlb19hZCgocmVzdWx0OiBudW1iZXIpID0+IHtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjkyKTtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDY5NCk7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcclxuICAgICAgfSwgdGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIShjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5LS01IX0dBTUUgfHwgY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuTVpfR0FNRSkpIHtcclxuICAgICAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVEFQX1RBUF9HQU1FIHx8IGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLktFX1NIRU5HX0dBTUUgfHwgY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuTU9NT1lVX0dBTUUgfHwgY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuT0hBWU9PX0dBTUUpIHtcclxuICAgICAgICAgIFNES01hbmFnZXIuaW5zdGFuY2Uuc2hvd1Jld2FyZFZpZGVvQWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjkyKTtcclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2OTQpLCBjYWxsYmFjay5jYWxsKGNvbnRleHQpO1xyXG4gICAgICAgICAgfSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNjLmxvZyhnbS5jb25zdC5URVhUXzcpLCBjYWxsYmFjay5jYWxsKGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNoYXJlX3JlcShjYWxsYmFjazogKCkgPT4gdm9pZCB8IHsgY2FsbDogKGNvbnRleHQ6IFRUTWluaUdhbWUgfCBXWE1pbmlHYW1lKSA9PiB2b2lkIH0sIGNvbnRleHQ6IFRUTWluaUdhbWUgfCBXWE1pbmlHYW1lKTogdm9pZCB7XHJcbiAgICBsZXQgc3RhcnRUaW1lOiBudW1iZXI7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLnNoYXJlX3JlcShjYWxsYmFjaywgY29udGV4dCk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlFRX0dBTUUpIHtcclxuICAgICAgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgY2MuZ2FtZS5vbmNlKGNjLmdhbWUuRVZFTlRfU0hPVywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsYXBzZWRUaW1lOiBudW1iZXIgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xyXG4gICAgICAgIGlmIChlbGFwc2VkVGltZSA+IDMwMDApIHtcclxuICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKGdtLmNvbnN0LlRFWFRfOSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNoYXJlIGNvc3QgdGltZTpcIiArIGVsYXBzZWRUaW1lICsgXCJtc1wiKTtcclxuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKGdtLmNvbnN0LlRFWFRfMTgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIFFRTWluaUdhbWUuaW5zdGFuY2Uuc2hhcmVfcmVxKCgpID0+IHsgfSwgdGhpcyk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLldYX0dBTUUpIHtcclxuICAgICAgaWYgKENoYW5uZWxNYW5hZ2VyLkFQUF9EU19NQVAgPT0gMCkge1xyXG4gICAgICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgY2MuZ2FtZS5vbmNlKGNjLmdhbWUuRVZFTlRfU0hPVywgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZWxhcHNlZFRpbWU6IG51bWJlciA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XHJcbiAgICAgICAgICBpZiAoZWxhcHNlZFRpbWUgPiAzMDAwKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKGdtLmNvbnN0LlRFWFRfOSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2hhcmUgY29zdCB0aW1lOlwiICsgZWxhcHNlZFRpbWUgKyBcIm1zXCIpO1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoZ20uY29uc3QuVEVYVF8xOCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgV1hNaW5pR2FtZS5pbnN0YW5jZS5zaGFyZV9yZXEoY2FsbGJhY2ssIGNvbnRleHQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImZhbHNlIHNoYXJlIHN1Y2Nlc3NcIik7XHJcbiAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd19iYW5uZXJfYWQocGFyYW06IEJBTk5FUl9BRF9UWVBFKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBpZiAoVFRNaW5pR2FtZS5hZF9lbmFibGUpIHtcclxuICAgICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLnNob3dfYmFubmVyX2FkKHBhcmFtKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5RUV9HQU1FKSB7XHJcbiAgICAgIGlmIChRUU1pbmlHYW1lLmFkX2VuYWJsZSkge1xyXG4gICAgICAgIFFRTWluaUdhbWUuaW5zdGFuY2Uuc2hvd19iYW5uZXJfYWQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5XWF9HQU1FKSB7XHJcbiAgICAgIGlmIChDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDAgJiYgV1hNaW5pR2FtZS5hZF9lbmFibGUpIHtcclxuICAgICAgICBXWE1pbmlHYW1lLmluc3RhbmNlLnNob3dfYmFubmVyX2FkKHBhcmFtKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5EV19HQU1FKSB7XHJcbiAgICAgIERXTWluaUdhbWUuaW5zdGFuY2Uuc2hvd19iYW5uZXJfYWQocGFyYW0pO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5WSVZPX0dBTUUpIHtcclxuICAgICAgVklWT01pbmlHYW1lLmluc3RhbmNlLnNob3dfYmFubmVyX2FkKHBhcmFtKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuT1BQT19HQU1FKSB7XHJcbiAgICAgIE9QUE9NaW5pR2FtZS5pbnN0YW5jZS5zaG93X2Jhbm5lcl9hZChwYXJhbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGlkZV9iYW5uZXJfYWQocGFyYW06IEJBTk5FUl9BRF9UWVBFKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBpZiAoVFRNaW5pR2FtZS5hZF9lbmFibGUpIHtcclxuICAgICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLmhpZGVfYmFubmVyX2FkKHBhcmFtKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5RUV9HQU1FKSB7XHJcbiAgICAgIGlmIChRUU1pbmlHYW1lLmFkX2VuYWJsZSkge1xyXG4gICAgICAgIFFRTWluaUdhbWUuaW5zdGFuY2UuaGlkZV9iYW5uZXJfYWQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5XWF9HQU1FKSB7XHJcbiAgICAgIGlmIChDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDAgJiYgV1hNaW5pR2FtZS5hZF9lbmFibGUpIHtcclxuICAgICAgICBXWE1pbmlHYW1lLmluc3RhbmNlLmhpZGVfYmFubmVyX2FkKHBhcmFtKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5EV19HQU1FKSB7XHJcbiAgICAgIERXTWluaUdhbWUuaW5zdGFuY2UuaGlkZV9iYW5uZXJfYWQocGFyYW0pO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5WSVZPX0dBTUUpIHtcclxuICAgICAgVklWT01pbmlHYW1lLmluc3RhbmNlLmhpZGVfYmFubmVyX2FkKHBhcmFtKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuT1BQT19HQU1FKSB7XHJcbiAgICAgIE9QUE9NaW5pR2FtZS5pbnN0YW5jZS5oaWRlX2Jhbm5lcl9hZChwYXJhbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVjb3JkX3N0YXJ0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgVFRNaW5pR2FtZS5pbnN0YW5jZS5yZWNvcmRfc3RhcnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWNvcmRfc3RvcChwYXJhbTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgVFRNaW5pR2FtZS5pbnN0YW5jZS5yZWNvcmRfc3RvcChwYXJhbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNoYXJlX3ZpZGVvKHBhcmFtMTogYW55LCBwYXJhbTI6IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgVFRNaW5pR2FtZS5pbnN0YW5jZS5zaGFyZV92aWRlbyhwYXJhbTEsIHBhcmFtMik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoW0NoYW5uZWxNYW5hZ2VyLlFRX0dBTUUsIENoYW5uZWxNYW5hZ2VyLldYX0dBTUUsIENoYW5uZWxNYW5hZ2VyLkRXX0dBTUUsIENoYW5uZWxNYW5hZ2VyLkhXX0dBTUUsIENoYW5uZWxNYW5hZ2VyLlZJVk9fR0FNRSwgQ2hhbm5lbE1hbmFnZXIuT1BQT19HQU1FLCBDaGFubmVsTWFuYWdlci5LS01IX0dBTUUsIENoYW5uZWxNYW5hZ2VyLk1aX0dBTUVdLmluY2x1ZGVzKGNoYW5uZWxOYW1lKSkge1xyXG4gICAgICAgIGlmIChwYXJhbTIpIHtcclxuICAgICAgICAgIHBhcmFtMigwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB2aWVkb19zaGFyZShwYXJhbTE6IGJvb2xlYW4sIHBhcmFtMjogKG51bTogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLnZpZWRvX3NoYXJlKHBhcmFtMSwgcGFyYW0yKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChbQ2hhbm5lbE1hbmFnZXIuUVFfR0FNRSwgQ2hhbm5lbE1hbmFnZXIuV1hfR0FNRV0uaW5jbHVkZXMoY2hhbm5lbE5hbWUpKSB7XHJcbiAgICAgICAgaWYgKHBhcmFtMikge1xyXG4gICAgICAgICAgcGFyYW0yKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldF9yYW5rX2RhdGEoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLmdldF9yYW5rX2RhdGEoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuUVFfR0FNRSkge1xyXG4gICAgICBRUU1pbmlHYW1lLmluc3RhbmNlLmdldF9yYW5rX2RhdGEoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuV1hfR0FNRSAmJiBDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDApIHtcclxuICAgICAgV1hNaW5pR2FtZS5pbnN0YW5jZS5nZXRfcmFua19kYXRhKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0X3JhbmtfY2xvc2UoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLnNldF9yYW5rX2Nsb3NlKCk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlFRX0dBTUUpIHtcclxuICAgICAgUVFNaW5pR2FtZS5pbnN0YW5jZS5zZXRfcmFua19jbG9zZSgpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5XWF9HQU1FICYmIENoYW5uZWxNYW5hZ2VyLkFQUF9EU19NQVAgPT0gMCkge1xyXG4gICAgICBXWE1pbmlHYW1lLmluc3RhbmNlLnNldF9yYW5rX2Nsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uX3JhbmtfcHJlX3BhZ2VfY2xpY2soKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLm9uX3JhbmtfcHJlX3BhZ2VfY2xpY2soKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuUVFfR0FNRSkge1xyXG4gICAgICBRUU1pbmlHYW1lLmluc3RhbmNlLm9uX3JhbmtfcHJlX3BhZ2VfY2xpY2soKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuV1hfR0FNRSAmJiBDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDApIHtcclxuICAgICAgV1hNaW5pR2FtZS5pbnN0YW5jZS5vbl9yYW5rX3ByZV9wYWdlX2NsaWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uX3JhbmtfbmV4dF9wYWdlX2NsaWNrKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgVFRNaW5pR2FtZS5pbnN0YW5jZS5vbl9yYW5rX25leHRfcGFnZV9jbGljaygpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5RUV9HQU1FKSB7XHJcbiAgICAgIFFRTWluaUdhbWUuaW5zdGFuY2Uub25fcmFua19uZXh0X3BhZ2VfY2xpY2soKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuV1hfR0FNRSAmJiBDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDApIHtcclxuICAgICAgV1hNaW5pR2FtZS5pbnN0YW5jZS5vbl9yYW5rX25leHRfcGFnZV9jbGljaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRfc2VsZl9yYW5rX2RhdGEoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLmdldF9zZWxmX3JhbmtfZGF0YSgpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5RUV9HQU1FKSB7XHJcbiAgICAgIFFRTWluaUdhbWUuaW5zdGFuY2UuZ2V0X3NlbGZfcmFua19kYXRhKCk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLldYX0dBTUUgJiYgQ2hhbm5lbE1hbmFnZXIuQVBQX0RTX01BUCA9PSAwKSB7XHJcbiAgICAgIFdYTWluaUdhbWUuaW5zdGFuY2UuZ2V0X3NlbGZfcmFua19kYXRhKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldF9zZWxmX3JhbmtfY2xvc2UoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLnNldF9zZWxmX3JhbmtfY2xvc2UoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuUVFfR0FNRSkge1xyXG4gICAgICBRUU1pbmlHYW1lLmluc3RhbmNlLnNldF9zZWxmX3JhbmtfY2xvc2UoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuV1hfR0FNRSAmJiBDaGFubmVsTWFuYWdlci5BUFBfRFNfTUFQID09IDApIHtcclxuICAgICAgV1hNaW5pR2FtZS5pbnN0YW5jZS5zZXRfc2VsZl9yYW5rX2Nsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFyX2NhY2hlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgVFRNaW5pR2FtZS5pbnN0YW5jZS5jbGVhcl9jYWNoZSgpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5RUV9HQU1FKSB7XHJcbiAgICAgIFFRTWluaUdhbWUuaW5zdGFuY2UuY2xlYXJfY2FjaGUoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuV1hfR0FNRSkge1xyXG4gICAgICBpZiAoQ2hhbm5lbE1hbmFnZXIuQVBQX0RTX01BUCA9PSAwKSB7XHJcbiAgICAgICAgV1hNaW5pR2FtZS5pbnN0YW5jZS5jbGVhcl9jYWNoZSgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLkRXX0dBTUUgJiYgQ2hhbm5lbE1hbmFnZXIuQVBQX0RTX01BUCA9PSAxKSB7XHJcbiAgICAgIERXTWluaUdhbWUuaW5zdGFuY2UuY2xlYXJfY2FjaGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb21wYXJlX3ZlcnNpb24odmVyc2lvbjE6IHN0cmluZywgdmVyc2lvbjI6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICBjb25zdCB2MSA9IHZlcnNpb24xLnNwbGl0KFwiLlwiKTtcclxuICAgIGNvbnN0IHYyID0gdmVyc2lvbjIuc3BsaXQoXCIuXCIpO1xyXG4gICAgY29uc3QgbWF4TGVuZ3RoID0gTWF0aC5tYXgodjEubGVuZ3RoLCB2Mi5sZW5ndGgpO1xyXG4gICAgd2hpbGUgKHYxLmxlbmd0aCA8IG1heExlbmd0aCkgdjEucHVzaChcIjBcIik7XHJcbiAgICB3aGlsZSAodjIubGVuZ3RoIDwgbWF4TGVuZ3RoKSB2Mi5wdXNoKFwiMFwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4TGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgbnVtMSA9IHBhcnNlSW50KHYxW2ldKTtcclxuICAgICAgY29uc3QgbnVtMiA9IHBhcnNlSW50KHYyW2ldKTtcclxuICAgICAgaWYgKG51bTIgPCBudW0xKSByZXR1cm4gMTtcclxuICAgICAgaWYgKG51bTEgPCBudW0yKSByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFya1NjZW5lKCk6IHZvaWQge1xyXG4gICAgaWYgKHdpbmRvdy53eCAmJiB3aW5kb3cud3gubWFya1NjZW5lKSB7XHJcbiAgICAgIHdpbmRvdy53eC5tYXJrU2NlbmUoeyBzY2VuZUlkOiAwIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb2xsb3coY2FsbGJhY2s6IHsgY2FsbDogKGNvbnRleHQ6IGFueSwgbnVtPzogbnVtYmVyKSA9PiBhbnkgfSwgY29udGV4dDogYW55KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5nZXRfY2hhbm5lbF9uYW1lKCkgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICBUVE1pbmlHYW1lLmluc3RhbmNlLmZvbGxvdyhjYWxsYmFjaywgY29udGV4dCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhpZGVfZm9sbG93X2J0bigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmdldF9jaGFubmVsX25hbWUoKSA9PSBDaGFubmVsTWFuYWdlci5UVF9HQU1FKSB7XHJcbiAgICAgIFRUTWluaUdhbWUuaW5zdGFuY2UuaGlkZV9mb2xsb3dfYnRuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNob3dfZm9sbG93X2J0bigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmdldF9jaGFubmVsX25hbWUoKSA9PSBDaGFubmVsTWFuYWdlci5UVF9HQU1FKSB7XHJcbiAgICAgIFRUTWluaUdhbWUuaW5zdGFuY2Uuc2hvd19mb2xsb3dfYnRuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvbGxvd19kb3V5aW4ocGFyYW0xOiB7IGNhbGw6IChjYWxsYmFjazogYW55LCBjb250ZXh0OiBhbnkpID0+IHZvaWQgfSwgcGFyYW0yOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmdldF9hcHBfbmFtZSgpID09IENoYW5uZWxNYW5hZ2VyLkFQUF9ET1VfWUlOKSB7XHJcbiAgICAgIFRUTWluaUdhbWUuaW5zdGFuY2UuZG91WWluRm9sbG93KHBhcmFtMSwgcGFyYW0yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9sbG93X2J0bl9zdGF0KCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5nZXRfY2hhbm5lbF9uYW1lKCkgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICByZXR1cm4gVFRNaW5pR2FtZS5pbnN0YW5jZS5mb2xsb3dfYnRuX3N0YXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXNlcl9zdWJzY3JpYmVfbWVzc2FnZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmdldF9jaGFubmVsX25hbWUoKSA9PSBDaGFubmVsTWFuYWdlci5UVF9HQU1FKSB7XHJcbiAgICAgIFRUTWluaUdhbWUuaW5zdGFuY2UudXNlcl9zdWJzY3JpYmVfbWVzc2FnZSgoKSA9PiB7IH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93QmFubmVyTmF0aXZlKG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNoYW5uZWxOYW1lOiBzdHJpbmcgPSB0aGlzLmdldF9jaGFubmVsX25hbWUoKTtcclxuICAgIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5PUFBPX0dBTUUpIHtcclxuICAgICAgT1BQT01pbmlHYW1lLmluc3RhbmNlLnNob3dCYW5uZXJOYXRpdmUobm9kZSk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLlZJVk9fR0FNRSkge1xyXG4gICAgICBWSVZPTWluaUdhbWUuaW5zdGFuY2Uuc2hvd0Jhbm5lck5hdGl2ZShub2RlKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuV1hfR0FNRSkge1xyXG4gICAgICB0aGlzLnNob3dfQmFubmVyX05hdGl2ZShub2RlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd0JpZ0pwZ05hdGl2ZShub2RlOiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuT1BQT19HQU1FKSB7XHJcbiAgICAgIE9QUE9NaW5pR2FtZS5pbnN0YW5jZS5zaG93QmlnSnBnTmF0aXZlKG5vZGUpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5WSVZPX0dBTUUpIHtcclxuICAgICAgVklWT01pbmlHYW1lLmluc3RhbmNlLnNob3dCaWdKcGdOYXRpdmUobm9kZSk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLldYX0dBTUUpIHtcclxuICAgICAgdGhpcy5zaG93X0JpZ0pwZ19OYXRpdmUobm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNob3dfaWNvX25hdGl2ZShub2RlOiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuT1BQT19HQU1FKSB7XHJcbiAgICAgIE9QUE9NaW5pR2FtZS5pbnN0YW5jZS5zaG93SWNvTmF0aXZlKG5vZGUpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5WSVZPX0dBTUUpIHtcclxuICAgICAgVklWT01pbmlHYW1lLmluc3RhbmNlLnNob3dJY29OYXRpdmUobm9kZSk7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLldYX0dBTUUpIHtcclxuICAgICAgdGhpcy5zaG93SWNvTmF0aXZlKG5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93SWNvTmF0aXZlKG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgIGNvbnN0IGltYWdlVXJsczogc3RyaW5nW10gPSBbXCJodHRwOi8vaW1nd3NkbC52aXZvLmNvbS5jbi9hcHBzdG9yZS9hZC9hcGsvaWNvbi8yMDIwMTAyMy8yMDIwMTAyMzIzMzM1MjM5OTY0LnBuZ1wiXTtcclxuICAgIGNvbnN0IGFkSW1nOiBhbnkgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiYWRJbWdcIik7XHJcbiAgICBjb25zdCBhZExvZ286IGFueSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZExvZ29cIik7XHJcbiAgICBhZEltZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGlmIChpbWFnZVVybHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjYy5sb2FkZXIubG9hZChpbWFnZVVybHNbMF0sIChlcnJvcjogYW55LCB0ZXh0dXJlOiBhbnkpID0+IHtcclxuICAgICAgICBhZEltZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGFkSW1nLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRJbWcgbG9hZCA+Pj4+Pj4+PlwiKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGFkTG9nby5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGlmICghYWRJbWcuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikpIHtcclxuICAgICAgYWRJbWcuYWRkQ29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICB9XHJcbiAgICBhZEltZy5vbihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJuYXRpdmVJY29BZCAgQ2xpY2sgSWNvIEFkU2hvdyBcIilcclxuICAgIH0sIHRoaXMpO1xyXG4gICAgY29uc29sZS5sb2coXCJuYXRpdmVJY29BZCAgcmVwb3J0SWNvQWRTaG93IGFkSWQ6LCB0aGlzLmJhbm5lck5hdGl2ZURhdGEuYWRJZFwiKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd19CaWdKcGdfTmF0aXZlKG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgIGNvbnN0IGltYWdlVXJsczogc3RyaW5nW10gPSBbXCJodHRwOi8vaW1hZ2VzLnBpbmR1b2R1by5jb20vbWFya2V0aW5nX2FwaS8yMDIwLTA5LTMwL2EwNjRhNGUyLTA1N2QtNDA3ZC1iMjFiLTdmYTgxOGJiNGMwNi5qcGVnXCJdO1xyXG4gICAgY29uc3QgYWRJbWc6IGFueSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZEltZ1wiKTtcclxuICAgIGNvbnN0IGFkTG9nbzogYW55ID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImFkTG9nb1wiKTtcclxuICAgIGFkSW1nLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgaWYgKGltYWdlVXJscy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNjLmxvYWRlci5sb2FkKGltYWdlVXJsc1swXSwgKGVycm9yOiBhbnksIHRleHR1cmU6IGFueSkgPT4ge1xyXG4gICAgICAgIGFkSW1nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYWRJbWcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRMb2dvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgaWYgKCFhZEltZy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKSkge1xyXG4gICAgICBhZEltZy5hZGRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgIH1cclxuICAgIGFkSW1nLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFkSW1nLm9uKCdjbGljaycsICgpID0+IHtcIilcclxuICAgIH0sIHRoaXMpO1xyXG4gICAgY29uc29sZS5sb2coXCJuYXRpdmVJY29BZCAgcmVwb3J0SWNvQWRTaG93IGFkSWQ6LCB0aGlzLmJpZ0pwZ05hdGl2ZURhdGEuYWRJZFwiKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd19CYW5uZXJfTmF0aXZlKG5vZGU6IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgaW1hZ2VVcmxzOiBzdHJpbmdbXSA9IFtcImh0dHA6Ly9pbWd3c2RsLnZpdm8uY29tLmNuL2FwcHN0b3JlL2FkL2Fway9pY29uLzIwMjAxMDIzLzIwMjAxMDIzMjMzMzUyMzk5NjQucG5nXCJdO1xyXG4gICAgY29uc3QgYWRJbWc6IGFueSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZEltZ1wiKTtcclxuICAgIGNvbnN0IGFkRGVzYzogYW55ID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImFkRGVzY1wiKTtcclxuICAgIGNvbnN0IGFkVGl0bGU6IGFueSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZFRpdGxlXCIpO1xyXG4gICAgY29uc3QgYWRCdXR0b246IGFueSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZEJ1dHRvblwiKTtcclxuICAgIGNvbnN0IGFkTG9nbzogYW55ID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImFkTG9nb1wiKTtcclxuICAgIGFkSW1nLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgaWYgKGltYWdlVXJscy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNjLmxvYWRlci5sb2FkKGltYWdlVXJsc1swXSwgKGVycm9yOiBhbnksIHRleHR1cmU6IGFueSkgPT4ge1xyXG4gICAgICAgIGFkSW1nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYWRJbWcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRUaXRsZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgYWRUaXRsZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi55So5LqG6L+Z5Liq5Y+j572p77yM5YWE5byf5Lus6YO95om+5oiR6KaB6ZO+5o6l77yB5aSq5YC877yBXCI7XHJcbiAgICBhZERlc2MuYWN0aXZlID0gdHJ1ZTtcclxuICAgIGFkRGVzYy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5rS75Yqo55yf5a6e5pyJ5pWIXCI7XHJcbiAgICBhZExvZ28uYWN0aXZlID0gZmFsc2U7XHJcbiAgICBpZiAoIWFkQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pKSB7XHJcbiAgICAgIGFkQnV0dG9uLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgfVxyXG4gICAgYWRCdXR0b24ub24oXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibmF0aXZlSWNvQWQgIENsaWNrIEljb0FkU2hvdyBcIilcclxuICAgIH0sIHRoaXMpO1xyXG4gICAgY29uc29sZS5sb2coXCJuYXRpdmVJY29BZCAgcmVwb3J0SWNvQWRTaG93IGFkSWQ6LCB0aGlzLmJhbm5lck5hdGl2ZURhdGEuYWRJZFwiKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGVja1Nob3J0Y3V0KGNhbGxiYWNrOiAocmVzdWx0OiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmdldF9jaGFubmVsX25hbWUoKSA9PSBDaGFubmVsTWFuYWdlci5UVF9HQU1FKSB7XHJcbiAgICAgIFRUTWluaUdhbWUuaW5zdGFuY2UuY2hlY2tTaG9ydGN1dChjYWxsYmFjayk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjYWxsYmFjaygwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRTaG9ydGN1dChjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpID09IENoYW5uZWxNYW5hZ2VyLlRUX0dBTUUpIHtcclxuICAgICAgVFRNaW5pR2FtZS5pbnN0YW5jZS5hZGRTaG9ydGN1dChjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVwb3J0X2V2ZW50KGV2ZW50OiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fSk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50ID09IFwib2hheW9vX2dhbWVfZ3VpZGVcIikge1xyXG4gICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KGRhdGEuZ3VpZGVpZCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGV2ZW50ICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgaWYgKGNoYW5uZWxOYW1lID09IENoYW5uZWxNYW5hZ2VyLk9IQVlPT19HQU1FKSB7XHJcbiAgICAgIFNES01hbmFnZXIuaW5zdGFuY2UucmVwb3J0RXZlbnQoZXZlbnQsIGRhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvcHlfdG9fY2xpcGJvYXJkKHRleHQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgaWYgKCFbQ2hhbm5lbE1hbmFnZXIuT0hBWU9PX0dBTUUsIENoYW5uZWxNYW5hZ2VyLlRBUF9UQVBfR0FNRSwgQ2hhbm5lbE1hbmFnZXIuS0VfU0hFTkdfR0FNRSwgQ2hhbm5lbE1hbmFnZXIuTU9NT1lVX0dBTUVdLmluY2x1ZGVzKGNoYW5uZWxOYW1lKSkge1xyXG4gICAgICBTREtNYW5hZ2VyLmluc3RhbmNlLmNvcHlUb0NsaXBib2FyZCh0ZXh0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRfZGV2aWNlX2lkKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoW0NoYW5uZWxNYW5hZ2VyLk9IQVlPT19HQU1FLCBDaGFubmVsTWFuYWdlci5UQVBfVEFQX0dBTUUsIENoYW5uZWxNYW5hZ2VyLktFX1NIRU5HX0dBTUUsIENoYW5uZWxNYW5hZ2VyLk1PTU9ZVV9HQU1FXS5pbmNsdWRlcyhjaGFubmVsTmFtZSkpIHtcclxuICAgICAgcmV0dXJuIFNES01hbmFnZXIuaW5zdGFuY2UuZ2V0RGV2aWNlSUQoKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSkge1xyXG4gICAgICByZXR1cm4gVFRNaW5pR2FtZS5pbnN0YW5jZS5jb2RlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE5ldFV0aWxzLmdhbWVfdXVpZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRfdmVyc2lvbl9uYW1lKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBjaGFubmVsTmFtZTogc3RyaW5nID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBpZiAoW0NoYW5uZWxNYW5hZ2VyLk9IQVlPT19HQU1FLCBDaGFubmVsTWFuYWdlci5UQVBfVEFQX0dBTUUsIENoYW5uZWxNYW5hZ2VyLktFX1NIRU5HX0dBTUUsIENoYW5uZWxNYW5hZ2VyLk1PTU9ZVV9HQU1FXS5pbmNsdWRlcyhjaGFubmVsTmFtZSkpIHtcclxuICAgICAgcmV0dXJuIFNES01hbmFnZXIuaW5zdGFuY2UuZ2V0VmVyc2lvbk5hbWUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBcIjEuMC4wXCI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0X3ZlcnNpb25fY29kZSgpOiBudW1iZXIge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSB0aGlzLmdldF9jaGFubmVsX25hbWUoKTtcclxuICAgIGlmIChbQ2hhbm5lbE1hbmFnZXIuT0hBWU9PX0dBTUUsIENoYW5uZWxNYW5hZ2VyLlRBUF9UQVBfR0FNRSwgQ2hhbm5lbE1hbmFnZXIuS0VfU0hFTkdfR0FNRSwgQ2hhbm5lbE1hbmFnZXIuTU9NT1lVX0dBTUVdLmluY2x1ZGVzKGNoYW5uZWxOYW1lKSkge1xyXG4gICAgICByZXR1cm4gU0RLTWFuYWdlci5pbnN0YW5jZS5nZXRWZXJzaW9uQ29kZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIDE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0X25ldHdvcmtfc3RhdGVfbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSB0aGlzLmdldF9jaGFubmVsX25hbWUoKTtcclxuICAgIGlmIChbQ2hhbm5lbE1hbmFnZXIuT0hBWU9PX0dBTUUsIENoYW5uZWxNYW5hZ2VyLlRBUF9UQVBfR0FNRSwgQ2hhbm5lbE1hbmFnZXIuS0VfU0hFTkdfR0FNRSwgQ2hhbm5lbE1hbmFnZXIuTU9NT1lVX0dBTUVdLmluY2x1ZGVzKGNoYW5uZWxOYW1lKSkge1xyXG4gICAgICByZXR1cm4gU0RLTWFuYWdlci5pbnN0YW5jZS5nZXROZXR3b3JrU3RhdGVOYW1lKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJ1bmtub3duXCI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9naW4oY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gdGhpcy5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICBsZXQgbG9naW5EYXRhOiB7IGNvZGU6IHN0cmluZzsgYW5vbnltb3VzOiBudW1iZXI7IGNoYW5uZWxfaWQ6IHN0cmluZyB9O1xyXG5cclxuICAgIHN3aXRjaCAoY2hhbm5lbE5hbWUpIHtcclxuICAgICAgY2FzZSBDaGFubmVsTWFuYWdlci5PSEFZT09fR0FNRTpcclxuICAgICAgICBsb2dpbkRhdGEgPSB7XHJcbiAgICAgICAgICBjb2RlOiBnbS5jaGFubmVsLmdldF9kZXZpY2VfaWQoKSxcclxuICAgICAgICAgIGFub255bW91czogMCxcclxuICAgICAgICAgIGNoYW5uZWxfaWQ6IFwiMVwiLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZ20uZGF0YS5zZXJ2ZXJfZGF0YS5sb2dpbl9yZXF1ZXN0KChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlID09IDAgJiYgcmVzdWx0LmRhdGEpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihnbS5kYXRhLnNlcnZlcl9kYXRhLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShyZXN1bHQubXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCBsb2dpbkRhdGEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBDaGFubmVsTWFuYWdlci5UQVBfVEFQX0dBTUU6XHJcbiAgICAgICAgbG9naW5EYXRhID0ge1xyXG4gICAgICAgICAgY29kZTogZ20uY2hhbm5lbC5nZXRfZGV2aWNlX2lkKCksXHJcbiAgICAgICAgICBhbm9ueW1vdXM6IDAsXHJcbiAgICAgICAgICBjaGFubmVsX2lkOiBcIjNcIixcclxuICAgICAgICB9O1xyXG4gICAgICAgIGdtLmRhdGEuc2VydmVyX2RhdGEubG9naW5fcmVxdWVzdCgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0Q29kZSA9PSAwICYmIHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZ20uZGF0YS5zZXJ2ZXJfZGF0YSwgcmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UocmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgbG9naW5EYXRhKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgQ2hhbm5lbE1hbmFnZXIuTU9NT1lVX0dBTUU6XHJcbiAgICAgICAgbG9naW5EYXRhID0ge1xyXG4gICAgICAgICAgY29kZTogZ20uY2hhbm5lbC5nZXRfZGV2aWNlX2lkKCksXHJcbiAgICAgICAgICBhbm9ueW1vdXM6IDAsXHJcbiAgICAgICAgICBjaGFubmVsX2lkOiBcIjRcIixcclxuICAgICAgICB9O1xyXG4gICAgICAgIGdtLmRhdGEuc2VydmVyX2RhdGEubG9naW5fcmVxdWVzdCgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0Q29kZSA9PSAwICYmIHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZ20uZGF0YS5zZXJ2ZXJfZGF0YSwgcmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UocmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgbG9naW5EYXRhKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgQ2hhbm5lbE1hbmFnZXIuS0VfU0hFTkdfR0FNRTpcclxuICAgICAgICBsb2dpbkRhdGEgPSB7XHJcbiAgICAgICAgICBjb2RlOiBnbS5jaGFubmVsLmdldF9kZXZpY2VfaWQoKSxcclxuICAgICAgICAgIGFub255bW91czogMCxcclxuICAgICAgICAgIGNoYW5uZWxfaWQ6IFwiNVwiLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZ20uZGF0YS5zZXJ2ZXJfZGF0YS5sb2dpbl9yZXF1ZXN0KChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlID09IDAgJiYgcmVzdWx0LmRhdGEpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihnbS5kYXRhLnNlcnZlcl9kYXRhLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShyZXN1bHQubXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCBsb2dpbkRhdGEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBDaGFubmVsTWFuYWdlci5UVF9HQU1FOlxyXG4gICAgICAgIFRUTWluaUdhbWUuaW5zdGFuY2UuZ2V0X2NvZGUoKGNvZGU6IHN0cmluZywgYW5vbnltb3VzOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgIGdtLmRhdGEuc2VydmVyX2RhdGEubG9naW5fcmVxdWVzdCgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5SZXN1bHRDb2RlID09IDAgJiYgcmVzdWx0LmRhdGEpIHtcclxuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGdtLmRhdGEuc2VydmVyX2RhdGEsIHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKHJlc3VsdC5tc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGNvZGU6IGNvZGUsXHJcbiAgICAgICAgICAgIGFub255bW91czogYW5vbnltb3VzLFxyXG4gICAgICAgICAgICBjaGFubmVsX2lkOiBcIjJcIixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBEZWZhdWx0IGNhc2UgZm9yIG90aGVyIGNoYW5uZWxzXHJcbiAgICAgICAgbG9naW5EYXRhID0ge1xyXG4gICAgICAgICAgY29kZTogZ20uY2hhbm5lbC5nZXRfZGV2aWNlX2lkKCksXHJcbiAgICAgICAgICBhbm9ueW1vdXM6IDAsXHJcbiAgICAgICAgICBjaGFubmVsX2lkOiBcIjFcIixcclxuICAgICAgICB9O1xyXG4gICAgICAgIGdtLmRhdGEuc2VydmVyX2RhdGEubG9naW5fcmVxdWVzdCgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChyZXN1bHQuUmVzdWx0Q29kZSA9PSAwICYmIHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZ20uZGF0YS5zZXJ2ZXJfZGF0YSwgcmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UocmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgbG9naW5EYXRhKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldF9yZW1vdGVfY29uZmlnKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgLy8gTG9naWMgZm9yIGdldHRpbmcgcmVtb3RlIGNvbmZpZ1xyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICBsZXZlbF9hcnJheTogW1wiMi0xXCIsIFwiMi0yXCIsIFwiMi0zXCIsIFwiMy0xXCIsIFwiMy0yXCIsIFwiMy0zXCIsIFwiNC0xXCJdXHJcbiAgICB9O1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmxldmVsX2FycmF5KSAmJiBjb25maWcubGV2ZWxfYXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICBDaGFubmVsTWFuYWdlci5MRVZFTF9DT05GSUcgPSBjb25maWc7XHJcbiAgICB9XHJcbiAgICBjYWxsYmFjaygpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gZXhwb3J0IGNvbnN0IENoYW5uZWxNYW5hZ2VySW1wbCA9IENoYW5uZWxNYW5hZ2VySW1wbC5pbnN0YW5jZTsiXX0=