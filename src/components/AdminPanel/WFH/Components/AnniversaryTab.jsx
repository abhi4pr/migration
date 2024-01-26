import React from "react";

const AnniversaryTab = ({ workAnniversary }) => {
  return (
    <>
      {workAnniversary?.map((item) => (
        <li key={item.user_id}>
          <img
            src={`https://api-dot-react-migration-project.el.r.appspot.com//api/${item.image}`}
            alt="user Image"
          />
          {item.user_name}
          {item.joining_date?.split("T")[0].split("-").reverse().join("-")}
          Total years: {item.total_years} years
        </li>
      ))}
    </>
  );
};

export default AnniversaryTab;