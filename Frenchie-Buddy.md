# Frenchie Buddy

| Field | Value |
|---|---|
| **Project ID** | 270025 |
| **User** | heather sherry  |
| **Email** | heathersherry76@yahoo.com |
| **Review Status** | approved |
| **Lifecycle Status** | build_in_progress |
| **Created** | 2026-05-27 |
| **Review Submitted** | 2026-05-27 |
| **Reviewed At** | 2026-06-02 |

## App Concept

**App Name:** Frenchie Buddy

**Tagline:** Safe Breathing, Daily Joy.

**Description:** Frenchie Buddy is the first breed-specific wellness companion designed exclusively for French Bulldog owners. Focused on the unique physiological needs of brachycephalic dogs, the app solves the 'guessing game' of outdoor safety with a real-time Heat Safety Meter that accounts for temperature and humidity. Beyond safety, it offers a warm, playful space for owners to track health trends, capture memories, and connect with their dog's personality through AI-driven mood tracking and breed-specific daily horoscopes.

**Target Audience:** French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories.

**Core Features:**
- Real-time Heat Safety Meter (Temperature + Humidity sensing)
- AI Mood Tracker via Photo Recognition
- Brachycephalic-specific Health Tracker (Breathing, Snoring, Sleep)
- Daily Frenchie Horoscope & Breed Tips
- Digital Memory Journal for photo storage and milestones

**Tech Stack:** React Native with Expo, Node.js backend, OpenWeatherMap API for heat modeling, and TensorFlow Lite for on-device photo mood analysis.

### Additional Concept Data

**screens:**
```json
[
  {
    "name": "Safety Dashboard",
    "description": "The primary landing screen featuring the Heat Safety Meter and current outdoor conditions.",
    "keyElements": [
      "Dynamic Heat Meter gauge (Safe/Caution/Danger)",
      "Humidity and Temperature display",
      "Quick-action walk timer",
      "Current mood status icon"
    ]
  },
  {
    "name": "Daily Pulse",
    "description": "A playful hub for the daily horoscope and AI-driven mood analysis.",
    "keyElements": [
      "Frenchie 'Star Sign' display",
      "Daily Horoscope card",
      "Camera button for mood scanning",
      "Shareable social graphic generator"
    ]
  },
  {
    "name": "Health & Breathing Log",
    "description": "A dedicated space to track respiratory health and symptoms common to the breed.",
    "keyElements": [
      "Breathing effort slider",
      "Weight tracker chart",
      "Medication reminders",
      "Activity level log"
    ]
  },
  {
    "name": "Memory Journal",
    "description": "An elegant, editorial-style feed of photos and pet milestones.",
    "keyElements": [
      "Photo grid with date markers",
      "Milestone achievement badges",
      "Captioned entries",
      "Filter by 'Puppyhood' or 'Senior' stages"
    ]
  }
]
```

**colorScheme:**
```json
{
  "accent": "#98FB98",
  "primary": "#F7F1E8",
  "secondary": "#3A2D26",
  "background": "#F5F5DC",
  "description": "An elevated, warm palette using Bone (#F7F1E8) for surfaces, Espresso (#3A2D26) for readability, and Seafoam/Sage (#98FB98) for safe states, with Burnt Coral accents for heat warnings."
}
```

**competitors:**
```json
[
  "The French Bulldog App",
  "PetDesk",
  "PETcare AI",
  "Rover"
]
```

**uniqueValue:** Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.

**monetization:** Freemium model with a 7-day free trial. Premium subscription is $4.99/mo or $29.99/yr, unlocking advanced health analytics, unlimited photo storage in the Memory Journal, and the AI Mood Tracker.

**searchKeywords:**
```json
[
  "dog safety heat monitor",
  "pet health tracker",
  "french bulldog care",
  "brachycephalic dog safety",
  "dog wellness and diary"
]
```

**appStoreResults:**
```json
[
  {
    "price": 0,
    "trackId": 341232718,
    "estimates": {
      "estimatedRevenue": 3325000,
      "estimatedDownloads": 2000000,
      "estimatedRevenueCompact": "~$3.3M",
      "estimatedDownloadsCompact": "~2.0M"
    },
    "trackName": "MyFitnessPal: Calorie Counter",
    "sellerName": "MyFitnessPal, Inc.",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d7/75/a1/d775a19c-aa20-c375-549d-b03aaf413044/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.jpg",
    "formattedPrice": "Free",
    "userRatingCount": 2334679,
    "primaryGenreName": "Health & Fitness",
    "averageUserRating": 4.71286
  },
  {
    "price": 0,
    "trackId": 1208224953,
    "estimates": {
      "estimatedRevenue": 169176,
      "estimatedDownloads": 1590000,
      "estimatedRevenueCompact": "~$169K",
      "estimatedDownloadsCompact": "~1.6M"
    },
    "trackName": "Apple Fitness",
    "sellerName": "Apple Inc.",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/93/61/a0/9361a04d-3951-ec4b-4566-65ba69afc4fc/fitness-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/100x100bb.jpg",
    "formattedPrice": "Free",
    "userRatingCount": 11016,
    "primaryGenreName": "Health & Fitness",
    "averageUserRating": 2.85966
  },
  {
    "price": 0,
    "trackId": 1041517543,
    "estimates": {
      "estimatedRevenue": 300048,
      "estimatedDownloads": 2820000,
      "estimatedRevenueCompact": "~$300K",
      "estimatedDownloadsCompact": "~2.8M"
    },
    "trackName": "Fitbod: Gym & Fitness Planner",
    "sellerName": "Fitbod Inc.",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/cc/47/14/cc47141a-e866-e7b3-eb8a-6523a3baba70/AppIcon-0-0-1x_U007ephone-0-1-0-85-220-0.png/100x100bb.jpg",
    "formattedPrice": "Free",
    "userRatingCount": 272736,
    "primaryGenreName": "Health & Fitness",
    "averageUserRating": 4.81215
  },
  {
    "price": 0.99,
    "trackId": 939216567,
    "estimates": {
      "estimatedRevenue": 176108,
      "estimatedDownloads": 267500,
      "estimatedRevenueCompact": "~$176K",
      "estimatedDownloadsCompact": "~268K"
    },
    "trackName": "Six Petals",
    "sellerName": "Denis Prokopchuk",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/3d/4e/12/3d4e1236-e34a-f830-8fb4-c6e750c9adaa/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/100x100bb.jpg",
    "formattedPrice": "$0.99",
    "userRatingCount": 3,
    "primaryGenreName": "Health & Fitness",
    "averageUserRating": 4.33333
  },
  {
    "price": 0,
    "trackId": 1502936453,
    "estimates": {
      "estimatedRevenue": 335160,
      "estimatedDownloads": 3150000,
      "estimatedRevenueCompact": "~$335K",
      "estimatedDownloadsCompact": "~3.1M"
    },
    "trackName": "LADDER Strength Training Plans",
    "sellerName": "Ladder Technologies, Inc.",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5c/67/fe/5c67fe54-a1fc-7f35-952f-99159040ae1d/AppIcon-0-1x_U007ephone-0-0-0-1-0-0-85-220-0.png/100x100bb.jpg",
    "formattedPrice": "Free",
    "userRatingCount": 146243,
    "primaryGenreName": "Health & Fitness",
    "averageUserRating": 4.94824
  },
  {
    "price": 0,
    "trackId": 6479513000,
    "estimates": {
      "estimatedRevenue": 151620,
      "estimatedDownloads": 1425000,
      "estimatedRevenueCompact": "~$152K",
      "estimatedDownloadsCompact": "~1.4M"
    },
    "trackName": "BodyWave: Health Tracker",
    "sellerName": "AXIVORA INTELLIGENT TECH PTE. LTD.",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/82/51/c8/8251c8a0-fd62-f0dc-bcd3-760d795fc185/AppIcon-0-0-1x_U007ephone-0-11-0-85-220.png/100x100bb.jpg",
    "formattedPrice": "Free",
    "userRatingCount": 20050,
    "primaryGenreName": "Health & Fitness",
    "averageUserRating": 4.59302
  },
  {
    "price": 0,
    "trackId": 1074367771,
    "estimates": {
      "estimatedRevenue": 328776,
      "estimatedDownloads": 3090000,
      "estimatedRevenueCompact": "~$329K",
      "estimatedDownloadsCompact": "~3.1M"
    },
    "trackName": "Welltory: Health, Heart Rate",
    "sellerName": "Welltory inc",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/30/dc/8b/30dc8b3a-1d7b-541e-e885-d17fc2b64ff5/AppIcon_free-0-0-1x_U007ephone-0-1-0-85-220.png/100x100bb.jpg",
    "formattedPrice": "Free",
    "userRatingCount": 129167,
    "primaryGenreName": "Health & Fitness",
    "averageUserRating": 4.74202
  },
  {
    "price": 0,
    "trackId": 399857015,
    "estimates": {
      "estimatedRevenue": 512316,
      "estimatedDownloads": 3210000,
      "estimatedRevenueCompact": "~$512K",
      "estimatedDownloadsCompact": "~3.2M"
    },
    "trackName": "Planet Fitness",
    "sellerName": "Planet Fitness Holdings, LLC",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c3/91/5f/c3915f48-0be3-05ad-7beb-943851b5b007/appicon-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.jpg",
    "formattedPrice": "Free",
    "userRatingCount": 716024,
    "primaryGenreName": "Health & Fitness",
    "averageUserRating": 4.87355
  },
  {
    "price": 0,
    "trackId": 462638897,
    "estimates": {
      "estimatedRevenue": 0,
      "estimatedDownloads": 3150000,
      "estimatedRevenueCompact": "$0",
      "estimatedDownloadsCompact": "~3.1M"
    },
    "trackName": "Google Health (Fitbit)",
    "sellerName": "Google LLC",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4c/0d/29/4c0d29f1-755c-2c94-fa03-cc32146c53a2/google_health_ios-0-0-1x_U007ephone-0-0-0-1-0-0-sRGB-0-85-220.png/100x100bb.jpg",
    "formattedPrice": "Free",
    "userRatingCount": 668596,
    "primaryGenreName": "Health & Fitness",
    "averageUserRating": 4.50547
  },
  {
    "price": 5.99,
    "trackId": 1035127285,
    "estimates": {
      "estimatedRevenue": 289789,
      "estimatedDownloads": 72750,
      "estimatedRevenueCompact": "~$290K",
      "estimatedDownloadsCompact": "~73K"
    },
    "trackName": "Pet Monitor VIGI",
    "sellerName": "VIGI Limited",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/76/a2/5b/76a25bba-5ef7-6099-c461-2a7f3ec46fa3/AppIcon-0-1x_U007epad-0-1-0-0-85-220-0.png/100x100bb.jpg",
    "formattedPrice": "$5.99",
    "userRatingCount": 2236,
    "primaryGenreName": "Lifestyle",
    "averageUserRating": 4.77862
  }
]
```

**primaryCategory:** Health & Fitness

**revisionSummary:**
```json
{
  "changeSnapshot": [
    "Prioritized the Heat Safety Meter as the primary UI element on the home screen.",
    "Integrated breed-specific health tracking specifically for brachycephalic respiratory issues.",
    "Established a premium, editorial visual style using the requested Bone and Seafoam palette."
  ],
  "appliedFeedback": [
    "Frenchie-specific focus over generic pet templates",
    "Inclusion of viral hooks like horoscopes and mood tracking",
    "Safety focus on 75-degree/humidity breathing risks"
  ],
  "skippedFeedback": [],
  "materialChangesBySection": [
    {
      "changes": [
        "Combined breed-specific information into a daily 'Tip of the Day' and 'Horoscope' model."
      ],
      "section": "Core Features"
    }
  ],
  "changedFromPreviousVersion": "Initial version based on original product workbook."
}
```

## Build Prompt (Rork Prompt)

================================================================================
ROLE AND OBJECTIVE
================================================================================
You are Rork's lead mobile product architect and principal UI/UX engineer. Build a complete, polished, production-minded mobile application in one generation cycle.

Build the complete app, not a landing page. Do not create placeholder screens, TODO buttons, empty templates, or fake navigation. Prioritize one excellent core product experience over unnecessary feature sprawl. The app must feel fast, responsive, native, and alive on mobile.

================================================================================
1. APP BRIEF
================================================================================
App name: Frenchie Buddy
One-sentence promise: Safe Breathing, Daily Joy.
Primary value proposition: Frenchie Buddy is the first breed-specific wellness companion designed exclusively for French Bulldog owners. Focused on the unique physiological needs of brachycephalic dogs, the app solves the 'guessing game' of outdoor safety with a real-time Heat Safety Meter that accounts for temperature and humidity. Beyond safety, it offers a warm, playful space for owners to track health trends, capture memories, and connect with their dog's personality through AI-driven mood tracking and breed-specific daily horoscopes.
Target user: French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories.
Primary success outcome: The user reaches the core value moment quickly, completes the main workflow, and has a clear reason to return.
Platform target: Build for React Native/Expo so the app can run on iOS and Android unless the feature list explicitly requires iOS-only native capabilities.

================================================================================
2. PRODUCT POSITIONING
================================================================================
Category and job-to-be-done: Create a mobile app that solves the validated problem described in the workbook, using the selected first-build idea only.

