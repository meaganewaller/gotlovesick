import Link from "next/link"
import type { Project } from "@/lib/types"

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div layout="row top-stretch">
      <div self="size-x3" className="mb-2 mr-2 leading-[140%]">
        <section className="scallop-rose-box mt-12">
          <section className="box-top">
            <section className="u01"></section>
          </section>
          <section className="box-center">
            <section className="box-inner text-center">
              <section className="py-10">
                <h2 className="text-deep-pink font-venice text-6xl">Projects</h2>
                <ul className="py-10 space-y-6">
                  {projects.map((project: Project) => (
                    <li key={project.databaseId}><Link href={`/projects/${project.slug}`} className="text-raspberry-pink">{project.title}</Link></li>
                  ))}
                </ul>
              </section>
            </section>
          </section>
          <section className="box-bottom">
            <section className="s01"></section>
          </section>
        </section>
      </div>
    </div>
  )
}

