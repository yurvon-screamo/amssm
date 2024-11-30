import ProjectLogo from "@/assets/sigma-term.png";

export function Header() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ffff] to-[#ff69b4] p-0.5">
          <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
            <img
              className="text-[#00ffff]"
              src={ProjectLogo}
              alt="Description"
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#00ffff] to-[#ff69b4] text-transparent bg-clip-text">
            Sigma Term
          </h1>
          <p className="text-muted-foreground">
            Unified IT Infrastructure Management Console
          </p>
        </div>
      </div>
    </div>
  );
}
