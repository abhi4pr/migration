import React from "react";
import "./InvoiceTemplate1.css";

const InvoiceTemplate1 = ({ data }) => {
  return (
    <body>
      <div className="invoiceWrapper">
        <div className="invoiceBody">
          <div className="invoiceBodyInner">
            <div className="invoiceBodyUpper">
              <div className="invoiceHeading">
                <h1>Invoice</h1>
              </div>
              <div className="addressBox">
                <h3>Name : {data?.user_name}</h3>
                <h4>E-Mail : pallavi04tomar@gmail.com</h4>
                <h4>Contact No. : 9294571819</h4>
                <h4>Address : 509 Telephone Nagar, Indore (MP)</h4>
              </div>
              <div className="billBox">
                <div className="billBoxLeft">
                  <h3>Bill to</h3>
                  <h4>CREATIVEFUEL PRIVATE LIMITED</h4>
                  <h4>105, Gravity Mall, Vijay Nagar</h4>
                  <h4>Indore, Madhya Pradesh</h4>
                  <h4>452010 -India</h4>
                  <h4>GSTIN 23AAJCC1807B1ZC</h4>
                </div>
                <div className="billBoxRight">
                  <h3>
                    INVOICE # <span>{data?.invoiceNo}</span>
                  </h3>
                  <h3>
                    INVOICE DATE{" "}
                    <span>
                      {data?.Creation_date.split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </span>
                  </h3>
                </div>
              </div>
              <div className="invoiceTable">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="text_left">
                          Description
                        </th>
                        <th scope="col" className="text_right">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row" className="text_left">
                          Content Supply
                        </td>
                        <td scope="row" className="text_right">
                          3,500.00
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td scope="col" className="text_left">
                          Total
                        </td>
                        <td scope="col" className="text_right">
                          ₹ 3,500.00
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div className="invoiceBodyFooter">
              <div className="invoiceBodyFooter_left">
                <h3>Thank You</h3>
              </div>
              <div className="invoiceBodyFooter_right">
                <h3>Terms & Conditions</h3>
                <h4>Account Details</h4>
                <h4>Beneficiary Name : {data?.user_name}</h4>
                <h4>Bank Name: SBI</h4>
                <h4>Account Number :20152506599</h4>
                <h4>IFSC Code: SBIN0030012</h4>
                <h4>PAN Card number-BPPPT9590F</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default InvoiceTemplate1;
