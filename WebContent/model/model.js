var model = {};

model.kanbaneryModel = Backbone.Model.extend({
	urlRoot: '',
	initialize: function (options) {
		if(options != undefined){
			this.urlRoot = options.urlRoot;	
		}
		
	},
	
	parse: function (response) {
		return response;
	},
	
});