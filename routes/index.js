var express = require('express');
var router = express.Router();

var multer = require('multer');//v1.0.5
var upload = multer();//parsing multipart/form-data

var modelos = require('../models/Libro');
var modelosAutor = require('../models/Autor');
var LibrosCtrl = require('../controllers/LibrosCtrl');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', saludo: 'Gen 2017' });
});

router.route('/libros')
    .get(LibrosCtrl.getLibros)
    .post(upload.array(),LibrosCtrl.addLibro);

router.route('/libros/:id')
    .get(LibrosCtrl.getById)
    .put(upload.array(),LibrosCtrl.updateLibro)
    .delete(LibrosCtrl.deleteLibro);

router.route('/autores')
    .get(LibrosCtrl.getAutores) //devolver todos los autores
    .post(upload.array(),LibrosCtrl.addAutor);

router.route('/autores/:id')
    .get(LibrosCtrl.getByAutor)//devolver todos los libros del autor
    .put(upload.array(),LibrosCtrl.updateAutores)//actualizar nombre de autor en los libros
    .delete(LibrosCtrl.deleteAutor);//eliminar libros del autor

router.route('/autores/:id/libros')
    .get(LibrosCtrl.getLibrosDadoAutor); //Devuelve los libros escritos por el autor identificado con id

module.exports = router;


