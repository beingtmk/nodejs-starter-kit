import { CANCELLED } from '@gqlapp/order-client-react/constants/order_states_cart';

export const ORDER_STATES = {
  // In Cart
  STALE: 'STALE',

  // Checkout Process Completed
  INITIATED: 'INITIATED',

  // Order Dispatched / Completed
  COMPLETED: 'COMPLETED',

  // Order Cancelled
  CANCELLED: 'CANCELLED'
};

export const ORDER_STATES_ARRAY = ['STALE', 'INITIATED', 'COMPLETED', 'CANCELLED'];
