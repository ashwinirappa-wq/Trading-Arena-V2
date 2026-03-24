Problem Statement
The current Trading Arena is built on a legacy CMS that has reached its operational and technical limits. Five core problems are driving this rebuild.

UX & UI Problems The campaign visual interface for end users is basic and inflexible. Campaign Managers cannot self-serve or create bespoke custom campaign types without engineering involvement. Every variation — no matter how minor — requires some sort of engineering, Data or operational capacity, making it impossible to move at the pace the business needs.

Calculation Inconsistencies Volume calculations and leaderboard rankings contain known errors that erode customer trust and create financial risk at prize distribution. What customers see on the Trading Arena and what the data team calculates internally are consistently different, leading to disputes, manual corrections, and reputational damage.

No Campaign Type Flexibility The legacy system supports one fixed competition format only. It cannot run Cumulative, Daily, Rolling Average, or Milestone-based competitions. Every new campaign type requires a some sort of  engineering ,data or operational support, making the platform unable to respond to market opportunities or competitor formats in a timely way.

Manual Operations Overhead Every new campaign requires bespoke  work, throttling campaign cadence and adding atleast 2 weeks to every launch. Campaign Managers spend their time coordinating handoffs rather than designing better competitions.

CMS Migration Dependency Crypto.com: Buy, Sell & Trade Crypto with a Trusted App  Exchange is migrating from the legacy CMS to Payload CMS as part of the new Exchange brand refresh. Trading Arena must be rebuilt natively on Payload CMS to clear technical debt and ensure long-term maintainability.

Proposed Solution
The solution has two Modules that work together to replace the legacy system end to end.

Module 1 — MMP Campaign Template (Back-Office) A 7-section campaign creation template built on Payload CMS that generates a complete, customer-ready campaign page on the front end. Campaign Managers fill in all 7 sections sequentially — covering identity, duration, participation, eligibility, competition rules, display template, and legal terms. Once all sections are complete, the system assembles the campaign template ready to preview and activate, without any engineering involvement.

Module 2 — Customer-Facing Trading Arena V2 A redesigned Trading Arena on the Exchange front end that dynamically renders campaigns from the back-office configuration produced by the MMP Campaign Template. The Trading Arena V2 supports logged-in and logged-out states, join flows, live leaderboards, dashboards, and prize displays — all driven by the campaign configuration payload. This component is covered in Part 2 of this PRD.

Phased Rollout
The platform follows a structured phased rollout. Each phase introduces a new competition category. Phase 1 is the focus of this PRD.

Phase

Category

Status

Description

Phase 1a

Trading Volume Campaigns

✅ In Scope — This PRD

Rank-based trading volume competitions. Cumulative, Daily, Rolling Average, and Milestone-based constructs. Distribution: Winner Take All, Top N Fixed, Top N Tiered.

Phase 1b

Trading Volume Extensions

🔶 Future

Proportional and Hybrid distribution models. Placeholders visible in Phase 1a form; activation blocked until Phase 1b ships.

Phase 2

Non-Trading Volume

⏳ Roadmap

Referral, task-based, and social engagement campaigns. Same 7-section form with different conditions and validation rules.

Phase 3

Individual Trading

⏳ Roadmap

Personal milestones vs own trading history baseline, individual PnL targets, trading streak competitions.

Phase 4

Team-Based

⏳ Roadmap

Team volume races, collective milestone campaigns, team vs team head-to-head leaderboards.

Phase 1a — Volume Constructs in Detail
Phase 1a supports the following four volume constructs, sequenced from simplest to most complex.

Cumulative Volume — All eligible volume sums across the full campaign period with no resets at any point. The user with the highest cumulative total at End Time wins.

Daily Volume — Volume resets to zero at 00:00 UTC each day. Each UTC day is an independent mini-competition with its own daily winner(s).

Rolling X-Days Average — Average daily volume calculated over a rolling window of X days across the campaign duration. The campaign duration must be an exact multiple of X days to ensure all rolling cycles complete fully.

Milestone-Based Volume — Sequential volume thresholds (M1 → M2 → … → MN) that must be completed in order. Users cannot skip milestones. Winner Take All variant uses a Race mechanic — the first participant to complete all milestones wins immediately.

Success Metrics
#

Metric

1

Campaign time-to-launch under 1 business day — fully self-serve with zero engineering tickets.

2

Zero leaderboard calculation errors post-launch, measured by QA audit against volume engine logs.

3

Three or more different construct types deployed  post-launch.

4

Campaign Manager satisfaction score of 4/5 or above on ease of campaign creation, measured via internal survey.

Module 1 — MMP Campaign Template (Back-Office)
Campaign Template Generation Flow
The Campaign Manager form is not a simple data entry tool — it is a Campaign Template Generator. When the Campaign Manager completes all 7 sections, the system assembles a complete customer-ready campaign page which can then be previewed and activated in one click.

Step 1 — Complete Sections 1–5 Configure the campaign's identity (name, code, banner), duration (start and end time), participation mode (opt-in or automatic), user eligibility (user group and country restrictions), and the full competition rules (asset types, trade types, volume basis, construct type, construct secondary, qualification gate, and prize pool).

Step 2 — Section 6 Auto-Resolves The system automatically selects the correct display template from the 21-template library based on the Section 5 construct combination. The Campaign Manager then customises the copy payload — headlines, labels, and messaging — within the resolved template. No manual template selection is required.

Step 3 — Complete Section 7 Enter the campaign Terms & Conditions as bullet points (one rule per line) and an optional FAQ. T&Cs are legally required before activation.

Step 4 — Preview Click Preview to view the exact customer-facing campaign page rendered from the current configuration. The preview shows the hero section, leaderboard, rewards panel, how-to-participate steps, and rules tab — exactly as customers will see it.

Step 5 — Activate Click Activate. The system validates all required fields across all 7 sections, generates the campaign JSON payload, and pushes the campaign live on the Trading Arena. 

FR #

Functional Requirement

Elaborative Details

User Story (Campaign Manager)

Acceptance Criteria (I… / CM POV)

MMP Prototype ScreenShot (Actually  may differ)

SECTION A — CAMPAIGN DASHBOARD & MANAGEMENT

A.1

Campaign Dashboard — Overview & Status Tabs

The Campaign Dashboard is the home screen within Campaign Management. It lists all campaigns across all statuses in one view.

Header shows: 'Campaign Dashboard', 'Manage and monitor all trading volume campaigns', campaign count (e.g., '9 campaigns'), and '+ Create New Campaign' button.

Status tabs: All | Draft | Scheduled | Active | Ended | Deactivated — each shows live count.

