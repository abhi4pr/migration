import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import statesAndUTs from "./IndianStatesAndUTs";

const IndianStatesMui = ({ onChange, newValue }) => {
  const [selectedState, setSelectedState] = useState(null);

  const handleChange = (event, value) => {
    setSelectedState(value);
    onChange(value);
  };

  return (
    <>
      <Autocomplete
        options={statesAndUTs}
        value={selectedState}
        onChange={handleChange}
        inputValue={newValue || ""}
        onInputChange={(event, newInputValue) => {
          setSelectedState(newInputValue);
        }}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField {...params} label="State/UT" variant="outlined" required />
        )}
        isClearable
        isSearchable
      />
    </>
  );
};

export default IndianStatesMui;
