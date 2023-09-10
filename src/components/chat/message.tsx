import { Card } from "../ui/card";
import { PlayIcon } from "@radix-ui/react-icons";

interface MessageProps {
  lng: "en" | "fa";
  from: "me" | "ai";
  msg: string;
}

export default function Message(props: MessageProps) {
  return (
    <Card
      className={`${props.lng === "fa" && "text-right"} ${
        props.from === "me"
          ? "bg-green-300 self-end rounded-br-none"
          : "rounded-bl-none"
      } w-fit max-w-[600px] px-2 py-1 whitespace-pre-wrap relative flex items-center`}
    >
      {props.msg}
      {props.from === "ai" && (
        <span
          className={`absolute p-0.5 -translate-y-1/2 border border-black border-solid rounded-full top-1/2 -right-7`}
        >
          <PlayIcon className="" cursor="pointer" />
        </span>
      )}
    </Card>
  );
}
