import {
  Button,
  CardContent,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputBase,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";


import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./account_list.css";
import CommonTable from "../../customComponet/CommonTable";
import { BootstrapInput, ColorButton } from "../../customComponet/CustomElement";
import { IsApprove, Url } from "../../../global";
const BootstrapInput1 = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    font: "inherit",
    color: "currentColor",
    width: "100%",
    border: "0",
    height: "1.1876em",
    margin: "0",
    display: "block",
    padding: "6px 0 7px",
    minWidth: "0",
    background: "none",
    boxSizing: "content-box",
    animationName: "mui-auto-fill-cancel",
    letterSpacing: "inherit",
  },
}));
export const AccountList = () => {
  const navigate = useNavigate();
  const [Dopen, setDOpen] = React.useState(false);
  const [filterData, setFilterData] = useState({
    deposit_from: "",
    deposit_to: "",
  });
  const [closeFilterData, setCloseFilterData] = useState({
    deposit_from: "",
    deposit_to: "",
  });
  const [param, setParam] = useState({
    transfer_status: "",
  });
  const [closeParam, setCloseParam] = useState({
    mt5_acc_no: localStorage.getItem("mt5_acc_no"),
  });
  const [mT5AccountLoader, setMT5AccountLoader] = React.useState(true);
  const [accountDetails, setAccountDetails] = React.useState({});
  const [refresh, setRefresh] = useState(false);

  const [mt5AccountList, setMT5AccountList] = React.useState({
    data: [],
  });

  const TradeColumn = [
    {
      name: "LOGIN",
      selector: (row) => {
        return <span>{row.mt5}</span>;
      },
      reorder: true,
      grow: 0.1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return <span title={row.trade_datetime}>{row.trade_datetime}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "TRADE NO",
      selector: (row) => {
        return <span title={row.order}>{row.order}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "SYMBOL",
      selector: (row) => {
        return <span title={row.symbol}>{row.symbol}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "PRICE",
      selector: (row) => {
        return <span title={row.price}>{row.price}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "LOT",
      selector: (row) => {
        return <span title={row.volume}>{row.volume}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "EXPERT POSITION ID",
      selector: (row) => {
        return (
          <span title={row.expert_position_id}>{row.expert_position_id}</span>
        );
      },
      reorder: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "COMMENT",
      selector: (row) => {
        return <span title={row.comment}>{row.comment}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "ACTION",
      selector: (row) => {
        return (
          <span
            title={row.action}
            style={{ color: row.action == "Buy" ? "green" : "red" }}
          >
            {row.action}
          </span>
        );
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.1,
    },
  ];
  const [liveA, setLiveA] = useState({
    manager_name: "",
    password: "",
    confirm_password: "",
    minimum_deposit_amount: "",
    fees_percentage: "",
    isLoader: false,
    show_open_trade: 0,
  });
  toast.configure();
  const input1 = (event) => {
    const { name, value } = event.target;
    setLiveA((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const column = [
    {
      name: "LOGIN",
      selector: (row) => {
        return <span>{row.trade_login}</span>;
      },
      reorder: true,
      grow: 0.1,
    },
    {
      name: "SYMBOL",
      selector: (row) => {
        return <span title={row.trade_symbol}>{row.trade_symbol}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "TRADE NO",
      selector: (row) => {
        return <span title={row.trade_no}>{row.trade_no}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return <span title={row.trade_time}>{row.trade_time}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "TYPE",
      selector: (row) => {
        return (
          <span
            title={row.trade_type}
            style={{ color: row.trade_type == "Buy" ? "green" : "red" }}
          >
            {row.trade_type}
          </span>
        );
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "TRADE VOLUME",
      selector: (row) => {
        return <span title={row.trade_volume}>{row.trade_volume}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "TRADE OPEN RATE",
      selector: (row) => {
        return <span title={row.trade_open_rate}>{row.trade_open_rate}</span>;
      },
      reorder: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "S/L",
      selector: (row) => {
        return <span title={row.trade_s_l}>{row.trade_s_l}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "T/P",
      selector: (row) => {
        return <span title={row.trade_t_p}>{row.trade_t_p}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "CURRENT PRICE",
      selector: (row) => {
        return <span title={row.trade_curr_rate}>{row.trade_curr_rate}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "PROFIT",
      selector: (row) => {
        return <span title={row.trade_profit}>{row.trade_profit}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
  ];
  const inColumn = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span>{row.sr_no}</span>;
      },
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Investor Name",
      selector: (row) => {
        return <span title={row.investor_name}>{row.investor_name}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "Portfolio Id",
      selector: (row) => {
        return <span title={row.portfolio_id}>{row.portfolio_id}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.6,
    },
    {
      name: "Portfolio Name",
      selector: (row) => {
        return <span title={row.portfolio_name}>{row.portfolio_name}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },

    {
      name: "AMOUNT",
      selector: (row) => {
        return <span title={row.amount}>{row.amount}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "Date",
      selector: (row) => {
        return <span title={row.date}>{row.date}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "description",
      selector: (row) => {
        return <span title={row.description}>{row.description}</span>;
      },
      reorder: true,
      wrap: true,
      grow: 1,
    },
  ];

  const [mt5Account, setMT5Account] = React.useState("");
  React.useEffect(() => {
    fetchMT5AccountList();
  }, [refresh]);
  const onSubmit = () => {
    if (liveA.manager_name == "") {
      toast.error("Manager Name is requied");
    } else if (liveA.minimum_deposit_amount == "") {
      toast.error("Minimum Deposit Amount is requied");
    } else if (liveA.fees_percentage == "") {
      toast.error("Fees Percentage is requied");
    } else if (liveA.password == "") {
      toast.error("Password is requied");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        liveA.password
      )
    ) {
      toast.error(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (liveA.confirm_password == "") {
      toast.error("Confirm Password  is requied");
    } else if (!liveA.password == liveA.confirm_password) {
      toast.error("password is not match");
    } else {
      const param = new FormData();
      liveA.isLoader = true;
      setLiveA({ ...liveA });
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("manager_name", liveA.manager_name);
      param.append("password", liveA.password);
      param.append("confirm_password", liveA.confirm_password);
      param.append("minimum_deposit_amount", liveA.minimum_deposit_amount);
      param.append("fees_percentage", liveA.fees_percentage);
      param.append("show_open_trade", liveA.show_open_trade);

      axios
        .post(Url + "/ajaxfiles/create_manager_mt5_account.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            liveA.isLoader = false;
            setLiveA({ ...liveA });
            toast.error(res.data.message);
          } else {
            liveA.isLoader = false;
            setLiveA({ ...liveA });
            toast.success(res.data.message);
            setRefresh(!refresh);
            fetchMT5AccountList();

            handleClose();
          }
        });
    }
  };
  const handleClose = () => {
    setLiveA({
      manager_name: "",
      password: "",
      confirm_password: "",
      minimum_deposit_amount: "",
      fees_percentage: "",
      isLoader: false,
    });
    setDOpen(false);
  };

  const fetchMT5AccountList = async () => {
    const param = new FormData();
    param.append("action", "get_account_list");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios
      .post(`${Url}/ajaxfiles/account_manage.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          // toast.error(res.data.message);
        } else {
          // mt5AccountList.data = [];
          setMT5AccountLoader(false);

          // setMT5AccountList({ ...mt5AccountList });
          if (res.data.data.length > 0) {
            // if(res.data.mt5_accounts.length>0){
            mt5AccountList.data = res.data.data;

            setMT5AccountList({ ...mt5AccountList });
            console.log("mt5Account", mt5AccountList.data[0].mt5_acc_no);
            setMT5Account(mt5AccountList.data[0].mt5_acc_no);
            console.log("mt5Account", mt5Account);
            fetchMT5AccountDetaiils(mt5AccountList.data[0].mt5_acc_no);
          } else {
            setMT5AccountLoader(false);
          }
        }
      });
  };

  const fetchMT5AccountDetaiils = async (mt5_acc_no = "") => {
    console.log("mt5Account", mt5Account);
    setMT5AccountLoader(true);
    const param = new FormData();
    param.append("action", "view_account_details");
    param.append("mt5_acc_no", mt5_acc_no);

    /* if (mt5Account == "") {
    } else {
      param.append("mt5_acc_no", mt5Account);
    } */
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios
      .post(`${Url}/ajaxfiles/account_manage.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "ok") {
          setMT5AccountLoader(false);
          console.log("saddsv", mT5AccountLoader);
          setAccountDetails({ ...res.data.data });
        } else {
        }
      });
  };
  console.log("mt5AccountList.length", mt5AccountList.length);

  return (
    <div>
      {" "}
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              {/* <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid> */}
              <Grid item xl={10} md={12} lg={12}>
                <Grid container>
                  <Grid item md={12}>
                    <Grid container>
                      <Grid item md={12} lg={8}>
                        <Paper
                          elevation={2}
                          style={{ borderRadius: "10px" }}
                          className="w-100 mb-5"
                        >
                          <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                            <div>
                              <h5 className="font-weight-bold mb-0 text-dark">
                                Manager Live Account
                              </h5>
                            </div>
                          </div>
                          <div className="divider"></div>
                          {mT5AccountLoader ? (
                            <div className="card-body position-relative pt-0 get-mt5-account-details">
                              <svg class="spinner" viewBox="0 0 50 50">
                                <circle
                                  class="path"
                                  cx="25"
                                  cy="25"
                                  r="20"
                                  fill="none"
                                  stroke-width="5"
                                ></circle>
                              </svg>
                            </div>
                          ) : (
                            <div className="card-body position-relative pt-0">
                              {mt5AccountList.data.length == 0 ? (
                                <div className="loader">
                                  <ColorButton
                                    variant="contained"
                                    size="large"
                                    onClick={() => {
                                      setDOpen(true);
                                    }}
                                  >
                                    Open Manager Live Account
                                  </ColorButton>
                                </div>
                              ) : (
                                ""
                              )}

                              <Grid container spacing={3}>
                                <Grid item md={3}>
                                  <FormControl className=" py-3">
                                    {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                    <label
                                      htmlFor="accountNo"
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      ACCOUNT NO
                                    </label>
                                    <Select
                                      value={mt5Account}
                                      onChange={(e) => {
                                        fetchMT5AccountDetaiils(e.target.value);
                                        setMT5Account(e.target.value);
                                      }}
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                      input={<BootstrapInput1 />}
                                    >
                                      {mt5AccountList.data.map((item) => {
                                        return (
                                          <MenuItem value={item.mt5_acc_no}>
                                            {item.mt5_acc_no}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item md={3}>
                                  <FormControl className=" py-3">
                                    {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                    <label
                                      htmlFor="accountNo"
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      Manager Name
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100 text-uppercase"
                                    >
                                      {accountDetails.mt5_name}
                                    </label>
                                  </FormControl>
                                </Grid>

                                <Grid item md={3}>
                                  <FormControl className=" py-3">
                                    {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                    <label
                                      htmlFor="accountNo"
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      BALANCE
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100 text-uppercase"
                                    >
                                      {accountDetails.mt_balance}
                                    </label>
                                  </FormControl>
                                </Grid>
                                <Grid item md={3}>
                                  <FormControl className=" py-3">
                                    <label
                                      htmlFor="accountNo"
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      LEVERAGE
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100 text-uppercase"
                                    >
                                      {accountDetails.leverage}
                                    </label>
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <hr />

                              <Grid container spacing={6}>
                                <Grid
                                  item
                                  md={2}
                                  className="align-items-center"
                                >
                                  <FormControl>
                                    <label
                                      htmlFor=""
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      CREDIT
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100"
                                    >
                                      {accountDetails.mt_credit}
                                    </label>
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  md={3}
                                  className="align-items-center"
                                >
                                  <FormControl>
                                    <label
                                      htmlFor=""
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      EQUITY
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100"
                                    >
                                      {accountDetails.mt_equity}
                                    </label>
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  md={2}
                                  className="align-items-center"
                                >
                                  <FormControl>
                                    <label
                                      htmlFor=""
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      Fees Percentage
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100"
                                    >
                                      {accountDetails.fees_percentage}
                                    </label>
                                  </FormControl>
                                </Grid>
                                {/* <Grid item md={3} className="align-items-center">
                                <FormControl>
                                  <label
                                    htmlFor=""
                                    className="text-info font-weight-bold form-label-head w-100"
                                  >
                                    MARGIN FREE
                                  </label>
                                  <label
                                    htmlFor=""
                                    className="text-dark font-weight-bold w-100"
                                  >
                                    0.00
                                  </label>
                                </FormControl>
                              </Grid> */}
                                <Grid
                                  item
                                  md={3}
                                  className="align-items-center"
                                >
                                  <FormControl>
                                    <label
                                      htmlFor=""
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      Minimum Deposit Amount
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100"
                                    >
                                      {accountDetails.minimum_deposit_amount}
                                    </label>
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  md={2}
                                  className="align-items-center"
                                >
                                  <FormControl>
                                    <label
                                      htmlFor=""
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      Total Portfolio
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100"
                                    >
                                      {accountDetails.total_portfolio}
                                    </label>
                                  </FormControl>
                                </Grid>
                              </Grid>

                              <hr />
                              <div className="d-flex justify-content-center flex-column flex-md-row">
                                <ColorButton
                                  className="mx-md-3 my-2 my-md-0"
                                  onClick={() => {
                                    navigate("/change_password");
                                  }}
                                >
                                  Change Password
                                </ColorButton>
                                <ColorButton
                                  onClick={() => {
                                    setDOpen(true);
                                  }}
                                >
                                  Open Additional Live Account
                                </ColorButton>
                              </div>
                            </div>
                          )}
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Dialog open={Dopen} onClose={handleClose}>
                    <div className="d-flex align-items-center p-3">
                      <h5 className="w-100 text-center text-primary m-0 font-weight-bold">
                        Manager Live Account
                      </h5>
                      <Button
                        sx={{
                          position: "absolute",
                          right: "0px",
                          color: "#2A3F73",
                        }}
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                    <DialogContent
                      className="customscroll"
                      sx={{ width: "400px" }}
                    >
                      <Grid container spacing={6}>
                        <Grid item md={12}>
                          <form>
                            <div className="mb-4">
                              <div className="font-weight-bold mb-2">
                                Manager Name
                              </div>
                              <FormControl className="w-100">
                                <BootstrapInput
                                  name="manager_name"
                                  value={liveA.manager_name}
                                  onChange={input1}
                                  displayEmpty
                                />
                              </FormControl>
                            </div>
                            <div className="mb-4">
                              <div className="font-weight-bold mb-2">
                                Minimum Deposit Amount
                              </div>
                              <FormControl className="w-100">
                                <BootstrapInput
                                  name="minimum_deposit_amount"
                                  value={liveA.minimum_deposit_amount}
                                  type="text"
                                  // onChange={input1}
                                  onChange={(e) => {
                                    if (!isNaN(Number(e.target.value))) {
                                      input1(e);
                                    }
                                  }}
                                  displayEmpty
                                />
                              </FormControl>
                            </div>
                            <div className="mb-4">
                              <div className="font-weight-bold mb-2">
                                Fees Percentage
                              </div>
                              <FormControl className="w-100">
                                <BootstrapInput
                                  name="fees_percentage"
                                  value={liveA.fees_percentage}
                                  type="text"
                                  onChange={(e) => {
                                    if (!isNaN(Number(e.target.value))) {
                                      input1(e);
                                    }
                                  }}
                                  displayEmpty
                                />
                              </FormControl>
                            </div>
                            <div className="mb-4">
                              <div className="font-weight-bold mb-2">
                                Show Open Trade
                              </div>
                              <Select
                                value={liveA.show_open_trade}
                                name="show_open_trade"
                                onChange={input1}
                                displayEmpty
                                inputProps={{
                                  "aria-label": "Without label",
                                }}
                                input={<BootstrapInput />}
                                className="mt-0 ml-0"
                                style={{ width: "100%" }}
                              >
                                <MenuItem value={1}>Yes</MenuItem>
                                <MenuItem value={0}>No</MenuItem>
                              </Select>
                            </div>
                            <div className="mb-4">
                              <div className="font-weight-bold mb-2">
                                Password
                              </div>
                              <FormControl className="w-100">
                                <BootstrapInput
                                  name="password"
                                  value={liveA.password}
                                  type="password"
                                  onChange={input1}
                                  displayEmpty
                                />
                              </FormControl>
                            </div>{" "}
                            <div className="mb-4">
                              <div className="font-weight-bold mb-2">
                                Confirm Password
                              </div>
                              <FormControl className="w-100">
                                <BootstrapInput
                                  name="confirm_password"
                                  value={liveA.confirm_password}
                                  type="password"
                                  onChange={input1}
                                  displayEmpty
                                />
                              </FormControl>
                            </div>
                            <div className="mb-4 text-center">
                              {liveA.isLoader ? (
                                <ColorButton
                                  tabindex="0"
                                  size="large"
                                  className=" btn-gradient  btn-success liveAbutton"
                                  disabled
                                >
                                  <svg class="spinner" viewBox="0 0 50 50">
                                    <circle
                                      class="path"
                                      cx="25"
                                      cy="25"
                                      r="20"
                                      fill="none"
                                      stroke-width="5"
                                    ></circle>
                                  </svg>
                                </ColorButton>
                              ) : (
                                <ColorButton onClick={onSubmit}>
                                  Save
                                </ColorButton>
                              )}
                            </div>
                          </form>
                        </Grid>
                      </Grid>
                    </DialogContent>
                  </Dialog>
                </Grid>
                <Grid container>
                  <Grid item md={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5"
                    >
                      <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                        <div>
                          <h5 className="font-weight-bold mb-0 text-dark">
                            Open Positions
                          </h5>
                        </div>
                      </div>
                      <div className="divider"></div>
                      <div className="card-body position-relative">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            className="position-relative mh-150"
                          >
                            <div className="d-flex align-items-center text-dark w-100 h-100">
                              {/* <i className="m-auto">
                                You haven't made any Open Positions.
                              </i> */}
                              <CommonTable
                                url={`${Url}/datatable/open_position.php`}
                                column={column}
                                mt5Account={mt5Account}
                                sort="0"
                                fetchData="mt5_open_trade_data"
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5 "
                    >
                      <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                        <div>
                          <h5 className="font-weight-bold mb-0 text-dark">
                            Trade History
                          </h5>
                        </div>
                      </div>
                      <div className="divider"></div>
                      <div className="card-body position-relative">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            className="position-relative mh-150"
                          >
                            <div className="align-items-center text-dark w-100 h-100">
                              <CardContent className="py-3 filter-section-width-100">
                                <div>
                                  <Grid container spacing={2}>
                                    <Grid item sm={6} md={3}>
                                      <FormControl fullWidth={true}>
                                        <label className="small font-weight-bold text-dark">
                                          {" "}
                                          Date From
                                        </label>
                                        <BootstrapInput
                                          type="date"
                                          value={closeFilterData.deposit_from}
                                          name="deposit_from"
                                          onChange={(e) =>
                                            setCloseFilterData({
                                              ...closeFilterData,
                                              deposit_from: e.target.value,
                                            })
                                          }
                                        ></BootstrapInput>
                                      </FormControl>
                                    </Grid>
                                    <Grid item sm={6} md={3}>
                                      <FormControl fullWidth={true}>
                                        <label className="small font-weight-bold text-dark">
                                          {" "}
                                          Date To
                                        </label>
                                        <BootstrapInput
                                          value={closeFilterData.deposit_to}
                                          type="date"
                                          name="deposit_to"
                                          onChange={(e) =>
                                            setCloseFilterData({
                                              ...closeFilterData,
                                              deposit_to: e.target.value,
                                            })
                                          }
                                        ></BootstrapInput>
                                      </FormControl>
                                    </Grid>
                         
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid item sm={12} md={12}>
                                     
                                    </Grid>
                                  </Grid>
                                  <CommonTable
                                    url={`${Url}/datatable/trade_history.php`}
                                    column={TradeColumn}
                                    sort="0"
                                    filter={closeFilterData}
                                    mt5Account={mt5Account}
                                    // refresh={closePositionRefresh}
                                  />
                                </div>
                              </CardContent>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item md={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5 "
                    >
                      <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                        <div>
                          <h5 className="font-weight-bold mb-0 text-dark">
                            Recent Transfers
                          </h5>
                        </div>
                      </div>
                      <div className="divider"></div>
                      <div className="card-body position-relative">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            className="position-relative mh-150"
                          >
                            <div className="align-items-center text-dark w-100 h-100">
                              {/* <i className="m-auto">
                                You haven't made any transaction yet.
                              </i> */}
                              <CardContent className="py-3 filter-section-width-100">
                                <div>
                                  <Grid container spacing={2}>
                                    <Grid item sm={6} md={3}>
                                      <FormControl fullWidth={true}>
                                        <label className="small font-weight-bold text-dark">
                                          Date From
                                        </label>
                                        <BootstrapInput
                                          type="date"
                                          value={filterData.deposit_from}
                                          name="deposit_from"
                                          onChange={(e) =>
                                            setFilterData({
                                              ...filterData,
                                              deposit_from: e.target.value,
                                            })
                                          }
                                        ></BootstrapInput>
                                      </FormControl>
                                    </Grid>
                                    <Grid item sm={6} md={3}>
                                      <FormControl fullWidth={true}>
                                        <label className="small font-weight-bold text-dark">
                                          {" "}
                                          Date To
                                        </label>
                                        <BootstrapInput
                                          value={filterData.deposit_to}
                                          type="date"
                                          name="deposit_to"
                                          onChange={(e) =>
                                            setFilterData({
                                              ...filterData,
                                              deposit_to: e.target.value,
                                            })
                                          }
                                        ></BootstrapInput>
                                      </FormControl>
                                    </Grid>
                                    <Grid item sm={6} md={3}>
                                      <FormControl fullWidth={true}>
                                        <label className="small font-weight-bold text-dark">
                                          {" "}
                                          Transaction Type
                                        </label>
                                        <Select
                                          value={param.transaction_type}
                                          onChange={(e) =>
                                            setParam({
                                              ...param,
                                              transaction_type: e.target.value,
                                            })
                                          }
                                          displayEmpty
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          input={<BootstrapInput />}
                                        >
                                          <MenuItem value="">All</MenuItem>
                                          <MenuItem value="deposit">
                                            Deposit
                                          </MenuItem>
                                          <MenuItem value="withdraw">
                                            Withdraw
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid item sm={12} md={12}>

                                    </Grid>
                                  </Grid>
                                  <CommonTable
                                    url={`${Url}/datatable/recent_transaction.php`}
                                    column={inColumn}
                                    sort="1"
                                    param={param}
                                    filter={filterData}
                                    mt5Account={mt5Account}
                                    // refresh={recentRefresh}
                                  />
                                </div>
                              </CardContent>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

