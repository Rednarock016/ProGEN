@echo off
echo Installing requirements...
py -m pip install flask openpyxl
echo.
echo Starting Password Generator Web App...
echo.
start "" cmd /c "timeout /t 3 && start http://127.0.0.1:5000"
py app.py
pause