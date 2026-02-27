```

## What Works

### 1) Identify yourself

- User selection screen with multiple profiles.
- Selecting a user loads that user’s note set.
- Switch-user action from the sidebar footer.

### 2) Add patient notes

- `New` button creates a new note.
- Notes support:
  - Title
  - Patient name
  - Visit date
  - Summary/body content
  - Tags
- Edit mode supports updating all of the above.

### 3) View notes list
## FEATURES

- Note list panel with:
  - Title + content preview
  - Patient/visit chips (when present)
  - Tag chips
  - Relative updated date
- Category navigation:
  - All
  - Pinned
  - Recent
  - Archived
  - Tag-based filters
- Sidebar counters for categories/tags.
- Log in
- View notes
- Add note

### 4) View note details
## IF I HAD MORE TIME

- Click a note to open full details in the editor panel.
- Rich detail view includes metadata (created/updated), patient, visit date, tags, and full summary.


## What Is Mocked / Stubbed

- Persistence is in-memory only (`useState` + seeded mock data).
  - Data resets on refresh/restart.
- No real authentication.
  - User selection is mocked.
- No backend/API/database.
- Search input UI is present but not wired to filtering logic yet.
- Loading/error network states are limited because there is no async backend call in this prototype.

## If I Had 1–2 More Hours

1. Add persistence via `localStorage` (or a lightweight API route + SQLite) so notes survive refresh.
2. Wire search input to filter by title, patient name, tags, and summary text.
3. Add explicit async state UX for create/update/delete (`saving...`, `error`, retry toast).
4. Add lightweight test coverage:
   - unit tests for filtering/sorting logic
   - integration test for create/edit/delete flow
5. Add deploy config and live demo link (Vercel).
- Create working backend with supabase with all the information actually editable there
- create dark mode