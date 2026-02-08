export function parseBoolean(value: string | boolean): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const lowerValue = value.trim().toLowerCase();

    if (lowerValue === 'true') {
      return true;
    }

    if (lowerValue === 'false') {
      return false;
    }
  }

  throw new Error(`Error while trying to parse boolean: "${value}"`);
}
