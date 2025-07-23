// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { signOut } from 'firebase/auth';
import { auth, db } from '../Auth/Firebase';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import CustomAlert from '../Components/CustomAlert';
import ProgressBar from '../Components/ProgressBar';

const Dashboard = ({alertMsg, setAlertMsg}) => {
  // const [allNotes, setAllNotes] = useState([]);
  // const [notesTitle, setNotesTitle] = useState("");
  // const [notesContent, setNotesContent] = useState("");
  // const [isEditing, setIsEditing] = useState(null);
  // const [user, setUser] = useState(null);

  const navigate = useNavigate();



  // useEffect(() => {
  //   ProgressBar.start()
  //   const currentUser = auth.currentUser;
  //   if (!currentUser) {
  //     navigate("/login");
  //     return;
  //   }
  //   setUser(currentUser);
  //   fetchNotes(currentUser.uid);
  //   ProgressBar.done()
  // }, []);

  // const fetchNotes = async (uid) => {
  //   try {
  //     ProgressBar.start()
  //     const q = query(collection(db, "notes"), where("uid", "==", uid));
  //     const querySnapshot = await getDocs(q);
  //     const notes = [];
  //     querySnapshot.forEach((doc) => {
  //       notes.push({ ...doc.data(), id: doc.id });
  //     });
  //     setAllNotes(notes);
  //     ProgressBar.done()
  //   } catch (error) {
  //     console.error("Error fetching notes:", error);
  //   }
  // };

  // const addNotes = async () => {
  //   if (notesTitle.trim() === "" || notesContent.trim() === "") {
  //     setAlertMsg({show: true, type: 'error', message:"Can't add empty notes."})
  //     return;
  //   }

  //   try {
  //     ProgressBar.start()
  //     await addDoc(collection(db, "notes"), {
  //       uid: user.uid,
  //       title: notesTitle,
  //       content: notesContent,
  //       liked: false,
  //       createdAt: new Date()
  //     });

  //     setNotesTitle("");
  //     setNotesContent("");
  //     fetchNotes(user.uid);
  //     ProgressBar.done()
  //   } catch (error) {
  //     ProgressBar.done()
  //     console.error("Error adding note:", error);
  //   }
  // };

  // const deleteNote = async (id) => {
  //   try {
  //     ProgressBar.start()
  //     await deleteDoc(doc(db, "notes", id));
  //     fetchNotes(user.uid);
  //     ProgressBar.done()
  //   } catch (error) {
  //     ProgressBar.done()
  //     console.error("Error deleting note:", error);
  //   }
  // };

  // const handlelikedNotes = async (id, currentLiked) => {
  //   try {
  //     await updateDoc(doc(db, "notes", id), {
  //       liked: !currentLiked
  //     });
  //     fetchNotes(user.uid);
  //   } catch (error) {
  //     console.error("Error updating like:", error);
  //   }
  // };

  // const startEditing = (note) => {
  //   setIsEditing(note.id);
  //   setNotesTitle(note.title);
  //   setNotesContent(note.content);
  // };

  // const saveEditedNote = async () => {
  //   try {
  //     ProgressBar.start()
  //     await updateDoc(doc(db, "notes", isEditing), {
  //       title: notesTitle,
  //       content: notesContent
  //     });
  //     setNotesTitle("");
  //     setNotesContent("");
  //     setIsEditing(null);
  //     fetchNotes(user.uid);
  //     ProgressBar.done()
  //   } catch (error) {
  //     ProgressBar.done()
  //     console.error("Error updating note:", error);
  //   }
  // };

  // const cancelNote = () => {
  //   setNotesTitle("");
  //   setNotesContent("");
  //   setIsEditing(null);
  // };

  const handleLogOut = async () => {
    ProgressBar.start()
    await signOut(auth);
    setAlertMsg({ show: false, type: '', message: '' });
    ProgressBar.done()
    navigate("/login");
  };

  return (
    <>
      <div style={{display: "flex", textAlign:"center", justifyContent: "center"}}>
    <h1 >welcome to dashboard.</h1> 
   <button className="logout-btn" onClick={handleLogOut}>Logout</button>
    </div>
{/* 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>YourNoteBook.</h1>
      </div>
      <h6 style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>Your personal Diary online.</h6>

      <div className="notes-input">
        <div className="input-container">

        
        <h2 style={{marginBottom: '25px'}}>Write your notes.</h2>
        <input type="text" className='input-title' placeholder='Title' value={notesTitle} onChange={(e) => setNotesTitle(e.target.value)} />
        <br />
        <input type="text" className='input-content' placeholder='Content' value={notesContent} onChange={(e) => setNotesContent(e.target.value)} />
        <br />
        {isEditing ? (
  <div className="set-2-btns">
    <button className="save-note-btn" onClick={saveEditedNote}>💾 Save</button>
    <button className="cancel-btn" onClick={cancelNote}>❌ Cancel</button>
  </div>
) : (
  <div className="set-2-btns">
    <button className="addNote-btn" onClick={addNotes}>Add note</button>
    <button className="logout-btn" onClick={handleLogOut}>Logout</button>
  </div>
)}
</div>
        <ul>
          <h2 style={{ textAlign: "center", marginBottom: "30px", marginTop: '25px', marginRight: '20px'}}>Your Notes</h2>
          <div className="notes-wrapper">
      <div className="notes-list">

          <div className="notes-list">
            {allNotes.map((note) => (
              <div key={note.id} className='notesCards'>
                <strong>{note.title}</strong>
                <p>{note.content}</p>
                <div className='sets-3-btn'>
                <button onClick={() => handlelikedNotes(note.id, note.liked)}>
                  {note.liked ? '❤️ Liked' : '🤍 Like'}
                </button>
                <button onClick={() => startEditing(note)}>✏️ Edit</button>
                <button onClick={() => deleteNote(note.id)}>❌ Delete</button>
                </div>
              </div>
            ))}
          </div>
          </div>
          </div>
        </ul>
      </div> */}
      <CustomAlert message={alertMsg} onClose={() => setAlertMsg({show: false, message: '', type: ''})} />
    </>
  );
};

export default Dashboard;

