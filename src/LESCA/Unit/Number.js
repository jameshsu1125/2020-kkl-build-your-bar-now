module.exports = {
	Pad: function (str, max) {
		var s = '';
		for (var i = 0; i < max; i++) s += '0';
		return String(s + str).slice(max * -1);
	},

	Uid(num) {
		var t = '';
		for (var i = 0; i < num; i++) {
			t += (((1 + Math.random()) * 0x10) | 0).toString(16).substring(1);
		}
		return t;
	},
};
