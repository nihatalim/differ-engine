import jq from "node-jq"
import fs from "fs";
import jsonabc from "jsonabc";
import difflib from "jsdifflib";

const ignoreList = JSON.parse(fs.readFileSync('configs/ignore.json'))

export async function hasDifference(left, right) {
    let results = await sortAndIgnore(left, right);
    let baseTextLines = JSON.stringify(results[0], null, 2);
    let newTextLines = JSON.stringify(results[1], null, 2);

    let l = difflib.stringAsLines(baseTextLines);
    let r = difflib.stringAsLines(newTextLines);
    let opcodes = (new difflib.SequenceMatcher(l, r)).get_opcodes();

    return !(opcodes !== undefined && opcodes.length === 0 || (opcodes.length === 1 && opcodes[0][0] === "equal"))
}

export async function sortAndIgnore(left, right) {
    return Promise.all([ignore(sort(left)), ignore(sort(right))])
}

export async function ignore(doc) {
    for (let i = 0; i < ignoreList.length; i++) {
        doc = await jq.run(ignoreList[i].value, doc, {input: "json", output: "json"})
    }

    return Promise.resolve(doc)
}

export function sort(doc) {
    return jsonabc.sortObj(doc);
}
