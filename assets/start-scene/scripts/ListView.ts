//
import { BuyItemData } from "../../buy/scripts/data";
import { rewardArr } from "../../common/configs/ladder_building";
import {
    BasePropItemData,
    FightHeroItemData,
    FightResultData,
    FightResultPropItemData,
    FightRewardItemData,
} from "./FightTempData";
import {
    LadderAchievementItemData,
    LadderBuildingRankItemData,
    LadderRankItemData,
} from "./LadderTempData";
import { ListViewItem } from "./ListViewItem";
import {
    MailHeroItemData,
    MailInboxItemData,
    MailLogItemData,
} from "./MailTempData";
import { SignItemData } from "./SignData";
import { StoreItemData } from "./StoreData";
import { LocalHeroItemVO } from "./TempData";
import { TurtleExchangeItemData } from "./TurtleExchangeData";

const { ccclass, property, menu } = cc._decorator;

export enum Direction {
    HORIZONTAL = 0,
    VERTICAL = 1,
    NONE = 2,
}
export type SetData =
    | FightResultData
    | FightHeroItemData
    | FightRewardItemData
    | FightResultPropItemData
    | LadderRankItemData
    | BasePropItemData
    | LadderBuildingRankItemData
    | LadderAchievementItemData
    | rewardArr
    | MailLogItemData
    | MailInboxItemData
    | MailHeroItemData
    | StoreItemData
    | LocalHeroItemVO
    | TurtleExchangeItemData
    | SignItemData
    | BuyItemData;

@ccclass
@menu("添加自定义组件/ListView")
export class ListView extends cc.Component {
    @property({ type: cc.ScrollView, tooltip: "滚动视图，可空" })
    public scrollView: cc.ScrollView | null = null;

    @property({ type: cc.Node, tooltip: "Item的父节点" })
    private content: cc.Node | null = null;

    @property({ type: cc.Prefab, tooltip: "item模板" })
    private itemPrefab: cc.Prefab | null = null;

    @property({ type: cc.Node, tooltip: "选中框和占位符的父节点" })
    private contentBrother: cc.Node | null = null;

    @property({ type: cc.Prefab, tooltip: "选中框模板，可空" })
    private selectBoxPrefab: cc.Prefab | null = null;

    @property({ tooltip: "是否可以多选,单选不能取消选择，多选可以取消选择" })
    private isMultiSelect: boolean = false;

    @property({ type: cc.Enum(Direction), tooltip: "列表滚动方向" })
    private direction: Direction = Direction.NONE;

    @property({
        type: cc.Integer,
        min: 0,
        tooltip: "组的大小，垂直滚动时一行为一组，水平滚动时一列为一组",
    })
    private groupSize: number = 0;

    @property({ tooltip: "item间距, X行间距 Y列间距" })
    private spacing: cc.Vec2 = new cc.Vec2(0, 0);

    @property({ type: cc.Node, tooltip: "坐标列表" })
    private positionNodeList: cc.Node[] = [];

    private _maxItemCount: number = 0;
    private _itemList: ListViewItem[] = [];
    private _dataList: SetData[] = [];
    private _selectIndexList: { [key: number]: boolean } = {};
    private _selectIndex: number = -1;
    private _selectBoxList: { [key: number]: cc.Node } = {};
    private _selectBoxPool: cc.NodePool = new cc.NodePool();
    private _placeholderList: { [key: number]: cc.Node } = {};
    private _placeholderPool: cc.NodePool = new cc.NodePool();
    private _lastStartIndex: number = 0;
    private _curStartIndex: number = 0;
    private _itemSizeList: Record<number, cc.Size> = {};

    public get _direction(): Direction {
        return this.direction;
    }

    public set _direction(value: Direction) {
        this.direction = value;
        this.updateProperty();
    }

    public get _groupSize(): number {
        return this.groupSize;
    }

    public set _groupSize(value: number) {
        this.groupSize = value;
        this.updateProperty();
    }

    public get _spacing(): cc.Vec2 {
        return this.spacing;
    }

    public set _spacing(value: cc.Vec2) {
        this.spacing = value;
        this.updateProperty();
    }

    protected onLoad(): void {
        this.updateProperty();
    }

