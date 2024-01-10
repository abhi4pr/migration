import React from "react";

const BirthdayTab = ({ birthdays }) => {
  return (
    <>
      {birthdays?.map((item) => (
        <li key={item.user_id}>
          <img
            src={`https://jarvis-work-backend.onrender.com//api/${item.image}`}
            alt="user Image"
          />
          {item.user_name}
          {item.joining_date?.split("T")[0].split("-").reverse().join("-")}
        </li>
      ))}
    </>
  );
};

export default BirthdayTab;
