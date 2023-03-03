export function getTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function createFriendPairing(user1: string, user2: string) {
  if (user1.localeCompare(user2) < 0) {
    return `${user1}:${user2}`
  }
  return `${user2}:${user1}`
}

export function getFriendPairing(pairing: string) {
  let users = pairing.split(":")
  return users
}
