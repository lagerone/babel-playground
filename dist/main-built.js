(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _List = require('./List');

var APP_WRAPPER = document.getElementById('app');
var ITEM_INPUT = APP_WRAPPER.querySelector('input[type="text"]');

var list = new _List.List(['foo', 'bar', 'hello', 'world']);

var appEvents = {
	addItem: function addItem() {
		var value = ITEM_INPUT.value.trim();
		if (value !== '') {
			list.addItem(value);
		}
		ITEM_INPUT.value = '';
		ITEM_INPUT.focus();
		list.render();
	},

	clearCompletedItems: function clearCompletedItems() {
		list.clearCompletedItems();
		list.render();
	},

	deleteItem: function deleteItem() {
		list.removeItemById(parseInt(this.getAttribute('data-id'), 10));
		list.render();
	},

	toggleItemIsCompleted: function toggleItemIsCompleted() {
		list.toggleItemIsCompleted(parseInt(this.getAttribute('data-id')));
		list.render();
	}
};

ITEM_INPUT.focus();
list.render();

APP_WRAPPER.addEventListener('click', function (event) {
	var element = event.target;
	var elementAction;

	if (!element) {
		return;
	}

	elementAction = element.getAttribute('data-action');

	if (!elementAction || typeof appEvents[elementAction] !== 'function') {
		return;
	}

	appEvents[elementAction].call(element);
});

},{"./List":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var _id = 1;

function getId() {
	return _id++;
}

exports.getId = getId;

},{}],3:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _getId = require('./IdFactory');

var Item = (function () {
	function Item(name) {
		_classCallCheck(this, Item);

		this._id = _getId.getId();
		this._name = name;
		this._isCompleted = false;
	}

	_createClass(Item, [{
		key: 'id',
		get: function () {
			return this._id;
		},
		set: function (value) {
			throw new Error('private property');
		}
	}, {
		key: 'isCompleted',
		get: function () {
			return this._isCompleted;
		},
		set: function (isCompleted) {
			this._isCompleted = isCompleted;
		}
	}, {
		key: 'name',
		get: function () {
			return this._name;
		},
		set: function (newName) {
			this._name = newName;
		}
	}]);

	return Item;
})();

exports.Item = Item;

},{"./IdFactory":2}],4:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _Item = require('./Item');

var List = (function () {
	function List(items) {
		_classCallCheck(this, List);

		this._items = items.map(function (i) {
			return new _Item.Item(i);
		});
	}

	_createClass(List, [{
		key: 'items',
		get: function () {
			return this._items;
		},
		set: function (items) {
			throw new Error('action not allowed');
		}
	}, {
		key: 'addItem',
		value: function addItem(itemName) {
			this._items.push(new _Item.Item(itemName));
		}
	}, {
		key: 'getItemAndIndexById',
		value: function getItemAndIndexById(itemId) {
			for (var i = 0, length = this._items.length; i < length; i++) {
				if (this._items[i].id === itemId) {
					return {
						index: i,
						item: this._items[i]
					};
				}
			};
			return {};
		}
	}, {
		key: 'removeItemById',
		value: function removeItemById(itemId) {
			var itemFound = this.getItemAndIndexById(itemId);
			if (itemFound.item) {
				this._items.splice(itemFound.index, 1);
			}
		}
	}, {
		key: 'removeItem',
		value: function removeItem(item) {
			var itemIndex = this._items.indexOf(item);
			this._items.splice(itemIndex, 1);
		}
	}, {
		key: 'toggleItemIsCompleted',
		value: function toggleItemIsCompleted(itemId) {
			var itemFound = this.getItemAndIndexById(itemId);
			if (!itemFound.item) {
				return;
			}
			itemFound.item.isCompleted = !itemFound.item.isCompleted;
		}
	}, {
		key: 'clearCompletedItems',
		value: function clearCompletedItems() {
			var itemsLenght = this._items.length;
			var itemsToRemove = [];
			var i;
			for (i = 0; i < itemsLenght; i++) {
				if (this._items[i].isCompleted) {
					itemsToRemove.push(this._items[i]);
				}
			}
			itemsToRemove.forEach(this.removeItem.bind(this));
		}
	}, {
		key: 'getListMarkup',
		value: function getListMarkup() {
			var html = '';
			this._items.forEach(function (i) {
				var liClass = '';
				var checked = '';
				if (i.isCompleted) {
					liClass = 'class="is-completed"';
					checked = 'checked="checked"';
				}
				html += '<li ' + liClass + '>\n\t\t\t\t\t\t<input data-id="' + i.id + '" data-action="toggleItemIsCompleted" type="checkbox" ' + checked + '>\n\t\t\t\t\t\t' + i.name + '\n\t\t\t\t\t\t<span class="item-delete">\n\t\t\t\t\t\t\t[<a href="javascript:void(0)" data-action="deleteItem" data-id="' + i.id + '">Delete</a>]\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</li>';
			});

			return html;
		}
	}, {
		key: 'render',
		value: function render() {
			var ul = document.querySelector('ul');
			ul.innerHTML = this.getListMarkup();
		}
	}]);

	return List;
})();

