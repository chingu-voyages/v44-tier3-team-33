"use client";

import { BookUploadRouter } from "@/app/api/uploadthing/core";
import { BookConditionEnum, BookGenreEnum } from "@/types/post.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateMimeTypes } from "uploadthing/client";
import { z } from "zod";

import {
  FromInput,
  FromSelect,
  FromTextArea,
  PrimaryButton,
  Spinner,
} from "../utils";

const { uploadFiles, useUploadThing } =
  generateReactHelpers<BookUploadRouter>();

const FormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  description: z.string().min(5, { message: "short description min 5" }),
  condition: z.string().min(1, { message: "Condition is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  genre: z.string().array().min(1, { message: "Genre is required" }),
});

const defaultValues = {
  title: "",
  author: "",
  description: "",
  price: "",
  genre: [],
  condition: "",
};

type FormValuesType = z.infer<typeof FormSchema>;

const CreatePostForm = () => {
  const [imagesURLs, setImagesURLs] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
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
      if (imagesURLs.length > 4) {
        alert("Max 4 images");
      }
      return;
    }
    // Fetch Backend
    console.log("Data: ", data);
    console.log("Images: ", imagesURLs);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <form
        className="flex flex-col gap-3 text-black lg:w-2/5"
        onSubmit={handleSubmit((data) => {
          submitForm({ data, imagesURLs: imagesURLs });
        })}
      >
        <FromInput
          type="text"
          label="Title"
          name="title"
          placeholder="Title"
          error={errors.title?.message}
          register={register("title")}
        />
        <FromInput
          type="text"
          label="Author"
          name="author"
          placeholder="Author"
          error={errors.author?.message}
          register={register("author")}
        />
        <FromTextArea
          name="description"
          label="Description"
          placeholder="Description"
          error={errors.description?.message}
          register={register("description")}
        />
        <FromInput
          type="number"
          label="Price"
          name="price"
          placeholder="Price"
          error={errors.price?.message}
          register={register("price")}
        />
        <FromSelect
          label="Condition"
          name="condition"
          multiple={false}
          error={errors.condition?.message}
          values={BookConditionEnum}
          control={control}
        />
        <FromSelect
          label="Genre"
          name="genre"
          multiple={true}
          error={errors.genre?.message}
          values={BookGenreEnum}
          control={control}
        />

        <div className="relative flex h-[170px] w-full overflow-x-scroll rounded-lg border border-gray-600 p-2">
          {imagesURLs.length <= 0 ? (
            <div className="text-red-500">
              Please upload at least one image max 4 images
            </div>
          ) : (
            <div className="relative flex gap-2">
              {imagesURLs.map((img, i) => (
                <div
                  key={img.slice(25, img.length)}
                  className=" scale-down relative flex h-[150px] w-[100px] items-center justify-center border border-gray-600 p-2 "
                >
                  <Image
                    src={img}
                    height={150}
                    width={100}
                    alt="img"
                    className="h-[150px] w-[100px] object-scale-down  "
                  />
                  <div
                    className="absolute right-0 top-0 m-0 flex cursor-pointer items-center justify-center rounded-full  bg-white px-2 py-1 text-center text-xs hover:bg-slate-950 hover:text-white "
                    onClick={async () => {
                      try {
                        // until they fix it
                        // const res = await axios.post(
                        //   `https://uploadthing.com/api/deleteFile`,
                        //   {
                        //     headers: {
                        //       "x-uploadthing-api-key":
                        //         process.env.UPLOADTHING_SECRET,
                        //     },
                        //     data: { files: [img.slice(26, img.length)] },
                        //   }
                        // );
                        // console.log("Delete Response: ", res);
                        let newImages = [...imagesURLs];
                        newImages.splice(i, 1);
                        setImagesURLs(newImages);
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    x
                  </div>
                  {imagesURLs.length > 4}
                </div>
              ))}
            </div>
          )}
        </div>
        <UploadPostButton setImages={setImagesURLs} images={imagesURLs} />
        <PrimaryButton type="submit" label="Submit" />
      </form>
    </div>
  );
};

export default CreatePostForm;

const UploadPostButton: React.FC<{
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
}> = ({ setImages, images }) => {
  const { startUpload, isUploading, permittedFileInfo } = useUploadThing({
    endpoint: "imageUploader",
    onClientUploadComplete: (res) => {
      console.log("Files: ", res);
      alert("Upload Completed");
      let newImages = res?.map((img) => img.fileUrl);
      if (newImages) {
        setImages([...images, ...newImages]);
      }
    },
    onUploadError(e) {
      console.log("ERROR: ", e);
    },
  });

  const { maxSize, fileTypes } = permittedFileInfo ?? {};

  return (
    <div className="flex w-full flex-col gap-2">
      <div className=" flex w-full flex-col items-center gap-2">
        <label
          htmlFor="fileInput"
          className=" flex cursor-pointer items-center justify-center rounded-full border border-gray-500 px-3 py-2 text-black transition-colors duration-500 hover:bg-blue-600"
        >
          <input
            name="fileInput"
            id="fileInput"
            className="hidden"
            type="file"
            multiple={true}
            max={4}
            accept={generateMimeTypes(fileTypes ?? []).join(", ")}
            disabled={isUploading}
            onChange={async (e) => {
              console.log(e.target.files);
              if (
                e.target.files?.length &&
                e.target.files?.length > 4 &&
                e.target.files?.length === 0
              ) {
                alert("Min 1 and Max 4 images");
                return;
              } else if (e.target.files) {
                startUpload(Array.from(e.target.files));
              }
            }}
          />
          <span className="p-1 text-black">
            {isUploading ? <Spinner /> : `Choose Files`}
          </span>
        </label>
        <div className="h-[1.25rem]">
          {fileTypes && (
            <p className="text-xs leading-5 text-gray-600">
              {`${fileTypes.join(", ")}`}{" "}
              {maxSize && `up to ${maxSize}, ${images.length} Files Uploaded`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
