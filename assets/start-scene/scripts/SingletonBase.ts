// @@
export class SingletonBase {
    private static _instance: any = null;

    // private constructor() {}

    // @
    public static get_instance<T>(): T {
        if (this._instance === null) {
            this._instance = new this() as T;
        }
        return this._instance;
    }
}
