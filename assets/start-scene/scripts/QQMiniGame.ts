"use strict";
import { ChannelManager } from "./ChannelManager";
import { gm } from "./GameManager";
import { Utils } from "./Utils";
import { IAd } from "./VIVOMiniGame";
import { VDCallback } from "./WXMiniGame";

interface Share {
    title: string;
    url: string;
}

interface type {
    call: (context: any, num?: number) => any
}
export class QQMiniGame {
    private static _instance: QQMiniGame = null;
    public static ad_enable: boolean = false;
    private _min_banner_ad_width: number;
    private _banner_ad_id_array: string[];
    private _create_banner_count: number;
    private _video_ad_id: string;
    private _interstitial_ad_id: string;
    private _app_box_ad_id: string;
    private _banner_ad: IAd;
    private _is_show_banner_ad: boolean;
    private _video_ad: IAd;
    private _video_cb: VDCallback;
    private _video_cb_target: ChannelManager;
    private _interstitial_ad: IAd;
    private _interstitial_ad_loaded: boolean;
    private _app_box: IAd;
    private _app_box_loaded: boolean
    private _share_array: Share[];
    private _default_share: Share;

    constructor() {
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

    public static get instance(): QQMiniGame {
        if (!this._instance) {
            this._instance = new QQMiniGame;
        }
        return this._instance;
    }
    

    public load_channel_env(call: () => void): boolean {
        window.qq.onHide(() => { });
        window.qq.onShow(() => { });
        this._banner_ad_id_array = ["2f8ac2ffc33b7e529a912057bcfb9ccd", "60417757de8d65e26e7e8e390fe9e06b", "c0d363df09a7ce229b619b6102de60ad", "2eed354af6f5e86fc73aef2f22ce7646", "c075b792decf84b2eef03a209734a793"];
        this._video_ad_id = "f13d03fb4b1cf7be56931498549ac49d";
        this._interstitial_ad_id = "d34d938f28603205ecf889ae577c3c21";
        this._app_box_ad_id = "10cfef832c966646cf75295e7d083666";
        console.log("qq" + JSON.stringify(window.qq));
        window.qq.login({});
        this._share_array = ChannelManager.SHARE_CONFIG.share_array;
        this.show_share_menu();
        call();
        return true;
    }

    public get is_rank(): boolean {
        return true;
    }

    public get is_share(): boolean {
        return true;
    }

    public get is_video_share(): boolean {
        return false;
    }

    private show_share_menu(): boolean {
        window.qq.showShareMenu({});
        window.qq.onShareAppMessage(() => {
            const shareData = 0 == this._share_array.length
                ? this._default_share
                : this._share_array[Utils.math_random(true, 0, this._share_array.length)];

            return {
                title: shareData.title,
                imageUrl: shareData.url,
                success: (t) => {
                    console.log("转发成功");
                    console.log(t);
                },
                fail: (t) => {
                    console.log("fail qq onShareAppMessage" + t);
                }
            }
        });

        return true;
    }

    public load_sub_packages_env(call: () => void): boolean {
        call();
        return true;
    }

    private analyzeUrlPram(): boolean {
        return true;
    }

    public get_app_name(): string {
        return ChannelManager.APP_QQ;
    }

    public vibrate_short(): void {
        if (qq.vibrateShort) {
            qq.vibrateShort({
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
        if (qq.vibrateLong) {
            qq.vibrateLong({
                success: (t) => {
                    console.log("" + t);
                },
                fail: () => {
                    console.log("vibrateLong调用失败");
                }
            })
        }
    }

    public get is_support_more_game(): boolean {
        return "ios" != window.qq.getSystemInfoSync().platform && !!(window.qq.navigateToMiniProgram && window.qq.onNavigateToMiniProgram && window.qq.showMoreGamesModal);
    }

    public show_more_game(callback: type, context: any): void {
        if (this.is_support_more_game) {
            window.qq.onMoreGamesModalClose((t) => {
                console.log("modal closed", t)
            });

            window.qq.onNavigateToMiniProgram((t) => {
                console.log(t.errCode);
                console.log(t.errMsg)
            });

            window.qq.showMoreGamesModal({
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

    public share_req(callback: type, context: any): boolean {
        const shareData = 0 == this._share_array.length
            ? this._default_share
            : this._share_array[Utils.math_random(true, 0, this._share_array.length)];
        if (window.qq.shareAppMessage && shareData) {
            window.qq.shareAppMessage({
                title: shareData.title,
                imageUrl: shareData.url,
                success: (t) => {
                    console.log("转发到群的结果");
                    console.log(t);
                    callback.call(context);
                },
                fail: (t) => {
                    console.log(t);
                }
            })
        }
        return true;
    }

    private loginReport(): void { }

    private create_banner_ad(): void {
        if (window.qq) {
            const SystemInfo = window.qq.getSystemInfoSync();
            const windowWidth = SystemInfo.windowWidth;
            const windowHeight = SystemInfo.windowHeight;
            const num = this._create_banner_count % this._banner_ad_id_array.length;
            const createBannerAd = window.qq.createBannerAd({
                adUnitId: this._banner_ad_id_array[num],
                adIntervals: 40,
                style: {
                    width: this._min_banner_ad_width,
                    top: windowHeight,
                    left: (windowWidth - this._min_banner_ad_width) / 2
                }
            });

            if (this._banner_ad) {
                this._banner_ad.destroy();
            }

            this._banner_ad = createBannerAd;
            this._banner_ad.onLoad(() => {
                console.log("banner ad id:" + this._banner_ad_id_array[num] + " onLoad");
                if (this._is_show_banner_ad && createBannerAd) {
                    createBannerAd.show().then(() => {
                        if (this._is_show_banner_ad) {
                            console.log("广告显示成功");
                        } else {
                            createBannerAd.destroy();
                            console.log("广告显示慢了，不需要显示了");
                        }
                    }).catch((t) => {
                        console.log("广告组件出现问题", t);
                    });
                }
            });

            createBannerAd.onResize((t) => {
                createBannerAd.style.left = (windowWidth - t.width) / 2;
                createBannerAd.style.top = windowHeight - t.height;
                console.log("banner_ad.onResize:", t.width, t.height);
                const getDevicePixelRatio = cc.view.getDevicePixelRatio();
                const getScaleX = cc.view.getScaleX();

                console.log("banner need design size:", t.width * getDevicePixelRatio / getScaleX, t.height * getDevicePixelRatio / getScaleX);
            });

            this._create_banner_count++;
        }
    }

    public show_banner_ad(): void {
        this._is_show_banner_ad = true;
        this.create_banner_ad();
    }

    public hide_banner_ad(): void {
        this._is_show_banner_ad = false;
        const banner = this._banner_ad;
        if (banner) {
            banner.destroy();
        }
    }

    public create_video_ad(): void {
        if (null != window.qq.createRewardedVideoAd) {
            this._video_ad = window.qq.createRewardedVideoAd({
                adUnitId: this._video_ad_id
            });

            this._video_ad.onClose((t) => {
                if (t.isEnded) {
                    console.log("视频广告观看完成");
                    this._video_cb.apply(this._video_cb_target);
                } else {
                    console.log("视频广告观看中断");
                    gm.ui.show_notice("Quảng cáo video bị gián đoạn, không có phần thưởng");
                }
                cc.game.resume();
            });
        }
    }

    public show_video_ad(call: () => void, chanel: ChannelManager): void {
        this._video_cb = call;
        this._video_cb_target = chanel;
        if (this._video_ad) {
            this._video_ad.show().then(() => {
                console.log("视频广告显示成功");
                cc.game.pause();
            }).catch(() => {
                console.log("视频手动加载成功");
                this._video_ad.show().then(() => {
                    console.log("重试，视频广告显示成功");
                    cc.game.pause();
                }).catch((t) => {
                    console.log("重试，视频广告组件出现问题", t);
                    if (1004 == t.errCode) {
                        gm.ui.show_notice("Quảng cáo khuyến khích video ngày nay đã được sử dụng hết");
                    } else {
                        gm.ui.show_notice("Quảng cáo có thưởng bằng video không mở được");
                    }
                });
            })
        } else {
            gm.ui.show_notice("Quảng cáo được thưởng bằng video chưa được khởi tạo");
        }
    }

    public create_app_box_ad(): void {
        if (qq.createAppBox) {
            this._app_box = qq.createAppBox({
                adUnitId: this._app_box_ad_id
            });

            this._app_box.load().then(() => {
                this._app_box_loaded = true;
            }).catch((t) => {
                console.error(t);
            })
        } else {
            console.log("不支持广告盒子，请升级QQ");
        }
    }

    public get is_support_app_box(): boolean {
        return !!qq.createAppBox;
    }

    public show_app_box_ad(): void {
        if (qq.createAppBox) {
            if (this._app_box_loaded && this._app_box) {
                this._app_box.show().then(() => {
                    this._app_box_loaded = true;
                    console.log("显示广告盒子")
                }).catch(function (t) {
                    console.error(t)
                });
            } else {
                this.create_app_box_ad();
                console.log("_app_box_loaded:" + this._app_box_loaded);
            }
        } else {
            console.log("不支持广告盒子，请升级QQ");
        }
    }

    private create_interstitial_ad(): void {
        if (qq.createInterstitialAd) {
            this._interstitial_ad = window.qq.createInterstitialAd({
                adUnitId: this._interstitial_ad_id
            });

            this._interstitial_ad.load().catch((t) => {
                console.error("load", t)
            });

            this._interstitial_ad.onLoad(() => {
                this._interstitial_ad_loaded = true;
            });

            this._interstitial_ad.onClose(() => {
                console.log("close event emit")
            });

            this._interstitial_ad.onError((t) => {
                console.log("error", t)
            });
        }
    }

    public get is_support_interstitial_ad(): boolean {
        if (qq.createInterstitialAd) {
            console.log("is_support_interstitial_ad: true");
            return true;
        } else {
            console.log("is_support_interstitial_ad: false");
            return false;
        }
    }

    public show_interstitial_ad(callback: type, context: any): void {
        if (this._interstitial_ad && this._interstitial_ad_loaded) {
            this._interstitial_ad.show().then(() => {
                console.log("插屏广告显示成功");
                if (callback && context) {
                    callback.call(context, 0);
                }
            }).catch((t) => {
                console.error("show", t);
                if (callback && context) {
                    callback.call(context, 1);
                }
            });
        }
    }

    public set_rank_value(): void {
        const object = {
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
    }

    public get_rank_data(): boolean {
        window.qq.getOpenDataContext().postMessage({
            message: 1
        });
        return true;
    }

    public set_rank_close(): void {
        window.qq.getOpenDataContext().postMessage({
            message: 99
        });
    }

    public on_rank_pre_page_click(): void {
        window.qq.getOpenDataContext().postMessage({
            message: 100
        });
    }

    public on_rank_next_page_click(): void {
        window.qq.getOpenDataContext().postMessage({
            message: 101
        });
    }

    public get_self_rank_data(): boolean {
        window.qq && window.qq.getOpenDataContext().postMessage({
            message: 300
        });
        return true;
    }

    public set_self_rank_close(): void {
        window.qq && window.qq.getOpenDataContext().postMessage({
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