import React, {useRef} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import moment from "moment";

const Trainings = () => {
  const [data, setData] = React.useState([]);
  const gridRef = useRef();

  const fetchTraining = async () => {
    const response = await fetch(
      "https://customerrest.herokuapp.com/api/trainings"
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    const trainingdatas = [];

    for (let i = 0; i < response.content.length; i++) {
      const response2 = await fetch(response.content[i].links[2].href)
        .then((response2) => response2.json())
        .catch((err) => console.error(err));

      let trainingdata = {
        ...response.content[i],
        ...response2,
      };
      trainingdatas.push(trainingdata);
    }

    setData(trainingdatas);
  };

  React.useEffect(() => {
    fetchTraining();
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
      field: "date",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellRenderer: (param) => {
        return moment(param.data.date).format("DD/MM/YYYY HH:MM");
      },
    },
    {
      field: "duration",
      headerName: "Duration in minutes",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "activity",
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
      }}>
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

export default Trainings;
