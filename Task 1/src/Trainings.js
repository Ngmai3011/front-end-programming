import {useRef, useState, useEffect} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import moment from "moment";

const Trainings = () => {
  const [data, setData] = useState([]);
  const gridRef = useRef();

  const getTraining = async () => {
    const response = await fetch(
      "http://traineeapp.azurewebsites.net/api//trainings"
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

  useEffect(() => {
    getTraining();
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
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (param) => {
        return moment(param.data.date).format("DD/MM/YYYY HH:MM");
      },
    },
    {
      field: "duration",
      headerName: "Duration in minutes",
      sortable: true,
      filter: true,
    },
    {
      field: "activity",
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
