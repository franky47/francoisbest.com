export async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>
  children: (result: T) => JSX.Element
}) {
  let result = await promise

  return children(result)
}
