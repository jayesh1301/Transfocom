import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import { APP_BASE_PATH } from "Host/endpoint";
import LoadingSpinner from "component/commen/LoadingSpinner";

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "#000000",
      fontSize: "1em",
      fontWeight: "bold"
    },
  },
});

export default function ViewBom1() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${APP_BASE_PATH}/viewbom1/${id}`, { // Updated API endpoint here
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      console.log("Fetched data:", jsonData); 
      
      setData(jsonData);
      
    } catch (error) {
      console.error("Error fetching data:", error);
  
      
    }finally{
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [id]);
  
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    const newPage = Math.floor(page * rowsPerPage / newRowsPerPage); // Calculate the new page number
    setRowsPerPage(newRowsPerPage);
    setPage(newPage); // Update the current page to the new page number
  };
  const getSerialNumber = (index) => {
    return index + 1 + page * rowsPerPage;
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      // Calculate the total quantity
      const totalQuantity = data.reduce((total, row) => total + row.qty, 0);
  
      printWindow.document.write(`
        <html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>file_1692265424801</title>
        <style type="text/css">
            * {
                margin: 0;
                padding: 0;
                text-indent: 0;
            }

            p {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 11pt;
                margin: 0pt;
            }

            .s1 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: bold;
                text-decoration: none;
                font-size: 10pt;
            }

            .s2 {
                color: black;
                font-family: Arial, sans-serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 8pt;
            }

            table, tbody {
                vertical-align: top;
                overflow: visible;
            }
        </style>
    </head>
    <body>
    <u> <p style="padding-top: 3pt;padding-bottom: 1pt;padding-left: 90pt;text-indent: 0pt;text-align: left;">${data[0]?.Capacity || null} KVA, ${data[0]?.VoltageRatio || null}V, ${data[0]?.TypeTaping}, ${data[0]?.Matofwind},${data[0]?.ConsumerType}, ${data[0]?.Type}</u> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;           <u>Dtd. ${data[0]?.CostingDate || null }</u></p>
        <p style="padding-left: 90pt;text-indent: 0pt;line-height: 1pt;text-align: left;"/>
        <p style="text-indent: 0pt;text-align: left;">
            <br/>
        </p>
        <table style="border-collapse:collapse;margin-left:5.5pt" cellspacing="0">
            <tr style="height:14pt">
                <td style="width:44pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#BFBFBF">
                    <p class="s1" style="padding-top: 2pt;padding-left: 7pt;padding-right: 7pt;text-indent: 0pt;line-height: 10pt;text-align: center;">Sr No</p>
                </td>
                <td style="width:73pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#BFBFBF">
                    <p class="s1" style="padding-top: 2pt;padding-left: 6pt;padding-right: 6pt;text-indent: 0pt;line-height: 10pt;text-align: center;">ITEM Code</p>
                </td>
                <td style="width:139pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#BFBFBF">
                    <p class="s1" style="padding-top: 2pt;padding-left: 28pt;text-indent: 0pt;line-height: 10pt;text-align: left;">ITEM Description</p>
                </td>
                <td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#BFBFBF">
                    <p class="s1" style="padding-top: 2pt;padding-left: 45pt;padding-right: 44pt;text-indent: 0pt;line-height: 10pt;text-align: center;">Unit</p>
                </td>
                <td style="width:133pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#BFBFBF">
                    <p class="s1" style="padding-top: 2pt;padding-right: 1pt;text-indent: 0pt;line-height: 10pt;text-align: right;">Qty</p>
                </td>
            </tr>
            ${data.map((item, index) => (`
            <tr style="height:12pt">
                <td style="width:44pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s2" style="padding-top: 2pt;text-indent: 0pt;line-height: 8pt;text-align: center;">${index + 1}</p>
                </td>
                <td style="width:73pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s2" style="padding-top: 2pt;padding-left: 6pt;padding-right: 6pt;text-indent: 0pt;line-height: 8pt;text-align: center;">${item?.ItemCode}</p>
                </td>
                <td style="width:139pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s2" style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 8pt;text-align: left;">${item?.Description}</p>
                </td>
                <td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s2" style="padding-top: 2pt;text-indent: 0pt;line-height: 8pt;text-align: center;">${item?.Unit}</p>
                </td>
                <td style="width:133pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s2" style="padding-top: 2pt;padding-right: 1pt;text-indent: 0pt;line-height: 8pt;text-align: right;">${item?.Quantity}</p>
                </td>
            </tr>
            `))}
            <tr style="height:12pt">
                <td style="width:44pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:73pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:139pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s2" style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 8pt;text-align: left;">Accessories</p>
                </td>
                <td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:133pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
            <tr style="height:12pt">
                <td style="width:44pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:73pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:139pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s2" style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 8pt;text-align: left;">Labour charges</p>
                </td>
                <td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:133pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
            <tr style="height:12pt">
                <td style="width:44pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:73pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:139pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s2" style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 8pt;text-align: left;">Misc Expense &amp;Overheads</p>
                </td>
                <td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:133pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
            <tr style="height:12pt">
                <td style="width:44pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:73pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:139pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s2" style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 8pt;text-align: left;">Sub Total</p>
                </td>
                <td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
                <td style="width:133pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p style="text-indent: 0pt;text-align: left;">
                        <br/>
                    </p>
                </td>
            </tr>
        </table>
    </body>
