FROM python:latest

ADD ./backend/server.py .

RUN pip install ./backend/requirement.txt

CMD [ "python", "./server.py" ]