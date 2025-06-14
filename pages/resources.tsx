// Resources: Blogs, Interviews, Media Coverage
export default function Resources() {
  return (
    <div className="flex flex-col gap-8">
      <section className="bg-accent rounded-lg p-4 mt-4 text-center">
        <h1 className="text-xl font-heading font-bold text-primary mb-2">Resources</h1>
        <p className="text-sm mb-2">Explore our collection of blogs, interviews, and media coverage to support your English learning journey and stay inspired.</p>
      </section>

      {/* Blogs Section */}
      <section className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-heading font-bold text-primary mb-2">Blogs</h2>
        <ul className="flex flex-col gap-2 text-sm">
          <li className="bg-lilac/20 rounded p-3">[Blog Title 1] - Short description of the blog post. <a href="#" className="text-primary underline ml-1">Read more</a></li>
          <li className="bg-lilac/20 rounded p-3">[Blog Title 2] - Short description of the blog post. <a href="#" className="text-primary underline ml-1">Read more</a></li>
        </ul>
      </section>

      {/* Interviews Section */}
      <section className="bg-lilac/20 rounded-lg shadow p-4">
        <h2 className="text-lg font-heading font-bold text-primary mb-2">Interviews</h2>
        <ul className="flex flex-col gap-2 text-sm">
          <li className="bg-white rounded p-3">[Interview Title 1] - Short description of the interview. <a href="#" className="text-primary underline ml-1">Watch/Read</a></li>
          <li className="bg-white rounded p-3">[Interview Title 2] - Short description of the interview. <a href="#" className="text-primary underline ml-1">Watch/Read</a></li>
        </ul>
      </section>

      {/* Media Coverage Section */}
      <section className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-heading font-bold text-primary mb-2">Media Coverage</h2>
        <ul className="flex flex-col gap-2 text-sm">
          <li className="bg-lilac/20 rounded p-3">[Media Title 1] - Short description of the media coverage. <a href="#" className="text-primary underline ml-1">View</a></li>
          <li className="bg-lilac/20 rounded p-3">[Media Title 2] - Short description of the media coverage. <a href="#" className="text-primary underline ml-1">View</a></li>
        </ul>
      </section>
    </div>
  );
}
