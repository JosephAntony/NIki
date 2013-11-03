$(function () {
	var commonmodel, ModelView, appRouter, projectModal, searchButtonView, router, projectId, apiToken, projectIdArray, projectNameArray, selectedProjectName;
	
	commonmodel = model.kanbaneryModel;
	
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
	
	projectModal = Backbone.View.extend({
			events: {
				"click #btnGo" : "btnGo",
			},
			btnGo : function (event) {
				selectedProjectName = $("#inputs").find("input[type='radio']:radio:checked").attr('value');
				$("#myProjectModal").modal('hide');
			},
			initialize: function () {
				
				$("#inputs").append('<span class="input-group-addon"></span>');
	        	_.each(projectNameArray, function (projectName) {
	        		console.log(projectName);
	        		$("#inputs").find('.input-group-addon').append('<input type="radio" name="projectName" value="' + projectName + 
	        				'"><span class="label label-info">' + projectName + ' </span> ');
	        	});
				$("#myProjectModal").modal();
			},
	}); 
	 
	ModelView = Backbone.View.extend({
		events : {
			"click #logIn" :"submit",
		},
		submit : function (event) {
			apiToken = $("#apiToken").val();
			var user = new commonmodel({urlRoot: userJsonURL.url + apiToken });
			$("#myModal").modal('hide');
			user.fetch({dataType:'jsonp',
				success: (function (model, response) {
					$("#userId").html('<h4>Welcome,'+ response.first_name + '</h4>');
				})
			});
			var view  =  new searchButtonView({el:$("#nav")});
			
			//getting the project Model
			var count = 0;
			var prj = new commonmodel({urlRoot: workSpaceJsonURL.url + apiToken});
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
				        	var prjModal = new projectModal({ el : $("#myProjectModal")});
				        }
				     });
			
			
			
			
		}//end og the submit function
		
		
	}); 
	 
	
	
	appRouter = new router();	
	
});







