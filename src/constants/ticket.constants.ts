export enum TICKET_STATUSES {
  ACQUIRED = 'Acquired',
  CHECKED_IN = 'Checked-in',
  USED = 'Used',
  Expired = 'Expired',
}

export const TICKET_ENTITY_PROPERTIES = new Set(['id', 'user_id', 'travel_id', 'created_at', 'updated_at', 'status']);
