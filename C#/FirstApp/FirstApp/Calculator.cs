using System;

namespace FirstApp
{
    public class Calculator
    {
        public void Calculation()
        {
            int firstNumber = GetInputNum("First");
            int secondNumber = GetInputNum("Second");
            Calculator cal = new Calculator();
            Console.WriteLine("\n1.Add\n2.Sub\n3.Multification\n4.Divition");
            Console.WriteLine("Enter Operation Number :");
            int operation = int.Parse(Console.ReadLine());
            switch (operation)
            {
                case 1:
                    Console.WriteLine("Total :" + cal.Add(firstNumber, secondNumber));
                    break;
                case 2:
                    Console.WriteLine("Total : " + cal.Sub(firstNumber, secondNumber));
                    break;
                case 3:
                    Console.WriteLine("Total : " + cal.Mul(firstNumber, secondNumber));
                    break;
                case 4:
                    Console.WriteLine("Total : " + cal.Div(firstNumber, secondNumber));
                    break;
                default:
                    Console.WriteLine("Invalid Operation Number");
                    break;
            }
        }
        static int GetInputNum(string displayName)
        {
            Console.WriteLine($"Enter {displayName} Number :");
            int number = int.Parse(Console.ReadLine());
            return number;
        }
        
        public int Add(int x, int y) => x + y;       
        public int Sub(int x, int y) => x - y;       
        public int Mul(int x, int y) => x * y;       
        public int Div(int x, int y) => x / y;
        
    }
   
}
