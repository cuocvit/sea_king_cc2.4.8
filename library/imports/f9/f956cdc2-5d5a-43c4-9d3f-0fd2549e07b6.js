"use strict";
cc._RF.push(module, 'f956c3CXVpDxJ0/D9JUnge2', 'ListView');
// start-scene/scripts/ListView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListView = exports.Direction = void 0;
var ListViewItem_1 = require("./ListViewItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var Direction;
(function (Direction) {
    Direction[Direction["HORIZONTAL"] = 0] = "HORIZONTAL";
    Direction[Direction["VERTICAL"] = 1] = "VERTICAL";
    Direction[Direction["NONE"] = 2] = "NONE";
})(Direction = exports.Direction || (exports.Direction = {}));
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.content = null;
        _this.itemPrefab = null;
        _this.contentBrother = null;
        _this.selectBoxPrefab = null;
        _this.isMultiSelect = false;
        _this.direction = Direction.NONE;
        _this.groupSize = 0;
        _this.spacing = new cc.Vec2(0, 0);
        _this.positionNodeList = [];
        _this._maxItemCount = 0;
        _this._itemList = [];
        _this._dataList = [];
        _this._selectIndexList = {};
        _this._selectIndex = -1;
        _this._selectBoxList = {};
        _this._selectBoxPool = new cc.NodePool();
        _this._placeholderList = {};
        _this._placeholderPool = new cc.NodePool();
        _this._lastStartIndex = 0;
        _this._curStartIndex = 0;
        _this._itemSizeList = {};
        return _this;
    }
    Object.defineProperty(ListView.prototype, "_direction", {
        get: function () {
            return this.direction;
        },
        set: function (value) {
            this.direction = value;
            this.updateProperty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListView.prototype, "_groupSize", {
        get: function () {
            return this.groupSize;
        },
        set: function (value) {
            this.groupSize = value;
            this.updateProperty();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListView.prototype, "_spacing", {
        get: function () {
            return this.spacing;
        },
        set: function (value) {
            this.spacing = value;
            this.updateProperty();
        },
        enumerable: false,
        configurable: true
    });
    ListView.prototype.onLoad = function () {
        this.updateProperty();
    };
    ListView.prototype.onEnable = function () {
        if (this.scrollView) {
            this.scrollView.node.on("scroll-began", this.onListScrollHandler, this);
            this.scrollView.node.on("scrolling", this.onListScrollHandler, this);
            this.scrollView.node.on("scroll-ended", this.onListScrollHandler, this);
        }
        if (this.contentBrother && this.selectBoxPrefab) {
            this.content.on("position-changed", this.onNodeChangeHandler, this);
            this.content.on("size-changed", this.onNodeChangeHandler, this);
        }
    };
    ListView.prototype.preCreateItems = function (count, shouldCreate) {
        if (shouldCreate === void 0) { shouldCreate = true; }
        if (!(count < 0)) {
            if (shouldCreate) {
                var maxCount = Math.min(count, this.getMaxItemCount());
                if (this._itemList.length < maxCount)
                    for (var index = this._itemList.length; index < maxCount; index++) {
                        this.createItem(false);
                    }
            }
            else {
                var item = void 0;
                for (var index = 0; index < this.content.childrenCount; index++) {
                    item =
                        this.content.children[index].getComponent(ListViewItem_1.ListViewItem);
                    this._itemList.push(item);
                }
            }
            if (this._itemList.length != this.content.childrenCount) {
                cc.warn("item 列表长度与孩子节点数不相等");
            }
        }
    };
    ListView.prototype.getPositionByIndex = function (index) {
        if (index < 0) {
            cc.warn("索引不能小于0");
            return cc.Vec2.ZERO;
        }
        if (!this._itemSizeList.hasOwnProperty(index.toString())) {
            cc.warn("error index:%d", index);
        }
        Math.floor(index / this._groupSize);
        var itemIndex = Math.floor(index % this._groupSize);
        var position = cc.Vec2.ZERO;
        if (this._direction == Direction.HORIZONTAL) {
            position.x = this.calcX(0, index, this._groupSize, this._spacing.x);
            position.y =
                -1 * this.calcY(index - itemIndex, index, 1, this._spacing.y);
        }
        else if (this._direction == Direction.VERTICAL) {
            position.x = this.calcX(index - itemIndex, index, 1, this._spacing.x);
            position.y =
                -1 * this.calcY(0, index, this._groupSize, this._spacing.y);
        }
        var anchor = cc.v2(0, 1);
        var contentAnchor = this.content.getAnchorPoint();
        if (anchor.x != contentAnchor.x || anchor.y != contentAnchor.y) {
            return this.convertAnchor(position, this.getContentSize(), anchor, contentAnchor);
        }
        else {
            return position;
        }
    };
    ListView.prototype.calcX = function (start, end, groupSize, spacing) {
        var totalWidth = 0;
        var rowCount = Math.floor(end / groupSize);
        for (var index = start; index <= end; index += groupSize) {
            var itemWidth = (this._itemSizeList[index] || this.itemPrefab.data).width;
            totalWidth +=
                index < rowCount * groupSize
                    ? itemWidth + spacing
                    : 0.5 * itemWidth;
        }
        return totalWidth;
    };
    ListView.prototype.calcY = function (start, end, groupSize, spacing) {
        var totalHeight = 0;
        var rowCount = Math.floor(end / groupSize);
        for (var index = start; index <= end; index += groupSize) {
            var itemHeight = (this._itemSizeList[index] || this.itemPrefab.data).height;
            totalHeight +=
                index < rowCount * groupSize
                    ? itemHeight + spacing
                    : 0.5 * itemHeight;
        }
        return totalHeight;
    };
    ListView.prototype.getItemData = function (index) {
        var endIndex = this._lastStartIndex + this._maxItemCount - 1;
        if (!(index < this._lastStartIndex || endIndex < index)) {
            return this._itemList[index % this._maxItemCount].data;
        }
    };
    ListView.prototype.setItemData = function (index, data) {
        var endIndex = this._lastStartIndex + this._maxItemCount - 1;
        if (index >= this._lastStartIndex &&
            endIndex >= index &&
            data != null) {
            this._dataList[index] = data;
            this._itemList[index % this._maxItemCount].data = data;
        }
    };
    ListView.prototype.getItem = function (index) {
        var endIndex = this._lastStartIndex + this._maxItemCount - 1;
        if (!(index < this._lastStartIndex || endIndex < index)) {
            return this._itemList[index % this._maxItemCount];
        }
    };
    Object.defineProperty(ListView.prototype, "selectIndex", {
        get: function () {
            return this._selectIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListView.prototype, "selectIndexList", {
        get: function () {
            var result = [];
            for (var t in this._selectIndexList) {
                result.push(parseInt(t));
            }
            return result;
        },
        enumerable: false,
        configurable: true
    });
    ListView.prototype.getSelect = function (index) {
        return this._selectIndexList[index];
    };
    ListView.prototype.setSelect = function (index, selected) {
        var item;
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
                            }
                            else {
                                this._selectBoxList[index] = cc.instantiate(this.selectBoxPrefab);
                            }
                            this.contentBrother.addChild(this._selectBoxList[index], 1);
                        }
                        if (this._direction != Direction.NONE) {
                            this._selectBoxList[index].setPosition(this.getPositionByIndex(index));
                            item = this.getItem(index);
                            if (item) {
                                item.select = true;
                            }
                        }
                        else {
                            item = this.getItem(index);
                            if (item) {
                                this._selectBoxList[index].setPosition(item.node.getPosition());
                            }
                        }
                    }
                }
            }
            else {
                item = this.getItem(index);
                if (item) {
                    item.select = false;
                }
                delete this._selectIndexList[index];
                if (this.selectBoxPrefab &&
                    this.contentBrother &&
                    this._selectBoxList[index]) {
                    this._selectBoxPool.put(this._selectBoxList[index]);
                    delete this._selectBoxList[index];
                }
            }
            if (index < this._dataList.length) {
                this.dispatchEvent("item-selected", true, selected);
            }
        }
    };
    ListView.prototype.getData = function () {
        return this._dataList;
    };
    ListView.prototype.setData = function (data) {
        var item;
        var args = [];
        for (var index = 1; index < arguments.length; index++) {
            args[index - 1] = arguments[index];
        }
        if (!(data == null || this._groupSize < 0)) {
            this._dataList = data;
            this._maxItemCount = this.getMaxItemCount();
            this.content.setContentSize(this.getContentSize());
            for (var index = 0; index < data.length; index++) {
                item = this._itemList[index % this._maxItemCount];
                item = item ? item : this.createItem(true, args);
                item.node.active = true;
                if (index >= this._lastStartIndex &&
                    index < this._lastStartIndex + this._maxItemCount) {
                    this.updateItemByIndex(index);
                }
                if (item.interactable) {
                    item.node.off("touchend", this.onItemClickHandler, this);
                    item.node.on("touchend", this.onItemClickHandler, this);
                    if (!cc.sys.isMobile) {
                        item.node.off(cc.Node.EventType.MOUSE_ENTER, this.onItemMouseEnterHandler, this);
                        item.node.on(cc.Node.EventType.MOUSE_ENTER, this.onItemMouseEnterHandler, this);
                        item.node.off(cc.Node.EventType.MOUSE_LEAVE, this.onItemMouseLeaveHandler, this);
                        item.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onItemMouseLeaveHandler, this);
                    }
                }
            }
            for (var index = this._lastStartIndex + this._itemList.length - 1; index >= data.length; index--) {
                if (index >= 0 && index < this._itemList.length) {
                    this._itemList[index].reset();
                    this._itemList[index].node.active = false;
                }
            }
        }
    };
    ListView.prototype.reset = function (shouldReset) {
        if (shouldReset === void 0) { shouldReset = true; }
        if (shouldReset) {
            if (this._selectIndex > -1) {
                this.setSelect(this._selectIndex, false);
                this._selectIndex = -1;
            }
            for (var key in this._selectIndexList) {
                this.setSelect(parseInt(key), false);
            }
            this._itemSizeList = {};
            this._lastStartIndex = 0;
            if (this.scrollView) {
                this.scrollView.stopAutoScroll();
                if (this._direction == Direction.VERTICAL) {
                    this.scrollView.content.height = 0;
                }
                else if (this._direction == Direction.HORIZONTAL) {
                    this.scrollView.content.width = 0;
                }
            }
        }
        for (var key in this._placeholderList) {
            this._placeholderPool.put(this._placeholderList[key]);
            delete this._placeholderList[key];
        }
        for (var index = this._itemList.length - 1; 0 <= index; index--) {
            if (this._itemList[index].interactable) {
                this._itemList[index].node.off("touchend", this.onItemClickHandler, this);
            }
            this._itemList[index].reset();
            if (shouldReset) {
                this._itemList[index].node.active = false;
            }
        }
    };
    ListView.prototype.release = function () {
        this.reset();
        this._dataList = [];
        for (var index = this._itemList.length - 1; 0 <= index; index--) {
            this._itemList[index].release();
            this._itemList.pop().node.destroy();
        }
        this._selectBoxPool.clear();
        this._placeholderPool.clear();
    };
    ListView.prototype.onDisable = function () {
        if (this.scrollView) {
            this.scrollView.node.off("scroll-began", this.onListScrollHandler, this);
            this.scrollView.node.off("scrolling", this.onListScrollHandler, this);
            this.scrollView.node.off("scroll-ended", this.onListScrollHandler, this);
        }
        if (this.contentBrother && this.selectBoxPrefab) {
            this.content.off("position-changed", this.onNodeChangeHandler, this);
            this.content.off("size-changed", this.onNodeChangeHandler, this);
        }
    };
    ListView.prototype.onListScrollHandler = function () {
        var position = this.scrollView.content.getPosition();
        this.scrollView.content.setPosition(Math.floor(position.x), Math.floor(position.y));
        this.updateItemList();
    };
    ListView.prototype.updateItemList = function (shouldUpdate) {
        if (shouldUpdate === void 0) { shouldUpdate = false; }
        this._curStartIndex = this.getStartIndexByOffset(this.scrollView.getScrollOffset());
        if (shouldUpdate) {
            var endIndex = Math.min(this._curStartIndex + this._maxItemCount, this._dataList.length);
            for (var index = this._curStartIndex; index < endIndex; index++) {
                this.updateItemByIndex(index);
            }
            this.content.setContentSize(this.getContentSize());
            this._lastStartIndex = this._curStartIndex;
        }
        else if (this._curStartIndex != this._lastStartIndex) {
            for (var index = this._curStartIndex; index < this._curStartIndex + this._maxItemCount; index++) {
                if (0 <= index &&
                    index < this._dataList.length &&
                    (index < this._lastStartIndex ||
                        index >= this._lastStartIndex + this._maxItemCount)) {
                    this.updateItemByIndex(index);
                    this.content.setContentSize(this.getContentSize());
                }
            }
            this._lastStartIndex = this._curStartIndex;
        }
    };
    ListView.prototype.updateItemByIndex = function (index) {
        var item = this._itemList[index % this._maxItemCount];
        if (item) {
            item.reset();
            item.index = index;
            item.data = this._dataList[index];
            item.select = this._selectIndexList[index];
            this._itemSizeList[index] = item.node.getContentSize();
            if (this._direction != Direction.NONE) {
                item.node.setPosition(this.getPositionByIndex(index));
            }
            else {
                item.node.setPosition(this.positionNodeList[index].position);
            }
        }
    };
    ListView.prototype.scrollToLeft = function (offset, animate) {
        if (offset === void 0) { offset = 0; }
        if (animate === void 0) { animate = true; }
        if (offset >= 0 || this.scrollView) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToLeft(offset, animate);
            if (0 == offset) {
                this.updateItemList();
            }
        }
    };
    ListView.prototype.scrollToRight = function (offset, animate) {
        if (offset === void 0) { offset = 0; }
        if (animate === void 0) { animate = true; }
        if (offset < 0 || this.scrollView) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToRight(offset, animate);
            if (0 == offset) {
                this.updateItemList();
            }
        }
    };
    ListView.prototype.scrollToTop = function (offset, animate) {
        if (offset === void 0) { offset = 0; }
        if (animate === void 0) { animate = true; }
        if (offset < 0 || !this.scrollView || 0 != this._dataList.length) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToTop(offset, animate);
            if (0 == offset) {
                this.updateItemList();
            }
        }
    };
    ListView.prototype.scrollToBottom = function (offset, animate) {
        if (offset === void 0) { offset = 0; }
        if (animate === void 0) { animate = true; }
        if (offset < 0 || this.scrollView) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToBottom(offset, animate);
            if (0 == offset) {
                this.updateItemList();
            }
        }
    };
    ListView.prototype.scrollToIndex = function (index, offset, animate) {
        if (offset === void 0) { offset = 0; }
        if (animate === void 0) { animate = true; }
        if (this._groupSize <= 0 ||
            !this.scrollView ||
            index < 0 ||
            index < this._dataList.length) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToOffset(this.getOffsetByIndex(index), offset, animate);
            if (0 == offset) {
                this.updateItemList();
            }
        }
    };
    ListView.prototype.getOffsetByIndex = function (index) {
        if (!(this._groupSize <= 0) && this.scrollView) {
            var groupIndex;
            var offset = cc.v2();
            var maxScrollOffset = this.scrollView.getMaxScrollOffset();
            if (this._direction == Direction.HORIZONTAL) {
                groupIndex = Math.floor(index / this._groupSize);
                if (this._itemSizeList[groupIndex * this._groupSize]) {
                    groupIndex =
                        this._itemSizeList[groupIndex * this._groupSize].width;
                }
                else {
                    groupIndex = this.itemPrefab.data.width;
                }
                offset.x = Math.min(this.calcX(0, index, this._groupSize, this._spacing.x) -
                    0.5 * groupIndex, maxScrollOffset.x);
                offset.y = maxScrollOffset.y;
            }
            else if (this._direction == Direction.VERTICAL) {
                groupIndex = Math.floor(index / this._groupSize);
                if (this._itemSizeList[groupIndex * this._groupSize]) {
                    groupIndex =
                        this._itemSizeList[groupIndex * this._groupSize].height;
                }
                else {
                    groupIndex = this.itemPrefab.data.height;
                }
                offset.x = maxScrollOffset.x;
                offset.y = Math.min(this.calcY(0, index, this._groupSize, this._spacing.y) -
                    0.5 * groupIndex, maxScrollOffset.y);
            }
            return offset;
        }
    };
    ListView.prototype.getStartIndexByOffset = function (offset) {
        var startIndex = 0;
        var accumulatedSize = 0;
        if (this._direction == Direction.VERTICAL) {
            for (var index = 0; index < this._dataList.length; index += this.groupSize) {
                accumulatedSize +=
                    (this._itemSizeList[index] || this.itemPrefab.data).height +
                        this._spacing.y;
                if (accumulatedSize > offset.y) {
                    startIndex = index;
                    break;
                }
            }
        }
        else if (this._direction == Direction.HORIZONTAL) {
            for (var index = 0; index < this._dataList.length; index += this.groupSize) {
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
    };
    ListView.prototype.updateProperty = function () {
        if (this.content && this.itemPrefab && this.scrollView) {
            this.scrollView.horizontal =
                this._direction == Direction.HORIZONTAL;
            this.scrollView.vertical = this._direction == Direction.VERTICAL;
        }
    };
    ListView.prototype.getMaxItemCount = function (groupSize) {
        if (groupSize === void 0) { groupSize = 1; }
        if (!(this._groupSize < 0)) {
            if (this._groupSize == 0) {
                return this._dataList.length;
            }
            var maxCount = 0;
            if (this._direction == Direction.HORIZONTAL) {
                maxCount =
                    (groupSize +
                        Math.ceil(this.node.width /
                            (this.itemPrefab.data.width + this._spacing.x))) *
                        this._groupSize;
            }
            else if (this._direction == Direction.VERTICAL) {
                maxCount =
                    (groupSize +
                        Math.ceil(this.node.height /
                            (this.itemPrefab.data.height + this._spacing.y))) *
                        this._groupSize;
            }
            else if (this._direction == Direction.NONE) {
                maxCount = this._dataList.length;
            }
            return maxCount;
        }
    };
    ListView.prototype.getContentSize = function () {
        if (this._groupSize <= 0 || !this._dataList) {
            return cc.Size.ZERO;
        }
        var totalItems = Math.max(Math.ceil(this._dataList.length / this._groupSize) *
            this._groupSize, this._maxItemCount);
        for (var index = 0; index < totalItems; index++) {
            if (!this._itemSizeList[index]) {
                this._itemSizeList[index] =
                    this.itemPrefab.data.getContentSize();
            }
        }
        var contentSize = cc.Size.ZERO;
        var groupCount = 0;
        var itemCount = 0;
        if (this._direction == Direction.HORIZONTAL) {
            itemCount = Math.max(this._groupSize - 1, 0);
            groupCount = Math.max(Math.floor((this._dataList.length - 1) / this._groupSize), 0);
            contentSize.width =
                this.calcX(0, this._dataList.length - 1, this._groupSize, this._spacing.x) +
                    0.5 * this._itemSizeList[groupCount * this._groupSize].width;
            contentSize.height =
                this.calcY(0, itemCount, 1, this._spacing.y) +
                    0.5 * this._itemSizeList[itemCount].height;
        }
        else if (this._direction == Direction.VERTICAL) {
            groupCount = Math.max(this._groupSize - 1, 0);
            itemCount = Math.max(Math.floor((this._dataList.length - 1) / this._groupSize), 0);
            contentSize.width =
                this.calcX(0, groupCount, 1, this._spacing.x) +
                    0.5 * this._itemSizeList[groupCount].width;
            contentSize.height =
                this.calcY(0, this._dataList.length - 1, this._groupSize, this._spacing.y) +
                    0.5 * this._itemSizeList[itemCount * this._groupSize].height;
        }
        return contentSize;
    };
    ListView.prototype.convertAnchor = function (anchor, size, a, b) {
        if (null == anchor ||
            null == size ||
            null == a ||
            null == b ||
            (a.x == b.x && a.y == b.y)) {
            return anchor || cc.Vec2.ZERO;
        }
        else {
            b = cc.v2(a.x - b.x, a.y - b.y);
            return cc.v2(anchor.x + b.x * size.width, anchor.y + b.y * size.height);
        }
    };
    ListView.prototype.dispatchEvent = function (eventName, eventType, detail) {
        var event = new cc.Event.EventCustom(eventName, eventType);
        event.detail = detail;
        this.node.dispatchEvent(event);
    };
    ListView.prototype.onItemClickHandler = function (event) {
        var item = event.target.getComponent(ListViewItem_1.ListViewItem);
        if (item) {
            if (this.isMultiSelect) {
                this.setSelect(item.index, !this.getSelect(item.index));
            }
            else {
                this.setSelect(this._selectIndex, false);
                this.setSelect(item.index, true);
            }
            this.dispatchEvent("item-click", true, item);
        }
    };
    ListView.prototype.onItemMouseEnterHandler = function (event) {
        var item = event.target.getComponent(ListViewItem_1.ListViewItem);
        if (item) {
            this.dispatchEvent("item-mouse-enter", true, item);
        }
    };
    ListView.prototype.onItemMouseLeaveHandler = function (event) {
        var item = event.target.getComponent(ListViewItem_1.ListViewItem);
        if (item) {
            this.dispatchEvent("item-mouse-leave", true, item);
        }
    };
    ListView.prototype.onNodeChangeHandler = function () {
        this.contentBrother.setPosition(this.content.getPosition());
        this.contentBrother.setContentSize(this.content.getContentSize());
    };
    ListView.prototype.createItem = function (active, args) {
        var itemNode = cc.instantiate(this.itemPrefab);
        var item = itemNode.getComponent(ListViewItem_1.ListViewItem);
        if (!item) {
            cc.error("没有找到继承ListViewItem的组件");
        }
        item.init.apply(item, args);
        itemNode.active = active;
        this.content.addChild(itemNode);
        this._itemList.push(item);
        return item;
    };
    ListView.prototype.deleteItem = function (index) {
        if (index < 0 || index < this._itemList.length) {
            this._itemList[index].node.destroy();
            this._itemList.splice(index, 1);
            this.updateProperty();
        }
    };
    __decorate([
        property({ type: cc.ScrollView, tooltip: "滚动视图，可空" })
    ], ListView.prototype, "scrollView", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "Item的父节点" })
    ], ListView.prototype, "content", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "item模板" })
    ], ListView.prototype, "itemPrefab", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "选中框和占位符的父节点" })
    ], ListView.prototype, "contentBrother", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "选中框模板，可空" })
    ], ListView.prototype, "selectBoxPrefab", void 0);
    __decorate([
        property({ tooltip: "是否可以多选,单选不能取消选择，多选可以取消选择" })
    ], ListView.prototype, "isMultiSelect", void 0);
    __decorate([
        property({ type: cc.Enum(Direction), tooltip: "列表滚动方向" })
    ], ListView.prototype, "direction", void 0);
    __decorate([
        property({
            type: cc.Integer,
            min: 0,
            tooltip: "组的大小，垂直滚动时一行为一组，水平滚动时一列为一组",
        })
    ], ListView.prototype, "groupSize", void 0);
    __decorate([
        property({ tooltip: "item间距, X行间距 Y列间距" })
    ], ListView.prototype, "spacing", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "坐标列表" })
    ], ListView.prototype, "positionNodeList", void 0);
    ListView = __decorate([
        ccclass,
        menu("添加自定义组件/ListView")
    ], ListView);
    return ListView;
}(cc.Component));
exports.ListView = ListView;

cc._RF.pop();