var main = function() {

	var invitees = [];
	var items = [];
	var templist = [];
	var chosen = null;
	// frequency of the friend and the most frequent employees
	var fr_of_friend = null;
	var fr_of_chosen = null;
    
	// as using the file placed in the repository 
	// (available at: https://raw.githubusercontent.com/lazarol/Barbados/master/employees.json)
	// did not work, I'm using a file uploaded to Firebase IO. Entering the path to the modified file
	// below upon judging the entry should result in a desirable outcome.
	$.getJSON("https://scorching-torch-7039.firebaseio.com/.json", function( data ) {
		
		for (i=0; i<data.length; i++) {
			items.push(data[i]);
		}

		// getting the most frequent employees (in either Helsinki or New York) iteratively
		while (items.length > 0) {

			// temporary list has each team's individual ID's in each index
			for (i=0; i<items.length; i++) {
				var team = items[i].split(/\s+/);
				templist.push(team[0]);
				templist.push(team[1]);
				if (team[0] === "1009" || team[1] === "1009") {
					fr_of_friend++;
				}
			}

			// choosing the most frequent employee from the remaining
			chosen = getMostFrequent(templist);
			if (fr_of_chosen === fr_of_friend) {
				chosen = "1009";
			}

			for (i=0; i<items.length; i++) {
				var team = items[i].split(/\s+/);

				// deleting the teams with the invited employee
				if (team[0] === chosen || team[1] === chosen) {
					items.splice(i, 1);
					// going backward to get the next element (that has moved to the position where the removed element was)
					i--;
					console.log("deleted: " + team);
					
				}		
			}

			// finally adding the (current) most frequent employee to the list of invitees
			invitees.push(chosen);
			console.log("invitees:" + invitees);

		}
		
	});

	// function to determine the most frequent employee
	function getMostFrequent(arr){
    	return arr.sort(function(a,b){
    		fr_of_chosen = arr.filter(function(v){ return v===a }).length - arr.filter(function(v){ return v===b }).length;
        	return fr_of_chosen;
   		}).pop();
	}

	$('#run').click(function() {
	    $('#selectees').append('<p>'+invitees+'</p>');
	});

}

$(document).ready(main);


