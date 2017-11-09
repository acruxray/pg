window.onload = function() {

	var pasgen 		= document.getElementById('password');
	var pgresult 	= document.getElementById('pg');
	var clear 		= document.getElementById('clear');
	var s1 			= document.getElementById('salt1');
	var s2 			= document.getElementById('salt2');
	var cb 			= document.getElementById('clipboard');

	s1.value = localStorage.getItem('salt1');
	s2.value = localStorage.getItem('salt2');

	pasgen.addEventListener('blur', function() {

		var salt1 		= s1.value;
		var salt2 		= s2.value;
		var password 	= document.getElementById('password').value;

		localStorage.setItem('salt1', salt1);
		localStorage.setItem('salt2', salt2);

		pgresult.innerHTML = pg(password, salt1, salt2);

		cb.style = 'color: inherit';

		copyToClipboard('clipboard');

	});

	clear.addEventListener('click', function() {

		pasgen.value = '';
		pasgen.focus();
		pgresult.innerHTML = '';

		cb.style = 'color: inherit';

	});

}


function copyToClipboard(id) {

	var cb = document.getElementById(id);

	var clipboard = new Clipboard('#' + id);

	clipboard.on('success', function(e) {
		// console.log(e);
		cb.style = 'color: #00cc00';

		e.clearSelection();
	});

	clipboard.on('error', function(e) {
		// console.log(e);
		cb.style = 'color: #990000';
	});

}
