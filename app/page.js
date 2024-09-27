import { CreateProjectForm } from "./views/dashboard_page/createprojectform";
import { Projects } from "./views/dashboard_page/projects";

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
