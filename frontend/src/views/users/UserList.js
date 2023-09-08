import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import axios from "axios";
import { handleError, parameter } from "src/config/parameters";
import { toast } from "react-toastify";
import MuiDataTable from "../../components/data-grid/MuiDataGrid";
import LoadingTableSkeleton from "src/components/skeleton/LoadingTableSkeleton";
import NewUserDialog from "./NewUserDialog";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "src/redux/allUsers";
import UserActions from "./UserActions";

const UserList = () => {
   const [loading, setLoading] = useState(true);

   const dispatch = useDispatch();
   const users = useSelector((state) => state.users.data);

   // call data and store int redux
   const getAllUsers = async () => {
      const token = window.localStorage.getItem("token");

      try {
         const response = await axios.get(parameter.SERVER_URL + "/api/user", {
            headers: { Authorization: "Bearer " + token },
         });
         if (response.status !== 200) {
            throw new Error("Error occured while fetching users");
         }

         dispatch(setUsers(response.data));
         setLoading(false);
      } catch (error) {
         toast.error("OOOOPs " + handleError(error));
         setLoading(false);
      }
   };

   useEffect(() => {
      getAllUsers();
   }, []);

   const columns = [
      {
         field: "index",
         headerName: "#",
         width: 70,
         renderCell: (params) => {
            return params.row.index + 1; // Display the row index + 1
         },
      },
      { field: "firstName", headerName: "Firstname", width: 170 },
      { field: "lastName", headerName: "Lastname", width: 170 },
      { field: "email", headerName: "Email", width: 250 },
      { field: "userType", headerName: "Role", width: 150 },
      {
         field: "id",
         headerName: "Actions",
         width: 120,
         renderCell: (params) => <UserActions {...params} />,
      },
   ];

   return (
      <PageContainer title="Users" description="this is Sample page">
         <DashboardCard title="Users list" action={<NewUserDialog />}>
            <Box>
               {loading ? (
                  <LoadingTableSkeleton />
               ) : users && users.length > 0 ? (
                  <MuiDataTable rows={users} columns={columns} />
               ) : (
                  <Typography>No users found</Typography>
               )}
            </Box>
         </DashboardCard>
      </PageContainer>
   );
};

export default UserList;
