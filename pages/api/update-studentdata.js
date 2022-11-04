// /api/update-studentdata
// PUT
import { db } from "../../utils/connectDb";

export default function handler(req, res) {
  console.log(req.query.q);
  const { fname, lname, username, city, state, zip, markscard10 } = req.body;
  const q = `update students set fname="${fname}",lname="${lname}",username="${username}",city="${city}",state="${state}",zip="${zip}",markscard10="${markscard10}" where id=${req.query.q}`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ err });
    }
    if (data.length === 0) return res.status(404).json("somethingwent wrong");
    res.status(201).json("updated");
  });
}
