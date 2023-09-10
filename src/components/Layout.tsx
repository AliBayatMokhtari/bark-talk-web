import Message from "./chat/Message";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function Layout() {
  return (
    <div className="w-full h-full bg-slate-100">
      <div className="flex flex-col h-full max-w-3xl gap-2 p-8 mx-auto">
        {/* <div className="flex justify-between">
          <h1 className="text-xl font-bold">Voice to Text</h1>
          <Button className="">Record Voice</Button>
        </div> */}
        <Card className="flex flex-col flex-1">
          <div className="flex flex-col flex-1 gap-2 p-2 overflow-auto">
            <Message from="me" msg="this is content" lng="en" />
            <Message from="ai" msg="this is content" lng="en" />
          </div>
          <div className="flex items-center gap-2 p-2">
            <div className="border border-solid h-[35px] rounded-sm flex-1"></div>
            <Button>Record</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