Table columns: Campaign Name, Code, Status, Construct Type, Start Date, End Date, Actions.

Construct Type shows full combination label (e.g., 'Winner Takes All — Cumulative Total', 'Top N Tiered — Rolling Average').

Sort by: Created Date (newest) default. Search bar filters by Campaign Name or Code in real time.

As a Campaign Manager, I want a central dashboard showing all campaigns with their status and key details so that I can instantly understand my campaign portfolio.

When I open Campaign Management, the dashboard is the first screen — no navigation needed.

I see the total campaign count in green text (e.g., '9 campaigns') at the top right.

Clicking any status tab filters the list to that status; the tab highlights to confirm my selection.

Each tab shows the count of campaigns in that status so I know volumes before clicking.

The Construct Type column shows the full combination label so I can identify competition format at a glance.

Typing in the search bar filters results immediately — no page reload.

I can change sort order via the 'Sort by' dropdown.

If no campaigns match my filter, I see an appropriate empty state message.



A.2

Status Badges & Action Availability by Status

Status badge colours: Draft (grey), Scheduled (blue), Active (green), Ended (amber), Deactivated (red).

Action availability by status:

Draft: Edit ✓ Clone ✓ Deactivate ✗ (disabled) View ✓

Scheduled: Edit ✓ Clone ✓ Deactivate ✓ (red) View ✓

Active: Edit ✗ (disabled) Clone ✓ Deactivate ✓ (red) View ✓

Ended: Edit ✗ Clone ✓ Deactivate ✗ View ✓

Deactivated: Edit ✗ Clone ✓ Deactivate ✗ View ✓

As a Campaign Manager, I want to see which actions are available for each campaign based on its status so that I never attempt a blocked operation.

I identify each campaign's status from the colour-coded badge — no need to open the campaign.

For Draft campaigns, Deactivate is greyed out — I understand I cannot deactivate an unpublished campaign.

For Active campaigns, Edit is greyed out — mechanical configuration cannot change while live.

For Ended and Deactivated, both Edit and Deactivate are greyed out — Clone or View only.

For Scheduled and Active, Deactivate has a red outline — I recognise this as a consequential action.

Clone is always available regardless of status.

View is always available regardless of status.

A.3

Create New Campaign

A '+ Create New Campaign' button in the dashboard header opens a blank 7-section campaign creation form.

The form shows a '← Back to Campaign Dashboard' link at the top left.

A new Draft record is created in Payload CMS when the form loads.

As a Campaign Manager, I want a single clearly visible entry point to create a new campaign so that I can start configuring a competition immediately.

I see '+ Create New Campaign' prominently in the top-right corner of the dashboard at all times.

Clicking the button opens a blank form with all 7 sections visible and scrollable.

I see a '← Back to Campaign Dashboard' link — I can return at any time without losing my draft.

Duration toggle is ON, Participation Mode is unselected, and Country restriction radios are unselected by default.

A.4

Campaign Status State Machine

Lifecycle transitions:

Draft → Scheduled (Activate + future Start Time)

Draft → Active (Activate + past/immediate Start Time)

Scheduled → Active (automatic at Start Time)

Active → Ended (automatic at End Time)

Any → Deactivated (manual; requires confirmation)

Ended and Deactivated campaigns cannot be re-activated — Clone only.

As a Campaign Manager, I want campaign statuses to update automatically based on time so that I always have an accurate view without manual intervention.

After activating with a future Start Time, I immediately see the badge change to 'Scheduled' (blue).

When Start Time arrives, the badge automatically changes to 'Active' (green) — no action from me.

When End Time passes, badge changes to 'Ended' (amber) and the leaderboard is frozen.

Clicking Deactivate shows a confirmation modal before anything changes.

If I click Cancel in the modal, the campaign remains unchanged.

Re-activate is not available for Ended or Deactivated — I can only Clone them.

A.5

Clone Campaign

Clone creates a full copy as a new Draft. Available for all statuses from the Actions menu.

Cloned campaign differences:

Campaign Code: cleared (must enter new unique code)

Campaign Name: prefixed 'Copy of [original name]'

Status: Draft

Start/End Times: cleared

Participant records, leaderboard data, and prize distribution records are NOT cloned.

As a Campaign Manager, I want to clone an existing campaign so that I can quickly build a new competition from a proven configuration without re-entering all fields.

I can clone any campaign from the Actions menu regardless of status.

After clicking Clone, I am taken directly to the cloned campaign's edit form.

The Campaign Name shows 'Copy of [original name]' — I know to rename it.

The Campaign Code field is blank — I cannot accidentally reuse the original code.

Start Time and End Time are cleared — I must set new dates.

All Section 5 construct, prize, eligibility, T&Cs, and display template payload are pre-filled.

A.6

Edit Campaign — Status-Based Edit Rules

Edit access by status:

Draft & Scheduled: all 7 sections fully editable.

Active — LOCKED: Campaign Code, Construct Type, Secondary, Asset Types, Trade Types, Token Pairs, Volume Basis, Start/End Times, Prize Pool amounts, Number of Winners.

Active — EDITABLE: Campaign Name, Sub-Title, Banner, T&Cs, FAQ, Display Template Payload.

Ended & Deactivated: fully read-only. Clone only.

As a Campaign Manager, I want to correct campaign details at any stage while being protected from changes that would retroactively affect live leaderboard rankings.

For Draft campaigns I can edit every field freely.

For Active campaigns, locked fields appear greyed out with a tooltip explaining they cannot be changed while live.

I can still update Campaign Name, Banner, T&Cs, FAQ, and display copy on an Active campaign.

For Ended or Deactivated campaigns I see: 'This campaign cannot be edited. Clone it to create a new version.'

All edits are auto-saved as I type.

 

 

 

 

 

 

SECTION B — FORM SECTION 1: BASIC INFORMATION

B.1

Campaign Name

Mandatory free-text input. The campaign's primary display title across all customer-facing surfaces.

Example: 'Buy Dip Trading Campaign'.


As a Campaign Manager, I want to name the campaign so that it is clearly identifiable to customers and to the internal team on the dashboard.

Trying to activate without a Campaign Name shows 'Campaign Name is required.' — activation blocked.

I can type freely with no character limit enforced in the form.

Draft is saved automatically as I type — no save button needed.

The name appears as the campaign's listing label on the dashboard.


 

B.2

Campaign Sub-Title

Mandatory free-text tagline shown beneath the Campaign Name on all customer surfaces.

The primary value-proposition hook.

Example: 'Trade to win $10,000 in CRO'.

As a Campaign Manager, I want to write a sub-title so that customers immediately understand what the campaign offers without reading further.

