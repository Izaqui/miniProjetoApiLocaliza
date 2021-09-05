const connection = require('../conexao/database');
const crypto = require('crypto');
module.exports = {
    async index (require, response){
        const usuario = await connection('usuario').select('*');
        return response.json(usuario);
    },
    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('usuario').insert({
        nome,
        email,
        localizacao,
    })
    return response.json({ email });
    }
};