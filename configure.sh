#!/bin/bash

#!/bin/bash

install_npm_modules() {
  local route=$1
  local removingMessage="Removing npm_modules from $route..."
  local installingMessage="Installing npm_modules in $route..."
  local errorMessage="Oops! Something went wrong while installing npm modules in $route. Please check manually."
  local successMessage="Successfully installed npm modules in $route !"

  cd $route

  if [ -d "node_modules" ]; then
    read -p "The node_modules folder already exists in $route. Would you like to delete and reinstall it? (y/n) " response
    if [ "$response" = "y" ]; then
      echo $removingMessage
      rm -rf "node_modules"
      echo $installingMessage
      npm i > /dev/null 2>&1
      if [ $? -ne 0 ]; then
        echo $errorMessage
      else
        echo $successMessage
      fi
    else
      echo "Skipped installing npm modules in $route."
    fi
  else
    echo $installingMessage
    npm i > /dev/null 2>&1
    if [ $? -ne 0 ]; then
      echo $errorMessage
    else
      echo $successMessage
    fi
  fi

  cd -
}

install_npm_modules "backend/api"
install_npm_modules "frontend"
