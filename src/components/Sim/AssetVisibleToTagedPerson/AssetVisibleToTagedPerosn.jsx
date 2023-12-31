import { useEffect, useState } from "react";
import FormContainer from "../../AdminPanel/FormContainer";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useAPIGlobalContext } from "../../AdminPanel/APIContext/APIContext";

const AssetVisibleToTagedPerosn = () => {
  const { userID } = useAPIGlobalContext();
  console.log(userID);
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = data.filter((d) => {
      return d.asset_name.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://34.93.135.33:8080/api/show_asset_user_data/${userID}`
      );
      setFilterData(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => <>{index + 1}</>,
      width: "6%",
      sortable: true,
    },
    {
      name: "Request By",
      selector: (row) => row.asset_name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Request Date",
      selector: (row) => row.asset_name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Asset Name",
      selector: (row) => row.asset_name,
      sortable: true,
      width: "14%",
    },
    {
      name: "Category",
      selector: (row) => row.category_name,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (row) => row.sub_category_name,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => row.asset_brand_name,
      sortable: true,
    },
    {
      name: "Modal",
      selector: (row) => row.asset_modal_name,
      sortable: true,
    },
  ];

  return (
    <>
      <div className="action_heading">
        <div className="action_title">
          <FormContainer
            mainTitle="Repair Request To Taged"
            link="/vendorMaster"
            submitButton={false}
          />
        </div>
      </div>
      <div className="page_height">
        <div className="card mb-4">
          <div className="data_tbl table-responsive">
            <DataTable
              title="Taged Person Overview"
              columns={columns}
              data={filterData}
              fixedHeader
              //   pagination
              fixedHeaderScrollHeight="64vh"
              exportToCSV
              highlightOnHover
              subHeader
              subHeaderComponent={
                <>
                  <input
                    type="text"
                    placeholder="Search here"
                    className="w-50 form-control "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetVisibleToTagedPerosn;
