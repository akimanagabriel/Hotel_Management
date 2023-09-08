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
               density="compact"
               slots={{ toolbar: GridToolbar }}
               rows={rowsWithIndex}
               columns={columns}
               initialState={{
                  pagination: {
                     paginationModel: {
                        pageSize: 10,
                     },
                  },
               }}
               pageSizeOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
               checkboxSelection // Add checkboxes for row selection
               disableRowSelectionOnClick // Prevent selecting rows on cell click
            />
         </div>
      </div>
   );
}

export default MuiDataTable;
