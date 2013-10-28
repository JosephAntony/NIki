$(function() {
	var responses;
	var model = Backbone.Model.extend({
		urlRoot:'https://josephantony.kanbanery.com/api/v1/user.json?api_token=1983b82be54227759269262f04d7a9580652ceeb',
		initialize: function () {
			console.log('model is initialized');
		},
		sync: function(method, model, options){
			options.timeout= 10000;
			options.dataType = 'jsonp';
			return Backbone.sync(method, model, options);
		},
		parse: function(response) {
			/*console.log(response);*/
			responses = response;
			return response;
		}
	});
	
	var router = Backbone.Router.extend({
		routes : {
			"": "home"
		},
		
		initialize: function () {
			Backbone.history.start();
		},
		
		home: function () {
			var m = new model();
			m.fetch({
				complete: (function (e) {
					console.log(responses);
					alert(responses.email);
				})
			});
			
		}
	});
	
	var r  = new router();
	
});