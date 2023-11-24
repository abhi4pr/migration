
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
function PlanOverview() {
    const [searchText, setSearchText] = useState("");
    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
    };
  const columns = [
    {
        field: "S.NO",
        headerName: "S.NO",
        width: 70,
        editable: false,
        renderCell: (params) => {
          const rowIndex = rows.indexOf(params.row);
          return <div>{rowIndex + 1}</div>;
        },
      },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 150 },
    {
        field: "plan_overview",
        headerName: "Plan Overview",
        width: 150,
        renderCell: () => {
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
       // width: 150,
      },
  ];
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon" },
    { id: 2, lastName: "Lannister", firstName: "Cersei"},
    { id: 3, lastName: "Lannister", firstName: "Jaime" },
  ];
  const filteredRows = rows.filter((row) => {
    return (
      row.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  return (
    <>
          <Paper>
        <div className="form-heading">
          <div className="form_heading_title">
            <h2> Plan Overview </h2>
          </div>
          </div>
      </Paper>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        style={{ margin: "10px" }}
      />
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
    </div>
    </>
  );
}
export default PlanOverview;