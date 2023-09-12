import * as react from "react";
import { UploadResult } from "@/service/webService";
import { Card } from "../ui/card";

interface MessageProps {
  from: "me" | "ai";
  msg: UploadResult;
}

export const Message = react.memo((props: MessageProps) => {
  return (
    <>
      {props.from === "ai" && (
        <audio
          src={props.msg.answer.voice_path}
          controls
          autoPlay
          className="h-10 mt-5"
        />
      )}
      <Card
        className={`${
          props.from === "me"
            ? "bg-green-300 self-end rounded-br-none"
            : "rounded-bl-none"
        } w-fit max-w-[600px] px-2 py-1 whitespace-pre-wrap relative flex items-center text-justify`}
      >
        {props.from === "ai" ? props.msg.answer.text : props.msg.prompt}
      </Card>
    </>
  );
});
