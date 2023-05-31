import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { utapi } from "uploadthing/server";

export async function DELETE(
  request: Request,
  context: { params: { key: string } }
) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const { key } = context.params;
  try {
    await utapi.deleteFiles(key);
    return NextResponse.json({ message: `deleted ${key}` }, { status: 200 });
  } catch (e) {
    throw new Error("something went wrong");
  }

}
