export const bannerMap: Record<number, { src: string; alt: string }> = {
    1: { src: "/banners/history.jpg", alt: "Історія України" },
    2: { src: "/banners/math.jpg", alt: "Математика" },
    3: { src: "/banners/informatics.jpg", alt: "Інформатика" },
    4: { src: "/banners/physics.jpg", alt: "Фізика" },
    5: { src: "/banners/english.jpg", alt: "Англійська мова" },
    6: { src: "/banners/ukrainian.jpg", alt: "Українська мова" },
    7: { src: "/banners/polish.jpg", alt: "Польська мова" },
    1001: { src:"/banners/chemistry.jpg", alt: "Хімія" },
};

export interface Banner {
  src: string;
  alt: string;
}
export const bannerExam: Banner = {src:"/banners/taking_exam.jpg", alt:"Екзамін"};

export const disciplinesGenitive: Record<string, string> = {
    "Історія України": "Історії України",
    "Математика": "Математики",
    "Інформатика": "Інформатики",
    "Фізика": "Фізики",
    "Англійська мова": "Англійської мови",
    "Українська мова": "Української мови",
    "Хімія": "Хімії",
};