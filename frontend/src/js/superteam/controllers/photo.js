PB.Photo = can.Control({
		defaults: {}
}, {
	data: undefined,
	viewData: undefined,
	init: function () {
		this.data = this.options;
		this.viewData = new can.Map({
			thumbnail: this.data.thumbnail,
			likes: this.data.likes || 0,
			cooldown: false
		});
		this.data.likes = 0;
		this.element.html(Helpers.getView(PB.Views.photo, this.viewData))
	},
	'[data-action=remove] click': function(){
		$.post(config.API_URL + config.PHOTOS_PATH + this.data.id, {is_active: false}, this.proxy(function(response){
		   this.element.remove();
		}))
	},
	'[data-action=love] click': function(){
		if(!this.viewData.attr("cooldown")){
			this.viewData.attr("likes", this.viewData.attr("likes") + 1);
			this.viewData.attr("cooldown", true);
			setTimeout(this.proxy(this.proxy(function(){
				this.viewData.attr("cooldown", false);
			})), config.PHOTO_COOLDOWN_TIME);
		}
	}
});