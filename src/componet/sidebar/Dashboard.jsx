import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Chart from "react-apexcharts";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
  Button,
  ButtonGroup,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IsApprove, Url } from "../../global";
import { BootstrapInput } from "../customComponet/CustomElement";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const Dashboard = (prop) => {
  const navigate = useNavigate();
  const [btnactive, setbtnactive] = useState({
    weekly: true,
    month: false,
    year: false,
  });

  var [dailySalesOptions, setdailySalesOptions] = useState({
    series: [
      {
        name: "Deposit",
        data: [],
      },
      {
        name: "Withdraw",
        data: [],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008000", "#ff0000"],
    stroke: {
      curve: "smooth",
    },

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  });
  var [dailySalesOptions1, setdailySalesOptions1] = useState({
    series: [
      {
        name: "P&L",
        data: [],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#3d9730"],
    stroke: {
      curve: "smooth",
    },

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  });

  const [year, setYear] = useState("");
  const [isLoderButton1, setIsLoaderButton1] = useState(false);
  const [isLoderButton2, setIsLoaderButton2] = useState(false);
  const [year2, setYear2] = useState("");

  const changeYear = (prop) => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("filter_profit_years", prop);
    setIsLoaderButton1(true);
    axios.post(Url + "/ajaxfiles/dashboard.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      dailySalesOptions1.series[0].data = res.data.get_monthly_pnl_data.y;
      dailySalesOptions1.xaxis.categories = res.data.get_monthly_pnl_data.x;
      setdailySalesOptions1({ ...dailySalesOptions1 });
      setIsLoaderButton1(false);
      console.log("setIsLoaderButton", isLoderButton);
    });
  };

  const [mainLoader, setMainLoader] = useState(true);
  const [prefrence, setPrefrence] = useState({});
  const fetchUserPref = async () => {
    setMainLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios.post(`${Url}/ajaxfiles/dashboard.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        prop.setLogin("true");
        navigate("/login");
      }

      setPrefrence(res.data);
      setYear(res.data.filter_profit_years[0]);

      dailySalesOptions.series[0].data = res.data.weekly_pamm_investment.y;
      dailySalesOptions.series[1].data = res.data.get_weekly_pamm_withdrawal.y;
      dailySalesOptions.xaxis.categories = res.data.weekly_pamm_investment.x;
      setdailySalesOptions({ ...dailySalesOptions });
      dailySalesOptions1.series[0].data = res.data.get_monthly_pnl_data.y;
      dailySalesOptions1.xaxis.categories = res.data.get_monthly_pnl_data.x;
      setdailySalesOptions1({ ...dailySalesOptions1 });

      console.log(" dailySalesOptions", dailySalesOptions);
      setMainLoader(false);
    });
  };
  const [isLoderButton, setIsLoaderButton] = useState(false);

  const fetchUserPref1 = async () => {
    setMainLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios.post(`${Url}/ajaxfiles/dashboard.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        prop.setLogin("true");
        navigate("/login");
      }

      setPrefrence(res.data);
      dailySalesOptions.series[0].data = res.data.monthly_pamm_investment.y;
      dailySalesOptions.xaxis.categories = res.data.monthly_pamm_investment.x;
      setdailySalesOptions({ ...dailySalesOptions });

      console.log(" dailySalesOptions", dailySalesOptions);
      setMainLoader(false);
    });
  };
  console.log(" dailySalesOptions", dailySalesOptions);

  useEffect(() => {
    fetchUserPref();
  }, []);
  useEffect(() => {
    console.log("asddsaFSDF", dailySalesOptions);
  }, [dailySalesOptions]);

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <div className="clock">
                <div className="pointers"></div>
              </div>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                {/* <Grid item sm={12}></Grid> */}
                {/* <Grid item xl={1}></Grid> */}
                <Grid item xl={10} md={12} lg={12}>
                  <div className="w-100 mb-4 display-4 font-weight-bold">
                    Dashboard
                  </div>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                      className="mb-5 mt-4"
                    >
                      <Grid item xs={2} sm={4} md={4}>
                        <Item className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0 ">Total Investors</h6>
                          <span className="dot">
                            <span>{prefrence.total_investor}</span>
                          </span>
                        </Item>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <Item className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Remaining Profit</h6>
                          <span className="dot">
                            <span>{prefrence.remaining_profit}</span>
                          </span>
                        </Item>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <Item className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Total Investors Deposit</h6>
                          <span className="dot">
                            <span>{prefrence.total_investors_deposit}</span>
                          </span>
                        </Item>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <Item className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Current Floating</h6>
                          <span className="dot">
                            <span>{prefrence.total_profit}</span>
                          </span>
                        </Item>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <Item className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Total Profit</h6>
                          <span className="dot">
                            <span>{prefrence.total_profit}</span>
                          </span>
                        </Item>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <Item className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Total Withdraw</h6>
                          <span className="dot">
                            <span>{prefrence.total_withdraw}</span>
                          </span>
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>

                  <Grid container spacing={1}>
                    <Grid item md={6}>
                      <Paper
                        elevation={2}
                        style={{ borderRadius: "10px", height: "100%" }}
                      >
                        <CardContent className="py-3">
                          <div className="section-header">
                          <p className="profitANDLOSS">Deposit</p>
                            <ButtonGroup
                              disableElevation
                              variant="contained"
                              sx={{ marginBottom: "17px" }}
                            >
                              <Button
                                className={
                                  btnactive.weekly ? "" : "button-group-off"
                                }
                                onClick={() => {
                                  dailySalesOptions.series[0].data =
                                    prefrence.weekly_pamm_investment.y;
                                  dailySalesOptions.series[1].data =
                                    prefrence.get_weekly_pamm_withdrawal.y;
                                  dailySalesOptions.xaxis.categories =
                                    prefrence.weekly_pamm_investment.x;
                                  setdailySalesOptions({
                                    ...dailySalesOptions,
                                  });
                                  setIsLoaderButton(true);
                                  setbtnactive({
                                    weekly: true,
                                    month: false,
                                    year: false,
                                  });
                                  setTimeout(() => {
                                    setIsLoaderButton(false);
                                  }, 500);
                                }}
                              >
                                Week
                              </Button>
                              <Button
                                className={
                                  btnactive.month ? "" : "button-group-off"
                                }
                                onClick={() => {
                                  dailySalesOptions.series[0].data =
                                    prefrence.monthly_pamm_investment.y;
                                  dailySalesOptions.series[1].data =
                                    prefrence.get_monthly_pamm_withdrawal.y;
                                  dailySalesOptions.xaxis.categories =
                                    prefrence.monthly_pamm_investment.x;
                                  // setdailySalesOptions({ ...dailySalesOptions });
                                  setIsLoaderButton(true);

                                  setdailySalesOptions(() => {
                                    return {
                                      ...dailySalesOptions,
                                    };
                                  });

                                  // fetchUserPref1();
                                  setbtnactive({
                                    weekly: false,
                                    month: true,
                                    year: false,
                                  });
                                  setTimeout(() => {
                                    setIsLoaderButton(false);
                                  }, 500);
                                }}
                              >
                                Month
                              </Button>
                              <Button
                                className={
                                  btnactive.year ? "" : "button-group-off"
                                }
                                onClick={() => {
                                  dailySalesOptions.series[0].data =
                                    prefrence.yearly_pamm_investment_summary.y;
                                  dailySalesOptions.series[1].data =
                                    prefrence.get_yearly_pamm_withdrawal.y;
                                  dailySalesOptions.xaxis.categories =
                                    prefrence.yearly_pamm_investment_summary.x;
                                  setIsLoaderButton(true);

                                  setdailySalesOptions({
                                    ...dailySalesOptions,
                                  });
                                  setbtnactive({
                                    weekly: false,
                                    month: false,
                                    year: true,
                                  });
                                  setTimeout(() => {
                                    setIsLoaderButton(false);
                                  }, 500);
                                }}
                              >
                                Year
                              </Button>
                            </ButtonGroup>
                          </div>
                          <Grid container spacing={2}>
                            <Grid item md={12} lg={12} xl={12}>
                              {/* {isLoderButton} */}
                              <div className="remainderContentSection">
                                {isLoderButton ? (
                                  <div className="loderforChart">
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
                                  <Chart
                                    options={dailySalesOptions}
                                    series={dailySalesOptions.series}
                                    type="line"
                                    height="300px"
                                  />
                                )}
                                <div className="bottom-label-section">
                                  <div className="label">
                                    <span className="blur-dot-chart"></span>{" "}
                                    Total Deposit :{" "}
                                    <b>{prefrence.total_investors_deposit}</b>
                                  </div>
                                  <div className="label">
                                    <span className="green-dot-chart"></span>{" "}
                                    Total Withdraw :{" "}
                                    <b>{prefrence.total_withdraw}</b>
                                  </div>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Paper>
                    </Grid>
                    <Grid item md={6}>
                      <Paper
                        elevation={2}
                        style={{ borderRadius: "10px", height: "100%" }}
                        className="w-100"
                      >
                        <CardContent className="py-3">
                          <div
                            className="section-header"
                            style={{ marginBottom: "15px" }}
                          >
                            <p className="profitANDLOSS">
                              Profit And Loss Chart
                            </p>

                            <FormControl fullWidth={true}>
                              <label className="small font-weight-bold text-dark">
                                Years
                              </label>
                              <Select
                                value={year}
                                onChange={(e) => {
                                  console.log("e.target.value", e.target.value);
                                  setYear(e.target.value);
                                  changeYear(e.target.value);
                                }}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                input={<BootstrapInput />}
                              >
                                {prefrence.filter_profit_years.map(
                                  (item, index) => {
                                    return (
                                      <MenuItem value={item}>{item}</MenuItem>
                                    );
                                  }
                                )}
                              </Select>
                            </FormControl>
                          </div>
                          <Grid container spacing={2}>
                            <Grid item md={12} lg={12} xl={12}>
                              <div className="remainderContentSection">
                                {isLoderButton1 ? (
                                  <div className="loderforChart">
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
                                  <Chart
                                    options={dailySalesOptions1}
                                    series={dailySalesOptions1.series}
                                    type="line"
                                    height="300px"
                                  />
                                )}
                              </div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
