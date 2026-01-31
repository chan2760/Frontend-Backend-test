import { NextResponse } from "next/server";
import { getClientPromise } from "@/lib/mongodb";

import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  try {
    // ✅ FIX: params must be awaited
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const db = client.db("wad-01");

    const result = await db.collection("item").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.toString() },
      { status: 500 }
    );
  }
}
