// script.js

document.getElementById('save-note-btn').addEventListener('click', saveNote);

function saveNote() {
    const noteText = document.getElementById('note-input').value;
    if (!noteText) {
        alert('Please enter a note!');
        return;
    }

    // Simulate saving to the "backend" (in this case, localStorage)
    let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.push({ text: noteText, id: new Date().getTime() });
    localStorage.setItem('notes', JSON.stringify(savedNotes));

    document.getElementById('note-input').value = ''; // Clear the textarea
    displayNotes(); // Refresh the note display
}

function displayNotes() {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = ''; // Clear the current notes

    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.setAttribute('data-id', note.id);

        const noteContent = document.createElement('div');
        noteContent.innerText = note.text;

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => editNote(note.id));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteNote(note.id));

        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(editButton);
        noteDiv.appendChild(deleteButton);

        notesContainer.appendChild(noteDiv);
    });
}

function editNote(noteId) {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = savedNotes.find(note => note.id === noteId);
    
    if (noteToEdit) {
        document.getElementById('note-input').value = noteToEdit.text;
        deleteNote(noteId); // Remove the note before editing it
    }
}

function deleteNote(noteId) {
    let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes = savedNotes.filter(note => note.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(savedNotes));

    displayNotes(); // Refresh the note display after deletion
}

// Display saved notes on initial load
displayNotes();
