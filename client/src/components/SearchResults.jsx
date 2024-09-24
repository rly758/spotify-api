import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";

const SearchResults = ({ results, onChange }) => {
  const [checked, setChecked] = React.useState([]); //array of objects (checked artists )

  const handleToggle = (item) => () => {
    const currentIndex = checked.indexOf(item); //currentIndex is the index of the artist object in the checked array
    const newChecked = [...checked];
    //if currentIndex is not in checked
    if (currentIndex === -1) {
      //and if checked contains less than 3 items
      if (checked.length < 3) {
        newChecked.push(item);
      }
    } else {
      //currentIndex is in checked
      newChecked.splice(currentIndex, 1); //removes 1 item at currentIndex
    }
    setChecked(newChecked);
    onChange(newChecked);
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
              checked={checked.indexOf(item) !== -1}
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
