$(function () {
	var userModel, searchButtonView, router;
	
	userModel = Backbone.Model.extend({
		urlRoot:'https://joseph.kanbanery.com/api/v1/user.json?api_token=',
		initialize: function(options){
			this.urlRoot = this.urlRoot + options.api;
		},
		parse: function (response) {
			return response;
		}
		
	});


	searchButtonView = Backbone.View.extend({
		events: {
			"click #submit": "submit",
		},
		initialize: function() {
		},
		submit: function(){
			alert('submit button is clicked' + $("#search").val());
			console.log('submit button is clicked');
		}
	}); 
	
	 router = Backbone.Router.extend({
		routes : {
			"":"home",
		},
		initialize: function () {
			Backbone.history.start();
		},
		home:function(){
			var modelView =  new ModelView({el:$("#myModal")});
			$("#myModal").modal();
		}
	});	
	
	var ModelView = Backbone.View.extend({
		events : {
			"click #logIn" :"submit",
		},
		submit : function () {
			var user = new userModel({api:$("#apiToken").val()});
			$("#myModal").modal('hide');
			user.fetch({dataType:'jsonp',
				success: (function (model, response) {
					$("#userId").html('<h4>Welcome,'+ response.first_name + '</h4>');
				})
			});
			var view  =  new searchButtonView({el:$("#nav")});
		}
	}); 
	 
	var appRouter = new router();	
	
});







