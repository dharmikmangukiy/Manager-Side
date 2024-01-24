import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Select,
  KeyboardDatePicker,
} from "@mui/material";


import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CommonFilter from "../../customComponet/CommonFilter";
import CommonTable from "../../customComponet/CommonTable";
import { Url } from "../../../global";


const WithdrawHistory = () => {
  const [open, setOpen] = React.useState(false);
  const [resData, setResData] = useState({
    my_mt5_account: [],
  });
  const [refresh, setRefresh] = React.useState(false);
  const navigate = useNavigate();
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const depositFilter = () => {
    console.log("dsa");
  };
  const [param, setParam] = useState({
    start_date: "",
    end_date: "",
    status: "",
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  const [searchBy, setSearchBy] = useState([
    {
      label: "Name",
      value: false,
      name: "name",
    },
    {
      label: "Email",
      value: false,
      name: "email",
    },
    {
      label: "Phone",
      value: false,
      name: "phone",
    },
    {
      label: "Date",
      value: false,
      name: "date",
    },
    {
      label: "Payment Method",
      value: false,
      name: "method",
    },
    {
      label: "UPI/Crypto type",
      value: false,
      name: "upi_name",
    },
    {
      label: "Payment Id",
      value: false,
      name: "upi_crypto_ac_number",
    },
    {
      label: "Bank Account Holder Name",
      value: false,
      name: "withdrawal_bank_account_holder_name",
    },
    {
      label: "Bank Name",
      value: false,
      name: "withdrawal_bank_name",
    },
    {
      label: "Ifsc/iban",
      value: false,
      name: "withdrawal_bank_ifsc_code",
    },
    {
      label: "Remarks",
      value: false,
      name: "remarks",
    },
    {
      label: "Amount",
      value: false,
      name: "amount",
    },
  ]);
  const column = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span title={row.sr_no}>{row.sr_no}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Name",
      selector: (row) => {
        return <span title={row.name}>{row.name}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "Email",
      selector: (row) => {
        return <span title={row.email}>{row.email}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Phone",
      selector: (row) => {
        return <span title={row.phone}>{row.phone}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 1,
    },

    {
      name: "DATE",
      selector: (row) => {
        return <span title={row.date}>{row.date}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "PAYMENT METHOD",
      selector: (row) => {
        return <span title={row.method}>{row.method}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.2,
    },
    {
      name: "UPI/CRYPTO TYPE",
      selector: (row) => {
        return <span title={row.upi_name}>{row.upi_name}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "PAYMENT ID",
      selector: (row) => {
        return (
          <span title={row.upi_crypto_ac_number}>
            {row.upi_crypto_ac_number}
          </span>
        );
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },

    {
      name: "Bank Account Holder Name",
      selector: (row) => {
        return (
          <span title={row.withdrawal_bank_account_holder_name}>
            {row.withdrawal_bank_account_holder_name}
          </span>
        );
      },
      wrap: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Bank Name",
      selector: (row) => {
        return (
          <span title={row.withdrawal_bank_name}>
            {row.withdrawal_bank_name}
          </span>
        );
      },
      wrap: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Ifsc/iban",
      selector: (row) => {
        return (
          <span title={row.withdrawal_bank_ifsc_code}>
            {row.withdrawal_bank_ifsc_code}
          </span>
        );
      },
      wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "withdrawal account number",
      selector: (row) => {
        return (
          <span title={row.withdrawal_bank_ifsc_code}>
            {row.withdrawal_bank_ifsc_code}
          </span>
        );
      },
      wrap: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Refrence no",
      selector: (row) => {
        return <span title={row.sr_no}>{row.sr_no}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "REMARKS",
      selector: (row) => {
        return <span title={row.remarks}>{row.remarks}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "AMOUNT",
      selector: (row) => {
        return <span title={row.amount}>{row.amount}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "STATUS",
      selector: (row) => {
        return (
          <span
            title={row.status}
            className={`text-color-${
              row.status == "1" ? "green" : row.status == "2" ? "red" : "yellow"
            }`}
          >
            {row.status == "1"
              ? "APPROVED"
              : row.status == "2"
              ? "REJECTED"
              : "PENDING"}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.1,
    },
  ];
  console.log("resData", resData.my_mt5_account);
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              {/* <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid> */}
              <Grid item md={12} lg={12} xl={10}>
                <p className="main-heading">Withdraw History</p>
                <CommonFilter
                  search={searchBy}
                  searchWord={setSearchKeyword}
                  setParam={setParam}
                  status={true}
                />
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CommonTable
                    url={`${Url}/datatable/mm_withdraw_list.php`}
                    column={column}
                    sort="2"
                    param={param}
                    search={searchBy}
                    searchWord={searchKeyword}
                    setResData={setResData}
                    refresh={refresh}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawHistory;
