import { useState } from "react";

// https://www.youtube.com/watch?v=zgKH12s_95A

export const CreateProjectStructure = (projectTitle) => {
    const projectName = projectTitle["projectTitle"];

    // State variables should be declared at the top level of the component.
    const [newPageGroups, setNewPageGroups] = useState([
        {
            Page_Name: 'Home Page',
            Page_Type: 'Main Page'
        },
    ]);
    const handleChange = (index, event) => {
        console.log(event.target.name);
        const values = [...newPageGroups];
        // console.log(values);
        values[index][event.target.name] = event.target.value;
        // console.log(values[index][event.target.name]);
        setNewPageGroups(values);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            // console.log(newPageGroups);

            setIsLoading(true);

            // New object
            const requestData = {
                pages: newPageGroups,
                project_name: projectName
            };

            // Insert the array of page groups in one batch
            const response = await fetch('/api/create_structure', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });
    
            const result = await response.json();      
            // console.log(result);      

        } catch (err) {
            console.error('Unexpected error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const addNewField = () => {
        const newGroup = {
            Page_Name: '',
            Page_Type: 'Information Page'
        };
        setNewPageGroups([...newPageGroups, newGroup]);
    }

    //  finished on this thing!
    const removeField = (index) => {
        const values = [...newPageGroups];
        values.splice(index, 1);
        setNewPageGroups(values);
    }

    const [isLoading, setIsLoading] = useState(false);

    // Add a new page group
    // const addPageGroup = () => {
        
    // }

    return (
        <section 
            className="
                border border-slate-950/15 
                rounded-xl 
                p-10 
                shadow
                w-72
            "
        >
            <form
                method="POST"
                onSubmit={e => handleSubmit(e)} 
                html-add-page-form=""
            >
                <h3 
                    className="
                        text-lg 
                        my-1
                        text-purple-700 
                        select-none
                    "
                >
                    Hey, Let's add a new page to your project!
                </h3>

                {newPageGroups.map((newPageGroup, index) => (
                    <div 
                        // Add index number
                        className="
                            relative
                            flex 
                            flex-col
                            gap-3
                            mb-4
                        "
                        key={index}
                    >


                        {/* Page name */}
                        <div>
                            <label
                                className="
                                "
                            >
                                    Page Name
                            </label>
                            <input
                                name="Page_Name"
                                placeholder="Home Page"
                                className="
                                    text-sm
                                    py-3
                                    px-2
                                    border
                                    border-slate-800/25
                                    rounded
                                    w-full
                                "
                                value={newPageGroup.Page_Name}
                                onChange={event => handleChange(index, event)}
                            />
                        </div>
                        
                        {/* Website Type */}
                        <div>
                            <label>Page Type</label>
                            <select
                                name="Page_Type"
                                className="
                                    text-sm
                                    py-3
                                    px-2
                                    border
                                    border-slate-800/25
                                    rounded
                                    w-full
                                "
                                value={newPageGroup.Page_Type}
                                onChange={event => handleChange(index,  event)}
                            >
                                {/* 
                                    Make user able to create his own 
                                    option. 
                                */}
                                <option title="A page serving as the homepage of your website, where users can navigate and explore your site further.">
                                    Main Page
                                </option>
                                <option title="A page where users can find and purchase products, often with information about services or promotions.">
                                    Shopping Page
                                </option>
                                <option title="A page providing detailed information including mission, services or bio. Also conatact information etc.">
                                    Information Page
                                </option>
                                <option title="A page for sending forms for example.">
                                    Call To Action Page
                                </option>
                                <option title="A landing page showcasing a product, service, or initiative, often used in marketing or advertising campaigns.">
                                    Landing Page
                                </option>
                                <option title="A page showcasing images, videos, or other multimedia content in a visually appealing format.">
                                    Gallery Page
                                </option>
                                <option title="A page allowing users to access and download digital resources, such as eBooks, whitepapers, or guides.">
                                    Download Page
                                </option>
                                <option title="A page showcasing some kind of content, such as articles or projects.">
                                    Content Page
                                </option>
                                <option title="A page where users can make appointments, bookings, or reservations for a service or event.">
                                    Booking Page
                                </option>
                                <option title="A page that promotes special offers, discounts, or limited-time deals for products or services.">
                                    Pricing Page
                                </option>
                                <option title="A page where users can access detailed product or service specifications, features, and pricing information.">
                                    Details Page
                                </option>
                                <option title="A page displaying curated content or product recommendations based on user preferences or behavior.">
                                    Recommendations Page
                                </option>
                                <option title="Custom page.">
                                    Other
                                </option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div 
                            className="
                                flex
                            "
                        >
                            {/* Add field */}
                            <button 
                                type="button" 
                                className="
                                    py-2
                                    bg-slate-400/5
                                    border-slate-400/25
                                    hover:border-slate-400/50
                                    hover:bg-slate-400/25
                                    transition-colors
                                    rounded-xl 
                                    border 
                                    cursor-pointer
                                    block
                                    text-center
                                    my-4 mx-1
                                    w-1/2
                                "
                                onClick={() => addNewField()}
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                            {/* Remove field
                            --
                            If only the one page group is left,
                            then make remove field button 
                            unclickable.
                            */
                                newPageGroups.length > 1 ? (
                                        <button 
                                            type="button" 
                                            className="
                                                py-2
                                                bg-slate-400/5
                                                border-slate-400/25
                                                hover:border-slate-400/50
                                                hover:bg-slate-400/25
                                                transition-colors
                                                rounded-xl 
                                                border 
                                                cursor-pointer
                                                block
                                                text-center
                                                my-4 mx-1
                                                w-1/2
                                            "
                                            onClick={(index) => removeField(index)}
                                        >
                                            <i className="fas fa-minus"></i>
                                        </button>
                                ) : (
                                        <button 
                                        type="button" 
                                        className="
                                            py-2
                                            bg-slate-400/5
                                            border-slate-400/25
                                            hover:border-slate-400/50
                                            hover:bg-slate-400/25
                                            transition-colors
                                            rounded-xl 
                                            border 
                                            cursor-pointer
                                            block
                                            text-center
                                            my-4 mx-1
                                            w-1/2
                                            unactive
                                        "
                                        onClick={(index) => removeField(index)}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                ))}
                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="
                        py-2
                        bg-purple-400/50
                        rounded-xl 
                        border 
                        border-purple-400/75
                        cursor-pointer
                        block
                        text-center
                        w-full
                    "
                    onClick={handleSubmit}
                >
                    {isLoading ? "Building..." : "Let's build it!"}
                </button>
            </form>
        </section>
    );

};