Unique angle:
Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.

Competitors or adjacent references to learn from, not copy:
- The French Bulldog App
- PetDesk
- PETcare AI
- Rover

This should feel like:
- A focused, premium mobile product designed for the exact target user.
- A real app someone could test on their phone today.
- A product with clear hierarchy, restrained scope, and a memorable first-use experience.

This should not feel like:
- A generic starter template.
- A marketing website.
- A dashboard full of dead cards.
- A feature dump where the primary action is hard to find.

================================================================================
3. TARGET USER PSYCHOLOGY
================================================================================
Design every screen around this user's real context:
French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories.

Assume the user is impatient, skeptical, and trying to solve a frequent pain. The app should reduce friction, make the next action obvious, and show progress quickly. Use plain-language copy that reflects the user's problem and desired outcome. Avoid jargon unless the app category demands it, and explain any advanced concept inside the UI.

Emotional goal: make the user feel understood, guided, and in control within the first minute.

================================================================================
4. DESIGN SYSTEM
================================================================================
Visual direction:
- Primary: #F7F1E8
- Secondary: #3A2D26
- Accent: #98FB98
- Background: #F5F5DC
- Design rationale: An elevated, warm palette using Bone (#F7F1E8) for surfaces, Espresso (#3A2D26) for readability, and Seafoam/Sage (#98FB98) for safe states, with Burnt Coral accents for heat warnings.

Typography: Use clean, modern native mobile typography with clear hierarchy. Use large, readable headings only where they help the user make decisions. Body text should be compact, scannable, and never clipped.

Layout density: Mobile-first, thumb-friendly, and calm. Minimum touch targets should feel like native mobile controls. Use enough spacing to avoid clutter, but keep repeated-use workflows efficient.

Motion and micro-interactions:
- Add subtle transitions between screens and modal sheets.
- Buttons and cards should respond immediately on tap with pressed/active feedback.
- Async actions need branded loading states, never blank screens or raw unstyled loaders.
- Use gentle success confirmations after saves, completions, purchases, or generated results.
- Keep animation tasteful and purposeful; polish matters more than spectacle.

================================================================================
5. STRUCTURE AND NAVIGATION
================================================================================
Recommended navigation: Use a simple bottom tab bar or equivalent native mobile structure with clear sections for Home, the primary workflow, saved/history/results, and Profile/Settings. Use stack navigation for detail screens and modal sheets for focused edits, paywalls, confirmations, and support.

Back behavior: Every nested screen must have a clear way back. Forms should warn before discarding meaningful unsaved data.

Auth gating: If account creation is needed, make it lightweight and do not block the user's first value moment unless the app truly requires saved cloud data.

Settings location: Put profile, notification settings, privacy links, support, restore purchases, and account deletion in a dedicated settings/profile area.

================================================================================
6. SCREEN MAP
================================================================================
Implement these screens as complete, navigable mobile screens:

1. Safety Dashboard
   Purpose: The primary landing screen featuring the Heat Safety Meter and current outdoor conditions.
   Main components:
   - Dynamic Heat Meter gauge (Safe/Caution/Danger)
   - Humidity and Temperature display
   - Quick-action walk timer
   - Current mood status icon
   User actions: provide clear primary and secondary actions, with disabled/loading/success states where relevant.
   States: include realistic empty state copy, loading treatment, and at least one helpful error state.

2. Daily Pulse
   Purpose: A playful hub for the daily horoscope and AI-driven mood analysis.
   Main components:
   - Frenchie 'Star Sign' display
   - Daily Horoscope card
   - Camera button for mood scanning
   - Shareable social graphic generator
   User actions: provide clear primary and secondary actions, with disabled/loading/success states where relevant.
   States: include realistic empty state copy, loading treatment, and at least one helpful error state.

3. Health & Breathing Log
   Purpose: A dedicated space to track respiratory health and symptoms common to the breed.
   Main components:
   - Breathing effort slider
   - Weight tracker chart
   - Medication reminders
   - Activity level log
   User actions: provide clear primary and secondary actions, with disabled/loading/success states where relevant.
   States: include realistic empty state copy, loading treatment, and at least one helpful error state.

4. Memory Journal
   Purpose: An elegant, editorial-style feed of photos and pet milestones.
   Main components:
   - Photo grid with date markers
   - Milestone achievement badges
   - Captioned entries
   - Filter by 'Puppyhood' or 'Senior' stages
   User actions: provide clear primary and secondary actions, with disabled/loading/success states where relevant.
   States: include realistic empty state copy, loading treatment, and at least one helpful error state.

================================================================================
7. CORE FEATURES
================================================================================
Implement these features with real behavior, state, and realistic sample data:

Each feature below must be implemented as a complete product capability, not a label on a screen. Treat every feature as a mini-spec with user value, screen placement, exact interaction behavior, inputs, outputs, state handling, local data, and realistic sample content.

1. Real-time Heat Safety Meter (Temperature + Humidity sensing)
   Why this matters: This is part of the core promise of Frenchie Buddy. It should directly help French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories move from the validated pain toward the app's promised outcome. Anchor the copy and interaction details in this product position: Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.
   Entry points and screens: Make this feature reachable from Safety Dashboard. If the feature is important enough for repeat use, also surface its latest state or shortcut from Home.
   Exact UX behavior:
      - Give the feature a clear entry point, focused interaction surface, completion state, and saved output.
      - Use realistic mock data and make the primary action obvious above the fold.
      - Provide edit, save, undo/cancel, and retry paths where applicable.
      - Make the feature feel complete even if external integrations are represented by local mock adapters.
   Inputs and controls:
      - Primary user intent or selection
      - Optional notes/details
      - Relevant preference or filter controls
   Expected output: A saved record or completed action that is visible elsewhere in the app and gives the user a useful next step.
   Data to model: Create a typed RealTimeHeat record with id, userId, title/name, status, sourceInputJson, resultJson, tags, createdAt, updatedAt, and any feature-specific metrics needed for charts or history.
   State requirements:
      - Loading: show branded progress copy and keep the user oriented.
      - Empty state: include realistic sample/demo content plus a CTA that starts this exact feature.
      - Error state: explain what failed in plain language and offer retry, edit input, or use sample/offline result.
      - Success state: confirm the saved/completed outcome and show the next best action.
      - Offline/mock mode: if real APIs or device integrations are unavailable, simulate the behavior with local adapters and clearly named mock data.
   Validation and edge cases: Disable the primary action until the required input is present. Prevent duplicate submissions. Preserve in-progress work while navigating. Avoid medical, legal, financial, or guaranteed-result claims unless the workbook explicitly supports them.
   Rork build guidance: Build the visible UI, local state, sample data, navigation links, and result/history integration for this feature now. Do not leave it as copy-only description or a nonfunctional button.

2. AI Mood Tracker via Photo Recognition
   Why this matters: This is part of the core promise of Frenchie Buddy. It should directly help French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories move from the validated pain toward the app's promised outcome. Anchor the copy and interaction details in this product position: Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.
   Entry points and screens: Make this feature reachable from Safety Dashboard, Daily Pulse, Health & Breathing Log. If the feature is important enough for repeat use, also surface its latest state or shortcut from Home.
   Exact UX behavior:
      - Collect a plain-language user input, plus one or two structured controls that sharpen the output without making the form feel heavy.
      - Show a branded generating state with progress copy that explains what the app is doing.
      - Return an editable result preview with save, regenerate, copy/share, and start-over actions.
      - Include a graceful fallback with high-quality sample output if no real AI key is configured.
   Inputs and controls:
      - Free-text prompt or feeling/problem description
      - Tone/style/intensity selector
      - Length or session-depth control
      - Regenerate/save/share actions
   Expected output: A polished generated result that can be edited, saved, copied/shared, regenerated, and later reopened from history.
   Data to model: Create a typed AiMoodTracker record with id, userId, title/name, status, sourceInputJson, resultJson, tags, createdAt, updatedAt, and any feature-specific metrics needed for charts or history.
   State requirements:
      - Loading: show branded progress copy and keep the user oriented.
      - Empty state: include realistic sample/demo content plus a CTA that starts this exact feature.
      - Error state: explain what failed in plain language and offer retry, edit input, or use sample/offline result.
      - Success state: confirm the saved/completed outcome and show the next best action.
      - Offline/mock mode: if real APIs or device integrations are unavailable, simulate the behavior with local adapters and clearly named mock data.
   Validation and edge cases: Disable the primary action until the required input is present. Prevent duplicate submissions. Preserve in-progress work while navigating. Avoid medical, legal, financial, or guaranteed-result claims unless the workbook explicitly supports them.
   Rork build guidance: Build the visible UI, local state, sample data, navigation links, and result/history integration for this feature now. Do not leave it as copy-only description or a nonfunctional button.

3. Brachycephalic-specific Health Tracker (Breathing, Snoring, Sleep)
   Why this matters: This is part of the core promise of Frenchie Buddy. It should directly help French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories move from the validated pain toward the app's promised outcome. Anchor the copy and interaction details in this product position: Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.
   Entry points and screens: Make this feature reachable from Health & Breathing Log. If the feature is important enough for repeat use, also surface its latest state or shortcut from Home.
   Exact UX behavior:
      - Give the feature a clear entry point, focused interaction surface, completion state, and saved output.
      - Use realistic mock data and make the primary action obvious above the fold.
      - Provide edit, save, undo/cancel, and retry paths where applicable.
      - Make the feature feel complete even if external integrations are represented by local mock adapters.
   Inputs and controls:
      - Primary user intent or selection
      - Optional notes/details
      - Relevant preference or filter controls
   Expected output: A saved record or completed action that is visible elsewhere in the app and gives the user a useful next step.
   Data to model: Create a typed BrachycephalicSpecificHealth record with id, userId, title/name, status, sourceInputJson, resultJson, tags, createdAt, updatedAt, and any feature-specific metrics needed for charts or history.
   State requirements:
      - Loading: show branded progress copy and keep the user oriented.
      - Empty state: include realistic sample/demo content plus a CTA that starts this exact feature.
      - Error state: explain what failed in plain language and offer retry, edit input, or use sample/offline result.
      - Success state: confirm the saved/completed outcome and show the next best action.
      - Offline/mock mode: if real APIs or device integrations are unavailable, simulate the behavior with local adapters and clearly named mock data.
   Validation and edge cases: Disable the primary action until the required input is present. Prevent duplicate submissions. Preserve in-progress work while navigating. Avoid medical, legal, financial, or guaranteed-result claims unless the workbook explicitly supports them.
   Rork build guidance: Build the visible UI, local state, sample data, navigation links, and result/history integration for this feature now. Do not leave it as copy-only description or a nonfunctional button.

4. Daily Frenchie Horoscope & Breed Tips
   Why this matters: This is part of the core promise of Frenchie Buddy. It should directly help French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories move from the validated pain toward the app's promised outcome. Anchor the copy and interaction details in this product position: Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.
   Entry points and screens: Make this feature reachable from Daily Pulse, Health & Breathing Log. If the feature is important enough for repeat use, also surface its latest state or shortcut from Home.
   Exact UX behavior:
      - Give the feature a clear entry point, focused interaction surface, completion state, and saved output.
      - Use realistic mock data and make the primary action obvious above the fold.
      - Provide edit, save, undo/cancel, and retry paths where applicable.
      - Make the feature feel complete even if external integrations are represented by local mock adapters.
   Inputs and controls:
      - Primary user intent or selection
      - Optional notes/details
      - Relevant preference or filter controls
   Expected output: A saved record or completed action that is visible elsewhere in the app and gives the user a useful next step.
   Data to model: Create a typed DailyFrenchieHoroscope record with id, userId, title/name, status, sourceInputJson, resultJson, tags, createdAt, updatedAt, and any feature-specific metrics needed for charts or history.
   State requirements:
      - Loading: show branded progress copy and keep the user oriented.
      - Empty state: include realistic sample/demo content plus a CTA that starts this exact feature.
      - Error state: explain what failed in plain language and offer retry, edit input, or use sample/offline result.
      - Success state: confirm the saved/completed outcome and show the next best action.
      - Offline/mock mode: if real APIs or device integrations are unavailable, simulate the behavior with local adapters and clearly named mock data.
   Validation and edge cases: Disable the primary action until the required input is present. Prevent duplicate submissions. Preserve in-progress work while navigating. Avoid medical, legal, financial, or guaranteed-result claims unless the workbook explicitly supports them.
   Rork build guidance: Build the visible UI, local state, sample data, navigation links, and result/history integration for this feature now. Do not leave it as copy-only description or a nonfunctional button.

5. Digital Memory Journal for photo storage and milestones
   Why this matters: This is part of the core promise of Frenchie Buddy. It should directly help French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories move from the validated pain toward the app's promised outcome. Anchor the copy and interaction details in this product position: Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.
   Entry points and screens: Make this feature reachable from Memory Journal. If the feature is important enough for repeat use, also surface its latest state or shortcut from Home.
   Exact UX behavior:
      - Capture a before-and-after measurement when the feature is used, then store it in history.
      - Render a scannable trend view with realistic sample records on first launch.
      - Let users filter or inspect individual records through a detail sheet.
      - Make the progress copy encouraging but factual, with no unsupported guaranteed outcomes.
   Inputs and controls:
      - Before value
      - After value
      - Date/time
      - Tags/category
      - Optional note or reflection
   Expected output: A saved measurement or journal record that updates charts, streaks, history lists, and the user's latest status.
   Data to model: Create a typed DigitalMemoryJournal record with id, userId, title/name, status, sourceInputJson, resultJson, tags, createdAt, updatedAt, and any feature-specific metrics needed for charts or history.
   State requirements:
      - Loading: show branded progress copy and keep the user oriented.
      - Empty state: include realistic sample/demo content plus a CTA that starts this exact feature.
      - Error state: explain what failed in plain language and offer retry, edit input, or use sample/offline result.
      - Success state: confirm the saved/completed outcome and show the next best action.
      - Offline/mock mode: if real APIs or device integrations are unavailable, simulate the behavior with local adapters and clearly named mock data.
   Validation and edge cases: Disable the primary action until the required input is present. Prevent duplicate submissions. Preserve in-progress work while navigating. Avoid medical, legal, financial, or guaranteed-result claims unless the workbook explicitly supports them.
   Rork build guidance: Build the visible UI, local state, sample data, navigation links, and result/history integration for this feature now. Do not leave it as copy-only description or a nonfunctional button.

================================================================================
8. USER FLOWS
================================================================================
Flow A - Onboarding and activation: Launch Frenchie Buddy, show a concise value hook, collect only essential preferences, explain any requested permissions before the native prompt, then take the user to Safety Dashboard.
Flow B - Core engagement: From Safety Dashboard, the user starts Real-time Heat Safety Meter (Temperature + Humidity sensing), completes the guided steps on Daily Pulse, sees progress and validation inline, then lands on Health & Breathing Log with a clear saved outcome and next action.
Flow C - Repeat use: Returning users see recent activity, saved work, and the most likely next action without repeating onboarding.
Flow D - Settings and trust: Users can edit preferences, manage notifications, access support, review privacy/terms links, restore purchases, and delete or export relevant account data.
Flow E - Failure recovery: For network, AI, validation, or permission failures, show calm inline errors with retry, edit, and contact-support options. Never leave the user on a blank screen.

================================================================================
9. MONETIZATION
================================================================================
Monetization model:
Freemium model with a 7-day free trial. Premium subscription is $4.99/mo or $29.99/yr, unlocking advanced health analytics, unlimited photo storage in the Memory Journal, and the AI Mood Tracker.

If subscriptions or premium access are part of the concept:
- Implement a polished paywall screen with clear benefits, price-card placeholders, purchase CTA, restore purchases, terms, and privacy links.
- Use a single named entitlement such as "pro" or "premium" and keep feature gates easy to understand.
- Do not attempt real charges unless store products and RevenueCat configuration are present.
- Keep free vs paid boundaries visible and fair. Never trick users into subscribing.

If monetization is not part of v1:
- State "No paywall in v1" inside the app configuration and keep purchase UI out of the primary flow.

================================================================================
10. DATA MODEL AND STATE
================================================================================
Technical approach:
Build with React Native/Expo for Rork. Treat these concept integrations as local/mock adapters unless credentials are explicitly configured: React Native with Expo, Node.js backend, OpenWeatherMap API for heat modeling, and TensorFlow Lite for on-device photo mood analysis.

Use a clean, typed, component-based architecture. Separate UI components from business logic and state. Include realistic local mock data so every list, chart, card, profile, and detail screen looks populated on first launch. Structure the app so these local models can later be replaced by Supabase, Firebase, or another backend.

Suggested data objects:
- UserProfile: id, displayName, email, avatarUrl, subscriptionStatus, onboardingCompleted, createdAt, updatedAt
- FrenchieBuddyItem: id, userId, title, description, status, tags, metadataJson, createdAt, updatedAt
- Session: id, userId, startedAt, completedAt, durationSeconds, outcomeSummary, notes
- SavedResult: id, userId, sourceItemId, resultType, contentJson, favorite, createdAt
- UserPreference: id, userId, visualMode, notificationEnabled, defaultSettingsJson, privacyChoicesJson
- PurchaseState: id, userId, entitlement, productId, expiresAt, lastCheckedAt
- RealTimeHeatState: id, userId, relatedItemId, stateJson, lastUpdatedAt
- AiMoodTrackerState: id, userId, relatedItemId, stateJson, lastUpdatedAt

State requirements:
- Persist user preferences locally.
- Keep generated or user-created records available across navigation.
- Use optimistic UI only where it is safe.
- Handle loading, empty, error, success, and offline-ish states gracefully.

================================================================================
11. PRIVACY, PERMISSIONS, AND STORE SAFETY
================================================================================
Permissions: Request only permissions the app truly needs. Explain why each permission is needed before triggering the native prompt.

Privacy and trust:
- Include settings links for Privacy Policy, Terms of Service, Support, Restore Purchases, and Delete Account.
- Do not include unsupported medical, financial, legal, or guaranteed-outcome claims.
- If the app touches health, finance, legal, children, location, contacts, camera, microphone, or sensitive personal data, use careful disclaimers and minimal data collection.
- Keep API keys and sensitive credentials server-side or in secure configuration. Never expose secrets in client code.
- Use realistic demo/sample data and avoid scraped or copyrighted content.

App review readiness:
- No placeholder copy, lorem ipsum, broken buttons, or empty websites.
- If login is required, include a demo mode or clear demo-account path for review.
- Make subscription benefits clear before purchase and include restore purchases.
- Do not ask Rork to publish the app, create Apple accounts, process live payments, send real emails/SMS, or make external mutations in this v1 build unless explicitly configured.

================================================================================
12. QUALITY BAR
================================================================================
Acceptance criteria:
1. The generated app is a complete mobile application for Frenchie Buddy, not a landing page or static mockup.
2. Every listed screen is reachable through the stated navigation structure and has useful realistic sample content.
3. The first-session user can understand the value proposition and reach the primary action in under 60 seconds.
4. All buttons, form controls, tabs, cards, and list items have visible pressed, loading, disabled, success, and error behavior where applicable.
5. The UI has no overlapping text, clipped labels, broken scrolling, or unreadable contrast on common iPhone and Android viewport sizes.
6. At least 5 screens are implemented with native-feeling layout, spacing, and mobile touch targets.
7. Empty states, loading states, and error states are designed with helpful copy and recovery actions.
8. All sample data is realistic for the target user and can be replaced later by a real backend without rewriting the UI.
9. The monetization and restore-purchases surfaces are present when subscriptions are specified, but no real charges are attempted without configured store products.
10. Privacy, permissions, terms, support, and account-deletion entry points are easy to find in settings.
11. The code is organized into reusable components, typed data models, and centralized configuration for future iterations.
12. The app feels polished: smooth transitions, responsive tap feedback, consistent spacing, and a cohesive visual system.

================================================================================
WORKBOOK SOURCE MATERIAL
================================================================================
Use the following workbook facts as source material. Preserve the selected idea, target user, problem validation, competitor gaps, feature priorities, monetization notes, and visual preferences. Do not invent sensitive legal, health, financial, or business claims beyond what is supported here.

All candidate ideas:
App Idea 1: frenchie app that helps owners with their specific frenchie breed
App Idea 2: fangirl sports a all womens sporting app
App Idea 3: not applicable / banana

Selected first build: App Idea 1

Selection reason: because I have a frenchie and id like to see when its safe to take my dog for walks with his breathing problems

Selected app idea: frenchie app that helps owners with their specific frenchie breed

Audience and usage context:
Age: for French bull dog owners
Work: all professions
Day in life: their day can be a mix of things
Gender: All genders
Location: can live anywhere
Children: Not relevant
Pets: Yes
Why they have this problem: the app will give a heat meter to let the user know if its safe to walk their frenchie who has breathing issues
Where they use the app: they can be anywhere
What just happened before opening: checking to see if the weather is good to walk their frenchie
How they feel: inquisitive
Goal in next 5 minutes: check to see if the weather is good to walk their frenchie and do a ck in of their dogs health
Currently using another app: the French bulldogs app
pet desk app
pet care AI app
Currently using notebook and pen: have to guess if its ok to walk their dog based on the news weather
Currently Googling: yes googling or other apps
Currently doing nothing: they take a chance and walk their dog for too long and the dog gets overheated
Other current solution: their guessing wether it is safe to take their dog out for a long walk
User quote 1: frenchie owners
User quote 2: frenchie owners
User quote 3: frenchie owners 
or someone thinking about getting a frenchie to learn more about the breed

Problem validation:
Problem sentence: they need to know if its safe to walk their dog in 75 degree weather with humidity
Problem frequency: Every day
Pain level: 3
Evidence from conversations: frenchies struggle to breath and when the weather conditions are not great it makes walking harder for the breed

Competitor research:
Competitor 1
Downloaded: No
App name: the French bulldog
Monthly downloads: over 500k
Monthly revenue: 500k
Star rating: 4.0
Number of reviews: over 1000
First action: sign up and list email
Clever moment: it does not list dog by breed
Annoying, confusing, or broken: app didn't fully describe what it offered
Wish it did: I wish it have more information on French bull dog breed
Would pay: no because it is not what im looking for in an app
3 common complaints: not many complaints but what the user did like was being able to post pics of their dogs
What our app will do differently: I want my app to be specific to the breed.

Competitor 2
Downloaded: Yes
App name: Pet desk
Monthly downloads: over 1000k
Monthly revenue: 500k
Star rating: 4.9
Number of reviews: 481k
First action: sign in and give information on dog
Clever moment: no it is not specific to the breed
Annoying, confusing, or broken: no but it is just a generic pet info app
Wish it did: more information about the frenchie breed
Would pay: no because I want it to be more frenchie specific
3 common complaints: ads 
can't delete old messages
What our app will do differently: I want my app to be geared towards the frenchie breed

Competitor 3
Downloaded: Yes
App name: PETcare AI
Monthly downloads: 50
Monthly revenue: not sure
Star rating: 5.0
Number of reviews: 50
First action: give pet information
Clever moment: it has a injury pet scan
Annoying, confusing, or broken: it is more for all general pet types
Wish it did: had more information on French bulldogs
Would pay: yes because I liked the injury scan feature.  nothing else seems appealing
3 common complaints: not many complaints on this app in reviews because its a newer app
What our app will do differently: I want my app to be geared more towards French bull dogs

Competitor 4
Downloaded: No
App name: not applicable
Monthly downloads: not applicable
Monthly revenue: not applicalble
Star rating: not applicable
Number of reviews: not applicable
First action: not applicable s
Clever moment: not applicable s
Annoying, confusing, or broken: not applicable s
Wish it did: not applicable s
Would pay: not applicable s
3 common complaints: not applicable snot applicable not applicable
What our app will do differently: not applicable not applicable

Competitor 5
Downloaded: No
App name: not applicable
Monthly downloads: not applicable
Monthly revenue: not applicable
Star rating: not applicable
Number of reviews: not applicable
First action: not applicable s
Clever moment: not applicable s
Annoying, confusing, or broken: not applicable s
Wish it did: not applicable s
Would pay: not applicable s
3 common complaints: not applicable s not applicable not applicable s not applicable
What our app will do differently: not applicable not applicable

Feature list:
Feature 1: pup profile
Feature 2: heat safety meter
Feature 3: daily ck in
Feature 4: memory journal
Feature 5: tip of the day
Feature 6: daily horoscope
Feature 7: health tracker
Feature 8: brachycephalic dog care (advanced owners)
Feature 9: medication reminder
Feature 10: mood tracker based on a photo

Must-have features:
Must-have 1: heat meter
Because: to know if its safe to walk your frenchie

Must-have 2: daily horoscope
Because: a good viral hook to the app

Must-have 3: mood tracker
Because: also a good viral hook for the app

Must-have 4: health tracker
Because: to keep track of sleep, breathing, and mood

Must-have 5: memory journal
Because: to keep memories and pics of pup as its aging

Single most important feature: heat meter

Single most important feature because: to know when its safe to walk your frenchie who may have breathing problems

Monetization:
Money model: Freemium
Because: because I was told its a good pricing model
I will charge: 4.99 monthly 
29.99 per year
Pricing vs competition: Similar
Pricing because: to keep it competitive and gain traction
User pays when: After free trial
More info on when they pay: after free trial then subscription will be offered

Visual direction:
Main color: bone
Accent color: seafoam green
Brand I like #1: warm, playful  , elevated .  like the pet desk app
What I like about brand #1: I want the app to look elegant
Brand I like #2: warm , playful , elevated like the rover dog sitter app
What I like about brand #2: I want the app to look elevated
Look and feel words: warm, elegant, playful
Extra look and feel notes: warm.        Warm cream / oat background
Espresso brown text
Dusty terracotta accents
Muted sage or olive for wellness/safe states
Soft blush for warmth
Burnt coral for warnings (heat)
Example palette:
Bone: #F7F1E8
Espresso: #3A2D26
Clay: #C7745A
Dusty Rose: #D8B0A6
Olive: #74846A
Warm Gold accent: #C9A56A
elevated
playful
cozy
premium
affectionate
lightly humorous
editorial but approachable

================================================================================
EXECUTION INSTRUCTION
================================================================================
Begin building now. Create the complete mobile app screen-by-screen and flow-by-flow. Keep scope controlled, make every listed screen navigable, use polished native mobile patterns, and prioritize the best possible user experience over adding extra features.
================================================================================

## Questionnaire Answers

**ideas:**
```json
{
  "idea1": {
    "age": "for French bull dog owners",
    "pets": "Yes",
    "work": "all professions",
    "price": "4.99 monthly \n29.99 per year",
    "gender": "All genders",
    "feeling": "inquisitive",
    "children": "Not relevant",
    "features": [
      "pup profile",
      "heat safety meter",
      "daily ck in",
      "memory journal",
      "tip of the day",
      "daily horoscope",
      "health tracker",
      "brachycephalic dog care (advanced owners)",
      "medication reminder",
      "mood tracker based on a photo"
    ],
    "location": "can live anywhere",
    "yourIdea": "frenchie app that helps owners with their specific frenchie breed",
    "dayInLife": "their day can be a mix of things",
    "painLevel": "3",
    "moneyModel": "Freemium",
    "userQuote1": "frenchie owners",
    "userQuote2": "frenchie owners",
    "userQuote3": "frenchie owners \nor someone thinking about getting a frenchie to learn more about the breed",
    "usesGoogle": "yes googling or other apps",
    "competitors": [
      {
        "appName": "the French bulldog",
        "wouldPay": "no because it is not what im looking for in an app",
        "downloaded": "No",
        "starRating": "4.0",
        "firstAction": "sign up and list email",
        "reviewCount": "over 1000",
        "wishedItDid": "I wish it have more information on French bull dog breed",
        "cleverMoment": "it does not list dog by breed",
        "monthlyRevenue": "500k",
        "differentiation": "I want my app to be specific to the breed.",
        "annoyingOrBroken": "app didn't fully describe what it offered",
        "commonComplaints": "not many complaints but what the user did like was being able to post pics of their dogs",
        "monthlyDownloads": "over 500k"
      },
      {
        "appName": "Pet desk",
        "wouldPay": "no because I want it to be more frenchie specific",
        "downloaded": "Yes",
        "starRating": "4.9",
        "firstAction": "sign in and give information on dog",
        "reviewCount": "481k",
        "wishedItDid": "more information about the frenchie breed",
        "cleverMoment": "no it is not specific to the breed",
        "monthlyRevenue": "500k",
        "differentiation": "I want my app to be geared towards the frenchie breed",
        "annoyingOrBroken": "no but it is just a generic pet info app",
        "commonComplaints": "ads \ncan't delete old messages",
        "monthlyDownloads": "over 1000k"
      },
      {
        "appName": "PETcare AI",
        "wouldPay": "yes because I liked the injury scan feature.  nothing else seems appealing",
        "downloaded": "Yes",
        "starRating": "5.0",
        "firstAction": "give pet information",
        "reviewCount": "50",
        "wishedItDid": "had more information on French bulldogs",
        "cleverMoment": "it has a injury pet scan",
        "monthlyRevenue": "not sure",
        "differentiation": "I want my app to be geared more towards French bull dogs",
        "annoyingOrBroken": "it is more for all general pet types",
        "commonComplaints": "not many complaints on this app in reviews because its a newer app",
        "monthlyDownloads": "50"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable s",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable s",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable s",
        "cleverMoment": "not applicable s",
        "monthlyRevenue": "not applicalble",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable s",
        "commonComplaints": "not applicable snot applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable s",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable s",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable s",
        "cleverMoment": "not applicable s",
        "monthlyRevenue": "not applicable",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable s",
        "commonComplaints": "not applicable s not applicable not applicable s not applicable",
        "monthlyDownloads": "not applicable"
      }
    ],
    "useLocation": "they can be anywhere",
    "doingNothing": "they take a chance and walk their dog for too long and the dog gets overheated",
    "problemCause": "the app will give a heat meter to let the user know if its safe to walk their frenchie who has breathing issues",
    "userPaysWhen": "After free trial",
    "usesNotebook": "have to guess if its ok to walk their dog based on the news weather",
    "otherSolution": "their guessing wether it is safe to take their dog out for a long walk",
    "triggerMoment": "checking to see if the weather is good to walk their frenchie",
    "fiveMinuteGoal": "check to see if the weather is good to walk their frenchie and do a ck in of their dogs health",
    "pricingBecause": "to keep it competitive and gain traction",
    "usesAnotherApp": "the French bulldogs app\npet desk app\npet care AI app",
    "problemSentence": "they need to know if its safe to walk their dog in 75 degree weather with humidity",
    "mustHaveFeatures": [
      {
        "because": "to know if its safe to walk your frenchie",
        "feature": "heat meter"
      },
      {
        "because": "a good viral hook to the app",
        "feature": "daily horoscope"
      },
      {
        "because": "also a good viral hook for the app",
        "feature": "mood tracker"
      },
      {
        "because": "to keep track of sleep, breathing, and mood",
        "feature": "health tracker"
      },
      {
        "because": "to keep memories and pics of pup as its aging",
        "feature": "memory journal"
      }
    ],
    "problemFrequency": "Every day",
    "moneyModelBecause": "because I was told its a good pricing model",
    "pricingVsCompetition": "Similar",
    "userPaysWhenMoreInfo": "after free trial then subscription will be offered",
    "evidenceFromConversations": "frenchies struggle to breath and when the weather conditions are not great it makes walking harder for the breed",
    "singleMostImportantFeature": "heat meter",
    "singleMostImportantFeatureBecause": "to know when its safe to walk your frenchie who may have breathing problems"
  },
  "idea2": {
    "age": "fangirl sports for women who want a sporting app that only shows womens sports",
    "pets": "Not relevant",
    "work": "all professions",
    "price": "4.99 monthly \n29.99 year",
    "gender": "All genders",
    "feeling": "excited, motivated",
    "children": "Not relevant",
    "features": [
      "explain the game while watching",
      "basic 101 sports knowledge",
      "community page",
      "listing of all women's sports",
      "favorite team section",
      "favorite player section",
      "channel listings of the sports broadcasts",
      "personality driven team matching",
      "player fun facts",
      "chat room on community page"
    ],
    "location": "can live anywhere",
    "yourIdea": "fangirl sports a all womens sporting app",
    "dayInLife": "their day can be a mix of things",
    "painLevel": "3",
    "moneyModel": "Freemium",
    "userQuote1": "female sports enthusiast",
    "userQuote2": "female wanting to learn more about sports",
    "userQuote3": "female wanting to be part of the womens sports community",
    "usesGoogle": "googling or other apps",
    "competitors": [
      {
        "appName": "just womens sports",
        "wouldPay": "no because it is not what im looking for",
        "downloaded": "Yes",
        "starRating": "over 4.0",
        "firstAction": "sign up and list personal information",
        "reviewCount": "over 1000k",
        "wishedItDid": "was better organized with womens sports",
        "cleverMoment": "no its a generic sporting app",
        "monthlyRevenue": "over 500k",
        "differentiation": "I want my app to be specific to womens sports",
        "annoyingOrBroken": "doesn't explain if womens sports are listed in a channel line up",
        "commonComplaints": "not organized \nnot geared towards womens sports",
        "monthlyDownloads": "over 1000k"
      },
      {
        "appName": "sheis sports network app",
        "wouldPay": "no because it is not what im looking for",
        "downloaded": "Yes",
        "starRating": "over 4.0",
        "firstAction": "sign in with personal information",
        "reviewCount": "over 1000",
        "wishedItDid": "more features to use",
        "cleverMoment": "I liked the graphics and style",
        "monthlyRevenue": "500k",
        "differentiation": "need to be geared more towards females but have a girlie vibe",
        "annoyingOrBroken": "not enough information for what my needs are I want the app to feel more fun and playful",
        "commonComplaints": "the womens sporting apps that are avail are very low on the search engine in App Store",
        "monthlyDownloads": "over 1000k"
      },
      {
        "appName": "she sports app",
        "wouldPay": "no because it is not what im looking for",
        "downloaded": "Yes",
        "starRating": "4.8",
        "firstAction": "sign up and give personal information",
        "reviewCount": "13",
        "wishedItDid": "listed women sports",
        "cleverMoment": "the app is geared more towards connecting althetes with colleges not  what im looking for but I like the way the app looks",
        "monthlyRevenue": "500k",
        "differentiation": "the app is good for what it is to connect female athletes with colleges",
        "annoyingOrBroken": "made me think it was a sporting app but its not",
        "commonComplaints": "doesn't let you sign up with international phone numbers",
        "monthlyDownloads": "over 1000k"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable s",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable s",
        "cleverMoment": "not applicable s",
        "monthlyRevenue": "not applicable",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable s",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable",
        "differentiation": "not applicable not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      }
    ],
    "useLocation": "they can be anywhere",
    "doingNothing": "they keep searching to find what their looking for and can't . also not all tv broadcasts womens sports as much as mens sports so its hard to find",
    "problemCause": "a place where they can find only women sports and track their favorite players and teams",
    "userPaysWhen": "After free trial",
    "usesNotebook": "try and look up the sports on google or TV",
    "otherSolution": "their watching it on google",
    "triggerMoment": "they want to see when a particular sport is playing",
    "fiveMinuteGoal": "find out when their favorite womens team is playing",
    "pricingBecause": "to keep it competitive and gain traction",
    "usesAnotherApp": "just womens sports \nsheis sports network app\nshe sports app",
    "problemSentence": "they can't find the sports teams all in one place",
    "mustHaveFeatures": [
      {
        "because": "need of listing of all games in one place",
        "feature": "listing of games"
      },
      {
        "because": "learning page for new viewers",
        "feature": "basic sports 101"
      },
      {
        "because": "to list womens sporting events in area",
        "feature": "community page"
      },
      {
        "because": "to keep favorite players and team in one place",
        "feature": "favorites tab"
      },
      {
        "because": "to learn something new about a player",
        "feature": "player fun fact"
      }
    ],
    "problemFrequency": "Every day",
    "moneyModelBecause": "subscription offer free listing but to get access to premium features like community page",
    "pricingVsCompetition": "Similar",
    "userPaysWhenMoreInfo": "offer free features then charge for premium features",
    "evidenceFromConversations": "it is hard to find womens sports listing in one place",
    "singleMostImportantFeature": "leaderboards",
    "singleMostImportantFeatureBecause": "to keep track of standings"
  },
  "idea3": {
    "age": "not applicable",
    "pets": "Not relevant",
    "work": "not applicable",
    "price": "not applicable s",
    "gender": "Prefer not to specify",
    "feeling": "not applicable s",
    "children": "Not relevant",
    "features": [
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable"
    ],
    "location": "not applicable",
    "yourIdea": "not applicable / banana",
    "dayInLife": "not applicable not applicable",
    "painLevel": "1",
    "moneyModel": "Not sure yet",
    "userQuote1": "not applicables",
    "userQuote2": "snot applicable",
    "userQuote3": "not applicalble",
    "usesGoogle": "not applicable s",
    "competitors": [
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable not applicable",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable not applicable",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable not applicable",
        "differentiation": "not applicable not applicable not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable not applicable",
        "differentiation": "not applicable not applicable not applicable not applicable not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      }
    ],
    "useLocation": "not applicable s",
    "doingNothing": "not applicable s",
    "problemCause": "not applicable /nananan",
    "userPaysWhen": "On download",
    "usesNotebook": "not applicable s",
    "otherSolution": "not applicable",
    "triggerMoment": "not applicable s",
    "fiveMinuteGoal": "not applicable s",
    "pricingBecause": "not applicable s",
    "usesAnotherApp": "not applicable s",
    "problemSentence": "not applicable s not applicable not applicable s not applicable not applicable s not applicable",
    "mustHaveFeatures": [
      {
        "because": "not applicable s",
        "feature": "not applicable"
      },
      {
        "because": "not applicable s",
        "feature": "not applicable"
      },
      {
        "because": "not applicable s",
        "feature": "not applicable"
      },
      {
        "because": "not applicable s",
        "feature": "not applicable"
      },
      {
        "because": "not applicable s",
        "feature": "not applicable"
      }
    ],
    "problemFrequency": "Rarely",
    "moneyModelBecause": "not applicable s",
    "pricingVsCompetition": "Similar",
    "userPaysWhenMoreInfo": "not applicable s",
    "evidenceFromConversations": "not applicable/ banana",
    "singleMostImportantFeature": "not applicable",
    "singleMostImportantFeatureBecause": "not applicable s"
  }
}
```

**version:** advanced_app_builder_v2

**lookAndFeel:**
```json
{
  "words": [
    "warm",
    "elegant",
    "playful"
  ],
  "mainColor": "bone",
  "brandLike1": "warm, playful  , elevated .  like the pet desk app",
  "brandLike2": "warm , playful , elevated like the rover dog sitter app",
  "extraNotes": "warm.        Warm cream / oat background\nEspresso brown text\nDusty terracotta accents\nMuted sage or olive for wellness/safe states\nSoft blush for warmth\nBurnt coral for warnings (heat)\nExample palette:\nBone: #F7F1E8\nEspresso: #3A2D26\nClay: #C7745A\nDusty Rose: #D8B0A6\nOlive: #74846A\nWarm Gold accent: #C9A56A\nelevated\nplayful\ncozy\npremium\naffectionate\nlightly humorous\neditorial but approachable",
  "accentColor": "seafoam green",
  "brandLike1Reason": "I want the app to look elegant",
  "brandLike2Reason": "I want the app to look elevated"
}
```

**selectedIdeaKey:** idea1

**selectedIdeaReason:** because I have a frenchie and id like to see when its safe to take my dog for walks with his breathing problems

## Mockup Screens

- **Safety Dashboard**: /storage/generated/1780363276720.png
- **Daily Pulse**: /storage/generated/1780363287169.png
- **Health & Breathing Log**: /storage/generated/1780363298725.png
- **Memory Journal**: /storage/generated/1780363310360.png

## Workbook Version

| Field | Value |
|---|---|
| Version Number | 1 |
| Generation Status | complete |
| Submitted At | 2026-05-27 |

### Review Brief

**appName:** Frenchie Buddy

**screens:**
  - **name:** Safety Dashboard
  - **description:** The primary landing screen featuring the Heat Safety Meter and current outdoor conditions.
  - **keyElements:** Dynamic Heat Meter gauge (Safe/Caution/Danger),Humidity and Temperature display,Quick-action walk timer,Current mood status icon
  - **name:** Daily Pulse
  - **description:** A playful hub for the daily horoscope and AI-driven mood analysis.
  - **keyElements:** Frenchie 'Star Sign' display,Daily Horoscope card,Camera button for mood scanning,Shareable social graphic generator
  - **name:** Health & Breathing Log
  - **description:** A dedicated space to track respiratory health and symptoms common to the breed.
  - **keyElements:** Breathing effort slider,Weight tracker chart,Medication reminders,Activity level log
  - **name:** Memory Journal
  - **description:** An elegant, editorial-style feed of photos and pet milestones.
  - **keyElements:** Photo grid with date markers,Milestone achievement badges,Captioned entries,Filter by 'Puppyhood' or 'Senior' stages

**tagline:** Safe Breathing, Daily Joy.

**techStack:** React Native with Expo, Node.js backend, OpenWeatherMap API for heat modeling, and TensorFlow Lite for on-device photo mood analysis.

**rorkPrompt:** ================================================================================
ROLE AND OBJECTIVE
================================================================================
You are Rork's lead mobile product architect and principal UI/UX engineer. Build a complete, polished, production-minded mobile application in one generation cycle.

Build the complete app, not a landing page. Do not create placeholder screens, TODO buttons, empty templates, or fake navigation. Prioritize one excellent core product experience over unnecessary feature sprawl. The app must feel fast, responsive, native, and alive on mobile.

================================================================================
1. APP BRIEF
================================================================================
App name: Frenchie Buddy
One-sentence promise: Safe Breathing, Daily Joy.
Primary value proposition: Frenchie Buddy is the first breed-specific wellness companion designed exclusively for French Bulldog owners. Focused on the unique physiological needs of brachycephalic dogs, the app solves the 'guessing game' of outdoor safety with a real-time Heat Safety Meter that accounts for temperature and humidity. Beyond safety, it offers a warm, playful space for owners to track health trends, capture memories, and connect with their dog's personality through AI-driven mood tracking and breed-specific daily horoscopes.
Target user: French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories.
Primary success outcome: The user reaches the core value moment quickly, completes the main workflow, and has a clear reason to return.
Platform target: Build for React Native/Expo so the app can run on iOS and Android unless the feature list explicitly requires iOS-only native capabilities.

================================================================================
2. PRODUCT POSITIONING
================================================================================
Category and job-to-be-done: Create a mobile app that solves the validated problem described in the workbook, using the selected first-build idea only.

Unique angle:
Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.

Competitors or adjacent references to learn from, not copy:
- The French Bulldog App
- PetDesk
- PETcare AI
- Rover

This should feel like:
- A focused, premium mobile product designed for the exact target user.
- A real app someone could test on their phone today.
- A product with clear hierarchy, restrained scope, and a memorable first-use experience.

This should not feel like:
- A generic starter template.
- A marketing website.
- A dashboard full of dead cards.
- A feature dump where the primary action is hard to find.

================================================================================
3. TARGET USER PSYCHOLOGY
================================================================================
Design every screen around this user's real context:
French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories.

Assume the user is impatient, skeptical, and trying to solve a frequent pain. The app should reduce friction, make the next action obvious, and show progress quickly. Use plain-language copy that reflects the user's problem and desired outcome. Avoid jargon unless the app category demands it, and explain any advanced concept inside the UI.

Emotional goal: make the user feel understood, guided, and in control within the first minute.

================================================================================
4. DESIGN SYSTEM
================================================================================
Visual direction:
- Primary: #F7F1E8
- Secondary: #3A2D26
- Accent: #98FB98
- Background: #F5F5DC
- Design rationale: An elevated, warm palette using Bone (#F7F1E8) for surfaces, Espresso (#3A2D26) for readability, and Seafoam/Sage (#98FB98) for safe states, with Burnt Coral accents for heat warnings.

Typography: Use clean, modern native mobile typography with clear hierarchy. Use large, readable headings only where they help the user make decisions. Body text should be compact, scannable, and never clipped.

Layout density: Mobile-first, thumb-friendly, and calm. Minimum touch targets should feel like native mobile controls. Use enough spacing to avoid clutter, but keep repeated-use workflows efficient.

Motion and micro-interactions:
- Add subtle transitions between screens and modal sheets.
- Buttons and cards should respond immediately on tap with pressed/active feedback.
- Async actions need branded loading states, never blank screens or raw unstyled loaders.
- Use gentle success confirmations after saves, completions, purchases, or generated results.
- Keep animation tasteful and purposeful; polish matters more than spectacle.

================================================================================
5. STRUCTURE AND NAVIGATION
================================================================================
Recommended navigation: Use a simple bottom tab bar or equivalent native mobile structure with clear sections for Home, the primary workflow, saved/history/results, and Profile/Settings. Use stack navigation for detail screens and modal sheets for focused edits, paywalls, confirmations, and support.

Back behavior: Every nested screen must have a clear way back. Forms should warn before discarding meaningful unsaved data.

Auth gating: If account creation is needed, make it lightweight and do not block the user's first value moment unless the app truly requires saved cloud data.

Settings location: Put profile, notification settings, privacy links, support, restore purchases, and account deletion in a dedicated settings/profile area.

================================================================================
6. SCREEN MAP
================================================================================
Implement these screens as complete, navigable mobile screens:

1. Safety Dashboard
   Purpose: The primary landing screen featuring the Heat Safety Meter and current outdoor conditions.
   Main components:
   - Dynamic Heat Meter gauge (Safe/Caution/Danger)
   - Humidity and Temperature display
   - Quick-action walk timer
   - Current mood status icon
   User actions: provide clear primary and secondary actions, with disabled/loading/success states where relevant.
   States: include realistic empty state copy, loading treatment, and at least one helpful error state.

2. Daily Pulse
   Purpose: A playful hub for the daily horoscope and AI-driven mood analysis.
   Main components:
   - Frenchie 'Star Sign' display
   - Daily Horoscope card
   - Camera button for mood scanning
   - Shareable social graphic generator
   User actions: provide clear primary and secondary actions, with disabled/loading/success states where relevant.
   States: include realistic empty state copy, loading treatment, and at least one helpful error state.

3. Health & Breathing Log
   Purpose: A dedicated space to track respiratory health and symptoms common to the breed.
   Main components:
   - Breathing effort slider
   - Weight tracker chart
   - Medication reminders
   - Activity level log
   User actions: provide clear primary and secondary actions, with disabled/loading/success states where relevant.
   States: include realistic empty state copy, loading treatment, and at least one helpful error state.

4. Memory Journal
   Purpose: An elegant, editorial-style feed of photos and pet milestones.
   Main components:
   - Photo grid with date markers
   - Milestone achievement badges
   - Captioned entries
   - Filter by 'Puppyhood' or 'Senior' stages
   User actions: provide clear primary and secondary actions, with disabled/loading/success states where relevant.
   States: include realistic empty state copy, loading treatment, and at least one helpful error state.

================================================================================
7. CORE FEATURES
================================================================================
Implement these features with real behavior, state, and realistic sample data:

Each feature below must be implemented as a complete product capability, not a label on a screen. Treat every feature as a mini-spec with user value, screen placement, exact interaction behavior, inputs, outputs, state handling, local data, and realistic sample content.

1. Real-time Heat Safety Meter (Temperature + Humidity sensing)
   Why this matters: This is part of the core promise of Frenchie Buddy. It should directly help French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories move from the validated pain toward the app's promised outcome. Anchor the copy and interaction details in this product position: Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.
   Entry points and screens: Make this feature reachable from Safety Dashboard. If the feature is important enough for repeat use, also surface its latest state or shortcut from Home.
   Exact UX behavior:
      - Give the feature a clear entry point, focused interaction surface, completion state, and saved output.
      - Use realistic mock data and make the primary action obvious above the fold.
      - Provide edit, save, undo/cancel, and retry paths where applicable.
      - Make the feature feel complete even if external integrations are represented by local mock adapters.
   Inputs and controls:
      - Primary user intent or selection
      - Optional notes/details
      - Relevant preference or filter controls
   Expected output: A saved record or completed action that is visible elsewhere in the app and gives the user a useful next step.
   Data to model: Create a typed RealTimeHeat record with id, userId, title/name, status, sourceInputJson, resultJson, tags, createdAt, updatedAt, and any feature-specific metrics needed for charts or history.
   State requirements:
      - Loading: show branded progress copy and keep the user oriented.
      - Empty state: include realistic sample/demo content plus a CTA that starts this exact feature.
      - Error state: explain what failed in plain language and offer retry, edit input, or use sample/offline result.
      - Success state: confirm the saved/completed outcome and show the next best action.
      - Offline/mock mode: if real APIs or device integrations are unavailable, simulate the behavior with local adapters and clearly named mock data.
   Validation and edge cases: Disable the primary action until the required input is present. Prevent duplicate submissions. Preserve in-progress work while navigating. Avoid medical, legal, financial, or guaranteed-result claims unless the workbook explicitly supports them.
   Rork build guidance: Build the visible UI, local state, sample data, navigation links, and result/history integration for this feature now. Do not leave it as copy-only description or a nonfunctional button.

2. AI Mood Tracker via Photo Recognition
   Why this matters: This is part of the core promise of Frenchie Buddy. It should directly help French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories move from the validated pain toward the app's promised outcome. Anchor the copy and interaction details in this product position: Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.
   Entry points and screens: Make this feature reachable from Safety Dashboard, Daily Pulse, Health & Breathing Log. If the feature is important enough for repeat use, also surface its latest state or shortcut from Home.
   Exact UX behavior:
      - Collect a plain-language user input, plus one or two structured controls that sharpen the output without making the form feel heavy.
      - Show a branded generating state with progress copy that explains what the app is doing.
      - Return an editable result preview with save, regenerate, copy/share, and start-over actions.
      - Include a graceful fallback with high-quality sample output if no real AI key is configured.
   Inputs and controls:
      - Free-text prompt or feeling/problem description
      - Tone/style/intensity selector
      - Length or session-depth control
      - Regenerate/save/share actions
   Expected output: A polished generated result that can be edited, saved, copied/shared, regenerated, and later reopened from history.
   Data to model: Create a typed AiMoodTracker record with id, userId, title/name, status, sourceInputJson, resultJson, tags, createdAt, updatedAt, and any feature-specific metrics needed for charts or history.
   State requirements:
      - Loading: show branded progress copy and keep the user oriented.
      - Empty state: include realistic sample/demo content plus a CTA that starts this exact feature.
      - Error state: explain what failed in plain language and offer retry, edit input, or use sample/offline result.
      - Success state: confirm the saved/completed outcome and show the next best action.
      - Offline/mock mode: if real APIs or device integrations are unavailable, simulate the behavior with local adapters and clearly named mock data.
   Validation and edge cases: Disable the primary action until the required input is present. Prevent duplicate submissions. Preserve in-progress work while navigating. Avoid medical, legal, financial, or guaranteed-result claims unless the workbook explicitly supports them.
   Rork build guidance: Build the visible UI, local state, sample data, navigation links, and result/history integration for this feature now. Do not leave it as copy-only description or a nonfunctional button.

3. Brachycephalic-specific Health Tracker (Breathing, Snoring, Sleep)
   Why this matters: This is part of the core promise of Frenchie Buddy. It should directly help French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories move from the validated pain toward the app's promised outcome. Anchor the copy and interaction details in this product position: Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.
   Entry points and screens: Make this feature reachable from Health & Breathing Log. If the feature is important enough for repeat use, also surface its latest state or shortcut from Home.
   Exact UX behavior:
      - Give the feature a clear entry point, focused interaction surface, completion state, and saved output.
      - Use realistic mock data and make the primary action obvious above the fold.
      - Provide edit, save, undo/cancel, and retry paths where applicable.
      - Make the feature feel complete even if external integrations are represented by local mock adapters.
   Inputs and controls:
      - Primary user intent or selection
      - Optional notes/details
      - Relevant preference or filter controls
   Expected output: A saved record or completed action that is visible elsewhere in the app and gives the user a useful next step.
   Data to model: Create a typed BrachycephalicSpecificHealth record with id, userId, title/name, status, sourceInputJson, resultJson, tags, createdAt, updatedAt, and any feature-specific metrics needed for charts or history.
   State requirements:
      - Loading: show branded progress copy and keep the user oriented.
      - Empty state: include realistic sample/demo content plus a CTA that starts this exact feature.
      - Error state: explain what failed in plain language and offer retry, edit input, or use sample/offline result.
      - Success state: confirm the saved/completed outcome and show the next best action.
      - Offline/mock mode: if real APIs or device integrations are unavailable, simulate the behavior with local adapters and clearly named mock data.
   Validation and edge cases: Disable the primary action until the required input is present. Prevent duplicate submissions. Preserve in-progress work while navigating. Avoid medical, legal, financial, or guaranteed-result claims unless the workbook explicitly supports them.
   Rork build guidance: Build the visible UI, local state, sample data, navigation links, and result/history integration for this feature now. Do not leave it as copy-only description or a nonfunctional button.

4. Daily Frenchie Horoscope & Breed Tips
   Why this matters: This is part of the core promise of Frenchie Buddy. It should directly help French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories move from the validated pain toward the app's promised outcome. Anchor the copy and interaction details in this product position: Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.
   Entry points and screens: Make this feature reachable from Daily Pulse, Health & Breathing Log. If the feature is important enough for repeat use, also surface its latest state or shortcut from Home.
   Exact UX behavior:
      - Give the feature a clear entry point, focused interaction surface, completion state, and saved output.
      - Use realistic mock data and make the primary action obvious above the fold.
      - Provide edit, save, undo/cancel, and retry paths where applicable.
      - Make the feature feel complete even if external integrations are represented by local mock adapters.
   Inputs and controls:
      - Primary user intent or selection
      - Optional notes/details
      - Relevant preference or filter controls
   Expected output: A saved record or completed action that is visible elsewhere in the app and gives the user a useful next step.
   Data to model: Create a typed DailyFrenchieHoroscope record with id, userId, title/name, status, sourceInputJson, resultJson, tags, createdAt, updatedAt, and any feature-specific metrics needed for charts or history.
   State requirements:
      - Loading: show branded progress copy and keep the user oriented.
      - Empty state: include realistic sample/demo content plus a CTA that starts this exact feature.
      - Error state: explain what failed in plain language and offer retry, edit input, or use sample/offline result.
      - Success state: confirm the saved/completed outcome and show the next best action.
      - Offline/mock mode: if real APIs or device integrations are unavailable, simulate the behavior with local adapters and clearly named mock data.
   Validation and edge cases: Disable the primary action until the required input is present. Prevent duplicate submissions. Preserve in-progress work while navigating. Avoid medical, legal, financial, or guaranteed-result claims unless the workbook explicitly supports them.
   Rork build guidance: Build the visible UI, local state, sample data, navigation links, and result/history integration for this feature now. Do not leave it as copy-only description or a nonfunctional button.

5. Digital Memory Journal for photo storage and milestones
   Why this matters: This is part of the core promise of Frenchie Buddy. It should directly help French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories move from the validated pain toward the app's promised outcome. Anchor the copy and interaction details in this product position: Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.
   Entry points and screens: Make this feature reachable from Memory Journal. If the feature is important enough for repeat use, also surface its latest state or shortcut from Home.
   Exact UX behavior:
      - Capture a before-and-after measurement when the feature is used, then store it in history.
      - Render a scannable trend view with realistic sample records on first launch.
      - Let users filter or inspect individual records through a detail sheet.
      - Make the progress copy encouraging but factual, with no unsupported guaranteed outcomes.
   Inputs and controls:
      - Before value
      - After value
      - Date/time
      - Tags/category
      - Optional note or reflection
   Expected output: A saved measurement or journal record that updates charts, streaks, history lists, and the user's latest status.
   Data to model: Create a typed DigitalMemoryJournal record with id, userId, title/name, status, sourceInputJson, resultJson, tags, createdAt, updatedAt, and any feature-specific metrics needed for charts or history.
   State requirements:
      - Loading: show branded progress copy and keep the user oriented.
      - Empty state: include realistic sample/demo content plus a CTA that starts this exact feature.
      - Error state: explain what failed in plain language and offer retry, edit input, or use sample/offline result.
      - Success state: confirm the saved/completed outcome and show the next best action.
      - Offline/mock mode: if real APIs or device integrations are unavailable, simulate the behavior with local adapters and clearly named mock data.
   Validation and edge cases: Disable the primary action until the required input is present. Prevent duplicate submissions. Preserve in-progress work while navigating. Avoid medical, legal, financial, or guaranteed-result claims unless the workbook explicitly supports them.
   Rork build guidance: Build the visible UI, local state, sample data, navigation links, and result/history integration for this feature now. Do not leave it as copy-only description or a nonfunctional button.

================================================================================
8. USER FLOWS
================================================================================
Flow A - Onboarding and activation: Launch Frenchie Buddy, show a concise value hook, collect only essential preferences, explain any requested permissions before the native prompt, then take the user to Safety Dashboard.
Flow B - Core engagement: From Safety Dashboard, the user starts Real-time Heat Safety Meter (Temperature + Humidity sensing), completes the guided steps on Daily Pulse, sees progress and validation inline, then lands on Health & Breathing Log with a clear saved outcome and next action.
Flow C - Repeat use: Returning users see recent activity, saved work, and the most likely next action without repeating onboarding.
Flow D - Settings and trust: Users can edit preferences, manage notifications, access support, review privacy/terms links, restore purchases, and delete or export relevant account data.
Flow E - Failure recovery: For network, AI, validation, or permission failures, show calm inline errors with retry, edit, and contact-support options. Never leave the user on a blank screen.

================================================================================
9. MONETIZATION
================================================================================
Monetization model:
Freemium model with a 7-day free trial. Premium subscription is $4.99/mo or $29.99/yr, unlocking advanced health analytics, unlimited photo storage in the Memory Journal, and the AI Mood Tracker.

If subscriptions or premium access are part of the concept:
- Implement a polished paywall screen with clear benefits, price-card placeholders, purchase CTA, restore purchases, terms, and privacy links.
- Use a single named entitlement such as "pro" or "premium" and keep feature gates easy to understand.
- Do not attempt real charges unless store products and RevenueCat configuration are present.
- Keep free vs paid boundaries visible and fair. Never trick users into subscribing.

If monetization is not part of v1:
- State "No paywall in v1" inside the app configuration and keep purchase UI out of the primary flow.

================================================================================
10. DATA MODEL AND STATE
================================================================================
Technical approach:
Build with React Native/Expo for Rork. Treat these concept integrations as local/mock adapters unless credentials are explicitly configured: React Native with Expo, Node.js backend, OpenWeatherMap API for heat modeling, and TensorFlow Lite for on-device photo mood analysis.

Use a clean, typed, component-based architecture. Separate UI components from business logic and state. Include realistic local mock data so every list, chart, card, profile, and detail screen looks populated on first launch. Structure the app so these local models can later be replaced by Supabase, Firebase, or another backend.

Suggested data objects:
- UserProfile: id, displayName, email, avatarUrl, subscriptionStatus, onboardingCompleted, createdAt, updatedAt
- FrenchieBuddyItem: id, userId, title, description, status, tags, metadataJson, createdAt, updatedAt
- Session: id, userId, startedAt, completedAt, durationSeconds, outcomeSummary, notes
- SavedResult: id, userId, sourceItemId, resultType, contentJson, favorite, createdAt
- UserPreference: id, userId, visualMode, notificationEnabled, defaultSettingsJson, privacyChoicesJson
- PurchaseState: id, userId, entitlement, productId, expiresAt, lastCheckedAt
- RealTimeHeatState: id, userId, relatedItemId, stateJson, lastUpdatedAt
- AiMoodTrackerState: id, userId, relatedItemId, stateJson, lastUpdatedAt

State requirements:
- Persist user preferences locally.
- Keep generated or user-created records available across navigation.
- Use optimistic UI only where it is safe.
- Handle loading, empty, error, success, and offline-ish states gracefully.

================================================================================
11. PRIVACY, PERMISSIONS, AND STORE SAFETY
================================================================================
Permissions: Request only permissions the app truly needs. Explain why each permission is needed before triggering the native prompt.

Privacy and trust:
- Include settings links for Privacy Policy, Terms of Service, Support, Restore Purchases, and Delete Account.
- Do not include unsupported medical, financial, legal, or guaranteed-outcome claims.
- If the app touches health, finance, legal, children, location, contacts, camera, microphone, or sensitive personal data, use careful disclaimers and minimal data collection.
- Keep API keys and sensitive credentials server-side or in secure configuration. Never expose secrets in client code.
- Use realistic demo/sample data and avoid scraped or copyrighted content.

App review readiness:
- No placeholder copy, lorem ipsum, broken buttons, or empty websites.
- If login is required, include a demo mode or clear demo-account path for review.
- Make subscription benefits clear before purchase and include restore purchases.
- Do not ask Rork to publish the app, create Apple accounts, process live payments, send real emails/SMS, or make external mutations in this v1 build unless explicitly configured.

================================================================================
12. QUALITY BAR
================================================================================
Acceptance criteria:
1. The generated app is a complete mobile application for Frenchie Buddy, not a landing page or static mockup.
2. Every listed screen is reachable through the stated navigation structure and has useful realistic sample content.
3. The first-session user can understand the value proposition and reach the primary action in under 60 seconds.
4. All buttons, form controls, tabs, cards, and list items have visible pressed, loading, disabled, success, and error behavior where applicable.
5. The UI has no overlapping text, clipped labels, broken scrolling, or unreadable contrast on common iPhone and Android viewport sizes.
6. At least 5 screens are implemented with native-feeling layout, spacing, and mobile touch targets.
7. Empty states, loading states, and error states are designed with helpful copy and recovery actions.
8. All sample data is realistic for the target user and can be replaced later by a real backend without rewriting the UI.
9. The monetization and restore-purchases surfaces are present when subscriptions are specified, but no real charges are attempted without configured store products.
10. Privacy, permissions, terms, support, and account-deletion entry points are easy to find in settings.
11. The code is organized into reusable components, typed data models, and centralized configuration for future iterations.
12. The app feels polished: smooth transitions, responsive tap feedback, consistent spacing, and a cohesive visual system.

================================================================================
WORKBOOK SOURCE MATERIAL
================================================================================
Use the following workbook facts as source material. Preserve the selected idea, target user, problem validation, competitor gaps, feature priorities, monetization notes, and visual preferences. Do not invent sensitive legal, health, financial, or business claims beyond what is supported here.

All candidate ideas:
App Idea 1: frenchie app that helps owners with their specific frenchie breed
App Idea 2: fangirl sports a all womens sporting app
App Idea 3: not applicable / banana

Selected first build: App Idea 1

Selection reason: because I have a frenchie and id like to see when its safe to take my dog for walks with his breathing problems

Selected app idea: frenchie app that helps owners with their specific frenchie breed

Audience and usage context:
Age: for French bull dog owners
Work: all professions
Day in life: their day can be a mix of things
Gender: All genders
Location: can live anywhere
Children: Not relevant
Pets: Yes
Why they have this problem: the app will give a heat meter to let the user know if its safe to walk their frenchie who has breathing issues
Where they use the app: they can be anywhere
What just happened before opening: checking to see if the weather is good to walk their frenchie
How they feel: inquisitive
Goal in next 5 minutes: check to see if the weather is good to walk their frenchie and do a ck in of their dogs health
Currently using another app: the French bulldogs app
pet desk app
pet care AI app
Currently using notebook and pen: have to guess if its ok to walk their dog based on the news weather
Currently Googling: yes googling or other apps
Currently doing nothing: they take a chance and walk their dog for too long and the dog gets overheated
Other current solution: their guessing wether it is safe to take their dog out for a long walk
User quote 1: frenchie owners
User quote 2: frenchie owners
User quote 3: frenchie owners 
or someone thinking about getting a frenchie to learn more about the breed

Problem validation:
Problem sentence: they need to know if its safe to walk their dog in 75 degree weather with humidity
Problem frequency: Every day
Pain level: 3
Evidence from conversations: frenchies struggle to breath and when the weather conditions are not great it makes walking harder for the breed

Competitor research:
Competitor 1
Downloaded: No
App name: the French bulldog
Monthly downloads: over 500k
Monthly revenue: 500k
Star rating: 4.0
Number of reviews: over 1000
First action: sign up and list email
Clever moment: it does not list dog by breed
Annoying, confusing, or broken: app didn't fully describe what it offered
Wish it did: I wish it have more information on French bull dog breed
Would pay: no because it is not what im looking for in an app
3 common complaints: not many complaints but what the user did like was being able to post pics of their dogs
What our app will do differently: I want my app to be specific to the breed.

Competitor 2
Downloaded: Yes
App name: Pet desk
Monthly downloads: over 1000k
Monthly revenue: 500k
Star rating: 4.9
Number of reviews: 481k
First action: sign in and give information on dog
Clever moment: no it is not specific to the breed
Annoying, confusing, or broken: no but it is just a generic pet info app
Wish it did: more information about the frenchie breed
Would pay: no because I want it to be more frenchie specific
3 common complaints: ads 
can't delete old messages
What our app will do differently: I want my app to be geared towards the frenchie breed

Competitor 3
Downloaded: Yes
App name: PETcare AI
Monthly downloads: 50
Monthly revenue: not sure
Star rating: 5.0
Number of reviews: 50
First action: give pet information
Clever moment: it has a injury pet scan
Annoying, confusing, or broken: it is more for all general pet types
Wish it did: had more information on French bulldogs
Would pay: yes because I liked the injury scan feature.  nothing else seems appealing
3 common complaints: not many complaints on this app in reviews because its a newer app
What our app will do differently: I want my app to be geared more towards French bull dogs

Competitor 4
Downloaded: No
App name: not applicable
Monthly downloads: not applicable
Monthly revenue: not applicalble
Star rating: not applicable
Number of reviews: not applicable
First action: not applicable s
Clever moment: not applicable s
Annoying, confusing, or broken: not applicable s
Wish it did: not applicable s
Would pay: not applicable s
3 common complaints: not applicable snot applicable not applicable
What our app will do differently: not applicable not applicable

Competitor 5
Downloaded: No
App name: not applicable
Monthly downloads: not applicable
Monthly revenue: not applicable
Star rating: not applicable
Number of reviews: not applicable
First action: not applicable s
Clever moment: not applicable s
Annoying, confusing, or broken: not applicable s
Wish it did: not applicable s
Would pay: not applicable s
3 common complaints: not applicable s not applicable not applicable s not applicable
What our app will do differently: not applicable not applicable

Feature list:
Feature 1: pup profile
Feature 2: heat safety meter
Feature 3: daily ck in
Feature 4: memory journal
Feature 5: tip of the day
Feature 6: daily horoscope
Feature 7: health tracker
Feature 8: brachycephalic dog care (advanced owners)
Feature 9: medication reminder
Feature 10: mood tracker based on a photo

Must-have features:
Must-have 1: heat meter
Because: to know if its safe to walk your frenchie

Must-have 2: daily horoscope
Because: a good viral hook to the app

Must-have 3: mood tracker
Because: also a good viral hook for the app

Must-have 4: health tracker
Because: to keep track of sleep, breathing, and mood

Must-have 5: memory journal
Because: to keep memories and pics of pup as its aging

Single most important feature: heat meter

Single most important feature because: to know when its safe to walk your frenchie who may have breathing problems

Monetization:
Money model: Freemium
Because: because I was told its a good pricing model
I will charge: 4.99 monthly 
29.99 per year
Pricing vs competition: Similar
Pricing because: to keep it competitive and gain traction
User pays when: After free trial
More info on when they pay: after free trial then subscription will be offered

Visual direction:
Main color: bone
Accent color: seafoam green
Brand I like #1: warm, playful  , elevated .  like the pet desk app
What I like about brand #1: I want the app to look elegant
Brand I like #2: warm , playful , elevated like the rover dog sitter app
What I like about brand #2: I want the app to look elevated
Look and feel words: warm, elegant, playful
Extra look and feel notes: warm.        Warm cream / oat background
Espresso brown text
Dusty terracotta accents
Muted sage or olive for wellness/safe states
Soft blush for warmth
Burnt coral for warnings (heat)
Example palette:
Bone: #F7F1E8
Espresso: #3A2D26
Clay: #C7745A
Dusty Rose: #D8B0A6
Olive: #74846A
Warm Gold accent: #C9A56A
elevated
playful
cozy
premium
affectionate
lightly humorous
editorial but approachable

================================================================================
EXECUTION INSTRUCTION
================================================================================
Begin building now. Create the complete mobile app screen-by-screen and flow-by-flow. Keep scope controlled, make every listed screen navigable, use polished native mobile patterns, and prioritize the best possible user experience over adding extra features.
================================================================================

**colorScheme:**
```json
{
  "accent": "#98FB98",
  "primary": "#F7F1E8",
  "secondary": "#3A2D26",
  "background": "#F5F5DC",
  "description": "An elevated, warm palette using Bone (#F7F1E8) for surfaces, Espresso (#3A2D26) for readability, and Seafoam/Sage (#98FB98) for safe states, with Burnt Coral accents for heat warnings."
}
```

**competitors:**
- The French Bulldog App
- PetDesk
- PETcare AI
- Rover

**description:** Frenchie Buddy is the first breed-specific wellness companion designed exclusively for French Bulldog owners. Focused on the unique physiological needs of brachycephalic dogs, the app solves the 'guessing game' of outdoor safety with a real-time Heat Safety Meter that accounts for temperature and humidity. Beyond safety, it offers a warm, playful space for owners to track health trends, capture memories, and connect with their dog's personality through AI-driven mood tracking and breed-specific daily horoscopes.

**uniqueValue:** Unlike generic pet apps, Frenchie Buddy focuses exclusively on the respiratory risks and thermal sensitivity of the French Bulldog breed, combining life-saving safety tools with high-engagement viral features like dog horoscopes.

**coreFeatures:**
- Real-time Heat Safety Meter (Temperature + Humidity sensing)
- AI Mood Tracker via Photo Recognition
- Brachycephalic-specific Health Tracker (Breathing, Snoring, Sleep)
- Daily Frenchie Horoscope & Breed Tips
- Digital Memory Journal for photo storage and milestones

**monetization:** Freemium model with a 7-day free trial. Premium subscription is $4.99/mo or $29.99/yr, unlocking advanced health analytics, unlimited photo storage in the Memory Journal, and the AI Mood Tracker.

**searchKeywords:**
- dog safety heat monitor
- pet health tracker
- french bulldog care
- brachycephalic dog safety
- dog wellness and diary

**targetAudience:** French Bulldog owners who are concerned about their pet's respiratory health and want an elevated, breed-specific tool for tracking health and memories.

**appStoreResults:**
  - **price:** 0
  - **trackId:** 341232718
  - **estimates:** [object Object]
  - **trackName:** MyFitnessPal: Calorie Counter
  - **sellerName:** MyFitnessPal, Inc.
  - **artworkUrl100:** https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d7/75/a1/d775a19c-aa20-c375-549d-b03aaf413044/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.jpg
  - **formattedPrice:** Free
  - **userRatingCount:** 2334679
  - **primaryGenreName:** Health & Fitness
  - **averageUserRating:** 4.71286
  - **price:** 0
  - **trackId:** 1208224953
  - **estimates:** [object Object]
  - **trackName:** Apple Fitness
  - **sellerName:** Apple Inc.
  - **artworkUrl100:** https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/93/61/a0/9361a04d-3951-ec4b-4566-65ba69afc4fc/fitness-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/100x100bb.jpg
  - **formattedPrice:** Free
  - **userRatingCount:** 11016
  - **primaryGenreName:** Health & Fitness
  - **averageUserRating:** 2.85966
  - **price:** 0
  - **trackId:** 1041517543
  - **estimates:** [object Object]
  - **trackName:** Fitbod: Gym & Fitness Planner
  - **sellerName:** Fitbod Inc.
  - **artworkUrl100:** https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/cc/47/14/cc47141a-e866-e7b3-eb8a-6523a3baba70/AppIcon-0-0-1x_U007ephone-0-1-0-85-220-0.png/100x100bb.jpg
  - **formattedPrice:** Free
  - **userRatingCount:** 272736
  - **primaryGenreName:** Health & Fitness
  - **averageUserRating:** 4.81215
  - **price:** 0.99
  - **trackId:** 939216567
  - **estimates:** [object Object]
  - **trackName:** Six Petals
  - **sellerName:** Denis Prokopchuk
  - **artworkUrl100:** https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/3d/4e/12/3d4e1236-e34a-f830-8fb4-c6e750c9adaa/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/100x100bb.jpg
  - **formattedPrice:** $0.99
  - **userRatingCount:** 3
  - **primaryGenreName:** Health & Fitness
  - **averageUserRating:** 4.33333
  - **price:** 0
  - **trackId:** 1502936453
  - **estimates:** [object Object]
  - **trackName:** LADDER Strength Training Plans
  - **sellerName:** Ladder Technologies, Inc.
  - **artworkUrl100:** https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5c/67/fe/5c67fe54-a1fc-7f35-952f-99159040ae1d/AppIcon-0-1x_U007ephone-0-0-0-1-0-0-85-220-0.png/100x100bb.jpg
  - **formattedPrice:** Free
  - **userRatingCount:** 146243
  - **primaryGenreName:** Health & Fitness
  - **averageUserRating:** 4.94824
  - **price:** 0
  - **trackId:** 6479513000
  - **estimates:** [object Object]
  - **trackName:** BodyWave: Health Tracker
  - **sellerName:** AXIVORA INTELLIGENT TECH PTE. LTD.
  - **artworkUrl100:** https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/82/51/c8/8251c8a0-fd62-f0dc-bcd3-760d795fc185/AppIcon-0-0-1x_U007ephone-0-11-0-85-220.png/100x100bb.jpg
  - **formattedPrice:** Free
  - **userRatingCount:** 20050
  - **primaryGenreName:** Health & Fitness
  - **averageUserRating:** 4.59302
  - **price:** 0
  - **trackId:** 1074367771
  - **estimates:** [object Object]
  - **trackName:** Welltory: Health, Heart Rate
  - **sellerName:** Welltory inc
  - **artworkUrl100:** https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/30/dc/8b/30dc8b3a-1d7b-541e-e885-d17fc2b64ff5/AppIcon_free-0-0-1x_U007ephone-0-1-0-85-220.png/100x100bb.jpg
  - **formattedPrice:** Free
  - **userRatingCount:** 129167
  - **primaryGenreName:** Health & Fitness
  - **averageUserRating:** 4.74202
  - **price:** 0
  - **trackId:** 399857015
  - **estimates:** [object Object]
  - **trackName:** Planet Fitness
  - **sellerName:** Planet Fitness Holdings, LLC
  - **artworkUrl100:** https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c3/91/5f/c3915f48-0be3-05ad-7beb-943851b5b007/appicon-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.jpg
  - **formattedPrice:** Free
  - **userRatingCount:** 716024
  - **primaryGenreName:** Health & Fitness
  - **averageUserRating:** 4.87355
  - **price:** 0
  - **trackId:** 462638897
  - **estimates:** [object Object]
  - **trackName:** Google Health (Fitbit)
  - **sellerName:** Google LLC
  - **artworkUrl100:** https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4c/0d/29/4c0d29f1-755c-2c94-fa03-cc32146c53a2/google_health_ios-0-0-1x_U007ephone-0-0-0-1-0-0-sRGB-0-85-220.png/100x100bb.jpg
  - **formattedPrice:** Free
  - **userRatingCount:** 668596
  - **primaryGenreName:** Health & Fitness
  - **averageUserRating:** 4.50547
  - **price:** 5.99
  - **trackId:** 1035127285
  - **estimates:** [object Object]
  - **trackName:** Pet Monitor VIGI
  - **sellerName:** VIGI Limited
  - **artworkUrl100:** https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/76/a2/5b/76a25bba-5ef7-6099-c461-2a7f3ec46fa3/AppIcon-0-1x_U007epad-0-1-0-0-85-220-0.png/100x100bb.jpg
  - **formattedPrice:** $5.99
  - **userRatingCount:** 2236
  - **primaryGenreName:** Lifestyle
  - **averageUserRating:** 4.77862

**primaryCategory:** Health & Fitness

**revisionSummary:**
```json
{
  "changeSnapshot": [
    "Prioritized the Heat Safety Meter as the primary UI element on the home screen.",
    "Integrated breed-specific health tracking specifically for brachycephalic respiratory issues.",
    "Established a premium, editorial visual style using the requested Bone and Seafoam palette."
  ],
  "appliedFeedback": [
    "Frenchie-specific focus over generic pet templates",
    "Inclusion of viral hooks like horoscopes and mood tracking",
    "Safety focus on 75-degree/humidity breathing risks"
  ],
  "skippedFeedback": [],
  "materialChangesBySection": [
    {
      "changes": [
        "Combined breed-specific information into a daily 'Tip of the Day' and 'Horoscope' model."
      ],
      "section": "Core Features"
    }
  ],
  "changedFromPreviousVersion": "Initial version based on original product workbook."
}
```

### Workbook Snapshot

**ideas:**
```json
{
  "idea1": {
    "age": "for French bull dog owners",
    "pets": "Yes",
    "work": "all professions",
    "price": "4.99 monthly \n29.99 per year",
    "gender": "All genders",
    "feeling": "inquisitive",
    "children": "Not relevant",
    "features": [
      "pup profile",
      "heat safety meter",
      "daily ck in",
      "memory journal",
      "tip of the day",
      "daily horoscope",
      "health tracker",
      "brachycephalic dog care (advanced owners)",
      "medication reminder",
      "mood tracker based on a photo"
    ],
    "location": "can live anywhere",
    "yourIdea": "frenchie app that helps owners with their specific frenchie breed",
    "dayInLife": "their day can be a mix of things",
    "painLevel": "3",
    "moneyModel": "Freemium",
    "userQuote1": "frenchie owners",
    "userQuote2": "frenchie owners",
    "userQuote3": "frenchie owners \nor someone thinking about getting a frenchie to learn more about the breed",
    "usesGoogle": "yes googling or other apps",
    "competitors": [
      {
        "appName": "the French bulldog",
        "wouldPay": "no because it is not what im looking for in an app",
        "downloaded": "No",
        "starRating": "4.0",
        "firstAction": "sign up and list email",
        "reviewCount": "over 1000",
        "wishedItDid": "I wish it have more information on French bull dog breed",
        "cleverMoment": "it does not list dog by breed",
        "monthlyRevenue": "500k",
        "differentiation": "I want my app to be specific to the breed.",
        "annoyingOrBroken": "app didn't fully describe what it offered",
        "commonComplaints": "not many complaints but what the user did like was being able to post pics of their dogs",
        "monthlyDownloads": "over 500k"
      },
      {
        "appName": "Pet desk",
        "wouldPay": "no because I want it to be more frenchie specific",
        "downloaded": "Yes",
        "starRating": "4.9",
        "firstAction": "sign in and give information on dog",
        "reviewCount": "481k",
        "wishedItDid": "more information about the frenchie breed",
        "cleverMoment": "no it is not specific to the breed",
        "monthlyRevenue": "500k",
        "differentiation": "I want my app to be geared towards the frenchie breed",
        "annoyingOrBroken": "no but it is just a generic pet info app",
        "commonComplaints": "ads \ncan't delete old messages",
        "monthlyDownloads": "over 1000k"
      },
      {
        "appName": "PETcare AI",
        "wouldPay": "yes because I liked the injury scan feature.  nothing else seems appealing",
        "downloaded": "Yes",
        "starRating": "5.0",
        "firstAction": "give pet information",
        "reviewCount": "50",
        "wishedItDid": "had more information on French bulldogs",
        "cleverMoment": "it has a injury pet scan",
        "monthlyRevenue": "not sure",
        "differentiation": "I want my app to be geared more towards French bull dogs",
        "annoyingOrBroken": "it is more for all general pet types",
        "commonComplaints": "not many complaints on this app in reviews because its a newer app",
        "monthlyDownloads": "50"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable s",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable s",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable s",
        "cleverMoment": "not applicable s",
        "monthlyRevenue": "not applicalble",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable s",
        "commonComplaints": "not applicable snot applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable s",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable s",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable s",
        "cleverMoment": "not applicable s",
        "monthlyRevenue": "not applicable",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable s",
        "commonComplaints": "not applicable s not applicable not applicable s not applicable",
        "monthlyDownloads": "not applicable"
      }
    ],
    "useLocation": "they can be anywhere",
    "doingNothing": "they take a chance and walk their dog for too long and the dog gets overheated",
    "problemCause": "the app will give a heat meter to let the user know if its safe to walk their frenchie who has breathing issues",
    "userPaysWhen": "After free trial",
    "usesNotebook": "have to guess if its ok to walk their dog based on the news weather",
    "otherSolution": "their guessing wether it is safe to take their dog out for a long walk",
    "triggerMoment": "checking to see if the weather is good to walk their frenchie",
    "fiveMinuteGoal": "check to see if the weather is good to walk their frenchie and do a ck in of their dogs health",
    "pricingBecause": "to keep it competitive and gain traction",
    "usesAnotherApp": "the French bulldogs app\npet desk app\npet care AI app",
    "problemSentence": "they need to know if its safe to walk their dog in 75 degree weather with humidity",
    "mustHaveFeatures": [
      {
        "because": "to know if its safe to walk your frenchie",
        "feature": "heat meter"
      },
      {
        "because": "a good viral hook to the app",
        "feature": "daily horoscope"
      },
      {
        "because": "also a good viral hook for the app",
        "feature": "mood tracker"
      },
      {
        "because": "to keep track of sleep, breathing, and mood",
        "feature": "health tracker"
      },
      {
        "because": "to keep memories and pics of pup as its aging",
        "feature": "memory journal"
      }
    ],
    "problemFrequency": "Every day",
    "moneyModelBecause": "because I was told its a good pricing model",
    "pricingVsCompetition": "Similar",
    "userPaysWhenMoreInfo": "after free trial then subscription will be offered",
    "evidenceFromConversations": "frenchies struggle to breath and when the weather conditions are not great it makes walking harder for the breed",
    "singleMostImportantFeature": "heat meter",
    "singleMostImportantFeatureBecause": "to know when its safe to walk your frenchie who may have breathing problems"
  },
  "idea2": {
    "age": "fangirl sports for women who want a sporting app that only shows womens sports",
    "pets": "Not relevant",
    "work": "all professions",
    "price": "4.99 monthly \n29.99 year",
    "gender": "All genders",
    "feeling": "excited, motivated",
    "children": "Not relevant",
    "features": [
      "explain the game while watching",
      "basic 101 sports knowledge",
      "community page",
      "listing of all women's sports",
      "favorite team section",
      "favorite player section",
      "channel listings of the sports broadcasts",
      "personality driven team matching",
      "player fun facts",
      "chat room on community page"
    ],
    "location": "can live anywhere",
    "yourIdea": "fangirl sports a all womens sporting app",
    "dayInLife": "their day can be a mix of things",
    "painLevel": "3",
    "moneyModel": "Freemium",
    "userQuote1": "female sports enthusiast",
    "userQuote2": "female wanting to learn more about sports",
    "userQuote3": "female wanting to be part of the womens sports community",
    "usesGoogle": "googling or other apps",
    "competitors": [
      {
        "appName": "just womens sports",
        "wouldPay": "no because it is not what im looking for",
        "downloaded": "Yes",
        "starRating": "over 4.0",
        "firstAction": "sign up and list personal information",
        "reviewCount": "over 1000k",
        "wishedItDid": "was better organized with womens sports",
        "cleverMoment": "no its a generic sporting app",
        "monthlyRevenue": "over 500k",
        "differentiation": "I want my app to be specific to womens sports",
        "annoyingOrBroken": "doesn't explain if womens sports are listed in a channel line up",
        "commonComplaints": "not organized \nnot geared towards womens sports",
        "monthlyDownloads": "over 1000k"
      },
      {
        "appName": "sheis sports network app",
        "wouldPay": "no because it is not what im looking for",
        "downloaded": "Yes",
        "starRating": "over 4.0",
        "firstAction": "sign in with personal information",
        "reviewCount": "over 1000",
        "wishedItDid": "more features to use",
        "cleverMoment": "I liked the graphics and style",
        "monthlyRevenue": "500k",
        "differentiation": "need to be geared more towards females but have a girlie vibe",
        "annoyingOrBroken": "not enough information for what my needs are I want the app to feel more fun and playful",
        "commonComplaints": "the womens sporting apps that are avail are very low on the search engine in App Store",
        "monthlyDownloads": "over 1000k"
      },
      {
        "appName": "she sports app",
        "wouldPay": "no because it is not what im looking for",
        "downloaded": "Yes",
        "starRating": "4.8",
        "firstAction": "sign up and give personal information",
        "reviewCount": "13",
        "wishedItDid": "listed women sports",
        "cleverMoment": "the app is geared more towards connecting althetes with colleges not  what im looking for but I like the way the app looks",
        "monthlyRevenue": "500k",
        "differentiation": "the app is good for what it is to connect female athletes with colleges",
        "annoyingOrBroken": "made me think it was a sporting app but its not",
        "commonComplaints": "doesn't let you sign up with international phone numbers",
        "monthlyDownloads": "over 1000k"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable s",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable s",
        "cleverMoment": "not applicable s",
        "monthlyRevenue": "not applicable",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable s",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable",
        "differentiation": "not applicable not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      }
    ],
    "useLocation": "they can be anywhere",
    "doingNothing": "they keep searching to find what their looking for and can't . also not all tv broadcasts womens sports as much as mens sports so its hard to find",
    "problemCause": "a place where they can find only women sports and track their favorite players and teams",
    "userPaysWhen": "After free trial",
    "usesNotebook": "try and look up the sports on google or TV",
    "otherSolution": "their watching it on google",
    "triggerMoment": "they want to see when a particular sport is playing",
    "fiveMinuteGoal": "find out when their favorite womens team is playing",
    "pricingBecause": "to keep it competitive and gain traction",
    "usesAnotherApp": "just womens sports \nsheis sports network app\nshe sports app",
    "problemSentence": "they can't find the sports teams all in one place",
    "mustHaveFeatures": [
      {
        "because": "need of listing of all games in one place",
        "feature": "listing of games"
      },
      {
        "because": "learning page for new viewers",
        "feature": "basic sports 101"
      },
      {
        "because": "to list womens sporting events in area",
        "feature": "community page"
      },
      {
        "because": "to keep favorite players and team in one place",
        "feature": "favorites tab"
      },
      {
        "because": "to learn something new about a player",
        "feature": "player fun fact"
      }
    ],
    "problemFrequency": "Every day",
    "moneyModelBecause": "subscription offer free listing but to get access to premium features like community page",
    "pricingVsCompetition": "Similar",
    "userPaysWhenMoreInfo": "offer free features then charge for premium features",
    "evidenceFromConversations": "it is hard to find womens sports listing in one place",
    "singleMostImportantFeature": "leaderboards",
    "singleMostImportantFeatureBecause": "to keep track of standings"
  },
  "idea3": {
    "age": "not applicable",
    "pets": "Not relevant",
    "work": "not applicable",
    "price": "not applicable s",
    "gender": "Prefer not to specify",
    "feeling": "not applicable s",
    "children": "Not relevant",
    "features": [
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable",
      "not applicable"
    ],
    "location": "not applicable",
    "yourIdea": "not applicable / banana",
    "dayInLife": "not applicable not applicable",
    "painLevel": "1",
    "moneyModel": "Not sure yet",
    "userQuote1": "not applicables",
    "userQuote2": "snot applicable",
    "userQuote3": "not applicalble",
    "usesGoogle": "not applicable s",
    "competitors": [
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable not applicable",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable not applicable",
        "differentiation": "not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable not applicable",
        "differentiation": "not applicable not applicable not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      },
      {
        "appName": "not applicable",
        "wouldPay": "not applicable not applicable",
        "downloaded": "No",
        "starRating": "not applicable",
        "firstAction": "not applicable not applicable",
        "reviewCount": "not applicable",
        "wishedItDid": "not applicable not applicable",
        "cleverMoment": "not applicable not applicable",
        "monthlyRevenue": "not applicable not applicable",
        "differentiation": "not applicable not applicable not applicable not applicable not applicable not applicable",
        "annoyingOrBroken": "not applicable not applicable",
        "commonComplaints": "not applicable not applicable",
        "monthlyDownloads": "not applicable"
      }
    ],
    "useLocation": "not applicable s",
    "doingNothing": "not applicable s",
    "problemCause": "not applicable /nananan",
    "userPaysWhen": "On download",
    "usesNotebook": "not applicable s",
    "otherSolution": "not applicable",
    "triggerMoment": "not applicable s",
    "fiveMinuteGoal": "not applicable s",
    "pricingBecause": "not applicable s",
    "usesAnotherApp": "not applicable s",
    "problemSentence": "not applicable s not applicable not applicable s not applicable not applicable s not applicable",
    "mustHaveFeatures": [
      {
        "because": "not applicable s",
        "feature": "not applicable"
      },
      {
        "because": "not applicable s",
        "feature": "not applicable"
      },
      {
        "because": "not applicable s",
        "feature": "not applicable"
      },
      {
        "because": "not applicable s",
        "feature": "not applicable"
      },
      {
        "because": "not applicable s",
        "feature": "not applicable"
      }
    ],
    "problemFrequency": "Rarely",
    "moneyModelBecause": "not applicable s",
    "pricingVsCompetition": "Similar",
    "userPaysWhenMoreInfo": "not applicable s",
    "evidenceFromConversations": "not applicable/ banana",
    "singleMostImportantFeature": "not applicable",
    "singleMostImportantFeatureBecause": "not applicable s"
  }
}
```

**version:** advanced_app_builder_v2

**lookAndFeel:**
```json
{
  "words": [
    "warm",
    "elegant",
    "playful"
  ],
  "mainColor": "bone",
  "brandLike1": "warm, playful  , elevated .  like the pet desk app",
  "brandLike2": "warm , playful , elevated like the rover dog sitter app",
  "extraNotes": "warm.        Warm cream / oat background\nEspresso brown text\nDusty terracotta accents\nMuted sage or olive for wellness/safe states\nSoft blush for warmth\nBurnt coral for warnings (heat)\nExample palette:\nBone: #F7F1E8\nEspresso: #3A2D26\nClay: #C7745A\nDusty Rose: #D8B0A6\nOlive: #74846A\nWarm Gold accent: #C9A56A\nelevated\nplayful\ncozy\npremium\naffectionate\nlightly humorous\neditorial but approachable",
  "accentColor": "seafoam green",
  "brandLike1Reason": "I want the app to look elegant",
  "brandLike2Reason": "I want the app to look elevated"
}
```

**selectedIdeaKey:** idea1

**selectedIdeaReason:** because I have a frenchie and id like to see when its safe to take my dog for walks with his breathing problems
