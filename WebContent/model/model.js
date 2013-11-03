var model = {};

model.kanbaneryModel = Backbone.Model.extend({
	urlRoot: '',
	initialize: function (options) {
		alert('this has been initialized');
		this.urlRoot = options.urlRoot;
	},
	
	parse: function (response) {
		return response;
	},
	
});