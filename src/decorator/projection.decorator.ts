import { TRAVEL_ENTITY_PROPERTIES } from '../constants/travel.constants';
import { TICKET_ENTITY_PROPERTIES } from '../constants/ticket.constants';

export function decorateProjectionObject(key: string, projection?: string) {
  const currentProjection = {};
  if (projection) {
    const array: string[] = projection.split(' ');
    const properties = propertiesFactory(key);
    if (!properties) return {};
    array.forEach((element) => {
      if (properties.has(element)) currentProjection[element] = 1;
    });
  }
  return currentProjection;
}

export function propertiesFactory(key: string) {
  switch (key) {
    case PROPERTIES.TRAVEL_ENTITY:
      return TRAVEL_ENTITY_PROPERTIES;
    case PROPERTIES.TICKET_ENTITY:
      return TICKET_ENTITY_PROPERTIES;
  }
}

export enum PROPERTIES {
  TRAVEL_ENTITY = 'travel',
  TICKET_ENTITY = 'ticket',
}
