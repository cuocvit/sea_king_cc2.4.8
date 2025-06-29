// +-+

export class Event {
    private _type: string;
    private _param: any | null;

    constructor(type0: string, param0: any | null = null) {
        this._type = type0;
        this._param = param0;
    }

    public get type(): string {
        return this._type;
    }

    public get param(): any | null {
        return this._param;
    }

    private static CONNECT: string = "connect";
    public static DATA: string = "data";
    private static CLOSE: string = "close";
    private static ERROR: string = "error";
}
