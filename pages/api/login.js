// /api/login
// POST

import { db } from "../../utils/connectDb";
import bcrypt from "bcryptjs"; // to hash password
import jwt from "jsonwebtoken"; // for auth
import cookie from "cookie"; // for secured auth

export default function handler(req, res) {
  const q = "select * from students where email=?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ err });
    }
    if (data.length === 0)
      return res
        .status(404)
        .json("Email hasn't register Please register first");
    // compare password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    ); // true;
    if (!isPasswordCorrect)
      return res.status(404).json("Either Password or email is wrong");

    //using jwt
    const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);
    const { password, ...other } = data[0];
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access_token", token, {
        httpOnly: true,
        secure: false, // prod make it true https secure
        maxAge: 60 * 60 * 12, //12hrs
        sameSite: "strict",
        path: "/", //everywhere
      })
    );
    //Set-Cookie is the name of the header
    res.status(200).json(other);
  });
}
