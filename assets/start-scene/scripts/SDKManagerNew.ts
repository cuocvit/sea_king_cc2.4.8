
class SDKManagerNew {
    private static _instance: SDKManagerNew | null = null;
    private static _callback_map: Record<string, Function> = {};
    private static java_class_name = "org/cocos2dx/javascript/SDKManagerNew";

    private _is_load_reward_video_ad_success = false;
    private isInitSuccess = false;
    private _rewardVideoAdRewardCallback?: () => void;

    public static instance(): SDKManagerNew {
        if (null == this._instance) {
            this._instance = new SDKManagerNew;
        }
        return this._instance
    }


    constructor() {

    }

    private call_native_static_method(returnType: string, methodName: string, call1?: () => void, clall2?: () => void): any {
        const args = []
        for (let index = 2; index < arguments.length; index++) {
            args[index - 2] = arguments[index];
        }
        const nativeParams: string[] = [];
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            let methodSignature = "(";
            const callbackArgs: string[] = [];

            for (let s = 0; s < args.length; s++) {
                const argType = typeof args[s];
                if ("function" == argType) {
                    const arg = args[s];
                    if ("" != arg.name) {
                        if (!SDKManagerNew._callback_map[arg.name]) {
                            (SDKManagerNew._callback_map[arg.name] = args[s]);
                        }
                        callbackArgs.push("callback@" + arg.name);
                    } else {
                        cc.error("函数名不能为空");
                    }
                } else {
                    callbackArgs.push(args[s]);
                }
                methodSignature += this.type_to_platform_flag(argType);
                methodSignature += ")" + this.type_to_platform_flag(returnType);
            }

            nativeParams.push(SDKManagerNew.java_class_name);
            nativeParams.push(methodName);
            nativeParams.push(methodSignature);
            nativeParams.concat(args);

        } else {
            if (cc.sys.os != cc.sys.OS_IOS) {
                console.error("不支持的平台");
                return;
            }
            nativeParams.push(SDKManagerNew.java_class_name);
            let iosMethodSignature = SDKManagerNew.java_class_name;
            for (let s = 0; s < args.length; s++) {
                nativeParams.push(args[s]);
                iosMethodSignature += 0 == s ? ":" : "arg" + s + ":";
            }
            nativeParams.push(iosMethodSignature);
            nativeParams.concat(args)
        }

        console.log("js call native " + JSON.stringify(nativeParams));
        return jsb.reflection.callStaticMethod.apply(jsb.reflection, nativeParams)
    }

    private type_to_platform_flag(type: string): string {
        if ("boolean" == type) {
            return "Z";
        } else if ("string" == type) {
            return "Ljava/lang/String;";
        } else if ("number" == type) {
            return "I";
        } else if ("void" == type) {
            return "V";
        } else if ("function" == type) {
            return "Ljava/lang/String;";
        } else {
            console.error("不支持的参数类型");
            return "";
        }
    }

    private native_call_js(jsonString: string): void {
        console.log("native call js " + jsonString);
        const callbackData = JSON.parse(jsonString);
        const method = this[callbackData.method_name];
        if (method) {
            method.apply(this, callbackData.params);
        } else {
            cc.error("SDKManagerNew中没有找到回调函数");
        }
    }

    private init() { }

    private on_init_callback() { }

    private load_reward_video_ad(): void {
        this.call_native_static_method(
            "void",
            "loadRewardVideoAd",
            this.on_load_reward_video_ad_success_callback,
            this.on_load_reward_video_ad_fail_callback
        );
    }

    private on_load_reward_video_ad_success_callback(): void {
        this._is_load_reward_video_ad_success = true;
    }

    private on_load_reward_video_ad_fail_callback(): void {
        this._is_load_reward_video_ad_success = false;
    }

    private show_reward_video_ad(): void {
        if (this._is_load_reward_video_ad_success) {
            this.call_native_static_method(
                "void",
                "showRewardVideoAd",
                this.on_reward_video_ad_complete_callback,
                this.on_reward_video_ad_cancel_callback
            );
        }
    }

    private on_reward_video_ad_complete_callback() { }
    private on_reward_video_ad_cancel_callback() { }
    private show_banner_ad() { }
    private hide_banner_ad() { }

    private showRewardVideoAd(call: () => void): void {
        this.call_native_static_method(
            "string",
            "method_name",
            this.onRewardVideoAdRewardCallback
        );
        console.log("SDKManagerNew:showRewardVideoAd");
        this._rewardVideoAdRewardCallback = call;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showRewardVideoAd", "()V");
        }
    }

    private isRewardVideoAdLoaded(): void {
        console.log("SDKManagerNew:isRewardVideoAdLoaded");
        if (!!window.jsb) {
            return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isRewardVideoAdLoaded", "()Z");
        }
    }

    private onRewardVideoAdRewardCallback(): void {
        console.log("SDKManagerNew:onRewardVideoAdRewardCallback");
        if (this._rewardVideoAdRewardCallback) {
            this._rewardVideoAdRewardCallback();
            console.log("SDKManagerNew:_rewardVideoAdRewardCallback");
        }
    }

    private showBannerAd(): void {
        console.log("SDKManagerNew:showBannerAd");
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showBannerAd", "()V");
        }
    }

    private hideBannerAd(): void {
        console.log("SDKManagerNew:hideBannerAd");
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hideBannerAd", "()V");
        }
    }


    private getLanguage(): string | any {
        console.log("SDKManagerNew:getLanguage");
        if (window.jsb) {
            return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getLanguage", "()Ljava/lang/String;");
        } else {
            return "zh-CN";
        }
    }

    private getAppName(): string | any {
        console.log("SDKManagerNew:getAppName");
        if (window.jsb) {
            return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getAppName", "()Ljava/lang/String;");
        } else {
            return "unknown";
        }
    }

    private getVersionName(): string | any {
        console.log("SDKManagerNew:getVersionName");
        if (window.jsb) {
            return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getVersionName", "()Ljava/lang/String;");
        } else {
            return "unknown";
        }
    }
}

export { SDKManagerNew };
(window as any).SDKManagerNew = SDKManagerNew.instance;