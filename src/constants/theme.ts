export const Colors = {
  // Background gradient tones
  bgDark: '#0a2e2a',
  bgMid: '#0d3b35',
  bgLight: '#0f4a42',
  bgCard: '#0e3d36',
  bgCardLight: '#145a4f',

  // Teal / green accent
  primary: '#2dd4bf',       // teal-400
  primaryDark: '#0f766e',   // teal-700
  primaryDeep: '#134e4a',   // teal-900

  // Text
  textWhite: '#ffffff',
  textMuted: '#a0c4bf',
  textSubtle: '#6dada5',

  // Risk
  riskHigh: '#ef4444',      // red-500
  riskBar: '#1a5c53',

  // Amounts
  amountGreen: '#4ade80',   // green-400

  // Tab active
  tabActive: '#2dd4bf',
  tabInactive: '#4d8a82',

  // Nav bar
  navBg: '#071e1b',
  navBorder: '#133d37',
};

export const MOCK_USER = {
  name: 'Rahul',
};

export const MOCK_EARNINGS = {
  expected: '₹900.00',
  today: '₹500.40',
};

export const MOCK_RISK = {
  score: 72,
  label: '72% - HIGH RISK',
  message: 'Next 3 Hours: High Disruption Probability',
};

export const MOCK_PROTECTION = {
  plan: '₹35/week',
  protectedAmount: '₹650.40',
  potentialLoss: '₹400.60',
};

export const MOCK_ACTIVITIES = [
  {
    id: '1',
    icon: 'rainy',
    title: 'Heavy Rain Claim',
    subtitle: 'Today, 3:30 PM',
    amount: '+₹400',
  },
  {
    id: '2',
    icon: 'cloud',
    title: 'High AQI Claim',
    subtitle: 'Yesterday, 6:40 PM',
    amount: '+₹370',
  },
];

export const TABS = ['Today', 'This Week', 'This Month'];
