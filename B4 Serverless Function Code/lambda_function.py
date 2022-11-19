import json
import requests

print('Loading function')


def lambda_handler(event, context):
    
    queryStrings = event['queryStringParameters']
    
    selectedSem = int(queryStrings['sem'])
    
    url = 'https://api.nusmods.com/v2/2022-2023/moduleList.json'
    response = requests.get(url)
    data = response.json()
    result = []
    print(data)
    
    for mod in data:
        # if len(mod['semesters']) == 2:
        if selectedSem in mod['semesters'] and mod['moduleCode'].startswith("CS") :
            result.append(mod)
    
    return {
        "data" :"a",
        "event": event['queryStringParameters']['sem'],
        "nusmods modname": data[12]['title'],
        "nusmods data": data[12]['semesters'],
        "selectedMods": result
        
    }
    #raise Exception('Something went wrong')