exports.List = List;

},{"./Item":3}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9fZGV2L2JhYmVsLXNwaWtlL3NyYy9tYWluLmpzIiwiQzovX2Rldi9iYWJlbC1zcGlrZS9zcmMvSWRGYWN0b3J5LmpzIiwiQzovX2Rldi9iYWJlbC1zcGlrZS9zcmMvSXRlbS5qcyIsIkM6L19kZXYvYmFiZWwtc3Bpa2Uvc3JjL0xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztvQkNBbUIsUUFBUTs7QUFFM0IsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqRCxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0FBRWpFLElBQUksSUFBSSxHQUFHLFVBTEgsSUFBSSxDQUtRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzs7QUFFdEQsSUFBSSxTQUFTLEdBQUc7QUFDZixRQUFPLEVBQUMsbUJBQUc7QUFDVixNQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BDLE1BQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtBQUNqQixPQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3BCO0FBQ0QsWUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDdEIsWUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ25CLE1BQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztFQUNkOztBQUVELG9CQUFtQixFQUFDLCtCQUFHO0FBQ3RCLE1BQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQzNCLE1BQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztFQUNkOztBQUVELFdBQVUsRUFBQyxzQkFBRztBQUNiLE1BQUksQ0FBQyxjQUFjLENBQUMsUUFB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LElBQUk7OztRQUFKLElBQUksR0FBSixJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7TGlzdH0gZnJvbSAnLi9MaXN0JztcclxuXHJcbnZhciBBUFBfV1JBUFBFUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcclxudmFyIElURU1fSU5QVVQgPSBBUFBfV1JBUFBFUi5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG5cclxudmFyIGxpc3QgPSBuZXcgTGlzdChbJ2ZvbycsICdiYXInLCAnaGVsbG8nLCAnd29ybGQnXSk7XHJcblxyXG52YXIgYXBwRXZlbnRzID0ge1xyXG5cdGFkZEl0ZW0gKCkge1xyXG5cdFx0dmFyIHZhbHVlID0gSVRFTV9JTlBVVC52YWx1ZS50cmltKCk7XHJcblx0XHRpZiAodmFsdWUgIT09ICcnKSB7XHJcblx0XHRcdGxpc3QuYWRkSXRlbSh2YWx1ZSk7XHJcblx0XHR9XHJcblx0XHRJVEVNX0lOUFVULnZhbHVlID0gJyc7XHJcblx0XHRJVEVNX0lOUFVULmZvY3VzKCk7XHJcblx0XHRsaXN0LnJlbmRlcigpO1xyXG5cdH0sXHJcblx0XHJcblx0Y2xlYXJDb21wbGV0ZWRJdGVtcyAoKSB7XHJcblx0XHRsaXN0LmNsZWFyQ29tcGxldGVkSXRlbXMoKTtcclxuXHRcdGxpc3QucmVuZGVyKCk7XHJcblx0fSxcclxuXHRcclxuXHRkZWxldGVJdGVtICgpIHtcclxuXHRcdGxpc3QucmVtb3ZlSXRlbUJ5SWQocGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSwgMTApKTtcclxuXHRcdGxpc3QucmVuZGVyKCk7XHJcblx0fSxcclxuXHRcclxuXHR0b2dnbGVJdGVtSXNDb21wbGV0ZWQgKCkge1xyXG5cdFx0bGlzdC50b2dnbGVJdGVtSXNDb21wbGV0ZWQocGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSkpO1xyXG5cdFx0bGlzdC5yZW5kZXIoKTtcclxuXHR9XHJcbn07XHJcblxyXG5JVEVNX0lOUFVULmZvY3VzKCk7XHJcbmxpc3QucmVuZGVyKCk7XHJcblxyXG5BUFBfV1JBUFBFUi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdHZhciBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG5cdHZhciBlbGVtZW50QWN0aW9uO1xyXG5cdFxyXG5cdGlmICghZWxlbWVudCkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRcclxuXHRlbGVtZW50QWN0aW9uID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJyk7XHJcblx0XHJcblx0aWYgKCFlbGVtZW50QWN0aW9uIHx8IHR5cGVvZiBhcHBFdmVudHNbZWxlbWVudEFjdGlvbl0gIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0XHJcblx0YXBwRXZlbnRzW2VsZW1lbnRBY3Rpb25dLmNhbGwoZWxlbWVudCk7XHJcbn0pOyIsInZhciBfaWQgPSAxO1xyXG5cclxuZnVuY3Rpb24gZ2V0SWQgKCkge1xyXG5cdHJldHVybiBfaWQrKztcclxufVxyXG5cclxuZXhwb3J0IHtnZXRJZH07IiwiaW1wb3J0IHtnZXRJZH0gZnJvbSAnLi9JZEZhY3RvcnknO1xyXG5cclxuZXhwb3J0IGNsYXNzIEl0ZW0ge1xyXG5cdGNvbnN0cnVjdG9yIChuYW1lKSB7XHJcblx0XHR0aGlzLl9pZCA9IGdldElkKCk7XHJcblx0XHR0aGlzLl9uYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuX2lzQ29tcGxldGVkID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRnZXQgaWQgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xyXG5cdH1cclxuXHJcblx0c2V0IGlkICh2YWx1ZSkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdwcml2YXRlIHByb3BlcnR5Jyk7XHJcblx0fVxyXG5cclxuXHRnZXQgaXNDb21wbGV0ZWQgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzQ29tcGxldGVkO1xyXG5cdH1cclxuXHJcblx0c2V0IGlzQ29tcGxldGVkIChpc0NvbXBsZXRlZCkge1xyXG5cdFx0dGhpcy5faXNDb21wbGV0ZWQgPSBpc0NvbXBsZXRlZDtcclxuXHR9XHJcblxyXG5cdGdldCBuYW1lICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9uYW1lO1xyXG5cdH1cclxuXHJcblx0c2V0IG5hbWUgKG5ld05hbWUpIHtcclxuXHRcdHRoaXMuX25hbWUgPSBuZXdOYW1lO1xyXG5cdH1cclxufSIsImltcG9ydCB7SXRlbX0gZnJvbSAnLi9JdGVtJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMaXN0IHtcclxuXHRjb25zdHJ1Y3RvciAoaXRlbXMpIHtcclxuXHRcdHRoaXMuX2l0ZW1zID0gaXRlbXMubWFwKChpKSA9PiBuZXcgSXRlbShpKSk7XHRcdFxyXG5cdH1cclxuXHJcblx0Z2V0IGl0ZW1zICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9pdGVtcztcclxuXHR9XHJcblxyXG5cdHNldCBpdGVtcyAoaXRlbXMpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcignYWN0aW9uIG5vdCBhbGxvd2VkJyk7XHJcblx0fVxyXG5cclxuXHRhZGRJdGVtIChpdGVtTmFtZSkge1xyXG5cdFx0dGhpcy5faXRlbXMucHVzaChuZXcgSXRlbShpdGVtTmFtZSkpO1xyXG5cdH1cclxuXHJcblx0Z2V0SXRlbUFuZEluZGV4QnlJZCAoaXRlbUlkKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gdGhpcy5faXRlbXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuX2l0ZW1zW2ldLmlkID09PSBpdGVtSWQpIHtcclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0aW5kZXg6IGksXHJcblx0XHRcdFx0XHRpdGVtOiB0aGlzLl9pdGVtc1tpXVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRyZXR1cm4ge307XHJcblx0fVxyXG5cclxuXHRyZW1vdmVJdGVtQnlJZCAoaXRlbUlkKSB7XHJcblx0XHR2YXIgaXRlbUZvdW5kID0gdGhpcy5nZXRJdGVtQW5kSW5kZXhCeUlkKGl0ZW1JZCk7XHJcblx0XHRpZiAoaXRlbUZvdW5kLml0ZW0pIHtcclxuXHRcdFx0dGhpcy5faXRlbXMuc3BsaWNlKGl0ZW1Gb3VuZC5pbmRleCwgMSk7XHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbW92ZUl0ZW0gKGl0ZW0pIHtcclxuXHRcdHZhciBpdGVtSW5kZXggPSB0aGlzLl9pdGVtcy5pbmRleE9mKGl0ZW0pO1xyXG5cdFx0dGhpcy5faXRlbXMuc3BsaWNlKGl0ZW1JbmRleCwgMSk7XHJcblx0fVxyXG5cclxuXHR0b2dnbGVJdGVtSXNDb21wbGV0ZWQgKGl0ZW1JZCkge1xyXG5cdFx0dmFyIGl0ZW1Gb3VuZCA9IHRoaXMuZ2V0SXRlbUFuZEluZGV4QnlJZChpdGVtSWQpO1xyXG5cdFx0aWYgKCFpdGVtRm91bmQuaXRlbSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpdGVtRm91bmQuaXRlbS5pc0NvbXBsZXRlZCA9ICFpdGVtRm91bmQuaXRlbS5pc0NvbXBsZXRlZDtcclxuXHR9XHJcblxyXG5cdGNsZWFyQ29tcGxldGVkSXRlbXMgKCkge1xyXG5cdFx0dmFyIGl0ZW1zTGVuZ2h0ID0gdGhpcy5faXRlbXMubGVuZ3RoO1xyXG5cdFx0dmFyIGl0ZW1zVG9SZW1vdmUgPSBbXTtcclxuXHRcdHZhciBpO1xyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgaXRlbXNMZW5naHQ7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5faXRlbXNbaV0uaXNDb21wbGV0ZWQpIHtcclxuXHRcdFx0XHRpdGVtc1RvUmVtb3ZlLnB1c2godGhpcy5faXRlbXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpdGVtc1RvUmVtb3ZlLmZvckVhY2godGhpcy5yZW1vdmVJdGVtLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0Z2V0TGlzdE1hcmt1cCAoKSB7IFxyXG5cdFx0dmFyIGh0bWwgPSAnJztcclxuXHRcdHRoaXMuX2l0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcclxuXHRcdFx0dmFyIGxpQ2xhc3MgPSAnJztcclxuXHRcdFx0dmFyIGNoZWNrZWQgPSAnJztcclxuXHRcdFx0aWYgKGkuaXNDb21wbGV0ZWQpIHtcclxuXHRcdFx0XHRsaUNsYXNzID0gJ2NsYXNzPVwiaXMtY29tcGxldGVkXCInO1xyXG5cdFx0XHRcdGNoZWNrZWQgPSAnY2hlY2tlZD1cImNoZWNrZWRcIic7XHJcblx0XHRcdH1cclxuXHRcdFx0aHRtbCArPSBgPGxpICR7bGlDbGFzc30+XHJcblx0XHRcdFx0XHRcdDxpbnB1dCBkYXRhLWlkPVwiJHtpLmlkfVwiIGRhdGEtYWN0aW9uPVwidG9nZ2xlSXRlbUlzQ29tcGxldGVkXCIgdHlwZT1cImNoZWNrYm94XCIgJHtjaGVja2VkfT5cclxuXHRcdFx0XHRcdFx0JHtpLm5hbWV9XHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiaXRlbS1kZWxldGVcIj5cclxuXHRcdFx0XHRcdFx0XHRbPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlSXRlbVwiIGRhdGEtaWQ9XCIke2kuaWR9XCI+RGVsZXRlPC9hPl1cclxuXHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9saT5gO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBodG1sO1xyXG5cdH1cclxuXHRcclxuXHRyZW5kZXIgKCkge1xyXG5cdFx0dmFyIHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndWwnKTtcclxuXHRcdHVsLmlubmVySFRNTCA9IHRoaXMuZ2V0TGlzdE1hcmt1cCgpO1xyXG5cdH1cclxufSJdfQ==
