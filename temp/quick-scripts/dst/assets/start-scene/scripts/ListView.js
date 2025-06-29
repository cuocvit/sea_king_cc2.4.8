
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXExpc3RWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSwrQ0FBOEM7QUFXeEMsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFFbEQsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ2pCLHFEQUFjLENBQUE7SUFDZCxpREFBWSxDQUFBO0lBQ1oseUNBQVEsQ0FBQTtBQUNaLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtBQXNCRDtJQUE4Qiw0QkFBWTtJQUExQztRQUFBLHFFQXMxQkM7UUFwMUJVLGdCQUFVLEdBQXlCLElBQUksQ0FBQztRQUd2QyxhQUFPLEdBQW1CLElBQUksQ0FBQztRQUcvQixnQkFBVSxHQUFxQixJQUFJLENBQUM7UUFHcEMsb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBR3RDLHFCQUFlLEdBQXFCLElBQUksQ0FBQztRQUd6QyxtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUcvQixlQUFTLEdBQWMsU0FBUyxDQUFDLElBQUksQ0FBQztRQU90QyxlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBR3RCLGFBQU8sR0FBWSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBR3JDLHNCQUFnQixHQUFjLEVBQUUsQ0FBQztRQUVqQyxtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixlQUFTLEdBQW1CLEVBQUUsQ0FBQztRQUMvQixlQUFTLEdBQWMsRUFBRSxDQUFDO1FBQzFCLHNCQUFnQixHQUErQixFQUFFLENBQUM7UUFDbEQsa0JBQVksR0FBVyxDQUFDLENBQUMsQ0FBQztRQUMxQixvQkFBYyxHQUErQixFQUFFLENBQUM7UUFDaEQsb0JBQWMsR0FBZ0Is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RUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQzttREFDWDtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzsrQ0FDWjtJQU85QztRQUxDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTztZQUNoQixHQUFHLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSw0QkFBNEI7U0FDeEMsQ0FBQzsrQ0FDNEI7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQzs2Q0FDRTtJQUc3QztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztzREFDSjtJQWpDaEMsUUFBUTtRQUZwQixPQUFPO1FBQ1AsSUFBSSxDQUFDLGtCQUFrQixDQUFDO09BQ1osUUFBUSxDQXMxQnBCO0lBQUQsZUFBQztDQXQxQkQsQUFzMUJDLENBdDFCNkIsRUFBRSxDQUFDLFNBQVMsR0FzMUJ6QztBQXQxQlksNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL1xyXG5pbXBvcnQgeyBCdXlJdGVtRGF0YSB9IGZyb20gXCIuLi8uLi9idXkvc2NyaXB0cy9kYXRhXCI7XHJcbmltcG9ydCB7IHJld2FyZEFyciB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9sYWRkZXJfYnVpbGRpbmdcIjtcclxuaW1wb3J0IHtcclxuICAgIEJhc2VQcm9wSXRlbURhdGEsXHJcbiAgICBGaWdodEhlcm9JdGVtRGF0YSxcclxuICAgIEZpZ2h0UmVzdWx0RGF0YSxcclxuICAgIEZpZ2h0UmVzdWx0UHJvcEl0ZW1EYXRhLFxyXG4gICAgRmlnaHRSZXdhcmRJdGVtRGF0YSxcclxufSBmcm9tIFwiLi9GaWdodFRlbXBEYXRhXCI7XHJcbmltcG9ydCB7XHJcbiAgICBMYWRkZXJBY2hpZXZlbWVudEl0ZW1EYXRhLFxyXG4gICAgTGFkZGVyQnVpbGRpbmdSYW5rSXRlbURhdGEsXHJcbiAgICBMYWRkZXJSYW5rSXRlbURhdGEsXHJcbn0gZnJvbSBcIi4vTGFkZGVyVGVtcERhdGFcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXdJdGVtIH0gZnJvbSBcIi4vTGlzdFZpZXdJdGVtXCI7XHJcbmltcG9ydCB7XHJcbiAgICBNYWlsSGVyb0l0ZW1EYXRhLFxyXG4gICAgTWFpbEluYm94SXRlbURhdGEsXHJcbiAgICBNYWlsTG9nSXRlbURhdGEsXHJcbn0gZnJvbSBcIi4vTWFpbFRlbXBEYXRhXCI7XHJcbmltcG9ydCB7IFNpZ25JdGVtRGF0YSB9IGZyb20gXCIuL1NpZ25EYXRhXCI7XHJcbmltcG9ydCB7IFN0b3JlSXRlbURhdGEgfSBmcm9tIFwiLi9TdG9yZURhdGFcIjtcclxuaW1wb3J0IHsgTG9jYWxIZXJvSXRlbVZPIH0gZnJvbSBcIi4vVGVtcERhdGFcIjtcclxuaW1wb3J0IHsgVHVydGxlRXhjaGFuZ2VJdGVtRGF0YSB9IGZyb20gXCIuL1R1cnRsZUV4Y2hhbmdlRGF0YVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XHJcbiAgICBIT1JJWk9OVEFMID0gMCxcclxuICAgIFZFUlRJQ0FMID0gMSxcclxuICAgIE5PTkUgPSAyLFxyXG59XHJcbmV4cG9ydCB0eXBlIFNldERhdGEgPVxyXG4gICAgfCBGaWdodFJlc3VsdERhdGFcclxuICAgIHwgRmlnaHRIZXJvSXRlbURhdGFcclxuICAgIHwgRmlnaHRSZXdhcmRJdGVtRGF0YVxyXG4gICAgfCBGaWdodFJlc3VsdFByb3BJdGVtRGF0YVxyXG4gICAgfCBMYWRkZXJSYW5rSXRlbURhdGFcclxuICAgIHwgQmFzZVByb3BJdGVtRGF0YVxyXG4gICAgfCBMYWRkZXJCdWlsZGluZ1JhbmtJdGVtRGF0YVxyXG4gICAgfCBMYWRkZXJBY2hpZXZlbWVudEl0ZW1EYXRhXHJcbiAgICB8IHJld2FyZEFyclxyXG4gICAgfCBNYWlsTG9nSXRlbURhdGFcclxuICAgIHwgTWFpbEluYm94SXRlbURhdGFcclxuICAgIHwgTWFpbEhlcm9JdGVtRGF0YVxyXG4gICAgfCBTdG9yZUl0ZW1EYXRhXHJcbiAgICB8IExvY2FsSGVyb0l0ZW1WT1xyXG4gICAgfCBUdXJ0bGVFeGNoYW5nZUl0ZW1EYXRhXHJcbiAgICB8IFNpZ25JdGVtRGF0YVxyXG4gICAgfCBCdXlJdGVtRGF0YTtcclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KFwi5re75Yqg6Ieq5a6a5LmJ57uE5Lu2L0xpc3RWaWV3XCIpXHJcbmV4cG9ydCBjbGFzcyBMaXN0VmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5TY3JvbGxWaWV3LCB0b29sdGlwOiBcIua7muWKqOinhuWbvu+8jOWPr+epulwiIH0pXHJcbiAgICBwdWJsaWMgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIHRvb2x0aXA6IFwiSXRlbeeahOeItuiKgueCuVwiIH0pXHJcbiAgICBwcml2YXRlIGNvbnRlbnQ6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwiaXRlbeaooeadv1wiIH0pXHJcbiAgICBwcml2YXRlIGl0ZW1QcmVmYWI6IGNjLlByZWZhYiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIHRvb2x0aXA6IFwi6YCJ5Lit5qGG5ZKM5Y2g5L2N56ym55qE54i26IqC54K5XCIgfSlcclxuICAgIHByaXZhdGUgY29udGVudEJyb3RoZXI6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIHRvb2x0aXA6IFwi6YCJ5Lit5qGG5qih5p2/77yM5Y+v56m6XCIgfSlcclxuICAgIHByaXZhdGUgc2VsZWN0Qm94UHJlZmFiOiBjYy5QcmVmYWIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuaYr+WQpuWPr+S7peWkmumAiSzljZXpgInkuI3og73lj5bmtojpgInmi6nvvIzlpJrpgInlj6/ku6Xlj5bmtojpgInmi6lcIiB9KVxyXG4gICAgcHJpdmF0ZSBpc011bHRpU2VsZWN0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShEaXJlY3Rpb24pLCB0b29sdGlwOiBcIuWIl+ihqOa7muWKqOaWueWQkVwiIH0pXHJcbiAgICBwcml2YXRlIGRpcmVjdGlvbjogRGlyZWN0aW9uID0gRGlyZWN0aW9uLk5PTkU7XHJcblxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgIG1pbjogMCxcclxuICAgICAgICB0b29sdGlwOiBcIue7hOeahOWkp+Wwj++8jOWeguebtOa7muWKqOaXtuS4gOihjOS4uuS4gOe7hO+8jOawtOW5s+a7muWKqOaXtuS4gOWIl+S4uuS4gOe7hFwiLFxyXG4gICAgfSlcclxuICAgIHByaXZhdGUgZ3JvdXBTaXplOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwiaXRlbemXtOi3nSwgWOihjOmXtOi3nSBZ5YiX6Ze06LedXCIgfSlcclxuICAgIHByaXZhdGUgc3BhY2luZzogY2MuVmVjMiA9IG5ldyBjYy5WZWMyKDAsIDApO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIHRvb2x0aXA6IFwi5Z2Q5qCH5YiX6KGoXCIgfSlcclxuICAgIHByaXZhdGUgcG9zaXRpb25Ob2RlTGlzdDogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfbWF4SXRlbUNvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfaXRlbUxpc3Q6IExpc3RWaWV3SXRlbVtdID0gW107XHJcbiAgICBwcml2YXRlIF9kYXRhTGlzdDogU2V0RGF0YVtdID0gW107XHJcbiAgICBwcml2YXRlIF9zZWxlY3RJbmRleExpc3Q6IHsgW2tleTogbnVtYmVyXTogYm9vbGVhbiB9ID0ge307XHJcbiAgICBwcml2YXRlIF9zZWxlY3RJbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9zZWxlY3RCb3hMaXN0OiB7IFtrZXk6IG51bWJlcl06IGNjLk5vZGUgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0Qm94UG9vbDogY2MuTm9kZVBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyTGlzdDogeyBba2V5OiBudW1iZXJdOiBjYy5Ob2RlIH0gPSB7fTtcclxuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyUG9vbDogY2MuTm9kZVBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgIHByaXZhdGUgX2xhc3RTdGFydEluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfY3VyU3RhcnRJbmRleDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2l0ZW1TaXplTGlzdDogUmVjb3JkPG51bWJlciwgY2MuU2l6ZT4gPSB7fTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IF9kaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBfZGlyZWN0aW9uKHZhbHVlOiBEaXJlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvcGVydHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IF9ncm91cFNpemUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ncm91cFNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBfZ3JvdXBTaXplKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmdyb3VwU2l6ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvcGVydHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IF9zcGFjaW5nKCk6IGNjLlZlYzIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwYWNpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBfc3BhY2luZyh2YWx1ZTogY2MuVmVjMikge1xyXG4gICAgICAgIHRoaXMuc3BhY2luZyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvcGVydHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvcGVydHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVmlldykge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS5vbihcclxuICAgICAgICAgICAgICAgIFwic2Nyb2xsLWJlZ2FuXCIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGlzdFNjcm9sbEhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLm9uKFxyXG4gICAgICAgICAgICAgICAgXCJzY3JvbGxpbmdcIixcclxuICAgICAgICAgICAgICAgIHRoaXMub25MaXN0U2Nyb2xsSGFuZGxlcixcclxuICAgICAgICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3Lm5vZGUub24oXHJcbiAgICAgICAgICAgICAgICBcInNjcm9sbC1lbmRlZFwiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxpc3RTY3JvbGxIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29udGVudEJyb3RoZXIgJiYgdGhpcy5zZWxlY3RCb3hQcmVmYWIpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Lm9uKFwicG9zaXRpb24tY2hhbmdlZFwiLCB0aGlzLm9uTm9kZUNoYW5nZUhhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQub24oXCJzaXplLWNoYW5nZWRcIiwgdGhpcy5vbk5vZGVDaGFuZ2VIYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVDcmVhdGVJdGVtcyhjb3VudDogbnVtYmVyLCBzaG91bGRDcmVhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCEoY291bnQgPCAwKSkge1xyXG4gICAgICAgICAgICBpZiAoc2hvdWxkQ3JlYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhDb3VudCA9IE1hdGgubWluKGNvdW50LCB0aGlzLmdldE1heEl0ZW1Db3VudCgpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtTGlzdC5sZW5ndGggPCBtYXhDb3VudClcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9pdGVtTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4IDwgbWF4Q291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVJdGVtKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbTogTGlzdFZpZXdJdGVtO1xyXG4gICAgICAgICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4IDwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpbmRleF0uZ2V0Q29tcG9uZW50KExpc3RWaWV3SXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlbUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1MaXN0Lmxlbmd0aCAhPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybihcIml0ZW0g5YiX6KGo6ZW/5bqm5LiO5a2p5a2Q6IqC54K55pWw5LiN55u4562JXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb25CeUluZGV4KGluZGV4OiBudW1iZXIpOiBjYy5WZWMyIHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCLntKLlvJXkuI3og73lsI/kuo4wXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2l0ZW1TaXplTGlzdC5oYXNPd25Qcm9wZXJ0eShpbmRleC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiZXJyb3IgaW5kZXg6JWRcIiwgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTWF0aC5mbG9vcihpbmRleCAvIHRoaXMuX2dyb3VwU2l6ZSk7XHJcbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gTWF0aC5mbG9vcihpbmRleCAlIHRoaXMuX2dyb3VwU2l6ZSk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBjYy5WZWMyLlpFUk87XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLkhPUklaT05UQUwpIHtcclxuICAgICAgICAgICAgcG9zaXRpb24ueCA9IHRoaXMuY2FsY1goMCwgaW5kZXgsIHRoaXMuX2dyb3VwU2l6ZSwgdGhpcy5fc3BhY2luZy54KTtcclxuICAgICAgICAgICAgcG9zaXRpb24ueSA9XHJcbiAgICAgICAgICAgICAgICAtMSAqIHRoaXMuY2FsY1koaW5kZXggLSBpdGVtSW5kZXgsIGluZGV4LCAxLCB0aGlzLl9zcGFjaW5nLnkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGlyZWN0aW9uID09IERpcmVjdGlvbi5WRVJUSUNBTCkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbi54ID0gdGhpcy5jYWxjWChcclxuICAgICAgICAgICAgICAgIGluZGV4IC0gaXRlbUluZGV4LFxyXG4gICAgICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BhY2luZy54XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uLnkgPVxyXG4gICAgICAgICAgICAgICAgLTEgKiB0aGlzLmNhbGNZKDAsIGluZGV4LCB0aGlzLl9ncm91cFNpemUsIHRoaXMuX3NwYWNpbmcueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhbmNob3IgPSBjYy52MigwLCAxKTtcclxuICAgICAgICBjb25zdCBjb250ZW50QW5jaG9yID0gdGhpcy5jb250ZW50LmdldEFuY2hvclBvaW50KCk7XHJcblxyXG4gICAgICAgIGlmIChhbmNob3IueCAhPSBjb250ZW50QW5jaG9yLnggfHwgYW5jaG9yLnkgIT0gY29udGVudEFuY2hvci55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRBbmNob3IoXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29udGVudFNpemUoKSxcclxuICAgICAgICAgICAgICAgIGFuY2hvcixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRBbmNob3JcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY1goXHJcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcclxuICAgICAgICBlbmQ6IG51bWJlcixcclxuICAgICAgICBncm91cFNpemU6IG51bWJlcixcclxuICAgICAgICBzcGFjaW5nOiBudW1iZXJcclxuICAgICk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHRvdGFsV2lkdGggPSAwO1xyXG4gICAgICAgIGNvbnN0IHJvd0NvdW50ID0gTWF0aC5mbG9vcihlbmQgLyBncm91cFNpemUpO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnQ7IGluZGV4IDw9IGVuZDsgaW5kZXggKz0gZ3JvdXBTaXplKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1XaWR0aCA9IChcclxuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1TaXplTGlzdFtpbmRleF0gfHwgdGhpcy5pdGVtUHJlZmFiLmRhdGFcclxuICAgICAgICAgICAgKS53aWR0aDtcclxuICAgICAgICAgICAgdG90YWxXaWR0aCArPVxyXG4gICAgICAgICAgICAgICAgaW5kZXggPCByb3dDb3VudCAqIGdyb3VwU2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgID8gaXRlbVdpZHRoICsgc3BhY2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIDogMC41ICogaXRlbVdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG90YWxXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGNZKFxyXG4gICAgICAgIHN0YXJ0OiBudW1iZXIsXHJcbiAgICAgICAgZW5kOiBudW1iZXIsXHJcbiAgICAgICAgZ3JvdXBTaXplOiBudW1iZXIsXHJcbiAgICAgICAgc3BhY2luZzogbnVtYmVyXHJcbiAgICApOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB0b3RhbEhlaWdodCA9IDA7XHJcbiAgICAgICAgY29uc3Qgcm93Q291bnQgPSBNYXRoLmZsb29yKGVuZCAvIGdyb3VwU2l6ZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBzdGFydDsgaW5kZXggPD0gZW5kOyBpbmRleCArPSBncm91cFNpemUpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUhlaWdodCA9IChcclxuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1TaXplTGlzdFtpbmRleF0gfHwgdGhpcy5pdGVtUHJlZmFiLmRhdGFcclxuICAgICAgICAgICAgKS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9XHJcbiAgICAgICAgICAgICAgICBpbmRleCA8IHJvd0NvdW50ICogZ3JvdXBTaXplXHJcbiAgICAgICAgICAgICAgICAgICAgPyBpdGVtSGVpZ2h0ICsgc3BhY2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIDogMC41ICogaXRlbUhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvdGFsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SXRlbURhdGEoaW5kZXg6IG51bWJlcik6IExpc3RWaWV3SXRlbSB7XHJcbiAgICAgICAgY29uc3QgZW5kSW5kZXggPSB0aGlzLl9sYXN0U3RhcnRJbmRleCArIHRoaXMuX21heEl0ZW1Db3VudCAtIDE7XHJcbiAgICAgICAgaWYgKCEoaW5kZXggPCB0aGlzLl9sYXN0U3RhcnRJbmRleCB8fCBlbmRJbmRleCA8IGluZGV4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXRlbUxpc3RbaW5kZXggJSB0aGlzLl9tYXhJdGVtQ291bnRdLmRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0SXRlbURhdGEoaW5kZXg6IG51bWJlciwgZGF0YTogU2V0RGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGVuZEluZGV4ID0gdGhpcy5fbGFzdFN0YXJ0SW5kZXggKyB0aGlzLl9tYXhJdGVtQ291bnQgLSAxO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgaW5kZXggPj0gdGhpcy5fbGFzdFN0YXJ0SW5kZXggJiZcclxuICAgICAgICAgICAgZW5kSW5kZXggPj0gaW5kZXggJiZcclxuICAgICAgICAgICAgZGF0YSAhPSBudWxsXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFMaXN0W2luZGV4XSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1MaXN0W2luZGV4ICUgdGhpcy5fbWF4SXRlbUNvdW50XS5kYXRhID0gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW0oaW5kZXg6IG51bWJlcik6IExpc3RWaWV3SXRlbSB7XHJcbiAgICAgICAgY29uc3QgZW5kSW5kZXggPSB0aGlzLl9sYXN0U3RhcnRJbmRleCArIHRoaXMuX21heEl0ZW1Db3VudCAtIDE7XHJcbiAgICAgICAgaWYgKCEoaW5kZXggPCB0aGlzLl9sYXN0U3RhcnRJbmRleCB8fCBlbmRJbmRleCA8IGluZGV4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXRlbUxpc3RbaW5kZXggJSB0aGlzLl9tYXhJdGVtQ291bnRdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlbGVjdEluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdEluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VsZWN0SW5kZXhMaXN0KCk6IG51bWJlcltdIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IHQgaW4gdGhpcy5fc2VsZWN0SW5kZXhMaXN0KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcnNlSW50KHQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNlbGVjdChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdEluZGV4TGlzdFtpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3QoaW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgaXRlbTogTGlzdFZpZXdJdGVtO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMuZ2V0U2VsZWN0KGluZGV4KSAhPSBzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMuX2RhdGFMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdEluZGV4TGlzdFtpbmRleF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdEJveFByZWZhYiAmJiB0aGlzLmNvbnRlbnRCcm90aGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc2VsZWN0Qm94TGlzdFtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RCb3hQb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RCb3hMaXN0W2luZGV4XSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdEJveFBvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdEJveExpc3RbaW5kZXhdID0gY2MuaW5zdGFudGlhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Qm94UHJlZmFiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRCcm90aGVyLmFkZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdEJveExpc3RbaW5kZXhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kaXJlY3Rpb24gIT0gRGlyZWN0aW9uLk5PTkUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdEJveExpc3RbaW5kZXhdLnNldFBvc2l0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UG9zaXRpb25CeUluZGV4KGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5nZXRJdGVtKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0Qm94TGlzdFtpbmRleF0uc2V0UG9zaXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5nZXRQb3NpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3NlbGVjdEluZGV4TGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RCb3hQcmVmYWIgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRCcm90aGVyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0Qm94TGlzdFtpbmRleF1cclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdEJveFBvb2wucHV0KHRoaXMuX3NlbGVjdEJveExpc3RbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fc2VsZWN0Qm94TGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMuX2RhdGFMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFwiaXRlbS1zZWxlY3RlZFwiLCB0cnVlLCBzZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREYXRhKCk6IFNldERhdGFbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREYXRhKGRhdGE6IFNldERhdGFbXSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpdGVtOiBMaXN0Vmlld0l0ZW07XHJcbiAgICAgICAgY29uc3QgYXJnczogSUFyZ3VtZW50c1tdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgYXJnc1tpbmRleCAtIDFdID0gYXJndW1lbnRzW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEoZGF0YSA9PSBudWxsIHx8IHRoaXMuX2dyb3VwU2l6ZSA8IDApKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFMaXN0ID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5fbWF4SXRlbUNvdW50ID0gdGhpcy5nZXRNYXhJdGVtQ291bnQoKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldENvbnRlbnRTaXplKHRoaXMuZ2V0Q29udGVudFNpemUoKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLl9pdGVtTGlzdFtpbmRleCAlIHRoaXMuX21heEl0ZW1Db3VudF07XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbSA/IGl0ZW0gOiB0aGlzLmNyZWF0ZUl0ZW0odHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPj0gdGhpcy5fbGFzdFN0YXJ0SW5kZXggJiZcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA8IHRoaXMuX2xhc3RTdGFydEluZGV4ICsgdGhpcy5fbWF4SXRlbUNvdW50XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1CeUluZGV4KGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmludGVyYWN0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5vZmYoXCJ0b3VjaGVuZFwiLCB0aGlzLm9uSXRlbUNsaWNrSGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5ub2RlLm9uKFwidG91Y2hlbmRcIiwgdGhpcy5vbkl0ZW1DbGlja0hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5vZmYoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25JdGVtTW91c2VFbnRlckhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5vbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkl0ZW1Nb3VzZUVudGVySGFuZGxlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ub2RlLm9mZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkl0ZW1Nb3VzZUxlYXZlSGFuZGxlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ub2RlLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbU1vdXNlTGVhdmVIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuX2xhc3RTdGFydEluZGV4ICsgdGhpcy5faXRlbUxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGluZGV4ID49IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaW5kZXgtLVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5faXRlbUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlbUxpc3RbaW5kZXhdLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlbUxpc3RbaW5kZXhdLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KHNob3VsZFJlc2V0OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzaG91bGRSZXNldCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0SW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3QodGhpcy5fc2VsZWN0SW5kZXgsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdEluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3NlbGVjdEluZGV4TGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3QocGFyc2VJbnQoa2V5KSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pdGVtU2l6ZUxpc3QgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdFN0YXJ0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxWaWV3KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc3RvcEF1dG9TY3JvbGwoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLlZFUlRJQ0FMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuaGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGlyZWN0aW9uID09IERpcmVjdGlvbi5IT1JJWk9OVEFMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQud2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3BsYWNlaG9sZGVyTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclBvb2wucHV0KHRoaXMuX3BsYWNlaG9sZGVyTGlzdFtrZXldKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3BsYWNlaG9sZGVyTGlzdFtrZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSB0aGlzLl9pdGVtTGlzdC5sZW5ndGggLSAxOyAwIDw9IGluZGV4OyBpbmRleC0tKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtTGlzdFtpbmRleF0uaW50ZXJhY3RhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtTGlzdFtpbmRleF0ubm9kZS5vZmYoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3VjaGVuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2xpY2tIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5faXRlbUxpc3RbaW5kZXhdLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGlmIChzaG91bGRSZXNldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbUxpc3RbaW5kZXhdLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWxlYXNlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICB0aGlzLl9kYXRhTGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy5faXRlbUxpc3QubGVuZ3RoIC0gMTsgMCA8PSBpbmRleDsgaW5kZXgtLSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pdGVtTGlzdFtpbmRleF0ucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9pdGVtTGlzdC5wb3AoKS5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0Qm94UG9vbC5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyUG9vbC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVmlldykge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS5vZmYoXHJcbiAgICAgICAgICAgICAgICBcInNjcm9sbC1iZWdhblwiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxpc3RTY3JvbGxIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS5vZmYoXHJcbiAgICAgICAgICAgICAgICBcInNjcm9sbGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxpc3RTY3JvbGxIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS5vZmYoXHJcbiAgICAgICAgICAgICAgICBcInNjcm9sbC1lbmRlZFwiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxpc3RTY3JvbGxIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb250ZW50QnJvdGhlciAmJiB0aGlzLnNlbGVjdEJveFByZWZhYikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQub2ZmKFxyXG4gICAgICAgICAgICAgICAgXCJwb3NpdGlvbi1jaGFuZ2VkXCIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZUNoYW5nZUhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5vZmYoXCJzaXplLWNoYW5nZWRcIiwgdGhpcy5vbk5vZGVDaGFuZ2VIYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkxpc3RTY3JvbGxIYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5zZXRQb3NpdGlvbihcclxuICAgICAgICAgICAgTWF0aC5mbG9vcihwb3NpdGlvbi54KSxcclxuICAgICAgICAgICAgTWF0aC5mbG9vcihwb3NpdGlvbi55KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlSXRlbUxpc3Qoc2hvdWxkVXBkYXRlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jdXJTdGFydEluZGV4ID0gdGhpcy5nZXRTdGFydEluZGV4QnlPZmZzZXQoXHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5nZXRTY3JvbGxPZmZzZXQoKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbmRJbmRleCA9IE1hdGgubWluKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyU3RhcnRJbmRleCArIHRoaXMuX21heEl0ZW1Db3VudCxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFMaXN0Lmxlbmd0aFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMuX2N1clN0YXJ0SW5kZXg7IGluZGV4IDwgZW5kSW5kZXg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbUJ5SW5kZXgoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRDb250ZW50U2l6ZSh0aGlzLmdldENvbnRlbnRTaXplKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0U3RhcnRJbmRleCA9IHRoaXMuX2N1clN0YXJ0SW5kZXg7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jdXJTdGFydEluZGV4ICE9IHRoaXMuX2xhc3RTdGFydEluZGV4KSB7XHJcbiAgICAgICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9jdXJTdGFydEluZGV4O1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPCB0aGlzLl9jdXJTdGFydEluZGV4ICsgdGhpcy5fbWF4SXRlbUNvdW50O1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAwIDw9IGluZGV4ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPCB0aGlzLl9kYXRhTGlzdC5sZW5ndGggJiZcclxuICAgICAgICAgICAgICAgICAgICAoaW5kZXggPCB0aGlzLl9sYXN0U3RhcnRJbmRleCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA+PSB0aGlzLl9sYXN0U3RhcnRJbmRleCArIHRoaXMuX21heEl0ZW1Db3VudClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbUJ5SW5kZXgoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRDb250ZW50U2l6ZSh0aGlzLmdldENvbnRlbnRTaXplKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sYXN0U3RhcnRJbmRleCA9IHRoaXMuX2N1clN0YXJ0SW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlSXRlbUJ5SW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9pdGVtTGlzdFtpbmRleCAlIHRoaXMuX21heEl0ZW1Db3VudF07XHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgaXRlbS5yZXNldCgpO1xyXG4gICAgICAgICAgICBpdGVtLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGl0ZW0uZGF0YSA9IHRoaXMuX2RhdGFMaXN0W2luZGV4XSBhcyBGaWdodFJld2FyZEl0ZW1EYXRhO1xyXG4gICAgICAgICAgICBpdGVtLnNlbGVjdCA9IHRoaXMuX3NlbGVjdEluZGV4TGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1TaXplTGlzdFtpbmRleF0gPSBpdGVtLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXJlY3Rpb24gIT0gRGlyZWN0aW9uLk5PTkUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5zZXRQb3NpdGlvbih0aGlzLmdldFBvc2l0aW9uQnlJbmRleChpbmRleCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ub2RlLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb25Ob2RlTGlzdFtpbmRleF0ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2Nyb2xsVG9MZWZ0KG9mZnNldDogbnVtYmVyID0gMCwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICBpZiAob2Zmc2V0ID49IDAgfHwgdGhpcy5zY3JvbGxWaWV3KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zdG9wQXV0b1Njcm9sbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9MZWZ0KG9mZnNldCwgYW5pbWF0ZSk7XHJcbiAgICAgICAgICAgIGlmICgwID09IG9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtTGlzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2Nyb2xsVG9SaWdodChvZmZzZXQ6IG51bWJlciA9IDAsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgdGhpcy5zY3JvbGxWaWV3KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zdG9wQXV0b1Njcm9sbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9SaWdodChvZmZzZXQsIGFuaW1hdGUpO1xyXG4gICAgICAgICAgICBpZiAoMCA9PSBvZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbUxpc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9Ub3Aob2Zmc2V0OiBudW1iZXIgPSAwLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChvZmZzZXQgPCAwIHx8ICF0aGlzLnNjcm9sbFZpZXcgfHwgMCAhPSB0aGlzLl9kYXRhTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnN0b3BBdXRvU2Nyb2xsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1RvcChvZmZzZXQsIGFuaW1hdGUpO1xyXG4gICAgICAgICAgICBpZiAoMCA9PSBvZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbUxpc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNjcm9sbFRvQm90dG9tKG9mZnNldDogbnVtYmVyID0gMCwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICBpZiAob2Zmc2V0IDwgMCB8fCB0aGlzLnNjcm9sbFZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnN0b3BBdXRvU2Nyb2xsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb0JvdHRvbShvZmZzZXQsIGFuaW1hdGUpO1xyXG4gICAgICAgICAgICBpZiAoMCA9PSBvZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbUxpc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNjcm9sbFRvSW5kZXgoXHJcbiAgICAgICAgaW5kZXg6IG51bWJlcixcclxuICAgICAgICBvZmZzZXQ6IG51bWJlciA9IDAsXHJcbiAgICAgICAgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWVcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5fZ3JvdXBTaXplIDw9IDAgfHxcclxuICAgICAgICAgICAgIXRoaXMuc2Nyb2xsVmlldyB8fFxyXG4gICAgICAgICAgICBpbmRleCA8IDAgfHxcclxuICAgICAgICAgICAgaW5kZXggPCB0aGlzLl9kYXRhTGlzdC5sZW5ndGhcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnN0b3BBdXRvU2Nyb2xsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb09mZnNldChcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0T2Zmc2V0QnlJbmRleChpbmRleCksXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmICgwID09IG9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtTGlzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T2Zmc2V0QnlJbmRleChpbmRleDogbnVtYmVyKTogY2MuVmVjMiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCEodGhpcy5fZ3JvdXBTaXplIDw9IDApICYmIHRoaXMuc2Nyb2xsVmlldykge1xyXG4gICAgICAgICAgICB2YXIgZ3JvdXBJbmRleDogbnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBjYy52MigpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhTY3JvbGxPZmZzZXQgPSB0aGlzLnNjcm9sbFZpZXcuZ2V0TWF4U2Nyb2xsT2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLkhPUklaT05UQUwpIHtcclxuICAgICAgICAgICAgICAgIGdyb3VwSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy5fZ3JvdXBTaXplKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtU2l6ZUxpc3RbZ3JvdXBJbmRleCAqIHRoaXMuX2dyb3VwU2l6ZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cEluZGV4ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlbVNpemVMaXN0W2dyb3VwSW5kZXggKiB0aGlzLl9ncm91cFNpemVdLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cEluZGV4ID0gdGhpcy5pdGVtUHJlZmFiLmRhdGEud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0LnggPSBNYXRoLm1pbihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGNYKDAsIGluZGV4LCB0aGlzLl9ncm91cFNpemUsIHRoaXMuX3NwYWNpbmcueCkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjUgKiBncm91cEluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFNjcm9sbE9mZnNldC54XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0LnkgPSBtYXhTY3JvbGxPZmZzZXQueTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLlZFUlRJQ0FMKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cEluZGV4ID0gTWF0aC5mbG9vcihpbmRleCAvIHRoaXMuX2dyb3VwU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXRlbVNpemVMaXN0W2dyb3VwSW5kZXggKiB0aGlzLl9ncm91cFNpemVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBJbmRleCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1TaXplTGlzdFtncm91cEluZGV4ICogdGhpcy5fZ3JvdXBTaXplXS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwSW5kZXggPSB0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0LnggPSBtYXhTY3JvbGxPZmZzZXQueDtcclxuICAgICAgICAgICAgICAgIG9mZnNldC55ID0gTWF0aC5taW4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxjWSgwLCBpbmRleCwgdGhpcy5fZ3JvdXBTaXplLCB0aGlzLl9zcGFjaW5nLnkpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41ICogZ3JvdXBJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhTY3JvbGxPZmZzZXQueVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTdGFydEluZGV4QnlPZmZzZXQob2Zmc2V0OiBjYy5WZWMyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgc3RhcnRJbmRleCA9IDA7XHJcbiAgICAgICAgbGV0IGFjY3VtdWxhdGVkU2l6ZSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RpcmVjdGlvbiA9PSBEaXJlY3Rpb24uVkVSVElDQUwpIHtcclxuICAgICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA8IHRoaXMuX2RhdGFMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGluZGV4ICs9IHRoaXMuZ3JvdXBTaXplXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgYWNjdW11bGF0ZWRTaXplICs9XHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX2l0ZW1TaXplTGlzdFtpbmRleF0gfHwgdGhpcy5pdGVtUHJlZmFiLmRhdGEpLmhlaWdodCArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BhY2luZy55O1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjY3VtdWxhdGVkU2l6ZSA+IG9mZnNldC55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLkhPUklaT05UQUwpIHtcclxuICAgICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA8IHRoaXMuX2RhdGFMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGluZGV4ICs9IHRoaXMuZ3JvdXBTaXplXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgYWNjdW11bGF0ZWRTaXplICs9XHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX2l0ZW1TaXplTGlzdFtpbmRleF0gfHwgdGhpcy5pdGVtUHJlZmFiLmRhdGEpLndpZHRoICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGFjaW5nLng7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWNjdW11bGF0ZWRTaXplID4gLW9mZnNldC54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChzdGFydEluZGV4LCAwKSwgdGhpcy5fZGF0YUxpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm9wZXJ0eSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb250ZW50ICYmIHRoaXMuaXRlbVByZWZhYiAmJiB0aGlzLnNjcm9sbFZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3Lmhvcml6b250YWwgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID09IERpcmVjdGlvbi5IT1JJWk9OVEFMO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcudmVydGljYWwgPSB0aGlzLl9kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLlZFUlRJQ0FMO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1heEl0ZW1Db3VudChncm91cFNpemU6IG51bWJlciA9IDEpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghKHRoaXMuX2dyb3VwU2l6ZSA8IDApKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ncm91cFNpemUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbWF4Q291bnQgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGlyZWN0aW9uID09IERpcmVjdGlvbi5IT1JJWk9OVEFMKSB7XHJcbiAgICAgICAgICAgICAgICBtYXhDb3VudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgKGdyb3VwU2l6ZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguY2VpbChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCAvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuaXRlbVByZWZhYi5kYXRhLndpZHRoICsgdGhpcy5fc3BhY2luZy54KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKSAqXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3JvdXBTaXplO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RpcmVjdGlvbiA9PSBEaXJlY3Rpb24uVkVSVElDQUwpIHtcclxuICAgICAgICAgICAgICAgIG1heENvdW50ID1cclxuICAgICAgICAgICAgICAgICAgICAoZ3JvdXBTaXplICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5jZWlsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCAvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuaXRlbVByZWZhYi5kYXRhLmhlaWdodCArIHRoaXMuX3NwYWNpbmcueSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSkgKlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwU2l6ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLk5PTkUpIHtcclxuICAgICAgICAgICAgICAgIG1heENvdW50ID0gdGhpcy5fZGF0YUxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWF4Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q29udGVudFNpemUoKTogY2MuU2l6ZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dyb3VwU2l6ZSA8PSAwIHx8ICF0aGlzLl9kYXRhTGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuU2l6ZS5aRVJPO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b3RhbEl0ZW1zID0gTWF0aC5tYXgoXHJcbiAgICAgICAgICAgIE1hdGguY2VpbCh0aGlzLl9kYXRhTGlzdC5sZW5ndGggLyB0aGlzLl9ncm91cFNpemUpICpcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwU2l6ZSxcclxuICAgICAgICAgICAgdGhpcy5fbWF4SXRlbUNvdW50XHJcbiAgICAgICAgKTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdG90YWxJdGVtczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2l0ZW1TaXplTGlzdFtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1TaXplTGlzdFtpbmRleF0gPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVByZWZhYi5kYXRhLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29udGVudFNpemUgPSBjYy5TaXplLlpFUk87XHJcbiAgICAgICAgbGV0IGdyb3VwQ291bnQgPSAwO1xyXG4gICAgICAgIGxldCBpdGVtQ291bnQgPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGlyZWN0aW9uID09IERpcmVjdGlvbi5IT1JJWk9OVEFMKSB7XHJcbiAgICAgICAgICAgIGl0ZW1Db3VudCA9IE1hdGgubWF4KHRoaXMuX2dyb3VwU2l6ZSAtIDEsIDApO1xyXG4gICAgICAgICAgICBncm91cENvdW50ID0gTWF0aC5tYXgoXHJcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKCh0aGlzLl9kYXRhTGlzdC5sZW5ndGggLSAxKSAvIHRoaXMuX2dyb3VwU2l6ZSksXHJcbiAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnRlbnRTaXplLndpZHRoID1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY1goXHJcbiAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhTGlzdC5sZW5ndGggLSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGFjaW5nLnhcclxuICAgICAgICAgICAgICAgICkgK1xyXG4gICAgICAgICAgICAgICAgMC41ICogdGhpcy5faXRlbVNpemVMaXN0W2dyb3VwQ291bnQgKiB0aGlzLl9ncm91cFNpemVdLndpZHRoO1xyXG4gICAgICAgICAgICBjb250ZW50U2l6ZS5oZWlnaHQgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjWSgwLCBpdGVtQ291bnQsIDEsIHRoaXMuX3NwYWNpbmcueSkgK1xyXG4gICAgICAgICAgICAgICAgMC41ICogdGhpcy5faXRlbVNpemVMaXN0W2l0ZW1Db3VudF0uaGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGlyZWN0aW9uID09IERpcmVjdGlvbi5WRVJUSUNBTCkge1xyXG4gICAgICAgICAgICBncm91cENvdW50ID0gTWF0aC5tYXgodGhpcy5fZ3JvdXBTaXplIC0gMSwgMCk7XHJcbiAgICAgICAgICAgIGl0ZW1Db3VudCA9IE1hdGgubWF4KFxyXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcigodGhpcy5fZGF0YUxpc3QubGVuZ3RoIC0gMSkgLyB0aGlzLl9ncm91cFNpemUpLFxyXG4gICAgICAgICAgICAgICAgMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb250ZW50U2l6ZS53aWR0aCA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGNYKDAsIGdyb3VwQ291bnQsIDEsIHRoaXMuX3NwYWNpbmcueCkgK1xyXG4gICAgICAgICAgICAgICAgMC41ICogdGhpcy5faXRlbVNpemVMaXN0W2dyb3VwQ291bnRdLndpZHRoO1xyXG4gICAgICAgICAgICBjb250ZW50U2l6ZS5oZWlnaHQgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjWShcclxuICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFMaXN0Lmxlbmd0aCAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3JvdXBTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwYWNpbmcueVxyXG4gICAgICAgICAgICAgICAgKSArXHJcbiAgICAgICAgICAgICAgICAwLjUgKiB0aGlzLl9pdGVtU2l6ZUxpc3RbaXRlbUNvdW50ICogdGhpcy5fZ3JvdXBTaXplXS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29udGVudFNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5jaG9yKFxyXG4gICAgICAgIGFuY2hvcjogY2MuVmVjMiB8IG51bGwsXHJcbiAgICAgICAgc2l6ZTogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9IHwgbnVsbCxcclxuICAgICAgICBhOiBjYy5WZWMyIHwgbnVsbCxcclxuICAgICAgICBiOiBjYy5WZWMyIHwgbnVsbFxyXG4gICAgKTogY2MuVmVjMiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBudWxsID09IGFuY2hvciB8fFxyXG4gICAgICAgICAgICBudWxsID09IHNpemUgfHxcclxuICAgICAgICAgICAgbnVsbCA9PSBhIHx8XHJcbiAgICAgICAgICAgIG51bGwgPT0gYiB8fFxyXG4gICAgICAgICAgICAoYS54ID09IGIueCAmJiBhLnkgPT0gYi55KVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gYW5jaG9yIHx8IGNjLlZlYzIuWkVSTztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiID0gY2MudjIoYS54IC0gYi54LCBhLnkgLSBiLnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2MudjIoXHJcbiAgICAgICAgICAgICAgICBhbmNob3IueCArIGIueCAqIHNpemUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICBhbmNob3IueSArIGIueSAqIHNpemUuaGVpZ2h0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBldmVudE5hbWU6IHN0cmluZyxcclxuICAgICAgICBldmVudFR5cGU6IGJvb2xlYW4sXHJcbiAgICAgICAgZGV0YWlsOiBib29sZWFuXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBjYy5FdmVudC5FdmVudEN1c3RvbShldmVudE5hbWUsIGV2ZW50VHlwZSk7XHJcbiAgICAgICAgZXZlbnQuZGV0YWlsID0gZGV0YWlsO1xyXG4gICAgICAgIHRoaXMubm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uSXRlbUNsaWNrSGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gZXZlbnQudGFyZ2V0LmdldENvbXBvbmVudChMaXN0Vmlld0l0ZW0pO1xyXG4gICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTXVsdGlTZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0KGl0ZW0uaW5kZXgsICF0aGlzLmdldFNlbGVjdChpdGVtLmluZGV4KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdCh0aGlzLl9zZWxlY3RJbmRleCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3QoaXRlbS5pbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFwiaXRlbS1jbGlja1wiLCB0cnVlLCBpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkl0ZW1Nb3VzZUVudGVySGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gZXZlbnQudGFyZ2V0LmdldENvbXBvbmVudChMaXN0Vmlld0l0ZW0pO1xyXG4gICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcIml0ZW0tbW91c2UtZW50ZXJcIiwgdHJ1ZSwgaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25JdGVtTW91c2VMZWF2ZUhhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGV2ZW50LnRhcmdldC5nZXRDb21wb25lbnQoTGlzdFZpZXdJdGVtKTtcclxuICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJpdGVtLW1vdXNlLWxlYXZlXCIsIHRydWUsIGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTm9kZUNoYW5nZUhhbmRsZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50QnJvdGhlci5zZXRQb3NpdGlvbih0aGlzLmNvbnRlbnQuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50QnJvdGhlci5zZXRDb250ZW50U2l6ZSh0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVJdGVtKGFjdGl2ZTogYm9vbGVhbiwgYXJncz86IElBcmd1bWVudHNbXSk6IExpc3RWaWV3SXRlbSB7XHJcbiAgICAgICAgY29uc3QgaXRlbU5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmYWIpO1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtTm9kZS5nZXRDb21wb25lbnQoTGlzdFZpZXdJdGVtKTtcclxuXHJcbiAgICAgICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwi5rKh5pyJ5om+5Yiw57un5om/TGlzdFZpZXdJdGVt55qE57uE5Lu2XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLmluaXQuYXBwbHkoaXRlbSwgYXJncyk7XHJcbiAgICAgICAgaXRlbU5vZGUuYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtTm9kZSk7XHJcbiAgICAgICAgdGhpcy5faXRlbUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlbGV0ZUl0ZW0oaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPCB0aGlzLl9pdGVtTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5faXRlbUxpc3RbaW5kZXhdLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9pdGVtTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb3BlcnR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==