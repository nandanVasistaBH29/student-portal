import { db } from "../../utils/connectDb";

export default function handler(req, res) {
  const q = `delete from students where id=${req.query.q}`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ err });
    }
    if (data.length === 0) return res.status(404).json("somethingwent wrong");
    res.status(201).json("deleted");
  });
}
