import { AttachFile } from "@mui/icons-material";
import { Box, Button, Modal, styled, Typography } from "@mui/material";
import type { FileProps } from "../../types/FileType";
import { useData } from "../../context/dataContext";
import type { ChangeEvent } from "react";

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

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement> | { target: { files: File[] } },
    id: string
  ) {
    if (event.target.files !== null) {
      updateData(event.target.files[0], id);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center align-middle">
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ bgcolor: "white", color: "black", width: 500, height: 350 }}>
          <Typography sx={{ color: "black" }}>
            File Name: {file.Name}
          </Typography>
          <Typography sx={{ color: "black" }}>Size: {file.Size} kb</Typography>
          <Typography sx={{ color: "black" }}>
            Last Modified: {file.lastModified}
          </Typography>
          <div className="border border-dotted m-4 h-56 flex flex-col items-center justify-center">
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
                onChange={(event) => handleFileChange(event, file.id)}
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
