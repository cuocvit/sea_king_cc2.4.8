import { gm } from "./GameManager";
import { ChannelManager, BANNER_AD_TYPE, REWARD_VIDEO_AD_TYPE } from "./ChannelManager";
import { Utils } from "./Utils";
import { IAd } from "./VIVOMiniGame"

interface Share {
    title: string,
    url: string
}

export interface BannerAd extends IAd {
    style: {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    onResize(callback: (size: { width: number; height: number }) => void): void;
}

export interface VDCallback {
    call: (context: ChannelManager) => void;
    apply?: (target: ChannelManager) => void;
}


export class WXMiniGame {
    private static _instance: WXMiniGame = null;
    public static ad_enable: boolean = false;
    private _min_banner_ad_width: number;
    private _banner_ad_id_array: string[];
    private _video_ad_id_array: string[];
    private _interstitial_ad_id: string;
    private _grid_ad_id: string;
    private _banner_ad_array: BannerAd[];
    private _banner_ad_flag_array: boolean[];
    private _banner_ad_loaded_array: boolean[];
    private _video_ad_array: IAd[];
    private _video_cb_array: VDCallback[];
    private _video_cb_target_array: ChannelManager[];
    private _interstitial_ad: IAd;
    private _interstitial_ad_loaded: boolean;
    private _app_box: IAd;
    private _app_box_loaded: boolean;
    private _share_array: Share[];
    private _default_share: Share;
    private _record_start_time: number;
    private _record_end_time: number;
    private _is_share_record_video: boolean;
    private _is_restart: boolean;
    private _ifNeedVideoShare: boolean;
    private _videoPath: string;

