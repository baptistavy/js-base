const userRepository = require("../repositories/user.repositories");

async function create(input) {
  if (!input.name) {
    throw new Error("Name is required");
  }

  return userRepository.create(input);
}

async function getAll() {
  return userRepository.getAll();
}

async function getById(id) {
  return userRepository.getById(id);
}

async function update(id, input) {
  if (!input.name) {
    throw new Error("Name is required");
  }

  return userRepository.update(id, input);
}

async function remove(id) {
  return userRepository.remove(id);
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};