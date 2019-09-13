const parser=require('parser-wxapp');
exports.main = async (event, context) => {
  try {
    return await parser(event.data, event.mode, event.options);
  } catch (err) {
    throw new Error(err);
  }
}