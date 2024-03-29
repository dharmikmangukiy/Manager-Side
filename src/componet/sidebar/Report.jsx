import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import TopButton from "../customComponet/TopButton";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { ColorButton } from "../customComponet/CustomElement";
import { Button } from "@mui/material";
import { BootstrapInput } from "../customComponet/CustomElement";
import CommonTable from "../customComponet/CommonTable";
import { Url } from "../../global";
import "./report.css";
import CustomImageModal from "../customComponet/CustomImageModal";
import NewDate from "../commonComponet/NewDate";
import CloseIcon from "@mui/icons-material/Close";

// import './history.css';
import IconButton from "@mui/material/IconButton";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Report = () => {
  const [value, setValue] = React.useState(new Date());
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [dialogTitle, setDialogTitle] = useState("Deposit Proof");
  const [maxWidth, setMaxWidth] = useState("md");

  const [age, setAge] = React.useState("");
  const [type, setType] = React.useState("deposit");
  const [filterData, setFilterData] = useState({
    transfer_status: "",
    withdrawal_status: "",
    deposit_status: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [internalParam, setInternalParam] = useState({
    transfer_status: "",
  });
  const [withdrawParam, setWithdrawParam] = useState({
    withdrawal_status: "",
  });
  const [depositParam, setDepositParam] = useState({
    deposit_status: "",
  });
  const [image, setimage] = useState([]);

  const depositFilter = () => {};

  const handleContextClick = (event, index) => {
    let tableMenus = [...openTableMenus];
    tableMenus[index] = event.currentTarget;
    setOpenTableMenus(tableMenus);
  };

  const handleContextClose = (index) => {
    let tableMenus = [...openTableMenus];
    tableMenus[index] = null;
    setOpenTableMenus(tableMenus);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const manageContent = () => {
    return (
      <div className="deposit-image-flex">
        {image.map((item, index) => {
          return <CustomImageModal image={item} className="width-150px" />;
        })}
      </div>
    );
  };
  const manageDialogActionButton = () => {
    return (
      <div className="dialogMultipleActionButton">
        <ColorButton variant="contained" onClick={handleClose}>
          Close
        </ColorButton>
      </div>
    );
  };
  const depositColumn = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span title={row.sr_no}>{row.sr_no}</span>;
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "REFERENCE NO.",
      selector: (row) => {
        return <span title={row.refrence_no}>{row.refrence_no}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "DATE",
      selector: (row) => {
        return (
          <span title={row.date}>
            <NewDate newDate={row.date} />
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "WALLET/MT5",
      selector: (row) => {
        return <span title={row.wallet_code}>{row.wallet_code}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "PAYMENT METHOD",
      selector: (row) => {
        return <span title={row.method}>{row.method}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "TRANSACTION ID",
      selector: (row) => {
        return <span title={row.transactionid}>{row.transactionid}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    /* {
      name: "USER COMMENT",
      selector: (row) => {
        return (
          <span title={row.user_visible_password}>
            {row.user_visible_password}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 1,
    }, */
    {
      name: "crypto address",
      selector: (row) => {
        return <span title={row.crypto_address}>{row.crypto_address}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.7,
    },
    {
      name: "AMOUNT",
      selector: (row) => {
        return <span title={row.amount}>{row.amount}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "PROOF",
      selector: (row) => {
        return row.proof != "" && row.proof?.length !== 0 ? (
          row.proof?.length == 1 ? (
            <CustomImageModal
              image={row.proof}
              isIcon={true}
              className="tableImg"
            />
          ) : (
            <Button
              onClick={() => {
                setimage(row.proof);
                setOpen(true);
              }}
            >
              {" "}
              <VisibilityIcon />
            </Button>
          )
        ) : (
          ""
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "updated DATE",
      selector: (row) => {
        return (
          <span title={row.approve_datetime}>
            {row.approve_datetime == "" ? (
              ""
            ) : (
              <NewDate newDate={row.approve_datetime} />
            )}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
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
      // wrap: true,
      grow: 0.1,
    },
  ];

  const walletColumn = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span>{row.sr_no}</span>;
      },
      reorder: true,
      // wrap: true,
      grow: 0.1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return (
          <span title={row.date}>
            <NewDate newDate={row.date} />
          </span>
        );
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 0.5,
    },
    {
      name: "PAYMENT METHOD",
      selector: (row) => {
        return <span title={row.payment_method}>{row.payment_method}</span>;
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 0.1,
    },
    {
      name: "AMOUNT",
      selector: (row) => {
        return <span title={row.amount}>{row.amount}</span>;
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 0.1,
    },
    {
      name: "REMARK",
      selector: (row) => {
        return <span title={row.remarks}>{row.remarks}</span>;
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 1,
    },
    {
      name: "TYPE",
      selector: (row) => {
        return (
          <span
            title={row.type}
            className={`${
              row.type == "Debit" ? "text-color-red" : "text-color-green"
            }`}
          >
            {row.type}
          </span>
        );
      },
      reorder: true,
      // wrap: true,
      grow: 0.1,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => {
        return <span title={row.description}>{row.description}</span>;
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 0.1,
    },
  ];

  const withdrawColumn = [
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
      name: "DATE",
      selector: (row) => {
        return (
          <span title={row.date}>
            <NewDate newDate={row.date} />
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
    },
    {
      name: "withdrawal from",
      selector: (row) => {
        return <span title={row.withdrawal_from}>{row.withdrawal_from}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.9,
    },
    {
      name: "PAYMENT METHOD",
      selector: (row) => {
        return <span title={row.method}>{row.method}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "ACCOUNT NO",
      selector: (row) => {
        return (
          <span title={row.account_number}>
            {row.method == "Bank" ? (
              <>
                {row.withdrawal_bank_name}
                <br />
                {row.account_number}
              </>
            ) : (
              ""
            )}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.9,
    },

    {
      name: "UPI/CRYPTO TYPE",
      selector: (row) => {
        return (
          <span title={row.upi_name}>
            {row.method == "crypto" ? row.crypto_name : row.upi_name}
          </span>
        );
      },
      // wrap: true,
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
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },

    {
      name: "AMOUNT",
      selector: (row) => {
        return <span title={row.amount}>{row.amount}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "updated DATE",
      selector: (row) => {
        return (
          <span title={row.approved_datetime}>
            {row.approved_datetime == "" ? (
              ""
            ) : (
              <NewDate newDate={row.approved_datetime} />
            )}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
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
      // wrap: true,
      grow: 0.1,
    },
    {
      name: "REMARKS",
      selector: (row) => {
        return <span title={row.remarks}>{row.remarks}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
  ];
  const internalColumn = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span title={row.sr_no}>{row.sr_no}</span>;
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return (
          <span title={row.date}>
            <NewDate newDate={row.date} />
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.8,
    },
    {
      name: "FROM ACCOUNT",
      selector: (row) => {
        return <span title={row.from_account}>{row.from_account}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "TRANSFER TO NAME",
      selector: (row) => {
        return <span title={row.transfer_to_name}>{row.transfer_to_name}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "TO ACCOUNT",
      selector: (row) => {
        return <span title={row.to_account}>{row.to_account}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "AMOUNT",
      selector: (row) => {
        return <span title={row.amount}>{row.amount}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "TYPE",
      selector: (row) => {
        return <span title={row.transaction_type}>{row.transaction_type}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.1,
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
      // wrap: true,
      grow: 0.1,
    },
  ];
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={11}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                {/* <TopButton /> */}
                <Paper elevation={2} style={{ borderRadius: "10px" }}>
                  <div className="card-header font-weight-bold text-dark border-bottom py-2">
                    {" "}
                    Filter Criteria
                  </div>
                  <CardContent className="py-3">
                    <Grid container spacing={2}>
                      <Grid item sm={6} md={3}>
                        <FormControl fullWidth={true}>
                          <label className="small font-weight-bold text-dark">
                            {" "}
                            Transaction Type
                          </label>
                          <Select
                            value={type}
                            onChange={(e) => {
                              setType(e.target.value);
                            }}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            input={<BootstrapInput />}
                          >
                            {/* <MenuItem value="all">All</MenuItem> */}

                            <MenuItem value="deposit">Deposit</MenuItem>
                            <MenuItem value="withdrawal">Withdrawal</MenuItem>
                            <MenuItem value="internal_transfer">
                              Internal Transfer
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item sm={6} md={3}>
                        <FormControl fullWidth={true}>
                          <label className="small font-weight-bold text-dark">
                            {" "}
                            Date From
                          </label>
                          <BootstrapInput
                            type="date"
                            onChange={(e) => {
                              filterData.start_date = e.target.value;
                              setFilterData({ ...filterData });
                            }}
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
                            type="date"
                            onChange={(e) => {
                              filterData.end_date = e.target.value;
                              setFilterData({ ...filterData });
                            }}
                          ></BootstrapInput>
                        </FormControl>
                      </Grid>
                      <Grid item sm={6} md={3}>
                        {type == "deposit" ? (
                          <FormControl fullWidth={true}>
                            <label className="small font-weight-bold text-dark">
                              Type
                            </label>
                            <Select
                              value={filterData.deposit_status}
                              onChange={(e) => {
                                filterData.deposit_status = e.target.value;
                                setFilterData({ ...filterData });
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              input={<BootstrapInput />}
                            >
                              <MenuItem value="">All</MenuItem>
                              <MenuItem value="0">Pending</MenuItem>
                              <MenuItem value="1">Approved</MenuItem>
                              <MenuItem value="2">Rejected</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          ""
                        )}
                        {type == "withdrawal" ? (
                          <FormControl fullWidth={true}>
                            <label className="small font-weight-bold text-dark">
                              {" "}
                              Type
                            </label>
                            <Select
                              value={filterData.withdrawal_status}
                              onChange={(e) => {
                                filterData.withdrawal_status = e.target.value;
                                setFilterData({ ...filterData });
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              input={<BootstrapInput />}
                            >
                              <MenuItem value="">All</MenuItem>
                              <MenuItem value="0">Pending</MenuItem>
                              <MenuItem value="1">Approved</MenuItem>
                              <MenuItem value="2">Rejected</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          ""
                        )}
                        {type == "internal_transfer" ? (
                          <FormControl fullWidth={true}>
                            <label className="small font-weight-bold text-dark">
                              {" "}
                              Type
                            </label>
                            <Select
                              value={filterData.transfer_status}
                              onChange={(e) => {
                                filterData.transfer_status = e.target.value;
                                setFilterData({ ...filterData });
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              input={<BootstrapInput />}
                            >
                              <MenuItem value="">All</MenuItem>
                              <MenuItem value="0">Pending</MenuItem>
                              <MenuItem value="1">Approved</MenuItem>
                              <MenuItem value="2">Rejected</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </Grid>
                    {/* <Grid container spacing={2}>
                      <Grid item sm={12} md={12}>
                        <div className="filter-submit">
                          <ColorButton className=" d-block ml-auto mb-3 mr-3 " onClick={(e) => setRefresh(!refresh)}>
                            Sumbit
                          </ColorButton>
                        </div>
                      </Grid>
                    </Grid> */}
                  </CardContent>
                </Paper>
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px", marginTop: "31px" }}
                  className="pending-all-15px"
                >
                  {/* {type == "all" ? (
                    <CommonTable
                      url={`${Url}/datatable/wallet_history.php`}
                      column={walletColumn}
                      sort="1"
                      param={filterData}
                      refresh={refresh}
                    />
                  ) : (
                    ""
                  )} */}
                  {type == "deposit" ? (
                    <CommonTable
                      url={`${Url}/datatable/deposit_list.php`}
                      column={depositColumn}
                      sort="2"
                      param={filterData}
                      refresh={refresh}
                    />
                  ) : (
                    ""
                  )}
                  {type == "withdrawal" ? (
                    <CommonTable
                      url={`${Url}/datatable/withdraw_list.php`}
                      column={withdrawColumn}
                      sort="1"
                      param={filterData}
                      refresh={refresh}
                    />
                  ) : (
                    ""
                  )}
                  {type == "internal_transfer" ? (
                    <CommonTable
                      url={`${Url}/datatable/internal_transfer_list.php`}
                      column={internalColumn}
                      sort="1"
                      param={filterData}
                      refresh={refresh}
                    />
                  ) : (
                    ""
                  )}
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          className="modalWidth100"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            className="dialogTitle"
            onClose={handleClose}
          >
            {dialogTitle}
          </BootstrapDialogTitle>
          <DialogContent dividers>{manageContent()}</DialogContent>
          <DialogActions>{manageDialogActionButton()}</DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
};

export default Report;
