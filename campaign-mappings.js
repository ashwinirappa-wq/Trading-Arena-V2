/**
 * Campaign Configuration Mappings
 * Defines how Campaign Construct + Campaign Construct Type drive downstream config.
 * Use this to auto-populate fields when user selects combinations.
 */

const CAMPAIGN_MAPPINGS = {
  // Campaign Construct → Aggregation Method
  construct: {
    cumulative: {
      aggregationMethods: [
        { value: 'sum', label: 'Sum' },
        { value: 'average', label: 'Average' },
        { value: 'maxsingleday', label: 'Max Single Day' }
      ],
      defaultAggregation: 'sum',
      showRollingWindow: false,
      showHybridWeights: false,
      timeWindow: 'Entire campaign period'
    },
    daily: {
      aggregationMethods: [
        { value: 'bestsingleday', label: 'Best Single Day' },
        { value: 'averageofalldays', label: 'Average of All Days' },
        { value: 'consecutivedays', label: 'Consecutive Days' }
      ],
      defaultAggregation: 'bestsingleday',
      showRollingWindow: false,
      showHybridWeights: false,
      timeWindow: 'Fixed 24-hour periods'
    },
    rolling: {
      aggregationMethods: [{ value: 'average', label: 'Average' }],
      defaultAggregation: 'average',
      aggregationDisabled: true,
      showRollingWindow: true,
      rollingWindowDefault: 7,
      showHybridWeights: false,
      timeWindow: 'Configurable N-day sliding window'
    },
    milestone: {
      aggregationMethods: [{ value: 'sum', label: 'Sum' }],
      defaultAggregation: 'sum',
      aggregationDisabled: true,
      showRollingWindow: false,
      showHybridWeights: false,
      timeWindow: 'N/A - milestone-based'
    },
    hybrid: {
      aggregationMethods: [{ value: 'weighted', label: 'Weighted Score' }],
      defaultAggregation: 'weighted',
      aggregationDisabled: true,
      showRollingWindow: false,
      showHybridWeights: true,
      timeWindow: 'Entire campaign period'
    }
  },

  // Campaign Construct Type → Prize Pool & Distribution Config
  constructType: {
    'winner-take-all': {
      prizePoolTypes: [{ value: 'Fixed', label: 'Fixed' }],
      defaultPrizePoolType: 'Fixed',
      prizePoolTypeDisabled: true,
      showBasePrizePool: true,
      showNumWinners: false,
      showFeePercentage: false,
      showTierConfig: false,
      showFixedPrizeRanks: false,
      showFixedAllocation: false,
      showMinVolumePayout: false,
      rewardTemplate: 'single', // 1 row
      rewardTableColumns: ['rank', 'rewardType']
    },
    'top-n': {
      prizePoolTypes: [
        { value: 'Fixed', label: 'Fixed' },
        { value: 'Dynamic', label: 'Dynamic' }
      ],
      defaultPrizePoolType: 'Fixed',
      showBasePrizePool: true,
      hideBasePrizePoolWhen: 'Dynamic',
      showNumWinners: true,
      numWinnersDefault: 10,
      showFeePercentage: false,
      showTierConfig: false,
      showFixedPrizeRanks: false,
      showFixedAllocation: false,
      showMinVolumePayout: false,
      rewardTemplate: 'topN',
      rewardTableColumns: ['rank', 'minVolume', 'rewardType', 'description']
    },
    tiered: {
      prizePoolTypes: [
        { value: 'Fixed', label: 'Fixed' },
        { value: 'Dynamic', label: 'Dynamic' },
        { value: 'Tiered Unlock', label: 'Tiered Unlock' }
      ],
      defaultPrizePoolType: 'Fixed',
      showBasePrizePool: true,
      showNumWinners: false,
      showFeePercentage: false,
      showTierConfig: true,
      showFixedPrizeRanks: false,
      showFixedAllocation: false,
      showMinVolumePayout: false,
      rewardTemplate: 'tiered',
      rewardTableColumns: ['tierName', 'fromRank', 'toRank', 'minVolume', 'rewardType']
    },
    proportional: {
      prizePoolTypes: [
        { value: 'Fixed', label: 'Fixed' },
        { value: 'Percentage of Fees', label: 'Percentage of Fees' }
      ],
      defaultPrizePoolType: 'Fixed',
      showBasePrizePool: true,
      hideBasePrizePoolWhen: 'Percentage of Fees',
      showNumWinners: false,
      showFeePercentage: true,
      showTierConfig: false,
      showFixedPrizeRanks: false,
      showFixedAllocation: false,
      showMinVolumePayout: true,
      rewardTemplate: 'proportional',
      rewardTableColumns: ['formula', 'rewardType']
    },
    hybrid: {
      prizePoolTypes: [
        { value: 'Fixed', label: 'Fixed' },
        { value: 'Dynamic', label: 'Dynamic' }
      ],
      defaultPrizePoolType: 'Fixed',
      showBasePrizePool: true,
      showNumWinners: false,
      showFeePercentage: false,
      showTierConfig: false,
      showFixedPrizeRanks: true,
      showFixedAllocation: true,
      showMinVolumePayout: false,
      rewardTemplate: 'hybrid',
      rewardTableColumns: ['fixedSection', 'proportionalSection']
    }
  },

  // Volume Calculation Basis (independent - applies to all)
  volumeCalculationBasis: [
    { value: 'total', label: 'Total Eligible Volume' },
    { value: 'taker', label: 'Taker Volume Only' },
    { value: 'maker', label: 'Maker Volume Only' },
    { value: 'buy', label: 'Buy Volume Only' },
    { value: 'sell', label: 'Sell Volume Only' },
    { value: 'net', label: 'Net Volume (Buy - Sell, absolute value)' }
  ]
};

/**
 * Get config for a Campaign Construct selection
 */
function getConstructConfig(constructValue) {
  return CAMPAIGN_MAPPINGS.construct[constructValue] || null;
}

/**
 * Get config for a Campaign Construct Type selection
 */
function getConstructTypeConfig(typeValue) {
  return CAMPAIGN_MAPPINGS.constructType[typeValue] || null;
}

/**
 * Get aggregation method options for a construct
 */
function getAggregationOptions(constructValue) {
  const config = getConstructConfig(constructValue);
  return config?.aggregationMethods || [];
}

/**
 * Get prize pool type options for a construct type
 */
function getPrizePoolTypeOptions(constructTypeValue) {
  const config = getConstructTypeConfig(constructTypeValue);
  return config?.prizePoolTypes || [];
}
