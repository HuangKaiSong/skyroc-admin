# @skyroc/i18n

Internationalization core logic - Cross-platform support (Web + React Native).

## Features

- Language switching logic
- Language state management with Jotai
- i18next configuration abstraction
- Type-safe language definitions
- Cross-platform support (Web + React Native)

## Installation

```bash
pnpm add @skyroc/i18n
```

## Usage

```tsx
import { useLang } from '@skyroc/i18n';

function LanguageSelector() {
  const { locale, localeOptions, changeLocale } = useLang();

  return (
    <select
      value={locale}
      onChange={(e) => changeLocale(e.target.value)}
    >
      {localeOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
```

## API

### useLang()

Hook for language management.

**Returns:**

```typescript
{
  // State
  locale: LangType;
  currentOption: LangOption | undefined;

  // Config
  localeOptions: LangOption[];
  fallbackLang: LangType;

  // Actions
  changeLocale: (lang: LangType) => void;
  setLocale: (lang: LangType) => void;

  // Utils
  isCurrentLang: (lang: LangType) => boolean;
}
```

### initI18n(config)

Initialize i18next with configuration.

```typescript
import { initI18n } from '@skyroc/i18n';

initI18n({
  lng: 'zh-CN',
  fallbackLng: 'en-US',
  resources: {
    'zh-CN': { translation: { ... } },
    'en-US': { translation: { ... } }
  }
});
```

### storage

Storage utility instance from @skyroc/storage.

## License

MIT
