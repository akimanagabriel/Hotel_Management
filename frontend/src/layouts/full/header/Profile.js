import React, { useState } from "react";
import {
   Avatar,
   Box,
   Menu,
   Button,
   IconButton,
   MenuItem,
   ListItemIcon,
   ListItemText,
   Typography,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons";
import { IconLogout } from "@tabler/icons-react";

import { blue } from "@mui/material/colors";
import { logout } from "src/redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Profile = ({ user }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [anchorEl2, setAnchorEl2] = useState(null);
   const handleClick2 = (event) => {
      setAnchorEl2(event.currentTarget);
   };
   const handleClose2 = () => {
      setAnchorEl2(null);
   };

   return (
      <Box>
         <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            sx={{
               ...(typeof anchorEl2 === "object" && {
                  color: "primary.main",
               }),
            }}
            onClick={handleClick2}
         >
            <Avatar
               sx={{
                  width: 35,
                  height: 35,
                  fontSize: "15px",
                  bgcolor: blue[700],
               }}
            >
               {user && <Typography>{user.lastName[0] || user.firstName[0]}</Typography>}
            </Avatar>
         </IconButton>
         {/* ------------------------------------------- */}
         {/* Message Dropdown */}
         {/* ------------------------------------------- */}
         <Menu
            id="msgs-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            sx={{
               "& .MuiMenu-paper": {
                  width: "200px",
                  border: "1px solid #eee",
               },
            }}
         >
            <MenuItem>
               <ListItemIcon>
                  <IconUser width={20} />
               </ListItemIcon>
               <ListItemText>My Profile</ListItemText>
            </MenuItem>
            <MenuItem>
               <ListItemIcon>
                  <IconMail width={20} />
               </ListItemIcon>
               <ListItemText>My Account</ListItemText>
            </MenuItem>
            <MenuItem>
               <ListItemIcon>
                  <IconListCheck width={20} />
               </ListItemIcon>
               <ListItemText>My Tasks</ListItemText>
            </MenuItem>
            <Box mt={1} py={1} px={2}>
               <Button
                  startIcon={<IconLogout />}
                  onClick={() => {
                     dispatch(logout());
                     navigate("/");
                  }}
                  color="error"
                  fullWidth
                  variant="contained"
                  size="small"
               >
                  Logout
               </Button>
            </Box>
         </Menu>
      </Box>
   );
};

export default Profile;
