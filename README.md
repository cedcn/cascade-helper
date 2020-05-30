[![GitHub Actions CI](https://github.com/cedcn/cascade-helper/workflows/CI/badge.svg)](https://github.com/cedcn/cascade-helper/actions)
[![NPM Package](https://img.shields.io/npm/dm/cascade-helper.svg)](https://npmjs.com/package/cascade-helper)

## Install

```
npm install cascade-helper --save
```

## Class

- subKey (_string_): key name of represent sub object
- valueKey (_string_): key name of represent value

```javascript
const cascadeHelper = new CascadeHelper([(subKey = 'children')], [(valueKey = 'value')])
```

## Instance Methods

### deepFlatten

```
cascadeHelper.deepFlatten(cascades[, options])
```

#### - **\*cascades**

cascades array

#### - **options**

| KEY           |      TYPE      | DEFAULT |
| ------------- | :------------: | :-----: |
| labels        | Array\<string> |   []    |
| itemSeparator |     string     |   '-'   |
| endLevel      |     nubmer     |         |

```javascript
const cascades = [
  { name: '0.0', value: '0.0', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
  { name: '0.1', value: '0.1', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
]

const results = cascadeHelper.deepFlatten(cascades, { labels: ['name'] })

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

### deepForEach

```
cascadeHelper.deepForEach(cascades, callback[, options])
```

#### - **\*cascades**

cascades array

#### - **\*callback**

```
(cascade, level, index) => void
```

#### - **options**

| KEY        |  TYPE  | DEFAULT |
| ---------- | :----: | :-----: |
| startLevel | number |    0    |
| endLevel   | number |         |

```javascript
const cascades = [
  { name: '0.0', value: '0.0', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
  { name: '0.1', value: '0.1', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
]

cascadeHelper.deepForEach(cascades, (cascade, level, index) => {
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

### deepMap

```
cascadeHelper.deepMap(cascades, callback[, options])
```

#### - **\*cascades**

cascades array

#### - **\*callback**

```
(cascade, level, index, path, parent) => void
```

#### - **options**

| KEY        |  TYPE  | DEFAULT |
| ---------- | :----: | :-----: |
| startLevel | number |    0    |

```javascript
const cascades = [
  { name: '0.0', value: '0.0', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
  { name: '0.1', value: '0.1', children: [{ name: '1.0', value: '1.0' }, { name: '1.1', value: '1.1' }] },
]

const results = cascadeHelper.deepMap(cascades, (cascade, level, index, path) => {
  return { ...cascade, name: `modify-${currentLevel}-${currentIndex}`, path }
})

console.log(results)
/****
[
  { name: 'modify-0-0', value: '0.0', path: '[0]', children: [{ name: 'modify-1-0', value: '1.0', path: '[0].children[0]' }, { name: 'modify-1-1', value: '1.1', path: '[0].children[1]'}] },
  { name: 'modify-0-1', value: '0.1', path: '[1]', children: [{ name: 'modify-1-0', value: '1.0', path: '[1].children[0]' }, { name: 'modify-1-1', value: '1.1', path: '[1].children[1]'}] },
]
 ****/
```

### getLevelCascades

```
cascadeHelper.getLevelCascades(cascades, values, level)
```

#### - **\*cascades**

_cascades array_

#### - **\*values**

#### - **\*level**

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

### initValues

### deepFill

### parse

### stringify

## Examples

- CascadeDropdown

[![Edit cascade-dropdown](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/Cedcn/cascade-helper/tree/master/examples/cascade-dropdown)
