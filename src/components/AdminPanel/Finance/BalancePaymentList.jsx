import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import DataTable from "react-data-table-component";
import Modal from "react-modal";

const BalancePaymentList = () => {
  
  const { toastAlert } = useGlobalContext();
  const [displaySeq, setDisplaySeq] = useState("");
  const [heading, setHeading] = useState("");
  const [headingDesc, setHeadingDesc] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [datas, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [contextData, setDatas] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [ImageModalOpen, setImageModalOpen] = useState(false);
  const [balAmount, setBalAmount] = useState("");
  const [paymentRefNo, setPaymentRefNo] = useState("");
  const [paymentRefImg, setPaymentRefImg] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img1",image1 );
    formData.append("img2", image2);
    formData.append("img3", image3);
    formData.append("img4", image4);
    formData.append("sim_id", sim_id);
    formData.append("uploaded_by",userID );
    formData.append("type", type);
    
    await axios.post("http://34.93.135.33:8080/api/add_assets_images", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
        });
      setImageModalOpen(false)
  };

  function getData() {
    axios.post("http://34.93.135.33:8080/api/add_php_payment_bal_data_in_node").then((res)=>{
      console.log('data save in local success')
    })
    axios.get("http://34.93.135.33:8080/api/get_all_php_payment_bal_data").then((res) => {
      setData(res.data.data);
      setFilterData(res.data.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleImageClick = (row) => {
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };

  useEffect(() => {
    const result = datas.filter((d) => {
      return (
        d.cust_name?.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);

  const columns = [
    {
      name: "Id",
      cell: (row, index) => <div>{index + 1}</div>,
      width: "9%",
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.cust_name,
      sortable: true,
    },
    {
      name: "Sales Executive Name",
      selector: (row) => "	Bhushan",

    },
    {
      name: "Sale Booking Date",
      selector: (row) => row.sale_booking_date,

    },
    {
      name: "Campaign Amount",
      selector: (row) => row.campaign_amount,
    },
    {
      name: "Paid Amount",
      selector: (row) => row.total_paid_amount,
    },
    {
      name: "Balance Amount",
      selector: (row) => "800",
    },
    
    {
      name: "Status",
      cell: (row) => (
        <button
          className="btn btn-sm btn-outline-info"
          onClick={() => handleImageClick(row)}
        >
          Balance Update
        </button>
      ),
    },
    
  ];

  return (
    <>
      <FormContainer
        mainTitle="Sale Booking - All Balance Payment List Pending"
        link="/admin/balance-payment-list"
        buttonAccess={
          contextData &&
          contextData[2] &&
          contextData[2].insert_value === 1 &&
          false
        }
      />

      <div className="card">
        <div className="data_tbl table-responsive">
          <DataTable
            title="Balance payment list"
            columns={columns}
            data={filterData}
            fixedHeader
            pagination
            fixedHeaderScrollHeight="64vh"
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search here"
                className="w-50 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </div>
      <Modal
        isOpen={ImageModalOpen}
        onRequestClose={handleCloseImageModal}
        style={{
          content: {
            width: "80%",
            height: "80%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h2>Assets Images</h2>

            <button
              className="btn btn-success float-left"
              onClick={handleCloseImageModal}
            >
              X
            </button>
          </div>               
        </div> 
      <div className="row">
        <div className="col-md-12 ">
          <form onSubmit={handleSubmit}>
            
          <div className="form-group col-12">
        <label className="form-label">
          Type <sup style={{ color: "red" }}>*</sup>
        </label>
       
      </div>

            {/* images */}
            <div className="form-group">
              <label htmlFor="images">Image First</label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                // onChange={(e) => {
                //     setImage1(e.target.files[0]);
                //   }}
                accept="image/*"
                required
              />
            </div>

            {/* images */}
            <div className="form-group">
              <label htmlFor="images">Image Secound</label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                // onChange={(e) => {
                //     setImage2(e.target.files[0]);
                //   }}
                accept="image/*"
             
              />
            </div>

            {/* images */}
            <div className="form-group">
              <label htmlFor="images">Image Third</label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                // onChange={(e) => {
                //     setImage3(e.target.files[0]);
                //   }}
                accept="image/*"
               
              />
            </div>

            {/* images */}
            <div className="form-group">
              <label htmlFor="images">Image Four</label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                // onChange={(e) => {
                //     setImage4(e.target.files[0]);
                //   }}
                accept="image/*"
                
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      </Modal>
    </>
  );
};

export default BalancePaymentList;