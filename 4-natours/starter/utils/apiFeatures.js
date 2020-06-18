class ApiFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    // 1) FILTERING
    filter(){
        // spread the query to create a new object that can be modify
        const queryObj = { ...this.queryString };
        // save different query types that we then iterate over to delete them from the query url.
        const excludedFields = ['page', 'sort', 'limit', 'field'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 2) ADVANCED FILTERING
        // stringify the query to be able to the replace method on it
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // Mongodb query
        // parse it to be an object as mongodb query takes objects as arguments
        this.query = this.query.find(JSON.parse(queryStr));
        
        return this;
    }

    // 3) SORTING
    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy);
        }
        else{
            this.query = this.query.sort('-createdAt');
        };
        
        return this;
    }

    // 4) FIELD LIMITING
    limitFields(){
        if(this.queryString.field){
            const fields = this.queryString.field.split(',').join(' ');
            this.query = this.query.select(fields)
        }else{
            this.query = this.query.select('-__v');
        };

        return this;
    }

    // 5) PAGINATION
    paginate(){
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
        // if query contains a page query
        // count the number of documents/tours in the DB
        // check if the skip number is bigger or equal to the number of documents/tours
        // if yes throw and error which will fall directly in the catch block below.
        // not needed in case of having a Class
        // if(req.query.page){
        //     const numTours = await Tour.countDocuments();
        //     if(skip >= numTours) throw new Error('This page does not exist');
        // }
    }
}

module.exports = ApiFeatures;