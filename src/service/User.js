const connection = require('../conexao/database');
const crypto = require('crypto');
module.exports = {
    async index (require, response){
        const usuarios = await connection('usuarios').select('*');
        return response.json(usuarios);
    },
    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('usuarios').insert({
        nome,
        email,
        localizacao,
    })
    return response.json({ email });
    }
};