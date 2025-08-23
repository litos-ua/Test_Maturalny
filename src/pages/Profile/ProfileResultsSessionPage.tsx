import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Pagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { userProfileService } from "../../services";
import type { ProfileSessionDto, ProfileSessionQuestionDetailDto, PagedResult } from "../../types";
import { useAuth } from "../../context";
import * as commonStyles from "./ProfileStyles";
import * as styles from "./profileResultsStyles";
import  {configObj} from "../../constants"

export const ProfileResultsSession = () => {
  const { userData } = useAuth();
  const userId = userData?.id;
  const [pagedSessions, setPagedSessions] = useState<PagedResult<ProfileSessionDto> | null>(null);
  const [page, setPage] = useState(configObj.pagination.startPage || 1);
  const [pageSize, setPageSize] = useState(configObj.pagination.pageSize || 10);  
  const [selectedResult, setSelectedResult] = useState<ProfileSessionQuestionDetailDto[] | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [currentSessionScore, setCurrentSessionScore] = useState<number | null>(null);
  

  useEffect(() => {
    if (!userId) return;
    userProfileService.getCompletedSessions(userId, page, pageSize).then(setPagedSessions);
  }, [userId, page, pageSize]);

  const formatDateTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (iso: string) => {
    const [h, m] = iso.split(":");
    return `${h}г ${parseInt(m)}хв`;
  };

  return (
    <Box sx={styles.resultsWrapper}>
      <Typography variant="h5" gutterBottom sx={commonStyles.sectionTitle}>
        Завершені сесії тестів. 
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {/* Заголовки */}
          <Grid size = {{xs:12}}>
            <Paper sx={styles.headerPaper}>
              <Box sx={{ ...styles.cell, flex: 1 }}>Номер</Box>
              <Box sx={{ ...styles.cell, flex: 2 }}>Предмет</Box>
              <Box sx={{ ...styles.cell, flex: 2 }}>Початок</Box>
              <Box sx={{ ...styles.cell, flex: 2 }}>Загальний час</Box>
              <Box sx={{ ...styles.cell, flex: 1 }}>Загальний бал</Box>
              <Box sx={{ flex: 1 }} />
            </Paper>
          </Grid>

          {/* Сессии */}
          
          {pagedSessions?.items.map((s) => (
            <Grid size = {{xs:12}} key={s.sessionId}>
              <Paper sx={styles.rowPaper}>
                <Box sx={{ ...styles.cell, flex: 1 }}>{s.sessionId}</Box>
                <Box sx={{ ...styles.cell, flex: 2 }}>{s.disciplineName}</Box>
                <Box sx={{ ...styles.cell, flex: 2 }}>{formatDateTime(s.startedAt)}</Box>
                <Box sx={{ ...styles.cell, flex: 2 }}>{formatDuration(s.duration)}</Box>
                <Box sx={{ ...styles.cell, flex: 1 }}>{s.totalScore}</Box>
                <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setCurrentSessionId(s.sessionId);
                      setCurrentSessionScore(s.totalScore);
                      userProfileService.getSessionResults(s.sessionId).then(setSelectedResult);
                    }}
                  >
                    Деталі
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Пагинация */}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil((pagedSessions?.totalCount || 0) / (pagedSessions?.pageSize || pageSize))}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          color="primary"
          showFirstButton
          showLastButton
          sx={styles.pagination}
        />
        <Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1); // Сброс на первую страницу при изменении размера
          }}
          sx={{ ml: 2, width: 80 }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </Box>

      


      {/* Диалог */}
      <Dialog
        open={selectedResult !== null}
        onClose={() => {}}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={styles.dialogTitle}>
          Результати сесії (загальний бал з тесту: {currentSessionScore !== null ? currentSessionScore : '--'})
          <IconButton
            aria-label="close"
            onClick={() => setSelectedResult(null)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedResult?.length ? (
            selectedResult.map((q) => (
              <Box key={`${currentSessionId}-${q.questionNumber}`} sx={styles.questionBox}>
                <Typography variant="subtitle1">
                  {q.questionNumber}. {q.questionText}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Тема: {q.topicTitle} | Бал: {q.score} / {q.maxScore}
                </Typography>
                <Typography>
                  {q.score >= q.maxScore
                    ? "✅ Правильно"
                    : q.score > 0
                    ? "⚠️ Частково правильно"
                    : "❌ Неправильно"}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Немає даних для відображення
            </Typography>
          )}
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
            На усі номери відповідей, які відсутні у списку, не було дано відповіді
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSelectedResult(null)}
            variant="contained"
            sx={{ m: 2 }}
          >
            Закрити
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};





