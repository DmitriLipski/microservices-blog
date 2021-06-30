# Microservices Blog

### kubernetes deployment
1. Set the environment variables with `eval $(minikube docker-env)`
2. Build the image (ex. posts service) `docker build -t USER_NAME/posts:latest .`
3. Set the image in the pod spec under `spec.template.spec.containers[0].image` key like the build tag `USER_NAME/posts:0.0.1`
4. Set the `imagePullPolicy` to `Never`, otherwise, Kubernetes will try to download the image

### Git rules
* merges are only after the pull passes a code review of 2 developers
* one cannot push straight into develop branch. We create pull requests instead and wait for 2 developers' approval before merging
* branch naming convention `feature/MCBL-19/some-feature-name`
* commit names convention: `MCBL-19: Create some feature`
* commit names should contain URL to respective ticket 
> Note: Example
