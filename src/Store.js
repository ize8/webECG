import {observable, computed, autorun} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

class MainStore {
	@observable myVar;

	constructor () {
		this.myVar = 'coming from the Store...';
	}

}

const mainStore = window.mainStore = new MainStore();

export default mainStore;