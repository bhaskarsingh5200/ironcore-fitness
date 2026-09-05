import { useEffect, useReducer, useRef } from 'react'

/** Async state helper for data fetching: { data, loading, error, reload }. */
export function useAsync(fn, deps = []) {
  const [state, setState] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    { data: null, loading: true, error: null },
  )
  const fnRef = useRef(fn)
  fnRef.current = fn

  const load = async () => {
    setState({ loading: true, error: null })
    try {
      const data = await fnRef.current()
      setState({ data, loading: false })
    } catch (error) {
      setState({ error, loading: false })
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { ...state, reload: load }
}
