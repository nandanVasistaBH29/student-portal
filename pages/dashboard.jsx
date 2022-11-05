import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
const Dashboard = () => {
  // can use one useState like in register page but these independent state varible of the component
  const [students, setStudents] = useState(""); // to set the table based on 3 types
  const [search, setSearch] = useState(""); // search bar
  const [customItem, setCustomItem] = useState(undefined); //for search
  const [err, setErr] = useState(false);
  const fetchAllStudents = async (sqlQuery) => {
    try {
      setErr(false);
      const res = await axios.get(
        `/api/get-all-studentdata?querydb=${sqlQuery}`
      );
      console.log(res);
      if (res.data) setStudents(res.data);
    } catch (err) {
      setErr(true);
    }
  };
  const handleSearchChange = async (e) => {
    try {
      setSearch(e.target.value);
      if (search) {
        const query = search + "";
        console.log("quert " + query);
        await fetchAllStudents(
          `where email like '%${query}%' or fname like '%${query}%';`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container className="m-2">
        <div className="d-flex">
          <button
            type="button"
            onClick={() => {
              setCustomItem("city");
              fetchAllStudents("order by city");
            }}
            className="btn btn-outline-success mx-2"
          >
            Order by City
          </button>
          <button
            type="button"
            onClick={() => {
              setCustomItem("state");
              fetchAllStudents(" order by state");
            }}
            className="btn btn-outline-success mx-2"
          >
            Order by State
          </button>
          <div className="input-group">
            <div className="form-outline d-flex">
              <input
                type="search"
                className="form-control"
                placeholder="search by email and first name"
                value={search}
                disabled
                onChange={(e) => handleSearchChange(e)}
              />
              <button className="btn btn-primary m-2">
                <label className="form-label" htmlFor="form1">
                  Search
                </label>
              </button>
            </div>
          </div>
        </div>
        {!err ? (
          <div>
            {students ? (
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">Email</th>
                    {customItem && <th scope="col">{customItem}</th>}
                    <th scope="col">SeeMoreInfo</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    return (
                      <tr key={student.id}>
                        <th scope="row">{student.id}</th>
                        <td>{student.fname}</td>
                        <td>{student.email}</td>
                        {customItem === "city" && (
                          <td scope="col">{student.city}</td>
                        )}
                        {customItem === "state" && (
                          <td scope="col">{student.state}</td>
                        )}
                        <Link
                          href={`/student/${student.id}`}
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                            cursor: "pointer",
                            background: "transparent",
                          }}
                        >
                          <td>See All Details</td>
                        </Link>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="d-flex p-2">
                <button
                  onClick={() => fetchAllStudents("")}
                  className="btn btn-success"
                >
                  To Load Data - click here
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-danger">No data like that</div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
