"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const Projects = () => {

    // State to store the list of projects
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch all projects
    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/createproject', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const result = await response.json();
            setProjects(result.projects); // Assuming the response contains a `projects` array
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch projects when the component mounts
    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <>
        {projects.length > 0 ? (
            <div className='grid grid-cols-3 gap-8 justify-center'>                        
                {projects.map((project, index) => (
                    <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
                        <Link
                            href={project.path}
                        >
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {project.title}
                                </h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            ) : (
                <p className="text-center text-gray-500 text-sm">
                    No projects available. Create a new one!
                </p>
            )}
        
        </>
    );
}
