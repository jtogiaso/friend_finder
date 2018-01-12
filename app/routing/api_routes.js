// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
let friends = require("../public/js/friend.js");

// Routes
// =============================================================
module.exports = function(app) {
// ===============================================================================

  // Routes
  app.get("/api/friends", function(req, res) {
  	res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

  	let newser_score = req.body.scores.reduce( (score , score_index) => parseInt(score) + parseInt(score_index) , 0 );

  	let users_scores = friends.map( friend => {
  		return friend.scores.reduce( (score , score_index) => parseInt(score) + parseInt(score_index) , 0 );
  	});

  	let match_index = 0;
  	let match_index_diff = Math.abs(newser_score - users_scores[0]);
  	
  	users_scores.slice(1).forEach( (user_score, index) => {
  		let cur_diff = Math.abs(newser_score - user_score);
  		if (  cur_diff < match_index_diff ){
  			match_index = index + 1;
  			match_index_diff = cur_diff;
  		}
  	});

  	res.json(friends[match_index]);
  });

};
