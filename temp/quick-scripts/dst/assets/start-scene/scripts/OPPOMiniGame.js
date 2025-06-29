
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/OPPOMiniGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE9QUE9NaW5pR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFTbEU7SUFnQ0k7UUFDSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFBO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUE7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRCxzQkFBa0Isd0JBQVE7YUFBMUI7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQzthQUNyQztZQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVNLHVDQUFnQixHQUF2QixVQUF3QixJQUFnQjtRQUF4QyxpQkFpQ0M7UUFoQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUU1QixFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ0wsT0FBTyxFQUFFLFVBQUMsQ0FBQztnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakQsQ0FBQztZQUNELElBQUksRUFBRSxVQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsa0JBQWtCLENBQUM7Z0JBQ2xCLFFBQVEsRUFBRSxDQUFDO2FBQ2QsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDbEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDckM7UUFFRCxJQUFJLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtRQUM1QixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDVixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8scUNBQWMsR0FBdEI7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sa0NBQVcsR0FBbkI7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sNENBQXFCLEdBQTVCLFVBQTZCLElBQWdCO1FBQ3pDLElBQUksRUFBRSxDQUFDO1FBQ1AsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLCtCQUFRLEdBQWhCLFVBQWlCLElBQWdCO1FBQzdCLElBQUksRUFBRSxDQUFDO1FBQ1AsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHNCQUFXLGtDQUFRO2FBQW5CO1lBQ0ksT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx3Q0FBYzthQUF6QjtZQUNJLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBRU8sa0NBQVcsR0FBbkIsY0FBOEIsQ0FBQztJQUV4QixvQ0FBYSxHQUFwQjtRQUNJLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRTtZQUNqQixFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNaLE9BQU8sRUFBRSxVQUFDLENBQUM7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ3ZCLENBQUM7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtnQkFDbkMsQ0FBQzthQUNKLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLG1DQUFZLEdBQW5CO1FBQ0ksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1lBQ2hCLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQ1gsT0FBTyxFQUFFLFVBQUMsQ0FBQztvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDdkIsQ0FBQztnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO2dCQUNsQyxDQUFDO2FBQ0osQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsc0JBQVcsOENBQW9CO2FBQS9CO1lBQ0ksT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQzs7O09BQUE7SUFFTyx1Q0FBZ0IsR0FBeEI7UUFBQSxpQkFnQ0M7UUEvQkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekIsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDMUMsSUFBTSxhQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQztZQUMzQyxJQUFNLGNBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBQzdDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxhQUFXLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtvQkFDaEMsR0FBRyxFQUFFLGNBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxHQUFHLENBQUM7b0JBQ3RELElBQUksRUFBRSxDQUFDO29CQUNQLE1BQU0sRUFBRSxHQUFHO2lCQUNkO2FBQ0osQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsY0FBYyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLGNBQVksR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLGFBQVcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUMzRSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxhQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDL0QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLGFBQVcsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRU0scUNBQWMsR0FBckIsVUFBc0IsS0FBc0I7UUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQztnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLHFDQUFjLEdBQXJCLFVBQXNCLEtBQXNCO1FBQ3hDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVNLHNDQUFlLEdBQXRCO1FBQUEsaUJBa0NDO1FBakNHLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ3JDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUM3QixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFFakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUNwQixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNULEtBQUssRUFBRSxhQUFhO2lCQUN2QixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO29CQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQzdCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUNuQztnQkFDRCxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLG9DQUFhLEdBQXBCLFVBQXFCLElBQXNCLEVBQUUsTUFBc0I7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNULEtBQUssRUFBRSxVQUFVO2FBQ3BCLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1NBQ2hDO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLFlBQVk7YUFDdEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRU8sMkNBQW9CLEdBQTVCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxFQUFFLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQzdCLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUE7U0FDTDthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUVNLDJDQUFvQixHQUEzQixVQUE0QixDQUFPLEVBQUUsQ0FBTztRQUN4QyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsb0JBQW9CLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QixPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVNLHFDQUFjLEdBQXJCLGNBQWdDLENBQUM7SUFFakMsc0JBQVcsaUNBQU87YUFBbEI7WUFDSSxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDOzs7T0FBQTtJQUVPLHVDQUFnQixHQUF4QixVQUF5QixJQUEwQjtRQUMvQyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDcEIsT0FBTyxFQUFFLFVBQUMsQ0FBQztnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixDQUFDO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNmLENBQUM7WUFDRCxRQUFRLEVBQUUsY0FBUSxDQUFDO1NBQ3RCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTyxxQ0FBYyxHQUF0QixVQUF1QixJQUFnQjtRQUNuQyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDcEIsT0FBTyxFQUFFLFVBQUMsQ0FBQztnQkFDUCxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQ3pCLE9BQU8sRUFBRTt3QkFDTCxJQUFJLEVBQUUsQ0FBQztvQkFDWCxDQUFDO29CQUNELElBQUksRUFBRSxjQUFRLENBQUM7b0JBQ2YsUUFBUSxFQUFFLGNBQVEsQ0FBQztpQkFDdEIsQ0FBQyxDQUFBO1lBQ04sQ0FBQztZQUNELElBQUksRUFBRSxjQUFRLENBQUM7WUFDZixRQUFRLEVBQUUsY0FBUSxDQUFDO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxxQ0FBYyxHQUF0QjtRQUFBLGlCQTBCQztRQXpCRyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQzlCLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtvQkFDakMsQ0FBQyxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEM7Z0JBQ0QsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLFVBQVUsQ0FBQztvQkFDUCxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUdILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRU8sbUNBQVksR0FBcEI7UUFDSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFBO0lBQ25GLENBQUM7SUFFTyxnQ0FBUyxHQUFqQjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVPLG1DQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sd0NBQWlCLEdBQXpCO1FBQUEsaUJBNEJDO1FBM0JHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ2pDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUM5QixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQ2pDLEtBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkM7Z0JBQ0QsS0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixVQUFVLENBQUM7b0JBQ1AsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hCLFVBQVUsQ0FBQztnQkFDUCxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMvQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFTyx1Q0FBZ0IsR0FBeEI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztZQUMzQixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO1NBQzVCLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRU8sbUNBQVksR0FBcEI7UUFDSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRU8sc0NBQWUsR0FBdkI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTyxvQ0FBYSxHQUFyQjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVPLHVDQUFnQixHQUF4QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVPLG9DQUFhLEdBQXJCO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRU8sdUNBQWdCLEdBQXhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRU0sdUNBQWdCLEdBQXZCLFVBQXdCLElBQWE7UUFBckMsaUJBNENDO1FBM0NHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM1RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUMxQyxJQUFNLE9BQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELElBQU0sUUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsT0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDbkYsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDL0MsVUFBQyxHQUFHLEVBQUUsT0FBOEI7b0JBQ2hDLE9BQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNwQixPQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1RSxDQUFDLENBQUMsQ0FBQzthQUNWO1lBQ0QsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7WUFDcEUsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDckIsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7WUFDbEUsUUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFdEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO2dCQUMvQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQXdCO29CQUN0RSxRQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDckIsUUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbkMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDcEM7WUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtnQkFDakIsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDL0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRVQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7Z0JBQzFCLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSTthQUNuQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuRjtJQUNMLENBQUM7SUFFTywwQ0FBbUIsR0FBM0I7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztZQUMzQixJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUk7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUdNLHVDQUFnQixHQUF2QixVQUF3QixJQUFhO1FBQXJDLGlCQThDQztRQTdDRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdkUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBTSxPQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFNLFFBQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0MsT0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDbkYsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUE4QjtvQkFDckYsT0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNuQixPQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1RSxDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsUUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO2dCQUMvQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQThCO29CQUM5RSxRQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDckIsUUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0UsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksQ0FBQyxPQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDaEMsT0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDakM7WUFFRCxPQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtnQkFDZCxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMvQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFVCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ25DO1lBRUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQy9CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVULElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO2dCQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUk7YUFDbkMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkY7SUFDTCxDQUFDO0lBRU8sMENBQW1CLEdBQTNCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7WUFDeEIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtTQUN6QixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLG9DQUFhLEdBQXBCLFVBQXFCLElBQWE7UUFBbEMsaUJBc0NDO1FBckNHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMxRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDdkMsSUFBTSxPQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFNLFFBQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLElBQU0sU0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFL0MsT0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDckIsU0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUM3RSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUE4QjtvQkFDbEYsT0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ3BCLFNBQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUN0QixPQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUMzRSxDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsUUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtnQkFDNUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBOEI7b0JBQzNFLFFBQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNyQixRQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3RSxDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxDQUFDLE9BQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNoQyxPQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQztZQUVELE9BQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUNkLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRVQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUk7YUFDaEMsQ0FBQyxDQUFBO1NBQ0w7SUFDTCxDQUFDO0lBRU8sdUNBQWdCLEdBQXhCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7WUFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSTtTQUNoQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVPLDBDQUFtQixHQUEzQjtRQUFBLGlCQVVDO1FBVEcsV0FBVyxDQUFDO1lBQ1IsSUFBSSxDQUFDLElBQUksS0FBSSxDQUFDLFlBQVksRUFBRTtnQkFDeEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7YUFDekI7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDckIsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRU0sbUNBQVksR0FBbkI7UUFDSSxJQUFJLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQyxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDakQ7YUFBTTtZQUNILE9BQU8sK0JBQWMsQ0FBQyxPQUFPLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsc0JBQVcsb0RBQTBCO2FBQXJDO1lBQ0ksSUFBSSxFQUFFLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQztnQkFDdEUsT0FBTyxJQUFJLENBQUM7YUFDZjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ2pELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQzs7O09BQUE7SUFobkJjLHNCQUFTLEdBQWlCLElBQUksQ0FBQztJQUMvQixzQkFBUyxHQUFZLEtBQUssQ0FBQztJQWduQjlDLG1CQUFDO0NBbG5CRCxBQWtuQkMsSUFBQTtBQWxuQlksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFubmVsTWFuYWdlciwgQkFOTkVSX0FEX1RZUEUgfSBmcm9tIFwiLi9DaGFubmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJQWQsIElBZERhdGEgfSBmcm9tIFwiLi9WSVZPTWluaUdhbWVcIjtcclxuaW1wb3J0IHsgQmFubmVyQWQsIFZEQ2FsbGJhY2sgfSBmcm9tIFwiLi9XWE1pbmlHYW1lXCI7XHJcblxyXG5pbnRlcmZhY2UgTmF0aXZlQWQgZXh0ZW5kcyBJQWQge1xyXG4gICAgcmVwb3J0QWRTaG93OiAocGFyYW06IHsgYWRJZDogc3RyaW5nIH0pID0+IHZvaWQ7XHJcbiAgICByZXBvcnRBZENsaWNrOiAocGFyYW06IHsgYWRJZDogc3RyaW5nIH0pID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPUFBPTWluaUdhbWUge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBPUFBPTWluaUdhbWUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWRfZW5hYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF90YXJnZXRCYW5uZXJBZFdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9iYW5uZXJBZDogQmFubmVyQWQ7XHJcbiAgICBwcml2YXRlIF9pZkJhbm5lckxvYWRlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3ZpZGVvQWQ6IElBZDtcclxuICAgIHByaXZhdGUgX3ZpZGVvQ2I6IFZEQ2FsbGJhY2s7XHJcbiAgICBwcml2YXRlIF92aWRlb0NiVGFyZ2V0OiBDaGFubmVsTWFuYWdlcjtcclxuICAgIHByaXZhdGUgX29wcG9VaWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2ludGVyc3RpdGlhbEFkOiBJQWQ7XHJcbiAgICBwcml2YXRlIF92aWRlb2lkOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX2ludGVyaWQ6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBfbmF0aXZlaWQ6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBuYXRpdmVBZDogTmF0aXZlQWQ7XHJcbiAgICBwcml2YXRlIGFkRGF0YTogSUFkRGF0YTtcclxuICAgIHByaXZhdGUgdG1wQWREYXRhOiBJQWREYXRhO1xyXG4gICAgcHJpdmF0ZSBhZExheW91dDogYW55O1xyXG4gICAgcHJpdmF0ZSBfbmF0aXZlQWRTdGF0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfbmF0aXZlSWNvQWRTdGF0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBuYXRpdmVJY29BZDogTmF0aXZlQWQ7XHJcbiAgICBwcml2YXRlIGljb0FkRGF0YTogSUFkRGF0YTtcclxuICAgIHByaXZhdGUgdG1wSWNvQWREYXRhOiBJQWREYXRhO1xyXG4gICAgcHJpdmF0ZSBpY29BZExheW91dDogYW55O1xyXG4gICAgcHJpdmF0ZSBnYW1lQmVnaW5UaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJld2FyZFZpZGVvU3RhdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgbmF0aXZlQWRUeXBlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJhbm5lck5hdGl2ZURhdGE6IElBZERhdGE7XHJcbiAgICBwcml2YXRlIGJpZ0pwZ05hdGl2ZURhdGE6IElBZERhdGE7XHJcbiAgICBwcml2YXRlIGljb05hdGl2ZURhdGE6IElBZERhdGE7XHJcbiAgICBwcml2YXRlIF9iYW5uZXJpZDogc3RyaW5nW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0QmFubmVyQWRXaWR0aCA9IDIwMDtcclxuICAgICAgICB0aGlzLl9iYW5uZXJBZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faWZCYW5uZXJMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl92aWRlb0FkID0gbnVsbDtcclxuICAgICAgICB0aGlzLl92aWRlb0NiID0gbnVsbDtcclxuICAgICAgICB0aGlzLl92aWRlb0NiVGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9vcHBvVWlkID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxBZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdmlkZW9pZCA9IFtcIjI5Mjg3M1wiXTtcclxuICAgICAgICB0aGlzLl9pbnRlcmlkID0gW107XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlaWQgPSBbXCIyOTMyMzZcIiwgXCIyOTI4NzhcIl07XHJcbiAgICAgICAgdGhpcy5uYXRpdmVBZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hZERhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudG1wQWREYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLmFkTGF5b3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9uYXRpdmVBZFN0YXQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuX25hdGl2ZUljb0FkU3RhdCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5uYXRpdmVJY29BZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pY29BZERhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudG1wSWNvQWREYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLmljb0FkTGF5b3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdhbWVCZWdpblRpbWUgPSAobmV3IERhdGUpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLnJld2FyZFZpZGVvU3RhdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmF0aXZlQWRUeXBlID0gMDtcclxuICAgICAgICB0aGlzLmJhbm5lck5hdGl2ZURhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYmlnSnBnTmF0aXZlRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pY29OYXRpdmVEYXRhID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBPUFBPTWluaUdhbWUge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgT1BQT01pbmlHYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRfY2hhbm5lbF9lbnYoY2FsbDogKCkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib3Bwb01pbmlHYW1lIGxvYWRDaGFubmVsRW52ISEhXCIpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS51bmNhY2hlQWxsKCk7XHJcblxyXG4gICAgICAgIHFnLmxvZ2luKHtcclxuICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHQpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wcG9VaWQgPSB0LmRhdGEudWlkO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLl9vcHBvVWlkOlwiLCB0aGlzLl9vcHBvVWlkKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocWcuc2V0TG9hZGluZ1Byb2dyZXNzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicWcuc2V0TG9hZGluZ1Byb2dyZXNzKHsgcHJvZ3Jlc3M6IDAgfSk7XCIpO1xyXG4gICAgICAgICAgICBxZy5zZXRMb2FkaW5nUHJvZ3Jlc3Moe1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocWcucmVwb3J0TW9uaXRvcikge1xyXG4gICAgICAgICAgICBxZy5yZXBvcnRNb25pdG9yKFwiZ2FtZV9zY2VuZVwiLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbGwoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZU5hdGl2ZUFkKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTmF0aXZlSWNvQWQoKVxyXG4gICAgICAgIH0sIDE1MDAwKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFuYWx5emVVcmxQcmFtKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9naW5WZXJpZnkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRfc3ViX3BhY2thZ2VzX2VudihjYWxsOiAoKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY2FsbCgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hhcmVSZXEoY2FsbDogKCkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNhbGwoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3NoYXJlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3ZpZGVvX3NoYXJlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZ2luUmVwb3J0KCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHVibGljIHZpYnJhdGVfc2hvcnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHFnLnZpYnJhdGVTaG9ydCkge1xyXG4gICAgICAgICAgICBxZy52aWJyYXRlU2hvcnQoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiICsgdClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWJyYXRlU2hvcnTosIPnlKjlpLHotKVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aWJyYXRlX2xvbmcoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHFnLnZpYnJhdGVMb25nKSB7XHJcbiAgICAgICAgICAgIHFnLnZpYnJhdGVMb25nKHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJcIiArIHQpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlicmF0ZUxvbmfosIPnlKjlpLHotKVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNfc3VwcG9ydF9tb3JlX2dhbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlX2Jhbm5lcl9hZCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZUJhbm5lckFkXCIpO1xyXG4gICAgICAgIGlmIChcIlwiICE9IHRoaXMuX2Jhbm5lcmlkWzBdKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFN5c3RlbUluZm8gPSBxZy5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IFN5c3RlbUluZm8ud2luZG93V2lkdGg7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IFN5c3RlbUluZm8ud2luZG93SGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl90YXJnZXRCYW5uZXJBZFdpZHRoID0gd2luZG93V2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkID0gcWcuY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuX2Jhbm5lcmlkWzBdLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5fdGFyZ2V0QmFubmVyQWRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHdpbmRvd0hlaWdodCAtIHRoaXMuX3RhcmdldEJhbm5lckFkV2lkdGggLyAxNiAqIDksXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDMwMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNjLmxvZyh0aGlzLl9iYW5uZXJBZCksIHRoaXMuX2Jhbm5lckFkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJfYmFubmVyQWQgb25Mb2FkXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faWZCYW5uZXJMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLm9uUmVzaXplKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lciDlrr3luqbvvJpcIiArIHQud2lkdGggKyBcIiwgYmFubmVyIOmrmOW6pu+8mlwiICsgdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuc3R5bGUudG9wID0gd2luZG93SGVpZ2h0IC0gdC5oZWlnaHQgKiB3aW5kb3dXaWR0aCAvIHQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zdHlsZS5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLnN0eWxlLmhlaWdodCA9IHQuaGVpZ2h0ICogd2luZG93V2lkdGggLyB0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuc3R5bGUud2lkdGggPSB3aW5kb3dXaWR0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLl9iYW5uZXJpZCBpcyBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd19iYW5uZXJfYWQocGFyYW0/OiBCQU5ORVJfQURfVFlQRSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghKChuZXcgRGF0ZSkuZ2V0VGltZSgpIC0gdGhpcy5nYW1lQmVnaW5UaW1lIDwgNmU0KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuaYvuekuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK57uE5Lu25Ye6546w6Zeu6aKYXCIsIHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVfYmFubmVyX2FkKHBhcmFtPzogQkFOTkVSX0FEX1RZUEUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faWZCYW5uZXJMb2FkZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlX3ZpZGVvX2FkKCk6IGJvb2xlYW4gfCB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9wcG8tIGNyZWF0ZVZpZGVvQUQhLi4uLlwiKTtcclxuICAgICAgICBpZiAoIShxZy5nZXRTeXN0ZW1JbmZvU3luYygpLnBsYXRmb3JtVmVyc2lvbiA8IFwiMTA1MVwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkID0gcWcuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiB0aGlzLl92aWRlb2lkWzBdXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl92aWRlb0FkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIua/gOWKseinhumikeWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkVmlkZW9TdGF0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uRXJyb3IoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHFnLnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5bm/5ZGK5pKt5pS+5aSx6LSl77yM6K+36YeN6K+VIVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6KeG6aKR5bm/5ZGK6ZSZ6K+v77yaXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25DbG9zZSgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHQuaXNFbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5r+A5Yqx6KeG6aKR5bm/5ZGK5a6M5oiQ77yM5Y+R5pS+5aWW5YqxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ2IuYXBwbHkodGhpcy5fdmlkZW9DYlRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5r+A5Yqx6KeG6aKR5bm/5ZGK5Y+W5raI5YWz6Zet77yM5LiN5Y+R5pS+5aWW5YqxXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRWaWRlb1N0YXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQubG9hZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfdmlkZW9fYWQoY2FsbDogKHJlc3VsdCkgPT4gdm9pZCwgY2hhbmVsOiBDaGFubmVsTWFuYWdlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pi+56S66KeG6aKR5bm/5ZGK77yB44CC44CC44CCXCIpO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvQ2IgPSBjYWxsO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvQ2JUYXJnZXQgPSBjaGFuZWw7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlX3ZpZGVvX2FkKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK5Yid5aeL5YyW5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICBxZy5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5bm/5ZGK5Yid5aeL5YyW5aSx6LSl77yBXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJld2FyZFZpZGVvU3RhdCkge1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLnNob3coKTtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRWaWRlb1N0YXQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLmxvYWQoKTtcclxuICAgICAgICAgICAgcWcuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuW9k+WJjeayoeacieWPr+aSreaUvueahOW5v+WRilwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUludGVyc3RpdGlhbEFkKCk6IGJvb2xlYW4gfCB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZUludGVyc3RpdGlhbEFkXCIpO1xyXG4gICAgICAgIGlmIChcIlwiICE9IHRoaXMuX2ludGVyaWRbMF0pIHtcclxuICAgICAgICAgICAgaWYgKHFnLmNyZWF0ZUludGVyc3RpdGlhbEFkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxBZCA9IHFnLmNyZWF0ZUludGVyc3RpdGlhbEFkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5faW50ZXJpZFswXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faW50ZXJzdGl0aWFsQWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsQWQub25FcnJvcigodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrplJnor6/vvJpcIiwgdCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLl9pbnRlcmlkIGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X2ludGVyc3RpdGlhbF9hZCh0PzogYW55LCBlPzogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gcWcuY3JlYXRlSW50ZXJzdGl0aWFsQWQgJiYgISF0aGlzLl9pbnRlcnN0aXRpYWxBZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxBZC5zaG93KCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0X3JhbmtfdmFsdWUoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3JhbmsoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaWZDcmVhdGVTaG9ydGN1dChjYWxsOiAodDogYm9vbGVhbikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHFnLmhhc1Nob3J0Y3V0SW5zdGFsbGVkKHtcclxuICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicWcuaGFzU2hvcnRjdXRJbnN0YWxsZWQ6JXNcIiwgdCk7XHJcbiAgICAgICAgICAgICAgICBjYWxsKHQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxsKHRydWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4geyB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVNob3J0Y3V0KGNhbGw6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBxZy5oYXNTaG9ydGN1dEluc3RhbGxlZCh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAwID09IHQgJiYgcWcuaW5zdGFsbFNob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHsgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4geyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7IH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7IH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZU5hdGl2ZUFkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZUFkU3RhdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChcIlwiICE9IHRoaXMuX25hdGl2ZWlkWzFdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlQWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5fbmF0aXZlaWRbMV1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLm9uTG9hZCgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliqDovb3ljp/nlJ/lub/lkYrmiJDlip9cIiwgXCLvvJpcIiArIEpTT04uc3RyaW5naWZ5KHQpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0LmFkTGlzdCAmJiAwIDwgdC5hZExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMudG1wQWREYXRhID0gdC5hZExpc3RbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWRTdGF0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLm9uRXJyb3IoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K6+572u5Y6f55Sf5bm/5ZGK5Ye66ZSZ77yaXCIgKyBKU09OLnN0cmluZ2lmeSh0KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVBZFN0YXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlQWQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTUwMDApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLmxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYXRpdmVBZFN0YXQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEoKG5ldyBEYXRlKS5nZXRUaW1lKCkgLSB0aGlzLmdhbWVCZWdpblRpbWUgPCA2ZTQpICYmIHRoaXMuX25hdGl2ZUFkU3RhdFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlQWQub2ZmTG9hZCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLm9mZkVycm9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlQWQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5hdGl2ZUFkTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUFkLmxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZU5hdGl2ZUljb0FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZUljb0FkU3RhdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChcIlwiICE9IHRoaXMuX25hdGl2ZWlkWzBdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlSWNvQWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5fbmF0aXZlaWRbMF1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUljb0FkLm9uTG9hZCgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliqDovb3ljp/nlJ/lub/lkYpJQ0/miJDlip9cIiwgXCLvvJpcIiArIEpTT04uc3RyaW5naWZ5KHQpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0LmFkTGlzdCAmJiAwIDwgdC5hZExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50bXBJY29BZERhdGEgPSB0LmFkTGlzdFswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUljb0FkU3RhdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVJY29BZC5vbkVycm9yKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiuvue9ruWOn+eUn+W5v+WRikljb+WHuumUme+8mlwiICsgSlNPTi5zdHJpbmdpZnkodCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlSWNvQWRTdGF0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUljb0FkLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0sIDE1MDAwKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlSWNvQWQubG9hZCgpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZU5hdGl2ZUFkUHJvY2VzcygpO1xyXG4gICAgICAgICAgICB9LCAxNTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF0aXZlSWNvQWRDbGljaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUljb0FkLnJlcG9ydEFkQ2xpY2soe1xyXG4gICAgICAgICAgICBhZElkOiB0aGlzLmljb0FkRGF0YS5hZElkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuYXRpdmVJY29BZENsaWNrIHJlcG9ydEljb0FkQ2xpY2sgIGFkSWQ6JXNcIiwgdGhpcy5pY29BZERhdGEuYWRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkljb0Rlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlSWNvQWQpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVJY29BZC5vZmZMb2FkKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlSWNvQWQub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVJY29BZC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF0aXZlSWNvQWRMb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmF0aXZlSWNvQWQubG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TmF0aXZlRGF0YSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkRGF0YS50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5hdGl2ZUljb0RhdGEoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pY29BZERhdGEudGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROYXRpdmVEZXNjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWREYXRhLmRlc2M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROYXRpdmVJY29EZXNjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvQWREYXRhLmRlc2M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dCYW5uZXJOYXRpdmUobm9kZTogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghKChuZXcgRGF0ZSkuZ2V0VGltZSgpIC0gdGhpcy5nYW1lQmVnaW5UaW1lIDwgNjAwMDAgfHwgIXRoaXMudG1wSWNvQWREYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmJhbm5lck5hdGl2ZURhdGEgPSB0aGlzLnRtcEljb0FkRGF0YTtcclxuICAgICAgICAgICAgY29uc3QgYWRJbWcgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiYWRJbWdcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkRGVzYyA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZERlc2NcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkVGl0bGUgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiYWRUaXRsZVwiKTtcclxuICAgICAgICAgICAgY29uc3QgYWRCdXR0b24gPSBub2RlLmdldENoaWxkQnlOYW1lKFwiYWRCdXR0b25cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkTG9nbyA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZExvZ29cIik7XHJcbiAgICAgICAgICAgIGFkSW1nLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYmFubmVyTmF0aXZlRGF0YS5pY29uVXJsTGlzdCAmJiAwIDwgdGhpcy5iYW5uZXJOYXRpdmVEYXRhLmljb25VcmxMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQodGhpcy5iYW5uZXJOYXRpdmVEYXRhLmljb25VcmxMaXN0WzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnIsIHRleHR1cmU6IHN0cmluZyB8IGNjLlRleHR1cmUyRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZEltZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZEltZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZFRpdGxlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGFkVGl0bGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmJhbm5lck5hdGl2ZURhdGEudGl0bGU7XHJcbiAgICAgICAgICAgIGFkRGVzYy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBhZERlc2MuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmJhbm5lck5hdGl2ZURhdGEuZGVzYztcclxuICAgICAgICAgICAgYWRMb2dvLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYmFubmVyTmF0aXZlRGF0YS5sb2dvVXJsKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh0aGlzLmJhbm5lck5hdGl2ZURhdGEubG9nb1VybCwgKHQsIGU6IHN0cmluZyB8IGNjLlRleHR1cmUyRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkTG9nby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkTG9nby5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWFkQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pKSB7XHJcbiAgICAgICAgICAgICAgICBhZEJ1dHRvbi5hZGRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRCdXR0b24ub24oXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lck5hdGl2ZUFkQ2xpY2soKTtcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUljb0FkLnJlcG9ydEFkU2hvdyh7XHJcbiAgICAgICAgICAgICAgICBhZElkOiB0aGlzLmJhbm5lck5hdGl2ZURhdGEuYWRJZFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmF0aXZlSWNvQWQgIHJlcG9ydEljb0FkU2hvdyBhZElkOiVzXCIsIHRoaXMuYmFubmVyTmF0aXZlRGF0YS5hZElkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiYW5uZXJOYXRpdmVBZENsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmF0aXZlSWNvQWQucmVwb3J0QWRDbGljayh7XHJcbiAgICAgICAgICAgIGFkSWQ6IHRoaXMuYmFubmVyTmF0aXZlRGF0YS5hZElkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXJOYXRpdmVBZENsaWNrIHJlcG9ydEljb0FkQ2xpY2sgIGFkSWQ6JXNcIiwgdGhpcy5iYW5uZXJOYXRpdmVEYXRhLmFkSWQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2hvd0JpZ0pwZ05hdGl2ZShub2RlOiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCEoKG5ldyBEYXRlKS5nZXRUaW1lKCkgLSB0aGlzLmdhbWVCZWdpblRpbWUgPCA2ZTQgfHwgIXRoaXMudG1wQWREYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmJpZ0pwZ05hdGl2ZURhdGEgPSB0aGlzLnRtcEFkRGF0YTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgYWRJbWcgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiYWRJbWdcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkTG9nbyA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZExvZ29cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkQ2xpY2sgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiYWRDbGlja1wiKTtcclxuICAgICAgICAgICAgYWRJbWcuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5iaWdKcGdOYXRpdmVEYXRhLmljb25VcmxMaXN0ICYmIDAgPCB0aGlzLmJpZ0pwZ05hdGl2ZURhdGEuaWNvblVybExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh0aGlzLmJpZ0pwZ05hdGl2ZURhdGEuaWNvblVybExpc3RbMF0sIChlcnIsIHRleHR1cmU6IHN0cmluZyB8IGNjLlRleHR1cmUyRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkSW1nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkSW1nLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkTG9nby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmlnSnBnTmF0aXZlRGF0YS5sb2dvVXJsKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh0aGlzLmJpZ0pwZ05hdGl2ZURhdGEubG9nb1VybCwgKGVyciwgdGV4dHVyZTogc3RyaW5nIHwgY2MuVGV4dHVyZTJEKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRMb2dvLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRMb2dvLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghYWRJbWcuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikpIHtcclxuICAgICAgICAgICAgICAgIGFkSW1nLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZEltZy5vbihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQmlnSnBnTmF0aXZlQWRDbGljaygpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghYWRDbGljay5nZXRDb21wb25lbnQoY2MuQnV0dG9uKSkge1xyXG4gICAgICAgICAgICAgICAgYWRDbGljay5hZGRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRDbGljay5vbihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQmlnSnBnTmF0aXZlQWRDbGljaygpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlQWQucmVwb3J0QWRTaG93KHtcclxuICAgICAgICAgICAgICAgIGFkSWQ6IHRoaXMuYmlnSnBnTmF0aXZlRGF0YS5hZElkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5hdGl2ZUljb0FkICByZXBvcnRJY29BZFNob3cgYWRJZDolc1wiLCB0aGlzLmJpZ0pwZ05hdGl2ZURhdGEuYWRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQmlnSnBnTmF0aXZlQWRDbGljaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xyXG4gICAgICAgICAgICBhZElkOiB0aGlzLmFkRGF0YS5hZElkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJiaWdKcGdOYXRpdmVEYXRhICByZXBvcnRBZENsaWNrIGFkSWQ6JXNcIiwgdGhpcy5hZERhdGEuYWRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJY29OYXRpdmUobm9kZTogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghKChuZXcgRGF0ZSkuZ2V0VGltZSgpIC0gdGhpcy5nYW1lQmVnaW5UaW1lIDwgNmU0IHx8ICF0aGlzLnRtcEljb0FkRGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5pY29OYXRpdmVEYXRhID0gdGhpcy50bXBJY29BZERhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkSW1nID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImFkSW1nXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBhZExvZ28gPSBub2RlLmdldENoaWxkQnlOYW1lKFwiYWRMb2dvXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBhZENsb3NlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImFkQ2xvc2VcIik7XHJcblxyXG4gICAgICAgICAgICBhZEltZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYWRDbG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaWNvTmF0aXZlRGF0YS5pY29uVXJsTGlzdCAmJiAwIDwgdGhpcy5pY29OYXRpdmVEYXRhLmljb25VcmxMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQodGhpcy5pY29OYXRpdmVEYXRhLmljb25VcmxMaXN0WzBdLCAoZXJyLCB0ZXh0dXJlOiBzdHJpbmcgfCBjYy5UZXh0dXJlMkQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhZEltZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkQ2xvc2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhZEltZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkTG9nby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaWNvTmF0aXZlRGF0YS5sb2dvVXJsKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh0aGlzLmljb05hdGl2ZURhdGEubG9nb1VybCwgKGVyciwgdGV4dHVyZTogc3RyaW5nIHwgY2MuVGV4dHVyZTJEKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRMb2dvLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRMb2dvLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghYWRJbWcuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikpIHtcclxuICAgICAgICAgICAgICAgIGFkSW1nLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZEltZy5vbihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSWNvTmF0aXZlQWRDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYXRpdmVJY29BZCAgQ2xpY2sgSWNvIEFkU2hvdyBcIik7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVBZC5yZXBvcnRBZFNob3coe1xyXG4gICAgICAgICAgICAgICAgYWRJZDogdGhpcy5pY29OYXRpdmVEYXRhLmFkSWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBJY29OYXRpdmVBZENsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmF0aXZlSWNvQWQucmVwb3J0QWRDbGljayh7XHJcbiAgICAgICAgICAgIGFkSWQ6IHRoaXMuaWNvTmF0aXZlRGF0YS5hZElkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJiaWdKcGdOYXRpdmVEYXRhICByZXBvcnRBZENsaWNrIGFkSWQ6JXNcIiwgdGhpcy5hZERhdGEuYWRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lTmF0aXZlQWRQcm9jZXNzKCk6IHZvaWQge1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKDAgPT0gdGhpcy5uYXRpdmVBZFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlSWNvQWQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVBZFR5cGUgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVBZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUFkVHlwZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9hcHBfbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh3aW5kb3cucWcgJiYgd2luZG93LnFnLmdldFN5c3RlbUluZm9TeW5jKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucWcuZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2hhbm5lbE1hbmFnZXIuVU5LTk9XTjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc19zdXBwb3J0X2ludGVyc3RpdGlhbF9hZCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAocWcuY3JlYXRlSW50ZXJzdGl0aWFsQWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpc19zdXBwb3J0X2ludGVyc3RpdGlhbF9hZCAgY3JlYXRlSW50ZXJzdGl0aWFsQWQ6IHRydWVcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXNfc3VwcG9ydF9pbnRlcnN0aXRpYWxfYWQ6IGZhbHNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19