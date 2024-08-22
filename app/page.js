import { CreateProjectForm } from "./createprojectform";
import { Projects } from "./projects";

export default function Home() {
  return (
    <>
      <aside>
        <CreateProjectForm />
      </aside>
      <main className="container mx-auto mt-6">
        <Projects />
      </main>
    </>
  );
}
