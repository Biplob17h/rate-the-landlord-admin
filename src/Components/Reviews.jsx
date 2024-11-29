/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Reviews = ({ show, setSingleReview, setShow }) => {
  // State to store the selected filters
  const [search, setSearch] = useState({
    landlord: "",
    sort: "newest",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  // state to store review
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  // Handle filter changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle clearing the filters
  const clearFilters = () => {
    setSearch({
      landlord: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    });
    setRefresh(refresh + 1);
  };

  // Handle updating the filters
  const updateFilters = () => {
    setLoading(true);
    fetch(
      `https://rate-the-landlord-server-1.onrender.com/api/v1/review/all?landlord=${search?.landlord}&sort=${search?.sort}&state=${search?.state}&city=${search?.city}`
    )
      .then((response) => response.json())
      .then((data) => setReviews(data?.data));
    setLoading(false);
  };

  // All Use Effect
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://rate-the-landlord-server-1.onrender.com/api/v1/review/all?landlord=${search?.landlord}&sort=${search?.sort}&country=${search?.country}&state=${search?.state}&city=${search?.city}&zip=${search?.zipCode}`
    )
      .then((response) => response.json())
      .then((data) => setReviews(data?.data));
    setLoading(false);
  }, [refresh]);

  return (
    <div className={`${show === "reviews" ? "" : "hidden"}`}>
      {/******** Upper text section *********/}
      <div>
        <h1 className="text-4xl font-bold text-center my-16 ">All Reviews</h1>
      </div>
      {/* Main section */}
      <div className="flex">
        {/* Review section */}
        <section className="w-9/12">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <ClipLoader color="#d6cc32" size={110} />
            </div>
          ) : (
            <div>
              {reviews.map((review) => (
                <div
                  onClick={() => {
                    setSingleReview(review);
                    setShow("single");
                    window.scrollTo(0, 0);
                  }}
                  key={review?._id}
                  className="m-5 rounded-2xl cursor-pointer "
                >
                  <div className="mb-5 mx-auto min-h-[350px] shadow-lg border rounded-2xl flex">
                    <div className="w-5/12 bg-gray-50 min-h-[350px]  pt-4 flex flex-col items-center justify-start rounded-2xl">
                      <div
                        className=" w-full text-center px-2 
                      "
                      >
                        <h1 className="font-[500] text-[19px]">
                          {review?.landlordName}
                        </h1>
                      </div>
                      <div className="mt-2">
                        <Rating
                          style={{ maxWidth: 140, color: "yellow" }}
                          value={review?.totalRating}
                          readOnly={true}
                        />
                      </div>
                      <div className="text-center mt-5">
                        <h1>{review?.location}</h1>
                      </div>

                      <div>
                        <h1 className="mt-3 text-[#6B7280]">{review?.date}</h1>
                      </div>
                    </div>

                    <div className="w-7/12  min-h-[350px]  pt-4 flex flex-col items-start justify-start p-3">
                      <h1 className="font-[500] text-[16px]">{`Written Review`}</h1>
                      <p className="mt-5 text-[14px]">{review?.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        {/* Filters section */}
        <section className="w-3/12 ">
          <div className="p-5  ">
            <div className="mb-4">
              <input
                type="text"
                name="landlord"
                value={search.landlord}
                onChange={handleInputChange}
                placeholder="Search Landlords"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <select
                name="sort"
                value={search.sort}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
              </select>
            </div>
            

            <div className="mb-4">
              <input
                type="text"
                name="state"
                value={search.state}
                onChange={handleInputChange}
                placeholder="Search State / Province"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="city"
                value={search.city}
                onChange={handleInputChange}
                placeholder="Search City"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={updateFilters}
                className="bg-[#d6cc32] text-white px-8 py-3 rounded-md"
              >
                Update
              </button>
              <button
                onClick={clearFilters}
                className="bg-gray-400 text-white px-8 py-3 rounded-md"
              >
                Clear
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reviews;
