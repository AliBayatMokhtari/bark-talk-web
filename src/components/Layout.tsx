import { useMemo, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import audioRecorder from "@/lib/audioRecorder";
import converter from "@/lib/converter";
import webService, { UploadResult } from "@/service/webService";
import { Combobox, ComboboxOption } from "./ui/combobox";
import { Chat } from "./chat/chat";

interface LayoutProps {
  globalConfig: Record<string, string>;
  webServiceBaseUrl: string;
}

export function Layout(props: LayoutProps) {
  const { globalConfig, webServiceBaseUrl } = props;
  const ws = useMemo(() => webService(webServiceBaseUrl), []);
  const [chats, setChats] = useState<UploadResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<ComboboxOption>({
    label: globalConfig["en"],
    value: "en",
  });

  const startRecording = () => {
    setIsRecording(true);
    audioRecorder.start().then(() => {
      console.log("Recording audio");
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    audioRecorder
      .stop()
      .then((blob) => converter.blobToBase64(blob))
      .then((res) => {
        const reqBody = {
          file_name:
            Math.floor(Math.random() * (99999999999 - 1 + 1) + 1) + ".wav",
          file_content: res,
        };

        setLoading(true);

        ws.upload(selectedLang.value, reqBody)
          .then((res) => setChats((old) => [...old, res.data]))
          .finally(() => setLoading(false));
      });
  };

  const selectLangOptions = Object.keys(globalConfig).map((key) => ({
    value: key,
    label: globalConfig[key],
  }));

  return (
    <div className="w-full h-full bg-slate-100">
      <div className="flex flex-col h-full max-w-3xl gap-2 p-8 mx-auto">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Bark Talk Web</h1>
          <Combobox
            options={selectLangOptions}
            value={selectedLang}
            onChange={(newValue) => setSelectedLang(newValue)}
          />
        </div>
        <Card className="flex flex-col flex-1">
          <div className="flex flex-col flex-1 gap-2 p-2 overflow-auto">
            {chats.length ? (
              chats.map((chat) => (
                <Chat key={chat.answer.file_name} chat={chat} />
              ))
            ) : (
              <span className="flex items-center justify-center h-full text-center">
                You don't have any chats yet.
                <br />
                Use record button to start.
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 p-2">
            <div className="border border-solid h-[35px] rounded-sm flex-1"></div>
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={loading}
            >
              {loading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
              {loading
                ? "Loading"
                : isRecording
                ? "Stop Recording"
                : "Record Voice"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
