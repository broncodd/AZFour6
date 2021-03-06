const User = require('../database/models/User')
module.exports = (req, res) => {
  console.log("storeQusetionaireController in !");
  console.log("req.body.: "+JSON.stringify(req.body));
  var year = req.body.year;
  var educationalBackground = req.body.educationalBackground;
  var TypeOfEducation = req.body.TypeOfEducation;
  var AIMLGE = req.body.AIMLGE;
  var profession = req.body.profession;
  var Competence = req.body.Competence;
  var Predictability = req.body.Predictability;
  var Dependability = req.body.Dependability;
  var Reliability = req.body.Reliability;
  var faith1 = req.body.faith1;
  var trust1 = req.body.trust1;
  var trust2 = req.body.trust2;
  var trust3 = req.body.trust3;
  var comments=req.body.comments;
  //find user in da and complete user's information based on questionnaire
  User.find({ gUserId: req.session.userId}, function (err, docs) {
    if (err){
      console.log("err: "+err);
    }else{
      var somebody = docs[0];
      if (somebody.returnCode){
        return res.render('thankyou', {
          returnCode: `${somebody.returnCode}`
        });
      }
      var returnCode=(Math.random().toString(36).substring(2, 16) + 
      Math.random().toString(36).substring(2, 16)).toUpperCase();
      req.session.returnCode=returnCode;
      console.log(JSON.stringify(somebody));
      somebody.year=year;
      somebody.educationalBackground=educationalBackground;
      somebody.TypeOfEducation=TypeOfEducation;
      somebody.AIMLGE=AIMLGE;
      somebody.profession=profession; 
      somebody.Competence=Competence;
      somebody.Predictability=Predictability;
      somebody.Dependability=Dependability;
      somebody.Reliability=Reliability;
      somebody.faith1=faith1;
      somebody.trust1=trust1;
      somebody.trust2=trust2;
      somebody.trust3=trust3;
      somebody.comments=comments;
      somebody.returnCode=returnCode;
      somebody.save().then(function(response){
        return res.render('thankyou', {
          returnCode: `${returnCode}`
        });
      }).catch(function (error){
        console.log("somebody save error "+error);
      });
    }
  });
}
