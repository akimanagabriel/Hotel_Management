import {
   Paper,
   TableContainer,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   Skeleton,
} from "@mui/material";

const LoadingTableSkeleton = () => {
   return (
      <TableContainer component={Paper} elevation={0}>
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>
                     <Skeleton variant="text" width={"20%"} />
                  </TableCell>
                  <TableCell>
                     <Skeleton variant="text" width={"10%"} />
                  </TableCell>
                  <TableCell>
                     <Skeleton variant="text" width={"90%"} />
                  </TableCell>
                  <TableCell>
                     <Skeleton variant="text" width={"50%"} />
                  </TableCell>
                  <TableCell>
                     <Skeleton variant="text" width={"30%"} />
                  </TableCell>
                  <TableCell>
                     <Skeleton variant="text" width={"80%"} />
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {/* Create multiple skeleton rows */}
               {Array.from({ length: 10 }, (_, index) => (
                  <TableRow key={index}>
                     <TableCell>
                        <Skeleton variant="text" width={"90%"} />
                     </TableCell>
                     <TableCell>
                        <Skeleton variant="text" width={"100%"} />
                     </TableCell>

                     <TableCell>
                        <Skeleton variant="text" />
                     </TableCell>
                     <TableCell>
                        <Skeleton variant="text" />
                     </TableCell>
                     <TableCell>
                        <Skeleton variant="text" />
                     </TableCell>
                     <TableCell>
                        <Skeleton variant="text" />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

export default LoadingTableSkeleton;
