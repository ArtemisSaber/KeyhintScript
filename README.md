# KeyhintScript
Only accept numeric scores  
仅支持简谱，三个八度内  
Please make sure only notes are contained   
请使用前确认谱子中有且仅有音符  
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
$ node ./keyhint.js filename
```
filename parameter is the file that contains your scores  
filename 参数为包含谱子的文件名  
The script will automatic generate a keyhint text file under the repo directory  
脚本将自动在Repo根目录下生成按键提示文本文件  
