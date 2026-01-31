import { NextResponse } from "next/server";
import { getClientPromise } from "@/lib/mongodb";


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const client = await clientPromise;
  const db = client.db("wad-01");

  const items = await db
    .collection("item")
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

  return NextResponse.json(items);
}

export async function POST(req) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("wad-01");

  const result = await db.collection("item").insertOne({
    itemName: body.itemName,
    itemCategory: body.itemCategory,
    itemPrice: body.itemPrice,
    status: body.status,
  });

  return NextResponse.json({ message: "Item added", result });
}
