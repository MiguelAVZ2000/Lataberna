/**
 * Trusted device management for La Taberna.
 * Allows marking devices as trusted after successful authentication,
 * so that future logins from known devices can skip additional verification steps.
 *
 * TODO: Wire to login flow — call markDeviceTrusted() after successful MFA or first login
 * TODO: Call isDeviceTrusted() in middleware to skip MFA for known devices
 */

const TRUSTED_DEVICE_KEY = 'lataberna-trusted-device'
const TRUSTED_DEVICE_TTL_DAYS = 30

/**
 * Generates a simple device fingerprint from browser signals.
 * Not cryptographically unique — used as a convenience hint, not a security guarantee.
 */
function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return ''

  const signals = [
    navigator.userAgent,
    navigator.language,
    String(screen.width),
    String(screen.height),
    String(screen.colorDepth),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ]

  // Simple non-crypto hash for fingerprint
  let hash = 0
  const str = signals.join('|')
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

/**
 * Marks the current device as trusted for the given user.
 * Stores a token in localStorage with an expiry timestamp.
 *
 * @param userId - The authenticated user's ID
 */
export function markDeviceTrusted(userId: string): void {
  if (typeof window === 'undefined') return

  const fingerprint = getDeviceFingerprint()
  const expiresAt = Date.now() + TRUSTED_DEVICE_TTL_DAYS * 24 * 60 * 60 * 1000

  const record = {
    userId,
    fingerprint,
    expiresAt,
    createdAt: Date.now(),
  }

  localStorage.setItem(TRUSTED_DEVICE_KEY, JSON.stringify(record))
}

/**
 * Checks whether the current device is trusted for the given user.
 * Returns false if the token is expired, missing, or belongs to a different user.
 *
 * @param userId - The authenticated user's ID
 */
export function isDeviceTrusted(userId: string): boolean {
  if (typeof window === 'undefined') return false

  const raw = localStorage.getItem(TRUSTED_DEVICE_KEY)
  if (!raw) return false

  try {
    const record = JSON.parse(raw)

    if (record.userId !== userId) return false
    if (Date.now() > record.expiresAt) {
      localStorage.removeItem(TRUSTED_DEVICE_KEY)
      return false
    }

    const currentFingerprint = getDeviceFingerprint()
    return record.fingerprint === currentFingerprint
  } catch {
    localStorage.removeItem(TRUSTED_DEVICE_KEY)
    return false
  }
}

/**
 * Removes the trusted device token for the current device.
 * Call this on logout or when the user revokes device trust.
 */
export function removeTrustedDevice(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TRUSTED_DEVICE_KEY)
}
