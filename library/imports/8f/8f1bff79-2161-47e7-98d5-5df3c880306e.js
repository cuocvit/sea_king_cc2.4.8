"use strict";
cc._RF.push(module, '8f1bf95IWFH55jVXfPIgDBu', 'VIVOMiniGame');
// start-scene/scripts/VIVOMiniGame.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIVOMiniGame = void 0;
var ChannelManager_1 = require("./ChannelManager");
var VIVOMiniGame = /** @class */ (function () {
    function VIVOMiniGame() {
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
    Object.defineProperty(VIVOMiniGame, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new VIVOMiniGame;
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    VIVOMiniGame.prototype.load_channel_env = function (call) {
        console.log("vivoMiniGame loadChannelEnv!!!");
        cc.audioEngine.stopAll();
        if (1063 <= qg.getSystemInfoSync()) {
            qg.login({
                success: function (t) {
                    console.log(JSON.stringify(t));
                },
                fail: function (t) {
                    console.log(JSON.stringify(t));
                }
            });
        }
        call();
        return true;
    };
    VIVOMiniGame.prototype.analyzeUrlPram = function () {
        return true;
    };
    VIVOMiniGame.prototype.loginVerify = function () {
        g.op._loginProcessCallFuc.apply(g.op._loginProcessTarget);
        return true;
    };
    VIVOMiniGame.prototype.load_sub_packages_env = function (call) {
        call();
        return true;
    };
    VIVOMiniGame.prototype.shareReq = function (call) {
        qg.share({
            success: function () {
                call();
            },
            fail: function () { },
            cancel: function () { }
        });
        return true;
    };
    VIVOMiniGame.prototype.getIsCanShare = function () {
        return true;
    };
    VIVOMiniGame.prototype.getIsCanRecord = function () {
        return true;
    };
    VIVOMiniGame.prototype.loginReport = function () { };
    VIVOMiniGame.prototype.show_banner_ad = function (param) {
        var _this = this;
        var time = (new Date).getTime();
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
                this._bannerAd.onError(function () {
                    console.log("banner AD loaded is error!!!!");
                });
                console.log("create BannerAd!!!!!");
                this.bannerLoadTime = (new Date).getTime();
                this._bannerAd.offLoad();
                this._bannerAd.onLoad(function () {
                    cc.log("_bannerAd onLoad");
                    _this._bannerAd.show().then(function () {
                        console.log("广告显示成功");
                    }).catch(function (t) {
                        console.log("广告组件出现问题", t);
                    });
                    _this._ifBannerLoaded = true;
                });
            }
            else {
                console.log("this._bannerid is null");
            }
        }
    };
    VIVOMiniGame.prototype.hide_banner_ad = function (param) {
        if (this._ifBannerLoaded) {
            this._bannerAd.hide();
        }
    };
    VIVOMiniGame.prototype.get_app_name = function () {
        if (window.qg && window.qg.getSystemInfoSync) {
            return window.qg.getSystemInfoSync().platform;
        }
        else {
            return ChannelManager_1.ChannelManager.UNKNOWN;
        }
    };
    VIVOMiniGame.prototype.create_video_ad = function () {
        var _this = this;
        console.log("Vivo- createVideoAD!....");
        if (!(qg.getSystemInfoSync().platformVersionCode < 1063)) {
            this._videoAd = qg.createRewardedVideoAd({
                posId: this._videoid[0]
            });
            if (!this._videoAd)
                return false;
            this._videoAd.onLoad(function () {
                console.log("激励视频加载成功");
            });
            this._videoAd.onError(function () {
                qg.showToast({
                    message: "视频广告初始化失败，请重新尝试!"
                });
                _this._videoAd.load();
            });
            this._videoAd.load();
            this._videoAd.onClose(function (t) {
                if (t && t.isEnded) {
                    console.log("激励视频广告完成，发放奖励");
                    _this._videoCb.apply(_this._videoCbTarget);
                }
                else {
                    console.log("视频广告观看中断");
                }
                _this._videoAd.load();
                cc.game.resume();
            });
        }
    };
    VIVOMiniGame.prototype.show_video_ad = function (videoCb, videoCbTarget) {
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
        this._videoAd.show().then(function () {
            console.log("视频广告显示成功");
            cc.game.pause();
        });
    };
    Object.defineProperty(VIVOMiniGame.prototype, "is_support_interstitial_ad", {
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
    VIVOMiniGame.prototype.createInterstitialAd = function () {
        console.log("createInterstitialAd");
        if ("" != this._interid[0]) {
            if (qg.createInterstitialAd) {
                this._interstitialAd = qg.createInterstitialAd({
                    posId: this._interid[0]
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
    VIVOMiniGame.prototype.show_interstitial_ad = function (t, e) {
        var _this = this;
        console.log("showInterstitialAd!");
        var time = (new Date).getTime();
        if (!(time - this.interAdLoadTime < 15000))
            return this._interstitialAd = qg.createInterstitialAd({
                posId: this._interid[0]
            }),
                this._interstitialAd.onError(function () {
                    console.log("插屏广告加载失败！");
                }),
                this._interstitialAd.show().then(function () {
                    console.log("插屏广告展示成功！"),
                        _this.interAdLoadTime = (new Date).getTime();
                }).catch(function (t) {
                    console.log("插屏广告展示失败：", t);
                }),
                true;
    };
    Object.defineProperty(VIVOMiniGame.prototype, "is_support_more_game", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VIVOMiniGame.prototype, "is_share", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VIVOMiniGame.prototype, "is_video_share", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VIVOMiniGame.prototype, "is_rank", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    VIVOMiniGame.prototype.getChannelName = function () {
        return "vivo";
    };
    VIVOMiniGame.prototype.ifCreateShortcut = function (call) {
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
    VIVOMiniGame.prototype.createShortcut = function (call) {
        qg.hasShortcutInstalled({
            success: function (t) {
                if (0 == t) {
                    qg.installShortcut({
                        success: function () {
                            call();
                        },
                        fail: function () { },
                        complete: function () { }
                    });
                }
            },
            fail: function () { },
            complete: function () { }
        });
    };
    VIVOMiniGame.prototype.createNativeAd = function () {
        var _this = this;
        if (!((new Date).getTime() - this.nativeLoadTime < 15000)) {
            this._nativeAdStat = false;
            if ("" != this._nativeid[0]) {
                this.nativeAd = qg.createNativeAd({
                    posId: this._nativeid[0]
                });
                this.nativeAd.onLoad(function (t) {
                    console.log("加载原生广告成功", "：" + JSON.stringify(t));
                    if (t.adList && 0 < t.adList.length) {
                        _this.tmpAdData = t.adList.pop();
                    }
                    _this.nativeJpgLoadState = false;
                    cc.loader.load(_this.tmpAdData.imgUrlList[0], function (t, e) {
                        if (t) {
                            _this.nativeJpgLoadState = false;
                            console.log("adImag is loading err:%s!", t);
                        }
                        else {
                            _this.nativeJpgLoadState = true;
                            _this._tmpNativeJpg = new cc.SpriteFrame(e);
                            console.log("adImag is loading ok!");
                        }
                    });
                    if (_this.tmpAdData) {
                        (_this.adData = _this.tmpAdData);
                    }
                    _this._nativeAdStat = true;
                    _this.nativeLoadTime = (new Date).getTime();
                    console.log("NativeAd nativeload time:%s,nativeAdStat:%s", _this.nativeLoadTime, _this._nativeAdStat);
                });
                this.nativeAd.onError(function () {
                    _this._nativeAdStat = false;
                });
                this.nativeAd.load();
            }
        }
    };
    VIVOMiniGame.prototype.nativeAdStat = function () {
        return this.nativeJpgLoadState;
    };
    VIVOMiniGame.prototype.showAd = function (adLayout, num) {
        var _this = this;
        if (num === void 0) { num = 0; }
        console.log("VivoMiniGame nativeAd showAd!", JSON.stringify(this.tmpAdData));
        if (this.tmpAdData) {
            this.adData = this.tmpAdData;
            if (0 == num) {
                (this.adLayout = adLayout);
            }
            var containLayout = this.adLayout.getChildByName("containLayout");
            var adImg = containLayout.getChildByName("adImg");
            var adDesc = containLayout.getChildByName("adDesc");
            var adLogo_1 = containLayout.getChildByName("adLogo");
            var adClose = containLayout.getChildByName("adClose");
            var actionLayout = this.adLayout.getChildByName("actionLayout");
            actionLayout.getChildByName("adAction");
            var adTitle = actionLayout.getChildByName("adTitle");
            adImg.active = true;
            adImg.getComponent(cc.Sprite).spriteFrame = this._tmpNativeJpg;
            adLogo_1.active = false;
            if (this.adData.logoUrl) {
                cc.loader.load(this.adData.logoUrl, function (t, e) {
                    adLogo_1.active = true;
                    adLogo_1.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e);
                });
            }
            adTitle.active = false;
            adTitle.getComponent(cc.Label).string = this.adData.title;
            adDesc.active = false;
            adDesc.getComponent(cc.Label).string = this.adData.desc;
            adClose.active = true;
            adClose.on(cc.Node.EventType.TOUCH_START, function () {
                _this.adLayout.active = false;
            });
            if (!adImg.getComponent(cc.Button)) {
                adImg.addComponent(cc.Button);
            }
            adImg.on("click", function () {
                _this.nativeAdClick();
            }, this);
            this.nativeAd.reportAdShow({
                adId: this.adData.adId
            });
            console.log("nativeAd.reportAdShow adId: %s", this.adData.adId);
            this.adLayout.active = true;
            this._nativeAdStat = false;
        }
    };
    VIVOMiniGame.prototype.nativeAdClick = function () {
        this.nativeAd.reportAdClick({
            adId: this.adData.adId
        });
        console.log("nativeAd reportAdClick adId: %s", this.adData.adId);
    };
    VIVOMiniGame.prototype.onDestroy = function () {
        if (this.nativeAd) {
            this.nativeAd.offLoad();
            this.nativeAd.offError();
            this.nativeAd.destroy();
        }
    };
    VIVOMiniGame.prototype.nativeAdLoad = function () { };
    VIVOMiniGame.prototype.createNativeIcoAd = function () {
        var _this = this;
        console.log("createNativeICOAd:%S", this._nativeid[1]), this._nativeIcoAdStat = !1;
        if ("" != this._nativeid[1]) {
            this.nativeIcoAd = qg.createNativeAd({
                posId: this._nativeid[1]
            });
            this.nativeIcoAd.onLoad(function (t) {
                console.log("加载原生广告ICO成功", "：" + JSON.stringify(t));
                if (t.adList && 0 < t.adList.length) {
                    _this.tmpIcoAdData = t.adList.pop();
                }
                _this.icoNativeJpgLoadState = false;
                cc.loader.load(_this.tmpIcoAdData.imgUrlList[0], function (t, e) {
                    if (t) {
                        _this.icoNativeJpgLoadState = false;
                        console.log("adImag is loading err:%s!", t);
                    }
                    else {
                        _this.icoNativeJpgLoadState = true;
                        _this._tmpIcoNativeJpg = new cc.SpriteFrame(e);
                        console.log("adImag is loading ok!");
                    }
                });
                if (_this.tmpIcoAdData) {
                    _this.icoAdData = _this.tmpIcoAdData;
                }
                _this._nativeIcoAdStat = true;
                _this.nativeLoadTime = (new Date).getTime();
                console.log("NativeIcoAd nativeload time:%s,nativeIcoAdStat:%s", _this.nativeLoadTime, _this._nativeIcoAdStat);
            });
            this.nativeIcoAd.onError(function (t) {
                console.log("设置原生广告出错：" + JSON.stringify(t));
                _this._nativeIcoAdStat = false;
            });
            this.nativeIcoAd.load();
            setTimeout(function () {
                _this.timeProcess();
            }, 15000);
        }
    };
    VIVOMiniGame.prototype.nativeIcoAdStat = function () {
        return this.icoNativeJpgLoadState;
    };
    VIVOMiniGame.prototype.showIcoAd = function (icoAdLayout, num) {
        var _this = this;
        if (num === void 0) { num = 0; }
        console.log("VivoMiniGame showIcoAd!", JSON.stringify(this.tmpIcoAdData));
        if (this.tmpIcoAdData) {
            this.icoAdData = this.tmpIcoAdData;
            if (0 == num) {
                this.icoAdLayout = icoAdLayout;
            }
            var containLayout = this.icoAdLayout.getChildByName("containLayout");
            var adImg = containLayout.getChildByName("adImg");
            var adDesc = containLayout.getChildByName("adDesc");
            var adLogo_2 = containLayout.getChildByName("adLogo");
            var adClose = containLayout.getChildByName("adClose");
            var actionLayout = this.icoAdLayout.getChildByName("actionLayout");
            actionLayout.getChildByName("adAction");
            var adTitle = actionLayout.getChildByName("adTitle");
            adImg.active = true;
            adImg.getComponent(cc.Sprite).spriteFrame = this._tmpIcoNativeJpg;
            adLogo_2.active = true;
            if (this.icoAdData.logoUrl) {
                cc.loader.load(this.icoAdData.logoUrl, function (t, e) {
                    adLogo_2.active = true;
                    adLogo_2.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e);
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
            adImg.on("click", function () {
                _this.nativeIcoAdClick();
            }, this);
            this.nativeIcoAd.reportAdShow({
                adId: this.icoAdData.adId
            });
            console.log("nativeIcoAd reportAdShow adId:%s", this.icoAdData.adId);
            this.icoAdLayout.active = true;
            this._nativeIcoAdStat = false;
        }
    };
    VIVOMiniGame.prototype.nativeIcoAdClick = function () {
        console.log("nativeIcoAd Id:%s，nativeIcoAd Load Stat:%s,time:%s", this.icoAdData.adId, this._nativeIcoAdStat, (new Date).getTime());
        this.nativeIcoAd.reportAdClick({
            adId: this.icoAdData.adId
        });
        setTimeout(function () {
            Common.ui.destroyNativeInterAd();
        }, 500);
    };
    VIVOMiniGame.prototype.setNativeIcoShowStat = function () { };
    VIVOMiniGame.prototype.onIcoDestroy = function () {
        if (this.nativeIcoAd) {
            this.nativeIcoAd.offLoad();
            this.nativeIcoAd.offError();
            this.nativeIcoAd.destroy();
        }
    };
    VIVOMiniGame.prototype.nativeIcoAdLoad = function () { };
    VIVOMiniGame.prototype.getNativeData = function () {
        return this.adData.title || "";
    };
    VIVOMiniGame.prototype.getNativeIcoData = function () {
        return this.adData.title ? this.icoAdData.title : "";
    };
    VIVOMiniGame.prototype.showMoreGame = function () { };
    VIVOMiniGame.prototype.getNativeDesc = function () {
        return this.adData.desc;
    };
    VIVOMiniGame.prototype.getNativeIcoDesc = function () {
        return this.icoAdData.desc;
    };
    VIVOMiniGame.prototype.showBannerNative = function (node) {
        var _this = this;
        if (!((new Date).getTime() - this.gameBeginTime < 6e4 || !this.tmpIcoAdData)) {
            this.bannerNativeData = this.tmpIcoAdData;
            var adImg_1 = node.getChildByName("adImg");
            var adDesc = node.getChildByName("adDesc");
            var adTitle = node.getChildByName("adTitle");
            var adButton = node.getChildByName("adButton");
            adImg_1.active = false;
            if (this.bannerNativeData.icon) {
                cc.loader.load(this.bannerNativeData.icon, function (err, texture) {
                    adImg_1.active = true;
                    adImg_1.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });
            }
            adTitle.active = true;
            adTitle.getComponent(cc.Label).string = this.bannerNativeData.title;
            adDesc.active = true;
            adDesc.getComponent(cc.Label).string = this.bannerNativeData.desc;
            if (this.icoAdData.logoUrl) {
                cc.loader.load(this.icoAdData.logoUrl, function (t, e) {
                });
            }
            if (adButton.getComponent(cc.Button)) {
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
    VIVOMiniGame.prototype.bannerNativeAdClick = function () {
        this.nativeIcoAd.reportAdClick({
            adId: this.bannerNativeData.adId
        });
        console.log("bannerNativeAdClick reportIcoAdClick  adId:%s", this.bannerNativeData.adId);
    };
    VIVOMiniGame.prototype.timeProcess = function () {
        var _this = this;
        setInterval(function () {
            if (0 == _this.nativeIcoMap) {
                if (!_this._nativeAdStat) {
                    _this.nativeAd.load();
                }
                _this.nativeIcoMap = 1;
                console.log("timeProcess nativeAdLoad time:%s,_nativeAdStat:%s", (new Date).getTime(), _this._nativeAdStat);
            }
            else {
                if (!_this._nativeIcoAdStat) {
                    _this.nativeIcoAd.load();
                }
                _this.nativeIcoMap = 0;
                console.log("timeProcess nativeIcoAdLoad time:%s,_nativeIcoAdStat:%s", (new Date).getTime(), _this._nativeIcoAdStat);
            }
        }, 15000);
    };
    VIVOMiniGame.prototype.vibrate_short = function () {
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
    VIVOMiniGame.prototype.vibrate_long = function () {
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
    VIVOMiniGame.prototype.showBigJpgNative = function (node) { };
    VIVOMiniGame.prototype.showIcoNative = function (node) { };
    VIVOMiniGame._instance = null;
    VIVOMiniGame.ad_enable = false;
    return VIVOMiniGame;
}());
exports.VIVOMiniGame = VIVOMiniGame;

cc._RF.pop();