const express = require('express');
const app = express();
const fortunes = require('./data/fortunes');
const fs = require('fs');
const bodyParser = require('body-parser');

//used for controlling posting nad getting json requests
app.use(bodyParser.json());

app.get('/fortunes', (req, res) => {
    res.json(fortunes);
});
//generating random index
app.get('/fortunes/random', (req, res) => {
    const random_index = Math.floor(Math.random() * fortunes.length);
    const r_fortune = fortunes[random_index];
    res.json(r_fortune);

});
//by specific id
// f is individual object of whole json
app.get('/fortunes/:id', (req, res) => {
    res.json(fortunes.find(f => f.id == req.params.id));
});

//post request
app.post('/fortunes', (req, res) => {
    const { message, lucky_number, spirit_animal } = req.body;
    const fortunes_id = fortunes.map(f => f.id);
    const fortune = {
        id:
            (fortunes_id.length > 0 ? Math.max(...fortunes_id) : 0) + 1,
        message, lucky_number, spirit_animal
    };
    const new_fortune = fortunes.concat(fortune);
    fs.writeFile('./data/fortunes.json', JSON.stringify(new_fortune), err => console.log(err));
    res.json(new_fortune);
});
app.put('/fortunes/:id', (req, res) => {
    const { id } = req.params;
    const { message, lucky_number, spirit_animal } = req.body;
    const old_value = fortunes.find(f => f.id == id);
    if (message) old_value.message = message;
    if (lucky_number) old_value.lucky_number = lucky_number;
    if (spirit_animal) old_value.spirit_animal = spirit_animal;
    fs.writeFile('./data/fortunes.json', JSON.stringify(fortunes), err => console.log(err));
    res.json(fortunes);
});
app.delete('/fortunes/:id', (req, res) => {
    const { id } = req.params;
    const new_fortune = fortunes.filter(f=>f.id !=id);
    fs.writeFile('./data/fortunes.json', JSON.stringify(new_fortune), err => console.log(err));
    res.json(new_fortune);

});


module.exports = app;