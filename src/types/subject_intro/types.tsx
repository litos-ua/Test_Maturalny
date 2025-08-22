export interface Subject {
  title: string;
  images: string[];
  description: string;
  detailedDescription?: string;
}

export interface SubjectCardProps extends Subject {
  imageRotationInterval: number;
}