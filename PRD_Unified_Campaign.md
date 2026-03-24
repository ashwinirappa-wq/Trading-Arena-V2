# Product Requirements Document
## Unified Trading Volume Campaign Management Form

**Version:** 1.0  
**Date:** February 2026  
**Product:** Exchange Campaign Management Tool  

---

## Overview

The Unified Trading Volume Campaign Management Form is an internal tool used by the Exchange CRM/Product team to configure, define, and activate trading volume campaigns. It covers all campaign parameters from basic identity through eligibility, criteria, prize distribution, and legal terms — resulting in a structured JSON config handed off to engineering for activation.

---

## CARD 1 — Basic Information

### Purpose
Capture the core identity assets of the campaign: display name, subtitle, unique system code, and banner image.

---

### FR-1.1 — Campaign Name

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a mandatory free-text input field for the Campaign Name. |
| **Elaborative Detail** | The Campaign Name is the primary title displayed to end users on all campaign touchpoints (app, web, notifications). It should clearly describe the campaign. Example: "Buy Dip Trading Campaign". |
| **User Story** | As a Campaign Manager, I want to enter a campaign name so that users can identify the campaign across all surfaces. |
| **Acceptance Criteria** | - Field is required; form cannot be submitted without it. - Accepts free text with no character restriction enforced in the UI. - Field is validated on form submission; shows inline error message "Required" if empty. - Value is persisted to draft on each keystroke. |

---

### FR-1.2 — Campaign Sub-Title

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a mandatory free-text input for the Campaign Sub-Title. |
| **Elaborative Detail** | A supporting tagline shown below the campaign name on campaign pages. Typically summarises the prize or call-to-action. Example: "Trade to win $10,000 in CRO". |
| **User Story** | As a Campaign Manager, I want to enter a sub-title so that users immediately understand the reward at stake. |
| **Acceptance Criteria** | - Field is required; form cannot be submitted without it. - Shows inline error "Required" if empty on submission. - Value persisted to draft on input. |

---

### FR-1.3 — Campaign Code

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a mandatory free-text input for the Campaign Code. |
| **Elaborative Detail** | A unique internal identifier used by systems to reference this campaign. Must be human-readable and concise. Example: "CDC2026". This code is used in API calls, analytics tagging, and reporting. |
| **User Story** | As a Campaign Manager, I want to assign a campaign code so that the campaign is uniquely identifiable in downstream systems. |
| **Acceptance Criteria** | - Field is required; form cannot be submitted without it. - Shows inline error "Required" if empty on submission. - Value persisted to draft on input. |

---

### FR-1.4 — Banner Image

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a banner image upload mechanism with two additional options: "Create New" and "Choose from Existing". |
| **Elaborative Detail** | The banner is the hero visual asset displayed on the campaign landing page, push notifications, and app banners. Accepted formats: images only (PNG, JPG, GIF, WebP). Users can either upload a new file via drag-and-drop/click, create a new banner via a design tool, or choose a previously used banner from the asset library. |
| **User Story** | As a Campaign Manager, I want to attach a banner image so that the campaign has a recognisable visual identity for users. |
| **Acceptance Criteria** | - Drop zone accepts image file types only. - Drag-and-drop and click-to-upload are both supported. - On file selection, the filename is displayed in the drop zone. - "Create New" button triggers image creation flow. - "Choose from existing" button allows selection from the asset library; on selection, filename shows as "(Selected from existing)". - Field is required; form cannot be submitted without a banner. - Shows inline error "Upload or choose banner" if missing on submission. |

---

## CARD 2 — Duration

### Purpose
Define the time window during which the campaign is active and accepting trading activity for ranking.

---

### FR-2.1 — Enable Duration Toggle

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a toggle to enable or disable campaign duration fields. |
| **Elaborative Detail** | By default the toggle is ON and duration fields are visible. When toggled OFF, the start and end time fields are hidden, indicating an open-ended or undated campaign. |
| **User Story** | As a Campaign Manager, I want to optionally set a fixed duration so that the campaign has clearly defined start and end times. |
| **Acceptance Criteria** | - Toggle defaults to ON state; duration fields are visible on load. - Clicking toggle switches between ON/OFF. - When OFF, Start Time and End Time fields are hidden. - Toggle state is persisted to draft. |

