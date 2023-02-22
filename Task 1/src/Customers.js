import {useRef, useState, useEffect} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const Customers = () => {
  const [data, setData] = useState([]);
  const gridRef = useRef();

  const getCustomers = async () => {
    const response = await fetch(
      "http://traineeapp.azurewebsites.net/api/customers"
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    const customerData = response.content;
    setData(customerData);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const columns = [
    {
      field: "firstname",
      sortable: true,
      filter: true,
    },
    {
      field: "lastname",
      sortable: true,
      filter: true,
    },
    {
      field: "email",
      sortable: true,
      filter: true,
    },
    {
      field: "phone",
      sortable: true,
      filter: true,
    },
    {
      field: "streetaddress",
      sortable: true,
      filter: true,
    },
    {
      field: "postcode",
      sortable: true,
      filter: true,
    },
    {
      field: "city",
      sortable: true,
      filter: true,
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{
        height: "700px",
        width: "100%",
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
