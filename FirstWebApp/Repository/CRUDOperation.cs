using FirstWebApp.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Data;
using System.Runtime.Remoting.Messaging;
using System.Web.Helpers;

namespace FirstWebApp.Repository
{
    public class CRUDOperation
    {
        private SqlConnection _connection;

        SqlCommand _command;

        public CRUDOperation()
        {
            _connection = new SqlConnection("Data Source=localhost\\sqlexpress;database=ClaySys;Integrated Security=True");
        }

        public string InsertOperation(CRUD cd)
        {            
            
                if (IsUserExist(cd.Email)) 
                {
                    try
                    {
                        _command = new SqlCommand("insertNewUser", _connection);
                        _command.CommandType = CommandType.StoredProcedure;
                        _command.Parameters.AddWithValue("@username", cd.UserName);
                        _command.Parameters.AddWithValue("@email", cd.Email);
                        _command.Parameters.AddWithValue("@password", cd.Password);
                        _connection.Open();
                        int result = (int)_command.ExecuteNonQuery();
                        _connection.Close();
                        if (result >= 1)
                        {
                            return "Success";
                        }
                        else
                        {
                            return $"Something Error, try again {result}";
                        }
                    }
                    catch
                    {
                        return "Something Error, try again";
                    }                
                }
                else
                {
                    return "Email Already Exist";
                }
           
            

        }
        public List<CRUD> ReadAllUser(CRUD cd) { 
            List<CRUD> allUser = new List<CRUD>();
            try
            {
                _command = new SqlCommand("select * from UserDetails", _connection);
                _connection.Open();
                SqlDataReader dr = _command.ExecuteReader();
                while (dr.Read()) {
                    allUser.Add(new CRUD() { Id = (int)dr["Id"], UserName = (string)dr["UserName"], Email = (string)dr["Email"], Password = (string)dr["Password"] });
                }
                return allUser;
            }
            catch { 
                return null;
            }

            
        }

        public List<CRUD> ReadSingleUser(CRUD cd)
        {
            try
            {
                _command = new SqlCommand("select * from UserDetails where Id= @id", _connection);
                _command.Parameters.AddWithValue("@id", cd.Id);
                _connection.Open();
                SqlDataReader dr =_command.ExecuteReader();
                List<CRUD> singleUser = new List<CRUD>();
                while (dr.Read()) {
                    singleUser.Add(new CRUD() { Id = (int)dr["Id"], UserName = (string)dr["UserName"], Email = (string)dr["Email"],Password = (string)dr["Password"] });
                }
                _connection.Close();
                return singleUser;
            }
            catch { return null; }
            
        }

        public bool IsUserExist(string email)
        {
            try
            {
                _command = new SqlCommand("select count(*) from UserDetails where Email= @email", _connection);
                _command.Parameters.AddWithValue("@email", email);
                _connection.Open();
                int isUserExist = (int)_command.ExecuteScalar();
                _connection.Close();
                return isUserExist < 1;
            }
            catch { return false; }
        }

        public string UpdateUser(CRUD cd)
        {
            try
            {
                _command = new SqlCommand("update UserDetails set UserName=@username,Email=@email,Password=@password where Id= @id", _connection);
                _command.Parameters.AddWithValue("@username", cd.UserName);
                _command.Parameters.AddWithValue("@email", cd.Email);
                _command.Parameters.AddWithValue("@password", cd.Password);
                _command.Parameters.AddWithValue("@id", cd.Id);
                _connection.Open();
                int updateStatus = _command.ExecuteNonQuery();
                _connection.Close();
                if (updateStatus > 0)
                {
                    return "Success";
                }
                else
                {
                    return "Something Error, try again";
                }
            }
            catch { return "Something Error, try again"; }
        }

        public bool DeleteUser(CRUD cd) {

            try
            {
                _command = new SqlCommand("delete from UserDetails where Id= @id", _connection);
                _command.Parameters.AddWithValue("@id", cd.Id);
                _connection.Open();
                int deleteStatus = _command.ExecuteNonQuery();
                _connection.Close();
                if (deleteStatus > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch { return false; }
            
        }
    }
}