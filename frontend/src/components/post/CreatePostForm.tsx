"use client";

import { BookUploadRouter } from "@/app/api/uploadthing/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  tile: z.string(),
  content: z.string(),
  condition: z.number().min(1).max(5),
  author: z.string(),
});

const defaultValues = {
  tile: "",
  content: "",
  condition: 1,
  author: "",
};

type FormValuesType = z.infer<typeof FormSchema>;

const CreatePostForm = () => {
  const [imagesURLs, setImagesURLs] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  const submitForm: (props: {
    data: FormValuesType;
    images: string[];
  }) => void = ({ data, images }) => {
    console.log("Data: ", data);
    console.log("Images: ", images);
  };

  return (
    <div className="flex w-1/4 flex-col gap-2">
      <form
        className="flex flex-col gap-1 text-black "
        onSubmit={handleSubmit((data) => {
          submitForm({ data, images: imagesURLs });
        })}
      >
        <input {...register("tile")} />
        <input {...register("content")} />
        <input {...register("condition")} />
        <input {...register("author")} />

        <button type="submit" className="flex bg-red-500">
          Submit
        </button>
      </form>
      <UploadFiles setImages={setImagesURLs} images={imagesURLs} />
    </div>
  );
};

export default CreatePostForm;

const UploadFiles: React.FC<{
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
}> = ({ setImages, images }) => {
  return (
    <div className="w-full ">
      <UploadButton<BookUploadRouter>
        multiple={true}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          let imgs = res?.map((img) => img.fileUrl);
          if (imgs) {
            setImages(imgs);
          }
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {images.map((img, i) => (
        <div key={i}>{img}</div>
      ))}
    </div>
  );
};
