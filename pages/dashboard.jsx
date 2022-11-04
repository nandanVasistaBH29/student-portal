import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
const Dashboard = () => {
  const [students, setStudents] = useState("");
  const fetchAllStudents = async (sqlQuery) => {
    const res = await axios.get(`/api/get-all-studentdata?querydb=${sqlQuery}`);
    setStudents(res.data);
  };

  return (
    <Container className="mt-2">
      {students ? (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">FirstName</th>
              <th scope="col">Email</th>
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
          <button onClick={fetchAllStudents} className="btn btn-success">
            To Load Data - click here
          </button>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
