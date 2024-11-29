/* eslint-disable react/prop-types */
const Home = ({ show }) => {
  return (
    <div
      className={`${
        show === "home" ? "flex justify-center items-center mt-20" : "hidden"
      } `}
    >
      <h1 className="text-4xl font-bold">
        Welcome To HOA Admin Dashboard
      </h1>
    </div>
  );
};

export default Home;
