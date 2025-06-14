// Teacher Profile: Teacher bios and photos
export default function TeacherProfile() {
  return (
    <div className="flex flex-col gap-8">
      <section className="bg-accent rounded-lg p-4 mt-4 text-center">
        <h1 className="text-xl font-heading font-bold text-primary mb-2">Meet Our Teachers</h1>
        <p className="text-sm mb-2">Our team is comprised of passionate educators and language experts dedicated to your success. Learn more about their backgrounds and expertise.</p>
      </section>

      {/* Teacher Cards */}
      <section className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
        {/* Example Teacher Card */}
        <div className="flex items-center gap-4 bg-lilac/20 rounded p-3">
          <div className="w-16 h-16 bg-accent rounded-full flex-shrink-0" />
          <div>
            <div className="font-heading font-semibold text-primary">Aparna Sinha</div>
            <div className="text-xs text-darkBlue mb-1">Lead Instructor & Author</div>
            <div className="text-sm">Acclaimed author of Ashvamedha - The Game of Power and the Shadow Wing Series. Specializes in communication, writing, and English mastery.</div>
          </div>
        </div>
        {/* Add more teacher cards as needed */}
        <div className="flex items-center gap-4 bg-lilac/20 rounded p-3">
          <div className="w-16 h-16 bg-accent rounded-full flex-shrink-0" />
          <div>
            <div className="font-heading font-semibold text-primary">[Teacher Name]</div>
            <div className="text-xs text-darkBlue mb-1">[Role/Expertise]</div>
            <div className="text-sm">[Short bio and teaching philosophy.]</div>
          </div>
        </div>
      </section>
    </div>
  );
}
