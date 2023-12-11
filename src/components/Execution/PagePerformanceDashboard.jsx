import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import FormContainer from "../AdminPanel/FormContainer";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, TextField } from "@mui/material";
import PerformanceGraphDialog from "./PerformanceGraphDialog";

const FilterDataOptions = [
  "Highest",
  "Lowest",
  "Avg",
  "Avg Male Percnet",
  "Avg Female Percent",
  "Top 5 Age Group",
];

export default function PagePerformanceDashboard() {
  const [pageHistory, setPageHistory] = React.useState([]);
  const [filterDataVal, setFilterDataVal] = useState("Highest");
  const [openPerformanceGraphDialog, setOpenPerformanceGraphDialog] = useState(false);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    axios
      .get("http://34.93.135.33:8080/api/page_health_dashboard")
      .then((res) => {
        console.log(res.data.data);
        setPageHistory(res.data.data);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      width: 40,
      renderCell: (params) => {
        const rowIndex = pageHistory.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    { field: "page_name", headerName: "Page Name", width: 200 },
  ];

  if (filterDataVal === "Highest") {
    columns.push(
      { field: "maxReach", headerName: "Highest Reach", width: 200 },
      { field: "maxImpression", headerName: "Hightest Impression", width: 200 },
      { field: "maxEngagement", headerName: "Hightest Engagement", width: 200 },
      { field: "maxStoryView", headerName: "Hightest Story view", width: 200 },
      {
        field: "maxStoryViewDate",
        headerName: "Hightest Story view Date",
        width: 200,
        renderCell: (params) => {
          return (
            <div>
              {params.row?.maxStoryViewDate ? (
                <>
                  {new Date(params.row.maxStoryViewDate)
                    .toISOString()
                    .substr(8, 2)}
                  /
                  {new Date(params.row.maxStoryViewDate)
                    .toISOString()
                    .substr(5, 2)}
                  /
                  {new Date(params.row.maxStoryViewDate)
                    .toISOString()
                    .substr(2, 2)}
                </>
              ) : (
                ""
              )}
            </div>
          );
        },
      }
    );
  } else if (filterDataVal === "Avg") {
    columns.push(
      { field: "avgReach", headerName: "Avg Reach", width: 200 },
      { field: "avgImpression", headerName: "Avg Impression", width: 200 },
      { field: "avgEngagement", headerName: "Avg Engagement", width: 200 },
      {
        field: "avgStoryView",
        headerName: "Avg Story view",
        width: 200,
        renderCell: (params) => {
          const storyView = params.row.avgStoryView;
          if (storyView % 1 !== 0) {
            return (
              <>
                <span>{storyView.toFixed(2)}</span>
              </>
            );
          }
          // return <>
          //  <span>{storyView.toFixed(2)}</span>
          //  </>;
        },
      },
      {
        field: "avgStoryViewDate",
        headerName: "Avg Story view Date",
        width: 200,
        renderCell: (params) => {
          return (
            <div>
              {params.row?.avgStoryViewDate ? (
                <>
                  {new Date(params.row.avgStoryViewDate)
                    .toISOString()
                    .substr(8, 2)}
                  /
                  {new Date(params.row.avgStoryViewDate)
                    .toISOString()
                    .substr(5, 2)}
                  /
                  {new Date(params.row.avgStoryViewDate)
                    .toISOString()
                    .substr(2, 2)}
                </>
              ) : (
                ""
              )}
            </div>
          );
        },
      }
    );
  } else if (filterDataVal === "Lowest") {
    columns.push(
      { field: "minReach", headerName: "Lowest Reach", width: 200 },
      { field: "minImpression", headerName: "Lowest Impression", width: 200 },
      { field: "minEngagement", headerName: "Lowest Engagement", width: 200 },
      { field: "minStoryView", headerName: "Lowest Story view", width: 200 },
      {
        field: "minStoryViewDate",
        headerName: "Lowest Story view Date",
        width: 200,
        renderCell: (params) => {
          return (
            <div>
              {params.row?.minStoryViewDate ? (
                <>
                  {new Date(params.row.minStoryViewDate)
                    .toISOString()
                    .substr(8, 2)}
                  /
                  {new Date(params.row.minStoryViewDate)
                    .toISOString()
                    .substr(5, 2)}
                  /
                  {new Date(params.row.minStoryViewDate)
                    .toISOString()
                    .substr(2, 2)}
                </>
              ) : (
                ""
              )}
            </div>
          );
        },
      }
    );
  } else if (filterDataVal === "Top 5 Age Group") {
    columns.push({
      field: "top5AgeGroupPercentage",
      headerName: "Top 5 Age Group",
      width: 400,
      renderCell: (params) => {
        const ageGroup = params.row.top5AgeGroupPercentage;
        return (
          <>
            <span>
              <span className="text-danger">{ageGroup[0].ageGroup}</span>={" "}
              <span className="text-success">
                {ageGroup[0].percentage % 1 == 0
                  ? ageGroup[0].percentage
                  : ageGroup[0].percentage.toFixed(2)}
              </span>
              &nbsp;
            </span>
            <span>
              {ageGroup[1].ageGroup}={" "}
              {ageGroup[1].percentage % 1 == 0
                ? ageGroup[1].percentage
                : ageGroup[1].percentage.toFixed(2)}
              &nbsp;{" "}
            </span>
            <span>
              {ageGroup[2].ageGroup}={" "}
              {ageGroup[2].percentage % 1 == 0
                ? ageGroup[2].percentage
                : ageGroup[2].percentage.toFixed(2)}
              &nbsp;{" "}
            </span>
            <span>
              {ageGroup[3].ageGroup}={" "}
              {ageGroup[3].percentage % 1 == 0
                ? ageGroup[3].percentage
                : ageGroup[3].percentage.toFixed(2)}
              &nbsp;{" "}
            </span>
            <span>
              {ageGroup[4].ageGroup}={" "}
              {ageGroup[4].percentage % 1 == 0
                ? ageGroup[4].percentage
                : ageGroup[4].percentage.toFixed(2)}
              &nbsp;{" "}
            </span>
          </>
        );
      },
    });
  } else if (filterDataVal === "Avg Male Percnet") {
    columns.push({
      field: "avgMalePercent",
      headerName: "Avg Male Per",
      width: 200,
    });
  } else if (filterDataVal === "Avg Female Percent") {
    columns.push({
      field: "avgFemalePercent",
      headerName: "Avg Female Per",
      width: 200,
    });
  }

  const handleRowClick = (params) => {
    console.log("Row clicked!", params.row);
    setOpenPerformanceGraphDialog(true);
    
  };

  return (
    <>
      <FormContainer mainTitle="Page Performance Dashboard" link="/ip-master" />
      <div>
        <Autocomplete
          disablePortal
          value={filterDataVal}
          defaultChecked="Higest"
          defaultValue={FilterDataOptions[0]}
          id="combo-box-demo"
          options={FilterDataOptions}
          onChange={(event, newValue) => {
            if (newValue === null) {
              return setFilterDataVal("Higest");
            }
            setFilterDataVal(newValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Filter Data" />
          )}
        />
      </div>
      <DataGrid
        rows={pageHistory}
        columns={columns}
        onRowClick={handleRowClick}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />
     {openPerformanceGraphDialog && <PerformanceGraphDialog setOpenPerformanceGraphDialog={setOpenPerformanceGraphDialog} />}
    </>
  );
}
