"use client";

import { Chats } from "@/hooks/use-chat";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useState } from "react";

interface SidebarProps {
  isVisible: boolean;
  chats: Chats;
  selectedChat: string | null;
  selectChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
}

export const Sidebar = ({
  isVisible,
  chats,
  selectChat,
  selectedChat,
  deleteChat,
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(
    global.window?.innerWidth > 768
  );

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChatClick = (chatIndex: string) => {
    selectChat(chatIndex);
  };

  const handleDeleteClick = (
    ev: React.MouseEvent<HTMLButtonElement>,
    chatIndex: string
  ) => {
    ev.stopPropagation();

    deleteChat(chatIndex);
  };

  return (
    <>
      {isVisible && (
        <>
          <button
            onClick={handleClick}
            className="z-10 absolute bg-background-dark border border-border p-2 rounded-md flex items-center justify-center left-4 top-4"
          >
            <Image
              src="/images/open-menu.svg"
              width={25}
              height={16}
              alt="Abrir/fechar menu"
            />
          </button>

          <div
            className={cn(
              "bg-black/60 w-screen h-screen fixed visible md:hidden transition-all duration-300 opacity-0",
              isOpen && "opacity-100"
            )}
          ></div>

          <nav
            className={cn(
              "fixed z-10 w-0 md:relative h-screen bg-background-dark p-0 transition-all duration-300 flex-col flex overflow-hidden opacity-0",
              isOpen && "visible w-[288px] md:w-[377px] p-4 opacity-100"
            )}
          >
            <div className="flex justify-between gap-4">
              <h3 className="border border-border p-2 rounded-md text-base text-gray basis-4/5 text-center font-semibold ">
                Lista de conversas
              </h3>
              <button
                onClick={handleClick}
                className="bg-background-dark border border-border p-2 rounded-md basis-1/5 flex items-center justify-center"
              >
                <Image
                  src="/images/open-menu.svg"
                  width={25}
                  height={16}
                  alt="Abrir/fechar menu"
                />
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {Object.keys(chats).map((chatIndex) => (
                <div
                  key={chatIndex}
                  onClick={() => handleChatClick(chatIndex)}
                  className={cn(
                    "flex justify-between items-center py-2 px-3 bg-background-light rounded-lg cursor-pointer",
                    selectedChat === chatIndex && "border-border border-2"
                  )}
                >
                  <div className="flex items-center gap-3 mr-2">
                    <Image
                      src="/images/balloon.svg"
                      width={17}
                      height={18}
                      alt="Icone de chat"
                    />
                    <span className="text-white truncate text-ellipsis max-w-[180px]">
                      {chats[chatIndex].title}
                    </span>
                  </div>

                  <button
                    disabled={Object.keys(chats).length === 1}
                    onClick={(ev) => handleDeleteClick(ev, chatIndex)}
                    className="disabled:invisible"
                  >
                    <Image
                      src="/images/trash.svg"
                      width={13}
                      height={18}
                      alt="Icone de lixeira para apagar conversa"
                    />
                  </button>
                </div>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
};
