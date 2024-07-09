export const dateFromTimestamp = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

const MLA_MONTHS = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'June',
  'July',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.'
];

export const mlaDateFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getDate()} ${
    MLA_MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const apaDateFromTimestamp = (timestamp: number) => {
  const normal = dateFromTimestamp(timestamp);
  return normal.split(', ').reverse().join(', ');
};
