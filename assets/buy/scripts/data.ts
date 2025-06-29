import { rewardArr } from "../../common/configs/ladder_building";

interface data {
    reward_id: number;
    reward_num: number;
    reward_price: number;
}
// export class BuyItemData {
//     public readonly _data: Record<number, BuyItem>;

//     constructor() {
//         this._data = {};
//     }
// }

export class BuyItemData {
    public state: number;
    public reward_array: rewardArr[]; // ?
    public reward_price: number;
    public reward_itemId: number;

    constructor() {
        this.state = 1;
        this.reward_array = [];
        this.reward_price = 0;
    }
}
