FROM nginx:latest

COPY ./blog/.vuepress/dist /usr/share/nginx/html

ENTRYPOINT [ "nginx", "-g", "daemon off;"]