    protected onEnable(): void {
        if (this.scrollView) {
            this.scrollView.node.on(
                "scroll-began",
                this.onListScrollHandler,
                this
            );
            this.scrollView.node.on(
                "scrolling",
                this.onListScrollHandler,
                this
            );
            this.scrollView.node.on(
                "scroll-ended",
                this.onListScrollHandler,
                this
            );
        }

        if (this.contentBrother && this.selectBoxPrefab) {
            this.content.on("position-changed", this.onNodeChangeHandler, this);
            this.content.on("size-changed", this.onNodeChangeHandler, this);
        }
    }

    private preCreateItems(count: number, shouldCreate: boolean = true): void {
        if (!(count < 0)) {
            if (shouldCreate) {
                const maxCount = Math.min(count, this.getMaxItemCount());
                if (this._itemList.length < maxCount)
                    for (
                        let index = this._itemList.length;
                        index < maxCount;
                        index++
                    ) {
                        this.createItem(false);
                    }
            } else {
                let item: ListViewItem;
                for (
                    let index = 0;
                    index < this.content.childrenCount;
                    index++
                ) {
                    item =
                        this.content.children[index].getComponent(ListViewItem);
                    this._itemList.push(item);
                }
            }

            if (this._itemList.length != this.content.childrenCount) {
                cc.warn("item 列表长度与孩子节点数不相等");
            }
        }
    }

    private getPositionByIndex(index: number): cc.Vec2 {
        if (index < 0) {
            cc.warn("索引不能小于0");
            return cc.Vec2.ZERO;
        }
        if (!this._itemSizeList.hasOwnProperty(index.toString())) {
            cc.warn("error index:%d", index);
        }

        Math.floor(index / this._groupSize);
        const itemIndex = Math.floor(index % this._groupSize);
        const position = cc.Vec2.ZERO;

        if (this._direction == Direction.HORIZONTAL) {
            position.x = this.calcX(0, index, this._groupSize, this._spacing.x);
            position.y =
                -1 * this.calcY(index - itemIndex, index, 1, this._spacing.y);
        } else if (this._direction == Direction.VERTICAL) {
            position.x = this.calcX(
                index - itemIndex,
                index,
                1,
                this._spacing.x
            );
            position.y =
                -1 * this.calcY(0, index, this._groupSize, this._spacing.y);
        }

        const anchor = cc.v2(0, 1);
        const contentAnchor = this.content.getAnchorPoint();

        if (anchor.x != contentAnchor.x || anchor.y != contentAnchor.y) {
            return this.convertAnchor(
                position,
                this.getContentSize(),
                anchor,
                contentAnchor
            );
        } else {
            return position;
        }
    }

    private calcX(
        start: number,
        end: number,
        groupSize: number,
        spacing: number
    ): number {
        let totalWidth = 0;
        const rowCount = Math.floor(end / groupSize);
        for (let index = start; index <= end; index += groupSize) {
            const itemWidth = (
                this._itemSizeList[index] || this.itemPrefab.data
            ).width;
            totalWidth +=
                index < rowCount * groupSize
                    ? itemWidth + spacing
                    : 0.5 * itemWidth;
        }
        return totalWidth;
    }

    private calcY(
        start: number,
        end: number,
        groupSize: number,
        spacing: number
    ): number {
        let totalHeight = 0;
        const rowCount = Math.floor(end / groupSize);
        for (let index = start; index <= end; index += groupSize) {
            const itemHeight = (
                this._itemSizeList[index] || this.itemPrefab.data
            ).height;
            totalHeight +=
                index < rowCount * groupSize
                    ? itemHeight + spacing
                    : 0.5 * itemHeight;
        }
        return totalHeight;
    }

    private getItemData(index: number): ListViewItem {
        const endIndex = this._lastStartIndex + this._maxItemCount - 1;
        if (!(index < this._lastStartIndex || endIndex < index)) {
            return this._itemList[index % this._maxItemCount].data;
        }
    }

    private setItemData(index: number, data: SetData): void {
        const endIndex = this._lastStartIndex + this._maxItemCount - 1;
        if (
            index >= this._lastStartIndex &&
            endIndex >= index &&
            data != null
        ) {
            this._dataList[index] = data;
            this._itemList[index % this._maxItemCount].data = data;
        }
    }

    public getItem(index: number): ListViewItem {
        const endIndex = this._lastStartIndex + this._maxItemCount - 1;
        if (!(index < this._lastStartIndex || endIndex < index)) {
            return this._itemList[index % this._maxItemCount];
        }
    }

