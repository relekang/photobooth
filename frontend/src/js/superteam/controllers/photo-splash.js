PB.PhotoSplash = can.Control({
    defaults: {}
}, {
    active: false,
    isDismissed: false,

    init: function () {
        this.element.html(Helpers.getView(PB.Views.photo_splash, {
            url: this.options.preview.vignette,
            likeCount: this.options.like_count
        }));
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
    '[data-action=prev] click': function(){

    },
    '[data-action=next] click': function(){

    }
});