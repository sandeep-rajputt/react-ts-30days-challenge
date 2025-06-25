export type Data = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type TableData = Data[] | "pending" | "error";

export type ItemPerPage = 5 | 10 | 20 | 50;
