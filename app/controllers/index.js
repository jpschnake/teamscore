exports.bootstrap = function(app, i18n) {
	require('./games').boot(app, i18n);
};