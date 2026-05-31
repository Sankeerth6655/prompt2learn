import { StringSchemaDefinition } from "mongoose";
import { ai } from "../config/gemini";

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

type roadmapRequest = {
    topic: string,
    difficulty: Difficulty,
    subtopics:string[],
}

type roadmapResponse = {
    estimatedDays:number,
    roadmap:
        {
            subtopic:string,
            estimatedHours:number,
            concepts:string[]
        }[]
}

type generateContentRequest = {
    topic:string,
    difficulty:Difficulty,
    subtopic:string,
    concept:string
}

type generateContentResponse = {
    title:string,
    theory:string,
    examples:{
        title:string,
        code:string,
        explaination:string,
    }[],
    keypoints:string[],
    references:{
        title:string,
        url:string,
    }
}

type askQuestionRequest ={
    topic:string,
    subtopic:string,
    concept:string,
    difficulty:string,
    question:string
}


export async function generateTopicService(data:{topic:string,difficulty:string}):Promise<Array<{
    subtopics:string[]
}>>{

    const prompt = `Generate learning topics for:
        topic:${data.topic},
        Difficulty:${data.difficulty},
        return only valid JSON.
        format :
        {
            subtopics:[
                "string"
            ]
        }
        Do not return markdown.
        Do not return explanations.
        Do not wrap the response in \`\`\`json.
        `;

    const response = await ai.models.generateContent({
    model:'gemini-2.5-flash',
    contents:prompt
    });


    const text = response.text;

    const cleaned = text
        ?.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned!);
}

export async function generateRoadmapService(data:roadmapRequest):Promise<roadmapResponse>{
    const prompt = `Generate roadmap for:
    topic: ${data.topic},
    difficulty: ${data.difficulty},
    subtopics: ${data.subtopics.map((st)=>`- ${st} `).join('\n')}
    return in valid JSON only.
    format: {
        "estimatedDays": 0,
        "roadmap": [
            {
            "subtopic": "string",
            "estimatedHours": 0,
            "concepts": [
                {
            "title":"string",
            "completed":"boolean"
            }]
            },
        ],
        }

        make completed in concepts false by default.

        Do not return markdown.
        Do not return explanations.
        Do not wrap the response in \`\`\`json.
    `;

    const response = await ai.models.generateContent({
        model:'gemini-2.5-flash',
        contents:prompt
    })

    const text=response.text;

    const cleaned = text
        ?.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned!);
}


export async function generateContentService(data:generateContentRequest):Promise<generateContentResponse>{
    const prompt = `Generate content for the following concept:
    topic:${data.topic},
    subtopic:${data.subtopic},
    difficulty:${data.difficulty},
    concept:${data.concept}
    return valid JSON only in
    format: {
        title:string,
        theory:string,
        examples:{
            title:string,
            code:string,
            explanation:string,
        }[],
        keypoints:string[],
        references:{
            title:string,
            url:string,
        }
    }

    Theory should be between 150 and 250 words.

    Provide exactly 3 examples.

    Each example must contain:
    - title
    - code
    - explanation

    Provide exactly 5 key points.

    Difficulty levels precautions:
    Beginner - use simple language, avoid advanced concepts.
    Advanced - include deeper technical explanations and best practices.

    for references : only use official documentations urls , valid youtube vidoe urls
    if references not found, return empty array.

    Do not return markdown.
    Do not return explanations.
    Do not wrap the response in \`\`\`json.
    `;

    const response = await ai.models.generateContent({
        model:'gemini-2.5-flash-lite',
        contents:prompt
    })

    const text = response.text;

    const cleaned = text
        ?.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned!);
}

export async function askQuestionService(data:askQuestionRequest):Promise<{answer:string}>{
    let prompt = `
        Answer the user's question using the provided topic, subtopic and concept.
        Keep the answer concise (1-3 sentences).
        Use simple language appropriate for the difficulty level.
        topic:${data.topic},
        subtopic:${data.subtopic},
        concept:${data.concept},
        difficulty:${data.difficulty},
        question:${data.question}

        return valid JSON only in
        format:
        {"answer":"string"}

        Do not return markdown.
        Do not return explanations.
        Do not wrap the response in \`\`\`json.
    `;

    const response = await ai.models.generateContent({
        model:'gemini-2.5-flash-lite',
        contents:prompt
    });

    const text = response.text;

    const cleaned = text?.replace(/```json/g,"").replace(/```/g,"").trim();

    return JSON.parse(cleaned!);
}