---

### FR-2.2 — Start Time

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a datetime-local input for Campaign Start Time. |
| **Elaborative Detail** | Defines the precise moment (date and time) from which user trading volume begins counting toward campaign ranking. Stored in ISO datetime format. |
| **User Story** | As a Campaign Manager, I want to set a start time so that the system knows exactly when to begin tracking eligible trading volume. |
| **Acceptance Criteria** | - Input is of type datetime-local. - Field is visible only when Duration toggle is ON. - Value persisted to draft. |

---

### FR-2.3 — End Time

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a datetime-local input for Campaign End Time. |
| **Elaborative Detail** | Defines the precise moment after which no further trading activity is counted. Campaign results are calculated at End Time. |
| **User Story** | As a Campaign Manager, I want to set an end time so that the campaign has a clearly defined close point for leaderboard finalisation. |
| **Acceptance Criteria** | - Input is of type datetime-local. - Field is visible only when Duration toggle is ON. - End Time should logically be after Start Time (validation recommended). - Value persisted to draft. |

---

## CARD 3 — Participation Mode

### Purpose
Define whether users are automatically entered into the campaign or must actively register to participate.

---

### FR-3.1 — Participation Mode Selection

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a mandatory dropdown to select the participation mode. |
| **Elaborative Detail** | Two modes are available: (1) **Opt-In Required** — Users must actively register during the registration window before they can participate. Their volume only counts after registration. (2) **Automatic** — All eligible users (as per eligibility rules) are automatically entered; their volume counts from campaign start without any action needed. |
| **User Story** | As a Campaign Manager, I want to choose whether users need to opt in so that I can control the participation flow and user intent signals. |
| **Acceptance Criteria** | - Dropdown is required. - Options: "Opt-In Required (Users must register)" and "Automatic (All eligible users included)". - Selecting "Opt-In Required" dynamically reveals the Registration Dates sub-section. - Selecting "Automatic" hides Registration Dates. - Value persisted to draft. |

---

### FR-3.2 — Registration Dates (Conditional — Opt-In only)

| Attribute | Detail |
|---|---|
| **Functional Requirement** | When Participation Mode is "Opt-In Required", the system must display registration window fields. |
| **Elaborative Detail** | The registration window defines when users can sign up to participate. It may start before the campaign itself (pre-registration) and must close before or when the campaign ends. Provides: **Registration Opens** and **Registration Closes** datetime fields. |
| **User Story** | As a Campaign Manager, I want to set a registration window so that users have a defined period to opt in before the competition begins. |
| **Acceptance Criteria** | - Registration Opens and Registration Closes fields are hidden by default. - Both fields appear only when "Opt-In Required" is selected. - Both are datetime-local inputs. - Values are persisted to draft. |

---

## CARD 4 — User Eligibility

### Purpose
Define which users are eligible to participate in the campaign, including user group segmentation and geographic restrictions.

---

### FR-4.1 — Select User Group

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a mandatory dropdown to select the target user group for the campaign. |
| **Elaborative Detail** | Three options: (1) **All Users** — All platform users meeting the asset and trade type criteria are eligible. (2) **VIP User** — Only users in VIP tiers are eligible. (3) **Braze Segment** — Eligibility is controlled by a specific Braze audience segment, enabling precise CRM-driven targeting. |
| **User Story** | As a Campaign Manager, I want to define which group of users can participate so that the campaign is targeted appropriately. |
| **Acceptance Criteria** | - Dropdown is required. - Options: "All Users", "VIP User", "Braze Segment". - Selecting "Braze Segment" reveals the Custom Braze Segment dropdown and informational message. - Selecting any other option hides the Braze-related fields. - Value persisted to draft. |

---

### FR-4.2 — Custom Braze Segment (Conditional — Braze Segment only)

