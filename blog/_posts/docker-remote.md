# 使用Docker执行远程命令

> 镜像：registry.cn-shanghai.aliyuncs.com/sdev/ssh-password

该镜像用于CI docker部署时在服务器上执行命令。

docker部署一般步骤：
node build --- build docker image --- push docker image --- run shell script on remote server

该镜像用于最后一阶段。用于推送镜像后在服务器上拉取镜像后运行镜像。

## 镜像一般使用方法：

### 运行时指定用户名、密码、主机名

```bash
docker run --rm -it \
  -e SSH_USER=root \
  -e SSH_HOST=47.102.122.82 \
  -e SSH_PASSWORD=xxxxxxxxxxxx  \
  registry.cn-shanghai.aliyuncs.com/sdev/ssh-password
```
在容器内指定用户名密码等：
```bash
export SSH_USER=root SSH_HOST=192.168.0.0.1 SSH_PASSWORD=your_password && ./run.sh "echo I am in remote."
```

在容器内执行远程命令：
```bash
./run.sh "echo I am in remote."
```

### 使用镜像直接执行命令

```bash
docker run --rm -e SSH_USER=root -e SSH_HOST=47.102.122.82 -e SSH_PASSWORD=xxxxxxxx. registry.cn-shanghai.aliyuncs.com/sdev/ssh-password /bin/sh ./run.sh 'ls -la'
```

## 原理
- 利用expect来输入密码：
首先linux安装expect，例如apline下执行`apk add expect`
- shell脚本
```sh
#!/bin/sh

expect <<EOF
  set timeout 5：
  spawn ssh ${SSH_USER}@${SSH_HOST} sh -c \"${REMOTE_SCRIPT}\"
  
   expect {
    "*yes*" {send "yes\n"}
  }
  expect {
    "*password*" {send "${SSH_PASSWORD}\n"}
  }
  expect eof
EOF

echo run commands successfully.
```
- 封装docker镜像。
将以上内容封装成docker镜像即可。

执行环境变量后执行shell脚本即可登录远程服务器并执行一段脚本。