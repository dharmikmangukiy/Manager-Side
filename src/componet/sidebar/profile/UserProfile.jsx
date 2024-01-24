import React, { useEffect, useState } from "react";
import "./profile.css";
import {
  Grid,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { Button, DialogContent } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IsApprove,Url } from "../../../global";
import { BootstrapInput, ColorButton } from "../../customComponet/CustomElement";


const Profile = () => {
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [refresh, setRefresh] = React.useState(true);
  const [mainLoader, setMainLoader] = useState(true);
  const [prefrence, setPrefrence] = useState({});
  const [data, setData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
    isLoder: false,
  });
  const [countryData, setCountryData] = useState({
    data: [],
  });
  const [upDateProfile, setUpDateProfile] = useState({
    first_name: "",
    last_name: "",
    user_phone: "",
    city: "",
    state: "",
    user_country: "",
    gender: "",
    dob: "",
    address: "",
    additional_email: "",
    additional_contact_number: "",

    isLoder: false,
  });
  const [viewPassword, setViewPassword] = useState({
    old: false,
    new: false,
  });
  const input1 = (event) => {
    const { name, value } = event.target;
    setUpDateProfile((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  const getCountries = () => {
    const param = new FormData();

    axios.post(Url + "/datatable/get_countries.php", param).then((res) => {
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        countryData.data = res.data.aaData;
        setCountryData({ ...countryData });
        console.log("countryData", countryData);
      }
    });
  };

  const chpassword = (event) => {
    const { name, value } = event.target;
    setData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(data);
  };
  const onEditProfile = () => {
    if (!upDateProfile.first_name) {
      toast.error("First Name  is required");
    } else if (!upDateProfile.last_name) {
      toast.error("Last Name is required");
    } else if (!upDateProfile.gender) {
      toast.error("Gender  is required");
    } else if (!upDateProfile.dob) {
      toast.error("Date Of Birth is required");
    } else if (!upDateProfile.user_country) {
      toast.error("Country is required");
    } else if (!upDateProfile.city) {
      toast.error("City is required");
    } else if (!upDateProfile.state) {
      toast.error("State is required");
    } else if (!upDateProfile.address) {
      toast.error("Address is required");
    } else if (!upDateProfile.user_phone) {
      toast.error("Phone Number is required");
    } else {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("first_name", upDateProfile.first_name);
      param.append("last_name", upDateProfile.last_name);
      param.append("gender", upDateProfile.gender);
      param.append("dob", upDateProfile.dob);
      param.append("city", upDateProfile.city);
      param.append("state", upDateProfile.state);
      param.append("address", upDateProfile.address);
      param.append("additional_email", upDateProfile.additional_email);
      param.append("user_country", upDateProfile.user_country);
      param.append("user_phone", upDateProfile.user_phone);
      param.append("action", "update_profile");

      param.append(
        "additional_contact_number",
        upDateProfile.additional_contact_number
      );

      upDateProfile.isLoder = true;
      setUpDateProfile({ ...upDateProfile });
      axios.post(`${Url}/ajaxfiles/profile_update.php`, param).then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          upDateProfile.isLoder = false;
          setUpDateProfile({ ...upDateProfile });
          toast.error(res.data.message);
        } else {
          upDateProfile.isLoder = false;
          setUpDateProfile({ ...upDateProfile });
          setRefresh(!refresh);
          setOnEdit(false);
          toast.success(res.data.message);
        }
      });
    }
  };
  const onSubmit = () => {
    if (!data.old_password) {
      toast.error("Old Password is is required");
    } else if (!data.new_password) {
      toast.error("New Password is required");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        data.new_password
      )
    ) {
      toast.error(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (!data.confirm_password) {
      toast.error("Confirm Password is required");
    } else if (data.new_password !== data.confirm_password) {
      toast.error("password is not same");
    } else {
      data.isLoder = true;
      setData({ ...data });
      const param = new FormData();
      param.append("old_password", data.old_password);
      param.append("new_password", data.new_password);
      param.append("confirm_password", data.confirm_password);
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      axios.post(Url  + "/ajaxfiles/change_password.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
          data.isLoder = false;
          setData({ ...data });
        } else {
          data.isLoder = false;
          setData({ ...data });
          toast.success(res.data.message);
          setChangePassword(false);
        }
      });
    }
  };
  const fetchUserPref = async () => {
    setMainLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios
      .post(`${Url}/ajaxfiles/get_user_prefrence.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        setMainLoader(false);
        setPrefrence(res.data);
        setUpDateProfile({
          first_name: res.data.user_first_name,
          last_name: res.data.user_last_name,
          user_phone: res.data.user_phone,
          city: res.data.city,
          state: res.data.state,
          user_country: res.data.user_country,
          gender: res.data.gender,
          dob: res.data.dob,
          address: res.data.address,
          additional_email: res.data.additional_email,
          additional_contact_number: res.data.additional_contact_number,

          isLoder: false,
        });
      });
  };
  useEffect(() => {
    fetchUserPref();
  }, [refresh]);
  toast.configure();

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
                {/* <Grid item sm={12}></Grid>
                <Grid item xl={1}></Grid> */}
                <Grid item xl={10} md={12} lg={12}>
                  <Grid container spacing={6}>
                    <Grid item md={12}>
                      {localStorage.getItem("is_ib_account") == "1" ? (
                        <Paper
                          elevation={1}
                          style={{ borderRadius: "10px" }}
                          className="w-100 mb-5"
                        >
                          <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                            <h5 className="font-weight-bold mb-0 text-dark">
                              My Reference Links
                            </h5>
                          </div>
                          <div className="divider"></div>
                          <div className="card-body position-relative">
                            <Grid
                              container
                              spacing={3}
                              style={{
                                marginLeft: "-12px",
                                marginRight: "-12px",
                              }}
                            >
                              <Grid item md={12}>
                                <FormControl>
                                  <label className="text-dark font-weight-bold form-label-head w-100">
                                    Sponsor Link
                                  </label>
                                  <div className="sponsorlink-content-section">
                                    <label className="text-info font-weight-bold w-100">
                                      <a>
                                        {Url +
                                          `/register/sponsor/${prefrence.wallet_code}`}
                                      </a>
                                    </label>
                                    <button
                                      className="copy_link"
                                      onClick={(e) => {
                                        navigator.clipboard
                                          .writeText(
                                            Url +
                                              `/register/sponsor/${prefrence.wallet_code}`
                                          )
                                          .then(
                                            function () {
                                              console.log(
                                                "Async: Copying to clipboard was successful!"
                                              );
                                              toast.success(
                                                "The sponsor link has been successfully copying"
                                              );
                                            },
                                            function (err) {
                                              console.error(
                                                "Async: Could not copy text: ",
                                                err
                                              );
                                              toast.error(
                                                "The sponsor link Could not copy, Please try again"
                                              );
                                            }
                                          );
                                      }}
                                    >
                                      <span className="blinking">
                                        <i className="material-icons">
                                          content_copy
                                        </i>
                                      </span>
                                    </button>
                                  </div>
                                </FormControl>
                              </Grid>
                              {/* <hr className="mt-2.5 mb-1"></hr>
                          <Grid item md={12}>
                            <FormControl>
                              <label className="text-dark font-weight-bold form-label-head w-100">
                                Sales Manager Link
                              </label>
                              <label className="text-info font-weight-bold w-100">
                              <a>{Url+'?salesmanagerId=272727'}</a>
                              </label>
                            </FormControl>
                          </Grid> */}
                            </Grid>
                          </div>
                        </Paper>
                      ) : (
                        ""
                      )}

                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 mb-5"
                      >
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <h5 className="font-weight-bold mb-0 text-dark">
                            My Profile
                          </h5>
                          <ColorButton
                            onClick={() => {
                              getCountries();
                              setOnEdit(true);
                            }}
                          >
                            Edit
                          </ColorButton>
                        </div>

                        <div className="divider"></div>
                        <div className="card-body position-relative">
                          <Grid
                            container
                            spacing={3}
                            style={{
                              marginLeft: "-12px",
                              marginRight: "-12px",
                            }}
                          >
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  FIRST NAME
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.user_first_name}
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  LAST NAME
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.user_last_name}
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  Gender
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.gender}
                                </label>
                              </FormControl>
                            </Grid>
                            <hr className="mt-2.5 mb-1"></hr>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  EMAIL ADDRESS
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.user_email}
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  MOBILE PHONE
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  +{prefrence.mobile_code}{" "}
                                  {prefrence.user_phone}
                                  {/* <span
                                  title="Verified"
                                  style={{ color: "rgb(24, 225, 165)" }}
                                >
                                  <CheckCircleIcon />
                                </span> */}
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  COUNTRY OF RESIDENCE
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.user_country}
                                </label>
                              </FormControl>
                            </Grid>
                            <hr className="mt-2 mb-1"></hr>
                            {/* <Grid item md={4}>
                            <FormControl>
                              <label className="text-dark font-weight-bold form-label-head w-100">
                                NATIONALITY
                              </label>
                              <label className="text-info font-weight-bold w-100"></label>
                            </FormControl>
                          </Grid> */}
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  State
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.state}
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  City
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.city}
                                </label>
                              </FormControl>
                            </Grid>{" "}
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  Address
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.address}
                                </label>
                              </FormControl>
                            </Grid>
                            <hr className="mt-2 mb-1"></hr>
                            {/* <Grid item md={12}>
                            <FormControl>
                              <label className="text-dark font-weight-bold form-label-head w-100">
                                ADDRESS
                              </label>
                              <label className="text-info font-weight-bold w-100"></label>
                            </FormControl>
                          </Grid>
                          <hr className="mt-2 mb-1"></hr> */}
                            <Grid item md={6}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  PASSWORD
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  * * * * * * * * * *
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              className="d-flex align-items-center"
                            >
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  <a
                                    className="text-primary cursor-pointer"
                                    onClick={() => setChangePassword(true)}
                                  >
                                    <CreateIcon />
                                    Change Client Password
                                  </a>
                                </label>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
        <Dialog
          open={onEdit}
          maxWidth="md"
          fullWidth={true}
          onClose={() => {
            setOnEdit(false);
          }}
        >
          <div className="d-flex align-items-center p-3">
            <h5 className="w-100 text-center text-primary m-0 font-weight-bold">
              Update Your Profile
            </h5>
            <Button
              sx={{ position: "absolute", right: "0px", color: "#2A3F73" }}
              onClick={() => {
                setOnEdit(false);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
          <DialogContent className="customscroll" maxWidth="lg">
            <Grid container spacing={6}>
              <Grid item md={12}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">First Name</div>
                      <FormControl className="w-100">
                        <BootstrapInput
                          name="first_name"
                          value={upDateProfile.first_name}
                          onChange={input1}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">Last Name</div>
                      <FormControl className="w-100">
                        <BootstrapInput
                          name="last_name"
                          value={upDateProfile.last_name}
                          onChange={input1}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">Gender</div>
                      <FormControl className="w-100">
                        <Select
                          name="gender"
                          value={upDateProfile.gender}
                          onChange={input1}
                          displayEmpty
                          inputProps={{
                            "aria-label": "Without label",
                          }}
                          input={<BootstrapInput />}
                          className="mt-0 ml-0"
                          id="fullWidth"
                        >
                          <MenuItem value="">Select Option</MenuItem>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">Date Of Birth</div>
                      <FormControl className="w-100">
                        <BootstrapInput
                          name="dob"
                          type="date"
                          value={upDateProfile.dob}
                          onChange={input1}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">Country</div>
                      <FormControl className="w-100">
                        <Select
                          name="user_country"
                          value={upDateProfile.user_country}
                          onChange={input1}
                          displayEmpty
                          inputProps={{
                            "aria-label": "Without label",
                          }}
                          input={<BootstrapInput />}
                          className="mt-0 ml-0"
                          id="fullWidth"
                        >
                          <MenuItem value="">Select Option</MenuItem>
                          {countryData.data.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.nicename}>
                                {item.nicename}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">City</div>
                      <FormControl className="w-100">
                        <BootstrapInput
                          name="city"
                          value={upDateProfile.city}
                          onChange={input1}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">State</div>
                      <FormControl className="w-100">
                        <BootstrapInput
                          name="state"
                          value={upDateProfile.state}
                          onChange={input1}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Grid>{" "}
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">Address</div>
                      <FormControl className="w-100">
                        <BootstrapInput
                          name="address"
                          value={upDateProfile.address}
                          onChange={input1}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Grid>{" "}
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">Phone Number</div>
                      <FormControl className="w-100">
                        <BootstrapInput
                          name="user_phone"
                          type="text"
                          // onChange={input1}
                          onChange={(e) => {
                            if (!isNaN(Number(e.target.value))) {
                              input1(e);
                            }
                          }}
                          value={upDateProfile.user_phone}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Grid>{" "}
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">Other Email</div>
                      <FormControl className="w-100">
                        <BootstrapInput
                          name="additional_email"
                          value={upDateProfile.additional_email}
                          onChange={input1}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Grid>{" "}
                  <Grid item md={6}>
                    <div className="mb-4">
                      <div className="font-weight-bold mb-2">
                        Other Phone Number
                      </div>
                      <FormControl className="w-100">
                        <BootstrapInput
                          name="additional_contact_number"
                          value={upDateProfile.additional_contact_number}
                          onChange={input1}
                          displayEmpty
                        />
                      </FormControl>
                    </div>
                  </Grid>{" "}
                  <Grid item md={6}></Grid>
                  <div className="" style={{ margin: "auto" }}>
                    {upDateProfile.isLoder ? (
                      <ColorButton className="addbankloder" disabled>
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
                      <ColorButton onClick={onEditProfile}>Save</ColorButton>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
      <Dialog
        open={changePassword}
        onClose={() => {
          setChangePassword(false);
        }}
      >
        <div className="d-flex align-items-center p-3">
          <h5 className="w-100 text-center text-primary m-0 font-weight-bold">
            Change Portal Password
          </h5>
          <Button
            sx={{ position: "absolute", right: "0px", color: "#2A3F73" }}
            onClick={() => {
              setChangePassword(false);
            }}
          >
            <CloseIcon />
          </Button>
        </div>
        <DialogContent className="customscroll" sx={{ width: "400px" }}>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <form>
                <div className="mb-4">
                  <div className="font-weight-bold mb-2">Old Password</div>
                  <FormControl className="w-100">
                    <BootstrapInput
                      name="old_password"
                      onChange={chpassword}
                      type={viewPassword.old ? "text" : "password"}
                      displayEmpty
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            onClick={() =>
                              setViewPassword({
                                old: !viewPassword.old,
                                new: viewPassword.new,
                              })
                            }
                            sx={{ color: "#2A3F73" }}
                          >
                            {viewPassword.old ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="mb-4">
                  <div className="font-weight-bold mb-2">New Password</div>
                  <FormControl className="w-100">
                    <BootstrapInput
                      name="new_password"
                      onChange={chpassword}
                      type={viewPassword.new ? "text" : "password"}
                      displayEmpty
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            onClick={() =>
                              setViewPassword({
                                old: viewPassword.old,
                                new: !viewPassword.new,
                              })
                            }
                          >
                            {viewPassword.new ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="mb-4">
                  <div className="font-weight-bold mb-2">Confirm Password</div>
                  <FormControl className="w-100">
                    <BootstrapInput
                      name="confirm_password"
                      onChange={chpassword}
                      displayEmpty
                    />
                  </FormControl>
                </div>

                <div className="mb-4 text-center">
                  {data.isLoder ? (
                    <ColorButton
                      type="submit"
                      sx={{ padding: "20px 55px" }}
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
                    <ColorButton onClick={onSubmit}>Save</ColorButton>
                  )}
                </div>
              </form>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
