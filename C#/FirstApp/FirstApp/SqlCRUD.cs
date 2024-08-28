using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace FirstApp
{
    internal class SqlCRUD
    {
        public SqlCRUD() {
            
        }
        
        public static void DisplayAllRecords()
        {
            SqlConnection connection = new SqlConnection("Data Source=localhost\\sqlexpress;Initial Catalog=ClaySys;Integrated Security=True");

            SqlCommand cmd = new SqlCommand("select * from EMPLOYEE", connection);
            connection.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            Console.WriteLine("Total columns : " + dr.FieldCount);
            while (dr.Read())
            {

                for (int i = 0; i < dr.FieldCount; i++)
                {
                    Console.Write(dr[i] + "\t");
                }
                Console.WriteLine();

            }
            dr.Close();
            connection.Close();
        }
        public void InsertRecord()
        {
            SqlConnection con = new SqlConnection("Data Source=localhost\\sqlexpress;Initial Catalog=ClaySys;Integrated Security=True");
            // Get Values from user
            int empId = GetIntInput("Employee Id");
            string eName = GetStringInput("Employee Name");
            int eSal = GetIntInput("Salary");
            string address = GetStringInput("Address");
            string sqlCmd = $"insert into EMPLOYEE(EMPID,E_NAME,E_SAL,E_ADDRESS) values({empId},'{eName}',{eSal},'{address}')";
            SqlCommand cmd = new SqlCommand(sqlCmd, con);
            con.Open();
            int result = cmd.ExecuteNonQuery();
            Console.WriteLine("Connnection State :" + con.State);
            con.Close();
            Console.WriteLine("Connnection State :" + con.State);
            if (result == 0)
            {
                Console.WriteLine("Result : Fail");
            }
            else
            {
                Console.WriteLine("Result : Success ");
            }
            
            DisplayAllRecords();

        }

        //Update Record using Employee id
        public  void UpdateRecord()
        {
            try
            {
                var con = CreateSqlConnection();
                int empid = GetIntInput("Employee ID");
                int empSal = GetIntInput("Salary");
                // Update Details get from user
                SqlCommand cmd = new SqlCommand($"update EMPLOYEE set E_SAL={empSal} where EMPID={empid}", con);
                con.Open();
                int result = cmd.ExecuteNonQuery();
                con.Close();
                if (result == 0)
                {
                    Console.WriteLine("Result : Fail");
                }
                else
                {
                    Console.WriteLine("Result : Success");
                }
                DisplayAllRecords();
            }
            catch (Exception ex)
            {   
                Console.WriteLine(ex.Message);
                Console.WriteLine("Do u want to update again? if Yes, Click '1':");
                int choice = int.Parse(Console.ReadLine());
                if (choice == 1)
                {
                    UpdateRecord();
                }
            }
        }
        static int GetIntInput(string inputName)
        {
            Console.WriteLine($"Enter {inputName} : ");
            int num =int.Parse(Console.ReadLine());
            return num;
        }
        static string GetStringInput(string inputName)
        {
            Console.WriteLine($"Enter {inputName} : ");
            string StringValue = Console.ReadLine();
            return StringValue;
        }
       public static SqlConnection CreateSqlConnection()
        {
            return new SqlConnection("Data Source=localhost\\sqlexpress;Initial Catalog=ClaySys;Integrated Security=True");
        }

    }
}
