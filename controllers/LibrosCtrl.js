var mongoose = require('mongoose');
var Libro = mongoose.model('Libro');
var Autor = mongoose.model('Autor');

// var libros = [
// 	{
// 		id: '101',
// 		titulo: 'Código Da Vinci',
// 		autor: 'Dan Brown',
// 		anio: 2010,
// 		genero: 'Novela'
// 	},
// 	{
// 		id:'102',
// 		titulo: 'Relatos de un viejo indecente',
// 		autor: 'Charles Bukowski',
// 		anio: 2010,
// 		genero: 'Relatos'
// 	}
// ];


exports.getLibros=function(req, res, next){
    console.log('GET/libros');
    Libro.find({},function(err,libros){
        if(err){
            res.send(500, err.message);
        }else{
            console.log('GET/libros');
            Autor.populate(libros, {path: "autor"},function(err, libros){
                res.status(200).send(libros);
            });
        }
    });
};

exports.addLibro=function(req,res,next){
    console.log('POST/libros');
    var libro = new Libro({
        titulo : req.body.titulo,
        anio : req.body.anio,
        autor: req.body.autor,
        genero : req.body.genero
    });

    libro.save(function(err,libro){
        if(err) return res.send(500,err.message);
        res.status(200).jsonp(libro);
    });
};

exports.getById=function(req, res, next){
    console.log('GET/libros/:id');
    console.log(req.params.id);
    Libro.find({_id: req.params.id},function(err,libros){
        if(err){
            res.send(500, err.message);
        }else{
            console.log('GET/libros');
            Autor.populate(libros, {path: "autor"},function(err, libros){
                res.status(200).send(libros);
            });
        }
    });
};

exports.updateLibro=function(req, res, next){
    console.log('PUT/libros/:id');
    console.log(req.params.id);
    console.log(req.body.titulo+" ");

    Libro.update({_id: req.params.id},
        {$set:{	titulo:req.body.titulo,
            anio:req.body.anio,
            genero:req.body.genero}},function(err,libros){
            if(err){
                res.send(500,err.message);
                console.log('error');
            }else{
                console.log('correcto');
                Libro.find({_id: req.params.id},function(err,libros){
                    if(err){
                        res.send(500, err.message);
                    }else{
                        console.log('GET/libros');
                        Autor.populate(libros, {path: "autor"},function(err, libros){
                            res.status(200).send(libros);
                        });
                    }
                });
            }
        });
};

exports.deleteLibro=function(req, res, next){
    console.log('DELETE/libros/:id');
    console.log(req.params.id);
    Libro.remove({_id: req.params.id},function(err,libros){
        if(err){
            res.send(500, err.message);
        }else{
            console.log('DELETE/libros');
            Autor.populate(libros, {path: "autor"},function(err, libros){
                res.status(200).jsonp(libros);
            });
        }
    });
};

exports.addAutor=function(req,res,next){
    console.log('POST/autores');
    var autor = new Autor({
        nombre : req.body.nombre,
        apellido : req.body.apellido
    });
    autor.save(function(err,libro){
        if(err) return res.send(500,err.message);
        res.status(200).jsonp(autor);
    });
};

exports.getAutores=function(req, res, next){
    console.log('GET/autores');
    Autor.find(function(err,libros){
        if(err){
            res.send(500, err.message);
        }else{
            console.log('GET/autores');
            res.status(200).jsonp(libros);
        }
    });
};

exports.getByAutor=function(req,res,next){
    console.log('GET/autores/:id');
    console.log(req.params.id);
    Autor.find({_id: req.params.id},function(err,libros){
        if(err){
            res.send(500, err.message);
        }else{
            console.log('GET/autores/:id');
            res.status(200).jsonp(libros);

        }
    });
};

exports.updateAutores=function(req, res, next){
    console.log('PUT/autores/:nombre');
    console.log(req.body);

    Autor.update({_id: req.params.id},
        {$set:{	nombre:req.body.nombre,
            apellido:req.body.apellido}},function(err,libros){
            if(err){
                res.send(500,err.message);
                console.log('error');
            }else{
                console.log('correcto');
                Autor.find({_id: req.params.id},function(err,libros){
                    if(err){
                        res.send(500, err.message);
                    }else{
                        console.log('GET/libros');
                        Autor.populate(libros, {path: "autor"},function(err, libros){
                            res.status(200).send(libros);
                        });
                    }
                });
            }
        });
};

exports.deleteAutor = function(req,res,next){
    console.log('DELETE/autores/:id');
    console.log(req.params.id);

    Autor.find({_id: req.params.id},function(err,libros){
        if(err){
            res.send(500,err.message);
        }else{
            console.log(req.params.id);
            Libro.remove({autor: req.params.id},function(err,libros){
                if(err){
                    res.send(500, err.message);
                }else{
                    console.log('DELETE/autores/:id');
                    res.status(200).jsonp(libros);
                }
            });
        }
    });
};
