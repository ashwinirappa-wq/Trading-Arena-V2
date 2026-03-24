# Campaign Configuration Mappings

This document defines how **Standard Distribution Archetype** (primary) and **Campaign Construct** (secondary) drive downstream configurations. The user selects **Standard Distribution Archetype first** (Winner Takes All, Top N Fixed, Top N Tiered), then **Campaign Construct** (the volume metric: Cumulative Total, Daily, Rolling Average, Milestone, etc.). The Construct options are filtered by the selected Archetype.

**Invalid combinations:** Top N Fixed + Milestone Tiered Unlock is not supported.

---

## 1. Flow Order

1. **Volume Calculation Basis** (unchanged — independent first selection)
2. **Standard Distribution Archetype (Primary)** — e.g., Winner Takes All, Top N Fixed, Top N Tiered
3. **Campaign Construct (Secondary)** — e.g., Cumulative Total, Daily, Rolling Average, Milestone; options depend on Archetype
4. **Min Volume Qualification Toggle** — enable/disable volume threshold gate
5. **Minimum Trading Volume to Qualify** (when toggle enabled)
6. **Aggregation Method**, **Rolling Window** (driven by Construct)
7. **Distribution Config** — Prize Pool Type, Base Prize Pool, Number of Winners, etc.
8. **Reward Template** (Card 7 — Reward Tiers)

---

## 2. Standard Distribution Archetype → Campaign Construct Options

| Standard Distribution Archetype | Campaign Construct Options |
|--------------------------------|---------------------------|
| Winner Takes All | Cumulative Total, Daily, Rolling Average, Milestone Tiered Unlock |
| Top N Fixed | Cumulative Total, Daily, Rolling Average, Threshold Competition *(no Milestone — invalid)* |
| Top N Tiered | Cumulative Total, Daily, Rolling Average, Milestone Progress |

---

## 3. Full Configuration Matrix (Sub-Section 3)

Columns (after Volume Calculation Basis):

| Standard Distribution Archetype | Campaign Construct | Aggregation Method | Prize Pool Type | Number of Winners | **Milestone Configuration (Number & Targets)** | Volume Calculation Logic | Ranking Method | Distribution Logic |
|--------------------------------|-------------------|--------------------|-----------------|-------------------|------------------------------------------------|--------------------------|----------------|-------------------|
| Winner Takes All | Cumulative Total | Sum (Total Period) or with Gate | Fixed | 1 (Single Winner) | N/A | Total cumulative / Two-phase with gate | Highest Total Volume | 100% to Rank 1 |
| Winner Takes All | Daily | Best Single Day or with Daily Minimum | Fixed | 1 per day | N/A | Highest 24h per day / Daily with threshold | Daily Highest Volume | 100% to daily winner |
| Winner Takes All | Rolling Average | Rolling X-Day Average (with/without gate) | Fixed | 1 | N/A | X-day average from all data or post-gate | Highest X-Day Average | 100% to Rank 1 |
| Winner Takes All | Milestone Tiered Unlock | Sum (Race to Final Milestone) | Fixed (Unlock) | 1 (First to reach final milestone) | **Number of Milestones: 1–N** → User selects count, then defines volume target for each (M1, M2... MN). First to complete final milestone wins. | Cumulative progress through milestones sequentially | First to complete final milestone wins (Race mechanic) | 100% to first achiever |
| Top N Fixed | Cumulative Total | Sum (Total Period) or with Gate | Fixed | N (Configurable) | N/A | Total cumulative / Two-phase | Top N by Total Volume | Fixed per rank |
| Top N Fixed | Daily | Best Single Day or with Daily Gate | Fixed | N per day | N/A | Daily top N / Daily with threshold | Daily Top N | Fixed per rank |
| Top N Fixed | Rolling Average | Rolling X-Day Average (with/without gate) | Fixed | N | N/A | X-day average | Top N by X-Day Average | Fixed per rank |
| Top N Fixed | Threshold Competition | Sum (Must Clear Threshold) | Fixed | N (from clearers) | N/A | Cumulative toward $X; once cleared, ranked by total | Top N among clearers | Fixed per rank |
| Top N Fixed | Milestone Tiered Unlock | *Invalid* | *Invalid* | *Invalid* | N/A | Invalid: Top N requires competitive ranking; Milestones are progressive unlock | Invalid | Invalid |
| Top N Tiered | Cumulative Total, Daily, Rolling, Milestone | (See Attributes) | Fixed | N (Configurable) | Per construct | Rank-based tiers with tier rewards | Top N by tier | Fixed per tier |

