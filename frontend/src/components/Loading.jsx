
export function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-zinc-700 border-t-violet-600 rounded-full animate-spin" />
      <p className="text-zinc-400 text-sm">
        Carregando...
      </p>
    </div>
  )
}
