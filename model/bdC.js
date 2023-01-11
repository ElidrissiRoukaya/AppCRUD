const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// Se connecter à la base de données
const mongoDB = "mongodb://127.0.0.1:27017/euromed";
mongoose.connect(mongoDB)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée'))

// Définir un nouveau schéma
const Schema = mongoose.Schema;
const bdCSchema =new Schema(
{


Prof: {
    type: String
    
    
},
Cours:{type: String
   
},
NmrChapitre:{type: Number
   }


}
)

module.exports = mongoose.model("bdC", bdCSchema);

