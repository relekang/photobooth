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
			cooldown: false
		});
		this.data.like_count = 0;
		this.element.html(Helpers.getView(PB.Views.photo, this.viewData))
	},
	patch: function(field, val, callback){
		var d = {
			csrftoken: config.CSRF_TOKEN,
			id: this.data.id
		};
		d[field] = val;
		$.ajax({
			url: config.API_URL + config.PHOTOS_PATH + this.data.id + "/",
			method: "PATCH",
			data: d,
			complete: this.proxy(function(response){
				callback(response);
			})
		});
	},
	'[data-action=remove] click': function(){
		this.patch("is_active", false, this.proxy(function(){
			this.element.remove();
		}))
	},
	'[data-action=full-screen] click': function(){
		var splash = new PB.PhotoSplash('<div class="photo-splash">', this.data);
		$("body").append(splash.element);
	},
	'[data-action=love] click': function(){
		if(!this.viewData.attr("cooldown")){
			this.viewData.attr("like_count", this.viewData.attr("like_count") + 1);
			this.viewData.attr("cooldown", true);
			this.patch("like_count", this.viewData.attr("like_count"), this.proxy(function(response){
			    console.log(response);
			}));
            setTimeout(this.proxy(this.proxy(function () {
                this.viewData.attr("cooldown", false);
            })), config.PHOTO_COOLDOWN_TIME);
        }
    }
});