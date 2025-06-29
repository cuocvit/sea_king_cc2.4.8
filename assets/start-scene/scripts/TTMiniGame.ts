"use strict";
import { gm } from "./GameManager";
import { ChannelManager, REWARD_VIDEO_AD_TYPE, BANNER_AD_TYPE } from "./ChannelManager";
import { Utils } from "./Utils";
import { NetUtils, ReportData } from "./NetUtils";
import { Timer } from "./Timer";

interface type {
    call: (context: any, num?: number) => any
}

interface BaseAd {
    show(): Promise<void>;
    destroy(): void;
    onLoad(callback: () => void): void;
    onError(callback: (err: any) => void): void;
}

interface BannerAd extends BaseAd {
    hide(): void;
    onResize(callback: (size: { width: number, height: number }) => void): void;
    style: {
        width: number;
        top: number;
        left: number;
    };
}

interface RewardedVideoAd extends BaseAd {
    load(): Promise<void>;
    onClose(callback: (res: { isEnded: boolean }) => void): void;
}

interface InterstitialAd extends BaseAd {
    load(): void;
}

interface FollowButton {
    onTap(callback: (t: { errCode: number }) => void): void;
    show(): void;
    hide(): void;
    destroy?: () => void;
}


export class TTMiniGame {
    static _instance: TTMiniGame = null;
    static ad_enable: boolean = true;
    private _min_banner_ad_width: number;
    private _banner_ad_id_array: string[];
    private _video_ad_id_array: string[];
    private _interstitial_ad_id: string;
    private _interstitial_ad_is_show: number;
    private _banner_ad_array: BannerAd[];
    private _banner_ad_flag_array: boolean[];
    private _banner_ad_loaded_array: boolean[];
    private _video_ad_array: RewardedVideoAd[];
    private _video_cb_array: type[];
    private _video_cb_target_array: ChannelManager[];
    private _video_close_cb_array: type[];
    private _video_close_cb_target_array: ChannelManager[];
    private _interstitial_ad: InterstitialAd;
    private _share_id_array: string[];
    private _default_share_id: string;
    private _share_config_url: string;
    private _record_start_time: number;
    private _record_end_time: number;
    private _is_share_record_video: boolean;
    private _is_restart: boolean;
    private _if_need_video_share: boolean;
    private _video_path: string;
    private _follow_name: string;
    private _follow_btn_stat: boolean;
    private userOpenId: string;
    private _share_title_array: string[];
    private _douYinFollowBtnStat: string;
    public code: string;
    private last_call_show_video_ad: number;
    private _timer: Timer;
    private followBtn: FollowButton;
    private tuoTiaoFollowX: number;
    private tuoTiaoFollowY: number;

    constructor() {
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
        this._timer = new Timer;
    }

    public static get instance() {
        if (!this._instance) {
            this._instance = new TTMiniGame;
        }
        return this._instance;
    }

    public load_channel_env(call: () => void): boolean {
        if (this.canvasResize(), window.tt) {
            window.tt.onHide(() => { });
            window.tt.onShow(() => { });
            this._banner_ad_id_array[i.BANNER_AD_TYPE.ALL] = "7f8ah33f9im064g0k0";
            this._video_ad_id_array[i.REWARD_VIDEO_AD_TYPE.ALL] = "54mbll5521bl2nc900";
            this._interstitial_ad_id = "2q94tj02hmdl6k9jfd";
            console.log("tt" + JSON.stringify(window.tt));
            this._share_id_array = ChannelManager.SHARE_CONFIG.share_id_array;
            this.load_share_config();
            call();
            this.loginVerify();
            return true;
        }
    }

    public get_code(call: (code: string, num: number) => void): void {
        window.tt.login({
            force: false,
            success: (t) => {
                if (t.isLogin && t.code) {
                    this.code = t.code;
                    call(this.code, 0);
                } else if (!t.isLogin && t.anonymousCode) {
                    this.code = t.anonymousCode;
                    call(this.code, 1);
                }
            },
            fail: () => {
                console.log("login调用失败");
            }
        });
    }

