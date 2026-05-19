import { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import { fetchDisciplines } from "../../api";
import { translit } from '../../utils';

interface DisciplineMenuDesktopProps {
  /** Базовый путь для навигации, например "/test" или "/usefulmaterials" */
  basePath: string;
  /** Текст на кнопке */
  buttonText?: string;
  /** Функция для генерации slug (опционально) */
  slugify?: (name: string) => string;
}

// Стандартная функция slugify
const defaultSlugify = (name: string): string => {
  // return name
  //   .toLowerCase()
  //   .replace(/і/g, "i")
  //   .replace(/ї/g, "i")
  //   .replace(/є/g, "e")
  //   .replace(/ґ/g, "g")
  //   .replace(/[^a-zа-яё0-9]+/gi, "-")
  //   .replace(/-+/g, "-")
  //   .replace(/^-|-$/g, "");
  return translit(name);
};

export function DisciplineMenuDesktop({
  basePath,
  buttonText = "Тест",
  slugify = defaultSlugify,
}: DisciplineMenuDesktopProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [disciplines, setDisciplines] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (name: string, id: number) => {
    const slug = slugify(name);
    navigate(`${basePath}/${slug}/${id}`);
    handleClose();
  };

  useEffect(() => {
    setLoading(true);
    fetchDisciplines()
      .then((data) => {
        if (Array.isArray(data)) {
          setDisciplines(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Button
        color="inherit"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        sx={{ textTransform: "none", fontSize: "1.2rem" }}
      >
        {buttonText}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {loading ? (
          <MenuItem>
            <CircularProgress size={20} />
          </MenuItem>
        ) : disciplines.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2">Нет данных</Typography>
          </MenuItem>
        ) : (
          disciplines.map((discipline) => (
            <MenuItem key={discipline.id} onClick={() => handleSelect(discipline.name, discipline.id)}>
              {discipline.name}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}