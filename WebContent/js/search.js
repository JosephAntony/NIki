$(function () {
	var searchModel, searchButtonView, router;
	
	searchModel = Backbone.Model.extend({
		initialize: function(){
			console.log('the model is initialized');
		}
	});


	searchButtonView = Backbone.View.extend({
		events: {
			"click": "submit",
		},
		initialize: function() {
			console.log('the view has been initialized');
			console.log(this.el);
		},
		submit: function(){
			alert('submit button is clicked');
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
			var sModel = new searchModel();
			var view  =  new searchButtonView({el:$("#submit")});
		}
	});	
	
	var appRouter = new router();	
	
});







