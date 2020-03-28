const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const ong = await connection('ongs')
      .where('id', ong_id)
      .select('id')
      .first()
      .catch(err => (
        response.status(400).json({
          error: 'User not found.',
        })
      ));

    if (!ong || !ong.id) {
      return response.status(400).json({
        error: 'Invalid user.',
      });
    }

    const price = parseFloat(value).toFixed(2);

    console.log({
      title,
      description,
      value: price,
      ong_id
    });

    const [id] = await connection('incidents').insert({
      title,
      description,
      value: price,
      ong_id
    });

    return response.json({ id });
  },
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city',
        'ongs.uf'
      ]);
    
    response.header('X-Total-Count', count['count(*)']);

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