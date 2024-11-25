import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, IconButton } from "@mui/material";
import { useNavigate, Link, useParams, NavLink } from "react-router-dom";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import NumbersIcon from '@mui/icons-material/Numbers';
import "./order.css";
import TablePagination from "@mui/material/TablePagination";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Swal from "sweetalert2";

import { APP_BASE_PATH } from "Host/endpoint";
import dayjs from "dayjs";
import LoadingSpinner from "component/commen/LoadingSpinner";

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "#000000",
      fontSize: "1em",
      align: "center",
      fontWeight: "bold",
      
    },
  },
});

export default function Orderacceptance() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleRoute = () => {
    navigate("/newOrderAcceptance");
  };

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${APP_BASE_PATH}/getNewOrderAcc`); // Replace with your API endpoint
      const jsonData = await response.json();
      console.log("jsonData",jsonData)
      setData(jsonData);
      setRows(jsonData);
      setFilterdata(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally{
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [filterdata, setFilterdata] = useState([]);
  const [query, setQuery] = useState("");

  const handlesearch = (event) => {
    const getSearch = event.target.value.toLowerCase(); // Convert query to lowercase
    if (getSearch.length > 0) {
      const searchdata = filterdata.filter((item) => {
        // Check if the properties exist and are not null or undefined
        const custname = item.custname ? item.custname.toLowerCase() : '';
        const ref_no = item.ref_no ? item.ref_no.toLowerCase() : '';
        const capacity = item.capacity ? item.capacity.toLowerCase() : '';
        const testing_div = item.testing_div ? item.testing_div.toLowerCase() : '';
        const consumer = item.consumer ? item.consumer.toLowerCase() : '';

        // Check if any of the properties includes the search query
        return (
          custname.includes(getSearch) ||
          ref_no.includes(getSearch) ||
          capacity.includes(getSearch) ||
          testing_div.includes(getSearch) ||
          consumer.includes(getSearch)
        );
      });
      setRows(searchdata);
    } else {
      setRows(filterdata);
    }
    setQuery(getSearch);
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY");
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${APP_BASE_PATH}/deleteOrder/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      Swal.fire({
        title: "Item Deleted Successfully!!!!",
        icon: "success",
        iconHtml: "",
        confirmButtonText: "OK",
        animation: "true",
        confirmButtonColor: "green",
      });
  
      fetchData(); // Call the fetchData function to refresh the data
    } catch (error) {
      Swal.fire({
        title: "Error !!!!",
        icon: "error",
        iconHtml: "",
        confirmButtonText: "OK",
        animation: "true",
        confirmButtonColor: "red",
      });
    }finally{
      setIsLoading(false);
    }
  };
  
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    const newPage = Math.min(page, Math.floor(rows.length / newRowsPerPage));
    setRowsPerPage(newRowsPerPage);
    setPage(newPage); 
  };
  
  const onDownload = async (url) => {
    try {
      // Use a regular expression to extract the desired part of the file name
      const fileNameMatch = url.match(/(\bIMG\d{14}\.jpg\b)/i);
      const fileName = fileNameMatch ? fileNameMatch[0] : url;

      const reqData = await fetch(`${APP_BASE_PATH}/download/` + url)
        .then(function (response) {
          return response.blob();
        })
        .then(function (data) {
          var url = window.URL.createObjectURL(data);

          var a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          a.remove();
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
    {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
       
  
        <Grid item xs={6} style={{ marginRight:'82%' }}>
          <h4>Order Acceptance</h4>
        </Grid>
  
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ marginTop: "2px" }}
        >
         
          
        </Grid>
        
        <Grid container style={{ display: 'flex', alignItems: 'center' }}>
  <Grid item xs={6} >
    <TextField
      style={{ width: "500px", marginRight: '80px' }}
      className="Search"
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
      variant="outlined"
      size="small"
    />
  </Grid>
  <Grid item xs={6} style={{ textAlign: 'right' }}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#00d284",
        "&:hover": {
          background: "#00d284", // Set the same color as the default background
        },
      }}
      id="addenquirybtn"
      onClick={handleRoute}
    >
      New Order Acceptance
    </Button>
    
  </Grid>
</Grid>

        
        <Grid item xs={12}>
           
              <TableContainer className="table-container" component={Paper}>
                <Table size="small">
                <TableHead className="tableHeader">
                <TableRow>
                      <TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold",padding: '3px 10px 3px 4px ' }}>
                      <NumbersIcon style={{ fontSize: "14px" }} />
  Sr No
</TableCell>
<TableCell className="MuiTableHead-root"  style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold",padding: '3px 10px 3px 4px '}}>
<ContactMailIcon style={{ fontSize: "14px",marginRight:'2px' }} />
  Customer<br />  &nbsp; &nbsp; &nbsp;Name
</TableCell>
<TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold",padding: '3px 10px 3px 4px ' }}>
<TextSnippetIcon style={{ fontSize: "14px",marginRight:'2px' }} />
  Ref<br />  &nbsp; &nbsp; &nbsp;No
</TableCell>
<TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold",padding: '3px 10px 3px 4px ' }}>
<BatteryCharging20Icon style={{ fontSize: "14px",marginRight:'2px' }} />
  Capacity
</TableCell>
<TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold" ,padding: '3px 10px 3px 4px '}}>
<ElectricMeterIcon style={{ fontSize: "14px",marginRight:'2px' }} />
  Voltage<br />  &nbsp; &nbsp; &nbsp;Ratio
</TableCell>
<TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold",padding: '3px 10px 3px 4px ' }}>
<ContentPasteSearchIcon style={{ fontSize: "14px",marginRight:'2px' }} />
  Testing<br /> &nbsp; &nbsp; &nbsp;Div
</TableCell>
<TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold",padding: '3px 10px 3px 4px ' }}>
<ContactPageIcon style={{ fontSize: "14px",marginRight:'2px' }} />
  Consumer
</TableCell>
<TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold" ,padding: '3px 10px 3px 4px '}}>
<TextSnippetIcon style={{ fontSize: "14px",marginRight:'2px' }} />
 PO <br /> Number
</TableCell>
<TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold" ,padding: '3px 10px 3px 4px '}}>
<CalendarMonthIcon style={{ fontSize: "14px",marginRight:'2px' }} />
 PO <br />&nbsp;&nbsp; Date
</TableCell>

<TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold" ,padding: '3px 10px 3px 4px '}}>
<CheckCircleOutlineIcon style={{ fontSize: "14px",marginRight:'2px' }} />
  Status
</TableCell>
<TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold" ,padding: '3px 10px 3px 4px '}}>
<InsertDriveFileIcon style={{ fontSize: "14px",marginRight:'2px' }} />
  Po<br /> &nbsp; &nbsp; &nbsp;File
</TableCell>
<TableCell className="MuiTableHead-root" style={{color: "#000000",
                      align: "center",
                      fontWeight: "bold",textAlign:'center',padding: '3px 10px 3px 4px ' }}>
<AutoAwesomeIcon style={{ fontSize: "14px",marginRight:'2px'}} />
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
                        .map((item, index) => {
                          return (
                            <TableRow
                            className="tabelrow"
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={item.code}
                            >
                              <TableCell style={{textAlign:'center'}} key={item.id} >{index + 1}</TableCell>
                              <TableCell style={{textAlign:'center'}} key={item.b}> <div className="break-after-5-words">{item.custname} </div></TableCell>
                              <TableCell  key={item.a}>{item.ref_no}</TableCell>
                              <TableCell style={{textAlign:'center'}} key={item.z}>{item.capacity}</TableCell>
                              <TableCell style={{textAlign:'center'}} key={item.e}>{item.priratio}/{item.secratio}V</TableCell>
                              <TableCell style={{textAlign:'center'}} key={item.c}>{item.testing_div}</TableCell>
                              <TableCell style={{textAlign:'center'}} key={item.d}>
  <div className="break-after-5-words">
    {item.consumer}
  </div>
</TableCell>


<TableCell style={{textAlign:'center'}} key={item.x}>{item.ponum}</TableCell>
                              <TableCell style={{textAlign:'center'}} key={item.x}>{formatDate(item.podate)}</TableCell>
                              <TableCell style={{textAlign:'center'}} key={item.f}>
                                {item.ostatus === 1
                                  ? "Accepted"
                                  : item.ostatus === 2
                                    ? "Cancelled"
                                    : ""}
                              </TableCell>
                              <TableCell  style={{textAlign:'center'}} key={item.k}>
                                {item.fileflag ? (
                                  <Button onClick={() => onDownload(item.fileflag)}>
                                    View
                                  </Button>
                                ) : null}
                              </TableCell>
                              <TableCell style={{ whiteSpace: "nowrap", paddingLeft: "5px" ,textAlign:'center'}}>
                                <Link to={`/editOrder/${item.id}`}>
                                  <Button
                                    size="small"
                                    variant="contained"

                                    sx={{ padding: "8px",  background: "#00d284",
                                    "&:hover": {
                                      background: "#00d284", // Set the same color as the default background
                                    }, }}
                                  >
                                    Edit
                                  </Button>

                                </Link>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDelete(item.id)}
                                  sx={{ marginLeft: "5px", padding: "8px",background: "#ff0854",
                                  "&:hover": {
                                    background: "#ff0854", // Set the same color as the default background
                                  },}}
                                >
                                  Delete
                                </Button>

                                <Button
  component={Link}
  to={`/printorderacc/${item.id}`}
  variant="contained"
  sx={{
    marginLeft: "5px",
    padding: "8px",
    background: "#00cff4",
    color: "#fff", // Set the default text color
    '&:hover': {
      background: "#00cff4", // Change this to your desired hover background color
      color: "#fff", // Set the text color on hover to the same as the default text color
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
           
          </Grid>
        
        
      </Grid>
      )}
    </>
  );
}
