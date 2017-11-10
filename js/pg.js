function pg(salt1, salt2, data){

	var er          = md5(data + salt1);
	var pgArray     = (er.substr(0,8) + er.substr(8,8).toUpperCase()).split('');
	var base        = Base64.encode( md5(data + salt2) );
	var pg2Array    = base.substr(8,16).split('').reverse();
	var pg4Array    = [];
	var k           = 0;
	var j           = 0;

	for (var i = 0; i <= 32; i++) {
		if (Math.abs(i % 2) == 1) { // odd
			pg4Array[i] = pg2Array[k];
			k++;
		}

		if (i % 2 == 0) { // even
			pg4Array[i] = pgArray[j];
			j++;
		}

	}

	var res = pg4Array.join('');
	var fr  = ['.','_','^','-','+','*','{','}','[',']','#','@','!','&','?','%',':',';','~','|',',','<','>','/','\\','\'','"'];

	for (var i = 8; i <= 34; i++) {
		res = res.replace(base.substr(i, 2), fr[i - 8]);
	}

	return res;
}
