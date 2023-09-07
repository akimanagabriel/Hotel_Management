import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import UsersTable from "./UsersTable";
import axios from "axios";
import { handleError, parameter } from "src/config/parameters";
import { toast } from "react-toastify";

const UserList = () => {
   const [users, setUsers] = useState([]);
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
         setTimeout(() => {
            setUsers(response.data);
         }, 1000);
      } catch (error) {
         toast.error("OOOOPs " + handleError(error));
      }
   };
   useEffect(() => {
      getAllUsers();
   }, []);

   return (
      <PageContainer title="Users" description="this is Sample page">
         <DashboardCard title="Users list">
            <Box>
               <UsersTable users={users} />
            </Box>
         </DashboardCard>
      </PageContainer>
   );
};

export default UserList;
