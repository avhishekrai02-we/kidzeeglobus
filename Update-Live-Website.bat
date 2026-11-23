@echo off
title Update Kidzee Globus Live Website
echo ========================================================
echo   Updating Kidzee Globus Live Website...
echo ========================================================
echo.
git add .
set /p commit_msg="Enter update description (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update website content
git commit -m "%commit_msg%"
git push origin main
echo.
echo ========================================================
echo   Changes pushed successfully!
echo   The live site will update in ~30 seconds:
echo   https://avhishekrai02-we.github.io/kidzeeglobus/
echo ========================================================
pause
