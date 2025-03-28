export const TRAVEL_ENTITY_PROPERTIES = new Set([
  'id',
  'source',
  'departure_time',
  'destination',
  'arrival_time',
  'created_date',
  'updated_date',
  'status',
]);

export enum TRAVEL_STATUSES {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
