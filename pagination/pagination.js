let pageRows = 5;

const paginate = (query, page = 0) => {
    const offset = (page > 0 ? page - 1 : 0) * pageRows;
    const limit = pageRows;
    return {
        ...query,
        offset,
        limit
    }
};

module.exports = {paginate, pageRows};