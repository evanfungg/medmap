from flask import Flask, request, jsonify
import cohere
from flask_cors import CORS



app = Flask(__name__)
CORS(app, resources={r"/flask/*": {"origins": ["http://localhost:3000"]}})
app.debug = True
co = cohere.Client("0jmZd2S62ns7sgm6cVCZIER9kDsH3TipMwCWpa2Q")

@app.route('/')
def home():
    return "Welcome to the MedNet"



@app.route('/flask/web-search', methods=['POST'])
def web_search():
    data = request.get_json()
    search_query = data['searchQuery']  # Assuming the React client sends a JSON with 'searchQuery'

    # Use Cohere's chat method with the web-search connector
    response = co.chat(
        model="command",
        message=f"""
#     Conduct a web search for the medication "{search_query}" and compile a list of the top 10 most significant dangers associated with this medication. 
#     Format the output as a JSON object with keys as "d1", "d2", ..., "d10", and their corresponding dangers as values. 
#     The dangers should be listed in order of significance, starting with the most critical.
#     For example, if the medication were "Aspirin", the expected output format would be:
#     {{"d1": "Risk of severe allergic reactions", "d2": "Potential for causing stomach ulcers", ..., "d10": "Increased bleeding time after surgery"}}.
#     Please adhere to this structured format strictly and use double quotes for both keys and values.
#     """,
        connectors=[{"id": "web-search"}]
    )

    return jsonify({'text': response.text})

if __name__ == '__main__':
    app.run(debug=True, port=5328)
