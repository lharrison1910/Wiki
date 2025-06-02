import { Card, CardContent, Typography } from "@mui/material";

function CardView(props) {
  const name = props.name;

  return (
    <>
      <Card>
        <CardContent>
          <Typography>{name}</Typography>
          <Typography>Last modified: {}</Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default CardView;
