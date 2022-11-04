// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../utils/connectDb";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default function handler(req, res) {
  const q = "select * from admin where email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ err });
    }
    if (data.length === 0) return res.status(404).json("Not an admin");

    //using jwt
    const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);
    const { password, ...other } = data[0];
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("admin_access_token", token, {
        httpOnly: true,
        secure: false, // prod make it true https secure
        maxAge: 60 * 60 * 12, //12hrs
        sameSite: "strict",
        path: "/", //everywhere
      })
    );
    res.status(200).json(other);
  });
}
