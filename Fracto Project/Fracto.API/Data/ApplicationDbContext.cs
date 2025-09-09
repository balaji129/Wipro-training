using Fracto.Models;
using Microsoft.EntityFrameworkCore;

namespace Fracto.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Doctor> Doctors => Set<Doctor>();
        public DbSet<Specialization> Specializations => Set<Specialization>();
        public DbSet<Appointment> Appointments => Set<Appointment>();
        public DbSet<Rating> Ratings => Set<Rating>();
        public DbSet<DoctorImage> DoctorImages => Set<DoctorImage>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Doctor>()
                .HasOne(d => d.Specialization)
                .WithMany()
                .HasForeignKey(d => d.SpecializationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DoctorImage>()
                .HasOne(img => img.Doctor)
                .WithMany(d => d.Images)
                .HasForeignKey(img => img.DoctorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Rating>()
                .HasOne(r => r.Doctor)
                .WithMany()
                .HasForeignKey(r => r.DoctorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany()
                .HasForeignKey(a => a.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Specialization>().HasData(
                new Specialization { SpecializationId = 1, SpecializationName = "Cardiology" },
                new Specialization { SpecializationId = 2, SpecializationName = "Dermatology" },
                new Specialization { SpecializationId = 3, SpecializationName = "Pediatrics" }
            );
        }
    }
}
