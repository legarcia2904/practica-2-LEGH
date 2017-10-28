var mongoose = require('mongoose');
var Libro = mongoose.model('Libro');

var libros = [
	{
		id: '101',
		titulo: 'Código Da Vinci',
		autor: 'Dan Brown',
		anio: 2010,
		genero: 'Novela'
	},
	{
		id:'102',
		titulo: 'Relatos de un viejo indecente',
		autor: 'Charles Bukowski',
		anio: 2010,
		genero: 'Relatos'
	}
];


exports.getLibros = function(req,res,next){
	console.log('GET /libros');
	//res.status(200).jsonp(libros);
	Libro.find({autor: 'Charles Bukowsky'}, function(err,libros){
		if(err){
			res.send(500, err.message);
		}
		else{
			console.log('GET /libros');
			res.status(200).jsonp(libros);	
		}
	});
};

exports.addLibro = function(req,res,next){
	// req.body trae la información del post
	console.log('POST /libros');
	
	var libro = new Libro({
		titulo : req.body.titulo,
		anio : req.body.anio,
		autor : req.body.autor,
		genero : req.body.genero 
	});

	libro.save(function(err,libro){
		if(err) return res.send(500,err.message);
		res.status(200).jsonp(libro);
	});
	//libros.push(req.body);
	//res.status(200).jsonp(libros);
};

exports.getById = function(req,res,next){
	console.log('GET /libros/:id');
	console.log(req.params.id);
	res.status(200).jsonp(libros[0]);
};

exports.updateLibro = function(req,res,next){
	console.log('PUT /libros/:id');
	console.log(req.params.id);
	console.log(req.body);
	res.status(200).jsonp(libros[0]);
};

exports.deleteLibro = function(req,res,next){
	console.log('DELETE /libros/:id');
	console.log(req.params.id);
	res.status(200).jsonp(libros[0]);
};
