import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";

const SearchResults = ({ results, onChange }) => {
  const [checked, setChecked] = React.useState([]); //holds the artist objects for artists that have been checked
  const handleToggle = (artist) => () => {
    //search the checked array for the id of the artist that triggered the handler
    const currentIndex = checked
      .map(function (x) {
        return x.id;
      })
      .indexOf(artist.id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      if (checked.length < 3) {
        //if the artist is not in the checked array and the checked array holds less than 3 artists
        newChecked.push(artist);
      }
    } else {
      //the artist was already in the checked array, so remove the artist (uncheck the artist)
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked); //update the checked array
    onChange(newChecked); //update the selected artists
  };
  return (
    <List style={{ maxHeight: "10rem", overflow: "auto" }}>
      {results.map((item, index) => (
        <ListItem
          key={item.id}
          dense
          button="true"
          onClick={handleToggle(item)}
        >
          <ListItemIcon>
            <Checkbox
              edge={"start"}
              //checked is true if the artist (as an object) is already included in the checked array
              checked={
                checked
                  .map(function (x) {
                    return x.id;
                  })
                  .indexOf(item.id) !== -1
              }
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText>{item.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
export default SearchResults;
