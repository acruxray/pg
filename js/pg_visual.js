function pg(salt1, salt2, data){

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

	var fr = ['.','_','^','-','+','*','{','}','[',']','#','@','!','&','?','%',':',';','~','|',',','<','>','/','\\','\'','"'];

	for (var i = 8; i <= 34; i++) {
		res = res.replace(base.substr(i, 2), fr[i - 8]);
	}

	return res;
}

function isEven(n) {
	return n % 2 == 0;
}

function isOdd(n) {
	return Math.abs(n % 2) == 1;
}
