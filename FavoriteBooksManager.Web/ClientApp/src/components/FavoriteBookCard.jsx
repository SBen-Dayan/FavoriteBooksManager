import { useState } from "react";
import axios from "axios";

export default function FavoriteBookCard({refresh, favoiteBook: { id, title, author, notes, coverImage } }) {
    const [noteHidden, setNoteHidden]  = useState(true);
    const [ editNotesText, setEditNotesText ] = useState(notes);
    const [editMode, setEditMode] = useState(false);

    const onSaveClick = async () => {
        await axios.post('/api/books/updateBookNote', { id, notes : editNotesText});
        setEditMode(false);
        refresh();
    }

    return <>
        <div className="col-md-4 mb-3 card h-100">
            <div className="d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                <img src={coverImage} className="card-img-top"
                    alt={title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">by {author}</p>
                <div className="mt-auto">
                    {!editMode && <button className="btn btn-outline-primary w-100 mb-2" onClick={() => setEditMode(true)}>
                        {notes ? 'Edit Note' : 'Add Note'}
                    </button>}
                    {(!noteHidden && !editMode) && <div className="mt-3"><h6>Note</h6>
                        <p>{notes}</p>
                    </div>}
                    {(notes && !editMode) && <button className="btn btn-outline-dark w-100" onClick={() => setNoteHidden(!noteHidden)}>
                        {noteHidden ? 'Show Note' : 'Hide Note'}
                    </button>}
                    {!!editMode && <div className="mt-3">
                        <textarea className="form-control" rows="3" placeholder="Add your notes here..."
                            value={editNotesText || ''} onChange={e => setEditNotesText(e.target.value)} />
                        <div className="d-flex justify-content-between mt-2">
                            <button className="btn btn-success" onClick={onSaveClick}>Save Note</button>
                            <button className="btn btn-outline-secondary ms-2" onClick={() => {setEditMode(false); setEditNotesText(notes)}}>Cancel</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    </>
}
