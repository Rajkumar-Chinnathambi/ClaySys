using System;

namespace FirstApp
{
    internal class Program
    {
        static void Main()
        {
            WelcomeWishes();
            // Calculator class
            Calculator cal = new Calculator();
            cal.Calculation();          
        }        
        static void WelcomeWishes()
        {
            Console.WriteLine("Enter Your Name :");
            string name = Console.ReadLine();
            Console.WriteLine($"Hello {name},");
            Console.WriteLine("Welcome to our world");
        }
    }
}
