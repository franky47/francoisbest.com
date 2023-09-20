type ChiffreConfig =
  | {
      enabled: true
      projectId: string
      publicKey: string
    }
  | {
      enabled: false
    }

export const chiffreConfig: ChiffreConfig =
  Boolean(process.env.CHIFFRE_PUBLIC_KEY) &&
  Boolean(process.env.CHIFFRE_PROJECT_ID)
    ? {
        enabled: true,
        projectId: process.env.CHIFFRE_PROJECT_ID!,
        publicKey: process.env.CHIFFRE_PUBLIC_KEY!,
      }
    : { enabled: false }
