"use client";

import { ReactElement, useEffect, useReducer, useState } from "react";

import { ChatInput } from "./_components/chat-input";
import { KeyInstructions } from "./_components/key-instructions";
import { Sidebar } from "./_components/sidebar";
import { ChatMessages } from "./_components/chat-messages";
import { useChat } from "@/hooks/use-chat";

function Home(): ReactElement {
  const [openAiKey, setOpenAiKey] = useState<string>("");
  const {
    chats,
    isLoading,
    selectedChat,
    addUserMessage,
    selectChat,
    deleteChat,
  } = useChat(openAiKey);

  const placeholder = !!openAiKey
    ? "😁 Digite um “Oi”"
    : "🔑 Digite sua chave de API";

  const handleSubmitMessage = (message: string) => {
    addUserMessage(selectedChat, message);
  };

  const handleChatSubmit = !!openAiKey ? handleSubmitMessage : setOpenAiKey;

  return (
    <div className="flex">
      <Sidebar
        isVisible={!!openAiKey}
        selectedChat={selectedChat}
        deleteChat={deleteChat}
        selectChat={selectChat}
        chats={chats}
      />

      <main className="w-full h-screen flex flex-col justify-between">
        <h1 className="text-3xl pb-5 lg:text-[45px] font-bold text-gray text-center mt-10">
          CloneGPT
        </h1>

        {!!openAiKey ? (
          <ChatMessages
            messages={chats[selectedChat].messages}
            isLoading={isLoading}
          />
        ) : (
          <KeyInstructions />
        )}

        <ChatInput
          onSubmitMessage={handleChatSubmit}
          placeholder={placeholder}
        />
      </main>
    </div>
  );
}

export default Home;
