// import { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   CircularProgress,
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Snackbar,
// } from "@mui/material";
// import { messageService } from "../../services/messageService";
// import { userService } from "../../services/userService";

// export function MessagesPage() {
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

//   // inbox
//   const [inbox, setInbox] = useState<any[]>([]);
//   const [loadingInbox, setLoadingInbox] = useState(false);

//   // conversation
//   const [conversation, setConversation] = useState<any[]>([]);
//   const [loadingConversation, setLoadingConversation] = useState(false);

//   // users (для выбора получателя)
//   const [users, setUsers] = useState<any[]>([]);
//   const [loadingUsers, setLoadingUsers] = useState(false);

//   // composer state
//   const [newMessage, setNewMessage] = useState("");
//   const [sending, setSending] = useState(false);
//   const [error, setError] = useState("");

//   // загрузка inbox
//   useEffect(() => {
//     const loadInbox = async () => {
//       setLoadingInbox(true);
//       try {
//         const data = await messageService.getInbox();
//         setInbox(data);
//       } finally {
//         setLoadingInbox(false);
//       }
//     };
//     loadInbox();
//   }, []);

//   // загрузка conversation
//   useEffect(() => {
//     if (!selectedUserId) return;
//     const loadConversation = async () => {
//       setLoadingConversation(true);
//       try {
//         const data = await messageService.getConversation(selectedUserId);
//         setConversation(data);
//       } finally {
//         setLoadingConversation(false);
//       }
//     };
//     loadConversation();
//   }, [selectedUserId]);

//   // загрузка списка пользователей для Select
//   useEffect(() => {
//   const loadUsers = async () => {
//     setLoadingUsers(true);
//     try {
//       const me = await userService.getCurrentUser();
//       //const allUsers = await userService.getAllUsers();
//       const allUsers = await userService.getAllowedContacts()
//       setUsers(allUsers.filter((u) => u.id !== me.id)); // исключаем себя
//     } catch {
//       setError("Неможливо завантажити список користувачів");
//     } finally {
//       setLoadingUsers(false);
//     }
//   };
//   loadUsers();
// }, []);


//   // отправка сообщения
//   const handleSend = async () => {
//     if (!selectedUserId) {
//       setError("Виберіть одержувача перед надсиланням повідомлення");
//       return;
//     }
//     if (!newMessage.trim()) return;

//     setSending(true);
//     try {
//       const sent = await messageService.sendMessage(selectedUserId, newMessage);
//       setConversation((prev) => [...prev, sent]);
//       setNewMessage("");
//     } catch {
//       setError("Помилка при надсиланні повідомлення");
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <Grid container spacing={2}>
//       {/* Левая панель — список диалогов */}
//       <Grid size={{ xs: 12, md: 4 }}>
//         <Paper sx={{ p: 2, height: "80vh", overflowY: "auto" }}>
//           <Typography variant="h6">Діалоги</Typography>
//           {loadingInbox ? (
//             <CircularProgress />
//           ) : inbox.length > 0 ? (
//             inbox.map((msg) => (
//               <Box
//                 key={msg.id}
//                 sx={{
//                   p: 1,
//                   borderBottom: "1px solid #eee",
//                   cursor: "pointer",
//                 }}
//                 onClick={() =>
//                   setSelectedUserId(
//                     msg.senderId === 1 ? msg.receiverId : msg.senderId
//                   )
//                 }
//               >
//                 <Typography variant="body2">{msg.content}</Typography>
//               </Box>
//             ))
//           ) : (
//             <Typography variant="body2" sx={{ mt: 2 }}>
//               Сообщений пока нет
//             </Typography>
//           )}
//         </Paper>
//       </Grid>

//       {/* Правая панель — конкретный диалог */}
//       <Grid size={{ xs: 12, md: 8 }}>
//         <Paper
//           sx={{
//             p: 2,
//             height: "80vh",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
//             {loadingConversation ? (
//               <CircularProgress />
//             ) : conversation.length > 0 ? (
//               conversation.map((m) => (
//                 <Typography
//                   key={m.id}
//                   align={m.senderId === 1 ? "right" : "left"}
//                 >
//                   {m.content}
//                 </Typography>
//               ))
//             ) : (
//               <Typography variant="body2" color="text.secondary">
//                 Выберите собеседника или создайте новое сообщение
//               </Typography>
//             )}
//           </Box>

