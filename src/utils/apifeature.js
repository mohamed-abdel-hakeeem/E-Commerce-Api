export class ApiFeature {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }
  pagination() {
    if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
    let pageNumber = this.searchQuery.page * 1 || 1;
    let pagelimit = 2;
    let skip = (pageNumber - 1) * pagelimit;
    this.pageNumber = pageNumber;
    this.mongooseQuery.skip(skip).limit(pagelimit);
    return this;
  }
  filter() {
    let filterobj = {};
    filterobj = { ...this.searchQuery };
    console.log(filterobj);
    let exludedfields = ["page", "sort", "keyword", "fields"];
    exludedfields.forEach((val) => {
      delete filterobj[val];
    });

    filterobj = JSON.stringify(filterobj);
    filterobj = filterobj.replace(/(gt|gte|lt|lte)/g, (match) => "$" + match);
    filterobj = JSON.parse(filterobj);
    this.mongooseQuery.find(filterobj);
    return this;
  }
  sort() {
    if (this.searchQuery.sort) {
      let sortBy = this.searchQuery.sort.split(",").join(" ");
      mongoosequery.sort(sortBy);
    }
    return this;
  }
  fields() {
    if (this.searchQuery.fields) {
      let fields = this.searchQuery.fields.split(",").join(" ");
      mongoosequery.select(fields);
    }
    return this;
  }
  search() {
    if (this.searchQuery.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.searchQuery.keyword } },
          { description: { $regex: this.searchQuery.keyword } },
        ],
      });
    }
    return this;
  }
}
