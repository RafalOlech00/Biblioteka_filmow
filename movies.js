const { parse } = require('dotenv')
const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')



//getting all
router.get('/', async(req,res) => {
try{
const movies = await Movie.find()
res.json(movies)
}catch(err){
    res.status(500).json({message: err.message})
}

})
//getting one id
router.get('/:id',getMovie, (req,res) => {
    //res.send(res.movie.title)
    res.json(res.movie)
})

//creating one
router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        type: req.body.type,
        duration: req.body.duration,
        year_of_creation: req.body.year_of_creation
    })
    try{
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
    }catch(err){
        res.status(400).json({message: err.message})
    }
    
})
//updating one
router.patch('/:id',getMovie, async (req,res) => {
    if(req.body.title != null){
        res.movie.title = req.body.title
    }
    if(req.body.director != null){
        res.movie.director = req.body.director
    }
    if(req.body.type != null){
        res.movie.type = req.body.type
    }
    if(req.body.duration != null){
        res.movie.duration = req.body.duration
    }
    if(req.body.year_of_creation != null){
        res.movie.year_of_creation = req.body.year_of_creation
    }
    try{
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    }catch(err){
        res.status(400).json({message: err.message})
    }

    
})
//deleting one
router.delete('/:id',getMovie, async (req,res) => {
        try{
            await res.movie.remove()
            res.json({message: 'Deleted movie'})
        }catch(err){
            res.status(500).json({message: err.message})
        }
})

async function getMovie(req, res, next) {
    let movie
    try{
        movie = await Movie.findById(req.params.id)
        if(movie == null)
        {
            return res.status(404).json({message: 'Cannot find movie'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.movie = movie 
    next()
}


module.exports = router

//npm run devStart 