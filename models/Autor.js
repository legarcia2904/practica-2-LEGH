var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var autorSchema = new Schema({
    nombre: {type:String},
    apellido: {type:String},
    libro:{type: Schema.ObjectId, ref:"Libro", require:true}
});

module.exports = mongoose.model('Autor',autorSchema);