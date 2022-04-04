const { getAllCareers, getOneCareer, createCareer, updateCareer, deleteCareer } = require('./careers.service');

const handlerGetAllCareers = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    const { total, careers } = await getAllCareers(limit, page);

    res.json({
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      careers,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error getting careers' });
  }
};

const handlerGetOneCareer = async (req, res) => {
  const { id } = req.params;

  try {
    const career = await getOneCareer(id);

    if (!career.state) {
      return res.status(404).json({ msg: 'Career not found' });
    }

    return res.json(career);
  } catch (error) {
    return res.status(500).json({ msg: 'Error getting career' });
  }
};

const handlerCreateCareer = async (req, res) => {
  const { _id, state, updatedAt, createdAt, ...rest } = req.body;

  try {
    const career = await createCareer(rest);

    res.json(career);
  } catch (error) {
    res.status(500).json({ msg: 'Error creating career' });
  }
};

const handlerUpdateCareer = async (req, res) => {
  const { id } = req.params;
  const { _id, state, updatedAt, createdAt, ...rest } = req.body;

  try {
    const career = await updateCareer(id, rest);

    res.json(career);
  } catch (error) {
    res.status(500).json({ msg: 'Error updating career' });
  }
};

const handlerDeleteCareer = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCareer(id);

    return res.json({ msg: `Career deleted with id${id}` });
  } catch (error) {
    return res.status(500).json({ msg: 'Error deleting career' });
  }
};

module.exports = {
  handlerGetAllCareers,
  handlerGetOneCareer,
  handlerCreateCareer,
  handlerUpdateCareer,
  handlerDeleteCareer,
};