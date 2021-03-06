const { getAllTests, getOneTest, createTest, updateTest, deleteTest } = require('./vocationalTest.service');

const handlerGetAllTests = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;

  try {
    const tests = await getAllTests(limit, page);
    return res.json(tests);
  } catch (error) {
    return res.status(500).json({ msg: 'Error getting tests' });
  }
};

const handlerGetOneTest = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await getOneTest(id);

    if (!test.state) {
      return res.status(404).json({ msg: 'Test not found' });
    }
    return res.json(test);
  } catch (error) {
    return res.status(500).json({ msg: 'Error getting test' });
  }
};

const handlerCreateTest = async (req, res) => {
  const { _id, __v, state, updatedAt, createdAt, ...rest } = req.body;

  try {
    const test = await createTest(rest);
    return res.status(201).json(test);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const handlerUpdateTest = async (req, res) => {
  const { id } = req.params;
  const { _id, state, updatedAt, createdAt, ...rest } = req.body;

  try {
    const test = await updateTest(id, rest);

    return res.json(test);
  } catch (error) {
    return res.status(500).json({ msg: 'Error updating test' });
  }
};

const handlerDeleteTest = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteTest(id);

    return res.status(204).json({ msg: `Test deleted with id ${id}` });
  } catch (error) {
    return res.status(500).json({ msg: 'Error deleting test' });
  }
};

module.exports = {
  handlerGetAllTests,
  handlerGetOneTest,
  handlerCreateTest,
  handlerUpdateTest,
  handlerDeleteTest,
};
