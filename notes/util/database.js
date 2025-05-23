import Database from "better-sqlite3";

const db = new Database("./data/database.sql");

db.prepare("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, content STRING);").run();

export const getAllNotes = () => { 
    return db.prepare("SELECT * FROM notes ").all();
}
export const getNotesById = (id) => {
    return db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
}
export const saveNotes = (title, content) => {
    db.prepare("INSERT INTO notes (title, content) VALUES (?, ?)").run(title, content);
}
export const deleteNotes = (id) => {
    db.prepare("DELETE FROM notes WHERE id = ?").run(id);
}

const notes = [
    {
        title: "Anna Frank",
        content: "Zsidó lány, aki a második világháború alatt írt naplót.",},
    {
        title: "Pán Péter",
        content: "Gyerekeknek szóló mese"},
    
    {
        title: "Geronimo Stilton",
        content: "Egerekről szóló mese"
    },
    {   
        title: "Harry Potter",
        content: "Varázslókról szóló mese"
    },
]

//for (const note of notes) {
   //saveNotes(note.title, note.content);
//}

//Elfelejtettem egy után kivenni, bocsánat
