import React, { useState } from "react";
import Select from "react-select";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Ladakh",
];

const IndianStates = ({ onChange }) => {
  const [selectedState, setSelectedState] = useState(null);

  const options = states.map((state) => ({
    value: state,
    label: state,
  }));

  const handleChange = (selectedState) => {
    setSelectedState(selectedState);
    onChange(selectedState);
  };
  return (
    <>
      <label className="form-label">States and UT</label>
      <Select
        className=""
        options={options}
        value={selectedState}
        onChange={handleChange}
        isClearable
        isSearchable
        required
      />
    </>
  );
};

export default IndianStates;
