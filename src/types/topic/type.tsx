export type LevelType = 0 | 1 

export interface TopicDto {
  id: number;
  title: string;
  description: string;
  level: LevelType;
  disciplineId: number;
}

export interface CreateTopicDto {
  title: string;
  description: string;
  level: LevelType;
  disciplineId: number;
}

export interface UpdateTopicDto extends CreateTopicDto {
  id: number;
}