//           {/* Composer */}
//           <Box sx={{ mt: 2, display: "flex", gap: 1, alignItems: "center" }}>
//             {/* Список пользователей для выбора получателя */}
//             <FormControl sx={{ minWidth: 150 }}>
//               <InputLabel>Получатель</InputLabel>
//               <Select
//                 value={selectedUserId ?? ""}
//                 onChange={(e) => setSelectedUserId(Number(e.target.value))}
//                 label="Получатель"
//                 disabled={loadingUsers}
//               >
//                 {users.map((u) => (
//                   <MenuItem key={u.id} value={u.id}>
//                     {u.fullname}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <TextField
//               fullWidth
//               size="small"
//               placeholder="Введите сообщение..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               onClick={handleSend}
//               disabled={sending}
//             >
//               Отправить
//             </Button>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Ошибки */}
//       <Snackbar
//         open={!!error}
//         autoHideDuration={4000}
//         onClose={() => setError("")}
//         message={error}
//       />
//     </Grid>
//   );
// }


// import { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   CircularProgress,
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Snackbar,
//   IconButton,
//   Badge,
//   Divider,
//   useTheme,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { messageService } from "../../services/messageService";
// import { userService } from "../../services/userService";
// import type { MessageDto, ThreadSummary } from "../../types";
// import { color } from "framer-motion";

// export function MessagesPage() {
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
//   const [currentUserId, setCurrentUserId] = useState<number | null>(null);

//   // inbox (список диалогов)
//   const [threads, setThreads] = useState<ThreadSummary[]>([]);
//   const [loadingThreads, setLoadingThreads] = useState(false);

//   // conversation (переписка)
//   const [conversation, setConversation] = useState<MessageDto[]>([]);
//   const [loadingConversation, setLoadingConversation] = useState(false);

//   // список пользователей (для отправки новых сообщений)
//   const [users, setUsers] = useState<any[]>([]);
//   const [loadingUsers, setLoadingUsers] = useState(false);

//   // composer state
//   const [newMessage, setNewMessage] = useState("");
//   const [sending, setSending] = useState(false);
//   const [error, setError] = useState("");

//   const theme = useTheme();

//   // загрузка текущего пользователя
//   useEffect(() => {
//     const loadMe = async () => {
//       const me = await userService.getCurrentUser();
//       setCurrentUserId(me.id);
//     };
//     loadMe();
//   }, []);

//   useEffect(() => {
//   const loadThreads = async () => {
//     setLoadingThreads(true);
//     try {
//       const raw = await messageService.getInbox();
//       // Преобразуем массив сообщений в ThreadSummary
//       const mapped: ThreadSummary[] = raw.map((msg: any) => ({
//         withUser: {
//           id: msg.senderId,
//           username: msg.senderName,
//         },
//         lastMessage: {
//           id: msg.id,
//           senderId: msg.senderId,
//           receiverId: msg.receiverId,
//           content: msg.content,
//           sentAt: msg.sentAt,
//           readAt: msg.readAt,
//         },
//         unreadCount: msg.isRead ? 0 : 1,
//       }));
//       setThreads(mapped);
//     } catch (err) {
//       console.error("Ошибка загрузки:", err);
//     } finally {
//       setLoadingThreads(false);
//     }
//   };
//   loadThreads();
// }, []);


//   // загрузка conversation (переписка с пользователем)
//   useEffect(() => {
//     if (!selectedUserId) return;
//     const loadConversation = async () => {
//       setLoadingConversation(true);
//       try {
//         const data = await messageService.getConversation(selectedUserId);
//         setConversation(data);

//         // отметить входящие как прочитанные
//         if (currentUserId) {
//           const unread = data.filter(
//             (m) => !m.readAt && m.receiverId === currentUserId
//           );
//           unread.forEach((m) => messageService.markAsRead(m.id));
//         }
//       } finally {
//         setLoadingConversation(false);
//       }
//     };
//     loadConversation();
//   }, [selectedUserId, currentUserId]);

