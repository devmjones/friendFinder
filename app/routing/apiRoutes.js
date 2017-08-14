var path = require("path");
var friendData = require("../data/friends");

module.exports = function(app) {

  // Used to display a JSON of all possible friends
  app.get("/api/maybefriends", function(req, res) {
    res.json(friendData);
  });

  // Used to handle incoming survey results and compatibility logic
  app.post("/api/maybefriends", function(req, res) {
    var body = req.body;
    console.log(body);
    var requester = {
      name: body.name,
      imgSrc: body.imgSrc,
      scores: body['scores[]'].map( function(i) { return parseInt(i); } )
    };

    console.log(requester);

    var bestie = {
      name: "",
      imgSrc: "",
      scoreDiff: 999999
    };

    for (var f in friendData) {
      var diff = 0;
      var friend = friendData[f];
      console.log("Comparing to", friend);
      for (var i = 0; i < requester.scores.length; i++) {
        var questionDiff = Math.abs(requester.scores[i] - friend.scores[i]);
        diff += questionDiff;
        console.log("On question", i+1, requester.name, "got",
          requester.scores[i], "while", friend.name, "got", friend.scores[i],
          "for an absolute difference of", questionDiff, ".  The new total difference is", diff, ".");
        if (diff <= bestie.scoreDiff) {
          bestie.name = friend.name;
          bestie.imgSrc = friend.imgSrc;
          bestie.scoreDiff = diff;
        }
      }
    }
    friendData.push(requester);
    res.json(bestie);
  });
};

