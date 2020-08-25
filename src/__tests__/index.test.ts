import CascadeHelper, { generateRandomString, Cascade } from '../index'

const random = Math.random()
Math.random = jest.fn().mockReturnValue(random)
const mockValue = generateRandomString

describe('CascadeHelper instance method [deepFill]', () => {
  const cascadeHelper = new CascadeHelper()
  test('should return structured cascades', () => {
    const cascades = cascadeHelper.deepFill()
    const expectCascades = [
      {
        name: '0.0',
        value: mockValue(0, 0),
        children: [
          {
            name: '1.0',
            value: mockValue(1, 0),
          },
          {
            name: '1.1',
            value: mockValue(1, 1),
          },
        ],
      },
      {
        name: '0.1',
        value: mockValue(0, 1),
        children: [
          {
            name: '1.0',
            value: mockValue(1, 0),
          },
          {
            name: '1.1',
            value: mockValue(1, 1),
          },
        ],
      },
    ]
    expect(expectCascades).toEqual(cascades)
  })
})

//
describe('CascadeHelper instance method [deepFlatten]', () => {
  const cascadeHelper = new CascadeHelper()
  test('should return results contain cascade of last level', () => {
    const cascades = cascadeHelper.deepFill()
    const results = cascadeHelper.deepFlatten(cascades, { labels: ['name'] })
    const expectResults = [
      {
        strs: { name: '0.0-1.0' },
        cascade: { name: '1.0', value: mockValue(1, 0) },
        path: '[0].children[0]',
      },
      {
        strs: { name: '0.0-1.1' },
        cascade: { name: '1.1', value: mockValue(1, 1) },
        path: '[0].children[1]',
      },
      {
        strs: { name: '0.1-1.0' },
        cascade: { name: '1.0', value: mockValue(1, 0) },
        path: '[1].children[0]',
      },
      {
        strs: { name: '0.1-1.1' },
        cascade: { name: '1.1', value: mockValue(1, 1) },
        path: '[1].children[1]',
      },
    ]

    expect(results).toEqual(expectResults)
  })

  test('should return results contain cascade of specified end level', () => {
    const cascades = cascadeHelper.deepFill()
    const results = cascadeHelper.deepFlatten(cascades, { labels: ['name'], endLevel: 0 })
    const expectResults = [
      {
        strs: { name: '0.0' },
        cascade: { name: '0.0', value: mockValue(0, 0), children: cascades[0].children },
        path: '[0]',
      },
      {
        strs: { name: '0.1' },
        cascade: { name: '0.1', value: mockValue(0, 1), children: cascades[1].children },
        path: '[1]',
      },
    ]

    expect(results).toEqual(expectResults)
  })
})

//
describe('CascadeHelper instance method [deepForEach]', () => {
  const cascadeHelper = new CascadeHelper()

  test('should modify origin cascades', () => {
    const cascades = cascadeHelper.deepFill()
    cascadeHelper.deepForEach(cascades, (cascade: Cascade, currentlevel?: number, currentIndex?: number) => {
      cascade.name = `modify-${currentlevel}-${currentIndex}`
    })

    const expectCascades = [
      {
        name: 'modify-0-0',
        value: mockValue(0, 0),
        children: [
          {
            name: 'modify-1-0',
            value: mockValue(1, 0),
          },
          {
            name: 'modify-1-1',
            value: mockValue(1, 1),
          },
        ],
      },
      {
        name: 'modify-0-1',
        value: mockValue(0, 1),
        children: [
          {
            name: 'modify-1-0',
            value: mockValue(1, 0),
          },
          {
            name: 'modify-1-1',
            value: mockValue(1, 1),
          },
        ],
      },
    ]

    expect(cascades).toEqual(expectCascades)
  })
})

describe('CascadeHelper instance method [deepMap]', () => {
  const cascadeHelper = new CascadeHelper()

  test('should return new cascades, don‘t modify origin', () => {
    const cascades = cascadeHelper.deepFill()
    const cascades2 = cascades

    const results = cascadeHelper.deepMap(cascades, (cascade: Cascade, currentLevel, currentIndex, path) => {
      return { ...cascade, name: `modify-${currentLevel}-${currentIndex}`, path }
    })

    const expectResults = [
      {
        name: 'modify-0-0',
        value: mockValue(0, 0),
        path: '[0]',
        children: [
          {
            name: 'modify-1-0',
            value: mockValue(1, 0),
            path: '[0].children[0]',
          },
          {
            name: 'modify-1-1',
            value: mockValue(1, 1),
            path: '[0].children[1]',
          },
        ],
      },
      {
        name: 'modify-0-1',
        value: mockValue(0, 1),
        path: '[1]',
        children: [
          {
            name: 'modify-1-0',
            value: mockValue(1, 0),
            path: '[1].children[0]',
          },
          {
            name: 'modify-1-1',
            value: mockValue(1, 1),
            path: '[1].children[1]',
          },
        ],
      },
    ]

    expect(cascades2).toEqual(cascades)
    expect(results).toEqual(expectResults)
  })
})

