import connectMongoDB from "@/libs/mongodb";
import Condition from "@/models/condition";
import { NextResponse } from "next/server";

export async function POST(request) {

    // to be altered according to schema
    const {name, medications} = await request.json();
    console.log(medications);
    await connectMongoDB();
    await Condition.create({name, medications});
    return NextResponse.json(
        {message: "Condition created"},
        {status: 201}
        );
}