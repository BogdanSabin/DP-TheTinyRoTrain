const serverError = require('./error');

module.exports.createResource = function(options, next){
    if(!options.data)
        return next(serverError.MissingArgument('Data in function createResource'));
    
    if(!options.Model)
        return next(serverError.MissingArgument('Model in function createResource'));

    let Model = options.Model;

    if(!options.createFilter)
        options.createFilter = {}
    
    let filter = options.createFilter;

    if(!options.responseFilter)
        options.responseFilter = function(data, next){
            return next(null, data);
        }
    
    let responseFilter = options.responseFilter;

    if(!options.transformData)
        options.transformData = function(data, next){
            return next(null, data);
        }
    
    let transformData = options.transformData;

    Model.findOne(filter, function(error, doc){
        if(error)
            return next(serverError.InteralError(error));
        
        if(doc)
            return next(serverError.Collision());
        
        transformData(options.data, function(error, transformedData){
            if(error)
                return next(serverError.InteralError(error));
            
            let newDoc = new Model(transformedData);
            newDoc.save().then(() => {
                responseFilter(newDoc, function(error, data){
                    if(error)
                        return next(serverError.InteralError(error));  
                    return next(null, data);
                });
            });

        });

    });

}

module.exports.updateResource = function(options, next){
    if(!options.data)
        return next(serverError.MissingArgument('Data in function createResource'));
    
    if(!options.Model)
        return next(serverError.MissingArgument('Model in function createResource'));
    let Model = options.Model;

    if(!options.updateFilter)
        return next(serverError.MissingArgument('Update filter in function updateResource'));
    let filter = options.updateFilter;
 
    if(!options.updateData)
        options.updateData = function(data, next){
            return next(null, data);
        }
    let updateData = options.updateData

    updateData(options.data, function(error, data){
        if(error)
            return next(serverError.InteralError(error));
        if(!data)
            return next(serverError.NodataFound());
        
        Model.updateOne(filter, data, function(error, mongores){
            if(error)
                return next(serverErrors.InteralError(error));
            if(mongores.nModified == 0)
                return next('No data modified');
            return next(null, 'Data updated');
        }) 
    });   
}

module.exports.getResourceByid = function(options, next){
    if(!options.id)
        return next(serverError.MissingArgument('Data in function getResourceByid'));

    if(!options.Model)
        return next(serverError.MissingArgument('Model in function getResourceByid'));
    let Model = options.Model;

    if(!options.responseFilter)
        options.responseFilter = function(data, next){
            return next(null, data);
        }
    
    let responseFilter = options.responseFilter;

    Model.findOne({_id: options.id}, function(error, doc){
        if(error)
            return next(serverError.InteralError(error));
        if(!doc)
            return next(serverError.NodataFound());
        
        responseFilter(doc, function(error, data){
            if(error)
                return next(serverError.InteralError(error));
            if(!data)
                return next(serverError.NodataFound());

            return next(null, data);        
        });
    });
}

module.exports.getAllResources = function(options, next){
    if(!options.Model)
    return next(serverError.MissingArgument('Model in function getAllResources')); 
    let Model = options.Model;
    
    if(!options.getAllFilter)
        options.getAllFilter = {};
    let filter = options.getAllFilter;

    if(!options.responseFilter)
        options.responseFilter = function(data, next){
            return next(null, data);
        }
    let responseFilter = options.responseFilter;

    Model.find(filter, function(error, docs){
        if(error)
            return next(serverErrors.InteralError(error));
        if(!docs)
            return next(serverErrors.NodataFound());

        responseFilter(docs, function(error, newData){
            if(error)
                return next(serverErrors.InteralError(error));
            
            if(!newData)
                return next(serverErrors.NodataFound());
                
            return next(null, newData);
        });
    });
}

module.exports.deleteResourceByid = function(options, next){
    if(!options.id)
        return next(serverError.MissingArgument('id in function deleteResourceByid'));

    if(!options.Model)
        return next(serverError.MissingArgument('Model in function deleteResourceByid'));
    let Model = options.Model;

    Model.deleteOne({_id: options.id}, function(error, data){
        if(error)
            return next(serverErrors.InteralError(error));
        if(data.deletedCount == 0)
            return next(serverError.NodataFound())
        return next(null, "Deleted " + options.id);
    });
}
