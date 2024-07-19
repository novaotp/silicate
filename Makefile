cloc:
	cloc --fullpath --not-match-d="(node_modules|packages/app/pubspec.lock|packages/web/.svelte-kit)" --not-match-f="(yarn\.lock|package\.json|package\-lock\.json)" .
