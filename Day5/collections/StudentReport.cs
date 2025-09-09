using System;
using System.Collections.Generic;

class StudentReport
{


    static void Main()
    {
        List<Student> studentList = new List<Student>();
        Console.WriteLine("How many students you want to add");
        int studentCount = int.Parse(Console.ReadLine());

        for (int i = 0; i < studentCount; i++)
        {
            Console.WriteLine("Enter Student ID:");
            int id = int.Parse(Console.ReadLine());

            Console.WriteLine("Enter Student Name:");
            string name = Console.ReadLine();

            Console.WriteLine("Enter Number of subjects:");
            int subjectCount = int.Parse(Console.ReadLine());

            Dictionary<string, int> subjectDictionary = new Dictionary<string, int>();


            for (int j = 0; j < subjectCount; j++)
            {

                Console.WriteLine("Enter name of subject:" + (j + 1));
                string subject = Console.ReadLine();

                Console.WriteLine("Enter marks of subject:" + subject);
                int marks = int.Parse(Console.ReadLine());

                subjectDictionary.Add(subject, marks);

            }


            Student student = new Student(id, name, subjectDictionary);
            studentList.Add(student);

            foreach (var studentdata in studentList)
            {
                studentdata.Display();
            }
        }




    }
}