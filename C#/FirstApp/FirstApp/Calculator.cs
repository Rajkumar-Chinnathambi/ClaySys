using System;

namespace FirstApp
{
    public class Calculator
    {
        public  void Calculation()
        {
            int firstNumber = GetFisrtNum();
            int secondNumber = GetFisrtNum();
            Calculator cal = new Calculator();
            Console.WriteLine("Choose Operation :\n1.Add\n2.Sub\n3.Multification\n4.Divition");
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
        static int GetFisrtNum()
        {
            Console.WriteLine("Enter First Number :");
            int firstNumber = int.Parse(Console.ReadLine());
            return firstNumber;
        }
        static int GetSecondNum()
        {
            Console.WriteLine("Enter Second Number :");
            int secondNumber = int.Parse(Console.ReadLine());
            return secondNumber;
        }
        public int Add(int x, int y)
        {
            return x + y;
        }
        public int Sub(int x, int y)
        {
            return x - y;
        }
        public int Mul(int x, int y)
        {
            return x * y;
        }
        public int Div(int x, int y)
        {
            return x / y;
        }
    }
   
}
