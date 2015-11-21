PB.Photos = can.Control({
		defaults: {}
}, {
    photos: undefined,
    timer: undefined,
    init: function () {
        this.photos = new can.List([]);
        var v = Helpers.getView(PB.Views.photos, this.photos);
        this.element.html(v);
		this.timer = setInterval(this.proxy(this.getPhotos), config.PHOTOS_GET_INTERVAL)
	},
    getPhotos: function () {
        console.log("get photos");
        $.get(config.API_URL + config.PHOTOS_PATH, this.proxy(function(response){
            this.photos.attr(response);
        }));
    },
    stopTimer: function(){
        clearInterval(this.timer);
    }

});