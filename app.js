const express = require("express");
const mongoose = require('mongoose');

const bdC = require("./model/bdC");
const contact = require("./model/contact");
const bodyParser = require('body-parser');

const { findOne } = require("./model/bdC");
const { redirect } = require("react-router-dom");

const app = express()
app.use(express.static("public/img"))
app.use(express.static("public/css"))
app.use(bodyParser.urlencoded({ extended: true }));




//ROUTERS ------------------------------------------------
//Route pour la Page Acceuil------------------------------
app.get("/Accueil", function (req, res) {
    res.render('Acceuil.ejs')

});

//Route pour la Page services------------------------------
app.get("/service", function (req, res) {
    res.render('services.ejs')

});

//Route pour la Page Contact------------------------------
app.get("/contact", function (req, res) {
    res.render('contact.ejs')

});

//Route pour la Page Admin-----------------------------
app.get("/admin", function (req, res) {
    res.render('pageAdmine.ejs')

});

//Route pour la Page liste des cours------------------------------
app.get("/gratuit", function (req, res) {
    bdC.find({},(err,courses)=> {
        if(err){

        }
     res.render('serviceGratuit.ejs',{bdCourse : courses})
    
    }) 
})

//Route pour la Page Cours Spéciaux------------------------------
app.get('/servicep', (req, res) => {
    res.render("servicepayant.ejs")
});


//Route pour la Page Payement------------------------------
app.get("/payement", function (req, res) {
    res.render('payement.ejs')

});



//Route pour la Page Ajouter Cours------------------------------
app.get("/addC", function (req, res) {
    bdC.find({},(err,courses)=>{
        res.render('addC.ejs',{bdCourse:courses})
    })

});





//Route pour la Page Boite de réception------------------------------
app.get('/Msg', (req, res) => {
    contact.find({},(err,messages)=> {
              if(err){
      
              }
              
     res.render('pageMsg.ejs',{contact : messages})
            
          })
      });


//Route (POST) pour la Page Boite de réception------------------------------
app.post('/envoyerMsg', (req, res) => {

    let newMsg = new contact({

        nom: req.body.nom,
        email: req.body.email,
        sujet: req.body.sujet,
        message: req.body.message
    });
    newMsg.save()
    res.redirect('/contact')
    
    });



//Route pour la Page login------------------------------
app.get("/login", function (req, res) {
    res.render("loginPage.ejs");
});

//Route pour la Page Admin------------------------------
app.get("/admine", function (req, res) {
    res.render('pageAdmine.ejs')

});


//Route (POST) pour Ajouter un cours------------------------------
app.post('/addC',(req, res) => {
    let newCourse = new bdC({
        id: req.body.id,
        Prof: req.body.Prof,
        Cours: req.body.Cours,
        NmrChapitre: req.body.NmrChapitre,
    });
   newCourse.save((error)=>{
    if(error){

    }else{
        res.redirect("/addC");
    }
   })
   
});





//Route supprimer l élément séléctioné
app.get('/deletecourse/:id', async (req, res) => {
    try{
        await bdC.findByIdAndDelete({_id: req.params.id});
        res.redirect("/addC");
        
            } catch(err) {
              res.send(err);
            }
           
               
            
          });





//Route pour modifier les donnes de l element selectonné ,cette route derige vers une page edit qui contient les données à modifer
app.get('/editcourse/:id', (req, res) => {
   
    bdC.findById({_id: req.params.id},(err,cour)=>{
        if(err) {
            console.log(err)
        }
        else{
            res.render('editPage.ejs',{
                cour:cour
            })
        } 
    })
});


//Route(POST) pour modifier les donnes de l element selectonné ,les mettre à jour
app.post('/update/:id', (req, res) => {
     
    bdC.findByIdAndUpdate({_id : req.params.id}, {
      id: req.body.id,
      Prof: req.body.Prof,
      Cours: req.body.Cours,
      NmrChapitre: req.body.NmrChapitre
    }, (err) => {
      if(err) {
        console.log(err);
        res.status(500).send("Error updating course");
      } else {
        res.redirect("/addC");
      }
    });
  });
  


    

app.listen(3000, () => {
    console.log("Server is Running")
})
