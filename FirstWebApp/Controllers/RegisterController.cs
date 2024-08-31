using FirstWebApp.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FirstWebApp.Controllers
{
    public class RegisterController : Controller
    {
        // GET: Register
        SqlConnection conn;
        SqlCommand cmd;

        public RegisterController()
        {
            conn = new SqlConnection("Data Source=localhost\\sqlexpress;Initial Catalog=ClaySys;Integrated Security=True;");
        }

        public ActionResult RegisterIndex()
        {
            return View();
        }
        [HttpPost]
        public ActionResult CreateUser(RegisterUser ru)
        {
            List<RegisterUser> exitUser = new List<RegisterUser> ();
            
                cmd = new SqlCommand("Select * from UserDetails where Email = @email", conn);
                cmd.Parameters.AddWithValue("@email", ru.Email);
                conn.Open ();
                object isUserExist = cmd.ExecuteScalar();    
                conn.Close ();
                if(isUserExist ==null)
                { 
                    cmd = new SqlCommand("insert into UserDetails(UserName,Email,Password) Values(@userName,@email,@password)", conn);
                    cmd.Parameters.AddWithValue("@username", ru.UserName);
                    cmd.Parameters.AddWithValue("@email", ru.Email);
                    cmd.Parameters.AddWithValue("@password", ru.Password);
                    conn.Open();
                    int result = cmd.ExecuteNonQuery();
                    conn.Close();
                    if (result == 0)
                    {
                        ViewBag.result = "faile";
                        ViewBag.success = "faile";
                }
                    else
                    {
                        ViewBag.result = "Sucess";
                        ViewBag.success="success";
                    }
                }
                else{
                    ViewBag.result = "Already Exist";
                }
            return View("RegisterIndex");
        }

        public ActionResult ShowUsers(RegisterUser ru)
        {
            List<RegisterUser> exitUser = new List<RegisterUser>();
            SqlCommand cmd= new SqlCommand("select * from UserDetails", conn);
            conn.Open ();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                exitUser.Add(new RegisterUser() { Id = (int)reader["Id"], UserName = (string)reader["UserName"], Email = (string)reader["Email"], Password = (string)reader["Password"] });
            }
           
            return View(exitUser);
        }
        [HttpGet]
        public ActionResult UpdateUser(RegisterUser ru)
        {
            List<RegisterUser> singleUser = new List<RegisterUser>();
            SqlCommand cmd = new SqlCommand("select * from UserDetails where Id=@id", conn);
            cmd.Parameters.AddWithValue("@id",ru.Id);
            conn.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                singleUser.Add(new RegisterUser() { Id = (int)reader["Id"], UserName = (string)reader["UserName"], Email = (string)reader["Email"], Password = (string)reader["Password"] });
            }
            return View(singleUser);
        }

        [HttpPost]
        public ActionResult UpdateUserSave(RegisterUser ru)
        {
            List<RegisterUser> singleUser = new List<RegisterUser>();
            SqlCommand cmd = new SqlCommand("Update UserDetails set UserName=@uname Email=@email Password=@password where Id=@id", conn);
            cmd.Parameters.AddWithValue("@id", ru.Id);
            cmd.Parameters.AddWithValue("@uname", ru.UserName);
            cmd.Parameters.AddWithValue("@email", ru.Email);
            cmd.Parameters.AddWithValue("@password", ru.Password);
            conn.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                singleUser.Add(new RegisterUser() { Id = (int)reader["Id"], UserName = (string)reader["UserName"], Email = (string)reader["Email"], Password = (string)reader["Password"] });
            }
            return View(singleUser);
        }

    }
}