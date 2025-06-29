

export class BrowserUtils {
    private static is_int(t): boolean {
        return /^-{0,1}\d+$/.test(t + "");
    }

    private static is_boolean(t: string): boolean {
        return "true" === t || "false" === t;
    }


    public static get_url_param_value(paramName: string, type: boolean | number): string | number | boolean {
        const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
        const result = window.location.search.substr(1).match(reg);
        if (result && "" != result[2]) {
            const param = result[2];

            if ("string" == typeof type) {
                return param;

            } else if ("number" == typeof type) {
                return (this.is_int(type) ? parseInt : parseFloat)(param);

            } else if ("boolean" == typeof type) {
                return this.is_boolean(param) ? "true" == param : type;

            } else {
                console.log("不支持的URL参数类型 " + typeof type);
                return param;
            }

        } else {
            return type;
        }
    }

    private static get_url_param_obj(): Record<string, string> {
        return window.location.search.substr(1).split("&").reduce((accumulator, current) => {
            const e = current.split("=");
            accumulator[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
            return accumulator;
        }, {} as Record<string, string>)
    }
}