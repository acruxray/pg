function pgShort(salt1 = '', salt2 = '', data = ''){
	const er  = md5(md5(`${salt1}${data}${salt2}`));
	const er1 = er.substr(0, 16);
	const er2 = er.substr(16, 32);
	const er3 = md5(`${er2}${er1}`);
	const er4 = er3.substr(0, 16);
	const er5 = er4.substr(0, 8);
	const er6 = er4.substr(8, 16).toUpperCase();

	return `${er5}${er6}`;
}

function pgMiddle(salt1 = '', salt2 = '', data = ''){
	return Base64.encode(md5(`${salt1}${data}${salt2}`)).substr(8, 20).split('').reverse().join('');
}

function pgLong(salt1 = '', salt2 = '', data = ''){
	const er       = md5(`${data}${salt1}`);
	const pgArray  = (er.substr(0,8) + er.substr(8,8).toUpperCase()).split('');
	const base     = Base64.encode(md5(`${data}${salt2}`));
	const pg2Array = base.substr(8,16).split('').reverse();
	const pg4Array = [];
	let k          = 0;
	let j          = 0;

	for (let i = 0; i <= 32; i++) {
		if (Math.abs(i % 2) == 1) { // odd
			pg4Array[i] = pg2Array[k];
			k++;
		}

		if (i % 2 == 0) { // even
			pg4Array[i] = pgArray[j];
			j++;
		}

	}

	let res = pg4Array.join('');
	const fr  = ['.','_','^','-','+','*','{','}','[',']','#','@','!','&','?','%',':',';','~','|',',','<','>','/','\\','\'','"'];

	for (let i = 8; i <= 34; i++) {
		res = res.replace(base.substr(i, 2), fr[i - 8]);
	}

	return res;
}