    constructor() {
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

    public static get instance(): WXMiniGame {
        if (!this._instance) {
            this._instance = new WXMiniGame();
        }
        return this._instance;
    }

    public load_channel_env(call: () => void): boolean {
        window.wx.onHide(() => { });
        window.wx.onShow(() => { }); 
        this._banner_ad_id_array[BANNER_AD_TYPE.ALL] = "adunit-797181240a995471";
        this._video_ad_id_array[REWARD_VIDEO_AD_TYPE.ALL] = "adunit-edb2928f9bc53151";
        this._interstitial_ad_id = "adunit-63d522433c1429a9";
        this._grid_ad_id = "";
        console.log("wx" + JSON.stringify(window.wx));
        window.wx.login({});
        this._share_array = ChannelManager.SHARE_CONFIG.share_array;
        this.show_share_menu();
        call();
        return true;
    }

    private show_share_menu(): boolean {
        console.log("WXMiniGame.show_share_menu is begin!");
        window.wx.showShareMenu({});
        window.wx.onShareAppMessage(() => {
            let share: Share;
            if (0 == this._share_array.length) {
                share = this._default_share;
            } else {
                share = this._share_array[Utils.math_random(true, 0, this._share_array.length)];
            }

            return {
                title: share.title,
                imageUrl: share.url,
                success: (t) => {
                    console.log("转发成功"), console.log(t);
                },
                fail: (t) => {
                    console.log("fail wx onShareAppMessage" + t);
                }
            }
        });
        console.log("WXMiniGame.show_share_menu is end!");
        return true;
    }

    public load_sub_packages_env(call: () => void): boolean {
        call();
        return true;
    }

    public get is_share(): boolean {
        return true;
    }

    public get is_video_share(): boolean {
        return false;
    }

    public get_app_name(): string {
        return ChannelManager.APP_WE_CHAT;
    }

    public vibrate_short(): void {
        if (wx.vibrateShort) {
            wx.vibrateShort({
                success: (t) => {
                    console.log("" + t);
                },
                fail: () => {
                    console.log("vibrateShort调用失败");
                }
            });
        }
    }

    public vibrate_long(): void {
        if (wx.vibrateLong) {
            wx.vibrateLong({
                success: (t) => {
                    console.log("" + t);
                },
                fail: () => {
                    console.log("vibrateLong调用失败");
                }
            });
        }
    }

    public get is_rank(): boolean {
        return true;
    }

    public get is_support_more_game(): boolean {
        return "ios" != window.wx.getSystemInfoSync().platform && !!(window.wx.navigateToMiniProgram && window.wx.onNavigateToMiniProgram && window.wx.showMoreGamesModal);
    }

    public show_more_game(callback: { call: (reS: any, context: number) => void }, context: any): void {
        if (this.is_support_more_game) {
            window.wx.onMoreGamesModalClose((t) => {
                console.log("modal closed", t);
            });

            window.wx.onNavigateToMiniProgram((t) => {
                console.log(t.errCode);
                console.log(t.errMsg);
            });

            window.wx.showMoreGamesModal({
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
            });
        }
    }

    public share_req(callback?: any, context?: any): boolean {
        let share: Share = undefined
        if (0 == this._share_array.length) {
            share = this._default_share;
        } else {
            share = this._share_array[Utils.math_random(!0, 0, this._share_array.length)];
        }

        if (window.wx.shareAppMessage && share) {
            window.wx.shareAppMessage({
                title: share.title,
                imageUrl: share.url,
                success: (t) => {
                    console.log("转发到群的结果"), console.log(t)
                },
                fail: (t) => {
                    console.log(t)
                }
            });
        }
        return true;
    }

    private loginReport(): void { }

    public create_banner_ad(): void {
        if (window.wx) {
            const SystemInfo = window.wx.getSystemInfoSync();
            const windowWidth = SystemInfo.windowWidth;
            const windowHeight = SystemInfo.windowHeight;

            for (let s = 0; s < this._banner_ad_id_array.length; s++) {
                (() => {
                    const t = s;
                    const banner = this._banner_ad_id_array[t];
                    if (null != banner && "" != banner) {
                        const createBannerAd: BannerAd = wx.createBannerAd({
                            adUnitId: banner,
                            adIntervals: 30,
                            style: {
                                width: this._min_banner_ad_width,
                                top: windowHeight,
                                left: (windowWidth - this._min_banner_ad_width) / 2
                            }
                        });

                        this._banner_ad_array.push(createBannerAd);
                        createBannerAd.onLoad(() => {
                            console.log("banner ad id:" + banner + " onLoad");
                            this._banner_ad_loaded_array[t] = true;
                        });

                        createBannerAd.onResize((t) => {
                            createBannerAd.style.left = (windowWidth - t.width) / 2;
                            createBannerAd.style.top = windowHeight - t.height;
                            console.log("banner_ad.onResize:", t.width, t.height);

                            const getDevicePixelRatio = cc.view.getDevicePixelRatio();
                            const getScaleX = cc.view.getScaleX();

                            console.log("banner need design size:", t.width * getDevicePixelRatio / getScaleX, t.height * getDevicePixelRatio / getScaleX);
                        });

                        createBannerAd.onError((t) => {
                            console.log(t);
                        });
                    }
                })();
            }
        }
    }

    public show_banner_ad(index: BANNER_AD_TYPE): void {
        if (this._banner_ad_loaded_array[index]) {
            this._banner_ad_flag_array[index] = true;
            const banner = this._banner_ad_array[index];
            banner.show().then(() => {
                if (this._banner_ad_flag_array[index]) {
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

    public hide_banner_ad(index: BANNER_AD_TYPE): void {
        if (this._banner_ad_loaded_array[index]) {
            const banner = this._banner_ad_array[index];
            if (banner) {
                banner.hide();
                this._banner_ad_flag_array[index] = false;
            }
        }
    }

    public create_video_ad(): void {
        if (null != window.wx.createRewardedVideoAd) {
            const SystemInfo = wx.getSystemInfoSync().SDKVersion;
            if (0 <= gm.channel.compare_version(SystemInfo, "2.8.0")) {
                console.log("该设备支持激励视频广告的多例模式");
                for (let index = 0; index < this._video_ad_id_array.length; index++) {
                    this._video_ad_array[index] = window.wx.createRewardedVideoAd({
                        adUnitId: this._video_ad_id_array[index],
                        multiton: true
                    });
                    this.on_video_ad_handler(index);
                }

            } else {
                console.log("该设备不支持激励视频广告的多例模式");
                const index = REWARD_VIDEO_AD_TYPE.ALL;
                this._video_ad_array[index] = window.wx.createRewardedVideoAd({
                    adUnitId: this._video_ad_id_array[index]
                });
                this.on_video_ad_handler(index);
            }
        }
    }

    private on_video_ad_handler(index: number): void {
        this._video_ad_array[index].onClose((t) => {
            cc.game.resume();
            if (t && t.isEnded || undefined === t) {
                console.log("视频广告 正常播放结束");
                this._video_cb_array[index].apply(this._video_cb_target_array[index]);
            } else {
                console.log("视频广告 播放中途退出");
                gm.ui.show_notice("Không có phần thưởng khi kết thúc quảng cáo video");
            }
        });

        this._video_ad_array[index].onLoad(() => {
            console.log("激励视频 广告加载成功");
        });

        this._video_ad_array[index].onError((t) => {
            console.log(t);
        })
    }

    public show_video_ad(callback: { call: (context: ChannelManager) => void }, context: ChannelManager, type: REWARD_VIDEO_AD_TYPE): void {
        const SystemInfo = wx.getSystemInfoSync().SDKVersion;
        if (gm.channel.compare_version(SystemInfo, "2.8.0") < 0) {
            type = REWARD_VIDEO_AD_TYPE.ALL;
        }
        this._video_cb_array[type] = callback;
        this._video_cb_target_array[type] = context;
        if (this._video_ad_array[type]) {
            this._video_ad_array[type].show().then(() => {
                console.log("视频广告显示成功");
                cc.game.pause();
            }).catch(() => {
                console.log("自动拉取失败，重新拉取");
                this._video_ad_array[type].load().then(() => {
                    this._video_ad_array[type].show().then(() => {
                        console.log("重新拉取，视频广告显示成功");
                        cc.game.pause();
                    }).catch((t: { errCode: number }) => {
                        console.log("重新拉取失败", t);
                        if (1004 == t.errCode) {
                            gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                        } else {
                            gm.ui.show_notice("Quảng cáo có thưởng bằng video không mở được");
                        }
                        gm.channel.share_req(() => {
                            if (callback) {
                                callback.call(context);
                            }
                        }, this);
                    });
                })
            });

        } else {
            gm.ui.show_notice("Quảng cáo được thưởng bằng video chưa được khởi tạo");
        }
    }

    create_app_box_ad(): void {
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

            this._app_box.onLoad(() => {
                console.log("格子广告加载成功");
            });

            this._app_box.onError((t) => {
                console.log(t);
            });
        } else {
            console.log("不支持格子广告，请升级微信");
        }
    }

    public get is_support_app_box(): boolean {
        return !!wx.createGridAd;
    }

    private show_app_box_ad(): void {
        if (wx.createGridAd) {
            if (this._app_box_loaded && this._app_box) {
                this._app_box.show().catch((t) => {
                    console.error(t);
                });
            } else {
                this.create_app_box_ad();
                console.log("_app_box_loaded:" + this._app_box_loaded);
            }
        } else {
            console.log("不支持广告盒子，请升级微信");
        }
    }

    private create_interstitial_ad(): void {
        if (wx.createInterstitialAd) {
            this._interstitial_ad = wx.createInterstitialAd({
                adUnitId: this._interstitial_ad_id
            });

            this._interstitial_ad.onError((t) => {
                console.log(t);
            });

            this._interstitial_ad.onLoad(() => {
                console.log("banner 广告加载成功");
            });

            this._interstitial_ad.onLoad(() => {
                this._interstitial_ad_loaded = true;
            });

            this._interstitial_ad.onClose(() => {
                console.log("close event emit");
            });

            this._interstitial_ad.onError((t) => {
                console.log("error", t);
            });
        }
    }

    public get is_support_interstitial_ad(): boolean {
        if (wx.createInterstitialAd) {
            console.log("is_support_interstitial_ad: true");
            return true;
        } else {
            console.log("is_support_interstitial_ad: false");
            return false;
        }
    }

    public show_interstitial_ad(callback: { call: (context: any, num: number) => void }, context: any): void {
        if (this._interstitial_ad && this._interstitial_ad_loaded) {
            this._interstitial_ad.show().catch((t) => {
                console.error("show", t);
                if (callback && context) {
                    callback.call(context, 1);
                }
            });
        }
    }

    public set_rank_value(): void {
        const object = {
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
    }

    public get_rank_data(): boolean {
        window.wx.getOpenDataContext().postMessage({
            message: 2
        });
        return true;
    }

    public set_rank_close(): void {
        window.wx.getOpenDataContext().postMessage({
            message: 99
        });
    }

    public on_rank_pre_page_click(): void {
        window.wx.getOpenDataContext().postMessage({
            message: 100
        });
    }

    public on_rank_next_page_click(): void {
        window.wx.getOpenDataContext().postMessage({
            message: 101
        });
    }

    public get_self_rank_data(): boolean {
        window.wx && window.wx.getOpenDataContext().postMessage({
            message: 300
        });
        return true;
    }

    public set_self_rank_close(): void {
        window.wx && window.wx.getOpenDataContext().postMessage({
            message: 301
        });
    }

    public clear_cache(): void {
        if (window.wxDownloader) {
            window.wxDownloader.cleanAllAssets();
            console.log("delete cache success");
        }
    }
}