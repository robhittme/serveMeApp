$(document).ready(function() {

	myEarnings.init();
});

myEarnings= {
	init: function() {
		this.initStyling();
		this.initEvents();
	},

	initStyling: function() {
		this.renderEarnings();
		},

	initEvents: function() {
		
		$(".calculate").on("click", this.calculateScore);
		$(".journalEntries").on("click", "button", function() {
      		$("#myModal").modal();
    	});
    	$("#newEntryForm").on("submit", this.addEntry);
    		var postId = $(this).closest(".scoreItem").data("postid");
		     // myEarnings.renderModalPostDetail(postId);
		     $("#editEntryModal").modal();
	},

	// renderModalPostDetail: function(postId) {

 //    $.ajax({
 //      url: "http://tiy-fee-rest.herokuapp.com/collections/ServeMeAppScore/" + postId,
 //      type: "GET",
 //      dataType: "json",
 //      error: function(jqXHR, status, error) {
 //        alert("render post detail is broken");
 //      },
 //      success: function(data, dataType, jqXHR) {
        
 //        var entry = window.entry = data; // have to make global for underscore to work
 //        myEarnings.render($("#editEntryModal"),Templates.modal, entry);

 //      }
 //    });

 //  },
	calculateScore: function(e) {
		e.preventDefault();
		var currentDate= $(".currentDate").val(); 
		var monthly= $(".monthGoal").val();
		var daily= $(".dayGoal").val();
		var tips= $(".tips").val();
		var hours= $(".hours").val();

		var hourly= (tips)/(hours);
		var remainder= (monthly)-(tips);
		var medalReward= new MedalPercentage(tips, daily);
		var medalDisplayed= medalReward.medal();
		// $(".totalScore").html("<li>" + "Hourly Wage: " + hourly + "</li>" + "<li>" + "Medal: " + medalReward.medal() + "</li>" + "<li>" + "Remainder: " + remainder + "</li>");
		
		window.earningsObj= {
				Date: currentDate,
				Hourly: hourly,
				Medal: medalDisplayed,
				Remainder: remainder,
				JournalEntry: ""
			};
		
		myEarnings.addEarnings(earningsObj);
		myEarnings.render($(".totalScore"), Templates.scoreCurrent, earningsObj);

	
		var goldAmount= daily || 0;
		var silverAmount= (daily/100)*85;
		var bronzeAmount= (daily/100)*70;

		$(".gold").html(goldAmount);
		$(".silver").html(silverAmount);
		$(".bronze").html(bronzeAmount);
	},

	render: function($el, template, data) {
            var tmpl = _.template(template, data);
            $el.html(tmpl);
        },

    renderEarnings: function() {
    	$.ajax({
    		url:"http://tiy-fee-rest.herokuapp.com/collections/ServeMeAppScore",
    		type: "GET",
    		dataType: "json",
    		error: function() {
    			alert("problem");
    		},
    		success: function(data, dataType, jqXHR) {
    			console.log(data);
    			var earningsData = window.earningsData = data;
    			myEarnings.render($(".scoreContent"), Templates.score, earningsData);

    		}
    	})
    },

    renderEntry: function() {

	    $.ajax({
	      url: "http://tiy-fee-rest.herokuapp.com/collections/ServeMeAppJournal",
	      type: "GET",
	      dataType: "json",
	      error: function(jqXHR, status, error) {
	        alert("you broke the internet");
	      },
	      success: function(data, dataType, jqXHR) {
	        
	        var entries = window.entries = data; // have to make global for underscore to work
	        myEarnings.render($("section"), Templates.entries, entries);
	         

	      }
	    });

  },

    addEntry: function(e) {
    e.preventDefault();
        var $thisEntry = $(this).closest(".scoreItem");
        var entryId = $thisEntry.data("entryid");
        console.log(entryId);

        var newEntry = {
	        Date: $(this).closest(".date").text(),
			Hourly: $(this).closest(".wage").text(),
			Medal: $(this).closest(".medal").text(),
			Remainder: $(this).closest(".remainder").text(),
			JournalEntry: $(".entryContentForm").val(),
		}
	    $.ajax({
	      url: "http://tiy-fee-rest.herokuapp.com/collections/ServeMeAppScore/" + entryId,
	      type: "PUT",
	      data: newEntry, 
	      dataType: "json",
	      error: function(jqXHR, status, error) {
	        alert("couldn't add entry");
	      },
	      success: function(data, dataType, jqXHR) {
	        $(".newEntryTitle").val("");
	        $(".entryContentForm").val(""); 
	        $("#myModal").modal("hide");
	        myEarnings.renderEntry(); 
	        myEarnings.renderEarnings(); 
	        myEarnings.renderSideBar();
	      }
	    });
	},


	addEarnings: function(earningsData) {

		$.ajax({
			url: "http://tiy-fee-rest.herokuapp.com/collections/ServeMeAppScore",
			type: "POST",
			data: earningsData,
			error: function() {
				alert("you fucked up");
			},
			success: function(data, dataType, jqXHR) {
				myEarnings.renderEarnings();
			}

		});
	},


};



	

	 // totalScore: function(e) {
	 // 	e.preventDefault();

	// }
