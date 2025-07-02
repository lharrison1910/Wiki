import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Download, Edit } from "@mui/icons-material";
import { client } from "../../utils/client/client";
import type { ViewProps } from "../../types/ViewProps";
import "./CardView.css";

function CardView({ data, handleDelete, setSelected, isOpen }: ViewProps) {
  const handleSelected = (index: number) => {
    setSelected(data[index]);
    isOpen(true);
  };

  const handleDownload = async (name: string) => {
    await fetch(`${client}/download/${name}`).then((res) => {
      res.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Sample.pdf";
        alink.click();
      });
    });
  };

  return (
    <>
      <div className="CardView">
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
                onClick={() => handleDownload(d.Name)}
              >
                Download
              </Button>
            </CardActions>
          </Card>
        ))}
        {/* <EditModal open={open} handleClose={handleClose} file={selected} /> */}
      </div>
    </>
  );
}

export default CardView;
