const connection = require('../conexao/database');

module.exports = {
    async create(request, response) {
        const { email } = request.body;

        const usuario = await connection('usuarios')
            .where('email', email)
            .select('name')
            .first();

        if (!usuario) {
            return response.status(400).json({ error: 'No User found with this email'});
        }

        return response.json(usuario);
    }
}