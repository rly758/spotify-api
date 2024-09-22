import React, { useState } from "react";
import { Grid2 as Grid, TextField, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import SearchResults from "./components/SearchResults";

const Recommender = ({ auth }) => {
  const { token } = auth;
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);

  const searchSpotify = async () => {
    const url = "https://api.spotify.com/v1/search";
    const searchQuery = encodeURIComponent(searchString);
    const typeQuery = "type=artist";
    fetch(`${url}?q=${searchQuery}&${typeQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setSearchResults(data.artists.items)); //console.log(searchResults) will give current render's state value, not the updated value
  };

  return (
    <div className="Recommender">
      <Grid container style={{ padding: 20 }} spacing={1}>
        <Grid size={{ xs: 12 }}>Spotify Recommender</Grid>
        <Grid size={{ xs: 6 }}>
          <Grid
            size={{ xs: 12 }}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <TextField
              variant={"outlined"}
              label={"Search"}
              style={{ backgroundColor: "white" }}
              fullWidth
              onChange={(event) => setSearchString(event.target.value)}
              value={searchString}
            />
            <Button
              style={{ backgroundColor: "#ff905b" }}
              onClick={searchSpotify}
            >
              <Search />
            </Button>
          </Grid>
          <Grid xs={12}>
            <SearchResults
              onChange={setSelectedArtists}
              results={searchResults}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Recommender;
