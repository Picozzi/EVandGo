import json
import pymongo
from bson import json_util
from dotenv import dotenv_values


config = dotenv_values(".env")
base_s3_url = "https://evandgo.s3.us-east-2.amazonaws.com/vehicle_images/"

mongo = pymongo.MongoClient(config['ADDRESS'], maxPoolSize=50, connect=False)
db = pymongo.database.Database(mongo, 'evandgo')
car_col = pymongo.collection.Collection(db, 'electric_vehicles')

car_collections = car_col.find({})
cars = json.loads(json_util.dumps(car_collections))

with open('electric_vehicles.json') as file:
    file_data = json.load(file)
      
for file in file_data:
    file['imageSource'] = base_s3_url + (((file['manufacturer']).lower()).replace(' ', '')).replace('.', '') + '_' + \
        (((file['modelName']).lower()).replace(' ', '')).replace('.', '') + '.png'
    
    car_col.replace_one({'modelName' : file['modelName']}, file, True)
