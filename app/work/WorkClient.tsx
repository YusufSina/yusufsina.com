"use client";

import Link from "next/link";
import { useState } from "react";
import ProjectMeta from "./ProjectMeta";

interface Project {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  link?: string;
  year?: string;
  role?: string;
  status?: string;
  stack?: string[];
  cover?: string;
}

interface WorkClientProps {
  initialProjects: Project[];
  projectsPerPage: number;
}

export default function WorkClient({ initialProjects, projectsPerPage }: WorkClientProps) {
  const [displayedProjects, setDisplayedProjects] = useState(projectsPerPage);
  const visibleProjects = initialProjects.slice(0, displayedProjects);
  const hasMore = displayedProjects < initialProjects.length;

  const loadMore = () => {
    setDisplayedProjects((prev) => Math.min(prev + projectsPerPage, initialProjects.length));
  };

  return (
    <>
      {/* Projects */}
      <div className="space-y-8 mb-12">
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0 flex flex-col sm:flex-row gap-6"
          >
            {project.cover && (
              <Link
                href={`/work/${project.slug}`}
                className="block shrink-0 sm:w-56 aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700"
                tabIndex={-1}
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                />
              </Link>
            )}
            <div className="min-w-0 flex-1">
              <Link href={`/work/${project.slug}`}>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-accent transition-colors">
                  {project.title}
                </h2>
              </Link>
              <ProjectMeta year={project.year} role={project.role} status={project.status} className="mb-3" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.excerpt}</p>
              <ProjectMeta stack={project.stack} className="mb-4" />
              <Link
                href={`/work/${project.slug}`}
                className="text-accent hover:underline inline-flex items-center gap-2"
              >
                View project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent rounded-lg text-gray-700 dark:text-gray-300 hover:bg-accent hover:text-white transition-colors"
          >
            Load more
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Show message when all projects are loaded */}
      {!hasMore && initialProjects.length > 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          All projects loaded
        </div>
      )}
    </>
  );
}

