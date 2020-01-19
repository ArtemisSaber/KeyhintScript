var args: Array<string> = process.argv.slice(2)

const fs = require('fs')
const path = require('path')

if (!args[0]) {
	console.log('Must specify a file to translate')
}

if (!args[1]) {
	args[1] = 'keymap.json'
}

var getKeyMap: Function = (mapFile: string) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path.join(__dirname, mapFile), 'utf-8', (err, contents) => {
			err ? reject(err) : resolve(JSON.parse(contents))
		})
	})
}

var createKeyHintName: Function = (fileName: string) => {
	var realName: string = fileName
	var keyHintName: string = `${realName.split('.')[0]}KeyHint`
	console.log(`Created file ${keyHintName}.txt`)
	return keyHintName
}

var noteToKey: Function = (note: string, keyMap: Object) => {
	let key: string = keyMap[note] ? keyMap[note] : 'UNDEFINED'
	return key
}

var scoreToKeyHint: Function = (score: string, keyMap: Object) => {
	let scoreArray: Array<string> = score.split('\r\n')
	let keyArray: Array<string> = []
	scoreArray.forEach(element => {
		let notes: Array<string> = element.split(' ')
		let keys: string = ``
		if (notes.length > 0) {
			notes.forEach(e => {
				if (e != '') {
					keys += `${noteToKey(e, keyMap)} `
				}
			})
		}
		if (keys != '') {
			keyArray.push(keys)
		}
	})
	let keyHint: string = ``
	keyArray.forEach(keys => {
		keyHint += `${keys}\r\n`
	})
	return keyHint
}

var keyMapPromise: Promise<unknown> = getKeyMap(args[1])
keyMapPromise
	.then(keyMap => {
		fs.readFile(path.join(__dirname, args[0]), 'utf-8', (err, contents) => {
			if (err) {
				console.log(err)
				return 1
			}
			console.log('Read file' + args[0])
			var keyHintName: string = createKeyHintName(args[0])
			var keyHintFileName: string = keyHintName + '.txt'
			var keyHint: string = scoreToKeyHint(contents, keyMap)
			fs.writeFile(keyHintFileName, keyHint, err => {
				err
					? console.log(err)
					: console.log(`Written to file ${keyHintFileName}`)
			})
		})
	})
	.catch(reason => {
		console.log(reason)
	})
