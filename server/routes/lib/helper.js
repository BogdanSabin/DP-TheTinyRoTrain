module.exports = {
    respond: function(res, error, data){
        if(error && error.status && error.data)
            res.status(error.status).send(error.data);
        else
            if(error)
                res.status(500).send(error);
            else
                res.status(200).send(data);

    }
}