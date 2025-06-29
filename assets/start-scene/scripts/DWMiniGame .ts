import { gm } from "./GameManager";
import { ChannelManager, BANNER_AD_TYPE } from "./ChannelManager";
import { BannerAd, VDCallback } from "./WXMiniGame";
import { IAd } from "./VIVOMiniGame"


interface Share {
    title: string,
    url: string
}
export class DWMiniGame {
    private static _instance: DWMiniGame = null;
    private _targetBannerAdWidth: number;
    private _banner_ad_id_array: string[];
    private _banner_ad_array :BannerAd[];
    private _banner_ad_flag_array: boolean[];
    private _banner_ad_loaded_array: boolean[];
    private _videoAd: IAd;
    private _videoCb: VDCallback;
    private _videoCbTarget: ChannelManager;
    private _interstitial_ad: any;
    private _interstitial_ad_loaded: boolean;
    private _app_box: any;
    private _app_box_loaded: boolean;
    private _share_array: any;
    private _default_share: Share
    private _share_config_url: string;
    private _record_start_time: number;
    private _record_end_time: number;
    private _is_share_record_video: boolean;
    private _is_restart: boolean;
    private _ifNeedVideoShare: boolean;
    private _videoPath: string;

    constructor() {
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

    public static get instance(): DWMiniGame {
        if (!this._instance) {
            this._instance = new DWMiniGame;
        }
        return this._instance;
    }

    public load_channel_env(call: () => void): boolean {
        window.wx.onHide(() => { });
        window.wx.onShow(() => { });
        console.log("wx_DS" + JSON.stringify(window.wx));
        window.wx.login({});
        call();
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
        return ChannelManager.APP_DW;
    }

    public get is_share(): boolean {
        return false;
    }

    public get is_video_share(): boolean {
        return false;
    }

    public get is_support_more_game(): boolean {
        return false;
    }

    private loginReport() { };

    public create_banner_ad(): void {
        if (window.wx) {
            const SystemInfo = window.wx.getSystemInfoSync();
            const windowWidth = SystemInfo.windowWidth;
            const windowHeight = SystemInfo.windowHeight;

            for (let index = 0; index < this._banner_ad_id_array.length; index++) {
                const bannerAd: BannerAd = wx.createBannerAd({
                    adUnitId: this._banner_ad_id_array[index],
                    adIntervals: 40,
                    style: {
                        width: this._targetBannerAdWidth,
                        top: windowHeight - this._targetBannerAdWidth / 16 * 9,
                        left: (windowWidth - this._targetBannerAdWidth) / 2
                    }
                });

                this._banner_ad_array.push(bannerAd);
                bannerAd.onLoad(() => {
                    console.log("banner ad id:" + this._banner_ad_id_array[index] + " onLoad"),
                        this._banner_ad_loaded_array[index] = !0
                });

                bannerAd.onResize((t) => {
                    bannerAd.style.top = windowHeight - t.height,
                        bannerAd.style.left = (windowWidth - t.width) / 2
                });

                bannerAd.onError((t) => {
                    console.log(t)
                });
            }
        }
    }

    public show_banner_ad(param?: BANNER_AD_TYPE): void {
        if (this._banner_ad_loaded_array[param]) {
            this._banner_ad_flag_array[param] = true;
            const banner = this._banner_ad_array[param]

            banner.show().then(() => {
                if (this._banner_ad_flag_array[param]) {
                    console.log("广告显示成功");
                } else {
                    banner.hide();
                    console.log("广告显示慢了，不需要显示了");
                }
            }).catch((t) => {
                console.log("广告组件出现问题", t)
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

    public create_video_ad(): void {
        if (null != window.wx.createRewardedVideoAd) {
            this._videoAd = window.wx.createRewardedVideoAd({
                adUnitId: "adunit-868693f6bf325824"
            });
            this._videoAd.onClose((t) => {
                if (t.isEnded) {
                    console.log("视频广告观看完成");
                    this._videoCb.apply(this._videoCbTarget);
                } else {
                    console.log("视频广告观看中断");
                    gm.ui.show_notice("Quảng cáo video bị gián đoạn, không có phần thưởng");
                }
            });

            this._videoAd.onError((t) => {
                console.log(t)
            });

            this._videoAd.onLoad(() => {
                console.log("激励视频 广告加载成功")
            });
        }
    }

    public show_video_ad(call: (result: number) => void, chanel: ChannelManager): void {
        this._videoCb = call;
        this._videoCbTarget = chanel;
        if (this._videoAd) {
            this._videoAd.show().then(() => {
                console.log("视频广告显示成功");
            }).catch(() => {
                console.log("视频手动加载成功");
                this._videoAd.show().then(() => {
                    console.log("重试，视频广告显示成功");
                }).catch((t) => {
                    console.log("重试，视频广告组件出现问题", t);
                    if (1004 == t.errCode) {
                        gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                    } else {
                        gm.ui.show_notice("Quảng cáo có thưởng bằng video không mở được");
                    }
                })
            })
        } else {
            gm.ui.show_notice("Quảng cáo được thưởng bằng video chưa được khởi tạo");
        }
    }

    public get is_support_app_box(): boolean {
        return false;
    }

    public clear_cache(): void {
        if (window.wxDownloader) {
            window.wxDownloader.cleanAllAssets();
            console.log("delete cache success");
        }
    }

    public vibrate_short(): void {
        if (wx.vibrateShort) {
            wx.vibrateShort({
                success: (t) => {
                    console.log("" + t)
                },
                fail: () => {
                    console.log("vibrateShort调用失败")
                }
            });
        }
    }

    public vibrate_long(): void {
        if (wx.vibrateLong) {
            wx.vibrateLong({
                success: (t) => {
                    console.log("" + t)
                },
                fail: () => {
                    console.log("vibrateLong调用失败")
                }
            });
        }
    }

    public get is_support_interstitial_ad(): boolean {
        return false;
    }

    public get is_rank(): boolean {
        return false;
    }
}