## Install

```
npm install cascade-helper
```

## Class

- subKey (_string_): key name of represent sub object
- valueKey (_string_): key name of represent value

```javascript
const cascadeHelper = new CascadeHelper([(subKey = 'children')], [(valueKey = 'value')])
```

## Instance Methods

### - flatten

```
cascadeHelper.flatten(cascades, [labels = []], [itemSeparator = '-'], [endLevel])
```

- **\*cascades** (_cascades array_)
- labels (_array_)
- itemSeparator (_string_)
- endLevel (_number_)

```javascript
const cascades = [
  { name: '0.0', value: '0.0', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
  { name: '0.1', value: '0.1', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
]

const results = cascadeHelper.flatten(cascades, ['name'])

console.log(results)
/****
  [
    { strs: { name: '0.0-1.0' }, cascade: { name: '1.0', value: '1.0' }, path: '[0].children[0]' },
    { strs: { name: '0.0-1.1' }, cascade: { name: '1.1', value: '1.1' }, path: '[0].children[1]' },
    { strs: { name: '0.1-1.0' }, cascade: { name: '1.0', value: '1.0' }, path: '[1].children[0]' },
    { strs: { name: '0.1-1.1' }, cascade: { name: '1.1', value: '1.1' }, path: '[1].children[1]' },
  ]
 ****/
```

### - cascadesForEach

```
cascadeHelper.cascadesForEach(cascades, [callback], [startLevel = 0], [endLevel])
```

- **\*cascades** (_cascades array_)
- callback (_func_)
  ```
  (cascade, level, index) => void
  ```
- startLevel (_number_)
- endLevel (_number_)

```javascript
const cascades = [
  { name: '0.0', value: '0.0', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
  { name: '0.1', value: '0.1', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
]

cascadeHelper.cascadesForEach(cascades, (cascade, level, index) => {
  cascade.name = `modify-${level}-${index}`
})

console.log(cascades)
/****
[
  { name: 'modify-0-0', value: '0.0', children: [{ name: 'modify-1-0', value: '1.0' }, { name: 'modify-1-1', value: '1.1'}] },
  { name: 'modify-0-1', value: '0.1', children: [{ name: 'modify-1-0', value: '1.0' }, { name: 'modify-1-1', value: '1.1'}] },
]
 ****/
```

### - getLevelCascades

```
cascadeHelper.getLevelCascades(cascades, values, level)
```

- **\*cascades** (_cascades array_)
- **\*values** (_object_)
- **\*level** (_number_)

```javascript
const cascades = [
  { name: '0.0', value: '0.0', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
  { name: '0.1', value: '0.1', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
]

const current = cascadeHelper.getLevelCascades(cascades, { level0: '0.0', level1: '1.1' }, 1)

console.log(current)
/****
{
  cascades: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }],
  path: '[0].children',
  parent: {
    cascade: cascades[0],
    index: 0,
    level: 0,
  },
}
 ****/
```

### - initValues

### - cascadesFill

### - parse

### - stringify
