import express from "express";
import * as db from "./util/database.js";

const PORT = 8080;
const app = express();
app.use(express.json());

app.get("/notes", (req, res) => {
    try{
    const notes = db.getAllNotes();
    res.status(200).json(notes);
    }catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    try{
    const note = db.getNotesById(id);
    if(!note){
        return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json(note);
    }catch (error) {
        res.status(500).json({message: `${error}` });
    }
})
app.post("/notes", (req, res) => {
    const { title, content } = req.body;
    if(!title || !content){
        return res.status(400).json({ error: "Nem létezik" });
    }
    try{
    const savenotes = db.saveNotes(title, content);
    if(savenotes.changes != 1){
        return res.status(501).json({ error: "Nem sikerült menteni" });
    }
    res.status(201).json({id: savenotes.lastInsertRowid, title, content});
    }catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})
app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    try{
    const deletenotes = db.deleteNotes(id);
    if(deletenotes.changes != 1){
        return res.status(501).json({ error: "Nem sikerült törölni" });
    }
    res.status(204).json({ message: "Sikeresen törölve" });
    }catch (error) {
        res.status(204).json({ error: "Nincs ilyen azonosító" });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});