using Factio.DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.BL
{
    public class NoteService : INoteService
    {
        protected readonly FactioContext _factioContext;
        public NoteService(FactioContext factioContext)
        {
            _factioContext = factioContext;
           
        }

        public bool DeleteNote(int noteId)
        {
            try
            {
                Note note = _factioContext.Notes.FirstOrDefault(x => x.Id == noteId);
                _factioContext.Notes.Remove(note);
                _factioContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }

            return true;
        }

        public List<Note> GetAllNotes()
        {
            return this._factioContext.Notes.ToList();
        }


        public List<Note> GetNotesByUserFk(int userId)
        {
            return this._factioContext.Notes.Where(c => c.UserFK == userId).ToList();
        }


        public Note GetNoteById(int noteId)
        {
            try
            {
                Note note = _factioContext.Notes
                    .FirstOrDefault(x => x.Id == noteId);
                return note;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }


        public Note InsertNote(Note note)
        {
            try
            {
                _factioContext.Notes.Add(note);
                _factioContext.SaveChanges();
                return note;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public Note UpdateNote(int noteId, Note note)
        {
            try
            {
                Note oldNote = _factioContext.Notes.FirstOrDefault(x => x.Id == noteId);
                oldNote.Title = note.Title;
                oldNote.Content = note.Content;
                oldNote.AddDate = note.AddDate;
                oldNote.EndDate = note.EndDate;
                _factioContext.SaveChanges();
                return note;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }
    }

}