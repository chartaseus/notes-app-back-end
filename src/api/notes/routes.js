/* Karena menggunakan plugin, kita tidak akan menggunakan
fungsi-fungsi handler dari hasil impor secara langsung,
melainkan handler yang akan digunakan pada route kali ini
dimasukkan sebagai parameter fungsi. Inilah mengapa kita
membuat fungsi yang mengembalikan array alih-alih membuat
array secara langsung.
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
];

module.exports = routes;
