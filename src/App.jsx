/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Home from "./Components/Home";
import Reports from "./Components/Reports";
import Reviews from "./Components/Reviews";
import Resources from "./Components/Resources";
import { AuthContext } from "./ContextApi/UserContext";
import Login from "./Components/Login";
import SingleReview from "./Components/SingleReview";
import ReportSinglePage from "./Components/ReportSinglePage";
import { Toaster } from "react-hot-toast";
import UpdateAuth from "./Components/UpdateAuth";
import { MdLibraryBooks } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { IoReorderThree } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const App = () => {
  const [show, setShow] = useState("reviews");
  const [singleReview, setSingleReview] = useState({});
  const [singleReport, setSingleReport] = useState({});
  const { user, refresh, setRefresh } = useContext(AuthContext);
  const [unread, setUnread] = useState(0);
  const [refreshUnread, setRefreshUnread] = useState(1);
  const [refreshReview, setRefreshReview] = useState(1);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/report/unread")
      .then((res) => res.json())
      .then((data) => {
        setUnread(data?.data?.length);
      });
  }, [refresh]);

  // Logout
  const logout = () => {
    localStorage.removeItem("landLordAdmin");
    setRefresh(refresh + 1);
    window.location.reload();
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {user ? (
        <div>
          {/* main parent div */}
          <div className="flex relative">
            {/* side navbar */}
            {/* ***************** side navbar for Big device ******** */}
            <div className="hidden md:block w-2/12  min-h-screen bg-slate-100 pt-10">
              <div
                onClick={() => {
                  setShow("reviews");
                }}
                className="cursor-pointer "
              >
                <h1 className="text-3xl font-bold text-center mb-10">
                  HOA Admin
                </h1>
              </div>

              {/* Reviews Page */}
              <div
                onClick={() => {
                  setShow("reviews");
                }}
                className={`text-[17px]  p-3 hover:bg-slate-200 cursor-pointer flex items-center ${
                  show === "reviews" ? "bg-slate-200" : ""
                }`}
              >
                <MdLibraryBooks />
                <h1 className="ml-3">Reviews</h1>
              </div>

              {/* Reports Page */}
              <div
                onClick={() => {
                  setShow("reports");
                  setUnread(0);
                }}
                className={`text-[17px]  p-3 hover:bg-slate-200 cursor-pointer mt-2 flex ${
                  show === "reports" ? "bg-slate-200" : ""
                }`}
              >
                <div className="flex items-center">
                  <HiOutlineDocumentReport />
                  <h1 className="ml-3">Reports</h1>{" "}
                </div>
                <p
                  className={
                    unread > 0
                      ? "ml-7 bg-red-600 rounded-full  w-[35px] text-center text-white"
                      : "hidden"
                  }
                >
                  {unread}
                </p>
              </div>

              <div
                onClick={() => {
                  setShow("auth");
                }}
                className={`text-[17px]  p-3 hover:bg-slate-200 cursor-pointer mt-2 flex ${
                  show === "auth" ? "bg-slate-200" : ""
                }`}
              >
                <div className="flex items-center">
                  <IoIosSettings />
                  <h1 className="ml-3">Settings</h1>{" "}
                </div>
              </div>
              <div
                onClick={() => {
                  logout();
                }}
                className={`text-[17px]  p-3 hover:bg-slate-200 cursor-pointer mt-2 `}
              >
                <div className="flex items-center">
                  <MdLogout />
                  <h1 className="ml-3">Logout</h1>
                </div>
              </div>
            </div>
            {/* ***************** side navbar for Small device ******** */}
            <div>
              {showNav ? (
                // Show Nav bar design for small devices
                <div className="min-h-screen w-[300px] absolute  bg-white z-50 shadow-2xl p-5 ">
                  <div>
                    <div className="flex items-center justify-between mb-10">
                      <h1
                        onClick={() => {
                          setShow("reviews");
                        }}
                        className="text-3xl font-bold text-start"
                      >
                        HOA Admin
                      </h1>
                      <div>
                        <RxCross2
                          size={30}
                          onClick={() => setShowNav(false)}
                          className="cursor-pointer ml-auto"
                        />
                      </div>
                    </div>

                    {/* Reviews Page */}
                    <div
                      onClick={() => {
                        setShow("reviews");
                        setShowNav(false)
                      }}
                      className={`text-[17px]  p-3 hover:bg-slate-200 cursor-pointer flex items-center rounded ${
                        show === "reviews" ? "bg-slate-200" : ""
                      }`}
                    >
                      <MdLibraryBooks />
                      <h1 className="ml-3">Reviews</h1>
                    </div>

                    {/* Reports Page */}
                    <div
                      onClick={() => {
                        setShow("reports");
                        setUnread(0);
                        setShowNav(false)
                      }}
                      className={`text-[17px]  p-3 hover:bg-slate-200 cursor-pointer mt-2 flex rounded ${
                        show === "reports" ? "bg-slate-200" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <HiOutlineDocumentReport />
                        <h1 className="ml-3">Reports</h1>{" "}
                      </div>
                      <p
                        className={
                          unread > 0
                            ? "ml-7 bg-red-600 rounded-full  w-[35px] text-center text-white"
                            : "hidden"
                        }
                      >
                        {unread}
                      </p>
                    </div>

                    <div
                      onClick={() => {
                        setShow("auth");
                        setShowNav(false)
                      }}
                      className={`text-[17px]  p-3 hover:bg-slate-200 cursor-pointer mt-2 flex rounded ${
                        show === "auth" ? "bg-slate-200" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <IoIosSettings />
                        <h1 className="ml-3">Settings</h1>{" "}
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        logout();
                        setShowNav(false)
                      }}
                      className={`text-[17px]  p-3 hover:bg-slate-200 cursor-pointer mt-2 rounded`}
                    >
                      <div className="flex items-center">
                        <MdLogout />
                        <h1 className="ml-3">Logout</h1>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Show three bars for small devices
                <div
                  onClick={() => {
                    setShowNav(true);
                  }}
                  className="absolute z-50 top-2 left-2 md:hidden p-1 "
                >
                  <IoReorderThree size={40} />
                </div>
              )}
            </div>
            <div className="w-full md:w-10/12  min-h-screen">
              {/* child component */}
              <Home show={show} />

              <Reports
                show={show}
                setShow={setShow}
                setSingleReport={setSingleReport}
                refreshUnread={refreshUnread}
              />

              <Reviews
                show={show}
                setShow={setShow}
                setSingleReview={setSingleReview}
                refreshReview={refreshReview}
                setRefreshReview={setRefreshReview}
              />

              <Resources show={show} />
              <SingleReview
                show={show}
                setShow={setShow}
                singleReview={singleReview}
                refreshUnread={refreshUnread}
                setRefreshUnread={setRefreshUnread}
                refreshReview={refreshReview}
                setRefreshReview={setRefreshReview}
              />
              <ReportSinglePage
                show={show}
                setShow={setShow}
                singleReport={singleReport}
                refreshUnread={refreshUnread}
                setRefreshUnread={setRefreshUnread}
                refreshReview={refreshReview}
                setRefreshReview={setRefreshReview}
              />
              <UpdateAuth
                show={show}
                setShow={setShow}
                refreshUnread={refreshUnread}
                setRefreshUnread={setRefreshUnread}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
};

export default App;
