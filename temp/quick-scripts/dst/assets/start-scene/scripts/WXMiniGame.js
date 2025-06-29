
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/WXMiniGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFdYTWluaUdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW1DO0FBQ25DLG1EQUF3RjtBQUN4RixpQ0FBZ0M7QUF3QmhDO0lBMkJJO1FBQ0ksSUFBSSxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQztRQUNoQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLHlCQUF5QixDQUFDO1FBQ3JELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNsQixLQUFLLEVBQUUsV0FBVztZQUNsQixHQUFHLEVBQUUseURBQXlEO1NBQ2pFLENBQUM7UUFDRixJQUFJLENBQUMs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QUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQXpnQmMsb0JBQVMsR0FBZSxJQUFJLENBQUM7SUFDOUIsb0JBQVMsR0FBWSxLQUFLLENBQUM7SUF5Z0I3QyxpQkFBQztDQTNnQkQsQUEyZ0JDLElBQUE7QUEzZ0JZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ20gfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBDaGFubmVsTWFuYWdlciwgQkFOTkVSX0FEX1RZUEUsIFJFV0FSRF9WSURFT19BRF9UWVBFIH0gZnJvbSBcIi4vQ2hhbm5lbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBJQWQgfSBmcm9tIFwiLi9WSVZPTWluaUdhbWVcIlxyXG5cclxuaW50ZXJmYWNlIFNoYXJlIHtcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICB1cmw6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJhbm5lckFkIGV4dGVuZHMgSUFkIHtcclxuICAgIHN0eWxlOiB7XHJcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcjtcclxuICAgICAgICB0b3A6IG51bWJlcjtcclxuICAgICAgICBsZWZ0OiBudW1iZXI7XHJcbiAgICB9O1xyXG4gICAgb25SZXNpemUoY2FsbGJhY2s6IChzaXplOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH0pID0+IHZvaWQpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZEQ2FsbGJhY2sge1xyXG4gICAgY2FsbDogKGNvbnRleHQ6IENoYW5uZWxNYW5hZ2VyKSA9PiB2b2lkO1xyXG4gICAgYXBwbHk/OiAodGFyZ2V0OiBDaGFubmVsTWFuYWdlcikgPT4gdm9pZDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBXWE1pbmlHYW1lIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogV1hNaW5pR2FtZSA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFkX2VuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfbWluX2Jhbm5lcl9hZF93aWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYmFubmVyX2FkX2lkX2FycmF5OiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX3ZpZGVvX2FkX2lkX2FycmF5OiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX2ludGVyc3RpdGlhbF9hZF9pZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZ3JpZF9hZF9pZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfYmFubmVyX2FkX2FycmF5OiBCYW5uZXJBZFtdO1xyXG4gICAgcHJpdmF0ZSBfYmFubmVyX2FkX2ZsYWdfYXJyYXk6IGJvb2xlYW5bXTtcclxuICAgIHByaXZhdGUgX2Jhbm5lcl9hZF9sb2FkZWRfYXJyYXk6IGJvb2xlYW5bXTtcclxuICAgIHByaXZhdGUgX3ZpZGVvX2FkX2FycmF5OiBJQWRbXTtcclxuICAgIHByaXZhdGUgX3ZpZGVvX2NiX2FycmF5OiBWRENhbGxiYWNrW107XHJcbiAgICBwcml2YXRlIF92aWRlb19jYl90YXJnZXRfYXJyYXk6IENoYW5uZWxNYW5hZ2VyW107XHJcbiAgICBwcml2YXRlIF9pbnRlcnN0aXRpYWxfYWQ6IElBZDtcclxuICAgIHByaXZhdGUgX2ludGVyc3RpdGlhbF9hZF9sb2FkZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9hcHBfYm94OiBJQWQ7XHJcbiAgICBwcml2YXRlIF9hcHBfYm94X2xvYWRlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3NoYXJlX2FycmF5OiBTaGFyZVtdO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdF9zaGFyZTogU2hhcmU7XHJcbiAgICBwcml2YXRlIF9yZWNvcmRfc3RhcnRfdGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcmVjb3JkX2VuZF90aW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9pc19zaGFyZV9yZWNvcmRfdmlkZW86IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9pc19yZXN0YXJ0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfaWZOZWVkVmlkZW9TaGFyZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3ZpZGVvUGF0aDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX21pbl9iYW5uZXJfYWRfd2lkdGggPSAzMDA7XHJcbiAgICAgICAgdGhpcy5fYmFubmVyX2FkX2lkX2FycmF5ID0gW1wiYWR1bml0LTc5NzE4MTI0MGE5OTU0NzFcIl07XHJcbiAgICAgICAgdGhpcy5fdmlkZW9fYWRfaWRfYXJyYXkgPSBbXCJhZHVuaXQtZWRiMjkyOGY5YmM1MzE1MVwiXTtcclxuICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWRfaWQgPSBcImFkdW5pdC02M2Q1MjI0MzNjMTQyOWE5XCI7XHJcbiAgICAgICAgdGhpcy5fZ3JpZF9hZF9pZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fYmFubmVyX2FkX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5fYmFubmVyX2FkX2ZsYWdfYXJyYXkgPSBbZmFsc2VdO1xyXG4gICAgICAgIHRoaXMuX2Jhbm5lcl9hZF9sb2FkZWRfYXJyYXkgPSBbZmFsc2VdO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvX2FkX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5fdmlkZW9fY2JfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl92aWRlb19jYl90YXJnZXRfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZF9sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9hcHBfYm94ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9hcHBfYm94X2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NoYXJlX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdF9zaGFyZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwi5LiA6LW35L2T6aqM5rW3546L5bCx5piv5oiRXCIsXHJcbiAgICAgICAgICAgIHVybDogXCJodHRwczovL2NkbnJlcy5xc3poZy42aHdhbi5jb20vdG93ZXJfc2hvb3QvcmVtb3RlLzEuanBnXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3JlY29yZF9zdGFydF90aW1lID0gMDtcclxuICAgICAgICB0aGlzLl9yZWNvcmRfZW5kX3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2lzX3NoYXJlX3JlY29yZF92aWRlbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzX3Jlc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pZk5lZWRWaWRlb1NoYXJlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmlkZW9QYXRoID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBXWE1pbmlHYW1lIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IFdYTWluaUdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkX2NoYW5uZWxfZW52KGNhbGw6ICgpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICB3aW5kb3cud3gub25IaWRlKCgpID0+IHsgfSk7XHJcbiAgICAgICAgd2luZG93Lnd4Lm9uU2hvdygoKSA9PiB7IH0pOyBcclxuICAgICAgICB0aGlzLl9iYW5uZXJfYWRfaWRfYXJyYXlbQkFOTkVSX0FEX1RZUEUuQUxMXSA9IFwiYWR1bml0LTc5NzE4MTI0MGE5OTU0NzFcIjtcclxuICAgICAgICB0aGlzLl92aWRlb19hZF9pZF9hcnJheVtSRVdBUkRfVklERU9fQURfVFlQRS5BTExdID0gXCJhZHVuaXQtZWRiMjkyOGY5YmM1MzE1MVwiO1xyXG4gICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZF9pZCA9IFwiYWR1bml0LTYzZDUyMjQzM2MxNDI5YTlcIjtcclxuICAgICAgICB0aGlzLl9ncmlkX2FkX2lkID0gXCJcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInd4XCIgKyBKU09OLnN0cmluZ2lmeSh3aW5kb3cud3gpKTtcclxuICAgICAgICB3aW5kb3cud3gubG9naW4oe30pO1xyXG4gICAgICAgIHRoaXMuX3NoYXJlX2FycmF5ID0gQ2hhbm5lbE1hbmFnZXIuU0hBUkVfQ09ORklHLnNoYXJlX2FycmF5O1xyXG4gICAgICAgIHRoaXMuc2hvd19zaGFyZV9tZW51KCk7XHJcbiAgICAgICAgY2FsbCgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd19zaGFyZV9tZW51KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV1hNaW5pR2FtZS5zaG93X3NoYXJlX21lbnUgaXMgYmVnaW4hXCIpO1xyXG4gICAgICAgIHdpbmRvdy53eC5zaG93U2hhcmVNZW51KHt9KTtcclxuICAgICAgICB3aW5kb3cud3gub25TaGFyZUFwcE1lc3NhZ2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2hhcmU6IFNoYXJlO1xyXG4gICAgICAgICAgICBpZiAoMCA9PSB0aGlzLl9zaGFyZV9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHNoYXJlID0gdGhpcy5fZGVmYXVsdF9zaGFyZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNoYXJlID0gdGhpcy5fc2hhcmVfYXJyYXlbVXRpbHMubWF0aF9yYW5kb20odHJ1ZSwgMCwgdGhpcy5fc2hhcmVfYXJyYXkubGVuZ3RoKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogc2hhcmUudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybDogc2hhcmUudXJsLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui9rOWPkeaIkOWKn1wiKSwgY29uc29sZS5sb2codCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhaWwgd3ggb25TaGFyZUFwcE1lc3NhZ2VcIiArIHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJXWE1pbmlHYW1lLnNob3dfc2hhcmVfbWVudSBpcyBlbmQhXCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkX3N1Yl9wYWNrYWdlc19lbnYoY2FsbDogKCkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNhbGwoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3NoYXJlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNfdmlkZW9fc2hhcmUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfYXBwX25hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gQ2hhbm5lbE1hbmFnZXIuQVBQX1dFX0NIQVQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpYnJhdGVfc2hvcnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHd4LnZpYnJhdGVTaG9ydCkge1xyXG4gICAgICAgICAgICB3eC52aWJyYXRlU2hvcnQoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiICsgdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlicmF0ZVNob3J06LCD55So5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpYnJhdGVfbG9uZygpOiB2b2lkIHtcclxuICAgICAgICBpZiAod3gudmlicmF0ZUxvbmcpIHtcclxuICAgICAgICAgICAgd3gudmlicmF0ZUxvbmcoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiICsgdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlicmF0ZUxvbmfosIPnlKjlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3JhbmsoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc19zdXBwb3J0X21vcmVfZ2FtZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gXCJpb3NcIiAhPSB3aW5kb3cud3guZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybSAmJiAhISh3aW5kb3cud3gubmF2aWdhdGVUb01pbmlQcm9ncmFtICYmIHdpbmRvdy53eC5vbk5hdmlnYXRlVG9NaW5pUHJvZ3JhbSAmJiB3aW5kb3cud3guc2hvd01vcmVHYW1lc01vZGFsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd19tb3JlX2dhbWUoY2FsbGJhY2s6IHsgY2FsbDogKHJlUzogYW55LCBjb250ZXh0OiBudW1iZXIpID0+IHZvaWQgfSwgY29udGV4dDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfc3VwcG9ydF9tb3JlX2dhbWUpIHtcclxuICAgICAgICAgICAgd2luZG93Lnd4Lm9uTW9yZUdhbWVzTW9kYWxDbG9zZSgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb2RhbCBjbG9zZWRcIiwgdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgd2luZG93Lnd4Lm9uTmF2aWdhdGVUb01pbmlQcm9ncmFtKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0LmVyckNvZGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codC5lcnJNc2cpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy53eC5zaG93TW9yZUdhbWVzTW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgYXBwTGF1bmNoT3B0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiLCB0LmVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxcIiwgdC5lcnJNc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNoYXJlX3JlcShjYWxsYmFjaz86IGFueSwgY29udGV4dD86IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBzaGFyZTogU2hhcmUgPSB1bmRlZmluZWRcclxuICAgICAgICBpZiAoMCA9PSB0aGlzLl9zaGFyZV9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2hhcmUgPSB0aGlzLl9kZWZhdWx0X3NoYXJlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNoYXJlID0gdGhpcy5fc2hhcmVfYXJyYXlbVXRpbHMubWF0aF9yYW5kb20oITAsIDAsIHRoaXMuX3NoYXJlX2FycmF5Lmxlbmd0aCldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy53eC5zaGFyZUFwcE1lc3NhZ2UgJiYgc2hhcmUpIHtcclxuICAgICAgICAgICAgd2luZG93Lnd4LnNoYXJlQXBwTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogc2hhcmUudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybDogc2hhcmUudXJsLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui9rOWPkeWIsOe+pOeahOe7k+aenFwiKSwgY29uc29sZS5sb2codClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZ2luUmVwb3J0KCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZV9iYW5uZXJfYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy53eCkge1xyXG4gICAgICAgICAgICBjb25zdCBTeXN0ZW1JbmZvID0gd2luZG93Lnd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gU3lzdGVtSW5mby53aW5kb3dXaWR0aDtcclxuICAgICAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gU3lzdGVtSW5mby53aW5kb3dIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBzID0gMDsgcyA8IHRoaXMuX2Jhbm5lcl9hZF9pZF9hcnJheS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYW5uZXIgPSB0aGlzLl9iYW5uZXJfYWRfaWRfYXJyYXlbdF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgIT0gYmFubmVyICYmIFwiXCIgIT0gYmFubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUJhbm5lckFkOiBCYW5uZXJBZCA9IHd4LmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiBiYW5uZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZEludGVydmFsczogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLl9taW5fYmFubmVyX2FkX3dpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogd2luZG93SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh3aW5kb3dXaWR0aCAtIHRoaXMuX21pbl9iYW5uZXJfYWRfd2lkdGgpIC8gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lcl9hZF9hcnJheS5wdXNoKGNyZWF0ZUJhbm5lckFkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlQmFubmVyQWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVyIGFkIGlkOlwiICsgYmFubmVyICsgXCIgb25Mb2FkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyX2FkX2xvYWRlZF9hcnJheVt0XSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlQmFubmVyQWQub25SZXNpemUoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUJhbm5lckFkLnN0eWxlLmxlZnQgPSAod2luZG93V2lkdGggLSB0LndpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVCYW5uZXJBZC5zdHlsZS50b3AgPSB3aW5kb3dIZWlnaHQgLSB0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVyX2FkLm9uUmVzaXplOlwiLCB0LndpZHRoLCB0LmhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2V0RGV2aWNlUGl4ZWxSYXRpbyA9IGNjLnZpZXcuZ2V0RGV2aWNlUGl4ZWxSYXRpbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2V0U2NhbGVYID0gY2Mudmlldy5nZXRTY2FsZVgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lciBuZWVkIGRlc2lnbiBzaXplOlwiLCB0LndpZHRoICogZ2V0RGV2aWNlUGl4ZWxSYXRpbyAvIGdldFNjYWxlWCwgdC5oZWlnaHQgKiBnZXREZXZpY2VQaXhlbFJhdGlvIC8gZ2V0U2NhbGVYKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVCYW5uZXJBZC5vbkVycm9yKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd19iYW5uZXJfYWQoaW5kZXg6IEJBTk5FUl9BRF9UWVBFKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Jhbm5lcl9hZF9sb2FkZWRfYXJyYXlbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lcl9hZF9mbGFnX2FycmF5W2luZGV4XSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhbm5lciA9IHRoaXMuX2Jhbm5lcl9hZF9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgIGJhbm5lci5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYmFubmVyX2FkX2ZsYWdfYXJyYXlbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlub/lkYrmmL7npLrmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhbm5lci5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlub/lkYrmmL7npLrmhaLkuobvvIzkuI3pnIDopoHmmL7npLrkuoZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiue7hOS7tuWHuueOsOmXrumimFwiLCB0KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVfYmFubmVyX2FkKGluZGV4OiBCQU5ORVJfQURfVFlQRSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9iYW5uZXJfYWRfbG9hZGVkX2FycmF5W2luZGV4XSkge1xyXG4gICAgICAgICAgICBjb25zdCBiYW5uZXIgPSB0aGlzLl9iYW5uZXJfYWRfYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoYmFubmVyKSB7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyX2FkX2ZsYWdfYXJyYXlbaW5kZXhdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZV92aWRlb19hZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB3aW5kb3cud3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFN5c3RlbUluZm8gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLlNES1ZlcnNpb247XHJcbiAgICAgICAgICAgIGlmICgwIDw9IGdtLmNoYW5uZWwuY29tcGFyZV92ZXJzaW9uKFN5c3RlbUluZm8sIFwiMi44LjBcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+l6K6+5aSH5pSv5oyB5r+A5Yqx6KeG6aKR5bm/5ZGK55qE5aSa5L6L5qih5byPXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX3ZpZGVvX2FkX2lkX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvX2FkX2FycmF5W2luZGV4XSA9IHdpbmRvdy53eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5fdmlkZW9fYWRfaWRfYXJyYXlbaW5kZXhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXRvbjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25fdmlkZW9fYWRfaGFuZGxlcihpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor6Xorr7lpIfkuI3mlK/mjIHmv4DlirHop4bpopHlub/lkYrnmoTlpJrkvovmqKHlvI9cIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IFJFV0FSRF9WSURFT19BRF9UWVBFLkFMTDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvX2FkX2FycmF5W2luZGV4XSA9IHdpbmRvdy53eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB0aGlzLl92aWRlb19hZF9pZF9hcnJheVtpbmRleF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbl92aWRlb19hZF9oYW5kbGVyKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX3ZpZGVvX2FkX2hhbmRsZXIoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvX2FkX2FycmF5W2luZGV4XS5vbkNsb3NlKCh0KSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUucmVzdW1lKCk7XHJcbiAgICAgICAgICAgIGlmICh0ICYmIHQuaXNFbmRlZCB8fCB1bmRlZmluZWQgPT09IHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6KeG6aKR5bm/5ZGKIOato+W4uOaSreaUvue7k+adn1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvX2NiX2FycmF5W2luZGV4XS5hcHBseSh0aGlzLl92aWRlb19jYl90YXJnZXRfYXJyYXlbaW5kZXhdKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6KeG6aKR5bm/5ZGKIOaSreaUvuS4remAlOmAgOWHulwiKTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiS2jDtG5nIGPDsyBwaOG6p24gdGjGsOG7n25nIGtoaSBr4bq/dCB0aMO6YyBxdeG6o25nIGPDoW8gdmlkZW9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fdmlkZW9fYWRfYXJyYXlbaW5kZXhdLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5r+A5Yqx6KeG6aKRIOW5v+WRiuWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fdmlkZW9fYWRfYXJyYXlbaW5kZXhdLm9uRXJyb3IoKHQpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd192aWRlb19hZChjYWxsYmFjazogeyBjYWxsOiAoY29udGV4dDogQ2hhbm5lbE1hbmFnZXIpID0+IHZvaWQgfSwgY29udGV4dDogQ2hhbm5lbE1hbmFnZXIsIHR5cGU6IFJFV0FSRF9WSURFT19BRF9UWVBFKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgU3lzdGVtSW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkuU0RLVmVyc2lvbjtcclxuICAgICAgICBpZiAoZ20uY2hhbm5lbC5jb21wYXJlX3ZlcnNpb24oU3lzdGVtSW5mbywgXCIyLjguMFwiKSA8IDApIHtcclxuICAgICAgICAgICAgdHlwZSA9IFJFV0FSRF9WSURFT19BRF9UWVBFLkFMTDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdmlkZW9fY2JfYXJyYXlbdHlwZV0gPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLl92aWRlb19jYl90YXJnZXRfYXJyYXlbdHlwZV0gPSBjb250ZXh0O1xyXG4gICAgICAgIGlmICh0aGlzLl92aWRlb19hZF9hcnJheVt0eXBlXSkge1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb19hZF9hcnJheVt0eXBlXS5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuinhumikeW5v+WRiuaYvuekuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUucGF1c2UoKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLoh6rliqjmi4nlj5blpLHotKXvvIzph43mlrDmi4nlj5ZcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb19hZF9hcnJheVt0eXBlXS5sb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9fYWRfYXJyYXlbdHlwZV0uc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumHjeaWsOaLieWPlu+8jOinhumikeW5v+WRiuaYvuekuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCh0OiB7IGVyckNvZGU6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YeN5paw5ouJ5Y+W5aSx6LSlXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMTAwNCA9PSB0LmVyckNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiUXXhuqNuZyBjw6FvIGtodXnhur9uIGtow61jaCB2aWRlbyBow7RtIG5heSDEkcOjIMSRxrDhu6NjIHPhu60gZOG7pW5nIGjhur90XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJRdeG6o25nIGPDoW8gY8OzIHRoxrDhu59uZyBi4bqxbmcgdmlkZW8ga2jDtG5nIG3hu58gxJHGsOG7o2NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5zaGFyZV9yZXEoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJRdeG6o25nIGPDoW8gxJHGsOG7o2MgdGjGsOG7n25nIGLhurFuZyB2aWRlbyBjaMawYSDEkcaw4bujYyBraOG7n2kgdOG6oW9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZV9hcHBfYm94X2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh3eC5jcmVhdGVHcmlkQWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXBwX2JveCA9IHd4LmNyZWF0ZUdyaWRBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5fZ3JpZF9hZF9pZCxcclxuICAgICAgICAgICAgICAgIGFkSW50ZXJ2YWxzOiAzMCxcclxuICAgICAgICAgICAgICAgIGFkVGhlbWU6IFwid2hpdGVcIixcclxuICAgICAgICAgICAgICAgIGdyaWRDb3VudDogNSxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMzMCxcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAuOFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FwcF9ib3gub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5qC85a2Q5bm/5ZGK5Yqg6L295oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FwcF9ib3gub25FcnJvcigodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiN5pSv5oyB5qC85a2Q5bm/5ZGK77yM6K+35Y2H57qn5b6u5L+hXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3N1cHBvcnRfYXBwX2JveCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISF3eC5jcmVhdGVHcmlkQWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93X2FwcF9ib3hfYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHd4LmNyZWF0ZUdyaWRBZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXBwX2JveF9sb2FkZWQgJiYgdGhpcy5fYXBwX2JveCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwX2JveC5zaG93KCkuY2F0Y2goKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZV9hcHBfYm94X2FkKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIl9hcHBfYm94X2xvYWRlZDpcIiArIHRoaXMuX2FwcF9ib3hfbG9hZGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiN5pSv5oyB5bm/5ZGK55uS5a2Q77yM6K+35Y2H57qn5b6u5L+hXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZV9pbnRlcnN0aXRpYWxfYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHd4LmNyZWF0ZUludGVyc3RpdGlhbEFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZCA9IHd4LmNyZWF0ZUludGVyc3RpdGlhbEFkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiB0aGlzLl9pbnRlcnN0aXRpYWxfYWRfaWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWQub25FcnJvcigodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lciDlub/lkYrliqDovb3miJDlip9cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWRfbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWQub25DbG9zZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlIGV2ZW50IGVtaXRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkLm9uRXJyb3IoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIiwgdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3N1cHBvcnRfaW50ZXJzdGl0aWFsX2FkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh3eC5jcmVhdGVJbnRlcnN0aXRpYWxBZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzX3N1cHBvcnRfaW50ZXJzdGl0aWFsX2FkOiB0cnVlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzX3N1cHBvcnRfaW50ZXJzdGl0aWFsX2FkOiBmYWxzZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd19pbnRlcnN0aXRpYWxfYWQoY2FsbGJhY2s6IHsgY2FsbDogKGNvbnRleHQ6IGFueSwgbnVtOiBudW1iZXIpID0+IHZvaWQgfSwgY29udGV4dDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ludGVyc3RpdGlhbF9hZCAmJiB0aGlzLl9pbnRlcnN0aXRpYWxfYWRfbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZC5zaG93KCkuY2F0Y2goKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzaG93XCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldF9yYW5rX3ZhbHVlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHtcclxuICAgICAgICAgICAgd3hnYW1lOiB7XHJcbiAgICAgICAgICAgICAgICBzY29yZTogMCxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZV90aW1lOiBNYXRoLmZsb29yKChuZXcgRGF0ZSkuZ2V0VGltZSgpIC8gMWUzKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb3N0X3RpbWU6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV1hNSU5JZ2FtZSBzZXRSYW5rVmFsIGRhdGE6XCIsIG9iamVjdCk7XHJcbiAgICAgICAgd2luZG93Lnd4LnNldFVzZXJDbG91ZFN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBLVkRhdGFMaXN0OiBbe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcImxldmVsXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkob2JqZWN0KVxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmxvZyhcIuS4iuaKpeaOkuihjOaVsOaNrlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X3JhbmtfZGF0YSgpOiBib29sZWFuIHtcclxuICAgICAgICB3aW5kb3cud3guZ2V0T3BlbkRhdGFDb250ZXh0KCkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldF9yYW5rX2Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy53eC5nZXRPcGVuRGF0YUNvbnRleHQoKS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IDk5XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uX3JhbmtfcHJlX3BhZ2VfY2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93Lnd4LmdldE9wZW5EYXRhQ29udGV4dCgpLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogMTAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uX3JhbmtfbmV4dF9wYWdlX2NsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy53eC5nZXRPcGVuRGF0YUNvbnRleHQoKS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IDEwMVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfc2VsZl9yYW5rX2RhdGEoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgd2luZG93Lnd4ICYmIHdpbmRvdy53eC5nZXRPcGVuRGF0YUNvbnRleHQoKS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IDMwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRfc2VsZl9yYW5rX2Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy53eCAmJiB3aW5kb3cud3guZ2V0T3BlbkRhdGFDb250ZXh0KCkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAzMDFcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJfY2FjaGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy53eERvd25sb2FkZXIpIHtcclxuICAgICAgICAgICAgd2luZG93Lnd4RG93bmxvYWRlci5jbGVhbkFsbEFzc2V0cygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbGV0ZSBjYWNoZSBzdWNjZXNzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==