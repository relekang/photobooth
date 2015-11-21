Helpers = {
    getView: function (view, data) {
        var renderer = can.view.ejs(view);
        return renderer(data || {});
    },
    viewModal: function (type, _data, wide) {
        var data = _data || {};
        data.type = type;
        var cls = "modal" + (wide ? " wide" : "");
        var el = $("<div class='" + cls + "'></div>");

        var controller = "";
        var split = $.trim(type).split("-");
        for (var i = 0; i < split.length; i++) {
            controller += Helpers.String.firstLetterUpperCase(split[i]);
        }
        new Modal[controller](el, data);
    }
};