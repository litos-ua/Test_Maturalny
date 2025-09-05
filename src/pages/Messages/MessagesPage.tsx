import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { messageService } from "../../services/messageService";

export function MessagesPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // состояние для inbox
  const [inbox, setInbox] = useState<any[]>([]);
  const [loadingInbox, setLoadingInbox] = useState(false);

  // состояние для conversation
  const [conversation, setConversation] = useState<any[]>([]);
  const [loadingConversation, setLoadingConversation] = useState(false);

  // загрузка inbox при монтировании
  useEffect(() => {
    const loadInbox = async () => {
      setLoadingInbox(true);
      try {
        const data = await messageService.getInbox();
        setInbox(data);
      } finally {
        setLoadingInbox(false);
      }
    };
    loadInbox();
  }, []);

  // загрузка conversation при выборе пользователя
  useEffect(() => {
    if (!selectedUserId) return;
    const loadConversation = async () => {
      setLoadingConversation(true);
      try {
        const data = await messageService.getConversation(selectedUserId);
        setConversation(data);
      } finally {
        setLoadingConversation(false);
      }
    };
    loadConversation();
  }, [selectedUserId]);

  return (
    <Grid container spacing={2}>
      {/* Левая панель — список диалогов */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2, height: "80vh", overflowY: "auto" }}>
          <Typography variant="h6">Діалоги</Typography>
          {loadingInbox ? (
            <CircularProgress />
          ) : (
            inbox.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  p: 1,
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setSelectedUserId(
                    msg.senderId === 1 ? msg.receiverId : msg.senderId
                  )
                }
              >
                <Typography variant="body2">{msg.content}</Typography>
              </Box>
            ))
          )}
        </Paper>
      </Grid>

      {/* Правая панель — конкретный диалог */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper
          sx={{
            p: 2,
            height: "80vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            {loadingConversation ? (
              <CircularProgress />
            ) : (
              conversation.map((m) => (
                <Typography
                  key={m.id}
                  align={m.senderId === 1 ? "right" : "left"}
                >
                  {m.content}
                </Typography>
              ))
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            {/* Input + send button — сделаем позже */}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
