import { position } from "./ChannelManager";
// @
enum LGGlobalLoginCallback {
    Login = 1,
    AccountBind = 2,
    SwitchAccount = 3
}

// @
class SDKManager {
    private static _instance: SDKManager | null = null;
    private _isInitSuccess: boolean = false;
    // private _lastCallShowRewardVideoAdTimestamp: number = 0;
    private _rewardVideoAdLoadCallback?: () => void;
    private _rewardVideoAdRewardCallback?: () => void;
    private _interstitialAdCloseCallback?: () => void;
    private _loginSuccessCallback?: (data: any) => void;

    private constructor() {}

    public static get instance(): SDKManager {
        if (this._instance === null) {
            this._instance = new SDKManager();
        }
        return this._instance;
    }

    // @
    public getChannelName(): string {
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getChannelName", "()Ljava/lang/String;") 
            : "";
    }

    // @
    public getHostAppName(): string {
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getHostAppName", "()Ljava/lang/String;") 
            : "";
    }

    // @
    public onInitCompleteCallback(): void {
        console.log("SDKManager:onInitCompleteCallback");
        this._isInitSuccess = true;
    }

    // @
    public getDeviceID(): string {
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getDeviceID", "()Ljava/lang/String;") 
            : "";
    }

    // @
    public loadRewardVideoAd(callback: () => void): void {
        console.log("SDKManager:showRewardVideoAd");
        this._rewardVideoAdLoadCallback = callback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "loadRewardVideoAd", "()V");
        }
    }

    // @
    public onLoadRewardVideoAdCallback(): void {
        console.log("SDKManager:onLoadRewardVideoAdCallback");
        if (this._rewardVideoAdLoadCallback) {
            this._rewardVideoAdLoadCallback();
            console.log("SDKManager:_rewardVideoAdLoadCallback");
        }
    }

    // @
    public isRewardVideoAdLoaded(): boolean {
        console.log("SDKManager:isRewardVideoAdLoaded");
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isRewardVideoAdLoaded", "()Z") 
            : false;
    }

    // @
    public showRewardVideoAd(rewardCallback: () => void, data: position): void {
        console.log("SDKManager:showRewardVideoAd");
        this._rewardVideoAdRewardCallback = rewardCallback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showRewardVideoAd", "(Ljava/lang/String;)V", JSON.stringify(data));
        }
    }

    // @
    public onRewardVideoAdRewardCallback(): void {
        console.log("SDKManager:onRewardVideoAdRewardCallback");
        if (this._rewardVideoAdRewardCallback) {
            this._rewardVideoAdRewardCallback();
            console.log("SDKManager:_rewardVideoAdRewardCallback");
        }
    }

    // @
    public reportEvent(eventName: string, data: any): void {
        console.log("SDKManager:reportEvent");
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "reportEvent", "(Ljava/lang/String;Ljava/lang/String;)V", eventName, JSON.stringify(data));
        }
    }

    // @
    public showInterstitialAd(callback: () => void): void {
        console.log("SDKManager:showInterstitialAd");
        this._interstitialAdCloseCallback = callback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showInterstitialAd", "()V");
        }
    }

    // @
    public isInterstitialAdLoaded(): boolean {
        console.log("SDKManager:isInterstitialAdLoaded");
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isInterstitialAdLoaded", "()Z") 
            : false;
    }

    // @
    public onInterstitialAdCloseCallback(): void {
        console.log("SDKManager:onInterstitialAdCloseCallback");
        if (this._interstitialAdCloseCallback) {
            this._interstitialAdCloseCallback();
            console.log("SDKManager:_interstitialAdCloseCallback");
        }
    }

    // @
    public showBannerAd(): void {
        console.log("SDKManager:showBannerAd");
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showBannerAd", "()V");
        }
    }

    // @
    public hideBannerAd(): void {
        console.log("SDKManager:hideBannerAd");
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hideBannerAd", "()V");
        }
    }

    // @
    public getLanguage(): string {
        console.log("SDKManager:getLanguage");
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getLanguage", "()Ljava/lang/String;") 
            : "zh-CN";
    }

    // @
    public getAppName(): string {
        console.log("SDKManager:getAppName");
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getAppName", "()Ljava/lang/String;") 
            : "unknown";
    }

    // @
    public getVersionName(): string {
        console.log("SDKManager:getVersionName");
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getVersionName", "()Ljava/lang/String;") 
            : "unknown";
    }

    // @
    public getVersionCode(): number {
        console.log("SDKManager:getVersionCode");
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getVersionCode", "()I") 
            : 1;
    }

    // @
    public copyToClipboard(text: string): void {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyToClipboard", "(Ljava/lang/String;)V", text);
        }
    }

    // @
    public getNetworkStateName(): string {
        console.log("SDKManager:getNetworkStateName");
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkStateName", "()Ljava/lang/String;") 
            : "unknown";
    }

    // @
    public login(successCallback: (data: any) => void, data: any): void {
        console.log("SDKManager:login");
        this._loginSuccessCallback = successCallback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "login", "(Ljava/lang/String;)V", JSON.stringify(data));
        }
    }

    // @
    public switchAccount(successCallback: (data: any) => void, data: any): void {
        console.log("SDKManager:switchAccount");
        this._loginSuccessCallback = successCallback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "switchAccount", "(Ljava/lang/String;)V", JSON.stringify(data));
        }
    }

    // @
    public visitorBindAccount(successCallback: (data: any) => void, data: any): void {
        console.log("SDKManager:visitorBindAccount");
        this._loginSuccessCallback = successCallback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "visitorBindAccount", "(Ljava/lang/String;)V", JSON.stringify(data));
        }
    }

    // @
    public isVisitor(): boolean {
        console.log("SDKManager:isVisitor");
        return window.jsb 
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isVisitor", "()Z") 
            : false;
    }

    // @
    public onLoginSuccessCallback(jsonStr: string): void {
        console.log("SDKManager:onLoginSuccessCallback jsonStr:" + jsonStr);
        try {
            const data = JSON.parse(jsonStr);
            if (
                data.apiLoginType === LGGlobalLoginCallback.Login || 
                data.apiLoginType === LGGlobalLoginCallback.AccountBind || 
                data.apiLoginType === LGGlobalLoginCallback.SwitchAccount
            ) {
                this._loginSuccessCallback && this._loginSuccessCallback(data);
            }
        } catch (error) {
            console.error("解析onLoginSuccessCallback回调数据失败");
            console.error(error);
        }
    }

    // @
    public onLoginFailCallback(jsonStr: string): void {
        console.log("SDKManager:onLoginFailCallback jsonStr:" + jsonStr);
        try {
            const data = JSON.parse(jsonStr);
            if (
                data.apiLoginType === LGGlobalLoginCallback.Login || 
                data.apiLoginType === LGGlobalLoginCallback.AccountBind
            ) {
                // Handle login failure
            }
        } catch (error) {
            console.error("解析onLoginFailCallback回调数据失败");
            console.error(error);
        }
    }
}

// Export the SDKManager and LGGlobalLoginCallback
export { SDKManager, LGGlobalLoginCallback };
(window as any).SDKManager = SDKManager.instance;
