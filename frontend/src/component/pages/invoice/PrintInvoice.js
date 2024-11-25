import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import print from "../../img/print.jpeg";
import {TextareaAutosize} from "@mui/base/TextareaAutosize";
import { APP_BASE_PATH } from "Host/endpoint";
import dayjs from "dayjs";
import LoadingSpinner from "component/commen/LoadingSpinner";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};


  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[500]};
    
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledTextareaElement = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 810px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 3  ;
  padding: 12px;
  border-radius: 5px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[500]};
  

  &:hover {
    border-color:black;
  }

  &:focus {
    border-color: ${blue[500]};
    
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);



const PrintInvoice = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

   
  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY");
  };
   
    const fetchData = async () => {
        setIsLoading(true)
      try {
        const response = await fetch(`${APP_BASE_PATH}/fetchinvoicePrint/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonData = await response.json();
        // const data1 = [jsonData];
        setData(jsonData); // Make sure jsonData contains the expected data.
        console.log("API Response Data:", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setIsLoading(false)
      }
    };
    
    
    useEffect(() => {
      fetchData();
    }, [id]);
   
   
    
    const handlePrint = () => {
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
      
      // Header content with centered styling
      const headerContent = `
      <!DOCTYPE  html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Invoice Print </title>
        <meta name="author" content="STATIC ELECTRIC"/>
        <style type="text/css">
            * {
                margin: 0;
                padding: 0;
                text-indent: 0;
            }

            .s1 {
                color: black;
                font-family: "Times New Roman", serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 19pt;
            }

            .s2 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: italic;
                font-weight: normal;
                text-decoration: none;
                font-size: 8.5pt;
            }

            p {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 8.5pt;
                margin: 0pt;
            }

            .s3 {
                color: black;
                font-family: "Times New Roman", serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 10.5pt;
            }

            .s4 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 7pt;
            }

            .s5 {
                color: black;
                font-family: "Times New Roman", serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 8.5pt;
            }

            .s6 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 8pt;
            }

            .s7 {
                color: black;
                font-family: "Times New Roman", serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 7.5pt;
            }

            .s8 {
                color: black;
                font-family: "Times New Roman", serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 9.5pt;
            }

            .s9 {
                color: black;
                font-family: "Times New Roman", serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 9.5pt;
            }

            .s11 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 8.5pt;
            }

            .s12 {
                color: #F00;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 7.5pt;
            }

            .s13 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 7.5pt;
            }

            .s14 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 9.5pt;
            }

            .s16 {
                color: #F00;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 7pt;
            }

            .s17 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 7pt;
            }

            .s18 {
                color: #F00;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 7pt;
                vertical-align: -1pt;
            }

            .s19 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 6pt;
                vertical-align: 1pt;
            }

            .s20 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 6pt;
            }

            .s21 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 6pt;
            }

            table, tbody {
                vertical-align: top;
                overflow: visible;
            }
        </style>
    </head>
    <body>
        <p class="s1" style="padding-top: 3pt;text-indent: 0pt;text-align:center;">STATIC ELECTRICALS PUNE</p>
        <p class="s2" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">Manufacturers and Repairers of Power and Distribution Transformers.</p>
        <p style="text-indent: 0pt;text-align: left;"/>
        <p style="text-indent: 0pt;text-align: left;"/>
        <p style="text-indent: 0pt;text-align: left;"/>
        <p style="padding-top: 1pt;text-indent: 0pt;text-align: center;">S.No.229/2/2, Behind Wipro Phase-I, Hinjewadi, Tal-Mulshi, Dist-Pune, Pune-411057.</p>
        <p style="text-indent: 0pt;text-align: left;">
            <br/>
        </p>
        <table style="border-collapse:collapse;margin-left:6.965pt" cellspacing="0">
            <tr style="height:25pt">
                <td style="width:484pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" colspan="6">
                    <p class="s3" style="padding-left: 204pt;padding-right: 203pt;text-indent: 0pt;line-height: 11pt;text-align: center;">TAX INVOICE</p>
                </td>
            </tr>
            <tr style="height:74pt">
                <td style="width:216pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" colspan="2">
                    <p class="s4" style="text-indent: 0pt;line-height: 9pt;text-align: left;">
                        DIVISION <span class="s5">Division II- Pimpri</span>
                    </p>
                    <p class="s4" style="padding-top: 1pt;padding-right: 103pt;text-indent: 0pt;line-height: 133%;text-align: left;">
                        GST No. <span class="s6">27ABEFS1957R1ZD </span>
                        STATE <span class="s6">MAHARASHTRA </span></br>
                        CODE.  <span class="s6">27</span>
                    </p>
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;text-align: left;">Name of Commodity: ELECTRICAL TRANSFORMER.</p>
                    <p class="s4" style="padding-top: 3pt;text-indent: 0pt;text-align: left;">
                        PAN No. <span class="s6">ABEFS1957R</span>
                    </p>
                </td>
                <td style="width:268pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" colspan="4">
                    <p class="s7" style="text-indent: 0pt;text-align: left;">Original for Buyer/Duplicate for Transporter</p>
                    <p class="s7" style="padding-top: 2pt;text-indent: 0pt;text-align: left;">/Triplicate for assessee</p>
                    <p class="s8" style="padding-top: 2pt;text-indent: 0pt;text-align: left;">
                        Invoice No :<span class="s9"></span>
                        <span style=" color: #F00;">${data[0]?.invoice_no}</span> 
                    </p>
                    <p class="s8" style="padding-top: 2pt;text-indent: 0pt;text-align: left;">
                       Invoice Date:<span style=" color: #F00;">${data[0]?.inv_date} </span></br>
                        Challan No :${data[0]?.challan_id} 
                    </p>
                    <p class="s8" style="padding-top: 2pt;text-indent: 0pt;text-align: left;">
                       Challan Date:<span style=" color: #F00;">${data[0]?.chdate}</span>
                    </p>
                </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:216pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:2pt" colspan="2" bgcolor="#BFBFBF">
                    <p class="s11" style="text-indent: 0pt;line-height: 9pt;text-align: left;">Name &amp;Address of the Buyer:</p>
                </td>
                <td style="width:268pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:2pt" colspan="4" bgcolor="#BFBFBF">
                    <p class="s11" style="text-indent: 0pt;line-height: 9pt;text-align: left;">Name &amp;Address of the Consignee/ Shipped To :</p>
                </td>
            </tr>
            <tr style="height:44pt">
                <td style="width:216pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt" colspan="2">
                    <p class="s12" style="padding-top: 1pt;padding-right: 81pt;text-indent: 0pt;line-height: 125%;text-align: left;">M/s. ${data[0]?.buyername} </p>
                    <p class="s12" style="text-indent: 0pt;line-height: 8pt;text-align: left;">${data[0].buyer_addr}</p>
                </td>
                <td style="width:268pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt" colspan="4">
                    <p class="s12" style="padding-top: 1pt;padding-right: 155pt;text-indent: 0pt;line-height: 125%;text-align: left;">M/s. ${data[0]?.consigneename},</p>
                    <p class="s12" style="text-indent: 0pt;text-align: left;">${data[0]?.consign_addr}</p>
                    <p class="s12" style="padding-top: 2pt;text-indent: 0pt;line-height: 8pt;text-align: left;"></p>
                </td>
            </tr>
            <tr style="height:33pt">
                <td style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt" colspan="2">
                    <p class="s13" style="padding-right: 118pt;text-indent: 0pt;line-height: 125%;text-align: left;">STATE - MAHARASHTRA STATE CODE - 27</p>
                    <p class="s13" style="text-indent: 0pt;line-height: 8pt;text-align: left;">
                        GST NO. <span style=" color: #F00;">27CCTPS1757B1Z8</span>
                    </p>
                </td>
                <td style="width:268pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt" colspan="4">
                    <p class="s13" style="padding-right: 171pt;text-indent: 0pt;line-height: 125%;text-align: left;">STATE - MAHARASHTRA STATE</br> CODE - 27</p>
                    <p class="s13" style="text-indent: 0pt;line-height: 8pt;text-align: left;">
                        GST NO. <span style=" color: #F00;">NOT REGISTERED</span>
                    </p>
                </td>
            </tr>
            <tr style="height:23pt">
                <td style="width:114pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt" colspan="2">
                    <p class="s13" style="text-indent: 0pt;text-align: left;">Category of Consignee:-  ${data[0]?.consignee_cat || ''}</p>
                    <p class="s13" style="padding-top: 1pt;text-indent: 0pt;line-height: 8pt;text-align: left;">Mode of Transport:- ${data[0]?.transport_mode}</p>
                </td>
                <td style="width:102pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                    <p class="s13" style="padding-left: 24pt;text-indent: 0pt;line-height: 8pt;text-align: left;">BY ROAD:- ${data[0]?.by_road} </p>
                </td>
                <td style="width:93pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt">
                    <p class="s13" style="text-indent: 0pt;text-align: left;">PO.No.:- ${data[0]?.po_no}</p>
                    <p class="s13" style="padding-top: 1pt;text-indent: 0pt;line-height: 8pt;text-align: left;">Vehicle Registration No.:${data[0]?.vehicle_no}- </p>
                </td>
                <td style="width:33pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:142pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt">
                    <p class="s13" style="padding-left: 54pt;padding-right: 64pt;text-indent: 0pt;text-align: center;">Date.${formatDate(data[0]?.po_date)}</p>
                    
                </td>
            </tr>
            <tr style="height:14pt">
                <td style="width:34pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" bgcolor="#B8CCE4">
                    <p class="s14" style="padding-left: 4pt;padding-right: 3pt;text-indent: 0pt;line-height: 10pt;text-align: center;">S No</p>
                </td>
                <td style="width:182pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" bgcolor="#B8CCE4">
                    <p class="s14" style="padding-left: 66pt;padding-right: 60pt;text-indent: 0pt;line-height: 10pt;text-align: center;">Description</p>
                </td>
                <td style="width:66pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" bgcolor="#B8CCE4">
                    <p class="s14" style="padding-left: 10pt;padding-right: 9pt;text-indent: 0pt;line-height: 10pt;text-align: center;">HSN/SAC</p>
                </td>
                <td style="width:60pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" bgcolor="#B8CCE4">
                    <p class="s14" style="padding-left: 19pt;padding-right: 18pt;text-indent: 0pt;line-height: 10pt;text-align: center;">Qty.</p>
                </td>
                <td style="width:55pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" bgcolor="#B8CCE4">
                    <p class="s14" style="text-indent: 0pt;line-height: 10pt;text-align: left;">Rate/Unit</p>
                </td>
                <td style="width:87pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" bgcolor="#B8CCE4">
                    <p class="s14" style="text-indent: 0pt;line-height: 10pt;text-align: right;">Amount (Rs)</p>
                </td>
            </tr>
            <tr style="height:23pt">
                <td style="width:34pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                    <p class="s4" style="text-indent: 0pt;text-align: center;">1</p>
                </td>
                <td style="width:182pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                    <p class="s4" style="text-indent: 0pt;text-align: left;">DISTRIBUTION TRANSFORMER</p>
                </td>
                <td style="width:66pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;text-align: left;">TESTED &amp;SUPPLIED WITH SILICA GEL BREATHER</p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;text-align: left;">
                        CAPACITY   - <span style=" color: #F00;">${data[0]?.capacity} </span>
                        KVA
                    </p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s16" style="padding-top: 1pt;padding-left: 16pt;padding-right: 15pt;text-indent: 0pt;text-align: center;">${data[0]?.hsn}</p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s16" style="padding-top: 1pt;padding-left: 22pt;padding-right: 21pt;text-indent: 0pt;text-align: center;">${data[0]?.inv_det_qty}</p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s17" style="padding-top: 1pt;padding-left: 13pt;text-indent: 0pt;text-align: left;">${data[0]?.rate}</p>
                </td>
                <td style="width:87pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p class="s17" style="padding-top: 1pt;padding-right: 2pt;text-indent: 0pt;text-align: right;">${data[0]?.amt}</p>
                </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;text-align: left;">
                        VOLTAGE RATIO - <span style=" color: #F00;">${data[0]?.secratio}</span>
                        /${data[0]?.priratio} KV
                    </p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s17" style="padding-top: 1pt;padding-left: 22pt;padding-right: 21pt;text-indent: 0pt;text-align: center;">Nos.</p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
            <tr style="height:43pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;text-align: left;">
                        TYPE     - <span style=" color: #F00;">${typeLabel}</span>
                        
                    </p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;text-align: right;">Total Basic</p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p class="s17" style="text-indent: 0pt;line-height: 8pt;text-align: right;">${data[0]?.basic_total}</p>
                </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;text-align: right;">C. GST 9%</p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p class="s17" style="padding-top: 1pt;text-indent: 0pt;text-align: right;">${data[0]?.cgst}</p>
                </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="text-indent: 0pt;text-align: right;">S. GST 9%</p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p class="s17" style="padding-top: 1pt;text-indent: 0pt;text-align: right;">${data[0]?.sgst}</p>
                </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="text-indent: 0pt;text-align: right;">I. GST</p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:2pt">
                <p class="s17" style="padding-top: 1pt;text-indent: 0pt;text-align: right;">${data[0]?.igst}</p>
            </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;line-height: 8pt;text-align: right;">Round off</p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:2pt">
                <p class="s17" style="padding-top: 1pt;text-indent: 0pt;text-align: right;">${data[0]?.roundoff}</p>
            </td>
            </tr>
            <tr style="height:12pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;text-align: right;">Grand Total.</p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;line-height: 7pt;text-align: right;">${data[0]?.grand_total}</p>
                </td>
            </tr>
            <tr style="height:12pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="padding-top: 2pt;text-indent: 0pt;line-height: 8pt;text-align: right;">Advance</p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt">
                <p class="s4" style="padding-top: 1pt;text-indent: 0pt;line-height: 7pt;text-align: right;">${data[0]?.inv_advance}</p>
            </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:34pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:182pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;line-height: 8pt;text-align: right;">Net Total.</p>
                </td>
                <td style="width:66pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:60pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:87pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;line-height: 8pt;text-align: right;">${data[0]?.net_total}</p>
                </td>
            </tr>
            <tr style="height:88pt">
                <td style="width:484pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt" colspan="6">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                    <p class="s4" style="padding-left: 152pt;padding-right: 66pt;text-indent: 9pt;line-height: 115%;text-align: left;">
                        Date of Issue : <span class="s18">${data[0]?.date_issue}    </span>
                        Time of Issue:       <span class="s18">${data[0]?.time_issue}</span>
                        <span style=" color: #F00;">AM </span>
                        Date of Removal : <span class="s18">${data[0]?.date_removal}    </span>
                        Time of Removal :     <span class="s18">${data[0]?.time_removal} </span>
                        <span style=" color: #F00;">AM</span>
                    </p>
                    <p class="s17" style="padding-left: 2pt;padding-right: 84pt;text-indent: -1pt;line-height: 134%;text-align: left;">
                        Certified that the particulars given above are true and correct and the amount indicated represent the price actually charged and that there is no few of additional consideration directly or indirectly from buyer <b>OR Certified that the particulars given above </b>
                        are true and correct and the amount indicated is provisional as additional consideration will be received from the buyer
                    </p>
                    <p class="s17" style="text-indent: 0pt;text-align: left;">
                        on account of <b>……………………………</b>
                        .             <span class="s19">36,000</span>
                    </p>
                </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" colspan="2" rowspan="2">
                    <p class="s4" style="text-indent: 0pt;text-align: left;">
                        RUPEES <span style=" color: #F00;">${NumberToWords(Number(data[0]?.net_total))} </span>
                    </p>
                </td>
                <td style="width:93pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:1pt" colspan="2">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;line-height: 8pt;text-align: left;">C.GST 9% -</p>
                </td>
                <td style="width:33pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;line-height: 8pt;text-align: center;">${data[0]?.cgst}</p>
                </td>
                <td style="width:142pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
            <tr style="height:12pt">
                <td style="width:93pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt" colspan="2">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;line-height: 8pt;text-align: left;">S.GST 9% -</p>
                </td>
                <td style="width:33pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt">
                    <p class="s4" style="padding-top: 1pt;text-indent: 0pt;line-height: 8pt;text-align: center;">${data[0]?.sgst}</p>
                </td>
                <td style="width:142pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
            <tr style="height:11pt">
                <td style="width:216pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt" colspan="2" rowspan="2">
                    <p class="s20" style="text-indent: 0pt;line-height: 6pt;text-align: left;">I/We hereby certify that my/our registration certificate under the GST Act., 2017</p>
                    <p class="s20" style="padding-top: 1pt;padding-right: 3pt;text-indent: 0pt;line-height: 114%;text-align: left;">is in force on the date on which the sale of the goods specified in filing of return and the due tax, if any payable on the sale has been paid or shall be paid. &quot;been effected by me/us and it shallbe accounted for in the turnover of sales while invoice is made by me/us and that the transaction of sale covered by this tax invoice has this tax</p>
                </td>
                <td style="width:126pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt" colspan="2">
                    <p class="s4" style="padding-left: 32pt;text-indent: 0pt;line-height: 8pt;text-align: left;">Pre Authenticated</p>
                </td>
                <td style="width:142pt;border-top-style:solid;border-top-width:2pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:2pt" colspan="2">
                    <p class="s4" style="padding-left: 34pt;text-indent: 0pt;line-height: 8pt;text-align: left;">Authorised Signetory</p>
                </td>
            </tr>
            <tr style="height:44pt">
                <td style="width:126pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" colspan="2" rowspan="2">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:142pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" colspan="2" rowspan="2">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
            <tr style="height:44pt">
                <td style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:2pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:2pt" colspan="2">
                    <p class="s21" style="padding-right: 9pt;text-indent: 0pt;line-height: 115%;text-align: justify;">
                        Terms &amp;Conditions: <span class="s20">Intrest will be recovered@24%p.a.on overdue unpaid bills •No claims regarding the quantity,quality,damages or shortages will be given unless the same notified at the time of receiveing goods</span>
                    </p>
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                    <p class="s21" style="text-indent: 0pt;line-height: 7pt;text-align: justify;">SUBJECT TO PUNE JURISDICTION.</p>
                </td>
            </tr>
        </table>
    </body>
