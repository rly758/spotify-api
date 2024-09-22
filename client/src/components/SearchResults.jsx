import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";

const SearchResults = ({ results, onChange }) => {
  const [checked, setChecked] = React.useState([]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      if (checked.length < 3) {
        newChecked.push(value);
      }
    } else {
      newChecked.splice(currentIndex, 1);
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
          onClick={handleToggle(item.id)}
        >
          <ListItemIcon>
            <Checkbox
              edge={"start"}
              checked={checked.indexOf(item.id) !== -1}
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
