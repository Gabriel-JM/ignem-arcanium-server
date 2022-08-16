export function text(strings: TemplateStringsArray, ...values: any[]) {
  const fullText = strings.reduce((acc, str, index) => {
    return acc + str + values[index]
  }, '')

  return fullText
    .trim()
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' ')
}
