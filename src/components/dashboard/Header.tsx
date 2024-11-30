import { Terminal } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ffff] to-[#ff69b4] p-0.5">
          <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
            <Terminal className="w-6 h-6 text-[#00ffff]" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#00ffff] to-[#ff69b4] text-transparent bg-clip-text">
            Sigma-term
          </h1>
          <p className="text-muted-foreground">
            Unified IT Infrastructure Connection Console
          </p>
        </div>
      </div>
    </div>
  );
}