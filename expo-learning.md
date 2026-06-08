# Expo / EAS Lessons Learned

Use this checklist for future Expo apps before running Expo Go or EAS Build.

## Expo Go SDK compatibility

- Default to Expo SDK 54 for the current app batch unless there is a specific reason to upgrade.
- Expo Go from the app stores may not support the newest SDK immediately.
- Check the Expo Go client version first.
- This project had to use Expo SDK 54 because the installed Expo Go client supported SDK 54.
- Avoid scaffolding with a newer SDK unless Expo Go already supports it.
- Verify with:

```powershell
npx expo-doctor
.\node_modules\.bin\expo.cmd install --check
```

## EAS account and project linking

- Confirm the active CLI user before linking:

```powershell
npx eas-cli@latest whoami
```

- If the project is linked to the wrong Expo account, remove the stale `extra.eas.projectId` from `app.json`, set the correct `owner`, then run:

```powershell
npx eas-cli@latest init --force
```

- Correct owner for this project:

```json
"owner": "app-publishing-academy"
```

## Native splash assets

- Do not use SVG for the native `splash.image`.
- EAS prebuild can fail when native splash points to SVG.
- Use PNG for native splash:

```json
"splash": {
  "image": "./assets/splash-icon.png",
  "resizeMode": "contain",
  "backgroundColor": "#F4F1ED"
}
```

- SVG is fine for in-app React Native UI via `react-native-svg`.

## Vector icons peer dependencies

- `@expo/vector-icons` requires `expo-font` for native builds.
- Expo Go may hide the issue, but EAS runs `expo doctor` and can fail.
- Always install:

```powershell
.\node_modules\.bin\expo.cmd install expo-font
```

## userInterfaceStyle warning

- If `app.json` uses `userInterfaceStyle`, install `expo-system-ui`.
- Otherwise Android prebuild warns:

```text
userInterfaceStyle: Install expo-system-ui in your project to enable this feature.
```

- Fix:

```powershell
.\node_modules\.bin\expo.cmd install expo-system-ui
```

## EAS config

- Use `preview` profile with APK for direct Android testing:

```json
"preview": {
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```

- Use `production` profile with app bundle for Play Store:

```json
"production": {
  "android": {
    "buildType": "app-bundle"
  }
}
```

## Local validation before pushing

Run these before starting a build:

```powershell
npm run typecheck
.\node_modules\.bin\expo.cmd install --check
npx expo-doctor
npx expo prebuild --platform android --no-install --clean
```

After `expo prebuild`, remove generated native folders if the repo is managed-only:

```powershell
Remove-Item -Recurse -Force .\android
Remove-Item -Recurse -Force .\ios
```

Keep `/android` and `/ios` in `.gitignore` unless the app intentionally becomes prebuild/bare.
