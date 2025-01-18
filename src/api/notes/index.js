const routes = require('./routes');
const NotesHandler = require('./handler');

module.exports = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    // karena `routes` kini berupa fungsi yang menerima
    // handler sebagai parameter:
    const notesHandler = new NotesHandler(service, validator);
    server.route(routes(notesHandler));
  },
};