Trying to activate without a Sub-Title shows 'Sub-Title is required.'

Sub-title is auto-saved as I type.

No character limit enforced in the form.

B.3

Campaign Code

Mandatory unique identifier(Automatically Generated) used by all downstream systems (volume engine, analytics, URLs, reporting).

Short, human-readable, alphanumeric. Example: 'CDC2026'.

Immutable after activation.
Not shown to end user- For internal use only

As a Campaign Manager, I want to assign a unique campaign code so that this campaign is unambiguously referenced in every system.

Trying to activate without a code shows 'Campaign Code is required.'

Entering a code that already exists shows: 'This campaign code already exists. Please choose a different code.'

After activation, the Campaign Code field is permanently locked — cannot be edited.

Alphanumeric input only; spaces and special characters are not accepted.

Auto-saved to draft as I type.

System Auto generates the code

Not shown to end user

B.4

Banner Image

Mandatory campaign hero visual. Three upload routes:

Drag-and-drop or click-to-upload (new file)

'Choose from Existing' — opens Payload CMS media library

Accepted formats: PNG, JPG, GIF,

As a Campaign Manager, I want to attach a banner image so that the campaign has a recognisable visual identity across all surfaces.

Trying to activate without a banner shows 'Banner image is required.' — activation blocked.

Uploading a non-image file shows: 'Only image files are accepted (PNG, JPG, GIF.

After selecting an image I see a thumbnail preview with filename and file size.

'Choose from Existing' opens media library modal; my selection is set as the banner.

 

 

 

 

 

 

SECTION C — FORM SECTION 2: DURATION

C.2

Start Time

 

Defines the exact UTC timestamp from which eligible trading volume begins counting toward the campaign leaderboard. Any trade that occurs before 00:00:01 UTC on the selected start date is excluded from all volume calculations, regardless of how close to midnight it was placed.
The time component is not configurable — all campaigns start at 00:00:01 UTC by system design. The Campaign Manager selects the start date only. The form clearly displays the resolved timestamp to the Campaign Manager as: "Competition starts: DD/MM/YYYY at 00:00:01 UTC" so there is no ambiguity about when volume counting begins.

As a Campaign Manager, I want to set a start time so that only volume traded during the competition window contributes to rankings.

•Trying to activate with Duration ON but no Start Date selected shows: 'Start Date is required.' — activation is blocked.
•The time field is not shown or editable — the system automatically applies 00:00:01 UTC as the start time for all campaigns.
•After selecting a start date, I see the resolved timestamp displayed below the field: "Competition starts: DD/MM/YYYY at 00:00:01 UTC" — I can clearly confirm the exact moment volume counting begins.
•After setting a Start Date, the Campaign Summary panel reflects it immediately in the format DD/MM/YYYY 00:00:01 UTC.
•The start timestamp is stored and transmitted in ISO 8601 UTC format: YYYY-MM-DDT00:00:01Z.


 

C.3

End Time

Functional Requirement
Mandatory date input (when Duration is ON). Campaigns always end at 23:59:59 UTC on the selected date. The time is fixed — the Campaign Manager selects the date only. The system automatically sets the time to 23:59:59 UTC.
Elaborative Details
Defines the exact UTC timestamp at which the competition closes and the leaderboard is finalised. Any trade that occurs after 23:59:59 UTC on the selected end date is excluded from all volume calculations. The leaderboard snapshot taken at 23:59:59 UTC is the authoritative final record used for prize distribution.
The time component is not configurable — all campaigns end at 23:59:59 UTC by system design. The Campaign Manager selects the end date only. The form clearly displays the resolved timestamp to the Campaign Manager as: "Competition ends: DD/MM/YYYY at 23:59:59 UTC" so there is no ambiguity about when volume counting stops.

As a Campaign Manager, I want to set an end time so that the competition has a clear close point for determining winners.

•Trying to activate with Duration ON but no End Date selected shows: 'End Date is required.' — activation is blocked.
•The time field is not shown or editable — the system automatically applies 23:59:59 UTC as the end time for all campaigns.
•After selecting an end date, I see the resolved timestamp displayed below the field: "Competition ends: DD/MM/YYYY at 23:59:59 UTC" — I can clearly confirm the exact moment volume counting stops.
•Setting an End Date that is the same as or earlier than the Start Date shows: 'End Date must be after Start Date.' — activation is blocked until corrected.
•After setting an End Date, the Campaign Summary panel shows the full campaign duration in the format: "DD/MM/YYYY 00:00:01 UTC → DD/MM/YYYY 23:59:59 UTC ([N] days)".
•The end timestamp is stored and transmitted in ISO 8601 UTC format: YYYY-MM-DDT23:59:59Z.

C.4

Custom Rule for Rolling X day Campaign Construct Type

Functional Requirement
When Rolling Average is selected as the Campaign Construct Secondary in Section 5, the system must validate that the campaign duration (End Date − Start Date) is an exact multiple of the Rolling Window Days value entered. If this condition is not met, the Campaign Manager must resolve the mismatch before activation.
Elaborative Details
The Rolling Average construct calculates each user's score as the average of their daily volume over a rolling window of X days. For the rolling cycles to complete fully with no partial window at the campaign's end, the total campaign duration in days must divide exactly by X with no remainder.
This validation is a cross-field rule that connects two separate parts of the form — the Duration fields in Section 2 (C.2 and C.3) and the Rolling Window Days input in Section 5 (F.8). The system must evaluate both fields together and surface the error in both locations so the Campaign Manager knows exactly where to make the correction.
Examples of valid combinations:

Rolling Window = 7 days → Campaign duration must be 7, 14, 21, 28 days, etc.
Rolling Window = 5 days → Campaign duration must be 5, 10, 15, 20 days, etc.
Rolling Window = 10 days → Campaign duration must be 10, 20, 30 days, etc.

 

As a Campaign Manager, I want the system to validate that my campaign duration is compatible with my chosen rolling window so that every rolling cycle completes fully and no partial window distorts the leaderboard rankings at the end of the campaign.