    public load_sub_packages_env(call: () => void): boolean {
        call();
        return true;
    }

    public get_app_name(): string {
        if (window.tt && window.tt.getSystemInfoSync) {
            return window.tt.getSystemInfoSync().appName;
        } else {
            return ChannelManager.UNKNOWN;
        }
    }

    public get is_rank(): boolean {
        return true;
    }

    public get is_share(): boolean {
        return true;
    }

    public get is_video_share(): boolean {
        return true;
    }

    public vibrate_short(): void {
        tt.vibrateShort && tt.vibrateShort({
            success: (t) => {
                console.log("" + t);
            },
            fail: () => {
                console.log("vibrateShort调用失败");
            }
        });
    }

    public vibrate_long(): void {
        tt.vibrateLong && tt.vibrateLong({
            success: (t) => {
                console.log("" + t);
            },
            fail: () => {
                console.log("vibrateLong调用失败");
            }
        })
    }

    public get is_support_more_game(): boolean {
        return "ios" != window.tt.getSystemInfoSync().platform && !!(window.tt.onMoreGamesModalClose && window.tt.onNavigateToMiniProgram && window.tt.showMoreGamesModal);
    }

    public show_more_game(callback: type, context): void {
        if (this.is_support_more_game) {
            window.tt.onMoreGamesModalClose((t) => {
                console.log("modal closed", t)
            });

            window.tt.onNavigateToMiniProgram((t) => {
                console.log(t.errCode), console.log(t.errMsg)
            });

            window.tt.showMoreGamesModal({
                appLaunchOptions: [],
                success: (t) => {
                    console.log("success", t.errMsg);
                    if (callback && context) {
                        callback.call(context, 0);
                    }
                },
                fail: (t) => {
                    console.log("fail", t.errMsg);
                    if (callback && context) {
                        callback.call(context, 1);
                    }
                }
            })
        }
    }

    public get is_support_interstitial_ad(): boolean {
        if ("devtools" != this.get_app_name() && tt.createInterstitialAd) {
            console.log("is_support_interstitial_ad  createInterstitialAd: true");
            return true;
        } else {
            console.log("is_support_interstitial_ad: false");
            return false;
        }
    }

    public show_interstitial_ad(callback: type, context: any): void {
        if (this.is_support_interstitial_ad) {
            if (0 == this._interstitial_ad_is_show || 2 == this._interstitial_ad_is_show) {
                if (2 == this._interstitial_ad_is_show) {
                    this._interstitial_ad.destroy();
                }
                this._interstitial_ad_is_show = 0;
                this._interstitial_ad = tt.createInterstitialAd({
                    adUnitId: this._interstitial_ad_id
                });

                this._interstitial_ad.onLoad(() => {
                    this._interstitial_ad_is_show = 1;
                    this._interstitial_ad.show().then(() => {
                        this._interstitial_ad_is_show = 2;
                        console.log("插屏广告展示成功");
                        if (callback && context) {
                            callback.call(context, 0);
                        }
                    }).catch(() => {
                        if (callback && context) {
                            callback.call(context, 1);
                        }
                    })
                });

                this._interstitial_ad.onError((t) => {
                    console.log("errCode:" + t.errCode + " errMsg:" + t.errMsg);
                    if (callback && context) {
                        callback.call(context, 1);
                    }
                });

            } else if (1 == this._interstitial_ad_is_show) {
                this._interstitial_ad.onLoad(() => {
                    this._interstitial_ad_is_show = 1;
                    this._interstitial_ad.show().then(() => {
                        this._interstitial_ad_is_show = 2;
                        console.log("插屏广告展示成功");
                        if (callback && context) {
                            callback.call(context, 0);
                        }
                    }).catch(() => {
                        if (callback && context) {
                            callback.call(context, 1);
                        }
                    })
                });

                this._interstitial_ad.onError((t) => {
                    console.log("errCode:" + t.errCode + " errMsg:" + t.errMsg);
                    if (callback && context) {
                        callback.call(context, 1);
                    }
                });
                this._interstitial_ad.load();
            }
        } else {
            if (callback && context) {
                callback.call(context, 1);
            }
        }
    }

