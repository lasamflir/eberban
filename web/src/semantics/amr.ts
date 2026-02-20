// Arity mismatch resolution for Eberban v0.64

// Designed to operate on the output of the peggy parser, this
// function adds annotations to the JSON parse tree showing
// variables

enum verb_behaviour {
    "intransitive sharing",
    "transitive sharing",
    "transitive equivalence"
}

const eberban_consonants: string = "nrlmpbfvtdszcjgk";
const eberban_vowels: string = "ieaou";
const eberban_h:string = "h";


export function arity_mismatch_resolution(result: JSON): JSON {
    //alert(get_default_root_behaviour("tcihe").toString());
    return result;
}

function get_default_verb_behaviour(verb: JSON): verb_behaviour {
    
    return verb_behaviour["intransitive sharing"];
}

function get_default_root_behaviour(verb: string): verb_behaviour {
    // If a root ends in n, r, or l, then it's intransitive sharing.
    if (verb.endsWith("n") || verb.endsWith("r") || verb.endsWith("l")) {
        return verb_behaviour["intransitive sharing"];
    }
    // If a root ends in i, then it's transitive equivalence.
    if (verb.endsWith("i")) {
        return verb_behaviour["transitive equivalence"];
    }
    // If a root is of the form CCV, then it's transitive equivalence.
    if (verb.length === 3) {
        if (eberban_consonants.includes(verb[0]) && eberban_consonants.includes(verb[1]) && eberban_vowels.includes(verb[2])) {
            return verb_behaviour["transitive equivalence"];
        }
    }
    // otherwise it's transitive sharing.
    return verb_behaviour["transitive sharing"];
}