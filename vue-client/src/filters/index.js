// Add exported filters if necessary 

// Upper Text
export const upper = (text) => {
  return text && typeof text === 'string' ? text.toUpperCase() : text
}
