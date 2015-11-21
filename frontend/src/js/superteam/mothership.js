//NS
PB = {
    Views: {}
};
PB.Mothership = can.Control({
    defaults: {}
}, {
    photos: undefined,
    init: function () {
        this.photos = new PB.Photos("[data-c=photos]", {});
    }
});

$(document).ready(function () {
    new PB.Mothership("body", {});
});