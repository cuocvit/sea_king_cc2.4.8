import { ChannelManager, BANNER_AD_TYPE } from "./ChannelManager";

export interface IAd {
    show(): Promise<void>;
    load?(): Promise<void>;
    hide?(): void;
    destroy?(): void;
    onError(callback: (error: any) => void): void;
    onLoad?(callback: (t?: { adList: IAdData[] }) => void): void;
    offLoad?(): void;
    onClose?(callback: (result: { isEnded: boolean }) => void): void;
    offError?(): void;
}

interface INativeAd extends IAd {
    reportAdShow(params: { adId: string }): void;
    reportAdClick(params: { adId: string }): void;
}
export interface IAdData {
    adId: string;
    title: string;
    desc: string;
    logoUrl?: string;
    icon?: string;
    imgUrlList?: string[];
    iconUrlList?: string[];
}

interface IAdLayout {
    getChildByName(name: string): cc.Node;
    active: boolean;
}



export class VIVOMiniGame {
    private static _instance: VIVOMiniGame = null;
    private static ad_enable: boolean = false;
    private _targetBannerAdWidth: number;
    private _bannerAd: IAd;
    private _ifBannerLoaded: boolean;
    private _videoAd: IAd;
    private _videoCb: (result: number) => void;
    private _videoCbTarget: ChannelManager;
    private _oppoUid: string;
    private _interstitialAd: IAd;
    private _bannerid: string[];
    private _videoid: string[];
    private _interid: string[];
    private _nativeid: string[];
    private nativeAd: INativeAd;
    private adData: IAdData;
    private tmpAdData: IAdData;
    private adLayout: IAdLayout;
    private _nativeAdStat: boolean;
    private _nativeIcoAdStat: boolean;
    private nativeIcoAd: INativeAd;
    private icoAdData: IAdData;
    private tmpIcoAdData: IAdData;
    private icoAdLayout: IAdLayout;
    private bannerLoadTime: number;
    private interAdLoadTime: number;
    private nativeIcoMap: number;
    private nativeLoadTime: number;
    private icoNativeJpgLoadState: boolean;
    private _tmpIcoNativeJpg: cc.SpriteFrame;
    private nativeJpgLoadState: boolean;
    private _tmpNativeJpg: cc.SpriteFrame;
    private bannerNativeData: IAdData;
    private gameBeginTime: number;

    constructor() {
        this._targetBannerAdWidth = 200;
        this._bannerAd = null;
        this._ifBannerLoaded = false;
        this._videoAd = null;
        this._videoCb = null;
        this._videoCbTarget = null;
        this._oppoUid = "";
        this._interstitialAd = null;
        this._bannerid = ["14b556f541004b45ba65c592bbf706e8"];
        this._videoid = ["e9ac166130cd462088a92c2ba68fec83"];
        this._interid = [];
        this._nativeid = [];
        this.nativeAd = null;
        this.adData = null;
        this.tmpAdData = null;
        this.adLayout = null;
        this._nativeAdStat = false;
        this._nativeIcoAdStat = false;
        this.nativeIcoAd = null;
        this.icoAdData = null;
        this.tmpIcoAdData = null;
        this.icoAdLayout = null;
        this.bannerLoadTime = 0;
        this.interAdLoadTime = 0;
        this.nativeIcoMap = 0;
        this.nativeLoadTime = 0;
        this.icoNativeJpgLoadState = false;
        this._tmpIcoNativeJpg = null;
        this.nativeJpgLoadState = false;
        this._tmpNativeJpg = null;
        this.bannerNativeData = null;
        this.gameBeginTime = (new Date).getTime();
    }

    static get instance(): VIVOMiniGame {
        if (!this._instance) {
            this._instance = new VIVOMiniGame;
        }
        return this._instance;
    }

    public load_channel_env(call: () => void): boolean {
        console.log("vivoMiniGame loadChannelEnv!!!");
        cc.audioEngine.stopAll();
        if (1063 <= qg.getSystemInfoSync()) {
            qg.login({
                success: (t) => {
                    console.log(JSON.stringify(t));
                },
                fail: (t) => {
                    console.log(JSON.stringify(t));
                }
            });
        }
        call();
        return true;
    }

