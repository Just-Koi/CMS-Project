import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
    try {
        const data = await req.json();
        console.log(data);

        // Extract data
        const pages = data["pages"];
        const projectName = data["project_name"];

        // Define the directory and file path
        const dataDir = path.join(process.cwd(), 'app/data'); // Ensure 'data' directory
        const projectPagesFilePath = path.join(dataDir, `project_${projectName}_pages.json`);

        // Check if the directory exists; if not, create it
        try {
            await fs.access(dataDir); // Check if directory exists
        } catch {
            await fs.mkdir(dataDir, { recursive: true }); // Create directory if missing
        }

        let existingPages = [];
        try {
            // Read file if it exists
            const fileContent = await fs.readFile(projectPagesFilePath, "utf8");
            existingPages = JSON.parse(fileContent);
        } catch (error) {
            if (error.code !== "ENOENT") throw error; // Ignore "file not found" error, but rethrow others
        }

        // Merge new pages with existing ones
        existingPages.push(...pages);

        // Write updated data to file
        await fs.writeFile(projectPagesFilePath, JSON.stringify(existingPages, null, 2));

        console.log("✅ Project structure created/updated:", existingPages);

        return NextResponse.json({ message: "Project structure updated", pages: existingPages }, { status: 200 });

    } catch (error) {
        console.error("❌ Error:", error);
        return NextResponse.json({ error: "Failed to create a website structure" }, { status: 500 });
    }
}
