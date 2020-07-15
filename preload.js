const path = require('path')
require('dotenv').config()

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

global.__app = {
  __db: null
}

const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
sqlite.open({
  filename: path.join(__dirname, 'storage', process.env.MAIN_DB_FILE_NAME),
  driver: sqlite3.Database
}).then(db => {
  __app.__db = db
})
