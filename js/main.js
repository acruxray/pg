(() => {

	const pasGen   = document.getElementById('password');
	const pgResult = document.getElementById('pg');
	const clearAll = document.getElementById('clear_all');
	const clear    = document.getElementById('clear');
	const s1       = document.getElementById('salt1');
	const s2       = document.getElementById('salt2');
	const cb       = document.getElementById('clipboard');

	s1.value = localStorage.getItem('salt1');
	s2.value = localStorage.getItem('salt2');

	// INITIAL STATE
	switchType();
	setSettingsSave();

	const getResult = () => {
		if (s1.value.length + s2.value.length + pasGen.value.length > 0) {
			const salt1    = s1.value;
			const salt2    = s2.value;
			const password = pasGen.value;

			if (getSettingsSave()) {
				localStorage.setItem('salt1', salt1);
				localStorage.setItem('salt2', salt2);
			}

			pgResult.value = getPgMethod()(salt1, salt2, password);

			cb.classList.remove('bg-success', 'bg-danger');
			cb.innerHTML = 'Copy';

			copyToClipboard('clipboard');
		}
	}

	s1.addEventListener('blur', getResult);
	s2.addEventListener('blur', getResult);
	pasGen.addEventListener('blur', getResult);

	clearAll.addEventListener('click', () => {

		s1.value = '';
		s2.value = '';
		pasGen.value = '';
		pasGen.focus();
		pgResult.value = '';

		localStorage.removeItem('salt1');
		localStorage.removeItem('salt2');
		localStorage.removeItem('pgType');
		switchType();

		cb.classList.remove('bg-success', 'bg-danger');
		cb.innerHTML = 'Copy';

	});

	clear.addEventListener('click', () => {

		pasGen.value = '';
		pasGen.focus();
		pgResult.value = '';

		cb.classList.remove('bg-success', 'bg-danger');
		cb.innerHTML = 'Copy';

	});

})();

function getSettingsSave(defaultValue = '0') {
	return Boolean(parseInt(localStorage.getItem('settingsSave') || defaultValue));
}

function setSettingsSave() {
	const isSaveSettings = (defaultValue) => {
		if (!localStorage.getItem('settingsSave')) return false;

		return getSettingsSave(defaultValue);
	}

	const settingsSave = document.getElementById('settings_save');

	if (!isSaveSettings()) {
		settingsSave.removeAttribute('checked');
	} else {
		settingsSave.setAttribute('checked', '');
	}

	settingsSave.addEventListener('click', () => {
		localStorage.setItem('settingsSave', isSaveSettings('1') ? '0' : '1');
	});
}

function copyToClipboard(id) {

	const cb = document.getElementById(id);

	const clipboard = new Clipboard('#' + id);

	clipboard.on('success', (e) => {
		cb.classList.add('bg-success');
		cb.innerHTML = 'Copied';

		e.clearSelection();
	});

	clipboard.on('error', (e) => {
		cb.classList.add('bg-danger');
		cb.innerHTML = 'Error';
	});
}

function getCurrentType() {
	return localStorage.getItem('pgType') || 'long';
}

function switchType() {
	const tShort  = document.getElementById('t_short');
	const tMiddle = document.getElementById('t_middle');
	const tLong   = document.getElementById('t_long');

	const switchTypeInternal = (id) => {
		[ tShort, tMiddle, tLong ].forEach(item => {
			item.classList.remove('bg-secondary', 'active');
			if (id === 'short') tShort.classList.add('bg-secondary', 'active');
			if (id === 'middle') tMiddle.classList.add('bg-secondary', 'active');
			if (id === 'long') tLong.classList.add('bg-secondary', 'active');
		});

		localStorage.setItem('pgType', id);
	}

	switchTypeInternal(getCurrentType());

	tShort.addEventListener('click', () => {
		switchTypeInternal('short');
	});
	tMiddle.addEventListener('click', () => {
		switchTypeInternal('middle');
	});
	tLong.addEventListener('click', () => {
		switchTypeInternal('long');
	});
}

function getPgMethod() {
	const pgMethods = {
		short:  pgShort,
		middle: pgMiddle,
		long:   pgLong,
	};

	return pgMethods[getCurrentType()];
}
