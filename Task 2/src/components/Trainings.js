import {useRef, useState, useEffect} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Snackbar from "@mui/material/Snackbar";
import moment from "moment";
import DeleteTraining from "./DeleteTraining";

export default function Trainings() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const gridRef = useRef();

  const getTrainings = async () => {
    const response = await fetch(
      "https://traineeapp.azurewebsites.net/gettrainings"
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    setData(response);
  };

  const handleTrainingDeleted = (trainingId) => {
    fetch(`https://traineeapp.azurewebsites.net/api/trainings/${trainingId}`, {
      method: "DELETE",
    })
      .then((_) => {
        setMessage("Training Deleted");
        setOpen(true);
      })
      .then((_) => getTrainings())
      .catch((err) => console.error(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const columns = [
    {
      field: "",
      maxWidth: 130,
      cellRenderer: (params) => {
        return (
          <DeleteTraining
            targetTraining={params.data}
            onTrainingDeleted={handleTrainingDeleted}
          />
        );
      },
    },
    {
      field: "customer.firstname",
      maxWidth: 190,
      headerName: "Firstname",
      sortable: true,
      filter: true,
    },
    {
      field: "customer.lastname",
      maxWidth: 190,
      headerName: "Lastname",
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
      headerName: "Duration in mins",
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
      <Snackbar
        open={open}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        ContentProps={{
          sx: {
            background: "#8452a1",
            color: "white",
          },
        }}
      />
    </div>
  );
}
