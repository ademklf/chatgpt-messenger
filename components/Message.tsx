import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-my-black-light"}`}>
      <div className="mx-auto flex max-w-2xl space-x-5 px-10">
        <img src={message.user.avatar} alt="user avatar" className="h-8 w-8" />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}
export default Message;
