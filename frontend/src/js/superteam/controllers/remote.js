PB.Remote = can.Control({
		defaults: {}
}, {
	init: function () {
	},
    '[data-action=camera-shot] click': function(){
        $.post(config.CAMERA_SNAPSHOT_URL, this.proxy(function(response){
            console.log(response);
        }))
    }
});