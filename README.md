# Willow Dreams

React Native + TypeScript app based on the supplied Willow Dreams screens and Figma content. All artwork is bundled in `src/assets`; the app does not fetch remote images. Fraunces and Instrument Sans are bundled locally from the Figma document.

## Run

```sh
npm install
npm run ios
npm run android
```

For a fresh iOS checkout, install CocoaPods dependencies in `ios` before running. The included `Gemfile.lock` requires a compatible Ruby and Bundler installation. A configured Android SDK and JDK 17 are required for Android.

```sh
npm run typecheck
npm run lint
npm test -- --runInBand
```

## Structure

- `src/navigation`: React Navigation tabs and native stacks.
- `src/screens`: onboarding, articles, techniques, projects, questionnaire, tools and gallery.
- `src/components`: reusable buttons, gradient headings, cards, inputs and dialogs.
- `src/data`: the Figma articles, techniques, illustrated projects and onboarding copy.
- `src/storage`: versioned AsyncStorage data, hydration and serialized writes.
- `src/services`: local notifications, photo imports and system sharing.
- `src/utils`: material estimates, timer calculations, dates and project matching.

## Behavior

The launch screen displays the local background and logo with a four-second WebView animation. Onboarding is shown on first launch. Favorites, article answers, quiz results, gallery entries and timer state persist locally. Gallery photos are copied into the app’s documents directory, independent of the photo picker cache. User collections start empty.

The soaking timer stores an absolute deadline, survives restarts, supports pause and reset, and requests notification permission when first started. If notification permission is declined, the countdown still works and the app explains that background alerts are unavailable. Notification delivery is managed by the operating system.

Small screens use scrollable content, safe-area insets, keyboard avoidance and a persistent six-tab navigation bar. No status bars or home indicators are baked into screen images.

## Design decisions

Source: https://www.figma.com/design/xOqgFvjcRCMg4BGDKJ6rQO/Willow-Dreams

The Figma text specification names the first projects “Willow Coaster” and “Mini Woven Star”; some screenshots show older labels. The implementation follows the text specification and matching asset filenames.

Only the first questionnaire question is supplied in the screens. Questions about time, project type and challenge, plus the deterministic matching rules, implement the four criteria described in the Figma readme. Project duration metadata is used for recommendations and is an estimate.

The supplied material-calculator example is Basket / Medium = 64 rods. Other values are planning estimates, not exact measurements. The supplied soaking example is Medium / Dried = 6 hours; other presets are starting points. The interface asks users to check rod flexibility.

The application is offline and has no account, server or cloud synchronization. Uninstalling the application removes its locally stored data.
