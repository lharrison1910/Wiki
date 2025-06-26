import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import type { FileProps } from "../../types/FileType";
import { Delete, Download, Edit } from "@mui/icons-material";
import EditModal from "../EditPopup/EditModel";
import { useState } from "react";
import { client } from "../../utils/client/client";

interface ListViewProps {
  data: FileProps[];
  handleDelete: (id: string) => void;
}

function CardView({ data, handleDelete }: ListViewProps) {
  const [open, isOpen] = useState(false);
  const [selected, setSelected] = useState<FileProps>({
    id: "",
    Name: "",
    Size: 0,
    lastModified: "",
    Path: "",
  });

  const handleClose = () => {
    isOpen(false);
  };

  function handleSelected(index: number) {
    setSelected(data[index]);
    isOpen(true);
  }

  async function handleDownload(id: string) {
    await fetch(`${client}/download/${id}`).then((res) => {
      res.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Sample.pdf";
        alink.click();
      });
    });
  }
  return (
    <>
      <div className="flex flex-wrap justify-center align-middle items-center">
        {data.map((d, index) => (
          <Card key={index} sx={{ margin: 2, width: 275 }} component="div">
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <IconButton
                sx={{ position: "relative", left: 200, width: 50 }}
                onClick={() => handleDelete(d.id)}
              >
                <Delete color="error" fontSize="small" />
              </IconButton>
              <Typography>{d.Name}</Typography>
              <Typography>{d.Size} kb</Typography>
              <Typography>Last modified: {d.lastModified}</Typography>
              <Divider />
            </CardContent>
            <CardActions>
              <Button endIcon={<Edit />} onClick={() => handleSelected(index)}>
                Edit
              </Button>
              <Button
                endIcon={<Download />}
                onClick={() => handleDownload(d.id)}
              >
                Download
              </Button>
            </CardActions>
          </Card>
        ))}
        <EditModal open={open} handleClose={handleClose} file={selected} />
      </div>
    </>
  );
}

export default CardView;
