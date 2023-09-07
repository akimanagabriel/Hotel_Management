import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconDeviceFloppy, IconUserPlus } from "@tabler/icons";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Select, Stack, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { handleError, parameter } from "src/config/parameters";
import axios from "axios";
import { useDispatch } from "react-redux";
import { appendUser } from "src/redux/allUsers";

export default function NewUserDialog() {
   const dispatch = useDispatch();

   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
   };

   const validationSchema = Yup.object().shape({
      firstName: Yup.string().min(3).max(50).required("First name is required"),
      lastName: Yup.string().min(3).max(50).required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(4).required("Password is required"),
      userType: Yup.string()
         .oneOf(["Super Admin", "Admin", "Manager"])
         .required("User type is required"),
   });

   const handleSubmit = async (values, { setSubmitting }) => {
      try {
         const token = window.localStorage.getItem("token");
         const response = await axios.post(parameter.SERVER_URL + "/api/user", values, {
            headers: { Authorization: "Bearer " + token },
         });
         dispatch(appendUser(response.data));
         handleClose();
         toast.success("User created successfully");
      } catch (error) {
         toast.error(handleError(error));
      }
      setSubmitting(false);
   };

   return (
      <div>
         <Button
            startIcon={<IconUserPlus />}
            color="primary"
            variant="contained"
            onClick={handleClickOpen}
         >
            new user
         </Button>

         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="xs"
         >
            <DialogTitle id="alert-dialog-title">{"Create a new user"}</DialogTitle>
            <DialogContent>
               <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
               >
                  {({ isSubmitting }) => (
                     <Form>
                        <Stack direction={"column"} gap={3} mt={2}>
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
                                 render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
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
                                 render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
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
                                 render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                              />
                           </Box>

                           <Box>
                              <Field
                                 name="password"
                                 as={TextField}
                                 placeholder="Password"
                                 size="small"
                                 fullWidth
                                 type="password"
                              />
                              <ErrorMessage
                                 name="password"
                                 render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                              />
                           </Box>

                           <Box>
                              <Field
                                 name="userType"
                                 as={Select}
                                 placeholder="User Type"
                                 size="small"
                                 fullWidth
                              >
                                 <MenuItem value={"Super Admin"}>Super Admin</MenuItem>
                                 <MenuItem value={"Admin"}>Admin</MenuItem>
                                 <MenuItem value={"Manager"}>Manager</MenuItem>
                              </Field>
                              <ErrorMessage
                                 name="userType"
                                 render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                              />
                           </Box>
                        </Stack>
                        <DialogActions>
                           <Stack direction={"row"} gap={3}>
                              <Button onClick={handleClose}>Discard</Button>
                              <LoadingButton
                                 startIcon={<IconDeviceFloppy />}
                                 variant="contained"
                                 type="submit"
                                 disabled={isSubmitting}
                                 loading={isSubmitting}
                                 autoFocus
                              >
                                 Save
                              </LoadingButton>
                           </Stack>
                        </DialogActions>
                     </Form>
                  )}
               </Formik>
            </DialogContent>
         </Dialog>
      </div>
   );
}
