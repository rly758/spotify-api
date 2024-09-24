import React, { useState } from "react";
import { Grid2 as Grid, TextField, Button, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import SearchResults from "./components/SearchResults";
import TrackList from "./components/TrackList";
import SliderBoard from "./components/SliderBoard";

const Recommender = ({ auth }) => {
  const { token } = auth; //api access token
  const [searchString, setSearchString] = useState(""); //search bar string
  const [searchResults, setSearchResults] = useState([]); //search results from search bar
  const [selectedArtists, setSelectedArtists] = useState([]); //selected seed artists for recommending
  const [sliderValues, setSliderValues] = useState({}); //floor and ceiling track trait values for recommending
  const [recommendationResults, setRecommendationResults] = useState(null); //recommended tracks given slider values, seed artists, and/or seed genres

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

  const getRecommendations = async () => {
    const url = "https://api.spotify.com/v1/recommendations";

    // create artists query string
    let selectedArtistsString;
    if (selectedArtists.length < 0) {
      return;
    } else {
      selectedArtistsString = `seed_artists=${selectedArtists.join(",")}`;
    }

    // create sliders query string
    let min = [];
    let max = [];
    Object.keys(sliderValues).forEach((slider) => {
      if (sliderValues[slider].enabled) {
        // then we add our min and max values
        min.push(`min_${slider}=${sliderValues[slider].value[0]}`);
        max.push(`max_${slider}=${sliderValues[slider].value[1]}`);
      }
    });
    const minString = min.join("&");
    const maxString = max.join("&");

    console.log(`${url}?${selectedArtistsString}&${minString}&${maxString}`);

    fetch(`${url}?${selectedArtistsString}&${minString}&${maxString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRecommendationResults(data));
  };

  return (
    <div className="Recommender">
      <Grid container style={{ padding: 20 }} spacing={1}>
        <Grid size={{ xs: 12 }}>Spotify Recommender</Grid>
        <Grid size={{ xs: 6 }}>
          <Grid size={{ xs: 12 }}>
            {selectedArtists.map((artist, index) => (
              <Typography key={artist.id}>
                {index + 1}. {artist.name}
              </Typography>
            ))}
          </Grid>
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
          <Grid size={{ xs: 12 }}>
            <SearchResults
              onChange={setSelectedArtists}
              results={searchResults}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <SliderBoard onChange={setSliderValues} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button variant={"contained"} onClick={getRecommendations}>
            Get Recommendations
          </Button>
        </Grid>
        <Grid size={{ xs: 12 }}>
          {recommendationResults && (
            <TrackList results={recommendationResults} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default Recommender;
