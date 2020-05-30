import React, { useState } from 'react'
import { find, times, isEmpty } from 'lodash'
import nanoid from 'nanoid'
import CascadeHelper from 'cascade-helper'
import Head from 'next/head'
import { NextPage } from 'next'
import Tree from 'rc-tree'

const cascadeHelper = new CascadeHelper('subChoices')
const generateCascadeChoices = (level: number, index: number) => ({
  name: `${level + 1} 级选项 ${index + 1}`,
  value: nanoid(4),
})

const choices = cascadeHelper.deepFill([], {
  count: 3,
  geterateFunc: generateCascadeChoices,
  startLevel: 0,
  endLevel: 2,
})

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Cascade Tree</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <style jsx>{`
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
          <h1>Cascade Tree</h1>

          <Tree />
        </div>
      </div>
    </div>
  )
}

export default IndexPage
