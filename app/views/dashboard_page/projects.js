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

    const toggleProjectMenu = (id) => {
        const projectMenu = document.getElementById('project_menu_' + id);
        projectMenu.classList.toggle('hidden');
    }

    const toggleProjectDetails = (id) => {
        const projectDetailsForm = document.getElementById('project_details_form_' + id);
        projectDetailsForm.classList.toggle('hidden');
    }

    return (
        <>
        {projects.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 gap-8 justify-center'>                        
                {projects.map((project, index) => (
                    <div key={index}>
                        <div  className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
                            <div id={"project_menu_" + project.id}
                                className="absolute top-6 right-16 z-50 shadow-xxl hidden"
                            >
                                <ul className="w-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <li>
                                        <button 
                                            className="w-full py-2 px-3 text-left text-gray-800 dark:text-white"
                                            onClick={(id) => toggleProjectDetails(project.id)}
                                        >
                                            Change project details
                                        </button>
                                    </li>
                                    <li className="border-y-2 border-gray-200/15">
                                        <button className="w-full py-2 px-3 text-left text-gray-800 dark:text-white">
                                            Duplicate
                                        </button>
                                    </li>
                                    {/* <li className="my-8"> 
                                        {/* spacer between delete and other functions } 
                                        <p className="text-center dark:text-gray-200/20 text-gray-800/20 select-none">
                                            spacer between delete and other functions
                                        </p>
                                    </li> */}
                                    <li className="border-gray-200/15">
                                        <button className="w-full py-2 px-3 text-left text-red-500">
                                            Delete
                                        </button>    
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-6">
                                <button 
                                    onClick={(id) => toggleProjectMenu(project.id)}
                                    className="text-white absolute right-3 top-3 w-10 h-10 rounded-full hover:bg-white hover:text-gray-800 items-center transition-colors">
                                    <i className="fas fa-bars"></i>
                                </button>
                            </div>
                            <Link
                                href={project.path}
                            >
                                <div className="p-5">
                                    <div className="thumbnail-container">
                                        <div className="thumbnail">
                                            <iframe src={project.path} frameborder="0"></iframe>
                                        </div>
                                    </div>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {project.title}
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {project.description}
                                    </p>
                                </div>
                            </Link>
                            
                        </div>
                        <div 
                            id={'project_details_form_' + project.id} 
                            className="hidden absolute top-0 left-0 z-50 w-full h-full bg-white" 
                        >
                            <button 
                                    onClick={(id) => toggleProjectDetails(project.id)}
                                    className="absolute right-5 top-5 p-2 rounded hover:rounded-full bg-white/5 hover:bg-white text-red-800/20 hover:text-red-800 items-center transition-all">
                                    <i className="fas fa-x"></i> 
                                    &nbsp;
                                    close product details
                            </button>
                            <form className="flex flex-col gap-3">
                                <h3 className="text-gray-700 dark:text-gray-100 text-center">
                                    Change project details
                                </h3>
                                <div>
                                    <label></label>
                                    <input />
                                </div>
                                <div>
                                    <label></label>
                                    <textarea></textarea>
                                </div>
                                <div>
                                    <input />
                                </div>
                            </form>
                        </div>
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