    public get selectIndex(): number {
        return this._selectIndex;
    }

    public get selectIndexList(): number[] {
        const result = [];
        for (const t in this._selectIndexList) {
            result.push(parseInt(t));
        }
        return result;
    }

    private getSelect(index: number): boolean {
        return this._selectIndexList[index];
    }

    private setSelect(index: number, selected: boolean): void {
        let item: ListViewItem;
        if (index >= 0 && this.getSelect(index) != selected) {
            this._selectIndex = index;
            if (selected) {
                if (index < this._dataList.length) {
                    this._selectIndexList[index] = true;
                    if (this.selectBoxPrefab && this.contentBrother) {
                        if (!this._selectBoxList[index]) {
                            if (this._selectBoxPool.size() > 0) {
                                this._selectBoxList[index] =
                                    this._selectBoxPool.get();
                            } else {
                                this._selectBoxList[index] = cc.instantiate(
                                    this.selectBoxPrefab
                                );
                            }

                            this.contentBrother.addChild(
                                this._selectBoxList[index],
                                1
                            );
                        }

                        if (this._direction != Direction.NONE) {
                            this._selectBoxList[index].setPosition(
                                this.getPositionByIndex(index)
                            );
                            item = this.getItem(index);
                            if (item) {
                                item.select = true;
                            }
                        } else {
                            item = this.getItem(index);
                            if (item) {
                                this._selectBoxList[index].setPosition(
                                    item.node.getPosition()
                                );
                            }
                        }
                    }
                }
            } else {
                item = this.getItem(index);
                if (item) {
                    item.select = false;
                }
                delete this._selectIndexList[index];
                if (
                    this.selectBoxPrefab &&
                    this.contentBrother &&
                    this._selectBoxList[index]
                ) {
                    this._selectBoxPool.put(this._selectBoxList[index]);
                    delete this._selectBoxList[index];
                }
            }

            if (index < this._dataList.length) {
                this.dispatchEvent("item-selected", true, selected);
            }
        }
    }

    private getData(): SetData[] {
        return this._dataList;
    }

    public setData(data: SetData[]): void {
        let item: ListViewItem;
        const args: IArguments[] = [];
        for (let index = 1; index < arguments.length; index++) {
            args[index - 1] = arguments[index];
        }
        if (!(data == null || this._groupSize < 0)) {
            this._dataList = data;
            this._maxItemCount = this.getMaxItemCount();
            this.content.setContentSize(this.getContentSize());

            for (let index = 0; index < data.length; index++) {
                item = this._itemList[index % this._maxItemCount];
                item = item ? item : this.createItem(true, args);
                item.node.active = true;

                if (
                    index >= this._lastStartIndex &&
                    index < this._lastStartIndex + this._maxItemCount
                ) {
                    this.updateItemByIndex(index);
                }
                if (item.interactable) {
                    item.node.off("touchend", this.onItemClickHandler, this);
                    item.node.on("touchend", this.onItemClickHandler, this);
                    if (!cc.sys.isMobile) {
                        item.node.off(
                            cc.Node.EventType.MOUSE_ENTER,
                            this.onItemMouseEnterHandler,
                            this
                        );
                        item.node.on(
                            cc.Node.EventType.MOUSE_ENTER,
                            this.onItemMouseEnterHandler,
                            this
                        );
                        item.node.off(
                            cc.Node.EventType.MOUSE_LEAVE,
                            this.onItemMouseLeaveHandler,
                            this
                        );
                        item.node.on(
                            cc.Node.EventType.MOUSE_LEAVE,
                            this.onItemMouseLeaveHandler,
                            this
                        );
                    }
                }
            }

            for (
                let index = this._lastStartIndex + this._itemList.length - 1;
                index >= data.length;
                index--
            ) {
                if (index >= 0 && index < this._itemList.length) {
                    this._itemList[index].reset();
                    this._itemList[index].node.active = false;
                }
            }
        }
    }

