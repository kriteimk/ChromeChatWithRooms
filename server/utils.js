function generate() {
    var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var str = '';

    for(var i = 0; i < 8; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    }
	return str;
}

module.exports.generate = generate;