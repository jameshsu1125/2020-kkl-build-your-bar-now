const gid = require('./../../Component/_config').gtag_id;

export const gtag_install = () => {
	const scriptId = 'ga-gtag';
	window.gtagID = window.gtagID || gid;

	if (document.getElementById(scriptId)) return;

	const { head } = document;
	const script = document.createElement('script');
	script.id = scriptId;
	script.type = 'text/javascript';
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${gid}`;
	head.insertBefore(script, head.firstChild);

	window.dataLayer = window.dataLayer || [];

	gtag('js', new Date());
	gtag('config', gid);
};

export const gtag = function () {
	window.dataLayer.push(arguments);
};

export const gtag_pv = function (title) {
	let id = window.gtagID || gid;
	if (!id) return;
	if (!gtag) return;
	gtag('config', id, {
		page_title: title,
		page_path: '/' + title,
	});
};

export const gtag_event = function (title, description = '') {
	if (!gtag) return;
	gtag('event', 'click', {
		event_category: title,
		event_label: description,
	});
};
