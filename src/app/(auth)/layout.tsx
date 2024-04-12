import Link from "next/link";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <header className="bg-blue-800">
        <div className="container mx-auto flex items-center justify-between py-6">
          <span className="text-2xl font-bold text-white">
            <Link href={`/`}>Wooking.com </Link>
          </span>
        </div>
      </header>
      {children}
    </main>
  );
};

export default layout;
