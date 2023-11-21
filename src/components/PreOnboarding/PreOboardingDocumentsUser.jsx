import axios from "axios";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";

const PreOboardingDocumentsUser = () => {
  //   useEffect(axios.get());
  return (
    <>
      <div className="card">
        <div className="data_tbl table-responsive">
          <DataTable title="Documents" fixedHeader highlightOnHover subHeader />
        </div>
      </div>
    </>
  );
};

export default PreOboardingDocumentsUser;
