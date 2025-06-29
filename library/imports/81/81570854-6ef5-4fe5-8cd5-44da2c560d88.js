"use strict";
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