/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import AddressFrom from "./AddressFrom/AddressFrom";
import toast from "react-hot-toast";

const ReportSinglePage = ({
  show,
  singleReport,
  setShow,
  refreshUnread,
  setRefreshUnread,
}) => {
  const { landlordName, city, state, review, location, rating, _id } =
    singleReport.review || {};

  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newAddress, setNewAddress] = useState("");

  console.log(newAddress);

  const handleSubmit = (event) => {
    event.preventDefault();
    const landlord = event.target.landlord.value;
    const review = event.target.review.value;

    const landlordName = landlord.toUpperCase();

    const newReview = {
      id: _id,
      landlordName,
      city: newCity,
      state: newState,
      review: review,
      location: newAddress,
    };

    console.log(newReview)

    fetch("https://rate-the-landlord-server-1.onrender.com/api/v1/review/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.status === "success") {
          toast.success("Review updated successfully!");
          setShow("reports");
          setRefreshUnread(refreshUnread + 1);
        }
      });
  };

  const handleDeleteReport = () => {
    fetch(`https://rate-the-landlord-server-1.onrender.com/api/v1/report/delete/${singleReport?._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the report");
        }
        return response.json(); // Parse JSON only when there’s a body
      })
      .then((data) => {
        if (data.status === "success") {
          toast.success("Report deleted successfully!");
          setShow("reports");
          setRefreshUnread(refreshUnread + 1);
        }
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <div className={`${show === "singleReport" ? "" : "hidden"}`}>
      <h1 className="text-5xl mt-10 font-bold text-center">
        Report Single Page
      </h1>

      <form onSubmit={handleSubmit} className="mb-20">
        <section className="border mt-10 min-h-full pb-10 mx-10 px-10 pt-5">
          <h1 className="text-2xl text-red-600 font-semibold mb-10 ml-4">
            Report : {singleReport?.report}
          </h1>

          {/* Landlord Name */}
          <div className="flex">
            <div className="form-control w-full px-3">
              <label className="label">
                <span className="label-text">Landlord</span>
              </label>
              <input
                type="text"
                placeholder="Landlord"
                name="landlord"
                defaultValue={landlordName}
                className="input input-bordered"
                required
              />
            </div>

            {/* City */}
            <div className="form-control w-full px-3">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                readOnly
                type="text"
                placeholder="City"
                value={city}
                className="input input-bordered"
                required
              />
            </div>
          </div>

          {/* State and Country */}
          <div className="flex pt-5">
            <div className="form-control w-full px-3">
              <label className="label">
                <span className="label-text">State</span>
              </label>
              <input
                readOnly
                type="text"
                placeholder="State"
                value={state}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control w-full px-3">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input
                readOnly
                className="input input-bordered"
                defaultValue={"United States"}
              />
            </div>
          </div>

          {/* Location */}
          <AddressFrom
            location={location}
            setNewCity={setNewCity}
            setNewState={setNewState}
            setNewAddress={setNewAddress}
          />

          {/* Rating */}
          <div className="mt-20 ml-4">
            <Rating
              style={{ maxWidth: 250, color: "yellow" }}
              readOnly={true}
              value={rating || 0} // Ensure a valid rating value
            />
          </div>

          {/* Review Text */}
          <div className="pt-8 mx-5">
            <label className="label">
              <span className="label-text">Review</span>
            </label>
            <textarea
              className="w-full input input-bordered border p-3 h-32"
              defaultValue={review}
              name="review"
              placeholder="Review text will appear here..."
            ></textarea>
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-between mx-40">
          <div className="flex justify-center gap-4 mt-8 pb-20">
            <button
              onClick={() => {
                setShow("reports");
                window.scrollTo(0, 0);
              }}
              type="button"
              className="btn bg-gray-400 text-white hover:bg-gray-500 w-[150px]"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteReport}
              type="submit"
              className="btn bg-red-600 text-white hover:bg-[#be1a1a] w-[150px]"
            >
              Delete
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-8 pb-20">
            <button
              type="submit"
              className="btn bg-[#d6cc32] text-white hover:bg-[#b6ac2a] w-[150px]"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportSinglePage;
