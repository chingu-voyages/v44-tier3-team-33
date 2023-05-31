export type PostType = {
  _id: string;
  createdBy: string;
  createdAt: Date;
  author: string;
  title: string;
  description: string;
  imgs: string[];
  condition: BookConditionType;
  genre: BookGenreType[];
  updatedAt: Date;
  isbn: string | undefined;
  price: number;
};

export const BookConditionEnum = [
  "poor",
  "good",
  "very good",
  "like new",
] as const;
export type BookConditionType = (typeof BookConditionEnum)[number];

export const BookGenreEnum = [
  "Action and Adventure",
  "Classics",
  "Contemporary Fiction",
  "Detective and Mystery",
  "Fantasy",
  "Historical Fiction",
  "Horror",
  "Romance",
  "Science Fiction",
  "Thriller",
  "Biography and Autobiography",
  "Business and Economics",
  "Cookbooks",
  "Education",
  "History",
  "Humor",
  "Literary Criticism",
  "Memoir",
  "Natural History",
  "Philosophy",
  "Religion",
  "Self-Help",
  "Science",
  "Technology",
  "Travel",
] as const;
export type BookGenreType = (typeof BookGenreEnum)[number];

export const BookStatusEnum = ["available", "sold"] as const;
export type BookStatusType = (typeof BookStatusEnum)[number];