</html>

      `);
  
      printWindow.document.close();
      printWindow.print();
    }
  };
  
  return (
    <>
    {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
      <div className="d-flex justify-content-between" style={{ position: "relative", bottom: 13 }}>
        <div className="page_header">
          <h4 style={{ fontFamily: " 'Roboto', sans-serif" }}>View Bom1</h4>
        </div>
        <Link to="/bom1" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{ backgroundColor: "#00d284",marginRight:'15px'  ,"&:hover": {
            background: "#00d284", // Set the same color as the default background
          }, }}>
            Back
          </Button>
        </Link>
      </div>
      <Paper elevation={6} style={{
        height: rowsPerPage === 5 ? 510 : 870,
        position: "relative",
        bottom: 49,
        overflow: "auto",
        margin: "1rem",
        marginTop: '60px' ,
        padding:'14px'
      }}>
        <div className={classes.root}>
          <br />
          <div style={{ height: 400, width: "100%" }}>

          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <TextField
className="Search"
label="Costing1/Bom1 Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* Adornment content */}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
    size="small"
    sx={{
      marginBottom: '4px',
      width: 600,
                }}
                // OLTC${data[0]?.oltctext
  //               em.typetaping AS TypeTaping,
  // em.matofwind AS Matofwind,
  // em.consumertype AS ConsumerType,
  // em.type AS Type,
                value={`${data[0]?.Capacity || null} KVA, ${data[0]?.VoltageRatio || null}V, ${data[0]?.TypeTaping}, ${data[0]?.Matofwind},${data[0]?.ConsumerType}, ${data[0]?.Type}`}
              />
               <div style={{ marginLeft: '10px' }}></div>
              <TextField
              className="Search"
                label="Date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* Adornment content */}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
                sx={{
                  marginBottom: '4px',
                  width: 240,
                  marginRight: '10px',  
                }}
                value={data[0]?.CostingDate}
              />
            </div>
            

          

            <br />
           
              <>
                <TableContainer>
                <Table className="tabel">
                    <TableHead className="tableHeader">
                      <TableRow>
                        <TableCell className="MuiTableCell-head" align="center">Sr No</TableCell>
                        <TableCell className="MuiTableCell-head" align="center">Item Code</TableCell>
                        <TableCell className="MuiTableCell-head" align="center">Description</TableCell>
                        <TableCell className="MuiTableCell-head" align="center">Unit</TableCell>
                        <TableCell className="MuiTableCell-head" align="center">Quantity</TableCell>
                      
                      </TableRow>
                    </TableHead>
                    <TableBody>
  {data
    .filter((row) =>
      (row.item_code?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
      (row.material_description?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
      (row.unit?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) ||
      (row.corresponding_unit?.toLowerCase() ?? '').includes(searchQuery.toLowerCase())
    )
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => (
      <TableRow className="tabelrow"  key={row.indent_id}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{row.ItemCode}</TableCell>
        <TableCell align="center">{row.Description}</TableCell>
        <TableCell align="center">{row.Unit}</TableCell>
        <TableCell align="center">{row.Quantity}</TableCell>
      </TableRow>
    ))}
</TableBody>
                  </Table>
                </TableContainer>
                
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            
         <Button variant="contained" sx={{
              marginLeft: "5px",
              padding: "5px",
              background: "#00cff4",
                                      "&:hover": {
                                        background: "#00cff4", // Set the same color as the default background
                                      },
            }} onClick={handlePrint}>
              Print
            </Button>
          </div>
        </div>
      </Paper>
      </>
      )}
    </>
  );
}
