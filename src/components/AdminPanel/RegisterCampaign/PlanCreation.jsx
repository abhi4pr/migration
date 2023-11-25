import { DataGrid } from "@mui/x-data-grid";
import CampaignDetailes from "./CampaignDetailes";
// import { useParams } from 'react-router-dom';


const PlanCreation = () => {
    // const param = useParams()
    // const id =param.id
  const rows = [
    { id: 1, name: "John Doe", age: 25, Postpage: 6,vender:" mukesh kumar" },
    { id: 2, name: "Jane Smith", age: 30, Postpage: 4,vender:" nilesh kumar" },
  ];

  const columns = [
    {
        field: "S.NO",
        headerName: "S.NO",
        width: 90,
        editable: false,
        renderCell: (params) => {
          const rowIndex = rows.indexOf(params.row);
          return <div>{rowIndex + 1}</div>;
        },
      },
    { field: "name", headerName: "Page name", width: 150 },
    { field: "age", headerName: "Follower Count", width: 150 },
    { field: "Postpage", headerName: "Post / page", width: 200 },
    { field: "vender", headerName: "Vender", width: 200 },
    { field: "replacement", headerName: "Replacement ", width: 200 },


  ];

  return (
    <>
      <div>
        <div className="form_heading_title">
          <h2 className="form-heading">Plan Creation</h2>
        </div>
      </div>
      <CampaignDetailes />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5}  />
      </div>
    </>
  );
};

export default PlanCreation;
