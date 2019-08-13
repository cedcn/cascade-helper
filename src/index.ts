import { isEmpty, forEach, isUndefined, cloneDeep } from 'lodash'

/*
 * Retrun new array
 * Not mutates original choices
 */
export const flattenInlineCascadeChoices = (choices: any, endLevel?: number): any => {
  const results: any[] = []
  const traverse = (choices: any, path?: string, level?: number, str?: string): any => {
    forEach(choices, (choice, index) => {
      const cStr = !isUndefined(str) ? str + '-' + choice.name : choice.name
      let cLevel = !isUndefined(level) ? level : 1
      const cPath = !isUndefined(path) ? `${path}.subChoices[${index}]` : `[${index}]`

      if (!isEmpty(choice.subChoices) && (isUndefined(endLevel) || (!isUndefined(endLevel) && cLevel < endLevel))) {
        cLevel++
        return traverse(choice.subChoices, cPath, cLevel, cStr)
      }

      results.push({ name: cStr, choice: cloneDeep(choice), path: cPath })
    })
  }

  traverse(choices)
  return results
}

/*
 * For each choice
 */
export const forEachCascadeChoices = (
  choices: any,
  cb: (choice: any, currentlevel?: number, currentIndex?: string) => void,
  startLevel: number = 1,
  endLevel?: number
): any => {
  forEach(choices, (choice, index) => {
    cb(choice, startLevel, index)
    if (!isEmpty(choice.subChoices)) {
      if (endLevel && startLevel >= endLevel) {
        return
      }

      forEachCascadeChoices(choice.subChoices, cb, startLevel + 1, endLevel)
    }
  })
}

