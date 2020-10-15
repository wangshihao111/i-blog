# docker 部署 jenkins及更换源

## 运行jenkins镜像

使用官方推荐镜像 jenkinsci/blueocean
docker安装好后，执行以下命令：
```bash
docker run \
> -u root \ 
> -d \
> -p 8080:8080 \
> -v /var/jenkins_home:/var/jenkins_home \
> -v /var/run/docker.sock:/var/run/docker.sock \
> --name jenkins \
> jenkinsci/blueocean
```

容器启动后，也面会提示初始密码所在位置(/var/jenkins_home/secrets/initialAdminPassword)
然后执行命令 `docker exec jenkins tail /var/jenkins_home/secrets/initialAdminPassword`
然后将输出的字符串复制粘贴到输入框，点继续

## 更换插件源
如果出现插件无法下载的情况，可以更换为国内源：
进入路径 /pluginManage/advance
找到最下边更新中心，将地址更换为清华镜像
`https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`