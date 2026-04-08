'use client';

import { useEffect, useState } from "react";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  handleCopy: () => Promise<string>;
  className?: string;
}

export function CopyButton({ handleCopy, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    const copyLink = await handleCopy();
    await navigator.clipboard.writeText(copyLink);
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
    <Button className={className} onClick={copy}>
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
