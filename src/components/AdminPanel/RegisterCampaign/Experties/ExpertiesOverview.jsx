import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import FormContainer from "../../FormContainer";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ExpertiesOverview = () => {
  const [getExpertiesData, setGetExpertiesData] = useState([]);
  const ExpertiesData = async () => {
    const Experties = await axios.get(
      "http://34.93.135.33:8080/api/get_all_departments"
    );
    const setexdata = Experties.data;
    setGetExpertiesData(setexdata);
    console.log(getExpertiesData, "exdata here");
  };

  useEffect(() => {
    ExpertiesData();
  }, []);

  const handleDelete = (userId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://34.93.135.33:8080/api/delete_user/${userId}`)
            .then(() => {
              // Check if no error occurred and then show the success alert
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
              getData();
            })
            .catch(() => {
              showErrorAlert();
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)"
          );
        }
      });
  };

  const columns = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      renderCell: (params) => {
        const rowIndex = getExpertiesData.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "dept_name",
      headerName: "Expert Name",
      width: 180,
      sortable: true,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          {/* <Link to={`/admin/expeties-update/${params.row.dept_id}`}>
            <EditIcon sx={{ gap: "4px", margin: "5px", color: "blue" }} />
          </Link> */}
          <Link to={`/admin/expeties-update`}>
            <EditIcon sx={{ gap: "4px", margin: "5px", color: "blue" }} />
          </Link>

          <DeleteOutlineIcon
            sx={{ gap: "4px", margin: "15px" }}
            color="error"
            onClick={() => handleDelete(params.row.user_id)}
          />
        </>
      ),
    },
  ];
  return (
    <div>
      <FormContainer
        mainTitle="Expertise Overview"
        link="/admin/experties"
        buttonAccess={true}
      />
      <div className="data_tbl" style={{ height: "64vh", width: "100%" }}>
        <DataGrid
          rows={getExpertiesData}
          columns={columns}
          // pageSize={10}
          // rowsPerPageOptions={[10]}
          // disableColumnMenu
          // disableSelectionOnClick
          getRowId={(row) => row.dept_id}
          // slots={{
          //   toolbar: GridToolbar,
          // }}
        />
      </div>
    </div>
  );
};

export default ExpertiesOverview;