    private loginVerify(): boolean {
        tt.showShareMenu({
            withShareTicket: false
        });
        tt.onShareAppMessage(() => {
            return {
                title: "海王就是我",
                imageUrl: "https://cdnres.qszhg.6hwan.com/tower_shoot/share/4.jpg",
                query: "",
                success: (t) => {
                    console.log("转发成功"), console.log(t)
                },
                fail: (t) => {
                    console.log("fail tt onShareAppMessage" + t)
                }
            }
        });
        return true;
    }

    public share_req(callback: type, context: any): boolean {
        if (window.tt) {
            const share = 0 == this._share_id_array.length
                ? this._default_share_id
                : this._share_id_array[Utils.math_random(true, 0, this._share_id_array.length)];
            window.tt.shareAppMessage({
                templateId: share,
                query: "",
                success: () => {
                    console.log("分享成功");
                    callback.call(context);
                },
                fail: () => {
                    console.log("分享失败");
                }
            });
        }
        return true;
    }

    private create_banner_ad(): void {
        if (window.tt) {
            const systemInfo = window.tt.getSystemInfoSync();
            const windowWidth = systemInfo.windowWidth;
            const windowHeight = systemInfo.windowHeight;
            for (let index = 0; index < this._banner_ad_id_array.length; index++) {
                (() => {
                    const i = index;
                    const banner = this._banner_ad_id_array[i];
                    if (null != banner && "" != banner) {
                        const createBanner: BannerAd = window.tt.createBannerAd({
                            adUnitId: banner,
                            adIntervals: 30,
                            style: {
                                width: this._min_banner_ad_width,
                                top: windowHeight,
                                left: (windowWidth - this._min_banner_ad_width) / 2
                            }
                        });

                        this._banner_ad_array.push(createBanner)
                        createBanner.onLoad(() => {
                            console.log("banner ad id:" + banner + " onLoad");
                            this._banner_ad_loaded_array[t] = true;
                        });

                        createBanner.onResize((t) => {
                            createBanner.style.left = (windowWidth - t.width) / 2;
                            createBanner.style.top = windowHeight - t.height;
                            console.log("banner_ad.onResize:", t.width, t.height);

                            const getDevicePixelRatio = cc.view.getDevicePixelRatio();
                            const getScaleX = cc.view.getScaleX();
                            console.log("banner need design size:", t.width * getDevicePixelRatio / getScaleX, t.height * getDevicePixelRatio / getScaleX);
                        });
                    }
                })();
            }
        }
    }

    public show_banner_ad(param: BANNER_AD_TYPE): void {
        if (this._banner_ad_loaded_array[param]) {
            this._banner_ad_flag_array[param] = true;
            const banner = this._banner_ad_array[param];
            banner.show().then(() => {
                if (this._banner_ad_flag_array[param]) {
                    console.log("广告显示成功");
                } else {
                    banner.hide();
                    console.log("广告显示慢了，不需要显示了");
                }
            }).catch((t) => {
                console.log("广告组件出现问题", t);
            })
        }
    }

    public hide_banner_ad(param: BANNER_AD_TYPE): void {
        if (this._banner_ad_loaded_array[param]) {
            const banner = this._banner_ad_array[param];
            if (banner) {
                banner.hide();
                this._banner_ad_flag_array[param] = false;
            }
        }
    }

    private create_video_ad(): void {
        if (null != window.tt && null != window.tt.createRewardedVideoAd) {
            for (let index = 0; index < this._video_ad_id_array.length; index++) {
                this._video_ad_array[index] = window.tt.createRewardedVideoAd({
                    adUnitId: this._video_ad_id_array[index]
                });
                this.on_video_ad_handler(index);
            }
        }
    }

