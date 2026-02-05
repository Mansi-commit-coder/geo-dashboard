![DEMO-GEO-DASHBOARD](https://github.com/user-attachments/assets/0c3f9ec6-4c3c-4e30-b77a-b8e2eeb95e49)






🌍 Geo Data Dashboard
Overview

This project is a Geo Data Dashboard built using React that combines a data table with an interactive map.
The goal was not just to show data, but to make geographic information easy to explore, filter, and understand visually.

Every layout and technical choice in this project was made deliberately, keeping usability, responsiveness, and visual clarity in mind.

🧠 Design & Technical Decisions

This section explains why things were built the way they are.

1️⃣ Why React (Functional Components + Hooks)

Decision: Use React with functional components and hooks.

Why:

Hooks (useState, useEffect) keep logic simple and readable

Easier state sharing between table and map

No unnecessary complexity from class components

Widely used in real-world dashboards

2️⃣ Why Separate Components (Dashboard, DataTable, MapView)

Decision: Split UI into focused components.

Why:

Dashboard → layout & orchestration

DataTable → purely responsible for data display

MapView → map logic only

This separation:

Improves maintainability

Makes debugging easier

Allows future reuse (e.g., map without table)

3️⃣ Why a Full-Screen Video Background

Decision: Use galaxy.mp4 as a fixed background across the site.

Why:

Gives a strong visual identity

Makes the dashboard feel modern and immersive

Fixed positioning ensures:

No scrolling glitches

No performance issues

The video is placed behind everything using z-index instead of being tied to individual components.

4️⃣ Why a Separate Highlight Video (m.mp4) for the Header

Decision: Add a second video only behind the title and filters.

Why:

Creates visual focus at the top

Separates “controls” from “data”

Makes the dashboard feel intentional, not flat

The video height is intentionally oversized (~200%) to:

Avoid visible edges

Maintain a cinematic feel across screen sizes

5️⃣ Why Inline Styles Instead of CSS Files

Decision: Use inline style objects.

Why:

Precise control over positioning (especially videos)

Faster iteration during layout tuning

Easier to reason about component-specific styling

This approach is especially useful for complex positioning like:

Absolute videos

Layered backgrounds

Glassmorphism effects

6️⃣ Why Glassmorphism for the Table

Decision: Use a dark, glass-like table UI.

Why:

Improves readability on a video background

Reduces eye strain

Keeps focus on data instead of decoration

Design choices include:

Semi-transparent background

Subtle blur

Alternating row colors

Clear status pills

7️⃣ Why the Table Is Centered but the Map Is Full Width

Decision:

Table → constrained width

Map → edge-to-edge

Why:

Tables are easier to read when constrained

Maps benefit from more space and context

Matches real-world dashboard patterns

This is why:

The table sits inside a maxWidth container

The map intentionally escapes that container

8️⃣ Why React Leaflet + OpenStreetMap

Decision: Use React Leaflet with OpenStreetMap tiles.

Why:

Free and open-source

No API keys required

Lightweight and reliable

Easy marker interactions

Leaflet also integrates cleanly with React state for syncing table and map interactions.

9️⃣ Why Table ↔ Map Synchronization

Decision: Clicking a table row highlights the map marker and vice versa.

Why:

Prevents users from mentally mapping IDs to locations

Improves discoverability

Feels intuitive and “smart”

This is handled using a shared selectedId state in Dashboard.

🔟 Why Pagination Is Placed Above the Map

Decision: Pagination controls are placed between the table and the map.

Why:

Pagination is logically related to both views

Users often check the map after switching pages

Reduces unnecessary scrolling

This placement improves flow without adding clutter.

📱 Responsiveness Decisions

Decision: Make the layout fully responsive without media-query overload.

Why:

Flexbox-based layouts adapt naturally

No fixed heights except where necessary (map, videos)

Works smoothly across:

Desktop

Tablet

Mobile

Videos remain centered and tables stay readable on smaller screens.

🧪 Performance Considerations

Debounced search input to avoid unnecessary renders

No heavy animations

Map renders only when data is available

Videos are muted and optimized for autoplay

📂 Project Structure (Intentional)
components/
  Dashboard/  → Layout, state coordination
  DataTable/  → Data rendering only
  MapView/    → Map logic & markers

hooks/
  useGeoData  → Data handling, sorting, pagination


This structure keeps responsibilities clear and avoids tangled logic.

🚀 Setup Instructions
npm install
npm run dev


Runs on:

http://localhost:5173

🎯 Future Enhancements

These were intentionally left out to keep scope clean:

Backend API integration

Authentication

Marker clustering

Export features

The current structure supports adding these easily later.

🧾 Final Note

This project prioritizes:

Clarity over cleverness

Usability over effects

Maintainability over shortcuts

Every choice was made with real-world dashboard usage in mind.
