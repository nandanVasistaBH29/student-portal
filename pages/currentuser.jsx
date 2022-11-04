import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const Currentuser = () => {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    setErr(false);
    const studentEmail = JSON.parse(
      localStorage.getItem("student-portal-student-mail")
    );
    setEmail(studentEmail);
    console.log(studentEmail);
    if (!studentEmail) {
      setErr(true);
      route.push("/login");
      return;
    }
    setErr(false);
    fetchStudent(studentEmail);
  }, [email]);
  const fetchStudent = async (email) => {
    const res = await axios.get(`/api/get-studentdata?email=${email}`);
    setStudent(res.data[0]);
  };
  return (
    <div>
      {" "}
      {student ? (
        <form className="row m-4 needs-validation">
          <div className="col-md-4  mt-2">
            <label htmlFor="validationCustom01" className="form-label">
              First name
            </label>
            <input
              disabled
              type="text"
              className="form-control"
              name="fname"
              value={student.fname}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4 mt-2">
            <label htmlFor="validationCustom02" className="form-label">
              Last name
            </label>
            <input
              disabled
              type="text"
              className="form-control"
              name="lname"
              value={student.lname}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label">Email</label>
            <input
              disabled
              type="email"
              className="form-control"
              name="email"
              value={student.email}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label">Phone</label>
            <input
              disabled
              type="text"
              className="form-control"
              name="phone"
              value={student.phone}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
          </div>
          <div className="col-md-4 mt-2">
            <label htmlFor="validationCustomUsername" className="form-label">
              Username
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                disabled
                type="text"
                name="username"
                className="form-control"
                aria-describedby="inputGroupPrepend"
                required
                value={student.username}
                onChange={(e) => handleChange(e)}
              />
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <label htmlFor="validationCustom03" className="form-label">
              City
            </label>
            <input
              disabled
              type="text"
              className="form-control"
              name="city"
              required
              value={student.city}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>
          <div className="col-md-4 mt-2">
            <label htmlFor="validationCustom04" className="form-label">
              State
            </label>
            <input
              disabled
              type="text"
              className="form-control"
              id="validationCustom03"
              required
              name="state"
              value={student.state}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Please select a valid state.</div>
          </div>
          <div className="col-md-4 mt-2">
            <label htmlFor="validationCustom05" className="form-label">
              Zip
            </label>
            <input
              disabled
              type="text"
              className="form-control"
              required
              name="zip"
              value={student.zip}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Please provide a valid zip.</div>
          </div>

          <div className="d-flex m-2 p-2">
            <button
              onClick={(e) => handleUpdate(e)}
              type="submit"
              disabled
              className="mx-2 btn btn-success"
            >
              Update
            </button>

            <button
              onClick={(e) => handleDelete(e)}
              type="submit"
              disabled
              className="mx-2 btn btn-danger"
            >
              Delete
            </button>
            <h1>Only Admins can update and delete</h1>
          </div>
        </form>
      ) : (
        <>
          <div>Loading...</div>
          {err && <div className="text-danger">you have to log back in</div>}
        </>
      )}
    </div>
  );
};

export default Currentuser;
