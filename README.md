# KeyhintScript
Only accept numeric scores  
仅支持简谱，三个八度内  
Please make sure only notes are contained   
请使用前确认谱子中有且仅有音符  
# Dependency  
NodeJS Environment  
需要NodeJS环境运行  
For typescript version, typescript compiler is required and make sure to run npm install before using  
Typescript实现运行需要Typescript编译器,并且在运行前请执行npm install命令  
# Usage  
Clone this repo to your local machine at any desired location  
将Repo克隆到本地任意目录  
Copy or make a file for your scores  
复制或者新建一个包含谱子的文件  
Check the file for any non-note anormaly and remove anything that is not a note  
检查文件中是否存在非音符并去除非音符字符  
Use terminal and run command  
使用命令行工具执行命令  
```bash
$ npm run translate filename keymapFile
```
filename parameter is the file that contains your scores  
filename 参数为包含谱子的文件名  
You can specify keymap by using an optional second parameter for keymap file  
可以用第二个参数决定使用的音符映射  
The script will automatic generate a keyhint text file under the repo directory  
脚本将自动在Repo根目录下生成按键提示文本文件  

# Example  
Refer to Dragonsong.txt for scores  
谱面要求参见Dragonsong.txt  

# Advanced  
To adapt multiple ranges just add more score => key mapping in keymap file  
如想支持自定义音符/更多八度只需在Keymap文件中增加相应的音符对按键映射即可  

# Support
Support this layout by default
默认支持该按键布局  
![KeyboardLayout](https://i.ibb.co/TwVP2ZT/layout.jpg)
