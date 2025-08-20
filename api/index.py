from flask import Flask, request, jsonify
import google.generativeai as genai
import os
genai.configure(api_key=os.environ.get(AIzaSyDrxqC4pwNGDrceteOyVd1HK6MiIxVHt34))

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        return "Hello! My AI app is running!"
    elif request.method == 'POST':
        # Get data from the request
        data = request.get_json()
        user_input = data.get('message')
        
        
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(user_input)
        
        return jsonify({"response": response.text})


if __name__ == '__main__':
    app.run(debug=True)