| Attribute | Detail |
|---|---|
| **Functional Requirement** | When "Braze Segment" is selected, the system must reveal a "Custom Braze Segment" dropdown populated with available Braze segments. |
| **Elaborative Detail** | The dropdown lists Braze audience segments that have been created in Braze. The selected segment defines the exact pool of eligible users. The list is expected to be dynamically populated from the Braze integration. |
| **User Story** | As a Campaign Manager, I want to select a specific Braze segment so that only a precisely targeted group of users is eligible. |
| **Acceptance Criteria** | - Dropdown hidden unless "Braze Segment" is selected in User Group. - Dropdown label: "Custom Braze Segment". - Starts with placeholder "Select...". - Value persisted to draft. |

---

### FR-4.3 — Braze Segment Informational Message (Conditional)

| Attribute | Detail |
|---|---|
| **Functional Requirement** | When "Braze Segment" is selected, the system must display a red-background informational message below the Custom Braze Segment dropdown. |
| **Elaborative Detail** | Message text: "If your user eligibility segment isn't showing in the 'Custom Braze Segment' dropdown, create it in Braze first—it will then appear automatically in 'Custom Braze Segment' dropdown. Contact the Exchange CRM team for assistance with segment creation." This guides users on the process if the desired segment is not present. |
| **User Story** | As a Campaign Manager, I want to be guided on what to do if my segment doesn't appear so that I can unblock myself without requiring technical support. |
| **Acceptance Criteria** | - Message is hidden by default. - Displayed with red background when "Braze Segment" is selected. - Hidden when any other user group is selected. |

---

### FR-4.4 — Country Restrictions

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide two radio buttons for the type of country restriction: "Whitelist countries" or "Blacklist countries". |
| **Elaborative Detail** | **Whitelist** — Only users from the selected countries are eligible. All other countries are excluded. **Blacklist** — Users from the selected countries are excluded. All other countries are eligible. This is used for regulatory compliance and regional targeting. |
| **User Story** | As a Campaign Manager, I want to specify country-level restrictions so that the campaign complies with regional regulations and is targeted to the right geographies. |
| **Acceptance Criteria** | - Two radio buttons: "Whitelist countries" and "Blacklist countries". - Neither is selected by default. - Selecting either radio reveals a multi-select country dropdown below. - The dropdown label updates to match the selection ("Whitelist countries" or "Blacklist countries"). - When no radio is selected, the country dropdown is hidden. - Selection persisted to draft. |

---

### FR-4.5 — Country List (Conditional)

| Attribute | Detail |
|---|---|
| **Functional Requirement** | When a country restriction type is selected, the system must display a multi-select dropdown of countries. |
| **Elaborative Detail** | The dropdown contains: United States, United Kingdom, Germany, France, Japan, Australia, Canada, Singapore. Multiple countries can be selected. The list is expected to expand to cover all supported jurisdictions in the production system. |
| **User Story** | As a Campaign Manager, I want to select specific countries for the restriction so that the correct geographies are included or excluded. |
| **Acceptance Criteria** | - Multi-select dropdown, hidden until a radio is selected. - Supports multiple selections simultaneously. - Label dynamically reflects restriction type. - Selected values persisted to draft. |

---

## CARD 5 — Campaign Criteria & Qualification

### Purpose
Define the precise rules that govern trading activity eligibility, how volume is measured, how participants are ranked, and the prize distribution model.

---

### Sub-Section 1: Campaign Type

### FR-5.1.1 — Campaign Type

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a Campaign Type selection (currently fixed to "Rank Based"). |
| **Elaborative Detail** | Currently only **Rank Based** is supported — a competitive leaderboard where users are ranked by trading volume. Top performers receive prizes. This field is a radio button, pre-selected as "Rank Based", enabling the full ranking configuration sub-section. |
| **User Story** | As a Campaign Manager, I want to select the campaign type so that the system activates the correct ranking and prize distribution logic. |
| **Acceptance Criteria** | - Only "Rank Based" option is available and selected by default. - Selecting "Rank Based" makes the Ranking Configuration section visible. |

---

### Sub-Section 2: Eligible Trading Activity

