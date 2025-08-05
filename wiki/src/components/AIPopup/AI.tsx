// import { Close, Minimize, RestartAlt } from "@mui/icons-material";
// import { Box, Button, IconButton, Paper, TextField } from "@mui/material";
// import { useState } from "react";
// import { client } from "../../utils/client/client";
// import "./AI.css";

// interface ModelProps {
//   model: string;
//   created_at: string;
//   message: {
//     role: string;
//     content: string;
//   };
//   done_reason: string;
//   done: boolean;
//   total_duration: number;
//   load_duration: number;
//   prompt_eval_count: number;
//   prompt_eval_duration: number;
//   eval_count: number;
//   eval_duration: number;
// }
// interface UserProps {
//   message: {
//     role: string;
//     content: string;
//   };
// }

// function AI() {
//   const [toSend, updateToSend] = useState<string>("");
//   const [chat, setChat] = useState<(UserProps | ModelProps)[]>([]);
//   const [open, isOpen] = useState(false);

//   async function handleChat() {
//     setChat([...chat, { message: { role: "user", content: toSend } }]);
//     updateToSend("");

//     const response = await fetch(`${client}/LLM/chat`, {
//       method: "post",
//       body: JSON.stringify({ text: toSend }),
//     });

//     if (!response.ok) {
//       throw new Error(`something went wrong`);
//     }

//     const json = await response.json();
//     setChat([...chat, json]);
//   }

//   function handleReset() {
//     setChat([]);
//   }

//   function handleMinimise() {
//     isOpen(false);
//   }

//   function handleClose() {
//     handleReset();
//     handleMinimise();
//   }

//   if (open) {
//     return (
//       <div className="chatBox">
//         <Box>
//           <div className="header">
//             <IconButton onClick={handleReset}>
//               <RestartAlt fontSize="small" />
//             </IconButton>
//             Chat
//             <IconButton sx={{ marginLeft: 13 }} onClick={handleMinimise}>
//               <Minimize fontSize="small" />
//             </IconButton>
//             <IconButton onClick={handleClose}>
//               <Close fontSize="small" />
//             </IconButton>
//           </div>
//           <div className="chat-content">
//             <div className="textBox">
//               {chat.map((c, index) => (
//                 <Paper
//                   sx={{ width: "50%", marginLeft: 1, marginTop: 1 }}
//                   key={index}
//                 >
//                   {c.message.content}
//                 </Paper>
//               ))}
//             </div>
//             <TextField
//               sx={{ width: "95%", margin: 1 }}
//               multiline
//               value={toSend}
//               onChange={(event) => updateToSend(event.target.value)}
//             />
//             <Button
//               onClick={handleChat}
//               variant="contained"
//               sx={{ width: "100%" }}
//             >
//               Send
//             </Button>
//           </div>
//         </Box>
//       </div>
//     );
//   } else {
//     return (
//       <div className="bg-white  size-15 shadow-md rounded-4xl flex justify-center">
//         <Button
//           sx={{ width: "100%", color: "black" }}
//           onClick={() => isOpen(true)}
//         >
//           Sapha
//         </Button>
//       </div>
//     );
//   }
// }

// /*
// response from api

// {
//   "model": "llama3.2",
//   "created_at": "2025-07-01T20:06:30.7459536Z",
//   "message": {
//     "role": "assistant",
//     "content": "It looks like you're testing to see if I'm working properly. Is there anything specific you'd like to talk about or ask? I'm here to help!"
//   },
//   "done_reason": "stop",
//   "done": true,
//   "total_duration": 23990047100,
//   "load_duration": 23144401400,
//   "prompt_eval_count": 29,
//   "prompt_eval_duration": 516818800,
//   "eval_count": 34,
//   "eval_duration": 326324500
// }
// */

// export default AI;
