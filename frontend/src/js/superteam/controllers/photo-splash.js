PB.PhotoSplash = can.Control({
    defaults: {}
}, {
    active: false,
    isDismissed: false,
    hasLoved: false,
    viewData: undefined,
    init: function () {
        this.viewData = new can.Map({
            url: this.options.data.preview.vignette,
            likeCount: this.options.data.like_count
        })
        this.element.html(Helpers.getView(PB.Views.photo_splash, this.viewData));
        this.ready();
    },
    ready: function(){
        $("body").append(this.element);
        this.show();
    },
    show: function () {
        //Timeout to allow positioning before animation
        setTimeout(this.proxy(function () {
            this.element.addClass("visible");
        }), 20);

        setTimeout(this.proxy(function () {
            this.active = true;
            this.onShowComplete();
            //this.element.focus();
            this.on();
        }), 500);
    },
    onShowComplete: function(){},
    '[data-action=close] click': function (el) {
        if (!this.options.unclosable) {
            this.dismiss();
        }
    },
    dismiss: function () {
        if (!this.active || this.isDismissed) {
            return;
        }

        this.isDismissed = true;
        this.element.removeClass("visible");
        setTimeout(this.proxy(function () {
            this.element.remove();
        }), 500)
    },
    '.overlay click': function () {
        if (!this.isDismissed) {
            this.dismiss();
        }
    },
    '[data-action=love] click': function(){
        if(!this.hasLoved){
            this.hasLoved = true;
            this.options.love();
            this.element.addClass("loved")
            this.viewData.attr("likeCount", this.viewData.attr("likeCount") + 1);
        }
    },
    '[data-action=prev] click': function(){

    },
    '[data-action=next] click': function(){

    }
});