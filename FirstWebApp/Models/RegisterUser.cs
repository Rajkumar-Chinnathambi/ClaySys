using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstWebApp.Models
{
    public class RegisterUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public RegisterUser()
        {
            
        }

        public RegisterUser(string userName, string email, string password)
        {
            UserName = userName;
            Email = email;
            Password = password;
        }

        public RegisterUser(int id)
        {
            Id = id;
        }
    }
}