•This validation only applies when Rolling Average is selected as the Campaign Construct Secondary in Section 5 — it does not apply to any other construct type.
•The validation runs in real time whenever either the Start Date, End Date, or Rolling Window Days value is changed — the Campaign Manager does not need to wait until Activate to discover the error.
•If the campaign duration in days is not an exact multiple of the Rolling Window Days value, I see an inline validation error displayed in both Section 2 (below the End Date field) and Section 5 (below the Rolling Window Days input): "Campaign duration ([N] days) must be an exact multiple of the rolling window ([X] days). Please adjust either the campaign end date or the rolling window days."
•The error message includes the current campaign duration in days and the current rolling window value so I can calculate the correct combination without leaving the form.
•Activation is blocked until the campaign duration divides exactly by the rolling window with no remainder.
•When the mismatch is resolved — either by adjusting the End Date or the Rolling Window Days — the error message disappears immediately and both fields return to their normal state.
•A purple contextual info message is shown below the Rolling Window Days input in Section 5 whenever Rolling Average is selected, regardless of whether a validation error exists: "Rolling Average calculates the average volume over a rolling window of X days. The total campaign duration (End Date − Start Date) must be an exact multiple of X to ensure all rolling cycles complete fully. Example: a 7-day rolling window requires a campaign duration of 7, 14, 21, or 28 days. Adjust either the rolling window or the campaign duration to satisfy this rule."

SECTION D — FORM SECTION 3: PARTICIPATION MODE

D.1

Participation Mode Dropdown

Mandatory dropdown with two options:

Opt-In Required > Reveals Registration Dates sub-section— users must register during the registration window. Registration window can overlap with Start and end time of Campaign but cannot be greater that campaign end date. Volume counts from Start time of the Competition.

Automatic — all eligible users enrolled at Start Time and before End date of the campaign without action. Hides Registration Dates.

As a Campaign Manager, I want to choose whether users must opt in so that I can control the participation intent signal and the volume counting start point.

Trying to activate without a Participation Mode shows 'Participation Mode is required.'

Selecting 'Opt-In Required' immediately reveals Registration Opens and Registration Closes fields.

Switching to 'Automatic' hides the Registration Dates fields and clears any previously entered dates.

Opt-in > Join Now CTA on Front end selection appears in the Campaign Summary panel in real time and Campaign landing Page 

Automatic > No "Join Now" CTA. Show user in Campaign details page that Automatically all users are enrolled but if the user eligibility overrides automatic then show "Not eligibile" error message.


 

D.2

Registration Window (Opt-In only)

Two datetime fields shown only when 'Opt-In Required' is selected:

Registration Opens (may precede Campaign Start Time — pre-registration allowed)

Registration Closes → Cannot be greater than End time of Campaign 

Volume backdating rule: 
Registering before Start Time → volume counts from Start Time of Campaign. 
Registering/Joining Campaign after Start Time → volume counts from registration/Joining timestamp only (no backdating).

As a Campaign Manager, I want to define a registration window so that users have a bounded opt-in period and late joiners are excluded after the cutoff.

Registration Dates fields are only visible after selecting 'Opt-In Required'.

Setting Registration Closes after Campaign End Time shows a warning. "Registration end date cannot be Greater than Campaign end date.

Setting Registration Opens after Registration Closes shows: 'Registration Opens must be before Registration Closes.' — activation blocked.

Both fields are auto-saved as I set them.

 

 

 

 

 

 

SECTION E — FORM SECTION 4: USER ELIGIBILITY

E.1

User Group Selection

Mandatory dropdown with three options:

All Users — every registered exchange user (subject to country restrictions)

VIP User — only users at or above VIP tier threshold

Braze Segment — eligibility controlled by a specific Braze audience segment

All customers can see the campaign on Trading Arena. Eligibility check runs only at join-time (Opt-In > Join Now CTA) or Automatic.

Selecting 'Braze Segment' reveals the Custom Braze Segment dropdown and guidance message.

As a Campaign Manager, I want to select which users are eligible so that the campaign reaches the intended audience and excludes users it is not designed for.

Trying to activate without a User Group shows 'User Group is required.'

Selecting 'Braze Segment' reveals the Custom Segment dropdown and guidance message immediately.

Switching to 'All Users' or 'VIP User' hides and clears Braze fields automatically.

When users click "Join now CTA" or Eligibility Criteria is Automatic on the user eligibility is cross referenced with the user group


 

E.2

Custom Braze Segment (Conditional)

Dropdown visible only when 'Braze Segment' is selected in the User Group dropdown. Populated dynamically from the Braze integration with all available audience segments.
Segment membership is evaluated in conjunction with all other eligibility rules at join-time (Opt-In mode) or at Campaign Start Time (Automatic mode). Both checks must pass — a user must be a member of the selected Braze segment AND meet all other eligibility criteria (User Group, Country Restriction) to be enrolled.
Once a user is enrolled, their eligibility is locked for the full campaign duration. Changes made to the Braze segment after enrolment — whether adding or removing members — have no effect on already-enrolled participants during the Campaign Start Date to End Date window.

As a Campaign Manager, I want to select a specific Braze segment so that eligibility is controlled by a precise CRM audience definition that works alongside all other eligibility rules I have configured.

The Custom Braze Segment dropdown is only visible after I select 'Braze Segment' in the User Group dropdown — hidden for all other User Group options.
The dropdown is pre-populated with all available Braze segments — I do not need to type or enter segment IDs manually.
If the segment I select has 0 members, I see a warning: 'This segment currently has 0 members. Verify the segment definition in Braze before activating.' — this is a warning, not a hard block; I can still proceed.
Trying to activate with 'Braze Segment' selected but no segment chosen from the dropdown shows: 'Please select a Braze Segment.' — activation is blocked.
Once a user is enrolled in the campaign (at join-time or at Campaign Start Time), their enrolment status is permanently locked for the campaign duration. Any changes to the Braze segment membership during the campaign period — adding new users or removing existing ones — do not affect currently enrolled participants.

E.3

Braze Segment Guidance Message (Conditional)

An amber-background guidance message shown when 'Braze Segment' is selected.

Message: 'If your segment isn't showing in the dropdown, create it in Braze first — it will appear here automatically. Contact the Exchange CRM team for assistance.'

As a Campaign Manager, I want to be guided on the Braze segment process so that I can unblock myself without raising a support ticket.

The guidance message appears automatically when I select 'Braze Segment' — no hover or search needed.

The message disappears when I switch to a different User Group option.

E.4

Country Restrictions — Radio & Country List

Two radio buttons:

Whitelist countries — only listed countries eligible

Blacklist countries — listed countries excluded

Neither selected = no country restriction (global campaign)

Country determined by user's KYC-verified registered country after Logging in — Logged out state> by IP address.

Selecting either radio reveals a multi-select Country List dropdown.

As a Campaign Manager, I want to apply geographic restrictions so that the campaign complies with regional regulations and targets the correct markets.

Selecting either radio immediately reveals the country multi-select dropdown.

Dropdown label updates to match my selection ('Whitelist countries' / 'Blacklist countries').

