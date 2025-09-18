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

export function TestMenu() {
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
  const slug = name
    .toLowerCase()
    .replace(/і/g, "i") 
    .replace(/ї/g, "i") 
    .replace(/є/g, "e") 
    .replace(/ґ/g, "g") 
    .replace(/[^a-zа-яё0-9]+/gi, "-") 
    .replace(/-+/g, "-") 
    .replace(/^-|-$/g, ""); 

  navigate(`/test/${slug}/${id}`);
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
        Тест
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