//   // загрузка пользователей (для Select получателя)
//   useEffect(() => {
//     const loadUsers = async () => {
//       setLoadingUsers(true);
//       try {
//         const contacts = await userService.getAllowedContacts();
//         setUsers(contacts);
//       } catch {
//         setError("Не удалось загрузить список пользователей");
//       } finally {
//         setLoadingUsers(false);
//       }
//     };
//     loadUsers();
//   }, []);

//   // отправка сообщения с проверкой наличия 
//   const handleSend = async () => {
//     if (!selectedUserId) {
//       setError("Выберите получателя перед отправкой сообщения");
//       return;
//     }

//     // находим выбранного пользователя
//     const selectedUser = users.find((u) => u.id === selectedUserId);

//     if (!selectedUser) {
//       setError("Получатель не найден");
//       return;
//     }

//     if (!selectedUser.username || !selectedUser.username.trim()) {
//       setError("У выбранного получателя не заполнено имя пользователя");
//       return;
//     }

//     if (!newMessage.trim()) {
//       setError("Введите текст сообщения");
//       return;
//     }

//     setSending(true);
//     try {
//       const sent = await messageService.sendMessage(selectedUserId, newMessage);
//       setConversation((prev) => [...prev, sent]);
//       setNewMessage("");
//     } catch {
//       setError("Ошибка при отправке сообщения");
//     } finally {
//       setSending(false);
//     }
//   };


//   // удаление сообщения
//   const handleDelete = async (id: number) => {
//     try {
//       await messageService.deleteMessage(id);
//       setConversation((prev) => prev.filter((m) => m.id !== id));
//     } catch {
//       setError("Не удалось удалить сообщение");
//     }
//   };

//   const getUsernameById = (id: number) =>
//     users.find((u) => u.id === id)?.userName || `User ${id}`;

//   return (
//     <Grid container spacing={2}>
//       {/* Левая панель — список диалогов */}
//       <Grid size={{ xs: 12, md: 4 }}>
//         <Paper sx={{ p: 2, height: "80vh", overflowY: "auto" }}>
//           <Typography variant="h6">Діалоги</Typography>
//           {loadingThreads ? (
//             <CircularProgress />
//           ) : threads.length > 0 ? (
//             threads
//               .filter((t) => t.withUser) // убираем записи без пользователя
//               .map((t) => (
//                 <Box
//                   key={t.withUser!.id}
//                   sx={{
//                     p: 1,
//                     borderBottom: "1px solid #eee",
//                     cursor: "pointer",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     gap: 1,
//                   }}
//                   onClick={() => setSelectedUserId(t.withUser!.id)}
//                 >
//                   <Typography variant="body2" sx = {{color:theme.palette.primary.main}}>
//                     {t.withUser?.username ?? "Неизвестный пользователь"}
//                   </Typography>

//                   <Divider orientation="vertical" flexItem />

//                   <Badge color="primary" badgeContent={t.unreadCount}>
//                     <Typography variant="body2" color="text.secondary">
//                       {t.lastMessage?.content ?? ""}
//                     </Typography>
//                   </Badge>
//                 </Box>
//               ))
//           ) : (
//             <Typography variant="body2" sx={{ mt: 2 }}>
//               Диалогов пока нет
//             </Typography>
//           )}

//         </Paper>
//       </Grid>

//       {/* Правая панель — конкретный диалог */}
//       <Grid size={{ xs: 12, md: 8 }}>
//         <Paper
//           sx={{
//             p: 2,
//             height: "80vh",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
//             {loadingConversation ? (
//               <CircularProgress />
//             ) : conversation.length > 0 ? (
//               conversation.map((m) => (
//                 <Box
//                   key={m.id}
//                   sx={{
//                     display: "flex",
//                     justifyContent:
//                       m.senderId === currentUserId ? "flex-end" : "flex-start",
//                     mb: 1,
//                   }}
//                 >
//                   <Paper
//                     sx={{
//                       p: 1,
//                       bgcolor:
//                         m.senderId === currentUserId
//                           ? "primary.light"
//                           : "grey.200",
//                       position: "relative",
//                     }}
//                   >
//                     <Typography variant="caption" color="text.secondary">
//                       {m.senderId === currentUserId
//                         ? `Вы → ${getUsernameById(m.receiverId)}`
//                         : `${getUsernameById(m.senderId)} → Вам`}
//                     </Typography>
//                     <Typography>{m.content}</Typography>
//                     <IconButton
//                       size="small"
//                       sx={{ position: "absolute", top: 0, right: 0 }}
//                       onClick={() => handleDelete(m.id)}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Paper>
//                 </Box>
//               ))
//             ) : (
//               <Typography variant="body2" color="text.secondary">
//                 Выберите собеседника или создайте новое сообщение
//               </Typography>
//             )}
//           </Box>

