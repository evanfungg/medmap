from flask import Flask, request, jsonify
import cohere
from flask_cors import CORS



app = Flask(__name__)
CORS(app, resources={r"/flask/*": {"origins": ["http://localhost:3000"]}})
app.debug = True
co = cohere.Client("9nvNszPUluytWDnVaJOR5QntpW4vdayTTaQHYDIA")

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
#       Given the medication "{search_query}", return the 3 most common brand names but I will Specify how to create the output.
#       For example, if {search_query} is ibuprofen, then Advil, Midol, and Motrin would be returned. Format the output as a string
#       that looks exactly like this: "The brand names for {search_query} are: OUTPUT1, OUTPUT2, OUTPUT3." where OUTPUT1, OUTPUT2,
#       and OUTPUT3 are the 3 most common brand names for the {search_query}. For example, if the medication was 
#       "ibuprofen", the expected output format would be: "The brand names for ibuprofen are: Advil, Midol, and Motrin." 
#       Adhere to this structured format strictly!
#     """,
        connectors=[{"id": "web-search"}]
    )

    return jsonify({'text': response.text})

@app.route('/flask/client-search', methods=['POST'])
def client_search():
    data = request.get_json()
    client_search_query = data['clientSearchQuery']

    other_response = co.chat(
        model="command",
        message=f"""
#       Given the medication "{client_search_query}", return the scientific name of the medication but I will specify how
#       to create the output.
#       For example, if {client_search_query} is Advil, then ibuprofen would be returned. Format the output as a string
#       that outputs exactly like this: "The generic name for {client_search_query} is OUTPUT." where
#       OUTPUT is the scientific name for {client_search_query}. For example, If the medication was 
#       "advil", the expected output format would be "The generic name for advil is ibuprofen." Adhere to this structured format strictly!
#     """,
        connectors=[{"id": "web-search"}]
    )

    return jsonify({'text': other_response.text})


if __name__ == '__main__':
    app.run(debug=True, port=5328)



# Given the medication "{search_query}", if the {search_query} is a scientific name, return the generic brand names that are common 
# up to 3 names.
# For example, if {search_query} is ibuprofen, Advil, Midol, and Motrin would be returned. If the {search_query} is a generic brand name,
# return the scientific name. For example, if {search_query} is Advil, ibuprofen would be returned. Format the output as a JSON
# object with keys as "n1", "n2", and "n3", and their corresponding names as values. For example, if the medication was 
# "ibuprofen", the expected output format would be: {{"n1": "Advil", "n2": "Midol", "n3": "Motrin"}}. If the medication was 
# "Advil", the expected output format would be: {{"n1": "ibuprofen"}}. Adhere to this structured format strictly 
# and use double quotes for both keys and values.
    
#     Conduct a web search for the medication "{search_query}" and compile a list of the top 10 most significant dangers associated with this medication. 
#     Format the output as a JSON object with keys as "d1", "d2", ..., "d10", and their corresponding dangers as values. 
#     The dangers should be listed in order of significance, starting with the most critical.
#     For example, if the medication were "Aspirin", the expected output format would be:
#     {{"d1": "Risk of severe allergic reactions", "d2": "Potential for causing stomach ulcers", ..., "d10": "Increased bleeding time after surgery"}}.
#     Please adhere to this structured format strictly and use double quotes for both keys and values.
    
#       Given the medication "{client_search_query}", return the scientific name of the medication but I will specify how
#       to create the output.
#       For example, if {client_search_query} is Advil, ibuprofen would be returned. Format the output as a string
#       that outputs exactly like this: "The scientific name for "{client_search_query}" is OUTPUT" where
#       OUTPUT is the scientific name for "{client_search_query}". For example, If the medication was 
#       "advil", the expected output format would be "The scientific name for advil is ibuprofen". Adhere to this structured format strictly!
    
#       Given the medication "{client_search_query}", return the scientific name of the medication.
#       For example, if {client_search_query} is Advil, ibuprofen would be returned. Format the output as a JSON
#       object with the key as "n1" and the corresponding name as the value. For example, If the medication was 
#       "advil", the expected output format would be: {{"n1": "ibuprofen"}}. Adhere to this structured format strictly 
#       and use double quotes for both the key and value!

#       Given the medication "{search_query}", return the generic brand names that are common 
#       up to 3 names.
#       For example, if {search_query} is ibuprofen, Advil, Midol, and Motrin would be returned. Format the output as a JSON
#       object with keys as "n1", "n2", and "n3", and their corresponding names as values. For example, if the medication was 
#       "ibuprofen", the expected output format would be: {{"n1": "Advil", "n2": "Midol", "n3": "Motrin"}}. Adhere to this structured format strictly 
#       and use double quotes for both keys and values!
    
#       Given the medication "{search_query}", return the 3 most common brand names but I will Specify how to create the output.
#       For example, if {search_query} is ibuprofen, then Advil, Midol, and Motrin would be returned. Format the output as a string
#       that looks exactly like this: "The brand names for {search_query} are: OUTPUT1, OUTPUT2, OUTPUT3." where OUTPUT1, OUTPUT2,
#       and OUTPUT3 are the 3 most common brand names for the {search_query}. For example, if the medication was 
#       "ibuprofen", the expected output format would be: "The brand names for ibuprofen are: Advil, Midol, and Motrin." 
#       Adhere to this structured format strictly!
    
