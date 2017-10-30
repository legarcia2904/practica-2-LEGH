var mongoose = require('mongoose');
var Libro = mongoose.model('Libro');
var Autor = mongoose.model('Autor');

/*Permite obtener todos los libros*/
exports.getLibros=function(req, res, next){
    console.log('GET/libros');
    Libro.find({},function(err,libros){
        if(err){
            res.send(403, err.message);
        }else{
            console.log('GET/libros');
            Autor.populate(libros, {path: "autor"},function(err, libros){
                res.status(200).send(libros);
            });
        }
    });
};

/*Permite adicionar un nuevo libro*/
exports.addLibro=function(req,res,next){
    console.log('POST/libros');
    var libro = new Libro({
        titulo : req.body.titulo,
        anio : req.body.anio,
        autor: req.body.autor,
        genero : req.body.genero
    });

    libro.save(function(err,libro){
        if(err) return res.send(403,err.message);
        res.status(200).jsonp(libro);
    });
};

/*Permite obtener un libro dado su id*/
exports.getById=function(req, res, next){
    console.log('GET/libros/:id');
    console.log(req.params.id);
    Libro.find({_id: req.params.id},function(err,libros){
        if(err){
            res.send(403, err.message);
        }else{
            console.log('GET/libros');
            Autor.populate(libros, {path: "autor"},function(err, libros){
                res.status(200).send(libros);
            });
        }
    });
};

/*Permite actualizar un libro dado su id*/
exports.updateLibro=function(req, res, next){
    console.log('PUT/libros/:id');
    console.log(req.params.id);
    console.log(req.body.titulo+" ");
    Libro.update({_id: req.params.id},
        {$set:{	titulo:req.body.titulo,
            anio:req.body.anio,
            genero:req.body.genero}},function(err,libros){
            if(err){
                res.send(403,err.message);
                console.log('error');
            }else{
                console.log('esta ok');
                Libro.find({_id: req.params.id},function(err,libros){
                    if(err){
                        res.send(403, err.message);
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

/*Permite eliminar un libro dado su id*/
exports.deleteLibro=function(req, res, next){
    console.log('DELETE/libros/:id');
    console.log(req.params.id);
    Libro.remove({_id: req.params.id},function(err,libros){
        if(err){
            res.send(403, err.message);
        }else{
            console.log('DELETE/libros');
            Autor.populate(libros, {path: "autor"},function(err, libros){
                res.status(200).jsonp(libros);
            });
        }
    });
};

/*Permite adicionar un nuevo autor*/
exports.addAutor=function(req,res,next){
    console.log('POST/autores');
    var autor = new Autor({
        nombre : req.body.nombre,
        apellido : req.body.apellido
    });
    autor.save(function(err,libro){
        if(err) return res.send(403,err.message);
        res.status(200).jsonp(autor);
    });
};

/*Permite obtener todos los autores*/
exports.getAutores=function(req, res, next){
    console.log('GET/autores');
    Autor.find(function(err,libros){
        if(err){
            res.send(403, err.message);
        }else{
            console.log('GET/autores');
            res.status(200).jsonp(libros);
        }
    });
};

/*Permite obtener los datos de un autor*/
exports.getByAutor=function(req,res,next){
    console.log('GET/autores/:id');
    console.log(req.params.id);
    Autor.find({_id: req.params.id},function(err,libros){
        if(err){
            res.send(403, err.message);
        }else{
            console.log('GET/autores/:id');
            res.status(200).jsonp(libros);

        }
    });
};

/*Permite actualizar los datos de un autor*/
exports.updateAutores=function(req, res, next){
    console.log('PUT/autores/:nombre');
    console.log(req.body);

    Autor.update({_id: req.params.id},
        {$set:{	nombre:req.body.nombre,
            apellido:req.body.apellido}},function(err,libros){
            if(err){
                res.send(403,err.message);
                console.log('error');
            }else{
                console.log('correcto');
                Autor.find({_id: req.params.id},function(err,libros){
                    if(err){
                        res.send(403, err.message);
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

/*Permite eliminar los libros de un autor, dado el autor_id*/
exports.deleteAutor = function(req,res,next){
    console.log('DELETE/autores/:id');
    console.log(req.params.id);

    Autor.find({_id: req.params.id},function(err,libros){
        if(err){
            res.send(403,err.message);
        }else{
            console.log(req.params.id);
            Libro.remove({autor: req.params.id},function(err,libros){
                if(err){
                    res.send(403, err.message);
                }else{
                    console.log('DELETE/autores/:id');
                    res.status(200).jsonp(libros);
                }
            });
        }
    });
};

/*Permite obtener todos los libros de un autor, dado el autor_id*/
exports.getLibrosDadoAutor = function (req, res, next) {
    console.log('GET /autores/:id/libros');
    Autor.findById(req.params.id, function (err, autor) {
        if(err || !autor){
            return res.status(500).jsonp({error:'500', descripcion:err.message});
        }else{
            Libro.find({'autor':req.params.id}, function (err, libro) {
                if(err){
                    return res.status(500).jsonp({error:'500', descripcion:err.message});
                }else{
                    autor.libros=libro;
                    if(libro.length==0){
                        return res.status(500).jsonp({error:'500', descripcion:"No hay libros de ese autor."});
                    }else{
                        return res.status(200).jsonp(libro);
                    }
                }
            });
        }
    });
};