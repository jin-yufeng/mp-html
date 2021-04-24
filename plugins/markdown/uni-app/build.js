module.exports = {
  style:
    `/deep/ .md-p {
  margin-block-start: 1em;
  margin-block-end: 1em;
}

/deep/ .md-table,
/deep/ .md-blockquote {
  margin-bottom: 16px;
}

/deep/ .md-table {
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;
}

/deep/ .md-tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

/deep/ .md-table .md-tr:nth-child(2n) {
  background-color: #f6f8fa;
}

/deep/ .md-th,
/deep/ .md-td {
  padding: 6px 13px !important;
  border: 1px solid #dfe2e5;
}

/deep/ .md-th {
  font-weight: 600;
}

/deep/ .md-blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

/deep/ .md-code {
  padding: 0.2em 0.4em;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}

/deep/ .md-pre .md-code {
  padding: 0;
  font-size: 100%;
  background: transparent;
  border: 0;
}`,
  handler (file) {
    // 添加 markdown 属性
    if (file.path.includes('mp-html.vue')) {
      file.contents = Buffer.from(file.contents.toString().replace(/props\s*:\s*{/, 'props: {\n    markdown: Boolean,')
      // 处理中文 id
        .replace(/navigateTo\s*\(id,\s*offset\)\s*{/, 'navigateTo (id, offset) {\n      id = this._ids[decodeURI(id)] || id'))
    }
  }
}
