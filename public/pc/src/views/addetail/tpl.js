import content from './addetail.ejs'
import layout from 'layoutBase'
const pageTitle = '巧虎'

const temp = layout.init({ pageTitle }).run(content())

export default temp
