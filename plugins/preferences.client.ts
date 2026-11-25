// Applies the visitor's display preferences as soon as the app starts on the client, before
// the components that read them (motion, text size) mount.
export default defineNuxtPlugin(() => {
  usePreferences().load()
})
