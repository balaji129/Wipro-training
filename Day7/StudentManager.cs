
/*Build a console application that:

Stores student data using a List<Student>

Supports adding students

Supports searching students by name

Supports sorting students by name or marks*/

using System;
using System.Collections.Generic;
using System.Linq;

public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Marks { get; set; }

    public Student(int id, string name, double marks)
    {
        Id = id;
        Name = name;
        Marks = marks;
    }

    public override string ToString()
    {
        return $"ID: {Id}, Name: {Name}, Marks: {Marks}";
    }
}


public class StudentManager
{
    private List<Student> students = new List<Student>();

    public void AddStudent(Student student)
    {
        students.Add(student);
    }

    public void SearchStudentByName(string name)
    {
        var result = students.Where(s => s.Name.ToLower().Contains(name.ToLower())).ToList();
        if (result.Count == 0)
            Console.WriteLine("No student found.");
        else
            result.ForEach(Console.WriteLine);
    }

    public void SortByName()
    {
        var sorted = students.OrderBy(s => s.Name).ToList();
        Console.WriteLine("Students sorted by name:");
        sorted.ForEach(Console.WriteLine);
    }

    public void SortByMarks()
    {
        var sorted = students.OrderByDescending(s => s.Marks).ToList();
        Console.WriteLine("Students sorted by marks:");
        sorted.ForEach(Console.WriteLine);
    }

    public void DisplayAll()
    {
        Console.WriteLine("All Students:");
        students.ForEach(Console.WriteLine);
    }
}


public class Program
{
    public static void Main()
    {
        StudentManager manager = new StudentManager();

        while (true)
        {
            Console.WriteLine("\n--- Student Manager ---");
            Console.WriteLine("1. Add Student");
            Console.WriteLine("2. Display All Students");
            Console.WriteLine("3. Search by Name");
            Console.WriteLine("4. Sort by Name");
            Console.WriteLine("5. Sort by Marks");
            Console.WriteLine("6. Exit");
            Console.Write("Enter your choice: ");

            string choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    Console.Write("Enter ID: ");
                    int id = Convert.ToInt32(Console.ReadLine());
                    Console.Write("Enter Name: ");
                    string name = Console.ReadLine();
                    Console.Write("Enter Marks: ");
                    double marks = Convert.ToDouble(Console.ReadLine());
                    manager.AddStudent(new Student(id, name, marks));
                    break;

                case "2":
                    manager.DisplayAll();
                    break;

                case "3":
                    Console.Write("Enter name to search: ");
                    string searchName = Console.ReadLine();
                    manager.SearchStudentByName(searchName);
                    break;

                case "4":
                    manager.SortByName();
                    break;

                case "5":
                    manager.SortByMarks();
                    break;

                case "6":
                    return;

                default:
                    Console.WriteLine("Invalid choice.");
                    break;
            }
        }
    }
}