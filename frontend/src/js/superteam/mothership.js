//NS
PB = {
    Views: {}
};
PB.Mothership = can.Control({
    defaults: {}
}, {
    main: undefined,
    init: function () {
        if(this.element.hasClass("remote"))
            this.main = new PB.Remote("body", {});
        else
            this.main = new PB.Photos("[data-controller=photos]", {});
    }
});

$(document).ready(function () {
    new PB.Mothership("body", {});
});