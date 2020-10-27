const { ajax } = require('jquery');
const $ = require('jquery');
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
	UGC_share: {
		url: 'https://kkl.uxer-lab.com/api/share',
		update(base64) {
			return new Promise((res, rej) => {
				$.post(this.url, base64)
					.done(function (e) {
						res(e);
					})
					.fail(function (err) {
						rej(err);
					});
			});
		},
	},
	Submit: {
		url: 'https://kkl.uxer-lab.com/api/save',
		send(data) {
			return new Promise((res, rej) => {
				$.post(this.url, data)
					.done(function (e) {
						res(e);
					})
					.fail(function (err) {
						rej(err);
					});
			});
		},
	},
};