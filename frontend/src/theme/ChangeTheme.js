import React from "react";
import { IconMoon } from "@tabler/icons-react";
import { IconSunHigh } from "@tabler/icons-react";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeMode } from "src/redux/themeSlice";

function ChangeTheme() {
   const theme = useTheme();
   const dispatch = useDispatch();

   return (
      <IconButton
         onClick={() => dispatch(changeMode())}
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
         {theme.palette.mode === "dark" ? (
            <Tooltip title="Light mode">
               <IconSunHigh size="21" stroke="1.5" />
            </Tooltip>
            
         ) : (
            <Tooltip title="Dark mode">
               <IconMoon size="21" stroke="1.5" />
            </Tooltip>
            
         )}
      </IconButton>
   );
}
export default ChangeTheme;
