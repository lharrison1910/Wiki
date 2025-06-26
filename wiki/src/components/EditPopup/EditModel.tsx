import { AttachFile } from "@mui/icons-material";
import { Box, Button, Divider, Modal, styled, Typography } from "@mui/material";
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
        <Box sx={{ bgcolor: "white", color: "black", width: 500, height: 500 }}>
          <Typography sx={{ color: "black" }}>{file.FileName}</Typography>
          <Typography sx={{ color: "black" }}>{file.Size} kb</Typography>
          <Typography sx={{ color: "black" }}>{file.lastModified}</Typography>
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
              onChange={(event) => handleFileChange(event, file.id)}
            />
          </Button>
          <Divider />
        </Box>
      </Modal>
    </div>
  );
}

export default EditModal;
