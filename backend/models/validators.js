const is_id = (word) => {
  return /^[0-9]{9}$/.test(word);
};

module.exports = { is_id };
