'use client';

import { useEffect, useState } from "react";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export function CopyButton({ textToCopy, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <Button className={className} onClick={handleCopy}>
      <div className="flex justify-between items-center gap-2">
        {
          isCopied
            ? <>
              <CheckCircleIcon/>
              <span>Copied!</span>
            </>
            : <>
              <DocumentDuplicateIcon />
              <span>Copy link</span>
            </>
        }
      </div>
    </Button>
  )
}