</html>

      `;
      printWindow.document.write(headerContent);
      printWindow.document.close();
      printWindow.print();
  
            }
           
            let typeLabel = '';
            if (data[0]?.type === 1) {
              typeLabel = 'OUTDOOR';
            } else if (data[0]?.type === 2) {
              typeLabel = 'INDOOR';
            }else if (data[0]?.type === 2) {
              typeLabel = 'INDOOR/OUTDOOR';

            }
            const basic_total = data[0]?.amt;
            const cgst = (basic_total * 9) / 100;
            const sgst = (basic_total * 9) / 100;
            const igst = (basic_total * 18) / 100;
            
            console.log('\nBefore rounding:');
          console.log('Basic Total:', basic_total);
          console.log('CGST:', cgst);
          console.log('SGST:', sgst);
          console.log('IGST:', igst);
          
          const roundedBasicTotal = Math.round(basic_total * 100) / 100;
          const roundedCgst = Math.round(cgst * 100) / 100;
          const roundedSgst = Math.round(sgst * 100) / 100;
          const roundedIgst = Math.round(igst * 100) / 100;
          const roundoff = Math.floor(roundedBasicTotal + roundedCgst + roundedSgst + roundedIgst);
          const grand_total = roundoff

          const scales = ['', 'Thousand', 'Lakh', 'Crore'];
const words = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertLessThanOneThousand(num) {
  if (num === 0) {
    return '';
  } else if (num < 20) {
    return words[num] + ' ';
  } else if (num < 100) {
    return tens[Math.floor(num / 10)] + ' ' + convertLessThanOneThousand(num % 10);
  } else {
    return words[Math.floor(num / 100)] + ' Hundred ' + convertLessThanOneThousand(num % 100);
  }
}
          function NumberToWords(num) {
            if (num === 0) {
              return 'Zero';
            }
          
            let words = '';
            let scaleIndex = 0;
          
            while (num > 0) {
              if (num % 1000 !== 0) {
                words = convertLessThanOneThousand(num % 1000) + scales[scaleIndex] + ' ' + words;
              }
              num = Math.floor(num / 1000);
              scaleIndex++;
            }
          
            return words.trim();
          }
  return (
    <>
    {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
      <div class="d-flex justify-content-between">
        <div className="page_header">
          <h3>Print Invoice</h3>
        </div>
        <Link to="/invoice" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{ background: "#28a745" }}>
            Back
          </Button>
        </Link>
      </div>
      <Paper style={{ marginTop: 20 }}>
        <Box sx={{ flexGrow: 1 }}>
          <img
            id="print"
            alt="logo"
            src={print}
            style={{ marginTop: 50 }}
          ></img>
          <Grid
            container
            spacing={2}
            columns={12}
            style={{
              marginTop: 50,
              display: "flex",
              justifyContent: "center",
            }}
          >
            </Grid>
            <Grid container spacing={2}>
  <Grid item xs={6}>
    <TextField
      fullWidth
      id="invoiceno"
      label="Invoice Nimber "
      name="invoiceno"
      value={data[0]?.invoice_no}
      sx={{marginBottom:"15px"}}
      InputLabelProps={{
        shrink: true,
      }}
      
    />
  </Grid>
  {data && (
  <Grid item xs={6}>
    <TextField
      fullWidth
      id="invoicedate"
      label="Invoice Date "
      name="invoicedate"
      value={data[0]?.inv_date}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </Grid>
)}
</Grid>

            <Grid item xs={8}>
              <TextField
                fullWidth
                id="buyername"
                label="Buyer Name "
                labelprope
                name="buyername"
                 value={data[0]?.buyername}
                
                sx={{marginBottom:"15px"}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={8}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="customeraddress"
                label="Customer Address"
                name="customeraddress"
                value={data[0]?.buyer_addr}
                sx={{marginBottom:"15px"}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
             
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="consigneenaame"
                label="Consignee Naame"
                name="consigneenaame"
                value={ data[0]?.consigneename}
                sx={{marginBottom:"15px"}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
           
           
          
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="consigneeaddress"
                label="Consignee Address "
                name="consigneeaddress"
               value={ data[0]?.invoice_no}
                sx={{marginBottom:"15px"}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid container spacing={2}>
  <Grid item xs={6} style={{ marginTop: 5 }}>
    <TextField
      fullWidth
      id="consignee_cat"
      label="Category Of Consignee "
      name="consignee_cat"
      value={ data[0]?.consign_addr}
      sx={{marginBottom:"15px"}}
      InputLabelProps={{
        shrink: true,
      }}

    />
  </Grid>
  <Grid item xs={6} style={{ marginTop: 5 }}>
    <TextField
      fullWidth
      id="vehicleno"
      label="Vehicle No"
      name="vehicleno"
      
      value={data[0]?.vehicle_no}
      sx={{marginBottom:"15px"}}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </Grid>
</Grid> 
          </Grid>

       
       
          <Grid item xs={9} sm={3} style={{ marginLeft: -100, marginTop: 20 }}>
            <Button variant="contained"sx={{background:"#007bff"}} type="submit"  onClick={handlePrint} >
              Save And Print
            </Button>
          </Grid>
          <Grid item xs={9} sm={3} style={{ marginTop: -35, marginLeft: 200 }}>
          <Link to="/quotation" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="error">
              Cancel
            </Button>
            </Link>
          </Grid>
          <br />
        </Box>
      </Paper>
      </>
      )}
    </>
  );
};

export default PrintInvoice;
