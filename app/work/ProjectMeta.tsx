interface ProjectMetaProps {
  year?: string;
  role?: string;
  status?: string;
  stack?: string[];
  className?: string;
}

/** Year · role · status line followed by technology tags. */
export default function ProjectMeta({ year, role, status, stack = [], className = "" }: ProjectMetaProps) {
  const facts = [year, role].filter(Boolean);

  return (
    <div className={`space-y-3 ${className}`}>
      {(facts.length > 0 || status) && (
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          {facts.map((fact, i) => (
            <span key={fact} className="inline-flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">·</span>}
              {fact}
            </span>
          ))}
          {status && (
            <span className="ml-1 rounded-full border border-gray-300 dark:border-gray-600 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
              {status}
            </span>
          )}
        </p>
      )}
      {stack.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