Setting a restriction type but leaving the country list empty shows 'Please select at least one country.' on activation.

Neither radio selected = no restriction; country dropdown stays hidden.

Deselecting the radio clears all country selections automatically.

My selections are persisted to draft — returning later restores my country list.

.

 

 

 

 

 

 

SECTION F — FORM SECTION 5: CAMPAIGN CRITERIA & QUALIFICATION

Sub-Section 1 — Campaign Type

F.1

Campaign Type — Rank Based

Radio button. Phase 1 supports 'Rank Based' only — a competitive leaderboard where users are ranked by trading volume. Top performers win prizes.

Pre-selected by default. Future competition types (Individual Trading Competition, Team Trading Competition, Non Trading Volume Competition etc.) will be added in later phases.

As a Campaign Manager, I want to confirm the campaign type so that the system applies the correct ranking and prize distribution logic.

'Rank Based' is already selected when I open the form — no change needed for Phase 1 campaigns.

All Sub-Sections 2 and 3 are active and ready to configure immediately.

 

Sub-Section 2 — Eligible Trading Activity

F.2

Asset Type — Spot, Perps & Eligible Token Pairs

Three checkboxes defining which market segments contribute eligible volume:

-All Spot — when checked, all direct buy/sell activity across all available Spot trading pairs is included in the campaign's volume calculations.
-All Perps (Perpetuals) — when checked, all perpetual derivatives trading activity across all available Perps pairs is included in the campaign's volume calculations.
-Eligible Token Pairs (Spot and Perps)— when checked, a multi-select dropdown is revealed showing both Spot and Perps pairs together in a single searchable list. The Campaign Manager must select at least one pair from this dropdown. Only volume from the selected pairs counts toward the leaderboard — all other pairs are excluded.

At least one of the three checkboxes must always be checked. There is no default state where all pairs are automatically included — the Campaign Manager must make an explicit selection. If all three checkboxes are unchecked at any point, an error is shown immediately and activation is blocked.

As a Campaign Manager, I want to define which asset types and optionally which specific token pairs are eligible so that only the intended markets and pairs contribute to rankings.

•At least one of the three checkboxes — All Spot, All Perps, or Eligible Token Pairs — must always be selected. If none are checked at any point, I see an inline error immediately: 'At least one asset type or pair must be selected.' — activation is blocked until I check at least one option.
•If I uncheck all three checkboxes after having previously made a selection, the same error appears immediately without waiting for activation attempt.
•Checking 'Eligible Token Pairs' reveals a multi-select dropdown showing both Spot and Perps pairs together in a single searchable list.
•When 'Eligible Token Pairs' is checked but no pairs have been selected from the dropdown, I see an inline message directly below the dropdown: 'At least one pair needs to be selected.' — activation is blocked until at least one pair is chosen.
•A 'Clear All' button inside the token pairs dropdown removes all pair selections in one click. After clearing, the inline message 'At least one pair needs to be selected.' reappears immediately since the checkbox remains checked.
•I can select All Spot and All Perps simultaneously for a combined-market campaign.
•I can't check Eligible Token Pairs alongside All Spot, All Perps, or both
•Unchecking All Spot hides its corresponding Eligible Trade Type options (Spot: No Margin / Spot: Margin Allowed) and clears those selections automatically.
•Unchecking All Perps hides its corresponding Eligible Trade Type options (Perps: No Leverage / Perps: Leverage Allowed) and clears those selections automatically.
•If a previously selected pair is delisted before I activate, I see: 'Selected pair [X/Y] is no longer active on the exchange.'


 

F.3

Eligible Trade Types

Dynamic checkboxes based on selected asset types. The full available option set when both All Spot and All Perps are selected:

-All Trade Types — master checkbox; includes all trade types across all selected asset types. Overrides and disables all individual checkboxes.
-Spot: No Margin allowed — Cash trading only; borrowed funds excluded.
-Spot: Margin Allowed — Includes borrowed funds.
-Perps: No Leverage allowed — Spot-style perpetuals only.
-Perps: Leverage Allowed — Position size = margin × leverage.

-When only All Spot is selected, only the two Spot options appear. When only All Perps is selected, only the two Perps options appear.
-When both All Spot and All Perps are selected and 'All Trade Types' is not checked, at least one Spot option AND at least one Perps option must each be individually selected.

As a Campaign Manager, I want to specify which trade mechanics count toward volume so that the campaign incentivises the exact behaviour I intend to reward.

•Checking 'All Trade Types' immediately deselects and disables all individual trade type checkboxes — one checkbox covers everything across all selected asset types.
•Unchecking 'All Trade Types' re-enables all individual trade type checkboxes for manual selection.
•Spot trade type options (No Margin / Margin Allowed) only appear after All Spot is checked. Perps trade type options (No Leverage / Leverage Allowed) only appear after All Perps is checked.
•When both All Spot and All Perps are selected and 'All Trade Types' is NOT checked: at least one Spot option AND at least one Perps option must each be selected. Selecting only Spot options or only Perps options is not valid — the system shows: 'Please select at least one trade type for each selected asset type.'
•Trying to activate without at least one valid selection (or 'All Trade Types' checked) shows a validation error and blocks activation.

Sub-Section 3 — Volume Calculation & Ranking

F.4

Volume Calculation Basis

Mandatory dropdown. Defines how each eligible trade's notional value counts toward the user's competition score:

Total Eligible Volume — sum of all buy + sell notional

Taker Volume Only — liquidity-taking (market) orders only

Maker Volume Only — liquidity-providing (limit) orders only

Buy Volume Only — buy-side/long trades only

Sell Volume Only — sell-side/short trades only

Net Volume (Buy − Sell) — absolute difference; penalises wash trading

As a Campaign Manager, I want to define how trading volume is measured so that the leaderboard rewards the specific market behaviour I intend to incentivise.

Trying to activate without a selection shows 'Volume Calculation Basis is required.'

After selecting an option, a contextual helper description appears below explaining exactly how that method works.

.


 

F.5

Tie-Breaker Rules

Optional dropdown. When two or more participants share identical volume scores, tie-breakers determine ranking order.

Options (applied in priority order):

Highest Profit

Highest Number of Trades

Lowest Number of Trades

Lowest Drawdown

Highest Drawdown

If no tie-breaker configured and a tie occurs: tied users share the rank and split the prize equally.
Campaign Manager can choose only one drop down 
User should be shown on Front end if the Tie breaker rule is selected

As a Campaign Manager, I want to configure tie-breaker rules so that equal-score scenarios always produce a deterministic, fair outcome with no ambiguity in prize distribution.

I can leave this blank and still activate — tie-breakers are optional.

