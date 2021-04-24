const path = require('path')

module.exports = {
  style:
    `.md-p {
  margin-block-start: 1em;
  margin-block-end: 1em;
}

.md-table,
.md-blockquote {
  margin-bottom: 16px;
}

.md-table {
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;
}

.md-tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

.md-table .md-tr:nth-child(2n) {
  background-color: #f6f8fa;
}

.md-th,
.md-td {
  padding: 6px 13px !important;
  border: 1px solid #dfe2e5;
}

.md-th {
  font-weight: 600;
}

.md-blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

.md-code {
  padding: 0.2em 0.4em;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}

.md-pre .md-code {
  padding: 0;
  font-size: 100%;
  background: transparent;
  border: 0;
}`,
  handler (file) {
    // 添加 markdown 属性
    if (file.path.includes('miniprogram' + path.sep + 'index.js')) {
      file.contents = Buffer.from(file.contents.toString().replace(/properties\s*:\s*{/, 'properties: {\n    markdown: Boolean,')
      // 处理中文 id
        .replace(/navigateTo\s*\(id,\s*offset\)\s*{/, 'navigateTo (id, offset) {\n      id = this._ids[decodeURI(id)] || id'))
    }
  }
}
