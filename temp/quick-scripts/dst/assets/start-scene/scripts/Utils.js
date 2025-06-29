
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/Utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd7d06pv0ItNkZ+bg26zjTMW', 'Utils');
// start-scene/scripts/Utils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
;
// @
var Utils = /** @class */ (function () {
    function Utils() {
    }
    // @@ (not used)
    /* public static get_component_in_self_or_children<T  extends cc.Component>(node: cc.Node, component: { prototype: T }): T | null {
        return node.getComponent<T>(component) || node.getComponentInChildren<T>(component);
    } */
    // @@
    Utils.set_sprite_state = function (node, state, includeChildren) {
        if (includeChildren === void 0) { includeChildren = true; }
        if (!node || !(node instanceof cc.Node))
            return;
        var sprites = [];
        var spriteComponent = node.getComponent(cc.Sprite);
        if (spriteComponent)
            sprites.push(spriteComponent);
        if (includeChildren) {
            var spriteCompInChildren = node.getComponentsInChildren(cc.Sprite);
            if (spriteCompInChildren && spriteCompInChildren.length > 0) {
                sprites.push.apply(sprites, spriteCompInChildren);
            }
        }
        var spriteState = state === cc.Sprite.State.NORMAL ? "2d-sprite" : "2d-gray-sprite";
        for (var _i = 0, sprites_1 = sprites; _i < sprites_1.length; _i++) {
            var sprite = sprites_1[_i];
            sprite.setMaterial(0, cc.Material.getBuiltinMaterial(spriteState));
        }
        //
        var labels = [];
        var labelComponent = node.getComponent(cc.Label);
        if (labelComponent)
            labels.push(labelComponent);
        if (includeChildren) {
            var labelCompInChildren = node.getComponentsInChildren(cc.Label);
            if (labelCompInChildren && labelCompInChildren.length > 0) {
                labels.push.apply(labels, labelCompInChildren);
            }
        }
        for (var _a = 0, labels_1 = labels; _a < labels_1.length; _a++) {
            var label = labels_1[_a];
            label.setMaterial(0, cc.Material.getBuiltinMaterial(spriteState));
        }
    }; // end: set_sprite_state
    // @@
    // Một gói (bundle) chứa một lượng tài sản (bao gồm scene), bạn có thể tải, tải trước, phát hành tài sản có trong gói này.
    Utils.async_get_bundle = function (bundleName, callback) {
        if (!bundleName || typeof bundleName !== "string")
            return;
        // cc.assetManager.getBundle: Lấy gói đã được tải.
        var bundle = cc.assetManager.getBundle(bundleName);
        if (bundle) {
            if (typeof callback === "function")
                callback(bundle);
            return;
        }
        // tải gói (bundle) từ một URL hoặc một thư mục.
        cc.assetManager.loadBundle(bundleName, function (error, loadedBundle) {
            if (error) {
                cc.error("async_get_bundle: load [" + bundleName + "] bundle failed,", error);
            }
            else {
                cc.log("async_get_bundle: load [" + bundleName + "] bundle successfully.");
                if (typeof callback === "function")
                    callback(loadedBundle);
            }
        });
    };
    // @@
    Utils.async_set_sprite_frame = function (sprite, bundleName, path, callback, context) {
        var _this = this;
        if (!sprite || !(sprite instanceof cc.Sprite))
            return;
        // cập nhật SpriteFrame "path" cho sprite này để check lại sau khi tải xong.
        this.sprite_data_map[sprite.uuid] = { sprite_uuid: sprite.uuid, newest_url: path };
        //
        this.async_get_bundle(bundleName, function (loadedBundle) {
            // Nhận tài sản trong gói này theo đường dẫn và loại.
            var spriteFrame = loadedBundle.get(path, cc.SpriteFrame);
            if (spriteFrame) {
                var currentSpriteData = _this.sprite_data_map[sprite.uuid];
                // nếu sprite còn tồn tại và newest_url chưa thay đổi thì set spriteFrame cho sprite.
                if (currentSpriteData && path === currentSpriteData.newest_url && sprite.isValid) {
                    sprite.spriteFrame = spriteFrame;
                    if (typeof callback === "function" && context)
                        callback.call(context, spriteFrame);
                }
                return;
            }
            // Tải tài sản trong gói này theo đường dẫn tương đối với đường dẫn của gói.
            loadedBundle.load(path, cc.SpriteFrame, function (error, loadedSpriteFrame) {
                if (error) {
                    cc.error("async_set_sprite_frame: load SpriteFrame [" + bundleName + "] failed.", error.message);
                }
                else {
                    var currentSpriteData = _this.sprite_data_map[sprite.uuid];
                    // nếu sprite còn tồn tại và newest_url chưa thay đổi thì set spriteFrame cho sprite.
                    if (currentSpriteData && path === currentSpriteData.newest_url && sprite.isValid) {
                        sprite.spriteFrame = loadedSpriteFrame;
                        if (typeof callback === "function" && context)
                            callback.call(context, loadedSpriteFrame);
                    }
                }
            });
        });
    }; // end: async_set_sprite_frame
    // @@
    Utils.format_time = function (seconds) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var secs = Math.floor(seconds % 60);
        return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (secs < 10 ? "0" + secs : secs);
    };
    Utils.format_time_miunte = function (seconds) {
        var minutes = Math.floor(seconds / 60);
        var secs = seconds % 60;
        return (minutes < 10 ? "0" + minutes : minutes.toString()) + ":" + (secs < 10 ? "0" + secs : secs.toString());
    };
    // @@ (not used)
    /* public static random(integer: boolean = false, min: number = 0, max: number = 1): number {
        this.seed = (9301 * this.seed + 49297) % 233280;
        const randomValue = min + (this.seed / 233280) * (max - min);
        return integer ? Math.floor(randomValue) : randomValue;
    } */
    // @@
    Utils.math_random = function (integer, min, max) {
        if (integer === void 0) { integer = false; }
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        var randomValue = min + Math.random() * (max - min);
        return integer ? Math.floor(randomValue) : randomValue;
    };
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
    Utils.time_format = function (seconds, format) {
        if (typeof seconds !== "number" || Number.isNaN(seconds) || typeof format !== "string")
            return "";
        var dObj = {
            d: Math.floor(seconds / 86400),
            h: Math.floor((seconds % 86400) / 3600),
            m: Math.floor((seconds % 86400 % 3600) / 60),
            s: Math.floor(seconds % 86400 % 3600 % 60)
        };
        return format.replace(/([dhms])+/g, function (substring, key) {
            var value = dObj[key];
            if (value !== undefined) {
                if (substring.length > 1) {
                    var valStr = "0" + value;
                    return valStr.substr(valStr.length - 2);
                }
                else {
                    return value.toString();
                }
            }
            else {
                return substring;
            }
        });
    };
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
    Utils.numFormat = function (num, decimal, upperCase) {
        if (decimal === void 0) { decimal = 0; }
        if (upperCase === void 0) { upperCase = true; }
        var value = num;
        var units = ["万", "亿", "万亿", "亿亿", "P", "E"];
        var unitIndex = 0;
        while (value >= 10000 && unitIndex < units.length) {
            value /= 10000;
            unitIndex++;
        }
        value = Math.floor(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
        var unit = "";
        if (unitIndex > 0) {
            unit = units[unitIndex - 1];
            unit = upperCase ? unit.toLocaleUpperCase() : unit.toLocaleLowerCase();
        }
        return "" + value + unit;
    };
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
    Utils.sort_by_props = function (objArr, props) {
        var _this = this;
        return objArr.sort(function (objA, objB) { return _this._compare_by_props(objA, objB, props); });
    };
    /* @@
    return: order (1 | -1 | 0)
    */
    Utils._compare_by_props = function (objA, objB, props) {
        if (typeof objA !== "object" || typeof objB !== "object")
            return 0;
        // ascending(tăng dần), descending(giảm dần)
        var orders = [];
        var propsArr = [];
        if (props && typeof props === "object")
            propsArr.push(props);
        // 
        if (propsArr.length < 1) {
            // ascending by default
            for (var key in objA) {
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
        }
        else {
            for (var i = 0; i < propsArr.length; i++) {
                var props_1 = propsArr[i];
                for (var key in props_1) {
                    var asc = props_1[key] === "ascending";
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
        for (var _i = 0, orders_1 = orders; _i < orders_1.length; _i++) {
            var order = orders_1[_i];
            if (order === 1 || order === -1)
                return order;
        }
        return 0;
    }; // end: _compare_by_props
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
    Utils.align_with_parent = function (node) {
        if (!node || !(node instanceof cc.Node))
            return;
        var widget = node.getComponent(cc.Widget);
        if (!widget)
            widget = node.addComponent(cc.Widget);
        widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
        widget.top = widget.bottom = widget.left = widget.right = 0;
    };
    // @@
    Utils.save_json_file = function (filename, data) {
        if (!filename || typeof filename !== "string" || !data)
            return;
        var dataStr = "";
        if (typeof data === "object" || typeof data === "string") {
            dataStr = JSON.stringify(data);
        }
        else {
            dataStr = data.toString();
        }
        var a = document.createElement("a");
        a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(dataStr));
        a.setAttribute("download", filename);
        if (document.createEvent) {
            var event = document.createEvent("MouseEvents");
            event.initEvent("click", true, true);
            a.dispatchEvent(event);
        }
        else {
            a.click();
        }
    };
    // @
    // private static drop_seed: number = 1574822809; // (not used)
    // private static seed: number = 1574822809;
    // private static readonly chinese_num_array: ReadonlyArray<string> = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万"];
    Utils.sprite_data_map = {};
    return Utils;
}());
exports.Utils = Utils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtDLENBQUM7QUFLRixJQUFJO0FBQ0o7SUFBQTtJQThjQSxDQUFDO0lBdmNHLGdCQUFnQjtJQUNoQjs7UUFFSTtJQUVKLEtBQUs7SUFDUyxzQkFBZ0IsR0FBOUIsVUFBK0IsSUFBYSxFQUFFLEtBQXNCLEVBQUUsZUFBK0I7UUFBL0IsZ0NBQUEsRUFBQSxzQkFBK0I7UUFDakcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ2hELElBQU0sT0FBTyxHQUFnQixFQUFFLENBQUM7UUFDaEMsSUFBTSxlQUFlLEdBQWMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEUsSUFBSSxlQUFlO1lBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRCxJQUFJLGVBQWUsRUFBRTtZQUNqQixJQUFNLG9CQUFvQixHQUFnQixJQUFJLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xGLElBQUksb0JBQW9CLElBQUksb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDekQsT0FBTyxDQUFDLElBQUksT0FBWixPQUFPLEVBQVMsb0JBQW9CLEVBQUU7YUFDekM7U0FDSjtRQUNELElBQU0sV0FBVyxHQUFHLEtBQUssS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7UUFDdEYsS0FBcUIsVUFBTyxFQUFQLG1CQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPLEVBQUU7WUFBekIsSUFBTSxNQUFNLGdCQUFBO1lBQ2IsTUFBTSxDQUFDLFdB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ZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9cclxuLy8gQFxyXG5pbnRlcmZhY2UgSVNwcml0ZURhdGEge1xyXG4gICAgc3ByaXRlX3V1aWQ6IHN0cmluZztcclxuICAgIG5ld2VzdF91cmw6IHN0cmluZztcclxufTtcclxuXHJcbi8vIEBcclxudHlwZSBQcm9wc1R5cGUgPSBSZWNvcmQ8c3RyaW5nLCBcImFzY2VuZGluZ1wiIHwgXCJkZXNjZW5kaW5nXCI+O1xyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gICAgLy8gQFxyXG4gICAgLy8gcHJpdmF0ZSBzdGF0aWMgZHJvcF9zZWVkOiBudW1iZXIgPSAxNTc0ODIyODA5OyAvLyAobm90IHVzZWQpXHJcbiAgICAvLyBwcml2YXRlIHN0YXRpYyBzZWVkOiBudW1iZXIgPSAxNTc0ODIyODA5O1xyXG4gICAgLy8gcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY2hpbmVzZV9udW1fYXJyYXk6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiA9IFtcIumbtlwiLCBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiLCBcIuS4g1wiLCBcIuWFq1wiLCBcIuS5nVwiLCBcIuWNgVwiLCBcIueZvlwiLCBcIuWNg1wiLCBcIuS4h1wiXTtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHNwcml0ZV9kYXRhX21hcDogUmVjb3JkPHN0cmluZywgSVNwcml0ZURhdGE+ID0ge307XHJcblxyXG4gICAgLy8gQEAgKG5vdCB1c2VkKVxyXG4gICAgLyogcHVibGljIHN0YXRpYyBnZXRfY29tcG9uZW50X2luX3NlbGZfb3JfY2hpbGRyZW48VCAgZXh0ZW5kcyBjYy5Db21wb25lbnQ+KG5vZGU6IGNjLk5vZGUsIGNvbXBvbmVudDogeyBwcm90b3R5cGU6IFQgfSk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gbm9kZS5nZXRDb21wb25lbnQ8VD4oY29tcG9uZW50KSB8fCBub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW48VD4oY29tcG9uZW50KTtcclxuICAgIH0gKi9cclxuXHJcbiAgICAvLyBAQFxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRfc3ByaXRlX3N0YXRlKG5vZGU6IGNjLk5vZGUsIHN0YXRlOiBjYy5TcHJpdGUuU3RhdGUsIGluY2x1ZGVDaGlsZHJlbjogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIW5vZGUgfHwgIShub2RlIGluc3RhbmNlb2YgY2MuTm9kZSkpIHJldHVybjtcclxuICAgICAgICBjb25zdCBzcHJpdGVzOiBjYy5TcHJpdGVbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHNwcml0ZUNvbXBvbmVudDogY2MuU3ByaXRlID0gbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBpZiAoc3ByaXRlQ29tcG9uZW50KSBzcHJpdGVzLnB1c2goc3ByaXRlQ29tcG9uZW50KTtcclxuICAgICAgICBpZiAoaW5jbHVkZUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZUNvbXBJbkNoaWxkcmVuOiBjYy5TcHJpdGVbXSA9IG5vZGUuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgaWYgKHNwcml0ZUNvbXBJbkNoaWxkcmVuICYmIHNwcml0ZUNvbXBJbkNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZXMucHVzaCguLi5zcHJpdGVDb21wSW5DaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3ByaXRlU3RhdGUgPSBzdGF0ZSA9PT0gY2MuU3ByaXRlLlN0YXRlLk5PUk1BTCA/IFwiMmQtc3ByaXRlXCIgOiBcIjJkLWdyYXktc3ByaXRlXCI7XHJcbiAgICAgICAgZm9yIChjb25zdCBzcHJpdGUgb2Ygc3ByaXRlcykge1xyXG4gICAgICAgICAgICBzcHJpdGUuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKHNwcml0ZVN0YXRlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgY29uc3QgbGFiZWxzOiBjYy5MYWJlbFtdID0gW107XHJcbiAgICAgICAgY29uc3QgbGFiZWxDb21wb25lbnQ6IGNjLkxhYmVsID0gbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGlmIChsYWJlbENvbXBvbmVudCkgbGFiZWxzLnB1c2gobGFiZWxDb21wb25lbnQpO1xyXG4gICAgICAgIGlmIChpbmNsdWRlQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgY29uc3QgbGFiZWxDb21wSW5DaGlsZHJlbjogY2MuTGFiZWxbXSA9IG5vZGUuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBpZiAobGFiZWxDb21wSW5DaGlsZHJlbiAmJiBsYWJlbENvbXBJbkNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxhYmVscy5wdXNoKC4uLmxhYmVsQ29tcEluQ2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGxhYmVsIG9mIGxhYmVscykge1xyXG4gICAgICAgICAgICBsYWJlbC5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoc3ByaXRlU3RhdGUpKTtcclxuICAgICAgICB9XHJcbiAgICB9IC8vIGVuZDogc2V0X3Nwcml0ZV9zdGF0ZVxyXG5cclxuICAgIC8vIEBAXHJcbiAgICAvLyBN4buZdCBnw7NpIChidW5kbGUpIGNo4bupYSBt4buZdCBsxrDhu6NuZyB0w6BpIHPhuqNuIChiYW8gZ+G7k20gc2NlbmUpLCBi4bqhbiBjw7MgdGjhu4MgdOG6o2ksIHThuqNpIHRyxrDhu5tjLCBwaMOhdCBow6BuaCB0w6BpIHPhuqNuIGPDsyB0cm9uZyBnw7NpIG7DoHkuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jX2dldF9idW5kbGUoYnVuZGxlTmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghYnVuZGxlTmFtZSB8fCB0eXBlb2YgYnVuZGxlTmFtZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuO1xyXG4gICAgICAgIC8vIGNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGU6IEzhuqV5IGfDs2kgxJHDoyDEkcaw4bujYyB04bqjaS5cclxuICAgICAgICBjb25zdCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKGJ1bmRsZU5hbWUpO1xyXG4gICAgICAgIGlmIChidW5kbGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSBjYWxsYmFjayhidW5kbGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHThuqNpIGfDs2kgKGJ1bmRsZSkgdOG7qyBt4buZdCBVUkwgaG/hurdjIG3hu5l0IHRoxrAgbeG7pWMuXHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUoYnVuZGxlTmFtZSwgKGVycm9yOiBFcnJvciwgbG9hZGVkQnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoYGFzeW5jX2dldF9idW5kbGU6IGxvYWQgWyR7YnVuZGxlTmFtZX1dIGJ1bmRsZSBmYWlsZWQsYCwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKGBhc3luY19nZXRfYnVuZGxlOiBsb2FkIFske2J1bmRsZU5hbWV9XSBidW5kbGUgc3VjY2Vzc2Z1bGx5LmApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSBjYWxsYmFjayhsb2FkZWRCdW5kbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQEBcclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZShcclxuICAgICAgICBzcHJpdGU6IGNjLlNwcml0ZSxcclxuICAgICAgICBidW5kbGVOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgcGF0aDogc3RyaW5nLFxyXG4gICAgICAgIGNhbGxiYWNrPzogKHNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSkgPT4gdm9pZCxcclxuICAgICAgICBjb250ZXh0Pzogb2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFzcHJpdGUgfHwgIShzcHJpdGUgaW5zdGFuY2VvZiBjYy5TcHJpdGUpKSByZXR1cm47XHJcbiAgICAgICAgLy8gY+G6rXAgbmjhuq10IFNwcml0ZUZyYW1lIFwicGF0aFwiIGNobyBzcHJpdGUgbsOgeSDEkeG7gyBjaGVjayBs4bqhaSBzYXUga2hpIHThuqNpIHhvbmcuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVfZGF0YV9tYXBbc3ByaXRlLnV1aWRdID0geyBzcHJpdGVfdXVpZDogc3ByaXRlLnV1aWQsIG5ld2VzdF91cmw6IHBhdGggfTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuYXN5bmNfZ2V0X2J1bmRsZShidW5kbGVOYW1lLCAobG9hZGVkQnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIE5o4bqtbiB0w6BpIHPhuqNuIHRyb25nIGfDs2kgbsOgeSB0aGVvIMSRxrDhu51uZyBk4bqrbiB2w6AgbG/huqFpLlxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBsb2FkZWRCdW5kbGUuZ2V0PGNjLlNwcml0ZUZyYW1lPihwYXRoLCBjYy5TcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNwcml0ZURhdGE6IElTcHJpdGVEYXRhID0gdGhpcy5zcHJpdGVfZGF0YV9tYXBbc3ByaXRlLnV1aWRdO1xyXG4gICAgICAgICAgICAgICAgLy8gbuG6v3Ugc3ByaXRlIGPDsm4gdOG7k24gdOG6oWkgdsOgIG5ld2VzdF91cmwgY2jGsGEgdGhheSDEkeG7lWkgdGjDrCBzZXQgc3ByaXRlRnJhbWUgY2hvIHNwcml0ZS5cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3ByaXRlRGF0YSAmJiBwYXRoID09PSBjdXJyZW50U3ByaXRlRGF0YS5uZXdlc3RfdXJsICYmIHNwcml0ZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmIGNvbnRleHQpIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgc3ByaXRlRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFThuqNpIHTDoGkgc+G6o24gdHJvbmcgZ8OzaSBuw6B5IHRoZW8gxJHGsOG7nW5nIGThuqtuIHTGsMahbmcgxJHhu5FpIHbhu5tpIMSRxrDhu51uZyBk4bqrbiBj4bunYSBnw7NpLlxyXG4gICAgICAgICAgICBsb2FkZWRCdW5kbGUubG9hZChwYXRoLCBjYy5TcHJpdGVGcmFtZSwgKGVycm9yOiBFcnJvciwgbG9hZGVkU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihgYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZTogbG9hZCBTcHJpdGVGcmFtZSBbJHtidW5kbGVOYW1lfV0gZmFpbGVkLmAsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U3ByaXRlRGF0YTogSVNwcml0ZURhdGEgPSB0aGlzLnNwcml0ZV9kYXRhX21hcFtzcHJpdGUudXVpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbuG6v3Ugc3ByaXRlIGPDsm4gdOG7k24gdOG6oWkgdsOgIG5ld2VzdF91cmwgY2jGsGEgdGhheSDEkeG7lWkgdGjDrCBzZXQgc3ByaXRlRnJhbWUgY2hvIHNwcml0ZS5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNwcml0ZURhdGEgJiYgcGF0aCA9PT0gY3VycmVudFNwcml0ZURhdGEubmV3ZXN0X3VybCAmJiBzcHJpdGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBsb2FkZWRTcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmIGNvbnRleHQpIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgbG9hZGVkU3ByaXRlRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IC8vIGVuZDogYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZVxyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdF90aW1lKHNlY29uZHM6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcclxuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApIC8gNjApO1xyXG4gICAgICAgIGNvbnN0IHNlY3MgPSBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCk7XHJcbiAgICAgICAgcmV0dXJuIGAke2hvdXJzIDwgMTAgPyBcIjBcIiArIGhvdXJzIDogaG91cnN9OiR7bWludXRlcyA8IDEwID8gXCIwXCIgKyBtaW51dGVzIDogbWludXRlc306JHtzZWNzIDwgMTAgPyBcIjBcIiArIHNlY3MgOiBzZWNzfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmb3JtYXRfdGltZV9taXVudGUoc2Vjb25kczogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gICAgICAgIGNvbnN0IHNlY3MgPSBzZWNvbmRzICUgNjA7XHJcbiAgICAgICAgcmV0dXJuIChtaW51dGVzIDwgMTAgPyBcIjBcIiArIG1pbnV0ZXMgOiBtaW51dGVzLnRvU3RyaW5nKCkpICsgXCI6XCIgKyAoc2VjcyA8IDEwID8gXCIwXCIgKyBzZWNzIDogc2Vjcy50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAQCAobm90IHVzZWQpXHJcbiAgICAvKiBwdWJsaWMgc3RhdGljIHJhbmRvbShpbnRlZ2VyOiBib29sZWFuID0gZmFsc2UsIG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAxKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLnNlZWQgPSAoOTMwMSAqIHRoaXMuc2VlZCArIDQ5Mjk3KSAlIDIzMzI4MDtcclxuICAgICAgICBjb25zdCByYW5kb21WYWx1ZSA9IG1pbiArICh0aGlzLnNlZWQgLyAyMzMyODApICogKG1heCAtIG1pbik7XHJcbiAgICAgICAgcmV0dXJuIGludGVnZXIgPyBNYXRoLmZsb29yKHJhbmRvbVZhbHVlKSA6IHJhbmRvbVZhbHVlO1xyXG4gICAgfSAqL1xyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hdGhfcmFuZG9tKGludGVnZXI6IGJvb2xlYW4gPSBmYWxzZSwgbWluOiBudW1iZXIgPSAwLCBtYXg6IG51bWJlciA9IDEpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbVZhbHVlID0gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pO1xyXG4gICAgICAgIHJldHVybiBpbnRlZ2VyID8gTWF0aC5mbG9vcihyYW5kb21WYWx1ZSkgOiByYW5kb21WYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAQCAobm90IHVzZWQpXHJcbiAgICAvKiBzdGF0aWMgcmFuZF9mcm9tX3JhdGVfYXJyKHJhdGVBcnI6IG51bWJlcltdKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAocmF0ZUFyci5sZW5ndGggPD0gMCkgcmV0dXJuIDA7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tVmFsdWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYXRlQXJyW3JhdGVBcnIubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmF0ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocmFuZG9tVmFsdWUgPCByYXRlQXJyW2ldKSByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJhdGVBcnIubGVuZ3RoIC0gMTtcclxuICAgIH0gKi9cclxuXHJcbiAgICAvLyBAQCAobm90IHVzZWQpIChnaeG7kW5nIHJhbmRfZnJvbV9yYXRlX2FycilcclxuICAgIC8qIHB1YmxpYyBzdGF0aWMgcmFuZEZyb21SYXRlQXJyKHJhdGVBcnI6IG51bWJlcltdKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAocmF0ZUFyci5sZW5ndGggPD0gMCkgcmV0dXJuIDA7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tVmFsdWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYXRlQXJyW3JhdGVBcnIubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmF0ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocmFuZG9tVmFsdWUgPCByYXRlQXJyW2ldKSByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJhdGVBcnIubGVuZ3RoIC0gMTtcclxuICAgIH0gKi9cclxuXHJcbiAgICAvLyBAQCAobm90IHVzZWQpXHJcbiAgICAvKiBwdWJsaWMgc3RhdGljIGFuZ2xlMnJhZGlhbihhbmdsZTogbnVtYmVyLCBub3JtYWxpemU6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKG5vcm1hbGl6ZSA/IChhbmdsZSArIDM2MCkgJSAzNjAgOiBhbmdsZSkgLyAxODAgKiBNYXRoLlBJO1xyXG4gICAgfSAqL1xyXG5cclxuICAgIC8vIEBAIChub3QgdXNlZClcclxuICAgIC8qIHB1YmxpYyBzdGF0aWMgcmFkaWFuMmFuZ2xlKHJhZGlhbjogbnVtYmVyLCBub3JtYWxpemU6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKG5vcm1hbGl6ZSA/IChyYWRpYW4gKyAyICogTWF0aC5QSSkgJSAoMiAqIE1hdGguUEkpIDogcmFkaWFuKSAvIE1hdGguUEkgKiAxODA7XHJcbiAgICB9ICovXHJcblxyXG4gICAgLy8gQEAgKG5vdCB1c2VkKVxyXG4gICAgLyogcHVibGljIHN0YXRpYyBkYXRlX2Zvcm1hdChkYXRlOiBEYXRlLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFkYXRlIHx8IHR5cGVvZiBkYXRlICE9PSBcIm9iamVjdFwiIHx8ICEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHx8IHR5cGVvZiBmb3JtYXQgIT09IFwic3RyaW5nXCIpIHJldHVybiBcIlwiO1xyXG4gICAgICAgIGNvbnN0IGRPYmo6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7XHJcbiAgICAgICAgICAgIE06IGRhdGUuZ2V0TW9udGgoKSArIDEsXHJcbiAgICAgICAgICAgIGQ6IGRhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAgICAgICBoOiBkYXRlLmdldEhvdXJzKCksXHJcbiAgICAgICAgICAgIG06IGRhdGUuZ2V0TWludXRlcygpLFxyXG4gICAgICAgICAgICBzOiBkYXRlLmdldFNlY29uZHMoKSxcclxuICAgICAgICAgICAgcTogTWF0aC5mbG9vcihkYXRlLmdldE1vbnRoKCkgLyAzKSArIDEsXHJcbiAgICAgICAgICAgIFM6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQucmVwbGFjZSgvKFt5TWRobXNxU10pKy9nLCAobWF0Y2g6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBkT2JqW2tleV07XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbFN0ciA9IFwiMFwiICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbFN0ci5zdWJzdHIodmFsU3RyLmxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJ5XCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9YC5zdWJzdHIoNCAtIG1hdGNoLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSAqL1xyXG5cclxuICAgIC8vIEBAIChmb3JtYXQgZS5nOiBcImRkOm1tOnNzXCIpXHJcbiAgICBwdWJsaWMgc3RhdGljIHRpbWVfZm9ybWF0KHNlY29uZHM6IG51bWJlciwgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc2Vjb25kcyAhPT0gXCJudW1iZXJcIiB8fCBOdW1iZXIuaXNOYU4oc2Vjb25kcykgfHwgdHlwZW9mIGZvcm1hdCAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgY29uc3QgZE9iajogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHtcclxuICAgICAgICAgICAgZDogTWF0aC5mbG9vcihzZWNvbmRzIC8gODY0MDApLFxyXG4gICAgICAgICAgICBoOiBNYXRoLmZsb29yKChzZWNvbmRzICUgODY0MDApIC8gMzYwMCksXHJcbiAgICAgICAgICAgIG06IE1hdGguZmxvb3IoKHNlY29uZHMgJSA4NjQwMCAlIDM2MDApIC8gNjApLFxyXG4gICAgICAgICAgICBzOiBNYXRoLmZsb29yKHNlY29uZHMgJSA4NjQwMCAlIDM2MDAgJSA2MClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQucmVwbGFjZSgvKFtkaG1zXSkrL2csIChzdWJzdHJpbmc6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCA9IGRPYmpba2V5XTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWJzdHJpbmcubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbFN0ciA9IFwiMFwiICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbFN0ci5zdWJzdHIodmFsU3RyLmxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzdHJpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAQCAobm90IHVzZWQpXHJcbiAgICAvKiBwdWJsaWMgc3RhdGljIGdldF90b3RhbF9kYXkodGltZXN0YW1wOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGxvY2FsVGltZVN0ID0gdGltZXN0YW1wIC0gNjAwMDAgKiBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobG9jYWxUaW1lU3QgLyA4NjQwMDAwMCk7XHJcbiAgICB9ICovXHJcblxyXG4gICAgLy8gQCAoa2jDtG5nIHPhu60gZOG7pW5nIG7Dqm4gY2hlY2sgbeG7mXQgbOG6p24pXHJcbiAgICAvKiBwdWJsaWMgc3RhdGljIG51bWJlcl90b19jaGluZXNlKG51bTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBlMSA9IE1hdGguZmxvb3IobnVtKTtcclxuICAgICAgICBpZiAoZTEgPj0gMCAmJiBlMSA8IDEwMCkge1xyXG4gICAgICAgICAgICBpZiAoZTEgPD0gMTApIHJldHVybiB0aGlzLmNoaW5lc2VfbnVtX2FycmF5W251bV07XHJcbiAgICAgICAgICAgIGlmIChlMSA8PSAxOSkgcmV0dXJuIHRoaXMuY2hpbmVzZV9udW1fYXJyYXlbMTBdICsgdGhpcy5jaGluZXNlX251bV9hcnJheVtudW0gJSAxMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGEgPSBudW0gJSAxMCA+IDAgPyB0aGlzLmNoaW5lc2VfbnVtX2FycmF5W251bSAlIDEwXSA6IFwiXCI7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaW5lc2VfbnVtX2FycmF5W01hdGguZmxvb3IobnVtIC8gMTApXSArIHRoaXMuY2hpbmVzZV9udW1fYXJyYXlbMTBdICsgYTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUxID49IDEwMCAmJiBlMSA8IDEwMDApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RyID0gZTEudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgY29uc3QgYSA9IE51bWJlcihzdHIuc3Vic3RyaW5nKDAsIDEpKTtcclxuICAgICAgICAgICAgY29uc3QgZSA9IE51bWJlcihzdHIuc3Vic3RyaW5nKDEsIDIpKTtcclxuICAgICAgICAgICAgY29uc3QgdCA9IE51bWJlcihzdHIuc3Vic3RyaW5nKDIsIDMpKTtcclxuICAgICAgICAgICAgaWYgKGUgPT09IDAgJiYgdCA9PT0gMCkgcmV0dXJuIHRoaXMuY2hpbmVzZV9udW1fYXJyYXlbYV0gKyB0aGlzLmNoaW5lc2VfbnVtX2FycmF5WzExXTtcclxuICAgICAgICAgICAgaWYgKGUgPT09IDAgJiYgdCAhPT0gMCkgcmV0dXJuIHRoaXMuY2hpbmVzZV9udW1fYXJyYXlbYV0gKyB0aGlzLmNoaW5lc2VfbnVtX2FycmF5WzExXSArIHRoaXMuY2hpbmVzZV9udW1fYXJyYXlbMF0gKyB0aGlzLmNoaW5lc2VfbnVtX2FycmF5W3RdO1xyXG4gICAgICAgICAgICBpZiAoZSAhPT0gMCAmJiB0ID09PSAwKSByZXR1cm4gdGhpcy5jaGluZXNlX251bV9hcnJheVthXSArIHRoaXMuY2hpbmVzZV9udW1fYXJyYXlbMTFdICsgdGhpcy5jaGluZXNlX251bV9hcnJheVtlXSArIHRoaXMuY2hpbmVzZV9udW1fYXJyYXlbMTBdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGluZXNlX251bV9hcnJheVthXSArIHRoaXMuY2hpbmVzZV9udW1fYXJyYXlbMTFdICsgdGhpcy5jaGluZXNlX251bV9hcnJheVtlXSArIHRoaXMuY2hpbmVzZV9udW1fYXJyYXlbMTBdICsgdGhpcy5jaGluZXNlX251bV9hcnJheVt0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9ICovXHJcblxyXG4gICAgLy8gQEBcclxuICAgIHB1YmxpYyBzdGF0aWMgbnVtRm9ybWF0KG51bTogbnVtYmVyLCBkZWNpbWFsOiBudW1iZXIgPSAwLCB1cHBlckNhc2U6IGJvb2xlYW4gPSB0cnVlKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBudW07XHJcbiAgICAgICAgY29uc3QgdW5pdHMgPSBbXCLkuIdcIiwgXCLkur9cIiwgXCLkuIfkur9cIiwgXCLkur/kur9cIiwgXCJQXCIsIFwiRVwiXTtcclxuICAgICAgICBsZXQgdW5pdEluZGV4ID0gMDtcclxuICAgICAgICB3aGlsZSAodmFsdWUgPj0gMTAwMDAgJiYgdW5pdEluZGV4IDwgdW5pdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhbHVlIC89IDEwMDAwO1xyXG4gICAgICAgICAgICB1bml0SW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlICogTWF0aC5wb3coMTAsIGRlY2ltYWwpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFsKTtcclxuICAgICAgICBsZXQgdW5pdCA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHVuaXRJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgdW5pdCA9IHVuaXRzW3VuaXRJbmRleCAtIDFdO1xyXG4gICAgICAgICAgICB1bml0ID0gdXBwZXJDYXNlID8gdW5pdC50b0xvY2FsZVVwcGVyQ2FzZSgpIDogdW5pdC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7dmFsdWV9JHt1bml0fWA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQCAobm90IHVzZWQpXHJcbiAgICAvKiBwdWJsaWMgc3RhdGljIHNlcnZlcl9odHRwX3JlcXVlc3QoY2FsbGJhY2s6IChyZXNwb25zZTogYW55KSA9PiB2b2lkLCBjb250ZXh0OiBvYmplY3QsIHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIFtyZXNwb25zZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh4aHIuc3RhdHVzIDwgMTAwIHx8IHhoci5zdGF0dXMgPj0gNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJSZXF1ZXN0IGZhaWxlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXF1ZXN0OiBcIiArIHVybCk7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfSAqL1xyXG5cclxuICAgIC8vIEBAIChub3QgdXNlZCksIGZ1bmN0aW9uID0+IG51bGxcclxuICAgIC8qIHB1YmxpYyBzdGF0aWMgZGVlcF9jb3B5PFQ+KG9iajogVCk6IFQge1xyXG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICBmdW5jdGlvbiBjbG9uZTxUPihpdGVtOiBUKTogVCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGU6IHN0cmluZyA9IHR5cGVvZiBpdGVtO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAmJiB0eXBlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFwLmhhcyhpdGVtKSkgcmV0dXJuIG1hcC5nZXQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBhbnlbXSB8IFJlY29yZDxzdHJpbmcsIGFueT47XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5zZXQoaXRlbSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmZvckVhY2goKHZhbHVlOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2luZGV4XSA9IGNsb25lKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNldChpdGVtLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBjbG9uZShpdGVtW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgYXMgVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gXCJmdW5jdGlvblwiID8gbnVsbCA6IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjbG9uZShvYmopO1xyXG4gICAgfSAqL1xyXG5cclxuICAgIC8vIEBAXHJcbiAgICAvLyBwcm9wcyBlLmc6IHsgaXRlbUlEOiBcImFzY2VuZGluZ1wiIH0sIHsgaXRlbUlEOiBcImRlc2NlbmRpbmdcIiB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHNvcnRfYnlfcHJvcHM8VD4ob2JqQXJyOiBUW10sIHByb3BzOiBQcm9wc1R5cGUpOiBUW10ge1xyXG4gICAgICAgIHJldHVybiBvYmpBcnIuc29ydCgob2JqQTogVCwgb2JqQjogVCkgPT4gdGhpcy5fY29tcGFyZV9ieV9wcm9wczxUPihvYmpBLCBvYmpCLCBwcm9wcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIEBAXHJcbiAgICByZXR1cm46IG9yZGVyICgxIHwgLTEgfCAwKVxyXG4gICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9jb21wYXJlX2J5X3Byb3BzPFQ+KG9iakE6IFQsIG9iakI6IFQsIHByb3BzOiBQcm9wc1R5cGUpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqQSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2Ygb2JqQiAhPT0gXCJvYmplY3RcIikgcmV0dXJuIDA7XHJcbiAgICAgICAgLy8gYXNjZW5kaW5nKHTEg25nIGThuqduKSwgZGVzY2VuZGluZyhnaeG6o20gZOG6p24pXHJcbiAgICAgICAgY29uc3Qgb3JkZXJzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHByb3BzQXJyOiBQcm9wc1R5cGVbXSA9IFtdO1xyXG4gICAgICAgIGlmIChwcm9wcyAmJiB0eXBlb2YgcHJvcHMgPT09IFwib2JqZWN0XCIpIHByb3BzQXJyLnB1c2gocHJvcHMpO1xyXG4gICAgICAgIC8vIFxyXG4gICAgICAgIGlmIChwcm9wc0Fyci5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIC8vIGFzY2VuZGluZyBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iakEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpBW2tleV0gPiBvYmpCW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBvcmRlcnMucHVzaCgxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvYmpBW2tleV0gIT09IG9iakJba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVycy5wdXNoKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9yZGVycy5wdXNoKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHMgPSBwcm9wc0FycltpXTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNjID0gcHJvcHNba2V5XSA9PT0gXCJhc2NlbmRpbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqQVtrZXldID4gb2JqQltrZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVycy5wdXNoKGFzYyA/IDEgOiAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqQVtrZXldICE9PSBvYmpCW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJzLnB1c2goYXNjID8gLTEgOiAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVycy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXIgb2Ygb3JkZXJzKSB7XHJcbiAgICAgICAgICAgIGlmIChvcmRlciA9PT0gMSB8fCBvcmRlciA9PT0gLTEpIHJldHVybiBvcmRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IC8vIGVuZDogX2NvbXBhcmVfYnlfcHJvcHNcclxuXHJcbiAgICAvLyBAIChraMO0bmcgc+G7rSBk4bulbmcgbsOqbiBjaGVjayBt4buZdCBs4bqnbilcclxuICAgIC8qIHB1YmxpYyBzdGF0aWMgZmluZF9wbHVzKHBhdGg6IHN0cmluZywgcm9vdD86IGNjLk5vZGUpOiBjYy5Ob2RlIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKCFwYXRoIHx8IHR5cGVvZiBwYXRoICE9PSBcInN0cmluZ1wiKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBsZXQgY3VycmVudE5vZGU6IGNjLlNjZW5lIHwgY2MuTm9kZSA9IHJvb3Q7XHJcbiAgICAgICAgaWYgKCFyb290IHx8ICEocm9vdCBpbnN0YW5jZW9mIGNjLk5vZGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjZW5lOiBjYy5TY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XHJcbiAgICAgICAgICAgIGlmICghc2NlbmUpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IHNjZW5lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gcGF0aFswXSAhPT0gJy8nID8gMCA6IDE7XHJcbiAgICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gcGF0aC5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQ6IHN0cmluZ1tdID0gc2VnbWVudHNbaV0uc3BsaXQoXCIkXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gc2VnbWVudC5sZW5ndGggPT09IDIgPyBwYXJzZUludChzZWdtZW50WzFdKSA6IDA7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWU6IHN0cmluZyA9IHNlZ21lbnRbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuOiBjYy5Ob2RlW10gPSBjdXJyZW50Tm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSB8fCBjaGlsZHJlbi5sZW5ndGggPCAxKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50Tm9kZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcclxuICAgIH0gKi9cclxuXHJcbiAgICAvLyBAQCAobm90IHVzZWQpXHJcbiAgICAvKiBwdWJsaWMgc3RhdGljIGRhbWFnZV9mbG9hdChiYXNlRGFtYWdlOiBudW1iZXIsIG1pbk11bHRpcGxpZXI6IG51bWJlciwgbWF4TXVsdGlwbGllcjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBzaWduID0gTWF0aC5yYW5kb20oKSA+IDAuNSA/IC0xIDogMTtcclxuICAgICAgICBjb25zdCBtaW5EYW1hZ2UgPSBNYXRoLmZsb29yKGJhc2VEYW1hZ2UgKiBtaW5NdWx0aXBsaWVyKTtcclxuICAgICAgICBjb25zdCBtYXhEYW1hZ2UgPSBNYXRoLmZsb29yKGJhc2VEYW1hZ2UgKiBtYXhNdWx0aXBsaWVyKTtcclxuICAgICAgICByZXR1cm4gYmFzZURhbWFnZSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhEYW1hZ2UgLSBtaW5EYW1hZ2UpICsgbWluRGFtYWdlKSAqIHNpZ247XHJcbiAgICB9ICovXHJcblxyXG4gICAgLy8gQEAgKG5vdCB1c2VkKVxyXG4gICAgLyogcHVibGljIHN0YXRpYyBzY3JvbGxfbnVtKHRhcmdldDogY2MuTm9kZSwgZHVyYXRpb246IG51bWJlciwgc3RhcnRWYWx1ZTogbnVtYmVyLCBlbmRWYWx1ZTogbnVtYmVyLCBjYWxsYmFjazogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmcmFtZXMgPSBNYXRoLmZsb29yKDYwICogZHVyYXRpb24pO1xyXG4gICAgICAgIGxldCBlbGFwc2VkID0gMDtcclxuICAgICAgICB0YXJnZXQuc2NoZWR1bGUoKGRlbHRhVGltZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGNjLm1pc2MubGVycChzdGFydFZhbHVlLCBlbmRWYWx1ZSwgZWxhcHNlZCAvIGR1cmF0aW9uKSk7XHJcbiAgICAgICAgICAgIGVsYXBzZWQgKz0gZGVsdGFUaW1lO1xyXG4gICAgICAgIH0sIDAsIGZyYW1lcyk7XHJcbiAgICB9ICovXHJcblxyXG4gICAgLy8gQEAgKG5vdCB1c2VkKVxyXG4gICAgLyogcHVibGljIHN0YXRpYyBwbGF5X25vcm1hbF9hbmltKGFuaW1hdGlvbjogY2MuQW5pbWF0aW9uLCBjbGlwTmFtZTogc3RyaW5nLCBjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWFuaW1hdGlvbiB8fCAhKGFuaW1hdGlvbiBpbnN0YW5jZW9mIGNjLkFuaW1hdGlvbikgfHwgIWNsaXBOYW1lIHx8IHR5cGVvZiBjbGlwTmFtZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuO1xyXG4gICAgICAgIGFuaW1hdGlvbi50YXJnZXRPZmYodGhpcyk7XHJcbiAgICAgICAgYW5pbWF0aW9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBhbmltYXRpb24ub25jZShjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgYW5pbWF0aW9uLnBsYXkoY2xpcE5hbWUsIDApO1xyXG4gICAgfSAqL1xyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgc3RhdGljIGFsaWduX3dpdGhfcGFyZW50KG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIW5vZGUgfHwgIShub2RlIGluc3RhbmNlb2YgY2MuTm9kZSkpIHJldHVybjtcclxuICAgICAgICBsZXQgd2lkZ2V0OiBjYy5XaWRnZXQgPSBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIGlmICghd2lkZ2V0KSB3aWRnZXQgPSBub2RlLmFkZENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB3aWRnZXQuaXNBbGlnbkxlZnQgPSB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICB3aWRnZXQudG9wID0gd2lkZ2V0LmJvdHRvbSA9IHdpZGdldC5sZWZ0ID0gd2lkZ2V0LnJpZ2h0ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAQFxyXG4gICAgcHVibGljIHN0YXRpYyBzYXZlX2pzb25fZmlsZShmaWxlbmFtZTogc3RyaW5nLCBkYXRhOiBvYmplY3QgfCBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFmaWxlbmFtZSB8fCB0eXBlb2YgZmlsZW5hbWUgIT09IFwic3RyaW5nXCIgfHwgIWRhdGEpIHJldHVybjtcclxuICAgICAgICBsZXQgZGF0YVN0cjogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgZGF0YVN0ciA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGFTdHIgPSBkYXRhLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICBhLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCxcIiArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhU3RyKSk7XHJcbiAgICAgICAgYS5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLCBmaWxlbmFtZSk7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50c1wiKTtcclxuICAgICAgICAgICAgZXZlbnQuaW5pdEV2ZW50KFwiY2xpY2tcIiwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGEuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYS5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAQCAobm90IHVzZWQpXHJcbiAgICAvKiBwdWJsaWMgc3RhdGljIGdldF9kYXRlX3N0cigpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIHJldHVybiBgJHt5ZWFyfS0ke21vbnRoIDwgMTAgPyBcIjBcIiA6IFwiXCJ9JHttb250aH0tJHtkYXkgPCAxMCA/IFwiMFwiIDogXCJcIn0ke2RheX1gO1xyXG4gICAgfSAqL1xyXG59XHJcbiJdfQ==