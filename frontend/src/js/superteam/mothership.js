//NS
PB = {
    Views: {}
};
PB.Mothership = can.Control({
    defaults: {}
}, {
    main: undefined,
    init: function () {
        if(this.element.hasClass("app"))
            this.main = new PB.App("body", {});
        else
            this.main = new PB.Photos("[data-c=photos]", {});
    }
});

$(document).ready(function () {
    new PB.Mothership("body", {});
});