var args = process.argv.slice(2)
//console.log(args)

var fs = require('fs')
fs.readFile(args[0], 'utf-8', (error, contents) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Read file " + args[0].split('\\')[1])
        var keyHintName = createKeyHintName(args[0])
        var keyHintFileName = keyHintName += ".txt"
        var keyHint = scoreToKeyHint(contents)
        fs.writeFile(keyHintFileName,keyHint,err=>{
            if(err){
                console.log(err)
            }else{
                console.log("Written to file "+keyHintFileName)
            }
        })
    }
})

var createKeyHintName = (fileName) => {
    var realName = fileName.split('\\')[1]
    var keyHintName = realName.split('.')[0] += "KeyHint"
    console.log("Create file " + keyHintName + ".txt")
    return keyHintName
}

var scoreToKeyHint = (score) => {
    //console.log(score)
    var scoreArray = score.split('\r\n')
    var KeyArray = []
    scoreArray.forEach(element => {
        var notes = element.split(' ')
        var keys = ""
        notes.forEach(note => {
            if (note != "") {
                keys += (noteToKey(note) + " ")
            }
        })
        if (keys != "") {
            KeyArray.push(keys)
        }
    });
    // console.log(KeyArray)
    var keyHint = ""
    KeyArray.forEach(keys => {
        keyHint += (keys+"\n")
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

var noteToKey = (note) => {
    var key = ''
    switch (note) {
        // Lower
        case '1(-1)':
            key = 'Z'
            break;
        case '2(-1)':
            key = 'X'
            break;
        case '3(-1)':
            key = 'C'
            break;
        case '4(-1)':
            key = 'V'
            break;
        case '5(-1)':
            key = 'B'
            break;
        case '6(-1)':
            key = 'N'
            break;
        case '7(-1)':
            key = 'M'
            break;
        case '#1(-1)':
            key = 'ctrl+1'
            break;
        case 'b3(-1)':
            key = 'ctrl+2'
            break;
        case '#4(-1)':
            key = 'ctrl+3'
            break;
        case '#5(-1)':
            key = 'ctrl+4'
            break;
        case 'b7(-1)':
            key = 'ctrl+5'
            break;
        // Mid
        case '1':
            key = 'A'
            break;
        case '2':
            key = 'S'
            break;
        case '3':
            key = 'D'
            break;
        case '4':
            key = 'F'
            break;
        case '5':
            key = 'G'
            break;
        case '6':
            key = 'H'
            break;
        case '7':
            key = 'J'
            break;
        case '#1':
            key = '1'
            break;
        case 'b3':
            key = '2'
            break;
        case '#4':
            key = '3'
            break;
        case '#5':
            key = '4'
            break;
        case 'b7':
            key = '5'
            break;
        // High
        case '1(+1)':
            key = 'Q'
            break;
        case '2(+1)':
            key = 'W'
            break;
        case '3(+1)':
            key = 'E'
            break;
        case '4(+1)':
            key = 'R'
            break;
        case '5(+1)':
            key = 'T'
            break;
        case '6(+1)':
            key = 'Y'
            break;
        case '7(+1)':
            key = 'U'
            break;
        case '1(+2)':
            key = 'I'
            break;
        case '#1(+1)':
            key = '6'
            break;
        case 'b3(+1)':
            key = '7'
            break;
        case '#4(+1)':
            key = '8'
            break;
        case '#5(+1)':
            key = '9'
            break;
        case 'b7(+1)':
            key = '0'
            break;
        default:
            key = 'NotFound'
            break;
    }
    return key
}