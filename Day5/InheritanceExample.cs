// /*Inheritance --- When a child class is inheriting some of the properties of base class 

// In Inheritane we use some conventions like base class , super class , parent class

// similarly we call the class  who has inherited the features of base class as child class,
// sub class , derived class  */

// /*Types of Inheritance*/
// // single inheritance --- There is one base class and one child class

// public class Person
// {
//     //properties 
//     protected string Name { get; set; }
//     public virtual void Display()
//     {
//         Console.WriteLine("Displaying Name you entered :");
//     }

//     public void setName(string Name)
//     {

//         this.Name = name;
//     }
// }

// // Single Level
// public class Student : Person
// {

//     // public Student(string name)
//     // {
//     //     Name = name;
//     // }
//     public int RollNumber { get; set; }

//     public void Study()

//     { Console.WriteLine(Name + "is studying :"); }

//     static void Main()
//     {

//         Student stud = new Student();
//         //stud.Name = "Niti";
//         stud.setName("Niti");
//         stud.RollNumber = 2004;
//         stud.Display();
//         stud.Study();
//     }

// }
