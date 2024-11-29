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

const App = () => {
  const [show, setShow] = useState("reviews");
  const [singleReview, setSingleReview] = useState({});
  const [singleReport, setSingleReport] = useState({});
  const { user, refresh, setRefresh } = useContext(AuthContext);
  const [unread, setUnread] = useState(0);
  const [refreshUnread, setRefreshUnread] = useState(1);

  useEffect(() => {
    fetch("https://rate-the-landlord-server-1.onrender.com/api/v1/report/unread")
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
          <div className="flex ">
            <div className="w-2/12  min-h-screen bg-slate-100 pt-10">
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
                className={`text-[17px]  p-3 hover:bg-slate-200 cursor-pointer ${
                  show === "reviews" ? "bg-slate-200" : ""
                }`}
              >
                Reviews
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
                <h1>Reports</h1>{" "}
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
                <h1>Admin Auth</h1>{" "}
              </div>
              <div
                onClick={() => {
                  logout();
                }}
                className={`text-[17px]  p-3 hover:bg-slate-200 cursor-pointer mt-2 `}
              >
                Logout
              </div>
            </div>
            <div className="w-10/12  min-h-screen">
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
              />

              <Resources show={show} />
              <SingleReview
                show={show}
                setShow={setShow}
                singleReview={singleReview}
              />
              <ReportSinglePage
                show={show}
                setShow={setShow}
                singleReport={singleReport}
                refreshUnread={refreshUnread}
                setRefreshUnread={setRefreshUnread}
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
