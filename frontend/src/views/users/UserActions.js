import { DeleteOutline, EditNoteOutlined } from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ComfirmDialog from "src/components/dialog/ComfirmDialog";
import { handleError, parameter } from "src/config/parameters";
import { deleteUser } from "src/redux/allUsers";
import EditUserDialog from "./EditUserDialog";

function UserActions({ row }) {
   const [isDeleteOpen, setDeleteOpen] = useState(false);
   const [isEditOpen, setEditOpen] = useState(false);
   const dispatch = useDispatch();

   const handleDele = async () => {
      try {
         const token = window.localStorage.getItem("token");
         await axios.delete(parameter.SERVER_URL + "/api/user/" + row.id, {
            headers: { Authorization: "Bearer " + token },
         });

         dispatch(deleteUser(row.id));
         toast.success(`${row.firstName} ${row.lastName} deleted`);
      } catch (error) {
         toast.error(handleError(error));
      }
   };

   const handleEdit = async () => {
      setEditOpen(true);
   };

   return (
      <Stack direction={"row"} spacing={1} justifyContent={"center"}>
         <Box>
            <Tooltip title={`Delete ${row.firstName}`}>
               <IconButton color="error" onClick={() => setDeleteOpen(true)}>
                  <DeleteOutline />
               </IconButton>
            </Tooltip>

            {/* delete comfirm dialog */}
            <ComfirmDialog
               isOpen={isDeleteOpen}
               setOpen={setDeleteOpen}
               onComfirmed={() => handleDele()}
            />
         </Box>

         <Box>
            <Tooltip title={`Edit ${row.firstName}`}>
               <IconButton color="primary" onClick={handleEdit}>
                  <EditNoteOutlined />
               </IconButton>
            </Tooltip>

            {/* edit user dialog */}
            <EditUserDialog {...row} open={isEditOpen} setOpen={setEditOpen} />
         </Box>
      </Stack>
   );
}

export default UserActions;
