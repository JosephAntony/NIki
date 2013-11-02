$(function () {
	var userModel, searchButtonView, router, project, projectId, apiToken, projectIdArray, projectNameArray;
	
	userModel = Backbone.Model.extend({
		urlRoot:'https://joseph.kanbanery.com/api/v1/user.json?api_token=',
		initialize: function(options){
			apiToken = options.api;
			this.urlRoot = this.urlRoot + apiToken;
		},
		parse: function (response) {
			return response;
		}
		
	});
   
	project = Backbone.Model.extend({
		urlRoot: 'https://kanbanery.com/api/v1/user/workspaces.json?api_token=',
		initialize: function () {
			this.urlRoot = this.urlRoot + apiToken;
		},
		parse: function (response){
			return response;
		},
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
			
			//getting the project Model
			var count = 0;
			var prj = new project();
			projectIdArray = new Array();
			projectNameArray = new Array();
			
			//fetching the project json and looping through it 
			prj.fetch({dataType: 'jsonp', asnyc:true,
				        success: function (model, response) {
				        	_.each(response[0].projects, function (projects) {
				        		projectIdArray[count] = projects.id;
				        		projectNameArray[count] = projects.name;
				        		count++;
				        	});
				        	
				        	_.each(projectNameArray, function (projectName) {
				        		console.log(projectName);
				        		$("#myProjectModal").find("#inputs").append('<span class="input-group-addon"><input type="radio"></span>');
				        		$("#myProjectModal").find("#inputs").append('<span class="label label-info">'+projectName+'</span>');
				        	});
				        	$("#myProjectModal").modal();
				        }
				     });
			
			
			
			
		}//end og the submit function
		
		
	}); 
	 
	var appRouter = new router();	
	
});







