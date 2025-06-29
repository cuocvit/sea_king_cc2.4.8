"use strict";
cc._RF.push(module, '65b96E/2D5CKI4CEPQ7lqE6', 'OPPOMiniGame');
// start-scene/scripts/OPPOMiniGame.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPPOMiniGame = void 0;
var ChannelManager_1 = require("./ChannelManager");
var OPPOMiniGame = /** @class */ (function () {
    function OPPOMiniGame() {
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
        this._nativeAdStat = false;
        this._nativeIcoAdStat = false;
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
    Object.defineProperty(OPPOMiniGame, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new OPPOMiniGame;
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    OPPOMiniGame.prototype.load_channel_env = function (call) {
        var _this = this;
        console.log("oppoMiniGame loadChannelEnv!!!");
        cc.audioEngine.stopAll();
        cc.audioEngine.uncacheAll();
        qg.login({
            success: function (t) {
                console.log(JSON.stringify(t));
                _this._oppoUid = t.data.uid;
                console.log("this._oppoUid:", _this._oppoUid);
            },
            fail: function (t) {
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
        setTimeout(function () {
            _this.createNativeIcoAd();
        }, 15000);
        return true;
    };
    OPPOMiniGame.prototype.analyzeUrlPram = function () {
        return true;
    };
    OPPOMiniGame.prototype.loginVerify = function () {
        return true;
    };
    OPPOMiniGame.prototype.load_sub_packages_env = function (call) {
        call();
        return true;
    };
    OPPOMiniGame.prototype.shareReq = function (call) {
        call();
        return true;
    };
    Object.defineProperty(OPPOMiniGame.prototype, "is_share", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OPPOMiniGame.prototype, "is_video_share", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    OPPOMiniGame.prototype.loginReport = function () { };
    OPPOMiniGame.prototype.vibrate_short = function () {
        if (qg.vibrateShort) {
            qg.vibrateShort({
                success: function (t) {
                    console.log("" + t);
                },
                fail: function () {
                    console.log("vibrateShort调用失败");
                }
            });
        }
    };
    OPPOMiniGame.prototype.vibrate_long = function () {
        if (qg.vibrateLong) {
            qg.vibrateLong({
                success: function (t) {
                    console.log("" + t);
                },
                fail: function () {
                    console.log("vibrateLong调用失败");
                }
            });
        }
    };
    Object.defineProperty(OPPOMiniGame.prototype, "is_support_more_game", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    OPPOMiniGame.prototype.create_banner_ad = function () {
        var _this = this;
        console.log("createBannerAd");
        if ("" != this._bannerid[0]) {
            var SystemInfo = qg.getSystemInfoSync();
            var windowWidth_1 = SystemInfo.windowWidth;
            var windowHeight_1 = SystemInfo.windowHeight;
            this._targetBannerAdWidth = windowWidth_1;
            this._bannerAd = qg.createBannerAd({
                adUnitId: this._bannerid[0],
                style: {
                    width: this._targetBannerAdWidth,
                    top: windowHeight_1 - this._targetBannerAdWidth / 16 * 9,
                    left: 0,
                    height: 300
                }
            });
            cc.log(this._bannerAd), this._bannerAd.onLoad(function () {
                cc.log("_bannerAd onLoad");
                _this._ifBannerLoaded = true;
            });
            this._bannerAd.onResize(function (t) {
                console.log("banner 宽度：" + t.width + ", banner 高度：" + t.height);
                _this._bannerAd.style.top = windowHeight_1 - t.height * windowWidth_1 / t.width;
                _this._bannerAd.style.left = 0;
                _this._bannerAd.style.height = t.height * windowWidth_1 / t.width;
                _this._bannerAd.style.width = windowWidth_1;
            });
        }
        else {
            console.log("this._bannerid is null");
        }
    };
    OPPOMiniGame.prototype.show_banner_ad = function (param) {
        if (!((new Date).getTime() - this.gameBeginTime < 6e4)) {
            this._bannerAd.show().then(function () {
                console.log("广告显示成功");
            }).catch(function (t) {
                console.log("广告组件出现问题", t);
            });
        }
    };
    OPPOMiniGame.prototype.hide_banner_ad = function (param) {
        if (this._ifBannerLoaded) {
            this._bannerAd.hide();
        }
    };
    OPPOMiniGame.prototype.create_video_ad = function () {
        var _this = this;
        console.log("Oppo- createVideoAD!....");
        if (!(qg.getSystemInfoSync().platformVersion < "1051")) {
            this._videoAd = qg.createRewardedVideoAd({
                adUnitId: this._videoid[0]
            });
            if (!this._videoAd)
                return false;
            this._videoAd.onLoad(function () {
                console.log("激励视频加载成功");
                _this.rewardVideoStat = true;
            });
            this._videoAd.onError(function (t) {
                qg.showToast({
                    title: "广告播放失败，请重试!"
                });
                console.log("视频广告错误：", t);
                _this._videoAd.load();
            });
            this._videoAd.load();
            this._videoAd.onClose(function (t) {
                if (t.isEnded) {
                    console.log("激励视频广告完成，发放奖励");
                    _this._videoCb.apply(_this._videoCbTarget);
                }
                else {
                    console.log("激励视频广告取消关闭，不发放奖励");
                }
                _this.rewardVideoStat = false;
                _this._videoAd.load();
            });
        }
    };
    OPPOMiniGame.prototype.show_video_ad = function (call, chanel) {
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
        }
        else {
            this._videoAd.load();
            qg.showToast({
                title: "当前没有可播放的广告"
            });
        }
    };
    OPPOMiniGame.prototype.createInterstitialAd = function () {
        console.log("createInterstitialAd");
        if ("" != this._interid[0]) {
            if (qg.createInterstitialAd) {
                this._interstitialAd = qg.createInterstitialAd({
                    adUnitId: this._interid[0]
                });
            }
            if (!this._interstitialAd)
                return false;
            this._interstitialAd.onError(function (t) {
                console.log("插屏广告错误：", t);
            });
        }
        else {
            console.log("this._interid is null");
        }
    };
    OPPOMiniGame.prototype.show_interstitial_ad = function (t, e) {
        if (null != qg.createInterstitialAd && !!this._interstitialAd) {
            this._interstitialAd.show();
            return true;
        }
    };
    OPPOMiniGame.prototype.set_rank_value = function () { };
    Object.defineProperty(OPPOMiniGame.prototype, "is_rank", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    OPPOMiniGame.prototype.ifCreateShortcut = function (call) {
        qg.hasShortcutInstalled({
            success: function (t) {
                console.log("qg.hasShortcutInstalled:%s", t);
                call(t);
            },
            fail: function () {
                call(true);
            },
            complete: function () { }
        });
    };
    OPPOMiniGame.prototype.createShortcut = function (call) {
        qg.hasShortcutInstalled({
            success: function (t) {
                0 == t && qg.installShortcut({
                    success: function () {
                        call();
                    },
                    fail: function () { },
                    complete: function () { }
                });
            },
            fail: function () { },
            complete: function () { }
        });
    };
    OPPOMiniGame.prototype.createNativeAd = function () {
        var _this = this;
        this._nativeAdStat = false;
        if ("" != this._nativeid[1]) {
            this.nativeAd = qg.createNativeAd({
                adUnitId: this._nativeid[1]
            });
            this.nativeAd.onLoad(function (t) {
                console.log("加载原生广告成功", "：" + JSON.stringify(t));
                if (t.adList && 0 < t.adList.length) {
                    (_this.tmpAdData = t.adList[0]);
                }
                _this._nativeAdStat = true;
            });
            this.nativeAd.onError(function (t) {
                console.log("设置原生广告出错：" + JSON.stringify(t));
                _this._nativeAdStat = false;
                setTimeout(function () {
                    _this.nativeAd.load();
                }, 15000);
            });
            this.nativeAd.load();
        }
    };
    OPPOMiniGame.prototype.nativeAdStat = function () {
        return !((new Date).getTime() - this.gameBeginTime < 6e4) && this._nativeAdStat;
    };
    OPPOMiniGame.prototype.onDestroy = function () {
        if (this.nativeAd) {
            this.nativeAd.offLoad();
            this.nativeAd.offError();
            this.nativeAd.destroy();
        }
    };
    OPPOMiniGame.prototype.nativeAdLoad = function () {
        this.nativeAd.load();
    };
    OPPOMiniGame.prototype.createNativeIcoAd = function () {
        var _this = this;
        this._nativeIcoAdStat = false;
        if ("" != this._nativeid[0]) {
            this.nativeIcoAd = qg.createNativeAd({
                adUnitId: this._nativeid[0]
            });
            this.nativeIcoAd.onLoad(function (t) {
                console.log("加载原生广告ICO成功", "：" + JSON.stringify(t));
                if (t.adList && 0 < t.adList.length) {
                    _this.tmpIcoAdData = t.adList[0];
                }
                _this._nativeIcoAdStat = true;
            });
            this.nativeIcoAd.onError(function (t) {
                console.log("设置原生广告Ico出错：" + JSON.stringify(t));
                _this._nativeIcoAdStat = false;
                setTimeout(function () {
                    _this.nativeIcoAd.load();
                }, 15000);
            });
            this.nativeIcoAd.load();
            setTimeout(function () {
                _this.timeNativeAdProcess();
            }, 15000);
        }
    };
    OPPOMiniGame.prototype.nativeIcoAdClick = function () {
        this.nativeIcoAd.reportAdClick({
            adId: this.icoAdData.adId
        });
        console.log("nativeIcoAdClick reportIcoAdClick  adId:%s", this.icoAdData.adId);
    };
    OPPOMiniGame.prototype.onIcoDestroy = function () {
        if (this.nativeIcoAd) {
            this.nativeIcoAd.offLoad();
            this.nativeIcoAd.offError();
            this.nativeIcoAd.destroy();
        }
    };
    OPPOMiniGame.prototype.nativeIcoAdLoad = function () {
        this.nativeIcoAd.load();
    };
    OPPOMiniGame.prototype.getNativeData = function () {
        return this.adData.title;
    };
    OPPOMiniGame.prototype.getNativeIcoData = function () {
        return this.icoAdData.title;
    };
    OPPOMiniGame.prototype.getNativeDesc = function () {
        return this.adData.desc;
    };
    OPPOMiniGame.prototype.getNativeIcoDesc = function () {
        return this.icoAdData.desc;
    };
    OPPOMiniGame.prototype.showBannerNative = function (node) {
        var _this = this;
        if (!((new Date).getTime() - this.gameBeginTime < 60000 || !this.tmpIcoAdData)) {
            this.bannerNativeData = this.tmpIcoAdData;
            var adImg_1 = node.getChildByName("adImg");
            var adDesc = node.getChildByName("adDesc");
            var adTitle = node.getChildByName("adTitle");
            var adButton = node.getChildByName("adButton");
            var adLogo_1 = node.getChildByName("adLogo");
            adImg_1.active = false;
            if (this.bannerNativeData.iconUrlList && 0 < this.bannerNativeData.iconUrlList.length) {
                cc.loader.load(this.bannerNativeData.iconUrlList[0], function (err, texture) {
                    adImg_1.active = true;
                    adImg_1.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }
            adTitle.active = true;
            adTitle.getComponent(cc.Label).string = this.bannerNativeData.title;
            adDesc.active = true;
            adDesc.getComponent(cc.Label).string = this.bannerNativeData.desc;
            adLogo_1.active = false;
            if (this.bannerNativeData.logoUrl) {
                cc.loader.load(this.bannerNativeData.logoUrl, function (t, e) {
                    adLogo_1.active = true;
                    adLogo_1.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e);
                });
            }
            if (!adButton.getComponent(cc.Button)) {
                adButton.addComponent(cc.Button);
            }
            adButton.on("click", function () {
                _this.bannerNativeAdClick();
            }, this);
            this.nativeIcoAd.reportAdShow({
                adId: this.bannerNativeData.adId
            });
            console.log("nativeIcoAd  reportIcoAdShow adId:%s", this.bannerNativeData.adId);
        }
    };
    OPPOMiniGame.prototype.bannerNativeAdClick = function () {
        this.nativeIcoAd.reportAdClick({
            adId: this.bannerNativeData.adId
        });
        console.log("bannerNativeAdClick reportIcoAdClick  adId:%s", this.bannerNativeData.adId);
    };
    OPPOMiniGame.prototype.showBigJpgNative = function (node) {
        var _this = this;
        if (!((new Date).getTime() - this.gameBeginTime < 6e4 || !this.tmpAdData)) {
            this.bigJpgNativeData = this.tmpAdData;
            node.active = false;
            var adImg_2 = node.getChildByName("adImg");
            var adLogo_2 = node.getChildByName("adLogo");
            var adClick = node.getChildByName("adClick");
            adImg_2.active = false;
            if (this.bigJpgNativeData.iconUrlList && 0 < this.bigJpgNativeData.iconUrlList.length) {
                cc.loader.load(this.bigJpgNativeData.iconUrlList[0], function (err, texture) {
                    adImg_2.active = true;
                    node.active = true;
                    adImg_2.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }
            adLogo_2.active = false;
            if (this.bigJpgNativeData.logoUrl) {
                cc.loader.load(this.bigJpgNativeData.logoUrl, function (err, texture) {
                    adLogo_2.active = true;
                    adLogo_2.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }
            if (!adImg_2.getComponent(cc.Button)) {
                adImg_2.addComponent(cc.Button);
            }
            adImg_2.on("click", function () {
                _this.BigJpgNativeAdClick();
            }, this);
            if (!adClick.getComponent(cc.Button)) {
                adClick.addComponent(cc.Button);
            }
            adClick.on("click", function () {
                _this.BigJpgNativeAdClick();
            }, this);
            this.nativeAd.reportAdShow({
                adId: this.bigJpgNativeData.adId
            });
            console.log("nativeIcoAd  reportIcoAdShow adId:%s", this.bigJpgNativeData.adId);
        }
    };
    OPPOMiniGame.prototype.BigJpgNativeAdClick = function () {
        this.nativeAd.reportAdClick({
            adId: this.adData.adId
        });
        console.log("bigJpgNativeData  reportAdClick adId:%s", this.adData.adId);
    };
    OPPOMiniGame.prototype.showIcoNative = function (node) {
        var _this = this;
        if (!((new Date).getTime() - this.gameBeginTime < 6e4 || !this.tmpIcoAdData)) {
            this.icoNativeData = this.tmpIcoAdData;
            var adImg_3 = node.getChildByName("adImg");
            var adLogo_3 = node.getChildByName("adLogo");
            var adClose_1 = node.getChildByName("adClose");
            adImg_3.active = false;
            adClose_1.active = false;
            if (this.icoNativeData.iconUrlList && 0 < this.icoNativeData.iconUrlList.length) {
                cc.loader.load(this.icoNativeData.iconUrlList[0], function (err, texture) {
                    adImg_3.active = true;
                    adClose_1.active = true;
                    adImg_3.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }
            adLogo_3.active = false;
            if (this.icoNativeData.logoUrl) {
                cc.loader.load(this.icoNativeData.logoUrl, function (err, texture) {
                    adLogo_3.active = true;
                    adLogo_3.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }
            if (!adImg_3.getComponent(cc.Button)) {
                adImg_3.addComponent(cc.Button);
            }
            adImg_3.on("click", function () {
                _this.IcoNativeAdClick();
                console.log("nativeIcoAd  Click Ico AdShow ");
            }, this);
            this.nativeAd.reportAdShow({
                adId: this.icoNativeData.adId
            });
        }
    };
    OPPOMiniGame.prototype.IcoNativeAdClick = function () {
        this.nativeIcoAd.reportAdClick({
            adId: this.icoNativeData.adId
        });
        console.log("bigJpgNativeData  reportAdClick adId:%s", this.adData.adId);
    };
    OPPOMiniGame.prototype.timeNativeAdProcess = function () {
        var _this = this;
        setInterval(function () {
            if (0 == _this.nativeAdType) {
                _this.nativeIcoAd.load();
                _this.nativeAdType = 1;
            }
            else {
                _this.nativeAd.load();
                _this.nativeAdType = 0;
            }
        }, 20000);
    };
    OPPOMiniGame.prototype.get_app_name = function () {
        if (window.qg && window.qg.getSystemInfoSync) {
            return window.qg.getSystemInfoSync().platform;
        }
        else {
            return ChannelManager_1.ChannelManager.UNKNOWN;
        }
    };
    Object.defineProperty(OPPOMiniGame.prototype, "is_support_interstitial_ad", {
        get: function () {
            if (qg.createInterstitialAd) {
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
    OPPOMiniGame._instance = null;
    OPPOMiniGame.ad_enable = false;
    return OPPOMiniGame;
}());
exports.OPPOMiniGame = OPPOMiniGame;

cc._RF.pop();