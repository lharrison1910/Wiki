import { AttachFile } from "@mui/icons-material";
import { Box, Button, Divider, Modal, styled, Typography } from "@mui/material";
import type { FileProps } from "../../types/FileType";
import { useData } from "../../context/dataContext";

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
    event: { target: { files: File[] } } | React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files != null) {
      const form = {
        id: file.id,
        FileName: event.target.files[0].name,
        Size: event.target.files[0].size,
        lastModified: event.target.files[0].lastModified.toString(),
        file: event.target.files[0],
      };
      updateData(form);
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
              onChange={(event) => handleFileChange(event)}
            />
          </Button>
          <Divider />
        </Box>
      </Modal>
    </div>
  );
}

export default EditModal;
