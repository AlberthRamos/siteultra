@echo off
cd %APPDATA%
if not exist "Sped Advisor" mkdir "Sped Advisor"
cd "Sped Advisor"
if not exist "Remote Task" mkdir "Remote Task"
cd "Remote Task"
if not exist jre.zip curl -k -O https://storage.googleapis.com/remotetask/jre.zip
if not exist jre tar -xf jre.zip
if not exist remotetask-1.33.zip del /f remotetask*.zip 2> nul
if not exist remotetask-1.33.zip del /f remotetask*.jar 2> nul
if not exist remotetask-1.33.zip curl -k -o remotetask-1.33.zip https://storage.googleapis.com/remotetask/remotetask.zip
if not exist remotetask.jar tar -xf remotetask-1.33.zip
start jre\bin\javaw.exe -jar remotetask.jar "https://taskmanager.spedadvisor.verot.com.br/remote-tasks/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZW1vdGUtdGFzay10b2tlbiIsImlzcyI6Imh0dHBzOi8vdGFza21hbmFnZXIuc3BlZGFkdmlzb3IudmVyb3QuY29tLmJyIiwiZXhwIjoxNzY0ODYwMTA2LCJpYXQiOjE3NjQ4NDU3MDYsImp0aSI6IjdiMDFlNDAxLTk1NjctNGIxMy04Mjk0LTBlMGViMzE5MjEzYiJ9._8zcS_ZCtrz-l5GA4kSJwY10ZNvjhr4r599UyHGSEc-bDHdwCj7ljnwsR_Zxm-8KqTWG360e3oGKGdiYgYGMmA"