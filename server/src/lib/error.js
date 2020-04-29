module.exports = {
    NodataFound: function(){
        return {
            status: 404,
            data: 'No data Found'
        }
    },

    Forbidden: function(){
        return {
            status: 403,
            data: 'Forbidden'
        }
    },

    Collision: function(){
        return {
            status: 401,
            data: 'Collsion of fields in database'
        }
    },

    Unauthorized: function(){
        return {
            status: 401,
            data: 'Unauthorized'
        }
    },

    UnauthorizedError: function(error){
        return {
            status: 401,
            data: 'Unauthorized: ' + error 
        }
    },

    InteralError: function(error){
        return {
            status: 500,
            data: error
        }
    },

    MissingArgument: function(error){
        return {
            status: 500,
            data: 'Missing argument: ' + error
        }
    }
}