export function sneakObjectToCamel(object: object): object {
  return Object
    .entries(object)
    .reduce((acc, [key, value]) => {
      const isObject = value && typeof value === 'object'

      return {
        ...acc,
        [snakeStringToCamel(key)]: isObject
          ? sneakObjectToCamel(value)
          : value
      }
    }, {})
}

export function snakeStringToCamel(string: string) {
  return string.toLowerCase().replace(
    /([-_][a-z])/g,
    group => group.toUpperCase().replace(/-|_/, '')
  )
}