    private on_video_ad_handler(index: number): void {
        this._video_ad_array[index].onClose((res) => {
            if (res && res.isEnded || res == undefined) {
                console.log("视频广告 正常播放结束");
                this._video_cb_array[index].call(this._video_cb_target_array[index], 0);
            } else {
                console.log("视频广告 播放中途退出");
                gm.ui.show_notice("Không có phần thưởng khi kết thúc quảng cáo video");
                if (this._video_close_cb_array[index] && this._video_close_cb_target_array[index]) {
                    this._video_close_cb_array[index].call(this._video_close_cb_target_array[index]);
                }
            }
            cc.game.resume();
        });

        this._video_ad_array[index].onError((t) => {
            console.log(t);
            console.log("加载失败，稍后再试");

            if (1e3 == t.errCode) {
                ReportData.instance.report_once_point(10651);
                ReportData.instance.report_point(10652);
            } else if (1003 == t.errCode) {
                ReportData.instance.report_once_point(10653);
                ReportData.instance.report_point(10654);
            } else if (1004 == t.errCode) {
                ReportData.instance.report_once_point(10655);
                ReportData.instance.report_point(10656);
            } else if (1005 == t.errCode) {
                ReportData.instance.report_once_point(10657);
                ReportData.instance.report_point(10658);
            } else if (1006 == t.errCode) {
                ReportData.instance.report_once_point(10659);
                ReportData.instance.report_point(10660);
            } else if (1007 == t.errCode) {
                ReportData.instance.report_once_point(10661);
                ReportData.instance.report_point(10662);
            } else if (1008 == t.errCode) {
                ReportData.instance.report_once_point(10663);
                ReportData.instance.report_point(10664);
            } else if (120002 == t.errCode) {
                ReportData.instance.report_once_point(10665);
                ReportData.instance.report_point(10666);
            }
        });
    }

    public show_video_ad(callback: (result: number) => void, chanel: ChannelManager, videoType: REWARD_VIDEO_AD_TYPE, callback1: () => void, channel1: ChannelManager): void {
        if (Date.now() - this.last_call_show_video_ad < 3000) {
            gm.ui.show_notice("Nhấp quá thường xuyên, vui lòng thử lại sau 3 giây");
        } else {
            this.last_call_show_video_ad = Date.now();
            this._video_cb_array[videoType] = callback;
            this._video_cb_target_array[videoType] = chanel;
            this._video_close_cb_array[videoType] = callback1;
            this._video_close_cb_target_array[videoType] = channel1;
            let videoAd = this._video_ad_array[videoType];
            if (videoAd) {
                this.create_video_ad();
                videoAd = this._video_ad_array[videoType];
            }
            if (gm.data.main_data && gm.data.main_data.is_today_no_ad) {
                if (0 < gm.data.main_data.left_share_count) {
                    gm.channel.share_req(() => {
                        gm.data.main_data.left_share_count--;
                        gm.data.main_data.async_write_data();
                        if (callback) {
                            callback.call(chanel, 1);
                        }
                    }, this);
                } else {
                    gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                }
            } else {
                videoAd.load().then(() => {
                    console.log("手动加载成功");
                    videoAd.show().then(() => {
                        console.log("视频广告显示成功");
                        cc.game.pause();
                    }).catch((t) => {
                        if (120002 == t.errCode) {
                            gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                            gm.data.main_data.is_today_no_ad = true;
                            gm.data.main_data.async_write_data();
                        } else {
                            gm.ui.show_notice("Video đang phát thường xuyên. Vui lòng thử lại sau một lúc.");
                        }

                        if (0 < gm.data.main_data.left_share_count) {
                            gm.channel.share_req(() => {
                                gm.data.main_data.left_share_count--;
                                gm.data.main_data.async_write_data();
                                if (callback) {
                                    callback.call(chanel, 1);
                                }
                            }, this);
                        }
                    })
                })
            }
        }
    }

