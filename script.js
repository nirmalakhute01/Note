document.addEventListener('DOMContentLoaded', () => {
    const darkModeBtn = document.getElementById('darkModeBtn');
    const lightModeBtn = document.getElementById('lightModeBtn');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteInput = document.getElementById('noteInput');
    const notesList = document.getElementById('notesList');

    // Load saved notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    // Function to render notes
    const renderNotes = () => {
        notesList.innerHTML = ''; // Clear existing notes
        savedNotes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.innerHTML = `
                <span>${note}</span>
                <div class="button-group">
                    <button onclick="editNote(${index})">Edit</button>
                    <button onclick="deleteNote(${index})">Delete</button>
                </div>
            `;
            notesList.appendChild(noteDiv);
        });
    };

    // Function to delete a note
    const deleteNote = (index) => {
        savedNotes.splice(index, 1); // Remove note from array
        localStorage.setItem('notes', JSON.stringify(savedNotes)); // Update local storage
        renderNotes(); // Re-render notes
    };

    // Function to edit a note
    const editNote = (index) => {
        const updatedText = prompt("Edit your note:", savedNotes[index]);
        if (updatedText !== null && updatedText.trim() !== "") {
            savedNotes[index] = updatedText.trim();
            localStorage.setItem('notes', JSON.stringify(savedNotes)); // Update local storage
            renderNotes(); // Re-render notes
        }
    };

    // Expose deleteNote and editNote globally
    window.deleteNote = deleteNote;
    window.editNote = editNote;

    // Function to add a new note
    const addNote = () => {
        const noteText = noteInput.value.trim(); // Get input value
        if (noteText) {
            savedNotes.unshift(noteText); // Add note at the start
            localStorage.setItem('notes', JSON.stringify(savedNotes)); // Save to local storage
            noteInput.value = ''; // Clear input field
            renderNotes(); // Re-render notes
        }
    };

    // Event listeners
    addNoteBtn.addEventListener('click', addNote);

    noteInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent new line
            addNote(); // Add note on Enter key
        }
    });

    darkModeBtn.addEventListener('click', () => {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        darkModeBtn.style.color = 'white'; // Change dark mode button text color to white
        lightModeBtn.style.color = 'white'; // Change light mode button text color to white
    });

    lightModeBtn.addEventListener('click', () => {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        darkModeBtn.style.color = 'black'; // Change dark mode button text color to black
        lightModeBtn.style.color = 'black'; // Change light mode button text color to black
    });

    renderNotes(); // Initial render
});