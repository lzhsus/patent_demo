import content from './apply.ejs'
import layout from 'layoutBase'
const pageTitle = ''

const temp = layout.init({ pageTitle }).run(content())

export default temp
