/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import AddressFrom from "./AddressFrom/AddressFrom";
import { useState } from "react";
import toast from "react-hot-toast";

const SingleReview = ({
  show,
  singleReview,
  setShow,
  refreshUnread,
  setRefreshUnread,
  refreshReview,
  setRefreshReview,
}) => {
  const { landlordName, city, state, review, location, rating, _id } =
    singleReview || {};

  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newAddress, setNewAddress] = useState(location);

  const handleSubmit = (event) => {
    event.preventDefault();
    const landlord = event.target.landlord.value;
    const review = event.target.review.value;

    const landlordName = landlord.toUpperCase();

    if (newAddress === "") {
      toast.error("Address field cannot be empty!");
      return;
    }

    const newReview = {
      id: _id,
      landlordName,
      city: newCity || city,
      state: newState || state,
      review: review,
      location: newAddress,
    };


    fetch("http://localhost:5000/api/v1/review/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Review updated successfully!");
          setShow("reviews");
          setRefreshUnread(refreshUnread + 1);
          setRefreshReview(refreshReview + 1);
        }
      });
  };

  const handleDeleteReport = () => {
    fetch(`http://localhost:5000/api/v1/review/delete/${singleReview?._id}`, {
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
          setShow("reviews");
          setRefreshUnread(refreshUnread + 1);
          setRefreshReview(refreshReview + 1);

        }
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <div className={`${show === "single" ? "" : "hidden"}`}>
      <h1 className="text-3xl md:text-5xl mt-20 md:mt-10 font-bold text-center">
        Single Review Page
      </h1>

      <form
        onSubmit={handleSubmit}
        
        className="mb-20"
      >
        <section className="border mt-10 min-h-full pb-10 rounded mx-5 md:mx-10 md:px-10 pt-5">
          {/* Landlord Name */}
          <div className="block md:flex ">
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
          <div className="block md:flex pt-5">
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

        <div className="mx-0 md:mx-60">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center  gap-4 mt-8 pb-20">
            <div className="flex md:block mt-10 md:mt-0">
              <button
                onClick={() => {
                  setShow("reviews");
                  window.scrollTo(0, 0);
                }}
                type="button"
                className="btn  bg-gray-400 text-white hover:bg-gray-500 w-[150px] mr-5"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteReport();
                }}
                type="button"
                className="btn  bg-red-600 text-white hover:bg-[#af1d1d] w-[150px]"
              >
                Delete
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="btn  bg-[#d6cc32] text-white hover:bg-[#b6ac2a] w-[150px]"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleReview;
