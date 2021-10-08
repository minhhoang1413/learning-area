let addBtn = document.querySelector("#add-btn");
const noteTemplate = document.querySelector(".note-template");

const notes = JSON.parse(localStorage.getItem("notes"));
console.log(notes);
if (notes) {
    notes.forEach( note => addNewNote(note,true));
}

addBtn.addEventListener("click", e => {
    addNewNote();
} );

function addNewNote(text = "", editable = false){
    let newNote = noteTemplate.cloneNode(true);
    newNote.className = "note";
    document.body.appendChild(newNote);

    const editBtn = newNote.querySelector(".edit-btn");
    const delBtn = newNote.querySelector(".delete-btn");
    const textArea = newNote.querySelector("textarea");
    textArea.value = text;
    textArea.readOnly = editable;
    textArea.focus();
    
    
    
    editBtn.addEventListener("click", e => {
        if (textArea.readOnly) {
            textArea.readOnly = false;
            textArea.focus();
        } else {
            textArea.readOnly = true;
            updateNotes();
        }
    });
    delBtn.addEventListener("click", e => {
        newNote.remove();
        updateNotes();
    });
}

function updateNotes(){
    const notesText = document.querySelectorAll('.note textarea');
    let notes = [];
    notesText.forEach( note => {
        if (note.value.length != 0) {
            notes.push(note.value)
        }
    });
    localStorage.setItem("notes",JSON.stringify(notes));
}