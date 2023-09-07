import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function MuiDataTable({ rows, columns }) {
   const [rowsWithIndex, setRowsWithIndex] = useState([]);

   // Populate rowsWithIndex with the user data and index
   useEffect(() => {
      setRowsWithIndex(rows.map((user, index) => ({ ...user, index })));
   }, [rows]);

   return (
      <div style={{ height: "auto", width: "100%" }}>
         <div style={{ width: "100%" }}>
            <DataGrid
               slots={{ toolbar: GridToolbar }}
               rows={rowsWithIndex}
               columns={columns}
               pageSize={5} // Number of rows per page
               checkboxSelection // Add checkboxes for row selection
               disableSelectionOnClick // Prevent selecting rows on cell click
            />
         </div>
      </div>
   );
}

export default MuiDataTable;
