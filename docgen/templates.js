const Prism = require('prismjs')
module.exports = {
    component: function component(
        renderedUsage,
        doc,
        config,
        fileName,
        requiresMd,
        { isSubComponent, hasSubComponents },
    ) {
        const { functional, displayName, description, docsBlocks, tags } = doc
        const { author, since, version, see, link, position, category } = tags || {}

        const frontMatter = []
        if (!isSubComponent) {
            frontMatter.push(`title: "${displayName}"`)
            // If a @position doclet has been specified, we can
            // use it in the frontMatter to order pages
            if (position) {
                frontMatter.push(`position: ${position[0].description}`)
            }
            // if component is decorated with an @category doclet we
            // use it to place it in this category, if empty we use "components"
            const cleanCategory = category ? category[0].description : 'components'
            frontMatter.push(`category: "${cleanCategory}"`)
        }
        let jsonTemplates = '<div>'
        const props = renderedUsage.props.split('\n')
        for (const [i, prop] of props.entries()) {
            if (i < 4) continue
            const exampleStartPos = prop?.indexOf('`@example`') + 10
            let exampleEndPos = prop?.indexOf(' | object', exampleStartPos)
            if (exampleEndPos < 0) exampleEndPos = prop?.indexOf(' | array', exampleStartPos)
            if (exampleStartPos > 10 && exampleEndPos > 0) {
                const json = prop.slice(exampleStartPos, exampleEndPos).replace(/<br\/>/g, '\n')
                jsonTemplates +=
                    ' <div class="example-content"><pre class="language-js"><code> &#9;&#9;' +
                    Prism.highlight(json, Prism.languages.javascript, 'js').replace(/\n/g, '&#13;&#10;') +
                    '</code></pre></div>'
                props[i] = (prop.slice(0, exampleStartPos) + prop.slice(exampleEndPos, prop.length)).replace(
                    '`@example`',
                    '<div class="display-example">`@example`</div>',
                )
            }
        }
        jsonTemplates += '</div>'
        renderedUsage.props = props.join('\n')

        return `${
            frontMatter.length
                ? `---
${frontMatter.join('\n')}
---`
                : ''
        }

${isSubComponent || hasSubComponents ? `## ${displayName}` : ''}
${description}
${functional ? `- ${renderedUsage.functionalTag}` : ''}
${author ? author.map((a) => `- **Author**: ${a.description}`) : ''}
${since ? `- **Since** ${since[0].description}` : ''}
${version ? `- **Version** ${version[0].description}` : ''}
${see ? see.map((s) => `- [See](${s.description})`) : ''}
${link ? link.map((l) => `- [See](${l.description})`) : ''}
${renderedUsage.props}
${jsonTemplates}
${renderedUsage.methods}
${renderedUsage.events}
${renderedUsage.slots}
${docsBlocks ? '---\n' + docsBlocks.join('\n---\n') : ''}

`
    },
}
