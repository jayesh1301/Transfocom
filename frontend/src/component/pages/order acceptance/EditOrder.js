

import React from "react";
import { useState, useEffect } from "react";
import "./order.css";
import { v4 as uuidv4 } from 'uuid';
import { Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { APP_BASE_PATH } from "Host/endpoint";
import { useRef } from "react";

const EditOrder = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    ostatus: "",
    custname: "",
    consumer_address: "",
    address: "",
    testing_div: "",
    type: "",
    quantity: "",
    advance: "",
    ponum: "",
    podate: "",
    basicrate: "",
    gstno:""
  });

  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqData = await fetch(`${APP_BASE_PATH}/editOrder/${id}`);
        const resData = await reqData.json();
        console.log(resData); 
        setData(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = (e) => {
    if (e.target.name === "type") {
      setData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
  
  
  useEffect(() => {
    if (data.fileflag) {
      setSelectedFile(data.fileflag); // Set the selected file based on data.fileflag
    }
  }, [data.fileflag]);

  
  const handleFile = (e) => {
    const file = e.target.files[0].name;
    setData({ ...data, poFile: file });
    setSelectedFile(file); 
  };
  
  const handleDate = (e) => {
    setData({ ...data, podate: e.$d });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      ostatus,
      consumer,
      testing_div,
      consumer_address,
      type,
      quantity,
      advance,
      fileflag,
      ponum,
      podate,
      basicrate,
      poFile,
      gstno
    } = data;
    
    const editInputvalue = {
      id,
      ostatus,
      consumer,
      testing_div,
      consumer_address,
      type,
      quantity,
      advance,
      fileflag,
      ponum,
      podate,
      basicrate,
      gstno
    };
  
    try {
      const res = await fetch(`${APP_BASE_PATH}/updateOrderAcceptance/` + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editInputvalue),
      });

      const resjson = await res.json();
      if (res.status === 400 || !resjson) {
        Swal.fire({
          title: "Please Fill Data!!!!",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "red",
        });
      } else {
        Swal.fire({
          title: "Data Updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "green",
        }).then(() => {
          navigate("/orderAcceptance"); // Redirect to the order acceptance page
        });
      }
    } catch {
      Swal.fire({
        title: "Data Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "green",
      });
      if (data.poFile) {
        const formData = new FormData();
        
        const fileName = `${Date.now()}-${id}-${data.poFile || "unknown"}`;
        formData.append("file", data.poFile);
        formData.append("poid", id);
        formData.append("fileName", fileName);

        fetch(`${APP_BASE_PATH}/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            navigate(-1);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        navigate(-1);
      }
    }
  };

  const onClose = () => {
    navigate(-1);
  };
  return (
    <>
      <div class="d-flex justify-content-between">
        <div className="page_header">
          <h4>Update Order</h4>
        </div>
        <Link to="/orderAcceptance" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{background: "#28a745"}}>
            Back
          </Button>
        </Link>
      </div>

      <Paper elevation={10}>
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "95%",

            marginLeft: "2rem",
          }}
        >
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="demo-select-small">Status</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Status"
                    placeholder="Status"
                    name="ostatus"
                    value={data.ostatus}
                    onChange={handleEdit}
                  >
                    <MenuItem value={1}>Accept</MenuItem>
                    <MenuItem value={2}>Cancel</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ width: "100%" }}
                  fullWidth
                  label="Customer Name"
                  id="customer"
                  
                 
                  name="custname"
                  value={data.custname}
                  onChange={handleEdit}
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ width: "100%" }}
                  label="Address"
                  id="contactPerson"
                  
                  name="consumer_address"
                  value={data.address}
                  onChange={handleEdit}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="gstno"
                  label="GST No"
                  name="gstno"
                 value={data.gstno}
                  
                  disabled
                />
              </Grid>
            </Grid>
            <br />
            <Button variant="contained" sx={{background: "#28a745"}}>
              Same As Above
            </Button>
            <br />
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  id="consumer"
                  
                  name="consumer"
                  value={data.consumer}
                  onChange={handleEdit}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  id="consumer_address"
                  
                  name="consumer_address"
                  value={data.consumer_address}
                  onChange={handleEdit}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Testing Div (Optional)"
                  id="testing_div"
                  
                  name="testing_div"
                  value={data.testing_div}
                  onChange={handleEdit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="demo-select-small">Type</InputLabel>
                  <Select
  labelId="demo-select-small"
  id="type"
  name="type"
  label="Type"
  value={data.type}
  onChange={handleEdit} // Pass the entire event object here
  defaultValue={data.type}
>
  <MenuItem value={1}>OUTDOOR</MenuItem>
  <MenuItem value={2}>INDOOR</MenuItem>
  <MenuItem value={3}>OUTDOOR/INDOOR</MenuItem>
</Select>


                </FormControl>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Quantity"z
                  id="quantity"
                  
                  name="quantity"
                  value={data.quantity}
                  onChange={handleEdit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Advance Rs."
                  id="advance"
                  
                  name="advance"
                  value={data.advance}
                  onChange={handleEdit}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="ponum"
                  label="PO No (Optional)"
                  name="ponum"
                  value={data.ponum}
                  onChange={handleEdit}
                />
              </Grid>
              <Grid className="date-pick-wrp" item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  label="PO Date"
                  //  defaultValue={dayjs(new Date())}
                    name="qdate"
                    value={dayjs(data.podate) || null}
                    onChange={handleDate}
                    format="DD/MM/YYYY"
                    placeholder
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="basicrate"
                  label="Basic Rate (Optional)"
                  name="basicrate"
                  value={data.basicrate}
                  onChange={handleEdit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Stack direction="row" alignItems="center" spacing={2}>
              <TextField
  fullWidth
  label="PO File"
  value={selectedFile || "No file is selected"}
  InputProps={{
    readOnly: true,
  }}
/>

         
      </Stack>
      
              </Grid>
             
            </Grid>
            <br />
            <Grid container spacing={1} sx={6}>
              <Grid style={{ paddingLeft: "20%" }} sx={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="success"
                    type="submit"
                    style={{ marginRight: "12px" ,background: "#28a745"}}
                  >
                    Update
                  </Button>

                 <NavLink to="/orderAcceptance"> <Button onClick={onClose} variant="contained" color="error">
                    Close
                  </Button></NavLink>

                  <Button variant="contained"
                    color="success"  style={{ marginLeft: "12px" ,background: "#28a745"}} onClick={() => inputRef.current.click()} >
            Edit PO File
          </Button>
          <input
            style={{ display: "none" }}
            accept="image/*"
            multiple
            type="file"
            name="poFile"
            onChange={handleFile}
            ref={inputRef}
          />
                </div>
              </Grid>
            </Grid>
            <br />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default EditOrder;
