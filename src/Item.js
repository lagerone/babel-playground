import {getId} from './IdFactory';

export class Item {
	constructor (name) {
		this._id = getId();
		this._name = name;
		this._isCompleted = false;
	}

	get id () {
		return this._id;
	}

	set id (value) {
		throw new Error('private property');
	}

	get isCompleted () {
		return this._isCompleted;
	}

	set isCompleted (isCompleted) {
		this._isCompleted = isCompleted;
	}

	get name () {
		return this._name;
	}

	set name (newName) {
		this._name = newName;
	}
}