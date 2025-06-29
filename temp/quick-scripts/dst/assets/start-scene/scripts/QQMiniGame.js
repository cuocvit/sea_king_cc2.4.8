
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/QQMiniGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFFRTWluaUdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsWUFBWSxDQUFDOzs7QUFDYixtREFBa0Q7QUFDbEQsNkNBQW1DO0FBQ25DLGlDQUFnQztBQVloQztJQXFCSTtRQUNJLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ2xCLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsR0FBRyxFQUFFLDREQUE0RDtTQUNwRSxDQUFDO0lBQ04sQ0FBQztJQUVELHNCQUFrQixzQkFBUTthQUExQjtZQUNJLElBQUksQ0FBQyxJ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T0FBTyxFQUFFLEdBQUc7U0FDZixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sdUNBQWtCLEdBQXpCO1FBQ0ksTUFBTSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3BELE9BQU8sRUFBRSxHQUFHO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHdDQUFtQixHQUExQjtRQUNJLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNwRCxPQUFPLEVBQUUsR0FBRztTQUNmLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxnQ0FBVyxHQUFsQjtRQUNJLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUNyQixNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUF0Y2Msb0JBQVMsR0FBZSxJQUFJLENBQUM7SUFDOUIsb0JBQVMsR0FBWSxLQUFLLENBQUM7SUFzYzdDLGlCQUFDO0NBeGNELEFBd2NDLElBQUE7QUF4Y1ksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuaW1wb3J0IHsgQ2hhbm5lbE1hbmFnZXIgfSBmcm9tIFwiLi9DaGFubmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgSUFkIH0gZnJvbSBcIi4vVklWT01pbmlHYW1lXCI7XHJcbmltcG9ydCB7IFZEQ2FsbGJhY2sgfSBmcm9tIFwiLi9XWE1pbmlHYW1lXCI7XHJcblxyXG5pbnRlcmZhY2UgU2hhcmUge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIHVybDogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgdHlwZSB7XHJcbiAgICBjYWxsOiAoY29udGV4dDogYW55LCBudW0/OiBudW1iZXIpID0+IGFueVxyXG59XHJcbmV4cG9ydCBjbGFzcyBRUU1pbmlHYW1lIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUVFNaW5pR2FtZSA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFkX2VuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfbWluX2Jhbm5lcl9hZF93aWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYmFubmVyX2FkX2lkX2FycmF5OiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX2NyZWF0ZV9iYW5uZXJfY291bnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3ZpZGVvX2FkX2lkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9pbnRlcnN0aXRpYWxfYWRfaWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2FwcF9ib3hfYWRfaWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2Jhbm5lcl9hZDogSUFkO1xyXG4gICAgcHJpdmF0ZSBfaXNfc2hvd19iYW5uZXJfYWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF92aWRlb19hZDogSUFkO1xyXG4gICAgcHJpdmF0ZSBfdmlkZW9fY2I6IFZEQ2FsbGJhY2s7XHJcbiAgICBwcml2YXRlIF92aWRlb19jYl90YXJnZXQ6IENoYW5uZWxNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBfaW50ZXJzdGl0aWFsX2FkOiBJQWQ7XHJcbiAgICBwcml2YXRlIF9pbnRlcnN0aXRpYWxfYWRfbG9hZGVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfYXBwX2JveDogSUFkO1xyXG4gICAgcHJpdmF0ZSBfYXBwX2JveF9sb2FkZWQ6IGJvb2xlYW5cclxuICAgIHByaXZhdGUgX3NoYXJlX2FycmF5OiBTaGFyZVtdO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdF9zaGFyZTogU2hhcmU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbWluX2Jhbm5lcl9hZF93aWR0aCA9IDMwMDtcclxuICAgICAgICB0aGlzLl9iYW5uZXJfYWRfaWRfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVfYmFubmVyX2NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl92aWRlb19hZF9pZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkX2lkID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9hcHBfYm94X2FkX2lkID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9iYW5uZXJfYWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2lzX3Nob3dfYmFubmVyX2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmlkZW9fYWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvX2NiID0gbnVsbDtcclxuICAgICAgICB0aGlzLl92aWRlb19jYl90YXJnZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkX2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2FwcF9ib3ggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2FwcF9ib3hfbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0X3NoYXJlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogXCLkur/kuIflj6rlg7XlsLjvvIzlhajmlrDloZTpmLLlvI/mnqrmiJjmuLjmiI9cIixcclxuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RucmVzLnFzemhnLjZod2FuLmNvbS90b3dlcl9zaG9vdC9zaGFyZS8xLmpwZz92PTFcIlxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogUVFNaW5pR2FtZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBRUU1pbmlHYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgbG9hZF9jaGFubmVsX2VudihjYWxsOiAoKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgd2luZG93LnFxLm9uSGlkZSgoKSA9PiB7IH0pO1xyXG4gICAgICAgIHdpbmRvdy5xcS5vblNob3coKCkgPT4geyB9KTtcclxuICAgICAgICB0aGlzLl9iYW5uZXJfYWRfaWRfYXJyYXkgPSBbXCIyZjhhYzJmZmMzM2I3ZTUyOWE5MTIwNTdiY2ZiOWNjZFwiLCBcIjYwNDE3NzU3ZGU4ZDY1ZTI2ZTdlOGUzOTBmZTllMDZiXCIsIFwiYzBkMzYzZGYwOWE3Y2UyMjliNjE5YjYxMDJkZTYwYWRcIiwgXCIyZWVkMzU0YWY2ZjVlODZmYzczYWVmMmYyMmNlNzY0NlwiLCBcImMwNzViNzkyZGVjZjg0YjJlZWYwM2EyMDk3MzRhNzkzXCJdO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvX2FkX2lkID0gXCJmMTNkMDNmYjRiMWNmN2JlNTY5MzE0OTg1NDlhYzQ5ZFwiO1xyXG4gICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZF9pZCA9IFwiZDM0ZDkzOGYyODYwMzIwNWVjZjg4OWFlNTc3YzNjMjFcIjtcclxuICAgICAgICB0aGlzLl9hcHBfYm94X2FkX2lkID0gXCIxMGNmZWY4MzJjOTY2NjQ2Y2Y3NTI5NWU3ZDA4MzY2NlwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicXFcIiArIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5xcSkpO1xyXG4gICAgICAgIHdpbmRvdy5xcS5sb2dpbih7fSk7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVfYXJyYXkgPSBDaGFubmVsTWFuYWdlci5TSEFSRV9DT05GSUcuc2hhcmVfYXJyYXk7XHJcbiAgICAgICAgdGhpcy5zaG93X3NoYXJlX21lbnUoKTtcclxuICAgICAgICBjYWxsKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc19yYW5rKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNfc2hhcmUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc192aWRlb19zaGFyZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93X3NoYXJlX21lbnUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgd2luZG93LnFxLnNob3dTaGFyZU1lbnUoe30pO1xyXG4gICAgICAgIHdpbmRvdy5xcS5vblNoYXJlQXBwTWVzc2FnZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoYXJlRGF0YSA9IDAgPT0gdGhpcy5fc2hhcmVfYXJyYXkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMuX2RlZmF1bHRfc2hhcmVcclxuICAgICAgICAgICAgICAgIDogdGhpcy5fc2hhcmVfYXJyYXlbVXRpbHMubWF0aF9yYW5kb20odHJ1ZSwgMCwgdGhpcy5fc2hhcmVfYXJyYXkubGVuZ3RoKV07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHNoYXJlRGF0YS50aXRsZSxcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBzaGFyZURhdGEudXJsLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui9rOWPkeaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbCBxcSBvblNoYXJlQXBwTWVzc2FnZVwiICsgdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRfc3ViX3BhY2thZ2VzX2VudihjYWxsOiAoKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY2FsbCgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYW5hbHl6ZVVybFByYW0oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9hcHBfbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBDaGFubmVsTWFuYWdlci5BUFBfUVE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpYnJhdGVfc2hvcnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHFxLnZpYnJhdGVTaG9ydCkge1xyXG4gICAgICAgICAgICBxcS52aWJyYXRlU2hvcnQoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiICsgdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlicmF0ZVNob3J06LCD55So5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpYnJhdGVfbG9uZygpOiB2b2lkIHtcclxuICAgICAgICBpZiAocXEudmlicmF0ZUxvbmcpIHtcclxuICAgICAgICAgICAgcXEudmlicmF0ZUxvbmcoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiICsgdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlicmF0ZUxvbmfosIPnlKjlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNfc3VwcG9ydF9tb3JlX2dhbWUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIFwiaW9zXCIgIT0gd2luZG93LnFxLmdldFN5c3RlbUluZm9TeW5jKCkucGxhdGZvcm0gJiYgISEod2luZG93LnFxLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSAmJiB3aW5kb3cucXEub25OYXZpZ2F0ZVRvTWluaVByb2dyYW0gJiYgd2luZG93LnFxLnNob3dNb3JlR2FtZXNNb2RhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfbW9yZV9nYW1lKGNhbGxiYWNrOiB0eXBlLCBjb250ZXh0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc19zdXBwb3J0X21vcmVfZ2FtZSkge1xyXG4gICAgICAgICAgICB3aW5kb3cucXEub25Nb3JlR2FtZXNNb2RhbENsb3NlKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vZGFsIGNsb3NlZFwiLCB0KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5xcS5vbk5hdmlnYXRlVG9NaW5pUHJvZ3JhbSgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codC5lcnJDb2RlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHQuZXJyTXNnKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5xcS5zaG93TW9yZUdhbWVzTW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgYXBwTGF1bmNoT3B0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiLCB0LmVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxcIiwgdC5lcnJNc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNoYXJlX3JlcShjYWxsYmFjazogdHlwZSwgY29udGV4dDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3Qgc2hhcmVEYXRhID0gMCA9PSB0aGlzLl9zaGFyZV9hcnJheS5sZW5ndGhcclxuICAgICAgICAgICAgPyB0aGlzLl9kZWZhdWx0X3NoYXJlXHJcbiAgICAgICAgICAgIDogdGhpcy5fc2hhcmVfYXJyYXlbVXRpbHMubWF0aF9yYW5kb20odHJ1ZSwgMCwgdGhpcy5fc2hhcmVfYXJyYXkubGVuZ3RoKV07XHJcbiAgICAgICAgaWYgKHdpbmRvdy5xcS5zaGFyZUFwcE1lc3NhZ2UgJiYgc2hhcmVEYXRhKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5xcS5zaGFyZUFwcE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHNoYXJlRGF0YS50aXRsZSxcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBzaGFyZURhdGEudXJsLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui9rOWPkeWIsOe+pOeahOe7k+aenFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0KTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9naW5SZXBvcnQoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZV9iYW5uZXJfYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5xcSkge1xyXG4gICAgICAgICAgICBjb25zdCBTeXN0ZW1JbmZvID0gd2luZG93LnFxLmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gU3lzdGVtSW5mby53aW5kb3dXaWR0aDtcclxuICAgICAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gU3lzdGVtSW5mby53aW5kb3dIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bSA9IHRoaXMuX2NyZWF0ZV9iYW5uZXJfY291bnQgJSB0aGlzLl9iYW5uZXJfYWRfaWRfYXJyYXkubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVCYW5uZXJBZCA9IHdpbmRvdy5xcS5jcmVhdGVCYW5uZXJBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5fYmFubmVyX2FkX2lkX2FycmF5W251bV0sXHJcbiAgICAgICAgICAgICAgICBhZEludGVydmFsczogNDAsXHJcbiAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLl9taW5fYmFubmVyX2FkX3dpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogd2luZG93SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh3aW5kb3dXaWR0aCAtIHRoaXMuX21pbl9iYW5uZXJfYWRfd2lkdGgpIC8gMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9iYW5uZXJfYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lcl9hZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lcl9hZCA9IGNyZWF0ZUJhbm5lckFkO1xyXG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJfYWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFubmVyIGFkIGlkOlwiICsgdGhpcy5fYmFubmVyX2FkX2lkX2FycmF5W251bV0gKyBcIiBvbkxvYWRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNfc2hvd19iYW5uZXJfYWQgJiYgY3JlYXRlQmFubmVyQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVCYW5uZXJBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc19zaG93X2Jhbm5lcl9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlub/lkYrmmL7npLrmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVCYW5uZXJBZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuaYvuekuuaFouS6hu+8jOS4jemcgOimgeaYvuekuuS6hlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK57uE5Lu25Ye6546w6Zeu6aKYXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZUJhbm5lckFkLm9uUmVzaXplKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVCYW5uZXJBZC5zdHlsZS5sZWZ0ID0gKHdpbmRvd1dpZHRoIC0gdC53aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlQmFubmVyQWQuc3R5bGUudG9wID0gd2luZG93SGVpZ2h0IC0gdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lcl9hZC5vblJlc2l6ZTpcIiwgdC53aWR0aCwgdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2V0RGV2aWNlUGl4ZWxSYXRpbyA9IGNjLnZpZXcuZ2V0RGV2aWNlUGl4ZWxSYXRpbygpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2V0U2NhbGVYID0gY2Mudmlldy5nZXRTY2FsZVgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lciBuZWVkIGRlc2lnbiBzaXplOlwiLCB0LndpZHRoICogZ2V0RGV2aWNlUGl4ZWxSYXRpbyAvIGdldFNjYWxlWCwgdC5oZWlnaHQgKiBnZXREZXZpY2VQaXhlbFJhdGlvIC8gZ2V0U2NhbGVYKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVfYmFubmVyX2NvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X2Jhbm5lcl9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc19zaG93X2Jhbm5lcl9hZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfYmFubmVyX2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVfYmFubmVyX2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzX3Nob3dfYmFubmVyX2FkID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgYmFubmVyID0gdGhpcy5fYmFubmVyX2FkO1xyXG4gICAgICAgIGlmIChiYW5uZXIpIHtcclxuICAgICAgICAgICAgYmFubmVyLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZV92aWRlb19hZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB3aW5kb3cucXEuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvX2FkID0gd2luZG93LnFxLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5fdmlkZW9fYWRfaWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb19hZC5vbkNsb3NlKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodC5pc0VuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop4bpopHlub/lkYrop4LnnIvlrozmiJBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9fY2IuYXBwbHkodGhpcy5fdmlkZW9fY2JfdGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop4bpopHlub/lkYrop4LnnIvkuK3mlq1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJRdeG6o25nIGPDoW8gdmlkZW8gYuG7iyBnacOhbiDEkW/huqFuLCBraMO0bmcgY8OzIHBo4bqnbiB0aMaw4bufbmdcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLnJlc3VtZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfdmlkZW9fYWQoY2FsbDogKCkgPT4gdm9pZCwgY2hhbmVsOiBDaGFubmVsTWFuYWdlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvX2NiID0gY2FsbDtcclxuICAgICAgICB0aGlzLl92aWRlb19jYl90YXJnZXQgPSBjaGFuZWw7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ZpZGVvX2FkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvX2FkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6KeG6aKR5bm/5ZGK5pi+56S65oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuinhumikeaJi+WKqOWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvX2FkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumHjeivle+8jOinhumikeW5v+WRiuaYvuekuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YeN6K+V77yM6KeG6aKR5bm/5ZGK57uE5Lu25Ye6546w6Zeu6aKYXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgxMDA0ID09IHQuZXJyQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIlF14bqjbmcgY8OhbyBraHV54bq/biBraMOtY2ggdmlkZW8gbmfDoHkgbmF5IMSRw6MgxJHGsOG7o2Mgc+G7rSBk4bulbmcgaOG6v3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJRdeG6o25nIGPDoW8gY8OzIHRoxrDhu59uZyBi4bqxbmcgdmlkZW8ga2jDtG5nIG3hu58gxJHGsOG7o2NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJRdeG6o25nIGPDoW8gxJHGsOG7o2MgdGjGsOG7n25nIGLhurFuZyB2aWRlbyBjaMawYSDEkcaw4bujYyBraOG7n2kgdOG6oW9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVfYXBwX2JveF9hZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAocXEuY3JlYXRlQXBwQm94KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FwcF9ib3ggPSBxcS5jcmVhdGVBcHBCb3goe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuX2FwcF9ib3hfYWRfaWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hcHBfYm94LmxvYWQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FwcF9ib3hfbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuI3mlK/mjIHlub/lkYrnm5LlrZDvvIzor7fljYfnuqdRUVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc19zdXBwb3J0X2FwcF9ib3goKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhcXEuY3JlYXRlQXBwQm94O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X2FwcF9ib3hfYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHFxLmNyZWF0ZUFwcEJveCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXBwX2JveF9sb2FkZWQgJiYgdGhpcy5fYXBwX2JveCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwX2JveC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwX2JveF9sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pi+56S65bm/5ZGK55uS5a2QXCIpXHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVfYXBwX2JveF9hZCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJfYXBwX2JveF9sb2FkZWQ6XCIgKyB0aGlzLl9hcHBfYm94X2xvYWRlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4jeaUr+aMgeW5v+WRiuebkuWtkO+8jOivt+WNh+e6p1FRXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZV9pbnRlcnN0aXRpYWxfYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHFxLmNyZWF0ZUludGVyc3RpdGlhbEFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZCA9IHdpbmRvdy5xcS5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5faW50ZXJzdGl0aWFsX2FkX2lkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkLmxvYWQoKS5jYXRjaCgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImxvYWRcIiwgdClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZF9sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZC5vbkNsb3NlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xvc2UgZXZlbnQgZW1pdFwiKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZC5vbkVycm9yKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIHQpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3N1cHBvcnRfaW50ZXJzdGl0aWFsX2FkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChxcS5jcmVhdGVJbnRlcnN0aXRpYWxBZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzX3N1cHBvcnRfaW50ZXJzdGl0aWFsX2FkOiB0cnVlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzX3N1cHBvcnRfaW50ZXJzdGl0aWFsX2FkOiBmYWxzZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd19pbnRlcnN0aXRpYWxfYWQoY2FsbGJhY2s6IHR5cGUsIGNvbnRleHQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnN0aXRpYWxfYWQgJiYgdGhpcy5faW50ZXJzdGl0aWFsX2FkX2xvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrmmL7npLrmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2hvd1wiLCB0KTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRfcmFua192YWx1ZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBvYmplY3QgPSB7XHJcbiAgICAgICAgICAgIHFxZ2FtZToge1xyXG4gICAgICAgICAgICAgICAgc2NvcmU6IDAsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVfdGltZTogTWF0aC5mbG9vcigobmV3IERhdGUpLmdldFRpbWUoKSAvIDFlMylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29zdF90aW1lOiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2luZG93LnFxLnNldFVzZXJDbG91ZFN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBLVkRhdGFMaXN0OiBbe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcImxldmVsXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkob2JqZWN0KVxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmxvZyhcIuS4iuaKpeaOkuihjOaVsOaNrlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X3JhbmtfZGF0YSgpOiBib29sZWFuIHtcclxuICAgICAgICB3aW5kb3cucXEuZ2V0T3BlbkRhdGFDb250ZXh0KCkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAxXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldF9yYW5rX2Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5xcS5nZXRPcGVuRGF0YUNvbnRleHQoKS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IDk5XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uX3JhbmtfcHJlX3BhZ2VfY2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LnFxLmdldE9wZW5EYXRhQ29udGV4dCgpLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogMTAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uX3JhbmtfbmV4dF9wYWdlX2NsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5xcS5nZXRPcGVuRGF0YUNvbnRleHQoKS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IDEwMVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfc2VsZl9yYW5rX2RhdGEoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgd2luZG93LnFxICYmIHdpbmRvdy5xcS5nZXRPcGVuRGF0YUNvbnRleHQoKS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IDMwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRfc2VsZl9yYW5rX2Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5xcSAmJiB3aW5kb3cucXEuZ2V0T3BlbkRhdGFDb250ZXh0KCkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAzMDFcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJfY2FjaGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy53eERvd25sb2FkZXIpIHtcclxuICAgICAgICAgICAgd2luZG93Lnd4RG93bmxvYWRlci5jbGVhbkFsbEFzc2V0cygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbGV0ZSBjYWNoZSBzdWNjZXNzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==