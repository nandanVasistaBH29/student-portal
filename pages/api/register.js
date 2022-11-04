// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../utils/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
export default function handler(req, res) {
  const q = "select * from students where email=?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ err });
    }
    if (data.length) return res.status(409).json("user already exists");
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "insert into students(fname,lname,username,password,city,state,zip,markscard10,email,phone) values (?)";
    const values = [
      req.body.fname,
      req.body.lname,
      req.body.username,
      hash,
      req.body.city,
      req.body.state,
      req.body.zip,
      req.body.markscard10,
      req.body.email,
      req.body.phone,
    ];
    db.query(q, [values], (err, data) => {
      if (err) {
        return res.json({ err });
      }
      console.log(data);
      //using jwt
      const token = jwt.sign(
        { id: Math.round(Math.random() * 10000) },
        process.env.JWT_KEY
      );
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
      console.log("====================================");
      console.log(token);
      console.log("====================================");
      //Set-Cookie is the name of the header
      return res.status(200).json("user has been created");
    });
  });
}
