import { Link } from "react-router-dom";
import { Typography, styled, useTheme } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
   height: "70px",
   width: "180px",
   overflow: "hidden",
   display: "block",
   textDecoration: "none",
}));

const Logo = () => {
   const { palette } = useTheme();
   return (
      <LinkStyled to="/dashboard">
         <Typography fontWeight={900} variant="h3" color={palette.primary.main} mt={4} ml={2}>
            HOTEL MIS
         </Typography>
      </LinkStyled>
   );
};

export default Logo;
