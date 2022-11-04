import { db } from "../../utils/connectDb";

export default function handler(req, res) {
  const { id, email } = req.query;
  console.log(req.query);
  let q;
  if (id) q = `select * from students where id=${id};`;
  else q = `select * from students where email="${email}";`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ err });
    }
    if (data.length === 0) return res.status(404).json("Not an admin");
    const allStudent = [];
    console.log(data); // only one item you get it correctly
    //TODO:refactor
    for (let i = 0; i < data.length; i++) {
      const { password, ...other } = data[i];
      allStudent.push(other);
    }
    res.status(200).json(allStudent);
  });
}
