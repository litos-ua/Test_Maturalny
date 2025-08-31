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
  useTheme,
  useMediaQuery
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { userProfileService } from "../../services";
import type { ProfileSessionDto, ProfileSessionQuestionDetailDto, PagedResult } from "../../types";
import { useAuth } from "../../context";
import * as commonStyles from "./ProfileStyles";
import * as styles from "./profileResultsStyles";
import { configObj } from "../../constants"

export const ProfileResultsSession = () => {
  const { userData } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
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
    if (isMobile) {
      return date.toLocaleString(undefined, {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
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
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        gutterBottom 
        sx={{ 
          ...commonStyles.sectionTitle,
          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
        }}
      >
        Завершені сесії тестів
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {/* Заголовки - скрываем на мобильных */}
          {!isMobile && (
            <Grid size = {{xs:12}}>
              <Paper sx={styles.headerPaper}> {/* ← ВАШ СТИЛЬ */}
                <Box sx={{ ...styles.cell, flex: { xs: 2, md: 1 } }}>Номер</Box>
                <Box sx={{ ...styles.cell, flex: { xs: 3, md: 2 }, display: { xs: 'none', sm: 'block' } }}>Предмет</Box>
                <Box sx={{ ...styles.cell, flex: { xs: 3, md: 2 } }}>Початок</Box>
                <Box sx={{ ...styles.cell, flex: { xs: 2, md: 2 }, display: { xs: 'none', md: 'block' } }}>Час</Box>
                <Box sx={{ ...styles.cell, flex: 1 }}>Бал</Box>
                <Box sx={{ flex: 1 }} />
              </Paper>
            </Grid>
          )}

          {/* Сессии */}
          {pagedSessions?.items.map((s) => (
            <Grid size = {{xs:12}} key={s.sessionId}>
              <Paper sx={styles.rowPaper}> 
                {isMobile ? (
                  // Мобильная версия
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                      <Typography variant="subtitle2">№{s.sessionId}</Typography>
                      <Typography variant="subtitle2">{s.totalScore} балів</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>{s.disciplineName}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {formatDateTime(s.startedAt)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Час: {formatDuration(s.duration)}
                    </Typography>
                    <Button variant="outlined" size="small" fullWidth>
                      Деталі
                    </Button>
                  </>
                ) : (
                  // Десктопная версия
                  <>
                    <Box sx={{ ...styles.cell, flex: { xs: 2, md: 1 } }}>{s.sessionId}</Box>
                    <Box sx={{ ...styles.cell, flex: { xs: 3, md: 2 }, display: { xs: 'none', sm: 'block' } }}>
                      {s.disciplineName}
                    </Box>
                    <Box sx={{ ...styles.cell, flex: { xs: 3, md: 2 } }}>{formatDateTime(s.startedAt)}</Box>
                    <Box sx={{ ...styles.cell, flex: { xs: 2, md: 2 }, display: { xs: 'none', md: 'block' } }}>
                      {formatDuration(s.duration)}
                    </Box>
                    <Box sx={{ ...styles.cell, flex: 1 }}>{s.totalScore}</Box>
                    <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="outlined" size="small">Деталі</Button>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          ))}
          
        </Grid>
      </Box>

      {/* Пагинация */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        mt: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Pagination
          count={Math.ceil((pagedSessions?.totalCount || 0) / (pagedSessions?.pageSize || pageSize))}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          color="primary"
          showFirstButton
          showLastButton
          size={isMobile ? "small" : "medium"}
          sx={styles.pagination}
        />
        <Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          sx={{ 
            ml: { xs: 0, sm: 2 },
            width: { xs: '100%', sm: 80 },
            mt: { xs: 1, sm: 0 }
          }}
          size={isMobile ? "small" : "medium"}
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
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          ...styles.dialogTitle, 
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          pr: 6
        }}>
          Результати сесії (загальний бал: {currentSessionScore !== null ? currentSessionScore : '--'})
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
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
          {selectedResult?.length ? (
            selectedResult.map((q) => (
              <Box key={`${currentSessionId}-${q.questionNumber}`} sx={styles.questionBox}> 
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {q.questionNumber}. {q.questionText}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                  Тема: {q.topicTitle} | Бал: {q.score} / {q.maxScore}
                </Typography>
                <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
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
          <Typography variant="body2" sx={{ 
            mt: 2, 
            fontStyle: 'italic', 
            color: 'text.secondary',
            fontSize: { xs: '0.8rem', sm: '0.9rem' }
          }}>
            На усі номери відповідей, які відсутні у списку, не було дано відповіді
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
          <Button
            onClick={() => setSelectedResult(null)}
            variant="contained"
            size={isMobile ? "small" : "medium"}
          >
            Закрити
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