### FR-5.2.1 — Asset Type

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide checkboxes to select which asset types are eligible for the campaign. |
| **Elaborative Detail** | Two asset types: **Spot** (direct buy/sell of assets) and **Perps (Perpetuals)** (derivatives trading). A maximum of both can be selected simultaneously. The selection determines which market data feeds are used to calculate eligible volume. |
| **User Story** | As a Campaign Manager, I want to define eligible asset types so that only the intended trading markets count toward the campaign leaderboard. |
| **Acceptance Criteria** | - Two checkboxes: "Spot" and "Perps (Perpetuals)". - At least one must be selected before submission. - Selecting "Spot" reveals Spot-specific trade type options. - Selecting "Perps" reveals Perps-specific trade type options. - Selecting both reveals both sub-sections. - Maximum 2 selections. |

---

### FR-5.2.2 — Eligible Trade Types

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must display trade type options dynamically based on selected asset types. |
| **Elaborative Detail** | **Spot trade types** (visible when Spot is checked): - Spot: No Margin allowed (Cash trading only) - Spot: Margin Allowed (Includes borrowed funds) **Perps trade types** (visible when Perps is checked): - Perps: No Leverage allowed (Spot-style) - Perps: Leverage Allowed (Position size = margin × leverage) An "All Trade Types" master checkbox overrides individual selections and disables individual checkboxes. |
| **User Story** | As a Campaign Manager, I want to specify which trade types count toward volume so that the campaign rewards the intended trading behaviour. |
| **Acceptance Criteria** | - "All Trade Types" checkbox, when checked, disables and deselects all individual trade type checkboxes. - Spot trade type options appear only when Spot asset type is selected. - Perps trade type options appear only when Perps asset type is selected. - Deselecting an asset type hides its corresponding trade type options. - At least one trade type or "All Trade Types" should be selected. |

---

### Sub-Section 3: Volume Calculation & Ranking

### FR-5.3.1 — Volume Calculation Basis

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a mandatory dropdown to select how user volume is calculated. |
| **Elaborative Detail** | Options: - **Total Eligible Volume** — Sum of all eligible trading activity across selected trade types. - **Taker Volume Only** — Only liquidity-taking orders count. - **Maker Volume Only** — Only liquidity-providing orders count. - **Buy Volume Only** — Only long/buy side positions count. - **Sell Volume Only** — Only short/sell side positions count. - **Net Volume (Buy - Sell)** — Absolute difference between buy and sell volume; penalises wash trading. Each option has an explanatory tooltip. When selected, a contextual helper description appears below the dropdown. |
| **User Story** | As a Campaign Manager, I want to define the volume calculation method so that the leaderboard rewards the correct trading behaviour. |
| **Acceptance Criteria** | - Dropdown is required. - On selection, a tooltip/helper text block explaining the selected method is shown. - Value persisted to draft. |

---

### FR-5.3.2 — Tie-Breaker Rules

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a multi-select dropdown for tie-breaker rules. |
| **Elaborative Detail** | When two or more participants have equal volume scores, tie-breaker rules determine the final ranking order. Rules (in priority order as selected): - **Final Balance** — Higher account balance wins. - **Earlier First Trade** — Participant who placed their first trade earlier wins. - **Lower Drawdown** — Participant with smaller peak-to-trough portfolio loss wins. - **More Profitable Trades** — Participant with a higher proportion of profitable trades wins. |
| **User Story** | As a Campaign Manager, I want to define tie-breaker rules so that equal-score scenarios have a deterministic resolution. |
| **Acceptance Criteria** | - Multi-select dropdown supporting multiple simultaneous selections. - All four options available. - Tooltip: "If scores are equal, these rules determine winner order." - Selection not mandatory; defaults to no tie-breaker. - Values persisted to draft. |

---

### FR-5.3.3 — Campaign Construct Type (Ranking & Distribution Model)

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a mandatory dropdown for the Campaign Construct Type, which defines the prize distribution model. |
| **Elaborative Detail** | Options: - **Winner Take All** — Single winner takes 100% of the prize pool. - **Top N Fixed** — Top N ranked users each receive predetermined fixed prizes per rank. - **Top N Tiered** — Rank positions are grouped into tiers (e.g., Ranks 1-3 = Gold, 4-10 = Silver); each tier receives the same reward. - **Proportional** — Prize share = participant's volume ÷ total pool volume (placeholder, to be developed). - **Hybrid** — Combination of top fixed prizes + proportional for the rest (placeholder, to be developed). On selection, a contextual helper text describing the selected model appears below the dropdown. |
| **User Story** | As a Campaign Manager, I want to define the prize distribution model so that rewards are allocated according to the campaign's competitive structure. |
| **Acceptance Criteria** | - Dropdown is required. - On selection, an explanatory helper text is shown below the dropdown. - Selecting "Proportional" or "Hybrid" shows a "To be developed in next phase" placeholder message and hides all attribute configuration blocks. - Selecting any other value reveals the Campaign Construct (Secondary) dropdown. - Value persisted to draft. |

