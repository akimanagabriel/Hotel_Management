import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconDeviceFloppy } from "@tabler/icons";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUsers } from "src/redux/allUsers";
import { handleError, parameter } from "src/config/parameters";

const EditUserDialog = ({ id, firstName, lastName, email, open, setOpen }) => {
   const dispatch = useDispatch();

   const handleClose = () => {
      setOpen(false);
   };

   const initialValues = {
      firstName,
      lastName,
      email,
   };

   const validationSchema = Yup.object().shape({
      firstName: Yup.string().min(3).max(50).required("First name is required"),
      lastName: Yup.string().min(3).max(50).required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
   });

   const handleSubmit = async (values, { setSubmitting }) => {
      const token = window.localStorage.getItem("token");
      try {
         await axios.put(`${parameter.SERVER_URL}/api/user/${id}`, values, {
            headers: { Authorization: `Bearer ${token}` },
         });

         const response = await axios.get(`${parameter.SERVER_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
         });

         dispatch(setUsers(response.data));
         toast.success("User updated successfully");
         handleClose();
      } catch (error) {
         toast.error(handleError(error));
      }
      setSubmitting(false);
   };

   const theme = useTheme();
   const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

   return (
      <Dialog
         open={open}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
         fullWidth
         maxWidth={isSmall ? "100%" : "xs"}
      >
         <DialogTitle id="alert-dialog-title">Edit User</DialogTitle>
         <DialogContent>
            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting }) => (
                  <Form>
                     <Stack direction="column" spacing={3} mt={1}>
                        <Box>
                           <Field
                              name="firstName"
                              as={TextField}
                              placeholder="First name"
                              size="small"
                              fullWidth
                           />
                           <ErrorMessage
                              name="firstName"
                              render={(msg) => <Typography color="error">{msg}</Typography>}
                           />
                        </Box>

                        <Box>
                           <Field
                              name="lastName"
                              as={TextField}
                              placeholder="Last name"
                              size="small"
                              fullWidth
                           />
                           <ErrorMessage
                              name="lastName"
                              render={(msg) => <Typography color="error">{msg}</Typography>}
                           />
                        </Box>

                        <Box>
                           <Field
                              name="email"
                              as={TextField}
                              placeholder="Email"
                              size="small"
                              fullWidth
                           />
                           <ErrorMessage
                              name="email"
                              render={(msg) => <Typography color="error">{msg}</Typography>}
                           />
                        </Box>
                     </Stack>

                     <DialogActions>
                        <Stack direction="row" spacing={3}>
                           <Button onClick={handleClose}>Cancel</Button>
                           <LoadingButton
                              startIcon={<IconDeviceFloppy />}
                              variant="contained"
                              type="submit"
                              disabled={isSubmitting}
                              loading={isSubmitting}
                              autoFocus
                           >
                              Save changes
                           </LoadingButton>
                        </Stack>
                     </DialogActions>
                  </Form>
               )}
            </Formik>
         </DialogContent>
      </Dialog>
   );
};

export default EditUserDialog;
