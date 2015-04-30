import {Item} from './Item';

export class List {
	constructor (items) {
		this._items = items.map((i) => new Item(i));		
	}

	get items () {
		return this._items;
	}

	set items (items) {
		throw new Error('action not allowed');
	}

	addItem (itemName) {
		this._items.push(new Item(itemName));
	}

	getItemAndIndexById (itemId) {
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

	removeItemById (itemId) {
		var itemFound = this.getItemAndIndexById(itemId);
		if (itemFound.item) {
			this._items.splice(itemFound.index, 1);	
		}
	}

	removeItem (item) {
		var itemIndex = this._items.indexOf(item);
		this._items.splice(itemIndex, 1);
	}

	toggleItemIsCompleted (itemId) {
		var itemFound = this.getItemAndIndexById(itemId);
		if (!itemFound.item) {
			return;
		}
		itemFound.item.isCompleted = !itemFound.item.isCompleted;
	}

	clearCompletedItems () {
		var itemsLenght = this._items.length;
		var itemsToRemove = [];
		var i;
		for(i = 0; i < itemsLenght; i++) {
			if (this._items[i].isCompleted) {
				itemsToRemove.push(this._items[i]);
			}
		}
		itemsToRemove.forEach(this.removeItem.bind(this));
	}

	getListMarkup () { 
		var html = '';
		this._items.forEach(function (i) {
			var liClass = '';
			var checked = '';
			if (i.isCompleted) {
				liClass = 'class="is-completed"';
				checked = 'checked="checked"';
			}
			html += `<li ${liClass}>
						<input data-id="${i.id}" data-action="toggleItemIsCompleted" type="checkbox" ${checked}>
						${i.name}
						<span class="item-delete">
							[<a href="javascript:void(0)" data-action="deleteItem" data-id="${i.id}">Delete</a>]
						</span>
					</li>`;
		});
		
		return html;
	}
	
	render () {
		var ul = document.querySelector('ul');
		ul.innerHTML = this.getListMarkup();
	}
}