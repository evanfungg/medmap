import connectMongoDB from "../../mongodb";
import Condition from "../../models/condition";
import { NextResponse } from "next/server";

export async function POST(request) {

    // to be altered according to schema
    const {name, description} = await request.json();

    await connectMongoDB();
    await Condition.create({name, description});
    return NextResponse.json(
        {message: "User created"},
        {status: 201}
        );
}