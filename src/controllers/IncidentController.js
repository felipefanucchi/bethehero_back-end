const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const user = connection('ongs')
      .where('id', ong_id)
      .select('id')
      .first();

    console.log(ong_id, user)

    if (!ong_id || !user.id) {
      return response.status(401).json({
        error: 'User not valid.',
      });
    }

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },
  async index(request, response) {
    const incidents = await connection('incidents').select('*');
    return response.json(incidents);
  },
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (!incident || incident.ong_id !== ong_id) {
      return response.status(401).json({
        error: 'Operation not allowed.',
      });
    }

    await connection('incidents')
      .where('id', id)
      .delete();
    
    return response.status(204).send();
  }
}