I can select only 1 rule;

Hovering the field shows tooltip: 'If two users have the same score, these rules determine their final ranking order.'

If no tie-breakers are set and a tie occurs, tied users share the rank and split the prize equally.

User should be shown on Campaign details page if the Tie breaker rule is selected

F.6

Configuration Guidance Banners (Blue & Green Info Boxes)

Blue info box (above Construct Type dropdown): static reminder — 'Configure how user rankings are calculated based on volume data. Select Campaign Construct Type first, then the metric.'

Green definition box (appears after valid Construct Type + Campaign Construct (Secondary) *are selected): dynamic plain-language description of the resulting competition mechanic. Updates automatically when Construct Type, Secondary, or Min Volume Qualification changes. Supports 21 named competition types.

As a Campaign Manager, I want to see a plain-language summary of the competition mechanic I am building so that I can verify my selections are correct before proceeding to the attributes and prize configuration.

I see the blue guidance banner above the Construct Type dropdown at all times as a configuration order reminder.

Once both Construct Type and Campaign Construct (Secondary) *


are selected, a green box appears with a plain-English description (e.g., 'Open Competition: All volume from Day 1 counts toward winning...').

The green box updates immediately on any change to Construct Type, Secondary, or Min Volume Qualification.

Selecting Proportional or Hybrid (Phase 1b) hides the green box — a 'Coming in a future phase' placeholder appears instead.

F.7

Campaign Construct Type (Primary — Distribution Model)

Mandatory dropdown:

✅ Phase 1a (available at launch):

Winner Take All — single winner gets 100% of prize pool

Top N Fixed — top N ranked users each get a fixed prize per rank

Top N Tiered — rank positions grouped into tiers; all users in a tier get the same reward

🔶 Phase 1b (future — placeholder only):

Proportional — prize ∝ volume share

Hybrid — top fixed prizes + proportional remainder

This selection filters options in the Construct (Secondary) dropdown.

As a Campaign Manager, I want to define the prize distribution model so that rewards are allocated according to the campaign's competitive structure and incentive design.

Trying to activate without a selection shows 'Campaign Construct Type is required.'

After selecting, an explanatory description appears below confirming how this distribution model works.

Selecting 'Proportional' or 'Hybrid' shows 'This option will be available in a future phase.' — Activate is disabled.

Changing Construct Type resets Campaign Construct (Secondary) and all downstream attribute fields.

F.8

Campaign Construct — Secondary (Ranking Dimension)

 

Mandatory dropdown filtered by the selected Construct Type. Defines how volume is aggregated over time for ranking.
Phase 1a (available at launch):

•Cumulative Total Volume — all volume sums across the full campaign period; no resets at any point.
•Daily Volume — volume resets to zero at 00:00 UTC each day; each UTC day is an independent mini-competition.
•Rolling Average — average volume calculated over a rolling window of X days, where X is a value from 1 up to the total number of campaign days (End Date − Start Date). The campaign duration in days must be an exact multiple of X to ensure every rolling cycle completes fully with no partial window at the end. For example: Rolling Window = 7 days → campaign duration must be 7, 14, 21, or 28 days. Rolling Window = 5 days → campaign duration must be 5, 10, 15, or 20 days. A contextual purple info message appears whenever Rolling •Average is selected to explain this constraint.
•Milestone Progress — sequential volume thresholds (M1 → M2 → … → MN) must be completed in order.

Purple info message (shown when Rolling Average is selected):
"Rolling Average calculates the average volume over a rolling window of X days. The total campaign duration (End Date − Start Date) must be an exact multiple of X to ensure all rolling cycles complete fully. Example: a 7-day rolling window requires a campaign duration of 7, 14, 21, or 28 days. Adjust either the rolling window or the campaign duration to satisfy this rule."

As a Campaign Manager, I want to define how volume is measured over time so that the competition rewards the intended trading behaviour pattern and every rolling cycle runs completely with no partial windows.

•The dropdown is greyed out until I have selected a Construct Type — I cannot configure it out of order.
•Available options automatically match my Construct Type — invalid combinations (e.g. Top N Fixed + Milestone) never appear in the list.
•Selecting 'Rolling Average' immediately shows a 'Rolling Window Days' input (minimum: 1 day; maximum: total campaign duration in days) AND a purple info message explaining the rolling window logic and the divisibility requirement.
•If the campaign duration in days is not an exact multiple of the Rolling Window Days value I enter, I see an inline validation error: 'Campaign duration ([N] days) must be an exact multiple of the rolling window ([X] days). Please adjust the rolling window or the campaign duration.' — activation is blocked until this is resolved.
•Selecting a Milestone variant shows a 'Number of Milestones' input; entering a count dynamically generates that many volume target fields (M1, M2… MN).
•Once both Primary and Secondary are selected, the green competition definition box updates immediately and the Attributes block appears below.
•Changing the Secondary construct clears all downstream attribute fields — I know I need to re-enter prize and ranking configuration.

F.9

Min Volume Qualification Gate

Optional toggle creating a two-phase competition:

Phase 1 (Qualify): user accumulates volume toward the threshold. This volume does NOT count toward their competitive rank.

Phase 2 (Compete): at threshold crossing, competitive score resets to zero; only post-threshold volume counts toward rank.

The reset-to-zero ensures all qualified users compete from the same baseline regardless of when they qualified.

Toggle ON → reveals 'Minimum Volume Required to Qualify' numeric input.

As a Campaign Manager, I want to optionally require a minimum volume bar before users can compete so that the leaderboard reflects only meaningfully engaged traders.

This toggle only appears after a valid Construct Type and Secondary are selected.

Turning toggle ON immediately reveals the 'Minimum Volume Required to Qualify' input.

Turning toggle OFF hides and clears the input automatically.

The green competition definition box updates immediately (e.g., 'Open Competition' → 'Qualified Competition').


 

F.10

Dynamic Attributes Block — Campaign Logic & Ranking

Dynamic form block rendered when a valid Construct Type + Secondary is selected.Common fields (all combinations): 

Min Volume Qualification (Yes/No), 

Min Volume to Qualify, 

Target Volume, 

Volume Aggregation Method (read-only), 

Prize Pool Type (read-only = Fixed), 

Prize Pool (Cash / Merchandise / Tokens / Other), 

Number of Winners, Milestone Progress.

Construct-specific fields:

WTA + Rolling: Rolling Window Days (1–X)

WTA + Milestone: Number of Milestones → M1…MN volume targets (ascending required)

Top N Fixed: Number of Ranks N → N prize table rows (Rank, Volume Target, Cash, Merch, Tokens, Other)

