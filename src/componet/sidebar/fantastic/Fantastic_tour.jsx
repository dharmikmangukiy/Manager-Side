import React, { useState } from "react";
import "./Fantastic_tour.css";
import StarIcon from "@mui/icons-material/Star";
import { Link, useNavigate } from "react-router-dom";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  InputBase,
  styled,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
// import { styled } from '@mui/material/styles';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ColorButton } from "../../customComponet/CustomElement";
import { useEffect } from "react";
import { IsApprove, Url } from "../../../global";
import axios from "axios";
import { Info } from "@mui/icons-material";
import Toast from "../../commonComponet/Toast";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
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
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Fantastic_tour = (props) => {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [lostSize, setLostSize] = useState(0);
  const navigate = useNavigate();
  const [mainLoader, setMainLoader] = useState(true);
  const [totalLot, setTotalLot] = useState({
    get_ib_user_all_lots_current: 0,
    get_ib_user_all_lots: 0,
  });
  const [tour, setTour] = useState([]);
  const [popData, setPopData] = useState({
    data: {},
  });
  const [popLoder, setPopLoder] = useState({
    pop1: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const manageContent = () => {
    if (open1 == true) {
      return (
        <>
          <div style={{ marginBottom: "6px" }}>
            <IconButton
              aria-label="close"
              onClick={() => {
                setOpen1(false);
              }}
              sx={{
                position: "absolute",
                right: 8,
                top: 0,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              {" "}
              <CloseIcon />
            </IconButton>
          </div>
          <div>
            <ul style={{ padding: "0px" }} className="knowMoreList">
              <li>
                1. To become eligible for the Contest, the IB undertakes to
                press the button ‘Participate’ on the Contest Page.
              </li>
              <li>
                2. The time from the moment the IB pressed the ‘Participate’
                button on the Contest Page to the end date of the Contest is
                called the Participation Time.
              </li>
              <li>
                3. The employees or individuals receiving salary from the
                Company are not eligible for the Contest.
              </li>
            </ul>
            Required Lots : {lostSize}
          </div>
        </>
      );
    }
  };
  const manageContent2 = () => {
    if (open == true) {
      return (
        <>
          <div style={{ marginBottom: "6px" }}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 0,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              {" "}
              <CloseIcon />
            </IconButton>
          </div>
          <div className="d-flex p-3">
            <Grid container spacing={3}>
              <Grid item md={6}>
                <img
                  className="image2 mr-4 w-100"
                  src={popData.data?.offer_image[0]}
                />
              </Grid>
              <Grid item md={6}>
                {" "}
                <div>
                  <span className="pop_head ">Explore Goa with {props.project_name}</span>
                  <br />
                  <br />
                  <span className="pop_text ">
                    <span style={{ color: " #FFB800" }}>Congratulations</span>{" "}
                    you are eligible for participate.
                  </span>
                  <br />
                  {popData.data?.offer_image.map((item, index) => {
                    return <img className="image3 mr-2 mt-2" src={item} />;
                  })}

                  {/* <img
                    className="image3 mr-2  mt-2"
                    src={popData.data?.offer_image[1]}
                  />
                  <img
                    className="image3  mt-2"
                    src={popData.data?.offer_image[2]}
                  /> */}
                </div>
              </Grid>
            </Grid>
          </div>
          <div
            className="divider"
            style={{ border: "0.5px solid #787878" }}
          ></div>
          <div className="p-3">
            <div style={{ marginBottom: "10px" }}>
              <span className="description ">DESCRIPTION</span>
            </div>
            <div>
              <p>
                Wherever you go, let those around you know you're a trader—with
                our stylish baseball cap. Black never goes out of style, right?
                Keep your head cool while making smart trading decisions.
                <br />
                <br />
                Images used in marketing materials are not necessarily
                representative of actual prizes. Actual prizes may vary.
              </p>
            </div>
            <div className="text-center ">
              {popLoder.pop1 == true ? (
                <ColorButton className="makeapaymentbutoon" id="btn_1" disabled>
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle
                      className="path"
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke-width="5"
                    ></circle>
                  </svg>
                </ColorButton>
              ) : (
                <ColorButton id="btn_1" onClick={onParticipate}>
                  Participate
                </ColorButton>
              )}
            </div>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    fatchKycStatus();
  }, []);
  const onParticipate = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "claim_eligible_offers");
    param.append("fantastic_id", popData.data?.fantastic_id);
    popLoder.pop1 = true;
    // setPopLoder({ ...popLoder });
    axios
      .post(Url + "/ajaxfiles/fantastic_four_offer.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
          popLoder.pop1 = false;
          // setPopLoder({ ...popLoder });
        } else {
          Toast("success", res.data.message);
          navigate(`/Order_chart/${popData.data?.fantastic_id}`);
          // popLoder.pop1 = false;
          // setPopLoder({ ...popLoder });
        }
      });
  };
  const fatchKycStatus = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_eligible_offers");

    await axios
      .post(Url + "/ajaxfiles/fantastic_four_offer.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
        } else {
          setTotalLot(res.data);
          setMainLoader(false);
          setTour(res.data.data);
        }
      });
  };
  return (
    <>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <span className="loader2"></span>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <Paper
                    elevation={1}
                    style={{ borderRadius: "10px", padding: "20px" }}
                    className="w-100  internal-transfer-form"
                  >
                    <div>
                      <div className="head_prpl ">
                        <div className="reward w-100">
                          {" "}
                          Current Month Total Earned Reward :{" "}
                          {totalLot.get_ib_user_all_lots_current}
                        </div>
                        <div className="reward w-100">
                          {" "}
                          Pervious Month Total Earned Reward :{" "}
                          {totalLot.get_ib_user_all_lots}
                        </div>
                        <div
                          className="link"
                          style={{ width: "220px" }}
                          onClick={() => {
                            navigate("/How_to_participate");
                          }}
                        >
                          What is Fantastic Four?
                        </div>
                        <div
                          className="link"
                          style={{ width: "220px" }}
                          onClick={() => {
                            navigate("/fantasticHistory");
                          }}
                        >
                          Fantastic Four History
                        </div>
                        <div className="round_2"></div>
                        <div className="round_1"></div>
                      </div>
                      {/* <div className="main_topic">
                       
                      </div> */}

                      <div>
                        <Grid container spacing={3}>
                          <Grid item md={6}>
                            {" "}
                            <div className="domestic">Domestic Tours</div>
                            {tour?.map((item1) => {
                              return (
                                <>
                                  {item1.is_international == 0 ? (
                                    <>
                                      {" "}
                                      <div className="ft_box">
                                        <div style={{ position: "relative" }}>
                                          <img
                                            className="image1"
                                            src={item1.offer_image[0]}
                                          />
                                          <div className="shadwoFanta"></div>
                                          <div className="startposition">
                                            <span className="u_text">
                                              Explore {item1.country_name} With
                                              {props.project_name}
                                            </span>
                                            <span className="u_text1">
                                              <StarIcon />
                                              <span
                                                className="val_text"
                                                style={{ color: "white" }}
                                              >
                                                {item1.lot_size}
                                              </span>
                                            </span>
                                          </div>
                                        </div>

                                        <div className="flex">
                                          <div className="content1">
                                            {item1.is_claimed == true ? (
                                              <>
                                                You have already participated in
                                                this competition.
                                              </>
                                            ) : (
                                              <>
                                                {" "}
                                                <span
                                                  style={{ color: "#FFB800" }}
                                                >
                                                  {item1.remaining_lots == 0
                                                    ? "Congratulations"
                                                    : ""}
                                                </span>{" "}
                                                {item1.remaining_lots == 0 ? (
                                                  "you are eligible for participate."
                                                ) : (
                                                  <>
                                                    You are{" "}
                                                    {item1.remaining_lots}{" "}
                                                    reward points away to
                                                    participate
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </div>
                                          <div className="row11"></div>
                                          <div className="content2">
                                            Total Participants <br />{" "}
                                            <span className="content3">
                                              {item1?.participants}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-center">
                                          {}

                                          {item1.is_eligible == false &&
                                          item1.is_claimed == false ? (
                                            <ColorButton
                                              id="btn_1"
                                              disabled
                                              onClick={() => {
                                                popData.data = item1;
                                                setPopData({ ...popData });
                                                handleClickOpen();
                                              }}
                                            >
                                              Participate
                                            </ColorButton>
                                          ) : item1.is_eligible == true &&
                                            item1.is_claimed == false ? (
                                            <ColorButton
                                              id="btn_1"
                                              onClick={() => {
                                                popData.data = item1;
                                                setPopData({ ...popData });
                                                handleClickOpen();
                                              }}
                                            >
                                              Participate
                                            </ColorButton>
                                          ) : item1.is_eligible == true &&
                                            item1.is_claimed == true ? (
                                            <ColorButton
                                              id="btn_1"
                                              onClick={() => {
                                                navigate(
                                                  `/Order_chart/${item1.fantastic_id}`
                                                );
                                              }}
                                            >
                                              View
                                            </ColorButton>
                                          ) : (
                                            ""
                                          )}
                                          <ColorButton
                                            id="btn_1"
                                            style={{ marginLeft: "10px" }}
                                            onClick={() => {
                                              setLostSize(item1.lot_size);
                                              setOpen1(true);
                                            }}
                                          >
                                            Know More
                                          </ColorButton>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}{" "}
                                </>
                              );
                            })}
                          </Grid>
                          <Grid item md={6}>
                            {" "}
                            <div className="international">
                              International Tours
                            </div>
                            {tour?.map((item1) => {
                              return (
                                <>
                                  {item1.is_international == 1 ? (
                                    <>
                                      {" "}
                                      <div className="ft_box">
                                        <div style={{ position: "relative" }}>
                                          <img
                                            className="image1"
                                            src={item1.offer_image[0]}
                                          />
                                          <div className="shadwoFanta"></div>
                                          <div className="startposition">
                                            {" "}
                                            <span className="u_text">
                                              Explore {item1.country_name} With
                                              {props.project_name}
                                            </span>
                                            <span className="u_text1">
                                              <StarIcon />
                                              <span
                                                className="val_text"
                                                style={{ color: "white" }}
                                              >
                                                {item1.lot_size}
                                              </span>
                                            </span>
                                          </div>
                                        </div>

                                        <div className="flex">
                                          <div className="content1">
                                            {item1.is_claimed == true ? (
                                              "You have already participated in this competition."
                                            ) : (
                                              <>
                                                <span
                                                  style={{ color: "#FFB800" }}
                                                >
                                                  {item1.remaining_lots == 0
                                                    ? "Congratulations"
                                                    : ""}
                                                </span>
                                                {item1.remaining_lots == 0 ? (
                                                  "you are eligible for participate."
                                                ) : (
                                                  <>
                                                    You are{" "}
                                                    {item1.remaining_lots}{" "}
                                                    reward points away to
                                                    participate
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </div>
                                          <div className="row11"></div>
                                          <div className="content2">
                                            Total Participants <br />{" "}
                                            <span className="content3">
                                              {item1?.participants}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-center">
                                          {item1.is_eligible == false &&
                                          item1.is_claimed == false ? (
                                            <ColorButton
                                              id="btn_1"
                                              disabled
                                              onClick={() => {
                                                popData.data = item1;
                                                setPopData({ ...popData });
                                                handleClickOpen();
                                              }}
                                            >
                                              Participate
                                            </ColorButton>
                                          ) : item1.is_eligible == true &&
                                            item1.is_claimed == false ? (
                                            <ColorButton
                                              id="btn_1"
                                              onClick={() => {
                                                popData.data = item1;
                                                setPopData({ ...popData });
                                                handleClickOpen();
                                              }}
                                            >
                                              Participate
                                            </ColorButton>
                                          ) : item1.is_eligible == true &&
                                            item1.is_claimed == true ? (
                                            <ColorButton
                                              id="btn_1"
                                              onClick={() => {
                                                navigate(
                                                  `/Order_chart/${item1.fantastic_id}`
                                                );
                                              }}
                                            >
                                              View
                                            </ColorButton>
                                          ) : (
                                            ""
                                          )}
                                          <ColorButton
                                            id="btn_1"
                                            style={{ marginLeft: "10px" }}
                                            onClick={() => {
                                              setLostSize(item1.lot_size);

                                              setOpen1(true);
                                            }}
                                          >
                                            Know More
                                          </ColorButton>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            })}
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogContent dividers>{manageContent2()}</DialogContent>
        </BootstrapDialog>
        <BootstrapDialog
          onClose={() => {
            setOpen1(false);
          }}
          aria-labelledby="customized-dialog-title"
          open={open1}
        >
          <DialogContent dividers>{manageContent()}</DialogContent>
        </BootstrapDialog>
      </div>
    </>
  );
};

export default Fantastic_tour;
