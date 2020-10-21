module.exports = {
	lastComponent: 'D',
	Loader: {
		index: 0,
		max: 86,
		mode: 'debug',
		each() {
			this.index++;
			if (this.mode == 'debug' && this.index > this.max) console.log(this.index);
			if (this.index >= this.max) this.loaded();
		},
		loaded() {
			console.log('loaded');
		},
	},
};
