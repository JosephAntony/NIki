var Modelcollection = {};
Modelcollection.collection = Backbone.Collection.extend({
	modal: '',
	url: '',
	
	initialize: function (options) {
		this.modal = options.modal;
		this.url = options.url;
	},
	parse: function (response) {
		return response;
	},
});