"use strict";
cc._RF.push(module, '87bd60/lxpF9atlDBoOpKO8', 'DWMiniGame ');
// start-scene/scripts/DWMiniGame .ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DWMiniGame = void 0;
var GameManager_1 = require("./GameManager");
var ChannelManager_1 = require("./ChannelManager");
var DWMiniGame = /** @class */ (function () {
    function DWMiniGame() {
        this._targetBannerAdWidth = 300;
        this._banner_ad_id_array = ["adunit-1a0789aa3d24c31c", "adunit-4893ea318eaf44f5", "adunit-ada16e8d5f5a0139", "adunit-4c369f7c7e1cb4b7", "adunit-1186e487eecafd26", "adunit-a54e87fff0eacc73", "adunit-941430e138629088"];
        this._banner_ad_array = [];
        this._banner_ad_flag_array = [false, false, false, false];
        this._banner_ad_loaded_array = [false, false, false, false];
        this._videoAd = null;
        this._videoCb = null;
        this._videoCbTarget = null;
        this._interstitial_ad = null;
        this._interstitial_ad_loaded = false;
        this._app_box = null;
        this._app_box_loaded = false;
        this._share_array = [];
        this._default_share = {
            title: "一起体验海王就是我",
            url: "https://cdnres.qszhg.6hwan.com/minigame/wife_cdn/res/shareImg.jpg"
        };
        this._share_config_url = "https://cdnres.qszhg.6hwan.com/minigame/wife_cdn/res/share.json";
        this._record_start_time = 0;
        this._record_end_time = 0;
        this._is_share_record_video = false;
        this._is_restart = false;
        this._ifNeedVideoShare = false;
        this._videoPath = "";
    }
    Object.defineProperty(DWMiniGame, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new DWMiniGame;
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    DWMiniGame.prototype.load_channel_env = function (call) {
        window.wx.onHide(function () { });
        window.wx.onShow(function () { });
        console.log("wx_DS" + JSON.stringify(window.wx));
        window.wx.login({});
        call();
        return true;
    };
    DWMiniGame.prototype.load_sub_packages_env = function (call) {
        call();
        return true;
    };
    DWMiniGame.prototype.analyzeUrlPram = function () {
        return true;
    };
    DWMiniGame.prototype.get_app_name = function () {
        return ChannelManager_1.ChannelManager.APP_DW;
    };
    Object.defineProperty(DWMiniGame.prototype, "is_share", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DWMiniGame.prototype, "is_video_share", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DWMiniGame.prototype, "is_support_more_game", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    DWMiniGame.prototype.loginReport = function () { };
    ;
    DWMiniGame.prototype.create_banner_ad = function () {
        var _this = this;
        if (window.wx) {
            var SystemInfo = window.wx.getSystemInfoSync();
            var windowWidth_1 = SystemInfo.windowWidth;
            var windowHeight_1 = SystemInfo.windowHeight;
            var _loop_1 = function (index) {
                var bannerAd = wx.createBannerAd({
                    adUnitId: this_1._banner_ad_id_array[index],
                    adIntervals: 40,
                    style: {
                        width: this_1._targetBannerAdWidth,
                        top: windowHeight_1 - this_1._targetBannerAdWidth / 16 * 9,
                        left: (windowWidth_1 - this_1._targetBannerAdWidth) / 2
                    }
                });
                this_1._banner_ad_array.push(bannerAd);
                bannerAd.onLoad(function () {
                    console.log("banner ad id:" + _this._banner_ad_id_array[index] + " onLoad"),
                        _this._banner_ad_loaded_array[index] = !0;
                });
                bannerAd.onResize(function (t) {
                    bannerAd.style.top = windowHeight_1 - t.height,
                        bannerAd.style.left = (windowWidth_1 - t.width) / 2;
                });
                bannerAd.onError(function (t) {
                    console.log(t);
                });
            };
            var this_1 = this;
            for (var index = 0; index < this._banner_ad_id_array.length; index++) {
                _loop_1(index);
            }
        }
    };
    DWMiniGame.prototype.show_banner_ad = function (param) {
        var _this = this;
        if (this._banner_ad_loaded_array[param]) {
            this._banner_ad_flag_array[param] = true;
            var banner_1 = this._banner_ad_array[param];
            banner_1.show().then(function () {
                if (_this._banner_ad_flag_array[param]) {
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
    DWMiniGame.prototype.hide_banner_ad = function (param) {
        if (this._banner_ad_loaded_array[param]) {
            var banner = this._banner_ad_array[param];
            if (banner) {
                banner.hide();
                this._banner_ad_flag_array[param] = false;
            }
        }
    };
    DWMiniGame.prototype.create_video_ad = function () {
        var _this = this;
        if (null != window.wx.createRewardedVideoAd) {
            this._videoAd = window.wx.createRewardedVideoAd({
                adUnitId: "adunit-868693f6bf325824"
            });
            this._videoAd.onClose(function (t) {
                if (t.isEnded) {
                    console.log("视频广告观看完成");
                    _this._videoCb.apply(_this._videoCbTarget);
                }
                else {
                    console.log("视频广告观看中断");
                    GameManager_1.gm.ui.show_notice("Quảng cáo video bị gián đoạn, không có phần thưởng");
                }
            });
            this._videoAd.onError(function (t) {
                console.log(t);
            });
            this._videoAd.onLoad(function () {
                console.log("激励视频 广告加载成功");
            });
        }
    };
    DWMiniGame.prototype.show_video_ad = function (call, chanel) {
        var _this = this;
        this._videoCb = call;
        this._videoCbTarget = chanel;
        if (this._videoAd) {
            this._videoAd.show().then(function () {
                console.log("视频广告显示成功");
            }).catch(function () {
                console.log("视频手动加载成功");
                _this._videoAd.show().then(function () {
                    console.log("重试，视频广告显示成功");
                }).catch(function (t) {
                    console.log("重试，视频广告组件出现问题", t);
                    if (1004 == t.errCode) {
                        GameManager_1.gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                    }
                    else {
                        GameManager_1.gm.ui.show_notice("Quảng cáo có thưởng bằng video không mở được");
                    }
                });
            });
        }
        else {
            GameManager_1.gm.ui.show_notice("Quảng cáo được thưởng bằng video chưa được khởi tạo");
        }
    };
    Object.defineProperty(DWMiniGame.prototype, "is_support_app_box", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    DWMiniGame.prototype.clear_cache = function () {
        if (window.wxDownloader) {
            window.wxDownloader.cleanAllAssets();
            console.log("delete cache success");
        }
    };
    DWMiniGame.prototype.vibrate_short = function () {
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
    DWMiniGame.prototype.vibrate_long = function () {
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
    Object.defineProperty(DWMiniGame.prototype, "is_support_interstitial_ad", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DWMiniGame.prototype, "is_rank", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    DWMiniGame._instance = null;
    return DWMiniGame;
}());
exports.DWMiniGame = DWMiniGame;

cc._RF.pop();