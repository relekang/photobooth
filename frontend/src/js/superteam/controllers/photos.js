PB.Photos = can.Control({
		defaults: {}
}, {
    photos: undefined,
    timer: undefined,
    init: function () {
        this.photos = [];
        var v = Helpers.getView(PB.Views.photos);
        this.element.html(v);
		this.timer = setInterval(this.proxy(this.getPhotos), config.PHOTOS_GET_INTERVAL)
	},
    updatePhoto: function (photo) {

    },
    getPhotos: function () {
        $.get(config.API_URL + config.PHOTOS_PATH, this.proxy(function(response){
            for (var i = 0; i < response.length; i++) {
                var photo = response[i];
                if(!this.photoAlreadyExists(photo)){
                    this.addPhoto(photo);
                }
                else{
                    this.updatePhoto(photo);
                }
            }

        }));
    },
    addPhoto: function(photo){
        this.photos.push(photo);
        var p = new PB.Photo($('<li class="photo">'), photo);
        this.element.find(".photos").prepend(p.element);
    },
    photoAlreadyExists: function(photo){
        for (var i = 0; i < this.photos.length; i++) {
            var p = this.photos[i];
            if(photo.id == p.id)
                return true;
        }
        return false;
    },
    stopTimer: function(){
        clearInterval(this.timer);
    }

});