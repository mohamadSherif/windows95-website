"use client"

import { useEffect } from "react";

interface BSODProps {
  visible: boolean;
  onRestart: () => void;
}

export function BSOD({ visible, onRestart }: BSODProps) {
  useEffect(() => {
    if (!visible) return;
    
    const handleKeyDown = () => {
      onRestart();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, onRestart]);
  
  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#0000AA] text-white font-mono z-[9999] flex flex-col p-8 overflow-auto cursor-none"
      onClick={onRestart}
    >
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-center text-2xl mb-8 w95-text">Windows</h1>
        
        <p className="mb-6 leading-relaxed w95-text">
          A fatal exception 0E has occurred at 0028:C000A12B in VXD VMM(01) + 
          00010A12B. The current application will be terminated.
        </p>
        
        <p className="mb-6 leading-relaxed w95-text">
          * Press any key to terminate the current application.<br />
          * Press CTRL+ALT+DEL again to restart your computer. You will
          lose any unsaved information in all applications.
        </p>
        
        <div className="mb-8 w95-text">
          Press any key to continue <span className="animate-pulse">_</span>
        </div>
        
        <div className="text-sm w95-text">
          <p className="mb-2">Technical information:</p>
          <p>*** STOP: 0x0000000A (0x00000000, 0x00000002, 0x00000000, 0x8054F1C0)</p>
          <p>*** KMODE_EXCEPTION_NOT_HANDLED</p>
          <p className="mt-4">*** WINDOWS95-WEBSITE.EXE - Illegal Operation</p>
        </div>
      </div>
    </div>
  );
}
