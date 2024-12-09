import { useContext, useState } from "react";
import { AuthContext } from "../ContextApi/UserContext";

const Login = () => {
  const [error, setError] = useState("");
  const { refresh, setRefresh } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleLoginSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    setError("");

    const email = event.target.email.value;
    const password = event.target.password.value;

    fetch(`http://localhost:5000/api/v1/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          localStorage.setItem("landLordAdmin", JSON.stringify(data.data));
          setRefresh(refresh + 1);
          setLoading(false);
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <div>
      <div className="min-h-screen hero bg-base-200">
        <div className="flex-col hero-content">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-[400px] shrink-0 shadow-2xl">
            <form onSubmit={handleLoginSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
              </div>
              <p className="text-center text-red-600">{error}</p>
              <div className="mt-6 form-control">
                <button className="btn btn-primary">
                  <span
                    className={`loading loading-spinner ${
                      loading ? "" : "hidden"
                    }`}
                  ></span>
                  <h1 className="ml-3">Login</h1>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
