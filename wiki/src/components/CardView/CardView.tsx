import { Card, CardContent, Typography } from "@mui/material";
import type { FileProps } from "../../types/FileType";

interface ListViewProps {
  data: FileProps[];
  handleDelete: (id: string) => void;
}

function CardView({ data, handleDelete }: ListViewProps) {
  return (
    <>
      {data.map((d) => (
        <Card>
          <CardContent>
            <Typography>{d.name}</Typography>
            <Typography>Last modified: {d.lastModified}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default CardView;
