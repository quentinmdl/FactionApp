using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Factio.BL;
using Factio.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Factio.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private INoteService _noteService;


        public NoteController(INoteService noteService)
        {
            _noteService = noteService;
        }

        // GET: api/<NoteController>
        [HttpGet]
        //[Authorize]
        public List<Note> GetAllNotes()
        {
            //injection de dépendances
            return this._noteService.GetAllNotes();
        }


        // GET: api/<NoteController>
        [HttpGet("UserFk/{userId}")]
        //[Authorize]
        public List<Note> GetNotesByUserFk(int userId)
        {
            //injection de dépendances
            return this._noteService.GetNotesByUserFk(userId);
        }


        // GET api/<Note>/5
        [HttpGet("{id}")]
        //[Authorize]
        public Note GetNoteById(int id)
        {
            if (id == null)
                return null;

            return this._noteService.GetNoteById(id);
        }


        // POST api/<NoteController>
        [HttpPost("Add")]
        //[Authorize]
        public Note InsertNote(Note noteDTO)
        {
            return _noteService.InsertNote(noteDTO);
        }

        // PUT api/<NoteController>/5
        [HttpPut("{id}")]
        //[Authorize]
        public Note UpdateNote(int id, Note noteDTO)
        {
            return this._noteService.UpdateNote(id, noteDTO);
        }

        // DELETE api/<NoteController>/5
        [HttpDelete("{id}")]
        //[Authorize]
        public bool DeleteNote(int id)
        {
            if (id == null)
                return false;

            return this._noteService.DeleteNote(id);
        }
   
    }
}
