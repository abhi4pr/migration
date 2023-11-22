import React, { useState } from "react";

const PhoneNumberValidator = ({ eventHere }) => {
  const newContact = eventHere.target.value;
  setValidCon(newContact);

  if (newContact === "") {
    setterRegex(false);
  } else {
    setterRegex(/^(\+91[ \-\s]?)?[0]?(91)?[6789]\d{9}$/.test(newContact));
  }

  return <></>;
};

export default PhoneNumberValidator;
