PB.Photos = can.Control({
		defaults: {}
}, {
    photos: undefined,
    init: function () {
        this.photos = new can.List([]);
        var v = Helpers.getView(PB.Views.photos, this.photos);
        this.element.html(v);
		this.getPhotos()
	},
    getPhotos: function () {
        $.get(config.API_URL + "photos", this.proxy(function(response){
            this.photos.attr(response);
        }));
    }

});