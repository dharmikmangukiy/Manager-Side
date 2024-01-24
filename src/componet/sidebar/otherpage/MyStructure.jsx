import React, { useEffect, useState } from "react";
import TopButton from "../../customComponet/TopButton";
import { Grid, Paper } from "@mui/material";
import { IsApprove, Url } from "../../../global.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./otherpage.css";
import CommonTable from "../../customComponet/CommonTable.jsx";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const MyStructure = () => {
  const navigate = useNavigate();
  const [mainLoader, setMainLoader] = useState(true);
  const [Display, setDisplay] = useState();
  const [filterData, setFilterData] = useState({});
  const [resData, setResData] = useState({});
  const [param, setParam] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [TableState, setTableState] = useState();
  const [updateDate, setUpdateDate] = useState({
    structure_id: "",
    sponsor_approve: "",
    remarks: "",
    structure_name: "",
    structure_data: [],
    isLoader: false,
    refresh: false,
    admin_approve: "",
  });

  const column = [
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
      name: "script name",
      selector: (row) => {
        return <span title={row.script_name}>{row.script_name}</span>;
      },
      // wrap: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "total commission",
      selector: (row) => {
        return <span title={row.total_commission}>{row.total_commission}</span>;
      },
      // wrap: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "level 1",
      selector: (row) => {
        return (
          <span title={row.commission_level_1}>{row.commission_level_1}</span>
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "level 2",
      selector: (row) => {
        return (
          <span title={row.commission_level_2}>{row.commission_level_2}</span>
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "level 3",
      selector: (row) => {
        return (
          <span title={row.commission_level_3}>{row.commission_level_3}</span>
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "level 4",
      selector: (row) => {
        return (
          <span title={row.commission_level_4}>{row.commission_level_4}</span>
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "level 5",
      selector: (row) => {
        return (
          <span title={row.commission_level_5}>{row.commission_level_5}</span>
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "level 6",
      selector: (row) => {
        return (
          <span title={row.commission_level_6}>{row.commission_level_6}</span>
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "level 7",
      selector: (row) => {
        return (
          <span title={row.commission_level_7}>{row.commission_level_7}</span>
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "level 8",
      selector: (row) => {
        return (
          <span title={row.commission_level_8}>{row.commission_level_8}</span>
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "level 9",
      selector: (row) => {
        return (
          <span title={row.commission_level_9}>{row.commission_level_9}</span>
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "level 10",
      selector: (row) => {
        return (
          <span title={row.commission_level_10}>{row.commission_level_10}</span>
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
  ];
  const [searchBy, setSearchBy] = useState([
    {
      label: "structure name",
      value: false,
      name: "structure_name",
    },
  ]);
  useEffect(() => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_my_assigned_structure");
    axios
      .post(Url + "/ajaxfiles/partnership_request_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        // setLeverageForm(res.data.data);
        setDisplay(res.data);
        setTableState(res.data.aaData);
        updateDate.structure_data = res.data.data;
        setMainLoader(false);
        setUpdateDate({ ...updateDate });
      });
  }, []);

  console.log(TableState);
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            // <div className="loader1">
            //   <div className="clock">
            //     <div className="pointers"></div>
            //   </div>
            // </div>
            <div className="loader1">
              <span className="loader2"></span>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <Grid container>
                    <Grid item md={12}>
                      <p className="main-heading">My Structure</p>
                      {Display.show_fixed_comission_data == false &&
                        Display.commission_type !== "fixed" && (
                          <div>
                            <Paper
                              elevation={1}
                              style={{ borderRadius: "10px" }}
                              className="w-100 "
                            >
                              <div className="main-content-input .partnership-main-section">
                                <div className="ib-structure view-commission-content-section">
                                  {updateDate?.structure_data?.map(
                                    (item, index) => {
                                      return (
                                        <div className="group-structure-section">
                                          <div className="main-section">
                                            <div className="main-section-title">
                                              {item.ib_group_name}
                                            </div>
                                            <div className="main-section-input-element">
                                              <div>
                                                {/* <span>Rebate</span> */}
                                                <input
                                                  type="number"
                                                  className="Rebate_amount"
                                                  placeholder="Rebate"
                                                  value={item.group_rebate}
                                                  disabled
                                                  onChange={(e) => {
                                                    var floatNumber =
                                                      e.target.value.split(".");
                                                    if (
                                                      !isNaN(
                                                        Number(e.target.value)
                                                      )
                                                    ) {
                                                      if (
                                                        floatNumber.length ==
                                                          1 ||
                                                        (floatNumber.length ==
                                                          2 &&
                                                          floatNumber[1]
                                                            .length <= 3)
                                                      ) {
                                                        updateDate.structure_data[
                                                          index
                                                        ]["group_rebate"] =
                                                          e.target.value;
                                                        updateDate.structure_data[
                                                          index
                                                        ]["pair_data"].forEach(
                                                          (
                                                            value,
                                                            valueIndex
                                                          ) => {
                                                            updateDate.structure_data[
                                                              index
                                                            ]["pair_data"][
                                                              valueIndex
                                                            ]["rebate"] =
                                                              e.target.value;
                                                          }
                                                        );
                                                        setUpdateDate({
                                                          ...updateDate,
                                                        });
                                                      }
                                                    } else if (
                                                      e.target.value == "" ||
                                                      e.target.value == 0
                                                    ) {
                                                      updateDate.structure_data[
                                                        index
                                                      ]["group_rebate"] = 0;
                                                      updateDate.structure_data[
                                                        index
                                                      ]["pair_data"].forEach(
                                                        (value, valueIndex) => {
                                                          updateDate.structure_data[
                                                            index
                                                          ]["pair_data"][
                                                            valueIndex
                                                          ]["rebate"] = 0;
                                                        }
                                                      );
                                                      setUpdateDate({
                                                        ...updateDate,
                                                      });
                                                    }
                                                  }}
                                                />
                                              </div>
                                              <div>
                                                {/* <span>Commission</span> */}
                                                <input
                                                  type="number"
                                                  className="commission_amount"
                                                  placeholder="Commission"
                                                  value={item.group_commission}
                                                  disabled
                                                  onChange={(e) => {
                                                    var floatNumber =
                                                      e.target.value.split(".");
                                                    if (
                                                      !isNaN(
                                                        Number(e.target.value)
                                                      )
                                                    ) {
                                                      if (
                                                        floatNumber.length ==
                                                          1 ||
                                                        (floatNumber.length ==
                                                          2 &&
                                                          floatNumber[1]
                                                            .length <= 3)
                                                      ) {
                                                        updateDate.structure_data[
                                                          index
                                                        ]["group_commission"] =
                                                          e.target.value;
                                                        updateDate.structure_data[
                                                          index
                                                        ]["pair_data"].forEach(
                                                          (
                                                            value,
                                                            valueIndex
                                                          ) => {
                                                            updateDate.structure_data[
                                                              index
                                                            ]["pair_data"][
                                                              valueIndex
                                                            ]["commission"] =
                                                              e.target.value;
                                                          }
                                                        );
                                                        setUpdateDate({
                                                          ...updateDate,
                                                        });
                                                      }
                                                    } else if (
                                                      e.target.value == "" ||
                                                      e.target.value == 0
                                                    ) {
                                                      updateDate.structure_data[
                                                        index
                                                      ]["group_commission"] = 0;
                                                      updateDate.structure_data[
                                                        index
                                                      ]["pair_data"].forEach(
                                                        (value, valueIndex) => {
                                                          updateDate.structure_data[
                                                            index
                                                          ]["pair_data"][
                                                            valueIndex
                                                          ]["commission"] = 0;
                                                        }
                                                      );
                                                      setUpdateDate({
                                                        ...updateDate,
                                                      });
                                                    }
                                                  }}
                                                />
                                              </div>
                                              {/* <div>
                                    {
                                      (item.ibGroup != undefined) ?
                                        <Autocomplete
                                        className='autoComplete-input-remove-border'
                                          disablePortal
                                          options={item.ibGroup}
                                          getOptionLabel={(option) => (option ? option.ib_group_name : "")}
                                          onInputChange={(event, newInputValue) => {
                                            // fetchAccount(event, newInputValue);
                                          }}
                                          onChange={(event, newValue) => {
                                            updateDate.structure_data[index]['ib_group_level_id'] = newValue.ib_group_level_id;
                                            setUpdateDate({
                                              ...updateDate
                                            });
                                          }}

                                          renderInput={(params) => <TextField {...params} label="IB Group" variant="standard" style={{ width: '100%', border: '0px !important' }} />}
                                        /> : ''
                                    }
                                  </div> */}
                                            </div>
                                            <div className="action-section">
                                              <span
                                                onClick={(e) => {
                                                  updateDate.structure_data[
                                                    index
                                                  ]["is_visible"] =
                                                    !item.is_visible;
                                                  setUpdateDate({
                                                    ...updateDate,
                                                  });
                                                }}
                                              >
                                                <i
                                                  class={`fa ${
                                                    item.is_visible
                                                      ? "fa-angle-up"
                                                      : "fa-angle-down"
                                                  }`}
                                                  aria-hidden="true"
                                                ></i>
                                              </span>
                                            </div>
                                          </div>
                                          <div
                                            className={`pair-section ${
                                              item.is_visible
                                                ? "child-section-visible"
                                                : ""
                                            }`}
                                          >
                                            {item?.pair_data?.map(
                                              (item1, index1) => {
                                                return (
                                                  <div className="pair-data">
                                                    <div className="pair-data-title">
                                                      {item1.pair_name}
                                                    </div>
                                                    <div>
                                                      <input
                                                        type="number"
                                                        disabled
                                                        className="rebert_amount"
                                                        placeholder="Rebert"
                                                        value={item1.rebate}
                                                        onChange={(e) => {
                                                          var floatNumber =
                                                            e.target.value.split(
                                                              "."
                                                            );
                                                          if (
                                                            !isNaN(
                                                              Number(
                                                                e.target.value
                                                              )
                                                            )
                                                          ) {
                                                            if (
                                                              floatNumber.length ==
                                                                1 ||
                                                              (floatNumber.length ==
                                                                2 &&
                                                                floatNumber[1]
                                                                  .length <= 3)
                                                            ) {
                                                              updateDate.structure_data[
                                                                index
                                                              ]["pair_data"][
                                                                index1
                                                              ]["rebate"] =
                                                                e.target.value;
                                                              setUpdateDate({
                                                                ...updateDate,
                                                              });
                                                            }
                                                          } else if (
                                                            e.target.value ==
                                                              "" ||
                                                            e.target.value == 0
                                                          ) {
                                                            updateDate.structure_data[
                                                              index
                                                            ]["pair_data"][
                                                              index1
                                                            ]["rebate"] = 0;
                                                            setUpdateDate({
                                                              ...updateDate,
                                                            });
                                                          }
                                                        }}
                                                      />
                                                    </div>
                                                    <div>
                                                      <input
                                                        type="number"
                                                        className="commission_amount"
                                                        placeholder="Commission"
                                                        disabled
                                                        value={item1.commission}
                                                        onChange={(e) => {
                                                          var floatNumber =
                                                            e.target.value.split(
                                                              "."
                                                            );
                                                          if (
                                                            !isNaN(
                                                              Number(
                                                                e.target.value
                                                              )
                                                            )
                                                          ) {
                                                            if (
                                                              floatNumber.length ==
                                                                1 ||
                                                              (floatNumber.length ==
                                                                2 &&
                                                                floatNumber[1]
                                                                  .length <= 3)
                                                            ) {
                                                              updateDate.structure_data[
                                                                index
                                                              ]["pair_data"][
                                                                index1
                                                              ]["commission"] =
                                                                e.target.value;
                                                              setUpdateDate({
                                                                ...updateDate,
                                                              });
                                                            }
                                                          } else if (
                                                            e.target.value ==
                                                              "" ||
                                                            e.target.value == 0
                                                          ) {
                                                            updateDate.structure_data[
                                                              index
                                                            ]["pair_data"][
                                                              index1
                                                            ]["commission"] = 0;
                                                            setUpdateDate({
                                                              ...updateDate,
                                                            });
                                                          }
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                                <div></div>
                              </div>
                            </Paper>
                          </div>
                        )}
                      {Display.show_fixed_comission_data == false &&
                        Display.commission_type == "fixed" && (
                          <div>
                            <Paper
                              elevation={1}
                              style={{ borderRadius: "10px" }}
                              className="w-100 "
                            >
                              <Grid item md={12}>
                                <p className="main-heading text-center p-3">
                                  {" "}
                                  <DoneOutlineIcon
                                    style={{
                                      fontSize: "45px",
                                      color: "green",
                                      marginRight: "15px",
                                    }}
                                  />
                                  {Display.show_fixed_comission_lebel}
                                </p>
                              </Grid>
                            </Paper>
                          </div>
                        )}
                      {Display.show_fixed_comission_data === true && (
                        <div>
                          <Paper
                            elevation={1}
                            style={{ borderRadius: "10px" }}
                            className="w-100 "
                          >
                            <Paper
                              elevation={2}
                              style={{ borderRadius: "10px" }}
                              className="pending-all-15px"
                            >
                              <CommonTable
                                url={`${Url}/ajaxfiles/partnership_request_manage.php`}
                                column={column}
                                sort="1"
                                action="get_my_assigned_structure"
                                search={searchBy}
                                refresh={refresh}
                                param={param}
                                searchWord={searchKeyword}
                                setResData={setResData}
                              />
                            </Paper>
                          </Paper>
                        </div>
                      )}
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

export default MyStructure;
