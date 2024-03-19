"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, CopyCheckIcon, Copy } from "lucide-react";
function TextCopy({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const textRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (textRef.current) {
      await navigator.clipboard.writeText(textRef.current.textContent || "");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset isCopied state after 2 seconds
    }
  };

  return (
    <div className="flex items-center rounded-lg justify-between border">
      {/* The text to be copied */}
      <pre ref={textRef} className="text-sm p-2 pl-4">
        {text}
      </pre>
      {/* Copy button */}
      <Button onClick={handleCopy} variant="ghost">
        {isCopied ? (
          <CopyCheckIcon className="h-4 w-4" />
        ) : (
          <CopyIcon className="text-slate-700 h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

export default TextCopy;
