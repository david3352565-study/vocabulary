var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');

module.exports = function(app, db) {


    app.get('/', (req, res) => {
        fs.readFile(__dirname + '/../../html/index.html', 'utf8', function(err, contents) {
            if (err) throw err
            res.send(contents)
        });
    })

    app.get('/getArrayNotes', (req, res) => {
        db.collection('notes').find({}).toArray(function(error, documents) {
            if (error) throw error;
            //documents.map(elem => elem.english = null)

            res.send(documents);
        });
    })



// <------------------------------------------------------------------------>



    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) }
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'})
            }
            else {
                res.send(item)
            }
        })
    })


    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) }
        const note = { russian: req.body.russian.replace(/[^,A-Za-zА-Яа-яё]/gim,'').split(','),
                        english: req.body.english.replace(/[^,A-Za-zА-Яа-яё]/gim,'').split(',') }
        db.collection('notes').update(details, note, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'})
            }
            else {
                res.send(note)
            }
        })
    })

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) }
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'})
            }
            else {
                res.send('note ' + id + ' is deleted')
            }
        })
    })


    app.post('/notes', (req, res) => {
        const note = {russian: req.body.russian.replace(/[^,A-Za-zА-Яа-яё]/gim,'').split(','), 
                        english: req.body.english.replace(/[^,A-Za-zА-Яа-яё]/gim,'').split(',')}
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured'})
            }
            else {
                res.send(result.ops[0])
            }
        })
    });
}