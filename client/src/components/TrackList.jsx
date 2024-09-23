import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const TrackList = ({ results }) => {
  console.log(results);
  if (!results.tracks || results.tracks.length === 0) {
    return <Typography>No Recommended Tracks</Typography>;
  }
  return (
    <List>
      {results.tracks.map((track) => (
        <ListItem size={{ xs: 12 }} key={track.id}>
          <ListItemText>
            {track.name} - {track.artists ? track.artists[0].name : ""}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default TrackList;