    private analyzeUrlPram(): boolean {
        return true;
    }

    private loginVerify(): boolean {
        g.op._loginProcessCallFuc.apply(g.op._loginProcessTarget);
        return true;
    }

    public load_sub_packages_env(call: () => void): boolean {
        call();
        return true;
    }

    private shareReq(call: () => void) {
        qg.share({
            success: () => {
                call()
            },
            fail: () => { },
            cancel: () => { }
        });
        return true;
    }

    private getIsCanShare(): boolean {
        return true;
    }

    private getIsCanRecord(): boolean {
        return true;
    }

    private loginReport(): void { }

    public show_banner_ad(param: BANNER_AD_TYPE): void {
        const time = (new Date).getTime();

        if (time - this.bannerLoadTime < 15000) {
            console.log("showBannerAd bannerLoad time:%s,panelType:%s", time - this.bannerLoadTime, param);
            if (this._bannerAd) {
                this._bannerAd.destroy();
            }

            if ("" != this._bannerid[0]) {
                this._bannerAd = qg.createBannerAd({
                    posId: this._bannerid[0],
                    style: {}
                });

                this._bannerAd.onError(() => {
                    console.log("banner AD loaded is error!!!!");
                });

                console.log("create BannerAd!!!!!");
                this.bannerLoadTime = (new Date).getTime();
                this._bannerAd.offLoad();
                this._bannerAd.onLoad(() => {
                    cc.log("_bannerAd onLoad");
                    this._bannerAd.show().then(() => {
                        console.log("广告显示成功");
                    }).catch((t) => {
                        console.log("广告组件出现问题", t);
                    });
                    this._ifBannerLoaded = true;
                });
            } else {
                console.log("this._bannerid is null");
            }
        }
    }

    public hide_banner_ad(param: BANNER_AD_TYPE): void {
        if (this._ifBannerLoaded) {
            this._bannerAd.hide();
        }
    }

    public get_app_name(): string {
        if (window.qg && window.qg.getSystemInfoSync) {
            return window.qg.getSystemInfoSync().platform;
        } else {
            return ChannelManager.UNKNOWN;
        }
    }

    public create_video_ad(): void | boolean {
        console.log("Vivo- createVideoAD!....");
        if (!(qg.getSystemInfoSync().platformVersionCode < 1063)) {
            this._videoAd = qg.createRewardedVideoAd({
                posId: this._videoid[0]
            });

            if (!this._videoAd) return false;

            this._videoAd.onLoad(() => {
                console.log("激励视频加载成功");
            });

            this._videoAd.onError(() => {
                qg.showToast({
                    message: "视频广告初始化失败，请重新尝试!"
                });
                this._videoAd.load();
            });

            this._videoAd.load();
            this._videoAd.onClose((t) => {
                if (t && t.isEnded) {
                    console.log("激励视频广告完成，发放奖励");
                    this._videoCb.apply(this._videoCbTarget);
                } else {
                    console.log("视频广告观看中断");
                }

                this._videoAd.load();
                cc.game.resume();
            });
        }
    }