    private retry_show_video_ad(t: RewardedVideoAd, e: type, a: any): void {
        t.load().then(() => {
            console.log("视频手动加载成功");
            t.show().then(() => {
                console.log("重新拉取，视频广告显示成功");
                cc.game.pause();
            }).catch((t) => {
                console.log("重新拉取失败", t);
                if (1004 == t.errCode) {
                    gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                } else {
                    gm.ui.show_notice("Video đang phát thường xuyên. Vui lòng thử lại sau một lúc.");
                }

                if (0 < gm.data.main_data.left_share_count) {
                    gm.channel.share_req(() => {
                        gm.data.main_data.left_share_count--;
                        gm.data.main_data.async_write_data();
                        if (e) {
                            e.call(a, 1);
                        }
                    }, this);
                }
            });
        });
    }

    public set_rank_value(): void {
        if (window.tt) {
            window.tt.setUserGroup({
                groupId: "level_group"
            });

            const object = {
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
    }

    public get_rank_data(): boolean {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 0
            });
        }
        return true;
    }

    public set_rank_close(): void {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 99
            });
        }
    }

    public get_self_rank_data(): boolean {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 300
            });
        }
        return true;
    }

    public set_self_rank_close(): void {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 301
            });
        }
    }

    public on_rank_pre_page_click(): void {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 100
            });
        }
    }

    public on_rank_next_page_click(): void {
        if (window.tt) {
            window.tt.getOpenDataContext().postMessage({
                message: 101
            });
        }
    }

    private checkIfCanRecord(): boolean {
        return true;
    }

    public record_start(): void {
        if (window.tt && window.tt.getGameRecorderManager) {
            const GameRecorder = window.tt.getGameRecorderManager();
            GameRecorder.onStart(() => {
                console.log("录屏开始");
                this._record_start_time = Date.now();
                this._is_restart = false;
            });

            this._is_restart = true;
            GameRecorder.start({
                duration: 180
            });

            GameRecorder.onStop((t) => {
                console.log("录屏结束");
                this._record_end_time = Date.now();
                this._is_share_record_video = false;
                console.log(t.videoPath);
                this._video_path = t.videoPath;
                this.share_video(false);
                if (this._is_restart) {
                    setTimeout(() => {
                        this.record_start();
                    }, .017);
                }
            });
        }
    }

    public record_stop(param: boolean): void {
        if (window.tt && window.tt.getGameRecorderManager) {
            this._if_need_video_share = param;
            window.tt.getGameRecorderManager().stop();
        }
    }

    public share_video(t: any, call?: (num: number) => any): void {
        if (t || this._if_need_video_share) {
            if (0 < this._record_end_time && this._record_end_time - this._record_start_time < 3017) {
                gm.ui.show_notice(gm.const.TEXT_19);
            } else {
                const shareID = 0 == this._share_id_array.length
                    ? this._default_share_id
                    : this._share_id_array[Utils.math_random(true, 0, this._share_id_array.length)];

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
                    success: () => {
                        console.log("分享视频成功");
                        this._record_start_time = this._record_end_time = 0;
                        this._is_share_record_video = true;
                        if (call) {
                            call(0);
                        }
                    },
                    fail: () => {
                        console.log("分享视频失败");
                        if (call) {
                            call(1);
                        }
                    }
                })
            }
        }
    }

    public viedo_share(param: boolean, call: (num: number) => void): void {
        const shareID = 0 == this._share_id_array.length
            ? this._default_share_id
            : this._share_id_array[Utils.math_random(!0, 0, this._share_id_array.length)];

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
                success: () => {
                    console.log("分享视频成功");
                    this._record_start_time = this._record_end_time = 0;
                    this._is_share_record_video = true;
                    if (call) {
                        call(0);
                    }
                },
                fail: () => {
                    console.log("分享视频失败");
                    if (call) {
                        call(1);
                    }
                }
            });
        }


    }

    public clear_cache(): void {
        if (window.wxDownloader) {
            window.wxDownloader.cleanAllAssets();
            console.log("delete cache success");
        }
    }

    public follow(callback: type, context: any): boolean {
        if (tt.checkFollowState) {
            const SystemInfo = tt.getSystemInfoSync();
            console.log("follow:tt.getSystemInfoSync.appName:", SystemInfo.appName);
            if ("Toutiao" == SystemInfo.appName) {
                console.log("再检测有没有关注接口！follow tt.checkFollowState");
                const frame = {
                    windowWidth: 0,
                    windowHeight: 0
                };

                frame.windowWidth = SystemInfo.windowWidth;
                frame.windowHeight = SystemInfo.windowHeight;
                console.log("sysinfo:", frame);
                tt.checkFollowState({
                    success: (t) => {
                        console.log("该用户已经关注了公众号！！！", t.result);
                        if (!t.result) {
                            tt.downloadFile({
                                url: "https://cdnres.qszhg.6hwan.com//tower_shoot/" + this._follow_name,
                                success: (t) => {
                                    if (200 === t.statusCode) {
                                        console.log("创建images关注按钮"), console.log("" + t.tempFilePath);
                                        let windowWidth = 0;
                                        let windowHeight = 0;

                                        if ("follow.png" == this._follow_name) {
                                            windowWidth = frame.windowWidth / gm.data.design_resolution.x * 145;
                                            windowHeight = frame.windowHeight / gm.data.design_resolution.y * 101;
                                        } else {
                                            windowWidth = frame.windowWidth / gm.data.design_resolution.x * 600;
                                            windowHeight = frame.windowHeight / gm.data.design_resolution.y * 800;
                                        }

                                        const left = frame.windowWidth - windowWidth;
                                        const top = frame.windowHeight * (391.484 - windowHeight / 2) / gm.data.design_resolution.y;

                                        console.log("MainVO.designResolution.x:%s,MainVO.designResolution.y:%s.", gm.data.design_resolution.x, gm.data.design_resolution.y);
                                        this.followBtn = tt.createFollowButton({
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

                                        if (this.followBtn) {
                                            this.followBtn.onTap((t) => {
                                                console.log("follow_callback(res):", JSON.stringify(t));
                                                if (0 == t.errCode) {
                                                    callback.call(context);
                                                }
                                            });
                                            this.followBtn.show();
                                            this._follow_btn_stat = true;
                                            return;
                                        }
                                    }
                                },
                                fail: (t) => {
                                    console.log("downloadFile调用失败：", t);
                                }
                            });
                        }
                    },
                    fail: (t) => {
                        console.log("createFollowBtn is fail!", t);
                    }
                });
            }
            return false;
        }
    }

    public follow_btn_stat(): boolean {
        return this._follow_btn_stat;
    }

    public hide_follow_btn(): boolean {
        return !!this.followBtn && (this.followBtn.hide(), true);
    }

    public show_follow_btn(): boolean {
        return !!this.followBtn && (this.followBtn.show(), true);
    }

    public user_subscribe_message(t: {}, e: string[] = []): void {
        if (tt.requestSubscribeMessage) {
            const tmplIds = 0 == e.length ? ["MSG1158625aae6f860a892f55d4f4daee35c9b8c5c13730"] : e;
            tt.requestSubscribeMessage({
                tmplIds: tmplIds,
                success: (t) => {
                    console.log("userSubscribeMessage:", t);
                    const url = "https://gameapipy.6hwan.com/user/minigame/toutiao_app/subscribe/?appid=ttae7dd8c03146ae1b&openid=" + this.userOpenId + "&template_id=" + JSON.stringify(tmplIds);
                    console.log("userSubscribeMessage tmpUrl:", url);
                    tt.request({
                        url: url,
                        success: (t) => {
                            console.log("userSubscribeMessage requestSuc para1:", JSON.stringify(t));
                        },
                        fail: (t) => {
                            console.log("userSubscribeMessage requestFail para1:", t);
                        }
                    });
                    gm.data.start_data.user_subscribe_message_stat = 1;
                    gm.data.start_data.async_write_data();
                },
                fail: (t) => {
                    console.log(t);
                }
            })
        }
    }

    public DouYinFollowBS(): string {
        return "DOUYIN" == tt.getSystemInfoSync().appName.toUpperCase() ? this._douYinFollowBtnStat : "0";
    }

    public douYinFollow(callback: type, context: any): void {
        if (tt.openAwemeUserProfile) {
            tt.openAwemeUserProfile();
            callback.call(context);
        }
    }

    private load_share_config(): void {
        tt.request({
            url: this._share_config_url,
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: (t) => {
                console.log("game.login requestSuc para2:", t);
                if ("data" in t) {
                    if ("share_title_array" in t.data) {
                        this._share_title_array = t.data.share_title_array;
                    }

                    if ("follow_name" in t.data) {
                        this._follow_name = t.data.follow_name;
                    }

                    if ("douYinFollowBtnStat" in t.data) {
                        this._douYinFollowBtnStat = t.data.douYinFollowBtnStat;
                    }

                    if ("tuoTiaoFollowX" in t.data) {
                        this.tuoTiaoFollowX = Number(t.data.tuoTiaoFollowX);
                    }

                    if ("tuoTiaoFollowY" in t.data) {
                        this.tuoTiaoFollowY = Number(t.data.tuoTiaoFollowY);
                    }

                    console.log("this._share_title_array:%s,this._follow_name:%s,this._douYinFollowBtnStat:%s", this._share_title_array, this._follow_name, this._douYinFollowBtnStat);
                    console.log("this.tuoTiaoFollowX:%s,this.tuoTiaoFollowY:%s", this.tuoTiaoFollowX, this.tuoTiaoFollowY);
                }
            },
            fail: (t) => {
                console.log("tt.login requestFail para1:", t);
            }
        })
    }

    private canvasResize(): void {
        const canvas = cc.find("Canvas").getComponent(cc.Canvas);
        const designResolution = canvas.designResolution;
        const frameSize = cc.view.getFrameSize();
        const frameWidth = frameSize.width;
        const frameHeight = frameSize.height;

        let newWidth = frameWidth;
        let newHeight = frameHeight;

        if (frameHeight / frameWidth > designResolution.height / designResolution.width) {
            newWidth = designResolution.width;
            newHeight = (frameHeight / frameWidth) * newWidth;
        } else {
            newHeight = designResolution.height;
            newWidth = (frameWidth / frameHeight) * newHeight;
        }

        const newDesignResolution = cc.v2(newWidth, newHeight);

        gm.data.design_resolution = newDesignResolution;
        cc.log("MainVO.designResolution: %s", JSON.stringify(newDesignResolution));
    }

    public checkShortcut(call: (num: number) => void): void {
        tt.checkShortcut({
            success: (t) => {
                console.log("onEnterMainScene checkShortcut res:", t);
                if (t && t.status && t.status.exist) {
                    if (t.status.needUpdate) {
                        call(1);
                    } else {
                        call(0);
                    }
                } else {
                    call(2);
                }
            },
            fail: () => {
                console.log("onEnterMainScene checkShortcut fail");
                call(2);
            }
        })
    }

    public addShortcut(call: () => void): void {
        tt.addShortcut({
            success: () => {
                console.log("showAddToDeskHint 成功添加到桌面");
                call();
            },
            fail: () => {
                console.log("showAddToDeskHint 添加到桌面失败！骗人的");
                this._timer.stop();
                this._timer.start(() => {
                    this.checkShortcut((t) => {
                        if (t <= 1) {
                            this._timer.stop();
                            call();
                        }
                    });
                }, 2000, 20);
            }
        })
    }

}