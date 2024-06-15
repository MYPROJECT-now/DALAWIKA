import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const seedCourses = async () => {
    await db.insert(schema.courses).values([
        { id: 1, title: "Cebuano", imageSrc: "/cebuano.png" },
        { id: 2, title: "Ilocano", imageSrc: "/ilocano.png" },
        { id: 3, title: "Ilonggo", imageSrc: "/ilonggo.png" },
    ]);
};

const seedUnits = async () => {
    await db.insert(schema.units).values([
        { id: 1, courseId: 1, title: "Unit 1", description: "Learn the basics of Cebuano", order: 1 },
        { id: 2, courseId: 2, title: "Unit 1", description: "Learn the basics of Ilocano", order: 1 },
        { id: 3, courseId: 3, title: "Unit 1", description: "Learn the basics of Ilonggo", order: 1 },
    ]);
};

const seedLessons = async () => {
    const lessons = [
    //course cebuano
    // nodes 1 and 2
        { id: 1, courseId: 1, unitId: 1, order: 1, title: "Nouns" },
        { id: 2, courseId: 1, unitId: 1, order: 2, title: "Nouns" },
    ];

    for (const lesson of lessons) {
        await db.insert(schema.lessons).values(lesson);
    }
};

const seedChallenges = async () => {
    const challenges = [
// course cebuano
    // node 1
        { id: 1, courseId: 1, lessonId: 1, type: "SELECT" as const, order: 1, question: 'Which one is "bahay"? 1' },
        { id: 2, courseId: 1, lessonId: 1, type: "ASSIST" as const, order: 2, question: '"bahay"? 2' },

    // node 2
        { id: 3, courseId: 1, lessonId: 2, type: "SELECT" as const, order: 1, question: 'Which one is "bahay "? 3' },
        { id: 4, courseId: 1, lessonId: 2, type: "ASSIST" as const, order: 2, question: '"bahay"? 4' },    
    ];

    for (const challenge of challenges) {
        await db.insert(schema.challenges).values(challenge);
    }
};


const seedChallengeOptions = async () => {
    const options = [
// course cebuano
    //node 1 options
        //question 1
        { challengeId: 1, courseId: 1, imageSrc: "/balay.png", correct: true, text: "balay 1", audioSrc: "/balay.mp3" },
        { challengeId: 1, courseId: 1, imageSrc: "/balay.png", correct: false, text: "Pagkaon 1", audioSrc: "/pagkaon.mp3" },
        { challengeId: 1, courseId: 1, imageSrc: "/balay.png", correct: false, text: "balay 1", audioSrc: "/balay.mp3" },
        { challengeId: 1, courseId: 1, imageSrc: "/balay.png", correct: false, text: "Pagkaon 1", audioSrc: "/pagkaon.mp3" },

        //question 2
        { challengeId: 2, courseId: 1, correct: true, text: "balay 2", audioSrc: "/balay.mp3" },
        { challengeId: 2, courseId: 1, correct: false, text: "Pagkaon 2", audioSrc: "/pagkaon.mp3" },
        { challengeId: 2, courseId: 1, correct: true, text: "balay 2", audioSrc: "/balay.mp3" },
        { challengeId: 2, courseId: 1, correct: true, text: "Pagkaon 2", audioSrc: "/pagkaon.mp3" },

    //node 2 options
        //question 1
        { challengeId: 3, courseId: 1, imageSrc: "/balay.png", correct: true, text: "balay 3", audioSrc: "/balay.mp3" },
        { challengeId: 3, courseId: 1, imageSrc: "/pagkaon.jpg", correct: false, text: "Pagkaon 3", audioSrc: "/pagkaon.mp3" },

        //question 2
        { challengeId: 4, courseId: 1, correct: true, text: "balay 4", audioSrc: "/balay.mp3" },
        { challengeId: 4, courseId: 1, correct: false, text: "Pagkaon 4", audioSrc: "/pagkaon.mp3" },
    ];

    for (const option of options) {
        await db.insert(schema.challengeOptions).values(option);
    }
};

const main = async () => {
    try {
        console.log("Seeding the database");

        await db.delete(schema.courses);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await seedCourses();
        await seedUnits();
        await seedLessons();
        await seedChallenges();
        await seedChallengeOptions();

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();
