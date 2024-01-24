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
import "./myinvestors.css";

import CommonTable from "../customComponet/CommonTable";
import { ColorButton } from "../customComponet/CustomElement";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { BootstrapInput } from "../customComponet/CustomElement";
import { Url } from "../../global";
import axios from "axios";
import CommonFilter from "../customComponet/CommonFilter";

const MyInvestors = () => {
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
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  const [searchBy, setSearchBy] = useState([
    {
      label: "Name",
      value: false,
      name: "investor_name",
    },
    {
      label: "Portfolio Name",
      value: false,
      name: "portfolio_name",
    },
    {
      label: "Portfolio Id",
      value: false,
      name: "portfolio_id",
    },
    {
      label: "Email",
      value: false,
      name: "user_email",
    },
    {
      label: "Phone",
      value: false,
      name: "user_phone",
    },
    {
      label: "Total Deposit",
      value: false,
      name: "total_deposit",
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
      name: "Manager MT5 ID",
      selector: (row) => {
        return <span title={row.mt5_acc_no}>{row.mt5_acc_no}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Name",
      selector: (row) => {
        return <span title={row.investor_name}>{row.investor_name}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "MT5 Name",
      selector: (row) => {
        return <span title={row.mt5_name}>{row.mt5_name}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Portfolio Name",
      selector: (row) => {
        return <span title={row.portfolio_name}>{row.portfolio_name}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },

    {
      name: "Portfolio Id",
      selector: (row) => {
        return <span title={row.portfolio_id}>{row.portfolio_id}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Email",
      selector: (row) => {
        return <span title={row.user_email}>{row.user_email}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.7,
    },
    {
      name: "Phone",
      selector: (row) => {
        return <span title={row.user_phone}>{row.user_phone}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.7,
    },
    {
      name: "Total Deposit",
      selector: (row) => {
        return <span title={row.total_deposit}>${row.total_deposit}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "Date",
      selector: (row) => {
        return <span title={row.added_datetime}>{row.added_datetime}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.7,
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
                <p className="main-heading">My Investors</p>
                <CommonFilter
                  search={searchBy}
                  searchWord={setSearchKeyword}
                  setParam={setParam}
                  mt5_acc_no={resData.my_mt5_account}
                />
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CommonTable
                    url={`${Url}/datatable/my_investors_list.php`}
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

export default MyInvestors;
