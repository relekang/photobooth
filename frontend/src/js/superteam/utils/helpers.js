Helpers = {
    getView: function (view, data) {
        var renderer = can.view.ejs(view);
        return renderer(data || {});
    },
    getBreakpoint: function () {
        var bp = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').trim();
        bp = bp.replace(/"/g, "").replace(/'/g, ""); //strip away extra tøddel-characters (' and ")
        return bp;
    },
    isIE: function () {
        return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)));
    },
    ieVersion: function () {
        var v = new Function("/*@cc_on return @_jscript_version; @*/")();
        if(v === undefined && this.isIE() == true){
            v = 11;
        }
        return v;
    },
    getURLParameter: function (name, url) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url || location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
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