export const camelToTitleCase = (camel: string): string => {
  return camel
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Handle transitions like "IDNumber" → "ID Number"
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')     // Handle normal camelCase boundaries
    .replace(/^./, str => str.toUpperCase());  // Capitalize the first character
}
