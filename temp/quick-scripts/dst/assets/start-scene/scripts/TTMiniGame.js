
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TTMiniGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '81570hUbvVP5YzVRNosVg2I', 'TTMiniGame');
// start-scene/scripts/TTMiniGame.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTMiniGame = void 0;
var GameManager_1 = require("./GameManager");
var ChannelManager_1 = require("./ChannelManager");
var Utils_1 = require("./Utils");
var NetUtils_1 = require("./NetUtils");
var Timer_1 = require("./Timer");
var TTMiniGame = /** @class */ (function () {
    function TTMiniGame() {
        this._min_banner_ad_width = 256;
        this._banner_ad_id_array = [];
        this._video_ad_id_array = [];
        this._interstitial_ad_id = "";
        this._interstitial_ad_is_show = 0;
        this._banner_ad_array = [];
        this._banner_ad_flag_array = [!1];
        this._banner_ad_loaded_array = [!1];
        this._video_ad_array = [];
        this._video_cb_array = [];
        this._video_cb_target_array = [];
        this._video_close_cb_array = [];
        this._video_close_cb_target_array = [];
        this._interstitial_ad = null;
        this._share_id_array = [];
        this._default_share_id = "2ip9crt1fbw93ouomc";
        this._share_config_url = "";
        this._record_start_time = 0;
        this._record_end_time = 0;
        this._is_share_record_video = !1;
        this._is_restart = !1;
        this._if_need_video_share = !1;
        this._video_path = "";
        this._follow_name = "follow.png";
        this._follow_btn_stat = !1;
        this.userOpenId = "";
        this._share_title_array = ["海王就是我"];
        this._douYinFollowBtnStat = "0";
        this.code = "";
        this.last_call_show_video_ad = 0;
        this._timer = new Timer_1.Timer;
    }
    Object.defineProperty(TTMiniGame, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new TTMiniGame;
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    TTMiniGame.prototype.load_channel_env = function (call) {
        if (this.canvasResize(), window.tt) {
            window.tt.onHide(function () { });
            window.tt.onShow(function () { });
            this._banner_ad_id_array[i.BANNER_AD_TYPE.ALL] = "7f8ah33f9im064g0k0";
            this._video_ad_id_array[i.REWARD_VIDEO_AD_TYPE.ALL] = "54mbll5521bl2nc900";
            this._interstitial_ad_id = "2q94tj02hmdl6k9jfd";
            console.log("tt" + JSON.stringify(window.tt));
            this._share_id_array = ChannelManager_1.ChannelManager.SHARE_CONFIG.share_id_array;
            this.load_share_config();
            call();
            this.loginVerify();
            return true;
        }
    };
    TTMiniGame.prototype.get_code = function (call) {
        var _this = this;
        window.tt.login({
            force: false,
            success: function (t) {
                if (t.isLogin && t.code) {
                    _this.code = t.code;
                    call(_this.code, 0);
                }
                else if (!t.isLogin && t.anonymousCode) {
                    _this.code = t.anonymousCode;
                    call(_this.code, 1);
                }
            },
            fail: function () {
                console.log("login调用失败");
            }
        });
    };
    TTMiniGame.prototype.load_sub_packages_env = function (call) {
        call();
        return true;
    };
    TTMiniGame.prototype.get_app_name = function () {
        if (window.tt && window.tt.getSystemInfoSync) {
            return window.tt.getSystemInfoSync().appName;
        }
        else {
            return ChannelManager_1.ChannelManager.UNKNOWN;
        }
    };
    Object.defineProperty(TTMiniGame.prototype, "is_rank", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TTMiniGame.prototype, "is_share", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TTMiniGame.prototype, "is_video_share", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    TTMiniGame.prototype.vibrate_short = function () {
        tt.vibrateShort && tt.vibrateShort({
            success: function (t) {
                console.log("" + t);
            },
            fail: function () {
                console.log("vibrateShort调用失败");
            }
        });
    };
    TTMiniGame.prototype.vibrate_long = function () {
        tt.vibrateLong && tt.vibrateLong({
            success: function (t) {
                console.log("" + t);
            },
            fail: function () {
                console.log("vibrateLong调用失败");
            }
        });
    };
    Object.defineProperty(TTMiniGame.prototype, "is_support_more_game", {
        get: function () {
            return "ios" != window.tt.getSystemInfoSync().platform && !!(window.tt.onMoreGamesModalClose && window.tt.onNavigateToMiniProgram && window.tt.showMoreGamesModal);
        },
        enumerable: false,
        configurable: true
    });
    TTMiniGame.prototype.show_more_game = function (callback, context) {
        if (this.is_support_more_game) {
            window.tt.onMoreGamesModalClose(function (t) {
                console.log("modal closed", t);
            });
            window.tt.onNavigateToMiniProgram(function (t) {
                console.log(t.errCode), console.log(t.errMsg);
            });
            window.tt.showMoreGamesModal({
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
    Object.defineProperty(TTMiniGame.prototype, "is_support_interstitial_ad", {
        get: function () {
            if ("devtools" != this.get_app_name() && tt.createInterstitialAd) {
                console.log("is_support_interstitial_ad  createInterstitialAd: true");
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
    TTMiniGame.prototype.show_interstitial_ad = function (callback, context) {
        var _this = this;
        if (this.is_support_interstitial_ad) {
            if (0 == this._interstitial_ad_is_show || 2 == this._interstitial_ad_is_show) {
                if (2 == this._interstitial_ad_is_show) {
                    this._interstitial_ad.destroy();
                }
                this._interstitial_ad_is_show = 0;
                this._interstitial_ad = tt.createInterstitialAd({
                    adUnitId: this._interstitial_ad_id
                });
                this._interstitial_ad.onLoad(function () {
                    _this._interstitial_ad_is_show = 1;
                    _this._interstitial_ad.show().then(function () {
                        _this._interstitial_ad_is_show = 2;
                        console.log("插屏广告展示成功");
                        if (callback && context) {
                            callback.call(context, 0);
                        }
                    }).catch(function () {
                        if (callback && context) {
                            callback.call(context, 1);
                        }
                    });
                });
                this._interstitial_ad.onError(function (t) {
                    console.log("errCode:" + t.errCode + " errMsg:" + t.errMsg);
                    if (callback && context) {
                        callback.call(context, 1);
                    }
                });
            }
            else if (1 == this._interstitial_ad_is_show) {
                this._interstitial_ad.onLoad(function () {
                    _this._interstitial_ad_is_show = 1;
                    _this._interstitial_ad.show().then(function () {
                        _this._interstitial_ad_is_show = 2;
                        console.log("插屏广告展示成功");
                        if (callback && context) {
                            callback.call(context, 0);
                        }
                    }).catch(function () {
                        if (callback && context) {
                            callback.call(context, 1);
                        }
                    });
                });
                this._interstitial_ad.onError(function (t) {
                    console.log("errCode:" + t.errCode + " errMsg:" + t.errMsg);
                    if (callback && context) {
                        callback.call(context, 1);
                    }
                });
                this._interstitial_ad.load();
            }
        }
        else {
            if (callback && context) {
                callback.call(context, 1);
            }
        }
    };
    TTMiniGame.prototype.loginVerify = function () {
        tt.showShareMenu({
            withShareTicket: false
        });
        tt.onShareAppMessage(function () {
            return {
                title: "海王就是我",
                imageUrl: "https://cdnres.qszhg.6hwan.com/tower_shoot/share/4.jpg",
                query: "",
                success: function (t) {
                    console.log("转发成功"), console.log(t);
                },
                fail: function (t) {
                    console.log("fail tt onShareAppMessage" + t);
                }
            };
        });
        return true;
    };
    TTMiniGame.prototype.share_req = function (callback, context) {
        if (window.tt) {
            var share = 0 == this._share_id_array.length
                ? this._default_share_id
                : this._share_id_array[Utils_1.Utils.math_random(true, 0, this._share_id_array.length)];
            window.tt.shareAppMessage({
                templateId: share,
                query: "",
                success: function () {
                    console.log("分享成功");
                    callback.call(context);
                },
                fail: function () {
                    console.log("分享失败");
                }
            });
        }
        return true;
    };
    TTMiniGame.prototype.create_banner_ad = function () {
        var _this = this;
        if (window.tt) {
            var systemInfo = window.tt.getSystemInfoSync();
            var windowWidth_1 = systemInfo.windowWidth;
            var windowHeight_1 = systemInfo.windowHeight;
            var _loop_1 = function (index) {
                (function () {
                    var i = index;
                    var banner = _this._banner_ad_id_array[i];
                    if (null != banner && "" != banner) {
                        var createBanner_1 = window.tt.createBannerAd({
                            adUnitId: banner,
                            adIntervals: 30,
                            style: {
                                width: _this._min_banner_ad_width,
                                top: windowHeight_1,
                                left: (windowWidth_1 - _this._min_banner_ad_width) / 2
                            }
                        });
                        _this._banner_ad_array.push(createBanner_1);
                        createBanner_1.onLoad(function () {
                            console.log("banner ad id:" + banner + " onLoad");
                            _this._banner_ad_loaded_array[t] = true;
                        });
                        createBanner_1.onResize(function (t) {
                            createBanner_1.style.left = (windowWidth_1 - t.width) / 2;
                            createBanner_1.style.top = windowHeight_1 - t.height;
                            console.log("banner_ad.onResize:", t.width, t.height);
                            var getDevicePixelRatio = cc.view.getDevicePixelRatio();
                            var getScaleX = cc.view.getScaleX();
                            console.log("banner need design size:", t.width * getDevicePixelRatio / getScaleX, t.height * getDevicePixelRatio / getScaleX);
                        });
                    }
                })();
            };
            for (var index = 0; index < this._banner_ad_id_array.length; index++) {
                _loop_1(index);
            }
        }
    };
    TTMiniGame.prototype.show_banner_ad = function (param) {
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
    TTMiniGame.prototype.hide_banner_ad = function (param) {
        if (this._banner_ad_loaded_array[param]) {
            var banner = this._banner_ad_array[param];
            if (banner) {
                banner.hide();
                this._banner_ad_flag_array[param] = false;
            }
        }
    };
    TTMiniGame.prototype.create_video_ad = function () {
        if (null != window.tt && null != window.tt.createRewardedVideoAd) {
            for (var index = 0; index < this._video_ad_id_array.length; index++) {
                this._video_ad_array[index] = window.tt.createRewardedVideoAd({
                    adUnitId: this._video_ad_id_array[index]
                });
                this.on_video_ad_handler(index);
            }
        }
    };
    TTMiniGame.prototype.on_video_ad_handler = function (index) {
        var _this = this;
        this._video_ad_array[index].onClose(function (res) {
            if (res && res.isEnded || res == undefined) {
                console.log("视频广告 正常播放结束");
                _this._video_cb_array[index].call(_this._video_cb_target_array[index], 0);
            }
            else {
                console.log("视频广告 播放中途退出");
                GameManager_1.gm.ui.show_notice("Không có phần thưởng khi kết thúc quảng cáo video");
                if (_this._video_close_cb_array[index] && _this._video_close_cb_target_array[index]) {
                    _this._video_close_cb_array[index].call(_this._video_close_cb_target_array[index]);
                }
            }
            cc.game.resume();
        });
        this._video_ad_array[index].onError(function (t) {
            console.log(t);
            console.log("加载失败，稍后再试");
            if (1e3 == t.errCode) {
                NetUtils_1.ReportData.instance.report_once_point(10651);
                NetUtils_1.ReportData.instance.report_point(10652);
            }
            else if (1003 == t.errCode) {
                NetUtils_1.ReportData.instance.report_once_point(10653);
                NetUtils_1.ReportData.instance.report_point(10654);
            }
            else if (1004 == t.errCode) {
                NetUtils_1.ReportData.instance.report_once_point(10655);
                NetUtils_1.ReportData.instance.report_point(10656);
            }
            else if (1005 == t.errCode) {
                NetUtils_1.ReportData.instance.report_once_point(10657);
                NetUtils_1.ReportData.instance.report_point(10658);
            }
            else if (1006 == t.errCode) {
                NetUtils_1.ReportData.instance.report_once_point(10659);
                NetUtils_1.ReportData.instance.report_point(10660);
            }
            else if (1007 == t.errCode) {
                NetUtils_1.ReportData.instance.report_once_point(10661);
                NetUtils_1.ReportData.instance.report_point(10662);
            }
            else if (1008 == t.errCode) {
                NetUtils_1.ReportData.instance.report_once_point(10663);
                NetUtils_1.ReportData.instance.report_point(10664);
            }
            else if (120002 == t.errCode) {
                NetUtils_1.ReportData.instance.report_once_point(10665);
                NetUtils_1.ReportData.instance.report_point(10666);
            }
        });
    };
    TTMiniGame.prototype.show_video_ad = function (callback, chanel, videoType, callback1, channel1) {
        var _this = this;
        if (Date.now() - this.last_call_show_video_ad < 3000) {
            GameManager_1.gm.ui.show_notice("Nhấp quá thường xuyên, vui lòng thử lại sau 3 giây");
        }
        else {
            this.last_call_show_video_ad = Date.now();
            this._video_cb_array[videoType] = callback;
            this._video_cb_target_array[videoType] = chanel;
            this._video_close_cb_array[videoType] = callback1;
            this._video_close_cb_target_array[videoType] = channel1;
            var videoAd_1 = this._video_ad_array[videoType];
            if (videoAd_1) {
                this.create_video_ad();
                videoAd_1 = this._video_ad_array[videoType];
            }
            if (GameManager_1.gm.data.main_data && GameManager_1.gm.data.main_data.is_today_no_ad) {
                if (0 < GameManager_1.gm.data.main_data.left_share_count) {
                    GameManager_1.gm.channel.share_req(function () {
                        GameManager_1.gm.data.main_data.left_share_count--;
                        GameManager_1.gm.data.main_data.async_write_data();
                        if (callback) {
                            callback.call(chanel, 1);
                        }
                    }, this);
                }
                else {
                    GameManager_1.gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                }
            }
            else {
                videoAd_1.load().then(function () {
                    console.log("手动加载成功");
                    videoAd_1.show().then(function () {
                        console.log("视频广告显示成功");
                        cc.game.pause();
                    }).catch(function (t) {
                        if (120002 == t.errCode) {
                            GameManager_1.gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                            GameManager_1.gm.data.main_data.is_today_no_ad = true;
                            GameManager_1.gm.data.main_data.async_write_data();
                        }
                        else {
                            GameManager_1.gm.ui.show_notice("Video đang phát thường xuyên. Vui lòng thử lại sau một lúc.");
                        }
                        if (0 < GameManager_1.gm.data.main_data.left_share_count) {
                            GameManager_1.gm.channel.share_req(function () {
                                GameManager_1.gm.data.main_data.left_share_count--;
                                GameManager_1.gm.data.main_data.async_write_data();
                                if (callback) {
                                    callback.call(chanel, 1);
                                }
                            }, _this);
                        }
                    });
                });
            }
        }
    };
    TTMiniGame.prototype.retry_show_video_ad = function (t, e, a) {
        var _this = this;
        t.load().then(function () {
            console.log("视频手动加载成功");
            t.show().then(function () {
                console.log("重新拉取，视频广告显示成功");
                cc.game.pause();
            }).catch(function (t) {
                console.log("重新拉取失败", t);
                if (1004 == t.errCode) {
                    GameManager_1.gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                }
                else {
                    GameManager_1.gm.ui.show_notice("Video đang phát thường xuyên. Vui lòng thử lại sau một lúc.");
                }
                if (0 < GameManager_1.gm.data.main_data.left_share_count) {
                    GameManager_1.gm.channel.share_req(function () {
                        GameManager_1.gm.data.main_data.left_share_count--;
                        GameManager_1.gm.data.main_data.async_write_data();
                        if (e) {
                            e.call(a, 1);
                        }
                    }, _this);
                }
            });
        });
    };
    TTMiniGame.prototype.set_rank_value = function () {
        if (window.tt) {
            window.tt.setUserGroup({
                groupId: "level_group"
            });
            var object = {
                ttgame: {
                    score: 0,
                    update_time: Math.floor((new Date).getTime() / 1e3)
                },
                cost_time: 0
            };
            window.tt.setUserCloudStorage({
                KVDataList: [{
                        key: "level",
                        value: JSON.stringify(object)
                    }]
            });
            cc.log("上报排行数据");
        }
    };
    TTMiniGame.prototype.get_rank_data = function () {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 0
            });
        }
        return true;
    };
    TTMiniGame.prototype.set_rank_close = function () {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 99
            });
        }
    };
    TTMiniGame.prototype.get_self_rank_data = function () {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 300
            });
        }
        return true;
    };
    TTMiniGame.prototype.set_self_rank_close = function () {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 301
            });
        }
    };
    TTMiniGame.prototype.on_rank_pre_page_click = function () {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 100
            });
        }
    };
    TTMiniGame.prototype.on_rank_next_page_click = function () {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 101
            });
        }
    };
    TTMiniGame.prototype.checkIfCanRecord = function () {
        return true;
    };
    TTMiniGame.prototype.record_start = function () {
        var _this = this;
        if (window.tt && window.tt.getGameRecorderManager) {
            var GameRecorder = window.tt.getGameRecorderManager();
            GameRecorder.onStart(function () {
                console.log("录屏开始");
                _this._record_start_time = Date.now();
                _this._is_restart = false;
            });
            this._is_restart = true;
            GameRecorder.start({
                duration: 180
            });
            GameRecorder.onStop(function (t) {
                console.log("录屏结束");
                _this._record_end_time = Date.now();
                _this._is_share_record_video = false;
                console.log(t.videoPath);
                _this._video_path = t.videoPath;
                _this.share_video(false);
                if (_this._is_restart) {
                    setTimeout(function () {
                        _this.record_start();
                    }, .017);
                }
            });
        }
    };
    TTMiniGame.prototype.record_stop = function (param) {
        if (window.tt && window.tt.getGameRecorderManager) {
            this._if_need_video_share = param;
            window.tt.getGameRecorderManager().stop();
        }
    };
    TTMiniGame.prototype.share_video = function (t, call) {
        var _this = this;
        if (t || this._if_need_video_share) {
            if (0 < this._record_end_time && this._record_end_time - this._record_start_time < 3017) {
                GameManager_1.gm.ui.show_notice(GameManager_1.gm.const.TEXT_19);
            }
            else {
                var shareID = 0 == this._share_id_array.length
                    ? this._default_share_id
                    : this._share_id_array[Utils_1.Utils.math_random(true, 0, this._share_id_array.length)];
                window.tt && window.tt.shareAppMessage({
                    channel: "video",
                    templateId: shareID,
                    title: this._share_title_array,
                    imageUrl: "",
                    query: "",
                    extra: {
                        videoPath: this._video_path,
                        videoTopics: this._share_title_array
                    },
                    success: function () {
                        console.log("分享视频成功");
                        _this._record_start_time = _this._record_end_time = 0;
                        _this._is_share_record_video = true;
                        if (call) {
                            call(0);
                        }
                    },
                    fail: function () {
                        console.log("分享视频失败");
                        if (call) {
                            call(1);
                        }
                    }
                });
            }
        }
    };
    TTMiniGame.prototype.viedo_share = function (param, call) {
        var _this = this;
        var shareID = 0 == this._share_id_array.length
            ? this._default_share_id
            : this._share_id_array[Utils_1.Utils.math_random(!0, 0, this._share_id_array.length)];
        if (window.tt) {
            window.tt.shareAppMessage({
                channel: "video",
                templateId: shareID,
                title: this._share_title_array,
                imageUrl: "",
                query: "",
                extra: {
                    videoPath: this._video_path,
                    videoTopics: this._share_title_array
                },
                success: function () {
                    console.log("分享视频成功");
                    _this._record_start_time = _this._record_end_time = 0;
                    _this._is_share_record_video = true;
                    if (call) {
                        call(0);
                    }
                },
                fail: function () {
                    console.log("分享视频失败");
                    if (call) {
                        call(1);
                    }
                }
            });
        }
    };
    TTMiniGame.prototype.clear_cache = function () {
        if (window.wxDownloader) {
            window.wxDownloader.cleanAllAssets();
            console.log("delete cache success");
        }
    };
    TTMiniGame.prototype.follow = function (callback, context) {
        var _this = this;
        if (tt.checkFollowState) {
            var SystemInfo = tt.getSystemInfoSync();
            console.log("follow:tt.getSystemInfoSync.appName:", SystemInfo.appName);
            if ("Toutiao" == SystemInfo.appName) {
                console.log("再检测有没有关注接口！follow tt.checkFollowState");
                var frame_1 = {
                    windowWidth: 0,
                    windowHeight: 0
                };
                frame_1.windowWidth = SystemInfo.windowWidth;
                frame_1.windowHeight = SystemInfo.windowHeight;
                console.log("sysinfo:", frame_1);
                tt.checkFollowState({
                    success: function (t) {
                        console.log("该用户已经关注了公众号！！！", t.result);
                        if (!t.result) {
                            tt.downloadFile({
                                url: "https://cdnres.qszhg.6hwan.com//tower_shoot/" + _this._follow_name,
                                success: function (t) {
                                    if (200 === t.statusCode) {
                                        console.log("创建images关注按钮"), console.log("" + t.tempFilePath);
                                        var windowWidth = 0;
                                        var windowHeight = 0;
                                        if ("follow.png" == _this._follow_name) {
                                            windowWidth = frame_1.windowWidth / GameManager_1.gm.data.design_resolution.x * 145;
                                            windowHeight = frame_1.windowHeight / GameManager_1.gm.data.design_resolution.y * 101;
                                        }
                                        else {
                                            windowWidth = frame_1.windowWidth / GameManager_1.gm.data.design_resolution.x * 600;
                                            windowHeight = frame_1.windowHeight / GameManager_1.gm.data.design_resolution.y * 800;
                                        }
                                        var left = frame_1.windowWidth - windowWidth;
                                        var top = frame_1.windowHeight * (391.484 - windowHeight / 2) / GameManager_1.gm.data.design_resolution.y;
                                        console.log("MainVO.designResolution.x:%s,MainVO.designResolution.y:%s.", GameManager_1.gm.data.design_resolution.x, GameManager_1.gm.data.design_resolution.y);
                                        _this.followBtn = tt.createFollowButton({
                                            type: "image",
                                            image: t.tempFilePath,
                                            style: {
                                                left: left,
                                                top: top,
                                                width: windowWidth,
                                                height: windowHeight,
                                                lineHeight: 40,
                                                backgroundColor: "#ff0000",
                                                textColor: "#ffffff",
                                                textAlign: "center",
                                                fontSize: 16,
                                                borderRadius: 4,
                                                borderWidth: 0,
                                                borderColor: "#ff0000"
                                            }
                                        });
                                        if (_this.followBtn) {
                                            _this.followBtn.onTap(function (t) {
                                                console.log("follow_callback(res):", JSON.stringify(t));
                                                if (0 == t.errCode) {
                                                    callback.call(context);
                                                }
                                            });
                                            _this.followBtn.show();
                                            _this._follow_btn_stat = true;
                                            return;
                                        }
                                    }
                                },
                                fail: function (t) {
                                    console.log("downloadFile调用失败：", t);
                                }
                            });
                        }
                    },
                    fail: function (t) {
                        console.log("createFollowBtn is fail!", t);
                    }
                });
            }
            return false;
        }
    };
    TTMiniGame.prototype.follow_btn_stat = function () {
        return this._follow_btn_stat;
    };
    TTMiniGame.prototype.hide_follow_btn = function () {
        return !!this.followBtn && (this.followBtn.hide(), true);
    };
    TTMiniGame.prototype.show_follow_btn = function () {
        return !!this.followBtn && (this.followBtn.show(), true);
    };
    TTMiniGame.prototype.user_subscribe_message = function (t, e) {
        var _this = this;
        if (e === void 0) { e = []; }
        if (tt.requestSubscribeMessage) {
            var tmplIds_1 = 0 == e.length ? ["MSG1158625aae6f860a892f55d4f4daee35c9b8c5c13730"] : e;
            tt.requestSubscribeMessage({
                tmplIds: tmplIds_1,
                success: function (t) {
                    console.log("userSubscribeMessage:", t);
                    var url = "https://gameapipy.6hwan.com/user/minigame/toutiao_app/subscribe/?appid=ttae7dd8c03146ae1b&openid=" + _this.userOpenId + "&template_id=" + JSON.stringify(tmplIds_1);
                    console.log("userSubscribeMessage tmpUrl:", url);
                    tt.request({
                        url: url,
                        success: function (t) {
                            console.log("userSubscribeMessage requestSuc para1:", JSON.stringify(t));
                        },
                        fail: function (t) {
                            console.log("userSubscribeMessage requestFail para1:", t);
                        }
                    });
                    GameManager_1.gm.data.start_data.user_subscribe_message_stat = 1;
                    GameManager_1.gm.data.start_data.async_write_data();
                },
                fail: function (t) {
                    console.log(t);
                }
            });
        }
    };
    TTMiniGame.prototype.DouYinFollowBS = function () {
        return "DOUYIN" == tt.getSystemInfoSync().appName.toUpperCase() ? this._douYinFollowBtnStat : "0";
    };
    TTMiniGame.prototype.douYinFollow = function (callback, context) {
        if (tt.openAwemeUserProfile) {
            tt.openAwemeUserProfile();
            callback.call(context);
        }
    };
    TTMiniGame.prototype.load_share_config = function () {
        var _this = this;
        tt.request({
            url: this._share_config_url,
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function (t) {
                console.log("game.login requestSuc para2:", t);
                if ("data" in t) {
                    if ("share_title_array" in t.data) {
                        _this._share_title_array = t.data.share_title_array;
                    }
                    if ("follow_name" in t.data) {
                        _this._follow_name = t.data.follow_name;
                    }
                    if ("douYinFollowBtnStat" in t.data) {
                        _this._douYinFollowBtnStat = t.data.douYinFollowBtnStat;
                    }
                    if ("tuoTiaoFollowX" in t.data) {
                        _this.tuoTiaoFollowX = Number(t.data.tuoTiaoFollowX);
                    }
                    if ("tuoTiaoFollowY" in t.data) {
                        _this.tuoTiaoFollowY = Number(t.data.tuoTiaoFollowY);
                    }
                    console.log("this._share_title_array:%s,this._follow_name:%s,this._douYinFollowBtnStat:%s", _this._share_title_array, _this._follow_name, _this._douYinFollowBtnStat);
                    console.log("this.tuoTiaoFollowX:%s,this.tuoTiaoFollowY:%s", _this.tuoTiaoFollowX, _this.tuoTiaoFollowY);
                }
            },
            fail: function (t) {
                console.log("tt.login requestFail para1:", t);
            }
        });
    };
    TTMiniGame.prototype.canvasResize = function () {
        var canvas = cc.find("Canvas").getComponent(cc.Canvas);
        var designResolution = canvas.designResolution;
        var frameSize = cc.view.getFrameSize();
        var frameWidth = frameSize.width;
        var frameHeight = frameSize.height;
        var newWidth = frameWidth;
        var newHeight = frameHeight;
        if (frameHeight / frameWidth > designResolution.height / designResolution.width) {
            newWidth = designResolution.width;
            newHeight = (frameHeight / frameWidth) * newWidth;
        }
        else {
            newHeight = designResolution.height;
            newWidth = (frameWidth / frameHeight) * newHeight;
        }
        var newDesignResolution = cc.v2(newWidth, newHeight);
        GameManager_1.gm.data.design_resolution = newDesignResolution;
        cc.log("MainVO.designResolution: %s", JSON.stringify(newDesignResolution));
    };
    TTMiniGame.prototype.checkShortcut = function (call) {
        tt.checkShortcut({
            success: function (t) {
                console.log("onEnterMainScene checkShortcut res:", t);
                if (t && t.status && t.status.exist) {
                    if (t.status.needUpdate) {
                        call(1);
                    }
                    else {
                        call(0);
                    }
                }
                else {
                    call(2);
                }
            },
            fail: function () {
                console.log("onEnterMainScene checkShortcut fail");
                call(2);
            }
        });
    };
    TTMiniGame.prototype.addShortcut = function (call) {
        var _this = this;
        tt.addShortcut({
            success: function () {
                console.log("showAddToDeskHint 成功添加到桌面");
                call();
            },
            fail: function () {
                console.log("showAddToDeskHint 添加到桌面失败！骗人的");
                _this._timer.stop();
                _this._timer.start(function () {
                    _this.checkShortcut(function (t) {
                        if (t <= 1) {
                            _this._timer.stop();
                            call();
                        }
                    });
                }, 2000, 20);
            }
        });
    };
    TTMiniGame._instance = null;
    TTMiniGame.ad_enable = true;
    return TTMiniGame;
}());
exports.TTMiniGame = TTMiniGame;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFRUTWluaUdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsWUFBWSxDQUFDOzs7QUFDYiw2Q0FBbUM7QUFDbkMsbURBQXdGO0FBQ3hGLGlDQUFnQztBQUNoQyx1Q0FBa0Q7QUFDbEQsaUNBQWdDO0FBd0NoQztJQXNDSTtRQUNJLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FB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LENBQUMsYUFBYSxDQUFDLFVBQUMsQ0FBQzt3QkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUNSLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ25CLElBQUksRUFBRSxDQUFDO3lCQUNWO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakIsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUF0N0JNLG9CQUFTLEdBQWUsSUFBSSxDQUFDO0lBQzdCLG9CQUFTLEdBQVksSUFBSSxDQUFDO0lBdTdCckMsaUJBQUM7Q0F6N0JELEFBeTdCQyxJQUFBO0FBejdCWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IENoYW5uZWxNYW5hZ2VyLCBSRVdBUkRfVklERU9fQURfVFlQRSwgQkFOTkVSX0FEX1RZUEUgfSBmcm9tIFwiLi9DaGFubmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IE5ldFV0aWxzLCBSZXBvcnREYXRhIH0gZnJvbSBcIi4vTmV0VXRpbHNcIjtcclxuaW1wb3J0IHsgVGltZXIgfSBmcm9tIFwiLi9UaW1lclwiO1xyXG5cclxuaW50ZXJmYWNlIHR5cGUge1xyXG4gICAgY2FsbDogKGNvbnRleHQ6IGFueSwgbnVtPzogbnVtYmVyKSA9PiBhbnlcclxufVxyXG5cclxuaW50ZXJmYWNlIEJhc2VBZCB7XHJcbiAgICBzaG93KCk6IFByb21pc2U8dm9pZD47XHJcbiAgICBkZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBvbkxvYWQoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgb25FcnJvcihjYWxsYmFjazogKGVycjogYW55KSA9PiB2b2lkKTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIEJhbm5lckFkIGV4dGVuZHMgQmFzZUFkIHtcclxuICAgIGhpZGUoKTogdm9pZDtcclxuICAgIG9uUmVzaXplKGNhbGxiYWNrOiAoc2l6ZTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9KSA9PiB2b2lkKTogdm9pZDtcclxuICAgIHN0eWxlOiB7XHJcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcclxuICAgICAgICB0b3A6IG51bWJlcjtcclxuICAgICAgICBsZWZ0OiBudW1iZXI7XHJcbiAgICB9O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUmV3YXJkZWRWaWRlb0FkIGV4dGVuZHMgQmFzZUFkIHtcclxuICAgIGxvYWQoKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIG9uQ2xvc2UoY2FsbGJhY2s6IChyZXM6IHsgaXNFbmRlZDogYm9vbGVhbiB9KSA9PiB2b2lkKTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIEludGVyc3RpdGlhbEFkIGV4dGVuZHMgQmFzZUFkIHtcclxuICAgIGxvYWQoKTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIEZvbGxvd0J1dHRvbiB7XHJcbiAgICBvblRhcChjYWxsYmFjazogKHQ6IHsgZXJyQ29kZTogbnVtYmVyIH0pID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgc2hvdygpOiB2b2lkO1xyXG4gICAgaGlkZSgpOiB2b2lkO1xyXG4gICAgZGVzdHJveT86ICgpID0+IHZvaWQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVFRNaW5pR2FtZSB7XHJcbiAgICBzdGF0aWMgX2luc3RhbmNlOiBUVE1pbmlHYW1lID0gbnVsbDtcclxuICAgIHN0YXRpYyBhZF9lbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfbWluX2Jhbm5lcl9hZF93aWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYmFubmVyX2FkX2lkX2FycmF5OiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX3ZpZGVvX2FkX2lkX2FycmF5OiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX2ludGVyc3RpdGlhbF9hZF9pZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaW50ZXJzdGl0aWFsX2FkX2lzX3Nob3c6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2Jhbm5lcl9hZF9hcnJheTogQmFubmVyQWRbXTtcclxuICAgIHByaXZhdGUgX2Jhbm5lcl9hZF9mbGFnX2FycmF5OiBib29sZWFuW107XHJcbiAgICBwcml2YXRlIF9iYW5uZXJfYWRfbG9hZGVkX2FycmF5OiBib29sZWFuW107XHJcbiAgICBwcml2YXRlIF92aWRlb19hZF9hcnJheTogUmV3YXJkZWRWaWRlb0FkW107XHJcbiAgICBwcml2YXRlIF92aWRlb19jYl9hcnJheTogdHlwZVtdO1xyXG4gICAgcHJpdmF0ZSBfdmlkZW9fY2JfdGFyZ2V0X2FycmF5OiBDaGFubmVsTWFuYWdlcltdO1xyXG4gICAgcHJpdmF0ZSBfdmlkZW9fY2xvc2VfY2JfYXJyYXk6IHR5cGVbXTtcclxuICAgIHByaXZhdGUgX3ZpZGVvX2Nsb3NlX2NiX3RhcmdldF9hcnJheTogQ2hhbm5lbE1hbmFnZXJbXTtcclxuICAgIHByaXZhdGUgX2ludGVyc3RpdGlhbF9hZDogSW50ZXJzdGl0aWFsQWQ7XHJcbiAgICBwcml2YXRlIF9zaGFyZV9pZF9hcnJheTogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9kZWZhdWx0X3NoYXJlX2lkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9zaGFyZV9jb25maWdfdXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9yZWNvcmRfc3RhcnRfdGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcmVjb3JkX2VuZF90aW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9pc19zaGFyZV9yZWNvcmRfdmlkZW86IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9pc19yZXN0YXJ0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfaWZfbmVlZF92aWRlb19zaGFyZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3ZpZGVvX3BhdGg6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2ZvbGxvd19uYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9mb2xsb3dfYnRuX3N0YXQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHVzZXJPcGVuSWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3NoYXJlX3RpdGxlX2FycmF5OiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX2RvdVlpbkZvbGxvd0J0blN0YXQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBjb2RlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGxhc3RfY2FsbF9zaG93X3ZpZGVvX2FkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF90aW1lcjogVGltZXI7XHJcbiAgICBwcml2YXRlIGZvbGxvd0J0bjogRm9sbG93QnV0dG9uO1xyXG4gICAgcHJpdmF0ZSB0dW9UaWFvRm9sbG93WDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0dW9UaWFvRm9sbG93WTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX21pbl9iYW5uZXJfYWRfd2lkdGggPSAyNTY7XHJcbiAgICAgICAgdGhpcy5fYmFubmVyX2FkX2lkX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5fdmlkZW9fYWRfaWRfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWRfaWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZF9pc19zaG93ID0gMDtcclxuICAgICAgICB0aGlzLl9iYW5uZXJfYWRfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl9iYW5uZXJfYWRfZmxhZ19hcnJheSA9IFshMV07XHJcbiAgICAgICAgdGhpcy5fYmFubmVyX2FkX2xvYWRlZF9hcnJheSA9IFshMV07XHJcbiAgICAgICAgdGhpcy5fdmlkZW9fYWRfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl92aWRlb19jYl9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvX2NiX3RhcmdldF9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvX2Nsb3NlX2NiX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5fdmlkZW9fY2xvc2VfY2JfdGFyZ2V0X2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zaGFyZV9pZF9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRfc2hhcmVfaWQgPSBcIjJpcDljcnQxZmJ3OTNvdW9tY1wiO1xyXG4gICAgICAgIHRoaXMuX3NoYXJlX2NvbmZpZ191cmwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX3JlY29yZF9zdGFydF90aW1lID0gMDtcclxuICAgICAgICB0aGlzLl9yZWNvcmRfZW5kX3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2lzX3NoYXJlX3JlY29yZF92aWRlbyA9ICExO1xyXG4gICAgICAgIHRoaXMuX2lzX3Jlc3RhcnQgPSAhMTtcclxuICAgICAgICB0aGlzLl9pZl9uZWVkX3ZpZGVvX3NoYXJlID0gITE7XHJcbiAgICAgICAgdGhpcy5fdmlkZW9fcGF0aCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fZm9sbG93X25hbWUgPSBcImZvbGxvdy5wbmdcIjtcclxuICAgICAgICB0aGlzLl9mb2xsb3dfYnRuX3N0YXQgPSAhMTtcclxuICAgICAgICB0aGlzLnVzZXJPcGVuSWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX3NoYXJlX3RpdGxlX2FycmF5ID0gW1wi5rW3546L5bCx5piv5oiRXCJdO1xyXG4gICAgICAgIHRoaXMuX2RvdVlpbkZvbGxvd0J0blN0YXQgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLmNvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubGFzdF9jYWxsX3Nob3dfdmlkZW9fYWQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gbmV3IFRpbWVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgVFRNaW5pR2FtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkX2NoYW5uZWxfZW52KGNhbGw6ICgpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5jYW52YXNSZXNpemUoKSwgd2luZG93LnR0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy50dC5vbkhpZGUoKCkgPT4geyB9KTtcclxuICAgICAgICAgICAgd2luZG93LnR0Lm9uU2hvdygoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJfYWRfaWRfYXJyYXlbaS5CQU5ORVJfQURfVFlQRS5BTExdID0gXCI3ZjhhaDMzZjlpbTA2NGcwazBcIjtcclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9fYWRfaWRfYXJyYXlbaS5SRVdBUkRfVklERU9fQURfVFlQRS5BTExdID0gXCI1NG1ibGw1NTIxYmwybmM5MDBcIjtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkX2lkID0gXCIycTk0dGowMmhtZGw2azlqZmRcIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0dFwiICsgSlNPTi5zdHJpbmdpZnkod2luZG93LnR0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXJlX2lkX2FycmF5ID0gQ2hhbm5lbE1hbmFnZXIuU0hBUkVfQ09ORklHLnNoYXJlX2lkX2FycmF5O1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRfc2hhcmVfY29uZmlnKCk7XHJcbiAgICAgICAgICAgIGNhbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dpblZlcmlmeSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9jb2RlKGNhbGw6IChjb2RlOiBzdHJpbmcsIG51bTogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LnR0LmxvZ2luKHtcclxuICAgICAgICAgICAgZm9yY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHQuaXNMb2dpbiAmJiB0LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvZGUgPSB0LmNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbCh0aGlzLmNvZGUsIDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdC5pc0xvZ2luICYmIHQuYW5vbnltb3VzQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29kZSA9IHQuYW5vbnltb3VzQ29kZTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsKHRoaXMuY29kZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW7osIPnlKjlpLHotKVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZF9zdWJfcGFja2FnZXNfZW52KGNhbGw6ICgpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBjYWxsKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9hcHBfbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh3aW5kb3cudHQgJiYgd2luZG93LnR0LmdldFN5c3RlbUluZm9TeW5jKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cudHQuZ2V0U3lzdGVtSW5mb1N5bmMoKS5hcHBOYW1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDaGFubmVsTWFuYWdlci5VTktOT1dOO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3JhbmsoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc19zaGFyZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3ZpZGVvX3NoYXJlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aWJyYXRlX3Nob3J0KCk6IHZvaWQge1xyXG4gICAgICAgIHR0LnZpYnJhdGVTaG9ydCAmJiB0dC52aWJyYXRlU2hvcnQoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJcIiArIHQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpYnJhdGVTaG9ydOiwg+eUqOWksei0pVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aWJyYXRlX2xvbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdHQudmlicmF0ZUxvbmcgJiYgdHQudmlicmF0ZUxvbmcoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJcIiArIHQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpYnJhdGVMb25n6LCD55So5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3N1cHBvcnRfbW9yZV9nYW1lKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBcImlvc1wiICE9IHdpbmRvdy50dC5nZXRTeXN0ZW1JbmZvU3luYygpLnBsYXRmb3JtICYmICEhKHdpbmRvdy50dC5vbk1vcmVHYW1lc01vZGFsQ2xvc2UgJiYgd2luZG93LnR0Lm9uTmF2aWdhdGVUb01pbmlQcm9ncmFtICYmIHdpbmRvdy50dC5zaG93TW9yZUdhbWVzTW9kYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X21vcmVfZ2FtZShjYWxsYmFjazogdHlwZSwgY29udGV4dCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzX3N1cHBvcnRfbW9yZV9nYW1lKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy50dC5vbk1vcmVHYW1lc01vZGFsQ2xvc2UoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW9kYWwgY2xvc2VkXCIsIHQpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgd2luZG93LnR0Lm9uTmF2aWdhdGVUb01pbmlQcm9ncmFtKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0LmVyckNvZGUpLCBjb25zb2xlLmxvZyh0LmVyck1zZylcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cudHQuc2hvd01vcmVHYW1lc01vZGFsKHtcclxuICAgICAgICAgICAgICAgIGFwcExhdW5jaE9wdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIiwgdC5lcnJNc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYWlsXCIsIHQuZXJyTXNnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc19zdXBwb3J0X2ludGVyc3RpdGlhbF9hZCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoXCJkZXZ0b29sc1wiICE9IHRoaXMuZ2V0X2FwcF9uYW1lKCkgJiYgdHQuY3JlYXRlSW50ZXJzdGl0aWFsQWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpc19zdXBwb3J0X2ludGVyc3RpdGlhbF9hZCAgY3JlYXRlSW50ZXJzdGl0aWFsQWQ6IHRydWVcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXNfc3VwcG9ydF9pbnRlcnN0aXRpYWxfYWQ6IGZhbHNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X2ludGVyc3RpdGlhbF9hZChjYWxsYmFjazogdHlwZSwgY29udGV4dDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfc3VwcG9ydF9pbnRlcnN0aXRpYWxfYWQpIHtcclxuICAgICAgICAgICAgaWYgKDAgPT0gdGhpcy5faW50ZXJzdGl0aWFsX2FkX2lzX3Nob3cgfHwgMiA9PSB0aGlzLl9pbnRlcnN0aXRpYWxfYWRfaXNfc2hvdykge1xyXG4gICAgICAgICAgICAgICAgaWYgKDIgPT0gdGhpcy5faW50ZXJzdGl0aWFsX2FkX2lzX3Nob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkX2lzX3Nob3cgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkID0gdHQuY3JlYXRlSW50ZXJzdGl0aWFsQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiB0aGlzLl9pbnRlcnN0aXRpYWxfYWRfaWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZF9pc19zaG93ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWRfaXNfc2hvdyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o+S5bGP5bm/5ZGK5bGV56S65oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkLm9uRXJyb3IoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVyckNvZGU6XCIgKyB0LmVyckNvZGUgKyBcIiBlcnJNc2c6XCIgKyB0LmVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoMSA9PSB0aGlzLl9pbnRlcnN0aXRpYWxfYWRfaXNfc2hvdykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkX2lzX3Nob3cgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZF9pc19zaG93ID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrlsZXnpLrmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxfYWQub25FcnJvcigodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyQ29kZTpcIiArIHQuZXJyQ29kZSArIFwiIGVyck1zZzpcIiArIHQuZXJyTXNnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkLmxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9naW5WZXJpZnkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdHQuc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB0dC5vblNoYXJlQXBwTWVzc2FnZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLmtbfnjovlsLHmmK/miJFcIixcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBcImh0dHBzOi8vY2RucmVzLnFzemhnLjZod2FuLmNvbS90b3dlcl9zaG9vdC9zaGFyZS80LmpwZ1wiLFxyXG4gICAgICAgICAgICAgICAgcXVlcnk6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L2s5Y+R5oiQ5YqfXCIpLCBjb25zb2xlLmxvZyh0KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYWlsIHR0IG9uU2hhcmVBcHBNZXNzYWdlXCIgKyB0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNoYXJlX3JlcShjYWxsYmFjazogdHlwZSwgY29udGV4dDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy50dCkge1xyXG4gICAgICAgICAgICBjb25zdCBzaGFyZSA9IDAgPT0gdGhpcy5fc2hhcmVfaWRfYXJyYXkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMuX2RlZmF1bHRfc2hhcmVfaWRcclxuICAgICAgICAgICAgICAgIDogdGhpcy5fc2hhcmVfaWRfYXJyYXlbVXRpbHMubWF0aF9yYW5kb20odHJ1ZSwgMCwgdGhpcy5fc2hhcmVfaWRfYXJyYXkubGVuZ3RoKV07XHJcbiAgICAgICAgICAgIHdpbmRvdy50dC5zaGFyZUFwcE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVJZDogc2hhcmUsXHJcbiAgICAgICAgICAgICAgICBxdWVyeTogXCJcIixcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+aIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+Wksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlX2Jhbm5lcl9hZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAod2luZG93LnR0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN5c3RlbUluZm8gPSB3aW5kb3cudHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSBzeXN0ZW1JbmZvLndpbmRvd1dpZHRoO1xyXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSBzeXN0ZW1JbmZvLndpbmRvd0hlaWdodDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX2Jhbm5lcl9hZF9pZF9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaSA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhbm5lciA9IHRoaXMuX2Jhbm5lcl9hZF9pZF9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobnVsbCAhPSBiYW5uZXIgJiYgXCJcIiAhPSBiYW5uZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3JlYXRlQmFubmVyOiBCYW5uZXJBZCA9IHdpbmRvdy50dC5jcmVhdGVCYW5uZXJBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogYmFubmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRJbnRlcnZhbHM6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5fbWluX2Jhbm5lcl9hZF93aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHdpbmRvd0hlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAod2luZG93V2lkdGggLSB0aGlzLl9taW5fYmFubmVyX2FkX3dpZHRoKSAvIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJfYWRfYXJyYXkucHVzaChjcmVhdGVCYW5uZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUJhbm5lci5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXIgYWQgaWQ6XCIgKyBiYW5uZXIgKyBcIiBvbkxvYWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJfYWRfbG9hZGVkX2FycmF5W3RdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVCYW5uZXIub25SZXNpemUoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUJhbm5lci5zdHlsZS5sZWZ0ID0gKHdpbmRvd1dpZHRoIC0gdC53aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlQmFubmVyLnN0eWxlLnRvcCA9IHdpbmRvd0hlaWdodCAtIHQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXJfYWQub25SZXNpemU6XCIsIHQud2lkdGgsIHQuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBnZXREZXZpY2VQaXhlbFJhdGlvID0gY2Mudmlldy5nZXREZXZpY2VQaXhlbFJhdGlvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBnZXRTY2FsZVggPSBjYy52aWV3LmdldFNjYWxlWCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXIgbmVlZCBkZXNpZ24gc2l6ZTpcIiwgdC53aWR0aCAqIGdldERldmljZVBpeGVsUmF0aW8gLyBnZXRTY2FsZVgsIHQuaGVpZ2h0ICogZ2V0RGV2aWNlUGl4ZWxSYXRpbyAvIGdldFNjYWxlWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfYmFubmVyX2FkKHBhcmFtOiBCQU5ORVJfQURfVFlQRSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9iYW5uZXJfYWRfbG9hZGVkX2FycmF5W3BhcmFtXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJfYWRfZmxhZ19hcnJheVtwYXJhbV0gPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCBiYW5uZXIgPSB0aGlzLl9iYW5uZXJfYWRfYXJyYXlbcGFyYW1dO1xyXG4gICAgICAgICAgICBiYW5uZXIuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Jhbm5lcl9hZF9mbGFnX2FycmF5W3BhcmFtXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK5pi+56S65oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBiYW5uZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK5pi+56S65oWi5LqG77yM5LiN6ZyA6KaB5pi+56S65LqGXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jYXRjaCgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlub/lkYrnu4Tku7blh7rnjrDpl67pophcIiwgdCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlX2Jhbm5lcl9hZChwYXJhbTogQkFOTkVSX0FEX1RZUEUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYmFubmVyX2FkX2xvYWRlZF9hcnJheVtwYXJhbV0pIHtcclxuICAgICAgICAgICAgY29uc3QgYmFubmVyID0gdGhpcy5fYmFubmVyX2FkX2FycmF5W3BhcmFtXTtcclxuICAgICAgICAgICAgaWYgKGJhbm5lcikge1xyXG4gICAgICAgICAgICAgICAgYmFubmVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lcl9hZF9mbGFnX2FycmF5W3BhcmFtXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlX3ZpZGVvX2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHdpbmRvdy50dCAmJiBudWxsICE9IHdpbmRvdy50dC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX3ZpZGVvX2FkX2lkX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9fYWRfYXJyYXlbaW5kZXhdID0gd2luZG93LnR0LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuX3ZpZGVvX2FkX2lkX2FycmF5W2luZGV4XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uX3ZpZGVvX2FkX2hhbmRsZXIoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25fdmlkZW9fYWRfaGFuZGxlcihpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdmlkZW9fYWRfYXJyYXlbaW5kZXhdLm9uQ2xvc2UoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6KeG6aKR5bm/5ZGKIOato+W4uOaSreaUvue7k+adn1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvX2NiX2FycmF5W2luZGV4XS5jYWxsKHRoaXMuX3ZpZGVvX2NiX3RhcmdldF9hcnJheVtpbmRleF0sIDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop4bpopHlub/lkYog5pKt5pS+5Lit6YCU6YCA5Ye6XCIpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJLaMO0bmcgY8OzIHBo4bqnbiB0aMaw4bufbmcga2hpIGvhur90IHRow7pjIHF14bqjbmcgY8OhbyB2aWRlb1wiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb19jbG9zZV9jYl9hcnJheVtpbmRleF0gJiYgdGhpcy5fdmlkZW9fY2xvc2VfY2JfdGFyZ2V0X2FycmF5W2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvX2Nsb3NlX2NiX2FycmF5W2luZGV4XS5jYWxsKHRoaXMuX3ZpZGVvX2Nsb3NlX2NiX3RhcmdldF9hcnJheVtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLmdhbWUucmVzdW1lKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3ZpZGVvX2FkX2FycmF5W2luZGV4XS5vbkVycm9yKCh0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9veWksei0pe+8jOeojeWQjuWGjeivlVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgxZTMgPT0gdC5lcnJDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjUxKTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjUyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgxMDAzID09IHQuZXJyQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDY1Myk7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDY1NCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoMTAwNCA9PSB0LmVyckNvZGUpIHtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA2NTUpO1xyXG4gICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2NTYpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKDEwMDUgPT0gdC5lcnJDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjU3KTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjU4KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgxMDA2ID09IHQuZXJyQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDY1OSk7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDY2MCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoMTAwNyA9PSB0LmVyckNvZGUpIHtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA2NjEpO1xyXG4gICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2NjIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKDEwMDggPT0gdC5lcnJDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjYzKTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjY0KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgxMjAwMDIgPT0gdC5lcnJDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjY1KTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjY2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X3ZpZGVvX2FkKGNhbGxiYWNrOiAocmVzdWx0OiBudW1iZXIpID0+IHZvaWQsIGNoYW5lbDogQ2hhbm5lbE1hbmFnZXIsIHZpZGVvVHlwZTogUkVXQVJEX1ZJREVPX0FEX1RZUEUsIGNhbGxiYWNrMTogKCkgPT4gdm9pZCwgY2hhbm5lbDE6IENoYW5uZWxNYW5hZ2VyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLmxhc3RfY2FsbF9zaG93X3ZpZGVvX2FkIDwgMzAwMCkge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIk5o4bqlcCBxdcOhIHRoxrDhu51uZyB4dXnDqm4sIHZ1aSBsw7JuZyB0aOG7rSBs4bqhaSBzYXUgMyBnacOieVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RfY2FsbF9zaG93X3ZpZGVvX2FkID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9fY2JfYXJyYXlbdmlkZW9UeXBlXSA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb19jYl90YXJnZXRfYXJyYXlbdmlkZW9UeXBlXSA9IGNoYW5lbDtcclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9fY2xvc2VfY2JfYXJyYXlbdmlkZW9UeXBlXSA9IGNhbGxiYWNrMTtcclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9fY2xvc2VfY2JfdGFyZ2V0X2FycmF5W3ZpZGVvVHlwZV0gPSBjaGFubmVsMTtcclxuICAgICAgICAgICAgbGV0IHZpZGVvQWQgPSB0aGlzLl92aWRlb19hZF9hcnJheVt2aWRlb1R5cGVdO1xyXG4gICAgICAgICAgICBpZiAodmlkZW9BZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVfdmlkZW9fYWQoKTtcclxuICAgICAgICAgICAgICAgIHZpZGVvQWQgPSB0aGlzLl92aWRlb19hZF9hcnJheVt2aWRlb1R5cGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1haW5fZGF0YSAmJiBnbS5kYXRhLm1haW5fZGF0YS5pc190b2RheV9ub19hZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKDAgPCBnbS5kYXRhLm1haW5fZGF0YS5sZWZ0X3NoYXJlX2NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5zaGFyZV9yZXEoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1haW5fZGF0YS5sZWZ0X3NoYXJlX2NvdW50LS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFpbl9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNoYW5lbCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJRdeG6o25nIGPDoW8ga2h1eeG6v24ga2jDrWNoIHZpZGVvIGjDtG0gbmF5IMSRw6MgxJHGsOG7o2Mgc+G7rSBk4bulbmcgaOG6v3RcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0FkLmxvYWQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaJi+WKqOWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb0FkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop4bpopHlub/lkYrmmL7npLrmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMTIwMDAyID09IHQuZXJyQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJRdeG6o25nIGPDoW8ga2h1eeG6v24ga2jDrWNoIHZpZGVvIGjDtG0gbmF5IMSRw6MgxJHGsOG7o2Mgc+G7rSBk4bulbmcgaOG6v3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1haW5fZGF0YS5pc190b2RheV9ub19hZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1haW5fZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIlZpZGVvIMSRYW5nIHBow6F0IHRoxrDhu51uZyB4dXnDqm4uIFZ1aSBsw7JuZyB0aOG7rSBs4bqhaSBzYXUgbeG7mXQgbMO6Yy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwIDwgZ20uZGF0YS5tYWluX2RhdGEubGVmdF9zaGFyZV9jb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5zaGFyZV9yZXEoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFpbl9kYXRhLmxlZnRfc2hhcmVfY291bnQtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1haW5fZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY2hhbmVsLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmV0cnlfc2hvd192aWRlb19hZCh0OiBSZXdhcmRlZFZpZGVvQWQsIGU6IHR5cGUsIGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHQubG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuinhumikeaJi+WKqOWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgdC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumHjeaWsOaLieWPlu+8jOinhumikeW5v+WRiuaYvuekuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUucGF1c2UoKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YeN5paw5ouJ5Y+W5aSx6LSlXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKDEwMDQgPT0gdC5lcnJDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJRdeG6o25nIGPDoW8ga2h1eeG6v24ga2jDrWNoIHZpZGVvIGjDtG0gbmF5IMSRw6MgxJHGsOG7o2Mgc+G7rSBk4bulbmcgaOG6v3RcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiVmlkZW8gxJFhbmcgcGjDoXQgdGjGsOG7nW5nIHh1ecOqbi4gVnVpIGzDsm5nIHRo4butIGzhuqFpIHNhdSBt4buZdCBsw7pjLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoMCA8IGdtLmRhdGEubWFpbl9kYXRhLmxlZnRfc2hhcmVfY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnNoYXJlX3JlcSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFpbl9kYXRhLmxlZnRfc2hhcmVfY291bnQtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYWluX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5jYWxsKGEsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRfcmFua192YWx1ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAod2luZG93LnR0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy50dC5zZXRVc2VyR3JvdXAoe1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogXCJsZXZlbF9ncm91cFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgdHRnYW1lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlX3RpbWU6IE1hdGguZmxvb3IoKG5ldyBEYXRlKS5nZXRUaW1lKCkgLyAxZTMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29zdF90aW1lOiAwXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cudHQuc2V0VXNlckNsb3VkU3RvcmFnZSh7XHJcbiAgICAgICAgICAgICAgICBLVkRhdGFMaXN0OiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJsZXZlbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBKU09OLnN0cmluZ2lmeShvYmplY3QpXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2MubG9nKFwi5LiK5oql5o6S6KGM5pWw5o2uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X3JhbmtfZGF0YSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAod2luZG93LnR0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy50dC5nZXRPcGVuRGF0YUNvbnRleHQoKS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0X3JhbmtfY2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy50dCkge1xyXG4gICAgICAgICAgICB3aW5kb3cudHQuZ2V0T3BlbkRhdGFDb250ZXh0KCkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogOTlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfc2VsZl9yYW5rX2RhdGEoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy50dCkge1xyXG4gICAgICAgICAgICB3aW5kb3cudHQuZ2V0T3BlbkRhdGFDb250ZXh0KCkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogMzAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0X3NlbGZfcmFua19jbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAod2luZG93LnR0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy50dC5nZXRPcGVuRGF0YUNvbnRleHQoKS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAzMDFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbl9yYW5rX3ByZV9wYWdlX2NsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh3aW5kb3cudHQpIHtcclxuICAgICAgICAgICAgd2luZG93LnR0LmdldE9wZW5EYXRhQ29udGV4dCgpLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IDEwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uX3JhbmtfbmV4dF9wYWdlX2NsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh3aW5kb3cudHQpIHtcclxuICAgICAgICAgICAgd2luZG93LnR0LmdldE9wZW5EYXRhQ29udGV4dCgpLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IDEwMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0lmQ2FuUmVjb3JkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvcmRfc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy50dCAmJiB3aW5kb3cudHQuZ2V0R2FtZVJlY29yZGVyTWFuYWdlcikge1xyXG4gICAgICAgICAgICBjb25zdCBHYW1lUmVjb3JkZXIgPSB3aW5kb3cudHQuZ2V0R2FtZVJlY29yZGVyTWFuYWdlcigpO1xyXG4gICAgICAgICAgICBHYW1lUmVjb3JkZXIub25TdGFydCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW9leWxj+W8gOWni1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY29yZF9zdGFydF90aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzX3Jlc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pc19yZXN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgR2FtZVJlY29yZGVyLnN0YXJ0KHtcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxODBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBHYW1lUmVjb3JkZXIub25TdG9wKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW9leWxj+e7k+adn1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY29yZF9lbmRfdGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc19zaGFyZV9yZWNvcmRfdmlkZW8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHQudmlkZW9QYXRoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvX3BhdGggPSB0LnZpZGVvUGF0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVfdmlkZW8oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzX3Jlc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRfc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAuMDE3KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvcmRfc3RvcChwYXJhbTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmICh3aW5kb3cudHQgJiYgd2luZG93LnR0LmdldEdhbWVSZWNvcmRlck1hbmFnZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5faWZfbmVlZF92aWRlb19zaGFyZSA9IHBhcmFtO1xyXG4gICAgICAgICAgICB3aW5kb3cudHQuZ2V0R2FtZVJlY29yZGVyTWFuYWdlcigpLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNoYXJlX3ZpZGVvKHQ6IGFueSwgY2FsbD86IChudW06IG51bWJlcikgPT4gYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHQgfHwgdGhpcy5faWZfbmVlZF92aWRlb19zaGFyZSkge1xyXG4gICAgICAgICAgICBpZiAoMCA8IHRoaXMuX3JlY29yZF9lbmRfdGltZSAmJiB0aGlzLl9yZWNvcmRfZW5kX3RpbWUgLSB0aGlzLl9yZWNvcmRfc3RhcnRfdGltZSA8IDMwMTcpIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKGdtLmNvbnN0LlRFWFRfMTkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2hhcmVJRCA9IDAgPT0gdGhpcy5fc2hhcmVfaWRfYXJyYXkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLl9kZWZhdWx0X3NoYXJlX2lkXHJcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLl9zaGFyZV9pZF9hcnJheVtVdGlscy5tYXRoX3JhbmRvbSh0cnVlLCAwLCB0aGlzLl9zaGFyZV9pZF9hcnJheS5sZW5ndGgpXTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cudHQgJiYgd2luZG93LnR0LnNoYXJlQXBwTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogXCJ2aWRlb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlSWQ6IHNoYXJlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuX3NoYXJlX3RpdGxlX2FycmF5LFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvUGF0aDogdGhpcy5fdmlkZW9fcGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9Ub3BpY3M6IHRoaXMuX3NoYXJlX3RpdGxlX2FycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRfc3RhcnRfdGltZSA9IHRoaXMuX3JlY29yZF9lbmRfdGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzX3NoYXJlX3JlY29yZF92aWRlbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbCgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpZWRvX3NoYXJlKHBhcmFtOiBib29sZWFuLCBjYWxsOiAobnVtOiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzaGFyZUlEID0gMCA9PSB0aGlzLl9zaGFyZV9pZF9hcnJheS5sZW5ndGhcclxuICAgICAgICAgICAgPyB0aGlzLl9kZWZhdWx0X3NoYXJlX2lkXHJcbiAgICAgICAgICAgIDogdGhpcy5fc2hhcmVfaWRfYXJyYXlbVXRpbHMubWF0aF9yYW5kb20oITAsIDAsIHRoaXMuX3NoYXJlX2lkX2FycmF5Lmxlbmd0aCldO1xyXG5cclxuICAgICAgICBpZiAod2luZG93LnR0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy50dC5zaGFyZUFwcE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgY2hhbm5lbDogXCJ2aWRlb1wiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVJZDogc2hhcmVJRCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLl9zaGFyZV90aXRsZV9hcnJheSxcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcXVlcnk6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBleHRyYToge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvUGF0aDogdGhpcy5fdmlkZW9fcGF0aCxcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb1RvcGljczogdGhpcy5fc2hhcmVfdGl0bGVfYXJyYXlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliIbkuqvop4bpopHmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjb3JkX3N0YXJ0X3RpbWUgPSB0aGlzLl9yZWNvcmRfZW5kX3RpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzX3NoYXJlX3JlY29yZF92aWRlbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGwoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJfY2FjaGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy53eERvd25sb2FkZXIpIHtcclxuICAgICAgICAgICAgd2luZG93Lnd4RG93bmxvYWRlci5jbGVhbkFsbEFzc2V0cygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbGV0ZSBjYWNoZSBzdWNjZXNzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZm9sbG93KGNhbGxiYWNrOiB0eXBlLCBjb250ZXh0OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodHQuY2hlY2tGb2xsb3dTdGF0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBTeXN0ZW1JbmZvID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb2xsb3c6dHQuZ2V0U3lzdGVtSW5mb1N5bmMuYXBwTmFtZTpcIiwgU3lzdGVtSW5mby5hcHBOYW1lKTtcclxuICAgICAgICAgICAgaWYgKFwiVG91dGlhb1wiID09IFN5c3RlbUluZm8uYXBwTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlho3mo4DmtYvmnInmsqHmnInlhbPms6jmjqXlj6PvvIFmb2xsb3cgdHQuY2hlY2tGb2xsb3dTdGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd1dpZHRoOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd0hlaWdodDogMFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBmcmFtZS53aW5kb3dXaWR0aCA9IFN5c3RlbUluZm8ud2luZG93V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBmcmFtZS53aW5kb3dIZWlnaHQgPSBTeXN0ZW1JbmZvLndpbmRvd0hlaWdodDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3lzaW5mbzpcIiwgZnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgdHQuY2hlY2tGb2xsb3dTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor6XnlKjmiLflt7Lnu4/lhbPms6jkuoblhazkvJflj7fvvIHvvIHvvIFcIiwgdC5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXQucmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5kb3dubG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwczovL2NkbnJlcy5xc3poZy42aHdhbi5jb20vL3Rvd2VyX3Nob290L1wiICsgdGhpcy5fZm9sbG93X25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDIwMCA9PT0gdC5zdGF0dXNDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIm+W7umltYWdlc+WFs+azqOaMiemSrlwiKSwgY29uc29sZS5sb2coXCJcIiArIHQudGVtcEZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aW5kb3dXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2luZG93SGVpZ2h0ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJmb2xsb3cucG5nXCIgPT0gdGhpcy5fZm9sbG93X25hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dXaWR0aCA9IGZyYW1lLndpbmRvd1dpZHRoIC8gZ20uZGF0YS5kZXNpZ25fcmVzb2x1dGlvbi54ICogMTQ1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0hlaWdodCA9IGZyYW1lLndpbmRvd0hlaWdodCAvIGdtLmRhdGEuZGVzaWduX3Jlc29sdXRpb24ueSAqIDEwMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93V2lkdGggPSBmcmFtZS53aW5kb3dXaWR0aCAvIGdtLmRhdGEuZGVzaWduX3Jlc29sdXRpb24ueCAqIDYwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dIZWlnaHQgPSBmcmFtZS53aW5kb3dIZWlnaHQgLyBnbS5kYXRhLmRlc2lnbl9yZXNvbHV0aW9uLnkgKiA4MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVmdCA9IGZyYW1lLndpbmRvd1dpZHRoIC0gd2luZG93V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3AgPSBmcmFtZS53aW5kb3dIZWlnaHQgKiAoMzkxLjQ4NCAtIHdpbmRvd0hlaWdodCAvIDIpIC8gZ20uZGF0YS5kZXNpZ25fcmVzb2x1dGlvbi55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblZPLmRlc2lnblJlc29sdXRpb24ueDolcyxNYWluVk8uZGVzaWduUmVzb2x1dGlvbi55OiVzLlwiLCBnbS5kYXRhLmRlc2lnbl9yZXNvbHV0aW9uLngsIGdtLmRhdGEuZGVzaWduX3Jlc29sdXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd0J0biA9IHR0LmNyZWF0ZUZvbGxvd0J1dHRvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB0LnRlbXBGaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvd1dpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvd0hlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZmYwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb2xvcjogXCIjZmZmZmZmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCIjZmYwMDAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2xsb3dCdG4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd0J0bi5vblRhcCgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvbGxvd19jYWxsYmFjayhyZXMpOlwiLCBKU09OLnN0cmluZ2lmeSh0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IHQuZXJyQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93QnRuLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb2xsb3dfYnRuX3N0YXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbDogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkb3dubG9hZEZpbGXosIPnlKjlpLHotKXvvJpcIiwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlRm9sbG93QnRuIGlzIGZhaWwhXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZvbGxvd19idG5fc3RhdCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9sbG93X2J0bl9zdGF0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlX2ZvbGxvd19idG4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5mb2xsb3dCdG4gJiYgKHRoaXMuZm9sbG93QnRuLmhpZGUoKSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfZm9sbG93X2J0bigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISF0aGlzLmZvbGxvd0J0biAmJiAodGhpcy5mb2xsb3dCdG4uc2hvdygpLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXNlcl9zdWJzY3JpYmVfbWVzc2FnZSh0OiB7fSwgZTogc3RyaW5nW10gPSBbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0dC5yZXF1ZXN0U3Vic2NyaWJlTWVzc2FnZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0bXBsSWRzID0gMCA9PSBlLmxlbmd0aCA/IFtcIk1TRzExNTg2MjVhYWU2Zjg2MGE4OTJmNTVkNGY0ZGFlZTM1YzliOGM1YzEzNzMwXCJdIDogZTtcclxuICAgICAgICAgICAgdHQucmVxdWVzdFN1YnNjcmliZU1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdG1wbElkczogdG1wbElkcyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyU3Vic2NyaWJlTWVzc2FnZTpcIiwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gXCJodHRwczovL2dhbWVhcGlweS42aHdhbi5jb20vdXNlci9taW5pZ2FtZS90b3V0aWFvX2FwcC9zdWJzY3JpYmUvP2FwcGlkPXR0YWU3ZGQ4YzAzMTQ2YWUxYiZvcGVuaWQ9XCIgKyB0aGlzLnVzZXJPcGVuSWQgKyBcIiZ0ZW1wbGF0ZV9pZD1cIiArIEpTT04uc3RyaW5naWZ5KHRtcGxJZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlclN1YnNjcmliZU1lc3NhZ2UgdG1wVXJsOlwiLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR0LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlclN1YnNjcmliZU1lc3NhZ2UgcmVxdWVzdFN1YyBwYXJhMTpcIiwgSlNPTi5zdHJpbmdpZnkodCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsOiAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyU3Vic2NyaWJlTWVzc2FnZSByZXF1ZXN0RmFpbCBwYXJhMTpcIiwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnN0YXJ0X2RhdGEudXNlcl9zdWJzY3JpYmVfbWVzc2FnZV9zdGF0ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnN0YXJ0X2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBEb3VZaW5Gb2xsb3dCUygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkRPVVlJTlwiID09IHR0LmdldFN5c3RlbUluZm9TeW5jKCkuYXBwTmFtZS50b1VwcGVyQ2FzZSgpID8gdGhpcy5fZG91WWluRm9sbG93QnRuU3RhdCA6IFwiMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb3VZaW5Gb2xsb3coY2FsbGJhY2s6IHR5cGUsIGNvbnRleHQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0dC5vcGVuQXdlbWVVc2VyUHJvZmlsZSkge1xyXG4gICAgICAgICAgICB0dC5vcGVuQXdlbWVVc2VyUHJvZmlsZSgpO1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRfc2hhcmVfY29uZmlnKCk6IHZvaWQge1xyXG4gICAgICAgIHR0LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IHRoaXMuX3NoYXJlX2NvbmZpZ191cmwsXHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lLmxvZ2luIHJlcXVlc3RTdWMgcGFyYTI6XCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFwiZGF0YVwiIGluIHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJzaGFyZV90aXRsZV9hcnJheVwiIGluIHQuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaGFyZV90aXRsZV9hcnJheSA9IHQuZGF0YS5zaGFyZV90aXRsZV9hcnJheTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcImZvbGxvd19uYW1lXCIgaW4gdC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvbGxvd19uYW1lID0gdC5kYXRhLmZvbGxvd19uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiZG91WWluRm9sbG93QnRuU3RhdFwiIGluIHQuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb3VZaW5Gb2xsb3dCdG5TdGF0ID0gdC5kYXRhLmRvdVlpbkZvbGxvd0J0blN0YXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJ0dW9UaWFvRm9sbG93WFwiIGluIHQuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR1b1RpYW9Gb2xsb3dYID0gTnVtYmVyKHQuZGF0YS50dW9UaWFvRm9sbG93WCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJ0dW9UaWFvRm9sbG93WVwiIGluIHQuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR1b1RpYW9Gb2xsb3dZID0gTnVtYmVyKHQuZGF0YS50dW9UaWFvRm9sbG93WSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuX3NoYXJlX3RpdGxlX2FycmF5OiVzLHRoaXMuX2ZvbGxvd19uYW1lOiVzLHRoaXMuX2RvdVlpbkZvbGxvd0J0blN0YXQ6JXNcIiwgdGhpcy5fc2hhcmVfdGl0bGVfYXJyYXksIHRoaXMuX2ZvbGxvd19uYW1lLCB0aGlzLl9kb3VZaW5Gb2xsb3dCdG5TdGF0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMudHVvVGlhb0ZvbGxvd1g6JXMsdGhpcy50dW9UaWFvRm9sbG93WTolc1wiLCB0aGlzLnR1b1RpYW9Gb2xsb3dYLCB0aGlzLnR1b1RpYW9Gb2xsb3dZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHQubG9naW4gcmVxdWVzdEZhaWwgcGFyYTE6XCIsIHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbnZhc1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjYW52YXMgPSBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChjYy5DYW52YXMpO1xyXG4gICAgICAgIGNvbnN0IGRlc2lnblJlc29sdXRpb24gPSBjYW52YXMuZGVzaWduUmVzb2x1dGlvbjtcclxuICAgICAgICBjb25zdCBmcmFtZVNpemUgPSBjYy52aWV3LmdldEZyYW1lU2l6ZSgpO1xyXG4gICAgICAgIGNvbnN0IGZyYW1lV2lkdGggPSBmcmFtZVNpemUud2lkdGg7XHJcbiAgICAgICAgY29uc3QgZnJhbWVIZWlnaHQgPSBmcmFtZVNpemUuaGVpZ2h0O1xyXG5cclxuICAgICAgICBsZXQgbmV3V2lkdGggPSBmcmFtZVdpZHRoO1xyXG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSBmcmFtZUhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGZyYW1lSGVpZ2h0IC8gZnJhbWVXaWR0aCA+IGRlc2lnblJlc29sdXRpb24uaGVpZ2h0IC8gZGVzaWduUmVzb2x1dGlvbi53aWR0aCkge1xyXG4gICAgICAgICAgICBuZXdXaWR0aCA9IGRlc2lnblJlc29sdXRpb24ud2lkdGg7XHJcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IChmcmFtZUhlaWdodCAvIGZyYW1lV2lkdGgpICogbmV3V2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gZGVzaWduUmVzb2x1dGlvbi5oZWlnaHQ7XHJcbiAgICAgICAgICAgIG5ld1dpZHRoID0gKGZyYW1lV2lkdGggLyBmcmFtZUhlaWdodCkgKiBuZXdIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuZXdEZXNpZ25SZXNvbHV0aW9uID0gY2MudjIobmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcblxyXG4gICAgICAgIGdtLmRhdGEuZGVzaWduX3Jlc29sdXRpb24gPSBuZXdEZXNpZ25SZXNvbHV0aW9uO1xyXG4gICAgICAgIGNjLmxvZyhcIk1haW5WTy5kZXNpZ25SZXNvbHV0aW9uOiAlc1wiLCBKU09OLnN0cmluZ2lmeShuZXdEZXNpZ25SZXNvbHV0aW9uKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrU2hvcnRjdXQoY2FsbDogKG51bTogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdHQuY2hlY2tTaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uRW50ZXJNYWluU2NlbmUgY2hlY2tTaG9ydGN1dCByZXM6XCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHQgJiYgdC5zdGF0dXMgJiYgdC5zdGF0dXMuZXhpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodC5zdGF0dXMubmVlZFVwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGwoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsKDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uRW50ZXJNYWluU2NlbmUgY2hlY2tTaG9ydGN1dCBmYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgY2FsbCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFNob3J0Y3V0KGNhbGw6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0dC5hZGRTaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2hvd0FkZFRvRGVza0hpbnQg5oiQ5Yqf5re75Yqg5Yiw5qGM6Z2iXCIpO1xyXG4gICAgICAgICAgICAgICAgY2FsbCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNob3dBZGRUb0Rlc2tIaW50IOa3u+WKoOWIsOahjOmdouWksei0pe+8gemql+S6uueahFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyLnN0YXJ0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU2hvcnRjdXQoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGltZXIuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAyMDAwLCAyMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufSJdfQ==