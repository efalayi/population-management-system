import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'

Enzyme.configure({ adapter: new Adapter() })

const documentHTML = '<!doctype html><html><body><div id="app"></div></body></html>'
const { window } = new JSDOM(documentHTML)

global.fetch = jest.fn()
global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
