import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_OG_IMAGE, siteConfig } from "@/lib/site";
import { getAllProjects } from "./getProjects";
import WorkClient from "./WorkClient";

const PROJECTS_PER_PAGE = 5;

export const metadata: Metadata = {
  title: "Work",
  description: siteConfig.work.description,
  alternates: { canonical: "/work/" },
  openGraph: { title: "Work", description: siteConfig.work.description, url: "/work/", images: [DEFAULT_OG_IMAGE] },
};

export default async function Work() {
  const allProjects = await getAllProjects();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-gray-900">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors inline-block mb-8"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
            My Work
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{siteConfig.work.description}</p>
        </div>

        <WorkClient initialProjects={allProjects} projectsPerPage={PROJECTS_PER_PAGE} />
      </div>
    </main>
  );
}
