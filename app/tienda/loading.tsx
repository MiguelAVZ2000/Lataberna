import { Skeleton } from "@/components/ui/skeleton"

export default function TiendaLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 py-16 lg:py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12 border-b-4 border-muted pb-8">
            <div className="space-y-4 w-full max-w-2xl">
              <Skeleton className="h-6 w-48 bg-muted/50 rounded-none" />
              <Skeleton className="h-16 w-full lg:w-3/4 bg-muted/50 rounded-none" />
              <Skeleton className="h-20 w-full bg-muted/30 rounded-none" />
            </div>
          </div>

          {/* Toolbar Skeleton */}
          <div className="flex flex-col md:flex-row gap-8 mb-16 items-center">
             <Skeleton className="h-14 flex-1 bg-muted/50 rounded-none w-full" />
             <div className="flex gap-2 w-full md:w-auto">
                <Skeleton className="h-10 w-24 bg-muted/30 rounded-none" />
                <Skeleton className="h-10 w-24 bg-muted/30 rounded-none" />
                <Skeleton className="h-10 w-24 bg-muted/30 rounded-none" />
             </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border-2 border-muted/20 bg-white p-4 space-y-4 h-[400px]">
                <Skeleton className="aspect-square w-full bg-muted/20 rounded-none" />
                <Skeleton className="h-6 w-3/4 bg-muted/50 rounded-none" />
                <Skeleton className="h-4 w-1/2 bg-muted/30 rounded-none" />
                <div className="pt-4 mt-auto">
                  <Skeleton className="h-12 w-full bg-muted/50 rounded-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
