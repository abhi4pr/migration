import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import FormContainer from "../AdminPanel/FormContainer";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, TextField } from "@mui/material";
import PerformanceGraphDialog from "./PerformanceGraphDialog";
import {baseUrl} from '../../utils/config'

const FilterDataOptions = [
  "Highest",
  "Lowest",
  "Avg",
  "Avg Male Percent",
  "Avg Female Percent",
  "Top 5 Age Group",
];

const intervalFlagOptions = [
  { label: "Current Month", value: 1 },
  { label: "Last Three months", value: 3 },
  { label: "Last six months", value: 6 },
  { label: "Last one year", value: 10 },
  { label: "All Data", value: 2 },
];
export default function PagePerformanceDashboard() {
  const [pageHistory, setPageHistory] = React.useState([]);
  const [filterDataVal, setFilterDataVal] = useState("Highest");
  const [openPerformanceGraphDialog, setOpenPerformanceGraphDialog] =
    useState(false);
  const [rowData, setRowData] = useState([]);
  const [intervalFlag, setIntervalFlag] = useState({
    label: "Current Month",
    value: "1",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    callApi();
  }, [intervalFlag]);

  const callApi = () => {
    axios
      .post(baseUrl+"page_health_dashboard", {
        intervalFlag: intervalFlag.value,
      })
      .then((res) => {
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
  } else if (filterDataVal === "Avg Male Percent") {
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
    setOpenPerformanceGraphDialog(true);
    setRowData(params.row);
    console.log(params.row)
  };

  return (
    <>
      <FormContainer mainTitle="Page Performance Dashboard" link="/ip-master" />
      <div className="d-flex">
        <Autocomplete
          disablePortal
          va
          lue={intervalFlag.label}
          defaultValue={intervalFlagOptions[0].label}
          id="combo-box-demo"
          options={intervalFlagOptions.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          onChange={(event, newValue) => {
            if (newValue === null) {
              return setIntervalFlag({ label: "Current Month", value: 1 });
            }
            setIntervalFlag(newValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Filter Date" />
          )}
        />
        <Autocomplete
          className="ms-3"
          disablePortal
          value={filterDataVal}
          defaultChecked="Higest"
          defaultValue={FilterDataOptions[0]}
          id="combo-box-demo"
          options={FilterDataOptions}
          onChange={(event, newValue) => {
            if (newValue === null) {
              return setFilterDataVal("Highest");
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
      {openPerformanceGraphDialog && (
        <PerformanceGraphDialog
          setOpenPerformanceGraphDialog={setOpenPerformanceGraphDialog}
          rowData={rowData}
          intervalFlag={intervalFlag}
          setIntervalFlag={setIntervalFlag}
          intervalFlagOptions={intervalFlagOptions}
        />
      )}
    </>
  );
}
