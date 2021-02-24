/* eslint-env node */
/* eslint no-console: 0 */
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod')

/**
 * Webpack build for the frontend
 */
function bundle() {
	webpack(webpackConfig, (err, stats) => {
		if (err || stats.hasErrors()) {
			console.log(err)
			console.log(stats)
		}
	})
}

/**
 * Build File
 *
 * Implementieren Sie hier alle (automatisierten) Schritte, die notwendig sind, um Ihre Anwendung
 * vor der Veröffentlichung zu testen und zu "bauen". Das könnte z.B. das Zusammenfügen von Javascript-Dateien
 * oder die Optimierung von Ressourcen-Dateien sein.
 *
 * Diese Datei wird beim Aufrufen des `build`-Tasks (npm) automatisch ausgeführt.
 */

function build() {
	// Implementiere Sie hier die einzelnen Bauschritte
	console.log('Building "Project Starter"')
	console.log('Running webpack build')
	bundle()
}

build()
