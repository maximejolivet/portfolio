---
name: add-translation
description: Add a new i18n key to both en and fr locale files simultaneously. Use when adding any new UI text. Arguments: the key path and English text (e.g. "nav.contact Contact").
disable-model-invocation: true
---

Add a translation key to both locale files.

Arguments: `$ARGUMENTS` - key path and English text (e.g. `hero.subtitle My subtitle text`)

Steps:

1. Parse the key path and English text from `$ARGUMENTS`.
2. Open `i18n/en.json` - insert the key at the correct nested path, maintaining alphabetical order within the object if possible.
3. Open `i18n/fr.json` - insert the same key with a French translation. If the French text is not provided in `$ARGUMENTS`, translate the English text into French before inserting.
4. Show a diff of both files.
5. Ask the user to confirm before saving if the French translation was auto-generated.

Always update both files in the same operation - never add a key to one locale without the other.
