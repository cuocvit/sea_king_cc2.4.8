//
// @
interface ISpriteData {
    sprite_uuid: string;
    newest_url: string;
};

// @
type PropsType = Record<string, "ascending" | "descending">;

// @
export class Utils {
    // @
    // private static drop_seed: number = 1574822809; // (not used)
    // private static seed: number = 1574822809;
    // private static readonly chinese_num_array: ReadonlyArray<string> = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万"];
    private static readonly sprite_data_map: Record<string, ISpriteData> = {};

    // @@ (not used)
    /* public static get_component_in_self_or_children<T  extends cc.Component>(node: cc.Node, component: { prototype: T }): T | null {
        return node.getComponent<T>(component) || node.getComponentInChildren<T>(component);
    } */

    // @@
    public static set_sprite_state(node: cc.Node, state: cc.Sprite.State, includeChildren: boolean = true): void {
        if (!node || !(node instanceof cc.Node)) return;
        const sprites: cc.Sprite[] = [];
        const spriteComponent: cc.Sprite = node.getComponent(cc.Sprite);
        if (spriteComponent) sprites.push(spriteComponent);
        if (includeChildren) {
            const spriteCompInChildren: cc.Sprite[] = node.getComponentsInChildren(cc.Sprite);
            if (spriteCompInChildren && spriteCompInChildren.length > 0) {
                sprites.push(...spriteCompInChildren);
            }
        }
        const spriteState = state === cc.Sprite.State.NORMAL ? "2d-sprite" : "2d-gray-sprite";
        for (const sprite of sprites) {
            sprite.setMaterial(0, cc.Material.getBuiltinMaterial(spriteState));
        }
        //
        const labels: cc.Label[] = [];
        const labelComponent: cc.Label = node.getComponent(cc.Label);
        if (labelComponent) labels.push(labelComponent);
        if (includeChildren) {
            const labelCompInChildren: cc.Label[] = node.getComponentsInChildren(cc.Label);
            if (labelCompInChildren && labelCompInChildren.length > 0) {
                labels.push(...labelCompInChildren);
            }
        }
        for (let label of labels) {
            label.setMaterial(0, cc.Material.getBuiltinMaterial(spriteState));
        }
    } // end: set_sprite_state