Top N Tiered: Number of Tiers → tier rows (From Rank, To Rank, prize columns)

WTA + Milestone Race: first to final milestone wins immediately; campaign does not wait for End Time

As a Campaign Manager, I want to configure all prize pool and ranking parameters so that the system has everything needed to execute the competition and distribute prizes correctly.

The Attributes block only appears after both Construct Type and Secondary are selected.

Changing either construct resets and re-renders the block — I know to re-enter prize configuration.

Volume Aggregation Method and Prize Pool Type are pre-filled (read-only).

For Winner Take All, Number of Winners is locked to 1.

Entering Number of Ranks N generates that many prize table rows automatically.

Milestone volume targets must be ascending; entering a later milestone ≤ earlier one shows: 'Milestone targets must be in ascending order.'

At least one prize field (Cash/Tokens/Merchandise/Other) must be populated — activation blocked if all are empty.

All attribute values are auto-saved as I type.

 

 

 

 

 

 

SECTION G — FORM SECTION 6: USER DISPLAY TEMPLATE

G.1

Auto-Resolved Display Template

The Display Template is automatically determined from Section 5: Construct Type + Secondary + Qualification state.

Template variants — one per valid construct combination.

Examples:

'Winner Takes All — Cumulative Total Volume (Open)'

'Top N Tiered — Rolling Average (Qualified)'

'Top N Fixed — Milestone Progress'

Campaign Manager cannot add additional fields to it, Can only Update the template.

Locked state (before Section 5 complete): '🔒 Complete Campaign Construct Type & Secondary in Card 5 first'

Resolved state: template name + 'AUTO-SELECTED' badge

Changing Section 5 constructs resets this field and clears all payload values.

As a Campaign Manager, I want the display template to be automatically matched to my competition configuration so that the correct customer-facing page layout is always applied with no risk of mismatch.

Before completing both Section 5 construct selections, I see the locked placeholder — I know exactly what I need to do.

After completing Section 5 constructs, this section auto-updates with the resolved template name and 'AUTO-SELECTED' badge — I did not select it myself.

I cannot override the template and add new fields to templates, i can only update the existing template with the values and camoaign specific information protecting against layout/mechanic mismatches.

Changing Section 5 constructs resets this section and clears payload fields — I know I need to refill copy.

Incomplete Section 5 at activation time blocks activation with a prompt to complete Section 5 first.


 

G.2

Template Payload Fields — Display Copy Configuration

Contextual payload panel rendered after template resolution. Up to 4 sections shown conditionally:

Section A — Display Copy (ALL templates):

Campaign Banner Headline

Sub-header Text

CTA Button Label (default: 'Join Now')

Prize Display Label (default: 'Total Prize Pool')

Section B — Qualification Gate Display (QUALIFIED templates only):

Qualification Gate Label (default: 'Volume needed to qualify')

Qualified Status Badge Text (default: 'Qualified ✓')

Not-Yet-Qualified Prompt (default: 'Keep trading to unlock the leaderboard')

Section C — Leaderboard Display (NON-MILESTONE templates):

Leaderboard Title, Score Display Format, Rank/Volume/Prize Column Headers

Tiered templates also: Tier Badge Label Prefix (default: 'Tier')

Section D — Milestone Progress Display (MILESTONE templates only):

Progress Bar Label

Milestone Unlock Message ({n} placeholder = milestone number at runtime)

All Milestones Completed Message

As a Campaign Manager, I want to customise the copy within the auto-selected template so that each campaign has its own messaging, tone, and labelling.

The payload panel only appears after the template is resolved.

All fields have sensible defaults pre-filled — I can activate without changing anything.

I only see Section B (Qualification Gate) for qualified competition templates.

I only see Section C (Leaderboard) for non-milestone templates; Section D (Milestone) for milestone templates.

In Section D, a helper note explains: 'Use {n} for the milestone number (e.g., Milestone {n} Unlocked!)'

All payload edits are auto-saved as I type.

Clicking Preview immediately shows my current payload copy values rendered on the campaign page.

 

 

 

 

 

 

SECTION H — FORM SECTION 7: DISPLAY & TERMS

H.1

Terms & Conditions

Mandatory multi-line textarea. Each line = one numbered rule in the 'Rules' tab on the customer-facing campaign page.

Campaign cannot be activated without T&Cs.

When a user joins, their acceptance is logged (user ID + timestamp + T&C version hash) as the legal consent record.

T&Cs must accurately reflect mechanics configured in Section 5 — the system does NOT auto-generate T&Cs from the construct configuration.

As a Campaign Manager, I want to enter the campaign T&Cs as bullet points so that customers are clearly informed of all competition rules and legal terms before participating.

Trying to activate without T&Cs shows 'Terms & Conditions are required.' — activation blocked.

Helper text: 'Enter each term or condition as a separate bullet point (one per line).'

T&Cs are auto-saved as I type.

I am responsible for ensuring T&Cs accurately reflect the Section 5 mechanics — the system does not validate content alignment.

The textarea expands as I add more lines — not limited to a fixed number of rules.


 

H.2

FAQ

Optional multi-line textarea for Q&A pairs.

Renders as an expandable accordion in the 'Rules' tab of the customer-facing campaign page.

If left empty, the FAQ section is not shown on the customer-facing page.

As a Campaign Manager, I want to add FAQs to the campaign so that customers can self-serve answers, reducing inbound support ticket volume.

I can activate without FAQ — this field is optional.

If FAQ is blank, the FAQ accordion section is completely hidden from customers — no empty placeholder visible.

Free-text format, one Q&A pair per line.

FAQ is auto-saved as I type.

 

 

 

 

 

 

SECTION I — FORM ACTIONS: SAVE DRAFT, PREVIEW & ACTIVATE

I.1

Draft Auto-Save (Continuous, Silent)

All form state is automatically persisted to the Payload CMS database record on every field change — not just browser localStorage.

Drafts are device-agnostic: accessible from any browser or device.

Auto-save is silent — no indicators or interruptions.

As a Campaign Manager, I want my configuration to be continuously saved so that I never lose work due to browser crash, accidental navigation, or session timeout.

As I fill in any field, my work is automatically saved — no save button needed.

Closing the browser and reopening the draft restores all previously entered values exactly.

Switching to a different device and opening the same draft shows all my entries — not tied to a single browser session.

 

I.2

Save Draft Button

Explicit 'Save Draft' button providing a confirmed save checkpoint. Shown at the bottom of the form alongside Preview and Activate.

As a Campaign Manager, I want to explicitly save a draft so that I have a confirmed checkpoint before taking a break or handing off to a colleague.

