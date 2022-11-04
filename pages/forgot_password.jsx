import { useState } from "react";
import axios from "axios";
import Link from "next/link";
//firebase
import { useRouter } from "next/router";
import { auth } from "/utils/firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Forgot_password = () => {
  const route = useRouter();
  // traking form inputs using useState
  const [inputs, setInputs] = useState({
    email: "",
    otp: "",
    password: "",
    phone: "",
  });
  const [errorMessages, setErrorMesssages] = useState({
    emailNotRegistered: false,
    phoneNumberLength: false,
    optSent: false,
    weakPassword: false,
  });
  const generateRecaptcha = () => {
    // creating a global variable
    window.recaptchaVerifier = new RecaptchaVerifier(
      "for-firebase-recaptcha-id-is-needed", // this is the id of the btn which triggers it
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  const loginWithPhoneNumber = (phone) => {
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((res) => {
        // console.log(res);
        window.confirmationResult = res;
      })
      .catch((err) => {
        console.dir(err);
      });
  };
  const verifyOtp = (otp) => {
    if (otp.length === 6) {
      // console.log(otp);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          // call for backend
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const getOtp = (e) => {
    e.preventDefault();
    if (inputs.phone.length >= 12) {
      loginWithPhoneNumber(inputs.phone);
    } else {
      setErrorMesssages((prev) => ({ ...prev, phoneNumberLength: true }));
    }
  };
  const resetPassword = (e) => {
    e.preventDefault();
    // verify OTP
    try {
      verifyOtp(inputs.otp);
      updatePassword();
      route.push("/");
    } catch (err) {
      return;
    }
    updatePassword();
  };
  const updatePassword = async () => {
    const data = {
      email: inputs.email,
      password: inputs.password,
      phone: inputs.phone,
    };
    const res = await axios.put("/api/student-forgot-password", data);
  };
  return (
    <div>
      <div className="container d-flex flex-column">
        <div
          className="row align-items-center justify-content-center
          min-vh-100"
        >
          <div className="col-12 col-md-8 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="mb-4">
                  <h4>Forgot Password? No Problem Chill</h4>
                  <p className="mb-2">
                    Enter your registered email ID and Phone to get OTP
                  </p>
                </div>
                <form className="row mt-4 needs-validation">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      value={inputs.email}
                      onChange={(e) => handleChange(e)}
                      placeholder="Enter Your Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={inputs.phone}
                      onChange={(e) => handleChange(e)}
                      placeholder="+9193534.... with countrycode no space"
                      required
                    />
                  </div>
                  <div className="mb-3 d-grid">
                    <button
                      id="for-firebase-recaptcha-id-is-needed" // lol
                      onClick={(e) => getOtp(e)}
                      type="submit"
                      className="btn btn-success"
                    >
                      Get OTP
                    </button>
                  </div>
                </form>
                <form className="row mt-4 needs-validation">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Enter OTP (6digits)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="otp"
                      placeholder="OTP"
                      value={inputs.otp}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      new Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="new password"
                      value={inputs.password}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div className="mb-3 d-grid">
                    <button
                      onClick={(e) => resetPassword(e)}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Reset Password
                    </button>
                  </div>
                  <span>
                    Don't have an account?{" "}
                    <Link href={"/register"}>Register</Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot_password;
