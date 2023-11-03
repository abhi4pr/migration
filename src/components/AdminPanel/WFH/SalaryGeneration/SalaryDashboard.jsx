import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./SalaryDashboard.css";
import * as XLSX from "xlsx";

const SalaryDashboard = () => {
  const [department, setDepartment] = useState(0);
  const [departmentdata, getDepartmentData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [resData, setResData] = useState([]);
  const [totalSalaryDepartmentWise, setTotalSalary] = useState([]);
  const [totalsalarycount, setTotalCountOfSalary] = useState([]);
  const [allwfhusers, setAllWFHUsers] = useState([]);
  const [activeusers, setActiveUsers] = useState("");

  const months = [
    " January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    axios.get("http://44.211.225.140:8000/deptwithwfh").then((res) => {
      getDepartmentData(res.data);
    });

    axios
      .post("http://44.211.225.140:8000/salarycount", {
        dept: department,
      })
      .then((res) => {
        setTotalSalary(res.data.data);
      });
  }, [department]);

  useEffect(() => {
    axios.get("http://44.211.225.140:8000/allwfhusers").then((res) => {
      const data = res.data.data;
      const filteredUser = data.filter(
        (d) => d.dept_id === department && d.user_status
      );
      setAllWFHUsers(data);
      setActiveUsers(filteredUser);
    });
  }, [department]);

  useEffect(() => {
    axios.get(" http://44.211.225.140:8000/totalsalary").then((res) => {
      setTotalCountOfSalary(res.data.data);
    });
  }, []);
  // ----------------------------------------------------------------------
  const getAttendanceData = () => {
    axios
      .post("http://44.211.225.140:8000/salaryfromattendencebyfilter", {
        dept: department == "" ? 0 : department,
      })
      .then((res) => {
        const data = res.data.data;
        let demo = months.map((month) => data.filter((d) => d.month === month));
        setFilterData(demo);
        setResData(data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  useEffect(() => {
    getAttendanceData();
  }, [department]);

  const handleExport = (month) => {
    const filteredData = resData.filter((row) => row.month === month);
    const formattedData = filteredData.map((row) => ({
      "Employee Name": row.user_name,
      "Department Name": row.dept_name,
      "Absent Days": row.noOfabsent,
      "Present Days": 26 - Number(row.noOfabsent),
      "Total Salary": `${row.total_salary} ₹`,
      TDS: `${row.tds_deduction} ₹`,
      "Net Salary": `${row.net_salary} ₹`,
    }));

    const fileName = "data.xlsx";
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div>
      <div>
        <div className="form-heading">
          <div className="form_heading_title">
            <h2>Dashboard</h2>
          </div>
        </div>
        <div className="row ">
          <div className="form-group col-3">
            <label className="form-label">
              Department Name <sup style={{ color: "red" }}>*</sup>
            </label>
            <Select
              className=""
              options={departmentdata.map((option) => ({
                value: option.dept_id,
                label: `${option.dept_name}`,
              }))}
              value={{
                value: department,
                label:
                  departmentdata.find((user) => user.dept_id === department)
                    ?.dept_name || "",
              }}
              onChange={(e) => {
                setDepartment(e.value);
              }}
              required
            />
            <span style={{ color: "green" }}>
              Active : {activeusers.length}
            </span>
          </div>
          <div className="form-group col-3">
            <label className="form-label">Total Salary Department Wise </label>
            <div>
              {totalSalaryDepartmentWise.map((d) => (
                <>
                  <h4>{d.count} ₹</h4>
                </>
              ))}
            </div>
          </div>
          <div className="form-group col-3 ">
            <label className="form-label">Total Salary All Deparmtent </label>
            <div>
              {totalsalarycount.map((d) => (
                <>
                  <h4>{d.count} ₹</h4>
                </>
              ))}
            </div>
          </div>
          <div className="form-group col-3 ">
            <label className="form-label">WFH Total Users</label>
            <div>
              <>
                <h4>{allwfhusers.length}</h4>
              </>
            </div>
          </div>
        </div>

        <div className="cards-list">
          {filterData.map((d, i) => (
            <>
              {d.length != 0 && (
                <div className="card-last-data 1">
                  <div className="button-align">
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleExport(d[0]?.month)}
                      >
                        ExcelSheet
                      </button>
                    </div>
                    <div>
                      {/* <button className="btn btn-success">PDF</button> */}
                    </div>
                  </div>
                  <div className="salary-deparmtnet">
                    {/* <div>Department wise Salary : 100000 ₹</div> */}
                  </div>
                  <div className="card_main">
                    <div>
                      <div className="date-adjest">
                        <h6>
                          Date: {d[0]?.month} {d[0]?.year}
                        </h6>
                        <h6>Department : {d[0]?.dept_name}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryDashboard;