'Save Draft' button is visible at the bottom of the form at all times.

After clicking, I see a confirmation banner: 'Draft saved successfully.' — auto-dismisses after 3 seconds.

The campaign remains in Draft status — Save Draft does not activate it.

 

I.3

Preview Campaign (End-User Campaign View)

A 'Preview' button opens a full-screen modal labelled 'End User Preview' that renders the complete customer-facing campaign page from the current form state.

Preview modal structure:

Hero section: Campaign Name, Sub-Title, countdown timer, CTA button (disabled in preview)

Tabs: Leaderboard | Rewards | How to Participate | Rules

Live leaderboard mock with disclaimer

Rewards panel, step-by-step participation guide, Rules/FAQ

No save required before previewing. Missing fields show placeholder text.

As a Campaign Manager, I want to preview the campaign exactly as a customer would see it so that I can validate all content, copy, and layout before activating.

I can click 'Preview' at any point — no save required first.

The preview opens in a full-screen modal with an 'End User Preview' label.

I can see the hero section with my Campaign Name, Sub-Title, countdown timer, and CTA button.

I can navigate all tabs: Leaderboard, Rewards, How to Participate, Rules.

The leaderboard shows mock data with disclaimer: 'Leaderboard data shown is illustrative mock data for preview purposes.'

Missing fields show placeholder text — I can still check layout on an incomplete campaign.

Closing the modal returns me to exactly where I was in the form with no changes made.

 

I.4

Activate Campaign — Validation & Campaign Generation

The 'Activate' button triggers full validation across all 7 sections. On pass: campaign JSON is generated and the campaign is pushed live.

Required field validation:

Section 1: Name, Sub-Title, Code (unique), Banner

Section 2: Start + End Time (if Duration ON)

Section 3: Participation Mode; Registration dates (if Opt-In)

Section 4: User Group; Braze Segment (if Braze mode); Country list (if restriction set)

Section 5: Asset type ≥1, Trade Type ≥1 or All Types, Volume Basis, Construct Type (not Phase 1b), Construct Secondary, Prize Pool ≥1 populated, Milestones ascending (if applicable)

Section 6: Template resolved

Section 7: T&Cs

Post-activation: Campaign Code immutable. Construct Type and Secondary locked on Active campaigns.

As a Campaign Manager, I want to activate only when every required section is complete and valid so that I can be confident the competition will run exactly as I configured it.

Clicking Activate validates all required fields across all 7 sections simultaneously — I see all errors at once.

Each error is shown inline next to the relevant field — I know exactly where to fix issues.

The page scrolls to the first validation error automatically.

After fixing all errors and clicking Activate again, I see: 'Campaign [Name] has been activated successfully.'

Future Start Time → status changes to 'Scheduled'. Past Start Time → directly 'Active'.

After activation, the Campaign Code field is permanently greyed out.

I understand activating generates the complete campaign template that customers see on Trading Arena.

 

I.6

Schedule Campaign — Validation & Campaign Generation

 

 

 

 

 

 

 

 

 

 

SECTION J — SYSTEM & GLOBAL REQUIREMENTS

J.2

Leaderboard Refresh Cadence

The leaderboard updates every hour on the hour (e.g., 4:00pm UTC, 5:00pm UTC, 6:00pm UTC).


As a Campaign Manager, I want to communicate to customers how frequently the leaderboard updates so that they understand the cadence and trust the rankings they see.

When configuring the campaign T&Cs and FAQ, I include the leaderboard refresh cadence for customer transparency.

I understand the leaderboard updates every hour on the hour — I reflect this in campaign communications.

Engineering implements hourly scheduled refresh aligned with this confirmed cadence.

 

J.3

Permissions & Access Control

Role-based access control:

Campaign Manager — create, edit, preview, save draft, clone, activate

Viewer — read-only access; cannot create, edit, or activate

Admin — all Campaign Manager permissions + deactivate active campaigns

All create, edit, activate, and deactivate actions logged with actor user ID and timestamp in Payload CMS audit log.

As a Campaign Manager, I want to know that only authorised team members can create and publish campaigns so that trading competitions are controlled and auditable.

I can create, configure, and activate campaigns using my Campaign Manager account.

A colleague with Viewer access cannot activate or edit — Activate is disabled or absent from their view.

I can see in the audit trail which team member last changed or activated a campaign.

If my session times out mid-form, my draft is auto-saved before expiry — I do not lose work.

 

Module 2 —  Customer-Facing Trading Arena V2 (To be Written) 
Resolved Decisions
REQ-D1 — Prize Distribution is Manual in Phase 1 

Prize distribution in Phase 1 is a fully manual process. There is no automated reward calculation, CSV generation, or payment trigger in scope. After a campaign ends, the Campaign Manager is responsible for reviewing the final leaderboard and coordinating prize distribution with the Finance team manually. No engineering automation is required for this step in Phase 1.

REQ-D2 — No Approval Workflow Required for Campaign Activation

Campaign Managers can activate campaigns directly without requiring sign-off from Legal, Senior PM, or any other approval gate in Phase 1. The Activate button triggers validation and immediate publication upon passing all field checks. An approval workflow gate may be introduced in a future phase as the platform scales and campaign volumes increase.

REQ-D3 — Leaderboard Refresh Cadence is Hourly on the Hour 

The leaderboard must refresh every hour on the hour — for example at 4:00pm UTC, 5:00pm UTC, 6:00pm UTC, and so on. This replaces the legacy system's approximate 30-minute cadence. Engineering must implement a scheduled hourly refresh job aligned to the top of each UTC hour. Campaign T&Cs and FAQ copy should reflect this cadence when communicating leaderboard update frequency to customers.

REQ-D5 — Same Campaign Form Extended for Phase 2 Non-Trading Campaigns and beyond

Phase 2 non-trading volume campaigns will use the same 7-section Campaign Manager form rather than a separate tool. The form structure and section flow remain identical across phases; only the conditions, field visibility rules, and validation logic within relevant sections differ for non-trading campaign types. The Phase 1 Payload CMS schema must therefore be designed as extensible from day one to accommodate Phase 2 field additions without requiring a schema migration.

REQ-D7 — No Historical Data Migration from Legacy Trading Arena 

Legacy Trading Arena campaign data — including participant records, historical leaderboard rankings, and prize distribution records — will not be migrated to the new Payload CMS system. Legacy data remains accessible in the legacy system until that system is decommissioned.

CRM Needs (Draft)
CRM Braze Parameters for Email and in App triggering 
@Kimberly Tan to provide the Braze Parameter for @Ashwin Irappa to write the the User stories 
