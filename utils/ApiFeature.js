
class ApiFeature {
    constructor(query, objQueryStr) {
      this.query = query;
      this.objQueryStr = objQueryStr;
    }
  
    filter() {
      let objQuery = { ...this.objQueryStr };
      const excludeField = ['page', 'sort', 'limit', 'fields'];
      excludeField.forEach((el) => delete objQuery[el]);
  
      let queryStr = JSON.stringify(objQuery);
  
      queryStr = JSON.parse(
        queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`)
      );
  
     this.query = this.query.find(queryStr);
      return this;
    }
  
    sort() {
      if (this.objQueryStr.sort) {
        const sortBy = this.objQueryStr.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      }
      return this;
    }
  
    fields() {
      if (this.objQueryStr.fields) {
        const field = this.objQueryStr.fields.split(',').join(' ');
        this.query = this.query.select(field);
      } else this.query = this.query.select('-__v');
      return this;
    }
    page(){
      const queryPage = 1 * this.objQueryStr.page || 1;
      const queryLimit = 1 * this.objQueryStr.limit || 100;
      const skip = queryLimit * (queryPage - 1);
  
     this.query = this.query.skip(skip).limit(queryLimit);
      return this;
    };
  }

  module.exports = ApiFeature;