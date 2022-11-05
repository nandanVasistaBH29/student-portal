// /api/get-all-studentdata
// GET
import { db } from "../../utils/connectDb";

export default function handler(req, res) {
  let q = "select * from students ";
  const querydb = req.query.querydb;
  if (querydb) {
    q = q + querydb;
  }

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ err });
    }
    if (data.length === 0) return res.status(404).json("Not an admin");
    const allStudent = [];
    for (let i = 0; i < data.length; i++) {
      const { password, ...other } = data[i];
      allStudent.push(other);
    }
    res.status(200).json(allStudent);
  });
}
