<script setup lang="ts">
import { CONTRAST_PREFERENCES, MOTION_PREFERENCES, TEXT_SCALES } from '~/utils/preferences'

const { t } = useI18n()
const { preferences, preferencesOpen, set, reset } = usePreferences()

const dialogRef = ref<HTMLDialogElement | null>(null)

// Native <dialog>: focus is trapped and Escape closes it, which fires `close` below.
onMounted(() => dialogRef.value?.showModal())

// Unmounting removes the modal from the top layer; Escape closes the native dialog first and
// then lands here through its `close` event.
function close() {
  preferencesOpen.value = false
}

const textScaleOptions = TEXT_SCALES
const motionOptions = MOTION_PREFERENCES
const contrastOptions = CONTRAST_PREFERENCES

function pressed(current: string, value: string) {
  return current === value
}

const groupClass = 'flex flex-wrap gap-2'
const optionClass
  = 'min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

function optionState(isPressed: boolean) {
  return isPressed
    ? 'border-accent bg-accent text-accent-foreground'
    : 'border-border text-foreground hover:text-accent-text'
}
</script>

<template>
  <dialog
    ref="dialogRef"
    aria-labelledby="preferences-title"
    class="m-auto w-[min(92vw,30rem)] rounded-2xl border border-border bg-card p-0 font-sans text-foreground shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    @close="close"
  >
    <div class="flex flex-col gap-6 p-6">
      <div class="flex items-start justify-between gap-4">
        <div class="flex flex-col gap-1">
          <h2 id="preferences-title" class="text-xl font-bold tracking-tight">
            {{ t('preferences.title') }}
          </h2>
          <p class="text-sm text-muted-foreground">
            {{ t('preferences.description') }}
          </p>
        </div>
        <button
          type="button"
          :aria-label="t('preferences.close')"
          class="flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          @click="close"
        >
          <UiAppIcon icon="lucide:x" class="size-5" />
        </button>
      </div>

      <fieldset class="flex flex-col gap-2">
        <legend class="mb-2 text-sm font-semibold">
          {{ t('preferences.textScale.label') }}
        </legend>
        <div :class="groupClass">
          <button
            v-for="option in textScaleOptions"
            :key="option"
            type="button"
            :class="[optionClass, optionState(pressed(preferences.textScale, option))]"
            :aria-pressed="pressed(preferences.textScale, option)"
            @click="set('textScale', option)"
          >
            {{ t(`preferences.textScale.options.${option}`) }}
          </button>
        </div>
      </fieldset>

      <fieldset class="flex flex-col gap-2">
        <legend class="mb-2 text-sm font-semibold">
          {{ t('preferences.motion.label') }}
        </legend>
        <div :class="groupClass">
          <button
            v-for="option in motionOptions"
            :key="option"
            type="button"
            :class="[optionClass, optionState(pressed(preferences.motion, option))]"
            :aria-pressed="pressed(preferences.motion, option)"
            @click="set('motion', option)"
          >
            {{ t(`preferences.motion.options.${option}`) }}
          </button>
        </div>
      </fieldset>

      <fieldset class="flex flex-col gap-2">
        <legend class="mb-2 text-sm font-semibold">
          {{ t('preferences.contrast.label') }}
        </legend>
        <div :class="groupClass">
          <button
            v-for="option in contrastOptions"
            :key="option"
            type="button"
            :class="[optionClass, optionState(pressed(preferences.contrast, option))]"
            :aria-pressed="pressed(preferences.contrast, option)"
            @click="set('contrast', option)"
          >
            {{ t(`preferences.contrast.options.${option}`) }}
          </button>
        </div>
      </fieldset>

      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p class="text-xs text-muted-foreground">
          {{ t('preferences.storageNote') }}
        </p>
        <button
          type="button"
          class="min-h-11 px-2 text-sm font-semibold underline underline-offset-4 decoration-2 hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          @click="reset"
        >
          {{ t('preferences.reset') }}
        </button>
      </div>
    </div>
  </dialog>
</template>
