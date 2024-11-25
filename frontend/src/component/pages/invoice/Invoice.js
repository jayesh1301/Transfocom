import { useState, useEffect } from "react";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@material-ui/core/Paper";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import PrintIcon from "@mui/icons-material/Print";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from "@mui/material/TablePagination";
import "./invoice.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import NumbersIcon from '@mui/icons-material/Numbers';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { formatDate } from "utils";
import { APP_BASE_PATH } from "Host/endpoint";

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      fontWeight:'bold',
      fontSize: "1em",
    },
  },
});

export default function Invoice() {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleRoute = () => {
    navigate("/newInvoice");
  };

  const [data, setData] = useState([]);
  const [serialNumber, setSerialNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${APP_BASE_PATH}/getinvoice`); // Replace with your API endpoint
        const jsonData = await response.json();

        setIsLoading(false);
        setFilterdata(jsonData);
        setRows(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    useEffect(() => {
    fetchData();
  }, []);

  const [filterdata, setFilterdata] = useState([]);
  const [query, setQuery] = useState("");

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    if (getSearch.length > 0) {
      const searchdata = rows.filter(
        (item) =>
          item.custname.toLowerCase().includes(getSearch) ||
          item.invoice_no.toLowerCase().includes(getSearch)
      );
      setRows(searchdata);
    } else {
      setRows(filterdata);
    }
    setQuery(getSearch);
  };

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    const newPage = Math.floor(page * rowsPerPage / newRowsPerPage); // Calculate the new page number
    setRowsPerPage(newRowsPerPage);
    setPage(newPage); // Update the current page to the new page number
  };

  const handleDelete = (id) => {
    fetch(`${APP_BASE_PATH}/deleteInvoice/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: "Item Deleted Successfully!!!!",
          icon: "success",
          iconHtml: "",
          confirmButtonText: "OK",
          animation: "true",
          confirmButtonColor: "green",
        });
        fetchData();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error !!!!",
          icon: "error",
          iconHtml: "",
          confirmButtonText: "OK",
          animation: "true",
          confirmButtonColor: "red",
        });
      });
  };
  return (
    <>
      <div
        class="d-flex justify-content-between"
        style={{ position: "relative", bottom: 13 }}
      >
        <div className="page_header">
          <h4>Invoice</h4>
        </div>
        <Button variant="contained"sx={{ background: "#00d284",
                                      "&:hover": {
                                        background: "#00d284", // Set the same color as the default background
                                      },}}   onClick={handleRoute}>
          New Invoice
        </Button>
      </div>

      <br />
      
           {rows.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color:'red',
              fontSize:'1.4em',
              fontFamily:'roboto'
            }}
          >
            <p>No records found.</p>
          </div>
        ) : (
        <div className={classes.root}>
          <div style={{ height: 400, width: "100%" }}>
            {/* <TextField
              placeholder="Search..."
              value={query}
              onChange={(e) => handlesearch(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              color="warning"
              sx={{
                marginLeft: "55rem",
                marginTop: "7px",
                marginBottom: "4px",
                width: 356,
              }}
            /> */}
            <TableContainer>
              {isLoading && (
                <div id="spinner">
                  {/* <BeatLoader color="#36D7B7" loading={isLoading} /> */}
                  <CircularProgress color="warning" loading={isLoading} />
                </div>
              )}
              <div className={classes.root}>
              <Table className="tabel">
                    <TableHead className="tableHeader">
                    <TableRow>
                      <TableCell className="MuiTableHead-root" align="center"> <NumbersIcon style={{ fontSize: "16px",marginRight:'2px' }} />Sr No</TableCell>

                      <TableCell className="MuiTableHead-root" align="center">
                      <TextSnippetIcon style={{ fontSize: "16px",marginRight:'2px' }} />
                        Invoice No
                      </TableCell>
                      <TableCell className="MuiTableHead-root" align="center">
                      <CalendarMonthIcon style={{ fontSize: "16px",marginRight:'2px' }} />
                        Invoice Date
                      </TableCell>
                      <TableCell className="MuiTableHead-root" align="center">

                        {" "}
                        <PersonIcon style={{ fontSize: "16px",marginRight:'2px' }} />
                        Buyer name
                      </TableCell>
                      <TableCell className="MuiTableHead-root" align="center"><ConfirmationNumberIcon style={{ fontSize: "16px",marginRight:'2px' }} />PO NO</TableCell>
                      <TableCell className="MuiTableHead-root" align="center">
                      <CalendarMonthIcon style={{ fontSize: "16px",marginRight:'2px' }} />
                        PO Date
                      </TableCell>
                      <TableCell className="MuiTableHead-root" align="center">
                      <AutoAwesomeIcon style={{ fontSize: "16px",marginRight:'2px' }} />
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item,index) => {
                        return (
                          <TableRow
                          className="tabelrow"
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={item.code}
                          >
                            <TableCell style={{textAlign:'center'}}>{serialNumber + index}</TableCell> 
                            <TableCell style={{textAlign:'center'}} key={item.i}>
                              {item.invoice_no}
                            </TableCell>
                            <TableCell style={{textAlign:'center'}} key={item.d}>{item.inv_date}</TableCell>
                            <TableCell style={{textAlign:'center'}} key={item.a}>{item.buyername}</TableCell>
                            <TableCell style={{textAlign:'center'}} key={item.h}>{item.po_no}</TableCell>
                            <TableCell style={{textAlign:'center'}} key={item.s}>
                              {formatDate(item.po_date)}
                            </TableCell>
                            <TableCell style={{textAlign:'center'}}>
                            <Link to={`/editInvoice/${item.id}`}>
              <Button
                size="small"
                variant="contained"
                sx={{ padding: "8px", background: "#00d284",
                "&:hover": {
                  background: "#00d284", // Set the same color as the default background
                },  }}
              >
                Edit
              </Button>
            </Link>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => handleDelete(item.id)}
              sx={{ marginLeft: "5px", padding: "8px", background: "#ff0854",
              "&:hover": {
                background: "#ff0854", // Set the same color as the default background
              }, }}
            >
              Delete
            </Button>
            <Button
              component={Link}
              to={`/Printinvoice/${item.id}`}
              variant="contained"
              sx={{
                marginLeft: "5px",
                padding: "8px",
                background: "#00cff4",
                "&:hover": {
                  background: "#00cff4", // Set the same color as the default background
                },
              }}
            >
              View and print
            </Button>
          </TableCell>
                           
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[20, 50,100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
        )}
     
    </>
  );
}
