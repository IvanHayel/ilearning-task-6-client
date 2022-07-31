import {Box, IconButton, Modal, Typography,} from "@mui/material";
import HelpOutlineOutlinedIcon
                                             from '@mui/icons-material/HelpOutlineOutlined';
import React, {useState}                     from "react";
import "./Styles/Modal.scss";
import {Copyright}                           from "../Components";

export const HelpModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  return (
      <>
        <IconButton onClick={handleModalOpen} size="large" color="secondary">
          <HelpOutlineOutlinedIcon fontSize="large" />
        </IconButton>
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box className="modal-main-box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              TOOLTIP
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
              1. To apply the changes, just click somewhere else on the
              page 🖱️<br />
              2. To fine-tune the error rate, use the arrows on your
              keyboard ⬆️ ➡️ ⬅️ ⬇️<br />
              3. Error rate don't work on the email field, so that it is
              possible
              to track the operation of the seed and data changes ⚠️<br />
              4. To monitor requests sent to the server, simply open the
              developer
              console 🖥️<br />
            </Typography>
            <Copyright />
          </Box>
        </Modal>
      </>
  );
};
