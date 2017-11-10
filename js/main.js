window.onload = function() {

	var pasGen 		= document.getElementById('password');
	var pgResult 	= document.getElementById('pg');
	var clearAll 	= document.getElementById('clear_all');
	var clear 		= document.getElementById('clear');
	var s1 			= document.getElementById('salt1');
	var s2 			= document.getElementById('salt2');
	var cb 			= document.getElementById('clipboard');

	s1.value = localStorage.getItem('salt1');
	s2.value = localStorage.getItem('salt2');

	pasGen.addEventListener('blur', function() {

		var salt1 		= s1.value;
		var salt2 		= s2.value;
		var password 	= pasGen.value;

		if (password != '') {
			localStorage.setItem('salt1', salt1);
			localStorage.setItem('salt2', salt2);

			pgResult.innerHTML = pg(salt1, salt2, password);

			cb.style = 'color: inherit';

			copyToClipboard('clipboard');
		}

	});

	clearAll.addEventListener('click', function() {

		s1.value = '';
		s2.value = '';
		pasGen.value = '';
		pasGen.focus();
		pgResult.innerHTML = '';

		localStorage.removeItem('salt1');
		localStorage.removeItem('salt2');

		cb.style = 'color: inherit';

	});

	clear.addEventListener('click', function() {

		pasGen.value = '';
		pasGen.focus();
		pgResult.innerHTML = '';

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
