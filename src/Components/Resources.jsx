/* eslint-disable react/prop-types */
const Resources = ({show}) => {
  return (
    <div className={`${show === "resources" ? "" : "hidden"}`}>
      <h1>Resources</h1>
    </div>
  );
};

export default Resources;
