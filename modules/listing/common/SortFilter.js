export const SORT_BY_ARRAY = ['Price - low to high', 'Price - high to low'];

export const SORT_BY = [
  {
    label: 'Price - low to high',
    value: 'listing_cost.cost',
    sortBy: 'asc'
  },
  {
    label: 'Price - high to low',
    value: 'listing_cost.cost',
    sortBy: 'desc'
  },
  {
    label: 'Is Featured',
    value: 'listing_flag.isFeatured',
    sortBy: 'desc'
  },
  {
    label: 'Is New',
    value: 'listing_flag.isNew',
    sortBy: 'desc'
  }
];