---

### FR-5.3.4 — Campaign Construct (Secondary) — Ranking Dimension

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a mandatory dropdown for the Campaign Construct (Secondary), populated dynamically based on the selected Campaign Construct Type. |
| **Elaborative Detail** | Defines how volume is aggregated for ranking: - **Cumulative Total Volume** — All volume from Day 1 sums up across the entire campaign. - **Daily Volume** — Volume resets every 24 hours at 00:00 UTC; each day is a fresh competition. - **Rolling X-Days Average Volume** — Average of daily volume over a rolling window (e.g., 7-day). - **Milestone Progress** — Sequential volume milestones must be hit in order. The options available depend on the selected Campaign Construct Type. |
| **User Story** | As a Campaign Manager, I want to define how volume is measured over time so that the leaderboard reflects the correct trading behaviour dimension. |
| **Acceptance Criteria** | - Dropdown is disabled until a Campaign Construct Type is selected. - Options populate dynamically based on Construct Type. - On valid selection of both dropdowns, the contextual Definition block and the Attributes table are displayed. - Value persisted to draft. |

---

### FR-5.3.5 — Dynamic Definition Display

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must display a dynamic definition in a green-background block above the Campaign Construct Type field when a valid combination of Campaign Construct Type, Campaign Construct (Secondary), and Min Volume Qualification is selected. |
| **Elaborative Detail** | The definition updates in real time to describe the precise competition mechanic. The definition changes based on: (1) Campaign Construct Type, (2) Campaign Construct (Secondary), and (3) Min Volume Qualification (Yes = Qualified competition; No = Open competition). For Proportional and Hybrid, no definition is shown. For Milestone constructs, the definition is the same regardless of qualification status. |
| **User Story** | As a Campaign Manager, I want to see a plain-language description of the campaign mechanic so that I can verify the configuration is correct before activating. |
| **Acceptance Criteria** | - Definition block is hidden when no construct is selected. - Definition updates immediately on any change to the three trigger fields. - Correct definition is shown for all 21 defined combinations. - Block uses green background styling. - Hidden for Proportional and Hybrid selections. |

---

### FR-5.3.6 — Min Volume Qualification Gate Toggle

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a toggle to enable a minimum volume qualification threshold. |
| **Elaborative Detail** | When enabled, creates a two-phase flow: (1) Qualify phase — the trader must first accumulate a minimum volume to unlock eligibility. (2) Compete phase — only volume traded after crossing the threshold counts toward ranking. When disabled, all volume from Day 1 counts (Open competition). This toggle is hidden for: Winner Take All (qualification is managed within the attribute block), all Top N and Top N Tiered combinations (qualification managed in attribute block), Proportional, and Hybrid. Visible and active for standard non-managed cases only. |
| **User Story** | As a Campaign Manager, I want to optionally require traders to hit a minimum volume before competing so that the leaderboard is qualified and competitive. |
| **Acceptance Criteria** | - Toggle is hidden when no construct is selected. - Toggle is hidden for WTA, Top N (all secondaries), Top N Tiered (all secondaries), Proportional, and Hybrid. - When active, reveals "Minimum Trading Volume to Qualify" input. - When deactivated, input is hidden and value cleared. - State persisted to draft. |

---

### FR-5.3.7 — Attributes Needed for Campaign Logic and Ranking (Dynamic Attribute Block)

