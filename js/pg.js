function pg(data, salt1, salt2){

	var er=md5(data + salt1);

	var er=er.substr(0,16);

	var er1=er.substr(0,8);

	var er2=er.substr(8,8);

	var er3=er2.toUpperCase();

	var er4=er1+er3;

	var pg = er4;

	var md = md5(data + salt2);

	var base = Base64.encode(md);

	var sub = base.substr(8,16);

	var str = sub.split('').reverse().join('');

	var pg2 = str;

	var pgArray = pg.split('');

	var pg2Array = pg2.split('');

	var commonLength = pgArray.length + pg2Array.length;

	var pg4Array = [];

	var k = 0;
	var j = 0;

	for (var i = 0; i < commonLength; i++) {
		if (isOdd(i)) {
			pg4Array[i] = pg2Array[k];
			k++;
		}

		if (isEven(i)) {
			pg4Array[i] = pgArray[j];
			j++;
		}
		
	}

	var res = pg4Array.join('');

	res = res.replace(base.substr(8,2), '.');
	res = res.replace(base.substr(9,2), '_');
	res = res.replace(base.substr(10,2), '^');
	res = res.replace(base.substr(11,2), '-');
	res = res.replace(base.substr(12,2), '+');
	res = res.replace(base.substr(13,2), '*');
	res = res.replace(base.substr(14,2), '{');
	res = res.replace(base.substr(15,2), '}');
	res = res.replace(base.substr(16,2), '[');
	res = res.replace(base.substr(17,2), ']');
	res = res.replace(base.substr(18,2), '#');
	res = res.replace(base.substr(19,2), '@');
	res = res.replace(base.substr(20,2), '!');
	res = res.replace(base.substr(21,2), '&');
	res = res.replace(base.substr(22,2), '?');
	res = res.replace(base.substr(23,2), '%');
	res = res.replace(base.substr(24,2), ':');
	res = res.replace(base.substr(25,2), ';');
	res = res.replace(base.substr(26,2), '~');
	res = res.replace(base.substr(27,2), '|');

	return res;
}

function isEven(n) {
	return n % 2 == 0;
}

function isOdd(n) {
	return Math.abs(n % 2) == 1;
}
