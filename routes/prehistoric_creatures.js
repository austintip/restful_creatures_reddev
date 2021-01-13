const express = require('express');
const router = express.Router();
const fs = require('fs');

// Mounted at /prehistoric_creatures
let historics = fs.readFileSync('./prehistoric_creatures.json');
let histData = JSON.parse(historics);

// Index - /prehistoric_creatures
router.get('/', (req, res) => {
    res.render('historics/index', { historics: histData })
});
// New - prehistoric_creatures/new
router.get('/new', (req, res) => {
    res.render('historics/new');
});
// Get 1 - /prehistoric_creatures/1
router.get('/:id', (req, res) => {
    let index = req.params.id;
    res.render('historics/show', { historic: histData[index] });
});

// UPDATE route
router.put('/:id', (req, res) => {
    console.log(`------ PUT to /prehistoric_creatures/${req.params.id}`);

    // get creature from data store
    let historicsIndex = req.params.id;
    let historics = fs.readFileSync('./prehistoric_creatures.json');
    let histData = JSON.parse(historics) // is an array
    let thisHist = histData[historicsIndex];

    //update my creatures
    histData[historicsIndex] = req.body;
    console.log(histData);
    //write new creature to data store
   // Turn creature array into JSON
    let histJSON = JSON.stringify(histData);
    fs.writeFileSync('./prehistoric_creatures.json', histJSON);
    //send my response
    res.redirect(`/prehistoric_creatures/${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    console.log('|~~~~~~~~DELETE~~~~~~|');
    //get the dino from my data store
    let historicsIndex = req.params.id;
    let historics = fs.readFileSync('./prehistoric_creatures.json');
    historicsJS = JSON.parse(historics);

    historicsJS.splice(historicsIndex, 1);

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(historicsJS));

    res.redirect('/prehistoric_creatures');
});


// Post - prehistoric_creatures
router.post('/', (req, res) => {
    histData.push(req.body);
    let histJson = JSON.stringify(histData);
    fs.writeFileSync('./prehistoric_creatures.json', histJson);
    res.redirect('/prehistoric_creatures');
})

module.exports = router;