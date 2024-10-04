import { useState } from "react";

export const CreateProjectStructure = () => {
    // State variables should be declared at the top level of the component.

    const websiteTypeExample = "E-Commerce website";
    const websiteDescriptionExample = "EcoGreen Supplies - An e-commerce site offering eco-friendly products with a clean, modern design. Features product categories, detailed descriptions, and a blog on sustainable living.";

    const [websiteType, setWebsiteType] = useState(websiteTypeExample);
    const [websiteDescription, setWebsiteDescription] = useState(websiteDescriptionExample);
    const [websitePages, setWebsitePages] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    // Function to send data to the AI API
    const sendToAI = async () => {
        setIsLoading(true); // Set loading to true when the request is initiated

        try {
        const response = await fetch("/api/create_website_structure", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            websiteType,
            websiteDescription,
            websitePages
            }),
        });

        const result = await response.json();

        setIsLoading(false); // Set loading to false when the request is complete

        // Handle the response based on success or failure
        if (result.message === "Website structure created successfully") {
            alert("Website structure has been successfully created!");
            window.location.reload(); // Optionally reload the page if needed
        } else {
            alert(result.message); // Display error message
        }
        } catch (error) {
        console.error("Error creating website structure:", error);
        setIsLoading(false); // Reset loading in case of error
        alert("An error occurred while creating the website structure.");
        }
    };

    return (
        <section className="wrapper_form">
        <form
            method="POST"
            onSubmit={(e) => e.preventDefault()} // Prevent default form submission
        >
            <h1 className="text-xl mt-1 mb-6 text-purple-700 select-none">
            Hey, Let's start building!
            </h1>

            {/* Website Type Selector */}
            <div>
            <label>Choose website type</label>
            <select
                name="website_type"
                id="website_type"
                value={websiteType}
                onChange={(e) => setWebsiteType(e.target.value)}
            >
                <option title="A platform dedicated to an individual's personal content, such as blogs, interests, or hobbies.">
                Personal website
                </option>
                <option title="A site that represents a company or organization, providing information about services or products.">
                Business website
                </option>
                <option title="An online platform that facilitates the buying and selling of goods or services.">
                E-Commerce website
                </option>
                <option title="A site focused on providing academic content, courses, or resources for learning.">
                Educational website
                </option>
                <option title="A platform offering engaging content like videos, games, or articles for leisure.">
                Entertainment website
                </option>
                <option title="A site showcasing an individual's or organization's work, skills, or creative projects.">
                Portfolio website
                </option>
                <option title="An interactive platform where users can engage in discussions, post questions, or share information.">
                Forum website
                </option>
                <option title="A standalone web page designed to capture user information or promote a specific product or service.">
                Landing page
                </option>
            </select>
            </div>

            {/* Website Description Textarea */}
            <div>
            <label>Describe your website</label>
            <textarea
                value={websiteDescription}
                onChange={(e) => setWebsiteDescription(e.target.value)}
                name="website_description"
                id="website_description"
                placeholder="EcoGreen Supplies - An e-commerce site 
                offering eco-friendly products with a clean, 
                modern design. Features product categories, 
                detailed descriptions, and a blog on sustainable living.
                "
            ></textarea>
            </div>

            {/* Number of Pages Input */}
            <div>
            <label>Enter the number of pages: </label>
            <input
                name="number_of_pages"
                id="number_of_pages"
                type="number"
                placeholder="5"
                value={websitePages}
                onChange={(e) => setWebsitePages(e.target.value)}
            />
            </div>

            {/* Submit Button */}
            <div>
            <button type="submit" onClick={sendToAI} disabled={isLoading}>
                {isLoading ? "Building..." : "Let's build it!"}
            </button>
            </div>
        </form>
        </section>
    );

};
