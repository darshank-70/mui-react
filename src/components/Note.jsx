import {
  DeleteForeverSharp,
  DeleteOutlineTwoTone,
  DeleteSharp,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { formatDistance, subDays } from "date-fns";
const Note = ({ note, handleNoteDelete }) => {
  // console.log(note);
  const COLOR_CATERGORY = {
    todos: "darkolivegreen",
    reminders: "cadetblue",
    money: "goldenrod",
  };
  return (
    <Card elevation={3}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: COLOR_CATERGORY[note.noteCategory] }}>
            {note.noteCategory[0].toUpperCase()}
          </Avatar>
        }
        title={note.noteTitle}
        subheader={`${note.noteCategory}`}
        action={
          <IconButton onClick={() => handleNoteDelete(note.id)}>
            <DeleteSharp color="error" />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2">{note.noteDescription} </Typography>
      </CardContent>
    </Card>
  );
};

export default Note;
