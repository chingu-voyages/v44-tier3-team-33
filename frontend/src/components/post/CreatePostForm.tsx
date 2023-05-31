"use client";

import { BookUploadRouter } from "@/app/api/uploadthing/core";
import {
  FromInput,
  FromTextArea,
  PrimaryButton,
  Spinner,
} from "@/components/utils/utils";
import { FromSelect } from "@/components/utils/utils.client";
import { BookConditionEnum, BookGenreEnum } from "@/types/post.types";
import { API } from "@/utils/fetchData";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateMimeTypes } from "uploadthing/client";
import { z } from "zod";
import { ExpandedRouteConfig } from "uploadthing/server";
import { useMutation } from "@tanstack/react-query";

const { useUploadThing } = generateReactHelpers<BookUploadRouter>();

const generatePermittedFileTypes = (config?: ExpandedRouteConfig) => {
  const fileTypes = config ? Object.keys(config) : [];

  const maxFileCount = config
    ? Object.values(config).map((v) => v.maxFileCount)
    : [];

  return { fileTypes, multiple: maxFileCount.some((v) => v && v > 1) };
};

const FormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100),
  author: z.string().min(1, { message: "Author is required" }).max(100),
  description: z
    .string()
    .min(5, { message: "short description min 5" })
    .max(300),
  condition: z.enum(BookConditionEnum),
  price: z.number().min(1, { message: "Price is required" }),
  genre: z.enum(BookGenreEnum).array().min(1, { message: "Genre is required" }),
});

const defaultValues = {
  title: "",
  author: "",
  description: "",
  price: 0,
  genre: [],
  condition: BookConditionEnum[1],
};

type FormValuesType = z.infer<typeof FormSchema>;

const CreatePostForm = () => {
  const [imagesURLs, setImagesURLs] = useState<string[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const { getToken } = useAuth();

  const deleteImage = useMutation(async (img: string) => {
    try {
      const res = await axios.delete(`/api/image/${img}`);

      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValuesType>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  const submitForm: (props: {
    data: FormValuesType;
    imagesURLs: string[];
  }) => void = async ({ data, imagesURLs }) => {
    try {
      const validateImages = z.string().url().array().min(1).max(4);
      const validateImagesParsed = validateImages.safeParse(imagesURLs);
      if (!validateImagesParsed.success) {
        // Error
        if (imagesURLs.length > 4) {
          alert("Max 4 images");
        }
        return;
      }

      const createPost =  await axios.post(
        `${API}/posts/create`,
        { post: { ...data, imagesURLs: imagesURLs } },
        { headers: { Authorization: await getToken() } }
      );
      if (createPost.status === 201) {
        setFormLoading(false);
        reset();
        alert("Post created successfully");
      }

    } catch (e) {
      setFormLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <form
        className="flex w-full flex-col gap-3 text-black lg:w-2/5"
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
          register={register("price", {
            setValueAs(value) {
              return Number(value);
            },
          })}
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

        <div className="relative flex h-[190px] w-full overflow-x-scroll rounded-lg border border-gray-600 p-2">
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
                    className="absolute right-0 top-0 m-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full  bg-red-600 px-2 py-1 text-center text-xs hover:bg-gray-500 hover:text-white "
                    onClick={async () => {
                      deleteImage.mutate(img.slice(26, img.length), {
                        onSuccess: () => {
                          let newImages = [...imagesURLs];
                          newImages.splice(i, 1);
                          setImagesURLs(newImages);
                        },
                      });
                    }}
                  >
                    {deleteImage.isLoading ? <Spinner /> : "X"}
                  </div>
                  {imagesURLs.length > 4}
                </div>
              ))}
            </div>
          )}
        </div>
        <UploadPostButton setImages={setImagesURLs} images={imagesURLs} />
        <PrimaryButton type="submit" label="Submit" isLoading={formLoading} />
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

  const { config } = permittedFileInfo ?? {};

  const { fileTypes, multiple } = generatePermittedFileTypes(
    permittedFileInfo?.config
  );
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
            accept={generateMimeTypes(fileTypes ?? [])?.join(", ")}
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
              {config?.image?.maxFileSize &&
                `up to ${config?.image?.maxFileSize}, ${images.length} Files Uploaded`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
