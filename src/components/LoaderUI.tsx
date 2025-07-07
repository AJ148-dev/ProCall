import { LoaderIcon } from "lucide-react";

function LoaderUI() {
  return (
    <div className="h-[calc(100vh-4rem-1px)] flex flex-col items-center justify-center space-y-4">
      <LoaderIcon className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-md text-muted-foreground">Loading . . .</p>
    </div>
  );
}
export default LoaderUI;