| Attribute | Detail |
|---|---|
| **Functional Requirement** | For each valid Campaign Construct Type + Campaign Construct (Secondary) combination, the system must render a dynamic attribute configuration table. |
| **Elaborative Detail** | The attribute block appears after construct selection and contains all required and optional fields for that specific combination. The block re-renders if the Min Volume Qualification dropdown within it changes. **Common attributes across all constructs:** Min Volume Qualification (Yes/No), Min Volume required to Qualify (or "Not Applicable"), Volume Aggregation Method (auto-populated, read-only), Prize Pool Type (Fixed, read-only), Prize Pool (Cash, Merchandise, Tokens, Other), Number of Winners. **Construct-specific attributes:** - WTA: Target Volume, Rolling Days (rolling only), Number of Milestones + Volume Targets per milestone (milestone only). - Top N Fixed / Top N Tiered: Define Number of Ranks N / Number of Tier N, Prize Pool table (per rank/tier: Volume Target, Cash, Merchandise, Tokens, Other). - Top N Tiered: From Rank, To Rank per tier. - Top N Fixed Milestone: Number of Milestones, Volume per Milestone, Define Number of Ranks N, Prize Pool table. |
| **User Story** | As a Campaign Manager, I want to configure detailed campaign logic attributes so that the system has all parameters needed to execute the ranking and prize distribution accurately. |
| **Acceptance Criteria** | - Attribute block is hidden until a valid Campaign Construct Type + Secondary is selected. - Block renders the correct table for each of the 17 defined construct combinations. - All mandatory fields are marked with *. - Min Volume Qualification toggle within the attribute block re-renders the qualification input row on change. - Number of Ranks N / Number of Tiers inputs dynamically generate corresponding prize pool table rows. - Prize pool table columns: Rank/Tier, Volume Target, Cash, Merchandise, Tokens, Other. - For Milestone constructs: Number of Milestones input dynamically generates Volume Target fields (one per milestone). - Milestone volume targets must be entered in ascending order (system prompts sequential unlock logic). - All values persisted to draft. |

---

## CARD 6 — Display & Terms

### Purpose
Capture the legal and informational content that must be published alongside the campaign.

---

### FR-6.1 — Terms & Conditions

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a mandatory multi-line textarea for the campaign Terms & Conditions. |
| **Elaborative Detail** | The T&Cs are not a URL link — they are the actual terms content entered as bullet points (one per line). Each line will be rendered as a separate bullet point on the campaign page. This content is legally required and must be complete before a campaign can be activated. |
| **User Story** | As a Campaign Manager, I want to enter the campaign terms and conditions as bullet points so that users are clearly informed of the competition rules and legal terms. |
| **Acceptance Criteria** | - Textarea with 6 visible rows by default. - Placeholder: "Enter each bullet point on a new line". - Helper text: "Enter each term or condition as a separate bullet point (one per line)". - Field is required; form cannot be submitted without content. - Inline error message "Required" shown if empty on submission. - Value persisted to draft. |

---

### FR-6.2 — FAQ

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide an optional multi-line textarea for the campaign FAQ. |
| **Elaborative Detail** | The FAQ section allows the Campaign Manager to enter anticipated questions and answers to be displayed on the campaign page. Entry format is free-text (one Q&A pair per line or structured as preferred). This helps reduce user support tickets by proactively addressing common queries. |
| **User Story** | As a Campaign Manager, I want to add FAQs to the campaign so that users can self-serve answers to common questions without contacting support. |
| **Acceptance Criteria** | - Textarea with 6 visible rows by default. - Placeholder: "Enter FAQs (e.g., Question and Answer pairs, one per line)". - Helper text: "Enter frequently asked questions and answers". - Field is optional; no required marker. - Value persisted to draft. |

---

## Global Functional Requirements

### FR-G.1 — Draft Auto-Save

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must automatically save all form state to browser localStorage on every field change. |
| **Elaborative Detail** | Draft is saved under the key `campaign-draft`. On page reload, all previously entered values are restored. This prevents data loss if the browser is accidentally closed or the page is refreshed. |
| **User Story** | As a Campaign Manager, I want my work to be auto-saved so that I don't lose progress if I navigate away or my browser crashes. |
| **Acceptance Criteria** | - Every input, select, checkbox, radio, and textarea persists to localStorage on change. - On page load, `loadDraft()` restores all persisted values. - Complex fields (country list, milestone targets, prize pool rows) are also persisted and restored. |

