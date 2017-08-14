var path = require("path");

module.exports = function(app){

  // Displays the survey page
  app.get('/survey', function(req, res){
    res.sendFile(path.join(__dirname + '/../public/survey.html'));
  });

  // Displays the home page
  app.use(function(req, res){
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });

};