"use strict";
cc._RF.push(module, '6e2668a7q5K2YV4CAKmW/kg', 'WXMiniGame');
// start-scene/scripts/WXMiniGame.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WXMiniGame = void 0;
var GameManager_1 = require("./GameManager");
var ChannelManager_1 = require("./ChannelManager");
var Utils_1 = require("./Utils");
var WXMiniGame = /** @class */ (function () {
    function WXMiniGame() {
        this._min_banner_ad_width = 300;
        this._banner_ad_id_array = ["adunit-797181240a995471"];
        this._video_ad_id_array = ["adunit-edb2928f9bc53151"];
        this._interstitial_ad_id = "adunit-63d522433c1429a9";
        this._grid_ad_id = "";
        this._banner_ad_array = [];
        this._banner_ad_flag_array = [false];
        this._banner_ad_loaded_array = [false];
        this._video_ad_array = [];
        this._video_cb_array = [];
        this._video_cb_target_array = [];
        this._interstitial_ad = null;
        this._interstitial_ad_loaded = false;
        this._app_box = null;
        this._app_box_loaded = false;
        this._share_array = [];
        this._default_share = {
            title: "一起体验海王就是我",
            url: "https://cdnres.qszhg.6hwan.com/tower_shoot/remote/1.jpg"
        };
        this._record_start_time = 0;
        this._record_end_time = 0;
        this._is_share_record_video = false;
        this._is_restart = false;
        this._ifNeedVideoShare = false;
        this._videoPath = "";
    }
    Object.defineProperty(WXMiniGame, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new WXMiniGame();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    WXMiniGame.prototype.load_channel_env = function (call) {
        window.wx.onHide(function () { });
        window.wx.onShow(function () { });
        this._banner_ad_id_array[ChannelManager_1.BANNER_AD_TYPE.ALL] = "adunit-797181240a995471";
        this._video_ad_id_array[ChannelManager_1.REWARD_VIDEO_AD_TYPE.ALL] = "adunit-edb2928f9bc53151";
        this._interstitial_ad_id = "adunit-63d522433c1429a9";
        this._grid_ad_id = "";
        console.log("wx" + JSON.stringify(window.wx));
        window.wx.login({});
        this._share_array = ChannelManager_1.ChannelManager.SHARE_CONFIG.share_array;
        this.show_share_menu();
        call();
        return true;
    };
    WXMiniGame.prototype.show_share_menu = function () {
        var _this = this;
        console.log("WXMiniGame.show_share_menu is begin!");
        window.wx.showShareMenu({});
        window.wx.onShareAppMessage(function () {
            var share;
            if (0 == _this._share_array.length) {
                share = _this._default_share;
            }
            else {
                share = _this._share_array[Utils_1.Utils.math_random(true, 0, _this._share_array.length)];
            }
            return {
                title: share.title,
                imageUrl: share.url,
                success: function (t) {
                    console.log("转发成功"), console.log(t);
                },
                fail: function (t) {
                    console.log("fail wx onShareAppMessage" + t);
                }
            };
        });
        console.log("WXMiniGame.show_share_menu is end!");
        return true;
    };
    WXMiniGame.prototype.load_sub_packages_env = function (call) {
        call();
        return true;
    };
    Object.defineProperty(WXMiniGame.prototype, "is_share", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WXMiniGame.prototype, "is_video_share", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    WXMiniGame.prototype.get_app_name = function () {
        return ChannelManager_1.ChannelManager.APP_WE_CHAT;
    };
    WXMiniGame.prototype.vibrate_short = function () {
        if (wx.vibrateShort) {
            wx.vibrateShort({
                success: function (t) {
                    console.log("" + t);
                },
                fail: function () {
                    console.log("vibrateShort调用失败");
                }
            });
        }
    };
    WXMiniGame.prototype.vibrate_long = function () {
        if (wx.vibrateLong) {
            wx.vibrateLong({
                success: function (t) {
                    console.log("" + t);
                },
                fail: function () {
                    console.log("vibrateLong调用失败");
                }
            });
        }
    };
    Object.defineProperty(WXMiniGame.prototype, "is_rank", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WXMiniGame.prototype, "is_support_more_game", {
        get: function () {
            return "ios" != window.wx.getSystemInfoSync().platform && !!(window.wx.navigateToMiniProgram && window.wx.onNavigateToMiniProgram && window.wx.showMoreGamesModal);
        },
        enumerable: false,
        configurable: true
    });
    WXMiniGame.prototype.show_more_game = function (callback, context) {
        if (this.is_support_more_game) {
            window.wx.onMoreGamesModalClose(function (t) {
                console.log("modal closed", t);
            });
            window.wx.onNavigateToMiniProgram(function (t) {
                console.log(t.errCode);
                console.log(t.errMsg);
            });
            window.wx.showMoreGamesModal({
                appLaunchOptions: [],
                success: function (t) {
                    console.log("success", t.errMsg);
                    if (callback && context) {
                        callback.call(context, 0);
                    }
                },
                fail: function (t) {
                    console.log("fail", t.errMsg);
                    if (callback && context) {
                        callback.call(context, 1);
                    }
                }
            });
        }
    };
    WXMiniGame.prototype.share_req = function (callback, context) {
        var share = undefined;
        if (0 == this._share_array.length) {
            share = this._default_share;
        }
        else {
            share = this._share_array[Utils_1.Utils.math_random(!0, 0, this._share_array.length)];
        }
        if (window.wx.shareAppMessage && share) {
            window.wx.shareAppMessage({
                title: share.title,
                imageUrl: share.url,
                success: function (t) {
                    console.log("转发到群的结果"), console.log(t);
                },
                fail: function (t) {
                    console.log(t);
                }
            });
        }
        return true;
    };
    WXMiniGame.prototype.loginReport = function () { };
    WXMiniGame.prototype.create_banner_ad = function () {
        var _this = this;
        if (window.wx) {
            var SystemInfo = window.wx.getSystemInfoSync();
            var windowWidth_1 = SystemInfo.windowWidth;
            var windowHeight_1 = SystemInfo.windowHeight;
            var _loop_1 = function (s) {
                (function () {
                    var t = s;
                    var banner = _this._banner_ad_id_array[t];
                    if (null != banner && "" != banner) {
                        var createBannerAd_1 = wx.createBannerAd({
                            adUnitId: banner,
                            adIntervals: 30,
                            style: {
                                width: _this._min_banner_ad_width,
                                top: windowHeight_1,
                                left: (windowWidth_1 - _this._min_banner_ad_width) / 2
                            }
                        });
                        _this._banner_ad_array.push(createBannerAd_1);
                        createBannerAd_1.onLoad(function () {
                            console.log("banner ad id:" + banner + " onLoad");
                            _this._banner_ad_loaded_array[t] = true;
                        });
                        createBannerAd_1.onResize(function (t) {
                            createBannerAd_1.style.left = (windowWidth_1 - t.width) / 2;
                            createBannerAd_1.style.top = windowHeight_1 - t.height;
                            console.log("banner_ad.onResize:", t.width, t.height);
                            var getDevicePixelRatio = cc.view.getDevicePixelRatio();
                            var getScaleX = cc.view.getScaleX();
                            console.log("banner need design size:", t.width * getDevicePixelRatio / getScaleX, t.height * getDevicePixelRatio / getScaleX);
                        });
                        createBannerAd_1.onError(function (t) {
                            console.log(t);
                        });
                    }
                })();
            };
            for (var s = 0; s < this._banner_ad_id_array.length; s++) {
                _loop_1(s);
            }
        }
    };
    WXMiniGame.prototype.show_banner_ad = function (index) {
        var _this = this;
        if (this._banner_ad_loaded_array[index]) {
            this._banner_ad_flag_array[index] = true;
            var banner_1 = this._banner_ad_array[index];
            banner_1.show().then(function () {
                if (_this._banner_ad_flag_array[index]) {
                    console.log("广告显示成功");
                }
                else {
                    banner_1.hide();
                    console.log("广告显示慢了，不需要显示了");
                }
            }).catch(function (t) {
                console.log("广告组件出现问题", t);
            });
        }
    };
    WXMiniGame.prototype.hide_banner_ad = function (index) {
        if (this._banner_ad_loaded_array[index]) {
            var banner = this._banner_ad_array[index];
            if (banner) {
                banner.hide();
                this._banner_ad_flag_array[index] = false;
            }
        }
    };
    WXMiniGame.prototype.create_video_ad = function () {
        if (null != window.wx.createRewardedVideoAd) {
            var SystemInfo = wx.getSystemInfoSync().SDKVersion;
            if (0 <= GameManager_1.gm.channel.compare_version(SystemInfo, "2.8.0")) {
                console.log("该设备支持激励视频广告的多例模式");
                for (var index = 0; index < this._video_ad_id_array.length; index++) {
                    this._video_ad_array[index] = window.wx.createRewardedVideoAd({
                        adUnitId: this._video_ad_id_array[index],
                        multiton: true
                    });
                    this.on_video_ad_handler(index);
                }
            }
            else {
                console.log("该设备不支持激励视频广告的多例模式");
                var index = ChannelManager_1.REWARD_VIDEO_AD_TYPE.ALL;
                this._video_ad_array[index] = window.wx.createRewardedVideoAd({
                    adUnitId: this._video_ad_id_array[index]
                });
                this.on_video_ad_handler(index);
            }
        }
    };
    WXMiniGame.prototype.on_video_ad_handler = function (index) {
        var _this = this;
        this._video_ad_array[index].onClose(function (t) {
            cc.game.resume();
            if (t && t.isEnded || undefined === t) {
                console.log("视频广告 正常播放结束");
                _this._video_cb_array[index].apply(_this._video_cb_target_array[index]);
            }
            else {
                console.log("视频广告 播放中途退出");
                GameManager_1.gm.ui.show_notice("Không có phần thưởng khi kết thúc quảng cáo video");
            }
        });
        this._video_ad_array[index].onLoad(function () {
            console.log("激励视频 广告加载成功");
        });
        this._video_ad_array[index].onError(function (t) {
            console.log(t);
        });
    };
    WXMiniGame.prototype.show_video_ad = function (callback, context, type) {
        var _this = this;
        var SystemInfo = wx.getSystemInfoSync().SDKVersion;
        if (GameManager_1.gm.channel.compare_version(SystemInfo, "2.8.0") < 0) {
            type = ChannelManager_1.REWARD_VIDEO_AD_TYPE.ALL;
        }
        this._video_cb_array[type] = callback;
        this._video_cb_target_array[type] = context;
        if (this._video_ad_array[type]) {
            this._video_ad_array[type].show().then(function () {
                console.log("视频广告显示成功");
                cc.game.pause();
            }).catch(function () {
                console.log("自动拉取失败，重新拉取");
                _this._video_ad_array[type].load().then(function () {
                    _this._video_ad_array[type].show().then(function () {
                        console.log("重新拉取，视频广告显示成功");
                        cc.game.pause();
                    }).catch(function (t) {
                        console.log("重新拉取失败", t);
                        if (1004 == t.errCode) {
                            GameManager_1.gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                        }
                        else {
                            GameManager_1.gm.ui.show_notice("Quảng cáo có thưởng bằng video không mở được");
                        }
                        GameManager_1.gm.channel.share_req(function () {
                            if (callback) {
                                callback.call(context);
                            }
                        }, _this);
                    });
                });
            });
        }
        else {
            GameManager_1.gm.ui.show_notice("Quảng cáo được thưởng bằng video chưa được khởi tạo");
        }
    };
    WXMiniGame.prototype.create_app_box_ad = function () {
        if (wx.createGridAd) {
            this._app_box = wx.createGridAd({
                adUnitId: this._grid_ad_id,
                adIntervals: 30,
                adTheme: "white",
                gridCount: 5,
                style: {
                    left: 0,
                    top: 0,
                    width: 330,
                    opacity: .8
                }
            });
            this._app_box.onLoad(function () {
                console.log("格子广告加载成功");
            });
            this._app_box.onError(function (t) {
                console.log(t);
            });
        }
        else {
            console.log("不支持格子广告，请升级微信");
        }
    };
    Object.defineProperty(WXMiniGame.prototype, "is_support_app_box", {
        get: function () {
            return !!wx.createGridAd;
        },
        enumerable: false,
        configurable: true
    });
    WXMiniGame.prototype.show_app_box_ad = function () {
        if (wx.createGridAd) {
            if (this._app_box_loaded && this._app_box) {
                this._app_box.show().catch(function (t) {
                    console.error(t);
                });
            }
            else {
                this.create_app_box_ad();
                console.log("_app_box_loaded:" + this._app_box_loaded);
            }
        }
        else {
            console.log("不支持广告盒子，请升级微信");
        }
    };
    WXMiniGame.prototype.create_interstitial_ad = function () {
        var _this = this;
        if (wx.createInterstitialAd) {
            this._interstitial_ad = wx.createInterstitialAd({
                adUnitId: this._interstitial_ad_id
            });
            this._interstitial_ad.onError(function (t) {
                console.log(t);
            });
            this._interstitial_ad.onLoad(function () {
                console.log("banner 广告加载成功");
            });
            this._interstitial_ad.onLoad(function () {
                _this._interstitial_ad_loaded = true;
            });
            this._interstitial_ad.onClose(function () {
                console.log("close event emit");
            });
            this._interstitial_ad.onError(function (t) {
                console.log("error", t);
            });
        }
    };
    Object.defineProperty(WXMiniGame.prototype, "is_support_interstitial_ad", {
        get: function () {
            if (wx.createInterstitialAd) {
                console.log("is_support_interstitial_ad: true");
                return true;
            }
            else {
                console.log("is_support_interstitial_ad: false");
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    WXMiniGame.prototype.show_interstitial_ad = function (callback, context) {
        if (this._interstitial_ad && this._interstitial_ad_loaded) {
            this._interstitial_ad.show().catch(function (t) {
                console.error("show", t);
                if (callback && context) {
                    callback.call(context, 1);
                }
            });
        }
    };
    WXMiniGame.prototype.set_rank_value = function () {
        var object = {
            wxgame: {
                score: 0,
                update_time: Math.floor((new Date).getTime() / 1e3)
            },
            cost_time: 0
        };
        console.log("WXMINIgame setRankVal data:", object);
        window.wx.setUserCloudStorage({
            KVDataList: [{
                    key: "level",
                    value: JSON.stringify(object)
                }]
        });
        cc.log("上报排行数据");
    };
    WXMiniGame.prototype.get_rank_data = function () {
        window.wx.getOpenDataContext().postMessage({
            message: 2
        });
        return true;
    };
    WXMiniGame.prototype.set_rank_close = function () {
        window.wx.getOpenDataContext().postMessage({
            message: 99
        });
    };
    WXMiniGame.prototype.on_rank_pre_page_click = function () {
        window.wx.getOpenDataContext().postMessage({
            message: 100
        });
    };
    WXMiniGame.prototype.on_rank_next_page_click = function () {
        window.wx.getOpenDataContext().postMessage({
            message: 101
        });
    };
    WXMiniGame.prototype.get_self_rank_data = function () {
        window.wx && window.wx.getOpenDataContext().postMessage({
            message: 300
        });
        return true;
    };
    WXMiniGame.prototype.set_self_rank_close = function () {
        window.wx && window.wx.getOpenDataContext().postMessage({
            message: 301
        });
    };
    WXMiniGame.prototype.clear_cache = function () {
        if (window.wxDownloader) {
            window.wxDownloader.cleanAllAssets();
            console.log("delete cache success");
        }
    };
    WXMiniGame._instance = null;
    WXMiniGame.ad_enable = false;
    return WXMiniGame;
}());
exports.WXMiniGame = WXMiniGame;

cc._RF.pop();