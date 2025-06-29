// @
export class ConstantsData {
    // @
    private static _instance: ConstantsData = null;
    // public readonly CLOSE_BTN_DELAY_TIME: number; // (not used)
    public readonly MAX_FIGHT_TIME: number;
    // @
    constructor() {
        // this.CLOSE_BTN_DELAY_TIME = 1;
        this.MAX_FIGHT_TIME = 180;
    }

    // @
    public static get instance(): ConstantsData {
        return this._instance || (this._instance = new ConstantsData());
    }
}
