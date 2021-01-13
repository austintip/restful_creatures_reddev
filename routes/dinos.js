const express = require('express');
const router = express.Router();
const fs = require('fs');

// Mounted at /dinos

// Index — /dinos
router.get('/', (req, res) => {
    // read the file that stores all my dinos and save in a variable to use later
    let dinos = fs.readFileSync('./dinos.json');
    // Parsing JSON into a JS mutable data structure
    let dinoData = JSON.parse(dinos)
    console.log(dinoData);
    var nameFilter = req.query.nameFilter;
    if (nameFilter) {
        dinoData = dinoData.filter(function(dino) {
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        });
    };
    res.render('dinos/index', { dinos: dinoData });
});

// New — /dinos/new
router.get('/new', (req, res) => {
    console.log('------------------- New dino who dis')
    res.render('dinos/new');
})

// show/details - dinos/:id
router.get('/:id', (req, res) => {
    // get the index
    let dinoIndex = req.params.id; //this will be index/key number
    //of dino in the dinodata array

    //get mutable dino data
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos) // is an array

    //find dino at said index
    let thisDino = dinoData[dinoIndex];
    // if there is no dino at dinoData[dinoIndex] 
    if (!thisDino) {
    //show a 404 page (end game)
    //redirect to dino/new
        res.redirect('/dinos/new');
    } else {
        res.render('dinos/show', { dino: thisDino, dinoID: dinoIndex }
        );
    };
    //ship it
});

router.get('/:id/edit', (req, res) => {
    let dinoIndex = req.params.id;
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos) // is an array
    let thisDino = dinoData[dinoIndex];
    if (!thisDino) {

        res.redirect('/dinos');
    } else {
        res.render('dinos/edit', { dino: thisDino, dinoID: dinoIndex }
        );
    };
    //send the dino info into a client page which is the form for a put route
});

//UPDATE route
router.put('/:id', (req, res) => {
    console.log(`------ PUT to /dinos/${req.params.id}`);

    // get dino from data store
    let dinoIndex = req.params.id;
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos) // is an array
    let thisDino = dinoData[dinoIndex];

    //update my dino
    dinoData[dinoIndex] = req.body;
    console.log(dinoData);
    //write new dino to data store
   // Turn dino array into JSON
    let dinoJSON = JSON.stringify(dinoData);
    fs.writeFileSync('./dinos.json', dinoJSON);
    //send my response
    res.redirect(`/dinos/${req.params.id}`);
});

// DELETE route
router.delete('/:id', (req, res) => {
    console.log('|~~~~~~~~DELETE~~~~~~|');
    //get the dino from my data store
    let dinoIndex = req.params.id;
    let dinos = fs.readFileSync('./dinos.json');
    dinosJS = JSON.parse(dinos);

    dinosJS.splice(dinoIndex, 1);

    fs.writeFileSync('./dinos.json', JSON.stringify(dinosJS));

    res.redirect('/dinos');
})

// Create — POST /dinos
router.post('/', (req, res) => {
    console.log(req.body);

    // turn dinos.json into a mutable array
    let dinos = fs.readFileSync('./dinos.json');
    dinosJS = JSON.parse(dinos);

    // add new dino from req.body to the array
    dinosJS.push(req.body);

    // Turn dino array into JSON
    let dinoJSON = JSON.stringify(dinosJS);

    // write to dinos.json
    fs.writeFileSync('./dinos.json', dinoJSON);

    res.redirect('/dinos');
})

module.exports = router;