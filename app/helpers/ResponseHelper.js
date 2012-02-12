function ResponseHelper(res, options){
	this.response = res;
	if(options) {
		if(options.serialization) {
			this.serialization = options.serialization;
		} else {
			this.serialization = 'json';
		}
	}
}

ResponseHelper.prototype.generateBody = function() {
	var answer = {
		success: true, exception: {
			code: null,
			message: null
		},
		data: null
	};
	return answer;
};

ResponseHelper.prototype.send = function(answer, status) {
	this.response.header("Content-Type", "application/json; charset=utf-8");
	switch (this.serialization) {
		case 'json':
			answer.data = JSON.stringify(answer.data);
			answer = JSON.stringify(answer);
			break;
	}
	if (!status) {
		status = 200;
	}
	this.response.send(answer, status);
};

module.exports = ResponseHelper;