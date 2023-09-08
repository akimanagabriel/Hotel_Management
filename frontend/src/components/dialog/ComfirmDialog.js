import { ThumbUpAltOutlined } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";

const ComfirmDialog = ({
    isOpen,
    setOpen,
    onComfirmed,
    title = "Confirm Delete",
    question = "Are you sure you want to delete this item?",
    denyText = "NO",
    comfirmText = "YES",
}) => {
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{question}</DialogContent>
            <DialogActions sx={{ mx: 2, mb: 1 }}>
                <Stack direction={"row"} spacing={3}>
                    <Button onClick={handleClose} color="primary">
                        {denyText}
                    </Button>
                    <Button
                        disableElevation
                        startIcon={<ThumbUpAltOutlined />}
                        onClick={onComfirmed}
                        color={"primary"}
                        variant="contained"
                    >
                        {comfirmText}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default ComfirmDialog;
