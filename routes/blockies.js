'use strict';
const blockies = require('ethereum-blockies-png');

module.exports = (request, response) => {

  var buffer = blockies.createBuffer({
    seed: request.params.address,
  });

  response.send(buffer)
}
