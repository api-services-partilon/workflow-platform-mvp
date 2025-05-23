"use client";

import Image from "next/image";
import Link from "next/link";

interface PaymentsLayoutProps {
  children: React.ReactNode;
}

const PaymentsLayout = ({ children }: PaymentsLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={50} height={39} />
            </Link>
            <p className="font-bold text-lg">Jira Clone</p>
          </div>
        </nav>
        <div>{children}</div>
      </div>
    </main>
  );
};

export default PaymentsLayout;
