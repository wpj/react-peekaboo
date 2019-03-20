const isCI = 'CI' in process.env;

const args = isCI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [];

module.exports = {
  launch: {
    args,
  },
};