    public show_video_ad(videoCb: (result: number) => void, videoCbTarget: ChannelManager): void {
        console.log("显示视频广告！。。。");
        this._videoCb = videoCb;
        this._videoCbTarget = videoCbTarget;

        if (!this._videoAd) {
            this.create_video_ad();
            qg.showToast({
                message: "视频广告初始化失败，请重新尝试!"
            });
            console.log("视频广告不存在！。。。");
            return;
        }

        this._videoAd.show().then(() => {
            console.log("视频广告显示成功");
            cc.game.pause();
        })
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

    private createInterstitialAd(): boolean {
        console.log("createInterstitialAd");
        if ("" != this._interid[0]) {
            if (qg.createInterstitialAd) {
                this._interstitialAd = qg.createInterstitialAd({
                    posId: this._interid[0]
                });
            }

            if (!this._interstitialAd) return false;
            this._interstitialAd.onError((t) => {
                console.log("插屏广告错误：", t)
            })
        } else {
            console.log("this._interid is null");
        }
    }

    public show_interstitial_ad(t?: any, e?: any): boolean {
        console.log("showInterstitialAd!");
        const time = (new Date).getTime();
        if (!(time - this.interAdLoadTime < 15000))
            return this._interstitialAd = qg.createInterstitialAd({
                posId: this._interid[0]
            }),
                this._interstitialAd.onError(() => {
                    console.log("插屏广告加载失败！")
                }),
                this._interstitialAd.show().then(() => {
                    console.log("插屏广告展示成功！"),
                        this.interAdLoadTime = (new Date).getTime()
                }).catch((t) => {
                    console.log("插屏广告展示失败：", t)
                }),
                true;
    }

    public get is_support_more_game(): boolean {
        return false;
    }

    public get is_share(): boolean {
        return false;
    }

    public get is_video_share(): boolean {
        return false;
    }

    public get is_rank(): boolean {
        return false;
    }

    private getChannelName(): string {
        return "vivo";
    }

    private ifCreateShortcut(call: (is: boolean) => void): void {
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
                if (0 == t) {
                    qg.installShortcut({
                        success: () => {
                            call();
                        },
                        fail: () => { },
                        complete: () => { }
                    });
                }
            },
            fail: () => { },
            complete: () => { }
        });
    }

    private createNativeAd(): void {
        if (!((new Date).getTime() - this.nativeLoadTime < 15000)) {
            this._nativeAdStat = false;
            if ("" != this._nativeid[0]) {
                this.nativeAd = qg.createNativeAd({
                    posId: this._nativeid[0]
                });

                this.nativeAd.onLoad((t) => {
                    console.log("加载原生广告成功", "：" + JSON.stringify(t));
                    if (t.adList && 0 < t.adList.length) {
                        this.tmpAdData = t.adList.pop();
                    }
                    this.nativeJpgLoadState = false;
                    cc.loader.load(this.tmpAdData.imgUrlList[0], (t, e) => {
                        if (t) {
                            this.nativeJpgLoadState = false;
                            console.log("adImag is loading err:%s!", t);
                        } else {
                            this.nativeJpgLoadState = true;
                            this._tmpNativeJpg = new cc.SpriteFrame(e);
                            console.log("adImag is loading ok!");
                        }
                    });

                    if (this.tmpAdData) {
                        (this.adData = this.tmpAdData);
                    }

                    this._nativeAdStat = true;
                    this.nativeLoadTime = (new Date).getTime();
                    console.log("NativeAd nativeload time:%s,nativeAdStat:%s", this.nativeLoadTime, this._nativeAdStat);
                });

                this.nativeAd.onError(() => {
                    this._nativeAdStat = false;
                });
                this.nativeAd.load();
            }
        }
    }

    private nativeAdStat(): boolean {
        return this.nativeJpgLoadState;
    }

    private showAd(adLayout: IAdLayout, num: number = 0): void {
        console.log("VivoMiniGame nativeAd showAd!", JSON.stringify(this.tmpAdData));
        if (this.tmpAdData) {
            this.adData = this.tmpAdData;
            if (0 == num) {
                (this.adLayout = adLayout);
            }

            const containLayout = this.adLayout.getChildByName("containLayout");
            const adImg = containLayout.getChildByName("adImg");
            const adDesc = containLayout.getChildByName("adDesc");
            const adLogo = containLayout.getChildByName("adLogo");
            const adClose = containLayout.getChildByName("adClose");

            const actionLayout = this.adLayout.getChildByName("actionLayout");
            actionLayout.getChildByName("adAction");

            const adTitle = actionLayout.getChildByName("adTitle");
            adImg.active = true;
            adImg.getComponent(cc.Sprite).spriteFrame = this._tmpNativeJpg;
            adLogo.active = false;

            if (this.adData.logoUrl) {
                cc.loader.load(this.adData.logoUrl, (t, e) => {
                    adLogo.active = true;
                    adLogo.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e);
                });
            }

            adTitle.active = false;
            adTitle.getComponent(cc.Label).string = this.adData.title;
            adDesc.active = false;
            adDesc.getComponent(cc.Label).string = this.adData.desc;
            adClose.active = true;

            adClose.on(cc.Node.EventType.TOUCH_START, () => {
                this.adLayout.active = false;
            })

            if (!adImg.getComponent(cc.Button)) {
                adImg.addComponent(cc.Button);
            }

            adImg.on("click", () => {
                this.nativeAdClick()
            }, this);

            this.nativeAd.reportAdShow({
                adId: this.adData.adId
            });

            console.log("nativeAd.reportAdShow adId: %s", this.adData.adId);
            this.adLayout.active = true;
            this._nativeAdStat = false;
        }
    }

    private nativeAdClick(): void {
        this.nativeAd.reportAdClick({
            adId: this.adData.adId
        });
        console.log("nativeAd reportAdClick adId: %s", this.adData.adId);
    }

    private onDestroy(): void {
        if (this.nativeAd) {
            this.nativeAd.offLoad();
            this.nativeAd.offError();
            this.nativeAd.destroy();
        }
    }

    private nativeAdLoad(): void { }

    private createNativeIcoAd(): void {
        console.log("createNativeICOAd:%S", this._nativeid[1]), this._nativeIcoAdStat = !1;

        if ("" != this._nativeid[1]) {
            this.nativeIcoAd = qg.createNativeAd({
                posId: this._nativeid[1]
            });

            this.nativeIcoAd.onLoad((t) => {
                console.log("加载原生广告ICO成功", "：" + JSON.stringify(t));
                if (t.adList && 0 < t.adList.length) {
                    this.tmpIcoAdData = t.adList.pop();
                }

                this.icoNativeJpgLoadState = false;
                cc.loader.load(this.tmpIcoAdData.imgUrlList[0], (t, e) => {
                    if (t) {
                        this.icoNativeJpgLoadState = false;
                        console.log("adImag is loading err:%s!", t);
                    } else {
                        this.icoNativeJpgLoadState = true;
                        this._tmpIcoNativeJpg = new cc.SpriteFrame(e);
                        console.log("adImag is loading ok!");
                    }
                });

                if (this.tmpIcoAdData) {
                    this.icoAdData = this.tmpIcoAdData;
                }

                this._nativeIcoAdStat = true;
                this.nativeLoadTime = (new Date).getTime();
                console.log("NativeIcoAd nativeload time:%s,nativeIcoAdStat:%s", this.nativeLoadTime, this._nativeIcoAdStat);
            });

            this.nativeIcoAd.onError((t) => {
                console.log("设置原生广告出错：" + JSON.stringify(t));
                this._nativeIcoAdStat = false;
            });

            this.nativeIcoAd.load();
            setTimeout(() => {
                this.timeProcess();
            }, 15000);
        }
    }

    private nativeIcoAdStat(): boolean {
        return this.icoNativeJpgLoadState;
    }

    private showIcoAd(icoAdLayout: IAdLayout, num: number = 0): void {
        console.log("VivoMiniGame showIcoAd!", JSON.stringify(this.tmpIcoAdData));
        if (this.tmpIcoAdData) {
            this.icoAdData = this.tmpIcoAdData;
            if (0 == num) {
                this.icoAdLayout = icoAdLayout;
            }

            const containLayout = this.icoAdLayout.getChildByName("containLayout");
            const adImg = containLayout.getChildByName("adImg");
            const adDesc = containLayout.getChildByName("adDesc");
            const adLogo = containLayout.getChildByName("adLogo");
            const adClose = containLayout.getChildByName("adClose");
            const actionLayout = this.icoAdLayout.getChildByName("actionLayout")
            actionLayout.getChildByName("adAction");
            const adTitle = actionLayout.getChildByName("adTitle");

            adImg.active = true;
            adImg.getComponent(cc.Sprite).spriteFrame = this._tmpIcoNativeJpg;
            adLogo.active = true;

            if (this.icoAdData.logoUrl) {
                cc.loader.load(this.icoAdData.logoUrl, (t, e) => {
                    adLogo.active = true;
                    adLogo.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e);
                });
            }
            adTitle.active = false;
            adTitle.getComponent(cc.Label).string = this.icoAdData.title;
            adDesc.active = false;
            adDesc.getComponent(cc.Label).string = this.icoAdData.desc;
            adClose.active = true;

            if (!adImg.getComponent(cc.Button)) {
                adImg.addComponent(cc.Button);
            }

            adImg.on("click", () => {
                this.nativeIcoAdClick()
            }, this);

            this.nativeIcoAd.reportAdShow({
                adId: this.icoAdData.adId
            });

            console.log("nativeIcoAd reportAdShow adId:%s", this.icoAdData.adId);
            this.icoAdLayout.active = true;
            this._nativeIcoAdStat = false;
        }
    }

    private nativeIcoAdClick(): void {
        console.log("nativeIcoAd Id:%s，nativeIcoAd Load Stat:%s,time:%s", this.icoAdData.adId, this._nativeIcoAdStat, (new Date).getTime());
        this.nativeIcoAd.reportAdClick({
            adId: this.icoAdData.adId
        });

        setTimeout(() => {
            Common.ui.destroyNativeInterAd()
        }, 500);
    }

    private setNativeIcoShowStat(): void { }
    private onIcoDestroy(): void {
        if (this.nativeIcoAd) {
            this.nativeIcoAd.offLoad();
            this.nativeIcoAd.offError();
            this.nativeIcoAd.destroy();
        }
    }

    private nativeIcoAdLoad(): void { }

    private getNativeData(): string {
        return this.adData.title || "";
    }

    private getNativeIcoData(): string {
        return this.adData.title ? this.icoAdData.title : "";
    }

    private showMoreGame(): void { }

    private getNativeDesc(): string {
        return this.adData.desc;
    }

    private getNativeIcoDesc(): any {
        return this.icoAdData.desc;
    }

    public showBannerNative(node: cc.Node): void {
        if (!((new Date).getTime() - this.gameBeginTime < 6e4 || !this.tmpIcoAdData)) {
            this.bannerNativeData = this.tmpIcoAdData;

            const adImg = node.getChildByName("adImg");
            const adDesc = node.getChildByName("adDesc");
            const adTitle = node.getChildByName("adTitle");
            const adButton = node.getChildByName("adButton");
            adImg.active = false;

            if (this.bannerNativeData.icon) {
                cc.loader.load(this.bannerNativeData.icon, (err, texture: string | cc.Texture2D) => {
                    adImg.active = true;
                    adImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }

            adTitle.active = true;
            adTitle.getComponent(cc.Label).string = this.bannerNativeData.title;
            adDesc.active = true;
            adDesc.getComponent(cc.Label).string = this.bannerNativeData.desc;

            if (this.icoAdData.logoUrl) {
                cc.loader.load(this.icoAdData.logoUrl, (t, e) => {

                });
            }

            if (adButton.getComponent(cc.Button)) {
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

    private timeProcess(): void {
        setInterval(() => {
            if (0 == this.nativeIcoMap) {
                if (!this._nativeAdStat) {
                    this.nativeAd.load();
                }
                this.nativeIcoMap = 1;
                console.log("timeProcess nativeAdLoad time:%s,_nativeAdStat:%s", (new Date).getTime(), this._nativeAdStat);
            } else {
                if (!this._nativeIcoAdStat) {
                    this.nativeIcoAd.load();
                }
                this.nativeIcoMap = 0;
                console.log("timeProcess nativeIcoAdLoad time:%s,_nativeIcoAdStat:%s", (new Date).getTime(), this._nativeIcoAdStat);
            }
        }, 15000);
    }

    public vibrate_short(): void {
        if (qg.vibrateShort) {
            qg.vibrateShort({
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
        if (qg.vibrateLong) {
            qg.vibrateLong({
                success: (t) => {
                    console.log("" + t);
                },
                fail: () => {
                    console.log("vibrateLong调用失败");
                }
            });
        }
    }

    public showBigJpgNative(node: cc.Node): void { }
    public showIcoNative(node: cc.Node): void { }
}