export const SIMULATION_STEPS = [
  { id: '1', label: 'Rain Detected',         icon: 'rainy-outline' },
  { id: '2', label: 'Risk Threshold Crossed', icon: 'alert-circle-outline' },
  { id: '3', label: 'Worker Active',          icon: 'person-circle-outline' },
  { id: '4', label: 'Claim Triggered',        icon: 'checkmark-circle-outline' },
];

export const SIMULATION_TIMING = {
  stepDelay: 1200,     // ms between each step appearing
  claimDelay: 600,     // ms after last step before navigating to claim
  successDelay: 2200,  // ms to show claim screen before going to success
};

export const MOCK_CLAIM = {
  expectedEarnings: '₹900',
  actualEarnings:   '₹500',
  loss:             '₹400',
  payout:           '₹400',
};

export const SIM_COLORS = {
  gradientTop:    '#10B981',
  gradientBottom: '#059669',
  card:           'rgba(255,255,255,0.2)',
  cardBorder:     '#ffffff',
  stepActive:     '#ffffff',
  stepBorder:     '#ffffff',
  checkGreen:     '#ffffff',
  textWhite:      '#ffffff',
  textMuted:      '#d1fae5',
  primary:        '#ffffff',
  successBg:      '#10B981',
  successPulse:   '#ffffff',
  claimBg:        '#ffffff',
  claimBox:       '#f0fdf4',
  claimText:      '#065f46',
};
