module.exports = {
  usingComponents: {
    'my-card': '../card/card'
  },
  handler (file) {
    if (file.isBuffer()) {
      let content = file.contents.toString()
      if (file.path.includes('parser.js')) {
        content = content.replace(/trustTags\s*:\s*makeMap\('/, "trustTags: makeMap('card,").replace(/voidTags\s*:\s*makeMap\('/, "voidTags: makeMap('card,")
      }
      file.contents = Buffer.from(content)
    }
  }
}
