import { Box, Button } from "@mui/material";

interface Props {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
  onSave: () => void;
}

export function TestNavigation({ currentIndex, total, onPrev, onNext, onFinish, onSave }: Props) {
  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
      <Button variant="contained" color="primary" onClick={() => {onSave(); onNext();}}>
        Зберегти відповідь
      </Button>

      <Box>
        <Button
          variant="outlined"
          disabled={currentIndex === 0}
          onClick={onPrev}
          sx={{ mr: 2 }}
        >
          Попереднє питання
        </Button>

        <Button
          variant="outlined"
          disabled={currentIndex === total - 1}
          onClick={onNext}
        >
          Наступне питання
        </Button>
      </Box>

      <Button variant="contained" color="error" onClick={onFinish}>
        Завершити тест
      </Button>
    </Box>
  );
}
