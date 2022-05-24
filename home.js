document.addEventListener('DOMContentLoaded', function () {

    function CreateNote (noteContents) {

        fetch( '/api/note',
                {
                    method: 'POST',
                    body: JSON.stringify({ noteContents }),
                    headers: {'Content-Type': 'application/json'}
                }
            ).then (res => res.text())
            .then(newUID => {
                AddNoteItem (newUID)
            }).catch (error => {
                console.error(error)
            })
    }
    
    function ReadNote (noteID) {
        console.log(noteID)
        fetch( '/api/note/' + noteID,
        )
        .then(res => res.text())
        .then(noteContents => {
            document.getElementById('note-textarea').value = noteContents
            document.getElementById('note-button-update').setAttribute('data-note-id', noteID)
            document.getElementById('note-button-delete').setAttribute('data-note-id', noteID)
        })
        .catch(error => {
            console.error(error)
        })
    }
    
    function AddNoteItem (noteID) {
        const noteItemButton = document.createElement('button')
        noteItemButton.textContent = 'Read Note'
        noteItemButton.addEventListener('click', function(){
            ReadNote(noteID)
        })
        
        const noteItem = document.createElement('li')
        noteItem.textContent = noteID
        noteItem.append(noteItemButton)
    
        document.getElementById('notes').append(noteItem)
    }
    
    function UpdateNote (noteID, noteContents) {
        fetch('/api/note/' + noteID, 
        {
            method: 'PUT',
            body: JSON.stringify({ noteContents }),
            headers: {'Content-Type': 'application/json'}
        }
    
        ).then (res => res.text())
        .then(() => {
           alert(`Note ${noteID} updated:\n${noteContents}`)
        })
        .catch(error => {
            console.error(error)
        })
    }
    
    function DeleteNote (noteID) {
        fetch(
            '/api/note/' + noteID,
            {
                method: 'DELETE'
            }
        )
        .then(res => res.text())
        .then(deletedNoteContents => {
            alert(`Note ${noteID} deleted:\n${deletedNoteContents}`)
        })
        .catch(error => {
            console.error(error)
        })
    }
    
    function ShowNoteIDs () {
        fetch(
            '/api/notes'
        )
        .then(res => res.json())
        .then(noteIDs => {
            for (let noteID of noteIDs){
                AddNoteItem(noteID)
            }
        })
        .catch(error => {
            console.error(error)
        })    
    }

    document.getElementById('new-note-button').addEventListener (
        'click', function (e) {

            const noteContents = document.getElementById('new-note-content').value 
            
            CreateNote (noteContents)
        
            console.log(noteContents);
        }
    )

    document.getElementById('note-button-update').addEventListener (
        'click', function (e) {
            const noteContents = document.getElementById('note-textarea').value
            const noteID = 
            e.target.getAttribute('data-note-id')

            if (noteID && !isNaN(noteID)) {
                UpdateNote (noteID, noteContents)
            }
        }
    )

    document.getElementById('note-button-delete').addEventListener (
        'click', function (e) {
            const noteID = 
            e.target.getAttribute('data-note-id')

            if (noteID && !isNaN(noteID)) {
                DeleteNote (noteID)
            }
        }
    )
    
    ShowNoteIDs();
    
})