PB.Photo = can.Control({
    defaults: {}
}, {
    data: undefined,
    viewData: undefined,
    init: function () {
        this.data = this.options;
        this.viewData = new can.Map({
            thumbnail: this.data.thumbnail,
            like_count: this.data.like_count || 0,
            isLoved: this.isLoved()
        });
        this.element.html(Helpers.getView(PB.Views.photo, this.viewData))
    },
    patch: function (field, val, callback) {
        var d = {
            csrftoken: config.CSRF_TOKEN,
            id: this.data.id
        };
        d[field] = val;
        $.ajax({
            url: config.API_URL + config.PHOTOS_PATH + this.data.id + "/",
            method: "PATCH",
            data: d,
            complete: this.proxy(function (response) {
                if (callback) callback(response);
            })
        });
    },
    saveSomeLove: function () {
        var loved = Storage.get("loved");
        if(!loved) {
            loved = [];
        }
        loved.push(this.data.id);
        Storage.set("loved", loved);
    },
    isLoved: function () {
        var loved = Storage.get("loved");
        if(!loved) return false;
        return loved.indexOf(this.data.id) > -1;
    },
    love: function () {
        if (!this.isLoved()) {
            this.saveSomeLove();
            this.viewData.attr("isLoved", true);
            this.viewData.attr("like_count", this.viewData.attr("like_count") + 1);
            this.patch("like_count", this.viewData.attr("like_count"), this.proxy(function (response) {

            }));
        }
    },
    '[data-action=remove] click': function () {
        this.patch("is_active", false)
    },
    '[data-action=full-screen] click': function () {
        var splash = new PB.PhotoSplash('<div class="photo-splash">', {data: this.data, love: this.proxy(this.love)});
        $("body").append(splash.element);
    },
    '[data-action=love] click': function () {
        this.love();
    }
});