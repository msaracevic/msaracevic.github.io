import moment from 'moment';

export function duration(start, end) {
  if (end === 'Present') end = moment();
  const duration = moment(end, 'MMMM YYYY').diff(moment(start, 'MMMM YYYY'), 'months') + 1;
  let result;

  if (duration > 12) {
    const years  = Math.floor(duration / 12),
          months = duration - (years * 12);

    result = `${years} ${years === 1 ? 'year' : 'years' } 
              and ${months} ${months === 1 ? 'month' : 'months' }`;
  } else {
    result = `${duration} ${duration === 1 ? 'month' : 'months'}`;
  }

  return result;
}
