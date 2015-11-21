PB = {};
PB.Mothership = can.Control({
    defaults: {}
}, {
    init: function () {
        alert("Jubel");

    }
});

$(document).ready(function () {
    new PB.Mothership(".body", {});
});