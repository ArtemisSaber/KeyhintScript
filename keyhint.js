var args = process.argv.slice(2)
//console.log(args)

var fs = require('fs')
if (!args[0]) {
    args[0] = ".\\Dragonsong.txt"
}
if(!args[1]){
    args[1] = './keymap.json'
}
var getKeyMap =  (mapFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(mapFile, 'utf-8', (err, contents) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(JSON.parse(contents))
            }
        })
    })
}

var KeyMapPromise = getKeyMap(args[1])
KeyMapPromise.then(keyMap => {
    fs.readFile(args[0], 'utf-8', (error, contents) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Read file " + args[0].split('\\')[1])
            var keyHintName = createKeyHintName(args[0])
            var keyHintFileName = keyHintName += ".txt"
            var keyHint = scoreToKeyHint(contents,keyMap)
            fs.writeFile(keyHintFileName, keyHint, err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Written to file " + keyHintFileName)
                }
            })
        }
    })

}, err => {
    console.log("Failed to read keyboard mapping \n error: " + err)
})

var createKeyHintName = (fileName) => {
    var realName = fileName.split('\\')[1]
    var keyHintName = realName.split('.')[0] += "KeyHint"
    console.log("Create file " + keyHintName + ".txt")
    return keyHintName
}

var scoreToKeyHint = (score,keyMap) => {
    //console.log(score)
    var scoreArray = score.split('\r\n')
    var KeyArray = []
    scoreArray.forEach(element => {
        var notes = element.split(' ')
        var keys = ""
        notes.forEach(note => {
            if (note != "") {
                keys += (noteToKey(note,keyMap) + " ")
            }
        })
        if (keys != "") {
            KeyArray.push(keys)
        }
    });
    // console.log(KeyArray)
    var keyHint = ""
    KeyArray.forEach(keys => {
        keyHint += (keys + "\n")
    })
    // console.log(keyHint)
    return keyHint
    //console.log(noteArray)
    // var KeyHint = ""
    // noteArray.forEach(note => {
    //     KeyHint += (noteToKey(note) + " ")
    // })
    // console.log(KeyHint)
}

var noteToKey = (note, keyMap) => {
    var key = ''
    if(keyMap[note]){
        key = keyMap[note]
    }else{
        key = "NO_VALID_MAPPING"
    }
    return key
}
