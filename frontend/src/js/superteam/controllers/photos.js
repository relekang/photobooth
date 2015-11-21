PB.Photos = can.Control({
    defaults: {
        pageCount: 12
    }
}, {
    photos: undefined,
    timer: undefined,
    socket: undefined,
    viewData: undefined,
    currentPage: 1,
    init: function () {
        this.viewData = new can.Map({
            latest: undefined,
            photoCount: 0
        });
        this.photos = [];

        var v = Helpers.getView(PB.Views.photos, this.viewData);
        this.element.html(v);
        this.getPhotos();
        //this.timer = setInterval(this.proxy(this.getPhotos), config.PHOTOS_GET_INTERVAL)
        this.initWebSocket();
    },
    initWebSocket: function () {
        this.socket = new ReconnectingWebSocket(config.WS_URL);
        this.socket.debug = true;

        this.socket.onopen = function () {
            console.log("Socket connected");
        };
        this.socket.onmessage = this.proxy(function (message) {
            var socketPhoto = JSON.parse(message.data).photo;
            if (this.photoAlreadyExists(socketPhoto)) {
                if (!socketPhoto.is_active) {
                    this.removePhotoById(socketPhoto.id);
                } else {
                    this.updatePhoto(socketPhoto)
                }
            } else {
                this.photos.push(socketPhoto);
            }
            this.render();
        });
    },
    updatePhoto: function (photo) {
        var p = this.photoById(photo.id);
        p.like_count = photo.like_count;
    },
    getPhotos: function () {
        $.get(config.API_URL + config.PHOTOS_PATH, this.proxy(function (response) {
            this.photos = response;
            this.render();
        }));
    },
    render: function () {
        this.element.find(".photo").remove();

        if (this.photos.length == 0) return;
        var top = JSON.parse(JSON.stringify(this.photos)).sort(function (a, b) {
            return b.like_count - a.like_count;
        });
        top = top.take(8).reverse();

        this.photos = this.photos.sort(function (a, b) {
            return a.id - b.id;
        });

        this.viewData.attr("photoCount", this.photos.length);
        this.viewData.attr("latest", this.photos[this.photos.length-1].preview.vignette);

        for (var i = 0; i < top.length; i++) {
            var topItem = top[i];
            var pTop = new PB.Photo($('<li class="photo">'), topItem);
            this.element.find(".photos[data-list=top]").prepend(pTop.element);
        }
        var items = this.photos.skip((this.currentPage - 1) * this.options.pageCount).take(this.options.pageCount);
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            var p = new PB.Photo($('<li class="photo">'), item);
            this.element.find(".photos[data-list=all]").prepend(p.element);
        }

    },
    photoById: function (id) {
        for (var i = 0; i < this.photos.length; i++) {
            var p = this.photos[i]
            if (p.id == id) {
                return p;
            }
        }
    },
    removePhotoById: function (id) {
        for (var i = 0; i < this.photos.length; i++) {
            var p = this.photos[i]
            if (p.id == id) {
                this.photos.splice(i, 1);
            }
        }
    },
    photoAlreadyExists: function (photo) {
        for (var i = 0; i < this.photos.length; i++) {
            var p = this.photos[i];
            if (photo.id == p.id)
                return true;
        }
        return false;
    },
    stopTimer: function () {
        clearInterval(this.timer);
    },
    '[data-action=prev] click': function () {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.render()
        }
    },
    '[data-action=next] click': function () {
        console.log("asd");
        var totalPages = Math.ceil(this.photos.length/this.options.pageCount);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.render()
        }
    }
});