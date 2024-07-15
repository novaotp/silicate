export default {
	"useTabs": false,
	"tabWidth": 4,
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 80,
	"arrowParens": "always",
	"svelteAllowShorthand": true,
	"svelteBracketNewLine": true,
	"singleAttributePerLine": false,
	"plugins": ["prettier-plugin-svelte", "prettier-plugin-classNames"],
    "endingPosition": "absolute",
	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
