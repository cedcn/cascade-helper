import CascadeHelper from '../index'

test('object assignment', () => {
  const cascadeHelper = new CascadeHelper()
  const cascades = cascadeHelper.fill([], 2, 1, 3, (level: number, index: number) => ({
    name: `${level}层级 ${index + 1}`,
    value: `${+new Date()}-${++index}`,
  }))

  const results = cascadeHelper.flatten(cascades, ['name'])
  console.log('cascades', cascades)
  console.log('results', results)
  expect(typeof cascadeHelper.fill).toEqual('function')
})
