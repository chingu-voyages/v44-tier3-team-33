"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  tile: z.string(),
  content: z.string(),
  imgs: z
    .object({
      value: z.string().url().optional().nullable(),
    })
    .array()
    .max(4),
  condition: z.number().min(1).max(5),
  author: z.string(),
});

const defaultValues = {
  tile: "",
  content: "",
  imgs: [],
  condition: 1,
  author: "",
};

type FormValues = z.infer<typeof FormSchema>;

const CreatePostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  return (
    <form
      className="flex flex-col gap-1 text-black"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <input {...register("tile")} />
      <input {...register("content")} />
      <input {...register("imgs")} />
      <input {...register("condition")} />
      <input {...register("author")} />
      <button type="submit" className="bg-blue-500">
        Submit
      </button>
    </form>
  );
};

export default CreatePostForm;
