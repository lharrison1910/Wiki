import { AttachFile, Save } from "@mui/icons-material";
import { Box, Button, Divider, Modal, styled, Typography } from "@mui/material";
import { useState } from "react";
import type { FileProps } from "../../types/FileType";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  file: FileProps;
}

function EditModal({ open, handleClose, file }: ModalProps) {
  const [selectedFile, setSelectedFile] = useState(null);

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

  function handleFileChange(event: any) {
    setSelectedFile(event?.target?.files[0]);
  }

  function handleSave() {
    console.log("replace file with selected file", selectedFile);
  }

  return (
    <div className="flex flex-col justify-center items-center align-middle">
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ bgcolor: "white", color: "black", width: 500, height: 500 }}>
          <Typography sx={{ color: "black" }}>{file.FileName}</Typography>
          <Divider />
          This will be a drag drop area for the replacement file
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
              onChange={(event) => handleFileChange(event)}
            />
          </Button>
          <Divider />
          <Button
            variant="contained"
            endIcon={<Save />}
            color="success"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default EditModal;
