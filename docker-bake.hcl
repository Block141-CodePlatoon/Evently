group "default" {
  targets = ["api", "nginx"]
}

target "api" {
  context = "./backend"
  dockerfile = "Dockerfile"
  tags = ["mlausche/api:latest"]
  platforms = ["linux/amd64"]
}

target "nginx" {
  context = "."
  dockerfile = "./webserver/Dockerfile"
  tags = ["mlausche/nginx:latest"]
  platforms = ["linux/amd64"]
}
