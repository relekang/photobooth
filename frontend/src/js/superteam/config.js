config = {};
config.APP_URL = "http://booth.lkng.me/";
config.WS_URL = "ws://ron.frigg.io:1337";
config.API_URL = config.APP_URL + "api/";
config.PHOTOS_PATH = "photos/";
config.CAMERA_SNAPSHOT_URL = config.API_URL + config.PHOTOS_PATH + "take/";
config.PHOTOS_GET_INTERVAL = 500;
config.PHOTO_COOLDOWN_TIME = 5000;

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
config.CSRF_TOKEN = getCookie('csrftoken');