// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../utils/connectDb";
import bcrypt from "bcryptjs";
export default function handler(req, res) {
  console.log(req.body.password);
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
      "insert into students(fname,lname,username,password,city,state,zip,markscard10,email) values (?)";
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
    ];
    db.query(q, [values], (err, data) => {
      if (err) {
        return res.json({ err });
      }
      return res.status(200).json("user has been created");
    });
  });
}
