import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import type { TestResult } from "../../types";
import { testFinishButtonStyle, } from "./testSessionStyles";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  result: TestResult | null;
  disciplineName: string;
  disciplineId: string | undefined;
}

export function TestResultsDialog({ open, onClose, result, disciplineName, disciplineId }: Props) {
  const navigate = useNavigate();

  return (
    <Dialog 
      open={open} 
      onClose={(event, reason) => {
        // Блокируем закрытие при клике вне диалога
        if (reason !== "backdropClick") {
          onClose();
        }
      }} 
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle>Результати тесту</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {result && (
          <>
            <Typography>Загальна/Максимально можлива кількість балів: {result.totalScore}/{result.maxTotalScore}</Typography>
            {result.results.map((r, index) => (
              <Box key={r.questionId} sx={{ mb: 2 }}>
                <Typography>
                  Питання № {index+1} ({r.questionId}):{" "}
                  {r.isCorrect ? "✅ Правильно" : r.score > 0 ? "⚠️ Частково правильно" : "❌ Неправильно"} ({r.score} бал.)
                </Typography>
                  {/* {!r.isCorrect && (
                <Typography>Правильна відповідь: {r.correctAnswer.join(", ")}</Typography>
                )} */}
                {!r.isCorrect && ( 
                  <Typography>
                    Правильна відповідь: {r.correctAnswer && r.correctAnswer.length > 0
                      ? r.correctAnswer.join(", ")
                      : ""}
                  </Typography>
                )}
              </Box>
            ))}
          </>
        )}
      </DialogContent>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, mb: 2 }}>
        <Button
          variant="contained"
          sx={{ ...testFinishButtonStyle, minWidth: "150px" }}
          onClick={() => navigate(`/test/${disciplineName}/${disciplineId}`)}
        >
          До тесту
        </Button>
        <Button
          variant="contained"
          sx={{ ...testFinishButtonStyle, minWidth: "150px", backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#115293" } }}
          onClick={() => navigate("/")}
        >
          На головну
        </Button>
      </Box>
    </Dialog>
  );
}