---

## 3.1 Milestone Configuration (Tiered Unlock) — When Shown

**Tiered Unlock is a progression mechanic** tied to Milestone Tiered Unlock—it does not belong under Prize Pool Type. It appears in the Milestone Configuration section when Campaign Construct = Milestone Tiered Unlock (or Volume-Gate mode for Tiered Cumulative/Daily).

**Pattern:** User enters *Number of Milestones* (free numeric field, 1–50) first, then the system dynamically generates Volume Target 1, Volume Target 2, Volume Target 3... and so on.

**Reward eligibility:** Reward becomes eligible only when **ALL tiers are completed** (unless partial milestone rewards are explicitly designed as a different logic).

| Combination | Milestone Configuration | Example Defaults |
|-------------|--------------------------|------------------|
| Winner Takes All + Milestone Tiered Unlock | Number of Milestones (1–N) → M1, M2... MN volume targets. First to complete final milestone wins. | M1: $100K, M2: $300K, M3: $600K, M4: $1M |
| Top N Tiered + Milestone | Number of Milestones → Community aggregate target per milestone. First N tiered traders to complete final milestone win. | M1: $1B, M2: $5B, M3: $10B |
| Top N + Milestone | Invalid combination | — |

---

## 4. Volume Calculation Basis (Independent)

Selected first; applies to all constructs:

- Total Eligible Volume
- Taker Volume Only
- Maker Volume Only
- Buy Volume Only
- Sell Volume Only
- Net Volume (Buy − Sell, abs)

---

## 5. Auto-Population Flow

```
User selects: Campaign Construct Type (e.g., Winner Take All)
    ↓
System filters: Campaign Construct options (Cumulative Total, Daily, Rolling Average, Milestone Tiered Unlock)
    ↓
User selects: Campaign Construct (e.g., Cumulative Total)
    ↓
System sets: Aggregation Method options, Rolling Window (if Rolling Average)
System sets: Prize Pool Type, Distribution config (Base Prize Pool, N, etc.)
System generates: Reward Tiers template structure
    ↓
User configures: Min Volume Qualification Toggle (optional)
    ↓
If enabled: Minimum Trading Volume field shown; Min Volume column in Reward Tiers becomes mandatory
    ↓
System generates: Dynamic message summarizing config
```

---

## 6. Field Dependency Matrix

| Downstream Field | Driven By | Behavior |
|------------------|-----------|----------|
| Campaign Construct options | Campaign Construct Type | Filtered list per type |
| Aggregation Method | Campaign Construct | Options or fixed based on construct |
| Rolling Window Days | Campaign Construct = Rolling Average | Show input (1–90) |
| Prize Pool Type | Campaign Construct Type | Fixed, Dynamic (Tiered Unlock lives in Milestone Configuration, not Prize Pool) |
| Base Prize Pool | Construct Type + Prize Pool Type | Show if Fixed; hide if Dynamic |
| Number of Winners N | Construct Type = Top N Fixed | Show; required |
| Reward Tiers Table | Campaign Construct Type + Construct | Structure varies |
| Min Volume column | Qualification toggle enabled | Add column; make mandatory |

---

## 7. Implementation Checklist

- [x] Campaign Construct Type selected first
- [x] Campaign Construct options filtered by Construct Type
- [x] Min Volume Qualification Toggle to enable/disable gate
- [x] On Construct change: update Aggregation Method, Rolling Window
- [x] On Construct Type change: update Prize Pool Type, distribution config, Reward Tiers
- [x] On qualification toggle: show/hide Min Volume field; update Reward Tiers
- [x] Dynamic message updates on any config change
