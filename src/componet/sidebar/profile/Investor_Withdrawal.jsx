import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
// import "./investorswithdrawal.css";
import InputBase from "@mui/material/InputBase";

import { Button } from "@mui/material";
import CommonTable from "../../customComponet/CommonTable";
// import CommonFilter from "../common/CommonFilter";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { IsApprove, Url } from "../../../global";
import CommonFilter from "../../customComponet/CommonFilter";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {/* {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null} */}
    </DialogTitle>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    // borderRadius: 9,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #ced4da",
    fontSize: 16,
    padding: "8px 26px 8px 10px",
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      // borderRadius: 9,
      borderColor: "#80bdff",
    },
  },
}));

const InvestorsWithdrawal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [dialogTitle, setDialogTitle] = useState("");
  const [accountOption, setAccountOption] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [param, setParam] = useState({});
  const [checkStatus, setcheckStatus] = useState("");
  const [Form, setForm] = useState({
    account_type: "",
    account: "",
    customer_name: "",
    payment_gateway: "",
    amount: "",
    currency_code: "",
    note: "",
    user_id: "",
    isLoader: false,
  });
  const [viewWithdrawForm, setviewWithdrawForm] = useState({
    added_datetime: "",
    amount: "",
    approved_datetime: "",
    investor_name: "",
    mt5_name: "",
    portfolio_id: "",
    portfolio_name: "",
    remarks: "",
    close_open_position: false,
    withdrawal_id: "",
    withdrawal_status: "",
    isLoader: false,
    viewStatus: false,
  });
  const [searchBy, setSearchBy] = useState([
    {
      label: "Investor Name",
      value: false,
      name: "name",
    },
    {
      label: "Portfolio Name",
      value: false,
      name: "portfolio_name",
    },
    {
      label: "Account Name",
      value: false,
      name: "mt5_name",
    },
    {
      label: "Portfolio Id",
      value: false,
      name: "portfolio_id",
    },
    {
      label: "Amount",
      value: false,
      name: "amount",
    },
  ]);
  toast.configure();

  const columns = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span>{row.sr_no}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return <span title={row.added_datetime}>{row.added_datetime}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.7,
    },
    {
      name: "Investor NAME",
      selector: (row) => {
        return <span title={row.investor_name}>{row.investor_name}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.6,
    },
    {
      name: "Portfolio Name",
      selector: (row) => {
        return <span title={row.portfolio_name}>{row.portfolio_name}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.4,
    },
    {
      name: "Account NAME",
      selector: (row) => {
        return <span title={row.mt5_name}>{row.mt5_name}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "Portfolio Id",
      selector: (row) => {
        return <span title={row.portfolio_id}>{row.portfolio_id}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.7,
    },
    {
      name: "Amount",
      selector: (row) => {
        return <span title={row.amount}>${row.amount}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "Approved Date",
      selector: (row) => {
        return (
          <span title={row.approved_datetime}>{row.approved_datetime}</span>
        );
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.7,
    },
    {
      name: "STATUS",
      selector: (row) => {
        return (
          <span
            title={row.withdrawal_status}
            className={`text-color-${
              row.withdrawal_status == "1"
                ? "green"
                : row.withdrawal_status == "2"
                ? "red"
                : "yellow"
            }`}
          >
            {row.withdrawal_status == "1"
              ? "APPROVED"
              : row.withdrawal_status == "2"
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
    {
      name: "Action",
      button: true,
      cell: (row) => {
        return (
          <div>
            <Button
              id={`actionButton_${row.withdrawal_id}`}
              aria-controls={
                open ? `basic-menu-${row.withdrawal_id}` : undefined
              }
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event) => viewWithdrawl(row)}
              {...row}
              style={{ color: "rgb(144 145 139)" }}
            >
              <i className="material-icons">more_horiz</i>
            </Button>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  const handleContextClick = (event, index) => {
    console.log(event.currentTarget.getAttribute("id"), index);
    let tableMenus = [...openTableMenus];
    tableMenus[index] = event.currentTarget;
    setOpenTableMenus(tableMenus);
  };

  const handleContextClose = (index) => {
    let tableMenus = [...openTableMenus];
    tableMenus[index] = null;
    setOpenTableMenus(tableMenus);
  };

  const manageDialogActionButton = () => {
    if (dialogTitle == "Add New Withdrawal") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {Form.isLoader == true ? (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              disabled
            >
              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
            </Button>
          ) : (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              onClick={submitForm}
            >
              Add
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "Reject") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" className="btn-gradient btn-danger">
            Reject
          </Button>
        </div>
      );
    } else if (dialogTitle == "Approve") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" className="btn-gradient btn-success">
            Approve
          </Button>
        </div>
      );
    } else if (dialogTitle == "Update Withdrawal Request") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {!viewWithdrawForm.viewStatus ? (
            viewWithdrawForm.isLoader == true ? (
              <Button
                tabindex="0"
                size="large"
                className=" btn-gradient  btn-success "
                disabled
              >
                &emsp;
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
              </Button>
            ) : (
              <Button
                variant="contained"
                className="btn-gradient btn-success"
                onClick={submitUpdate}
                disabled={!viewWithdrawForm.close_open_position}
                sx={{
                  marginLeft: "10px",
                  color: !viewWithdrawForm.close_open_position
                    ? "Black !important"
                    : "white",
                }}
              >
                Update
              </Button>
            )
          ) : (
            ""
          )}
          {/* {(viewWithdrawForm.isLoader == true) ? <Button variant="contained" className='btn-gradient btn-success' disabled><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i></Button> : <Button variant="contained" className='btn-gradient btn-success' onClick={submitUpdate}>Update</Button>} */}
        </div>
      );
    }
  };

  const manageContent = () => {
    if (dialogTitle == "Add New Withdrawal") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Account Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                label="Account"
                name="account_type"
                onChange={input}
              >
                <MenuItem value="live">Live</MenuItem>
                <MenuItem value="demo">Demo</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div className="margeField">
            {/* <TextField id="standard-basic" label="Account" variant="standard" sx={{ width: '100%' }} name='account' onChange={input}/> */}
            <Autocomplete
              disablePortal
              options={accountOption}
              getOptionLabel={(option) =>
                option ? option.mt_live_account_id : ""
              }
              onInputChange={(event, newInputValue) => {
                fetchAccount(event, newInputValue);
              }}
              onChange={(event, newValue) => {
                // setValue(newValue);
                console.log(event, newValue);
                setForm((prevalue) => {
                  return {
                    ...prevalue,
                    customer_name:
                      newValue != null
                        ? newValue["user_first_name"] +
                          " " +
                          newValue["user_last_name"]
                        : "",
                    account: newValue != null ? newValue["user_id"] : "",
                  };
                });
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Account" variant="standard" />
              )}
            />
            <TextField
              id="standard-basic"
              label="Customer Name"
              variant="standard"
              sx={{ width: "100%" }}
              value={Form.customer_name}
              name="customer_name"
              onChange={input}
            />
          </div>
          <br />
          <div className="margeField">
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Payment Gateway
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                label="Payment Gateway"
                name="payment_gateway"
                onChange={input}
              >
                <MenuItem value="BANK">BANK</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Amount"
              variant="standard"
              sx={{ width: "100%" }}
              name="amount"
              onChange={input}
            />
          </div>
          <br />
          <div className="margeField">
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Currenct Code
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                label="Currenct Code"
                name="currency_code"
                onChange={input}
              >
                <MenuItem value="USD">USD</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Note"
              variant="standard"
              sx={{ width: "100%" }}
              name="note"
              onChange={input}
            />
          </div>
          {/* <br />
                <div>
                    <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} name='note' onChange={input}/>
                </div> */}
        </div>
      );
    } else if (dialogTitle == "Update Withdrawal Request") {
      return (
        <div>
          <div className="update-withdraw-request-section">
            <TextField
              id="standard-basic"
              label="Investor Name"
              variant="standard"
              sx={{ width: "100%" }}
              name="date"
              value={viewWithdrawForm.investor_name}
              onChange={input1}
              focused
              disabled
            />
            <TextField
              id="standard-basic"
              label="Added Date"
              variant="standard"
              sx={{ width: "100%" }}
              name="date"
              value={viewWithdrawForm.added_datetime}
              onChange={input1}
              focused
              disabled
            />

            <TextField
              id="standard-basic"
              label="Account Name"
              variant="standard"
              sx={{ width: "100%" }}
              name="date"
              value={viewWithdrawForm.mt5_name}
              onChange={input1}
              focused
              disabled
            />
          </div>
          <br />
          <div className="update-withdraw-request-section">
            <TextField
              id="standard-basic"
              label="Portfolio Name"
              variant="standard"
              sx={{ width: "100%" }}
              name="date"
              value={viewWithdrawForm.portfolio_name}
              onChange={input1}
              focused
              disabled
            />
            <TextField
              id="standard-basic"
              label="Portfolio Id"
              variant="standard"
              sx={{ width: "100%" }}
              name="date"
              value={viewWithdrawForm.portfolio_id}
              onChange={input1}
              focused
              disabled
            />
            <TextField
              id="standard-basic"
              label="Approved Datetime"
              variant="standard"
              sx={{ width: "100%" }}
              name="date"
              value={viewWithdrawForm.approved_datetime}
              onChange={input1}
              focused
              disabled
            />
          </div>
          <br />
          <div className="update-withdraw-request-section">
            <TextField
              id="standard-basic"
              label="Remarks"
              variant="standard"
              sx={{ width: "100%" }}
              name="remarks"
              value={viewWithdrawForm.remarks}
              onChange={input1}
              focused
              disabled={viewWithdrawForm.viewStatus}
            />

            <TextField
              id="standard-basic"
              label="Amount"
              variant="standard"
              sx={{ width: "100%" }}
              type="text"
              name="amount"
              value={viewWithdrawForm.amount}
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  input1(e);
                }
              }}
              focused
              disabled={viewWithdrawForm.viewStatus}
            />
            <FormControl variant="standard" sx={{ width: "100%" }} focused>
              <InputLabel>Status</InputLabel>
              <Select
                value={viewWithdrawForm.withdrawal_status}
                name="withdrawal_status"
                onChange={input1}
                disabled={viewWithdrawForm.viewStatus}
              >
                <MenuItem value="0">Pending</MenuItem>
                <MenuItem value="1">Approve</MenuItem>
                <MenuItem value="2">Reject</MenuItem>
              </Select>
            </FormControl>
          </div>

          <br />
          {!viewWithdrawForm.viewStatus ? (
            <>
              <div>
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={viewWithdrawForm.close_open_position}
                        onChange={(e) => {
                          viewWithdrawForm.close_open_position =
                            e.target.checked;
                          setviewWithdrawForm({ ...viewWithdrawForm });
                        }}
                        required
                      />
                    }
                    label="Open position for your trade lot will be closed"
                  />
                </FormControl>
              </div>
              <br />
            </>
          ) : (
            ""
          )}
        </div>
      );
    } else if (dialogTitle == "Reject") {
      return (
        <div>
          <div className="withdrawal-action-popup-text">
            <label>Are you want to sure reject this withdrawal ?</label>
          </div>
        </div>
      );
    } else if (dialogTitle == "Approve") {
      return (
        <div>
          <div className="withdrawal-action-popup-text">
            <label>Are you want to sure approve this withdrawal ?</label>
          </div>
        </div>
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (e) => {
    setForm({
      account_type: "",
      account: "",
      customer_name: "",
      payment_gateway: "",
      amount: "",
      currency_code: "",
      note: "",
      user_id: "",
      isLoader: false,
    });
    setDialogTitle("Add New Withdrawal");
    setOpen(true);
  };

  const actionMenuPopup = (e, index) => {
    console.log(e.target.getAttribute("class"));
    console.log(e.target.classList.contains("reject"));
    handleContextClose(index);
    if (e.target.classList.contains("reject")) {
      setDialogTitle("Reject");
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>Are you sure?</h1>
              <p>Do you want to reject this?</p>
              <div className="confirmation-alert-action-button">
                <Button
                  variant="contained"
                  className="cancelButton"
                  onClick={onClose}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  className="btn-gradient btn-danger"
                  onClick={() => {
                    handleAction(index, "reject_withdrawal");
                    onClose();
                  }}
                >
                  Yes, Reject it!
                </Button>
              </div>
            </div>
          );
        },
      });
    } else if (e.target.classList.contains("approve")) {
      setDialogTitle("Approve");
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>Are you sure?</h1>
              <p>Do you want to approve this?</p>
              <div className="confirmation-alert-action-button">
                <Button
                  variant="contained"
                  className="cancelButton"
                  onClick={onClose}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  className="btn-gradient btn-success"
                  onClick={() => {
                    handleAction(index, "approve");
                    onClose();
                  }}
                >
                  Yes, Approve it!
                </Button>
              </div>
            </div>
          );
        },
      });
    }

    // setOpen(true);
  };

  const input = (event) => {
    const { name, value } = event.target;
    setForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const input1 = (event) => {
    const { name, value } = event.target;
    setviewWithdrawForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const fetchAccount = async (event, search) => {
    console.log(search);
    const param = new FormData();
    // param.append('is_app', 1);
    // param.append('AADMIN_LOGIN_ID', 1);
    param.append("search", search);
    param.append("type", Form.account_type);
    await axios
      .post(`${Url}/ajaxfiles/fetch_user_account.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          setAccountOption(res.data.data);
        }
      });
  };

  const submitForm = async () => {
    console.log(Form);
    if (Form.account_type == "") {
      toast.error("Please select account type");
    } else if (Form.account == "") {
      toast.error("Please enter account");
    } else if (Form.customer_name == "") {
      toast.error("Please enter customer name");
    } else if (Form.payment_gateway == "") {
      toast.error("Please select any one payment gateway");
    } else if (Form.amount == "") {
      toast.error("Please enter amount");
    } else if (Form.currency_code == "") {
      toast.error("Please select currency code");
    } else if (Form.note == "") {
      toast.error("Please enter note");
    } else {
      Form.isLoader = true;
      setForm({ ...Form });
      const param = new FormData();
      param.append("action", "add_withdraw");
      // param.append('is_app', 1);
      // param.append('AADMIN_LOGIN_ID', 1);
      param.append("user_id", Form.account);
      param.append("account_type", Form.account_type);
      param.append("payment_method", Form.payment_gateway);
      param.append("amount", Form.amount);
      param.append("currency", Form.currency_code);
      param.append("note", Form.note);
      await axios
        .post(`${Url}/ajaxfiles/user_manage.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          // setLoader(false);
          Form.isLoader = false;
          setForm({ ...Form });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            setRefresh(!refresh);
            toast.success(res.data.message);
            setOpen(false);
          }
        });
      /* handleClose();
            toast.success('withdraw has been added successfully.'); */
    }
  };

  console.log(
    "viewWithdrawForm.close_open_position",
    viewWithdrawForm.close_open_position
  );
  const submitUpdate = async () => {
    console.log(viewWithdrawForm);
    if (viewWithdrawForm.remarks == "") {
      toast.error("Remarks is requied");
    } else if (viewWithdrawForm.amount == "") {
      toast.error("Please enter amount");
    } else if (viewWithdrawForm.withdrawal_status == "") {
      toast.error("Please select status");
    } else {
      viewWithdrawForm.isLoader = true;
      setviewWithdrawForm({ ...viewWithdrawForm });
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }

      param.append("action", "update_withdrawal");

      param.append("withdrawal_id", viewWithdrawForm.withdrawal_id);
      param.append("status", viewWithdrawForm.withdrawal_status);
      param.append("remarks", viewWithdrawForm.remarks);
      param.append("amount", viewWithdrawForm.amount);
      param.append(
        "close_open_position",
        viewWithdrawForm.close_open_position ? 1 : 0
      );

      await axios
        .post(`${Url}/ajaxfiles/investor_withdrawal_manage.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          viewWithdrawForm.isLoader = false;
          setviewWithdrawForm({ ...viewWithdrawForm });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            setRefresh(!refresh);
            toast.success(res.data.message);
            setOpen(false);
          }
        });
      /* handleClose();
            toast.success('withdraw has been added successfully.'); */
    }
  };

  const handleAction = async (id, flag) => {
    const param = new FormData();
    if (flag == "approve") {
      param.append("action", "approve_withdrawal");
    } else {
      param.append("action", "reject_withdrawal");
    }
    // param.append('is_app', 1);
    // param.append('AADMIN_LOGIN_ID', 1);
    param.append("withdrawal_id", id);
    await axios
      .post(`${Url}/ajaxfiles/withdrawal_manage.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setRefresh(!refresh);
        }
      });
  };

  const viewWithdrawl = async (row) => {
    handleContextClose(row);
    setviewWithdrawForm({
      added_datetime: row.added_datetime,
      amount: row.amount,
      approved_datetime: row.approved_datetime,
      investor_name: row.investor_name,
      mt5_name: row.mt5_name,
      portfolio_id: row.portfolio_id,
      portfolio_name: row.portfolio_name,
      remarks: row.remarks,
      close_open_position: false,
      withdrawal_id: row.withdrawal_id,
      withdrawal_status: row.withdrawal_status,
      isLoader: false,
      viewStatus: row.withdrawal_status == "0" ? false : true,
    });
    console.log("viewWithdrawForm.viewStatus", viewWithdrawForm.viewStatus);
    setDialogTitle("Update Withdrawal Request");
    setOpen(true);
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
            <Grid item xl={10} md={12} lg={12}>
                <p className="main-heading">Investors Withdrawal</p>
                <CommonFilter
                  search={searchBy}
                  searchWord={setSearchKeyword}
                  setParam={setParam}
                  status={true}
                  setcheckStatus={setcheckStatus}
                />
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  {/* <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>Add</Button>
                                    </div>
                                    <br /> */}
                  <CardContent className="py-3">
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={12} lg={12}>
                        <CommonTable
                          url={`${Url}/datatable/investor_withdraw_request.php`}
                          column={columns}
                          sort="1"
                          refresh={refresh}
                          search={searchBy}
                          searchWord={searchKeyword}
                          param={param}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Paper>

                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                >
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    {dialogTitle}
                  </BootstrapDialogTitle>
                  <DialogContent dividers>{manageContent()}</DialogContent>
                  <DialogActions>{manageDialogActionButton()}</DialogActions>
                </BootstrapDialog>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorsWithdrawal;
