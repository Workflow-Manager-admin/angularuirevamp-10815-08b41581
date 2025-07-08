#!/bin/bash
cd /home/kavia/workspace/code-generation/angularuirevamp-10815-08b41581/frontend_ui
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

