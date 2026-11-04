import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "../getProjects";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-gray-900">
      <div className="max-w-3xl w-full">
        <Link
          href="/work"
          className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors inline-block mb-8"
        >
          ← Back to work
        </Link>

        <article>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
            {project.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{project.date}</p>
          {project.link && (
            <div className="mb-8">
              <a
                href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:underline"
              >
                {project.link}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
          <div 
            className="markdown-content text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: project.contentHtml || project.excerpt }}
          />
        </article>
      </div>
    </main>
  );
}
