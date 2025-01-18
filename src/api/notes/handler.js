/* Fungsi handler harus menghindari proses lain yang
bukan bagian dari request handling. Karena itu, proses
CRUD disimpan terpisah di notesService.js */
class NotesHandler {
  constructor(service, validator) {
    /* Parameter service nantinya akan diberikan nilai
    instance dari NotesService (defined when registering
    the plugin to server.js). Dengan begitu, NotesHandler
    memiliki akses untuk mengelola resource notes lewat
    properti `this._service`. */
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  postNoteHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    const { title = 'untitled', body, tags } = request.payload;

    const noteId = this._service.addNote({ title, body, tags });

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });
    response.code(201);
    return response;
  }

  getNotesHandler() {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(request) {
    const { id } = request.params;
    const note = this._service.getNoteById(id);
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  putNoteByIdHandler(request) {
    this._validator.validateNotePayload(request.payload);
    const { id } = request.params;

    this._service.editNoteById(id, request.payload);

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    };
  }

  deleteNoteByIdHandler(request) {
    const { id } = request.params;
    this._service.deleteNoteById(id);
    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
    };
  }
}

module.exports = NotesHandler;
