module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		// "eslint:recommended",
		'plugin:react/recommended',
		'airbnb',
		'plugin:@typescript-eslint/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'import/extensions': [
			2,
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		],
		'prettier/prettier': 'error',
		// 'prettier/prettier': [
		//     'error',
		//     {
		//         endOfLine: 'auto',
		//     },
		// ],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', '@types'],
			},
			typescript: {}, // 프로젝트 Root의 tsconfig.json을 찾는다.
		},
	},
};
