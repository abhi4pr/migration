import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Expertise = () => {
  const [allUserData, setAllUserData] = useState([]);
  const [allPageData, setAllPageData] = useState([]);
  console.log(allPageData,);
  const getData = async () => {
    const userData = await axios.get(
      `http://34.93.135.33:8080/api/get_all_users`
    );
    setAllUserData(userData.data.data);
    const allpage = await axios.get(
      `https://purchase.creativefuel.io/webservices/RestController.php?view=inventoryDataList`
    );
    setAllPageData(allpage.data.body);
  };

  useEffect(() => {
    getData();
  }, []);
  const column = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      renderCell: (params) => {
        const rowIndex = allUserData.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "user_name",
      headerName: "user",
      width: 150,
      editable: true,
    },
  ];

  return (
    <>
      <div className="form_heading_title">
        <h2 className="form-heading">Expertise</h2>
      </div>
      <>
      
      </>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={allUserData}
          columns={column}
          getRowId={(row) => row.user_id}
          pageSizeOptions={[5]}
          pagination
        />
      </Box>
    </>
  );
};

export default Expertise;