//           {/* Composer */}
//           <Box sx={{ mt: 2, display: "flex", gap: 1, alignItems: "center" }}>
//             <FormControl sx={{ minWidth: 150 }}>
//               <InputLabel>Получатель</InputLabel>
//               <Select
//                 value={selectedUserId ?? ""}
//                 onChange={(e) => setSelectedUserId(Number(e.target.value))}
//                 label="Получатель"
//                 disabled={loadingUsers}
//               >
//                 {users.map((u) => (
//                   <MenuItem key={u.id} value={u.id}>
//                     {u.username}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <TextField
//               fullWidth
//               size="small"
//               placeholder="Введите сообщение..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               onClick={handleSend}
//               disabled={sending}
//             >
//               Отправить
//             </Button>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Ошибки */}
//       <Snackbar
//         open={!!error}
//         autoHideDuration={4000}
//         onClose={() => setError("")}
//         message={error}
//       />
//     </Grid>
//   );
// }


import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  IconButton,
  Badge,
  Divider,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { messageService } from "../../services/messageService";
import { userService } from "../../services/userService";
import type { MessageDto, ThreadSummary } from "../../types";

export function MessagesPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<MessageDto | null>(null); // Изменено на одно сообщение
  const [isModalOpen, setIsModalOpen] = useState(false);

  // inbox (список диалогов)
  const [threads, setThreads] = useState<ThreadSummary[]>([]);
  const [loadingThreads, setLoadingThreads] = useState(false);

  // conversation (переписка)
  const [conversation, setConversation] = useState<MessageDto[]>([]);
  const [loadingConversation, setLoadingConversation] = useState(false);

  // список пользователей (для отправки новых сообщений)
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // composer state
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();

  // загрузка текущего пользователя
  useEffect(() => {
    const loadMe = async () => {
      const me = await userService.getCurrentUser();
      setCurrentUserId(me.id);
    };
    loadMe();
  }, []);

  useEffect(() => {
    const loadThreads = async () => {
      setLoadingThreads(true);
      try {
        const raw = await messageService.getInbox();
        const mapped: ThreadSummary[] = raw.map((msg: any) => ({
          withUser: {
            id: msg.senderId,
            username: msg.senderName,
          },
          lastMessage: {
            id: msg.id,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            content: msg.content,
            sentAt: msg.sentAt,
            readAt: msg.readAt,
          },
          unreadCount: msg.isRead ? 0 : 1,
        }));
        setThreads(mapped);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      } finally {
        setLoadingThreads(false);
      }
    };
    loadThreads();
  }, []);

  // загрузка conversation (переписка с пользователем)
  useEffect(() => {
    if (!selectedUserId) return;
    const loadConversation = async () => {
      setLoadingConversation(true);
      try {
        const data = await messageService.getConversation(selectedUserId);
        setConversation(data);

        if (currentUserId) {
          const unread = data.filter(
            (m) => !m.readAt && m.receiverId === currentUserId
          );
          unread.forEach((m) => messageService.markAsRead(m.id));
        }
      } finally {
        setLoadingConversation(false);
      }
    };
    loadConversation();
  }, [selectedUserId, currentUserId]);

  // загрузка пользователей (для Select получателя)
  useEffect(() => {
    const loadUsers = async () => {
      setLoadingUsers(true);
      try {
        const contacts = await userService.getAllowedContacts();
        setUsers(contacts);
      } catch {
        setError("Не удалось загрузить список пользователей");
      } finally {
        setLoadingUsers(false);
      }
    };
    loadUsers();
  }, []);

  const handleSend = async () => {
    if (!selectedUserId) {
      setError("Выберите получателя перед отправкой сообщения");
      return;
    }

    const selectedUser = users.find((u) => u.id === selectedUserId);
    if (!selectedUser) {
      setError("Получатель не найден");
      return;
    }

    if (!selectedUser.username || !selectedUser.username.trim()) {
      setError("У выбранного получателя не заполнено имя пользователя");
      return;
    }

    if (!newMessage.trim()) {
      setError("Введите текст сообщения");
      return;
    }

    setSending(true);
    try {
      const sent = await messageService.sendMessage(selectedUserId, newMessage);
      setConversation((prev) => [...prev, sent]);
      setNewMessage("");
      
      const updatedThreads = await messageService.getInbox();
      const mapped: ThreadSummary[] = updatedThreads.map((msg: any) => ({
        withUser: {
          id: msg.senderId,
          username: msg.senderName,
        },
        lastMessage: {
          id: msg.id,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          content: msg.content,
          sentAt: msg.sentAt,
          readAt: msg.readAt,
        },
        unreadCount: msg.isRead ? 0 : 1,
      }));
      setThreads(mapped);
    } catch {
      setError("Ошибка при отправке сообщения");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await messageService.deleteMessage(id);
      setConversation((prev) => prev.filter((m) => m.id !== id));
      
      const updatedThreads = await messageService.getInbox();
      const mapped: ThreadSummary[] = updatedThreads.map((msg: any) => ({
        withUser: {
          id: msg.senderId,
          username: msg.senderName,
        },
        lastMessage: {
          id: msg.id,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          content: msg.content,
          sentAt: msg.sentAt,
          readAt: msg.readAt,
        },
        unreadCount: msg.isRead ? 0 : 1,
      }));
      setThreads(mapped);
    } catch {
      setError("Не удалось удалить сообщение");
    }
  };

  // ОТКРЫТИЕ МОДАЛЬНОГО ОКНА С КОНКРЕТНЫМ СООБЩЕНИЕМ
  const handleOpenMessageModal = (message: MessageDto) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const getUsernameById = (id: number) =>
    users.find((u) => u.id === id)?.userName || `User ${id}`;

  // return (
  //   <Grid container spacing={2}>
  //     {/* Левая панель — список диалогов */}
  //     <Grid size={{ xs: 12, md: 4 }}>
  //       <Paper sx={{ p: 2, height: "80vh", overflowY: "auto" }}>
  //         <Typography variant="h6">Діалоги</Typography>
  //         {loadingThreads ? (
  //           <CircularProgress />
  //         ) : threads.length > 0 ? (
  //           threads
  //             .filter((t) => t.withUser)
  //             .map((t) => (
  //               <Box
  //                 key={t.withUser!.id}
  //                 sx={{
  //                   p: 1,
  //                   borderBottom: "1px solid #eee",
  //                   cursor: "pointer",
  //                   display: "flex",
  //                   justifyContent: "space-between",
  //                   alignItems: "center",
  //                   gap: 1,
  //                   "&:hover": {
  //                     backgroundColor: theme.palette.action.hover,
  //                   },
  //                 }}
  //                 onClick={() => setSelectedUserId(t.withUser!.id)}
  //               >
  //                 <Box sx={{ flexGrow: 1 }}>
  //                   <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
  //                     {t.withUser?.username ?? "Неизвестный пользователь"}
  //                   </Typography>
  //                   <Typography 
  //                     variant="body2" 
  //                     color="text.secondary" 
  //                     noWrap
  //                     onClick={(e) => {
  //                       e.stopPropagation();
  //                       handleOpenMessageModal(t.lastMessage);
  //                     }}
  //                     sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
  //                   >
  //                     {t.lastMessage?.content ?? ""}
  //                   </Typography>
  //                 </Box>

  //                 <Badge color="primary" badgeContent={t.unreadCount} sx={{ mr: 1 }} />

  //                 <IconButton
  //                   size="small"
  //                   onClick={(e) => {
  //                     e.stopPropagation();
  //                     handleDelete(t.lastMessage.id);
  //                   }}
  //                   sx={{ color: theme.palette.error.main }}
  //                 >
  //                   <DeleteIcon fontSize="small" />
  //                 </IconButton>
  //               </Box>
  //             ))
  //         ) : (
  //           <Typography variant="body2" sx={{ mt: 2 }}>
  //             Диалогов пока нет
  //           </Typography>
  //         )}
  //       </Paper>
  //     </Grid>

  //     {/* Правая панель — конкретный диалог */}
  //     <Grid size={{ xs: 12, md: 8 }}>
  //       <Paper
  //         sx={{
  //           p: 2,
  //           height: "80vh",
  //           display: "flex",
  //           flexDirection: "column",
  //         }}
  //       >
  //         <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
  //           {loadingConversation ? (
  //             <CircularProgress />
  //           ) : conversation.length > 0 ? (
  //             conversation.map((m) => (
  //               <Box
  //                 key={m.id}
  //                 sx={{
  //                   display: "flex",
  //                   justifyContent:
  //                     m.senderId === currentUserId ? "flex-end" : "flex-start",
  //                   mb: 1,
  //                 }}
  //               >
  //                 <Paper
  //                   sx={{
  //                     p: 1,
  //                     bgcolor:
  //                       m.senderId === currentUserId
  //                         ? "primary.light"
  //                         : "grey.200",
  //                     position: "relative",
  //                     maxWidth: "70%",
  //                     cursor: 'pointer',
  //                   }}
  //                   onClick={() => handleOpenMessageModal(m)} // Открываем модальное окно при клике на сообщение
  //                 >
  //                   <Typography variant="caption" color="text.secondary">
  //                     {m.senderId === currentUserId
  //                       ? `Вы → ${getUsernameById(m.receiverId)}`
  //                       : `${getUsernameById(m.senderId)} → Вам`}
  //                   </Typography>
  //                   <Typography>{m.content}</Typography>
  //                   <IconButton
  //                     size="small"
  //                     sx={{ position: "absolute", top: 0, right: 0 }}
  //                     onClick={(e) => {
  //                       e.stopPropagation();
  //                       handleDelete(m.id);
  //                     }}
  //                   >
  //                     <DeleteIcon fontSize="small" />
  //                   </IconButton>
  //                 </Paper>
  //               </Box>
  //             ))
  //           ) : (
  //             <Typography variant="body2" color="text.secondary">
  //               Выберите собеседника или создайте новое сообщение
  //             </Typography>
  //           )}
  //         </Box>

  //         {/* Composer */}
  //         <Box sx={{ mt: 2, display: "flex", gap: 1, alignItems: "center" }}>
  //           <FormControl sx={{ minWidth: 150 }}>
  //             <InputLabel>Получатель</InputLabel>
  //             <Select
  //               value={selectedUserId ?? ""}
  //               onChange={(e) => setSelectedUserId(Number(e.target.value))}
  //               label="Получатель"
  //               disabled={loadingUsers}
  //             >
  //               {users.map((u) => (
  //                 <MenuItem key={u.id} value={u.id}>
  //                   {u.username}
  //                 </MenuItem>
  //               ))}
  //             </Select>
  //           </FormControl>

  //           <TextField
  //             fullWidth
  //             size="small"
  //             placeholder="Введите сообщение..."
  //             value={newMessage}
  //             onChange={(e) => setNewMessage(e.target.value)}
  //             onKeyPress={(e) => {
  //               if (e.key === 'Enter' && !e.shiftKey) {
  //                 e.preventDefault();
  //                 handleSend();
  //               }
  //             }}
  //           />
  //           <Button
  //             variant="contained"
  //             onClick={handleSend}
  //             disabled={sending}
  //           >
  //             Отправить
  //           </Button>
  //         </Box>
  //       </Paper>
  //     </Grid>

  //     {/* Модальное окно для просмотра ОДНОГО сообщения */}
  //     <Dialog
  //       open={isModalOpen}
  //       onClose={() => setIsModalOpen(false)}
  //       maxWidth="sm"
  //       fullWidth
  //     >
  //       <DialogTitle>
  //         Сообщение от {selectedMessage ? getUsernameById(selectedMessage.senderId) : ''}
  //       </DialogTitle>
  //       <DialogContent>
  //         <Box sx={{ mt: 2 }}>
  //           <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.5 }}>
  //             {selectedMessage?.content}
  //           </Typography>
  //           <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
  //             Отправлено: {selectedMessage?.sentAt ? new Date(selectedMessage.sentAt).toLocaleString() : ''}
  //           </Typography>
  //           {selectedMessage?.readAt && (
  //             <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
  //               Прочитано: {new Date(selectedMessage.readAt).toLocaleString()}
  //             </Typography>
  //           )}
  //         </Box>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => setIsModalOpen(false)}>Закрыть</Button>
  //       </DialogActions>
  //     </Dialog>

  //     {/* Ошибки */}
  //     <Snackbar
  //       open={!!error}
  //       autoHideDuration={4000}
  //       onClose={() => setError("")}
  //       message={error}
  //     />
  //   </Grid>
  // );
    return (
    <Grid container spacing={2}>
      {/* Левая панель — список диалогов */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2, height: "80vh", overflowY: "auto" }}>
          <Typography variant="h6">Діалоги</Typography>
          {loadingThreads ? (
            <CircularProgress />
          ) : threads.length > 0 ? (
            threads
              .filter((t) => t.withUser)
              .map((t) => (
                <Box
                  key={t.withUser!.id}
                  sx={{
                    p: 1,
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                  onClick={() => setSelectedUserId(t.withUser!.id)}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: t.unreadCount > 0 ? 600 : 400
                      }}
                    >
                      {t.withUser?.username ?? "Неизвестный пользователь"}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      noWrap
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenMessageModal(t.lastMessage);
                      }}
                      sx={{ 
                        cursor: 'pointer', 
                        '&:hover': { textDecoration: 'underline' },
                        color: t.unreadCount > 0 
                          ? theme.palette.text.primary
                          : theme.palette.text.secondary,
                        fontWeight: t.unreadCount > 0 ? 500 : 400
                      }}
                    >
                      {t.lastMessage?.content ?? ""}
                    </Typography>
                  </Box>

                  <Badge color="primary" badgeContent={t.unreadCount} sx={{ mr: 1 }} />

                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(t.lastMessage.id);
                    }}
                    sx={{ color: theme.palette.error.main }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))
          ) : (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Диалогов пока нет
            </Typography>
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
            ) : conversation.length > 0 ? (
              conversation.map((m) => (
                <Box
                  key={m.id}
                  sx={{
                    display: "flex",
                    justifyContent:
                      m.senderId === currentUserId ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Paper
                    sx={{
                      p: 1,
                      bgcolor:
                        m.senderId === currentUserId
                          ? "primary.light"
                          : "grey.200",
                      position: "relative",
                      maxWidth: "70%",
                      cursor: 'pointer',
                      borderLeft: m.readAt 
                        ? "none" 
                        : `3px solid ${theme.palette.primary.main}`
                    }}
                    onClick={() => handleOpenMessageModal(m)}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {m.senderId === currentUserId
                        ? `Вы → ${getUsernameById(m.receiverId)}`
                        : `${getUsernameById(m.senderId)} → Вам`}
                    </Typography>
                    <Typography 
                      sx={{
                        color: m.readAt 
                          ? theme.palette.text.secondary
                          : theme.palette.text.primary,
                        fontWeight: m.readAt ? 400 : 500
                      }}
                    >
                      {m.content}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ position: "absolute", top: 0, right: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(m.id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Выберите собеседника или создайте новое сообщение
              </Typography>
            )}
          </Box>

          {/* Composer */}
          <Box sx={{ mt: 2, display: "flex", gap: 1, alignItems: "center" }}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Получатель</InputLabel>
              <Select
                value={selectedUserId ?? ""}
                onChange={(e) => setSelectedUserId(Number(e.target.value))}
                label="Получатель"
                disabled={loadingUsers}
              >
                {users.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={sending}
            >
              Отправить
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Модальное окно для просмотра ОДНОГО сообщения */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Сообщение от {selectedMessage ? getUsernameById(selectedMessage.senderId) : ''}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.5,
                color: selectedMessage?.readAt 
                  ? theme.palette.text.secondary
                  : theme.palette.text.primary,
                fontWeight: selectedMessage?.readAt ? 400 : 500
              }}
            >
              {selectedMessage?.content}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              Отправлено: {selectedMessage?.sentAt ? new Date(selectedMessage.sentAt).toLocaleString() : ''}
            </Typography>
            {selectedMessage?.readAt && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Прочитано: {new Date(selectedMessage.readAt).toLocaleString()}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>

      {/* Ошибки */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
        message={error}
      />
    </Grid>
  );
}