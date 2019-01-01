/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import numberHelper from './numberHelper'

describe('#numberHelper', () => {
  describe('#converToInteger', () => {
    it('should return a boolean value', () => {
      const intergerValue = numberHelper.converToInteger('2')
      expect(intergerValue).to.be.a('number')
    })
  })
})
