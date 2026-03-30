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
  gradientTop:    '#0a2e2a',
  gradientBottom: '#0f4a42',
  card:           '#0e3d36',
  cardBorder:     '#0f766e',
  stepActive:     '#14532d',
  stepBorder:     '#166534',
  checkGreen:     '#4ade80',
  textWhite:      '#ffffff',
  textMuted:      '#a0c4bf',
  primary:        '#2dd4bf',
  successBg:      '#064e3b',
  successPulse:   '#2dd4bf',
  claimBg:        '#f0fdf4',
  claimBox:       '#dcfce7',
  claimText:      '#14532d',
};
