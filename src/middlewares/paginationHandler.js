
export const paginationMiddleware = async (req, res, next) => {
  try {
    const query = req.query;
    const page = +query.page || 1
    const limit = +query.limit || 10
    const skip = (page - 1) * limit

    const pagination = {
      limit,
      page,
      skip
    }
    
    req.pagination = Object.assign({}, pagination);
    next()
  } catch (err) {
    next(err);
  }
}

export const paginateResponse = async (req, res, next) => {
  try {
    const pagination = req.pagination;
    const { data, totalCount } = res.locals.result
    const pageCount = Math.ceil(totalCount / pagination.limit)
    const result = {
      ...pagination,
      pageCount,
      totalCount: +totalCount,
      data
    }
    res.locals = Object.assign({}, res.locals, { result })
    next();
  } catch (err) {
    next(err);
  }
}