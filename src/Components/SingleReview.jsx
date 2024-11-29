/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";

const SingleReview = ({ show, singleReview }) => {
  const { landlordName, city, state, review, location, totalRating } =
    singleReview;

  return (
    <div className={`${show === "single" ? "" : "hidden"}`}>
      <h1 className="text-5xl mt-10 font-bold text-center">
        Single Review Page
      </h1>

      <form className=" mb-20">
        <section className="border mt-10 min-h-full pb-10 mx-10 px-10 pt-5">
          <div className="flex">
            <div className="form-control w-full px-3">
              <label className="label">
                <span className="label-text">LandLord </span>
              </label>
              <input
                type="text"
                placeholder="LandLord"
                defaultValue={landlordName}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full px-3">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                placeholder="city"
                defaultValue={city}
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="flex pt-5">
            <div className="form-control w-full px-3">
              <label className="label">
                <span className="label-text">State</span>
              </label>
              <input
                type="text"
                placeholder="State"
                defaultValue={state}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control w-full px-3">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input
                className="input input-bordered"
                defaultValue={"United States"}
              />
            </div>
          </div>
          <div className="flex pt-5">
            <div className="form-control w-full px-3">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="location"
                defaultValue={location}
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="mt-20 ml-4">
            <Rating
              style={{ maxWidth: 250, color: "yellow" }}
              value={totalRating}
              readOnly={true}
            />
          </div>
          <div className="pt-8 mx-5">
            <label className="label">
              <span className="label-text">Review</span>
            </label>
            <textarea
              className="w-full input input-bordered border p-3 h-32"
              defaultValue={review}
              readOnly
              name=""
              id=""
            ></textarea>
          </div>
        </section>

        {/* ***************************************************** */}
        {/* If client want to update at reviews the use this  */}
        {/* <div>
          <div className="flex justify-center gap-4 mt-8 pb-20">
            <button
              onClick={() => {
                setShow("reviews");
                window.scrollTo(0, 0);
              }}
              type="button"
              className="btn  bg-gray-400 text-white hover:bg-gray-500 w-[150px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn  bg-[#d6cc32] text-white hover:bg-[#b6ac2a] w-[150px]"
            >
              Update
            </button>
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default SingleReview;
