import React, { useState } from 'react'
import { find, times, isEmpty } from 'lodash'
import nanoid from 'nanoid'
import CascadeHelper from 'cascade-helper'
import Head from 'next/head'
import { NextPage } from 'next'
import Select from 'react-select'

const cascadeHelper = new CascadeHelper('subChoices')
const generateCascadeChoices = (level: number, index: number) => ({
  name: `${level + 1} 级选项 ${index + 1}`,
  value: nanoid(4),
})

interface OptionType {
  value: string
  label: string
}

const choices = cascadeHelper.cascadesFill([], 3, generateCascadeChoices, 0, 2)
const transformChoices = (choices: any[]): OptionType[] => {
  return choices.map((choice: any) => {
    const { value, name } = choice
    let label = name

    return {
      value,
      label,
    }
  })
}

const IndexPage: NextPage = () => {
  const [values, setValues] = useState<{ [key: string]: string }>({})

  const onChange = (targetValue: any, tragetLevel: number) => {
    const newValues = { ...values, [`level${tragetLevel}`]: targetValue ? targetValue.value : null }
    times(3, (index) => {
      if (tragetLevel < index) {
        delete newValues[`level${index}`]
      }
    })
    setValues(newValues)
  }

  return (
    <div>
      <Head>
        <title>Cascade Dropdown</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <style jsx>{`
          .select {
            margin-bottom: 10px;
          }

          .container {
            width: 500px;
            margin-left: auto;
            margin-right: auto;
          }

          h1 {
            text-align: center;
          }
        `}</style>
        <div className="container">
          <h1>Cascade Dropdown</h1>

          {times(3, (index) => {
            const { cascades: cascadesChoices } = cascadeHelper.getLevelCascades(choices, values, index)
            const options = transformChoices(cascadesChoices)
            const value = find(options, (item) => item.value === values[`level${index}`]) || null

            if (isEmpty(options)) {
              return null
            }
            return (
              <div className="select" key={index}>
                <Select
                  value={value}
                  isClearable
                  onChange={(value: any) => onChange(value, index)}
                  options={options}
                  isSearchable={false}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default IndexPage
