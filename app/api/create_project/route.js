// pages/api/createproject.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from "next/server";

// Path to the projects data file
const projectsFilePath = path.join(process.cwd(), '/app/data/projects.json');

// Utility function to read projects from file
const readProjectsFromFile = () => {
    if (fs.existsSync(projectsFilePath)) {
        const data = fs.readFileSync(projectsFilePath);
        return JSON.parse(data);
    }
    return [];
};

// Utility function to write projects to file
const writeProjectsToFile = (projects) => {
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
};

export async function POST(req) {
    try {
        const { projectName, projectDescription } = await req.json();

        // Generate folder name from project name
        const newProjectFolder = projectName.toLowerCase().replace(/ /g, '_');
        const projectsDir = path.join(process.cwd(), '/app/projects/', newProjectFolder);

        // Check if the directory already exists
        if (fs.existsSync(projectsDir)) {
            return NextResponse.json(
                { message: `Project '${newProjectFolder}' already exists.` }, 
                { status: 400 }
            );
        }

        // Create the directory
        fs.mkdirSync(projectsDir, { recursive: true });

        // Create a new file in the project folder
        const filePath = path.join(projectsDir, 'page.js');

        // Page content
        let pageDefault = 
        `
"use client"

import {CreateProjectStructure} from "../../views/project_page/createprojectstructure";

const page = () => {
    return(
        <>
            <CreateProjectStructure />
        </>
    )
}

export default page;

        `
        fs.writeFileSync(filePath, pageDefault);

        // Add the new project to the list of projects
        let projects = readProjectsFromFile();
        let projectData = {
            id: projects.length + 1,
            title: projectName, 
            description: projectDescription, 
            path: './projects/' + newProjectFolder + '/'
        }
        projects.push(projectData);
        writeProjectsToFile(projects);

        return NextResponse.json({ message: 'Project created successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

// GET handler to list all projects
export async function GET() {
    try {
        const projects = readProjectsFromFile();
        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}