    public reset(shouldReset: boolean = true): void {
        if (shouldReset) {
            if (this._selectIndex > -1) {
                this.setSelect(this._selectIndex, false);
                this._selectIndex = -1;
            }

            for (const key in this._selectIndexList) {
                this.setSelect(parseInt(key), false);
            }

            this._itemSizeList = {};
            this._lastStartIndex = 0;
            if (this.scrollView) {
                this.scrollView.stopAutoScroll();
                if (this._direction == Direction.VERTICAL) {
                    this.scrollView.content.height = 0;
                } else if (this._direction == Direction.HORIZONTAL) {
                    this.scrollView.content.width = 0;
                }
            }
        }
        for (const key in this._placeholderList) {
            this._placeholderPool.put(this._placeholderList[key]);
            delete this._placeholderList[key];
        }

        for (let index = this._itemList.length - 1; 0 <= index; index--) {
            if (this._itemList[index].interactable) {
                this._itemList[index].node.off(
                    "touchend",
                    this.onItemClickHandler,
                    this
                );
            }
            this._itemList[index].reset();
            if (shouldReset) {
                this._itemList[index].node.active = false;
            }
        }
    }

    private release(): void {
        this.reset();
        this._dataList = [];
        for (let index = this._itemList.length - 1; 0 <= index; index--) {
            this._itemList[index].release();
            this._itemList.pop().node.destroy();
        }
        this._selectBoxPool.clear();
        this._placeholderPool.clear();
    }

    protected onDisable(): void {
        if (this.scrollView) {
            this.scrollView.node.off(
                "scroll-began",
                this.onListScrollHandler,
                this
            );
            this.scrollView.node.off(
                "scrolling",
                this.onListScrollHandler,
                this
            );
            this.scrollView.node.off(
                "scroll-ended",
                this.onListScrollHandler,
                this
            );
        }
        if (this.contentBrother && this.selectBoxPrefab) {
            this.content.off(
                "position-changed",
                this.onNodeChangeHandler,
                this
            );
            this.content.off("size-changed", this.onNodeChangeHandler, this);
        }
    }

    private onListScrollHandler(): void {
        const position = this.scrollView.content.getPosition();
        this.scrollView.content.setPosition(
            Math.floor(position.x),
            Math.floor(position.y)
        );
        this.updateItemList();
    }

    private updateItemList(shouldUpdate: boolean = false): void {
        this._curStartIndex = this.getStartIndexByOffset(
            this.scrollView.getScrollOffset()
        );
        if (shouldUpdate) {
            const endIndex = Math.min(
                this._curStartIndex + this._maxItemCount,
                this._dataList.length
            );
            for (let index = this._curStartIndex; index < endIndex; index++) {
                this.updateItemByIndex(index);
            }
            this.content.setContentSize(this.getContentSize());
            this._lastStartIndex = this._curStartIndex;
        } else if (this._curStartIndex != this._lastStartIndex) {
            for (
                let index = this._curStartIndex;
                index < this._curStartIndex + this._maxItemCount;
                index++
            ) {
                if (
                    0 <= index &&
                    index < this._dataList.length &&
                    (index < this._lastStartIndex ||
                        index >= this._lastStartIndex + this._maxItemCount)
                ) {
                    this.updateItemByIndex(index);
                    this.content.setContentSize(this.getContentSize());
                }
            }

            this._lastStartIndex = this._curStartIndex;
        }
    }

    private updateItemByIndex(index: number): void {
        const item = this._itemList[index % this._maxItemCount];
        if (item) {
            item.reset();
            item.index = index;
            item.data = this._dataList[index] as FightRewardItemData;
            item.select = this._selectIndexList[index];
            this._itemSizeList[index] = item.node.getContentSize();

            if (this._direction != Direction.NONE) {
                item.node.setPosition(this.getPositionByIndex(index));
            } else {
                item.node.setPosition(this.positionNodeList[index].position);
            }
        }
    }

