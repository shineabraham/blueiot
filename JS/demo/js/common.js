var Crypto = {
	//加密
	encryption: function(data) {
		data = JSON.stringify(data);
		var str = '';
		var alterText = [];
		var varCost = [];
		var TextLength = data.length;
		for (var i = 0; i < TextLength; i++) {
			var random = parseInt(Math.random() * 266);
			alterText[i] = data.charCodeAt(i) + random;
			varCost[i] = random;
		}
		for (var i = 0; i < TextLength; i++) {
			str += String.fromCharCode(alterText[i], varCost[i]);
		}
		return str;
	},

	//解密
	decrypt: function(text) {
		var str = '';
		var alterText = [];
		var varCost = [];
		var TextLength = text.length;
		for (var i = 0; i < TextLength; i++) {
			alterText[i] = text.charCodeAt(i);
			varCost[i] = text.charCodeAt(i + 1);
		}
		for (var i = 0; i < TextLength; i = i + 2) {
			str += String.fromCharCode(alterText[i] - varCost[i]);
		}
		return JSON.parse(str);
	}
	
};