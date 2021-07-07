FROM node:14-alpine AS development

ENV NODE_ENV=development

# Set the default working directory for the app
# It is a best practice to use the /usr/src/app directory
WORKDIR /usr/src/app
# Copy package.json, package-lock.json
# Copying this separately prevents re-running npm install on every code change.
COPY package.json ./
# Install dependencies.
RUN npm install --development 
# Bundle app source
COPY . .
# RUN npm run build

CMD ["npm", "start"]

# production image - copy dist & production node_modules from above steps (optimize build size)
# FROM nginx:alpine
# LABEL maintainer="TelMed2U DevOps" \
#       com.amwater.description="TelMed2U Dashboard" \
#       com.amwater.project="TelMed2U" \
#       com.amwater.env="DEV"
# RUN rm -rf /etc/nginx/conf.d && apk -U upgrade && apk --no-cache add curl
# COPY --from=development /usr/src/app/build /usr/share/nginx/html
# EXPOSE 3000/tcp

# CMD ["nginx", "-g", "daemon off;"]