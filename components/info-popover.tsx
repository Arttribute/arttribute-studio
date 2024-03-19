import { InfoIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function InfoPopover({ infoText }: { infoText: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <InfoIcon className="h-3 w-3 text-muted-foreground m-0.5" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <p className="text-xs text-muted-foreground">{infoText}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
