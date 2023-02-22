const jwt = require('jsonwebtoken');

// jwt trabja con los callbacks y en base a promesas
//uid = unique id
const generarJWT = ( uid = '' ) => {

    return new Promise((resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se logro generar el Token');
            } else {
                resolve( token );
            }
        } );
    });
}

module.exports = {
    generarJWT
}