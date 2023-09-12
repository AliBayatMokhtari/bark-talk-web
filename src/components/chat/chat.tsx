import * as react from "react";
import { Message } from "./message";
import { UploadResult } from "@/service/webService";

interface ChatProps {
  chat: UploadResult;
}

export const Chat = react.memo((props: ChatProps) => {
  const { chat } = props;

  return (
    <div className="flex flex-col flex-1 gap-2 p-2 overflow-auto">
      <Message from="me" msg={chat} />
      <Message from="ai" msg={chat} />
    </div>
  );
});
