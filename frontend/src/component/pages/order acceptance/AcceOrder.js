import React, { useEffect, useState } from "react";
import "./order.css";
import { Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from 'uuid';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { APP_BASE_PATH } from "Host/endpoint";
import LoadingSpinner from "component/commen/LoadingSpinner";

const AddCustomers = () => {
  const [data, setData] = useState({
    qid: "",
    orderacc_date: new Date(),
    consignor: "",
    consignee: "",
    ref_no: "",
    consumer: "",
    testing_div: "",
    consumer_address: "",
    type: "",
    quantity: "",
    advance: "",
    fileflag: "",
    ponum: "",
    podate: new Date(),
    basicrate: "",
    poDate: "",
    gstno:""
  });
  const navigate = useNavigate();
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("qid");
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${APP_BASE_PATH}/getQuotDetail/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data)
      const { custname, type, address, qty, uid, cost,gstno } = data;
      
      setData((prevData) => ({
        ...prevData,
        type: +type,
        address,
        custname,
        quantity: qty,
        basicrate: cost,
        uid,
        gstno
      }));
  
      console.log('UID:', uid);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Optionally, you can show an error message to the user here
    }finally{
      setIsLoading(false)
    }
  };
  
  useEffect(() => {
    fetchData();
    
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to: ${value}`);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFile = (e) => {
    setData({ ...data, [e.target.name]: e.target.files });
  };
  const handleDate = (e) => {
    setData({ ...data, podate: e.$d });
  };

  // const addOrderAccp = async (e) => {
  //   e.preventDefault();

  //   const {
  //     orderacc_date,
  //     consignor,
  //     consignee,
  //     consumer,
  //     testing_div,
  //     consumer_address,
  //     type,
  //     quantity,
  //     advance,
  //     fileflag,
  //     ponum,
  //     podate,
  //     basicrate,
  //     poFile,
  //     uid,
  //   } = data;
  //   if (!orderacc_date||
     
      
  //     !consumer_address||
  //     !type||
  //     !quantity||
  //     !advance
     
  //     ){
  //       Swal.fire({
  //         title: "Please fill all the required fields!",
  //         icon: "error",
  //         iconHtml: "",
  //         confirmButtonText: "OK",
  //         animation: "true",
  //         confirmButtonColor: "red",
  //       });
  //       return;
  //   }else{
      
  //   const quot = await fetch(`${APP_BASE_PATH}/getAcceptanceNumber/${uid}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(function (response) {
  //       return response?.json();
  //     })
  //     .then(async (resp) => {
  //       const res = await fetch(`${APP_BASE_PATH}/addorderacc`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           qid: id,
  //           orderacc_date,
  //           consignor,
  //           consignee,
  //           ref_no: resp.refNo,
  //           consumer,
  //           testing_div: +testing_div,
  //           consumer_address,
  //           type: +type,
  //           quantity,
  //           advance,
  //           fileflag,
  //           ponum,
  //           podate,
  //           basicrate,
  //           ostatus: 1,
  //         }),
  //       })
  //         .then(function (response) {
  //           return response?.json();
  //         })
  //         .then(async (resp) => {
  //           Swal.fire({
  //             title: "Data Added Successfully",
  //             icon: "success",
  //             iconHtml: "",
  //             confirmButtonText: "OK",
  //             animation: "true",
  //             confirmButtonColor: "green",
  //           });
  //           if (poFile?.length) {
  //             const formData = new FormData();
  //             const fileName = `${Date.now()}-${resp.insertId}-${
  //               poFile[0].name
  //             }`;
  //             formData.append("file", poFile[0], fileName);
  //             formData.append("poid", resp.insertId);
  //             formData.append("fileName", fileName);
  //             fetch(`${APP_BASE_PATH}/upload`, {
  //               method: "POST",
  //               body: formData,
  //             })
  //               .then((response) => response.json())
  //               .then((result) => {
  //                 navigate("/orderAcceptance");
  //               })
  //               .catch((error) => {
  //                 console.error("Error:", error);
  //               });
  //           } else {
  //             navigate("/orderAcceptance");
  //           }
  //         });
  //     });
  // };
  // }
  const addOrderAccp = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const {
      orderacc_date,
      consignor,
      consignee,
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
      uid,
      gstno
    } = data;
  
    if (!orderacc_date ||
    
      !type ||
      !quantity ||
      !advance) {
      Swal.fire({
        title: "Please fill all the required fields!",
        icon: "error",
        iconHtml: "",
        confirmButtonText: "OK",
        animation: "true",
        confirmButtonColor: "red",
      });
      setIsLoading(false)
      return;
    }
  
    try {
      // Fetch the acceptance number
      const response = await fetch(`${APP_BASE_PATH}/getAcceptanceNumber/${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch acceptance number');
      }
  
      const resp = await response.json();
  
      // Add the order acceptance
      const addOrderResponse = await fetch(`${APP_BASE_PATH}/addorderacc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qid: id,
          orderacc_date,
          consignor,
          consignee,
          ref_no: resp.refNo,
          consumer,
          testing_div: +testing_div,
          consumer_address,
          type: +type,
          quantity,
          advance,
          fileflag,
          ponum,
          podate,
          basicrate,
          ostatus: 1,
          gstno
        }),
      });
  
      if (!addOrderResponse.ok) {
        throw new Error('Failed to add order acceptance');
      }
  
      const addOrderResp = await addOrderResponse.json();
  
      Swal.fire({
        title: "Data Added Successfully",
        icon: "success",
        iconHtml: "",
        confirmButtonText: "OK",
        animation: "true",
        confirmButtonColor: "green",
      });
  
      // Handle file upload if necessary
      if (poFile?.length) {
        const formData = new FormData();
        const fileName = `${Date.now()}-${addOrderResp.insertId}-${poFile[0].name}`;
        formData.append("file", poFile[0], fileName);
        formData.append("poid", addOrderResp.insertId);
        formData.append("fileName", fileName);
  
        const uploadResponse = await fetch(`${APP_BASE_PATH}/upload`, {
          method: "POST",
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload file');
        }
  
        await uploadResponse.json();
      }
  
      navigate("/orderAcceptance");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: 'error',
        icon: "error",
        iconHtml: "",
        confirmButtonText: "OK",
        animation: "true",
        confirmButtonColor: "red",
      });
    }finally{
      setIsLoading(false)
    }
  };
  
  const changeName = () => {
    setData((prevData) => ({
      ...prevData,
      consumer_address: prevData.address, // Corrected property name
      consumer: prevData.custname, // Corrected property name
    }));
  };

  return (
    <>
    {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
      <div
        class="d-flex justify-content-between"
        style={{ position: "relative", bottom: 13 }}
      >
        <div className="page_header">
          <h4>Accept Order</h4>
        </div>
        <Link to="/newOrderAcceptance" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{background: "#00d284",
                              "&:hover": {
                                background: "#00d284", // Set the same color as the default background
                              },}}>
            Back
          </Button>
        </Link>
      </div>

      <Paper elevation={10} style={{ marginTop: -11 }}>
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
          <Grid container spacing={2}>
  <Grid item xs={6}>
  <TextField
                
                  fullWidth
                  id="customer"
                  label="Customer Name Mr./Miss/Mrs"
                  labelprope
                  name="customer"
                  value={data.custname}
                  onChange={handleInputs}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
  </Grid>
  <Grid item xs={6}>
     <TextField
          fullWidth
                  id="contactPerson"
                  label="Address"
                  name="address"
                  value={data.address}
                  onChange={handleInputs}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
  </Grid>
  <Grid item xs={6}>
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
            <Button variant="contained" onClick={changeName}  sx={{background: "#00d284",
                                    "&:hover": {
                                      background: "#00d284", // Set the same color as the default background
                                    },}}>
              Same As Above
            </Button>
            <br />
            <br />
            <Grid container spacing={2}>
  <Grid item xs={6}>
  <TextField
                  fullWidth
                  id="consumer"
                  label="Consumer Name"
                  name="consumer"
                  value={data.consumer}
                  onChange={handleInputs}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
  </Grid>
  <Grid item xs={6}>
  <TextField
                  fullWidth
                  id="consumer_address"
                  label="Address"
                  name="consumer_address"
                  value={data.consumer_address}
                  onChange={handleInputs}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  
                />
  </Grid>
  <Grid item xs={6}>
  <TextField
                  fullWidth
                  id="testing_div"
                  label="Testing Div (Optional)"
                  name="testing_div"
                  value={data.testing_div}
                  onChange={handleInputs}
                  InputLabelProps={{
                    shrink: true,
                  }}
                 
                />
  </Grid>
  <Grid item xs={6}>
  <FormControl fullWidth style={{textAlign:'left'}}>
                  <InputLabel id="demo-select-small">Type</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="type"
                    name="type"
                    label="Type"
                    value={data.type}
                    onChange={(e) => handleInputs(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    defaultValue={data.type}
                  >
                    <MenuItem value={1}>OUTDOOR</MenuItem>
                    <MenuItem value={2}>INDOOR</MenuItem>
                    <MenuItem value={3}>OUTDOOR-INDOOR</MenuItem>
                  </Select>
                </FormControl>
  </Grid>
  <Grid item xs={6}>
  <TextField
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  value={data.quantity}
                  onChange={handleInputs}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
  </Grid>
  <Grid item xs={6}>
  <TextField
                  fullWidth
                  id="advance"
                  label="Advance Rs."
                  name="advance"
                  value={data.advance}
                  onChange={handleInputs}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
  </Grid>
  <Grid item xs={6}>
  <TextField
                  fullWidth
                  id="ponum"
                  label="PO No (Optional)"
                  name="ponum"
                  value={data.ponum}
                  onChange={handleInputs}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
  </Grid>
  <Grid item xs={6}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    defaultValue={dayjs(new Date())}
    label="PO Date"
    name="qdate"
    onChange={handleDate}
    format="DD-MM-YYYY"
    InputLabelProps={{
      shrink: true,
    }}
    required
    sx={{
      width: '100%', // Set the width to 100%
    }}
  />
</LocalizationProvider>

  </Grid>
  <Grid item xs={6}>
  <TextField
      fullWidth
      id="basicrate"
      label="Basic Rate (Optional)"
      name="basicrate"
      value={data.basicrate}
      onChange={handleInputs}
      InputLabelProps={{
        shrink: true,
      }}
      required
      style={{ width: "100%", height: "3rem" }}
    />
  </Grid>
  <Grid item xs={6}>
  <Button variant="outlined" component="label">
        PO File
        <input
          style={{ position: "relative", left: 20, width: "38vw", height: "3rem" }} 
          accept="image/*"
          multiple
          type="file"
          name="poFile"
          onChange={handleFile}
        />
      </Button>
  </Grid>
 
</Grid>
            
       

            <br />
            <Grid
              container
              spacing={-90}
              sx={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginLeft: "21rem",
              }}
            >
              <Grid item xs={8} sm={4}>
                <Button
                  variant="contained"
                  
                  onClick={addOrderAccp}
                  type="submit"
                  sx={{background: "#00cff4",
                  "&:hover": {
                    background: "#00cff4", // Set the same color as the default background
                  },}}
                >
                  Accept
                </Button>
              </Grid>
              <Grid item xs={8} sm={4}>
              <Link to="/newOrderAcceptance" style={{ textDecoration: "none" }}>
                <Button variant="contained"  sx={{background: "#ff0854",
                                "&:hover": {
                                  background: "#ff0854", // Set the same color as the default background
                                },}}>
                  Close 
                </Button>
                </Link>
              </Grid>
            </Grid>
            <br />
          </Box>
        </Box>
      </Paper>
      </>
      )}
    </>
  );
};

export default AddCustomers;
