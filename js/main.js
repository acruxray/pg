window.onload = function() {

	var pasgen = document.getElementById('password');

	pasgen.addEventListener('blur', function() {

		var salt1 		= document.getElementById('salt1').value;
		var salt2 		= document.getElementById('salt2').value;
		var password 	= document.getElementById('password').value;

		document.getElementById('pg').innerHTML = pg(password, salt1, salt2);

		var cb = document.getElementById('clipboard');
		cb.innerHTML = 'Copy to clipboard';
		cb.style = 'color: inherit';

		copyToClipboard('clipboard');

	});

}


function copyToClipboard(id) {

	var cb = document.getElementById(id);

	var clipboard = new Clipboard('#' + id);

	clipboard.on('success', function(e) {
		// console.log(e);
		cb.innerHTML = 'The password has been copied';
		cb.style = 'color: #00cc00';

		e.clearSelection();
	});

	clipboard.on('error', function(e) {
		// console.log(e);
		cb.innerHTML = 'The password was not copied';
		cb.style = 'color: #990000';
	});

}