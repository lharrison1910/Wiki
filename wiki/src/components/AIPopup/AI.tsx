import { Close, Minimize, RestartAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { client } from "../../utils/client/client";

interface ChatType {
  role: string;
  text: string;
}
function AI() {
  const [toSend, updateToSend] = useState<string>("");
  const [chat, setChat] = useState<ChatType[]>([]);

  async function handleChat() {
    setChat([...chat, { role: "user", text: toSend }]);

    const response = await fetch(`${client}/chat`, {
      method: "post",
      body: JSON.stringify({ text: toSend }),
    });

    if (!response.ok) {
      throw new Error(`something went wrong`);
    }

    const json = await response.json();
    setChat([...chat, { role: "system", text: json }]);
  }

  function handleReset() {
    setChat([]);
  }

  return (
    <div className="w-64 bg-white shadow-md">
      <Box>
        <div className="shadow-md text-black">
          <IconButton onClick={handleReset}>
            <RestartAlt fontSize="small" />
          </IconButton>
          Chat
          <IconButton sx={{ marginLeft: 10 }}>
            <Minimize fontSize="small" />
          </IconButton>
          <IconButton>
            <Close fontSize="small" />
          </IconButton>
        </div>
        <div className="h-72 flex flex-col items-center justify-end ">
          <div className="w-full text-black overflow-auto border-black border-1">
            {chat.map((c, index) => (
              <Paper
                sx={{ width: "50%", marginLeft: 1, marginTop: 1 }}
                key={index}
              >
                {c.text}
              </Paper>
            ))}
          </div>

          <Divider />
          <TextField
            sx={{ width: "95%", margin: 1 }}
            onChange={(event) => updateToSend(event.target.value)}
          />
          <Button
            onClick={handleChat}
            variant="contained"
            sx={{ width: "100%" }}
          >
            Send
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default AI;
