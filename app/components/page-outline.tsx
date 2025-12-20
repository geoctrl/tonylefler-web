import { useEffect, useState } from "react";
import { always } from "../utils/classname-helpers";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function PageOutline() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all headings in the .docs container
    const docsContainer = document.querySelector(".docs");
    if (!docsContainer) return;

    const headingElements = docsContainer.querySelectorAll("h2, h3");
    const headingData: Heading[] = Array.from(headingElements).map(
      (heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.substring(1)),
      }),
    );

    setHeadings(headingData);

    // Set up IntersectionObserver to track active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66% 0px",
      },
    );

    headingElements.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="app-border sticky top-[calc(var(--app-header-height)+1rem)] h-fit max-h-[calc(100vh-var(--app-header-height)-2rem)] overflow-auto rounded-xl border p-4">
      <div className="text-grey-700 dark:text-grey-300 mb-3 text-sm font-semibold">
        On this page
      </div>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingLeft: heading.level === 3 ? "1rem" : "0",
            }}
          >
            <a
              href={`#${heading.id}`}
              className={always(
                "hover:text-primary-600 dark:hover:text-primary-400 block py-1 transition-colors",
                activeId === heading.id
                  ? "text-primary-600 dark:text-primary-400 font-medium"
                  : "text-grey-600 dark:text-grey-400",
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
