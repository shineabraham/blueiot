function mySaltEncryption(data) {
	var key = CryptoJS.enc.Latin1.parse(keyByConfiged);
	var iv = CryptoJS.enc.Latin1.parse(ivByConfiged);
	//加密
	var encrypted = CryptoJS.AES.encrypt(data, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.ZeroPadding
	});
	encrypted = encrypted.toString();
	encrypted = encrypted.replace(/"/g, "\\\"");
	return encrypted;
}
function mySaltDecrypt(encrypted) {
	//解密
	var key = CryptoJS.enc.Latin1.parse(keyByConfiged);
	var iv = CryptoJS.enc.Latin1.parse(ivByConfiged);
	var decrypted = CryptoJS.AES.decrypt(encrypted, key, {iv: iv, padding: CryptoJS.pad.ZeroPadding});
	return decrypted.toString(CryptoJS.enc.Utf8);
}