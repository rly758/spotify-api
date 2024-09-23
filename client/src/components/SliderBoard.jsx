import React, { useState, useEffect } from "react";
import { Grid2 as Grid, Typography, Slider, Checkbox } from "@mui/material";

const sliders = {
  popularity: {
    value: [0, 100],
    enabled: false,
    min: 0,
    max: 100,
    step: 1,
  },
  acousticness: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  danceability: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  energy: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  instrumentalness: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  liveness: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  loudness: {
    value: [-60, 0],
    enabled: false,
    min: -60,
    max: 0,
  },

  speechiness: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  tempo: {
    value: [0, 200],
    enabled: false,
    min: 0,
    max: 200,
    step: 1,
  },
  valence: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
};

const SliderBoard = ({ onChange }) => {
  const [sliderValues, setsliderValues] = useState(sliders);

  const handleChange = (slider, value) => {
    const newsliderValues = { ...sliderValues };
    newsliderValues[slider].value = value;
    setsliderValues(newsliderValues);
  };

  const toggleSlider = (slider, value) => {
    const newsliderValues = { ...sliderValues };
    newsliderValues[slider].enabled = value;
    setsliderValues(newsliderValues);
  };

  useEffect(() => {
    onChange(sliderValues);
  }, [onChange, sliderValues]);

  return (
    <Grid container spacing={2} style={{ padding: 10 }}>
      {Object.keys(sliders).map((slider) => (
        <Grid size={{ xs: 12 }} key={slider}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Checkbox
              checked={sliderValues[slider].enabled}
              onChange={(event, newValue) => toggleSlider(slider, newValue)}
            />
            <div style={{ flex: 1 }}>
              <Typography>{slider}</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 1 }}>
                  <Typography>Min</Typography>
                </Grid>
                <Grid size={{ xs: 10 }}>
                  <Slider
                    disabled={!sliderValues[slider].enabled}
                    value={sliderValues[slider].value}
                    onChange={(event, newValue) =>
                      handleChange(slider, newValue)
                    }
                    valueLabelDisplay={"on"}
                    aria-labelledby={"range-slider"}
                    min={sliders[slider].min}
                    max={sliders[slider].max}
                    step={sliders[slider].step}
                  />
                </Grid>
                <Grid size={{ xs: 1 }}>
                  <Typography>Max</Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default SliderBoard;
