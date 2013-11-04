$(function () {
	var commonModel, ModelView, appRouter, projectModal, searchButtonView, router, projectId, apiToken, projectIdArray, projectNameArray, selectedProjectName;
	
	commonModel = model.kanbaneryModel;
	
	searchButtonView = Backbone.View.extend({
		events: {
			"click #submit": "submit",
		},
		initialize: function() {
		},
		submit: function(){
			//alert('submit button is clicked' + $("#search").val());
			var ids = new Array();
			var flag = false;
			var id = $("#search").val();
			if(id.indexOf(",") !== -1){
				ids = $("#search").val().split(",");	
			} else {
				ids[0] = id;
			}
			
			var coltn = new Modelcollection.collection({model: model.kanbaneryModel, url: columnJsonURL.url + projectId + '/columns.json?api_token=' + apiToken});
			coltn.fetch({dataType: 'jsonp', 
				         success: function (collection, response) {
				           /* _.each(response, function (object) {
				            	if(object.id == id) {
				            		//alert('THE NAME OF THE COLUMNS    ' + object.name);
				            		$("#searchResults").append("<div class='row' ><div id='" + id + "' style='border: solid 1px; height:50px ;" +
				            				"font-family: Arial, Helvetica Neue, Helvetica, sans-serif ' class='span6'> Task Id- <span class='label label-info'> " + 
				            				object.id + '</span>  is in <p style="font-family:  Arial-Black, Arial Bold, Gadget, sans-serif;" >  ' + object.name.toUpperCase()   + 
				            				' Column <p> ' + "</div></div>");
				            		$("#searchResults").animate({opacity:1}, "slow");
				            		
				            	}
				            	
				            	
				            });*/
				            $("#searchResults").empty();
				            _.each(ids, function (id) {
				            	flag = false;
				            	_.each(response, function (object) {
				            		
				            		if (object.id == id.trim()) {
				            			$("#searchResults").append("<div class='row' ><div id='" + id + "' style='border: solid 1px; height:50px ;" +
					            				"font-family: Arial, Helvetica Neue, Helvetica, sans-serif ' class='span6'> Task Id- <span class='label label-info'> " + 
					            				object.id + '</span>  is in <p style="font-family:  Arial-Black, Arial Bold, Gadget, sans-serif;" >  ' + object.name.toUpperCase()   + 
					            				' Column <p> ' + "</div></div>");
					            		$("#searchResults").animate({opacity:1}, "slow");
					            		flag = true;
				            		}
				            	});
				            	
				            	if (!flag) {
				            		$("#searchResults").append("<div class='row' ><div  style='border: solid 1px; height:50px ;" +
				            				"font-family: Arial, Helvetica Neue, Helvetica, sans-serif ' class='span6'> <span class='label label-info'> " + 
				            				id + '</span>  Not found <p style="font-family:  Arial-Black, Arial Bold, Gadget, sans-serif;" >  ' +
				            				'<p> ' + "</div></div>");
				            		$("#searchResults").animate({opacity:1}, "slow");
				            	}
				            	
				            });
				            
			             } });
		},
	}); 
	
	 router = Backbone.Router.extend({
		routes : {
			"":"home",
		},
		initialize: function () {
			Backbone.history.start();
		},
		home:function(){
			var modelView =  new ApiModalView({el:$("#myModal")});
			$("#myModal").modal();
			
		}
	});	
	
	projectModal = Backbone.View.extend({
			events: {
				"click #btnGo" : "btnGo",
			},
			btnGo : function (event) {
				projectId = $("#inputs").find("input[type='radio']:radio:checked").attr('value');
				$("#myProjectModal").modal('hide');
			},
			initialize: function () {
				var loop = 0;
				$("#inputs").append('<span class="input-group-addon"></span>');
	        	_.each(projectNameArray, function (projectName) {
	        		console.log(projectName);
	        		$("#inputs").find('.input-group-addon').append('<input type="radio" name="projectName" value="' + projectIdArray[loop] + 
	        				'"><span class="label label-info">' + projectName + ' </span> ');
	        		loop++;
	        	});
				$("#myProjectModal").modal();
			},
	}); 
	 
	
	//this is the initial modal displayed to enter the api token
	ApiModalView = Backbone.View.extend({
		events : {
			"click #logIn" :"submit",
		},
		submit : function (event) {
			apiToken = $("#apiToken").val();
			var user = new commonModel({urlRoot: userJsonURL.url + apiToken });
			$("#myModal").modal('hide');
			user.fetch({dataType:'jsonp',
				success: (function (model, response) {
					$("#userId").html('<h4>Welcome,'+ response.first_name + '</h4>');
				})
			});
			var view  =  new searchButtonView({el:$("#nav")});
			
			//getting the project Model
			var count = 0;
			var prj = new commonModel({urlRoot: workSpaceJsonURL.url + apiToken});
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







