import { Fade, Snackbar } from '@mui/material';
import { useState } from 'react';

function SnackBar({ open, handleClose }) {
    return (
        <div>
            <Snackbar
                color="primary"
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={Fade}
            />
        </div>
    );
}

export default SnackBar;