    private scrollToLeft(offset: number = 0, animate: boolean = true): void {
        if (offset >= 0 || this.scrollView) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToLeft(offset, animate);
            if (0 == offset) {
                this.updateItemList();
            }
        }
    }

    private scrollToRight(offset: number = 0, animate: boolean = true): void {
        if (offset < 0 || this.scrollView) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToRight(offset, animate);
            if (0 == offset) {
                this.updateItemList();
            }
        }
    }

    public scrollToTop(offset: number = 0, animate: boolean = true): void {
        if (offset < 0 || !this.scrollView || 0 != this._dataList.length) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToTop(offset, animate);
            if (0 == offset) {
                this.updateItemList();
            }
        }
    }

    private scrollToBottom(offset: number = 0, animate: boolean = true): void {
        if (offset < 0 || this.scrollView) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToBottom(offset, animate);
            if (0 == offset) {
                this.updateItemList();
            }
        }
    }

    private scrollToIndex(
        index: number,
        offset: number = 0,
        animate: boolean = true
    ): void {
        if (
            this._groupSize <= 0 ||
            !this.scrollView ||
            index < 0 ||
            index < this._dataList.length
        ) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToOffset(
                this.getOffsetByIndex(index),
                offset,
                animate
            );
            if (0 == offset) {
                this.updateItemList();
            }
        }
    }

    private getOffsetByIndex(index: number): cc.Vec2 | undefined {
        if (!(this._groupSize <= 0) && this.scrollView) {
            var groupIndex: number;
            const offset = cc.v2();
            const maxScrollOffset = this.scrollView.getMaxScrollOffset();
            if (this._direction == Direction.HORIZONTAL) {
                groupIndex = Math.floor(index / this._groupSize);
                if (this._itemSizeList[groupIndex * this._groupSize]) {
                    groupIndex =
                        this._itemSizeList[groupIndex * this._groupSize].width;
                } else {
                    groupIndex = this.itemPrefab.data.width;
                }

                offset.x = Math.min(
                    this.calcX(0, index, this._groupSize, this._spacing.x) -
                        0.5 * groupIndex,
                    maxScrollOffset.x
                );
                offset.y = maxScrollOffset.y;
            } else if (this._direction == Direction.VERTICAL) {
                groupIndex = Math.floor(index / this._groupSize);
                if (this._itemSizeList[groupIndex * this._groupSize]) {
                    groupIndex =
                        this._itemSizeList[groupIndex * this._groupSize].height;
                } else {
                    groupIndex = this.itemPrefab.data.height;
                }

                offset.x = maxScrollOffset.x;
                offset.y = Math.min(
                    this.calcY(0, index, this._groupSize, this._spacing.y) -
                        0.5 * groupIndex,
                    maxScrollOffset.y
                );
            }

            return offset;
        }
    }

    private getStartIndexByOffset(offset: cc.Vec2): number {
        let startIndex = 0;
        let accumulatedSize = 0;
        if (this._direction == Direction.VERTICAL) {
            for (
                let index = 0;
                index < this._dataList.length;
                index += this.groupSize
            ) {
                accumulatedSize +=
                    (this._itemSizeList[index] || this.itemPrefab.data).height +
                    this._spacing.y;
                if (accumulatedSize > offset.y) {
                    startIndex = index;
                    break;
                }
            }
        } else if (this._direction == Direction.HORIZONTAL) {
            for (
                let index = 0;
                index < this._dataList.length;
                index += this.groupSize
            ) {
                accumulatedSize +=
                    (this._itemSizeList[index] || this.itemPrefab.data).width +
                    this._spacing.x;
                if (accumulatedSize > -offset.x) {
                    startIndex = index;
                    break;
                }
            }
        }
        return Math.min(Math.max(startIndex, 0), this._dataList.length - 1);
    }

    private updateProperty(): void {
        if (this.content && this.itemPrefab && this.scrollView) {
            this.scrollView.horizontal =
                this._direction == Direction.HORIZONTAL;
            this.scrollView.vertical = this._direction == Direction.VERTICAL;
        }
    }

    private getMaxItemCount(groupSize: number = 1): number {
        if (!(this._groupSize < 0)) {
            if (this._groupSize == 0) {
                return this._dataList.length;
            }
            var maxCount = 0;
            if (this._direction == Direction.HORIZONTAL) {
                maxCount =
                    (groupSize +
                        Math.ceil(
                            this.node.width /
                                (this.itemPrefab.data.width + this._spacing.x)
                        )) *
                    this._groupSize;
            } else if (this._direction == Direction.VERTICAL) {
                maxCount =
                    (groupSize +
                        Math.ceil(
                            this.node.height /
                                (this.itemPrefab.data.height + this._spacing.y)
                        )) *
                    this._groupSize;
            } else if (this._direction == Direction.NONE) {
                maxCount = this._dataList.length;
            }

            return maxCount;
        }
    }

    private getContentSize(): cc.Size {
        if (this._groupSize <= 0 || !this._dataList) {
            return cc.Size.ZERO;
        }
        const totalItems = Math.max(
            Math.ceil(this._dataList.length / this._groupSize) *
                this._groupSize,
            this._maxItemCount
        );
        for (let index = 0; index < totalItems; index++) {
            if (!this._itemSizeList[index]) {
                this._itemSizeList[index] =
                    this.itemPrefab.data.getContentSize();
            }
        }
        const contentSize = cc.Size.ZERO;
        let groupCount = 0;
        let itemCount = 0;

        if (this._direction == Direction.HORIZONTAL) {
            itemCount = Math.max(this._groupSize - 1, 0);
            groupCount = Math.max(
                Math.floor((this._dataList.length - 1) / this._groupSize),
                0
            );
            contentSize.width =
                this.calcX(
                    0,
                    this._dataList.length - 1,
                    this._groupSize,
                    this._spacing.x
                ) +
                0.5 * this._itemSizeList[groupCount * this._groupSize].width;
            contentSize.height =
                this.calcY(0, itemCount, 1, this._spacing.y) +
                0.5 * this._itemSizeList[itemCount].height;
        } else if (this._direction == Direction.VERTICAL) {
            groupCount = Math.max(this._groupSize - 1, 0);
            itemCount = Math.max(
                Math.floor((this._dataList.length - 1) / this._groupSize),
                0
            );
            contentSize.width =
                this.calcX(0, groupCount, 1, this._spacing.x) +
                0.5 * this._itemSizeList[groupCount].width;
            contentSize.height =
                this.calcY(
                    0,
                    this._dataList.length - 1,
                    this._groupSize,
                    this._spacing.y
                ) +
                0.5 * this._itemSizeList[itemCount * this._groupSize].height;
        }

        return contentSize;
    }

    private convertAnchor(
        anchor: cc.Vec2 | null,
        size: { width: number; height: number } | null,
        a: cc.Vec2 | null,
        b: cc.Vec2 | null
    ): cc.Vec2 {
        if (
            null == anchor ||
            null == size ||
            null == a ||
            null == b ||
            (a.x == b.x && a.y == b.y)
        ) {
            return anchor || cc.Vec2.ZERO;
        } else {
            b = cc.v2(a.x - b.x, a.y - b.y);
            return cc.v2(
                anchor.x + b.x * size.width,
                anchor.y + b.y * size.height
            );
        }
    }

    private dispatchEvent(
        eventName: string,
        eventType: boolean,
        detail: boolean
    ): void {
        const event = new cc.Event.EventCustom(eventName, eventType);
        event.detail = detail;
        this.node.dispatchEvent(event);
    }

    private onItemClickHandler(event: cc.Event): void {
        const item = event.target.getComponent(ListViewItem);
        if (item) {
            if (this.isMultiSelect) {
                this.setSelect(item.index, !this.getSelect(item.index));
            } else {
                this.setSelect(this._selectIndex, false);
                this.setSelect(item.index, true);
            }
            this.dispatchEvent("item-click", true, item);
        }
    }

    private onItemMouseEnterHandler(event: cc.Event): void {
        const item = event.target.getComponent(ListViewItem);
        if (item) {
            this.dispatchEvent("item-mouse-enter", true, item);
        }
    }

    private onItemMouseLeaveHandler(event: cc.Event): void {
        const item = event.target.getComponent(ListViewItem);
        if (item) {
            this.dispatchEvent("item-mouse-leave", true, item);
        }
    }

    private onNodeChangeHandler(): void {
        this.contentBrother.setPosition(this.content.getPosition());
        this.contentBrother.setContentSize(this.content.getContentSize());
    }

    private createItem(active: boolean, args?: IArguments[]): ListViewItem {
        const itemNode = cc.instantiate(this.itemPrefab);
        const item = itemNode.getComponent(ListViewItem);

        if (!item) {
            cc.error("没有找到继承ListViewItem的组件");
        }
        item.init.apply(item, args);
        itemNode.active = active;
        this.content.addChild(itemNode);
        this._itemList.push(item);
        return item;
    }

    private deleteItem(index: number): void {
        if (index < 0 || index < this._itemList.length) {
            this._itemList[index].node.destroy();
            this._itemList.splice(index, 1);
            this.updateProperty();
        }
    }
}
