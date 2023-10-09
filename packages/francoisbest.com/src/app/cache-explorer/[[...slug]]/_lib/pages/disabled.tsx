export default function DisabledPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-200 ">
        Cache Explorer is disabled
      </h1>
      <p className="mt-4 text-center text-sm text-gray-500">
        Run with `CACHE_EXPLORER=true` to enable it.
      </p>
    </main>
  )
}
