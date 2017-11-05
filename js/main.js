window.onload = function() {

	var pasgen = document.getElementById('password');

	pasgen.addEventListener('blur', function() {

		var salt1 		= document.getElementById('salt1').value;
		var salt2 		= document.getElementById('salt2').value;
		var password 	= document.getElementById('password').value;

		document.getElementById('pg').innerHTML = pg(password, salt1, salt2);

	});

}
