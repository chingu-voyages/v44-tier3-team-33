"use client";

import { GenreType } from "@/types/genre.type";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Filter({ genres }: { genres: GenreType[] }) {
  const [price, setPrice] = useState(100);
  const [genreId, setGenreId] = useState("");
  const router = useRouter();

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPrice(parseInt(event.target.value));
  }
  function handleGenreChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setGenreId(event.target.value);
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/filter?price=${price}&genreId=${genreId}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-baseline gap-4 md:inline-flex md:flex-row">
        <label className="">Genre</label>
        <select
          className="mb-8 cursor-pointer rounded-lg border-black bg-black p-2 text-white"
          value={genreId}
          onChange={handleGenreChange}
        >
          {genres.map((genre: GenreType) => (
            <option key={genre._id} value={genre._id}>
              {genre.genreName}
            </option>
          ))}
        </select>
      </div>
      <div className="items-bseline flex flex-col gap-4 md:ml-4 md:inline-flex md:flex-row">
        <label className="md:my-4">Price</label>
        <input type="range" defaultValue={0} onChange={handlePriceChange} />
      </div>
      <button
        className="my-8 block rounded-lg bg-emerald-500 px-6 py-2 text-white md:ml-4 md:inline-block"
        type="submit"
      >
        Apply
      </button>
    </form>
  );
}

export default Filter;
