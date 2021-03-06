const Careers = require('./careers.model');
const { cleanCloudinary } = require('../../helpers/cloudinaryActions');

const getAllCareers = async (limit, page) => {
  const [total, careers] = await Promise.all([
    Careers.countDocuments({ state: true }),
    Careers.find({ state: true })
      .limit(limit)
      .skip((page - 1) * limit),
  ]);

  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: careers,
  };
};

const getOneCareer = async (id) => {
  const career = await Careers.findById(id);
  return career;
};

const createCareer = async (rest) => {
  const career = await Careers.create(rest);

  return career;
};

const updateCareer = async (id, rest) => {
  const careerOld = await Careers.findById(id);

  if (rest.photo) cleanCloudinary(careerOld.photo, 'careers');

  const career = await Careers.findByIdAndUpdate(id, rest, { new: true });

  return career;
};

const deleteCareer = async (id) => {
  const career = await Careers.findByIdAndUpdate(id, { state: false }, { new: true });
  return career;
};

const destroyCareer = async (id) => {
  const career = await Careers.findByIdAndDelete(id);

  cleanCloudinary(career.photo, 'careers');

  return career;
};

const getAllCareerNames = async () => {
  const careers = await Careers.find({ state: true });
  const names = careers.map((career) => career.name);
  const uniqueNames = [...new Set(names)];

  return uniqueNames;
};

module.exports = {
  getAllCareers,
  getOneCareer,
  createCareer,
  updateCareer,
  deleteCareer,
  destroyCareer,
  getAllCareerNames,
};
