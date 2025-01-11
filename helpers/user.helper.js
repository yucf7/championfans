const bcrypt = require('bcrypt');
module.exports.cryptPassword = async(password) =>{
  return bcrypt.hash(password, 10); 
}

module.exports.decryptPassword = async(password, hash) => {
    return bcrypt.compare(password, hash); 
}