    // @@
    // Một gói (bundle) chứa một lượng tài sản (bao gồm scene), bạn có thể tải, tải trước, phát hành tài sản có trong gói này.
    public static async_get_bundle(bundleName: string, callback: (bundle: cc.AssetManager.Bundle) => void): void {
        if (!bundleName || typeof bundleName !== "string") return;
        // cc.assetManager.getBundle: Lấy gói đã được tải.
        const bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName);
        if (bundle) {
            if (typeof callback === "function") callback(bundle);
            return;
        }
        // tải gói (bundle) từ một URL hoặc một thư mục.
        cc.assetManager.loadBundle(bundleName, (error: Error, loadedBundle: cc.AssetManager.Bundle) => {
            if (error) {
                cc.error(`async_get_bundle: load [${bundleName}] bundle failed,`, error);
            } else {
                cc.log(`async_get_bundle: load [${bundleName}] bundle successfully.`);
                if (typeof callback === "function") callback(loadedBundle);
            }
        });
    }

    // @@
    public static async_set_sprite_frame(
        sprite: cc.Sprite,
        bundleName: string,
        path: string,
        callback?: (spriteFrame: cc.SpriteFrame) => void,
        context?: object): void {
        if (!sprite || !(sprite instanceof cc.Sprite)) return;
        // cập nhật SpriteFrame "path" cho sprite này để check lại sau khi tải xong.
        this.sprite_data_map[sprite.uuid] = { sprite_uuid: sprite.uuid, newest_url: path };
        //
        this.async_get_bundle(bundleName, (loadedBundle: cc.AssetManager.Bundle) => {
            // Nhận tài sản trong gói này theo đường dẫn và loại.
            const spriteFrame: cc.SpriteFrame = loadedBundle.get<cc.SpriteFrame>(path, cc.SpriteFrame);
            if (spriteFrame) {
                const currentSpriteData: ISpriteData = this.sprite_data_map[sprite.uuid];
                // nếu sprite còn tồn tại và newest_url chưa thay đổi thì set spriteFrame cho sprite.
                if (currentSpriteData && path === currentSpriteData.newest_url && sprite.isValid) {
                    sprite.spriteFrame = spriteFrame;
                    if (typeof callback === "function" && context) callback.call(context, spriteFrame);
                }
                return;
            }
            // Tải tài sản trong gói này theo đường dẫn tương đối với đường dẫn của gói.
            loadedBundle.load(path, cc.SpriteFrame, (error: Error, loadedSpriteFrame: cc.SpriteFrame) => {
                if (error) {
                    cc.error(`async_set_sprite_frame: load SpriteFrame [${bundleName}] failed.`, error.message);
                } else {
                    const currentSpriteData: ISpriteData = this.sprite_data_map[sprite.uuid];
                    // nếu sprite còn tồn tại và newest_url chưa thay đổi thì set spriteFrame cho sprite.
                    if (currentSpriteData && path === currentSpriteData.newest_url && sprite.isValid) {
                        sprite.spriteFrame = loadedSpriteFrame;
                        if (typeof callback === "function" && context) callback.call(context, loadedSpriteFrame);
                    }
                }
            });
        });
    } // end: async_set_sprite_frame

    // @@
    public static format_time(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${secs < 10 ? "0" + secs : secs}`;
    }

    public static format_time_miunte(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return (minutes < 10 ? "0" + minutes : minutes.toString()) + ":" + (secs < 10 ? "0" + secs : secs.toString());
    }

    // @@ (not used)
    /* public static random(integer: boolean = false, min: number = 0, max: number = 1): number {
        this.seed = (9301 * this.seed + 49297) % 233280;
        const randomValue = min + (this.seed / 233280) * (max - min);
        return integer ? Math.floor(randomValue) : randomValue;
    } */

    // @@
    public static math_random(integer: boolean = false, min: number = 0, max: number = 1): number {
        const randomValue = min + Math.random() * (max - min);
        return integer ? Math.floor(randomValue) : randomValue;
    }

    // @@ (not used)
    /* static rand_from_rate_arr(rateArr: number[]): number {
        if (rateArr.length <= 0) return 0;
        const randomValue = Math.floor(Math.random() * rateArr[rateArr.length - 1]);
        for (let i = 0; i < rateArr.length; i++) {
            if (randomValue < rateArr[i]) return i;
        }
        return rateArr.length - 1;
    } */

    // @@ (not used) (giống rand_from_rate_arr)
    /* public static randFromRateArr(rateArr: number[]): number {
        if (rateArr.length <= 0) return 0;
        const randomValue = Math.floor(Math.random() * rateArr[rateArr.length - 1]);
        for (let i = 0; i < rateArr.length; i++) {
            if (randomValue < rateArr[i]) return i;
        }
        return rateArr.length - 1;
    } */

    // @@ (not used)
    /* public static angle2radian(angle: number, normalize: boolean = true): number {
        return (normalize ? (angle + 360) % 360 : angle) / 180 * Math.PI;
    } */

    // @@ (not used)
    /* public static radian2angle(radian: number, normalize: boolean = true): number {
        return (normalize ? (radian + 2 * Math.PI) % (2 * Math.PI) : radian) / Math.PI * 180;
    } */

    // @@ (not used)
    /* public static date_format(date: Date, format: string): string {
        if (!date || typeof date !== "object" || !(date instanceof Date) || typeof format !== "string") return "";
        const dObj: Record<string, number> = {
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            q: Math.floor(date.getMonth() / 3) + 1,
            S: date.getMilliseconds()
        };
        return format.replace(/([yMdhmsqS])+/g, (match: string, key: string) => {
            const value = dObj[key];
            if (value !== undefined) {
                if (match.length > 1) {
                    const valStr = "0" + value;
                    return valStr.substr(valStr.length - 2);
                 } else {
                    return value.toString();
                 }
            } else if (key === "y") {
                return `${date.getFullYear()}`.substr(4 - match.length);
            }
            return match;
        });
    } */

    // @@ (format e.g: "dd:mm:ss")
    public static time_format(seconds: number, format: string): string {
        if (typeof seconds !== "number" || Number.isNaN(seconds) || typeof format !== "string") return "";
        const dObj: Record<string, number> = {
            d: Math.floor(seconds / 86400),
            h: Math.floor((seconds % 86400) / 3600),
            m: Math.floor((seconds % 86400 % 3600) / 60),
            s: Math.floor(seconds % 86400 % 3600 % 60)
        };
        return format.replace(/([dhms])+/g, (substring: string, key: string) => {
            const value: number | undefined = dObj[key];
            if (value !== undefined) {
                if (substring.length > 1) {
                    const valStr = "0" + value;
                    return valStr.substr(valStr.length - 2);
                } else {
                    return value.toString();
                }
            } else {
                return substring;
            }
        });
    }

    // @@ (not used)
    /* public static get_total_day(timestamp: number): number {
        const localTimeSt = timestamp - 60000 * new Date().getTimezoneOffset();
        return Math.floor(localTimeSt / 86400000);
    } */

    // @ (không sử dụng nên check một lần)
    /* public static number_to_chinese(num: number): string {
        const e1 = Math.floor(num);
        if (e1 >= 0 && e1 < 100) {
            if (e1 <= 10) return this.chinese_num_array[num];
            if (e1 <= 19) return this.chinese_num_array[10] + this.chinese_num_array[num % 10];
            const a = num % 10 > 0 ? this.chinese_num_array[num % 10] : "";
            return this.chinese_num_array[Math.floor(num / 10)] + this.chinese_num_array[10] + a;
        }
        if (e1 >= 100 && e1 < 1000) {
            const str = e1.toString();
            const a = Number(str.substring(0, 1));
            const e = Number(str.substring(1, 2));
            const t = Number(str.substring(2, 3));
            if (e === 0 && t === 0) return this.chinese_num_array[a] + this.chinese_num_array[11];
            if (e === 0 && t !== 0) return this.chinese_num_array[a] + this.chinese_num_array[11] + this.chinese_num_array[0] + this.chinese_num_array[t];
            if (e !== 0 && t === 0) return this.chinese_num_array[a] + this.chinese_num_array[11] + this.chinese_num_array[e] + this.chinese_num_array[10];
            return this.chinese_num_array[a] + this.chinese_num_array[11] + this.chinese_num_array[e] + this.chinese_num_array[10] + this.chinese_num_array[t];
        }
        return "";
    } */

    // @@
    public static numFormat(num: number, decimal: number = 0, upperCase: boolean = true): string {
        let value = num;
        const units = ["万", "亿", "万亿", "亿亿", "P", "E"];
        let unitIndex = 0;
        while (value >= 10000 && unitIndex < units.length) {
            value /= 10000;
            unitIndex++;
        }
        value = Math.floor(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
        let unit = "";
        if (unitIndex > 0) {
            unit = units[unitIndex - 1];
            unit = upperCase ? unit.toLocaleUpperCase() : unit.toLocaleLowerCase();
        }
        return `${value}${unit}`;
    }

    // @ (not used)
    /* public static server_http_request(callback: (response: any) => void, context: object, url: string): void {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    const response = JSON.parse(xhr.responseText);
                    if (callback) callback.apply(context, [response]);
                    console.log(xhr.responseText);
                } else if (xhr.status < 100 || xhr.status >= 400) {
                    cc.error("Request failed");
                }
            }
        };
        console.log("request: " + url);
        xhr.open("GET", url, true);
        xhr.send();
    } */

    // @@ (not used), function => null
    /* public static deep_copy<T>(obj: T): T {
        const map = new Map();
        function clone<T>(item: T): T {
            const type: string = typeof item;
            if (item && type === "object") {
                if (map.has(item)) return map.get(item);
                let result: any[] | Record<string, any>;
                if (Array.isArray(item)) {
                    result = [];
                    map.set(item, result);
                    item.forEach((value: any, index: number) => {
                        result[index] = clone(value);
                    });
                } else {
                    result = {};
                    map.set(item, result);
                    for (const key in item) {
                        if (item.hasOwnProperty(key)) {
                            result[key] = clone(item[key]);
                        }
                    }
                }
                //
                return result as T;
            }
            return type === "function" ? null : item;
        }
        return clone(obj);
    } */

    // @@
    // props e.g: { itemID: "ascending" }, { itemID: "descending" }
    public static sort_by_props<T>(objArr: T[], props: PropsType): T[] {
        return objArr.sort((objA: T, objB: T) => this._compare_by_props<T>(objA, objB, props));
    }

    /* @@
    return: order (1 | -1 | 0)
    */
    private static _compare_by_props<T>(objA: T, objB: T, props: PropsType): number {
        if (typeof objA !== "object" || typeof objB !== "object") return 0;
        // ascending(tăng dần), descending(giảm dần)
        const orders: number[] = [];
        const propsArr: PropsType[] = [];
        if (props && typeof props === "object") propsArr.push(props);
        // 
        if (propsArr.length < 1) {
            // ascending by default
            for (const key in objA) {
                if (objA[key] > objB[key]) {
                    orders.push(1);
                    break;
                }
                if (objA[key] !== objB[key]) {
                    orders.push(-1);
                    break;
                }
                orders.push(0);
            }
        } else {
            for (let i = 0; i < propsArr.length; i++) {
                const props = propsArr[i];
                for (const key in props) {
                    const asc = props[key] === "ascending";
                    if (objA[key] > objB[key]) {
                        orders.push(asc ? 1 : -1);
                        break;
                    }
                    if (objA[key] !== objB[key]) {
                        orders.push(asc ? -1 : 1);
                        break;
                    }
                    orders.push(0);
                }
            }
        }
        for (const order of orders) {
            if (order === 1 || order === -1) return order;
        }
        return 0;
    } // end: _compare_by_props

    // @ (không sử dụng nên check một lần)
    /* public static find_plus(path: string, root?: cc.Node): cc.Node | null {
        if (!path || typeof path !== "string") return null;
        let currentNode: cc.Scene | cc.Node = root;
        if (!root || !(root instanceof cc.Node)) {
            const scene: cc.Scene = cc.director.getScene();
            if (!scene) return null;
            currentNode = scene;
        }
        const startIndex = path[0] !== '/' ? 0 : 1;
        const segments: string[] = path.split("/");
        //
        for (let i = startIndex; i < segments.length; i++) {
            const segment: string[] = segments[i].split("$");
            const index: number = segment.length === 2 ? parseInt(segment[1]) : 0;
            const name: string = segment[0];
            const children: cc.Node[] = currentNode.children;
            if (!Array.isArray(children) || children.length < 1) return null;
            currentNode = null;
            let count = 0;
            for (const child of children) {
                if (child.name === name) {
                    if (index === count) {
                        currentNode = child;
                        break;
                    }
                    count++;
                }
            }
            if (!currentNode) return null;
        }
        return currentNode;
    } */

    // @@ (not used)
    /* public static damage_float(baseDamage: number, minMultiplier: number, maxMultiplier: number): number {
        const sign = Math.random() > 0.5 ? -1 : 1;
        const minDamage = Math.floor(baseDamage * minMultiplier);
        const maxDamage = Math.floor(baseDamage * maxMultiplier);
        return baseDamage + Math.floor(Math.random() * (maxDamage - minDamage) + minDamage) * sign;
    } */

    // @@ (not used)
    /* public static scroll_num(target: cc.Node, duration: number, startValue: number, endValue: number, callback: (value: number) => void): void {
        const frames = Math.floor(60 * duration);
        let elapsed = 0;
        target.schedule((deltaTime: number) => {
            callback(cc.misc.lerp(startValue, endValue, elapsed / duration));
            elapsed += deltaTime;
        }, 0, frames);
    } */

    // @@ (not used)
    /* public static play_normal_anim(animation: cc.Animation, clipName: string, callback?: () => void): void {
        if (!animation || !(animation instanceof cc.Animation) || !clipName || typeof clipName !== "string") return;
        animation.targetOff(this);
        animation.node.active = true;
        animation.once(cc.Animation.EventType.FINISHED, () => {
            animation.node.active = false;
            if (typeof callback === "function") callback();
        }, this);
        animation.play(clipName, 0);
    } */

    // @@
    public static align_with_parent(node: cc.Node): void {
        if (!node || !(node instanceof cc.Node)) return;
        let widget: cc.Widget = node.getComponent(cc.Widget);
        if (!widget) widget = node.addComponent(cc.Widget);
        widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
        widget.top = widget.bottom = widget.left = widget.right = 0;
    }

    // @@
    public static save_json_file(filename: string, data: object | string | number | boolean): void {
        if (!filename || typeof filename !== "string" || !data) return;
        let dataStr: string = "";
        if (typeof data === "object" || typeof data === "string") {
            dataStr = JSON.stringify(data);
        } else {
            dataStr = data.toString();
        }
        const a = document.createElement("a");
        a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(dataStr));
        a.setAttribute("download", filename);
        if (document.createEvent) {
            const event = document.createEvent("MouseEvents");
            event.initEvent("click", true, true);
            a.dispatchEvent(event);
        } else {
            a.click();
        }
    }

    // @@ (not used)
    /* public static get_date_str(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
    } */
}
