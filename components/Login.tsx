"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import chatGPTLogo from "../public/chatGPTLogo.png";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src={chatGPTLogo}
        width={300}
        height={300}
        alt="logo"
        priority
      ></Image>
      <button
        onClick={() => signIn("google")}
        type="button"
        className="animate-pulse text-3xl font-bold text-white hover:animate-none"
      >
        Sign In to use ChatGPT
      </button>
    </div>
  );
}

export default Login;
