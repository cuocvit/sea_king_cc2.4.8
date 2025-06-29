const { ccclass, property } = cc._decorator;

@ccclass
export class ListViewItem extends cc.Component {
    private _index: number;
    public _select: boolean;
    private _interactable: boolean;
    public _data: any;

    constructor() {
        super();
        this._index = -1;
        this._select = false;
        this._interactable = true;
    }

    public init(...args: any[]): void {
        // Initialization logic can be added here
    }

    public get index(): number {
        return this._index;
    }

    public set index(value: number) {
        this._index = value;
    }

    public get select(): boolean {
        return this._select;
    }

    public set select(value: boolean) {
        this._select = value;
    }

    public get interactable(): boolean {
        return this._interactable;
    }

    public set interactable(value: boolean) {
        this._interactable = value;
    }

    public get data(): any {
        return this._data;
    }

    public set data(value: any) {
        if (value != null) {
            this._data = value;
        }
    }

    public reset(): void {
        this._data = null;
        this._index = -1;
        this.select = false;
        this.interactable = true;
    }

    public release(): void {
        // Release logic can be added here
    }

    public update_view() { };
}