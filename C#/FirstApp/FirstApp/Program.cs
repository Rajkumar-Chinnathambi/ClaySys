using System;
using System.Data.SqlClient;

namespace FirstApp
{
    internal class Program
    {
        static void Main()
        {
            /*SqlCRUD sql = new SqlCRUD();
            sql.UpdateRecord();*/

            DisplaySqlData();
            /* WelcomeWishes();
            // Calculator class
            Calculator cal = new Calculator();
            cal.Calculation();*/          
        }        
        static void WelcomeWishes()
        {
            Console.WriteLine("Enter Your Name :");
            string name = Console.ReadLine();
            Console.WriteLine($"Hello {name},");
            Console.WriteLine("Welcome to our world");
        }
        static void DisplaySqlData()
        {
            SqlConnection connection = new SqlConnection("Data Source=localhost\\sqlexpress;Initial Catalog=ClaySys;Integrated Security=True");
           
            SqlCommand cmd = new SqlCommand("select * from EMPLOYEE",connection);
            connection.Open();
            SqlDataReader dr = cmd.ExecuteReader();      
           
            while (dr.Read()) {

                for (int i = 0; i < dr.FieldCount; i++)

                {
                    string datatype=dr[i].GetType().Name;
                    if (datatype == "String")
                    {
                        Console.Write(dr[i].ToString());
                        for (int j = 0; j < 15-dr[i].ToString().Length; j++)
                        {
                            Console.Write(" ");
                        }
                    }
                    else
                    {
                        int num =int.Parse(dr[i].ToString());
                        if (num < 10)
                        {
                            Console.Write($" 0{dr[i]} ");
                        }
                        else if(num>1000 && num < 100000)
                        {
                            Console.Write($" {dr[i]}  ");
                        }
                        else
                        {
                            Console.Write($" {dr[i]} ");
                        }
                    }
                }
                Console.WriteLine();    

            }
            dr.Close();
            connection.Close();
        }
    }
}
