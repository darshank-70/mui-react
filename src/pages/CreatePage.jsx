import {
  Button,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  Typography,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Category, CloseSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 55,
    display: "block",
    marginBottom: 35,
    "& input": {
      fontSize: 35,
      // fontFamily: "Poppins",
    },
    "& label": {
      fontSize: 22,
      paddingRight: 12,
    },
  },
  icon: {
    "& MuiSvgIcons-root": {
      margin: 12,
    },
  },
}));
const useTextStyle = makeStyles((theme) => ({
  text: {
    fontSize: 42,
    fontFamily: "Poppins",
  },
}));

const CreatePage = () => {
  const classes = useStyles();
  const x = useTextStyle();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");

  const [noteTitleErr, setNoteTitleErr] = useState(false);
  const [noteDescriptionErr, setNoteDescriptionErr] = useState(false);

  const [noteCategory, setNoteCategory] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setNoteTitleErr(noteTitle === "");
    setNoteDescriptionErr(noteDescription === "");
    setNoteCategory(noteCategory == null ? "todos" : noteCategory);

    if (noteTitle && noteDescription && noteCategory) {
      console.log(`${noteTitle} : ${noteDescription} : ${noteCategory}`);
      // fetch("http://localhost:3000/notes", {
      //   method: "POST",
      //   headers: { "Content-type": "application/json" },
      //   body: JSON.stringify({ noteTitle, noteDescription, noteCategory }),
      // }).then((success) => {
      //   toast.success("Note Created Successfully. ✔");
      //   navigate("/");
      // });
      const newNote = {
        id: uuidv4(),
        noteTitle: noteTitle,
        noteDescription: noteDescription,
        noteCategory: noteCategory,
      };
      const localData = window.localStorage.getItem("notes");
      const storeList = JSON.parse(localData);
      storeList.push(newNote);
      const newData = JSON.stringify(storeList);
      window.localStorage.setItem("notes", newData);
      toast.success("Note Created Successfully. ✔");
      navigate("/");
    }
  };
  return (
    <div className="create-page-container">
      <Typography className={x.text}>Create new Note</Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          error={noteTitleErr}
          className={classes.field}
          variant="outlined"
          label="Title"
          onChange={(e) => {
            setNoteTitle(e.target.value);
            console.log(noteTitle);
            setNoteTitleErr(noteTitle.length == 0 ? true : false);
          }}
          helperText={noteTitleErr ? "Title cannot be Empty." : ""}
          fullWidth
        />
        <TextField
          className={classes.field}
          rows={6}
          variant="outlined"
          label="Description"
          onChange={(e) => {
            setNoteDescription(e.target.value);

            setNoteDescriptionErr(noteDescription === "");
          }}
          error={noteDescriptionErr}
          helperText={noteDescriptionErr ? "Description cannot be Empty." : ""}
          multiline
          fullWidth
        />

        <FormControl required fullWidth className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={noteCategory}
            onChange={(e) => setNoteCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
          </RadioGroup>
        </FormControl>
        <Button size="large" variant="contained" type="submit">
          Add Note
          <AddBoxIcon sx={{ fontSize: 32, marginLeft: 2 }} />
        </Button>
      </form>
    </div>
  );
};

export default CreatePage;
