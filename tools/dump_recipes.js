#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const globby = require('globby');
const matter = require('gray-matter');
const { capitalCase } = require('change-case');

const REPO = 'https://github.com/magicmark/recipes/blob/master/';

async function main () {
    const files = await globby(['family_recipes/**/*.md', 'recipes/**/*.md']);

    const recipeData = files
        .filter(f => !f.includes('scratch'))
        .map(file => {
            const name = capitalCase(path.parse(file).name);
            const link = `${REPO}${file}`;
            const { data: frontmatter } = matter.read(file);

            return {
                ...frontmatter,
                name,
                link,
                id: file.replace(/\.md$/,''),
            };
        });
    
    console.log(JSON.stringify(recipeData, null, 4));
}

main();
