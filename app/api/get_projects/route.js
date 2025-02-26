import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'app/data/projects.json');

// Utility function to read JSON data from a file
const readJSONFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (error) {
        console.error("Error reading JSON file:", error);
    }
    return []; // Return an empty array if the file is missing or invalid
};

// Handle GET request to retrieve all projects
export async function GET() {
    try {
        return NextResponse.json({ projects: readJSONFile(projectsFilePath) }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}