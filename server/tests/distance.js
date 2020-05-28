var distance = require('google-distance');
distance.apiKey = 'AIzaSyCzergJtxQLoSSOfOzgisstnI8MWFcrJhQ';

let a = function getPrice(origin, destination, next){
    distance.get(
        {
          origin: origin,
          destination: destination
        },
        function(err, data) {
          if (err) 
            return next(err)
          else
            return next(null, data.distance)
      });
      
}
let origin = 'Gara Timisoara Nord';
let destination = 'Gara Băile Herculane';
a(origin, destination, function(error, distance){
    console.log(error);
    console.log(typeof parseInt(distance.split(' ')[0]));
    console.log(parseInt(distance.split(' ')[0]));
})