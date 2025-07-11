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
import { useData } from "../../context/dataContext";

function CardView({ data, handleDelete, setSelected, isOpen }: ViewProps) {
  const { setErrorMsg } = useData();

  const handleSelected = (index: number) => {
    setSelected(data[index]);
    isOpen(true);
  };

  const handleDownload = async (filename: string) => {
    try {
      await fetch(`${client}/download/${filename}`).then((res) => {
        res.blob().then((blob) => {
          const fileURL = window.URL.createObjectURL(blob);
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = filename;
          alink.click();
        });
      });
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  return (
    <>
      <div className="CardView">
        {data.map((d, index) => (
          <Card key={index} sx={{ margin: 2, width: 275 }} component="div">
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <IconButton
                sx={{ position: "relative", left: 200, width: 50 }}
                onClick={() => handleDelete(d._id)}
              >
                <Delete color="error" fontSize="small" />
              </IconButton>
              <Typography>{d.filename}</Typography>
              <Typography>{d.size} kb</Typography>
              <Divider />
            </CardContent>
            <CardActions>
              <Button endIcon={<Edit />} onClick={() => handleSelected(index)}>
                Edit
              </Button>
              <Button
                endIcon={<Download />}
                onClick={() => handleDownload(d.filename)}
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
