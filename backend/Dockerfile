FROM python

WORKDIR /

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

EXPOSE 5050

CMD ["python", "server.py"]