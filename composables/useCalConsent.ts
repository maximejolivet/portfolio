export const useCalConsent = () => {
  const refused = useState('cal-consent-refused', () => false)

  function sync() {
    refused.value = window.tarteaucitron?.state?.calcom === false
  }

  onMounted(() => {
    sync()
    document.addEventListener('tac.consent_updated', sync)
  })

  onUnmounted(() => {
    document.removeEventListener('tac.consent_updated', sync)
  })

  return { refused }
}
