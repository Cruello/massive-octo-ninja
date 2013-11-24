wtf = (function () {


	function init(K) {
		coordInput = $('#coordinates');
		eventHandlers();
	}

	function eventHandlers() {
		$('#closeToDevice').change(function () {
			if (this.checked) {
				getPosition();
			}
		});
	}

	function getPosition() {
		if(navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(
		  	setPosition, setNullPosition, {});
		} else {
		  setNullPosition();
		}
	}

	function setPosition(position) {
		var pos = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}
		coordInput.val(JSON.stringify(pos));
	}

	function setNullPosition() {
		coordInput.val("");
	}

	return {
		"getPosition": getPosition,
		"init": init
	}
}());
