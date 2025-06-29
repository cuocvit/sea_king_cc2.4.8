function decycle<T>(t: T, n?: (value: T) => T): any {
    const r = new WeakMap<object, string>();
    return function a(e: T, i: string): any {
        let t: string | undefined;
        let o: any;
        e = n !== undefined ? n(e) : e;
        if (typeof e !== "object" || e === null || e instanceof Boolean || e instanceof Date || e instanceof Number || e instanceof RegExp || e instanceof String) {
            return e;
        }
        if ((t = r.get(e)) !== undefined) {
            return { $ref: t };
        }
        r.set(e, i);
        if (Array.isArray(e)) {
            o = [];
            e.forEach((t: T, e: number) => {
                o[e] = a(t, `${i}[${e}]`);
            });
        } else {
            o = {};
            Object.keys(e).forEach((t: string) => {
                o[t] = a(e[t], `${i}[${JSON.stringify(t)}]`);
            });
        }
        return o;
    }(t, "$");
}

function retrocycle(value: any): any {
    const px = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\(?:[\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*")\])*$/;
    return function rez(value: any): void {
        if (value && typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach((element: any, i: number) => {
                    let path: string | undefined;
                    if (typeof element === "object" && element !== null) {
                        path = element.$ref;
                        if (typeof path === "string" && px.test(path)) {
                            value[i] = eval(path);
                        } else {
                            rez(element);
                        }
                    }
                });
            } else {
                Object.keys(value).forEach((name: string) => {
                    const item = value[name];
                    let path: string | undefined;
                    if (typeof item === "object" && item !== null) {
                        path = item.$ref;
                        if (typeof path === "string" && px.test(path)) {
                            value[name] = eval(path);
                        } else {
                            rez(item);
                        }
                    }
                });
            }
        }
    }(value);
}