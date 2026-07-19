export {}

declare global {
  interface Window {
    tarteaucitron?: {
      userInterface: {
        openPanel: () => void
      }
      state: Record<string, boolean | undefined>
    }
  }
}
