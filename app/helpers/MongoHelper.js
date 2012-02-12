function MongoHelper() {}

MongoHelper.prototype.recordExists = function(error) {
	var message = error.message;

	return (message.indexOf('duplicate') !== -1);
};

MongoHelper.prototype.createTimestamp = function(){
	var date = new Date();

    return ((((date.getFullYear()*100 + date.getMonth()+1)*100 + date.getDate())*100 + date.getHours())*100 + date.getMinutes())*100 + date.getSeconds();
};

MongoHelper.prototype.createClearString = function(original){
	original = original.toLowerCase();

	original = original.replace('ä', 'ae');
	original = original.replace('ö', 'oe');
	original = original.replace('ü', 'ue');
	original = original.replace('ß', 'ss');

	original = original.replace(/[^a-z0-9]+/g, '-');
	original = original.replace(/^-|-$/g, '');

	return original;
};

module.exports = MongoHelper;