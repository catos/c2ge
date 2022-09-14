#!/usr/bin/env node

const watchFlag = process.argv.indexOf("--watch") > -1;

require("esbuild")
	.build({
		entryPoints: ["src/balls/index.ts"],
		bundle: true,
		outdir: "public",
		watch: watchFlag,
	})
	.catch(() => process.exit(1));