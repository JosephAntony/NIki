var model = {};

model.kanbaneryModel = Backbone.Model.extend({
	urlRoot: '',
	initialize: function (options) {
		this.urlRoot = options.urlRoot;
	},
	
	parse: function (response) {
		return response;
	},
	
});