# Expo vs Bare React Native: Architectural Decision Guide

**The answer is clear for 2025: Expo should be the default choice.** The React Native ecosystem has fundamentally shifted—**60% of developers now use Expo** according to the [State of React Native 2024 survey](https://results.2024.stateofreactnative.com/en-US/), and the official React Native team explicitly recommends it as the starting point. Only specific native requirements justify choosing bare React Native today.

This analysis provides the complete picture: comprehensive pros/cons comparison, feature-by-feature alternative mapping with metrics, and real-world implications for architectural decisions.

---

## Part 1: Comprehensive Pros and Cons Analysis

### Expo's decisive advantages in 2024-2025

**Developer Experience and Velocity**

Expo eliminates the single biggest pain point in mobile development: environment setup. Creating a working project takes minutes with `npx create-expo-app` versus hours or days configuring Xcode, Android Studio, CocoaPods, Gradle, and environment variables for bare React Native. Teams report **90%+ code sharing** across iOS, Android, and web—with Expo Router enabling file-based routing familiar to web developers.

The Expo Go app enables instant device testing via QR code scanning without building native binaries. This accelerates prototyping dramatically, though production apps should use development builds. SDK 52 introduced **15x faster Metro resolution** and automatic monorepo configuration, further improving iteration speed.

**Build and Deployment Automation**

EAS (Expo Application Services) provides cloud-based builds that handle native compilation, code signing, and credential management automatically. Critical benefit: **iOS apps can be built without owning a Mac**. EAS Submit automates app store deployment, while EAS Update enables over-the-air JavaScript updates that bypass app store review—deploying bug fixes in minutes instead of days.

| EAS Feature | Capability | Free Tier Limit |
|-------------|------------|-----------------|
| EAS Build | Cloud native builds | 15 iOS + 15 Android/month |
| EAS Submit | Automated store submission | Included |
| EAS Update | OTA JavaScript updates | 1,000 MAU, 10 GiB bandwidth |

**Native API Coverage and New Architecture**

The Expo SDK provides **70+ pre-built APIs** covering camera, location, notifications, filesystem, audio, video, authentication, and more—all maintained by a dedicated team and written in TypeScript. As of SDK 52 (November 2024), **New Architecture (Fabric/TurboModules) is enabled by default** for all new projects. All Expo SDK packages support New Architecture, with approximately **75% of SDK 52+ projects on EAS Build** already using it.

Config plugins have matured significantly, allowing native code modifications without ejecting. The "ejection" concept is now obsolete—`npx expo prebuild` generates native projects on-demand when needed, making the managed-to-bare transition seamless and reversible.

### Expo's limitations and constraints

**Bundle Size Overhead**

Expo managed apps historically start at approximately **25-30MB** versus ~15MB for optimized bare React Native apps. SDK 52 introduced experimental universal tree shaking to reduce this, but for apps where every megabyte matters (emerging markets, low-storage devices), this remains a consideration. Modern prebuild workflows generate only project-relevant code, significantly mitigating this concern.

**Expo Go Restrictions**

Expo Go cannot run native modules outside the Expo SDK. Remote push notifications are deprecated in SDK 52 and removed in SDK 53 for Expo Go. Google Maps was removed from Expo Go for Android in SDK 53. **Production apps should use development builds**, not Expo Go—treating it strictly as a prototyping tool.

**EAS Build Constraints and Pricing**

Free tier builds use low-priority queues with **60-120+ minute wait times**. Build limits reset monthly: 15 iOS + 15 Android on the free plan. Paid plans start at $19/month (Starter) scaling to $199/month (Production) and $1,999+/month (Enterprise). Build credits don't roll over.

| Plan | Monthly Cost | Build Priority | OTA MAUs |
|------|-------------|----------------|----------|
| Free | $0 | Low (long waits) | 1,000 |
| Starter | $19 | High | 3,000 |
| Production | $199 | High | 50,000 |
| Enterprise | $1,999+ | High | 1,000,000 |

**SDK Version Coupling**

Apps must upgrade when new SDKs release (quarterly cadence). While the React Native version lag has shrunk significantly, SDK upgrades can require migration effort. All Expo SDK modules are versioned together, creating coordination overhead for complex projects.

### Bare React Native strengths

**Maximum Native Control**

Bare workflow provides direct access to `/ios` and `/android` folders from project initialization. Full control over `Info.plist`, `build.gradle`, `AndroidManifest.xml`, and all native configuration. No "black box" behavior—complete transparency over native layer operations.

**No Third-Party Dependencies**

Zero reliance on Expo servers for builds, updates, or submissions. Complete CI/CD pipeline control using any service: GitHub Actions, CircleCI, Bitrise, or local builds. No vendor lock-in, no subscription costs for build services (though iOS requires Mac hardware).

**Unrestricted Library Integration**

No restrictions on third-party libraries with native dependencies. Seamless integration of custom native modules in Swift/Objective-C or Kotlin/Java. Easier integration with existing native codebases or SDKs requiring direct native code modifications.

### Bare React Native's significant costs

**Setup and Maintenance Burden**

Initial setup requires hours to days versus minutes with Expo. Developers must install and configure: Node.js, npm/Yarn, Watchman, JDK, Android SDK, Android Studio for Android; plus macOS, Xcode, CocoaPods, and Ruby for iOS. **Mac hardware is absolutely required for iOS development**.

Version upgrades represent the most painful aspect—manually applying changes using React Native Upgrade Helper, resolving dependency conflicts, and rebuilding on both platforms. Major upgrades can take **days to weeks** for complex projects.

**No Built-in OTA Updates**

No over-the-air JavaScript updates out of the box. Must integrate third-party solutions—and **Microsoft CodePush was officially retired on March 31, 2025**. CodePush does not support React Native's New Architecture (0.76+). This leaves EAS Updates, self-hosted solutions, or emerging alternatives as the only viable paths.

### Real-world use case alignment

**Where Expo excels:**
- MVPs and startups requiring rapid development cycles
- Teams without dedicated native iOS/Android expertise
- Cross-platform apps sharing code across iOS, Android, and web
- Apps using common features: camera, notifications, maps, authentication
- Organizations needing frequent OTA updates for rapid iteration
- Web developers transitioning to mobile development

**Companies successfully using Expo:** Shopify (Shop app), Coinbase, Discord, NFL, Pizza Hut, Cameo, Burger King, Amazon (A to Z), Codecademy, sweetgreen, Brex, Flexport

**Where bare React Native remains appropriate:**
- Heavy custom native module requirements (specialized Bluetooth, hardware SDKs)
- Existing large native codebases requiring React Native integration
- Enterprise security policies prohibiting third-party build services
- Apps where every megabyte critically matters and tree-shaking is insufficient
- Teams with deep native iOS/Android expertise preferring maximum control

---

## Part 2: Complete Expo Features Mapping

### Build and deployment alternatives

**EAS Build → Fastlane + CI/CD or Cloud Services**

| Alternative | GitHub Stars | Free Tier | Paid From | Setup Complexity |
|------------|-------------|-----------|-----------|------------------|
| **Fastlane** | **40,700** | Unlimited (OSS) | N/A | Medium |
| Codemagic | Cloud service | 500 min/month | $0.095/min | Easy |
| Bitrise | Cloud service | Hobby tier | ~$90/month | Easy |
| GitHub Actions | Platform | 2,000 min/month | $4/user/month | Medium |

**Fastlane** (recommended for teams with existing CI) automates screenshots, code signing, and releases with 300+ plugin actions. Free and open source, but requires macOS for iOS builds and your own CI infrastructure.

**Codemagic** provides the closest all-in-one experience to EAS—native React Native support, automatic code signing, Apple Silicon machines, and a built-in CodePush alternative ($99/month per 100k MAU).

**EAS Submit → Fastlane deliver/supply**

Fastlane's `deliver` (iOS) and `supply` (Android) commands automate App Store Connect and Google Play uploads including metadata, screenshots, and release notes. Free, widely used, and integrates with any CI system. Codemagic and Bitrise offer built-in publishing as part of their platforms.

**EAS Update (OTA) → Critical decision point**

| Alternative | New Architecture Support | Setup | Cost |
|------------|-------------------------|-------|------|
| **EAS Update** (bare RN compatible) | ✅ Yes | Medium | $22-99/month |
| Hot Updater (self-hosted) | ✅ Yes | Medium | Infrastructure costs |
| Appcircle CodePush | ✅ Yes | Easy | Enterprise pricing |
| Revopush | Beta | Easy | $30-90/month |
| Microsoft CodePush | ❌ **Retired March 2025** | — | — |

**The CodePush retirement is a watershed moment.** EAS Update works with bare React Native projects (not just Expo managed) by installing the `expo-updates` package. For organizations requiring self-hosting, **Hot Updater** (~497 GitHub stars, growing rapidly) supports AWS S3, Cloudflare R2, Supabase, and Firebase with automatic crash rollback. **Appcircle CodePush** offers enterprise features including RBAC, audit trails, and code signing.

### Development tools alternatives

**Expo Go → Development Builds**

For bare React Native, there's no direct Expo Go equivalent—development requires building to simulators/devices via Xcode and Android Studio. This adds friction but provides fuller testing fidelity. Some teams use **Flipper** for debugging and inspection, though it requires additional setup.

**Expo Router → React Navigation 7 or file-based configuration**

| Library | GitHub Stars | Weekly Downloads | Approach |
|---------|-------------|------------------|----------|
| React Navigation 7 | **24,000+** | **2M+** | Configuration-based |
| Expo Router | Part of Expo | Growing rapidly | File-based |
| Wix RN Navigation | 13,000 | ~100k | Native navigation |

**React Navigation 7** (October 2024) introduced a new static API reducing boilerplate significantly. It remains the most widely used navigation solution with extensive documentation. Expo Router is built on React Navigation, adding file-based routing, automatic deep linking, and universal web support—but can be used in bare projects with some configuration.

### Core SDK package alternatives

**Camera: expo-camera → react-native-vision-camera**

| Metric | Value |
|--------|-------|
| GitHub Stars | **8,800+** |
| npm Weekly Downloads | **280,000** |
| New Architecture | ✅ Full TurboModules support |
| Maintenance | Active (Marc Rousavy) |

The **react-native-vision-camera** is the clear choice—high-performance with frame processing capabilities for real-time ML/CV. Processes ~2GB/sec of frame data with the new architecture. Note: react-native-camera is deprecated.

**Location: expo-location → @react-native-community/geolocation**

| Metric | Value |
|--------|-------|
| GitHub Stars | 1,400 |
| npm Weekly Downloads | 150,000 |
| New Architecture | Partial |
| Maintenance | Active (seeking additional maintainers) |

Extracted from React Native core with a familiar API. For background location, **react-native-geolocation-service** offers better support. Neither includes built-in geocoding like expo-location.

**Notifications: expo-notifications → @notifee/react-native + Firebase Messaging**

| Package | Stars | Downloads | New Arch |
|---------|-------|-----------|----------|
| @notifee/react-native | 1,800+ | 95,000 | ✅ Yes |
| @react-native-firebase/messaging | 11,700+ (mono-repo) | 470,000 | ✅ Yes |

The recommended combination: **Firebase Messaging** for remote push delivery, **Notifee** for advanced local notifications (channels, actions, triggers). More setup complexity than expo-notifications but significantly more powerful.

**SQLite: expo-sqlite → op-sqlite (performance) or WatermelonDB (reactive)**

| Package | Stars | Downloads | Speed | New Arch |
|---------|-------|-----------|-------|----------|
| **op-sqlite** | 700 | 25,000 | **5x faster** | ✅ Yes |
| WatermelonDB | 11,400 | 35,000 | Fast | ✅ Yes |
| react-native-sqlite-storage | 2,800 | 31,000 | Standard | Partial |

**op-sqlite** (successor to react-native-quick-sqlite) is the performance leader—5x faster than traditional solutions using JSI/C++. **WatermelonDB** is ideal for complex reactive apps with large datasets and includes sync capabilities.

**File System: expo-file-system → react-native-fs**

| Metric | Value |
|--------|-------|
| GitHub Stars | **4,900+** |
| npm Weekly Downloads | **320,000** |
| New Architecture | Partial (community updates ongoing) |

Full native filesystem access with download/upload progress callbacks. More low-level than expo-file-system but comprehensive.

**Image Picker: expo-image-picker → react-native-image-picker**

| Metric | Value |
|--------|-------|
| GitHub Stars | **8,600+** |
| npm Weekly Downloads | **290,000** |
| New Architecture | ✅ Yes |

Native UI for image/video selection. Supports Android Photo Picker backported to older versions. For cropping functionality, use **react-native-image-crop-picker** (140,000 downloads).

**Secure Storage: expo-secure-store → react-native-keychain**

| Metric | Value |
|--------|-------|
| GitHub Stars | **3,200+** |
| npm Weekly Downloads | **250,000** |
| New Architecture | Partial |

Uses iOS Keychain and Android Keystore with FaceID/TouchID biometrics support. For simpler AsyncStorage-like encrypted storage, **react-native-encrypted-storage** (85,000 downloads) offers an easier API.

**Audio/Video: expo-av → react-native-video + react-native-track-player**

| Package | Stars | Downloads | Use Case | New Arch |
|---------|-------|-----------|----------|----------|
| react-native-video v7 | 7,300 | 230,000 | Video playback | ✅ Yes |
| react-native-track-player | 3,600 | 95,000 | Music/audio apps | ✅ Yes |

**react-native-video v7** provides full New Architecture support, DRM, HLS/DASH streaming, and offline playback. **react-native-track-player** is optimized for music apps with background playback, media controls, and playlist management.

### Complete feature mapping table

| Expo Package | Best Alternative | Stars | Weekly Downloads | New Arch | Setup |
|-------------|------------------|-------|------------------|----------|-------|
| expo-camera | react-native-vision-camera | 8.8k | 280k | ✅ | Medium |
| expo-location | @react-native-community/geolocation | 1.4k | 150k | Partial | Easy |
| expo-file-system | react-native-fs | 4.9k | 320k | Partial | Easy |
| expo-notifications | notifee + firebase/messaging | 1.8k/11.7k | 95k/470k | ✅ | Hard |
| expo-sqlite | op-sqlite | 700 | 25k | ✅ | Easy |
| expo-image-picker | react-native-image-picker | 8.6k | 290k | ✅ | Easy |
| expo-media-library | @react-native-camera-roll/camera-roll | 970 | 54k | ✅ | Medium |
| expo-av | react-native-video + track-player | 7.3k/3.6k | 230k/95k | ✅ | Medium |
| expo-sensors | react-native-sensors | 900 | 12k | ❌ | Easy |
| expo-secure-store | react-native-keychain | 3.2k | 250k | Partial | Easy |
| expo-auth-session | react-native-app-auth | 2k | 55k | Partial | Medium |
| expo-linear-gradient | react-native-linear-gradient | 4.6k | 400k | ✅ | Easy |
| expo-blur | @react-native-community/blur | 3.8k | 170k | ✅ | Easy |
| expo-haptics | react-native-haptic-feedback | 1.9k | 140k | Partial | Easy |
| expo-clipboard | @react-native-clipboard/clipboard | 730 | 430k | ✅ | Easy |
| expo-device | react-native-device-info | 6.5k | 650k | ✅ | Easy |
| expo-splash-screen | react-native-bootsplash | 4k | 133k | ✅ | Easy |
| expo-constants | react-native-config | 4.9k | 300k | ✅ | Easy |
| expo-web-browser | react-native-inappbrowser-reborn | 1.3k | 90k | Partial | Easy |

**Critical note on expo-sensors:** The react-native-sensors alternative hasn't been updated in 3 years and lacks New Architecture support. For sensor functionality, using expo-sensors even in bare workflow (via expo modules) is recommended.

---

## Conclusion

**The strategic recommendation is unambiguous: start with Expo unless you have explicit requirements it cannot satisfy.** The framework has matured dramatically—config plugins and Continuous Native Generation eliminate historic limitations, and the transition to bare workflow is now seamless if needed later.

Three key insights for the architectural decision:

**The CodePush retirement reshapes the OTA landscape.** Microsoft's March 2025 shutdown forces migration to EAS Updates (which works in bare projects), self-hosted alternatives like Hot Updater, or enterprise solutions like Appcircle. This significantly strengthens Expo's ecosystem position.

**New Architecture is now the default.** React Native 0.76+ enables Fabric and TurboModules by default. Expo SDK 52 fully supports this, and ~75% of SDK 52+ EAS Build projects already use it. Library compatibility should be verified via reactnative.directory before choosing alternatives.

**The "Expo tax" has largely evaporated.** Bundle size overhead is addressable with tree shaking and prebuild. Native module restrictions are solved with development builds and config plugins. The primary remaining tradeoffs are EAS pricing at scale and the quarterly SDK upgrade cadence.

For a Tech Director's decision framework: **choose Expo by default, choose bare React Native only when specific native requirements, security policies, or existing native codebases mandate it.** The 2024-2025 consensus among experienced React Native consultancies—Infinite Red, Callstack, STRV—is clear: Expo has become the professional standard.