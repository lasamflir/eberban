// Arity mismatch resolution for Eberban v0.64

// Designed to operate on the output of the peggy parser, this
// function adds annotations to the JSON parse tree showing
// variables

// since this works on the result JSON of the parser, it assumes
// that the parsed eberban text is syntactically correct.

const eberban_consonants = "nrlmpbfvtdszcjgk";
const eberban_vowels = "ieaou";
const eberban_h = "h";


export function arity_mismatch_resolution(result){
    add_variables(result);
    return result;
}

// helpers

function get_default_verb_behaviour(verb) {
    // There are three main types of verb: roots, borrowings and compounds and their chaining
    // behaviour is checked differently.

    // root words
    if (verb.family != undefined && verb.family === "Root") {
        return get_default_root_behaviour(verb.word);
    }

    // borrowings
    if (verb.kind != undefined && verb.kind === "BorrowingGroup") {
        return get_default_borrowing_behaviour(verb.group);
    }

    // compounds
    if (verb.family != undefined && verb.family === "Compound") {
        return get_default_compound_behaviour(verb.content);
    }
    return "ERROR! No default behaviour found for verb: " + JSON.stringify(verb);
}

function get_default_root_behaviour(verb) {
    // If a root ends in n, r, or l, then it's intransitive sharing.
    if (verb.endsWith("n") || verb.endsWith("r") || verb.endsWith("l")) {
        return "intransitive sharing";
    }

    // If a root ends in i, then it's transitive equivalence.
    if (verb.endsWith("i")) {
        return "transitive equivalence";
    }
    // If a root is of the form CCV, then it's transitive equivalence.
    if (verb.length === 3) {
        if (eberban_consonants.includes(verb[0]) && eberban_consonants.includes(verb[1]) && eberban_vowels.includes(verb[2])) {
            return "transitive equivalence";
        }
    }
    // otherwise it's transitive sharing.
    return "transitive sharing";
}

function get_default_borrowing_behaviour(group) {
    // The group contains a list of words that make up the borrowing.
    // Only the last word determines the transitivity of the entire borrowing.
    const last_word = group[group.length - 1];
    const verb = last_word.content;

    // transitive sharing if it ends with a vowel
    // otherwise intransitive sharing
    if (eberban_vowels.includes(verb[verb.length - 1])) {
        return "transitive sharing";
    }
    return "intransitive sharing";
}

function get_default_compound_behaviour(content) {
    // The content contains a list of words that make up the compound.
    // Determine the transitivity of the compound by looking at the last word in the compound.
    const last_word = content[content.length - 1];
    // Some compounds end in particles that change their behaviour, early return on checking for these.
    if (last_word.word === "se") { return "intransitive sharing"; }
    if (last_word.word === "sa") { return "transitive sharing"; }
    if (last_word.word === "sai") { return "transitive equivalence"; }
    if (last_word.family === "Particle") { return "intransitive sharing"; }
    return get_default_verb_behaviour(last_word);
}

// main recursive function

function add_variables(result) {
    // for now AMR only works on the sentence level, so loop over paragraphs
    // at the top level of the JSON is a paragraph list
    for (let i = 0; i < result.paragraphs.length; i++) {
        const paragraph = result.paragraphs[i];
        for (let j = 0; j < paragraph.sentences.length; j++) {
            const sentence = paragraph.sentences[j];
            add_variables_to_sentence(sentence);
        }
    }
}

function add_variables_to_sentence(sentence) {
    console.log("Adding variables to sentence: " + JSON.stringify(sentence));
}