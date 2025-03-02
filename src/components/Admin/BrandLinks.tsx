"use client";

import Link from "next/link";
import Image from "next/image";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

export function BrandLinks() {
  return (
    <div className="flex items-center justify-center gap-6 py-4 cursor-pointer">
      {/* Main Logo Link */}
      <Link
        href="
http://linkedin.com/in/benedict-baah"
      >
        <AiFillLinkedin className="w-12 h-12 hover:text-green-500 transition-colors" />
      </Link>
      <Link
        href="
https://github.com/BenedictBen"
      >
        <AiFillGithub className="w-12 h-12 hover:text-green-500 transition-colors" />
      </Link>
    </div>
  );
}
