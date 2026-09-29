import Image from "next/image";
import { MotionTopBar } from "@/app/motion-primitives";

export function TopNav() {
  return (
    <MotionTopBar className="z-30 shrink-0 border-b border-line/40 bg-background/70 shadow-[0_1px_0_rgba(0,0,0,0.03),0_8px_24px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1280px] items-center gap-4 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[9999px] border border-line/50 bg-white shadow-sm">
            <Image
              src="/GROAP_Logo.png"
              alt="GROAP logo"
              width={44}
              height={44}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[9999px] border border-line/50 bg-white shadow-sm">
            <Image
              src="/NCCA_Logo.png"
              alt="NCCA logo"
              width={44}
              height={44}
              className="h-full w-full object-contain"
              priority
            />
          </span>
        </div>

        <div className="h-9 w-px shrink-0 bg-line/30" aria-hidden="true" />

        <div className="min-w-0">
          <p className="text-[0.95rem] font-bold leading-tight text-ink sm:text-base">
            Government Records Officers&apos; Association of the
            Philippines, Inc. (GROAP)
          </p>
          <p className="mt-0.5 text-xs font-medium leading-tight text-muted">
            Executive Council Member of the National Committee on Archives
            under National Commission for the Culture and the Arts (NCCA)
          </p>
        </div>
      </div>
    </MotionTopBar>
  );
}
