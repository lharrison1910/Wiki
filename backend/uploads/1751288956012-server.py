from flask import Flask, jsonify, request
import bcrypt

app = Flask(__name__)


def hashPassword(password):
    bytesPassword = password.encode('ASCII')
    securedPW = bcrypt.hashpw(bytesPassword, bcrypt.gensalt())
    return securedPW

def passwordComplexity(password):
    if (password.len() <6 and password.len() > 12):
        return True
    return False



@app.route("/")
def test():
    return 200


# User functions
@app.get("/user/GET/<user>")
def getData(user):
    #get data from the db
    data = {
        "id": "something unique",
        "name": "puid",
        "role": "Admin",
        "icon": "path to the icon.png"
    }
    return jsonify(data)

@app.post("/user/passwordReset")
def resetPassword():
    #get password from somewhere, will need to get id too. worth sending entire object?
    password = request.args['password']
    securePW = hashPassword(password)
    return securePW

    #write the new password to the db

@app.post("/user/newUser")
def newUser():
    name = request.args['name']
    password = request.args['password']
    role = request.args['role']
    icon = request.args['icon']

    complexity = passwordComplexity(password)
    if (complexity):
        securedPW = hashPassword(password)
    else :
        return "password bad"

    userForm = {
        "name": name,
        "password": securedPW,
        "role": role,
        "icon": icon
        }
    
    return jsonify(userForm)


if (__name__ == "__main__"):
    app.run(host="0.0.0.0", port=8080, debug=True)