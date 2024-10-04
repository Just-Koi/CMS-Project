// 1. Type in project information. (Make user form appaer) - done
// 2. After typing in information make button create clickable - done
// 3. Wait for the project to be created.  - done
    // - Get project info
    // - Create folder with file inside 
// 4. When project creation is complete give the user the option to go back to main page or to view the project.
// 5. Display the block with the project on the main page


"use client"

import { useState } from 'react';

export const CreateProjectForm = () => {

    let [projectName, setProjectName] = useState('');
    let [projectDescription, setProjectDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    
    if (projectDescription === ''){
        projectDescription = "You can add a project description whenever you want to."
    }

    const createProject = async () => {
        setIsLoading(true);

        const response = await fetch('api/create_project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                projectName,
                projectDescription,
            }),
        });

        setIsLoading(false);

        const result = await response.json();

        if(result.message == 'Project created successfully'){
            window.location.reload();
            toggleMessage();
        } else {
            alert(result.message);
        }

        toggleProjectForm();
    };

    const toggleProjectForm = () => {
        const createProjectForm = document.getElementById('createProjectForm');
        createProjectForm.classList.toggle('hidden');
    }

    const toggleMessage= () => {
        const message = document.getElementById('message');
        message.classList.toggle('hidden');
    }

    return(
        <>
        {/* Create project button */}
        <button 
            onClick={toggleProjectForm}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Create a New Project
        </button>

        {/* Message - Ask the user whether to view the main page or go to the project */}
        <div className="bg-black/50 absolute h-full w-full hidden" id="message">
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Project is ready!
                </h5>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    You can go check the project now or do it later! - (Function to go check the project doesn't work yet. Now I'm working at displaying all projects.)
                </p>
                <button class="font-medium items-center text-blue-600 hover:underline mr-8"
                        onClick={toggleMessage}
                >
                    Close
                </button>
                <button class="font-medium items-center text-blue-600 hover:underline mr-8">
                    Go to the project
                </button>
            </div>
        </div>

        {/* Create project form*/}
        <div className="w-full max-w-xs hidden" id="createProjectForm">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" id="create_project" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="project_name">
                        * Project name
                    </label>
                    <input className="shadow appearance-none border border-gray-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="project_name" 
                            type="text" 
                            placeholder="New Project" 
                            required
                            value={projectName} 
                            onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="project_description">
                        Project description
                    </label>
                    <textarea className="shadow appearance-none border border-gray-900 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="project_description" 
                                placeholder="This is a website of type blog called Travelio@.." 
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between mb-8">
                    <button 
                        type="button"
                        id="create_project"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={createProject}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create'}
                    </button>
                    <button 
                        onClick={toggleProjectForm}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        id="exit_btn"
                    >
                        Exit
                    </button>
                </div>
                <p className="text-center text-gray-500 text-xs">
                    Enjoy 🙂
                </p>
            </form>
            
        </div>
        </>
    )
}