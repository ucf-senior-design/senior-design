/**
 * Forcibly redirect the user to this URL if the window becomes undefined.
 *
 * @remarks
 * This function is being used to replace the usage of Next.js' Router.push()
 * because that caused issues with redirects failing intermittently EX:
 * during log out.
 * @param path - The page path to redirect the user to
 * @returns void
 *
 * @hacky
 */
export function forceRedirect(path: string) {
  if (typeof window !== "undefined") window.location.replace(path)
}
