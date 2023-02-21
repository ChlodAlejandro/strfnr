export default {

    preset: "ts-jest",
    transform: {
        "\\.m?[tj]sx?$": [
            "ts-jest", {
                "tsconfig": "tsconfig.cjs-esi.json"
            }
        ]
    },
    testRegex: "(/tests/)(.*?)(Tests?)(\\.[jt]s)$",
    testPathIgnorePatterns: [
        "ignore-",
        "disabled-"
    ],
    moduleFileExtensions: ["ts", "js"]

};
