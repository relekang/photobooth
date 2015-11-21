PB.Photos = can.Control({
		defaults: {}
}, {
    photos: undefined,
    timer: undefined,
    socket: undefined,
    init: function () {
        this.photos = [];
        var v = Helpers.getView(PB.Views.photos);
        this.element.html(v);
		this.timer = setInterval(this.proxy(this.getPhotos), config.PHOTOS_GET_INTERVAL)
        this.initWebSocket();
	},
    initWebSocket: function () {
        this.socket = new ReconnectingWebSocket(config.WS_URL);
        this.socket.open();
        this.socket.onopen(this.proxy(function(){
            console.log("JUBEL");
        }));
        this.socket.onmessage(this.proxy(function(message){
            console.log(message);
        }));
    },
    newPhoto: function(data){

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
    newPhotoSplash: function (photo) {

    },
    addPhoto: function(photo){
        this.newPhotoSplash(photo);
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