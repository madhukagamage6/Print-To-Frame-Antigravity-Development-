# Implementation Task Tracker (Updated & Build Verified)

## Phase 1 — Core Transactional Foundation
- [x] ITEM 1: Structured Line-Item Quotation Record (`quotations` collection, `QuotationBuilder.jsx`, AI parser in `gemini.js`)
- [x] ITEM 3: Action-Level Permissions (`PermissionsContext.jsx` + `PermissionsManager.jsx` 5-action matrix: View, Create, Edit, Delete, Export)
- [x] ITEM 5: Quote Versioning History (Integrated in `QuotationBuilder.jsx` with active tabs & version lineage)
- [x] ITEM 6: Direct Quote → Invoice Conversion (Integrated in `QuotationBuilder.jsx` for 75% advance generation)
- [x] ITEM 8: Invoice Audit Trail (`logActivity` in `Invoices.jsx` & `App.jsx` for creation, modification, settlement, deletion)
- [x] ITEM 9: Permission Change Audit Log (Role diff logging in `PermissionsContext.jsx` with before/after state capture)

## Phase 2 — CRM Workflow & Pipeline Intelligence
- [x] ITEM 4: Kanban cards surface Owner, Value, Days-in-Stage & Urgency badges (`stageEnteredAt` in `Leads.jsx` & `Deals.jsx`)
- [x] ITEM 10: Sortable & Filterable List View alongside Kanban (`SortableTable.jsx`, toggle switcher in `Leads.jsx` & `Deals.jsx`)
- [x] ITEM 11: Bulk Actions Toolbar (Multi-select, bulk stage change, CSV export) in `SortableTable.jsx`
- [x] ITEM 12: Stale-Lead Reminders & Dashboard Alerts (Stale lead calculation, colored urgency badges, Dashboard panel)
- [x] ITEM 20: Customer Duplicate Detection & Smart Matching (`stringMatch.js` Levenshtein distance in `Customers.jsx`)

## Phase 3 — Invoicing, Reporting & Customer History
- [x] ITEM 7: Automated Overdue Payment Reminders & Due Date Tracking (`dueDate`, overdue badge, filter tab, WhatsApp trigger)
- [x] ITEM 13: Customer & Financial CSV Export (`csvExport.js` with RFC 4180 escaping & UTF-8 BOM)
- [x] ITEM 14: Unified Customer Timeline (`ActivityTimeline.jsx` aggregated stream in `Customers.jsx`)
- [x] ITEM 15: Real-time Invoice Aging Report & Revenue by Period in Dashboard (0-30d, 31-60d, 61-90d, 90d+ overdue metrics & dynamic monthly trends)
- [x] ITEM 17: Job Completion Hook → Auto-Prompt 25% Final Settlement Invoice Creation in `FabricationWorks.jsx`

## Phase 4 — Operations, Identity & Full Light Mode Theme
- [x] ITEM 16: Work Order Attachments & Blueprint Dropzone in `FabricationCardDetails.jsx`
- [x] ITEM 18: User Management Invite / Deactivate Flow in `AgentDatabase.jsx` with active/deactivated toggles
- [x] ITEM 19: Full Responsive Breakpoints & Mobile Drawer panels
- [x] ITEM 21: Full Light Mode Theme (`[data-theme='light']`, complete CSS variable tokens in `index.css` & `tailwind.config.js`, Header/Sidebar theme switcher)
- [x] ITEM 22: Modular Dashboard Widgets & Global Filter

## Phase 5 — Payment Gateway (Deferred / Pending PayHere Credentials)
- [ ] ITEM 2: PayHere Online Payment Gateway integration (Data models ready with standard transaction fields)
