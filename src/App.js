import React, { useState, useRef, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./componet/forms/register.css"
import Login from "./componet/forms/Login";
import ComingSoon from "./componet/sidebar/ComingSoon";
import Dashboard from "./componet/sidebar/Dashboard";
import Sidebar from "./componet/commonComponet/Sidebar";
import Header from "./componet/commonComponet/Header";
import "./App.css";
import Footer from "./componet/commonComponet/Footer";
import ForgotPassword from "./componet/forms/ForgotPassword";
import cookies from "js-cookie";
import Report from "./componet/sidebar/Report.jsx";
import { AccountList } from "./componet/sidebar/TradingAccounts/AccountList";
import { Deposite } from "./componet/sidebar/otherpage/Deposite";
import { ChangePassword } from "./componet/sidebar/otherpage/ChangePassword";
import { Withdrawal } from "./componet/sidebar/otherpage/Withdraw/Withdrawal";
// import { BankAccount } from "./componet/sidebar/otherpage/Withdraw/BankAccount";
import DepositHistory from "./componet/sidebar/OperationAccount/DepositHistory";
import WithdrawHistory from "./componet/sidebar/OperationAccount/WithdrawHistory";
import WebTrader from "./componet/sidebar/WebTrader";
import Desktop from "./componet/sidebar/Platforms/Desktop";
import Android from "./componet/sidebar/Platforms/Android.jsx";
import UserProfile from "./componet/sidebar/profile/UserProfile";
import MyDocuments from "./componet/sidebar/profile/MyDocuments";
import MyApplication from "./componet/sidebar/profile/MyApplication";
import BankAccountp from "./componet/sidebar/profile/BankAccountp";
import Activities from "./componet/sidebar/profile/Activities";
import Copytrading from "./componet/sidebar/copytrading/Copytrading";
import MasterCopy from "./componet/sidebar/copytrading/MasterCopy";
import OpenRealAccount from "./componet/sidebar/TradingAccounts/OpenRealAccount";
import OpenDemoaccount from "./componet/sidebar/TradingAccounts/OpenDemoaccount";
import ScrollIntoView from "./ScrollIntoView";
import { Partnership } from "./componet/sidebar/otherpage/Withdraw/Partnership";
import OpenChampionDemo from "./componet/sidebar/contests/OpenChampionDemo";
import ManageBonuses from "./componet/sidebar/TradingAccounts/ManageBonuses";
import Ticket from "./componet/sidebar/ticket/Ticket";
import ViewTicket from "./componet/sidebar/ticket/ViewTicket";
import IBCommisionGroup from "./componet/sidebar/otherpage/IBCommisionGroup";
import IBCommissionHistory from "./componet/sidebar/ibReport/IBCommissionHistory";
import IBWithdrawalReport from "./componet/sidebar/ibReport/IBWithdrawalReport";
import MyStructure from "./componet/sidebar/otherpage/MyStructure";
import MyClient from "./componet/sidebar/otherpage/MyClient";
import ResetPassword from "./componet/forms/ResetPassword";
import PammDashboard from "./componet/sidebar/pamm/PammDashboard";
import MoneyManager from "./componet/sidebar/pamm/MoneyManager";
import PammPortfolio from "./componet/sidebar/pamm/PammPortfolio";
import TradeHistory from "./componet/sidebar/pamm/TradeHistory";
import LoginAs from "./componet/sidebar/LoginAs";
import PammWithdrawalHistory from "./componet/sidebar/pamm/PammWithdrawalHistory";
import MoneyManagerProfile from "./componet/sidebar/pamm/MoneyManagerProfile";
import PammPortfolioProfile from "./componet/sidebar/pamm/PammPortfolioProfile";
import Iphone from "./componet/sidebar/Platforms/Iphone";
import { DemoAccounts } from "./componet/sidebar/TradingAccounts/DemoAccounts";
import Notification from "./componet/sidebar/otherpage/Notification";
import { ThemeProvider, createTheme } from "@mui/material";
import TradeAndWin from "./componet/sidebar/otherpage/tradeAndWin";
import PrizeLots from "./componet/sidebar/otherpage/prizeLots";
import DepositeTest from "./componet/sidebar/otherpage/DepositeTest";
import Cart from "./componet/sidebar/otherpage/cart";
import Shipping from "./componet/sidebar/otherpage/shipping";
import IBDashboard from "./ibdashbord/IBDashboard";
import RegisterTest from "./componet/forms/RegisterTest";
import { IsApprove, Url } from "./global";
import axios from "axios";
import EarnReport from "./componet/sidebar/OperationAccount/EarnReport";
import AffiliateDashboard from "./ibdashbord/AffiliateDashboard";
import Order_chart from "./componet/sidebar/fantastic/Order_chart";
import How_to_participate from "./componet/sidebar/fantastic/How_to_participate";
import Fantastic_tour from "./componet/sidebar/fantastic/Fantastic_tour";
import Deposite_in_Progress from "./componet/sidebar/deposit/Deposite_in_Progress";
import BonusDeshboard from "./componet/sidebar/Bonus/BonusDeshboard";
import HOW_TO_ACTIVE_BONUS from "./componet/sidebar/Bonus/HOW_TO_ACTIVE_BONUS";
import Deposite_in_Telegram from "./componet/sidebar/deposit/Deposite_in_Telegram";
import FamtasticHistory from "./componet/sidebar/fantastic/FamtasticHistory";
import { Affiliate } from "./componet/sidebar/otherpage/Withdraw/Affiliate";
import { AdditionalDocuments } from "./componet/sidebar/additionalDocuments/AdditionalDocuments";
import Withdrawal_in_Telegram from "./componet/sidebar/otherpage/Withdrawal_in_Telegram";
import AffiliatePromo from "./componet/AffiliatePromo";
import IbUserHistory from "./componet/sidebar/ibReport/IbUserHistory";
import Unity_IT_hubAndroid from "./componet/sidebar/Platforms/Unity_IT_hubAndroid";
import AffiliateProgram from "./ibdashbord/AffiliateProgram";
import { Helmet } from "react-helmet";
import Deposite_in_Approve from "./componet/sidebar/deposit/Deposite_in_Approve";
import InvestorsWithdrawal from "./componet/sidebar/profile/Investor_Withdrawal.jsx";
import MyInvestors from "./componet/myInvestors/MyInvestors.jsx";
import WalletHistory from "./componet/sidebar/OperationAccount/WalletHistory.jsx";

function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
const THEME = createTheme({
  typography: {
    fontFamily: `"Cairo",sans-serif`,
  },
});
var title = "";
var description = "";
const App = () => {
  var pathname = window.location.pathname;

  useScrollToTop();
  const [newtitle, setNewtitle] = useState({
    title: "",
    description: "",
  });
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const [login1, setLogin1] = useState(false);
  const [moveToib, SetMoveToib] = useState(false);
  const [moveAff, SetMoveAff] = useState(false);
  const navigate = useNavigate();
  const [firstCall, setFirstCall] = useState(true);

  const currentLanguageCode = cookies.get("i18next") || "en";
  const ref = useRef();
  const [sidebar, setSidebar] = useState(false);
  const [permission, setPermission] = useState({
    data: "",
  });

  const [bal, setBal] = useState({
    data: 0,
  });
  const [loader, setLoader] = useState(true);

  const fetchUserPref = async (prop) => {
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
          localStorage.setItem("login", true);

          setLogin("true");
        } else {
          setLoader(false);

          bal.data = res.data.balance;
          setBal({ ...bal });
          localStorage.setItem("login", false);
          setLogin("false");

          if (
            res.data.is_affiliate == 1 &&
            (localStorage.getItem("affiliate") == 1 ||
              pathname == "/Affiliatedashboard" ||
              pathname == "/AffiliatePromo" ||
              pathname == "/earnReport")
            // pathname == "/AffiliateProgram"
          ) {
            SetMoveAff(true);
          } else {
            SetMoveAff(false);
          }
          if (
            res.data.is_ib_account == 1 &&
            (localStorage.getItem("ibPortal") == 1 ||
              pathname == "/IBdashboard" ||
              pathname == "/ib_commission_history" ||
              pathname == "/ib_withdraw_history" ||
              pathname == "/IbUserHistory" ||
              pathname == "/partnership" ||
              pathname == "/ib_commision_group" ||
              pathname == "/my_client" ||
              pathname == "/fantasticHistory" ||
              pathname == "/How_to_participate" ||
              pathname == "/Fantastic_tour")
          ) {
            SetMoveToib(true);
          } else {
            SetMoveToib(false);
          }
          permission.data = res.data;
          setPermission({ ...permission });
          if (prop) {
            navigate(prop);
          }
        }
      });
  };

  useEffect(() => {
    Spath();

    var url = window.location.pathname.split("/");

    if (url.length > 1 && url[1] == "login_as") {
      localStorage.clear();
      setLoader(null);
    } else {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      axios
        .post(`${Url}/ajaxfiles/login_session_check.php`, param)
        .then((res) => {
          if (res.data.status == "error") {
            localStorage.setItem("login", true);
            setLogin("true");
          } else {
            localStorage.setItem("login", false);
            setLogin("false");
            fetchUserPref();
          }
        });
    }
  }, []);

  const Spath = () => {
    // console.log("permission.data.project_name",permission.data.project_name)
if(permission.data.project_name){
  if (pathname == "/login") {
    if (document.querySelector('meta[name="description"]')) {
      document.getElementById(
        "change_title"
      ).textContent = `Log in to your ${permission.data.project_name} Account`;
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          "content",
          `Login into your ${permission.data.project_name} Trading account with start trading forex, spot metals and stocks in your live or demo trading account, on Metatrader 5.`
        );
    }
  } else if (pathname == "/ForgotPassword") {
    if (document.querySelector('meta[name="description"]')) {
      document.getElementById(
        "change_title"
      ).textContent = `Reset your Account password | ${permission.data.project_name}`;
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          "content",
          `Forgot your ${permission.data.project_name} account password? Want to reset your password? Send us your email address and we will email you the instructions.`
        );
    }
  } else if (pathname == "/register") {
    if (document.querySelector('meta[name="description"]')) {
      document.getElementById(
        "change_title"
      ).textContent = `Open Forex Trading Account | ${permission.data.project_name}`;
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          "content",
          `Open a Forex Trading Account with ${permission.data.project_name}. Register now to enjoy full access to decision-supporting tools and up-to-date market analysis on our web trading platform`
        );
    }
  } else {
    if (document.querySelector('meta[name="description"]')) {
      document.getElementById(
        "change_title"
      ).textContent = `${permission.data.project_name}`;
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          "content",
          `${permission.data.project_name} is a global leader in forex broker offering forex trading, indices, commodities, tight spreads, stocks, and 24 hour live support. Our online forex trading platforms and apps are available on web, desktop and mobile.`
        );
    }
  }
}
   
  };
  useEffect(() => {
    Spath();
  }, [pathname]);
  const getwallet = () => {
    const param = new FormData();
    param.append("action", "view_balance");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("from_transfer", "wallet");
    axios.post(`${Url}/ajaxfiles/internal_transfer.php`, param).then((res) => {
      if (res.data.status == "error") {
        // Toast("error", res.data.message);
      } else {
        // setBal(res.data.balance);
        bal.data = res.data.balance;
        setBal({ ...bal });
      }
    });
  };
  const [clang, setClang] = useState();
  // console.log(title, description);
  if (login == "true" || localStorage.getItem("login") == null) {
    return (
      <ThemeProvider theme={THEME}>
        <div className="loginbg">
          {/* <Helmet>
            <title>{newtitle.title}</title>
            <meta charSet="utf-8" />
            <meta name="description" content={newtitle.description} />
            <meta property="og:title" content={newtitle.title} />
  <meta property="og:description" content="This is a brief description of the content when shared on social media."/>
          </Helmet> */}
          <Routes>
            {/* <Route exact path="/Register" element={<Register />} /> */}
            <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
            <Route
              exact
              path="/login/:id"
              element={
                <Login setLogin={setLogin} fetchUserPref={fetchUserPref} />
              }
            />
            <Route
              exact
              path="/login"
              element={
                <Login
                  fetchUserPref={fetchUserPref}
                  // getCallRefress={() => getCallRefress()}
                />
              }
            />
            <Route
              exact
              path="/register"
              element={
                <RegisterTest
                  setLogin={setLogin}
                  fetchUserPref={fetchUserPref}
                />
              }
            />
            {/* <Route exact path="/RegisterTest" element={<Register />} /> */}

            <Route
              exact
              path="/register/:id/:id1"
              element={
                <RegisterTest
                  setLogin={setLogin}
                  fetchUserPref={fetchUserPref}
                />
              }
            />

            <Route
              exact
              path="/register/:id"
              element={
                <RegisterTest
                  setLogin={setLogin}
                  fetchUserPref={fetchUserPref}
                  SITE_URL={permission.data.SITE_URL}
                />
              }
            />
            <Route
              exact
              path="/login_as/:id"
              element={
                <LoginAs setLogin={setLogin} fetchUserPref={fetchUserPref} />
              }
            />
            <Route
              exact
              path="/reset_password/:id/:id1"
              element={<ResetPassword />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </ThemeProvider>
    );
  } else {
    // fetchUserPref();
    return (
      <div className={clang == "rtl" ? "dir-ar-ae" : "dir-en-gb"}>
        {loader == true ? (
          <div className="loader1">
            <span className="loader2"></span>
          </div>
        ) : (
          <div
            className={
              sidebar
                ? "app-wrapper app-sidebar-mobile-open app-sidebar-fixed app-header-fixed"
                : "app-wrapper app-sidebar-fixed app-header-fixed"
            }
          >
            <Helmet>
              <title>{newtitle.title}</title>
              <meta charSet="utf-8" />
              <meta name="description" content={newtitle.description} />
            </Helmet>
            <Sidebar
              cside={sidebar}
              setSidebar={setSidebar}
              moveToib={moveToib}
              moveAff={moveAff}
              bal={bal.data}
              permission={permission.data}
              project_name={permission.data.project_name}
              SITE_URL={permission.data.SITE_URL}

            />
            <div className="app-main">
              <Header
                setSidebar={setSidebar}
                setClang={setClang}
                setLogin={setLogin}
                setMoveToib={SetMoveToib}
                SetMoveAff={SetMoveAff}
                moveAff={moveAff}
                permission={permission.data}
                moveToib={moveToib}
                project_name={permission.data.project_name}
                mt5server={permission.data.mt5server}
                SITE_URL={permission.data.SITE_URL}

              />
              <div className="app-content">
                <Routes>
                  {" "}
                  {/* <Route
                      exact
                      path="/"
                      element={<AffiliateDashboard setLogin={setLogin} />}
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/dashboard" replace />}
                    /> */}
                  {/* <Route
                  exact
                  path="/affiliate"
                  element={<Affiliate setLogin={setLogin} />}
                /> */}
                  {permission.data.is_affiliate == "1" ? (
                    <Route
                      exact
                      path="/Affiliatedashboard"
                      element={
                        <AffiliateDashboard
                          setLogin={setLogin}
                          permission={permission.data}
                        />
                      }
                    />
                  ) 
                  // : permission.data.affiliate_request_status == "0" ? (
                  //   <Route
                  //     exact
                  //     path="/affiliate"
                  //     element={<Affiliate setLogin={setLogin} />}
                  //   />
                  // )
                   : (
                    ""
                  )}
                  {permission.data.is_affiliate == "1" ? (
                    <Route
                      exact
                      path="/AffiliatePromo"
                      element={<AffiliatePromo permission={permission.data} />}
                    />
                  ) : (
                    ""
                  )}
                  {permission.data.is_affiliate == "1" ? (
                    <Route
                      exact
                      path="/AffiliateProgram"
                      element={
                        <AffiliateProgram permission={permission.data} project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>
                      }
                    />
                  ) : (
                    ""
                  )}
                  <Route
                    exact
                    path="/"
                    element={<Dashboard setLogin={setLogin} project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />

                  <Route
                    exact
                    path="/dashboard"
                    element={<Dashboard setLogin={setLogin} project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  <Route
                    exact
                    path="/login_as/:id"
                    element={<LoginAs setLogin={setLogin} />}
                  />
                  <Route exact path="/account_list" element={<AccountList />} />
                  {/* <Route
                    exact
                    path="/demo_account"
                    element={<DemoAccounts />}
                  /> */}
                  <Route
                    exact
                    path="/notification"
                    element={<Notification />}
                  />
                  <Route exact path="/Comingsoon" element={<ComingSoon />} />
                  <Route exact path="/reports" element={<Report />} />
                  <Route
                    exact
                    path="/deposit/:id"
                    element={<DepositeTest permission={permission.data} project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  {/* <Route exact path="/deposit/" element={<Deposite />} /> */}
                  {/* <Route
                    exact
                    path="/trade-and-win"
                    element={<TradeAndWin />}
                  />
                  <Route
                    exact
                    path="/trade-and-win/:id"
                    element={<TradeAndWin />}
                  /> */}
                  <Route exact path="/prize-lots" element={<PrizeLots />} />
                  <Route exact path="/cart" element={<Cart />} />
                  <Route
                    exact
                    path="/shipping"
                    element={<Shipping permission={permission.data} />}
                  />
                  <Route path="/bonus" element={<BonusDeshboard />} />
                  <Route
                    path="/HOW_TO_ACTIVE_BONUS"
                    element={<HOW_TO_ACTIVE_BONUS />}
                  />
                  {/* <Route exact path="/depositTest/" element={<DepositeTest />} /> */}
                  <Route
                    exact
                    path="/deposit"
                    element={<DepositeTest permission={permission.data} project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  {permission.data.ib_request_status == 0 ? (
                    <Route path="/partnership" element={<Partnership />} />
                  ) : (
                    ""
                  )}
                  {permission.data.is_affiliate == "1" ? (
                    <>
                      <Route path="/earnReport" element={<EarnReport />} />
                    </>
                  ) : (
                    ""
                  )}
                  <Route
                    exact
                    path="/Order_chart/:id"
                    element={<Order_chart />}
                  />
                  <Route
                    exact
                    path="/change_password"
                    element={<ChangePassword />}
                  />
                  <Route
                    exact
                    path="/change_password/:id"
                    element={<ChangePassword />}
                  />
                  <Route
                    exact
                    path="/deposit/:id/:id1"
                    element={<Deposite_in_Progress project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  <Route
                    exact
                    path="/deposit/t/:id"
                    element={<Deposite_in_Telegram project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  <Route
                    exact
                    path="/deposit_status/:id"
                    element={<Deposite_in_Approve project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  <Route
                    exact
                    path="/withdrawal"
                    element={<Withdrawal getwallet={getwallet} project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  <Route
                    exact
                    path="/withdrawal/:id"
                    element={<Withdrawal getwallet={getwallet} project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  <Route
                    exact
                    path="/withdrawal/:id/:id1"
                    element={<Withdrawal getwallet={getwallet} project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  <Route
                    exact
                    path="/withdrawal/t/:id"
                    element={<Withdrawal_in_Telegram project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  {/* <Route exact path="/BankAccount" element={<BankAccount/>} /> */}
                  {/* <Route
                    exact
                    path="/internal_transfer"
                    element={<InternalTransfer getwallet={getwallet} />}
                  />
                  <Route
                    exact
                    path="/internal_transfer/:id"
                    element={<InternalTransfer getwallet={getwallet} />}
                  /> */}
                  <Route
                    exact
                    path="/deposit_history"
                    element={<DepositHistory />}
                  />
                  <Route
                    exact
                    path="/withdraw_history"
                    element={<WithdrawHistory />}
                  />
                  <Route
                    exact
                    path="/Wallet_History"
                    element={<WalletHistory />}
                  />
                  <Route exact path="/Web_Trader" element={<WebTrader  SITE_URL={permission.data.SITE_URL}/>} />
                  <Route
                    exact
                    path="/Platforms/desktop"
                    element={<Desktop  project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  <Route
                    exact
                    path="/Platforms/android"
                    element={<Android project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  <Route
                    exact
                    path={`/Platforms/${permission.data.project_name}Android`}
                    element={<Unity_IT_hubAndroid project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                  />
                  <Route exact path="/Platforms/iphone" element={<Iphone project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>} />
                  <Route
                    exact
                    path="/userProfile"
                    element={<UserProfile permission={permission.data} />}
                  />
                  <Route exact path="/myDocuments" element={<MyDocuments />} />
                  <Route
                    exact
                    path="/myApplications"
                    element={<MyApplication />}
                  />
                  <Route
                    exact
                    path="/bankAccounts"
                    element={<BankAccountp />}
                  />
                  <Route
                    exact
                    path="/investor_withdrawal"
                    element={<InvestorsWithdrawal />}
                  />
                  <Route
                    exact
                    path="/my_investors"
                    element={<MyInvestors />}
                  />
                  <Route
                    exact
                    path="/bankAccounts/:mt5_ac/:id"
                    element={<BankAccountp />}
                  />
                  <Route exact path="/activities" element={<Activities />} />
                  <Route exact path="/copytrading" element={<Copytrading project_name={permission.data.project_name} />} />
                  <Route path="/copytrading/:id" element={<Copytrading project_name={permission.data.project_name}/>} />
                  <Route path="/copytrading/:id" element={<Copytrading project_name={permission.data.project_name}/>} />
                  <Route
                    path="/open_real_account"
                    element={<OpenRealAccount />}
                  />
                  <Route
                    path="/open_demo_account"
                    element={<OpenDemoaccount />}
                  />
                  <Route
                    path="/Open_Champion_Demo_Contest_account"
                    element={<OpenChampionDemo project_name={permission.data.project_name} />}
                  />
                  <Route path="/Manage_Bonuses" element={<ManageBonuses  project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>} />
                  <Route path="/ticket" element={<Ticket />} />
                  <Route path="/view_ticket/:id" element={<ViewTicket />} />
                  <Route path="/pamm_dashboard" element={<PammDashboard />} />
                  <Route path="/pamm_manager_list" element={<MoneyManager />} />
                  <Route
                    path="/pamm_trade_history"
                    element={<TradeHistory />}
                  />
                  <Route
                    path="/additional_documents"
                    element={<AdditionalDocuments />}
                  />
                  <Route
                    path="/pamm_trade_history/:id"
                    element={<TradeHistory />}
                  />
                  <Route
                    path="/pamm_withdrawal_history"
                    element={<PammWithdrawalHistory />}
                  />
                  <Route path="/pamm_portfolio" element={<PammPortfolio />} />
                  <Route
                    path="/money_manager_profile/:id"
                    element={<MoneyManagerProfile />}
                  />
                  <Route
                    path="/portfolio_profile/:id"
                    element={<PammPortfolioProfile />}
                  />
                  {permission.data?.is_ib_account == 1 ? (
                    <>
                      <Route
                        exact
                        path="/IBdashboard"
                        element={
                          <IBDashboard
                            setLogin={setLogin}
                            permission={permission.data}
                          />
                        }
                      />
                      <Route
                        path="/ib_commission_history"
                        element={<IBCommissionHistory />}
                      />
                      <Route
                        path="/ib_withdraw_history"
                        element={<IBWithdrawalReport />}
                      />
                      <Route
                        path="/IbUserHistory"
                        element={<IbUserHistory />}
                      />
                      <Route path="/partnership" element={<Partnership />} />
                   
                      <Route path="/my_client" element={<MyClient />} />
                      {permission.data?.is_ib_account == 1 && permission.data?.commission_type !="fixed" ?   <Route
                        path="/ib_commision_group"
                        element={<IBCommisionGroup />}
                      />:""}
                      <Route path="/my_structure" element={<MyStructure />} />
                      <Route
                        exact
                        path="/fantasticHistory"
                        element={<FamtasticHistory />}
                      />
                      <Route
                        exact
                        path="/How_to_participate"
                        element={<How_to_participate  project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL}/>}
                      />
                      {/* <Route
                        exact
                        path="/Fantastic_tour"
                        element={<Fantastic_tour project_name={permission.data.project_name} SITE_URL={permission.data.SITE_URL} />}
                      /> */}
                    </>
                  ) : (
                    <></>
                  )}
                  {permission.data ? (
                    moveToib == true ? (
                      <Route
                        path="*"
                        element={<Navigate to="/IBdashboard" replace />}
                      />
                    ) : moveAff == true ? (
                      <Route
                        path="*"
                        element={<Navigate to="/Affiliatedashboard" replace />}
                      />
                    ) : (
                      <Route
                        path="*"
                        element={<Navigate to="/dashboard" replace />}
                      />
                    )
                  ) : (
                    ""
                  )}
                </Routes>

                <Footer
                  project_name={permission.data.project_name}
                  mt5server={permission.data.mt5server}
                  FACEBOOK_LINK={permission.data.FACEBOOK_LINK}
                  TWITTER_LINK={permission.data.TWITTER_LINK}
                  LINKEDIN_LINK={permission.data.LINKEDIN_LINK}
                  INSTAGRAM_LINK={permission.data.INSTAGRAM_LINK}
                  YOUTUBE_LINK={permission.data.YOUTUBE_LINK}
                  TELEGRAM_LINK={permission.data.TELEGRAM_LINK}
                  SNAPCHAT_LINK={permission.data.SNAPCHAT_LINK}
                  PINTEREST_LINK={permission.data.PINTEREST_LINK}
                  FRONT_SITE_URL={permission.data.FRONT_SITE_URL}
                  EMAIL_SUPPORT={permission.data.EMAIL_SUPPORT}

                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default App;
