function ExceptionHelper(i18n){
	this.texts = i18n;
}

ExceptionHelper.prototype.get = function(code) {
	var me = this;

	var exception = {
		code: code,
		message: me.texts.exceptions['e' + code]
	};
	return exception;
};

module.exports = ExceptionHelper;