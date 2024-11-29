/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const Reports = ({ show, setSingleReport, setShow, refreshUnread }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    fetch("https://rate-the-landlord-server-1.onrender.com/api/v1/report/report/all")
      .then((res) => res.json())
      .then((data) => {
        setReports(data?.data);
        setLoading(false);
      });
  }, [refreshUnread]);

  return (
    <div className={`${show === "reports" ? "" : "hidden"}`}>
      {/******** Upper text section *********/}
      <div>
        <h1 className="text-4xl font-bold text-center my-16 ">All Reports</h1>
      </div>
      {/* Main section */}
      <div className="flex">
        {/* Review section */}
        <section className="w-full pr-10">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <ClipLoader color="#d6cc32" size={110} />
            </div>
          ) : (
            <div>
              {reports.length === 0 ? (
                <div>
                  <h1 className="text-2xl font-bold flex justify-center items-center text-black mt-20">No Reports For Now</h1>
                </div>
              ) : (
                <div>
                  {reports?.map((report) => (
                    <div
                      onClick={() => {
                        setSingleReport(report);
                        setShow("singleReport");
                        window.scrollTo(0, 0);
                      }}
                      key={report?.review?._id}
                      className="m-5 rounded-2xl cursor-pointer w-full"
                    >
                      <div className="m-5 rounded-2xl hidden md:block">
                        <div className="mb-5 mx-auto h-[250px] shadow-lg border rounded-2xl flex">
                          <div className="w-4/12 bg-gray-50 h-[250px] pt-6 flex flex-col items-center justify-start rounded-l-2xl">
                            <div className="w-full text-center px-2">
                              <h1 className="font-semibold text-xl">
                                {report?.review?.landlordName}
                              </h1>
                            </div>
                            <div className="w-full text-center px-2 mt-10">
                              <h1 className=" text-[16px] mx-3">
                                {report?.review?.location}
                              </h1>
                            </div>
                            <div className="mt-5">
                              <Rating
                                style={{ maxWidth: 130, color: "yellow" }}
                                value={report?.review?.rating}
                                readOnly={true}
                              />
                            </div>

                            <div>
                              <h1 className="mt-3 text-sm text-gray-600">
                                {report?.review?.date}
                              </h1>
                            </div>
                          </div>
                          <div className="w-4/12 border h-[250px] pt-6 flex flex-col px-3">
                            <h1 className="text-2xl font-semibold text-start">
                              Report:
                            </h1>
                            <p className="text-[17px] text-red-600 mt-3">
                              {report?.report}
                            </p>
                          </div>

                          <div className="w-4/12 min-h-[350px] pt-4 relative p-6">
                            <h1 className="font-semibold text-lg">
                              Written Review
                            </h1>
                            <p className="mt-5 text-sm text-gray-700">
                              {report?.review?.review}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Reports;
