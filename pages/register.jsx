import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const Register = () => {
  const route = useRouter();
  // traking form inputs using useState
  const [inputs, setInputs] = useState({
    email: "",
    lname: "",
    fname: "",
    username: "",
    password: "",
    state: "",
    city: "",
    zip: "",
    markscard10: "",
  });

  const [checkIfEmailExists, setCheckIfEmailExists] = useState(false);
  const [WeakPassword, setWeakPassword] = useState(false);
  const handleSubmit = async (e) => {
    //form submit
    e.preventDefault();
    setWeakPassword(false);
    setCheckIfEmailExists(false);
    //id's of the input tag
    if (WeakPassword) {
      alert(
        "Its better to have Some Number and alpaha numeric characters in your password"
      );
    }
    try {
      const res = await axios.post("/api/register", inputs);
      console.log(res.data);
    } catch (err) {
      setCheckIfEmailExists(true);
      route.push("/login");
    }

    // setWrongWeakPassword(false) && setCheckIfEmailExists(false) first
    // make a query to db if the email already exists
    // if true setCheckIfEmailExists(true)
    // and return
    // else send email and password
    // and wait for the response
    // if password entered is wrong setWrongWeakPassword(true)
  };
  function checkForWeakPassword(password) {
    setWeakPassword(false);
    if (password.length < 8) setWeakPassword(true);
  }
  function handleFileChange(id, e) {
    const fileInput = document.getElementById(id);
    if (fileInput.files.length > 0) {
      const fileSize = fileInput.files.item(0).size;
      const fileMb = fileSize / 1024 ** 2;
      if (fileMb > 2)
        alert(
          "the uploaded file size is " + fileMb + " should be less than 2MB"
        );
      else {
        handleChange(e);
      }
    }
  }
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form className="row mt-4 needs-validation">
      <div className="col-md-4  mt-2">
        <label htmlFor="validationCustom01" className="form-label">
          First name
        </label>
        <input
          type="text"
          className="form-control"
          name="fname"
          value={inputs.fname}
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
          value={inputs.lname}
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
          value={inputs.email}
          onChange={(e) => {
            handleChange(e);
            checkForWeakPassword(e.target.value);
          }}
          required
        />
        {checkIfEmailExists && (
          <Link href={"/login"}>
            <div className="text-danger">
              Email Already Exists Please Login click here
            </div>
          </Link>
        )}
      </div>
      <div className="col-md-4 mt-2">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={inputs.password}
          onChange={(e) => {
            handleChange(e);
            checkForWeakPassword(e.target.value);
          }}
          required
        />
        {WeakPassword && <div className="text-danger">Weak Password</div>}
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
            value={inputs.username}
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
          value={inputs.city}
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
          value={inputs.state}
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
          value={inputs.zip}
          onChange={(e) => handleChange(e)}
        />
        <div className="invalid-feedback">Please provide a valid zip.</div>
      </div>
      <div className="col-md-4 mt-2">
        <label htmlFor="validationCustom06" className="form-label">
          10th marks card
        </label>
        <input
          type="file"
          className="form-control"
          id="10th"
          name="markscard10"
          value={inputs.markscard10}
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
      </div>

      <div className="col-12 mt-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="invalidCheck"
            required
          />
          <label className="form-check-label" htmlFor="invalidCheck">
            Agree to terms and conditions
          </label>
          <div className="invalid-feedback">
            You must agree before submitting.
          </div>
        </div>
      </div>
      <div className="col-12">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit form
        </button>
      </div>
    </form>
  );
};

export default Register;
