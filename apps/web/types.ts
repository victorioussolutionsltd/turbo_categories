export type Category = {
  id: number;
  name: string;
  description: string;
  parent_id?: number;
  created_at: string;
  updated_at: string;
};

export type Connections = {
  [key: string]: number | null;
};
