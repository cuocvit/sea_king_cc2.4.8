import { ChannelManager, BANNER_AD_TYPE } from "./ChannelManager";
import { IAd, IAdData } from "./VIVOMiniGame";
import { BannerAd, VDCallback } from "./WXMiniGame";

interface NativeAd extends IAd {
    reportAdShow: (param: { adId: string }) => void;
    reportAdClick: (param: { adId: string }) => void;
}

export class OPPOMiniGame {
    private static _instance: OPPOMiniGame = null;
    private static ad_enable: boolean = false;
    private _targetBannerAdWidth: number;
    private _bannerAd: BannerAd;
    private _ifBannerLoaded: boolean;
    private _videoAd: IAd;
    private _videoCb: VDCallback;
    private _videoCbTarget: ChannelManager;
    private _oppoUid: string;
    private _interstitialAd: IAd;
    private _videoid: string[];
    private _interid: string[];
    private _nativeid: string[];
    private nativeAd: NativeAd;
    private adData: IAdData;
    private tmpAdData: IAdData;
    private adLayout: any;
    private _nativeAdStat: boolean;
    private _nativeIcoAdStat: boolean;
    private nativeIcoAd: NativeAd;
    private icoAdData: IAdData;
    private tmpIcoAdData: IAdData;
    private icoAdLayout: any;
    private gameBeginTime: number;
    private rewardVideoStat: boolean;
    private nativeAdType: number;
    private bannerNativeData: IAdData;
    private bigJpgNativeData: IAdData;
    private icoNativeData: IAdData;
    private _bannerid: string[];

    constructor() {
        this._targetBannerAdWidth = 200;
        this._bannerAd = null;
        this._ifBannerLoaded = false;
        this._videoAd = null;
        this._videoCb = null;
        this._videoCbTarget = null;
        this._oppoUid = "";
        this._interstitialAd = null;
        this._videoid = ["292873"];
        this._interid = [];
        this._nativeid = ["293236", "292878"];
        this.nativeAd = null;
        this.adData = null;
        this.tmpAdData = null;
        this.adLayout = null;
        this._nativeAdStat = false
        this._nativeIcoAdStat = false
        this.nativeIcoAd = null;
        this.icoAdData = null;
        this.tmpIcoAdData = null;
        this.icoAdLayout = null;
        this.gameBeginTime = (new Date).getTime();
        this.rewardVideoStat = false;
        this.nativeAdType = 0;
        this.bannerNativeData = null;
        this.bigJpgNativeData = null;
        this.icoNativeData = null;
    }

    public static get instance(): OPPOMiniGame {
        if (!this._instance) {
            this._instance = new OPPOMiniGame;
        }
        return this._instance;
    }

    public load_channel_env(call: () => void): boolean {
        console.log("oppoMiniGame loadChannelEnv!!!");
        cc.audioEngine.stopAll();
        cc.audioEngine.uncacheAll();

        qg.login({
            success: (t) => {
                console.log(JSON.stringify(t));
                this._oppoUid = t.data.uid;
                console.log("this._oppoUid:", this._oppoUid);
            },
            fail: (t) => {
                console.log(JSON.stringify(t));
            }
        });

        if (qg.setLoadingProgress) {
            console.log("qg.setLoadingProgress({ progress: 0 });");
            qg.setLoadingProgress({
                progress: 0
            });
        }

        if (qg.reportMonitor) {
            qg.reportMonitor("game_scene", 0);
        }

        call();
        this.createNativeAd();
        setTimeout(() => {
            this.createNativeIcoAd()
        }, 15000);
        return true;
    }

    private analyzeUrlPram(): boolean {
        return true;
    }

    private loginVerify(): boolean {
        return true;
    }

    public load_sub_packages_env(call: () => void): boolean {
        call();
        return true;
    }

    private shareReq(call: () => void): boolean {
        call();
        return true;
    }

    public get is_share(): boolean {
        return false;
    }

    public get is_video_share(): boolean {
        return false;
    }

    private loginReport(): void { }

