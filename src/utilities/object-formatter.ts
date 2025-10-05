export const objectToString = (
  obj: Record<string, string | Record<string, string>>,
  indent = 0,
): string => {
  const pad = '  '.repeat(indent); // отступы пробелами
  let result = '';

  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Если значение — вложенный объект
      result += `${pad}${key}:\n`;
      for (const [subKey, subValue] of Object.entries(value)) {
        if (typeof subValue === 'object') {
          result += `${pad}- ${subKey}:\n` + objectToString(subValue, indent + 2);
        } else {
          result += `${pad}- ${subKey}: ${subValue}\n`;
        }
      }
    } else {
      // Примитивное значение
      result += `${pad}${key}: ${value}\n`;
    }
  }

  return result;
};
