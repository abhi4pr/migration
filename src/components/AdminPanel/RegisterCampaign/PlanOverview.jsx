import React from "react";
//import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';


function PlanOverview() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 150 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
    },
    {
        field: "plan_overview",
        headerName: "Plan Overview",
        renderCell: (params) => {
          return (
            <div className="d-flex text-center align-item-center justify-content-center">
              <Link to="/admin/phase">
              <Button type="button">
                <SendTwoToneIcon />
              </Button>
              </Link>
            </div>
          );
        },
        width: 200,
      },
     
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}

export default PlanOverview;
