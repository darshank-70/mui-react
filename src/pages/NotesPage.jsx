import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Note from "../components/Note";
import { Box, Container, Fab, Grid } from "@mui/material";

import { Toaster, toast } from "react-hot-toast";
import Masonry from "react-masonry-css";
import { makeStyles } from "@mui/styles";
const useNotesStyle = makeStyles({
  rmcDiv: {
    width: "fit-content",
  },
});
const NotesPage = () => {
  const navigate = useNavigate();

  const [notesList, setNotesList] = useState([]);

  // const fetchNotes = async () => {
  //   let response = await fetch("http://localhost:3000/notes");
  //   let jsonData = await response.json();
  //   setNotesList(jsonData);
  // };
  const classes = useNotesStyle();
  useEffect(() => {
    if (window.localStorage.getItem("notes") == null) {
      const init = [
        {
          id: "6abf",
          noteTitle: "Welcome! ",
          noteDescription: " Create Your Todos, reminders etc...",
          noteCategory: "todos",
        },
      ];
      const initData = JSON.stringify(init);
      window.localStorage.setItem("notes", initData);
    }
    // fetchNotes();
    const notesFetched = window.localStorage.getItem("notes");
    console.log(notesFetched);
    setNotesList(JSON.parse(notesFetched));
    console.log(JSON.parse(notesFetched));
  }, []);

  const handleNoteDelete = (id) => {
    // fetch(`http://localhost:3000/notes/${id}`, {
    //   method: "DELETE",
    // }).then((success) => {
    //   console.log(success);
    // });

    const updatedNotesList = notesList.filter((note) => note.id != id);
    setNotesList(updatedNotesList);
    const stringifiedNotesList = JSON.stringify(updatedNotesList);
    window.localStorage.setItem("notes", stringifiedNotesList);
    toast.success("Successfully deleted Note");
  };
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <Container
        sx={{
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 4,
        }}
      >
        <Masonry
          id="mson"
          breakpoints={breakpointColumnsObj}
          className={"my-masonry-grid"}
          columnClassName={"my-masonry-grid_column"}
        >
          {notesList.map((note) => (
            <div key={note.text} className={classes.rmcDiv}>
              <Note note={note} handleNoteDelete={handleNoteDelete} />
            </div>
          ))}
        </Masonry>
      </Container>

      {/* <Box margin={5} /> */}
      <Fab
        size="large"
        sx={{
          marginTop: 3,
          padding: 2,
        }}
        variant="extended"
        color="primary"
        onClick={(e) => {
          navigate("/create");
        }}
      >
        Create new Note{" "}
      </Fab>
    </div>
  );
};

export default NotesPage;
