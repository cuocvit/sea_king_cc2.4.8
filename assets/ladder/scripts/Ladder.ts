import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { ListView } from '../../start-scene/scripts/ListView';
import { LadderBuildingRankItem } from './LadderBuildingRankItem';
import { LadderRankItem } from './LadderRankItem';

const { ccclass, property } = cc._decorator;

@ccclass
export class Ladder extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private anywhere_close_btn: cc.Button = null;

    @property([cc.Toggle])
    private tab_tog_array: cc.Toggle[] = [];

    @property(cc.Node)
    private rank_node: cc.Node = null;

    @property(ListView)
    private ladder_rank_list: ListView = null;

    @property(LadderRankItem)
    private self_rank_item: LadderRankItem = null;

    @property(cc.Button)
    private rank_left_btn: cc.Button = null;

    @property(cc.Button)
    private rank_right_btn: cc.Button = null;

    @property(cc.Label)
    private rank_page_lbl: cc.Label = null;

    @property(cc.Node)
    private building_rank_node: cc.Node = null;

    @property(ListView)
    private ladder_building_rank_list: ListView = null;

    @property(LadderBuildingRankItem)
    private self_building_rank_item: LadderBuildingRankItem = null;

    @property(cc.Button)
    private building_rank_left_btn: cc.Button = null;

    @property(cc.Button)
    private building_rank_right_btn: cc.Button = null;

    @property(cc.Label)
    private building_rank_page_lbl: cc.Label = null;

    @property(cc.Node)
    private achievement_node: cc.Node = null;

    @property(cc.Label)
    private achievement_star_lbl: cc.Label = null;

    @property(ListView)
    private ladder_achievement_list: ListView = null;

    private _tab_index: number;
    private _rank_page: number;
    private _rank_total_page: number;
    private _building_rank_page: number;
    private _building_rank_total_page: number;
    private _page_item_count: number;

    private constructor() {
        super();
        this._tab_index = -1;
        this._rank_page = 1;
        this._rank_total_page = 1;
        this._building_rank_page = 1;
        this._building_rank_total_page = 1;
        this._page_item_count = 6;
    }

    protected onEnable(): void {
        if (- 1 == this._tab_index) {
            this._tab_index = 0;
            const defaultTab = this.tab_tog_array[this._tab_index];
            if (!defaultTab.isChecked) {
                defaultTab.check();
                defaultTab.isChecked = true;
            }
            this.editor_on_toggle_change_handler(defaultTab);
        }
    }

    protected onDisable(): void {
        this.ladder_rank_list.reset();
        this.ladder_building_rank_list.reset();
        this.ladder_achievement_list.reset();
        this._tab_index = -1;
        this.rank_node.active = false;
        this.building_rank_node.active = false;
        this.achievement_node.active = false;
    }

    private editor_on_button_click_handler(event: cc.Event.EventTouch): void {

        if (event.target == this.close_btn.node || event.target == this.anywhere_close_btn.node) {
            gm.ui.async_hide_module(gm.const.Ladder);

        } else if (event.target == this.rank_left_btn.node) {
            if (1 < this._rank_page) {
                this._rank_page--;
                this.rank_page_lbl.string = this._rank_page + "/" + this._rank_total_page;
                const startIndex = (this._rank_page - 1) * this._page_item_count;
                const endIndex = Math.min(startIndex + this._page_item_count, gm.data.ladder_temp_data.ladder_rank_item_data_array.length - 1);
                const currentPageRankData = gm.data.ladder_temp_data.ladder_rank_item_data_array.slice(startIndex, endIndex);
                this.ladder_rank_list.setData(currentPageRankData);
            }

        } else if (event.target == this.rank_right_btn.node) {
            if (this._rank_page < this._rank_total_page) {
                this._rank_page++;
                this.rank_page_lbl.string = this._rank_page + "/" + this._rank_total_page;
                const startIndex = (this._rank_page - 1) * this._page_item_count;
                const endIndex = Math.min(startIndex + this._page_item_count, gm.data.ladder_temp_data.ladder_rank_item_data_array.length - 1);
                const currentPageRankData = gm.data.ladder_temp_data.ladder_rank_item_data_array.slice(startIndex, endIndex);
                this.ladder_rank_list.setData(currentPageRankData);
            }

        } else if (event.target == this.building_rank_left_btn.node) {
            if (1 < this._building_rank_page) {
                this._building_rank_page--;
                this.building_rank_page_lbl.string = this._building_rank_page + "/" + this._building_rank_total_page;
                const startIndex = (this._building_rank_page - 1) * this._page_item_count;
                const endIndex = Math.min(startIndex + this._page_item_count, gm.data.ladder_temp_data.ladder_building_rank_item_data_array.length - 1);
                const currentPageBuildingRankData = gm.data.ladder_temp_data.ladder_building_rank_item_data_array.slice(startIndex, endIndex);
                this.ladder_building_rank_list.setData(currentPageBuildingRankData);
            }

        } else if (event.target == this.building_rank_right_btn.node && this._building_rank_page < this._building_rank_total_page) {
            this._building_rank_page++;
            this.building_rank_page_lbl.string = this._building_rank_page + "/" + this._building_rank_total_page;
            const startIndex = (this._building_rank_page - 1) * this._page_item_count;
            const endIndex = Math.min(startIndex + this._page_item_count, gm.data.ladder_temp_data.ladder_building_rank_item_data_array.length - 1);
            const currentPageBuildingRankData = gm.data.ladder_temp_data.ladder_building_rank_item_data_array.slice(startIndex, endIndex);
            this.ladder_building_rank_list.setData(currentPageBuildingRankData);
        }
    }

    private editor_on_toggle_change_handler(toggle: cc.Toggle): void {
        this._tab_index = this.tab_tog_array.indexOf(toggle);
        this.rank_node.active = false;
        this.building_rank_node.active = false;
        this.achievement_node.active = false;

        if (0 == this._tab_index) {
            this.rank_node.active = true;
            this.update_rank_view();
        } else if (1 == this._tab_index) {
            this.building_rank_node.active = true;
            this.update_building_rank_view();
        } else if (2 == this._tab_index) {
            this.achievement_node.active = true;
            this.update_achievement_view();
        }
    }

    private update_rank_view(): void {
        const { ladder_temp_data } = gm.data;
        ladder_temp_data.async_get_ladder_rank_item_data_array(() => {
            this.self_rank_item.data = ladder_temp_data.self_rank_item_data;
            this._rank_total_page = Math.max(1, Math.ceil(ladder_temp_data.ladder_rank_item_data_array.length / this._page_item_count));
            this._rank_page = 1;
            this.rank_page_lbl.string = `${this._rank_page}/${this._rank_total_page}`;

            const startIdx = (this._rank_page - 1) * this._page_item_count;
            const endIdx = Math.min(startIdx + this._page_item_count, ladder_temp_data.ladder_rank_item_data_array.length);
            const data = ladder_temp_data.ladder_rank_item_data_array.slice(startIdx, endIdx);

            this.ladder_rank_list.setData(data);
        });
    }

    private update_building_rank_view(): void {
        const { ladder_temp_data } = gm.data;

        ladder_temp_data.async_get_building_rank_item_data_array(() => {
            this.self_building_rank_item.data = ladder_temp_data.self_building_rank_item_data;
            this._building_rank_total_page = Math.max(1, Math.ceil(ladder_temp_data.ladder_building_rank_item_data_array.length / this._page_item_count));
            this._building_rank_page = 1;
            this.building_rank_page_lbl.string = `${this._building_rank_page}/${this._building_rank_total_page}`;

            const startIdx = (this._building_rank_page - 1) * this._page_item_count;
            const endIdx = Math.min(startIdx + this._page_item_count, ladder_temp_data.ladder_building_rank_item_data_array.length);
            const data = ladder_temp_data.ladder_building_rank_item_data_array.slice(startIdx, endIdx);

            this.ladder_building_rank_list.setData(data);
        });
    }

    private update_achievement_view(): void {
        const tempData = gm.data.ladder_temp_data;
        this.achievement_star_lbl.string = `Số sao tích lũy：${gm.data.ladder_data.total_star}`;
        this.ladder_achievement_list.setData(tempData.ladder_achievement_data_array);
    }
}