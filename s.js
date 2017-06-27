var s = require('superagent');

s.get('http://fipeapi.appspot.com/api/1/carros/veiculo/21/001267-0/2013-1.json')
    .then(res => {
        console.log(res.body)
    })
    .catch(err => {
        console.log(err.message)
    });
