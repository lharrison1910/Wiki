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
  const [open, isOpen] = useState(false);

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

  function handleMinimise() {
    isOpen(false);
  }

  function handleClose() {
    handleReset();
    handleMinimise();
  }

  if (open) {
    return (
      <div className="w-64 bg-white shadow-md">
        <Box>
          <div className="shadow-md text-black">
            <IconButton onClick={handleReset}>
              <RestartAlt fontSize="small" />
            </IconButton>
            Chat
            <IconButton sx={{ marginLeft: 13 }} onClick={handleMinimise}>
              <Minimize fontSize="small" />
            </IconButton>
            <IconButton onClick={handleClose}>
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
  } else {
    return (
      <div className="bg-white  size-15 shadow-md rounded-4xl flex justify-center">
        <Button
          sx={{ width: "100%", color: "black" }}
          onClick={() => isOpen(true)}
        >
          AI thing
        </Button>
      </div>
    );
  }
}

/*
response from api

{
  "model": "llama3.2",
  "created_at": "2025-07-01T20:06:30.7459536Z",
  "message": {
    "role": "assistant",
    "content": "It looks like you're testing to see if I'm working properly. Is there anything specific you'd like to talk about or ask? I'm here to help!"
  },
  "done_reason": "stop",
  "done": true,
  "total_duration": 23990047100,
  "load_duration": 23144401400,
  "prompt_eval_count": 29,
  "prompt_eval_duration": 516818800,
  "eval_count": 34,
  "eval_duration": 326324500
}


*/

export default AI;
