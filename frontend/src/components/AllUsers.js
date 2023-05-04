import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useState } from "react";

function AllUsers() {
  const [person, setPerson] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3002/getPersons");
        const data = await response.json();
        setPerson(data);
      } catch {}
    }
    fetchData();
  }, []);
  const columns = [
    { name: "Person Name", selector: (row) => row.name },
    {
      name: "Age/sex",
      cell: (row) => `${row.age}/${row.sex}`
    },

    { name: "Sex", selector: (row) => row.sex },
    { name: "Mobile", selector: (row) => row.mobile },
    { name: "Address", selector: (row) => row.address },
    { name: "Govt Id", selector: (row) => row.govtId },
    { name: "Guardian Details", selector: (row) => row.guardian },
    { name: "Nationality", selector: (row) => row.nationality },
  ];

  return (
    <div>
      <DataTable columns={columns} data={person} />
    </div>
  );
}

export default AllUsers;
