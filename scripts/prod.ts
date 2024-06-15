import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";
import { flushAllTraces } from "next/dist/trace";

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
        { id: 1, courseId: 1, unitId: 1, order: 1, title: "Household People" },
        { id: 2, courseId: 1, unitId: 1, order: 2, title: "Household Items" },
        { id: 3, courseId: 1, unitId: 1, order: 3, title: "Body Parts" },
        { id: 4, courseId: 1, unitId: 1, order: 4, title: "Verbs" },
        { id: 5, courseId: 1, unitId: 1, order: 5, title: "Phrases" },
    //course ilocano
    // nodes 1 and 2
        { id: 6, courseId: 2, unitId: 2, order: 1, title: "Household People" },
        { id: 7, courseId: 2, unitId: 2, order: 2, title: "Household Things" },
        { id: 8, courseId: 2, unitId: 2, order: 3, title: "Body Parts" },
        { id: 9, courseId: 2, unitId: 2, order: 4, title: "Verbs" },
        { id: 10, courseId: 2, unitId: 2, order: 5, title: "Phrases" },
    //course ilonggo
    // nodes 1 and 2
        { id: 11, courseId: 3, unitId: 3, order: 1, title: "Household People"},
        { id: 12, courseId: 3, unitId: 3, order: 2, title: "Household Things"},
        { id: 13, courseId: 3, unitId: 3, order: 3, title: "Body Parts" },
        { id: 14, courseId: 3, unitId: 3, order: 4, title: "verbs" },
        { id: 15, courseId: 3, unitId: 3, order: 5, title: "Phrases" },
        
    ];

    for (const lesson of lessons) {
        await db.insert(schema.lessons).values(lesson);
    }
};

const seedChallenges = async () => {
    const challenges = [
// course cebuano
    // node 1 questions
        { id: 1, courseId: 1, lessonId: 1, type: "SELECT" as const, order: 1, question: 'Which one is "Parent"?' },
        { id: 2, courseId: 1, lessonId: 1, type: "ASSIST" as const, order: 2, question: '"Father"?' },
        { id: 3, courseId: 1, lessonId: 1, type: "SELECT" as const, order: 3, question: 'Which one is "Mother"?' },
        { id: 4, courseId: 1, lessonId: 1, type: "ASSIST" as const, order: 4, question: '"GrandFather"?' },
        { id: 5, courseId: 1, lessonId: 1, type: "SELECT" as const, order: 5, question: 'Which one is "GrandMother"?' },
        { id: 6, courseId: 1, lessonId: 1, type: "ASSIST" as const, order: 6, question: '"Friends"?' },
        { id: 7, courseId: 1, lessonId: 1, type: "SELECT" as const, order: 7, question: 'Which one is "Sibling"?' },
        { id: 8, courseId: 1, lessonId: 1, type: "ASSIST" as const, order: 8, question: '"Kumakain"?' },
        { id: 9, courseId: 1, lessonId: 1, type: "SELECT" as const, order: 9, question: 'Which one is "Naliligo"?' },
        { id: 10, courseId: 1, lessonId: 1, type: "ASSIST" as const, order: 10, question: '"Nainom"?' },

    // node 2
        { id: 11, courseId: 1, lessonId: 2, type: "SELECT" as const, order: 1, question: 'Which one is "Chair"?' },
        { id: 12, courseId: 1, lessonId: 2, type: "ASSIST" as const, order: 2, question: '"Table"?' },
        { id: 13, courseId: 1, lessonId: 2, type: "SELECT" as const, order: 3, question: 'Which one is "Door"?' },
        { id: 14, courseId: 1, lessonId: 2, type: "ASSIST" as const, order: 4, question: '"Bed"?' },
        { id: 15, courseId: 1, lessonId: 2, type: "SELECT" as const, order: 5, question: 'Which one is "Pillow"?' },
        { id: 16, courseId: 1, lessonId: 2, type: "ASSIST" as const, order: 6, question: '"Blanket"?' },
        { id: 17, courseId: 1, lessonId: 2, type: "SELECT" as const, order: 7, question: 'Which one is "Dustpan"?' },
        { id: 18, courseId: 1, lessonId: 2, type: "ASSIST" as const, order: 8, question: '"Broom"?' },
        { id: 19, courseId: 1, lessonId: 2, type: "SELECT" as const, order: 9, question: 'Which one is "Bowl"?' },
        { id: 20, courseId: 1, lessonId: 2, type: "ASSIST" as const, order: 10, question: '"Wardrobe"?' },

    // node 3
        { id: 21, courseId: 1, lessonId: 3, type: "SELECT" as const, order: 1, question: 'Which one is "Head"?' },
        { id: 22, courseId: 1, lessonId: 3, type: "ASSIST" as const, order: 2, question: '"Eyes"?' },
        { id: 23, courseId: 1, lessonId: 3, type: "SELECT" as const, order: 3, question: 'Which one is "Nose"?' },
        { id: 24, courseId: 1, lessonId: 3, type: "ASSIST" as const, order: 4, question: '"Ears"?' },
        { id: 25, courseId: 1, lessonId: 3, type: "SELECT" as const, order: 5, question: 'Which one is "Hand"?' },
        { id: 26, courseId: 1, lessonId: 3, type: "ASSIST" as const, order: 6, question: '"Feet"?' },
        { id: 27, courseId: 1, lessonId: 3, type: "SELECT" as const, order: 7, question: 'Which one is "Finger"?' },
        { id: 28, courseId: 1, lessonId: 3, type: "ASSIST" as const, order: 8, question: '"Stomach"?' },
        { id: 29, courseId: 1, lessonId: 3, type: "SELECT" as const, order: 9, question: 'Which one is "Shoulder"?' },
        { id: 30, courseId: 1, lessonId: 3, type: "ASSIST" as const, order: 10, question: '"Arms"?' },

    //node 4
        { id: 31, courseId: 1, lessonId: 4, type: "SELECT" as const, order: 1, question: 'Which one is "Walk"?' },
        { id: 32, courseId: 1, lessonId: 4, type: "ASSIST" as const, order: 2, question: '"Talk"?' },
        { id: 33, courseId: 1, lessonId: 4, type: "SELECT" as const, order: 3, question: 'Which one is "Run"?' },
        { id: 34, courseId: 1, lessonId: 4, type: "ASSIST" as const, order: 4, question: '"Jump"?' },
        { id: 35, courseId: 1, lessonId: 4, type: "SELECT" as const, order: 5, question: 'Which one is "Cry"?' },
        { id: 36, courseId: 1, lessonId: 4, type: "ASSIST" as const, order: 6, question: '"Read"?' },
        { id: 37, courseId: 1, lessonId: 4, type: "SELECT" as const, order: 7, question: 'Which one is "Write"?' },
        { id: 38, courseId: 1, lessonId: 4, type: "ASSIST" as const, order: 8, question: '"Sleep"?' },
        { id: 39, courseId: 1, lessonId: 4, type: "SELECT" as const, order: 9, question: 'Which one is "Laugh"?' },
        { id: 40, courseId: 1, lessonId: 4, type: "ASSIST" as const, order: 10, question: '"Shout"?' },

    // node 5
        { id: 41, courseId: 1, lessonId: 5, type: "SELECT" as const, order: 1, question: '"Good morning"?' },
        { id: 42, courseId: 1, lessonId: 5, type: "ASSIST" as const, order: 2, question: '"Good afternoon"?' },
        { id: 43, courseId: 1, lessonId: 5, type: "SELECT" as const, order: 3, question: '"Good night/evening"?' },
        { id: 44, courseId: 1, lessonId: 5, type: "ASSIST" as const, order: 4, question: '"My name is"?' },
        { id: 45, courseId: 1, lessonId: 5, type: "SELECT" as const, order: 5, question: '"What is your name?"?' },
        { id: 46, courseId: 1, lessonId: 5, type: "ASSIST" as const, order: 6, question: '"I am from"?' },
        { id: 47, courseId: 1, lessonId: 5, type: "SELECT" as const, order: 7, question: '"Where are you from?"?' },
        { id: 48, courseId: 1, lessonId: 5, type: "ASSIST" as const, order: 8, question: '"Thank you"?' },
        { id: 49, courseId: 1, lessonId: 5, type: "SELECT" as const, order: 9, question: '"I love you "?' },
        { id: 50, courseId: 1, lessonId: 5, type: "ASSIST" as const, order: 10, question: '"See you soon"?' },

// course ilocano
    // node 1
        { id: 51, courseId: 2, lessonId: 6, type: "SELECT" as const, order: 1, question: 'Which one is "Parent"?' },
        { id: 52, courseId: 2, lessonId: 6, type: "ASSIST" as const, order: 2, question: '"Father"?' },
        { id: 53, courseId: 2, lessonId: 6, type: "SELECT" as const, order: 3, question: 'Which one is "Mother"?' },
        { id: 54, courseId: 2, lessonId: 6, type: "ASSIST" as const, order: 4, question: '"Grandfather"?' },
        { id: 55, courseId: 2, lessonId: 6, type: "SELECT" as const, order: 5, question: 'Which one is "Grandmother"?' },
        { id: 56, courseId: 2, lessonId: 6, type: "ASSIST" as const, order: 6, question: '"Friends"?' },
        { id: 57, courseId: 2, lessonId: 6, type: "SELECT" as const, order: 7, question: 'Which one is "Sibling"?' },
        { id: 58, courseId: 2, lessonId: 6, type: "ASSIST" as const, order: 8, question: '"Eating"?' },
        { id: 59, courseId: 2, lessonId: 6, type: "SELECT" as const, order: 9, question: 'Which one is "Bathing"?' },
        { id: 60, courseId: 2, lessonId: 6, type: "ASSIST" as const, order: 10, question: '"Drinking"?' },

    // node 2
        { id: 61, courseId: 2, lessonId: 7, type: "SELECT" as const, order: 1, question: 'Which one is "Chair"?' },
        { id: 62, courseId: 2, lessonId: 7, type: "ASSIST" as const, order: 2, question: '"Table"?' },
        { id: 63, courseId: 2, lessonId: 7, type: "SELECT" as const, order: 3, question: 'Which one is "Door"?' },
        { id: 64, courseId: 2, lessonId: 7, type: "ASSIST" as const, order: 4, question: '"Bed"?' },
        { id: 65, courseId: 2, lessonId: 7, type: "SELECT" as const, order: 5, question: 'Which one is "Pillow"?' },
        { id: 66, courseId: 2, lessonId: 7, type: "ASSIST" as const, order: 6, question: '"Blanket"?' },
        { id: 67, courseId: 2, lessonId: 7, type: "SELECT" as const, order: 7, question: 'Which one is "Dustpan"?' },
        { id: 68, courseId: 2, lessonId: 7, type: "ASSIST" as const, order: 8, question: '"Broom"?' },
        { id: 69, courseId: 2, lessonId: 7, type: "SELECT" as const, order: 9, question: 'Which one is "Bowl"?' },
        { id: 70, courseId: 2, lessonId: 7, type: "ASSIST" as const, order: 10, question: '"Wardrobe"?' },

    // node 3
        { id: 71, courseId: 2, lessonId: 8, type: "SELECT" as const, order: 1, question: 'Which one is "Head"?' },
        { id: 72, courseId: 2, lessonId: 8, type: "ASSIST" as const, order: 2, question: '"Eyes"?' },
        { id: 73, courseId: 2, lessonId: 8, type: "SELECT" as const, order: 3, question: 'Which one is "Nose"?' },
        { id: 74, courseId: 2, lessonId: 8, type: "ASSIST" as const, order: 4, question: '"Ears"?' },
        { id: 75, courseId: 2, lessonId: 8, type: "SELECT" as const, order: 5, question: 'Which one is "Hand"?' },
        { id: 76, courseId: 2, lessonId: 8, type: "ASSIST" as const, order: 6, question: '"Feet"?' },
        { id: 77, courseId: 2, lessonId: 8, type: "SELECT" as const, order: 7, question: 'Which one is "Finger"?' },
        { id: 78, courseId: 2, lessonId: 8, type: "ASSIST" as const, order: 8, question: '"Stomach"?' },
        { id: 79, courseId: 2, lessonId: 8, type: "SELECT" as const, order: 9, question: 'Which one is "Shoulder"?' },
        { id: 80, courseId: 2, lessonId: 8, type: "ASSIST" as const, order: 10, question: '"Arms"?' },

    // node 4
        { id: 81, courseId: 2, lessonId: 9, type: "SELECT" as const, order: 1, question: 'Which one is "Walk"?' },
        { id: 82, courseId: 2, lessonId: 9, type: "ASSIST" as const, order: 2, question: '"Talk"?' },
        { id: 83, courseId: 2, lessonId: 9, type: "SELECT" as const, order: 3, question: 'Which one is "Run"?' },
        { id: 84, courseId: 2, lessonId: 9, type: "ASSIST" as const, order: 4, question: '"Jump"?' },
        { id: 85, courseId: 2, lessonId: 9, type: "SELECT" as const, order: 5, question: 'Which one is "Cry"?' },
        { id: 86, courseId: 2, lessonId: 9, type: "ASSIST" as const, order: 6, question: '"Read"?' },
        { id: 87, courseId: 2, lessonId: 9, type: "SELECT" as const, order: 7, question: 'Which one is "Write"?' },
        { id: 88, courseId: 2, lessonId: 9, type: "ASSIST" as const, order: 8, question: '"Sleep"?' },
        { id: 89, courseId: 2, lessonId: 9, type: "SELECT" as const, order: 9, question: 'Which one is "Laugh"?' },
        { id: 90, courseId: 2, lessonId: 9, type: "ASSIST" as const, order: 10, question: '"Shout"?' },

    // node 5
        { id: 91, courseId: 2, lessonId: 10, type: "SELECT" as const, order: 1, question: 'Which one is "Good morning"?' },
        { id: 92, courseId: 2, lessonId: 10, type: "ASSIST" as const, order: 2, question: '"Good afternoon"?' },
        { id: 93, courseId: 2, lessonId: 10, type: "SELECT" as const, order: 3, question: 'Which one is "Good night/evening"?' },
        { id: 94, courseId: 2, lessonId: 10, type: "ASSIST" as const, order: 4, question: '"My name is"?' },
        { id: 95, courseId: 2, lessonId: 10, type: "SELECT" as const, order: 5, question: 'Which one is "What is your name?"?' },
        { id: 96, courseId: 2, lessonId: 10, type: "ASSIST" as const, order: 6, question: '"I am from"?' },
        { id: 97, courseId: 2, lessonId: 10, type: "SELECT" as const, order: 7, question: 'Which one is "Where are you from?"?' },
        { id: 98, courseId: 2, lessonId: 10, type: "ASSIST" as const, order: 8, question: '"Thank you"?' },
        { id: 99, courseId: 2, lessonId: 10, type: "SELECT" as const, order: 9, question: 'Which one is "I  love you"?' },
        { id: 100, courseId: 2, lessonId: 10, type: "ASSIST" as const, order: 10, question: '"See you soon"?' },

// course ilonggo
    // node 1
        { id: 101, courseId: 3, lessonId: 11, type: "SELECT" as const, order: 1, question: 'Which one is "Parent"?' },
        { id: 102, courseId: 3, lessonId: 11, type: "ASSIST" as const, order: 2, question: '"Father"?' },
        { id: 103, courseId: 3, lessonId: 11, type: "SELECT" as const, order: 3, question: 'Which one is "Mother"?' },
        { id: 104, courseId: 3, lessonId: 11, type: "ASSIST" as const, order: 4, question: '"Grandfather"?' },
        { id: 105, courseId: 3, lessonId: 11, type: "SELECT" as const, order: 5, question: 'Which one is "Grandmother"?' },
        { id: 106, courseId: 3, lessonId: 11, type: "ASSIST" as const, order: 6, question: '"Friends"?' },
        { id: 107, courseId: 3, lessonId: 11, type: "SELECT" as const, order: 7, question: 'Which one is "Sibling"?' },
        { id: 108, courseId: 3, lessonId: 11, type: "ASSIST" as const, order: 8, question: '"Eating"?' },
        { id: 109, courseId: 3, lessonId: 11, type: "SELECT" as const, order: 9, question: 'Which one is "Bathing"?' },
        { id: 110, courseId: 3, lessonId: 11, type: "ASSIST" as const, order: 10, question: '"Drinking"?' },

    // node 2
        { id: 111, courseId: 3, lessonId: 12, type: "SELECT" as const, order: 1, question: 'Which one is "Chair"?' },
        { id: 112, courseId: 3, lessonId: 12, type: "ASSIST" as const, order: 2, question: '"Table"?' },
        { id: 113, courseId: 3, lessonId: 12, type: "SELECT" as const, order: 3, question: 'Which one is "Door"?' },
        { id: 114, courseId: 3, lessonId: 12, type: "ASSIST" as const, order: 4, question: '"Bed"?' },
        { id: 115, courseId: 3, lessonId: 12, type: "SELECT" as const, order: 5, question: 'Which one is "Pillow"?' },
        { id: 116, courseId: 3, lessonId: 12, type: "ASSIST" as const, order: 6, question: '"Blanket"?' },
        { id: 117, courseId: 3, lessonId: 12, type: "SELECT" as const, order: 7, question: 'Which one is "Dustpan"?' },
        { id: 118, courseId: 3, lessonId: 12, type: "ASSIST" as const, order: 8, question: '"Broom"?' },
        { id: 119, courseId: 3, lessonId: 12, type: "SELECT" as const, order: 9, question: 'Which one is "Bowl"?' },
        { id: 120, courseId: 3, lessonId: 12, type: "ASSIST" as const, order: 10, question: '"Wardrobe"?' },

    // node 3
        { id: 121, courseId: 3, lessonId: 13, type: "SELECT" as const, order: 1, question: 'Which one is "Head"?' },
        { id: 122, courseId: 3, lessonId: 13, type: "ASSIST" as const, order: 2, question: '"Eyes"?' },
        { id: 123, courseId: 3, lessonId: 13, type: "SELECT" as const, order: 3, question: 'Which one is "Nose"?' },
        { id: 124, courseId: 3, lessonId: 13, type: "ASSIST" as const, order: 4, question: '"Ears"?' },
        { id: 125, courseId: 3, lessonId: 13, type: "SELECT" as const, order: 5, question: 'Which one is "Hand"?' },
        { id: 126, courseId: 3, lessonId: 13, type: "ASSIST" as const, order: 6, question: '"Feet"?' },
        { id: 127, courseId: 3, lessonId: 13, type: "SELECT" as const, order: 7, question: 'Which one is "Finger"?' },
        { id: 128, courseId: 3, lessonId: 13, type: "ASSIST" as const, order: 8, question: '"Stomach"?' },
        { id: 129, courseId: 3, lessonId: 13, type: "SELECT" as const, order: 9, question: 'Which one is "Shoulder"?' },
        { id: 130, courseId: 3, lessonId: 13, type: "ASSIST" as const, order: 10, question: '"Arms"?' },

    // node 4
        { id: 131, courseId: 3, lessonId: 14, type: "SELECT" as const, order: 1, question: 'Which one is "Walk"?' },
        { id: 132, courseId: 3, lessonId: 14, type: "ASSIST" as const, order: 2, question: '"Talk"?' },
        { id: 133, courseId: 3, lessonId: 14, type: "SELECT" as const, order: 3, question: 'Which one is "Run"?' },
        { id: 134, courseId: 3, lessonId: 14, type: "ASSIST" as const, order: 4, question: '"Jump"?' },
        { id: 135, courseId: 3, lessonId: 14, type: "SELECT" as const, order: 5, question: 'Which one is "Cry"?' },
        { id: 136, courseId: 3, lessonId: 14, type: "ASSIST" as const, order: 6, question: '"Read"?' },
        { id: 137, courseId: 3, lessonId: 14, type: "SELECT" as const, order: 7, question: 'Which one is "Write"?' },
        { id: 138, courseId: 3, lessonId: 14, type: "ASSIST" as const, order: 8, question: '"Sleep"?' },
        { id: 139, courseId: 3, lessonId: 14, type: "SELECT" as const, order: 9, question: 'Which one is "Laugh"?' },
        { id: 140, courseId: 3, lessonId: 14, type: "ASSIST" as const, order: 10, question: '"Shout"?' },

    // node 5
        { id: 141, courseId: 3, lessonId: 15, type: "SELECT" as const, order: 1, question: 'Which one is "Good morning"?' },
        { id: 142, courseId: 3, lessonId: 15, type: "ASSIST" as const, order: 2, question: '"Good afternoon"?' },
        { id: 143, courseId: 3, lessonId: 15, type: "SELECT" as const, order: 3, question: 'Which one is "Good night/evening"?' },
        { id: 144, courseId: 3, lessonId: 15, type: "ASSIST" as const, order: 4, question: '"My name is"?' },
        { id: 145, courseId: 3, lessonId: 15, type: "SELECT" as const, order: 5, question: 'Which one is "What is your name?"?' },
        { id: 146, courseId: 3, lessonId: 15, type: "ASSIST" as const, order: 6, question: '"I am from"?' },
        { id: 147, courseId: 3, lessonId: 15, type: "SELECT" as const, order: 7, question: 'Which one is "Where are you from?"?' },
        { id: 148, courseId: 3, lessonId: 15, type: "ASSIST" as const, order: 8, question: '"Thank you"?' },
        { id: 149, courseId: 3, lessonId: 15, type: "SELECT" as const, order: 9, question: 'Which one is "I  love you"?' },
        { id: 150, courseId: 3, lessonId: 15, type: "ASSIST" as const, order: 10, question: '"See you soon"?' },

        
    ];

    for (const challenge of challenges) {
        await db.insert(schema.challenges).values(challenge);
    }
};


