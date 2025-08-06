import { AttachFile } from "@mui/icons-material";
import { Box, Button, Modal, styled, Typography } from "@mui/material";
import type { FileProps } from "../../types/FileType";
import { useData } from "../../context/dataContext";
import type { ChangeEvent } from "react";
import "./EditModal.css";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  file: FileProps;
}

function EditModal({ open, handleClose, file }: ModalProps) {
  const { updateData } = useData();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "black",
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement> | { target: { files: File[] } },
    id: string
  ) => {
    if (event.target.files !== null) {
      updateData(event.target.files[0], id);
    }
  };

  return (
    <div className="EditModal">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="modal-header">
            <Typography>File Name: {file.filename}</Typography>
            <Typography>Size: {file.size} kb</Typography>
          </div>

          <div className="modal-file">
            <Typography>This will be a drag and drop eventually</Typography>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              endIcon={<AttachFile />}
            >
              upload new file
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => handleFileChange(event, file._id)}
              />
            </Button>
            Supported file types: PDF, Docx. File must be under 1MB
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default EditModal;
