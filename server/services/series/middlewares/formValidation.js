// * FORM VALIDATION, VALID FOR BOTH COLLECTION movies AND tvseries

module.exports = formValidation = (req, res, next) => {
  const { title, overview, poster_path, popularity, tags } = req.body
  let errors = []
  try {
    if (!title)
      errors.push({
        field: 'title',
        msg: 'title is required'
      })
    if (!overview)
      errors.push({
        field: 'overview',
        msg: 'overview cannot empty'
      })
    if (!poster_path)
      errors.push({
        field: 'poster_path',
        msg: 'poster_path cannot empty'
      })
    if (!popularity)
      errors.push({
        field: 'popularity',
        msg: 'popularity cannot empty'
      })
    else if (Number(popularity) < 0 || Number(popularity) > 10)
      errors.push({
        field: 'popularity',
        msg: 'popularity should contain number from 0 to 10'
      })
    if (!tags)
      errors.push({
        field: 'tags',
        msg: 'please provide at least 1 tag'
      })
    else if (tags.match(/^[a-zA-Z0-9]+[a-zA-Z0-1,]+[a-zA-Z0-1]+$/) === null)
      errors.push({
        field: 'tags',
        msg: 'separate your tags with comma without space, tag only contains letters and numbers only'
      })
    if (errors.length > 0) throw { name: 'FORM_ERROR', errors }
    else next()
  } catch (error) {
    next(error)
  }
}
