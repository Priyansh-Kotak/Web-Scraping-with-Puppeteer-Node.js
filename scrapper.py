import json
import pickle

# Load JSON data
with open("output.json", "r") as json_file:
    data = json.load(json_file)

# Save as Pickle
with open("output.pickle", "wb") as pickle_file:
    pickle.dump(data, pickle_file)

print("Data successfully converted to output.pickle")
