const POINT_COUNT = 2;
const DATE_FORMAT = 'DD/MM/YY HH:mm';
const SHORT_DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const CITY_NAMES = ['Moscow', 'st.Petersburg', 'Rostov'];
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};
export { SortType, Mode, FilterType, CITY_NAMES, EVENT_TYPES, POINT_COUNT, DATE_FORMAT, SHORT_DATE_FORMAT, TIME_FORMAT};
