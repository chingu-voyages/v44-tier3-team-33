"use client";

import { BookUploadRouter } from "@/app/api/uploadthing/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FromInput, FromTextArea, PrimaryButton } from "../utils";

const FormSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
  price: z.string(),
  genre: z.string(),
  condition: z.string(),
});

const defaultValues = {
  title: "",
  author: "",
  description: "",
  price: "",
  genre: "",
  condition: "",
};

type FormValuesType = z.infer<typeof FormSchema>;

const CreatePostForm = () => {
  const [imagesURLs, setImagesURLs] = useState<string[]>([
    "https://uploadthing.com/f/76913bd5-998c-4583-b9c9-c3ea3ccdeb3d_image.webp",
    "https://uploadthing.com/f/76913bd5-998c-4583-b9c9-c3ea3ccdeb3d_image.webp",
    "https://uploadthing.com/f/76913bd5-998c-4583-b9c9-c3ea3ccdeb3d_image.webp",
    "https://uploadthing.com/f/76913bd5-998c-4583-b9c9-c3ea3ccdeb3d_image.webp",
    "https://uploadthing.com/f/76913bd5-998c-4583-b9c9-c3ea3ccdeb3d_image.webp",
    "https://uploadthing.com/f/76913bd5-998c-4583-b9c9-c3ea3ccdeb3d_image.webp",
    "https://uploadthing.com/f/76913bd5-998c-4583-b9c9-c3ea3ccdeb3d_image.webp",
    "https://uploadthing.com/f/76913bd5-998c-4583-b9c9-c3ea3ccdeb3d_image.webp",
  ]);

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
    imagesURLs: string[];
  }) => void = async ({ data, imagesURLs }) => {
    const validateImages = z.string().url().array().min(1).max(4);
    const validateImagesParsed = validateImages.safeParse(imagesURLs);
    if (!validateImagesParsed.success) {
      // Error
      return;
    }
    //   Fetch Backend
    console.log("Data: ", data);
    console.log("Images: ", imagesURLs);
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <form
        className="flex flex-col gap-3 text-black "
        onSubmit={handleSubmit((data) => {
          submitForm({ data, imagesURLs: imagesURLs });
        })}
      >
        <FromInput
          type="text"
          label="Title"
          name="title"
          placeholder="Title"
          register={register("title")}
        />
        <FromInput
          type="text"
          label="Author"
          name="author"
          placeholder="Author"
          register={register("author")}
        />
        <FromTextArea
          name="description"
          label="Description"
          placeholder="Description"
          register={register("description")}
        />
        <FromInput
          type="number"
          label="Price"
          name="price"
          placeholder="Price"
          register={register("price")}
        />
        <FromInput
          type="text"
          label="Condition"
          name="condition"
          placeholder="Condition"
          register={register("condition")}
        />

        <div className="flex h-44 items-center justify-center overflow-y-hidden overflow-x-scroll border border-gray-600 p-2">
          {imagesURLs.length <= 0 ? (
            <div className="text-red-500">Please upload at least one image</div>
          ) : (
            <div className="flex gap-2">
              {imagesURLs.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  height={150}
                  width={100}
                  alt="img"
                  className="h-[150px] w-[100px] object-scale-down"
                />
              ))}
            </div>
          )}
          {/* {imagesURLs.length > 4 ? (
            <div className="text-red-500">Please upload max 4 images only</div>
          ) : (
            ""
          )} */}
        </div>

        <PrimaryButton type="submit" label="Submit" />
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
    </div>
  );
};
