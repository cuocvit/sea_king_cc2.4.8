
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/DWMiniGame .js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '87bd60/lxpF9atlDBoOpKO8', 'DWMiniGame ');
// start-scene/scripts/DWMiniGame .ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DWMiniGame = void 0;
var GameManager_1 = require("./GameManager");
var ChannelManager_1 = require("./ChannelManager");
var DWMiniGame = /** @class */ (function () {
    function DWMiniGame() {
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
    Object.defineProperty(DWMiniGame, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new DWMiniGame;
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    DWMiniGame.prototype.load_channel_env = function (call) {
        window.wx.onHide(function () { });
        window.wx.onShow(function () { });
        console.log("wx_DS" + JSON.stringify(window.wx));
        window.wx.login({});
        call();
        return true;
    };
    DWMiniGame.prototype.load_sub_packages_env = function (call) {
        call();
        return true;
    };
    DWMiniGame.prototype.analyzeUrlPram = function () {
        return true;
    };
    DWMiniGame.prototype.get_app_name = function () {
        return ChannelManager_1.ChannelManager.APP_DW;
    };
    Object.defineProperty(DWMiniGame.prototype, "is_share", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DWMiniGame.prototype, "is_video_share", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DWMiniGame.prototype, "is_support_more_game", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    DWMiniGame.prototype.loginReport = function () { };
    ;
    DWMiniGame.prototype.create_banner_ad = function () {
        var _this = this;
        if (window.wx) {
            var SystemInfo = window.wx.getSystemInfoSync();
            var windowWidth_1 = SystemInfo.windowWidth;
            var windowHeight_1 = SystemInfo.windowHeight;
            var _loop_1 = function (index) {
                var bannerAd = wx.createBannerAd({
                    adUnitId: this_1._banner_ad_id_array[index],
                    adIntervals: 40,
                    style: {
                        width: this_1._targetBannerAdWidth,
                        top: windowHeight_1 - this_1._targetBannerAdWidth / 16 * 9,
                        left: (windowWidth_1 - this_1._targetBannerAdWidth) / 2
                    }
                });
                this_1._banner_ad_array.push(bannerAd);
                bannerAd.onLoad(function () {
                    console.log("banner ad id:" + _this._banner_ad_id_array[index] + " onLoad"),
                        _this._banner_ad_loaded_array[index] = !0;
                });
                bannerAd.onResize(function (t) {
                    bannerAd.style.top = windowHeight_1 - t.height,
                        bannerAd.style.left = (windowWidth_1 - t.width) / 2;
                });
                bannerAd.onError(function (t) {
                    console.log(t);
                });
            };
            var this_1 = this;
            for (var index = 0; index < this._banner_ad_id_array.length; index++) {
                _loop_1(index);
            }
        }
    };
    DWMiniGame.prototype.show_banner_ad = function (param) {
        var _this = this;
        if (this._banner_ad_loaded_array[param]) {
            this._banner_ad_flag_array[param] = true;
            var banner_1 = this._banner_ad_array[param];
            banner_1.show().then(function () {
                if (_this._banner_ad_flag_array[param]) {
                    console.log("广告显示成功");
                }
                else {
                    banner_1.hide();
                    console.log("广告显示慢了，不需要显示了");
                }
            }).catch(function (t) {
                console.log("广告组件出现问题", t);
            });
        }
    };
    DWMiniGame.prototype.hide_banner_ad = function (param) {
        if (this._banner_ad_loaded_array[param]) {
            var banner = this._banner_ad_array[param];
            if (banner) {
                banner.hide();
                this._banner_ad_flag_array[param] = false;
            }
        }
    };
    DWMiniGame.prototype.create_video_ad = function () {
        var _this = this;
        if (null != window.wx.createRewardedVideoAd) {
            this._videoAd = window.wx.createRewardedVideoAd({
                adUnitId: "adunit-868693f6bf325824"
            });
            this._videoAd.onClose(function (t) {
                if (t.isEnded) {
                    console.log("视频广告观看完成");
                    _this._videoCb.apply(_this._videoCbTarget);
                }
                else {
                    console.log("视频广告观看中断");
                    GameManager_1.gm.ui.show_notice("Quảng cáo video bị gián đoạn, không có phần thưởng");
                }
            });
            this._videoAd.onError(function (t) {
                console.log(t);
            });
            this._videoAd.onLoad(function () {
                console.log("激励视频 广告加载成功");
            });
        }
    };
    DWMiniGame.prototype.show_video_ad = function (call, chanel) {
        var _this = this;
        this._videoCb = call;
        this._videoCbTarget = chanel;
        if (this._videoAd) {
            this._videoAd.show().then(function () {
                console.log("视频广告显示成功");
            }).catch(function () {
                console.log("视频手动加载成功");
                _this._videoAd.show().then(function () {
                    console.log("重试，视频广告显示成功");
                }).catch(function (t) {
                    console.log("重试，视频广告组件出现问题", t);
                    if (1004 == t.errCode) {
                        GameManager_1.gm.ui.show_notice("Quảng cáo khuyến khích video hôm nay đã được sử dụng hết");
                    }
                    else {
                        GameManager_1.gm.ui.show_notice("Quảng cáo có thưởng bằng video không mở được");
                    }
                });
            });
        }
        else {
            GameManager_1.gm.ui.show_notice("Quảng cáo được thưởng bằng video chưa được khởi tạo");
        }
    };
    Object.defineProperty(DWMiniGame.prototype, "is_support_app_box", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    DWMiniGame.prototype.clear_cache = function () {
        if (window.wxDownloader) {
            window.wxDownloader.cleanAllAssets();
            console.log("delete cache success");
        }
    };
    DWMiniGame.prototype.vibrate_short = function () {
        if (wx.vibrateShort) {
            wx.vibrateShort({
                success: function (t) {
                    console.log("" + t);
                },
                fail: function () {
                    console.log("vibrateShort调用失败");
                }
            });
        }
    };
    DWMiniGame.prototype.vibrate_long = function () {
        if (wx.vibrateLong) {
            wx.vibrateLong({
                success: function (t) {
                    console.log("" + t);
                },
                fail: function () {
                    console.log("vibrateLong调用失败");
                }
            });
        }
    };
    Object.defineProperty(DWMiniGame.prototype, "is_support_interstitial_ad", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DWMiniGame.prototype, "is_rank", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    DWMiniGame._instance = null;
    return DWMiniGame;
}());
exports.DWMiniGame = DWMiniGame;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXERXTWluaUdhbWUgLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFtQztBQUNuQyxtREFBa0U7QUFTbEU7SUF3Qkk7UUFDSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDek4sSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNsQixLQUFLLEVBQUUsV0FBVztZQUNsQixHQUFHLEVBQUUsbUVBQW1FO1NBQzNFLENBQUM7UUFDRixJQUFJLENBQUMsaUJBQWlCLEdB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QUFyQztZQUNJLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0JBQU87YUFBbEI7WUFDSSxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDOzs7T0FBQTtJQXhQYyxvQkFBUyxHQUFlLElBQUksQ0FBQztJQXlQaEQsaUJBQUM7Q0ExUEQsQUEwUEMsSUFBQTtBQTFQWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdtIH0gZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ2hhbm5lbE1hbmFnZXIsIEJBTk5FUl9BRF9UWVBFIH0gZnJvbSBcIi4vQ2hhbm5lbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQmFubmVyQWQsIFZEQ2FsbGJhY2sgfSBmcm9tIFwiLi9XWE1pbmlHYW1lXCI7XHJcbmltcG9ydCB7IElBZCB9IGZyb20gXCIuL1ZJVk9NaW5pR2FtZVwiXHJcblxyXG5cclxuaW50ZXJmYWNlIFNoYXJlIHtcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICB1cmw6IHN0cmluZ1xyXG59XHJcbmV4cG9ydCBjbGFzcyBEV01pbmlHYW1lIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRFdNaW5pR2FtZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF90YXJnZXRCYW5uZXJBZFdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9iYW5uZXJfYWRfaWRfYXJyYXk6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBfYmFubmVyX2FkX2FycmF5IDpCYW5uZXJBZFtdO1xyXG4gICAgcHJpdmF0ZSBfYmFubmVyX2FkX2ZsYWdfYXJyYXk6IGJvb2xlYW5bXTtcclxuICAgIHByaXZhdGUgX2Jhbm5lcl9hZF9sb2FkZWRfYXJyYXk6IGJvb2xlYW5bXTtcclxuICAgIHByaXZhdGUgX3ZpZGVvQWQ6IElBZDtcclxuICAgIHByaXZhdGUgX3ZpZGVvQ2I6IFZEQ2FsbGJhY2s7XHJcbiAgICBwcml2YXRlIF92aWRlb0NiVGFyZ2V0OiBDaGFubmVsTWFuYWdlcjtcclxuICAgIHByaXZhdGUgX2ludGVyc3RpdGlhbF9hZDogYW55O1xyXG4gICAgcHJpdmF0ZSBfaW50ZXJzdGl0aWFsX2FkX2xvYWRlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2FwcF9ib3g6IGFueTtcclxuICAgIHByaXZhdGUgX2FwcF9ib3hfbG9hZGVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfc2hhcmVfYXJyYXk6IGFueTtcclxuICAgIHByaXZhdGUgX2RlZmF1bHRfc2hhcmU6IFNoYXJlXHJcbiAgICBwcml2YXRlIF9zaGFyZV9jb25maWdfdXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9yZWNvcmRfc3RhcnRfdGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcmVjb3JkX2VuZF90aW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9pc19zaGFyZV9yZWNvcmRfdmlkZW86IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9pc19yZXN0YXJ0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfaWZOZWVkVmlkZW9TaGFyZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3ZpZGVvUGF0aDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3RhcmdldEJhbm5lckFkV2lkdGggPSAzMDA7XHJcbiAgICAgICAgdGhpcy5fYmFubmVyX2FkX2lkX2FycmF5ID0gW1wiYWR1bml0LTFhMDc4OWFhM2QyNGMzMWNcIiwgXCJhZHVuaXQtNDg5M2VhMzE4ZWFmNDRmNVwiLCBcImFkdW5pdC1hZGExNmU4ZDVmNWEwMTM5XCIsIFwiYWR1bml0LTRjMzY5ZjdjN2UxY2I0YjdcIiwgXCJhZHVuaXQtMTE4NmU0ODdlZWNhZmQyNlwiLCBcImFkdW5pdC1hNTRlODdmZmYwZWFjYzczXCIsIFwiYWR1bml0LTk0MTQzMGUxMzg2MjkwODhcIl07XHJcbiAgICAgICAgdGhpcy5fYmFubmVyX2FkX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5fYmFubmVyX2FkX2ZsYWdfYXJyYXkgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xyXG4gICAgICAgIHRoaXMuX2Jhbm5lcl9hZF9sb2FkZWRfYXJyYXkgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvQWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvQ2IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvQ2JUYXJnZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbF9hZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsX2FkX2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2FwcF9ib3ggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2FwcF9ib3hfbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0X3NoYXJlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogXCLkuIDotbfkvZPpqozmtbfnjovlsLHmmK/miJFcIixcclxuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vY2RucmVzLnFzemhnLjZod2FuLmNvbS9taW5pZ2FtZS93aWZlX2Nkbi9yZXMvc2hhcmVJbWcuanBnXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3NoYXJlX2NvbmZpZ191cmwgPSBcImh0dHBzOi8vY2RucmVzLnFzemhnLjZod2FuLmNvbS9taW5pZ2FtZS93aWZlX2Nkbi9yZXMvc2hhcmUuanNvblwiO1xyXG4gICAgICAgIHRoaXMuX3JlY29yZF9zdGFydF90aW1lID0gMDtcclxuICAgICAgICB0aGlzLl9yZWNvcmRfZW5kX3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2lzX3NoYXJlX3JlY29yZF92aWRlbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzX3Jlc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pZk5lZWRWaWRlb1NoYXJlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmlkZW9QYXRoID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBEV01pbmlHYW1lIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IERXTWluaUdhbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZF9jaGFubmVsX2VudihjYWxsOiAoKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgd2luZG93Lnd4Lm9uSGlkZSgoKSA9PiB7IH0pO1xyXG4gICAgICAgIHdpbmRvdy53eC5vblNob3coKCkgPT4geyB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInd4X0RTXCIgKyBKU09OLnN0cmluZ2lmeSh3aW5kb3cud3gpKTtcclxuICAgICAgICB3aW5kb3cud3gubG9naW4oe30pO1xyXG4gICAgICAgIGNhbGwoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZF9zdWJfcGFja2FnZXNfZW52KGNhbGw6ICgpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBjYWxsKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhbmFseXplVXJsUHJhbSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X2FwcF9uYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENoYW5uZWxNYW5hZ2VyLkFQUF9EVztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3NoYXJlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3ZpZGVvX3NoYXJlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3N1cHBvcnRfbW9yZV9nYW1lKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZ2luUmVwb3J0KCkgeyB9O1xyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVfYmFubmVyX2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh3aW5kb3cud3gpIHtcclxuICAgICAgICAgICAgY29uc3QgU3lzdGVtSW5mbyA9IHdpbmRvdy53eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IFN5c3RlbUluZm8ud2luZG93V2lkdGg7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IFN5c3RlbUluZm8ud2luZG93SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX2Jhbm5lcl9hZF9pZF9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhbm5lckFkOiBCYW5uZXJBZCA9IHd4LmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5fYmFubmVyX2FkX2lkX2FycmF5W2luZGV4XSxcclxuICAgICAgICAgICAgICAgICAgICBhZEludGVydmFsczogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuX3RhcmdldEJhbm5lckFkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogd2luZG93SGVpZ2h0IC0gdGhpcy5fdGFyZ2V0QmFubmVyQWRXaWR0aCAvIDE2ICogOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogKHdpbmRvd1dpZHRoIC0gdGhpcy5fdGFyZ2V0QmFubmVyQWRXaWR0aCkgLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFubmVyX2FkX2FycmF5LnB1c2goYmFubmVyQWQpO1xyXG4gICAgICAgICAgICAgICAgYmFubmVyQWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbm5lciBhZCBpZDpcIiArIHRoaXMuX2Jhbm5lcl9hZF9pZF9hcnJheVtpbmRleF0gKyBcIiBvbkxvYWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lcl9hZF9sb2FkZWRfYXJyYXlbaW5kZXhdID0gITBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGJhbm5lckFkLm9uUmVzaXplKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFubmVyQWQuc3R5bGUudG9wID0gd2luZG93SGVpZ2h0IC0gdC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbm5lckFkLnN0eWxlLmxlZnQgPSAod2luZG93V2lkdGggLSB0LndpZHRoKSAvIDJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGJhbm5lckFkLm9uRXJyb3IoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfYmFubmVyX2FkKHBhcmFtPzogQkFOTkVSX0FEX1RZUEUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYmFubmVyX2FkX2xvYWRlZF9hcnJheVtwYXJhbV0pIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFubmVyX2FkX2ZsYWdfYXJyYXlbcGFyYW1dID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgYmFubmVyID0gdGhpcy5fYmFubmVyX2FkX2FycmF5W3BhcmFtXVxyXG5cclxuICAgICAgICAgICAgYmFubmVyLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iYW5uZXJfYWRfZmxhZ19hcnJheVtwYXJhbV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuaYvuekuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFubmVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuaYvuekuuaFouS6hu+8jOS4jemcgOimgeaYvuekuuS6hlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY2F0Y2goKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5ZGK57uE5Lu25Ye6546w6Zeu6aKYXCIsIHQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlX2Jhbm5lcl9hZChwYXJhbTogQkFOTkVSX0FEX1RZUEUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYmFubmVyX2FkX2xvYWRlZF9hcnJheVtwYXJhbV0pIHtcclxuICAgICAgICAgICAgY29uc3QgYmFubmVyID0gdGhpcy5fYmFubmVyX2FkX2FycmF5W3BhcmFtXTtcclxuICAgICAgICAgICAgaWYgKGJhbm5lcikge1xyXG4gICAgICAgICAgICAgICAgYmFubmVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhbm5lcl9hZF9mbGFnX2FycmF5W3BhcmFtXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVfdmlkZW9fYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gd2luZG93Lnd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCkge1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkID0gd2luZG93Lnd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogXCJhZHVuaXQtODY4NjkzZjZiZjMyNTgyNFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uQ2xvc2UoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0LmlzRW5kZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuinhumikeW5v+WRiuingueci+WujOaIkFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0NiLmFwcGx5KHRoaXMuX3ZpZGVvQ2JUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuinhumikeW5v+WRiuingueci+S4reaWrVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIlF14bqjbmcgY8OhbyB2aWRlbyBi4buLIGdpw6FuIMSRb+G6oW4sIGtow7RuZyBjw7MgcGjhuqduIHRoxrDhu59uZ1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLm9uRXJyb3IoKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHQpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmv4DlirHop4bpopEg5bm/5ZGK5Yqg6L295oiQ5YqfXCIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd192aWRlb19hZChjYWxsOiAocmVzdWx0OiBudW1iZXIpID0+IHZvaWQsIGNoYW5lbDogQ2hhbm5lbE1hbmFnZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl92aWRlb0NiID0gY2FsbDtcclxuICAgICAgICB0aGlzLl92aWRlb0NiVGFyZ2V0ID0gY2hhbmVsO1xyXG4gICAgICAgIGlmICh0aGlzLl92aWRlb0FkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop4bpopHlub/lkYrmmL7npLrmiJDlip9cIik7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6KeG6aKR5omL5Yqo5Yqg6L295oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9BZC5zaG93KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLph43or5XvvIzop4bpopHlub/lkYrmmL7npLrmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YeN6K+V77yM6KeG6aKR5bm/5ZGK57uE5Lu25Ye6546w6Zeu6aKYXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgxMDA0ID09IHQuZXJyQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIlF14bqjbmcgY8OhbyBraHV54bq/biBraMOtY2ggdmlkZW8gaMO0bSBuYXkgxJHDoyDEkcaw4bujYyBz4butIGThu6VuZyBo4bq/dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIlF14bqjbmcgY8OhbyBjw7MgdGjGsOG7n25nIGLhurFuZyB2aWRlbyBraMO0bmcgbeG7nyDEkcaw4bujY1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiUXXhuqNuZyBjw6FvIMSRxrDhu6NjIHRoxrDhu59uZyBi4bqxbmcgdmlkZW8gY2jGsGEgxJHGsOG7o2Mga2jhu59pIHThuqFvXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3N1cHBvcnRfYXBwX2JveCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyX2NhY2hlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh3aW5kb3cud3hEb3dubG9hZGVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy53eERvd25sb2FkZXIuY2xlYW5BbGxBc3NldHMoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWxldGUgY2FjaGUgc3VjY2Vzc1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpYnJhdGVfc2hvcnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHd4LnZpYnJhdGVTaG9ydCkge1xyXG4gICAgICAgICAgICB3eC52aWJyYXRlU2hvcnQoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiICsgdClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWJyYXRlU2hvcnTosIPnlKjlpLHotKVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aWJyYXRlX2xvbmcoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHd4LnZpYnJhdGVMb25nKSB7XHJcbiAgICAgICAgICAgIHd4LnZpYnJhdGVMb25nKHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJcIiArIHQpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlicmF0ZUxvbmfosIPnlKjlpLHotKVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNfc3VwcG9ydF9pbnRlcnN0aXRpYWxfYWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNfcmFuaygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=