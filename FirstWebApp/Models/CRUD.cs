using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstWebApp.Models
{
    public class CRUD
    {
        public int Id { get; set; }

        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // Get all inputs
        public CRUD() { }
       
        // Get only id
        public CRUD(int id)
        {
            Id = id;
        }

    }
}