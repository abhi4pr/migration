import { useEffect, useState } from "react";
import FormContainer from "../FormContainer";
import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";
import ImageView from "./ImageView";

export default function PurchaseManagementAllTransaction() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [viewImgSrc, setViewImgSrc] = useState("");

  const callApi = () => {
    axios
      .get("https://api-dot-react-migration-project.el.r.appspot.com/api/phpvendorpaymentrequest")
      .then((res) => {
        console.log(res.data.modifiedData, "node js");
        const x = res.data.modifiedData;

        axios
          .get(
            "https://production.we-fit.in/webservices/RestController.php?view=getpaymentrequest"
          )
          .then((res) => {
            let y = res.data.body.filter((item) => {
              return x.some((item2) =>( item.request_id == item2.request_id));
            });
            console.log(res.data.body.filter((item) => {
              return x.some((item2) =>( item.request_id == item2.request_id));
            }),'y')
            setData(y);
            setFilterData(y);
            // let y = x;

            // let u = res.data.body.filter((item) => {
            //   return !y.some((item2) => item.request_id == item2.request_id);
            // });
            // console.log(u, "u");
            // setData(u);
            // setFilterData(u);
          });
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  const convertDateToDDMMYYYY = (date) => {
    const date1 = new Date(date);
    const day = String(date1.getDate()).padStart(2, "0");
    const month = String(date1.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date1.getFullYear();

    return `${day}/${month}/${year}`;
  };

  GridToolbar.defaultProps = {
    filterRowsButtonText: "Filter",
    filterGridToolbarButton: "Filter",
  };

  function calculateDays(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return diffDays;
  }

  const handleDateFilter = () => {
    const filterData = data.filter((item) => {
      const date = new Date(item.request_date);
      const fromDate1 = new Date(fromDate);
      const toDate1 = new Date(toDate);
      toDate1.setDate(toDate1.getDate() + 1);
      if (
        (date >= fromDate1 && date <= toDate1) ||
        item.vendor_name.toLowerCase().includes(vendorName.toLowerCase())
      ) {
        return item;
      }
    });
    setFilterData(filterData);
  };
  const handleClearDateFilter = () => {
    setFilterData(data);
    setFromDate("");
    setToDate("");
    setVendorName("");
  };

  const columns = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      editable: false,
      renderCell: (params) => {
        const rowIndex = filterData.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "invc_img",
      headerName: "Invoice Image",
      renderCell: (params) => {
        // Extract file extension and check if it's a PDF
        const fileExtension = params.row.invc_img
          .split(".")
          .pop()
          .toLowerCase();
        const isPdf = fileExtension === "pdf";

        const imgUrl = `https://production.we-fit.in/uploads/payment_proof/${params.row.invc_img}`;
        // console.log(params.row.invc_img ? imgUrl : "no image");
        return isPdf ? (
          <iframe
            onClick={() => {
              setOpenImageDialog(true);
              setViewImgSrc(imgUrl);
            }}
            src={imgUrl}
            style={{ width: "100px", height: "100px" }}
            title="PDF Preview"
          />
        ) : (
          <img
            onClick={() => {
              setOpenImageDialog(true);
              setViewImgSrc(imgUrl);
            }}
            src={imgUrl}
            alt="Invoice"
            style={{ width: "100px", height: "100px" }}
          />
        );
      },
      width: 250,
    },
    {
      field: "request_date",
      headerName: "Requested Date",
      width: 150,
      renderCell: (params) => {
        return convertDateToDDMMYYYY(params.row.request_date);
      },
    },
    {
      field: "name",
      headerName: "Requested By",
      width: 150,
      renderCell: (params) => {
        return params.row.name;
      },
    },
    {
      field: "vendor_name",
      headerName: "Vendor Name",
      // width: "auto",
      width: 250,
      renderCell: (params) => {
        return params.row.vendor_name;
      },
    },
    {
      field: "remark_audit",
      headerName: "Remark",
      width: 150,
      renderCell: (params) => {
        return params.row.remark_audit;
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      renderCell: (params) => {
        return params.row.priority;
      },
    },
    {
      field: "request_amount",
      headerName: "Requested Amount",
      width: 150,
      renderCell: (params) => {
        return <p> &#8377; {params.row.request_amount}</p>;
      },
    },
    {
      field: "outstandings",
      headerName: "OutStanding ",
      width: 150,
      renderCell: (params) => {
        return <p> &#8377; {params.row.outstandings}</p>;
      },
    },
    {
      field: "aging",
      headerName: "Aging",
      width: 150,
      renderCell: (params) => {
        return (
          <p> {calculateDays(params.row.request_date, new Date())} Days</p>
        );
      },
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        // console.log(params.row.status);
        return params.row.status == 1 ? (
          <p>Paid</p>
        ) : params.row.status == 2 ? (
          <p>Discarded</p>
        ) : (
          <p>Pending</p>
        );
      },
    },
  ];
  return (
    <div>
      <FormContainer
        mainTitle="All Transaction"
        link="/admin/finance-pruchasemanagement-alltransaction"
      />
      <div className="row">
        <div className="card col-4">
          <div className="card-header h4">Pending</div>
          <div className="card-body">
            <p className="fs-6 lead ">
              Total Requested Amount :-{" "}
              {data.length > 0
                ? data.reduce((total, currentItem) => {
                    return total + currentItem.request_amount * 1;
                  }, 0)
                : ""}
            </p>
            <p className="fs-6 lead ">
              {
                <Link
                  className="link-primary"
                  to="/admin/finance-pruchasemanagement-pendingpaymentrequest"
                >
                  Click Here
                </Link>
              }
            </p>
          </div>{" "}
        </div>{" "}
        <div className="card col-4">
          <div className="card-header h4">Done</div>
          <div className="card-body">
            <p className="fs-6 lead ">
              Total Requested Amount :-{" "}
              {data.length > 0
                ? data.reduce((total, currentItem) => {
                    return total + currentItem.request_amount * 1;
                  }, 0)
                : ""}
            </p>
            <p className="fs-6 lead ">
              {
                <Link
                  className="link-primary"
                  to="/admin/finance-pruchasemanagement-paymentdone"
                >
                  Click Here
                </Link>
              }
            </p>
          </div>{" "}
        </div>{" "}
        <div className="card col-4">
          <div className="card-header h4">Discard</div>
          <div className="card-body">
            <p className="fs-6 lead ">
              Total Requested Amount :-{" "}
              {data.length > 0
                ? data.reduce((total, currentItem) => {
                    return total + currentItem.request_amount * 1;
                  }, 0)
                : ""}
            </p>
            <p className="fs-6 lead ">
              {
                <Link
                  className="link-primary"
                  to="/admin/finance-pruchasemanagement-discardpayment"
                >
                  Click Here
                </Link>
              }
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="form-group">
            <label>Vendor Name</label>
            <input
              value={vendorName}
              type="text"
              placeholder="Name"
              className="form-control"
              onChange={(e) => {
                setVendorName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>From Date</label>
            <input
              value={fromDate}
              type="date"
              className="form-control"
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>To Date</label>
            <input
              value={toDate}
              type="date"
              className="form-control"
              onChange={(e) => {
                setToDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-md-1 mt-4 me-2">
          <Button variant="contained" onClick={handleDateFilter}>
            <i className="fas fa-search"></i> Search
          </Button>
        </div>
        <div className="col-md-1 mt-4">
          <Button variant="contained" onClick={handleClearDateFilter}>
            Clear
          </Button>
        </div>
      </div>
      <DataGrid
        rows={filterData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
        disableColumnMenu
        disableColumnSelector
        disableColumnFilter
        disableColumnReorder
        disableColumnResize
        disableMultipleColumnsSorting
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            value: search,
            onChange: (event) => setSearch(event.target.value),
            placeholder: "Search",
            clearSearch: true,
            clearSearchAriaLabel: "clear",
          },
        }}
        getRowId={(row) => filterData.indexOf(row)}
      />
      {openImageDialog && (
        <ImageView
          viewImgSrc={viewImgSrc}
          setViewImgDialog={setOpenImageDialog}
        />
      )}
    </div>
  );
}
