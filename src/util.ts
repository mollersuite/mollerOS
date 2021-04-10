import { open_apps } from './stores'

export const close = (...toclose: string[]) => {
  open_apps.update((sessions) =>
    sessions.filter((session) => !toclose.includes(session.id))
  )
}

/**
 *
 * @param t The length of the ID. Defaults to 21.
 * @returns A nanoID
 */
export const nanoid = (t = 21) => {
  let e = '',
    r = crypto.getRandomValues(new Uint8Array(t))
  for (; t--; ) {
    let n = 63 & r[t]
    e +=
      n < 36
        ? n.toString(36)
        : n < 62
        ? (n - 26).toString(36).toUpperCase()
        : n < 63
        ? '_'
        : '-'
  }
  return e
}
