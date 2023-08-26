FROM node
COPY . /app
WORKDIR /app
RUN apt-get -y update
RUN apt-get -y install git
RUN cp pre-commit-hook .git/hooks/pre-commit
RUN chmod +x .git/hooks/pre-commit
#RUN npm install
ENTRYPOINT ["tail", "-f", "/dev/null"]