import { useEffect, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  CircularProgress,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { fetchDisciplines } from "../../api";

interface TestMenuMobileProps {
  onClose: () => void;
}

export function TestMenuMobile({ onClose }: TestMenuMobileProps) {
  const [open, setOpen] = useState(false);
  const [disciplines, setDisciplines] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    onClose();
  };

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary="Тести" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {loading ? (
          <ListItemButton>
            <CircularProgress size={20} />
          </ListItemButton>
        ) : disciplines.length === 0 ? (
          <ListItemButton disabled>
            <Typography variant="body2">Нет данных</Typography>
          </ListItemButton>
        ) : (
          <List component="div" disablePadding>
            {disciplines.map((discipline) => (
              <ListItemButton
                key={discipline.id}
                sx={{ pl: 4 }}
                onClick={() => handleSelect(discipline.name, discipline.id)}
              >
                <ListItemText primary={discipline.name} />
              </ListItemButton>
            ))}
          </List>
        )}
      </Collapse>
    </>
  );
}
