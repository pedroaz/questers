import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import'; // 🆕 Add import plugin
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		plugins: {
			import: importPlugin // 🆕 Enable import plugin
		},
		rules: {
			// 🆕 Import sorting rule
			'import/order': [
				'warn',
				{
					groups: [
						'builtin', // Node.js built-ins
						'external', // npm packages
						'internal', // Aliased paths like @/ or src/
						['parent', 'sibling', 'index'] // Relative imports
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true
					}
				}
			],

			// Optional: disable rules you mentioned
			'jsx-a11y/click-events-have-key-events': 'off',
			'jsx-a11y/no-static-element-interactions': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			]
		}
	}
);
