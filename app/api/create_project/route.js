import fs from 'fs';
import path from 'path';
import { NextResponse } from "next/server";

// Define paths for storing project data and project directories
const projectsFilePath = path.join(process.cwd(), '/app/data/projects.json');
const projectsBaseDir = path.join(process.cwd(), '/app/projects/');

// Utility function to read JSON data from a file
const readJSONFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (error) {
        console.error("Error reading JSON file:", error);
    }
    return []; // Return an empty array if there's an error
};

// Utility function to write JSON data to a file
const writeJSONFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Handle POST request to create a new project
export async function POST(req) {
    try {
        const { projectName, projectDescription } = await req.json();
        const newProjectFolder = projectName.toLowerCase().replace(/ /g, '_');
        const projectDir = path.join(projectsBaseDir, newProjectFolder);

        // Check if project directory already exists
        if (fs.existsSync(projectDir)) {
            return NextResponse.json({ message: `Project '${newProjectFolder}' already exists.` }, { status: 400 });
        }

        // Create new project directory
        fs.mkdirSync(projectDir, { recursive: true });

        // Default content for the project page file
        const defaultPageContent = `
"use client"

import {CreateProjectStructure} from "../../views/project_page/createprojectstructure";

const page = () => {
    return (
        <>
            <CreateProjectStructure projectTitle="${newProjectFolder}"/>
        </>
    );
}

export default page;
        `;

        // Create default page.js file in the project directory with the provided content
        fs.writeFileSync(path.join(projectDir, 'page.js'), defaultPageContent);

        // Read existing projects and append the new project
        const projects = readJSONFile(projectsFilePath);
        projects.push({
            id: projects.length + 1,
            title: projectName,
            description: projectDescription,
            path: `./projects/${newProjectFolder}/`
        });

        // Save updated projects list to file
        writeJSONFile(projectsFilePath, projects);

        return NextResponse.json({ message: 'Project created successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

