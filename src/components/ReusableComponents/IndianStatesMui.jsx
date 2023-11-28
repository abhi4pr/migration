import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import statesAndUTs from "./IndianStatesAndUTs";

const IndianStatesMui = ({ onChange, newValue }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event, value) => {
    onChange(value);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <>
      <Autocomplete
        options={statesAndUTs}
        value={newValue}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField {...params} label="State/UT" variant="outlined" required />
        )}
        clearOnEscape
      />
    </>
  );
};

export default IndianStatesMui;