---

### FR-G.2 — Save Draft Button

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide a "Save Draft" button that explicitly saves the current state to localStorage and confirms to the user. |
| **User Story** | As a Campaign Manager, I want to explicitly save a draft so that I have a confirmed save point I can return to. |
| **Acceptance Criteria** | - Button visible at the bottom of the form. - On click, calls `persistDraft()` and shows an alert: "Draft saved to localStorage." |

---

### FR-G.3 — Activate (Submit) Button

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must provide an "Activate" button that validates all required fields before submitting the campaign configuration. |
| **Elaborative Detail** | On click, the form runs `validate()` checking all required fields. If validation passes, the complete configuration JSON is generated and logged to console (for handoff to engineering). If validation fails, inline error messages are shown against each invalid field and the form is not submitted. |
| **User Story** | As a Campaign Manager, I want to activate the campaign only after all required fields are completed so that invalid or incomplete campaigns are not sent to production. |
| **Acceptance Criteria** | - Required fields validated: Campaign Name, Campaign Sub-Title, Campaign Code, Banner, Terms & Conditions. - Inline errors shown per field if missing. - If all valid, `getConfigJSON()` generates a structured JSON object and the system confirms activation. - JSON output includes all 6 card data structures. |

---

### FR-G.4 — Campaign Summary Preview Panel

| Attribute | Detail |
|---|---|
| **Functional Requirement** | The system must display a live campaign summary panel that updates as the user fills in the form. |
| **Elaborative Detail** | A sticky right-hand panel shows a summary of key fields as they are entered: Campaign Name, Start Time, End Time, Asset Types, Volume Calculation Basis, Ranking Dimension, Distribution Type, User Group, etc. This gives the Campaign Manager a real-time sanity check of their configuration. |
| **User Story** | As a Campaign Manager, I want to see a live summary of my configuration so that I can spot errors or inconsistencies without scrolling through the full form. |
| **Acceptance Criteria** | - Preview panel is sticky (stays visible while scrolling). - Updates in real time on field change. - Shows placeholder text "Configure the form to see summary." when no fields are filled. |

---

## Appendix: Campaign Construct Combinations

| Campaign Construct Type | Campaign Construct (Secondary) | Min Vol Qual | Competition Name |
|---|---|---|---|
| Winner Takes All | Cumulative Total Volume | No | Open Competition |
| Winner Takes All | Cumulative Total Volume | Yes | Qualified Competition |
| Winner Takes All | Daily Volume | No | Open Daily Jackpot |
| Winner Takes All | Daily Volume | Yes | Qualified Daily Jackpot |
| Winner Takes All | Rolling X-Days Average | No | Open Consistency Crown |
| Winner Takes All | Rolling X-Days Average | Yes | Qualified Consistency Crown |
| Winner Takes All | Milestone Progress | N/A | Milestone Race |
| Top N Fixed | Cumulative Total | No | Open Leaderboard League |
| Top N Fixed | Cumulative Total | Yes | Qualified Leaderboard League |
| Top N Fixed | Daily | No | Open Daily Podium |
| Top N Fixed | Daily | Yes | Qualified Daily Podium |
| Top N Fixed | Rolling Average | No | Open Consistency League |
| Top N Fixed | Rolling Average | Yes | Qualified Consistency League |
| Top N Fixed | Milestone Progress | N/A | Open Racers |
| Top N Tiered | Cumulative Total | No | Open Rank-Based Tiers |
| Top N Tiered | Cumulative Total | Yes | Qualified Volume-Threshold Tiers |
| Top N Tiered | Daily | No | Open Daily Rank Tiers |
| Top N Tiered | Daily | Yes | Qualified Daily Volume Tiers |
| Top N Tiered | Rolling Average | No | Rank-Based Tiers by Consistency |
| Top N Tiered | Rolling Average | Yes | Volume-Threshold Tiers by Consistency |
| Top N Tiered | Milestone Progress | N/A | Open Racers Tiered |
| Proportional | Any | N/A | To be developed — Phase 2 |
| Hybrid | Any | N/A | To be developed — Phase 2 |
