export const useChatIntro = () => {
  // Starts false on the server so nothing renders until the client has
  // mounted - otherwise the badge would flash in on every load pre-hydration.
  const ready = useState('chat-intro-ready', () => false)

  onMounted(() => {
    ready.value = true
  })

  function openChat() {
    document.getElementById('ia-chat-trigger')?.click()
  }

  return { ready, openChat }
}