    public vibrate_short(): void {
        if (qg.vibrateShort) {
            qg.vibrateShort({
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
        if (qg.vibrateLong) {
            qg.vibrateLong({
                success: (t) => {
                    console.log("" + t)
                },
                fail: () => {
                    console.log("vibrateLong调用失败")
                }
            });
        }
    }

    public get is_support_more_game() {
        return false;
    }

    private create_banner_ad(): void {
        console.log("createBannerAd");
        if ("" != this._bannerid[0]) {
            const SystemInfo = qg.getSystemInfoSync();
            const windowWidth = SystemInfo.windowWidth;
            const windowHeight = SystemInfo.windowHeight;
            this._targetBannerAdWidth = windowWidth;
            this._bannerAd = qg.createBannerAd({
                adUnitId: this._bannerid[0],
                style: {
                    width: this._targetBannerAdWidth,
                    top: windowHeight - this._targetBannerAdWidth / 16 * 9,
                    left: 0,
                    height: 300
                }
            });

            cc.log(this._bannerAd), this._bannerAd.onLoad(() => {
                cc.log("_bannerAd onLoad");
                this._ifBannerLoaded = true;
            });

            this._bannerAd.onResize((t) => {
                console.log("banner 宽度：" + t.width + ", banner 高度：" + t.height);
                this._bannerAd.style.top = windowHeight - t.height * windowWidth / t.width;
                this._bannerAd.style.left = 0;
                this._bannerAd.style.height = t.height * windowWidth / t.width;
                this._bannerAd.style.width = windowWidth;
            });
        } else {
            console.log("this._bannerid is null");
        }
    }

    public show_banner_ad(param?: BANNER_AD_TYPE): void {
        if (!((new Date).getTime() - this.gameBeginTime < 6e4)) {
            this._bannerAd.show().then(() => {
                console.log("广告显示成功");
            }).catch((t) => {
                console.log("广告组件出现问题", t);
            });
        }
    }

    public hide_banner_ad(param?: BANNER_AD_TYPE): void {
        if (this._ifBannerLoaded) {
            this._bannerAd.hide();
        }
    }

    public create_video_ad(): boolean | void {
        console.log("Oppo- createVideoAD!....");
        if (!(qg.getSystemInfoSync().platformVersion < "1051")) {
            this._videoAd = qg.createRewardedVideoAd({
                adUnitId: this._videoid[0]
            });

            if (!this._videoAd) return false;

            this._videoAd.onLoad(() => {
                console.log("激励视频加载成功");
                this.rewardVideoStat = true;
            });

            this._videoAd.onError((t) => {
                qg.showToast({
                    title: "广告播放失败，请重试!"
                });
                console.log("视频广告错误：", t);
                this._videoAd.load();
            });

            this._videoAd.load();
            this._videoAd.onClose((t) => {
                if (t.isEnded) {
                    console.log("激励视频广告完成，发放奖励");
                    this._videoCb.apply(this._videoCbTarget);
                } else {
                    console.log("激励视频广告取消关闭，不发放奖励");
                }
                this.rewardVideoStat = false;
                this._videoAd.load();
            });
        }
    }

    public show_video_ad(call: (result) => void, chanel: ChannelManager): void {
        console.log("显示视频广告！。。。");
        this._videoCb = call;
        this._videoCbTarget = chanel;
        if (!this._videoAd) {
            this.create_video_ad();
            console.log("广告初始化失败！");
            qg.showToast({
                title: "广告初始化失败！"
            });
            return;
        }

        if (this.rewardVideoStat) {
            this._videoAd.show();
            this.rewardVideoStat = false;
        } else {
            this._videoAd.load();
            qg.showToast({
                title: "当前没有可播放的广告"
            });
        }
    }

    private createInterstitialAd(): boolean | void {
        console.log("createInterstitialAd");
        if ("" != this._interid[0]) {
            if (qg.createInterstitialAd) {
                this._interstitialAd = qg.createInterstitialAd({
                    adUnitId: this._interid[0]
                });
            }

            if (!this._interstitialAd) return false;
            this._interstitialAd.onError((t) => {
                console.log("插屏广告错误：", t);
            })
        } else {
            console.log("this._interid is null");
        }
    }

    public show_interstitial_ad(t?: any, e?: any): boolean {
        if (null != qg.createInterstitialAd && !!this._interstitialAd) {
            this._interstitialAd.show();
            return true;
        }
    }

    public set_rank_value(): void { }

    public get is_rank(): boolean {
        return false;
    }

    private ifCreateShortcut(call: (t: boolean) => void): void {
        qg.hasShortcutInstalled({
            success: (t) => {
                console.log("qg.hasShortcutInstalled:%s", t);
                call(t);
            },
            fail: () => {
                call(true);
            },
            complete: () => { }
        })
    }

    private createShortcut(call: () => void): void {
        qg.hasShortcutInstalled({
            success: (t) => {
                0 == t && qg.installShortcut({
                    success: () => {
                        call();
                    },
                    fail: () => { },
                    complete: () => { }
                })
            },
            fail: () => { },
            complete: () => { }
        });
    }

    private createNativeAd(): void {
        this._nativeAdStat = false;
        if ("" != this._nativeid[1]) {
            this.nativeAd = qg.createNativeAd({
                adUnitId: this._nativeid[1]
            });

            this.nativeAd.onLoad((t) => {
                console.log("加载原生广告成功", "：" + JSON.stringify(t));
                if (t.adList && 0 < t.adList.length) {
                    (this.tmpAdData = t.adList[0]);
                }
                this._nativeAdStat = true;
            });

            this.nativeAd.onError((t) => {
                console.log("设置原生广告出错：" + JSON.stringify(t));
                this._nativeAdStat = false;
                setTimeout(() => {
                    this.nativeAd.load();
                }, 15000);
            });


            this.nativeAd.load();
        }
    }

    private nativeAdStat(): boolean {
        return !((new Date).getTime() - this.gameBeginTime < 6e4) && this._nativeAdStat
    }

    private onDestroy(): void {
        if (this.nativeAd) {
            this.nativeAd.offLoad();
            this.nativeAd.offError();
            this.nativeAd.destroy();
        }
    }

    private nativeAdLoad(): void {
        this.nativeAd.load();
    }

    private createNativeIcoAd(): void {
        this._nativeIcoAdStat = false;
        if ("" != this._nativeid[0]) {
            this.nativeIcoAd = qg.createNativeAd({
                adUnitId: this._nativeid[0]
            });

            this.nativeIcoAd.onLoad((t) => {
                console.log("加载原生广告ICO成功", "：" + JSON.stringify(t));
                if (t.adList && 0 < t.adList.length) {
                    this.tmpIcoAdData = t.adList[0];
                }
                this._nativeIcoAdStat = true;
            });

            this.nativeIcoAd.onError((t) => {
                console.log("设置原生广告Ico出错：" + JSON.stringify(t));
                this._nativeIcoAdStat = false;
                setTimeout(() => {
                    this.nativeIcoAd.load();
                }, 15000)
            });

            this.nativeIcoAd.load();
            setTimeout(() => {
                this.timeNativeAdProcess();
            }, 15000);
        }
    }

    private nativeIcoAdClick(): void {
        this.nativeIcoAd.reportAdClick({
            adId: this.icoAdData.adId
        });
        console.log("nativeIcoAdClick reportIcoAdClick  adId:%s", this.icoAdData.adId);
    }

    private onIcoDestroy(): void {
        if (this.nativeIcoAd) {
            this.nativeIcoAd.offLoad();
            this.nativeIcoAd.offError();
            this.nativeIcoAd.destroy();
        }
    }

    private nativeIcoAdLoad(): void {
        this.nativeIcoAd.load();
    }

    private getNativeData(): string {
        return this.adData.title;
    }

    private getNativeIcoData(): string {
        return this.icoAdData.title;
    }

    private getNativeDesc(): string {
        return this.adData.desc;
    }

    private getNativeIcoDesc(): string {
        return this.icoAdData.desc;
    }

    public showBannerNative(node: cc.Node): void {
        if (!((new Date).getTime() - this.gameBeginTime < 60000 || !this.tmpIcoAdData)) {
            this.bannerNativeData = this.tmpIcoAdData;
            const adImg = node.getChildByName("adImg");
            const adDesc = node.getChildByName("adDesc");
            const adTitle = node.getChildByName("adTitle");
            const adButton = node.getChildByName("adButton");
            const adLogo = node.getChildByName("adLogo");
            adImg.active = false;

            if (this.bannerNativeData.iconUrlList && 0 < this.bannerNativeData.iconUrlList.length) {
                cc.loader.load(this.bannerNativeData.iconUrlList[0],
                    (err, texture: string | cc.Texture2D) => {
                        adImg.active = true;
                        adImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                    });
            }
            adTitle.active = true;
            adTitle.getComponent(cc.Label).string = this.bannerNativeData.title;
            adDesc.active = true;
            adDesc.getComponent(cc.Label).string = this.bannerNativeData.desc;
            adLogo.active = false;

            if (this.bannerNativeData.logoUrl) {
                cc.loader.load(this.bannerNativeData.logoUrl, (t, e: string | cc.Texture2D) => {
                    adLogo.active = true;
                    adLogo.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e);
                });
            }

            if (!adButton.getComponent(cc.Button)) {
                adButton.addComponent(cc.Button);
            }

            adButton.on("click", () => {
                this.bannerNativeAdClick();
            }, this);

            this.nativeIcoAd.reportAdShow({
                adId: this.bannerNativeData.adId
            });

            console.log("nativeIcoAd  reportIcoAdShow adId:%s", this.bannerNativeData.adId);
        }
    }

    private bannerNativeAdClick(): void {
        this.nativeIcoAd.reportAdClick({
            adId: this.bannerNativeData.adId
        });
        console.log("bannerNativeAdClick reportIcoAdClick  adId:%s", this.bannerNativeData.adId);
    }


    public showBigJpgNative(node: cc.Node): void {
        if (!((new Date).getTime() - this.gameBeginTime < 6e4 || !this.tmpAdData)) {
            this.bigJpgNativeData = this.tmpAdData;
            node.active = false;
            const adImg = node.getChildByName("adImg");
            const adLogo = node.getChildByName("adLogo");
            const adClick = node.getChildByName("adClick");
            adImg.active = false;

            if (this.bigJpgNativeData.iconUrlList && 0 < this.bigJpgNativeData.iconUrlList.length) {
                cc.loader.load(this.bigJpgNativeData.iconUrlList[0], (err, texture: string | cc.Texture2D) => {
                    adImg.active = true;
                    node.active = true;
                    adImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }

            adLogo.active = false;
            if (this.bigJpgNativeData.logoUrl) {
                cc.loader.load(this.bigJpgNativeData.logoUrl, (err, texture: string | cc.Texture2D) => {
                    adLogo.active = true;
                    adLogo.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }

            if (!adImg.getComponent(cc.Button)) {
                adImg.addComponent(cc.Button);
            }

            adImg.on("click", () => {
                this.BigJpgNativeAdClick();
            }, this);

            if (!adClick.getComponent(cc.Button)) {
                adClick.addComponent(cc.Button);
            }

            adClick.on("click", () => {
                this.BigJpgNativeAdClick();
            }, this);

            this.nativeAd.reportAdShow({
                adId: this.bigJpgNativeData.adId
            });
            console.log("nativeIcoAd  reportIcoAdShow adId:%s", this.bigJpgNativeData.adId);
        }
    }

    private BigJpgNativeAdClick(): void {
        this.nativeAd.reportAdClick({
            adId: this.adData.adId
        });
        console.log("bigJpgNativeData  reportAdClick adId:%s", this.adData.adId);
    }

    public showIcoNative(node: cc.Node): void {
        if (!((new Date).getTime() - this.gameBeginTime < 6e4 || !this.tmpIcoAdData)) {
            this.icoNativeData = this.tmpIcoAdData;
            const adImg = node.getChildByName("adImg");
            const adLogo = node.getChildByName("adLogo");
            const adClose = node.getChildByName("adClose");

            adImg.active = false;
            adClose.active = false;
            if (this.icoNativeData.iconUrlList && 0 < this.icoNativeData.iconUrlList.length) {
                cc.loader.load(this.icoNativeData.iconUrlList[0], (err, texture: string | cc.Texture2D) => {
                    adImg.active = true;
                    adClose.active = true;
                    adImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
                });
            }

            adLogo.active = false;
            if (this.icoNativeData.logoUrl) {
                cc.loader.load(this.icoNativeData.logoUrl, (err, texture: string | cc.Texture2D) => {
                    adLogo.active = true;
                    adLogo.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }

            if (!adImg.getComponent(cc.Button)) {
                adImg.addComponent(cc.Button);
            }

            adImg.on("click", () => {
                this.IcoNativeAdClick();
                console.log("nativeIcoAd  Click Ico AdShow ");
            }, this);

            this.nativeAd.reportAdShow({
                adId: this.icoNativeData.adId
            })
        }
    }

    private IcoNativeAdClick(): void {
        this.nativeIcoAd.reportAdClick({
            adId: this.icoNativeData.adId
        });
        console.log("bigJpgNativeData  reportAdClick adId:%s", this.adData.adId);
    }

    private timeNativeAdProcess(): void {
        setInterval(() => {
            if (0 == this.nativeAdType) {
                this.nativeIcoAd.load();
                this.nativeAdType = 1;
            } else {
                this.nativeAd.load();
                this.nativeAdType = 0;
            }
        }, 20000);
    }

    public get_app_name(): string {
        if (window.qg && window.qg.getSystemInfoSync) {
            return window.qg.getSystemInfoSync().platform;
        } else {
            return ChannelManager.UNKNOWN;
        }
    }

    public get is_support_interstitial_ad(): boolean {
        if (qg.createInterstitialAd) {
            console.log("is_support_interstitial_ad  createInterstitialAd: true");
            return true;
        } else {
            console.log("is_support_interstitial_ad: false");
            return false;
        }
    }
}