"use strict";
cc._RF.push(module, '33e9ewPfCRGkoNOHMAYpqEU', 'QQMiniGame');
// start-scene/scripts/QQMiniGame.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QQMiniGame = void 0;
var ChannelManager_1 = require("./ChannelManager");
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var QQMiniGame = /** @class */ (function () {
    function QQMiniGame() {
        this._min_banner_ad_width = 300;
        this._banner_ad_id_array = [];
        this._create_banner_count = 0;
        this._video_ad_id = "";
        this._interstitial_ad_id = "";
        this._app_box_ad_id = "";
        this._banner_ad = null;
        this._is_show_banner_ad = false;
        this._video_ad = null;
        this._video_cb = null;
        this._video_cb_target = null;
        this._interstitial_ad = null;
        this._interstitial_ad_loaded = false;
        this._app_box = null;
        this._app_box_loaded = false;
        this._share_array = [];
        this._default_share = {
            title: "亿万只僵尸，全新塔防式枪战游戏",
            url: "https://cdnres.qszhg.6hwan.com/tower_shoot/share/1.jpg?v=1"
        };
    }
    Object.defineProperty(QQMiniGame, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new QQMiniGame;
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    QQMiniGame.prototype.load_channel_env = function (call) {
        window.qq.onHide(function () { });
        window.qq.onShow(function () { });
        this._banner_ad_id_array = ["2f8ac2ffc33b7e529a912057bcfb9ccd", "60417757de8d65e26e7e8e390fe9e06b", "c0d363df09a7ce229b619b6102de60ad", "2eed354af6f5e86fc73aef2f22ce7646", "c075b792decf84b2eef03a209734a793"];
        this._video_ad_id = "f13d03fb4b1cf7be56931498549ac49d";
        this._interstitial_ad_id = "d34d938f28603205ecf889ae577c3c21";
        this._app_box_ad_id = "10cfef832c966646cf75295e7d083666";
        console.log("qq" + JSON.stringify(window.qq));
        window.qq.login({});
        this._share_array = ChannelManager_1.ChannelManager.SHARE_CONFIG.share_array;
        this.show_share_menu();
        call();
        return true;
    };
    Object.defineProperty(QQMiniGame.prototype, "is_rank", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QQMiniGame.prototype, "is_share", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QQMiniGame.prototype, "is_video_share", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    QQMiniGame.prototype.show_share_menu = function () {
        var _this = this;
        window.qq.showShareMenu({});
        window.qq.onShareAppMessage(function () {
            var shareData = 0 == _this._share_array.length
                ? _this._default_share
                : _this._share_array[Utils_1.Utils.math_random(true, 0, _this._share_array.length)];
            return {
                title: shareData.title,
                imageUrl: shareData.url,
                success: function (t) {
                    console.log("转发成功");
                    console.log(t);
                },
                fail: function (t) {
                    console.log("fail qq onShareAppMessage" + t);
                }
            };
        });
        return true;
    };
    QQMiniGame.prototype.load_sub_packages_env = function (call) {
        call();
        return true;
    };
    QQMiniGame.prototype.analyzeUrlPram = function () {
        return true;
    };
    QQMiniGame.prototype.get_app_name = function () {
        return ChannelManager_1.ChannelManager.APP_QQ;
    };
    QQMiniGame.prototype.vibrate_short = function () {
        if (qq.vibrateShort) {
            qq.vibrateShort({
                success: function (t) {
                    console.log("" + t);
                },
                fail: function () {
                    console.log("vibrateShort调用失败");
                }
            });
        }
    };
    QQMiniGame.prototype.vibrate_long = function () {
        if (qq.vibrateLong) {
            qq.vibrateLong({
                success: function (t) {
                    console.log("" + t);
                },
                fail: function () {
                    console.log("vibrateLong调用失败");
                }
            });
        }
    };
    Object.defineProperty(QQMiniGame.prototype, "is_support_more_game", {
        get: function () {
            return "ios" != window.qq.getSystemInfoSync().platform && !!(window.qq.navigateToMiniProgram && window.qq.onNavigateToMiniProgram && window.qq.showMoreGamesModal);
        },
        enumerable: false,
        configurable: true
    });
    QQMiniGame.prototype.show_more_game = function (callback, context) {
        if (this.is_support_more_game) {
            window.qq.onMoreGamesModalClose(function (t) {
                console.log("modal closed", t);
            });
            window.qq.onNavigateToMiniProgram(function (t) {
                console.log(t.errCode);
                console.log(t.errMsg);
            });
            window.qq.showMoreGamesModal({
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
    QQMiniGame.prototype.share_req = function (callback, context) {
        var shareData = 0 == this._share_array.length
            ? this._default_share
            : this._share_array[Utils_1.Utils.math_random(true, 0, this._share_array.length)];
        if (window.qq.shareAppMessage && shareData) {
            window.qq.shareAppMessage({
                title: shareData.title,
                imageUrl: shareData.url,
                success: function (t) {
                    console.log("转发到群的结果");
                    console.log(t);
                    callback.call(context);
                },
                fail: function (t) {
                    console.log(t);
                }
            });
        }
        return true;
    };
    QQMiniGame.prototype.loginReport = function () { };
    QQMiniGame.prototype.create_banner_ad = function () {
        var _this = this;
        if (window.qq) {
            var SystemInfo = window.qq.getSystemInfoSync();
            var windowWidth_1 = SystemInfo.windowWidth;
            var windowHeight_1 = SystemInfo.windowHeight;
            var num_1 = this._create_banner_count % this._banner_ad_id_array.length;
            var createBannerAd_1 = window.qq.createBannerAd({
                adUnitId: this._banner_ad_id_array[num_1],
                adIntervals: 40,
                style: {
                    width: this._min_banner_ad_width,
                    top: windowHeight_1,
                    left: (windowWidth_1 - this._min_banner_ad_width) / 2
                }
            });
            if (this._banner_ad) {
                this._banner_ad.destroy();
            }
            this._banner_ad = createBannerAd_1;
            this._banner_ad.onLoad(function () {
                console.log("banner ad id:" + _this._banner_ad_id_array[num_1] + " onLoad");
                if (_this._is_show_banner_ad && createBannerAd_1) {
                    createBannerAd_1.show().then(function () {
                        if (_this._is_show_banner_ad) {
                            console.log("广告显示成功");
                        }
                        else {
                            createBannerAd_1.destroy();
                            console.log("广告显示慢了，不需要显示了");
                        }
                    }).catch(function (t) {
                        console.log("广告组件出现问题", t);
                    });
                }
            });
            createBannerAd_1.onResize(function (t) {
                createBannerAd_1.style.left = (windowWidth_1 - t.width) / 2;
                createBannerAd_1.style.top = windowHeight_1 - t.height;
                console.log("banner_ad.onResize:", t.width, t.height);
                var getDevicePixelRatio = cc.view.getDevicePixelRatio();
                var getScaleX = cc.view.getScaleX();
                console.log("banner need design size:", t.width * getDevicePixelRatio / getScaleX, t.height * getDevicePixelRatio / getScaleX);
            });
            this._create_banner_count++;
        }
    };
    QQMiniGame.prototype.show_banner_ad = function () {
        this._is_show_banner_ad = true;
        this.create_banner_ad();
    };
    QQMiniGame.prototype.hide_banner_ad = function () {
        this._is_show_banner_ad = false;
        var banner = this._banner_ad;
        if (banner) {
            banner.destroy();
        }
    };
    QQMiniGame.prototype.create_video_ad = function () {
        var _this = this;
        if (null != window.qq.createRewardedVideoAd) {
            this._video_ad = window.qq.createRewardedVideoAd({
                adUnitId: this._video_ad_id
            });
            this._video_ad.onClose(function (t) {
                if (t.isEnded) {
                    console.log("视频广告观看完成");
                    _this._video_cb.apply(_this._video_cb_target);
                }
                else {
                    console.log("视频广告观看中断");
                    GameManager_1.gm.ui.show_notice("Quảng cáo video bị gián đoạn, không có phần thưởng");
                }
                cc.game.resume();
            });
        }
    };
    QQMiniGame.prototype.show_video_ad = function (call, chanel) {
        var _this = this;
        this._video_cb = call;
        this._video_cb_target = chanel;
        if (this._video_ad) {
            this._video_ad.show().then(function () {
                console.log("视频广告显示成功");
                cc.game.pause();
            }).catch(function () {
                console.log("视频手动加载成功");
                _this._video_ad.show().then(function () {
                    console.log("重试，视频广告显示成功");
                    cc.game.pause();
                }).catch(function (t) {
                    console.log("重试，视频广告组件出现问题", t);
                    if (1004 == t.errCode) {
                        GameManager_1.gm.ui.show_notice("Quảng cáo khuyến khích video ngày nay đã được sử dụng hết");
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
    QQMiniGame.prototype.create_app_box_ad = function () {
        var _this = this;
        if (qq.createAppBox) {
            this._app_box = qq.createAppBox({
                adUnitId: this._app_box_ad_id
            });
            this._app_box.load().then(function () {
                _this._app_box_loaded = true;
            }).catch(function (t) {
                console.error(t);
            });
        }
        else {
            console.log("不支持广告盒子，请升级QQ");
        }
    };
    Object.defineProperty(QQMiniGame.prototype, "is_support_app_box", {
        get: function () {
            return !!qq.createAppBox;
        },
        enumerable: false,
        configurable: true
    });
    QQMiniGame.prototype.show_app_box_ad = function () {
        var _this = this;
        if (qq.createAppBox) {
            if (this._app_box_loaded && this._app_box) {
                this._app_box.show().then(function () {
                    _this._app_box_loaded = true;
                    console.log("显示广告盒子");
                }).catch(function (t) {
                    console.error(t);
                });
            }
            else {
                this.create_app_box_ad();
                console.log("_app_box_loaded:" + this._app_box_loaded);
            }
        }
        else {
            console.log("不支持广告盒子，请升级QQ");
        }
    };
    QQMiniGame.prototype.create_interstitial_ad = function () {
        var _this = this;
        if (qq.createInterstitialAd) {
            this._interstitial_ad = window.qq.createInterstitialAd({
                adUnitId: this._interstitial_ad_id
            });
            this._interstitial_ad.load().catch(function (t) {
                console.error("load", t);
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
    Object.defineProperty(QQMiniGame.prototype, "is_support_interstitial_ad", {
        get: function () {
            if (qq.createInterstitialAd) {
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
    QQMiniGame.prototype.show_interstitial_ad = function (callback, context) {
        if (this._interstitial_ad && this._interstitial_ad_loaded) {
            this._interstitial_ad.show().then(function () {
                console.log("插屏广告显示成功");
                if (callback && context) {
                    callback.call(context, 0);
                }
            }).catch(function (t) {
                console.error("show", t);
                if (callback && context) {
                    callback.call(context, 1);
                }
            });
        }
    };
    QQMiniGame.prototype.set_rank_value = function () {
        var object = {
            qqgame: {
                score: 0,
                update_time: Math.floor((new Date).getTime() / 1e3)
            },
            cost_time: 0
        };
        window.qq.setUserCloudStorage({
            KVDataList: [{
                    key: "level",
                    value: JSON.stringify(object)
                }]
        });
        cc.log("上报排行数据");
    };
    QQMiniGame.prototype.get_rank_data = function () {
        window.qq.getOpenDataContext().postMessage({
            message: 1
        });
        return true;
    };
    QQMiniGame.prototype.set_rank_close = function () {
        window.qq.getOpenDataContext().postMessage({
            message: 99
        });
    };
    QQMiniGame.prototype.on_rank_pre_page_click = function () {
        window.qq.getOpenDataContext().postMessage({
            message: 100
        });
    };
    QQMiniGame.prototype.on_rank_next_page_click = function () {
        window.qq.getOpenDataContext().postMessage({
            message: 101
        });
    };
    QQMiniGame.prototype.get_self_rank_data = function () {
        window.qq && window.qq.getOpenDataContext().postMessage({
            message: 300
        });
        return true;
    };
    QQMiniGame.prototype.set_self_rank_close = function () {
        window.qq && window.qq.getOpenDataContext().postMessage({
            message: 301
        });
    };
    QQMiniGame.prototype.clear_cache = function () {
        if (window.wxDownloader) {
            window.wxDownloader.cleanAllAssets();
            console.log("delete cache success");
        }
    };
    QQMiniGame._instance = null;
    QQMiniGame.ad_enable = false;
    return QQMiniGame;
}());
exports.QQMiniGame = QQMiniGame;

cc._RF.pop();