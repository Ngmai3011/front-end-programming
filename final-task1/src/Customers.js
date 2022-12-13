import React, {useRef} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const Customers = () => {
  const [data, setData] = React.useState([]);
  const gridRef = useRef();

  const fetchData = async () => {
    const response = await fetch(
      "https://customerrest.herokuapp.com/api/customers"
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    setData(response.content);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "firstname",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "lastname",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "streetaddress",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "postcode",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "city",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "email",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "phone",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{
        height: "700px",
        width: "60%",
        margin: "auto",
      }}
    >
      <AgGridReact
        ref={gridRef}
        onGridReady={(params) => (gridRef.current = params.api)}
        rowSelection="single"
        animateRows="true"
        columnDefs={columns}
        rowData={data}
      />
    </div>
  );
};

export default Customers;
