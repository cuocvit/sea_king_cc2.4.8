// +-+
import { NodePoolItem } from './NodePoolItem';
import { gm } from './GameManager';

const { ccclass, property } = cc._decorator;

@ccclass
class NoticeItem extends NodePoolItem {
    private _data: string | undefined;

    @property(cc.RichText)
    private content_txt: cc.RichText | null = null;

    get data(): string | undefined {
        return this._data;
    }

    public set data(value: string) {
        this._data = value;
        if (this.content_txt) {
            this.content_txt.string = value;
        }
        this.scheduleOnce(() => {
            gm.pool.put(this.node);
        }, 1);
    }

    public unuse(): void {
        super.unuse();
        this._data = undefined;
        if (this.content_txt) {
            this.content_txt.string = "";
        }
    }
}

export { NoticeItem };