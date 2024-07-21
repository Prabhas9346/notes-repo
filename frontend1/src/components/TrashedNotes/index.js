import { useEffect, useState, useCallback } from 'react';
import SideBar from '../SideBar';
import TrashedNote from '../TrashedNote';
import './index.css';
import { getJwtToken } from '../utils/auth';

const TrashedNotes = () => {
    const [notes, setNotes] = useState([]);

    const fetchNotes = useCallback(async () => {
        const token = getJwtToken();
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const url = 'http://localhost:8000/notes/Trashed';

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                const errorText = await response.text();
                console.log('Error:', errorText);
                return;
            }

            const receivedData = await response.json();
            setNotes(receivedData);
            console.log(receivedData);
        } catch (error) {
            console.log('Error:', error);
        }
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <div className="page-body">
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="notesEls">
                <ul className="notesElListsdisplay">
                    {notes.map((note) => (
                        <TrashedNote
                            key={note.id}
                            note={note}
                            onUpdate={fetchNotes}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TrashedNotes;
