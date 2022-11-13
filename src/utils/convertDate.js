function convertDate(timestamp) {
  if (!timestamp) return '--/--';

  const d = new Date(timestamp);
  const monthStrs = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${monthStrs[d.getMonth()]} ${d.getDate()}`;
}
