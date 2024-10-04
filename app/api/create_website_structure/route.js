// Build here AI that will be used to build project structure
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const { websiteType, websiteDescription, websitePages } = await req.json();

        // insert AI model -> Scientific Method Time!
        // 1. Define the problem
        // 2. Right structure: NLP, Sequence Models Transformers, Classification or clustering models
        // 3. Libary: Tensotflow, brain.js, sklearn.js
        // 4. Data Sketch (What will it look like?)
        // 5. Data Preparation
        // 6. Model plan
        // 7. Model plan implementation
        // 8. Model testing

        return NextResponse.json({ message: websiteType, websiteDescription, websitePages }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to create a wesbite structure' }, { status: 500 });
    }
}