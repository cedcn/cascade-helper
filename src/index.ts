import { isEmpty, forEach, isUndefined, cloneDeep, times } from 'lodash'

interface Cascade {
  [key: string]: any
}

interface Strs {
  [key: string]: string
}

interface FlattenResult {
  strs: Strs
  cascade: Cascade
  path: string
}
export const generateRandomString = (): string =>
  Math.random()
    .toString(36)
    .substr(2, 7)

const generateCascade = (level: number, index: number): Cascade => ({
  name: `${level}.${index}`,
  value: generateRandomString(),
})

class CascadeHelper {
  public subKey: string
  public valueKey: string
  public constructor(subKey: string = 'children', valueKey: string = 'value') {
    this.subKey = subKey
    this.valueKey = valueKey
  }
  public flatten(cascades: Cascade[], labels: string[] = [], endLevel?: number): FlattenResult[] {
    const results: FlattenResult[] = []
    const { subKey } = this

    const traverse = (cascades: Cascade[], strs: Strs = {}, path?: string, level?: number): void => {
      forEach(cascades, (cascade, index) => {
        let cStrs: Strs = {}
        forEach(labels, (label) => {
          cStrs[label] = !isUndefined(strs[label]) ? strs[label] + '-' + cascade[label] : cascade[label]
        })

        let cLevel = !isUndefined(level) ? level : 1
        const cPath = !isUndefined(path) ? `${path}.${subKey}[${index}]` : `[${index}]`

        if (!isEmpty(cascade[subKey]) && (isUndefined(endLevel) || (!isUndefined(endLevel) && cLevel < endLevel))) {
          cLevel++
          return traverse(cascade[subKey], cStrs, cPath, cLevel)
        }

        results.push({ strs: cStrs, cascade: cloneDeep(cascade), path: cPath })
      })
    }

    traverse(cascades)
    return results
  }

  public fill(
    cascades: Cascade[] = [],
    count: number = 2,
    startLevel: number = 1,
    endLevel: number = 2,
    geterateFunc: (level: number, index: number) => Cascade = generateCascade
  ): Cascade[] {
    const { subKey } = this
    let newCascades = { [subKey]: cloneDeep(cascades) }

    if (startLevel > endLevel) {
      return newCascades[subKey]
    }

    const setInit = (level: number, cascade: Cascade): void => {
      if (isUndefined(cascade[subKey])) {
        cascade[subKey] = []
      }

      if (isEmpty(cascade[subKey])) {
        times(count, (xIndex) => {
          if (isUndefined(cascade[subKey][xIndex])) {
            cascade[subKey][xIndex] = geterateFunc(level, xIndex)
          }
        })
      }

      forEach(cascade[subKey], (choice) => {
        if (level < endLevel) {
          setInit(level + 1, choice)
        }
      })
    }

    setInit(startLevel, newCascades)
    return newCascades[subKey]
  }
}

export default CascadeHelper
