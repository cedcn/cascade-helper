import CascadeHelper, { generateRandomString, Cascade } from '../index'

const random = Math.random()
Math.random = jest.fn().mockReturnValue(random)
const mockValue = generateRandomString()

describe('CascadeHelper', () => {
  const cascadeHelper = new CascadeHelper()
  test('instance method - cascadeFill', () => {
    const cascades = cascadeHelper.cascadeFill()
    const expectCascades = [
      {
        name: '0.0',
        value: mockValue,
        children: [
          {
            name: '1.0',
            value: mockValue,
          },
          {
            name: '1.1',
            value: mockValue,
          },
        ],
      },
      {
        name: '0.1',
        value: mockValue,
        children: [
          {
            name: '1.0',
            value: mockValue,
          },
          {
            name: '1.1',
            value: mockValue,
          },
        ],
      },
    ]
    expect(cascades).toEqual(expectCascades)
  })

  test('instance method - flatten', () => {
    const cascades = cascadeHelper.cascadeFill()
    const results = cascadeHelper.flatten(cascades, ['name'])
    const expectResults = [
      {
        strs: { name: '0.0-1.0' },
        cascade: { name: '1.0', value: mockValue },
        path: '[0].children[0]',
      },
      {
        strs: { name: '0.0-1.1' },
        cascade: { name: '1.1', value: mockValue },
        path: '[0].children[1]',
      },
      {
        strs: { name: '0.1-1.0' },
        cascade: { name: '1.0', value: mockValue },
        path: '[1].children[0]',
      },
      {
        strs: { name: '0.1-1.1' },
        cascade: { name: '1.1', value: mockValue },
        path: '[1].children[1]',
      },
    ]

    expect(expectResults).toEqual(results)
  })

  test('instance method - cascadeForEach', () => {
    const cascades = cascadeHelper.cascadeFill()
    cascadeHelper.cascadeForEach(cascades, (cascade: Cascade, currentlevel?: number, currentIndex?: number) => {
      cascade.name = `modify-${currentlevel}-${currentIndex}`
    })

    const expectCascades = [
      {
        name: 'modify-0-0',
        value: mockValue,
        children: [
          {
            name: 'modify-1-0',
            value: mockValue,
          },
          {
            name: 'modify-1-1',
            value: mockValue,
          },
        ],
      },
      {
        name: 'modify-0-1',
        value: mockValue,
        children: [
          {
            name: 'modify-1-0',
            value: mockValue,
          },
          {
            name: 'modify-1-1',
            value: mockValue,
          },
        ],
      },
    ]

    expect(expectCascades).toEqual(cascades)
  })
})
