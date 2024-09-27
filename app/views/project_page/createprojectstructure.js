// build here a form that will send the data to the api and get the project structure back fro it
export const CreateProjectStructure = () => {
    return(
        <>
        <form className="" method="POST" onSubmit={(e) => e.preventDefault()}>
            <h1>Hey, Let's start building!</h1>
            <div>
                <label>Choose website type</label>
                <select 
                    name="website_type"
                    id="website_type"
                >
                    {/* On hover display information about website type */}
                    <option>
                        Personal website 
                    </option>
                    <option>
                        Bussiness website
                    </option>
                    <option>
                        E-Commmerce website
                    </option>
                    <option>
                        Educational website
                    </option>
                    <option>
                        Entertaiment website
                    </option>
                    <option>
                        Portfolio website
                    </option>
                    <option>
                        Forum website
                    </option>
                    <option>
                        Ladning page
                    </option>
                </select>
            </div>
            <div>
                <label>Describe your website</label>
                <textarea 
                    name="website_description"
                    id="website_description"
                    cols="40"
                    rows="40"
                    placeholder="
                    EcoGreen Supplies - An e-commerce site 
                    offering eco-friendly products with a clean, 
                    modern design. Features product categories, 
                    detailed descriptions, and a blog on sustainable living.
                    "
                ></textarea>
            </div>
            <div>
                <label>Enter the number of pages</label>
                <input name="number_of_pages" id="number_of_pages" type="number" placeholder="5"/>
            </div>
            <div>
                <button type="submit">
                    Let's build it!
                </button>
            </div>
        </form>
        </>
    )
}
