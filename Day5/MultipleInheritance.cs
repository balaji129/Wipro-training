
using school;
public interface ICurricularActivities
{


    void Stream();
    void Show();

}

public interface INonCurricularActivities
{

    void Stream();
}

public class Student : Person, ICurricularActivities, INonCurricularActivities
{

    public int RollNumber { get; set; }
    public void Study()
    {

    }

    public void Show()
    {

        
    }

    public void Stream()
    {
        Console.WriteLine("Taken Science Stream");
    }

    public void Activities()
    {
        Console.WriteLine("Sports - BasketBall");
    }


    static void Main()
    {

        Student s = new Student();
        Console.WriteLine("Enter the name of student");
        string sname = Console.ReadLine();
        s.Name = sname;
        s.Study();
        s.Display();
        s.Stream();
        s.Activities(); 
    }
}