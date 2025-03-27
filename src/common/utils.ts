import { intersection } from "lodash";
import { Logger } from "@nestjs/common";
const logger = new Logger("UtilsLogger");

/*export const agentSnakeCaseToCamelCase = (agent: Partial<AgentEntity> | AgentEntity): any => {
  return {
    id: agent.id || undefined,
    name: agent.name || undefined,
    surname: agent.surname || undefined,
    createdAt:
      agent.created_at && (agent.created_at !== undefined || agent.created_at !== null)
        ? agent.created_at.toISOString()
        : undefined,
    updatedAt:
      agent.updated_at && (agent.updated_at !== undefined || agent.created_at !== null)
        ? agent.updated_at.toISOString()
        : undefined,
    email: agent.email || undefined,
    companyId: agent.company || undefined,
    maxNumberOfConversation:
      agent.created_at !== undefined || agent.created_at !== null ? agent.max_number_of_conversation : undefined,
    departmentIds: agent.department_ids || undefined,
    canForward: agent.can_forward !== undefined || agent.can_forward !== null ? agent.can_forward : undefined,
    status: agent.status || undefined,
    statusTypeId: agent.status_type_id || undefined,
    lastAssignment: agent.last_assignment?.toISOString() || undefined,
    userId: agent.user_id || undefined,
  };
};*/

export const statusTypeSnakeCaseToCamelCase = (statusType: any): any => {
  return {
    id: statusType.id || undefined,
    name: statusType.name || undefined,
    status: statusType.status || undefined,
    companyId: statusType.company_id || undefined,
    createdAt:
      statusType.created_at &&
      (statusType.created_at !== undefined || statusType.created_at !== null)
        ? statusType.created_at.toISOString()
        : undefined,
    updatedAt:
      statusType.updated_at &&
      (statusType.updated_at !== undefined || statusType.updated_at !== null)
        ? statusType.updated_at.toISOString()
        : undefined,
    type: statusType.type || undefined,
  };
};

export function isPrivateIP(ip: string, path: string) {
  if (!ip) {
    return false;
  }

  // Check IPv4 private ranges
  const ipv4PrivateRanges = [
    /^10\./,
    /^192\.168\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  ];

  // Check IPv6 private ranges
  const ipv6PrivateRanges = [
    /^(fc00|fd00|fe80|::1|::)$/i,
    /^(::ffff:)?(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/i,
  ];

  const result =
    ipv4PrivateRanges.some((range) => range.test(ip)) ||
    ipv6PrivateRanges.some((range) => range.test(ip));
  logger.debug(`isPrivateIP IP:${ip}, Path:${path}, Result:${result}`);

  return result;
}

export function decodeJWTToken<T = any>(token: string): T | null {
  try {
    if (token) {
      const tempToken = token.split(".");
      if (tempToken?.length <= 1) return null;
      const base64String = tempToken[1];
      return JSON.parse(Buffer.from(base64String, "base64").toString()) as T;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export function sanitizeDepartmentIds(
  requestedDepartmentIds: string[] | undefined,
  authorizedDepartmentIds: string[] | undefined,
): string[] | undefined {
  // If there is no authorized department, return requested department.
  // It means either user is admin or ignore department is true.
  if (authorizedDepartmentIds === undefined) {
    if (requestedDepartmentIds && requestedDepartmentIds.length > 0) {
      return requestedDepartmentIds;
    }
    return undefined;
  }

  // If user is not authorized for any department, return empty array.
  if (authorizedDepartmentIds.length === 0) {
    return [];
  }

  // If there is no requested department, return authorized department.
  if (!requestedDepartmentIds || requestedDepartmentIds.length === 0) {
    return authorizedDepartmentIds;
  }

  // Return intersection of requested and authorized departments.
  // Ex: requestedDepartmentIds = ['1', '2', '3'], authorizedDepartmentIds = ['2', '3', '4']
  // Result: ['2', '3']
  return intersection(requestedDepartmentIds, authorizedDepartmentIds);
}

export const safeStringify = (item: any) => {
  try {
    if (item instanceof Error) {
      return JSON.stringify(item, Object.getOwnPropertyNames(item));
    }
    if (typeof item === "object") {
      return JSON.stringify(item);
    }
    return item;
  } catch (err) {
    return item;
  }
};
