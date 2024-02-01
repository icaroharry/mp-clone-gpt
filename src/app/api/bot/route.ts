import openai from "@/utils/openai";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  const { key, chat } = await req.json();

  const { messages } = chat;

  const chatCompletion = await openai(key).chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });

  const message = chatCompletion.choices[0].message;

  let newTitle = chat.title;

  if (chat.title === "Nova conversa") {
    const chatCompletionTitle = await openai(key).chat.completions.create({
      messages: [
        ...messages,
        message,
        {
          role: "user",
          content:
            "Retorne um título de até 25 caracters para o chat acima. Retorne apenas o título e nada mais.",
        },
      ],
      model: "gpt-3.5-turbo",
    });

    newTitle = chatCompletionTitle.choices[0].message.content;
  }

  return NextResponse.json(
    { ...chat, title: newTitle, messages: messages.concat(message) },
    { status: HttpStatusCode.Ok }
  );
}
