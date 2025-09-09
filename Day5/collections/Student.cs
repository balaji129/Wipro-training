public class Student
{

    public int ID { get; set; }
    public string Name { get; set; }
    public Dictionary<string, int> SubjectMarks { get; set; }
    public Student(int id, string name, Dictionary<string, int> subjectMarks)
    {
        ID = id;
        Name = name;
        SubjectMarks = subjectMarks;
    }

    public double GetAverage()
    {

        int total = 0;
        foreach (var marks in SubjectMarks.Values)
        {

            total += marks;
        }
        return (double)total / SubjectMarks.Count;
    }
    public void Display()
    {

        //code to display

        Console.WriteLine("Student id:" + ID);
        Console.WriteLine("Student name:" + Name);

        Console.WriteLine("Student Marks:");
        foreach (var subject in SubjectMarks)
        {
            Console.WriteLine(subject.Key + " " + subject.Value);
        }

        Console.WriteLine("Average Marks :" + GetAverage());
    }

}