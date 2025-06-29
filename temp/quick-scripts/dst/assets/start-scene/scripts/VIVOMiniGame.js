
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/VIVOMiniGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFZJVk9NaW5pR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFtQ2xFO0lBb0NJO1FBQ0ksSUFBSSxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELHNCQUFXLHdCQUFRO2FBQW5CO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUM7YUFDckM7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFTSx1Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBZ0I7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDaEMsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDTCxPQUFPLEVBQUUsVUFBQyxDQUFDO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELElBQUksRUFBRSxVQUFDLENBQUM7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7YUFDSixDQUFDLENBQUM7U0FDTjtRQUNELElBQUksRUFBRSxDQUFDO1FBQ1AsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLHFDQUFjLEdBQXRCO1FBQ0ksT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLGtDQUFXLEdBQW5CO1FBQ0ksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSw0Q0FBcUIsR0FBNUIsVUFBNkIsSUFBZ0I7UUFDekMsSUFBSSxFQUFFLENBQUM7UUFDUCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sK0JBQVEsR0FBaEIsVUFBaUIsSUFBZ0I7UUFDN0IsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNMLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsQ0FBQTtZQUNWLENBQUM7WUFDRCxJQUFJLEVBQUUsY0FBUSxDQUFDO1lBQ2YsTUFBTSxFQUFFLGNBQVEsQ0FBQztTQUNwQixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sb0NBQWEsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8scUNBQWMsR0FBdEI7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sa0NBQVcsR0FBbkIsY0FBOEIsQ0FBQztJQUV4QixxQ0FBYyxHQUFyQixVQUFzQixLQUFxQjtRQUEzQyxpQkFtQ0M7UUFsQ0csSUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWxDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0YsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzVCO1lBRUQsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLEtBQUssRUFBRSxFQUFFO2lCQUNaLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztvQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQztnQkFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDbEIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUMzQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQzt3QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDMUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQzt3QkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDL0IsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7SUFDTCxDQUFDO0lBRU0scUNBQWMsR0FBckIsVUFBc0IsS0FBcUI7UUFDdkMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRU0sbUNBQVksR0FBbkI7UUFDSSxJQUFJLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQyxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDakQ7YUFBTTtZQUNILE9BQU8sK0JBQWMsQ0FBQyxPQUFPLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRU0sc0NBQWUsR0FBdEI7UUFBQSxpQkFpQ0M7UUFoQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDMUIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBRWpDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1QsT0FBTyxFQUFFLGtCQUFrQjtpQkFDOUIsQ0FBQyxDQUFDO2dCQUNILEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDN0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUM1QztxQkFBTTtvQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUMzQjtnQkFFRCxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyQixFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRU0sb0NBQWEsR0FBcEIsVUFBcUIsT0FBaUMsRUFBRSxhQUE2QjtRQUNqRixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBRXBDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNULE9BQU8sRUFBRSxrQkFBa0I7YUFDOUIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsc0JBQVcsb0RBQTBCO2FBQXJDO1lBQ0ksSUFBSSxFQUFFLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQztnQkFDdEUsT0FBTyxJQUFJLENBQUM7YUFDZjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ2pELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQzs7O09BQUE7SUFFTywyQ0FBb0IsR0FBNUI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4QixJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQzNDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDMUIsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWU7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUM3QixDQUFDLENBQUMsQ0FBQTtTQUNMO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRU0sMkNBQW9CLEdBQTNCLFVBQTRCLENBQU8sRUFBRSxDQUFPO1FBQTVDLGlCQWlCQztRQWhCRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsSUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUN0QyxPQUFPLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNsRCxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDMUIsQ0FBQztnQkFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztvQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFDNUIsQ0FBQyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQzt3QkFDcEIsS0FBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUM7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQy9CLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUM7SUFDakIsQ0FBQztJQUVELHNCQUFXLDhDQUFvQjthQUEvQjtZQUNJLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsa0NBQVE7YUFBbkI7WUFDSSxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHdDQUFjO2FBQXpCO1lBQ0ksT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxpQ0FBTzthQUFsQjtZQUNJLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBRU8scUNBQWMsR0FBdEI7UUFDSSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRU8sdUNBQWdCLEdBQXhCLFVBQXlCLElBQTJCO1FBQ2hELEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUNwQixPQUFPLEVBQUUsVUFBQyxDQUFDO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLENBQUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUNELFFBQVEsRUFBRSxjQUFRLENBQUM7U0FDdEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVPLHFDQUFjLEdBQXRCLFVBQXVCLElBQWdCO1FBQ25DLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUNwQixPQUFPLEVBQUUsVUFBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDUixFQUFFLENBQUMsZUFBZSxDQUFDO3dCQUNmLE9BQU8sRUFBRTs0QkFDTCxJQUFJLEVBQUUsQ0FBQzt3QkFDWCxDQUFDO3dCQUNELElBQUksRUFBRSxjQUFRLENBQUM7d0JBQ2YsUUFBUSxFQUFFLGNBQVEsQ0FBQztxQkFDdEIsQ0FBQyxDQUFDO2lCQUNOO1lBQ0wsQ0FBQztZQUNELElBQUksRUFBRSxjQUFRLENBQUM7WUFDZixRQUFRLEVBQUUsY0FBUSxDQUFDO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxxQ0FBYyxHQUF0QjtRQUFBLGlCQXdDQztRQXZDRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztpQkFDM0IsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQztvQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakQsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTt3QkFDakMsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNuQztvQkFDRCxLQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO29CQUNoQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDO3dCQUM5QyxJQUFJLENBQUMsRUFBRTs0QkFDSCxLQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDOzRCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUMvQzs2QkFBTTs0QkFDSCxLQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDOzRCQUMvQixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3lCQUN4QztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUU7d0JBQ2hCLENBQUMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ2xDO29CQUVELEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUMxQixLQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxLQUFJLENBQUMsY0FBYyxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDeEcsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCO1NBQ0o7SUFDTCxDQUFDO0lBRU8sbUNBQVksR0FBcEI7UUFDSSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNuQyxDQUFDO0lBRU8sNkJBQU0sR0FBZCxVQUFlLFFBQW1CLEVBQUUsR0FBZTtRQUFuRCxpQkF1REM7UUF2RG1DLG9CQUFBLEVBQUEsT0FBZTtRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ1YsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDO2FBQzlCO1lBRUQsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDcEUsSUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwRCxJQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RELElBQU0sUUFBTSxHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEQsSUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV4RCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNsRSxZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhDLElBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkQsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDcEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDL0QsUUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDckIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQztvQkFDckMsUUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ3JCLFFBQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN2QixPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDMUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDdEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBRXRCLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO2dCQUN0QyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUE7WUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2hDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1lBRUQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1lBQ3hCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVULElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO2dCQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO2FBQ3pCLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRU8sb0NBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUN4QixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO1NBQ3pCLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU8sZ0NBQVMsR0FBakI7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFTyxtQ0FBWSxHQUFwQixjQUErQixDQUFDO0lBRXhCLHdDQUFpQixHQUF6QjtRQUFBLGlCQTZDQztRQTVDRyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbkYsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ2pDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUMzQixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQ2pDLEtBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDdEM7Z0JBRUQsS0FBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztnQkFDbkMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQztvQkFDakQsSUFBSSxDQUFDLEVBQUU7d0JBQ0gsS0FBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQzt3QkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDL0M7eUJBQU07d0JBQ0gsS0FBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQzt3QkFDbEMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3FCQUN4QztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLEtBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ25CLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztpQkFDdEM7Z0JBRUQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDN0IsS0FBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELEVBQUUsS0FBSSxDQUFDLGNBQWMsRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNqSCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QixVQUFVLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVPLHNDQUFlLEdBQXZCO1FBQ0ksT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDdEMsQ0FBQztJQUVPLGdDQUFTLEdBQWpCLFVBQWtCLFdBQXNCLEVBQUUsR0FBZTtRQUF6RCxpQkFpREM7UUFqRHlDLG9CQUFBLEVBQUEsT0FBZTtRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7YUFDbEM7WUFFRCxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2RSxJQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELElBQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEQsSUFBTSxRQUFNLEdBQUcsYUFBYSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxJQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hELElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQ3BFLFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEMsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV2RCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNwQixLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQ2xFLFFBQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBRXJCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ3hDLFFBQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNyQixRQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxDQUFDLENBQUMsQ0FBQzthQUNOO1lBQ0QsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDdkIsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUMzRCxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUV0QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2hDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1lBRUQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7WUFDM0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRVQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7Z0JBQzFCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7YUFDNUIsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVPLHVDQUFnQixHQUF4QjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3BJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1lBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDO1lBQ1AsTUFBTSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFBO1FBQ3BDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFTywyQ0FBb0IsR0FBNUIsY0FBdUMsQ0FBQztJQUNoQyxtQ0FBWSxHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFTyxzQ0FBZSxHQUF2QixjQUFrQyxDQUFDO0lBRTNCLG9DQUFhLEdBQXJCO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVPLHVDQUFnQixHQUF4QjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVPLG1DQUFZLEdBQXBCLGNBQStCLENBQUM7SUFFeEIsb0NBQWEsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFTyx1Q0FBZ0IsR0FBeEI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFTSx1Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBYTtRQUFyQyxpQkF5Q0M7UUF4Q0csSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzFFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBRTFDLElBQU0sT0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakQsT0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO2dCQUM1QixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQThCO29CQUMzRSxPQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDcEIsT0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUUsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1lBRWxFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBRTVDLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNsQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwQztZQUNELFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUNqQixLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMvQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFVCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztnQkFDMUIsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJO2FBQ25DLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25GO0lBQ0wsQ0FBQztJQUVPLDBDQUFtQixHQUEzQjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1lBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSTtTQUNuQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRU8sa0NBQVcsR0FBbkI7UUFBQSxpQkFnQkM7UUFmRyxXQUFXLENBQUM7WUFDUixJQUFJLENBQUMsSUFBSSxLQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN4QixJQUFJLENBQUMsS0FBSSxDQUFDLGFBQWEsRUFBRTtvQkFDckIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDeEI7Z0JBQ0QsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM5RztpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSSxDQUFDLGdCQUFnQixFQUFFO29CQUN4QixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUMzQjtnQkFDRCxLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDdkg7UUFDTCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRU0sb0NBQWEsR0FBcEI7UUFDSSxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUU7WUFDakIsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDWixPQUFPLEVBQUUsVUFBQyxDQUFDO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixDQUFDO2dCQUNELElBQUksRUFBRTtvQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3BDLENBQUM7YUFDSixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFTSxtQ0FBWSxHQUFuQjtRQUNJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtZQUNoQixFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUNYLE9BQU8sRUFBRSxVQUFDLENBQUM7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLENBQUM7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDbkMsQ0FBQzthQUNKLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLHVDQUFnQixHQUF2QixVQUF3QixJQUFhLElBQVUsQ0FBQztJQUN6QyxvQ0FBYSxHQUFwQixVQUFxQixJQUFhLElBQVUsQ0FBQztJQWxyQjlCLHNCQUFTLEdBQWlCLElBQUksQ0FBQztJQUMvQixzQkFBUyxHQUFZLEtBQUssQ0FBQztJQWtyQjlDLG1CQUFDO0NBcHJCRCxBQW9yQkMsSUFBQTtBQXByQlksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFubmVsTWFuYWdlciwgQkFOTkVSX0FEX1RZUEUgfSBmcm9tIFwiLi9DaGFubmVsTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWQge1xyXG4gICAgc2hvdygpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgbG9hZD8oKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIGhpZGU/KCk6IHZvaWQ7XHJcbiAgICBkZXN0cm95PygpOiB2b2lkO1xyXG4gICAgb25FcnJvcihjYWxsYmFjazogKGVycm9yOiBhbnkpID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgb25Mb2FkPyhjYWxsYmFjazogKHQ/OiB7IGFkTGlzdDogSUFkRGF0YVtdIH0pID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgb2ZmTG9hZD8oKTogdm9pZDtcclxuICAgIG9uQ2xvc2U/KGNhbGxiYWNrOiAocmVzdWx0OiB7IGlzRW5kZWQ6IGJvb2xlYW4gfSkgPT4gdm9pZCk6IHZvaWQ7XHJcbiAgICBvZmZFcnJvcj8oKTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIElOYXRpdmVBZCBleHRlbmRzIElBZCB7XHJcbiAgICByZXBvcnRBZFNob3cocGFyYW1zOiB7IGFkSWQ6IHN0cmluZyB9KTogdm9pZDtcclxuICAgIHJlcG9ydEFkQ2xpY2socGFyYW1zOiB7IGFkSWQ6IHN0cmluZyB9KTogdm9pZDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElBZERhdGEge1xyXG4gICAgYWRJZDogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGRlc2M6IHN0cmluZztcclxuICAgIGxvZ29Vcmw/OiBzdHJpbmc7XHJcbiAgICBpY29uPzogc3RyaW5nO1xyXG4gICAgaW1nVXJsTGlzdD86IHN0cmluZ1tdO1xyXG4gICAgaWNvblVybExpc3Q/OiBzdHJpbmdbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIElBZExheW91dCB7XHJcbiAgICBnZXRDaGlsZEJ5TmFtZShuYW1lOiBzdHJpbmcpOiBjYy5Ob2RlO1xyXG4gICAgYWN0aXZlOiBib29sZWFuO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBWSVZPTWluaUdhbWUge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBWSVZPTWluaUdhbWUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWRfZW5hYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF90YXJnZXRCYW5uZXJBZFdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9iYW5uZXJBZDogSUFkO1xyXG4gICAgcHJpdmF0ZSBfaWZCYW5uZXJMb2FkZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF92aWRlb0FkOiBJQWQ7XHJcbiAgICBwcml2YXRlIF92aWRlb0NiOiAocmVzdWx0OiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF92aWRlb0NiVGFyZ2V0OiBDaGFubmVsTWFuYWdlcjtcclxuICAgIHByaXZhdGUgX29wcG9VaWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2ludGVyc3RpdGlhbEFkOiBJQWQ7XHJcbiAgICBwcml2YXRlIF9iYW5uZXJpZDogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF92aWRlb2lkOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX2ludGVyaWQ6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBfbmF0aXZlaWQ6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBuYXRpdmVBZDogSU5hdGl2ZUFkO1xyXG4gICAgcHJpdmF0ZSBhZERhdGE6IElBZERhdGE7XHJcbiAgICBwcml2YXRlIHRtcEFkRGF0YTogSUFkRGF0YTtcclxuICAgIHByaXZhdGUgYWRMYXlvdXQ6IElBZExheW91dDtcclxuICAgIHByaXZhdGUgX25hdGl2ZUFkU3RhdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX25hdGl2ZUljb0FkU3RhdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgbmF0aXZlSWNvQWQ6IElOYXRpdmVBZDtcclxuICAgIHByaXZhdGUgaWNvQWREYXRhOiBJQWREYXRhO1xyXG4gICAgcHJpdmF0ZSB0bXBJY29BZERhdGE6IElBZERhdGE7XHJcbiAgICBwcml2YXRlIGljb0FkTGF5b3V0OiBJQWRMYXlvdXQ7XHJcbiAgICBwcml2YXRlIGJhbm5lckxvYWRUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGludGVyQWRMb2FkVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBuYXRpdmVJY29NYXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbmF0aXZlTG9hZFRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaWNvTmF0aXZlSnBnTG9hZFN0YXRlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfdG1wSWNvTmF0aXZlSnBnOiBjYy5TcHJpdGVGcmFtZTtcclxuICAgIHByaXZhdGUgbmF0aXZlSnBnTG9hZFN0YXRlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfdG1wTmF0aXZlSnBnOiBjYy5TcHJpdGVGcmFtZTtcclxuICAgIHByaXZhdGUgYmFubmVyTmF0aXZlRGF0YTogSUFkRGF0YTtcclxuICAgIHByaXZhdGUgZ2FtZUJlZ2luVGltZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3RhcmdldEJhbm5lckFkV2lkdGggPSAyMDA7XHJcbiAgICAgICAgdGhpcy5fYmFubmVyQWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2lmQmFubmVyTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmlkZW9BZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdmlkZW9DYiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdmlkZW9DYlRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb3Bwb1VpZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsQWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2Jhbm5lcmlkID0gW1wiMTRiNTU2ZjU0MTAwNGI0NWJhNjVjNTkyYmJmNzA2ZThcIl07XHJcbiAgICAgICAgdGhpcy5fdmlkZW9pZCA9IFtcImU5YWMxNjYxMzBjZDQ2MjA4OGE5MmMyYmE2OGZlYzgzXCJdO1xyXG4gICAgICAgIHRoaXMuX2ludGVyaWQgPSBbXTtcclxuICAgICAgICB0aGlzLl9uYXRpdmVpZCA9IFtdO1xyXG4gICAgICAgIHRoaXMubmF0aXZlQWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYWREYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRtcEFkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hZExheW91dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlQWRTdGF0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlSWNvQWRTdGF0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVJY29BZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pY29BZERhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudG1wSWNvQWREYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLmljb0FkTGF5b3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJhbm5lckxvYWRUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmludGVyQWRMb2FkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVJY29NYXAgPSAwO1xyXG4gICAgICAgIHRoaXMubmF0aXZlTG9hZFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuaWNvTmF0aXZlSnBnTG9hZFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdG1wSWNvTmF0aXZlSnBnID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hdGl2ZUpwZ0xvYWRTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RtcE5hdGl2ZUpwZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5iYW5uZXJOYXRpdmVEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdhbWVCZWdpblRpbWUgPSAobmV3IERhdGUpLmdldFRpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGluc3RhbmNlKCk6IFZJVk9NaW5pR2FtZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBWSVZPTWluaUdhbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZF9jaGFubmVsX2VudihjYWxsOiAoKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2aXZvTWluaUdhbWUgbG9hZENoYW5uZWxFbnYhISFcIik7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgIGlmICgxMDYzIDw9IHFnLmdldFN5c3RlbUluZm9TeW5jKCkpIHtcclxuICAgICAgICAgICAgcWcubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0KSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhbmFseXplVXJsUHJhbSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZ2luVmVyaWZ5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGcub3AuX2xvZ2luUHJvY2Vzc0NhbGxGdWMuYXBwbHkoZy5vcC5fbG9naW5Qcm9jZXNzVGFyZ2V0KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZF9zdWJfcGFja2FnZXNfZW52KGNhbGw6ICgpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBjYWxsKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaGFyZVJlcShjYWxsOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgcWcuc2hhcmUoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxsKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKCkgPT4geyB9LFxyXG4gICAgICAgICAgICBjYW5jZWw6ICgpID0+IHsgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SXNDYW5TaGFyZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldElzQ2FuUmVjb3JkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9naW5SZXBvcnQoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd19iYW5uZXJfYWQocGFyYW06IEJBTk5FUl9BRF9UWVBFKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IChuZXcgRGF0ZSkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICBpZiAodGltZSAtIHRoaXMuYmFubmVyTG9hZFRpbWUgPCAxNTAwMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNob3dCYW5uZXJBZCBiYW5uZXJMb2FkIHRpbWU6JXMscGFuZWxUeXBlOiVzXCIsIHRpbWUgLSB0aGlzLmJhbm5lckxvYWRUaW1lLCBwYXJhbSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9iYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoXCJcIiAhPSB0aGlzLl9iYW5uZXJpZFswXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQgPSBxZy5jcmVhdGVCYW5uZXJBZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zSWQ6IHRoaXMuX2Jhbm5lcmlkWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7fVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQub25FcnJvcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXIgQUQgbG9hZGVkIGlzIGVycm9yISEhIVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlIEJhbm5lckFkISEhISFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckxvYWRUaW1lID0gKG5ldyBEYXRlKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5vZmZMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5uZXJBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIl9iYW5uZXJBZCBvbkxvYWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuaYvuekuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiue7hOS7tuWHuueOsOmXrumimFwiLCB0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pZkJhbm5lckxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5fYmFubmVyaWQgaXMgbnVsbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZV9iYW5uZXJfYWQocGFyYW06IEJBTk5FUl9BRF9UWVBFKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lmQmFubmVyTG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFkLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9hcHBfbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh3aW5kb3cucWcgJiYgd2luZG93LnFnLmdldFN5c3RlbUluZm9TeW5jKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucWcuZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2hhbm5lbE1hbmFnZXIuVU5LTk9XTjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZV92aWRlb19hZCgpOiB2b2lkIHwgYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWaXZvLSBjcmVhdGVWaWRlb0FEIS4uLi5cIik7XHJcbiAgICAgICAgaWYgKCEocWcuZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybVZlcnNpb25Db2RlIDwgMTA2MykpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9BZCA9IHFnLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICBwb3NJZDogdGhpcy5fdmlkZW9pZFswXVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdmlkZW9BZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmv4DlirHop4bpopHliqDovb3miJDlip9cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5vbkVycm9yKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHFnLnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCLop4bpopHlub/lkYrliJ3lp4vljJblpLHotKXvvIzor7fph43mlrDlsJ3or5UhXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25DbG9zZSgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHQgJiYgdC5pc0VuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmv4DlirHop4bpopHlub/lkYrlrozmiJDvvIzlj5HmlL7lpZblirFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9DYi5hcHBseSh0aGlzLl92aWRlb0NiVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop4bpopHlub/lkYrop4LnnIvkuK3mlq1cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLnJlc3VtZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfdmlkZW9fYWQodmlkZW9DYjogKHJlc3VsdDogbnVtYmVyKSA9PiB2b2lkLCB2aWRlb0NiVGFyZ2V0OiBDaGFubmVsTWFuYWdlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pi+56S66KeG6aKR5bm/5ZGK77yB44CC44CC44CCXCIpO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvQ2IgPSB2aWRlb0NiO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvQ2JUYXJnZXQgPSB2aWRlb0NiVGFyZ2V0O1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3ZpZGVvQWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVfdmlkZW9fYWQoKTtcclxuICAgICAgICAgICAgcWcuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi6KeG6aKR5bm/5ZGK5Yid5aeL5YyW5aSx6LSl77yM6K+36YeN5paw5bCd6K+VIVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuinhumikeW5v+WRiuS4jeWtmOWcqO+8geOAguOAguOAglwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmlkZW9BZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6KeG6aKR5bm/5ZGK5pi+56S65oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICBjYy5nYW1lLnBhdXNlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3N1cHBvcnRfaW50ZXJzdGl0aWFsX2FkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChxZy5jcmVhdGVJbnRlcnN0aXRpYWxBZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzX3N1cHBvcnRfaW50ZXJzdGl0aWFsX2FkICBjcmVhdGVJbnRlcnN0aXRpYWxBZDogdHJ1ZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpc19zdXBwb3J0X2ludGVyc3RpdGlhbF9hZDogZmFsc2VcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVJbnRlcnN0aXRpYWxBZCgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZUludGVyc3RpdGlhbEFkXCIpO1xyXG4gICAgICAgIGlmIChcIlwiICE9IHRoaXMuX2ludGVyaWRbMF0pIHtcclxuICAgICAgICAgICAgaWYgKHFnLmNyZWF0ZUludGVyc3RpdGlhbEFkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxBZCA9IHFnLmNyZWF0ZUludGVyc3RpdGlhbEFkKHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NJZDogdGhpcy5faW50ZXJpZFswXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faW50ZXJzdGl0aWFsQWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsQWQub25FcnJvcigodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrplJnor6/vvJpcIiwgdClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuX2ludGVyaWQgaXMgbnVsbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfaW50ZXJzdGl0aWFsX2FkKHQ/OiBhbnksIGU/OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNob3dJbnRlcnN0aXRpYWxBZCFcIik7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IChuZXcgRGF0ZSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGlmICghKHRpbWUgLSB0aGlzLmludGVyQWRMb2FkVGltZSA8IDE1MDAwKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVyc3RpdGlhbEFkID0gcWcuY3JlYXRlSW50ZXJzdGl0aWFsQWQoe1xyXG4gICAgICAgICAgICAgICAgcG9zSWQ6IHRoaXMuX2ludGVyaWRbMF1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxBZC5vbkVycm9yKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaPkuWxj+W5v+WRiuWKoOi9veWksei0pe+8gVwiKVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrlsZXnpLrmiJDlip/vvIFcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJBZExvYWRUaW1lID0gKG5ldyBEYXRlKS5nZXRUaW1lKClcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5LlsY/lub/lkYrlsZXnpLrlpLHotKXvvJpcIiwgdClcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3N1cHBvcnRfbW9yZV9nYW1lKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3NoYXJlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3ZpZGVvX3NoYXJlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3JhbmsoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2hhbm5lbE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJ2aXZvXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpZkNyZWF0ZVNob3J0Y3V0KGNhbGw6IChpczogYm9vbGVhbikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHFnLmhhc1Nob3J0Y3V0SW5zdGFsbGVkKHtcclxuICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicWcuaGFzU2hvcnRjdXRJbnN0YWxsZWQ6JXNcIiwgdCk7XHJcbiAgICAgICAgICAgICAgICBjYWxsKHQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxsKHRydWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4geyB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVNob3J0Y3V0KGNhbGw6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBxZy5oYXNTaG9ydGN1dEluc3RhbGxlZCh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoMCA9PSB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcWcuaW5zdGFsbFNob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKCkgPT4geyB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4geyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVOYXRpdmVBZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoISgobmV3IERhdGUpLmdldFRpbWUoKSAtIHRoaXMubmF0aXZlTG9hZFRpbWUgPCAxNTAwMCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWRTdGF0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChcIlwiICE9IHRoaXMuX25hdGl2ZWlkWzBdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUFkID0gcWcuY3JlYXRlTmF0aXZlQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc0lkOiB0aGlzLl9uYXRpdmVpZFswXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVBZC5vbkxvYWQoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9veWOn+eUn+W5v+WRiuaIkOWKn1wiLCBcIu+8mlwiICsgSlNPTi5zdHJpbmdpZnkodCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0LmFkTGlzdCAmJiAwIDwgdC5hZExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG1wQWREYXRhID0gdC5hZExpc3QucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlSnBnTG9hZFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQodGhpcy50bXBBZERhdGEuaW1nVXJsTGlzdFswXSwgKHQsIGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlSnBnTG9hZFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkSW1hZyBpcyBsb2FkaW5nIGVycjolcyFcIiwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUpwZ0xvYWRTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90bXBOYXRpdmVKcGcgPSBuZXcgY2MuU3ByaXRlRnJhbWUoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkSW1hZyBpcyBsb2FkaW5nIG9rIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50bXBBZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuYWREYXRhID0gdGhpcy50bXBBZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWRTdGF0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUxvYWRUaW1lID0gKG5ldyBEYXRlKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOYXRpdmVBZCBuYXRpdmVsb2FkIHRpbWU6JXMsbmF0aXZlQWRTdGF0OiVzXCIsIHRoaXMubmF0aXZlTG9hZFRpbWUsIHRoaXMuX25hdGl2ZUFkU3RhdCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLm9uRXJyb3IoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUFkU3RhdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLmxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5hdGl2ZUFkU3RhdCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVKcGdMb2FkU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93QWQoYWRMYXlvdXQ6IElBZExheW91dCwgbnVtOiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWaXZvTWluaUdhbWUgbmF0aXZlQWQgc2hvd0FkIVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRtcEFkRGF0YSkpO1xyXG4gICAgICAgIGlmICh0aGlzLnRtcEFkRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkRGF0YSA9IHRoaXMudG1wQWREYXRhO1xyXG4gICAgICAgICAgICBpZiAoMCA9PSBudW0pIHtcclxuICAgICAgICAgICAgICAgICh0aGlzLmFkTGF5b3V0ID0gYWRMYXlvdXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb250YWluTGF5b3V0ID0gdGhpcy5hZExheW91dC5nZXRDaGlsZEJ5TmFtZShcImNvbnRhaW5MYXlvdXRcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkSW1nID0gY29udGFpbkxheW91dC5nZXRDaGlsZEJ5TmFtZShcImFkSW1nXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBhZERlc2MgPSBjb250YWluTGF5b3V0LmdldENoaWxkQnlOYW1lKFwiYWREZXNjXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBhZExvZ28gPSBjb250YWluTGF5b3V0LmdldENoaWxkQnlOYW1lKFwiYWRMb2dvXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBhZENsb3NlID0gY29udGFpbkxheW91dC5nZXRDaGlsZEJ5TmFtZShcImFkQ2xvc2VcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3Rpb25MYXlvdXQgPSB0aGlzLmFkTGF5b3V0LmdldENoaWxkQnlOYW1lKFwiYWN0aW9uTGF5b3V0XCIpO1xyXG4gICAgICAgICAgICBhY3Rpb25MYXlvdXQuZ2V0Q2hpbGRCeU5hbWUoXCJhZEFjdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFkVGl0bGUgPSBhY3Rpb25MYXlvdXQuZ2V0Q2hpbGRCeU5hbWUoXCJhZFRpdGxlXCIpO1xyXG4gICAgICAgICAgICBhZEltZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBhZEltZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuX3RtcE5hdGl2ZUpwZztcclxuICAgICAgICAgICAgYWRMb2dvLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYWREYXRhLmxvZ29VcmwpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHRoaXMuYWREYXRhLmxvZ29VcmwsICh0LCBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRMb2dvLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRMb2dvLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkVGl0bGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGFkVGl0bGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmFkRGF0YS50aXRsZTtcclxuICAgICAgICAgICAgYWREZXNjLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhZERlc2MuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmFkRGF0YS5kZXNjO1xyXG4gICAgICAgICAgICBhZENsb3NlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBhZENsb3NlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkTGF5b3V0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaWYgKCFhZEltZy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKSkge1xyXG4gICAgICAgICAgICAgICAgYWRJbWcuYWRkQ29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkSW1nLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVBZENsaWNrKClcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLnJlcG9ydEFkU2hvdyh7XHJcbiAgICAgICAgICAgICAgICBhZElkOiB0aGlzLmFkRGF0YS5hZElkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYXRpdmVBZC5yZXBvcnRBZFNob3cgYWRJZDogJXNcIiwgdGhpcy5hZERhdGEuYWRJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRMYXlvdXQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQWRTdGF0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF0aXZlQWRDbGljaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xyXG4gICAgICAgICAgICBhZElkOiB0aGlzLmFkRGF0YS5hZElkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuYXRpdmVBZCByZXBvcnRBZENsaWNrIGFkSWQ6ICVzXCIsIHRoaXMuYWREYXRhLmFkSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlQWQub2ZmTG9hZCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLm9mZkVycm9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlQWQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5hdGl2ZUFkTG9hZCgpOiB2b2lkIHsgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTmF0aXZlSWNvQWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVOYXRpdmVJQ09BZDolU1wiLCB0aGlzLl9uYXRpdmVpZFsxXSksIHRoaXMuX25hdGl2ZUljb0FkU3RhdCA9ICExO1xyXG5cclxuICAgICAgICBpZiAoXCJcIiAhPSB0aGlzLl9uYXRpdmVpZFsxXSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUljb0FkID0gcWcuY3JlYXRlTmF0aXZlQWQoe1xyXG4gICAgICAgICAgICAgICAgcG9zSWQ6IHRoaXMuX25hdGl2ZWlkWzFdXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVJY29BZC5vbkxvYWQoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295Y6f55Sf5bm/5ZGKSUNP5oiQ5YqfXCIsIFwi77yaXCIgKyBKU09OLnN0cmluZ2lmeSh0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodC5hZExpc3QgJiYgMCA8IHQuYWRMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG1wSWNvQWREYXRhID0gdC5hZExpc3QucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29OYXRpdmVKcGdMb2FkU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHRoaXMudG1wSWNvQWREYXRhLmltZ1VybExpc3RbMF0sICh0LCBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29OYXRpdmVKcGdMb2FkU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZEltYWcgaXMgbG9hZGluZyBlcnI6JXMhXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvTmF0aXZlSnBnTG9hZFN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG1wSWNvTmF0aXZlSnBnID0gbmV3IGNjLlNwcml0ZUZyYW1lKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkSW1hZyBpcyBsb2FkaW5nIG9rIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50bXBJY29BZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb0FkRGF0YSA9IHRoaXMudG1wSWNvQWREYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUljb0FkU3RhdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUxvYWRUaW1lID0gKG5ldyBEYXRlKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5hdGl2ZUljb0FkIG5hdGl2ZWxvYWQgdGltZTolcyxuYXRpdmVJY29BZFN0YXQ6JXNcIiwgdGhpcy5uYXRpdmVMb2FkVGltZSwgdGhpcy5fbmF0aXZlSWNvQWRTdGF0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUljb0FkLm9uRXJyb3IoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K6+572u5Y6f55Sf5bm/5ZGK5Ye66ZSZ77yaXCIgKyBKU09OLnN0cmluZ2lmeSh0KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVJY29BZFN0YXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUljb0FkLmxvYWQoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVQcm9jZXNzKCk7XHJcbiAgICAgICAgICAgIH0sIDE1MDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYXRpdmVJY29BZFN0YXQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvTmF0aXZlSnBnTG9hZFN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0ljb0FkKGljb0FkTGF5b3V0OiBJQWRMYXlvdXQsIG51bTogbnVtYmVyID0gMCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVml2b01pbmlHYW1lIHNob3dJY29BZCFcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy50bXBJY29BZERhdGEpKTtcclxuICAgICAgICBpZiAodGhpcy50bXBJY29BZERhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5pY29BZERhdGEgPSB0aGlzLnRtcEljb0FkRGF0YTtcclxuICAgICAgICAgICAgaWYgKDAgPT0gbnVtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb0FkTGF5b3V0ID0gaWNvQWRMYXlvdXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5MYXlvdXQgPSB0aGlzLmljb0FkTGF5b3V0LmdldENoaWxkQnlOYW1lKFwiY29udGFpbkxheW91dFwiKTtcclxuICAgICAgICAgICAgY29uc3QgYWRJbWcgPSBjb250YWluTGF5b3V0LmdldENoaWxkQnlOYW1lKFwiYWRJbWdcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkRGVzYyA9IGNvbnRhaW5MYXlvdXQuZ2V0Q2hpbGRCeU5hbWUoXCJhZERlc2NcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkTG9nbyA9IGNvbnRhaW5MYXlvdXQuZ2V0Q2hpbGRCeU5hbWUoXCJhZExvZ29cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkQ2xvc2UgPSBjb250YWluTGF5b3V0LmdldENoaWxkQnlOYW1lKFwiYWRDbG9zZVwiKTtcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9uTGF5b3V0ID0gdGhpcy5pY29BZExheW91dC5nZXRDaGlsZEJ5TmFtZShcImFjdGlvbkxheW91dFwiKVxyXG4gICAgICAgICAgICBhY3Rpb25MYXlvdXQuZ2V0Q2hpbGRCeU5hbWUoXCJhZEFjdGlvblwiKTtcclxuICAgICAgICAgICAgY29uc3QgYWRUaXRsZSA9IGFjdGlvbkxheW91dC5nZXRDaGlsZEJ5TmFtZShcImFkVGl0bGVcIik7XHJcblxyXG4gICAgICAgICAgICBhZEltZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBhZEltZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuX3RtcEljb05hdGl2ZUpwZztcclxuICAgICAgICAgICAgYWRMb2dvLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pY29BZERhdGEubG9nb1VybCkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQodGhpcy5pY29BZERhdGEubG9nb1VybCwgKHQsIGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhZExvZ28uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhZExvZ28uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZFRpdGxlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhZFRpdGxlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5pY29BZERhdGEudGl0bGU7XHJcbiAgICAgICAgICAgIGFkRGVzYy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYWREZXNjLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5pY29BZERhdGEuZGVzYztcclxuICAgICAgICAgICAgYWRDbG9zZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFhZEltZy5nZXRDb21wb25lbnQoY2MuQnV0dG9uKSkge1xyXG4gICAgICAgICAgICAgICAgYWRJbWcuYWRkQ29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkSW1nLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVJY29BZENsaWNrKClcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUljb0FkLnJlcG9ydEFkU2hvdyh7XHJcbiAgICAgICAgICAgICAgICBhZElkOiB0aGlzLmljb0FkRGF0YS5hZElkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYXRpdmVJY29BZCByZXBvcnRBZFNob3cgYWRJZDolc1wiLCB0aGlzLmljb0FkRGF0YS5hZElkKTtcclxuICAgICAgICAgICAgdGhpcy5pY29BZExheW91dC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVJY29BZFN0YXQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYXRpdmVJY29BZENsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmF0aXZlSWNvQWQgSWQ6JXPvvIxuYXRpdmVJY29BZCBMb2FkIFN0YXQ6JXMsdGltZTolc1wiLCB0aGlzLmljb0FkRGF0YS5hZElkLCB0aGlzLl9uYXRpdmVJY29BZFN0YXQsIChuZXcgRGF0ZSkuZ2V0VGltZSgpKTtcclxuICAgICAgICB0aGlzLm5hdGl2ZUljb0FkLnJlcG9ydEFkQ2xpY2soe1xyXG4gICAgICAgICAgICBhZElkOiB0aGlzLmljb0FkRGF0YS5hZElkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBDb21tb24udWkuZGVzdHJveU5hdGl2ZUludGVyQWQoKVxyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXROYXRpdmVJY29TaG93U3RhdCgpOiB2b2lkIHsgfVxyXG4gICAgcHJpdmF0ZSBvbkljb0Rlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlSWNvQWQpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVJY29BZC5vZmZMb2FkKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlSWNvQWQub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVJY29BZC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF0aXZlSWNvQWRMb2FkKCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROYXRpdmVEYXRhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWREYXRhLnRpdGxlIHx8IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROYXRpdmVJY29EYXRhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWREYXRhLnRpdGxlID8gdGhpcy5pY29BZERhdGEudGl0bGUgOiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd01vcmVHYW1lKCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROYXRpdmVEZXNjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWREYXRhLmRlc2M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROYXRpdmVJY29EZXNjKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvQWREYXRhLmRlc2M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dCYW5uZXJOYXRpdmUobm9kZTogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghKChuZXcgRGF0ZSkuZ2V0VGltZSgpIC0gdGhpcy5nYW1lQmVnaW5UaW1lIDwgNmU0IHx8ICF0aGlzLnRtcEljb0FkRGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJOYXRpdmVEYXRhID0gdGhpcy50bXBJY29BZERhdGE7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhZEltZyA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZEltZ1wiKTtcclxuICAgICAgICAgICAgY29uc3QgYWREZXNjID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImFkRGVzY1wiKTtcclxuICAgICAgICAgICAgY29uc3QgYWRUaXRsZSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZFRpdGxlXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBhZEJ1dHRvbiA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZEJ1dHRvblwiKTtcclxuICAgICAgICAgICAgYWRJbWcuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5iYW5uZXJOYXRpdmVEYXRhLmljb24pIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHRoaXMuYmFubmVyTmF0aXZlRGF0YS5pY29uLCAoZXJyLCB0ZXh0dXJlOiBzdHJpbmcgfCBjYy5UZXh0dXJlMkQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhZEltZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkSW1nLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkVGl0bGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgYWRUaXRsZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuYmFubmVyTmF0aXZlRGF0YS50aXRsZTtcclxuICAgICAgICAgICAgYWREZXNjLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGFkRGVzYy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuYmFubmVyTmF0aXZlRGF0YS5kZXNjO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaWNvQWREYXRhLmxvZ29VcmwpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHRoaXMuaWNvQWREYXRhLmxvZ29VcmwsICh0LCBlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhZEJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKSkge1xyXG4gICAgICAgICAgICAgICAgYWRCdXR0b24uYWRkQ29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWRCdXR0b24ub24oXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lck5hdGl2ZUFkQ2xpY2soKTtcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUljb0FkLnJlcG9ydEFkU2hvdyh7XHJcbiAgICAgICAgICAgICAgICBhZElkOiB0aGlzLmJhbm5lck5hdGl2ZURhdGEuYWRJZFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmF0aXZlSWNvQWQgIHJlcG9ydEljb0FkU2hvdyBhZElkOiVzXCIsIHRoaXMuYmFubmVyTmF0aXZlRGF0YS5hZElkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiYW5uZXJOYXRpdmVBZENsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmF0aXZlSWNvQWQucmVwb3J0QWRDbGljayh7XHJcbiAgICAgICAgICAgIGFkSWQ6IHRoaXMuYmFubmVyTmF0aXZlRGF0YS5hZElkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJiYW5uZXJOYXRpdmVBZENsaWNrIHJlcG9ydEljb0FkQ2xpY2sgIGFkSWQ6JXNcIiwgdGhpcy5iYW5uZXJOYXRpdmVEYXRhLmFkSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGltZVByb2Nlc3MoKTogdm9pZCB7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoMCA9PSB0aGlzLm5hdGl2ZUljb01hcCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9uYXRpdmVBZFN0YXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlSWNvTWFwID0gMTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGltZVByb2Nlc3MgbmF0aXZlQWRMb2FkIHRpbWU6JXMsX25hdGl2ZUFkU3RhdDolc1wiLCAobmV3IERhdGUpLmdldFRpbWUoKSwgdGhpcy5fbmF0aXZlQWRTdGF0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbmF0aXZlSWNvQWRTdGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVJY29BZC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUljb01hcCA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRpbWVQcm9jZXNzIG5hdGl2ZUljb0FkTG9hZCB0aW1lOiVzLF9uYXRpdmVJY29BZFN0YXQ6JXNcIiwgKG5ldyBEYXRlKS5nZXRUaW1lKCksIHRoaXMuX25hdGl2ZUljb0FkU3RhdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxNTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpYnJhdGVfc2hvcnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHFnLnZpYnJhdGVTaG9ydCkge1xyXG4gICAgICAgICAgICBxZy52aWJyYXRlU2hvcnQoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiICsgdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlicmF0ZVNob3J06LCD55So5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpYnJhdGVfbG9uZygpOiB2b2lkIHtcclxuICAgICAgICBpZiAocWcudmlicmF0ZUxvbmcpIHtcclxuICAgICAgICAgICAgcWcudmlicmF0ZUxvbmcoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiICsgdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlicmF0ZUxvbmfosIPnlKjlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0JpZ0pwZ05hdGl2ZShub2RlOiBjYy5Ob2RlKTogdm9pZCB7IH1cclxuICAgIHB1YmxpYyBzaG93SWNvTmF0aXZlKG5vZGU6IGNjLk5vZGUpOiB2b2lkIHsgfVxyXG59Il19