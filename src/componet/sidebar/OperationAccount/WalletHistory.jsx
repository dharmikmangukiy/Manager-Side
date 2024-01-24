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
import { Url } from "../../../global";
import CommonTable from "../../customComponet/CommonTable";
import CommonFilter from "../../customComponet/CommonFilter";



const WalletHistory = () => {
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
    mt5_acc_no: "",
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  const [searchBy, setSearchBy] = useState([
    {
      label: "Type",
      value: false,
      name: "type",
    },
    {
      label: "Payment Method",
      value: false,
      name: "payment_method",
    },
    {
      label: "Description",
      value: false,
      name: "description",
    },
    {
      label: "Remarks",
      value: false,
      name: "remarks",
    },
    {
      label: "Amount",
      value: false,
      name: "Amount",
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
      name: "Date",
      selector: (row) => {
        return <span title={row.date}>{row.date}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "Type",
      selector: (row) => {
        return <span title={row.type}>{row.type}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Payment Method",
      selector: (row) => {
        return <span title={row.payment_method}>{row.payment_method}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.2,
    },
    {
      name: "Description",
      selector: (row) => {
        return <span title={row.description}>{row.description}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Remarks",
      selector: (row) => {
        return <span title={row.remarks}>{row.remarks}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Amount",
      selector: (row) => {
        return <span title={row.amount}>{row.amount}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
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
                <p className="main-heading">Wallet History</p>
                <CommonFilter
                  search={searchBy}
                  searchWord={setSearchKeyword}
                  setParam={setParam}
                />
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CommonTable
                    url={`${Url}/datatable/mm_wallet_history.php`}
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

export default WalletHistory;
