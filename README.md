# Infera AI — Premium Minimalist Member Workspace
## Reference-Based Three-Zone UI Design & React Frontend

A world-class, reference-accurate SaaS member workspace designed for **Infera AI**. Built with a strict **three-zone monochromatic layout** inspired directly by modern high-density research and productivity tools.

---

## ✦ Three-Zone Spatial Architecture

```
┌─────────────────┬──────────────────────────┬────────────────────────────────────────────────────────┐
│  ZONE 1:        │  ZONE 2:                 │  ZONE 3:                                               │
│  Dark Rail      │  Secondary Sidebar       │  Main Workspace                                        │
│  (#171717)      │  (#F0F1F2)               │  (#FFFFFF)                                             │
│  Width: ~92px   │  Width: ~280px           │  Remaining Fluid Width                                 │
│                 │                          │                                                        │
│  • White Logo   │  • Module Heading        │  • Contextual Top Bar (Search ⌘K, Status, Help)        │
│  • Home         │  • Dynamic Sub-groups    │  • Fluid Content Canvas                                │
│  • Explore      │  • Pill Selection        │  • Page Views:                                         │
│  • Assistant    │  • Item Counts           │    1. Member Home (AI Search + Suggested Queries)     │
│  • History      │  • "+ Add" Actions       │    2. Explore Documents (Filterable Library)           │
│  • Reader       │  • Thin #E8E8E8 Dividers │    3. AI Assistant (Multi-thread + Grounded Citations) │
│  • Settings     │                          │    4. My Conversations (Chronological Archives)        │
│  • User Avatar  │                          │    5. Document Reader (Paper Surface + Cited Clauses)  │
│                 │                          │    6. Settings (Personal, 2FA YubiKey, Workspace)      │
└─────────────────┴──────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## ✦ Reference Color Palette

| Token | Hex | Role |
|---|---|---|
| Primary Dark | `#171717` | Fixed vertical navigation rail (Zone 1) and dark primary actions |
| Sidebar Background | `#F0F1F2` | Contextual secondary sidebar (Zone 2) with subtle item counters |
| Selected Pill | `#E2E4E6` | Subtle neutral rounded rectangle for active sidebar items |
| Main Workspace | `#FFFFFF` | Pure white canvas with generous whitespace (Zone 3) |
| Secondary Surface | `#F7F7F7` | Neutral search bars, input trays, and subtle cards |
| Light Border | `#E8E8E8` | Architectural dividing lines and table separators |
| Primary Text | `#202124` | High-contrast interface text and headings |
| Secondary Text | `#85898D` | Subtitles, metadata labels, and sidebar section headers |
| Muted Text | `#A2A6AA` | Inactive icons, subtle hints, and breadcrumbs |
| Brand Accent | `#526D5C` | Muted forest green for Infera AI verification badges |
| Soft Accent | `#EAF0EB` | Verified grounding badge and highlighted citation backing |

---

## ✦ Key Pages & Experiences

### 1. Member Home (`HomePage.jsx`)
- Title: *"Welcome back, Rohit"*
- Subtitle: *"Your organisation's knowledge, all in one place."*
- Prominent **Infera AI Search** section (*"What would you like to know today?"*) with instant submit shortcut (`↵ Enter`) and curated prompt cards (*"What is our annual leave policy?"*, *"How do I request reimbursement?"*, etc.).
- **Recently Accessed Documents**: High-density document rows with file icon, format badge, size, relative timestamps, and instant open trigger.
- **Browse Knowledge**: 5 organizational folders with document counts.
- **Recent Conversations & Quick Access**: Continue last conversation or jump directly to cited document clauses.

### 2. Explore Documents (`ExplorePage.jsx`)
- Filterable document repository across 116 indexed corporate files.
- Secondary Sidebar integration with folder categories and file type filters (`PDF`, `DOCX`, `TXT`).
- Grid and List view toggle with clean table rows.
- Search with instant filtering across titles, excerpts, and departments.

### 3. AI Knowledge Assistant (`AssistantPage.jsx`)
- Signature research workspace with multi-thread navigation.
- Real-time **typing stream simulation** with smooth character pacing.
- **Source Citation Cards**: Grounded references detailing document filename, page number, section header, and relevance percentage.
- Interactive actions: Copy response, Thumbs up/down feedback, and **View Source** button.
- Toggleable simulation modes to test **Verified Answer**, **No Relevant Information State**, and **Network Error State**.

### 4. My Conversations (`ConversationsPage.jsx`)
- Chronologically grouped inquiry archive (*Today*, *Yesterday*, *Previous 7 Days*, *Older*).
- Searchable message history with resume and deletion capabilities.

### 5. Dedicated Document Reader (`ReaderPage.jsx`)
- Dedicated paper reading surface with elevation and crisp margins.
- Page navigation controls (`Page 12 of 14`, Prev/Next).
- Dynamic Zoom controls (`75%`, `100%`, `125%`, `150%`).
- In-document keyword search.
- **Cited Passage Highlighting**: Interactive alert and illuminated quotation for Section 4.2 (Annual Leave Policy) matching AI inquiries.
- Side-by-side **Infera Document Inspector**: Ask contextual questions directly about the active page without losing reading place.

### 6. Member Profile & Settings (`SettingsPage.jsx`)
- Personal Information management (Name, Email, Job Title, Department).
- Security & Credentials status (Hardware security keys, FIDO2/YubiKey, Multi-Factor Authentication).
- Notification preferences (Weekly digest, Auto-scroll reader to citations).
- Enterprise workspace credentials and clearance status.

---

## ✦ Local Development

The project is running on Vite:
```bash
# Start development server
npm run dev

# Production build
npm run build
```
Visit `http://localhost:5173` in your browser.
