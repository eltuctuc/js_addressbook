$(document).ready(function() {

	App.init();

	$('#backBtn').click(function (event) {
		App.prevContact();
	});
	$('#nextBtn').click(function (event) {
		App.nextContact();
	});
	$('#newBtn').click(function (event) {
	});
	$('#editBtn').click(function (event) {
		App.editContact();
	});
});
