export const asrsQuestions = [
    // Part A
    {
        id: 1,
        question: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
        part: "A"
    },
    {
        id: 2,
        question: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
        part: "A"
    },
    {
        id: 3,
        question: "How often do you have problems remembering appointments or obligations?",
        part: "A"
    },
    {
        id: 4,
        question: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
        part: "A"
    },
    {
        id: 5,
        question: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
        part: "A"
    },
    {
        id: 6,
        question: "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
        part: "A"
    },
    // Part B
    {
        id: 7,
        question: "How often do you make careless mistakes when you have to work on a boring or difficult project?",
        part: "B"
    },
    {
        id: 8,
        question: "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?",
        part: "B"
    },
    {
        id: 9,
        question: "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",
        part: "B"
    },
    {
        id: 10,
        question: "How often do you misplace or have difficulty finding things at home or at work?",
        part: "B"
    },
    {
        id: 11,
        question: "How often are you distracted by activity or noise around you?",
        part: "B"
    },
    {
        id: 12,
        question: "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?",
        part: "B"
    },
    {
        id: 13,
        question: "How often do you feel restless or fidgety?",
        part: "B"
    },
    {
        id: 14,
        question: "How often do you have difficulty unwinding and relaxing when you have time to yourself?",
        part: "B"
    },
    {
        id: 15,
        question: "How often do you find yourself talking too much when you are in social situations?",
        part: "B"
    },
    {
        id: 16,
        question: "When you're in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?",
        part: "B"
    },
    {
        id: 17,
        question: "How often do you have difficulty waiting your turn in situations when turn taking is required?",
        part: "B"
    },
    {
        id: 18,
        question: "How often do you interrupt others when they are busy?",
        part: "B"
    }
];

export const options = [
    { label: "Never", value: 0 },
    { label: "Rarely", value: 1 },
    { label: "Sometimes", value: 2 },
    { label: "Often", value: 3 },
    { label: "Very Often", value: 4 }
];

export const getScoreCategory = (score, type) => {
    if (type === 'A') {
        if (score <= 9) return "Low";
        if (score <= 13) return "Mild to Moderate";
        if (score <= 17) return "High";
        return "Very High";
    } else if (type === 'B') {
        if (score <= 19) return "Low";
        if (score <= 26) return "Mild to Moderate";
        if (score <= 32) return "High";
        return "Very High";
    } else { // Total
        // Simplified mapping for total (0-72) based on assumption from ranges
        if (score <= 28) return "Low"; // 9+19
        if (score <= 39) return "Mild to Moderate"; // 13+26
        if (score <= 49) return "High"; // 17+32
        return "Very High";
    }
};
