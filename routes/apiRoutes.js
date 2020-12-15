const fs = require('fs');

module.exports = app => {

    // GET request reads db.json file and sends it as a response

    // app.get('/api/notes', function(req, res) {
    //     let notesData = JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    //     res.json(notesData)
    // });

    // POST request receives a new note adds it to the db.json file and returns it to the client.

    app.post('/api/notes', function(req, res) {
        let notesData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let newNote = req.body;
        let uniqueID = (notesData.length).toString();
        newNote.id = uniqueID;
        notesData.push(newNote);
    
        fs.writeFileSync("./db/db.json", JSON.stringify(notesData));
        console.log("Note saved to db.json. Content: ", newNote);
        res.json(notesData);
    })        

}
