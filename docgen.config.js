const path = require('path')
const templates = require('./docgen/templates')

module.exports = {
    componentsRoot: 'client/components',
    components: '**/[A-Z]*.vue',
    outDir: 'client/docs/definitions',
    apiOptions: {
        jsx: false,
    },
    defaultExamples: true,
    getDestFile: (componentPath, config) => {
        return path.join(config.outDir, componentPath).replace(/\.vue$/, '.md')
    },
    templates,
}
