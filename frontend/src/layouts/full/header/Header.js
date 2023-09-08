import React from "react";
import {
   Box,
   AppBar,
   Toolbar,
   styled,
   Stack,
   IconButton,
   Badge,
   Typography,
   Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons";
import { useSelector } from "react-redux";
import ChangeTheme from "src/theme/ChangeTheme";

const Header = (props) => {
   const user = useSelector((state) => state?.auth.user);

   const AppBarStyled = styled(AppBar)(({ theme }) => ({
      boxShadow: "none",
      background: theme.palette.background.paper,
      justifyContent: "center",
      backdropFilter: "blur(4px)",
      [theme.breakpoints.up("lg")]: {
         minHeight: "70px",
      },
   }));

   const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
      width: "100%",
      color: theme.palette.text.secondary,
   }));

   return (
      <AppBarStyled position="sticky" color="default">
         <ToolbarStyled>
            <Tooltip title="Menu">
               <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={props.toggleMobileSidebar}
                  sx={{
                     display: {
                        lg: "none",
                        xs: "inline",
                     },
                  }}
               >
                  <IconMenu width="20" height="20" />
               </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
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
               >
                  <Badge variant="dot" color="primary">
                     <IconBellRinging size="21" stroke="1.5" />
                  </Badge>
               </IconButton>
            </Tooltip>

            {/* change theme component */}
            <ChangeTheme />

            <Box flexGrow={1} />
            <Stack spacing={1} direction="row" alignItems="center">
               {user && (
                  <Typography variant="uppercase">{user.lastName || user.firstName}</Typography>
               )}
               <Profile user={user} />
            </Stack>
         </ToolbarStyled>
      </AppBarStyled>
   );
};

Header.propTypes = {
   sx: PropTypes.object,
};

export default Header;
