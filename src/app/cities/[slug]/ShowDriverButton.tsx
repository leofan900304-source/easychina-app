"use client";

import { ExternalLink } from "lucide-react";

export default function ShowDriverButton() {
  return (
    <button className="mt-2 inline-flex items-center gap-1 rounded-full bg-celadon/10 px-3 py-1.5 text-xs font-medium text-celadon">
      🚕 Show Driver
      <ExternalLink size={12} />
    </button>
  );
}