const seedChallengeOptions = async () => {
    const options = [
// course cebuano
    //node 1 options
        //option 1
        { challengeId: 1, courseId: 1, imageSrc: "/IMAGES/NODE1/1.png", correct: true, text: "GINIKANAN", audioSrc: "/AUDIO/CEBUANO/NODE1/ginikanan.mp3" },
        { challengeId: 1, courseId: 1, imageSrc: "/IMAGES/NODE1/2.png", correct: false, text: "AMAHAN", audioSrc: "/AUDIO/CEBUANO/NODE1/amahan.mp3" },
        { challengeId: 1, courseId: 1, imageSrc: "/IMAGES/NODE1/3.png", correct: false, text: "INAHAN", audioSrc: "/AUDIO/CEBUANO/NODE1/inahan.mp3" },
        { challengeId: 1, courseId: 1, imageSrc: "/IMAGES/NODE1/4.png", correct: false, text: "LOLO", audioSrc: "/AUDIO/CEBUANO/NODE1/lolo.mp3" },


        //option 2
        { challengeId: 2, courseId: 1, correct: false, text: "GINIKANAN", audioSrc: "/AUDIO/CEBUANO/NODE1/ginikanan.mp3" },
        { challengeId: 2, courseId: 1, correct: true, text: "AMAHAN", audioSrc: "/AUDIO/CEBUANO/NODE1/amahan.mp3" },
        { challengeId: 2, courseId: 1, correct: false, text: "INAHAN", audioSrc: "/AUDIO/CEBUANO/NODE1/inahan.mp3" },
        { challengeId: 2, courseId: 1, correct: false, text: "LOLO", audioSrc: "/AUDIO/CEBUANO/NODE1/lolo.mp3" },

        // option 3
        { challengeId: 3, courseId: 1, imageSrc: "/IMAGES/NODE1/1.png", correct: false, text: "GINIKANAN", audioSrc: "/AUDIO/CEBUANO/NODE1/ginikanan.mp3" },
        { challengeId: 3, courseId: 1, imageSrc: "/IMAGES/NODE1/2.png", correct: false, text: "AMAHAN", audioSrc: "/AUDIO/CEBUANO/NODE1/amahan.mp3" },
        { challengeId: 3, courseId: 1, imageSrc: "/IMAGES/NODE1/3.png", correct: true, text: "INAHAN", audioSrc: "/AUDIO/CEBUANO/NODE1/inahan.mp3" },
        { challengeId: 3, courseId: 1, imageSrc: "/IMAGES/NODE1/4.png", correct: false, text: "LOLO", audioSrc: "/AUDIO/CEBUANO/NODE1/lolo.mp3" },

        // option 4
        { challengeId: 4, courseId: 1, correct: false, text: "GINIKANAN", audioSrc: "/AUDIO/CEBUANO/NODE1/ginikanan.mp3" },
        { challengeId: 4, courseId: 1, correct: false, text: "AMAHAN", audioSrc: "/AUDIO/CEBUANO/NODE1/amahan.mp3" },
        { challengeId: 4, courseId: 1, correct: false, text: "INAHAN", audioSrc: "/AUDIO/CEBUANO/NODE1/inahan.mp3" },
        { challengeId: 4, courseId: 1, correct: true, text: "LOLO", audioSrc: "/AUDIO/CEBUANO/NODE1/lolo.mp3" },

        // option 5
        { challengeId: 5, courseId: 1, imageSrc: "/IMAGES/NODE1/5.png", correct: true, text: "LOLA", audioSrc: "/AUDIO/CEBUANO/NODE1/lola.mp3" },
        { challengeId: 5, courseId: 1, imageSrc: "/IMAGES/NODE1/6.png", correct: false, text: "HIGALA", audioSrc: "/AUDIO/CEBUANO/NODE1/higala.mp3" },
        { challengeId: 5, courseId: 1, imageSrc: "/IMAGES/NODE1/7.png", correct: false, text: "IGSOON", audioSrc: "/AUDIO/CEBUANO/NODE1/igsoon.mp3" },
        { challengeId: 5, courseId: 1, imageSrc: "/IMAGES/NODE1/8.png", correct: false, text: "NAGAKAON", audioSrc: "/AUDIO/CEBUANO/NODE1/nagakaon.mp3" },

        // option 6
        { challengeId: 6, courseId: 1, correct: false, text: "LOLA", audioSrc: "/AUDIO/CEBUANO/NODE1/lola.mp3" },
        { challengeId: 6, courseId: 1, correct: true, text: "HIGALA", audioSrc: "/AUDIO/CEBUANO/NODE1/higala.mp3" },
        { challengeId: 6, courseId: 1, correct: false, text: "IGSOON", audioSrc: "/AUDIO/CEBUANO/NODE1/igsoon.mp3" },
        { challengeId: 6, courseId: 1, correct: false, text: "NAGAKAON", audioSrc: "/AUDIO/CEBUANO/NODE1/nagakaon.mp3" },

        // option 7
        { challengeId: 7, courseId: 1, imageSrc: "/IMAGES/NODE1/5.png", correct: false, text: "LOLA", audioSrc: "/AUDIO/CEBUANO/NODE1/lola.mp3" },
        { challengeId: 7, courseId: 1, imageSrc: "/IMAGES/NODE1/6.png", correct: false, text: "HIGALA", audioSrc: "/AUDIO/CEBUANO/NODE1/higala.mp3" },
        { challengeId: 7, courseId: 1, imageSrc: "/IMAGES/NODE1/7.png", correct: true, text: "IGSOON", audioSrc: "/AUDIO/CEBUANO/NODE1/igsoon.mp3" },
        { challengeId: 7, courseId: 1, imageSrc: "/IMAGES/NODE1/8.png", correct: false, text: "NAGAKAON", audioSrc: "/AUDIO/CEBUANO/NODE1/nagakaon.mp3" },

        // option 8
        { challengeId: 8, courseId: 1, correct: false, text: "LOLA", audioSrc: "/AUDIO/CEBUANO/NODE1/lola.mp3" },
        { challengeId: 8, courseId: 1, correct: false, text: "HIGALA", audioSrc: "/AUDIO/CEBUANO/NODE1/higala.mp3" },
        { challengeId: 8, courseId: 1, correct: false, text: "IGSOON", audioSrc: "/AUDIO/CEBUANO/NODE1/igsoon.mp3" },
        { challengeId: 8, courseId: 1, correct: true, text: "NAGAKAON", audioSrc: "/AUDIO/CEBUANO/NODE1/nagakaon.mp3" },

        // option 9
        { challengeId: 9, courseId: 1, imageSrc: "/IMAGES/NODE1/5.png", correct: false, text: "LOLA", audioSrc: "/AUDIO/CEBUANO/NODE1/lola.mp3" },
        { challengeId: 9, courseId: 1, imageSrc: "/IMAGES/NODE1/6.png", correct: false, text: "HIGALA", audioSrc: "/AUDIO/CEBUANO/NODE1/higala.mp3" },
        { challengeId: 9, courseId: 1, imageSrc: "/IMAGES/NODE1/9.png", correct: true, text: "Nagaduhot", audioSrc: "/AUDIO/CEBUANO/NODE1/nagaduhot.mp3" },
        { challengeId: 9, courseId: 1, imageSrc: "/IMAGES/NODE1/10.png", correct: false, text: "Nag-inom", audioSrc: "/AUDIO/CEBUANO/NODE1/nag-inom.mp3" },

        // option 10
        { challengeId: 10, courseId: 1, correct: false, text: "LOLA", audioSrc: "/AUDIO/CEBUANO/NODE1/lola.mp3" },
        { challengeId: 10, courseId: 1, correct: false, text: "HIGALA", audioSrc: "/AUDIO/CEBUANO/NODE1/higala.mp3" },
        { challengeId: 10, courseId: 1, correct: false, text: "NAGADUHOT", audioSrc: "/AUDIO/CEBUANO/NODE1/nagaduhot.mp3" },
        { challengeId: 10, courseId: 1, correct: true, text: "NAG-INOM", audioSrc: "/AUDIO/CEBUANO/NODE1/nag-inom.mp3" },

//node 2 options
    //options
       // option 11
       { challengeId: 11, courseId: 1, imageSrc: "/IMAGES/NODE2/11.png", correct: true, text: "SALUG", audioSrc: "/AUDIO/CEBUANO/NODE2/salug.mp3" },
       { challengeId: 11, courseId: 1, imageSrc: "/IMAGES/NODE2/12.png", correct: false, text: "LAMESA", audioSrc: "/AUDIO/CEBUANO/NODE2/lamesa.mp3" },
       { challengeId: 11, courseId: 1, imageSrc: "/IMAGES/NODE2/13.png", correct: false, text: "PULTAHAN", audioSrc: "/AUDIO/CEBUANO/NODE2/pultahan.mp3" },
       { challengeId: 11, courseId: 1, imageSrc: "/IMAGES/NODE2/14.png", correct: false, text: "HIDAANAN", audioSrc: "/AUDIO/CEBUANO/NODE2/hidaanan.mp3" }, 

       // option 12
       { challengeId: 12, courseId: 1, correct: false, text: "SALUG", audioSrc: "/AUDIO/CEBUANO/NODE2/salug.mp3" },
       { challengeId: 12, courseId: 1, correct: true, text: "LAMESA", audioSrc: "/AUDIO/CEBUANO/NODE2/lamesa.mp3" },
       { challengeId: 12, courseId: 1, correct: false, text: "PULTAHAN", audioSrc: "/AUDIO/CEBUANO/NODE2/pultahan.mp3" },
       { challengeId: 12, courseId: 1, correct: false, text: "HIDAANAN", audioSrc: "/AUDIO/CEBUANO/NODE2/hidaanan.mp3" }, 

       // option 13
       { challengeId: 13, courseId: 1, imageSrc: "/IMAGES/NODE2/11.png", correct: false, text: "SALUG", audioSrc: "/AUDIO/CEBUANO/NODE2/salug.mp3" },
       { challengeId: 13, courseId: 1, imageSrc: "/IMAGES/NODE2/12.png", correct: false, text: "LAMESA", audioSrc: "/AUDIO/CEBUANO/NODE2/lamesa.mp3" },
       { challengeId: 13, courseId: 1, imageSrc: "/IMAGES/NODE2/13.png", correct: true, text: "PULTAHAN", audioSrc: "/AUDIO/CEBUANO/NODE2/pultahan.mp3" },
       { challengeId: 13, courseId: 1, imageSrc: "/IMAGES/NODE2/14.png", correct: false, text: "HIDAANAN", audioSrc: "/AUDIO/CEBUANO/NODE2/hidaanan.mp3" }, 

       // option 14
       { challengeId: 14, courseId: 1, correct: false, text: "SALUG", audioSrc: "/AUDIO/CEBUANO/NODE2/salug.mp3" },
       { challengeId: 14, courseId: 1, correct: false, text: "LAMESA", audioSrc: "/AUDIO/CEBUANO/NODE2/lamesa.mp3" },
       { challengeId: 14, courseId: 1, correct: false, text: "PULTAHAN", audioSrc: "/AUDIO/CEBUANO/NODE2/pultahan.mp3" },
       { challengeId: 14, courseId: 1, correct: true, text: "HIDAANAN", audioSrc: "/AUDIO/CEBUANO/NODE2/hidaanan.mp3" }, 

       // option 15
       { challengeId: 15, courseId: 1, imageSrc: "/IMAGES/NODE2/15.png", correct: true, text: "UNLAN", audioSrc: "/AUDIO/CEBUANO/NODE2/unlan.mp3" },
       { challengeId: 15, courseId: 1, imageSrc: "/IMAGES/NODE2/16.png", correct: false, text: "TAB-OG", audioSrc: "/AUDIO/CEBUANO/NODE2/tab-og.mp3" },
       { challengeId: 15, courseId: 1, imageSrc: "/IMAGES/NODE2/17.png", correct: false, text: "SAKAYAN", audioSrc: "/AUDIO/CEBUANO/NODE2/sakayan.mp3" },
       { challengeId: 15, courseId: 1, imageSrc: "/IMAGES/NODE2/18.png", correct: false, text: "WALIS", audioSrc: "/AUDIO/CEBUANO/NODE2/walis.mp3" }, 

       // option 16
       { challengeId: 16, courseId: 1, correct: false, text: "UNLAN", audioSrc: "/AUDIO/CEBUANO/NODE2/unlan.mp3" },
       { challengeId: 16, courseId: 1, correct: true, text: "TAB-OG", audioSrc: "/AUDIO/CEBUANO/NODE2/tab-og.mp3" },
       { challengeId: 16, courseId: 1, correct: false, text: "SAKAYAN", audioSrc: "/AUDIO/CEBUANO/NODE2/sakayan.mp3" },
       { challengeId: 16, courseId: 1, correct: false, text: "WALIS", audioSrc: "/AUDIO/CEBUANO/NODE2/walis.mp3" },
       
       // option 17
       { challengeId: 17, courseId: 1, imageSrc: "/IMAGES/NODE2/15.png", correct: false, text: "UNLAN", audioSrc: "/AUDIO/CEBUANO/NODE2/unlan.mp3" },
       { challengeId: 17, courseId: 1, imageSrc: "/IMAGES/NODE2/16.png", correct: false, text: "TAB-OG", audioSrc: "/AUDIO/CEBUANO/NODE2/tab-og.mp3" },
       { challengeId: 17, courseId: 1, imageSrc: "/IMAGES/NODE2/17.png", correct: true, text: "SAKAYAN", audioSrc: "/AUDIO/CEBUANO/NODE2/sakayan.mp3" },
       { challengeId: 17, courseId: 1, imageSrc: "/IMAGES/NODE2/18.png", correct: false, text: "WALIS", audioSrc: "/AUDIO/CEBUANO/NODE2/walis.mp3" }, 

       // option 18
       { challengeId: 18, courseId: 1, correct: false, text: "UNLAN", audioSrc: "/AUDIO/CEBUANO/NODE2/unlan.mp3" },
       { challengeId: 18, courseId: 1, correct: false, text: "TAB-OG", audioSrc: "/AUDIO/CEBUANO/NODE2/tab-og.mp3" },
       { challengeId: 18, courseId: 1, correct: false, text: "SAKAYAN", audioSrc: "/AUDIO/CEBUANO/NODE2/sakayan.mp3" },
       { challengeId: 18, courseId: 1, correct: true, text: "WALIS", audioSrc: "/AUDIO/CEBUANO/NODE2/walis.mp3" }, 

        // option 19
        { challengeId: 19, courseId: 1, imageSrc: "/IMAGES/NODE2/15.png", correct: false, text: "UNLAN", audioSrc: "/AUDIO/CEBUANO/NODE2/unlan.mp3" },
        { challengeId: 19, courseId: 1, imageSrc: "/IMAGES/NODE2/16.png", correct: false, text: "TAB-OG", audioSrc: "/AUDIO/CEBUANO/NODE2/tab-og.mp3" },
        { challengeId: 19, courseId: 1, imageSrc: "/IMAGES/NODE2/19.png", correct: true, text: "BANGA", audioSrc: "/AUDIO/CEBUANO/NODE2/banga.mp3" },
        { challengeId: 19, courseId: 1, imageSrc: "/IMAGES/NODE2/20.png", correct: false, text: "APARADOR", audioSrc: "/AUDIO/CEBUANO/NODE2/aparador.mp3" }, 

        // option 20
        { challengeId: 20, courseId: 1, correct: false, text: "UNLAN", audioSrc: "/AUDIO/CEBUANO/NODE2/unlan.mp3" },
        { challengeId: 20, courseId: 1, correct: false, text: "TAB-OG", audioSrc: "/AUDIO/CEBUANO/NODE2/tab-og.mp3" },
        { challengeId: 20, courseId: 1, correct: false, text: "BANGA", audioSrc: "/AUDIO/CEBUANO/NODE2/banga.mp3" },
        { challengeId: 20, courseId: 1, correct: true, text: "APARADOR", audioSrc: "/AUDIO/CEBUANO/NODE2/aparador.mp3" },

    //node 3
        //option 21
        { challengeId: 21, courseId: 1, imageSrc: "/IMAGES/NODE3/21.png", correct: true, text: "ULO", audioSrc: "/AUDIO/CEBUANO/NODE3/ulo.mp3" },
        { challengeId: 21, courseId: 1, imageSrc: "/IMAGES/NODE3/22.png", correct: false, text: "MATA", audioSrc: "/AUDIO/CEBUANO/NODE3/mata.mp3" },
        { challengeId: 21, courseId: 1, imageSrc: "/IMAGES/NODE3/23.png", correct: false, text: "ILONG", audioSrc: "/AUDIO/CEBUANO/NODE3/ilong.mp3" },
        { challengeId: 21, courseId: 1, imageSrc: "/IMAGES/NODE3/24.png", correct: false, text: "DALUNGGAN", audioSrc: "/AUDIO/CEBUANO/NODE3/dalunggan.mp3" },

        //option 22
        { challengeId: 22, courseId: 1, correct: false, text: "ULO", audioSrc: "/AUDIO/CEBUANO/NODE3/ulo.mp3" },
        { challengeId: 22, courseId: 1, correct: true, text: "MATA", audioSrc: "/AUDIO/CEBUANO/NODE3/mata.mp3" },
        { challengeId: 22, courseId: 1, correct: false, text: "ILONG", audioSrc: "/AUDIO/CEBUANO/NODE3/ilong.mp3" },
        { challengeId: 22, courseId: 1, correct: false, text: "DALUNGGAN", audioSrc: "/AUDIO/CEBUANO/NODE3/dalunggan.mp3" },

        //option 23
        { challengeId: 23, courseId: 1, imageSrc: "/IMAGES/NODE3/21.png", correct: false, text: "ULO", audioSrc: "/AUDIO/CEBUANO/NODE3/ulo.mp3" },
        { challengeId: 23, courseId: 1, imageSrc: "/IMAGES/NODE3/22.png", correct: false, text: "MATA", audioSrc: "/AUDIO/CEBUANO/NODE3/mata.mp3" },
        { challengeId: 23, courseId: 1, imageSrc: "/IMAGES/NODE3/23.png", correct: true, text: "ILONG", audioSrc: "/AUDIO/CEBUANO/NODE3/ilong.mp3" },
        { challengeId: 23, courseId: 1, imageSrc: "/IMAGES/NODE3/24.png", correct: false, text: "DALUNGGAN", audioSrc: "/AUDIO/CEBUANO/NODE3/dalunggan.mp3" },

        //option 24
        { challengeId: 24, courseId: 1, correct: false, text: "ULO", audioSrc: "/AUDIO/CEBUANO/NODE3/ulo.mp3" },
        { challengeId: 24, courseId: 1, correct: false, text: "MATA", audioSrc: "/AUDIO/CEBUANO/NODE3/mata.mp3" },
        { challengeId: 24, courseId: 1, correct: false, text: "ILONG", audioSrc: "/AUDIO/CEBUANO/NODE3/ilong.mp3" },
        { challengeId: 24, courseId: 1, correct: true, text: "DALUNGGAN", audioSrc: "/AUDIO/CEBUANO/NODE3/dalunggan.mp3" },

        //option 25
        { challengeId: 25, courseId: 1, imageSrc: "/IMAGES/NODE3/25.png", correct: true, text: "KAMOT", audioSrc: "/AUDIO/CEBUANO/NODE3/kamot.mp3" },
        { challengeId: 25, courseId: 1, imageSrc: "/IMAGES/NODE3/26.png", correct: false, text: "TIIL", audioSrc: "/AUDIO/CEBUANO/NODE3/tiil.mp3" },
        { challengeId: 25, courseId: 1, imageSrc: "/IMAGES/NODE3/27.png", correct: false, text: "TUDLO", audioSrc: "/AUDIO/CEBUANO/NODE3/tudlo.mp3" },
        { challengeId: 25, courseId: 1, imageSrc: "/IMAGES/NODE3/28.png", correct: false, text: "TIYAN", audioSrc: "/AUDIO/CEBUANO/NODE3/tiyan.mp3" },

        //option 26
        { challengeId: 26, courseId: 1, correct: false, text: "KAMOT", audioSrc: "/AUDIO/CEBUANO/NODE3/kamot.mp3" },
        { challengeId: 26, courseId: 1, correct: true, text: "TIIL", audioSrc: "/AUDIO/CEBUANO/NODE3/tiil.mp3" },
        { challengeId: 26, courseId: 1, correct: false, text: "TUDLO", audioSrc: "/AUDIO/CEBUANO/NODE3/tudlo.mp3" },
        { challengeId: 26, courseId: 1, correct: false, text: "TIYAN", audioSrc: "/AUDIO/CEBUANO/NODE3/tiyan.mp3" },

        //option 27
        { challengeId: 27, courseId: 1, imageSrc: "/IMAGES/NODE3/25.png", correct: false, text: "KAMOT", audioSrc: "/AUDIO/CEBUANO/NODE3/kamot.mp3" },
        { challengeId: 27, courseId: 1, imageSrc: "/IMAGES/NODE3/26.png", correct: false, text: "TIIL", audioSrc: "/AUDIO/CEBUANO/NODE3/tiil.mp3" },
        { challengeId: 27, courseId: 1, imageSrc: "/IMAGES/NODE3/27.png", correct: true, text: "TUDLO", audioSrc: "/AUDIO/CEBUANO/NODE3/tudlo.mp3" },
        { challengeId: 27, courseId: 1, imageSrc: "/IMAGES/NODE3/28.png", correct: false, text: "TIYAN", audioSrc: "/AUDIO/CEBUANO/NODE3/tiyan.mp3" },

        //option 28
        { challengeId: 28, courseId: 1, correct: false, text: "KAMOT", audioSrc: "/AUDIO/CEBUANO/NODE3/kamot.mp3" },
        { challengeId: 28, courseId: 1, correct: false, text: "TIIL", audioSrc: "/AUDIO/CEBUANO/NODE3/tiil.mp3" },
        { challengeId: 28, courseId: 1, correct: false, text: "TUDLO", audioSrc: "/AUDIO/CEBUANO/NODE3/tudlo.mp3" },
        { challengeId: 28, courseId: 1, correct: true, text: "TIYAN", audioSrc: "/AUDIO/CEBUANO/NODE3/tiyan.mp3" },

        //option 29
        { challengeId: 29, courseId: 1, imageSrc: "/IMAGES/NODE3/25.png", correct: false, text: "KAMOT", audioSrc: "/AUDIO/CEBUANO/NODE3/kamot.mp3" },
        { challengeId: 29, courseId: 1, imageSrc: "/IMAGES/NODE3/26.png", correct: false, text: "TIIL", audioSrc: "/AUDIO/CEBUANO/NODE3/tiil.mp3" },
        { challengeId: 29, courseId: 1, imageSrc: "/IMAGES/NODE3/29.png", correct: true, text: "ABAGA", audioSrc: "/AUDIO/CEBUANO/NODE3/abaga.mp3" },
        { challengeId: 29, courseId: 1, imageSrc: "/IMAGES/NODE3/30.png", correct: false, text: "BUKTON", audioSrc: "/AUDIO/CEBUANO/NODE3/bukton.mp3" },

        //option 30
        { challengeId: 30, courseId: 1, correct: false, text: "KAMOT", audioSrc: "/AUDIO/CEBUANO/NODE3/kamot.mp3" },
        { challengeId: 30, courseId: 1, correct: false, text: "TIIL", audioSrc: "/AUDIO/CEBUANO/NODE3/tiil.mp3" },
        { challengeId: 30, courseId: 1, correct: false, text: "ABAGA", audioSrc: "/AUDIO/CEBUANO/NODE3/abaga.mp3" },
        { challengeId: 30, courseId: 1, correct: true, text: "BUKTON", audioSrc: "/AUDIO/CEBUANO/NODE3/bukton.mp3" },

    //node 4
        //option 31
        { challengeId: 31, courseId: 1, imageSrc: "/IMAGES/NODE4/31.png", correct: true, text: "LAKAW", audioSrc: "/AUDIO/CEBUANO/NODE4/lakaw.mp3" },
        { challengeId: 31, courseId: 1, imageSrc: "/IMAGES/NODE4/32.png", correct: false, text: "SULTI", audioSrc: "/AUDIO/CEBUANO/NODE4/sulti.mp3" },
        { challengeId: 31, courseId: 1, imageSrc: "/IMAGES/NODE4/33.png", correct: false, text: "DAGAN", audioSrc: "/AUDIO/CEBUANO/NODE4/dagan.mp3" },
        { challengeId: 31, courseId: 1, imageSrc: "/IMAGES/NODE4/34.png", correct: false, text: "TAMBOK", audioSrc: "/AUDIO/CEBUANO/NODE4/tambok.mp3" },

        //option 32
        { challengeId: 32, courseId: 1, correct: false, text: "LAKAW", audioSrc: "/AUDIO/CEBUANO/NODE4/lakaw.mp3" },
        { challengeId: 32, courseId: 1, correct: true, text: "SULTI", audioSrc: "/AUDIO/CEBUANO/NODE4/sulti.mp3" },
        { challengeId: 32, courseId: 1, correct: false, text: "DAGAN", audioSrc: "/AUDIO/CEBUANO/NODE4/dagan.mp3" },
        { challengeId: 32, courseId: 1, correct: false, text: "TAMBOK", audioSrc: "/AUDIO/CEBUANO/NODE4/tambok.mp3" },

        //option 33
        { challengeId: 33, courseId: 1, imageSrc: "/IMAGES/NODE4/31.png", correct: false, text: "LAKAW", audioSrc: "/AUDIO/CEBUANO/NODE4/lakaw.mp3" },
        { challengeId: 33, courseId: 1, imageSrc: "/IMAGES/NODE4/32.png", correct: false, text: "SULTI", audioSrc: "/AUDIO/CEBUANO/NODE4/sulti.mp3" },
        { challengeId: 33, courseId: 1, imageSrc: "/IMAGES/NODE4/33.png", correct: true, text: "DAGAN", audioSrc: "/AUDIO/CEBUANO/NODE4/dagan.mp3" },
        { challengeId: 33, courseId: 1, imageSrc: "/IMAGES/NODE4/34.png", correct: false, text: "TAMBOK", audioSrc: "/AUDIO/CEBUANO/NODE4/tambok.mp3" },

        //option 34
        { challengeId: 34, courseId: 1, correct: false, text: "LAKAW", audioSrc: "/AUDIO/CEBUANO/NODE4/lakaw.mp3" },
        { challengeId: 34, courseId: 1, correct: false, text: "SULTI", audioSrc: "/AUDIO/CEBUANO/NODE4/sulti.mp3" },
        { challengeId: 34, courseId: 1, correct: false, text: "DAGAN", audioSrc: "/AUDIO/CEBUANO/NODE4/dagan.mp3" },
        { challengeId: 34, courseId: 1, correct: true, text: "TAMBOK", audioSrc: "/AUDIO/CEBUANO/NODE4/tambok.mp3" },

        //option 35
        { challengeId: 35, courseId: 1, imageSrc: "/IMAGES/NODE4/35.png", correct: true, text: "HILAK", audioSrc: "/AUDIO/CEBUANO/NODE4/hilak.mp3" },
        { challengeId: 35, courseId: 1, imageSrc: "/IMAGES/NODE4/36.png", correct: false, text: "BASA", audioSrc: "/AUDIO/CEBUANO/NODE4/basa.mp3" },
        { challengeId: 35, courseId: 1, imageSrc: "/IMAGES/NODE4/37.png", correct: false, text: "SULAT", audioSrc: "/AUDIO/CEBUANO/NODE4/sulat.mp3" },
        { challengeId: 35, courseId: 1, imageSrc: "/IMAGES/NODE4/38.png", correct: false, text: "TULOG", audioSrc: "/AUDIO/CEBUANO/NODE4/tulog.mp3" },

        //option 36
        { challengeId: 36, courseId: 1, correct: false, text: "HILAK", audioSrc: "/AUDIO/CEBUANO/NODE4/hilak.mp3" },
        { challengeId: 36, courseId: 1, correct: true, text: "BASA", audioSrc: "/AUDIO/CEBUANO/NODE4/basa.mp3" },
        { challengeId: 36, courseId: 1, correct: false, text: "SULAT", audioSrc: "/AUDIO/CEBUANO/NODE4/sulat.mp3" },
        { challengeId: 36, courseId: 1, correct: false, text: "TULOG", audioSrc: "/AUDIO/CEBUANO/NODE4/tulog.mp3" },

        //option 37
        { challengeId: 37, courseId: 1, imageSrc: "/IMAGES/NODE4/35.png", correct: false, text: "HILAK", audioSrc: "/AUDIO/CEBUANO/NODE4/hilak.mp3" },
        { challengeId: 37, courseId: 1, imageSrc: "/IMAGES/NODE4/36.png", correct: false, text: "BASA", audioSrc: "/AUDIO/CEBUANO/NODE4/basa.mp3" },
        { challengeId: 37, courseId: 1, imageSrc: "/IMAGES/NODE4/37.png", correct: true, text: "SULAT", audioSrc: "/AUDIO/CEBUANO/NODE4/sulat.mp3" },
        { challengeId: 37, courseId: 1, imageSrc: "/IMAGES/NODE4/38.png", correct: false, text: "TULOG", audioSrc: "/AUDIO/CEBUANO/NODE4/tulog.mp3" },

        //option 38
        { challengeId: 38, courseId: 1, correct: false, text: "HILAK", audioSrc: "/AUDIO/CEBUANO/NODE4/hilak.mp3" },
        { challengeId: 38, courseId: 1, correct: false, text: "BASA", audioSrc: "/AUDIO/CEBUANO/NODE4/basa.mp3" },
        { challengeId: 38, courseId: 1, correct: false, text: "SULAT ", audioSrc: "/AUDIO/CEBUANO/NODE4/sulat.mp3" },
        { challengeId: 38, courseId: 1,correct: true, text: "TULOG", audioSrc: "/AUDIO/CEBUANO/NODE4/tulog.mp3" },

        //option 39
        { challengeId: 39, courseId: 1, imageSrc: "/IMAGES/NODE4/35.png", correct: false, text: "HILAK", audioSrc: "/AUDIO/CEBUANO/NODE4/hilak.mp3" },
        { challengeId: 39, courseId: 1, imageSrc: "/IMAGES/NODE4/36.png", correct: false, text: "BASA", audioSrc: "/AUDIO/CEBUANO/NODE4/basa.mp3" },
        { challengeId: 39, courseId: 1, imageSrc: "/IMAGES/NODE4/39.png", correct: true, text: "KATAWA", audioSrc: "/AUDIO/CEBUANO/NODE4/katawa.mp3" },
        { challengeId: 39, courseId: 1, imageSrc: "/IMAGES/NODE4/40.png", correct: false, text: "GUBOT", audioSrc: "/AUDIO/CEBUANO/NODE4/gubot.mp3" },

        //option 40
        { challengeId: 40, courseId: 1, correct: false, text: "HILAK", audioSrc: "/AUDIO/CEBUANO/NODE4/hilak.mp3" },
        { challengeId: 40, courseId: 1, correct: false, text: "BASA", audioSrc: "/AUDIO/CEBUANO/NODE4/basa.mp3" },
        { challengeId: 40, courseId: 1, correct: false, text: "KATAWA", audioSrc: "/AUDIO/CEBUANO/NODE4/katawa.mp3" },
        { challengeId: 40, courseId: 1, correct: true, text: "GUBOT", audioSrc: "/AUDIO/CEBUANO/NODE4/gubot.mp3" },

    //node 5
        //option 41
        { challengeId: 41, courseId: 1, imageSrc: "/IMAGES/NODE5/41.png", correct: true, text: "MAAYONG BUNTAG", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong buntag.mp3" },
        { challengeId: 41, courseId: 1, imageSrc: "/IMAGES/NODE5/42.png", correct: false, text: "MAAYONG HAPON", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong hapon.mp3" },
        { challengeId: 41, courseId: 1, imageSrc: "/IMAGES/NODE5/43.png", correct: false, text: "MAAYONG GABII", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong gabii.mp3" },
        { challengeId: 41, courseId: 1, imageSrc: "/IMAGES/NODE5/44.png", correct: false, text: "AKO SI/ AKO NING PANGALAN SI", audioSrc: "/AUDIO/CEBUANO/NODE5/ako si.mp3" },

        //option 42
        { challengeId: 42, courseId: 1, correct: false, text: "MAAYONG BUNTAG", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong buntag.mp3" },
        { challengeId: 42, courseId: 1, correct: true, text: "MAAYONG HAPON", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong hapon.mp3" },
        { challengeId: 42, courseId: 1, correct: false, text: "MAAYONG GABII", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong gabii.mp3" },
        { challengeId: 42, courseId: 1, correct: false, text: "AKO SI/ AKO NING PANGALAN SI", audioSrc: "/AUDIO/CEBUANO/NODE5/ako si.mp3" },

        //option 43
        { challengeId: 43, courseId: 1, imageSrc: "/IMAGES/NODE5/41.png", correct: false, text: "MAAYONG BUNTAG", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong buntag.mp3" },
        { challengeId: 43, courseId: 1, imageSrc: "/IMAGES/NODE5/42.png", correct: false, text: "MAAYONG HAPON", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong hapon.mp3" },
        { challengeId: 43, courseId: 1, imageSrc: "/IMAGES/NODE5/43.png", correct: true, text: "MAAYONG GABII", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong gabii.mp3" },
        { challengeId: 43, courseId: 1, imageSrc: "/IMAGES/NODE5/44.png", correct: false, text: "AKO SI/ AKO NING PANGALAN SI", audioSrc: "/AUDIO/CEBUANO/NODE5/ako si.mp3" },

        //option 44
        { challengeId: 44, courseId: 1, correct: false, text: "MAAYONG BUNTAG", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong buntag.mp3" },
        { challengeId: 44, courseId: 1, correct: false, text: "MAAYONG HAPON", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong hapon.mp3" },
        { challengeId: 44, courseId: 1, correct: false, text: "MAAYONG GABII", audioSrc: "/AUDIO/CEBUANO/NODE5/maayong gabii.mp3" },
        { challengeId: 44, courseId: 1, correct: true, text: "AKO SI/ AKO NING PANGALAN SI", audioSrc: "/AUDIO/CEBUANO/NODE5/ako si.mp3" },

        //option 45
        { challengeId: 45, courseId: 1, imageSrc: "/IMAGES/NODE5/45.png", correct: true, text: "UNSA'Y NGALAN NIMO?", audioSrc: "/AUDIO/CEBUANO/NODE5/unsa.mp3" },
        { challengeId: 45, courseId: 1, imageSrc: "/IMAGES/NODE5/46.png", correct: false, text: "TAGA (PLACE) KO", audioSrc: "/AUDIO/CEBUANO/NODE5/tagako.mp3" },
        { challengeId: 45, courseId: 1, imageSrc: "/IMAGES/NODE5/47.png", correct: false, text: "TAGA-ASA KA?", audioSrc: "/AUDIO/CEBUANO/NODE5/tagaasa.mp3" },
        { challengeId: 45, courseId: 1, imageSrc: "/IMAGES/NODE5/48.png", correct: false, text: "SALAMAT KAAYO", audioSrc: "/AUDIO/CEBUANO/NODE5/salamat.mp3" },

        //option 46
        { challengeId: 46, courseId: 1, correct: false, text: "UNSA'Y NGALAN NIMO?", audioSrc: "/AUDIO/CEBUANO/NODE5/unsa.mp3" },
        { challengeId: 46, courseId: 1, correct: true, text: "TAGA (PLACE) KO", audioSrc: "/AUDIO/CEBUANO/NODE5/tagako.mp3" },
        { challengeId: 46, courseId: 1, correct: false, text: "TAGA-ASA KA?", audioSrc: "/AUDIO/CEBUANO/NODE5/tagaasa.mp3" },
        { challengeId: 46, courseId: 1, correct: false, text: "SALAMAT KAAYO", audioSrc: "/AUDIO/CEBUANO/NODE5/salamat.mp3" },

        //option 47
        { challengeId: 47, courseId: 1, imageSrc: "/IMAGES/NODE5/45.png", correct: false, text: "UNSA'Y NGALAN NIMO?", audioSrc: "/AUDIO/CEBUANO/NODE5/unsa.mp3" },
        { challengeId: 47, courseId: 1, imageSrc: "/IMAGES/NODE5/46.png", correct: false, text: "TAGA (PLACE) KO", audioSrc: "/AUDIO/CEBUANO/NODE5/tagako.mp3" },
        { challengeId: 47, courseId: 1, imageSrc: "/IMAGES/NODE5/47.png", correct: true, text: "TAGA-ASA KA?", audioSrc: "/AUDIO/CEBUANO/NODE5/tagaasa.mp3" },
        { challengeId: 47, courseId: 1, imageSrc: "/IMAGES/NODE5/48.png", correct: false, text: "SALAMAT KAAYO", audioSrc: "/AUDIO/CEBUANO/NODE5/salamat.mp3" },

        //option 48
        { challengeId: 48, courseId: 1, correct: false, text: "UNSA'Y NGALAN NIMO?", audioSrc: "/AUDIO/CEBUANO/NODE5/unsa.mp3" },
        { challengeId: 48, courseId: 1, correct: false, text: "TAGA (PLACE) KO", audioSrc: "/AUDIO/CEBUANO/NODE5/tagako.mp3" },
        { challengeId: 48, courseId: 1, correct: false, text: "TAGA-ASA KA?", audioSrc: "/AUDIO/CEBUANO/NODE5/tagaasa.mp3" },
        { challengeId: 48, courseId: 1, correct: true, text: "SALAMAT KAAYO", audioSrc: "/AUDIO/CEBUANO/NODE5/salamat.mp3" },

        //option 49
        { challengeId: 49, courseId: 1, imageSrc: "/IMAGES/NODE5/45.png", correct: false, text: "UNSA'Y NGALAN NIMO?", audioSrc: "/AUDIO/CEBUANO/NODE5/unsa.mp3" },
        { challengeId: 49, courseId: 1, imageSrc: "/IMAGES/NODE5/46.png", correct: false, text: "TAGA (PLACE) KO", audioSrc: "/AUDIO/CEBUANO/NODE5/tagako.mp3" },
        { challengeId: 49, courseId: 1, imageSrc: "/IMAGES/NODE5/49.png", correct: true, text: "GIHIGUGMA KO IKAW", audioSrc: "/AUDIO/CEBUANO/NODE5/love.mp3" },
        { challengeId: 49, courseId: 1, imageSrc: "/IMAGES/NODE5/50.png", correct: false, text: "MAGKITA LANG TA PUHON", audioSrc: "/AUDIO/CEBUANO/NODE5/puhon.mp3" },

        //option 50
        { challengeId: 50, courseId: 1, correct: false, text: "UNSA'Y NGALAN NIMO?", audioSrc: "/AUDIO/CEBUANO/NODE5/unsa.mp3" },
        { challengeId: 50, courseId: 1, correct: false, text: "TAGA (PLACE) KO", audioSrc: "/AUDIO/CEBUANO/NODE5/tagako.mp3" },
        { challengeId: 50, courseId: 1, correct: false, text: "GIHIGUGMA KO IKAW", audioSrc: "/AUDIO/CEBUANO/NODE5/love.mp3" },
        { challengeId: 50, courseId: 1, correct: true, text: "MAGKITA LANG TA PUHON", audioSrc: "/AUDIO/CEBUANO/NODE5/puhon.mp3" },



// course ILOKANO
    //node 1 options
        //option 51
        { challengeId: 51, courseId: 2, imageSrc: "/IMAGES/NODE1/1.png", correct: true, text: "NAGANAK", audioSrc: "/AUDIO/ILOCANO/NODE1/naganak.mp3" },
        { challengeId: 51, courseId: 2, imageSrc: "/IMAGES/NODE1/2.png", correct: false, text: "TATANG", audioSrc: "/AUDIO/ILOCANO/NODE1/tatang.mp3" },
        { challengeId: 51, courseId: 2, imageSrc: "/IMAGES/NODE1/3.png", correct: false, text: "INANG", audioSrc: "/AUDIO/ILOCANO/NODE1/inang.mp3" },
        { challengeId: 51, courseId: 2, imageSrc: "/IMAGES/NODE1/4.png", correct: false, text: "LOLO", audioSrc: "/AUDIO/ILOCANO/NODE1/lolo.mp3" },

        //option 52
        { challengeId: 52, courseId: 2, correct: false, text: "NAGANAK", audioSrc: "/AUDIO/ILOCANO/NODE1/naganak.mp3" },
        { challengeId: 52, courseId: 2, correct: true, text: "TATANG", audioSrc: "/AUDIO/ILOCANO/NODE1/tatang.mp3" },
        { challengeId: 52, courseId: 2, correct: false, text: "INANG", audioSrc: "/AUDIO/ILOCANO/NODE1/inang.mp3" },
        { challengeId: 52, courseId: 2, correct: false, text: "LOLO", audioSrc: "/AUDIO/ILOCANO/NODE1/lolo.mp3" },

        //option 53
        { challengeId: 53, courseId: 2, imageSrc: "/IMAGES/NODE1/1.png", correct: false, text: "NAGANAK", audioSrc: "/AUDIO/ILOCANO/NODE1/naganak.mp3" },
        { challengeId: 53, courseId: 2, imageSrc: "/IMAGES/NODE1/2.png", correct: false, text: "TATANG", audioSrc: "/AUDIO/ILOCANO/NODE1/tatang.mp3" },
        { challengeId: 53, courseId: 2, imageSrc: "/IMAGES/NODE1/3.png", correct: true, text: "INANG", audioSrc: "/AUDIO/ILOCANO/NODE1/inang.mp3" },
        { challengeId: 53, courseId: 2, imageSrc: "/IMAGES/NODE1/4.png", correct: false, text: "LOLO", audioSrc: "/AUDIO/ILOCANO/NODE1/lolo.mp3" },

        //option 54
        { challengeId: 54, courseId: 2, correct: false, text: "NAGANAK", audioSrc: "/AUDIO/ILOCANO/NODE1/naganak.mp3" },
        { challengeId: 54, courseId: 2, correct: false, text: "TATANG", audioSrc: "/AUDIO/ILOCANO/NODE1/tatang.mp3" },
        { challengeId: 54, courseId: 2, correct: false, text: "INANG", audioSrc: "/AUDIO/ILOCANO/NODE1/inang.mp3" },
        { challengeId: 54, courseId: 2, correct: true, text: "LOLO", audioSrc: "/AUDIO/ILOCANO/NODE1/lolo.mp3" },

         //option 55
         { challengeId: 55, courseId: 2, imageSrc: "/IMAGES/NODE1/5.png", correct: true, text: "LOLA", audioSrc: "/AUDIO/ILOCANO/NODE1/lola.mp3" },
         { challengeId: 55, courseId: 2, imageSrc: "/IMAGES/NODE1/6.png", correct: false, text: "GAYYEM", audioSrc: "/AUDIO/ILOCANO/NODE5/gayyem.mp3" },
         { challengeId: 55, courseId: 2, imageSrc: "/IMAGES/NODE1/7.png", correct: false, text: "KABSAT", audioSrc: "/AUDIO/ILOCANO/NODE5/kabsat.mp3" },
         { challengeId: 55, courseId: 2, imageSrc: "/IMAGES/NODE1/8.png", correct: false, text: "MANGAN", audioSrc: "/AUDIO/ILOCANO/NODE1/mangan.mp3" },
 
         //option 56
         { challengeId: 56, courseId: 2, correct: false, text: "LOLA", audioSrc: "/AUDIO/ILOCANO/NODE1/lola.mp3" },
         { challengeId: 56, courseId: 2, correct: true, text: "GAYYEM", audioSrc: "/AUDIO/ILOCANO/NODE1/gayyem.mp3" },
         { challengeId: 56, courseId: 2, correct: false, text: "KABSAT", audioSrc: "/AUDIO/ILOCANO/NODE1/kabsat.mp3" },
         { challengeId: 56, courseId: 2, correct: false, text: "MANGAN", audioSrc: "/AUDIO/ILOCANO/NODE1/mangan.mp3" },

        //option 57
        { challengeId: 57, courseId: 2, imageSrc: "/IMAGES/NODE1/5.png", correct: false, text: "LOLA", audioSrc: "/AUDIO/ILOCANO/NODE1/lola.mp3" },
        { challengeId: 57, courseId: 2, imageSrc: "/IMAGES/NODE1/6.png", correct: false, text: "GAYYEM", audioSrc: "/AUDIO/ILOCANO/NODE1/gayyem.mp3" },
        { challengeId: 57, courseId: 2, imageSrc: "/IMAGES/NODE1/7.png", correct: true, text: "KABSAT", audioSrc: "/AUDIO/ILOCANO/NODE1/kabsat.mp3" },
        { challengeId: 57, courseId: 2, imageSrc: "/IMAGES/NODE1/8.png", correct: false, text: "MANGAN", audioSrc: "/AUDIO/ILOCANO/NODE1/mangan.mp3" },

        //option 58
        { challengeId: 58, courseId: 2, correct: false, text: "LOLA", audioSrc: "/AUDIO/ILOCANO/NODE1/lola.mp3" },
        { challengeId: 58, courseId: 2, correct: false, text: "GAYYEM", audioSrc: "/AUDIO/ILOCANO/NODE1/gayyem.mp3" },
        { challengeId: 58, courseId: 2, correct: false, text: "KABSAT", audioSrc: "/AUDIO/ILOCANO/NODE1/kabsat.mp3" },
        { challengeId: 58, courseId: 2, correct: true, text: "MANGAN", audioSrc: "/AUDIO/ILOCANO/NODE1/mangan.mp3" },

        //option 59
        { challengeId: 59, courseId: 2, imageSrc: "/IMAGES/NODE1/5.png", correct: false, text: "LOLA", audioSrc: "/AUDIO/ILOCANO/NODE1/lola.mp3" },
        { challengeId: 59, courseId: 2, imageSrc: "/IMAGES/NODE1/6.png", correct: false, text: "GAYYEM", audioSrc: "/AUDIO/ILOCANO/NODE1/gayyem.mp3" },
        { challengeId: 59, courseId: 2, imageSrc: "/IMAGES/NODE1/9.png", correct: true, text: "DIGOS", audioSrc: "/AUDIO/ILOCANO/NODE1/digos.mp3" },
        { challengeId: 59, courseId: 2, imageSrc: "/IMAGES/NODE1/10.png", correct: false, text: "UMIINOM", audioSrc: "/AUDIO/ILOCANO/NODE1/drink.mp3" },

        //option 60
        { challengeId: 60, courseId: 2, correct: false, text: "LOLA", audioSrc: "/AUDIO/ILOCANO/NODE1/lola.mp3" },
        { challengeId: 60, courseId: 2, correct: false, text: "GAYYEM", audioSrc: "/AUDIO/ILOCANO/NODE1/gayyem.mp3" },
        { challengeId: 60, courseId: 2, correct: false, text: "DIGOS", audioSrc: "/AUDIO/ILOCANO/NODE1/digos.mp3" },
        { challengeId: 60, courseId: 2, correct: true, text: "UMIINOM", audioSrc: "/AUDIO/ILOCANO/NODE1/drink.mp3" },

    //node 2 options
        //option 61
        { challengeId: 61, courseId: 2, imageSrc: "/IMAGES/NODE2/11.png", correct: true, text: "TUGAW", audioSrc: "/AUDIO/ILOCANO/NODE2/tugaw.mp3" },
        { challengeId: 61, courseId: 2, imageSrc: "/IMAGES/NODE2/12.png", correct: false, text: "LAMISAAN", audioSrc: "/AUDIO/ILOCANO/NODE2/lamisaan.mp3" },
        { challengeId: 61, courseId: 2, imageSrc: "/IMAGES/NODE2/13.png", correct: false, text: "RIDAW", audioSrc: "/AUDIO/ILOCANO/NODE2/ridaw.mp3" },
        { challengeId: 61, courseId: 2, imageSrc: "/IMAGES/NODE2/14.png", correct: false, text: "KAMA", audioSrc: "/AUDIO/ILOCANO/NODE2/kama.mp3" },

        //option 62
        { challengeId: 62, courseId: 2, correct: false, text: "TUGAW", audioSrc: "/AUDIO/ILOCANO/NODE2/tugaw.mp3" },
        { challengeId: 62, courseId: 2, correct: true, text: "LAMISAAN", audioSrc: "/AUDIO/ILOCANO/NODE2/lamisaan.mp3" },
        { challengeId: 62, courseId: 2, correct: false, text: "RIDAW", audioSrc: "/AUDIO/ILOCANO/NODE2/ridaw.mp3" },
        { challengeId: 62, courseId: 2, correct: false, text: "KAMA", audioSrc: "/AUDIO/ILOCANO/NODE2/kama.mp3" },

        //option 63
        { challengeId: 63, courseId: 2, imageSrc: "/IMAGES/NODE2/11.png", correct: false, text: "TUGAW", audioSrc: "/AUDIO/ILOCANO/NODE2/tugaw.mp3" },
        { challengeId: 63, courseId: 2, imageSrc: "/IMAGES/NODE2/12.png", correct: false, text: "LAMISAAN", audioSrc: "/AUDIO/ILOCANO/NODE2/lamisaan.mp3" },
        { challengeId: 63, courseId: 2, imageSrc: "/IMAGES/NODE2/13.png", correct: true, text: "RIDAW", audioSrc: "/AUDIO/ILOCANO/NODE2/ridaw.mp3" },
        { challengeId: 63, courseId: 2, imageSrc: "/IMAGES/NODE2/14.png", correct: false, text: "KAMA", audioSrc: "/AUDIO/ILOCANO/NODE2/kama.mp3" },

    
        //option 64
        { challengeId: 64, courseId: 2, correct: false, text: "TUGAW", audioSrc: "/AUDIO/ILOCANO/NODE2/tugaw.mp3" },
        { challengeId: 64, courseId: 2, correct: false, text: "LAMISAAN", audioSrc: "/AUDIO/ILOCANO/NODE2/lamisaan.mp3" },
        { challengeId: 64, courseId: 2, correct: false, text: "RIDAW", audioSrc: "/AUDIO/ILOCANO/NODE2/ridaw.mp3" },
        { challengeId: 64, courseId: 2, correct: true, text: "KAMA", audioSrc: "/AUDIO/ILOCANO/NODE2/kama.mp3" },

        //option 65
        { challengeId: 65, courseId: 2, imageSrc: "/IMAGES/NODE2/15.png", correct: true, text: "ULBONG", audioSrc: "/AUDIO/ILOCANO/NODE2/ulbong.mp3" },
        { challengeId: 65, courseId: 2, imageSrc: "/IMAGES/NODE2/16.png", correct: false, text: "ULES", audioSrc: "/AUDIO/ILOCANO/NODE2/ules.mp3" },
        { challengeId: 65, courseId: 2, imageSrc: "/IMAGES/NODE2/17.png", correct: false, text: "SALUDSUD", audioSrc: "/AUDIO/ILOCANO/NODE2/saludsud.mp3" },
        { challengeId: 65, courseId: 2, imageSrc: "/IMAGES/NODE2/18.png", correct: false, text: "PAPET", audioSrc: "/AUDIO/ILOCANO/NODE2/papet.mp3" },

        //option 66
        { challengeId: 66, courseId: 2, correct: false, text: "ULBONG", audioSrc: "/AUDIO/ILOCANO/NODE2/ulbong.mp3" },
        { challengeId: 66, courseId: 2, correct: true, text: "ULES", audioSrc: "/AUDIO/ILOCANO/NODE2/ules.mp3" },
        { challengeId: 66, courseId: 2, correct: false, text: "SALUDSUD", audioSrc: "/AUDIO/ILOCANO/NODE2/saludsud.mp3" },
        { challengeId: 66, courseId: 2, correct: false, text: "PAPET", audioSrc: "/AUDIO/ILOCANO/NODE2/papet.mp3" },

         //option 67
         { challengeId: 67, courseId: 2, imageSrc: "/IMAGES/NODE2/15.png", correct: false, text: "ULBONG", audioSrc: "/AUDIO/ILOCANO/NODE2/ulbong.mp3" },
         { challengeId: 67, courseId: 2, imageSrc: "/IMAGES/NODE2/16.png", correct: false, text: "ULES", audioSrc: "/AUDIO/ILOCANO/NODE2/ules.mp3" },
         { challengeId: 67, courseId: 2, imageSrc: "/IMAGES/NODE2/17.png", correct: true, text: "SALUDSUD", audioSrc: "/AUDIO/ILOCANO/NODE2/saludsud.mp3" },
         { challengeId: 67, courseId: 2, imageSrc: "/IMAGES/NODE2/18.png", correct: false, text: "PAPET", audioSrc: "/AUDIO/ILOCANO/NODE2/papet.mp3" },
 
         //option 68
         { challengeId: 68, courseId: 2, correct: false, text: "ULBONG", audioSrc: "/AUDIO/ILOCANO/NODE2/ulbong.mp3" },
         { challengeId: 68, courseId: 2, correct: false, text: "ULES", audioSrc: "/AUDIO/ILOCANO/NODE2/ules.mp3" },
         { challengeId: 68, courseId: 2, correct: false, text: "SALUDSUD", audioSrc: "/AUDIO/ILOCANO/NODE2/saludsud.mp3" },
         { challengeId: 68, courseId: 2, correct: true, text: "PAPET", audioSrc: "/AUDIO/ILOCANO/NODE2/papet.mp3" },

         //option 69
         { challengeId: 69, courseId: 2, imageSrc: "/IMAGES/NODE2/15.png", correct: false, text: "ULBONG", audioSrc: "/AUDIO/ILOCANO/NODE2/ulbong.mp3" },
         { challengeId: 69, courseId: 2, imageSrc: "/IMAGES/NODE2/16.png", correct: false, text: "ULES", audioSrc: "/AUDIO/ILOCANO/NODE2/ules.mp3" },
         { challengeId: 69, courseId: 2, imageSrc: "/IMAGES/NODE2/19.png", correct: true, text: "BULING", audioSrc: "/AUDIO/ILOCANO/NODE2/buling.mp3" },
         { challengeId: 69, courseId: 2, imageSrc: "/IMAGES/NODE2/20.png", correct: false, text: "APARADOR", audioSrc: "/AUDIO/ILOCANO/NODE2/aparador.mp3" },
 
         //option 70
         { challengeId: 70, courseId: 2, correct: false, text: "ULBONG", audioSrc: "/AUDIO/ILOCANO/NODE2/ulbong.mp3" },
         { challengeId: 70, courseId: 2, correct: false, text: "ULES", audioSrc: "/AUDIO/ILOCANO/NODE2/ules.mp3" },
         { challengeId: 70, courseId: 2, correct: false, text: "BULING", audioSrc: "/AUDIO/ILOCANO/NODE2/buling.mp3" },
         { challengeId: 70, courseId: 2, correct: true, text: "APARADOR", audioSrc: "/AUDIO/ILOCANO/NODE2/aparador.mp3" },

    //node 3 options
        //option 71
        { challengeId: 71, courseId: 2, imageSrc: "/IMAGES/NODE3/21.png", correct: true, text: "ULO", audioSrc: "/AUDIO/ILOCANO/NODE3/ulo.mp3" },
        { challengeId: 71, courseId: 2, imageSrc: "/IMAGES/NODE3/22.png", correct: false, text: "MUGING", audioSrc: "/AUDIO/ILOCANO/NODE3/muging.mp3" },
        { challengeId: 71, courseId: 2, imageSrc: "/IMAGES/NODE3/23.png", correct: false, text: "ILONG", audioSrc: "/AUDIO/ILOCANO/NODE3/ilong.mp3" },
        { challengeId: 71, courseId: 2, imageSrc: "/IMAGES/NODE3/24.png", correct: false, text: "LAPAYAG", audioSrc: "/AUDIO/ILOCANO/NODE3/lapayag.mp3" },

        //option 72
        { challengeId: 72, courseId: 2, correct: false, text: "ULO", audioSrc: "/AUDIO/ILOCANO/NODE3/ulo.mp3" },
        { challengeId: 72, courseId: 2, correct: true, text: "MUGING", audioSrc: "/AUDIO/ILOCANO/NODE3/muging.mp3" },
        { challengeId: 72, courseId: 2, correct: false, text: "ILONG", audioSrc: "/AUDIO/ILOCANO/NODE3/ilong.mp3" },
        { challengeId: 72, courseId: 2, correct: false, text: "LAPAYAG", audioSrc: "/AUDIO/ILOCANO/NODE3/lapayag.mp3" },

        //option 73
        { challengeId: 73, courseId: 2, imageSrc: "/IMAGES/NODE3/21.png", correct: false, text: "ULO", audioSrc: "/AUDIO/ILOCANO/NODE3/ulo.mp3" },
        { challengeId: 73, courseId: 2, imageSrc: "/IMAGES/NODE3/22.png", correct: false, text: "MUGING", audioSrc: "/AUDIO/ILOCANO/NODE3/muging.mp3" },
        { challengeId: 73, courseId: 2, imageSrc: "/IMAGES/NODE3/23.png", correct: true, text: "ILONG", audioSrc: "/AUDIO/ILOCANO/NODE3/ilong.mp3" },
        { challengeId: 73, courseId: 2, imageSrc: "/IMAGES/NODE3/24.png", correct: false, text: "LAPAYAG", audioSrc: "/AUDIO/ILOCANO/NODE3/lapayag.mp3" },

        //option 74
        { challengeId: 74, courseId: 2, correct: false, text: "ULO", audioSrc: "/AUDIO/ILOCANO/NODE3/ulo.mp3" },
        { challengeId: 74, courseId: 2, correct: false, text: "MUGING", audioSrc: "/AUDIO/ILOCANO/NODE3/muging.mp3" },
        { challengeId: 74, courseId: 2, correct: false, text: "ILONG", audioSrc: "/AUDIO/ILOCANO/NODE3/ilong.mp3" },
        { challengeId: 74, courseId: 2, correct: true, text: "LAPAYAG", audioSrc: "/AUDIO/ILOCANO/NODE3/lapayag.mp3" },

        //option 75
        { challengeId: 75, courseId: 2, imageSrc: "/IMAGES/NODE3/25.png", correct: true, text: "IMA", audioSrc: "/AUDIO/ILOCANO/NODE3/ima.mp3" },
        { challengeId: 75, courseId: 2, imageSrc: "/IMAGES/NODE3/26.png", correct: false, text: "SAKA", audioSrc: "/AUDIO/ILOCANO/NODE3/saka.mp3" },
        { challengeId: 75, courseId: 2, imageSrc: "/IMAGES/NODE3/27.png", correct: false, text: "DALIRI", audioSrc: "/AUDIO/ILOCANO/NODE3/daliri.mp3" },
        { challengeId: 75, courseId: 2, imageSrc: "/IMAGES/NODE3/28.png", correct: false, text: "BUKSIT", audioSrc: "/AUDIO/ILOCANO/NODE3/buksit.mp3" },

        //option 76
        { challengeId: 76, courseId: 2, correct: false, text: "IMA", audioSrc: "/AUDIO/ILOCANO/NODE3/ima.mp3" },
        { challengeId: 76, courseId: 2, correct: true, text: "SAKA", audioSrc: "/AUDIO/ILOCANO/NODE3/saka.mp3" },
        { challengeId: 76, courseId: 2, correct: false, text: "DALIRI", audioSrc: "/AUDIO/ILOCANO/NODE3/daliri.mp3" },
        { challengeId: 76, courseId: 2, correct: false, text: "BUKSIT", audioSrc: "/AUDIO/ILOCANO/NODE3/buksit.mp3" },

        //option 77
        { challengeId: 77, courseId: 2, imageSrc: "/IMAGES/NODE3/25.png", correct: false, text: "IMA", audioSrc: "/AUDIO/ILOCANO/NODE3/ima.mp3" },
        { challengeId: 77, courseId: 2, imageSrc: "/IMAGES/NODE3/26.png", correct: false, text: "SAKA", audioSrc: "/AUDIO/ILOCANO/NODE3/saka.mp3" },
        { challengeId: 77, courseId: 2, imageSrc: "/IMAGES/NODE3/27.png", correct: true, text: "DALIRI", audioSrc: "/AUDIO/ILOCANO/NODE3/daliri.mp3" },
        { challengeId: 77, courseId: 2, imageSrc: "/IMAGES/NODE3/28.png", correct: false, text: "BUKSIT", audioSrc: "/AUDIO/ILOCANO/NODE3/buksit.mp3" },

        //option 78
        { challengeId: 78, courseId: 2, correct: false, text: "IMA", audioSrc: "/AUDIO/ILOCANO/NODE3/ima.mp3" },
        { challengeId: 78, courseId: 2, correct: false, text: "SAKA", audioSrc: "/AUDIO/ILOCANO/NODE3/saka.mp3" },
        { challengeId: 78, courseId: 2, correct: false, text: "DALIRI", audioSrc: "/AUDIO/ILOCANO/NODE3/daliri.mp3" },
        { challengeId: 78, courseId: 2, correct: true, text: "BUKSIT", audioSrc: "/AUDIO/ILOCANO/NODE3/buksit.mp3" },

        //option 79
        { challengeId: 79, courseId: 2, imageSrc: "/IMAGES/NODE3/25.png", correct: false, text: "IMA", audioSrc: "/AUDIO/ILOCANO/NODE3/ima.mp3" },
        { challengeId: 79, courseId: 2, imageSrc: "/IMAGES/NODE3/26.png", correct: false, text: "SAKA", audioSrc: "/AUDIO/ILOCANO/NODE3/saka.mp3" },
        { challengeId: 79, courseId: 2, imageSrc: "/IMAGES/NODE3/29.png", correct: true, text: "ABAGA", audioSrc: "/AUDIO/ILOCANO/NODE3/abaga.mp3" },
        { challengeId: 79, courseId: 2, imageSrc: "/IMAGES/NODE3/30.png", correct: false, text: "TAKKIAG", audioSrc: "/AUDIO/ILOCANO/NODE3/takkiag.mp3" },

        //option 80
        { challengeId: 80, courseId: 2, correct: false, text: "IMA", audioSrc: "/AUDIO/ILOCANO/NODE3/ima.mp3" },
        { challengeId: 80, courseId: 2, correct: false, text: "SAKA", audioSrc: "/AUDIO/ILOCANO/NODE3/saka.mp3" },
        { challengeId: 80, courseId: 2, correct: false, text: "ABAGA", audioSrc: "/AUDIO/ILOCANO/NODE3/abaga.mp3" },
        { challengeId: 80, courseId: 2, correct: true, text: "TAKKIAG", audioSrc: "/AUDIO/ILOCANO/NODE3/takkiag.mp3" },

    //node 4 options
        //option 81
        { challengeId: 81, courseId: 2, imageSrc: "/IMAGES/NODE4/31.png", correct: true, text: "LAKAD", audioSrc: "/AUDIO/ILOCANO/NODE4/lakad.mp3" },
        { challengeId: 81, courseId: 2, imageSrc: "/IMAGES/NODE4/32.png", correct: false, text: "SALITA", audioSrc: "/AUDIO/ILOCANO/NODE4/salita.mp3" },
        { challengeId: 81, courseId: 2, imageSrc: "/IMAGES/NODE4/33.png", correct: false, text: "TAKBO", audioSrc: "/AUDIO/ILOCANO/NODE4/takbo.mp3" },
        { challengeId: 81, courseId: 2, imageSrc: "/IMAGES/NODE4/34.png", correct: false, text: "TALTALON", audioSrc: "/AUDIO/ILOCANO/NODE4/taltalon.mp3" },

        //option 82
        { challengeId: 82, courseId: 2, correct: false, text: "LAKAD", audioSrc: "/AUDIO/ILOCANO/NODE4/lakad.mp3" },
        { challengeId: 82, courseId: 2, correct: true, text: "SALITA", audioSrc: "/AUDIO/ILOCANO/NODE4/salita.mp3" },
        { challengeId: 82, courseId: 2, correct: false, text: "TAKBO", audioSrc: "/AUDIO/ILOCANO/NODE4/takbo.mp3" },
        { challengeId: 82, courseId: 2, correct: false, text: "TALTALON", audioSrc: "/AUDIO/ILOCANO/NODE4/taltalon.mp3" },

        //option 83
        { challengeId: 83, courseId: 2, imageSrc: "/IMAGES/NODE4/31.png", correct: false, text: "LAKAD", audioSrc: "/AUDIO/ILOCANO/NODE4/lakad.mp3" },
        { challengeId: 83, courseId: 2, imageSrc: "/IMAGES/NODE4/32.png", correct: false, text: "SALITA", audioSrc: "/AUDIO/ILOCANO/NODE4/salita.mp3" },
        { challengeId: 83, courseId: 2, imageSrc: "/IMAGES/NODE4/33.png", correct: true, text: "TAKBO", audioSrc: "/AUDIO/ILOCANO/NODE4/takbo.mp3" },
        { challengeId: 83, courseId: 2, imageSrc: "/IMAGES/NODE4/34.png", correct: false, text: "TALTALON", audioSrc: "/AUDIO/ILOCANO/NODE4/taltalon.mp3" },

        //option 84
        { challengeId: 84, courseId: 2, correct: false, text: "LAKAD", audioSrc: "/AUDIO/ILOCANO/NODE4/lakad.mp3" },
        { challengeId: 84, courseId: 2, correct: false, text: "SALITA", audioSrc: "/AUDIO/ILOCANO/NODE4/salita.mp3" },
        { challengeId: 84, courseId: 2, correct: false, text: "TAKBO", audioSrc: "/AUDIO/ILOCANO/NODE4/takbo.mp3" },
        { challengeId: 84, courseId: 2, correct: true, text: "TALTALON", audioSrc: "/AUDIO/ILOCANO/NODE4/taltalon.mp3" },

        //option 85
        { challengeId: 85, courseId: 2, imageSrc: "/IMAGES/NODE4/35.png", correct: true, text: "SANGIT", audioSrc: "/AUDIO/ILOCANO/NODE4/sangit.mp3" },
        { challengeId: 85, courseId: 2, imageSrc: "/IMAGES/NODE4/36.png", correct: false, text: "BASA", audioSrc: "/AUDIO/ILOCANO/NODE4/basa.mp3" },
        { challengeId: 85, courseId: 2, imageSrc: "/IMAGES/NODE4/37.png", correct: false, text: "SULAT", audioSrc: "/AUDIO/ILOCANO/NODE4/sulat.mp3" },
        { challengeId: 85, courseId: 2, imageSrc: "/IMAGES/NODE4/38.png", correct: false, text: "MAKATURTUROG", audioSrc: "/AUDIO/ILOCANO/NODE4/makaturturog.mp3" },

        //option 86
        { challengeId: 86, courseId: 2, correct: false, text: "SANGIT", audioSrc: "/AUDIO/ILOCANO/NODE4/sangit.mp3" },
        { challengeId: 86, courseId: 2, correct: true, text: "BASA", audioSrc: "/AUDIO/ILOCANO/NODE4/basa.mp3" },
        { challengeId: 86, courseId: 2, correct: false, text: "SULAT", audioSrc: "/AUDIO/ILOCANO/NODE4/sulat.mp3" },
        { challengeId: 86, courseId: 2, correct: false, text: "MAKATURTUROG", audioSrc: "/AUDIO/ILOCANO/NODE4/makaturturog.mp3" },

        //option 87
        { challengeId: 87, courseId: 2, imageSrc: "/IMAGES/NODE4/35.png", correct: false, text: "SANGIT", audioSrc: "/AUDIO/ILOCANO/NODE4/sangit.mp3" },
        { challengeId: 87, courseId: 2, imageSrc: "/IMAGES/NODE4/36.png", correct: false, text: "BASA", audioSrc: "/AUDIO/ILOCANO/NODE4/basa.mp3" },
        { challengeId: 87, courseId: 2, imageSrc: "/IMAGES/NODE4/37.png", correct: true, text: "SULAT", audioSrc: "/AUDIO/ILOCANO/NODE4/sulat.mp3" },
        { challengeId: 87, courseId: 2, imageSrc: "/IMAGES/NODE4/38.png", correct: false, text: "MAKATURTUROG", audioSrc: "/AUDIO/ILOCANO/NODE4/makaturturog.mp3" },

        //option 88
        { challengeId: 88, courseId: 2, correct: false, text: "SANGIT", audioSrc: "/AUDIO/ILOCANO/NODE4/sangit.mp3" },
        { challengeId: 88, courseId: 2, correct: false, text: "BASA", audioSrc: "/AUDIO/ILOCANO/NODE4/basa.mp3" },
        { challengeId: 88, courseId: 2, correct: false, text: "SULAT", audioSrc: "/AUDIO/ILOCANO/NODE4/sulat.mp3" },
        { challengeId: 88, courseId: 2, correct: true, text: "MAKATURTUROG", audioSrc: "/AUDIO/ILOCANO/NODE4/makaturturog.mp3" },

        //option 89
        { challengeId: 89, courseId: 2, imageSrc: "/IMAGES/NODE4/35.png", correct: false, text: "SANGIT", audioSrc: "/AUDIO/ILOCANO/NODE4/sangit.mp3" },
        { challengeId: 89, courseId: 2, imageSrc: "/IMAGES/NODE4/36.png", correct: false, text: "BASA", audioSrc: "/AUDIO/ILOCANO/NODE4/basa.mp3" },
        { challengeId: 89, courseId: 2, imageSrc: "/IMAGES/NODE4/39.png", correct: true, text: "TAWA", audioSrc: "/AUDIO/ILOCANO/NODE4/tawa.mp3" },
        { challengeId: 89, courseId: 2, imageSrc: "/IMAGES/NODE4/40.png", correct: false, text: "SIGAW", audioSrc: "/AUDIO/ILOCANO/NODE4/sigaw.mp3" },

        //option 90
        { challengeId: 90, courseId: 2, correct: false, text: "SANGIT", audioSrc: "/AUDIO/ILOCANO/NODE4/sangit.mp3" },
        { challengeId: 90, courseId: 2, correct: false, text: "BASA", audioSrc: "/AUDIO/ILOCANO/NODE4/basa.mp3" },
        { challengeId: 90, courseId: 2, correct: false, text: "TAWA", audioSrc: "/AUDIO/ILOCANO/NODE4/tawa.mp3" },
        { challengeId: 90, courseId: 2, correct: true, text: "SIGAW", audioSrc: "/AUDIO/ILOCANO/NODE4/sigaw.mp3" },

    //node 5 options
        //option 91
        { challengeId: 91, courseId: 2, imageSrc: "/IMAGES/NODE5/41.png", correct: true, text: "NAIMBAG A BIGAT", audioSrc: "/AUDIO/ILOCANO/NODE5/morning.mp3" },
        { challengeId: 91, courseId: 2, imageSrc: "/IMAGES/NODE5/42.png", correct: false, text: "NAIMBAG A MALEM", audioSrc: "/AUDIO/ILOCANO/NODE5/afternoon.mp3" },
        { challengeId: 91, courseId: 2, imageSrc: "/IMAGES/NODE5/43.png", correct: false, text: "NAIMBAG A RABI-I", audioSrc: "/AUDIO/ILOCANO/NODE5/night.mp3" },
        { challengeId: 91, courseId: 2, imageSrc: "/IMAGES/NODE5/44.png", correct: false, text: "SIAK NI", audioSrc: "/AUDIO/ILOCANO/NODE5/siak.mp3" },

        //option 92
        { challengeId: 92, courseId: 2, correct: false, text: "NAIMBAG A BIGAT", audioSrc: "/AUDIO/ILOCANO/NODE5/morning.mp3" },
        { challengeId: 92, courseId: 2, correct: true, text: "NAIMBAG A MALEM", audioSrc: "/AUDIO/ILOCANO/NODE5/afternoon.mp3" },
        { challengeId: 92, courseId: 2, correct: false, text: "NAIMBAG A RABI-I", audioSrc: "/AUDIO/ILOCANO/NODE5/night.mp3" },
        { challengeId: 92, courseId: 2, correct: false, text: "SIAK NI", audioSrc: "/AUDIO/ILOCANO/NODE5/siak.mp3" },

        //option 93
        { challengeId: 93, courseId: 2, imageSrc: "/IMAGES/NODE5/41.png", correct: false, text: "NAIMBAG A BIGAT", audioSrc: "/AUDIO/ILOCANO/NODE5/morning.mp3" },
        { challengeId: 93, courseId: 2, imageSrc: "/IMAGES/NODE5/42.png", correct: false, text: "NAIMBAG A MALEM", audioSrc: "/AUDIO/ILOCANO/NODE5/afternoon.mp3" },
        { challengeId: 93, courseId: 2, imageSrc: "/IMAGES/NODE5/43.png", correct: true, text: "NAIMBAG A RABI-I", audioSrc: "/AUDIO/ILOCANO/NODE5/night.mp3" },
        { challengeId: 93, courseId: 2, imageSrc: "/IMAGES/NODE5/44.png", correct: false, text: "SIAK NI", audioSrc: "/AUDIO/ILOCANO/NODE5/siak.mp3" },

        //option 94
        { challengeId: 94, courseId: 2, correct: false, text: "NAIMBAG A BIGAT", audioSrc: "/AUDIO/ILOCANO/NODE5/morning.mp3" },
        { challengeId: 94, courseId: 2, correct: false, text: "NAIMBAG A MALEM", audioSrc: "/AUDIO/ILOCANO/NODE5/afternoon.mp3" },
        { challengeId: 94, courseId: 2, correct: false, text: "NAIMBAG A RABI-I", audioSrc: "/AUDIO/ILOCANO/NODE5/night.mp3" },
        { challengeId: 94, courseId: 2, correct: true, text: "SIAK NI", audioSrc: "/AUDIO/ILOCANO/NODE5/siak.mp3" },

        //option 95
        { challengeId: 95, courseId: 2, imageSrc: "/IMAGES/NODE5/45.png", correct: true, text: "ANYA TI NAGAN MO?", audioSrc: "/AUDIO/ILOCANO/NODE5/name.mp3" },
        { challengeId: 95, courseId: 2, imageSrc: "/IMAGES/NODE5/46.png", correct: false, text: "TAGA (PLACE)", audioSrc: "/AUDIO/ILOCANO/NODE5/taga.mp3" },
        { challengeId: 95, courseId: 2, imageSrc: "/IMAGES/NODE5/47.png", correct: false, text: "SADINO TI GAPUAM?", audioSrc: "/AUDIO/ILOCANO/NODE5/where.mp3" },
        { challengeId: 95, courseId: 2, imageSrc: "/IMAGES/NODE5/48.png", correct: false, text: "AGYAMANAK", audioSrc: "/AUDIO/ILOCANO/NODE5/thank.mp3" },

        //option 96
        { challengeId: 96, courseId: 2, correct: false, text: "ANYA TI NAGAN MO?", audioSrc: "/AUDIO/ILOCANO/NODE5/name.mp3" },
        { challengeId: 96, courseId: 2, correct: true, text: "TAGA (PLACE)", audioSrc: "/AUDIO/ILOCANO/NODE5/taga.mp3" },
        { challengeId: 96, courseId: 2, correct: false, text: "SADINO TI GAPUAM?", audioSrc: "/AUDIO/ILOCANO/NODE5/where.mp3" },
        { challengeId: 96, courseId: 2, correct: false, text: "AGYAMANAK", audioSrc: "/AUDIO/ILOCANO/NODE5/thank.mp3" },

        //option 97
        { challengeId: 97, courseId: 2, imageSrc: "/IMAGES/NODE5/45.png", correct: false, text: "ANYA TI NAGAN MO?", audioSrc: "/AUDIO/ILOCANO/NODE5/name.mp3" },
        { challengeId: 97, courseId: 2, imageSrc: "/IMAGES/NODE5/46.png", correct: false, text: "TAGA (PLACE)", audioSrc: "/AUDIO/ILOCANO/NODE5/taga.mp3" },
        { challengeId: 97, courseId: 2, imageSrc: "/IMAGES/NODE5/47.png", correct: true, text: "SADINO TI GAPUAM?", audioSrc: "/AUDIO/ILOCANO/NODE5/where.mp3" },
        { challengeId: 97, courseId: 2, imageSrc: "/IMAGES/NODE5/48.png", correct: false, text: "AGYAMANAK", audioSrc: "/AUDIO/ILOCANO/NODE5/thank.mp3" },

        //option 98
        { challengeId: 98, courseId: 2, correct: false, text: "ANYA TI NAGAN MO?", audioSrc: "/AUDIO/ILOCANO/NODE5/name.mp3" },
        { challengeId: 98, courseId: 2, correct: false, text: "TAGA (PLACE)", audioSrc: "/AUDIO/ILOCANO/NODE5/taga.mp3" },
        { challengeId: 98, courseId: 2, correct: false, text: "SADINO TI GAPUAM?", audioSrc: "/AUDIO/ILOCANO/NODE5/where.mp3" },
        { challengeId: 98, courseId: 2, correct: true, text: "AGYAMANAK", audioSrc: "/AUDIO/ILOCANO/NODE5/thank.mp3" },

        //option 99
        { challengeId: 99, courseId: 2, imageSrc: "/IMAGES/NODE5/45.png", correct: false, text: "ANYA TI NAGAN MO?", audioSrc: "/AUDIO/ILOCANO/NODE5/name.mp3" },
        { challengeId: 99, courseId: 2, imageSrc: "/IMAGES/NODE5/46.png", correct: false, text: "TAGA (PLACE)", audioSrc: "/AUDIO/ILOCANO/NODE5/taga.mp3" },
        { challengeId: 99, courseId: 2, imageSrc: "/IMAGES/NODE5/49.png", correct: true, text: "AY-AYATEN KA", audioSrc: "/AUDIO/ILOCANO/NODE5/love.mp3" },
        { challengeId: 99, courseId: 2, imageSrc: "/IMAGES/NODE5/50.png", correct: false, text: "KITAEN KA MANEN", audioSrc: "/AUDIO/ILOCANO/NODE5/soon.mp3" },

        //option 100
        { challengeId: 100, courseId: 2, correct: false, text: "ANYA TI NAGAN MO?", audioSrc: "/AUDIO/ILOCANO/NODE5/name.mp3" },
        { challengeId: 100, courseId: 2, correct: false, text: "TAGA (PLACE)", audioSrc: "/AUDIO/ILOCANO/NODE5/taga.mp3" },
        { challengeId: 100, courseId: 2, correct: false, text: "AY-AYATEN KA", audioSrc: "/AUDIO/ILOCANO/NODE5/love.mp3" },
        { challengeId: 100, courseId: 2, correct: true, text: "KITAEN KA MANEN", audioSrc: "/AUDIO/ILOCANO/NODE5/soon.mp3" },



// course ILONGGO
    //node 1 options
        //option 101
        { challengeId: 101, courseId: 3, imageSrc: "/IMAGES/NODE1/1.png", correct: true, text: "GINIKANAN", audioSrc: "/AUDIO/ILONGGO/NODE1/ginikanan.mp3" },
        { challengeId: 101, courseId: 3, imageSrc: "/IMAGES/NODE1/2.png", correct: false, text: "AMAY", audioSrc: "/AUDIO/ILONGGO/NODE1/amay.mp3" },
        { challengeId: 101, courseId: 3, imageSrc: "/IMAGES/NODE1/3.png", correct: false, text: "NANAY", audioSrc: "/AUDIO/ILONGGO/NODE1/nanay.mp3" },
        { challengeId: 101, courseId: 3, imageSrc: "/IMAGES/NODE1/4.png", correct: false, text: "LOLO", audioSrc: "/AUDIO/ILONGGO/NODE1/lolo.mp3" },

        //option 102
        { challengeId: 102, courseId: 3, correct: false, text: "GINIKANAN", audioSrc: "/AUDIO/ILONGGO/NODE1/ginikanan.mp3" },
        { challengeId: 102, courseId: 3, correct: true, text: "AMAY", audioSrc: "/AUDIO/ILONGGO/NODE1/amay.mp3" },
        { challengeId: 102, courseId: 3, correct: false, text: "NANAY", audioSrc: "/AUDIO/ILONGGO/NODE1/nanay.mp3" },
        { challengeId: 102, courseId: 3, correct: false, text: "LOLO", audioSrc: "/AUDIO/ILONGGO/NODE1/lolo.mp3" },

        //option 103
        { challengeId: 103, courseId: 3, imageSrc: "/IMAGES/NODE1/1.png", correct: false, text: "GINIKANAN", audioSrc: "/AUDIO/ILONGGO/NODE1/ginikanan.mp3" },
        { challengeId: 103, courseId: 3, imageSrc: "/IMAGES/NODE1/2.png", correct: false, text: "AMAY", audioSrc: "/AUDIO/ILONGGO/NODE1/amay.mp3" },
        { challengeId: 103, courseId: 3, imageSrc: "/IMAGES/NODE1/3.png", correct: true, text: "NANAY", audioSrc: "/AUDIO/ILONGGO/NODE1/nanay.mp3" },
        { challengeId: 103, courseId: 3, imageSrc: "/IMAGES/NODE1/4.png", correct: false, text: "LOLO", audioSrc: "/AUDIO/ILONGGO/NODE1/lolo.mp3" },

        //option 104
        { challengeId: 104, courseId: 3, correct: false, text: "GINIKANAN", audioSrc: "/AUDIO/ILONGGO/NODE1/ginikanan.mp3" },
        { challengeId: 104, courseId: 3, correct: false, text: "AMAY", audioSrc: "/AUDIO/ILONGGO/NODE1/amay.mp3" },
        { challengeId: 104, courseId: 3, correct: false, text: "NANAY", audioSrc: "/AUDIO/ILONGGO/NODE1/nanay.mp3" },
        { challengeId: 104, courseId: 3, correct: true, text: "LOLO", audioSrc: "/AUDIO/ILONGGO/NODE1/lolo.mp3" },

        //option 105
        { challengeId: 105, courseId: 3, imageSrc: "/IMAGES/NODE1/5.png", correct: true, text: "LOLA", audioSrc: "/AUDIO/ILONGGO/NODE1/lola.mp3" },
        { challengeId: 105, courseId: 3, imageSrc: "/IMAGES/NODE1/6.png", correct: false, text: "ABYAN", audioSrc: "/AUDIO/ILONGGO/NODE1/abyan.mp3" },
        { challengeId: 105, courseId: 3, imageSrc: "/IMAGES/NODE1/7.png", correct: false, text: "UTOD", audioSrc: "/AUDIO/ILONGGO/NODE1/utod.mp3" },
        { challengeId: 105, courseId: 3, imageSrc: "/IMAGES/NODE1/8.png", correct: false, text: "KAON", audioSrc: "/AUDIO/ILONGGO/NODE1/kaon.mp3" },

        //option 106
        { challengeId: 106, courseId: 3, correct: false, text: "LOLA", audioSrc: "/AUDIO/ILONGGO/NODE1/lola.mp3" },
        { challengeId: 106, courseId: 3, correct: true, text: "ABYAN", audioSrc: "/AUDIO/ILONGGO/NODE1/abyan.mp3" },
        { challengeId: 106, courseId: 3, correct: false, text: "UTOD", audioSrc: "/AUDIO/ILONGGO/NODE1/utod.mp3" },
        { challengeId: 106, courseId: 3, correct: false, text: "KAON", audioSrc: "/AUDIO/ILONGGO/NODE1/kaon.mp3" },

        //option 107
        { challengeId: 107, courseId: 3, imageSrc: "/IMAGES/NODE1/5.png", correct: false, text: "LOLA", audioSrc: "/AUDIO/ILONGGO/NODE1/lola.mp3" },
        { challengeId: 107, courseId: 3, imageSrc: "/IMAGES/NODE1/6.png", correct: false, text: "ABYAN", audioSrc: "/AUDIO/ILONGGO/NODE1/abyan.mp3" },
        { challengeId: 107, courseId: 3, imageSrc: "/IMAGES/NODE1/7.png", correct: true, text: "UTOD", audioSrc: "/AUDIO/ILONGGO/NODE1/utod.mp3" },
        { challengeId: 107, courseId: 3, imageSrc: "/IMAGES/NODE1/8.png", correct: false, text: "KAON", audioSrc: "/AUDIO/ILONGGO/NODE1/kaon.mp3" },

        //option 108
        { challengeId: 108, courseId: 3, correct: false, text: "LOLA", audioSrc: "/AUDIO/ILONGGO/NODE1/lola.mp3" },
        { challengeId: 108, courseId: 3, correct: false, text: "ABYAN", audioSrc: "/AUDIO/ILONGGO/NODE1/abyan.mp3" },
        { challengeId: 108, courseId: 3, correct: false, text: "UTOD", audioSrc: "/AUDIO/ILONGGO/NODE1/utod.mp3" },
        { challengeId: 108, courseId: 3, correct: true, text: "KAON", audioSrc: "/AUDIO/ILONGGO/NODE1/kaon.mp3" },

        //option 109
        { challengeId: 109, courseId: 3, imageSrc: "/IMAGES/NODE1/5.png", correct: false, text: "LOLA", audioSrc: "/AUDIO/ILONGGO/NODE1/lola.mp3" },
        { challengeId: 109, courseId: 3, imageSrc: "/IMAGES/NODE1/6.png", correct: false, text: "ABYAN", audioSrc: "/AUDIO/ILONGGO/NODE1/abyan.mp3" },
        { challengeId: 109, courseId: 3, imageSrc: "/IMAGES/NODE1/9.png", correct: true, text: "PALIGO", audioSrc: "/AUDIO/ILONGGO/NODE1/paligo.mp3" },
        { challengeId: 109, courseId: 3, imageSrc: "/IMAGES/NODE1/10.png", correct: false, text: "IMNOM", audioSrc: "/AUDIO/ILONGGO/NODE1/imnom.mp3" },

        //option 110
        { challengeId: 110, courseId: 3, correct: false, text: "LOLA", audioSrc: "/AUDIO/ILONGGO/NODE1/lola.mp3" },
        { challengeId: 110, courseId: 3, correct: false, text: "ABYAN", audioSrc: "/AUDIO/ILONGGO/NODE1/abyan.mp3" },
        { challengeId: 110, courseId: 3, correct: false, text: "PALIGO", audioSrc: "/AUDIO/ILONGGO/NODE1/paligo.mp3" },
        { challengeId: 110, courseId: 3, correct: true, text: "IMNOM", audioSrc: "/AUDIO/ILONGGO/NODE1/imnom.mp3" },

    //node 2 options
        //option 111
        { challengeId: 111, courseId: 3, imageSrc: "/IMAGES/NODE2/11.png", correct: true, text: "SILYA", audioSrc: "/AUDIO/ILONGGO/NODE2/silya.mp3" },
        { challengeId: 111, courseId: 3, imageSrc: "/IMAGES/NODE2/12.png", correct: false, text: "LAMESA", audioSrc: "/AUDIO/ILONGGO/NODE2/lamesa.mp3" },
        { challengeId: 111, courseId: 3, imageSrc: "/IMAGES/NODE2/13.png", correct: false, text: "PUERTA", audioSrc: "/AUDIO/ILONGGO/NODE2/puerta.mp3" },
        { challengeId: 111, courseId: 3, imageSrc: "/IMAGES/NODE2/14.png", correct: false, text: "KATRE", audioSrc: "/AUDIO/ILONGGO/NODE2/katre.mp3" },

        //option 112
        { challengeId: 112, courseId: 3, correct: false, text: "SILYA", audioSrc: "/AUDIO/ILONGGO/NODE2/silya.mp3" },
        { challengeId: 112, courseId: 3, correct: true, text: "LAMESA", audioSrc: "/AUDIO/ILONGGO/NODE2/lamesa.mp3" },
        { challengeId: 112, courseId: 3, correct: false, text: "PEURTA", audioSrc: "/AUDIO/ILONGGO/NODE2/puerta.mp3" },
        { challengeId: 112, courseId: 3, correct: false, text: "KATRE", audioSrc: "/AUDIO/ILONGGO/NODE2/katre.mp3" },

        //option 113
        { challengeId: 113, courseId: 3, imageSrc: "/IMAGES/NODE2/11.png", correct: false, text: "SILYA", audioSrc: "/AUDIO/ILONGGO/NODE2/silya.mp3" },
        { challengeId: 113, courseId: 3, imageSrc: "/IMAGES/NODE2/12.png", correct: false, text: "LAMESA", audioSrc: "/AUDIO/ILONGGO/NODE2/lamesa.mp3" },
        { challengeId: 113, courseId: 3, imageSrc: "/IMAGES/NODE2/13.png", correct: true, text: "PUERTA", audioSrc: "/AUDIO/ILONGGO/NODE2/puerta.mp3" },
        { challengeId: 113, courseId: 3, imageSrc: "/IMAGES/NODE2/14.png", correct: false, text: "KATRE", audioSrc: "/AUDIO/ILONGGO/NODE2/katre.mp3" },

        //option 114
        { challengeId: 114, courseId: 3, correct: false, text: "SILYA", audioSrc: "/AUDIO/ILONGGO/NODE2/silya.mp3" },
        { challengeId: 114, courseId: 3, correct: false, text: "LAMESA", audioSrc: "/AUDIO/ILONGGO/NODE2/lamesa.mp3" },
        { challengeId: 114, courseId: 3, correct: false, text: "PEURTA", audioSrc: "/AUDIO/ILONGGO/NODE2/puerta.mp3" },
        { challengeId: 114, courseId: 3, correct: true, text: "KATRE", audioSrc: "/AUDIO/ILONGGO/NODE2/katre.mp3" },

        //option 115
        { challengeId: 115, courseId: 3, imageSrc: "/IMAGES/NODE2/15.png", correct: true, text: "ULUNAN", audioSrc: "/AUDIO/ILONGGO/NODE2/ulunan.mp3" },
        { challengeId: 115, courseId: 3, imageSrc: "/IMAGES/NODE2/16.png", correct: false, text: "HABOL", audioSrc: "/AUDIO/ILONGGO/NODE2/habol.mp3" },
        { challengeId: 115, courseId: 3, imageSrc: "/IMAGES/NODE2/17.png", correct: false, text: "SERHADOR", audioSrc: "/AUDIO/ILONGGO/NODE2/serhador.mp3" },
        { challengeId: 115, courseId: 3, imageSrc: "/IMAGES/NODE2/18.png", correct: false, text: "SILHIG", audioSrc: "/AUDIO/ILONGGO/NODE2/silhig.mp3" },

        //option 116
        { challengeId: 116, courseId: 3, correct: false, text: "ULUNAN", audioSrc: "/AUDIO/ILONGGO/NODE2/ulunan.mp3" },
        { challengeId: 116, courseId: 3, correct: true, text: "HABOL", audioSrc: "/AUDIO/ILONGGO/NODE2/habol.mp3" },
        { challengeId: 116, courseId: 3, correct: false, text: "SERHADOR", audioSrc: "/AUDIO/ILONGGO/NODE2/serhador.mp3" },
        { challengeId: 116, courseId: 3, correct: false, text: "SILHIG", audioSrc: "/AUDIO/ILONGGO/NODE2/silhig.mp3" },

        
        //option 117
        { challengeId: 117, courseId: 3, imageSrc: "/IMAGES/NODE2/15.png", correct: false, text: "ULUNAN", audioSrc: "/AUDIO/ILONGGO/NODE2/ulunan.mp3" },
        { challengeId: 117, courseId: 3, imageSrc: "/IMAGES/NODE2/16.png", correct: false, text: "HABOL", audioSrc: "/AUDIO/ILONGGO/NODE2/habol.mp3" },
        { challengeId: 117, courseId: 3, imageSrc: "/IMAGES/NODE2/17.png", correct: true, text: "SERHADOR", audioSrc: "/AUDIO/ILONGGO/NODE2/serhador.mp3" },
        { challengeId: 117, courseId: 3, imageSrc: "/IMAGES/NODE2/18.png", correct: false, text: "SILHIG", audioSrc: "/AUDIO/ILONGGO/NODE2/silhig.mp3" },

        //option 118
        { challengeId: 118, courseId: 3, correct: false, text: "ULUNAN", audioSrc: "/AUDIO/ILONGGO/NODE2/ulunan.mp3" },
        { challengeId: 118, courseId: 3, correct: false, text: "HABOL", audioSrc: "/AUDIO/ILONGGO/NODE2/habol.mp3" },
        { challengeId: 118, courseId: 3, correct: false, text: "SERHADOR", audioSrc: "/AUDIO/ILONGGO/NODE2/serhador.mp3" },
        { challengeId: 118, courseId: 3, correct: true, text: "SILHIG", audioSrc: "/AUDIO/ILONGGO/NODE2/silhig.mp3" },

        
        //option 119
        { challengeId: 119, courseId: 3, imageSrc: "/IMAGES/NODE2/15.png", correct: false, text: "ULUNAN", audioSrc: "/AUDIO/ILONGGO/NODE2/ulunan.mp3" },
        { challengeId: 119, courseId: 3, imageSrc: "/IMAGES/NODE2/16.png", correct: false, text: "HABOL", audioSrc: "/AUDIO/ILONGGO/NODE2/habol.mp3" },
        { challengeId: 119, courseId: 3, imageSrc: "/IMAGES/NODE2/19.png", correct: true, text: "LANGGAW", audioSrc: "/AUDIO/ILONGGO/NODE2/langgaw.mp3" },
        { challengeId: 119, courseId: 3, imageSrc: "/IMAGES/NODE2/20.png", correct: false, text: "APARADOR", audioSrc: "/AUDIO/ILONGGO/NODE2/aparador.mp3" },

        //option 120
        { challengeId: 120, courseId: 3, correct: false, text: "ULUNAN", audioSrc: "/AUDIO/ILONGGO/NODE2/ulunan.mp3" },
        { challengeId: 120, courseId: 3, correct: false, text: "HABOL", audioSrc: "/AUDIO/ILONGGO/NODE2/habol.mp3" },
        { challengeId: 120, courseId: 3, correct: false, text: "LANGGAW", audioSrc: "/AUDIO/ILONGGO/NODE2/langgaw.mp3" },
        { challengeId: 120, courseId: 3, correct: true, text: "APARADOR", audioSrc: "/AUDIO/ILONGGO/NODE2/aparador.mp3" },

    //node 3 options
        //option 121
        { challengeId: 121, courseId: 3, imageSrc: "/IMAGES/NODE3/21.png", correct: true, text: "ULO", audioSrc: "/AUDIO/ILONGGO/NODE3/ulo.mp3" },
        { challengeId: 121, courseId: 3, imageSrc: "/IMAGES/NODE3/22.png", correct: false, text: "MATA", audioSrc: "/AUDIO/ILONGGO/NODE3/mata.mp3" },
        { challengeId: 121, courseId: 3, imageSrc: "/IMAGES/NODE3/23.png", correct: false, text: "ILONG", audioSrc: "/AUDIO/ILONGGO/NODE3/ilong.mp3" },
        { challengeId: 121, courseId: 3, imageSrc: "/IMAGES/NODE3/24.png", correct: false, text: "DALUNGGAN", audioSrc: "/AUDIO/ILONGGO/NODE3/dalunggan.mp3" },

        //option 122
        { challengeId: 122, courseId: 3, correct: false, text: "ULO", audioSrc: "/AUDIO/ILONGGO/NODE3/ulo.mp3" },
        { challengeId: 122, courseId: 3, correct: true, text: "MATA", audioSrc: "/AUDIO/ILONGGO/NODE3/mata.mp3" },
        { challengeId: 122, courseId: 3, correct: false, text: "ILONG", audioSrc: "/AUDIO/ILONGGO/NODE3/ilong.mp3" },
        { challengeId: 122, courseId: 3, correct: false, text: "DALUNGGAN", audioSrc: "/AUDIO/ILONGGO/NODE3/dalunggan.mp3" },

        //option 123
        { challengeId: 123, courseId: 3, imageSrc: "/IMAGES/NODE3/21.png", correct: false, text: "ULO", audioSrc: "/AUDIO/ILONGGO/NODE3/ulo.mp3" },
        { challengeId: 123, courseId: 3, imageSrc: "/IMAGES/NODE3/22.png", correct: false, text: "MATA", audioSrc: "/AUDIO/ILONGGO/NODE3/mata.mp3" },
        { challengeId: 123, courseId: 3, imageSrc: "/IMAGES/NODE3/23.png", correct: true, text: "ILONG", audioSrc: "/AUDIO/ILONGGO/NODE3/ilong.mp3" },
        { challengeId: 123, courseId: 3, imageSrc: "/IMAGES/NODE3/24.png", correct: false, text: "DALUNGGAN", audioSrc: "/AUDIO/ILONGGO/NODE3/dalunggan.mp3" },

        //option 124
        { challengeId: 124, courseId: 3, correct: false, text: "ULO", audioSrc: "/AUDIO/ILONGGO/NODE3/ulo.mp3" },
        { challengeId: 124, courseId: 3, correct: false, text: "MATA", audioSrc: "/AUDIO/ILONGGO/NODE3/mata.mp3" },
        { challengeId: 124, courseId: 3, correct: false, text: "ILONG", audioSrc: "/AUDIO/ILONGGO/NODE3/ilong.mp3" },
        { challengeId: 124, courseId: 3, correct: true, text: "DALUNGGAN", audioSrc: "/AUDIO/ILONGGO/NODE3/dalunggan.mp3" },

        //option 125
        { challengeId: 125, courseId: 3, imageSrc: "/IMAGES/NODE3/25.png", correct: true, text: "KAMOT", audioSrc: "/AUDIO/ILONGGO/NODE3/kamot.mp3" },
        { challengeId: 125, courseId: 3, imageSrc: "/IMAGES/NODE3/26.png", correct: false, text: "TIEL", audioSrc: "/AUDIO/ILONGGO/NODE3/tiel.mp3" },
        { challengeId: 125, courseId: 3, imageSrc: "/IMAGES/NODE3/27.png", correct: false, text: "TUDLO", audioSrc: "/AUDIO/ILONGGO/NODE3/tudlo.mp3" },
        { challengeId: 125, courseId: 3, imageSrc: "/IMAGES/NODE3/28.png", correct: false, text: "TIYAN", audioSrc: "/AUDIO/ILONGGO/NODE3/tiyan.mp3" },

        //option 126
        { challengeId: 126, courseId: 3, correct: false, text: "KAMOT", audioSrc: "/AUDIO/ILONGGO/NODE3/kamot.mp3" },
        { challengeId: 126, courseId: 3, correct: true, text: "TIEL", audioSrc: "/AUDIO/ILONGGO/NODE3/tiel.mp3" },
        { challengeId: 126, courseId: 3, correct: false, text: "TUDLO", audioSrc: "/AUDIO/ILONGGO/NODE3/tudlo.mp3" },
        { challengeId: 126, courseId: 3, correct: false, text: "TIYAN", audioSrc: "/AUDIO/ILONGGO/NODE3/tiyan.mp3" },

        //option 127
        { challengeId: 127, courseId: 3, imageSrc: "/IMAGES/NODE3/25.png", correct: false, text: "KAMOT", audioSrc: "/AUDIO/ILONGGO/NODE3/kamot.mp3" },
        { challengeId: 127, courseId: 3, imageSrc: "/IMAGES/NODE3/26.png", correct: false, text: "TIEL", audioSrc: "/AUDIO/ILONGGO/NODE3/tiel.mp3" },
        { challengeId: 127, courseId: 3, imageSrc: "/IMAGES/NODE3/27.png", correct: true, text: "TUDLO", audioSrc: "/AUDIO/ILONGGO/NODE3/tudlo.mp3" },
        { challengeId: 127, courseId: 3, imageSrc: "/IMAGES/NODE3/28.png", correct: false, text: "TIYAN", audioSrc: "/AUDIO/ILONGGO/NODE3/tiyan.mp3" },

        //option 128
        { challengeId: 128, courseId: 3, correct: false, text: "KAMOT", audioSrc: "/AUDIO/ILONGGO/NODE3/kamot.mp3" },
        { challengeId: 128, courseId: 3, correct: false, text: "TIEL", audioSrc: "/AUDIO/ILONGGO/NODE3/tiel.mp3" },
        { challengeId: 128, courseId: 3, correct: false, text: "TUDLO", audioSrc: "/AUDIO/ILONGGO/NODE3/tudlo.mp3" },
        { challengeId: 128, courseId: 3, correct: true, text: "TIYAN", audioSrc: "/AUDIO/ILONGGO/NODE3/tiyan.mp3" },

        //option 129
        { challengeId: 129, courseId: 3, imageSrc: "/IMAGES/NODE3/25.png", correct: false, text: "KAMOT", audioSrc: "/AUDIO/ILONGGO/NODE3/kamot.mp3" },
        { challengeId: 129, courseId: 3, imageSrc: "/IMAGES/NODE3/26.png", correct: false, text: "TIEL", audioSrc: "/AUDIO/ILONGGO/NODE3/tiel.mp3" },
        { challengeId: 129, courseId: 3, imageSrc: "/IMAGES/NODE3/29.png", correct: true, text: "ABAGA", audioSrc: "/AUDIO/ILONGGO/NODE3/abaga.mp3" },
        { challengeId: 129, courseId: 3, imageSrc: "/IMAGES/NODE3/30.png", correct: false, text: "BRASO", audioSrc: "/AUDIO/ILONGGO/NODE3/braso.mp3" },

        //option 130
        { challengeId: 130, courseId: 3, correct: false, text: "KAMOT", audioSrc: "/AUDIO/ILONGGO/NODE3/kamot.mp3" },
        { challengeId: 130, courseId: 3, correct: false, text: "TIEL", audioSrc: "/AUDIO/ILONGGO/NODE3/tiel.mp3" },
        { challengeId: 130, courseId: 3, correct: false, text: "ABAGA", audioSrc: "/AUDIO/ILONGGO/NODE3/abaga.mp3" },
        { challengeId: 130, courseId: 3, correct: true, text: "BRASO", audioSrc: "/AUDIO/ILONGGO/NODE3/braso.mp3" },

    //node 4 options
        //option 131
        { challengeId: 131, courseId: 3, imageSrc: "/IMAGES/NODE4/31.png", correct: true, text: "LAKAT", audioSrc: "/AUDIO/ILONGGO/NODE4/lakat.mp3" },
        { challengeId: 131, courseId: 3, imageSrc: "/IMAGES/NODE4/32.png", correct: false, text: "HAMBAL", audioSrc: "/AUDIO/ILONGGO/NODE4/hambal.mp3" },
        { challengeId: 131, courseId: 3, imageSrc: "/IMAGES/NODE4/33.png", correct: false, text: "DALAGAN", audioSrc: "/AUDIO/ILONGGO/NODE4/dalagan.mp3" },
        { challengeId: 131, courseId: 3, imageSrc: "/IMAGES/NODE4/34.png", correct: false, text: "LUKSO", audioSrc: "/AUDIO/ILONGGO/NODE4/lukso.mp3" },

        //option 132
        { challengeId: 132, courseId: 3, correct: false, text: "LAKAT", audioSrc: "/AUDIO/ILONGGO/NODE4/lakat.mp3" },
        { challengeId: 132, courseId: 3, correct: true, text: "HAMBAL", audioSrc: "/AUDIO/ILONGGO/NODE4/hambal.mp3" },
        { challengeId: 132, courseId: 3, correct: false, text: "DALAGAN", audioSrc: "/AUDIO/ILONGGO/NODE4/dalagaw.mp3" },
        { challengeId: 132, courseId: 3, correct: false, text: "LUKSO", audioSrc: "/AUDIO/ILONGGO/NODE4/lukso.mp3" },

        //option 133
        { challengeId: 133, courseId: 3, imageSrc: "/IMAGES/NODE4/31.png", correct: false, text: "LAKAT", audioSrc: "/AUDIO/ILONGGO/NODE4/lakat.mp3" },
        { challengeId: 133, courseId: 3, imageSrc: "/IMAGES/NODE4/32.png", correct: false, text: "HAMBAL", audioSrc: "/AUDIO/ILONGGO/NODE4/hambal.mp3" },
        { challengeId: 133, courseId: 3, imageSrc: "/IMAGES/NODE4/33.png", correct: true, text: "DALAGAN", audioSrc: "/AUDIO/ILONGGO/NODE4/dalagan.mp3" },
        { challengeId: 133, courseId: 3, imageSrc: "/IMAGES/NODE4/34.png", correct: false, text: "LUKSO", audioSrc: "/AUDIO/ILONGGO/NODE4/lukso.mp3" },

        //option 134
        { challengeId: 134, courseId: 3, correct: false, text: "LAKAT", audioSrc: "/AUDIO/ILONGGO/NODE4/lakat.mp3" },
        { challengeId: 134, courseId: 3, correct: false, text: "HAMBAL", audioSrc: "/AUDIO/ILONGGO/NODE4/hambal.mp3" },
        { challengeId: 134, courseId: 3, correct: false, text: "DALAGAN", audioSrc: "/AUDIO/ILONGGO/NODE4/dalagaw.mp3" },
        { challengeId: 134, courseId: 3, correct: true, text: "LUKSO", audioSrc: "/AUDIO/ILONGGO/NODE4/lukso.mp3" },

        //option 135
        { challengeId: 135, courseId: 3, imageSrc: "/IMAGES/NODE4/35.png", correct: true, text: "HILIBI", audioSrc: "/AUDIO/ILONGGO/NODE4/hilibi.mp3" },
        { challengeId: 135, courseId: 3, imageSrc: "/IMAGES/NODE4/36.png", correct: false, text: "BASA", audioSrc: "/AUDIO/ILONGGO/NODE4/basa.mp3" },
        { challengeId: 135, courseId: 3, imageSrc: "/IMAGES/NODE4/37.png", correct: false, text: "SULAT", audioSrc: "/AUDIO/ILONGGO/NODE4/sulat.mp3" },
        { challengeId: 135, courseId: 3, imageSrc: "/IMAGES/NODE4/38.png", correct: false, text: "TULOG", audioSrc: "/AUDIO/ILONGGO/NODE4/tulog.mp3" },

        //option 136
        { challengeId: 136, courseId: 3, correct: false, text: "HILIBI", audioSrc: "/AUDIO/ILONGGO/NODE4/hilibi.mp3" },
        { challengeId: 136, courseId: 3, correct: true, text: "BASA", audioSrc: "/AUDIO/ILONGGO/NODE4/basa.mp3" },
        { challengeId: 136, courseId: 3, correct: false, text: "SULAT", audioSrc: "/AUDIO/ILONGGO/NODE4/sulat.mp3" },
        { challengeId: 136, courseId: 3, correct: false, text: "TULOG", audioSrc: "/AUDIO/ILONGGO/NODE4/tulog.mp3" },

        //option 137
        { challengeId: 137, courseId: 3, imageSrc: "/IMAGES/NODE4/35.png", correct: false, text: "HILIBI", audioSrc: "/AUDIO/ILONGGO/NODE4/hilibi.mp3" },
        { challengeId: 137, courseId: 3, imageSrc: "/IMAGES/NODE4/36.png", correct: false, text: "BASA", audioSrc: "/AUDIO/ILONGGO/NODE4/basa.mp3" },
        { challengeId: 137, courseId: 3, imageSrc: "/IMAGES/NODE4/37.png", correct: true, text: "SULAT", audioSrc: "/AUDIO/ILONGGO/NODE4/sulat.mp3" },
        { challengeId: 137, courseId: 3, imageSrc: "/IMAGES/NODE4/38.png", correct: false, text: "TULOG", audioSrc: "/AUDIO/ILONGGO/NODE4/tulog.mp3" },

        //option 138
        { challengeId: 138, courseId: 3, correct: false, text: "HILIBI", audioSrc: "/AUDIO/ILONGGO/NODE4/hilibi.mp3" },
        { challengeId: 138, courseId: 3, correct: false, text: "BASA", audioSrc: "/AUDIO/ILONGGO/NODE4/basa.mp3" },
        { challengeId: 138, courseId: 3, correct: false, text: "SULAT", audioSrc: "/AUDIO/ILONGGO/NODE4/sulat.mp3" },
        { challengeId: 138, courseId: 3, correct: true, text: "TULOG", audioSrc: "/AUDIO/ILONGGO/NODE4/tulog.mp3" },

        //option 139
        { challengeId: 139, courseId: 3, imageSrc: "/IMAGES/NODE4/35.png", correct: false, text: "HILIBI", audioSrc: "/AUDIO/ILONGGO/NODE4/hilibi.mp3" },
        { challengeId: 139, courseId: 3, imageSrc: "/IMAGES/NODE4/36.png", correct: false, text: "BASA", audioSrc: "/AUDIO/ILONGGO/NODE4/basa.mp3" },
        { challengeId: 139, courseId: 3, imageSrc: "/IMAGES/NODE4/37.png", correct: true, text: "KATAWA", audioSrc: "/AUDIO/ILONGGO/NODE4/katawa.mp3" },
        { challengeId: 139, courseId: 3, imageSrc: "/IMAGES/NODE4/38.png", correct: false, text: "SINGGIT", audioSrc: "/AUDIO/ILONGGO/NODE4/singgit.mp3" },

        //option 140
        { challengeId: 140, courseId: 3, correct: false, text: "HILIBI", audioSrc: "/AUDIO/ILONGGO/NODE4/hilibi.mp3" },
        { challengeId: 140, courseId: 3, correct: false, text: "BASA", audioSrc: "/AUDIO/ILONGGO/NODE4/basa.mp3" },
        { challengeId: 140, courseId: 3, correct: false, text: "KATAWA", audioSrc: "/AUDIO/ILONGGO/NODE4/katawa.mp3" },
        { challengeId: 140, courseId: 3, correct: true, text: "SINGGIT", audioSrc: "/AUDIO/ILONGGO/NODE4/singgit.mp3" },

    //node 5 options
        //option 141
        { challengeId: 141, courseId: 3, imageSrc: "/IMAGES/NODE5/41.png", correct: true, text: "MAAYONG AGA", audioSrc: "/AUDIO/ILONGGO/NODE5/aga.mp3" },
        { challengeId: 141, courseId: 3, imageSrc: "/IMAGES/NODE5/42.png", correct: false, text: "MAAYONG HAPON", audioSrc: "/AUDIO/ILONGGO/NODE5/hapon.mp3" },
        { challengeId: 141, courseId: 3, imageSrc: "/IMAGES/NODE5/43.png", correct: false, text: "MAAYONG GABI-I", audioSrc: "/AUDIO/ILONGGO/NODE5/gabi.mp3" },
        { challengeId: 141, courseId: 3, imageSrc: "/IMAGES/NODE5/44.png", correct: false, text: "ANG NGALAN KO", audioSrc: "/AUDIO/ILONGGO/NODE5/ngalan.mp3" },

        //option 142
        { challengeId: 142, courseId: 3, correct: false, text: "MAAYONG AGA", audioSrc: "/AUDIO/ILONGGO/NODE5/aga.mp3" },
        { challengeId: 142, courseId: 3, correct: true, text: "MAAYONG HAPON", audioSrc: "/AUDIO/ILONGGO/NODE5/hapon.mp3" },
        { challengeId: 142, courseId: 3, correct: false, text: "MAAYONG GABI-I", audioSrc: "/AUDIO/ILONGGO/NODE5/gabi.mp3" },
        { challengeId: 142, courseId: 3, correct: false, text: "ANG NGALAN KO", audioSrc: "/AUDIO/ILONGGO/NODE5/ngalan.mp3" },

        //option 143
        { challengeId: 143, courseId: 3, imageSrc: "/IMAGES/NODE5/41.png", correct: false, text: "MAAYONG AGA", audioSrc: "/AUDIO/ILONGGO/NODE5/aga.mp3" },
        { challengeId: 143, courseId: 3, imageSrc: "/IMAGES/NODE5/42.png", correct: false, text: "MAAYONG HAPON", audioSrc: "/AUDIO/ILONGGO/NODE5/hapon.mp3" },
        { challengeId: 143, courseId: 3, imageSrc: "/IMAGES/NODE5/43.png", correct: true, text: "MAAYONG GABI-I", audioSrc: "/AUDIO/ILONGGO/NODE5/gabi.mp3" },
        { challengeId: 143, courseId: 3, imageSrc: "/IMAGES/NODE5/44.png", correct: false, text: "ANG NGALAN KO", audioSrc: "/AUDIO/ILONGGO/NODE5/ngalan.mp3" },

        //option 144
        { challengeId: 144, courseId: 3, correct: false, text: "MAAYONG AGA", audioSrc: "/AUDIO/ILONGGO/NODE5/aga.mp3" },
        { challengeId: 144, courseId: 3, correct: false, text: "MAAYONG HAPON", audioSrc: "/AUDIO/ILONGGO/NODE5/hapon.mp3" },
        { challengeId: 144, courseId: 3, correct: false, text: "MAAYONG GABI-I", audioSrc: "/AUDIO/ILONGGO/NODE5/gabi.mp3" },
        { challengeId: 144, courseId: 3, correct: true, text: "ANG NGALAN KO", audioSrc: "/AUDIO/ILONGGO/NODE5/ngalan.mp3" },

        //option 145
        { challengeId: 145, courseId: 3, imageSrc: "/IMAGES/NODE5/45.png", correct: true, text: "ANO ANG IMO NGALAN?", audioSrc: "/AUDIO/ILONGGO/NODE5/nungalan.mp3" },
        { challengeId: 145, courseId: 3, imageSrc: "/IMAGES/NODE5/46.png", correct: false, text: "HALIN AKO SA", audioSrc: "/AUDIO/ILONGGO/NODE5/halin.mp3" },
        { challengeId: 145, courseId: 3, imageSrc: "/IMAGES/NODE5/47.png", correct: false, text: "DIIN KA HALIN?", audioSrc: "/AUDIO/ILONGGO/NODE5/diin.mp3" },
        { challengeId: 145, courseId: 3, imageSrc: "/IMAGES/NODE5/48.png", correct: false, text: "SALAMAT", audioSrc: "/AUDIO/ILONGGO/NODE5/salamat.mp3" },

        //option 146
        { challengeId: 146, courseId: 3, correct: false, text: "ANO ANG IMO NGALAN?", audioSrc: "/AUDIO/ILONGGO/NODE5/nungalan.mp3" },
        { challengeId: 146, courseId: 3, correct: true, text: "HALIN AKO SA", audioSrc: "/AUDIO/ILONGGO/NODE5/halin.mp3" },
        { challengeId: 146, courseId: 3, correct: false, text: "DIIN KA HALIN?", audioSrc: "/AUDIO/ILONGGO/NODE5/diin.mp3" },
        { challengeId: 146, courseId: 3, correct: false, text: "SALAMAT", audioSrc: "/AUDIO/ILONGGO/NODE5/salamat.mp3" },

        //option 147
        { challengeId: 147, courseId: 3, imageSrc: "/IMAGES/NODE5/45.png", correct: false, text: "ANO ANG IMO NGALAN?", audioSrc: "/AUDIO/ILONGGO/NODE5/nungalan.mp3" },
        { challengeId: 147, courseId: 3, imageSrc: "/IMAGES/NODE5/46.png", correct: false, text: "HALIN AKO SA", audioSrc: "/AUDIO/ILONGGO/NODE5/halin.mp3" },
        { challengeId: 147, courseId: 3, imageSrc: "/IMAGES/NODE5/47.png", correct: true, text: "DIIN KA HALIN?", audioSrc: "/AUDIO/ILONGGO/NODE5/diin.mp3" },
        { challengeId: 147, courseId: 3, imageSrc: "/IMAGES/NODE5/48.png", correct: false, text: "SALAMAT", audioSrc: "/AUDIO/ILONGGO/NODE5/salamat.mp3" },

        //option 148
        { challengeId: 148, courseId: 3, correct: false, text: "ANO ANG IMO NGALAN?", audioSrc: "/AUDIO/ILONGGO/NODE5/nungalan.mp3" },
        { challengeId: 148, courseId: 3, correct: false, text: "HALIN AKO SA", audioSrc: "/AUDIO/ILONGGO/NODE5/halin.mp3" },
        { challengeId: 148, courseId: 3, correct: false, text: "DIIN KA HALIN?", audioSrc: "/AUDIO/ILONGGO/NODE5/diin.mp3" },
        { challengeId: 148, courseId: 3, correct: true, text: "SALAMAT", audioSrc: "/AUDIO/ILONGGO/NODE5/salamat.mp3" },

        //option 149
        { challengeId: 149, courseId: 3, imageSrc: "/IMAGES/NODE5/45.png", correct: false, text: "ANO ANG IMO NGALAN?", audioSrc: "/AUDIO/ILONGGO/NODE5/nungalan.mp3" },
        { challengeId: 149, courseId: 3, imageSrc: "/IMAGES/NODE5/46.png", correct: false, text: "HALIN AKO SA", audioSrc: "/AUDIO/ILONGGO/NODE5/halin.mp3" },
        { challengeId: 149, courseId: 3, imageSrc: "/IMAGES/NODE5/49.png", correct: true, text: "PALANGGA TAKA", audioSrc: "/AUDIO/ILONGGO/NODE5/palangga.mp3" },
        { challengeId: 149, courseId: 3, imageSrc: "/IMAGES/NODE5/50.png", correct: false, text: "KITAAY TA LIWAT", audioSrc: "/AUDIO/ILONGGO/NODE5/liwat.mp3" },

        //option 150
        { challengeId: 150, courseId: 3, correct: false, text: "ANO ANG IMO NGALAN?", audioSrc: "/AUDIO/ILONGGO/NODE5/nungalan.mp3" },
        { challengeId: 150, courseId: 3, correct: false, text: "HALIN AKO SA", audioSrc: "/AUDIO/ILONGGO/NODE5/halin.mp3" },
        { challengeId: 150, courseId: 3, correct: false, text: "PALANGGA TAKA", audioSrc: "/AUDIO/ILONGGO/NODE5/palangga.mp3" },
        { challengeId: 150, courseId: 3, correct: true, text: "KITAAY TA LIWAT", audioSrc: "/AUDIO/ILONGGO/NODE5/liwat.mp3" },



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
