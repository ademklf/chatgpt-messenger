"use client";
// import type { Message } from "api-types";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { db } from "../sevices/firebase";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPromt] = useState<string>("");
  const { data: session } = useSession();

  const model = "text-davinci-003";

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPromt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("ChatGPT is thinking ...");

    await fetch(`/api/askQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    })
      .then((res) => {
        // Toast notification to say successful
        toast.success("ChatGPT has responded!", {
          id: notification,
        });
      })
      .catch((err) => {
        toast.error(`Error: ${err.message}`);
      });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex-1">
        <input
          className="flex-grow bg-transparent p-2 text-gray-100 placeholder:px-1 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPromt(e.target.value)}
          type="text"
          placeholder="Type your message here..."
        />

        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div></div>
    </div>
  );
}

export default ChatInput;
