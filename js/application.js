var App = {
	contacts : [{
		name : 'Enrico Reinsdorf',
		email : 'enrico.reinsdorf@re-design.de',
		phone : '0177 20 22 447',
	},{
		name : 'Medienreich',
		email : 'info@medienreich.de',
		phone : '0952 123 45 67',
	}],

	currentItem : 0,

	showContact : function () {
		var contact = this.contacts[this.currentItem];

		$('#viewName').html(contact.name);
		$('#viewEmail').html(contact.email);
		$('#viewPhone').html(contact.phone);
	},

	init : function () {
		Ajax.init();
		Ajax.callback = function(text, xml)
		{
			console.log(text);

			App.insertContacts(text);
		};
		Ajax.doRequest('https://dl.dropboxusercontent.com/u/24499742/contacts.json');
	},

	insertContacts : function (text) {
		this.contacts = JSON.parse(text);

		console.log(this.contacts);

		this.showContact();
	},

	nextContact : function () {

		this.currentItem++;
		if (this.currentItem >= this.contacts.length) {
			this.currentItem = 0;
		};
		this.showContact();

		console.log('next', this.currentItem);
	},

	prevContact : function () {

		this.currentItem--;
		if (this.currentItem < 0) {
			this.currentItem = this.contacts.length-1;
		};
		this.showContact();

		console.log('prev', this.currentItem);
	},

	editContact : function (event) {
		var inputName = document.createElement('INPUT');
		$(inputName)
			.attr('id', 'inputEditName')
			.attr('type', 'text')
			.attr('placeholder', 'Vorname Nachname');
		var inputEmail = document.createElement('INPUT');
		$(inputEmail)
			.attr('id', 'inputEditEmail')
			.attr('type', 'email')
			.attr('placeholder', 'Email-Adresse');
		var inputPhone = document.createElement('INPUT');
		$(inputPhone)
			.attr('id', 'inputEditPhone')
			.attr('type', 'phone')
			.attr('placeholder', '0000 000 00 00');


		$('#viewName').html(inputName);
		$('#viewEmail').html(inputEmail);
		$('#viewPhone').html(inputPhone);

		$('#editBtn').attr('disabled', true);

		var cancelBtn = document.createElement('BUTTON');
		cancelBtn = $(cancelBtn)
			.addClass('btn btn-small')
			.html('Abbrechen')
			.insertAfter('.table')
			.click(function (event) {
				console.log(42);
				App.cancelContact();
			});

		var saveBtn = document.createElement('BUTTON');
		saveBtn = $(saveBtn)
			.addClass('btn btn-small')
			.html('Speichern')
			.click(function (event) {
				App.updateContact();
			});

		var btnGrp = document.createElement('NAV');
		$(btnGrp)
			.attr('id', 'editBar')
			.addClass('btn-group')
			.append(cancelBtn, saveBtn)
			.insertAfter('.table');

		console.log('new');
	},

	updateContact : function () {
		var contact = {
			name : $('#inputEditName').val(),
			email : $('#inputEditEmail').val(),
			phone : $('#inputEditPhone').val(),
		};
		//console.log(contact);

		this.contacts.push(contact);
		//console.log(this.contacts);

		this.currentItem = this.contacts.length-1;

		$('#editBar').remove();
		this.showContact();

		$('#editBtn').attr('disabled', false);
	},

	cancelContact : function () {
		$('#editBar').remove();
		this.showContact();

		$('#editBtn').attr('disabled', false);
	},
};