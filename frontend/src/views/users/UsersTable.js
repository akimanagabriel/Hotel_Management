import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import LoadingTableSkeleton from "./LoadingTableSkeleton";

const columns = [
   { field: "#", headerName: "#", width: 100 },
   { field: "firstName", headerName: "Firstname", width: 200 },
   { field: "lastName", headerName: "Lastname", width: 300 },
   { field: "email", headerName: "Email", width: 100 },
   { field: "userType", headerName: "Role", width: 100 },
];

const rows = [
   { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
   { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
   // Add more data rows as needed
];

function MuiDataTable({ users }) {
   console.log(users);

   return (
      <div style={{ height: "auto", width: "100%" }}>
         {users && users.length === 0 ? (
            <LoadingTableSkeleton />
         ) : (
            <DataGrid
               rows={rows}
               columns={columns}
               pageSize={5} // Number of rows per page
               checkboxSelection // Add checkboxes for row selection
               disableSelectionOnClick // Prevent selecting rows on cell click
            />
         )}
      </div>
   );
}

export default MuiDataTable;
