import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
const Student = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [student, setStudent] = useState(null);
  const [anyChanges, setAnyChanges] = useState(false);
  const [success, setSuccess] = useState(false);
  const fetchStudent = async () => {
    const res = await axios.get(`/api/get-studentdata?id=${slug}`);

    setStudent(res.data[0]);
  };
  useEffect(() => {
    fetchStudent();
  }, [slug]);
  const handleChange = (e) => {
    setAnyChanges(true);
    setSuccess(false);
    setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    setSuccess(false);
    e.preventDefault();
    console.log(slug);
    if (anyChanges) {
      const res = await axios.put(`/api/update-studentdata?q=${slug}`, student);
      // instead of sending entire student data its better to send only those fields to change
      // but when the form gets big its complicated and cumbursome to keep track
      setAnyChanges(false);
      setSuccess(true);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const res = await axios.delete(`/api/delete-studentdata?q=${slug}`);
    console.log(res);
    setSuccess(true);
    router.push("/dashboard");
  };
  return (
    <>
      {student ? (
        <form className="row mt-4 needs-validation">
          <div className="col-md-4  mt-2">
            <label htmlFor="validationCustom01" className="form-label">
              First name
            </label>
            <input
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
              type="email"
              className="form-control"
              name="email"
              value={student.email}
              onChange={(e) => {
                handleChange(e);
              }}
              disabled
              required
            />
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={student.phone}
              onChange={(e) => {
                handleChange(e);
              }}
              disabled
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
              type="text"
              className="form-control"
              required
              name="zip"
              value={student.zip}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Please provide a valid zip.</div>
          </div>

          {/* security issue */}
          {/* <div className="col-md-4 mt-2">
            <label htmlFor="validationCustom06" className="form-label">
              10th marks card
            </label>
            <input
              type="file"
              className="form-control"
              id="10th"
              name="markscard10"
              value={student.markscard10}
              onChange={
                (e) => {
                  handleFileChange("10th", e);
                } //pass the id
              }
              required
            />
            <div className="invalid-feedback">
              Please provide your 10th markscard
            </div>
          </div> */}

          <div className="d-flex m-2 p-2">
            {success && (
              <div class="alert alert-success" role="alert">
                Successfully updated
              </div>
            )}
            {anyChanges && (
              <button
                onClick={(e) => handleUpdate(e)}
                type="submit"
                className="mx-2 btn btn-success"
              >
                Update
              </button>
            )}
            <button
              onClick={(e) => handleDelete(e)}
              type="submit"
              className="mx-2 btn btn-danger"
            >
              Delete
            </button>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Student;
