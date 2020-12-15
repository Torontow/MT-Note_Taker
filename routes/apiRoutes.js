const fs = require('fs');

module.exports = app => {

    // GET request reads db.json file and sends it as a response

    // app.get('/api/notes', (req, res) => {
    //     let notesData = JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    //     res.json(notesData)
    // });

    // POST request receives a new note adds it to the db.json file and returns it to the client.

    app.post('/api/notes',(req, res) => {
        let notesData = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        let newNote = req.body;
        let uniqueID = (notesData.length).toString();
        newNote.id = uniqueID;
        notesData.push(newNote);
    
        fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
        console.log('Note saved to db.json. Content: ', newNote);
        res.json(notesData);
    })        
    
    // DELETE request deletes a note and returns the updated db.JSON file with newly assigned ids.
    app.delete('/api/notes/:id', function(req, res) {
        let notesData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let noteID = req.params.id;
        let newID = 0;
        console.log(`Deleting note with ID ${noteID}`);
        notesData = notesData.filter(currNote => {
            return currNote.id != noteID;
        })
        
        for (currNote of notesData) {
            currNote.id = newID.toString();
            newID++;
        }
    
        fs.writeFileSync("./db/db.json", JSON.stringify(notesData));
        res.json(notesData);
    })
    
}
