"use strict";
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