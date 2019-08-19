import CascadeHelper, { generateRandomString } from '../index'

const random = Math.random()
Math.random = jest.fn().mockReturnValue(random)
const mockValue = generateRandomString()

describe('CascadeHelper', () => {
  const cascadeHelper = new CascadeHelper()
  test('instance method - fill', () => {
    const cascades = cascadeHelper.fill()
    const expectCascades = [
      {
        name: '1.0',
        value: mockValue,
        children: [
          {
            name: '2.0',
            value: mockValue,
          },
          {
            name: '2.1',
            value: mockValue,
          },
        ],
      },
      {
        name: '1.1',
        value: mockValue,
        children: [
          {
            name: '2.0',
            value: mockValue,
          },
          {
            name: '2.1',
            value: mockValue,
          },
        ],
      },
    ]
    expect(cascades).toEqual(expectCascades)
  })

  test('instance method - flatten', () => {
    const cascades = cascadeHelper.fill()
    const results = cascadeHelper.flatten(cascades, ['name'])
    const expectResults = [
      {
        strs: { name: '1.0-2.0' },
        cascade: { name: '2.0', value: mockValue },
        path: '[0].children[0]',
      },
      {
        strs: { name: '1.0-2.1' },
        cascade: { name: '2.1', value: mockValue },
        path: '[0].children[1]',
      },
      {
        strs: { name: '1.1-2.0' },
        cascade: { name: '2.0', value: mockValue },
        path: '[1].children[0]',
      },
      {
        strs: { name: '1.1-2.1' },
        cascade: { name: '2.1', value: mockValue },
        path: '[1].children[1]',
      },
    ]

    expect(expectResults).toEqual(results)
  })
})
