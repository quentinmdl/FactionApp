using Factio.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.BL
{
    public interface INoteService
    {
        Note GetNoteById(int noteId);
        List<Note> GetAllNotes();
        List<Note> GetNotesByUserFk(int userId);
        bool DeleteNote(int noteId);
        Note InsertNote(Note note);
        Note UpdateNote(int noteId, Note note);
    }
}
