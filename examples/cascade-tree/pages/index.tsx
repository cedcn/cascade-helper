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
  generateFunc: generateCascadeChoices,
  startLevel: 0,
  endLevel: 2,
})

const IndexPage: NextPage = () => {
  const gData = [
    { title: '0-0', key: '0-0' },
    { title: '0-1', key: '0-1' },
    { title: '0-2', key: '0-2', children: [{ title: '0-2-0', key: '0-2-0' }] },
  ]

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
          <Tree treeData={gData}/>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
