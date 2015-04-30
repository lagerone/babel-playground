import {List} from './List';

var APP_WRAPPER = document.getElementById('app');
var ITEM_INPUT = APP_WRAPPER.querySelector('input[type="text"]');

var list = new List(['foo', 'bar', 'hello', 'world']);

var appEvents = {
	addItem () {
		var value = ITEM_INPUT.value.trim();
		if (value !== '') {
			list.addItem(value);
		}
		ITEM_INPUT.value = '';
		ITEM_INPUT.focus();
		list.render();
	},
	
	clearCompletedItems () {
		list.clearCompletedItems();
		list.render();
	},
	
	deleteItem () {
		list.removeItemById(parseInt(this.getAttribute('data-id'), 10));
		list.render();
	},
	
	toggleItemIsCompleted () {
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