#!/bin/bash

set -eu

# Configuration defaults
if [ -z "${CI:-}" ]; then
  is_ci=0
  confirm_before_publish=1
else
  is_ci=1
  confirm_before_publish=0
fi

# Parse the CLI arguments like --no-confirm
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    --no-confirm)
      confirm_before_publish=0
      shift
      ;;
    *)
      echo "Unknown option $key"
      exit 1
      ;;
  esac
done

# If there are no files in lib then fail
if [ ! "$(ls lib 2>/dev/null)" ]; then
  echo "No files in lib/ to publish, maybe you should build first?"
  exit 1
fi

# If there is a dist entity but it is not a symlink, fail
if [ -e dist ] && [ ! -L dist ]; then
  echo "dist/ exists and is not a symlink, delete this file and try again"
  exit 1
fi

# Authenticate
if [ $is_ci = 1 ]; then
  echo "Authenticate with Prismatic using refresh token"
  echo "TODO: implement this"
elif ! npx prism me > /dev/null 2>&1; then
  echo "Log in to Prismatic"
  npx prism login
fi

# Setup the CLI args for prism components:publish
publish_args=(--skip-on-signature-match)
if [ $confirm_before_publish = 1 ]; then
  publish_args+=(--confirm)
else
  publish_args+=(--no-confirm)
fi

# Go into each directory and publish the component
for component_path in lib/*; do
  if [ ! -d "$component_path" ]; then continue; fi
  if [ -e dist ]; then rm dist; fi
  ln -s "$component_path/dist" dist

  component_name="$(node -e 'console.log(require("./dist").default.display.label)')"
  echo "Publish "'"'"$component_name"'"'" from $component_path"
  npx prism components:publish "${publish_args[@]}"
done

# Final cleanup
if [ -e dist ]; then rm dist; fi