describe('CascadeHelper instance method [initValues]', () => {
  const cascadeHelper = new CascadeHelper()

  test('should return the first value of cascades', () => {
    const cascades = cascadeHelper.deepFill()
    const values = cascadeHelper.initValues(cascades, 2)
    const expectValues = { level0: mockValue(0, 0), level1: mockValue(1, 0) }
    expect(values).toEqual(expectValues)
  })

  test('Instance method [initValues] - should return the first value of specified index of cascades', () => {
    const cascades = cascadeHelper.deepFill()
    const values = cascadeHelper.initValues(cascades, 2, 1)
    const expectValues = { level0: mockValue(0, 1), level1: mockValue(1, 1) }
    expect(values).toEqual(expectValues)
  })
})

//
describe('CascadeHelper instance method [getLevelCascades]', () => {
  const cascadeHelper = new CascadeHelper()

  test('should return cascades result of specified level cascades', () => {
    const cascades = cascadeHelper.deepFill()
    const current = cascadeHelper.getLevelCascades(cascades, { level0: mockValue(0, 0), level1: mockValue(1, 1) }, 1)
    const expectCurrent = {
      cascades: [{ name: '1.0', value: mockValue(1, 0) }, { name: '1.1', value: mockValue(1, 1) }],
      path: '[0].children',
      parent: {
        cascade: cascades[0],
        index: 0,
        level: 0,
      },
    }

    expect(current).toEqual(expectCurrent)
  })
})

//
describe('CascadeHelper instance method [parse]', () => {
  const cascadeHelper = new CascadeHelper()

  test('should return structured cascades', () => {
    const str =
      '一级选项1-二级选项1\n一级选项1-二级选项1-三级选项1\n一级选项1-二级选项2\n一级选项1-二级选项3\n一级选项2-二级选项1\n一级选项2-二级选项2\n一级选项2-二级选项3\n一级选项3-二级选项1\n'
    const results = cascadeHelper.parse(str, (key, valueKey, level, index) => {
      return { name: key, [valueKey]: mockValue(level, index) }
    })
    const expectResults = [
      {
        name: '一级选项1',
        value: mockValue(0, 0),
        children: [
          {
            name: '二级选项1',
            value: mockValue(1, 0),
            children: [
              {
                name: '三级选项1',
                value: mockValue(2, 0),
              },
            ],
          },
          {
            name: '二级选项2',
            value: mockValue(1, 1),
          },
          {
            name: '二级选项3',
            value: mockValue(1, 2),
          },
        ],
      },
      {
        name: '一级选项2',
        value: mockValue(0, 1),
        children: [
          {
            name: '二级选项1',
            value: mockValue(1, 0),
          },
          {
            name: '二级选项2',
            value: mockValue(1, 1),
          },
          {
            name: '二级选项3',
            value: mockValue(1, 2),
          },
        ],
      },
      {
        name: '一级选项3',
        value: mockValue(0, 2),
        children: [
          {
            name: '二级选项1',
            value: mockValue(1, 0),
          },
        ],
      },
    ]
    expect(results).toEqual(expectResults)
  })

  test('should return structured cascades 2 when irreglar order', () => {
    const str = '1-1-1\n1-1-2\n2-2-5\n1-1-3'
    const results = cascadeHelper.parse(str, (key, valueKey, level, index) => {
      return { name: key, [valueKey]: mockValue(level, index), other: 'other' }
    })
    const expectResults = [
      {
        name: '1',
        value: mockValue(0, 0),
        other: 'other',
        children: [
          {
            name: '1',
            value: mockValue(1, 0),
            other: 'other',
            children: [
              {
                name: '1',
                value: mockValue(2, 0),
                other: 'other',
              },
              {
                name: '2',
                value: mockValue(2, 1),
                other: 'other',
              },
              {
                name: '3',
                value: mockValue(2, 2),
                other: 'other',
              },
            ],
          },
        ],
      },
      {
        name: '2',
        value: mockValue(0, 1),
        other: 'other',
        children: [
          {
            name: '2',
            value: mockValue(1, 0),
            other: 'other',
            children: [
              {
                name: '5',
                value: mockValue(2, 0),
                other: 'other',
              },
            ],
          },
        ],
      },
    ]
    expect(results).toEqual(expectResults)
  })

  test('should return empty array when string is empty', () => {
    const str = ''
    const results = cascadeHelper.parse(str, (key, valueKey, level, index) => {
      return { name: key, [valueKey]: mockValue(level, index) }
    })
    expect(results).toEqual([])
  })
})

describe('CascadeHelper instance method [stringify]', () => {
  const cascadeHelper = new CascadeHelper()

  test('should return serialize string', () => {
    const cascades = cascadeHelper.deepFill([], {
      count: 3,
      generateFunc: (level: number, index: number) => {
        return { name: `${level + 1}xxx${index}` }
      },
    })

    const str = cascadeHelper.stringify(cascades, 'name')
    const expectStr =
      '1xxx0-2xxx0\n1xxx0-2xxx1\n1xxx0-2xxx2\n1xxx1-2xxx0\n1xxx1-2xxx1\n1xxx1-2xxx2\n1xxx2-2xxx0\n1xxx2-2xxx1\n1xxx2-2xxx2'
    expect(expectStr).toEqual(str)
  })
})


describe('CascadeHelper instance methodsss [stringify]', () => {
  const cascadeHelper = new CascadeHelper()

  test('should return serialize string', () => {
    const str = '1-1\n1-2\n2-1\n1-1-1'

    const results = cascadeHelper.parse(str, (key, valueKey, level, index) => {
      return { name: key, [valueKey]: `${level}.${index}`, other: 'other' }
    })
    
    console.log(results[1])
  })
})
